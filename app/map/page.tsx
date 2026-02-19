"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Layers, Radar, Activity } from "lucide-react"

const layers = ["Pricing heatmap", "Yield bands", "Supply pressure", "Safety tiers", "Liquidity score"]
const overlays = ["Transit access", "Developer density", "Construction velocity", "Price gaps vs DLD"]

export default function MapPage() {
  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Map</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Spatial Trust Surface</h1>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
                Layer heatmaps, supply pressure, and geo overlays to understand spatial risk before underwriting.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-xs text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-accent" />
              Live overlay feed
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
            <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="h-4 w-4 text-accent" />
                Map canvas
              </div>
              <div className="mt-4 h-[420px] rounded-2xl border border-dashed border-border/70 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_60%),radial-gradient(circle_at_bottom,_rgba(148,163,184,0.18),transparent_55%)] p-6 text-sm text-muted-foreground">
                Drag to explore. Click any area to open its Time Table and related notes.
              </div>
            </section>

            <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Layers className="h-4 w-4 text-accent" />
                Active layers
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Core layers</p>
                  <div className="mt-3 space-y-2">
                    {layers.map((layer) => (
                      <div
                        key={layer}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground"
                      >
                        {layer}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Geo overlays</p>
                  <div className="mt-3 space-y-2">
                    {overlays.map((overlay) => (
                      <div
                        key={overlay}
                        className="rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground"
                      >
                        {overlay}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-muted-foreground">
                  <Radar className="h-4 w-4 text-accent inline-block mr-2" />
                  Click-through opens /tables and /notes for each zone.
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
