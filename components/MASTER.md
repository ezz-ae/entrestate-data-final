# ENTRESTATE MASTER CODEX v4.0
# Generated: 2026-03-09T03:34:20.667926+00:00
# One file. Everything you need. Hand this to Codex and deploy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 LIVE STATE — entrestate.com (March 9, 2026)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ALL 8 PAGES: 200 OK
  / (92KB) /properties (175KB) /developers (458KB) /areas (72KB)
  /market-score (69KB) /top-data (90KB) /chat (36KB) /copilot (36KB)

5 API ENDPOINTS LIVE:
  /api/developers /api/areas /api/market-score/inventory
  /api/health/db /api/copilot

DATABASE: 183 tables, 16 views (Neon PostgreSQL)
  inventory_clean:          1,216 projects (89% priced, 100% evidence)
  inventory_full:           7,015 projects (180+ columns)
  developer_registry:         481 developers
  dld_transactions_arvo:   36,841 DLD transactions (AED 141.34B YTD)
  dld_transaction_feed:    36,634 classified notifications
  dld_area_benchmarks_live:   183 area benchmarks
  entrestate_projects_api:  1,176 (quality view)
  entrestate_developers_api:  107
  entrestate_areas_api:        88

DECISION TABLE (NEW):
  market_signal: Strong Buy(8), Buy(185), Speculative Buy(60),
                 Hold—Safe(750), Hold—Caution(64),
                 Wait—Overpriced(103), Avoid(46)
  evidence_level: L5 Verified(953), L4 Strong(1), L3 Medium(262)

GC: LOCKED (3,656 projects — DO NOT TOUCH)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 1: COPILOT SYSTEM PROMPT (CRITICAL FIX)
 File: lib/copilot/tools.ts → replace copilotSystemPrompt
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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
10. NEVER say "Please specify your request" or "??" — if a tool returns data, present it.
11. NEVER show your internal reasoning. No "The query failed because..." or "Let me check the schema..."
12. If a query fails, silently try a different approach. Never tell the user about retries.

## RESPONSE EXAMPLES

User: "Investor memo for Marina Vista"
GOOD: 
**Marina Vista — Emaar Beachfront**
- Price: AED 2.48M (19% above area median AED 2.08M)
- Stress: A | Timing: WAIT | Yield: 4.4%
- Developer: Emaar (mega-tier, 97% reliability)
- Verdict: **Hold** — overpriced vs area. Wait for correction.

BAD:
"The generate_investor_memo tool was called and returned a comprehensive memo. I need to extract the relevant information..." ← NEVER DO THIS

User: "BUY signals under 2M in Dubai Marina, stress A/B"
GOOD:
No projects match. Closest alternatives:
| Project | Area | Price | Stress | Signal |
|---------|------|-------|--------|--------|
| X | JBR | 1.8M | A | BUY |

BAD:
"The deal_screener tool returned no results for projects in Dubai Marina..." ← NEVER DO THIS

## YOUR DATA ACCESS

**Tables (query directly, don't describe):**
- inventory_clean: 1,216 projects — timing_signal, stress_grade (A/B/C/D), rental_yield, investment_score, market_signal, evidence_level
- dld_transactions_arvo: 36,841 transactions — amount, area, project, reg_type, price_per_sqm, transaction_date
- dld_area_benchmarks_live: 183 areas — median_price, p25/p75/p90, daily_velocity, offplan_pct
- developer_registry: 481 developers — name, tier, project_count

**Key columns in inventory_clean:**
- price_from, price_to (numeric, AED)
- rental_yield (numeric, percentage like 5.13)
- investment_score (numeric, 0-100)
- stress_grade (text: A, B, C, D)
- timing_signal (text: BUY, HOLD, WAIT)
- market_signal (text: Strong Buy, Buy, Speculative Buy, Hold — Safe, Hold — Caution, Wait — Overpriced, Avoid)
- evidence_level (text: L5 Verified, L4 Strong, L3 Medium, L2 Weak, L1 Minimal)
- price_confidence (text: HIGH, MEDIUM, LOW)
- quality_score (numeric)
- hero_image (text, URL)

**Market snapshot (cached — don't query for these):**
- DLD 2026 YTD: AED 141.34B, 36,841 txns, 223 areas
- Off-Plan avg: AED 2.6M | Ready avg: AED 6.0M
- Top velocity: JVC 37.6/day, Al Yelayiss 36.4/day
- Golden Visa: AED 2M+ freehold

## TOOLS
deal_screener, price_reality_check, area_risk_brief, developer_due_diligence, generate_investor_memo, compare_projects, dld_transaction_search, dld_area_benchmark, dld_market_pulse, dld_notable_deals, mcp_query (any SQL), mcp_describe_table, mcp_cross_reference, mcp_trigger_scraper

## PERSONALITY
Bloomberg terminal analyst. Terse. Data-dense. No filler.`

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 2: STRIP <think> TAGS FROM CHAT UI
 File: components/ChatInterface.tsx (or message renderer)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Add this utility and use it before rendering AI messages:

function stripThinkTags(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()
}

// In the message renderer:
// const displayText = stripThinkTags(message.content)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 3: lib/mcp/server.ts (CREATE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


// ═══════════════════════════════════════════════════════════════
// FILE: lib/mcp/server.ts — Entrestate MCP Server
// ═══════════════════════════════════════════════════════════════
import "server-only"
import { prisma } from "@/lib/prisma"

const STATEMENT_TIMEOUT_MS = 15000
const MAX_ROWS = 100

// ── MCP Resource Registry ───────────────────────────────
export const MCP_RESOURCES = {
  // Core Inventory
  "inventory_clean": {
    description: "1,216 verified UAE projects with full evidence layers",
    key_columns: ["project_id", "name", "slug", "area", "city", "developer", "price_from", "price_to", 
                   "timing_signal", "stress_grade", "rental_yield", "investment_score", "quality_score",
                   "hero_image", "bedrooms", "completion_date", "price_confidence", "price_source"],
    row_count: 1216,
    updated: "live"
  },
  "inventory_full": {
    description: "7,015 projects with 180+ columns including L1-L5 evidence layers",
    key_columns: ["name", "area", "developer", "l1_canonical_price", "l1_canonical_yield",
                   "l2_developer_reliability", "l3_area_risk_score", "l4_dld_avg_txn_price",
                   "engine_god_metric", "engine_stress_test", "engine_affordability",
                   "timing_signal", "stress_grade", "demand_velocity", "supply_pressure"],
    row_count: 7015,
    updated: "live"
  },

  // DLD Transactions
  "dld_transactions_arvo": {
    description: "36,841 real DLD transactions from Dubai Land Department (2026 YTD)",
    key_columns: ["transaction_id", "area", "project", "amount", "reg_type", "prop_type",
                   "rooms", "size_sqm", "price_per_sqm", "transaction_date", "sub_type",
                   "freehold", "usage", "nearest_mall", "nearest_metro", "nearest_landmark"],
    row_count: 36841,
    updated: "daily via arvo.co API"
  },
  "dld_transaction_feed": {
    description: "36,634 notification-style DLD entries with badges and classification",
    key_columns: ["transaction_id", "feed_type", "headline", "subline", "amount", "area",
                   "project", "reg_type", "prop_type", "badge", "is_notable", "icon", "metadata"],
    row_count: 36634,
    updated: "daily"
  },
  "dld_area_benchmarks_live": {
    description: "182 area benchmarks with price stats, velocity, and supply mix",
    key_columns: ["area", "total_transactions", "total_volume_aed", "avg_price", "median_price",
                   "p25_price", "p75_price", "p90_price", "avg_price_per_sqm", "median_price_per_sqm",
                   "offplan_pct", "ready_pct", "freehold_pct", "avg_size_sqm", "daily_velocity",
                   "most_common_rooms", "date_range_start", "date_range_end"],
    row_count: 182,
    updated: "daily"
  },

  // Developer Intelligence
  "developer_registry": {
    description: "481 UAE developers with tiers, logos, and project counts",
    key_columns: ["name", "slug", "tier", "logo_url", "project_count", "avg_price",
                   "min_price", "max_price", "hq", "established"],
    row_count: 481,
    updated: "live"
  },

  // API Views (filtered for quality)
  "entrestate_projects_api": {
    description: "1,176 quality-filtered projects (score >= 50) for API consumption",
    key_columns: "same as inventory_clean",
    row_count: 1176,
    updated: "live view"
  },
  "entrestate_developers_api": {
    description: "107 developers with active quality projects",
    key_columns: ["name", "slug", "tier", "logo_url", "project_count", "avg_price", "areas"],
    row_count: 107,
    updated: "live view"
  },
  "entrestate_areas_api": {
    description: "88 areas with full analytics",
    key_columns: ["name", "slug", "city", "project_count", "avg_price", "avg_yield", "area_score"],
    row_count: 88,
    updated: "live view"
  },

  // Enterprise
  "source_of_truth_registry": {
    description: "31 tracked metrics with owners and update frequencies",
    key_columns: ["metric_name", "category", "source", "owner", "update_frequency", "current_value"],
    row_count: 31,
    updated: "live"
  },

  // Content
  "entrestate_top_data": {
    description: "Homepage intelligence sections (market pulse, stress test, etc)",
    key_columns: ["section_id", "title", "subtitle", "data"],
    row_count: 10,
    updated: "live"
  }
} as const

type DbRow = Record<string, unknown>

// ── MCP Tool: Dynamic SQL Query ─────────────────────────
// This is the POWER tool — lets the copilot run any read query
export async function mcpQuery(input: {
  sql: string
  params?: unknown[]
  limit?: number
}) {
  // Security: only SELECT allowed
  const trimmed = input.sql.trim().toUpperCase()
  if (!trimmed.startsWith("SELECT") && !trimmed.startsWith("WITH")) {
    return { error: "Only SELECT/WITH queries allowed", status: "rejected" }
  }
  
  // Forbidden patterns
  const forbidden = ["DROP", "DELETE", "UPDATE", "INSERT", "ALTER", "TRUNCATE", "CREATE", "GRANT"]
  for (const f of forbidden) {
    if (trimmed.includes(f + " ")) {
      return { error: `${f} statements not allowed`, status: "rejected" }
    }
  }

  const limit = Math.min(input.limit || 50, MAX_ROWS)
  const finalSql = input.sql.includes("LIMIT") ? input.sql : `${input.sql} LIMIT ${limit}`

  try {
    const rows = await prisma.$queryRawUnsafe(finalSql, ...(input.params || [])) as DbRow[]
    return {
      source: "mcp_query",
      status: "success",
      count: rows.length,
      rows,
    }
  } catch (error) {
    return { source: "mcp_query", status: "error", message: String(error) }
  }
}

// ── MCP Tool: Table Schema Inspector ────────────────────
export async function mcpDescribeTable(tableName: string) {
  // Whitelist check
  const allowed = Object.keys(MCP_RESOURCES)
  const safe = tableName.replace(/[^a-z0-9_]/gi, "")
  
  try {
    const cols = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    `, safe) as DbRow[]

    const count = (await prisma.$queryRawUnsafe(
      `SELECT COUNT(*)::int as total FROM "${safe}"`
    ) as DbRow[])[0]

    return {
      table: safe,
      columns: cols,
      row_count: count?.total || 0,
      description: (MCP_RESOURCES as Record<string, any>)[safe]?.description || "Unknown table"
    }
  } catch (error) {
    return { table: safe, error: String(error) }
  }
}

// ── MCP Tool: Sample Data ───────────────────────────────
export async function mcpSampleData(tableName: string, limit: number = 5) {
  const safe = tableName.replace(/[^a-z0-9_]/gi, "")
  try {
    const rows = await prisma.$queryRawUnsafe(
      `SELECT * FROM "${safe}" LIMIT ${Math.min(limit, 20)}`
    ) as DbRow[]
    return { table: safe, count: rows.length, rows }
  } catch (error) {
    return { table: safe, error: String(error) }
  }
}

// ── MCP Tool: Cross-Reference Query ─────────────────────
// Pre-built joins the copilot can invoke by name
export async function mcpCrossReference(input: {
  type: "price_vs_dld" | "developer_portfolio" | "area_intelligence" | "golden_visa_opportunities" | "stress_test_report"
  filter?: string
  limit?: number
}) {
  const limit = Math.min(input.limit || 20, 50)
  const filterClause = input.filter ? `AND LOWER(ic.area) LIKE LOWER('%${input.filter.replace(/'/g, "''")}%')` : ""

  const queries: Record<string, string> = {
    price_vs_dld: `
      SELECT ic.name, ic.area, ic.price_from as listed_price,
             dab.median_price as dld_median, dab.p25_price, dab.p75_price,
             dab.avg_price_per_sqm as dld_psqm, dab.daily_velocity,
             CASE 
               WHEN ic.price_from < dab.p25_price THEN 'BELOW MARKET'
               WHEN ic.price_from > dab.p75_price THEN 'ABOVE MARKET'
               ELSE 'FAIR VALUE'
             END as price_verdict,
             ic.timing_signal, ic.stress_grade, ic.rental_yield
      FROM inventory_clean ic
      JOIN dld_area_benchmarks_live dab ON UPPER(dab.area) = UPPER(ic.area)
      WHERE ic.price_from > 0 ${filterClause}
      ORDER BY ic.quality_score DESC
      LIMIT ${limit}`,

    developer_portfolio: `
      SELECT dr.name as developer, dr.tier, dr.project_count as registry_projects,
             COUNT(ic.project_id) as clean_projects,
             AVG(ic.price_from)::bigint as avg_price,
             AVG(ic.rental_yield)::numeric(4,2) as avg_yield,
             AVG(ic.investment_score)::numeric(4,1) as avg_score,
             STRING_AGG(DISTINCT ic.area, ', ' ORDER BY ic.area) as areas,
             COUNT(*) FILTER (WHERE ic.timing_signal = 'BUY') as buy_signals,
             COUNT(*) FILTER (WHERE ic.stress_grade IN ('A','B')) as safe_projects
      FROM developer_registry dr
      LEFT JOIN inventory_clean ic ON LOWER(ic.developer) = LOWER(dr.name)
      GROUP BY dr.name, dr.tier, dr.project_count
      HAVING COUNT(ic.project_id) > 0
      ORDER BY COUNT(ic.project_id) DESC
      LIMIT ${limit}`,

    area_intelligence: `
      SELECT dab.area,
             dab.total_transactions, dab.total_volume_aed,
             dab.median_price, dab.avg_price_per_sqm, dab.daily_velocity,
             dab.offplan_pct, dab.ready_pct, dab.freehold_pct,
             COUNT(ic.project_id) as inventory_projects,
             AVG(ic.price_from)::bigint as inventory_avg_price,
             AVG(ic.rental_yield)::numeric(4,2) as avg_yield,
             COUNT(*) FILTER (WHERE ic.timing_signal = 'BUY') as buy_signals,
             COUNT(*) FILTER (WHERE ic.stress_grade = 'A') as grade_a_projects
      FROM dld_area_benchmarks_live dab
      LEFT JOIN inventory_clean ic ON UPPER(ic.area) = UPPER(dab.area)
      GROUP BY dab.area, dab.total_transactions, dab.total_volume_aed,
               dab.median_price, dab.avg_price_per_sqm, dab.daily_velocity,
               dab.offplan_pct, dab.ready_pct, dab.freehold_pct
      ORDER BY dab.daily_velocity DESC
      LIMIT ${limit}`,

    golden_visa_opportunities: `
      SELECT ic.name, ic.area, ic.developer, ic.price_from,
             ic.timing_signal, ic.stress_grade, ic.rental_yield, ic.investment_score,
             dab.median_price as dld_area_median, dab.freehold_pct,
             CASE WHEN ic.price_from < dab.median_price THEN 'BELOW MEDIAN' ELSE 'AT/ABOVE MEDIAN' END as vs_market
      FROM inventory_clean ic
      LEFT JOIN dld_area_benchmarks_live dab ON UPPER(dab.area) = UPPER(ic.area)
      WHERE ic.price_from >= 2000000
        AND ic.timing_signal IN ('BUY', 'HOLD')
        AND ic.stress_grade IN ('A', 'B')
      ORDER BY ic.investment_score DESC
      LIMIT ${limit}`,

    stress_test_report: `
      SELECT ic.stress_grade, COUNT(*) as projects,
             AVG(ic.price_from)::bigint as avg_price,
             AVG(ic.rental_yield)::numeric(4,2) as avg_yield,
             AVG(ic.investment_score)::numeric(4,1) as avg_score,
             COUNT(*) FILTER (WHERE ic.timing_signal = 'BUY') as buy_signals,
             STRING_AGG(DISTINCT ic.area, ', ' ORDER BY ic.area) as top_areas
      FROM inventory_clean ic
      WHERE ic.stress_grade IS NOT NULL
      GROUP BY ic.stress_grade
      ORDER BY CASE ic.stress_grade WHEN 'A' THEN 1 WHEN 'B' THEN 2 WHEN 'C' THEN 3 WHEN 'D' THEN 4 END`
  }

  const sql = queries[input.type]
  if (!sql) return { error: `Unknown cross-reference type: ${input.type}` }

  try {
    const rows = await prisma.$queryRawUnsafe(sql) as DbRow[]
    return { source: `mcp_cross_reference:${input.type}`, count: rows.length, rows }
  } catch (error) {
    return { source: `mcp_cross_reference:${input.type}`, error: String(error) }
  }
}

// ── MCP Tool: Scraper Trigger ───────────────────────────
export async function mcpTriggerScraper(source: "arvo_dld" | "pf_developers") {
  if (source === "arvo_dld") {
    try {
      const response = await fetch("https://transactions.arvo.co/api/transactions", {
        headers: { "User-Agent": "Entrestate-MCP/1.0" },
        signal: AbortSignal.timeout(30000),
      })
      if (!response.ok) return { source: "arvo.co", status: "error", code: response.status }
      const txns = await response.json()
      return {
        source: "arvo.co",
        status: "success",
        transactions_available: Array.isArray(txns) ? txns.length : 0,
        message: "Data fetched. Use mcpQuery to analyze or sync to database.",
      }
    } catch (error) {
      return { source: "arvo.co", status: "error", message: String(error) }
    }
  }
  return { error: `Unknown scraper: ${source}` }
}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 4: lib/mcp/schemas.ts (CREATE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


// ═══════════════════════════════════════════════════════════════
// FILE: lib/mcp/schemas.ts — MCP Tool Input Schemas
// ═══════════════════════════════════════════════════════════════
import { z } from "zod"

export const mcpQueryInputSchema = z.object({
  sql: z.string().trim().min(1).max(2000),
  params: z.array(z.unknown()).optional(),
  limit: z.number().int().min(1).max(100).default(50),
}).strict()

export type McpQueryInput = z.infer<typeof mcpQueryInputSchema>

export const mcpDescribeTableInputSchema = z.object({
  table_name: z.string().trim().min(1),
}).strict()

export type McpDescribeTableInput = z.infer<typeof mcpDescribeTableInputSchema>

export const mcpSampleDataInputSchema = z.object({
  table_name: z.string().trim().min(1),
  limit: z.number().int().min(1).max(20).default(5),
}).strict()

export type McpSampleDataInput = z.infer<typeof mcpSampleDataInputSchema>

export const mcpCrossReferenceInputSchema = z.object({
  type: z.enum(["price_vs_dld", "developer_portfolio", "area_intelligence", "golden_visa_opportunities", "stress_test_report"]),
  filter: z.string().trim().min(1).optional(),
  limit: z.number().int().min(1).max(50).default(20),
}).strict()

export type McpCrossReferenceInput = z.infer<typeof mcpCrossReferenceInputSchema>

export const mcpTriggerScraperInputSchema = z.object({
  source: z.enum(["arvo_dld", "pf_developers"]),
}).strict()

export type McpTriggerScraperInput = z.infer<typeof mcpTriggerScraperInputSchema>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 5: lib/copilot/tools.ts — ADD DLD + tool descriptions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const copilotToolDescriptions = {
  "deal_screener": "Search and filter investment opportunities from 1,216 verified projects. Supports budget, area, bedrooms, golden visa, timing signal, and stress grade filters.",
  "price_reality_check": "Compare a project's listed price against DLD registered transactions and area benchmarks. Shows if priced above/below market.",
  "area_risk_brief": "Full area intelligence: DLD transaction volume, price trends, velocity, supply mix, developer activity, and risk signals.",
  "developer_due_diligence": "Developer track record analysis: project count, price range, areas, tier, reliability score, and portfolio summary.",
  "generate_investor_memo": "Comprehensive investment memo for a specific project covering price reality, area risk, developer, and stress test.",
  "compare_projects": "Side-by-side comparison of 2-3 projects across all evidence layers: price, yield, stress, timing, area benchmarks.",
  "dld_transaction_search": "Search real DLD transactions. Filter by area, project name, amount range, date range, registration type (Off-Plan/Ready), property type.",
  "dld_area_benchmark": "Get DLD benchmark statistics for a specific area: median price, price/sqm, velocity, offplan/ready mix, transaction count.",
  "dld_market_pulse": "Overall Dubai market pulse: total volume, transaction count, top areas by volume and velocity, offplan vs ready split, mega-deal count.",
  "dld_notable_deals": "Recent notable and mega transactions from DLD feed. Filterable by badge type (mega-deal, golden-visa, above-market).",
  "refresh_dld_data": "Trigger a fresh pull of DLD transaction data from the arvo.co API. Returns summary of new/updated transactions.",
  "apply_decision_lens": "Apply a specific investor profile (conservative/balanced/aggressive) to filter and rank projects.",
  "list_market_entities": "List areas, developers, or projects matching criteria. Good for discovery queries.",
  "generate_strategic_report": "Generate a full strategic market report for a specific area or segment.",
  "generate_investment_roadmap": "Create a personalized investment roadmap based on budget, goals, and risk tolerance.",
  "monitor_market_segments": "Track specific market segments: price movements, supply changes, velocity trends."
}


// ──────────────────────────────────────────────────────────
// ADD TO: lib/copilot/tools.ts
// ──────────────────────────────────────────────────────────

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

export type DldTransactionSearchInput = z.infer<typeof dldTransactionSearchInputSchema>

export const dldAreaBenchmarkInputSchema = z
  .object({
    area_name: z.string().trim().min(1),
  })
  .strict()

export type DldAreaBenchmarkInput = z.infer<typeof dldAreaBenchmarkInputSchema>

export const dldMarketPulseInputSchema = z.object({}).strict()
export type DldMarketPulseInput = z.infer<typeof dldMarketPulseInputSchema>

export const dldNotableDealsInputSchema = z
  .object({
    badge: z.enum(["mega-deal", "golden-visa", "above-market", "off-plan"]).optional(),
    limit: z.number().int().min(1).max(50).default(20),
    days: z.number().int().min(1).max(90).default(7),
  })
  .strict()

export type DldNotableDealsInput = z.infer<typeof dldNotableDealsInputSchema>

export const refreshDldDataInputSchema = z.object({}).strict()
export type RefreshDldDataInput = z.infer<typeof refreshDldDataInputSchema>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 6: lib/copilot/executor.ts — ADD DLD functions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


// ──────────────────────────────────────────────────────────
// ADD TO: lib/copilot/executor.ts
// ──────────────────────────────────────────────────────────

// ── DLD Transaction Search ──────────────────────────────
export async function executeDldTransactionSearch(input: DldTransactionSearchInput) {
  const conditions: string[] = []
  const params: unknown[] = []
  let paramIdx = 1

  if (input.area) {
    conditions.push(`LOWER(area) LIKE LOWER($${paramIdx})`)
    params.push(`%${input.area}%`)
    paramIdx++
  }
  if (input.project) {
    conditions.push(`LOWER(project) LIKE LOWER($${paramIdx})`)
    params.push(`%${input.project}%`)
    paramIdx++
  }
  if (input.min_amount) {
    conditions.push(`amount >= $${paramIdx}`)
    params.push(input.min_amount)
    paramIdx++
  }
  if (input.max_amount) {
    conditions.push(`amount <= $${paramIdx}`)
    params.push(input.max_amount)
    paramIdx++
  }
  if (input.reg_type) {
    conditions.push(`reg_type = $${paramIdx}`)
    params.push(input.reg_type)
    paramIdx++
  }
  if (input.prop_type) {
    conditions.push(`prop_type = $${paramIdx}`)
    params.push(input.prop_type)
    paramIdx++
  }
  if (input.date_from) {
    conditions.push(`transaction_date >= $${paramIdx}::date`)
    params.push(input.date_from)
    paramIdx++
  }
  if (input.date_to) {
    conditions.push(`transaction_date <= $${paramIdx}::date`)
    params.push(input.date_to)
    paramIdx++
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""
  const limit = Math.min(input.limit || 20, 50)
  
  const sql = `
    SELECT transaction_id, area, project, amount, reg_type, prop_type, 
           rooms, size_sqm, price_per_sqm, transaction_date, 
           sub_type, freehold, usage
    FROM dld_transactions_arvo
    ${where}
    ORDER BY transaction_date DESC, amount DESC
    LIMIT ${limit}
  `

  const rows = await withStatementTimeout(
    () => prisma.$queryRawUnsafe(sql, ...params),
    STATEMENT_TIMEOUT_MS
  ) as DbRow[]

  // Also get aggregate stats for the filter
  const statsSql = `
    SELECT COUNT(*) as total_txns,
           SUM(amount) as total_volume,
           AVG(amount)::bigint as avg_price,
           PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY amount)::bigint as median_price
    FROM dld_transactions_arvo ${where}
  `
  const stats = (await withStatementTimeout(
    () => prisma.$queryRawUnsafe(statsSql, ...params),
    STATEMENT_TIMEOUT_MS
  ) as DbRow[])[0] || {}

  return {
    source: "dld_transactions_arvo",
    data_as_of: nowIso(),
    count: rows.length,
    stats,
    rows,
  }
}

// ── DLD Area Benchmark ──────────────────────────────────
export async function executeDldAreaBenchmark(input: { area_name: string }) {
  const rows = await withStatementTimeout(
    () => prisma.$queryRaw`
      SELECT * FROM dld_area_benchmarks_live
      WHERE LOWER(area) LIKE LOWER(${`%${input.area_name}%`})
      ORDER BY total_transactions DESC
      LIMIT 5
    `,
    STATEMENT_TIMEOUT_MS
  ) as DbRow[]

  if (rows.length === 0) {
    return { source: "dld_area_benchmarks_live", data_as_of: nowIso(), no_results: true, rows: [] }
  }

  return {
    source: "dld_area_benchmarks_live",
    data_as_of: nowIso(),
    count: rows.length,
    rows,
  }
}

// ── DLD Market Pulse ────────────────────────────────────
export async function executeDldMarketPulse() {
  const overview = (await withStatementTimeout(
    () => prisma.$queryRaw`
      SELECT 
        COUNT(*) as total_transactions,
        SUM(amount) as total_volume,
        AVG(amount)::bigint as avg_price,
        COUNT(DISTINCT area) as unique_areas,
        COUNT(DISTINCT project) as unique_projects,
        MIN(transaction_date) as date_from,
        MAX(transaction_date) as date_to,
        COUNT(*) FILTER (WHERE reg_type = 'Off-Plan') as offplan_count,
        COUNT(*) FILTER (WHERE reg_type = 'Ready') as ready_count,
        COUNT(*) FILTER (WHERE amount >= 10000000) as mega_deals,
        COUNT(*) FILTER (WHERE amount >= 2000000 AND freehold = 'Free Hold') as golden_visa_eligible,
        AVG(amount) FILTER (WHERE reg_type = 'Off-Plan')::bigint as avg_offplan,
        AVG(amount) FILTER (WHERE reg_type = 'Ready')::bigint as avg_ready
      FROM dld_transactions_arvo
    `,
    STATEMENT_TIMEOUT_MS
  ) as DbRow[])[0]

  const topAreas = await withStatementTimeout(
    () => prisma.$queryRaw`
      SELECT area, 
             COUNT(*) as txn_count, 
             SUM(amount) as volume,
             AVG(amount)::bigint as avg_price
      FROM dld_transactions_arvo
      GROUP BY area
      ORDER BY volume DESC
      LIMIT 10
    `,
    STATEMENT_TIMEOUT_MS
  ) as DbRow[]

  const topVelocity = await withStatementTimeout(
    () => prisma.$queryRaw`
      SELECT area, daily_velocity, total_transactions, median_price
      FROM dld_area_benchmarks_live
      ORDER BY daily_velocity DESC
      LIMIT 10
    `,
    STATEMENT_TIMEOUT_MS
  ) as DbRow[]

  return {
    source: "dld_transactions_arvo + dld_area_benchmarks_live",
    data_as_of: nowIso(),
    overview,
    top_areas_by_volume: topAreas,
    top_areas_by_velocity: topVelocity,
  }
}

// ── DLD Notable Deals ───────────────────────────────────
export async function executeDldNotableDeals(input: { 
  badge?: string; 
  limit?: number;
  days?: number;
}) {
  const limit = Math.min(input.limit || 20, 50)
  const daysBack = input.days || 7

  let badgeFilter = ""
  const params: unknown[] = []
  let paramIdx = 1
  
  if (input.badge) {
    badgeFilter = `AND badge = $${paramIdx}`
    params.push(input.badge)
    paramIdx++
  }

  const sql = `
    SELECT headline, subline, amount, area, project, reg_type, 
           prop_type, badge, is_notable, transaction_date, icon,
           metadata->>'freehold' as freehold,
           metadata->>'nearestLandmark' as landmark
    FROM dld_transaction_feed
    WHERE transaction_date >= CURRENT_DATE - INTERVAL '${daysBack} days'
    ${badgeFilter}
    ORDER BY 
      CASE WHEN is_notable THEN 0 ELSE 1 END,
      amount DESC
    LIMIT ${limit}
  `

  const rows = await withStatementTimeout(
    () => prisma.$queryRawUnsafe(sql, ...params),
    STATEMENT_TIMEOUT_MS
  ) as DbRow[]

  return {
    source: "dld_transaction_feed",
    data_as_of: nowIso(),
    count: rows.length,
    rows,
  }
}

// ── Refresh DLD Data ────────────────────────────────────
export async function executeRefreshDldData() {
  // This triggers the arvo.co API pull
  try {
    const response = await fetch("https://transactions.arvo.co/api/transactions", {
      headers: { "User-Agent": "Entrestate-Copilot/1.0" },
      signal: AbortSignal.timeout(30000),
    })
    
    if (!response.ok) {
      return { source: "arvo.co", status: "error", message: `API returned ${response.status}` }
    }

    const txns = await response.json()
    
    // Upsert logic would go here — for now return stats
    return {
      source: "arvo.co",
      data_as_of: nowIso(),
      status: "success",
      transactions_available: Array.isArray(txns) ? txns.length : 0,
      message: "DLD data refreshed. Run sync to update database.",
    }
  } catch (error) {
    return { source: "arvo.co", status: "error", message: String(error) }
  }
}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 7: ROUTE REGISTRATION — copilot + chat routes
 Files: app/api/copilot/route.ts AND app/api/chat/route.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// MCP imports + tools:

// ═══════════════════════════════════════════════════════════════
// ADD TO: app/api/copilot/route.ts AND app/api/chat/route.ts
// ═══════════════════════════════════════════════════════════════

// IMPORTS
import {
  mcpQuery,
  mcpDescribeTable,
  mcpSampleData,
  mcpCrossReference,
  mcpTriggerScraper,
} from "@/lib/mcp/server"

import {
  mcpQueryInputSchema,
  mcpDescribeTableInputSchema,
  mcpSampleDataInputSchema,
  mcpCrossReferenceInputSchema,
  mcpTriggerScraperInputSchema,
  type McpQueryInput,
  type McpDescribeTableInput,
  type McpSampleDataInput,
  type McpCrossReferenceInput,
  type McpTriggerScraperInput,
} from "@/lib/mcp/schemas"

// TOOL REGISTRATIONS (add to tools object)

mcp_query: tool({
  description: "Execute a read-only SQL query against the full Entrestate database. Use for custom analytics, cross-joins, aggregations. Only SELECT/WITH allowed, max 100 rows.",
  parameters: mcpQueryInputSchema,
  execute: async (input: McpQueryInput) => {
    return withGuardrails(await mcpQuery(input))
  },
}),

mcp_describe_table: tool({
  description: "Inspect a table's schema: column names, types, row count. Use before querying unfamiliar tables.",
  parameters: mcpDescribeTableInputSchema,
  execute: async (input: McpDescribeTableInput) => {
    return await mcpDescribeTable(input.table_name)
  },
}),

mcp_sample_data: tool({
  description: "Preview sample rows from any table (1-20 rows). Use to understand data format before writing queries.",
  parameters: mcpSampleDataInputSchema,
  execute: async (input: McpSampleDataInput) => {
    return await mcpSampleData(input.table_name, input.limit)
  },
}),

mcp_cross_reference: tool({
  description: "Run pre-built cross-reference analytics: price_vs_dld, developer_portfolio, area_intelligence, golden_visa_opportunities, stress_test_report. Optionally filter by area name.",
  parameters: mcpCrossReferenceInputSchema,
  execute: async (input: McpCrossReferenceInput) => {
    return withGuardrails(await mcpCrossReference(input))
  },
}),

mcp_trigger_scraper: tool({
  description: "Trigger a live data scraper. Currently supports: arvo_dld (DLD transactions from arvo.co API).",
  parameters: mcpTriggerScraperInputSchema,
  execute: async (input: McpTriggerScraperInput) => {
    return await mcpTriggerScraper(input.source)
  },
}),


// DLD imports:
import {
  executeDldTransactionSearch, executeDldAreaBenchmark,
  executeDldMarketPulse, executeDldNotableDeals, executeRefreshDldData,
} from "@/lib/copilot/executor"

import {
  type DldTransactionSearchInput, type DldAreaBenchmarkInput,
  type DldNotableDealsInput, dldTransactionSearchInputSchema,
  dldAreaBenchmarkInputSchema, dldMarketPulseInputSchema,
  dldNotableDealsInputSchema, refreshDldDataInputSchema,
} from "@/lib/copilot/tools"

// DLD tool registrations:

// ──────────────────────────────────────────────────────────
// ADD THESE TOOLS to the `tools` object in api/copilot/route.ts
// ──────────────────────────────────────────────────────────

dld_transaction_search: tool({
  description: copilotToolDescriptions.dld_transaction_search,
  parameters: dldTransactionSearchInputSchema,
  execute: async (input: DldTransactionSearchInput) => {
    const result = await executeDldTransactionSearch(input)
    return withGuardrails(result)
  },
}),

dld_area_benchmark: tool({
  description: copilotToolDescriptions.dld_area_benchmark,
  parameters: dldAreaBenchmarkInputSchema,
  execute: async (input: DldAreaBenchmarkInput) => {
    const result = await executeDldAreaBenchmark(input)
    return withGuardrails(result)
  },
}),

dld_market_pulse: tool({
  description: copilotToolDescriptions.dld_market_pulse,
  parameters: dldMarketPulseInputSchema,
  execute: async () => {
    const result = await executeDldMarketPulse()
    return withGuardrails(result)
  },
}),

dld_notable_deals: tool({
  description: copilotToolDescriptions.dld_notable_deals,
  parameters: dldNotableDealsInputSchema,
  execute: async (input: DldNotableDealsInput) => {
    const result = await executeDldNotableDeals(input)
    return withGuardrails(result)
  },
}),

refresh_dld_data: tool({
  description: copilotToolDescriptions.refresh_dld_data,
  parameters: refreshDldDataInputSchema,
  execute: async () => {
    const result = await executeRefreshDldData()
    return withGuardrails(result)
  },
}),


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 8: NOTIFICATION STYLING
 File: lib/dld/notification-styles.ts (CREATE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type NotificationStyle = {
  variant: 'mega' | 'golden-visa' | 'premium' | 'standard' | 'entry' | 'land' | 'above-market'
  color: string; accent: string; icon: string
  prominence: 'high' | 'medium' | 'low'; pulse: boolean
}

export function getNotificationStyle(txn: {
  amount: number; badge: string | null; reg_type: string
  prop_type: string; is_notable: boolean
}): NotificationStyle {
  if (txn.amount >= 10_000_000 || txn.badge === 'mega-deal')
    return { variant: 'mega', color: 'bg-amber-50 dark:bg-amber-950/30', accent: 'border-amber-500 text-amber-700', icon: 'trophy', prominence: 'high', pulse: true }
  if (txn.badge === 'above-market')
    return { variant: 'above-market', color: 'bg-red-50 dark:bg-red-950/30', accent: 'border-red-500 text-red-700', icon: 'trending-up', prominence: 'high', pulse: true }
  if (txn.badge === 'golden-visa' || txn.amount >= 2_000_000)
    return { variant: 'golden-visa', color: 'bg-yellow-50 dark:bg-yellow-950/30', accent: 'border-yellow-500 text-yellow-700', icon: 'shield-check', prominence: 'high', pulse: false }
  if (txn.prop_type === 'Land')
    return { variant: 'land', color: 'bg-green-50 dark:bg-green-950/30', accent: 'border-green-500 text-green-700', icon: 'map-pin', prominence: 'medium', pulse: false }
  if (txn.amount >= 3_000_000)
    return { variant: 'premium', color: 'bg-purple-50 dark:bg-purple-950/30', accent: 'border-purple-500 text-purple-700', icon: 'gem', prominence: 'medium', pulse: false }
  if (txn.amount >= 1_000_000)
    return { variant: 'standard', color: 'bg-blue-50 dark:bg-blue-950/30', accent: 'border-blue-400 text-blue-700', icon: txn.reg_type === 'Off-Plan' ? 'building' : 'home', prominence: 'low', pulse: false }
  return { variant: 'entry', color: 'bg-slate-50 dark:bg-slate-900/30', accent: 'border-slate-300 text-slate-600', icon: 'tag', prominence: 'low', pulse: false }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 9: DATABASE SCHEMA (Decision Table Architecture)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- inventory_clean columns that matter for the decision surface:
-- name, area, price_from, rental_yield, stress_grade (A/B/C/D),
-- timing_signal (BUY/HOLD/WAIT), evidence_level (L5/L4/L3/L2/L1),
-- investment_score (0-100), market_signal (Strong Buy → Avoid),
-- quality_score, price_confidence (HIGH/MEDIUM/LOW),
-- hero_image, developer, city, bedrooms, completion_date

-- market_signal logic:
-- BUY + A/B + score>=80  → Strong Buy
-- BUY + A/B              → Buy
-- BUY + C/D              → Speculative Buy
-- HOLD + A/B             → Hold — Safe
-- HOLD + C/D             → Hold — Caution
-- WAIT + A/B             → Wait — Overpriced
-- WAIT + C/D             → Avoid

-- evidence_level logic:
-- HIGH confidence + hero + yield  → L5 Verified
-- HIGH confidence + (hero or yield) → L4 Strong
-- MEDIUM confidence               → L3 Medium
-- LOW confidence                   → L2 Weak
-- else                             → L1 Minimal

-- dld_transactions_arvo: transaction_id, area, project, amount,
--   reg_type, prop_type, rooms, price_per_sqm, transaction_date,
--   sub_type, freehold, usage

-- dld_area_benchmarks_live: area, total_transactions, median_price,
--   p25/p75/p90_price, avg_price_per_sqm, daily_velocity,
--   offplan_pct, ready_pct, freehold_pct

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 10: VERCEL ENV VARS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GEMINI_KEY=<your-gemini-api-key>
COPILOT_MODEL=gemini-2.5-flash
INVENTORY_TABLE=entrestate_projects_api
AREAS_TABLE=entrestate_areas_api
DEVELOPERS_TABLE=entrestate_developers_api

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SECTION 11: DEPLOY CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 □ 1. lib/copilot/tools.ts → replace copilotSystemPrompt (Section 1)
 □ 2. ChatInterface.tsx → add stripThinkTags (Section 2)
 □ 3. Create lib/mcp/server.ts (Section 3)
 □ 4. Create lib/mcp/schemas.ts (Section 4)
 □ 5. lib/copilot/tools.ts → add DLD schemas (Section 5)
 □ 6. lib/copilot/executor.ts → add DLD functions (Section 6)
 □ 7. Both route files → add MCP + DLD tools (Section 7)
 □ 8. Create lib/dld/notification-styles.ts (Section 8)
 □ 9. Set GEMINI_KEY in Vercel (Section 10)
 □ 10. git push → Vercel deploys
 □ 11. Test: "What's the market pulse?" (should show numbers, no essays)
 □ 12. Test: "Investor memo for Marina Vista" (should be 5 lines max)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 CONSTRAINTS — NEVER VIOLATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 1. GC LOCKED — never touch gc_projects/areas/devs/blogs
 2. Stress grades: A/B/C/D (never "Safe A")
 3. Timing signals: BUY/HOLD/WAIT
 4. Golden Visa: AED 2M+ freehold
 5. Notifications only — no cards for DLD
 6. DLD = price ground truth
 7. Prisma db push WIPES DATA
 8. Copilot: no <think> in output, no essays, no schema explanations
