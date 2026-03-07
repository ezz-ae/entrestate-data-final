"use client"

import Link from "next/link"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { ArrowRight } from "lucide-react"

const footerLinks = {
  Platform: [
    { label: "Documentation", href: "/docs" },
    { label: "Reports Library", href: "/reports/library" },
    { label: "Partners & APIs", href: "/docs/partners-apis" },
    { label: "Industry", href: "/docs/industry" },
    { label: "Careers & Intern", href: "/docs/careers-intern" },
    { label: "AI", href: "/ai" },
  ],
  Insights: [
    { label: "Markets", href: "/markets" },
    { label: "Search", href: "/search" },
    { label: "Top Data", href: "/top-data" },
    { label: "Market Score", href: "/market-score" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Investor Relations", href: "/docs/investors-relations" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
    { label: "Support", href: "/support" },
  ],
  "Status & Contact": [
    { label: "Status", href: "/status" },
    { label: "Contact", href: "/contact" },
    { label: "Pricing", href: "/pricing" },
  ],
  "Data & Information": [
    { label: "Dubai Land Department", href: "/docs/data-information" },
    { label: "Stakeholders", href: "/docs/data-information" },
    { label: "Investor Relations Data", href: "/docs/investors-relations" },
    { label: "Source of Truth Registry", href: "/docs/source-of-truth-registry" },
    { label: "Investor KPI Audit", href: "/docs/investor-metrics-audit" },
    { label: "Mind Map Articles", href: "/docs/articles" },
  ],
  Explore: [
    { label: "Chat", href: "/chat" },
    { label: "Generated Reports", href: "/reports/generated" },
    { label: "Properties", href: "/properties" },
    { label: "Areas", href: "/areas" },
    { label: "Developers", href: "/developers" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 pt-16 pb-10">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-wider text-accent">Entrestate OS</p>
              <h3 className="text-xl md:text-2xl font-serif text-foreground">
                A clear decision desk for UAE real estate teams.
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                Markets, project evidence, and investor workflows in one place so teams can study, decide, and move with confidence.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Open Chat
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                Talk to the team
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-8 gap-8 pb-12">
          <div className="col-span-2 md:col-span-3">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-sm bg-foreground" />
                <div className="w-2.5 h-2.5 rounded-sm bg-foreground/60" />
                <div className="w-2.5 h-2.5 rounded-sm bg-accent" />
              </div>
              <span className="text-base font-medium tracking-tight text-foreground">entrestate</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Market coverage, project evidence, and investor-first workflows built for operators who need precision,
              not noise.
            </p>
            <p className="mt-4 text-xs text-muted-foreground max-w-sm">
              The platform documentation is organized in a mind-map article system for partners, stakeholders, and
              investor conversations.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h4 className="text-xs font-medium text-foreground uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} Entrestate. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  )
}
