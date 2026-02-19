import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileOutput, Presentation, FileSpreadsheet } from "lucide-react"

const artifactCards = [
  {
    title: "PDF Reports",
    detail: "Investor-ready briefs with provenance and citations.",
    icon: FileOutput,
  },
  {
    title: "PPT Decks",
    detail: "Slides synced to Time Tables and Market Files.",
    icon: Presentation,
  },
  {
    title: "CSV + Embed",
    detail: "Exports and widgets for client portals.",
    icon: FileSpreadsheet,
  },
]

export default function ArtifactsPage() {
  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Artifacts</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Outputs that travel with evidence.</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Artifacts package Time Tables and notes into shareable formats with tier-aware branding.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {artifactCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-border/70 bg-card/70 p-6">
                <card.icon className="h-5 w-5 text-accent" />
                <h2 className="mt-4 text-lg font-semibold text-foreground">{card.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{card.detail}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
