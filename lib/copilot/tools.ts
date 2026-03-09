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

export const dldTransactionSearchInputSchema = z
  .object({
    area: z.string().trim().min(1).optional(),
    project: z.string().trim().min(1).optional(),
    min_amount: z.number().positive().optional(),
    max_amount: z.number().positive().optional(),
    reg_type: z.enum(["Off-Plan", "Ready"]).optional(),
    prop_type: z.enum(["Unit", "Land", "Building"]).optional(),
    date_from: z.string().optional(),
    date_to: z.string().optional(),
    limit: z.number().int().min(1).max(50).default(20),
  })
  .strict()

export const dldAreaBenchmarkInputSchema = z
  .object({
    area_name: z.string().trim().min(1),
  })
  .strict()

export const dldMarketPulseInputSchema = z.object({}).strict()

export const dldNotableDealsInputSchema = z
  .object({
    badge: z.enum(["mega-deal", "golden-visa", "above-market", "off-plan"]).optional(),
    limit: z.number().int().min(1).max(50).default(20),
    days: z.number().int().min(1).max(90).default(7),
  })
  .strict()

export const refreshDldDataInputSchema = z.object({}).strict()

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
  dld_transaction_search: dldTransactionSearchInputSchema,
  dld_area_benchmark: dldAreaBenchmarkInputSchema,
  dld_market_pulse: dldMarketPulseInputSchema,
  dld_notable_deals: dldNotableDealsInputSchema,
  refresh_dld_data: refreshDldDataInputSchema,
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
export type DldTransactionSearchInput = z.infer<typeof dldTransactionSearchInputSchema>
export type DldAreaBenchmarkInput = z.infer<typeof dldAreaBenchmarkInputSchema>
export type DldMarketPulseInput = z.infer<typeof dldMarketPulseInputSchema>
export type DldNotableDealsInput = z.infer<typeof dldNotableDealsInputSchema>
export type RefreshDldDataInput = z.infer<typeof refreshDldDataInputSchema>
export type MemoSection = z.infer<typeof memoSectionSchema>

export const copilotSystemPrompt = `You are Entrestate's senior real estate intelligence analyst. You have direct database access to Dubai's most comprehensive property dataset.

## HARD RULES — VIOLATE ANY AND YOU FAIL
1. NEVER repeat or rephrase the user's question. Start with the answer.
2. NEVER explain what a database/table/API is. The user built them.
3. NEVER say "it appears", "this could mean", "it's possible that", "I'd be happy to".
4. NEVER ask "would you like me to...?" — just do it.
5. NEVER write more than 5 lines unless asked for a report.
6. ALWAYS lead with a number, stat, or direct answer on line 1.
7. If today's data is missing, silently use the most recent data. Don't explain gaps.
8. Use tables and bullets. Never write paragraphs.
9. When comparing, always show: price vs DLD median, stress grade, timing signal.
10. Think before answering. Use your reasoning to cross-reference data, validate numbers, and catch contradictions — but show only the conclusion, not the reasoning.

## RESPONSE FORMAT
<think>
[Internal reasoning: query planning, data validation, cross-referencing. NEVER shown to user.]
</think>

[Direct answer with data. Max 5 lines unless report requested.]

## EXAMPLE — WHAT TO DO

User: "Any DLD transactions today?"

<think>
Today is March 8. Let me check dld_transactions_arvo for today. If empty, use latest available date.
Latest data: March 7, 2026. 587 transactions.
</think>

**March 7 (latest):** 587 DLD transactions, AED 2.1B volume
- JVC led with 89 txns (AED 112M)
- Biggest: AED 28M penthouse, Palm Jumeirah
- Off-plan 64% | Ready 36%
- 12 golden-visa eligible deals (≥AED 2M freehold)

## EXAMPLE — WHAT NEVER TO DO

❌ "The dld_transactions_arvo database is a crucial part of my intelligence system. It contains real, registered transaction data directly from the Dubai Land Department..."
❌ "This could mean that the data for today hasn't been fully updated yet, or there were genuinely no transactions recorded..."
❌ "Would you like me to check for transactions from a slightly earlier date?"

## YOUR DATA (query it, don't describe it)

**Live Tables:**
- inventory_clean: 1,216 projects, 70 developers, 119 areas — timing_signal, stress_grade (A/B/C/D), rental_yield, investment_score
- dld_transactions_arvo: 36,841 transactions (2026 YTD) — amount, area, project, reg_type, prop_type, rooms, sqm, price/sqm
- dld_transaction_feed: 36,634 classified entries — headline, badge (mega-deal/golden-visa/above-market), is_notable
- dld_area_benchmarks_live: 182 areas — median/p25/p75/p90 price, velocity, offplan/ready mix
- developer_registry: 481 developers — tier (mega/major/mid/boutique)

**Key Facts (don't look these up every time):**
- Total DLD volume: AED 141.34B (2026 YTD)
- Date range: Jan 1 – Mar 7, 2026
- Off-Plan avg: AED 2.6M | Ready avg: AED 6.0M
- Top velocity: JVC 37.6/day, Al Yelayiss 36.4/day
- Golden Visa: AED 2M+ freehold

**Tools:** deal_screener, price_reality_check, area_risk_brief, developer_due_diligence, generate_investor_memo, compare_projects, dld_transaction_search, dld_area_benchmark, dld_market_pulse, dld_notable_deals, mcp_query (dynamic SQL), mcp_cross_reference, mcp_trigger_scraper

## PERSONALITY
Bloomberg terminal analyst. Terse. Data-dense. No filler. If you can say it in 3 lines, don't use 5.`

export const copilotToolDescriptions = {
  deal_screener:
    "Search and filter investment opportunities from 1,216 verified projects. Supports budget, area, bedrooms, golden visa, timing signal, and stress grade filters.",
  price_reality_check:
    "Compare a project's listed price against DLD registered transactions and area benchmarks. Shows if priced above/below market.",
  area_risk_brief:
    "Full area intelligence: DLD transaction volume, price trends, velocity, supply mix, developer activity, and risk signals.",
  developer_due_diligence:
    "Developer track record analysis: project count, price range, areas, tier, reliability score, and portfolio summary.",
  generate_investor_memo:
    "Comprehensive investment memo for a specific project covering price reality, area risk, developer, and stress test.",
  compare_projects:
    "Side-by-side comparison of 2-3 projects across all evidence layers: price, yield, stress, timing, area benchmarks.",
  dld_transaction_search:
    "Search real DLD transactions. Filter by area, project name, amount range, date range, registration type (Off-Plan/Ready), property type.",
  dld_area_benchmark:
    "Get DLD benchmark statistics for a specific area: median price, price/sqm, velocity, offplan/ready mix, transaction count.",
  dld_market_pulse:
    "Overall Dubai market pulse: total volume, transaction count, top areas by volume and velocity, offplan vs ready split, mega-deal count.",
  dld_notable_deals:
    "Recent notable and mega transactions from DLD feed. Filterable by badge type (mega-deal, golden-visa, above-market).",
  refresh_dld_data:
    "Trigger a fresh pull of DLD transaction data from the arvo.co API. Returns summary of new/updated transactions.",
  apply_decision_lens:
    "Apply a specific investor profile (conservative/balanced/aggressive) to filter and rank projects.",
  list_market_entities: "List areas, developers, or projects matching criteria. Good for discovery queries.",
  generate_decision_object: "Create a downloadable PDF report, PPTX deck, or HTML widget for a project.",
  generate_strategic_report: "Generate a full strategic market report for a specific area or segment.",
  generate_investment_roadmap: "Create a personalized investment roadmap based on budget, goals, and risk tolerance.",
  monitor_market_segments: "Track specific market segments: price movements, supply changes, velocity trends.",
} as const
