"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Database,
  FileText,
  LayoutGrid,
  Loader2,
  Presentation,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react"
import type { TableSpec, TableSpecGoldenPath } from "@/lib/tablespec"
import type { TimeTablePreview, TimeTableRow } from "@/lib/time-table"
import type { DecisionArtifactType, SealedDecisionArtifact } from "@/lib/artifacts"

type PreviewPayload = {
  intent?: string
  goldenPath?: TableSpecGoldenPath
  profile?: {
    riskProfile?: string
    horizon?: string
  }
  limit?: number
  useLLM?: boolean
}

type PreviewResponse = TimeTablePreview & {
  requestId?: string
  error?: string
}

type SummaryResponse = {
  summary: string
  highlights: string[]
  nextActions: string[]
  requestId?: string
  error?: string
}

type ArtifactResponse = {
  artifact?: SealedDecisionArtifact
  requestId?: string
  error?: string
}

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

const RISK_PROFILES = ["Institutional Safe", "Capital Safe", "Balanced", "Opportunistic", "Speculative"]
const HORIZON_OPTIONS = ["Ready", "6-12mo", "1-2yr", "2-4yr", "4yr+"]

const GOLDEN_PATHS: Array<{
  id: TableSpecGoldenPath
  label: string
  description: string
}> = [
  {
    id: "underwrite_development_site",
    label: "Underwrite development site",
    description: "Price, yield, GFA, handover, and risk bands in one pass.",
  },
  {
    id: "compare_area_yields",
    label: "Compare area yields",
    description: "Stack yields, pricing, and liquidity across target districts.",
  },
  {
    id: "draft_spa_contract",
    label: "Draft SPA contract",
    description: "Pull asset context and prepare a contract-ready pack.",
  },
]

const READY_TABLES = [
  {
    label: "Projects data (basic)",
    description: "Baseline project pipeline with pricing and delivery signals.",
    intent: "Show a baseline table of active development projects with pricing, delivery windows, and yield signals.",
  },
  {
    label: "Area analysis",
    description: "Area yields, absorption, pricing, and liquidity in one sheet.",
    intent: "Compare area-level yields, absorption, pricing momentum, and liquidity for target districts.",
  },
  {
    label: "Developers snapshot",
    description: "Developer pipelines, delivery risk, and inventory health.",
    intent: "List developers with pipeline size, delivery risk, and backlog quality signals.",
  },
  {
    label: "Smart table",
    description: "Rank assets by risk, yield, liquidity, and market score.",
    intent: "Build a smart table ranking assets by risk, yield, liquidity, and market score.",
  },
]

const OUTPUT_ACTIONS: Array<{
  type: DecisionArtifactType
  label: string
  description: string
  icon: typeof FileText
}> = [
  {
    type: "underwriting_report",
    label: "Report",
    description: "PDF underwriting report",
    icon: FileText,
  },
  {
    type: "pptx_deck",
    label: "Presentation",
    description: "PPTX deck",
    icon: Presentation,
  },
  {
    type: "social_post",
    label: "Social",
    description: "Short social post",
    icon: Share2,
  },
  {
    type: "offer_letter",
    label: "Offer",
    description: "Offer outline",
    icon: ShieldCheck,
  },
  {
    type: "investment_plan",
    label: "Investment plan",
    description: "Structured plan",
    icon: BookOpen,
  },
  {
    type: "brochure",
    label: "Brochure",
    description: "Marketing copy",
    icon: Sparkles,
  },
]

const ADVANCED_OUTPUTS: Array<{
  type: DecisionArtifactType
  label: string
  description: string
  icon: typeof FileText
}> = [
  {
    type: "investor_memo",
    label: "Investor memo",
    description: "Executive summary",
    icon: BookOpen,
  },
  {
    type: "comparison_note",
    label: "Comparison note",
    description: "Side-by-side takeaway",
    icon: BarChart3,
  },
  {
    type: "contract_draft",
    label: "Contract draft",
    description: "SPA outline",
    icon: ShieldCheck,
  },
  {
    type: "widget",
    label: "Widget",
    description: "Embeddable snippet",
    icon: Database,
  },
]

const formatTimeRange = (spec: TableSpec) => {
  const range = spec.time_range
  if (range.mode === "relative") {
    return `Last ${range.last ?? "-"} ${range.unit ?? "period"}`
  }
  return `${range.from ?? "-"} to ${range.to ?? "-"}`
}

const formatScope = (spec: TableSpec) => {
  const areas = spec.scope.areas?.join(", ")
  const cities = spec.scope.cities?.join(", ")
  const parts = [cities, areas].filter(Boolean)
  return parts.length ? parts.join(" | ") : "All markets"
}

const describeFilters = (spec: TableSpec) => {
  if (!spec.filters.length) return ["No filters applied."]
  return spec.filters.map((filter) => `${filter.field} ${filter.op} ${filter.value}`)
}

const summarizeSignals = (spec: TableSpec) => (spec.signals.length ? spec.signals.join(", ") : "No signals")

const getNumeric = (value: TimeTableRow[keyof TimeTableRow]) => {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value)
    return Number.isFinite(parsed) ? parsed : null
  }
  return null
}

const decodeBase64 = (value: string) => {
  if (typeof window === "undefined") return ""
  try {
    return atob(value)
  } catch {
    return ""
  }
}

export default function DecisionOSPage() {
  const [intent, setIntent] = useState("")
  const [riskProfile, setRiskProfile] = useState("")
  const [horizon, setHorizon] = useState("")
  const [activeGoldenPath, setActiveGoldenPath] = useState<TableSpecGoldenPath | null>(null)
  const [preview, setPreview] = useState<PreviewResponse | null>(null)
  const [summary, setSummary] = useState<SummaryResponse | null>(null)
  const [history, setHistory] = useState<ChatMessage[]>([])
  const [artifacts, setArtifacts] = useState<SealedDecisionArtifact[]>([])
  const [plan, setPlan] = useState<"free" | "pro">("free")
  const [rowLimit, setRowLimit] = useState(20)
  const [useLLM, setUseLLM] = useState(true)
  const [explainMode, setExplainMode] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [artifactLoading, setArtifactLoading] = useState<DecisionArtifactType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (plan === "free" && rowLimit > 30) {
      setRowLimit(30)
    }
  }, [plan, rowLimit])

  const maxRows = plan === "free" ? 30 : 120
  const effectiveLimit = Math.min(rowLimit, maxRows)

  const tableColumns = useMemo(() => {
    if (!preview?.rows?.length) return []
    return Object.keys(preview.rows[0])
  }, [preview])

  const metrics = useMemo(() => {
    if (!preview?.rows?.length) return []
    const rows = preview.rows
    const numericKeys = Object.keys(rows[0]).filter((key) => getNumeric(rows[0][key]) !== null)
    const values = numericKeys.slice(0, 4).map((key) => {
      const numbers = rows.map((row) => getNumeric(row[key]) ?? 0)
      const avg = numbers.reduce((sum, value) => sum + value, 0) / Math.max(numbers.length, 1)
      return { key, value: avg }
    })
    const max = Math.max(...values.map((metric) => Math.abs(metric.value)), 1)
    return values.map((metric) => ({
      ...metric,
      ratio: Math.min(Math.abs(metric.value) / max, 1),
    }))
  }, [preview])

  const spec = preview?.metadata?.spec
  const filters = spec ? describeFilters(spec) : []
  const signals = spec ? summarizeSignals(spec) : ""
  const scope = spec ? formatScope(spec) : ""
  const timeRange = spec ? formatTimeRange(spec) : ""

  const mode = explainMode ? "chat" : "search"
  const historyItems = history.filter((item) => item.role === "user").slice(-6).reverse()

  const buildPayload = (payload: PreviewPayload): PreviewPayload => ({
    ...payload,
    profile: {
      riskProfile: riskProfile || undefined,
      horizon: horizon || undefined,
    },
    limit: payload.limit ?? effectiveLimit,
    useLLM,
  })

  const runPreview = async (payload: PreviewPayload) => {
    const response = await fetch("/api/time-table/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(payload)),
    })
    const data = (await response.json()) as PreviewResponse
    if (!response.ok) {
      throw new Error(data.error || "Failed to preview Time Table.")
    }
    return data
  }

  const runSummary = async (tableSpec: TableSpec) => {
    const response = await fetch("/api/time-table/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ spec: tableSpec, useLLM, limit: Math.min(effectiveLimit, 8) }),
    })
    const data = (await response.json()) as SummaryResponse
    if (!response.ok) {
      throw new Error(data.error || "Failed to generate summary.")
    }
    return data
  }

  const handleRun = async (payload: PreviewPayload, label?: string) => {
    if (!payload.intent && !payload.goldenPath) {
      setError("Enter an intent or choose a golden path.")
      return
    }
    setIsLoading(true)
    setError(null)
    setSummary(null)
    if (label || payload.intent) {
      setHistory((prev) => [
        ...prev,
        { role: "user", content: label || payload.intent || "Run" },
      ])
    }

    try {
      const previewData = await runPreview(payload)
      setPreview(previewData)

      if (explainMode) {
        const summaryData = await runSummary(previewData.metadata.spec)
        setSummary(summaryData)
        if (summaryData.summary) {
          setHistory((prev) => [
            ...prev,
            { role: "assistant", content: summaryData.summary },
          ])
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to run notebook.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleIntentSubmit = () => {
    if (!intent.trim()) {
      setError("Enter an intent to compile.")
      return
    }
    setActiveGoldenPath(null)
    handleRun({ intent })
  }

  const handleGoldenPath = (path: TableSpecGoldenPath, label: string) => {
    setActiveGoldenPath(path)
    setIntent("")
    handleRun({ goldenPath: path }, label)
  }

  const handleReadyTable = (label: string, tableIntent: string) => {
    setActiveGoldenPath(null)
    setIntent(tableIntent)
    handleRun({ intent: tableIntent }, label)
  }

  const handleClear = () => {
    setIntent("")
    setActiveGoldenPath(null)
    setPreview(null)
    setSummary(null)
    setHistory([])
    setArtifacts([])
    setError(null)
  }

  const handleGenerateArtifact = async (type: DecisionArtifactType) => {
    if (!preview?.metadata?.spec) {
      setError("Run a table before generating outputs.")
      return
    }
    setArtifactLoading(type)
    setError(null)
    try {
      const response = await fetch("/api/time-table/artifacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artifactType: type,
          spec: preview.metadata.spec,
          useLLM,
          limit: Math.min(effectiveLimit, 12),
          branding: { tier: plan },
        }),
      })
      const data = (await response.json()) as ArtifactResponse
      if (!response.ok || !data.artifact) {
        throw new Error(data.error || "Failed to generate artifact.")
      }
      setArtifacts((prev) => [data.artifact, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate artifact.")
    } finally {
      setArtifactLoading(null)
    }
  }

  return (
    <main
      id="main-content"
      className="min-h-screen bg-background text-foreground [--background:#f7f8fb] [--foreground:#0b1220] [--card:#ffffff] [--card-foreground:#0b1220] [--muted:#eef2f6] [--muted-foreground:#52606d] [--border:#dfe5ee] [--primary:#1f4bd2] [--primary-foreground:#ffffff] [--secondary:#eef2f7] [--secondary-foreground:#0b1220] [--accent:#1f4bd2] [--accent-foreground:#ffffff] [--input:#e6ebf2] [--ring:#1f4bd2]"
    >
      <div className="relative h-[100dvh] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_top,_rgba(31,75,210,0.22),_transparent_65%)] blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_top,_rgba(16,130,98,0.18),_transparent_65%)] blur-3xl" />
        </div>

        <div className="relative flex h-full">
          <aside className="hidden w-72 flex-col border-r border-muted/70 bg-white/80 backdrop-blur lg:flex">
            <div className="border-b border-muted/70 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <LayoutGrid className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Entrestate OS</div>
                  <div className="text-xs text-muted-foreground">Decision notebook</div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="rounded-xl bg-muted/70 p-1 text-xs">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-medium transition ${
                      mode === "chat"
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setExplainMode(true)}
                  >
                    <Sparkles className="size-3" />
                    Chat
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-medium transition ${
                      mode === "search"
                        ? "bg-white text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setExplainMode(false)}
                  >
                    <Search className="size-3" />
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="border-y border-muted/70 px-6 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Quick prompts
              </div>
              <div className="mt-3 space-y-2">
                {READY_TABLES.map((table) => (
                  <button
                    key={table.label}
                    type="button"
                    className="w-full rounded-xl border border-muted/60 bg-white/70 px-3 py-2 text-left text-xs transition hover:border-primary/60 hover:bg-primary/5"
                    onClick={() => handleReadyTable(table.label, table.intent)}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-foreground">{table.label}</span>
                      <ArrowUpRight className="size-3 text-muted-foreground" />
                    </div>
                    <div className="mt-1 text-[0.7rem] text-muted-foreground">{table.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                History
              </div>
              <div className="mt-3 space-y-2">
                {historyItems.length ? (
                  historyItems.map((item, index) => (
                    <div
                      key={`${item.content}-${index}`}
                      className="rounded-lg border border-muted/60 bg-white/70 px-3 py-2 text-xs text-muted-foreground"
                    >
                      {item.content}
                    </div>
                  ))
                ) : (
                  <div className="rounded-lg border border-dashed border-muted/60 px-3 py-3 text-xs text-muted-foreground">
                    Prompts will appear here.
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-muted/70 px-6 py-4 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Free tier row cap</span>
                <span>30 rows</span>
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-muted/70 bg-white/80 px-6 py-4 backdrop-blur">
              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <LayoutGrid className="size-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Entrestate OS</div>
                  <div className="text-xs text-muted-foreground">Decision notebook</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch checked={useLLM} onCheckedChange={setUseLLM} />
                  <Label className="text-xs">LLM TableSpec</Label>
                </div>
                <Select value={plan} onValueChange={(value) => setPlan(value as "free" | "pro")}>
                  <SelectTrigger className="h-8 w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free (30 row)</SelectItem>
                    <SelectItem value="pro">Pro (120 row)</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={String(effectiveLimit)} onValueChange={(value) => setRowLimit(Number(value))}>
                  <SelectTrigger className="h-8 w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 30, 50, 100, 120]
                      .filter((limit) => limit <= maxRows)
                      .map((limit) => (
                        <SelectItem key={limit} value={String(limit)}>
                          {limit} rows
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Badge variant="secondary" className="gap-2">
                  <Database className="size-3" />
                  {effectiveLimit} rows
                </Badge>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                <div className="flex flex-col gap-6">
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                    <Card className="border-muted/70 bg-white/90 shadow-sm">
                      <CardHeader className="space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <CardTitle className="text-lg font-semibold">Ask the notebook</CardTitle>
                            <CardDescription>
                              Natural language in, audited Time Tables out. Chat mode explains every step.
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="gap-2 text-xs">
                            {mode === "chat" ? <Sparkles className="size-3" /> : <Search className="size-3" />}
                            {mode === "chat" ? "Chat mode" : "Search mode"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 lg:hidden">
                          <button
                            type="button"
                            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                              mode === "chat"
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted text-muted-foreground hover:border-primary/60"
                            }`}
                            onClick={() => setExplainMode(true)}
                          >
                            Chat
                          </button>
                          <button
                            type="button"
                            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                              mode === "search"
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted text-muted-foreground hover:border-primary/60"
                            }`}
                            onClick={() => setExplainMode(false)}
                          >
                            Search
                          </button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Textarea
                          value={intent}
                          onChange={(event) => setIntent(event.target.value)}
                          placeholder="Underwrite this development site for yield, risk, and delivery timeline."
                          className="min-h-[120px]"
                        />
                        <div className="flex flex-wrap gap-3">
                          <Button onClick={handleIntentSubmit} disabled={isLoading}>
                            {isLoading ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
                            Run notebook
                          </Button>
                          <Button variant="outline" onClick={handleClear} disabled={isLoading}>
                            Reset session
                          </Button>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Risk posture</Label>
                            <Select value={riskProfile || undefined} onValueChange={setRiskProfile}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select risk profile" />
                              </SelectTrigger>
                              <SelectContent>
                                {RISK_PROFILES.map((profile) => (
                                  <SelectItem key={profile} value={profile}>
                                    {profile}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Horizon</Label>
                            <Select value={horizon || undefined} onValueChange={setHorizon}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select horizon" />
                              </SelectTrigger>
                              <SelectContent>
                                {HORIZON_OPTIONS.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2 lg:hidden">
                          {READY_TABLES.map((table) => (
                            <button
                              key={table.label}
                              type="button"
                              className="flex items-center justify-between rounded-lg border border-muted/60 bg-white/70 px-3 py-2 text-left text-xs transition hover:border-primary/60 hover:bg-primary/5"
                              onClick={() => handleReadyTable(table.label, table.intent)}
                            >
                              <span className="font-semibold text-foreground">{table.label}</span>
                              <ArrowUpRight className="size-3 text-muted-foreground" />
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <Card className="border-muted/70 bg-white/90">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold">Golden paths</CardTitle>
                      <CardDescription>Deterministic, audited workflows.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {GOLDEN_PATHS.map((path) => (
                        <button
                          key={path.id}
                          type="button"
                          className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                            activeGoldenPath === path.id
                              ? "border-primary bg-primary/10"
                              : "border-muted hover:border-primary/60 hover:bg-primary/5"
                          }`}
                          onClick={() => handleGoldenPath(path.id, path.label)}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="font-semibold">{path.label}</div>
                              <div className="text-xs text-muted-foreground">{path.description}</div>
                            </div>
                            <ArrowUpRight className="size-4 text-muted-foreground" />
                          </div>
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-muted/70 bg-white/90">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold">Notebook narrative</CardTitle>
                      <CardDescription>Explainable insights with evidence trails.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3 rounded-xl border border-muted/70 bg-muted/40 p-4">
                        {history.length ? (
                          history.map((message, index) => (
                            <div key={`${message.role}-${index}`} className="space-y-1">
                              <div className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                                {message.role === "user" ? "You" : "Notebook"}
                              </div>
                              <div className="text-sm">{message.content}</div>
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">
                            Start with a prompt to see the notebook narrative.
                          </div>
                        )}
                      </div>
                      {summary ? (
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-semibold">Highlights</div>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              {summary.highlights.map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                  <CheckCircle2 className="size-4 text-primary" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-semibold">Next actions</div>
                            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                              {summary.nextActions.map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                  <ArrowUpRight className="size-4 text-primary" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </div>

                <div className="flex flex-col gap-6">
                  <Card className="border-muted/70 bg-white/90 shadow-sm">
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <CardTitle className="text-sm font-semibold">Time Table</CardTitle>
                          <CardDescription>Raw rows + signals, ready for audit.</CardDescription>
                        </div>
                        <Badge variant="outline" className="gap-2">
                          <Database className="size-3" />
                          {preview?.metadata?.rowCount ?? 0} rows
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ScrollArea className="h-[340px] rounded-xl border border-muted/70">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {tableColumns.map((column) => (
                                <TableHead key={column} className="whitespace-nowrap">
                                  {column}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {preview?.rows?.length ? (
                              preview.rows.map((row, rowIndex) => (
                                <TableRow key={`row-${rowIndex}`}>
                                  {tableColumns.map((column) => (
                                    <TableCell key={`${rowIndex}-${column}`} className="whitespace-nowrap">
                                      {String(row[column] ?? "-")}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={tableColumns.length || 1} className="py-10 text-center text-sm text-muted-foreground">
                                  Run a prompt to generate a Time Table preview.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </ScrollArea>

                      <div className="grid gap-3 md:grid-cols-2">
                        <Card className="border border-muted/60 bg-muted/40">
                          <CardHeader>
                            <CardTitle className="text-sm">Signal snapshot</CardTitle>
                            <CardDescription>Average signal intensity from the sample.</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {metrics.length ? (
                              metrics.map((metric) => (
                                <div key={metric.key} className="space-y-1">
                                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{metric.key.replace(/_/g, " ")}</span>
                                    <span>{metric.value.toFixed(2)}</span>
                                  </div>
                                  <div className="h-2 w-full rounded-full bg-muted">
                                    <div
                                      className="h-2 rounded-full bg-primary"
                                      style={{ width: `${metric.ratio * 100}%` }}
                                    />
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-sm text-muted-foreground">No signal metrics yet.</div>
                            )}
                          </CardContent>
                        </Card>
                        <Card className="border border-muted/60 bg-muted/40">
                          <CardHeader>
                            <CardTitle className="text-sm">Evidence drawer</CardTitle>
                            <CardDescription>Traceable scope and filters.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Accordion type="single" collapsible>
                              <AccordionItem value="item-1">
                                <AccordionTrigger className="text-sm">Scope and time range</AccordionTrigger>
                                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                                  <div>Scope: {scope || "-"}</div>
                                  <div>Time range: {timeRange || "-"}</div>
                                  <div>Signals: {signals || "-"}</div>
                                </AccordionContent>
                              </AccordionItem>
                              <AccordionItem value="item-2">
                                <AccordionTrigger className="text-sm">Filters</AccordionTrigger>
                                <AccordionContent className="space-y-2 text-sm text-muted-foreground">
                                  {filters.map((filter) => (
                                    <div key={filter}>{filter}</div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-muted/70 bg-white/90">
                    <CardHeader>
                      <CardTitle className="text-sm font-semibold">Decision outputs</CardTitle>
                      <CardDescription>Generate branded, shareable artifacts from the Time Table.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        {OUTPUT_ACTIONS.map((output) => {
                          const Icon = output.icon
                          const isBusy = artifactLoading === output.type
                          return (
                            <button
                              key={output.type}
                              type="button"
                              className="flex items-center justify-between rounded-xl border border-muted/60 bg-white/70 p-4 text-left text-sm transition hover:border-primary/60 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
                              onClick={() => handleGenerateArtifact(output.type)}
                              disabled={Boolean(artifactLoading)}
                            >
                              <div>
                                <div className="font-semibold">{output.label}</div>
                                <div className="text-xs text-muted-foreground">{output.description}</div>
                              </div>
                              {isBusy ? <Loader2 className="size-4 animate-spin" /> : <Icon className="size-4 text-muted-foreground" />}
                            </button>
                          )
                        })}
                      </div>
                      <div className="grid gap-3 md:grid-cols-2">
                        {ADVANCED_OUTPUTS.map((output) => {
                          const Icon = output.icon
                          const isBusy = artifactLoading === output.type
                          return (
                            <button
                              key={output.type}
                              type="button"
                              className="flex items-center justify-between rounded-xl border border-muted/50 bg-white/70 p-4 text-left text-sm transition hover:border-primary/60 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
                              onClick={() => handleGenerateArtifact(output.type)}
                              disabled={Boolean(artifactLoading)}
                            >
                              <div>
                                <div className="font-semibold">{output.label}</div>
                                <div className="text-xs text-muted-foreground">{output.description}</div>
                              </div>
                              {isBusy ? <Loader2 className="size-4 animate-spin" /> : <Icon className="size-4 text-muted-foreground" />}
                            </button>
                          )
                        })}
                      </div>
                      {artifacts.length ? (
                        <div className="space-y-3">
                          <div className="text-sm font-semibold">Latest artifacts</div>
                          <div className="space-y-3">
                            {artifacts.map((artifact) => {
                              const decoded = artifact.format === "txt" || artifact.format === "html" ? decodeBase64(artifact.content) : ""
                              const dataHref = `data:${artifact.contentType};base64,${artifact.content}`
                              return (
                                <div key={artifact.id} className="rounded-xl border border-muted/60 bg-white/70 p-4">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                      <div className="text-sm font-semibold capitalize">{artifact.type.replace(/_/g, " ")}</div>
                                      <div className="text-xs text-muted-foreground">{artifact.format.toUpperCase()} • {artifact.status}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      {(artifact.format === "pdf" || artifact.format === "pptx") ? (
                                        <a
                                          href={dataHref}
                                          download={`${artifact.type}.${artifact.format}`}
                                          className="text-xs text-primary hover:underline"
                                        >
                                          Download
                                        </a>
                                      ) : null}
                                      {artifact.format === "html" ? (
                                        <a
                                          href={dataHref}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="text-xs text-primary hover:underline"
                                        >
                                          Open
                                        </a>
                                      ) : null}
                                    </div>
                                  </div>
                                  {decoded ? (
                                    <div className="mt-3 text-xs text-muted-foreground whitespace-pre-wrap">
                                      {decoded}
                                    </div>
                                  ) : null}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-muted/70 p-4 text-sm text-muted-foreground">
                          Generate an output to see branded artifacts here.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {error ? (
                <div className="mx-auto w-full max-w-[1400px] px-6 pb-6">
                  <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="size-4" />
                      {error}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
