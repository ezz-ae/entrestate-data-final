import { generateText } from "ai"
import { tableSpecSchema } from "./schema"
import { compileTableSpec } from "./compiler"
import { TableSpec, TableSpecCompilation, TableSpecCompileInput } from "./types"
import { enforceTableSpec } from "./validation"

const DEFAULT_MODEL = process.env.TABLESPEC_LLM_MODEL || "openai/gpt-4o-mini"
const DEFAULT_TEMPERATURE = 0.1
const DEFAULT_MAX_TOKENS = 900

const DEFAULT_TIME_RANGE = { mode: "relative", last: 24, unit: "months" } as const

const extractJson = (text: string) => {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error("llm_no_json")
  return JSON.parse(match[0]) as Partial<TableSpec>
}

const applyOverrides = (spec: TableSpec, overrides?: Partial<TableSpec>): TableSpec => {
  if (!overrides) return spec
  return {
    ...spec,
    ...overrides,
    scope: {
      ...spec.scope,
      ...overrides.scope,
    },
    time_range: {
      ...spec.time_range,
      ...overrides.time_range,
    },
  }
}

const buildPrompt = (input: TableSpecCompileInput) => {
  const intent = input.intent?.trim() ?? ""
  const profile = input.profile
    ? `Risk profile: ${input.profile.riskProfile ?? "unspecified"}\nHorizon: ${input.profile.horizon ?? "unspecified"}`
    : "Profile: not provided"

  const entitlementLines = input.entitlements
    ? [
        `Allowed row grains: ${input.entitlements.allowedRowGrains?.join(", ") ?? "project, asset, transaction"}`,
        `Allowed signals: ${input.entitlements.allowedSignals?.join(", ") ?? "not specified"}`,
        `Allowed filters: ${input.entitlements.allowedFilters?.join(", ") ?? "not specified"}`,
        `Allowed sorts: ${input.entitlements.allowedSorts?.join(", ") ?? "not specified"}`,
        `Max limit: ${input.entitlements.maxLimit ?? 500}`,
      ].join("\n")
    : "Entitlements: not provided"

  return `You are a data compiler for Entrestate. Convert the user intent into a strict TableSpec JSON object.

User intent: "${intent}"
${profile}
${entitlementLines}

Return JSON only. The JSON must match this shape:
{
  "version": "v1",
  "intent": "string",
  "row_grain": "project" | "asset" | "transaction",
  "scope": {"cities"?: string[], "areas"?: string[], "developers"?: string[], "projects"?: string[]},
  "time_grain": "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "lifecycle",
  "time_range": {"mode": "relative" | "absolute", "last"?: number, "unit"?: "days" | "months" | "years", "from"?: string, "to"?: string},
  "signals": string[],
  "filters": [{"field": string, "op": "eq" | "neq" | "lt" | "lte" | "gt" | "gte" | "in" | "contains", "value": string | number | boolean | (string|number)[]}],
  "sort"?: {"field": string, "direction": "asc" | "desc"},
  "limit"?: number
}

Rules:
- Do not emit SQL.
- Use only allowed row grains and allowed signals when provided.
- Choose a reasonable time_range when not specified.
- Keep signals concise and relevant to the intent.
- Return only JSON, no markdown or explanation.`
}

export const isTableSpecLlmEnabled = () => process.env.TABLESPEC_LLM_ENABLED === "true"

export async function compileTableSpecWithLLM(
  input: TableSpecCompileInput,
): Promise<TableSpecCompilation> {
  if (input.goldenPath) return compileTableSpec(input)

  const warnings: string[] = []
  if (!isTableSpecLlmEnabled()) {
    const fallback = compileTableSpec(input)
    return { ...fallback, warnings: ["llm_disabled", ...fallback.warnings] }
  }

  if (!input.intent) {
    const fallback = compileTableSpec(input)
    return { ...fallback, warnings: ["missing_intent", ...fallback.warnings] }
  }

  try {
    const prompt = buildPrompt(input)
    const { text } = await generateText({
      model: input.llm?.model ?? DEFAULT_MODEL,
      prompt,
      temperature: input.llm?.temperature ?? DEFAULT_TEMPERATURE,
      maxTokens: input.llm?.maxTokens ?? DEFAULT_MAX_TOKENS,
    })

    const candidate = extractJson(text)
    if (!Array.isArray(candidate.signals) || candidate.signals.length === 0) {
      throw new Error("llm_missing_signals")
    }

    const spec: TableSpec = {
      version: "v1",
      intent: candidate.intent ?? input.intent ?? "Untitled request",
      row_grain: candidate.row_grain ?? "project",
      scope: candidate.scope ?? {},
      time_grain: candidate.time_grain ?? "monthly",
      time_range: candidate.time_range ?? DEFAULT_TIME_RANGE,
      signals: candidate.signals,
      filters: candidate.filters ?? [],
      sort: candidate.sort,
      limit: candidate.limit,
    }

    const resolved = applyOverrides(spec, input.overrides)
    const parsed = tableSpecSchema.parse(resolved)
    const validated = enforceTableSpec(parsed, input.entitlements)

    return { spec: validated, warnings, source: "intent" }
  } catch (error) {
    warnings.push("llm_fallback")
    const fallback = compileTableSpec(input)
    return { ...fallback, warnings: [...warnings, ...fallback.warnings] }
  }
}
