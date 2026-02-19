import { NextResponse } from "next/server"
import { z } from "zod"
import { getPublicErrorMessage, getRequestId } from "@/lib/api-errors"
import { getEntrestateRows } from "@/lib/daas/data"
import { average, countBy, priceValue, resolveColumns, toStringValue } from "@/lib/daas/engine"
import { runAgent } from "@/lib/notebook-agent/runtime"
import { getLatestNotebookProvenance } from "@/lib/notebook-provenance"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const chatRequestSchema = z
  .object({
    intent: z.string().trim().min(1).max(500).optional(),
    message: z.string().trim().min(1).max(500).optional(),
    userId: z.string().cuid().optional(),
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

type ChatContext = {
  city?: string
  area?: string
}

type ChatCard = {
  type: "stat" | "area" | "project"
  title: string
  value: string
  subtitle?: string
  trend?: "up" | "down" | "flat"
  trendValue?: string
}

type MarketChatResponse = {
  content: string
  dataCards?: ChatCard[]
  suggestions?: string[]
}

const defaultSuggestions = [
  "Studios under AED 800K in Business Bay",
  "Compare Dubai Marina vs JBR",
  "Best areas for 1-2 year delivery",
  "Projects in Abu Dhabi under AED 2M",
]

const parseBudgetAed = (message: string): number | null => {
  const match = message.match(/aed\s*([\d,.]+)\s*(k|m|mn|million)?/i)
  if (!match) return null
  const value = Number.parseFloat(match[1].replace(/,/g, ""))
  if (!Number.isFinite(value)) return null
  const unit = match[2]?.toLowerCase()
  if (unit === "k") return value * 1_000
  if (unit === "m" || unit === "mn" || unit === "million") return value * 1_000_000
  return value
}

const pickBestMatch = (candidates: string[], message: string): string | null => {
  const normalized = message.toLowerCase()
  return candidates.find((candidate) => normalized.includes(candidate.toLowerCase())) ?? null
}

async function buildMarketChatResponse(message: string, context?: ChatContext): Promise<MarketChatResponse> {
  const { rows } = await getEntrestateRows()
  const columns = resolveColumns(rows)
  const cityValues = columns.city
    ? rows
        .map((row) => toStringValue(row[columns.city]))
        .filter((value): value is string => Boolean(value))
    : []
  const areaValues = columns.area
    ? rows
        .map((row) => toStringValue(row[columns.area]))
        .filter((value): value is string => Boolean(value))
    : []

  const city = context?.city ?? pickBestMatch(Array.from(new Set(cityValues)), message)
  const area = context?.area ?? pickBestMatch(Array.from(new Set(areaValues)), message)
  const budgetMax = parseBudgetAed(message)

  let filtered = rows
  if (city && columns.city) {
    filtered = filtered.filter((row) => toStringValue(row[columns.city])?.toLowerCase() === city.toLowerCase())
  }
  if (area && columns.area) {
    filtered = filtered.filter((row) => toStringValue(row[columns.area])?.toLowerCase() === area.toLowerCase())
  }
  if (budgetMax && columns.priceFrom) {
    filtered = filtered.filter((row) => {
      const price = priceValue(row, columns)
      return price === null ? false : price <= budgetMax
    })
  }

  const prices = filtered
    .map((row) => priceValue(row, columns))
    .filter((value): value is number => value !== null)
  const avgPrice = average(prices)
  const areaCounts = countBy(
    columns.area
      ? filtered
          .map((row) => toStringValue(row[columns.area]))
          .filter((value): value is string => Boolean(value))
      : [],
  )
  const topArea = areaCounts[0]?.label
  const count = filtered.length

  const content =
    count > 0
      ? `Found ${count.toLocaleString()} matching projects${area ? ` in ${area}` : ""}${
          city && !area ? ` in ${city}` : ""
        }.`
      : "I could not find matching inventory for that request yet. Try adjusting the filters."

  const dataCards: ChatCard[] = [
    {
      type: "stat",
      title: "Matches",
      value: count.toLocaleString(),
      subtitle: city || area ? [city, area].filter(Boolean).join(" / ") : "All markets",
    },
    {
      type: "stat",
      title: "Average price",
      value: avgPrice ? `AED ${Math.round(avgPrice).toLocaleString()}` : "-",
      subtitle: "From live inventory",
    },
  ]

  if (topArea) {
    dataCards.push({
      type: "area",
      title: "Top area",
      value: topArea,
      subtitle: "Most frequent in results",
    })
  }

  return { content, dataCards, suggestions: defaultSuggestions }
}

async function loadProvenance(requestId: string) {
  try {
    const record = await getLatestNotebookProvenance()
    if (record?.run_id) return record
  } catch {
    // ignore provenance lookup errors
  }

  return {
    run_id: requestId,
    snapshot_ts: null,
    sources_used: null,
    exclusion_policy_version: null,
    column_registry_version: null,
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request)
  const provenance = await loadProvenance(requestId)
  try {
    const body = await request.json()
    const parsed = chatRequestSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request payload.", requestId, provenance },
        { status: 400 },
      )
    }
    
    if (parsed.data.intent && parsed.data.userId) {
      // This assumes you can get the user's ID from the session or request
      const agentResponse = await runAgent(parsed.data.intent, parsed.data.userId)
      return NextResponse.json(
        { ...agentResponse, content: agentResponse.narrative, dataCards: [], requestId, provenance },
        { status: 200 },
      )
    }

    const message = parsed.data.message ?? parsed.data.intent ?? ""
    const marketResponse = await buildMarketChatResponse(message, parsed.data.context)
    return NextResponse.json({ ...marketResponse, requestId, provenance }, { status: 200 })
  } catch (error) {
    console.error("Chat agent error:", { requestId, error })
    return NextResponse.json(
      {
        error: getPublicErrorMessage(error, "The agent failed to process your request."),
        requestId,
        provenance,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  const requestId = getRequestId()
  const provenance = await loadProvenance(requestId)
  return NextResponse.json({
    content: "Ask about pricing, delivery timing, or area comparisons to begin.",
    suggestions: [
      "Studios under AED 800K in Business Bay",
      "Compare Dubai Marina vs JBR",
      "Best areas for 1-2 year delivery",
      "Projects in Abu Dhabi under AED 2M",
    ],
    requestId,
    provenance,
  })
}
