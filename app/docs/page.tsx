import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Handshake,
  Briefcase,
  BarChart3,
  BookOpen,
  Database,
  Building2,
  Layers,
  Shield,
  Zap,
  Target,
} from "lucide-react"
import { platformDocsSections } from "@/lib/platform-docs"
import type { ComponentType } from "react"

const sectionIcon: Record<string, ComponentType<{ className?: string }>> = {
  "partners-apis": Handshake,
  documentation: BookOpen,
  industry: Building2,
  "careers-intern": Briefcase,
  "investors-relations": BarChart3,
  "data-information": Database,
}

const keyNumbers = [
  { label: "Active Projects", value: "7,015", detail: "Tracked across UAE" },
  { label: "Canonical Developers", value: "481", detail: "Normalized & verified" },
  { label: "BUY Signals", value: "2,667", detail: "Evidence-backed" },
  { label: "Pipeline Phases", value: "10", detail: "Sequential data refinement" },
]

export default function DocsPage() {
  return (
    <>
      {/* Hero */}
      <header className="mb-10 rounded-2xl border border-border/70 bg-card/70 p-6 md:p-10">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Platform Documentation</p>
        <h1 className="mt-3 text-3xl font-bold text-foreground md:text-5xl">
          The Intelligence OS for<br className="hidden sm:block" /> UAE Real Estate
        </h1>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground leading-relaxed">
          Entrestate is <strong className="text-foreground">decision infrastructure</strong> — not a listing portal.
          We transform raw market signals into defensible, institutional-grade investment outcomes through a unified
          Pipeline-to-Tunnel architecture. Every recommendation is a{" "}
          <strong className="text-foreground">Decision Object</strong> backed by an auditable trail of evidence.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed">
          This documentation hub is structured for partnership and investment conversations. It covers the full
          operating model, technical contracts, data governance, market positioning, and commercial architecture.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/docs/investors-relations"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Investor Package
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/docs/documentation"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-accent/40"
          >
            Technical Architecture
          </Link>
          <Link
            href="/docs/partners-apis"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-accent/40"
          >
            Partnership Models
          </Link>
        </div>
      </header>

      {/* Key Numbers */}
      <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {keyNumbers.map((item) => (
          <div key={item.label} className="rounded-2xl border border-border/70 bg-card/70 p-5 text-center">
            <p className="text-2xl font-bold text-foreground md:text-3xl">{item.value}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{item.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </section>

      {/* The One-System Model */}
      <section className="mb-8 rounded-2xl border border-border/70 bg-card/70 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground">The One-System Model</h2>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Entrestate replaces fragmented data silos with a unified &quot;Pipeline-to-Tunnel&quot; architecture. This
          linear flow establishes a one-way causal link where the internal data layer — the &quot;Supply Chain&quot; —
          is inseparable from the final decision-making desk. The architecture functions as a single mechanical
          progression:
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">The Factory</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              10-Phase Sequential Pipeline ingests raw HTML/JSON, extracts entities, verifies prices, calculates
              yields, stress-tests projects, and compiles evidence into a structured inventory of 7,015 active
              projects.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">The Warehouse</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              5-Layer Evidence Stack tags every data point from L1 Canonical (audited truths) to L5 Raw (unprocessed
              signals), ensuring operators always know the confidence level behind every number.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">The Storefront</h3>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              4-Stage Decision Tunnel hides complexity to expose only defensible outcomes — branded Decision Objects
              (PDFs, memos) with full evidence footnotes and audit trails.
            </p>
          </div>
        </div>
      </section>

      {/* Why Not a Listing Portal */}
      <section className="mb-8 rounded-2xl border border-border/70 bg-card/70 p-6 md:p-8">
        <h2 className="text-xl font-semibold text-foreground">Why Decision Infrastructure, Not a Listing Portal</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="pb-3 pr-4 font-medium text-muted-foreground">Dimension</th>
                <th className="pb-3 pr-4 font-medium text-muted-foreground">Legacy Portal</th>
                <th className="pb-3 font-medium text-foreground">Entrestate Intelligence OS</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border/30">
                <td className="py-3 pr-4 text-muted-foreground">User Role</td>
                <td className="py-3 pr-4 text-muted-foreground">Browser (manually filters noise)</td>
                <td className="py-3 text-foreground">Operator (defines deterministic constraints)</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-3 pr-4 text-muted-foreground">Data Philosophy</td>
                <td className="py-3 pr-4 text-muted-foreground">Volume-centric (sensor data as truth)</td>
                <td className="py-3 text-foreground">Integrity-centric (sensors adjudicated, not trusted)</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-3 pr-4 text-muted-foreground">Architecture</td>
                <td className="py-3 pr-4 text-muted-foreground">Flat search & filter</td>
                <td className="py-3 text-foreground">Sequential 4-Stage Decision Tunnel</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-3 pr-4 text-muted-foreground">Primary Output</td>
                <td className="py-3 pr-4 text-muted-foreground">Link to a property card</td>
                <td className="py-3 text-foreground">Branded Decision Object (auditable memo)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-muted-foreground">Verification</td>
                <td className="py-3 pr-4 text-muted-foreground">Occasional &quot;verified&quot; tags</td>
                <td className="py-3 text-foreground">Every value footnoted to a specific L-layer</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-foreground">Documentation Sections</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {platformDocsSections.map((section) => {
            const Icon = sectionIcon[section.slug] ?? BookOpen
            return (
              <article key={section.slug} className="rounded-2xl border border-border/70 bg-card/70 p-6">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{section.summary}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  {section.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <Shield className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/60" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/docs/${section.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent"
                >
                  Open section
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            )
          })}
        </div>
      </section>

      {/* AI Support */}
      <section className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-emerald-300" />
          <h2 className="text-lg font-semibold text-emerald-100">AI-Powered Documentation</h2>
        </div>
        <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
          Ask questions in plain English about any section. The AI assistant can summarize architecture, compare
          scoring models, explain evidence layers, and generate partner or investor-ready drafts grounded in platform
          logic.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-md bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/30"
          >
            Open AI Assistant
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
