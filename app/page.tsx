import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, MessageSquare, Search, MapPin, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Entrestate Intelligence OS",
  description: "Decision-ready real estate intelligence with chat, search, and spatial trust surfaces.",
}

const surfaces = [
  {
    title: "Chat",
    description: "Decision Tunnel with narrative notes and a Time Table split view.",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    title: "Search",
    description: "Time Table builder with tier-gated depth and precision filters.",
    href: "/search",
    icon: Search,
  },
  {
    title: "Map",
    description: "Spatial trust with heatmaps, supply pressure, and geo overlays.",
    href: "/map",
    icon: MapPin,
  },
]

const goldenPaths = [
  { label: "Underwrite Dev Site", href: "/chat?intent=underwrite_dev_site" },
  { label: "Compare Yields", href: "/chat?intent=compare_yields" },
  { label: "Draft SPA", href: "/chat?intent=draft_spa_contract" },
]

const objects = [
  { title: "Saved Time Tables", detail: "Track active tables and historical snapshots.", href: "/tables" },
  { title: "Market Files", detail: "Notes and memos tied to citations.", href: "/notes" },
  { title: "Reports", detail: "Ready templates and report builder.", href: "/reports" },
  { title: "Artifacts", detail: "PDF, PPT, CSV, and embed outputs.", href: "/artifacts" },
  { title: "Automations", detail: "WhatsApp, IG DM, and ads agents.", href: "/automations" },
]

const enterprise = [
  { title: "Brand", detail: "Logo and colors synced to artifacts.", href: "/settings/brand" },
  { title: "Profile", detail: "Risk horizon and behavioral inference.", href: "/settings/profile" },
  { title: "Tier", detail: "Time depth, saved tables, premium columns.", href: "/settings/tier" },
  { title: "API", detail: "Developer mode surface, hidden by default.", href: "/api" },
]

export default function Home() {
  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-slate-900/65 via-slate-950/70 to-black/80 p-10 md:p-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.22),transparent_60%)]" />
            <div className="relative max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Entrestate Intelligence OS</p>
              <h1 className="mt-4 text-3xl md:text-5xl font-serif text-foreground leading-tight">
                One system for underwriting, discovery, and spatial trust.
              </h1>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                The inventory is the spine. Everything else is a decision surface layered on top, so teams move from
                question to evidence without guessing.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/chat"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Open Decision Tunnel
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Build a Time Table
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                  7,015 assets
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                  6 sources
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                  Refreshed today
                </span>
              </div>
            </div>
          </section>

          <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {surfaces.map((surface) => (
              <Link
                key={surface.title}
                href={surface.href}
                className="group rounded-2xl border border-border/70 bg-card/70 p-6 transition-all hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-center justify-between">
                  <surface.icon className="h-6 w-6 text-accent" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Primary surface</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-foreground">{surface.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{surface.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
                  Enter surface <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </section>

          <section className="mt-12 rounded-2xl border border-border/70 bg-background/60 p-8">
            <div className="flex items-center gap-3 text-sm font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Golden paths
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Pre-validated flows that keep the TableSpec and narrative consistent.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {goldenPaths.map((path) => (
                <Link
                  key={path.label}
                  href={path.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
                >
                  {path.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border/70 bg-card/70 p-7">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Objects</p>
              <h3 className="mt-3 text-2xl font-serif text-foreground">Decision objects, not feature menus.</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Each surface outputs a Time Table, a note, or an artifact that can be reused across workflows.
              </p>
              <div className="mt-6 space-y-3">
                {objects.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground hover:border-primary/40"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.detail}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/70 p-7">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Enterprise controls</p>
              <h3 className="mt-3 text-2xl font-serif text-foreground">Govern the system from one panel.</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Brand, profile, and tier settings govern every artifact and feed for the organization.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {enterprise.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-xl border border-border/60 bg-background/50 px-4 py-4 text-sm text-foreground hover:border-primary/40"
                  >
                    <div className="font-medium">{item.title}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{item.detail}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
