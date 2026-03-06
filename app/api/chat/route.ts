import { NextResponse } from "next/server"
import { generateText, tool } from "ai"
import { z } from "zod"
import { getPublicErrorMessage, getRequestId } from "@/lib/api-errors"
import { resolveCopilotModel } from "@/lib/ai-provider"
import { getCurrentEntitlement } from "@/lib/account-entitlement"
import {
  FREE_COPILOT_DAILY_LIMIT,
  getAnonymousCopilotAccountKey,
  incrementCopilotDailyUsage,
} from "@/lib/copilot-usage"
import {
  executeAreaRiskBrief,
  executeDealScreener,
  executeDeveloperDueDiligence,
  executeGenerateInvestorMemo,
  executePriceRealityCheck,
} from "@/lib/copilot/executor"
import { collectGuardrailWarnings } from "@/lib/copilot/guardrails"
import {
  type AreaRiskBriefInput,
  type DealScreenerInput,
  type DeveloperDueDiligenceInput,
  type GenerateInvestorMemoInput,
  type PriceRealityCheckInput,
  areaRiskBriefInputSchema,
  copilotSystemPrompt,
  copilotToolDescriptions,
  dealScreenerInputSchema,
  developerDueDiligenceInputSchema,
  generateInvestorMemoInputSchema,
  priceRealityCheckInputSchema,
} from "@/lib/copilot/tools"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const chatRequestSchema = z
  .object({
    intent: z.string().trim().min(1).max(500).optional(),
    message: z.string().trim().min(1).max(500).optional(),
    context: z
      .object({
        city: z.string().trim().min(1).max(120).optional(),
        area: z.string().trim().min(1).max(120).optional(),
      })
      .optional(),
  })
  .refine((data) => Boolean(data.intent || data.message), {
    message: "message or intent is required",
  })

const defaultSuggestions = [
  "Studios under AED 800K in Business Bay",
  "Compare Dubai Marina vs JBR",
  "Best areas for 1-2 year delivery",
  "Projects in Abu Dhabi under AED 2M",
]

function withGuardrails<T extends Record<string, unknown>>(output: T): T & { guardrail_warnings: string[] } {
  const warnings = collectGuardrailWarnings(output)
  return {
    ...output,
    guardrail_warnings: warnings,
  }
}

function buildUserPrompt(message: string, context?: { city?: string; area?: string }) {
  const segments = [message.trim()]

  if (context?.city || context?.area) {
    segments.push(
      [
        "Context:",
        context.city ? `- City: ${context.city}` : null,
        context.area ? `- Area: ${context.area}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    )
  }

  return segments.join("\n\n")
}

export async function POST(request: Request) {
  const requestId = getRequestId(request)

  try {
    const body = await request.json()
    const parsed = chatRequestSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request payload.", requestId, request_id: requestId }, { status: 400 })
    }

    const headerAccountKey = request.headers.get("x-entrestate-account-key")?.trim() || request.headers.get("x-entrestate-user-id")?.trim()
    const entitlement = await getCurrentEntitlement(headerAccountKey)
    const usageAccountKey = entitlement.accountKey || getAnonymousCopilotAccountKey(request)
    const usage = await incrementCopilotDailyUsage(usageAccountKey, entitlement.tier)

    if (entitlement.tier === "free" && usage.used > FREE_COPILOT_DAILY_LIMIT) {
      return NextResponse.json(
        {
          error: "You have finished your daily limit for your current plan.",
          upgrade_cta: {
            label: "Subscribe to continue",
            url: "/pricing",
          },
          tier: entitlement.tier,
          usage,
          requestId,
          request_id: requestId,
        },
        { status: 429 },
      )
    }

    const model = resolveCopilotModel()
    if (!model) {
      throw new Error("Copilot model is not configured. Set GEMINI_KEY, AI_GATEWAY_API_KEY, or OPENAI_API_KEY.")
    }

    const toolset = {
      deal_screener: tool({
        description: copilotToolDescriptions.deal_screener,
        inputSchema: dealScreenerInputSchema,
        execute: async (input: DealScreenerInput) => withGuardrails(await executeDealScreener(input)),
      }),
      price_reality_check: tool({
        description: copilotToolDescriptions.price_reality_check,
        inputSchema: priceRealityCheckInputSchema,
        execute: async (input: PriceRealityCheckInput) => withGuardrails(await executePriceRealityCheck(input)),
      }),
      area_risk_brief: tool({
        description: copilotToolDescriptions.area_risk_brief,
        inputSchema: areaRiskBriefInputSchema,
        execute: async (input: AreaRiskBriefInput) => withGuardrails(await executeAreaRiskBrief(input)),
      }),
      developer_due_diligence: tool({
        description: copilotToolDescriptions.developer_due_diligence,
        inputSchema: developerDueDiligenceInputSchema,
        execute: async (input: DeveloperDueDiligenceInput) =>
          withGuardrails(await executeDeveloperDueDiligence(input)),
      }),
      generate_investor_memo: tool({
        description: copilotToolDescriptions.generate_investor_memo,
        inputSchema: generateInvestorMemoInputSchema,
        execute: async (input: GenerateInvestorMemoInput) => withGuardrails(await executeGenerateInvestorMemo(input)),
      }),
    } as const

    const message = parsed.data.message ?? parsed.data.intent ?? ""
    const prompt = buildUserPrompt(message, parsed.data.context)

    const response = await generateText({
      model,
      system: copilotSystemPrompt,
      prompt,
      temperature: 0,
      maxSteps: 6,
      toolChoice: "auto",
      tools: toolset,
    })

    const text = response.text.trim()
    const toolResults = ((response as { toolResults?: Array<{ result?: unknown }> }).toolResults ?? [])
      .map((entry) => entry.result)
      .filter((entry) => entry !== undefined)
    const synthesizedSummary = toolResults.length > 0 ? JSON.stringify(toolResults[toolResults.length - 1]).slice(0, 1200) : ""
    const content = text.length > 0
      ? text
      : synthesizedSummary.length > 0
        ? `The data shows: ${synthesizedSummary}`
        : "No matching projects found."

    return NextResponse.json(
      {
        content,
        suggestions: defaultSuggestions,
        requestId,
        request_id: requestId,
        usage,
      },
      {
        status: 200,
        headers: {
          "x-request-id": requestId,
          "x-copilot-usage-used": String(usage.used),
          "x-copilot-usage-limit": usage.limit === null ? "unlimited" : String(usage.limit),
          "x-copilot-usage-remaining": usage.remaining === null ? "unlimited" : String(usage.remaining),
        },
      },
    )
  } catch (error) {
    console.error("Chat route error:", { requestId, error })
    return NextResponse.json(
      {
        error: getPublicErrorMessage(error, "The assistant failed to process your request."),
        requestId,
        request_id: requestId,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
