import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileText, PenLine, CheckCircle2 } from "lucide-react"

const reportCards = [
  {
    title: "Ready Templates",
    detail: "Underwriting, area comparisons, and SPA briefs.",
    icon: FileText,
  },
  {
    title: "Report Builder",
    detail: "Combine tables, notes, and charts into one output.",
    icon: PenLine,
  },
  {
    title: "Review Checklist",
    detail: "Evidence drawer, assumptions, and approval steps.",
    icon: CheckCircle2,
  },
]

export default function ReportsPage() {
  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Reports</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Publish the decision trail.</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Reports are structured outputs built from Time Tables, notes, and verified evidence.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reportCards.map((card) => (
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
