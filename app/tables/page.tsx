import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Table2, Clock, Bookmark } from "lucide-react"

const tableCards = [
  {
    title: "Live Time Tables",
    detail: "Pinned tables with refresh policy and last run metadata.",
    icon: Table2,
  },
  {
    title: "Snapshots",
    detail: "Historical cuts tied to a provenance run and timestamp.",
    icon: Clock,
  },
  {
    title: "Saved Filters",
    detail: "Reusable filters and column bundles for future runs.",
    icon: Bookmark,
  },
]

export default function TablesPage() {
  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Saved Time Tables</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Tables are the system memory.</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Every Time Table is a reusable object with provenance, filters, and outputs attached.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tableCards.map((card) => (
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
