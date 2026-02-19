"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search, Layers, Filter, Clock } from "lucide-react"

const templates = [
  "Market inventory snapshot",
  "DLD transactions by area",
  "Rental yield leaders",
  "Developer reliability index",
  "Absorption and supply pressure",
]

const timeDepthBands = [
  { label: "30 days", tier: "Free" },
  { label: "2 years", tier: "Pro" },
  { label: "5 years", tier: "Business" },
  { label: "Unlimited", tier: "Enterprise" },
]

export default function SearchPage() {
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
            <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Filter className="h-4 w-4 text-accent" />
                Builder controls
              </div>
              <div className="mt-4 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Template</p>
                  <div className="mt-3 space-y-2">
                    {templates.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

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

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Filters</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                    <div className="rounded-xl border border-border/60 bg-background/50 px-4 py-3">
                      City / Area
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/50 px-4 py-3">
                      Status + Handover
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/50 px-4 py-3">
                      Price bands
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/50 px-4 py-3">
                      Risk + Yield
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Layers className="h-4 w-4 text-accent" />
                Time Table preview
              </div>
              <div className="mt-4 rounded-2xl border border-dashed border-border/70 bg-background/40 p-6">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Search className="h-4 w-4" />
                  Run a query to preview the Time Table here.
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
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
