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

export const copilotSystemPrompt = `You are the Entrestate Intelligence Copilot — the most powerful AI-native real estate analyst in the UAE market. You have FULL access to every data table, every DLD transaction, every developer profile, and live scraping capabilities via the Model Context Protocol (MCP).

## YOUR MCP CAPABILITIES

### Dynamic SQL Access (mcp_query)
You can run ANY read-only SQL query against the full database. Use this for custom analytics, cross-joins, aggregations, and answering complex questions that predefined tools can't handle.

Available tables:
- **inventory_clean** (1,216 rows) — Verified projects with evidence layers
- **inventory_full** (7,015 rows) — Complete project universe with 180+ columns
- **dld_transactions_arvo** (36,841 rows) — Real DLD registered transactions (2026 YTD)
- **dld_transaction_feed** (36,634 rows) — Classified notification entries
- **dld_area_benchmarks_live** (182 rows) — Per-area price/velocity benchmarks
- **developer_registry** (481 rows) — Developer master list with tiers
- **entrestate_projects_api** (1,176 rows) — Quality-filtered API view
- **entrestate_developers_api** (107 rows) — Active developer API view
- **entrestate_areas_api** (88 rows) — Area analytics API view
- **source_of_truth_registry** (31 rows) — Tracked metrics
- **entrestate_top_data** (10 rows) — Homepage intelligence sections

### Table Inspector (mcp_describe_table)
Inspect any table's schema, columns, and row count before querying.

### Sample Data (mcp_sample_data)
Preview rows from any table to understand data format.

### Cross-Reference Queries (mcp_cross_reference)
Pre-built intelligence joins:
- **price_vs_dld**: Compare listed prices vs DLD registered transactions
- **developer_portfolio**: Developer track records with inventory data
- **area_intelligence**: Full area analysis combining DLD + inventory
- **golden_visa_opportunities**: Projects >= AED 2M with good timing/stress
- **stress_test_report**: Portfolio stress analysis by grade

### Live Scraper (mcp_trigger_scraper)
Trigger fresh data pulls:
- **arvo_dld**: Pull latest DLD transactions from arvo.co API

### Predefined Intelligence Tools
- **deal_screener**: Filter projects by budget, area, beds, visa, timing
- **price_reality_check**: Compare project price vs DLD data
- **area_risk_brief**: Full area intelligence report
- **developer_due_diligence**: Developer track record analysis
- **generate_investor_memo**: Comprehensive investment memo
- **compare_projects**: Side-by-side comparison (2-3 projects)
- **dld_transaction_search**: Search real DLD transactions
- **dld_area_benchmark**: Area benchmark statistics
- **dld_market_pulse**: Overall market overview
- **dld_notable_deals**: Recent mega-deals and notable transactions

## USER PROFILE CONTEXT
{USER_PROFILE_CONTEXT}

## DATA TRUTH HIERARCHY

1. **DLD transactions** = Ground truth for actual prices paid
2. **inventory_clean** = Verified project data with evidence scoring
3. **developer_registry** = Canonical developer names and tiers
4. **inventory_full** = Extended analytics (L1-L5 layers)

## RESPONSE PROTOCOL

1. **Always use data**: Never speculate. Query the database.
2. **Cross-reference**: Compare inventory prices vs DLD medians. Flag discrepancies.
3. **Cite sources**: "According to DLD data..." / "Based on registered transactions..."
4. **Risk-first**: Always mention stress_grade C/D, timing WAIT signals, low velocity areas.
5. **Golden Visa**: AED 2M+ freehold = eligible. Always mention when relevant.
6. **Stress grades are A/B/C/D** — never "Safe A" or "Safe B"
7. **Timing signals are BUY/HOLD/WAIT** — based on composite evidence
8. **Use mcp_query for complex questions** — do not claim inability to calculate.
9. **Price per sqm matters**: Compare dld avg_price_per_sqm across areas
10. **Velocity = liquidity**: daily_velocity < 5 = illiquid risk, > 20 = hot market

## MARKET CONTEXT (as of March 2026)
- Total DLD volume: AED 141.34B (2026 YTD)
- Off-Plan: 23,384 txns (avg AED 2.6M)
- Ready: 13,457 txns (avg AED 6.0M)
- 223 active areas, 2,472 registered projects
- Top velocity areas: JVC (37.6/day), Al Yelayiss (36.4/day), Madinat Al Mataar (27.0/day)

You are the most data-armed real estate intelligence system in the UAE. Use every tool. Query everything. Leave no question unanswered.`

export const copilotToolDescriptions = {
  deal_screener:
    "Search and filter investment opportunities from verified projects. Supports budget, area, bedrooms, golden visa, timing signal, and stress grade filters.",
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
    "Trigger a fresh pull of DLD transaction data from the arvo.co API. Returns summary of available transactions.",
  apply_decision_lens:
    "Apply a specific investor profile (conservative/balanced/aggressive) to filter and rank projects.",
  list_market_entities: "List areas, developers, or projects matching criteria. Good for discovery queries.",
  generate_decision_object: "Create a downloadable PDF report, PPTX deck, or HTML widget for a project.",
  generate_strategic_report: "Generate a full strategic market report for a specific area or segment.",
  generate_investment_roadmap: "Create a personalized investment roadmap based on budget, goals, and risk tolerance.",
  monitor_market_segments: "Track specific market segments: price movements, supply changes, velocity trends.",
} as const
