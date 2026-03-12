import Link from "next/link"
import { motion } from "framer-motion"
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
  Search,
  FileText,
  Code,
  Globe,
} from "lucide-react"
import { platformDocsSections } from "@/lib/platform-docs"
import type { ComponentType } from "react"
import { Button } from "@/components/ui/button"

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
    <div className="selection:bg-primary/20">
      {/* Hero */}
      <header className="mb-12 relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-card/40 backdrop-blur-xl p-8 md:p-16 shadow-2xl shadow-black/5">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/5 rounded-full border border-primary/10 mb-6">
            <Globe className="w-3 h-3" />
            Knowledge Base v4.0
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-[1.1] tracking-tight max-w-3xl">
            The Intelligence OS for<br />
            <span className="text-muted-foreground/40 italic">UAE Real Estate</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground font-medium leading-relaxed">
            Entrestate is <span className="text-foreground">decision infrastructure</span>. We transform raw market signals into defensible, institutional-grade outcomes through an auditable Pipeline-to-Tunnel architecture.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button variant="premium" size="lg" asChild className="h-12 px-8 shadow-xl">
              <Link href="/docs/investors-relations">
                Investor Package
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-12 px-8 rounded-full border-border/60">
              <Link href="/docs/documentation">
                Technical Spec
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {platformDocsSections.map((section) => {
          const Icon = sectionIcon[section.slug] || FileText
          return (
            <Link key={section.slug} href={`/docs/${section.slug}`} className="group">
              <div className="h-full p-8 rounded-[2rem] border border-border/60 bg-card/30 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card hover:shadow-2xl hover:shadow-primary/5">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{section.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{section.description}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all">
                  Browse Section <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Key Numbers */}
      <section className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {keyNumbers.map((item) => (
          <div key={item.label} className="rounded-3xl border border-border/40 bg-card/20 p-8 text-center backdrop-blur-sm">
            <p className="text-3xl font-serif font-bold text-foreground md:text-4xl mb-1">{item.value}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{item.label}</p>
            <p className="mt-2 text-xs text-muted-foreground font-medium">{item.detail}</p>
          </div>
        ))}
      </section>

      {/* Architecture Section */}
      <section className="rounded-[3rem] border border-border/70 bg-foreground text-background p-10 md:p-20 relative overflow-hidden shadow-2xl shadow-foreground/20">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight mb-8">The One-System Model</h2>
          <p className="text-lg md:text-xl text-background/70 font-medium leading-relaxed mb-12">
            Entrestate replaces fragmented data silos with a unified <span className="text-background underline decoration-primary underline-offset-8">Pipeline-to-Tunnel</span> architecture. Every internal signal is inseparable from the final decision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Supply Chain", desc: "Sequential data refinement across 10 distinct phases.", icon: Layers },
              { title: "Governance", desc: "Institutional-grade verification for every data object.", icon: Shield },
              { title: "The Tunnel", desc: "High-conviction investment outcomes and analysis.", icon: Target },
            ].map((feature, i) => (
              <div key={i} className="p-6 rounded-2xl border border-background/10 bg-background/5">
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">{feature.title}</h4>
                <p className="text-xs text-background/60 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

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
