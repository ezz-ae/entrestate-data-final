"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Layers, Filter, Clock, Loader2, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react"

type Template = {
  label: string
  filters: Record<string, string | number | boolean>
  sort: string
}

const templates: Template[] = [
  {
    label: "Market inventory snapshot",
    filters: {},
    sort: "god_metric",
  },
  {
    label: "BUY signal projects",
    filters: { timing: "BUY" },
    sort: "god_metric",
  },
  {
    label: "Rental yield leaders",
    filters: {},
    sort: "yield",
  },
  {
    label: "High-safety grade assets",
    filters: { stress: "B" },
    sort: "god_metric",
  },
  {
    label: "Golden Visa eligible",
    filters: { goldenVisa: true, minPrice: 2000000 },
    sort: "price",
  },
]

const timeDepthBands = [
  { label: "30 days", tier: "Free" },
  { label: "2 years", tier: "Pro" },
  { label: "5 years", tier: "Business" },
  { label: "Unlimited", tier: "Enterprise" },
]

const sortOptions = [
  { value: "god_metric", label: "Score" },
  { value: "price", label: "Price" },
  { value: "yield", label: "Yield" },
  { value: "reliability", label: "Reliability" },
]

type Project = Record<string, unknown>

export default function SearchPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [area, setArea] = useState("")
  const [developer, setDeveloper] = useState("")
  const [timing, setTiming] = useState("")
  const [stress, setStress] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [sortBy, setSortBy] = useState("god_metric")
  const [page, setPage] = useState(1)

  const [results, setResults] = useState<Project[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasQueried, setHasQueried] = useState(false)

  function applyTemplate(index: number) {
    setSelectedTemplate(index)
    const tpl = templates[index]
    setArea("")
    setDeveloper("")
    setTiming(String(tpl.filters.timing ?? ""))
    setStress(String(tpl.filters.stress ?? ""))
    setMinPrice(tpl.filters.minPrice ? String(tpl.filters.minPrice) : "")
    setMaxPrice(tpl.filters.maxPrice ? String(tpl.filters.maxPrice) : "")
    setSortBy(tpl.sort)
    setPage(1)
  }

  async function runQuery(queryPage = 1) {
    setLoading(true)
    setHasQueried(true)
    const params = new URLSearchParams()
    if (area) params.set("area", area)
    if (developer) params.set("developer", developer)
    if (timing) params.set("timing", timing)
    if (stress) params.set("stress", stress)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    params.set("sortBy", sortBy)
    params.set("page", String(queryPage))
    params.set("pageSize", "25")

    try {
      const res = await fetch(`/api/search?${params.toString()}`)
      if (!res.ok) throw new Error("Query failed")
      const data = await res.json()
      setResults(data.projects ?? [])
      setTotal(data.total ?? 0)
      setPage(queryPage)
    } catch {
      setResults([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedTemplate !== null) {
      runQuery(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate])

  const totalPages = Math.ceil(total / 25)

  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Search</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Time Table Builder</h1>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
                Build decision-ready tables with tier-gated depth and a strict column registry. Save once, reuse
                everywhere.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-accent" />
              Depth gated by tier
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6">
            {/* Builder controls */}
            <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Filter className="h-4 w-4 text-accent" />
                Builder controls
              </div>
              <div className="mt-4 space-y-6">
                {/* Templates */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Template</p>
                  <div className="mt-3 space-y-2">
                    {templates.map((item, index) => (
                      <button
                        key={item.label}
                        onClick={() => applyTemplate(index)}
                        className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                          selectedTemplate === index
                            ? "border-primary/60 bg-primary/10 text-foreground"
                            : "border-border/60 bg-background/50 text-foreground hover:border-primary/30"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time depth */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Time depth</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {timeDepthBands.map((band) => (
                      <div
                        key={band.label}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground"
                      >
                        <div className="font-medium">{band.label}</div>
                        <div className="text-xs text-muted-foreground">{band.tier} tier</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Filters</p>
                  <div className="mt-3 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                      />
                      <input
                        type="text"
                        placeholder="Developer"
                        value={developer}
                        onChange={(e) => setDeveloper(e.target.value)}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        value={timing}
                        onChange={(e) => setTiming(e.target.value)}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
                      >
                        <option value="">Timing signal</option>
                        <option value="BUY">BUY</option>
                        <option value="HOLD">HOLD</option>
                        <option value="WAIT">WAIT</option>
                      </select>
                      <select
                        value={stress}
                        onChange={(e) => setStress(e.target.value)}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
                      >
                        <option value="">Risk grade</option>
                        <option value="A">Grade A</option>
                        <option value="B">Grade B</option>
                        <option value="C">Grade C</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Min price (AED)"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                      />
                      <input
                        type="number"
                        placeholder="Max price (AED)"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort + Run */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="flex-1 rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                      {sortOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => runQuery(1)}
                    disabled={loading}
                    className="rounded-xl bg-foreground text-background px-5 py-2 text-sm font-medium transition hover:bg-foreground/90 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Run query"}
                  </button>
                </div>
              </div>
            </section>

            {/* Results preview */}
            <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Layers className="h-4 w-4 text-accent" />
                  Time Table preview
                </div>
                {hasQueried && (
                  <span className="text-xs text-muted-foreground">
                    {total.toLocaleString()} results
                  </span>
                )}
              </div>

              {!hasQueried ? (
                <div className="mt-4 rounded-2xl border border-dashed border-border/70 bg-background/40 p-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Search className="h-4 w-4" />
                    Select a template or set filters and run a query to preview results.
                  </div>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
                      Column registry enforced server-side
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
                      Premium signals gated by tier
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
                      Save to /tables after approval
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
                      Export to /reports and /artifacts
                    </div>
                  </div>
                </div>
              ) : loading ? (
                <div className="mt-4 flex items-center justify-center py-20">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : results.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed border-border/70 bg-background/40 p-6 text-center">
                  <p className="text-sm text-muted-foreground">No projects match these filters.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <div className="overflow-x-auto -mx-6 px-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50 text-xs text-muted-foreground">
                          <th className="text-left py-2 pr-4 font-medium">Project</th>
                          <th className="text-left py-2 pr-4 font-medium">Area</th>
                          <th className="text-right py-2 pr-4 font-medium">Price</th>
                          <th className="text-right py-2 pr-4 font-medium">Yield</th>
                          <th className="text-center py-2 pr-4 font-medium">Grade</th>
                          <th className="text-center py-2 font-medium">Signal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((project, i) => (
                          <tr
                            key={i}
                            className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                          >
                            <td className="py-2.5 pr-4">
                              <div className="font-medium text-foreground truncate max-w-[180px]">
                                {String(project.name ?? "—")}
                              </div>
                              <div className="text-xs text-muted-foreground truncate max-w-[180px]">
                                {String(project.developer ?? "")}
                              </div>
                            </td>
                            <td className="py-2.5 pr-4 text-muted-foreground truncate max-w-[120px]">
                              {String(project.final_area ?? project.area ?? "—")}
                            </td>
                            <td className="py-2.5 pr-4 text-right tabular-nums text-foreground">
                              {typeof project.l1_canonical_price === "number"
                                ? `${(project.l1_canonical_price / 1_000_000).toFixed(2)}M`
                                : "—"}
                            </td>
                            <td className="py-2.5 pr-4 text-right tabular-nums text-foreground">
                              {typeof project.l1_canonical_yield === "number"
                                ? `${Number(project.l1_canonical_yield).toFixed(1)}%`
                                : "—"}
                            </td>
                            <td className="py-2.5 pr-4 text-center">
                              {typeof project.l2_stress_test_grade === "string" ? (
                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                  project.l2_stress_test_grade === "A"
                                    ? "bg-emerald-500/15 text-emerald-400"
                                    : project.l2_stress_test_grade === "B"
                                      ? "bg-blue-500/15 text-blue-400"
                                      : "bg-amber-500/15 text-amber-400"
                                }`}>
                                  {String(project.l2_stress_test_grade)}
                                </span>
                              ) : "—"}
                            </td>
                            <td className="py-2.5 text-center">
                              {typeof project.l3_timing_signal === "string" ? (
                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                  project.l3_timing_signal === "BUY"
                                    ? "bg-emerald-500/15 text-emerald-400"
                                    : project.l3_timing_signal === "HOLD"
                                      ? "bg-amber-500/15 text-amber-400"
                                      : "bg-red-500/15 text-red-400"
                                }`}>
                                  {String(project.l3_timing_signal)}
                                </span>
                              ) : "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => runQuery(page - 1)}
                        disabled={page <= 1}
                        className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground disabled:opacity-30"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" /> Previous
                      </button>
                      <span className="text-xs text-muted-foreground">
                        Page {page} of {totalPages}
                      </span>
                      <button
                        onClick={() => runQuery(page + 1)}
                        disabled={page >= totalPages}
                        className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground disabled:opacity-30"
                      >
                        Next <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
