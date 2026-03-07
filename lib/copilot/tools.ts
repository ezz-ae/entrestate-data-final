import { z } from "zod"

export const dealScreenerInputSchema = z
  .object({
    filters: z
      .object({
        area: z.string().trim().min(1).optional(),
        budget_max_aed: z.number().positive().optional(),
        beds_min: z.number().int().min(0).optional(),
        beds_max: z.number().int().min(0).optional(),
        golden_visa_required: z.boolean().optional(),
        timing_signal: z.enum(["BUY", "HOLD", "WAIT"]).optional(),
        stress_grade_min: z.enum(["A", "B", "C", "D"]).optional(),
        affordability_tier: z.string().trim().min(1).optional(),
      })
      .optional()
      .default({}),
    sort_by: z
      .enum(["engine_god_metric", "l1_canonical_price", "l1_canonical_yield", "l2_developer_reliability"])
      .default("engine_god_metric"),
    limit: z.number().int().min(1).max(50).default(10),
  })
  .strict()

export const priceRealityCheckInputSchema = z
  .object({
    project_name: z.string().trim().min(1),
  })
  .strict()

export const areaRiskBriefInputSchema = z
  .object({
    area_name: z.string().trim().min(1),
  })
  .strict()

export const developerDueDiligenceInputSchema = z
  .object({
    developer_name: z.string().trim().min(1),
  })
  .strict()

export const memoSectionSchema = z.enum(["price_reality", "area_risk", "developer", "stress_test"])

const DEFAULT_MEMO_SECTIONS = ["price_reality", "area_risk", "developer", "stress_test"] as const

export const generateInvestorMemoInputSchema = z
  .object({
    project_name: z.string().trim().min(1),
    sections: z.array(memoSectionSchema).min(1).optional().default([...DEFAULT_MEMO_SECTIONS]),
  })
  .strict()

export const compareProjectsInputSchema = z
  .object({
    project_names: z.array(z.string().trim().min(1)).min(2).max(3),
  })
  .strict()

export const applyDecisionLensInputSchema = z
  .object({
    lens: z.enum(["CONSERVATIVE", "BALANCED", "YIELD_MAXIMIZER"]),
  })
  .strict()

export const listMarketEntitiesInputSchema = z
  .object({
    type: z.enum(["AREA", "DEVELOPER"]),
    query: z.string().trim().min(1).optional(),
    limit: z.number().int().min(1).max(50).default(20),
  })
  .strict()

export const generateDecisionObjectInputSchema = z
  .object({
    type: z.enum(["PDF_REPORT", "PPTX_DECK", "HTML_WIDGET"]),
    project_name: z.string().trim().min(1),
    title: z.string().trim().optional(),
  })
  .strict()

export const generateStrategicReportInputSchema = z
  .object({
    intent: z.string().trim().min(1),
    focus_areas: z.array(z.string()).optional(),
  })
  .strict()

export const generateInvestmentRoadmapInputSchema = z
  .object({
    initial_capital_aed: z.number().positive(),
    target_horizon_years: z.number().int().min(1).max(25).default(10),
  })
  .strict()

export const monitorMarketSegmentsInputSchema = z
  .object({
    areas: z.array(z.string()).min(1),
    alert_threshold_yield: z.number().optional().default(6.5),
  })
  .strict()

export const copilotToolSchemas = {
  deal_screener: dealScreenerInputSchema,
  price_reality_check: priceRealityCheckInputSchema,
  area_risk_brief: areaRiskBriefInputSchema,
  developer_due_diligence: developerDueDiligenceInputSchema,
  generate_investor_memo: generateInvestorMemoInputSchema,
  compare_projects: compareProjectsInputSchema,
  apply_decision_lens: applyDecisionLensInputSchema,
  list_market_entities: listMarketEntitiesInputSchema,
  generate_decision_object: generateDecisionObjectInputSchema,
  generate_strategic_report: generateStrategicReportInputSchema,
  generate_investment_roadmap: generateInvestmentRoadmapInputSchema,
  monitor_market_segments: monitorMarketSegmentsInputSchema,
} as const

export type DealScreenerInput = z.infer<typeof dealScreenerInputSchema>
export type PriceRealityCheckInput = z.infer<typeof priceRealityCheckInputSchema>
export type AreaRiskBriefInput = z.infer<typeof areaRiskBriefInputSchema>
export type DeveloperDueDiligenceInput = z.infer<typeof developerDueDiligenceInputSchema>
export type GenerateInvestorMemoInput = z.infer<typeof generateInvestorMemoInputSchema>
export type CompareProjectsInput = z.infer<typeof compareProjectsInputSchema>
export type ApplyDecisionLensInput = z.infer<typeof applyDecisionLensInputSchema>
export type ListMarketEntitiesInput = z.infer<typeof listMarketEntitiesInputSchema>
export type GenerateDecisionObjectInput = z.infer<typeof generateDecisionObjectInputSchema>
export type GenerateStrategicReportInput = z.infer<typeof generateStrategicReportInputSchema>
export type GenerateInvestmentRoadmapInput = z.infer<typeof generateInvestmentRoadmapInputSchema>
export type MonitorMarketSegmentsInput = z.infer<typeof monitorMarketSegmentsInputSchema>
export type MemoSection = z.infer<typeof memoSectionSchema>

export const copilotSystemPrompt = `You are the Entrestate Decision Copilot — an expert real estate investment partner focused on the UAE (especially Dubai) property market.
Your goal is to guide users through the "Decision Tunnel": Intent → Evidence → Judgment → Action.

CONVERSATIONAL BEHAVIOR:
- You are a conversational partner first, a data tool second. Greet users warmly, ask clarifying questions, and have natural dialogue.
- For greetings, small talk, clarifications, or follow-up questions — just respond naturally. No need to call a tool for every message.
- When the user asks something that requires market data, analysis, or a specific lookup — THEN call the right tool(s).
- Remember context from earlier messages. If you already fetched data, reference it instead of re-fetching unless the user asks for updated results.
- Ask follow-up questions to understand user intent before diving into analysis (e.g., "What's your budget range?" or "Are you looking for rental yield or capital growth?").

DECISION TUNNEL STAGES:
1. INTENT: Extract parameters (Budget, Area, Unit, Strategy) from user goals through natural conversation.
2. EVIDENCE: Call tools to get raw data. Quote "Evidence Drawer" fields (sources, exclusions, assumptions).
3. JUDGMENT: Ask user for their "Decision Lens" (Conservative, Balanced, Yield Maximizer) or apply if known from profile.
4. ACTION: Propose generating a Decision Object (PDF, Deck, Memo).

ENTERPRISE CAPABILITIES:
- If user is Institutional, use "Strategic AI" tools for Roadmaps and Market Monitoring.
- Reference the user's specific strategic profile (Risk/Yield biases) when giving advice.

USER PROFILE CONTEXT:
{USER_PROFILE_CONTEXT}

RULES:
1. NEVER invent numbers. Only quote from tool outputs.
2. If confidence is LOW, say so explicitly: "This project has LOW data confidence (source coverage: X%)"
3. Always show data freshness: "Data as of: [timestamp]"
4. If a tool returns no results, say "No matching projects found" — don't fabricate.
5. For data-driven answers, include: source (which tool), confidence level, what would change the conclusion.
6. When comparing projects, use compare_projects to ensure consistency.
7. For price questions, always mention the price source and whether it's verified.
8. Refuse legal/financial guarantees but still provide analysis.
9. For memo requests, call generate_investor_memo using all sections by default unless user narrows scope.
10. Explicitly mention "Exclusion Policy" when tools report filtered rows (distress sales, etc).

PERSONALITY:
- Act as a senior investment partner, not a robot. Be warm, professional, and insightful.
- Explain *why* the data matters. Don't just list numbers; connect the dots (e.g., "The yield is high, but the supply pressure suggests...").
- Use natural, conversational language. Avoid stiff phrases like "The data shows...". Instead use "I'm seeing..." or "It looks like...".
- Be proactive. If you see a risk, flag it gently but clearly.
- End complex analyses with a helpful next step: "Should we draft a PDF report for your partners?" or "Would you like to stress-test this against a different scenario?"
- Keep responses concise but thorough. Use bullet points for comparisons. Use paragraphs for narrative analysis.`

export const copilotToolDescriptions = {
  deal_screener: "Find and rank project candidates using deterministic market filters.",
  price_reality_check: "Compare listing price versus market transaction reality for a specific project.",
  area_risk_brief: "Analyze area-level risk and opportunity using aggregate market metrics.",
  developer_due_diligence: "Score and summarize a developer's reliability and portfolio quality.",
  generate_investor_memo:
    "Create a structured investment memo by combining project price reality, area risk, developer diligence, and stress test; if sections are omitted, use all sections.",
  compare_projects: "Side-by-side comparison of up to 3 projects using core L1-L4 metrics.",
  apply_decision_lens: "Set the evaluation profile: CONSERVATIVE (safety), BALANCED (mid-risk), or YIELD_MAXIMIZER (high ROI).",
  list_market_entities: "Discover available areas or developers matching a query.",
  generate_decision_object: "Create a downloadable PDF report, PPTX deck, or HTML widget for a project.",
  generate_strategic_report: "Create a deep market summary through the user's risk/yield lens.",
  generate_investment_roadmap: "Create a 5-25 year asset allocation plan based on capital and horizon.",
  monitor_market_segments: "Set up proactive monitoring for specific areas based on yield thresholds.",
} as const
