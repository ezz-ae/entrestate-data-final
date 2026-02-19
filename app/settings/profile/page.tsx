import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Target, Gauge, Brain } from "lucide-react"

const profileCards = [
  {
    title: "Risk + Horizon",
    detail: "Set default safety bands and delivery horizons.",
    icon: Target,
  },
  {
    title: "Behavioral Signals",
    detail: "Capture intent, liquidity bias, and investment posture.",
    icon: Brain,
  },
  {
    title: "Preference Weights",
    detail: "Tune yield, liquidity, and developer trust priorities.",
    icon: Gauge,
  },
]

export default function ProfileSettingsPage() {
  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Settings - Profile</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Decision profile</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Profile settings drive how match scores and narratives are weighted across the platform.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profileCards.map((card) => (
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
