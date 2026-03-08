import type { Metadata } from "next"
import Link from "next/link"
import {
  Sparkles,
  ArrowRight,
  Building2,
  Map,
  Users2,
  ShieldCheck,
  Zap,
  BarChart3,
  TrendingUp,
  FileText,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getMarketPulseSummary } from "@/lib/frontend-content"
import { formatAed } from "@/components/decision/formatters"
import { SEO, absoluteUrl } from "@/lib/seo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "UAE Real Estate Decision Intelligence",
  description:
    "Analyze UAE property markets with evidence-backed scoring, developer reliability signals, and investor-grade decision workflows.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO.defaultTitle,
    description:
      "Analyze UAE property markets with evidence-backed scoring, developer reliability signals, and investor-grade decision workflows.",
    url: "/",
    images: [absoluteUrl(SEO.defaultOgImagePath)],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.defaultTitle,
    description:
      "Analyze UAE property markets with evidence-backed scoring, developer reliability signals, and investor-grade decision workflows.",
    images: [absoluteUrl(SEO.defaultOgImagePath)],
  },
}

const DECISION_STEPS = [
  {
    step: "01",
    label: "Intent",
    detail: "Define your goal — yield, capital growth, stress resilience, or Golden Visa threshold.",
    icon: Zap,
    color: "text-blue-400",
    border: "border-blue-500/20 bg-blue-500/5",
  },
  {
    step: "02",
    label: "Evidence",
    detail: "Every project is scored across a 5-layer stack: L1 Canonical → L2 Derived → L3 Dynamic → L4 External → L5 Raw.",
    icon: BarChart3,
    color: "text-violet-400",
    border: "border-violet-500/20 bg-violet-500/5",
  },
  {
    step: "03",
    label: "Judgment",
    detail: "Timing signals (BUY/HOLD/WAIT), stress grades (A–F), and composite scores replace gut feel with structure.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    border: "border-emerald-500/20 bg-emerald-500/5",
  },
  {
    step: "04",
    label: "Action",
    detail: "Generate an investor memo, export a shortlist, or share a scored report — with a full auditable evidence trail.",
    icon: FileText,
    color: "text-amber-400",
    border: "border-amber-500/20 bg-amber-500/5",
  },
]

const SURFACES = [
  {
    icon: Sparkles,
    label: "AI Decision Chat",
    description: "Describe your budget, goal, and constraints. Get a scored shortlist with clear reasoning — not listings.",
    href: "/chat",
    cta: "Start analysis",
    accent: "text-blue-400",
    bg: "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40",
  },
  {
    icon: Building2,
    label: "Project Inventory",
    description: "Every active UAE project, fully scored. Filter by BUY/HOLD/WAIT signal, stress grade, yield, and area.",
    href: "/properties",
    cta: "Browse projects",
    accent: "text-indigo-400",
    bg: "bg-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/40",
  },
  {
    icon: Map,
    label: "Area Intelligence",
    description: "Yield averages, supply pressure, pricing depth, and top projects across every UAE neighbourhood.",
    href: "/areas",
    cta: "Explore areas",
    accent: "text-teal-400",
    bg: "bg-teal-500/5 border-teal-500/20 hover:border-teal-500/40",
  },
  {
    icon: Users2,
    label: "Developer Reliability",
    description: "Delivery consistency, stress-grade distribution, and track record across every active developer.",
    href: "/developers",
    cta: "View developers",
    accent: "text-violet-400",
    bg: "bg-violet-500/5 border-violet-500/20 hover:border-violet-500/40",
  },
  {
    icon: TrendingUp,
    label: "Market Intelligence",
    description: "Live timing signals, affordability tiers, area rankings, and developer reliability in one board.",
    href: "/top-data",
    cta: "View signals",
    accent: "text-amber-400",
    bg: "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40",
  },
  {
    icon: FileText,
    label: "Research Library",
    description: "Long-form market deep-dives, area studies, and developer analyses — structured for decision-making.",
    href: "/reports/library",
    cta: "Read reports",
    accent: "text-rose-400",
    bg: "bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40",
  },
]

const WHO_FOR = [
  {
    audience: "Investors",
    description: "You need to know if the entry point is right, if the developer delivers, and whether the yield is real — before committing capital.",
  },
  {
    audience: "Advisors & Analysts",
    description: "You need structured evidence you can stand behind in a client meeting. Not a PDF brochure. An auditable decision object.",
  },
  {
    audience: "Institutions",
    description: "You need portfolio-level scoring, stress resilience at scale, and a data layer that can integrate with your internal workflows.",
  },
]

const structuredDataObj = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SEO.siteName,
      url: absoluteUrl("/"),
      logo: absoluteUrl("/icon.svg"),
    },
    {
      "@type": "WebSite",
      name: SEO.siteName,
      url: absoluteUrl("/"),
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl("/search")}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
}

export default async function HomePage() {
  const pulse = await getMarketPulseSummary().catch(() => ({
    data_as_of: new Date().toISOString(),
    summary: { total: 7015, avg_price: null, avg_yield: null, buy_signals: 2667, high_confidence: 593 },
  }))

  const totalProjects = pulse.summary.total || 7015
  const buySignals = pulse.summary.buy_signals || 2667
  const avgYield = pulse.summary.avg_yield
  const avgPrice = pulse.summary.avg_price
  const buyPct = totalProjects > 0 ? ((buySignals / totalProjects) * 100).toFixed(0) : "—"

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataObj) }}
      />
      <Navbar />

      <div className="mx-auto max-w-[1100px] px-6 pb-28 pt-32 md:pt-44">

        {/* ── Hero ── */}
        <section className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.5)]" />
            {totalProjects.toLocaleString()} projects scored · {buySignals.toLocaleString()} BUY signals live
          </p>

          <h1 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
            The decision layer<br />
            <span className="text-primary">for UAE real estate.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Not a portal. Not a listing feed. A structured intelligence system — every project scored for timing, stress resilience, yield, and evidence quality. So you can decide with clarity, not noise.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/overview"
              className="hidden md:flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Open Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/chat"
              className="flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              Ask the AI
            </Link>
          </div>
        </section>

        {/* ── Live market pulse ── */}
        <section className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            {
              label: "Projects Scored",
              value: totalProjects.toLocaleString(),
              sub: "Active UAE inventory",
              color: "text-foreground",
            },
            {
              label: "BUY Signals",
              value: buySignals.toLocaleString(),
              sub: `${buyPct}% of total inventory`,
              color: "text-emerald-400",
            },
            {
              label: "Avg Asking Price",
              value: formatAed(avgPrice),
              sub: "L1 canonical",
              color: "text-foreground",
            },
            {
              label: "Avg Gross Yield",
              value: typeof avgYield === "number" ? `${avgYield.toFixed(1)}%` : "—",
              sub: "Across all inventory",
              color: "text-foreground",
            },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card px-5 py-4 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              <p className={`mt-2 text-2xl font-bold tabular-nums ${stat.color}`}>{stat.value}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </section>

        {/* ── Decision tunnel ── */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">How it works</p>
            <h2 className="mt-2 font-serif text-2xl font-medium text-foreground md:text-3xl">
              The 4-stage decision tunnel
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
              Every signal passes through a structured pipeline. No raw listing data goes directly to a decision.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {DECISION_STEPS.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.step} className={`rounded-2xl border p-5 ${step.border}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-bold tabular-nums text-muted-foreground/40">{step.step}</span>
                    <Icon className={`h-4 w-4 ${step.color}`} />
                    <p className={`text-sm font-semibold ${step.color}`}>{step.label}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.detail}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Intelligence surfaces ── */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">The platform</p>
            <h2 className="mt-2 font-serif text-2xl font-medium text-foreground md:text-3xl">
              Six intelligence surfaces
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
              Each surface is a different entry point into the same underlying scored dataset.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {SURFACES.map((s) => {
              const Icon = s.icon
              return (
                <Link
                  key={s.label}
                  href={s.href}
                  className={`group flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-black/20 ${s.bg}`}
                >
                  <div>
                    <Icon className={`h-5 w-5 ${s.accent}`} />
                    <p className="mt-3 text-sm font-semibold text-foreground">{s.label}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.description}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    {s.cta}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ── Who it's for ── */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/50">Who this is for</p>
            <h2 className="mt-2 font-serif text-2xl font-medium text-foreground md:text-3xl">
              Built for people who make real decisions
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {WHO_FOR.map((w) => (
              <div key={w.audience} className="rounded-2xl border border-border/60 bg-card/50 px-6 py-5">
                <p className="text-sm font-semibold text-foreground">{w.audience}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{w.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Evidence trust bar ── */}
        <section className="mt-12 rounded-2xl border border-border bg-card px-6 py-5">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <ShieldCheck className="h-8 w-8 shrink-0 text-primary/60" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">5-Layer Evidence Stack — you always know how reliable a number is</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  { tag: "L1 Canonical", color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" },
                  { tag: "L2 Derived", color: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
                  { tag: "L3 Dynamic", color: "border-amber-500/40 bg-amber-500/10 text-amber-400" },
                  { tag: "L4 External", color: "border-orange-500/40 bg-orange-500/10 text-orange-400" },
                  { tag: "L5 Raw", color: "border-red-500/40 bg-red-500/10 text-red-400" },
                ].map((l) => (
                  <span key={l.tag} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${l.color}`}>
                    {l.tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Raw external data never drives a decision directly. Every metric is adjudicated through the pipeline before reaching L1 Canonical status.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/docs/data-information"
                className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-primary hover:underline"
              >
                How data works <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </main>
  )
}
