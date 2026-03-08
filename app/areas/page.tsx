import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AreasView } from "@/components/decision/areas-view";
import { AreaCard } from "@/components/decision/area-card"
import { listAreas } from "@/lib/decision-infrastructure"

export const dynamic = "force-dynamic"

export default async function AreasPage() {
  const data = await listAreas()

  return (
    <main id="main-content">
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-28 md:pt-36">
        <header className="mb-6">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Areas</p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground md:text-5xl">Area Intelligence Map</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {data.areas.length.toLocaleString()} area profiles — each with pricing depth, yield averages, and market timing signals from live project data.
          </p>
        </header>

        {/* Quick stats strip */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(() => {
            const withYield = data.areas.filter((a) => typeof a.avg_yield === "number")
            const avgYield = withYield.length > 0
              ? withYield.reduce((sum, a) => sum + (a.avg_yield as number), 0) / withYield.length
              : null
            const cities = [...new Set(data.areas.map((a) => a.city).filter(Boolean))]
            return (
              <>
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/70 px-4 py-2">
                  <span className="text-xs text-muted-foreground">Areas tracked:</span>
                  <span className="text-xs font-semibold text-foreground">{data.areas.length}</span>
                </div>
                {avgYield !== null ? (
                  <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/70 px-4 py-2">
                    <span className="text-xs text-muted-foreground">Avg yield:</span>
                    <span className="text-xs font-semibold text-emerald-400">{avgYield.toFixed(1)}%</span>
                  </div>
                ) : null}
                {cities.slice(0, 4).map((city) => (
                  <div key={city} className="rounded-xl border border-border/60 bg-card/70 px-4 py-2 text-xs text-muted-foreground">
                    {city}
                  </div>
                ))}
              </>
            )
          })()}
        </div>

        <AreasView areas={data.areas} />
      </div>
      <Footer />
    </main>
  )
}
