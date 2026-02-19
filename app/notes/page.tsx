import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StickyNote, Link2, FileText } from "lucide-react"

const noteCards = [
  {
    title: "Market Files",
    detail: "Narratives tied to Time Tables, with citations preserved.",
    icon: StickyNote,
  },
  {
    title: "Linked Evidence",
    detail: "Every note references rows, columns, and provenance metadata.",
    icon: Link2,
  },
  {
    title: "Client Briefs",
    detail: "Draft memos for investors, brokers, and internal teams.",
    icon: FileText,
  },
]

export default function NotesPage() {
  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Market Files</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Notes with proof, not opinions.</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Market Files capture narrative and evidence side-by-side so decisions remain auditable.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {noteCards.map((card) => (
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
