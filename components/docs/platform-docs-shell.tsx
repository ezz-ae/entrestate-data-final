"use client"

import type { ComponentType, ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, Command, FileText, Handshake, Building2, Briefcase, BarChart3, BookOpen } from "lucide-react"

type DocsNavItem = {
  title: string
  href: string
  icon: ComponentType<{ className?: string }>
}

type DocsNavGroup = {
  title: string
  items: DocsNavItem[]
}

const docsNavGroups: DocsNavGroup[] = [
  {
    title: "Main Sections",
    items: [
      { title: "Overview", href: "/docs", icon: BookOpen },
      { title: "Partners & APIs", href: "/docs/partners-apis", icon: Handshake },
      { title: "Documentation", href: "/docs/documentation", icon: FileText },
      { title: "Industry", href: "/docs/industry", icon: Building2 },
      { title: "Careers & Intern", href: "/docs/careers-intern", icon: Briefcase },
      { title: "Investors Relations", href: "/docs/investors-relations", icon: BarChart3 },
      { title: "Mind Map Articles", href: "/docs/articles", icon: FileText },
      { title: "Data & Information", href: "/docs/data-information", icon: FileText },
    ],
  },
  {
    title: "Insights",
    items: [
      { title: "Docs", href: "/docs", icon: BookOpen },
      { title: "Markets", href: "/markets", icon: Building2 },
      { title: "Search", href: "/search", icon: FileText },
    ],
  },
  {
    title: "Company",
    items: [
      { title: "About", href: "/about", icon: Building2 },
      { title: "Investor Relations", href: "/docs/investors-relations", icon: BarChart3 },
      { title: "Changelog", href: "/changelog", icon: FileText },
      { title: "Roadmap", href: "/roadmap", icon: FileText },
      { title: "Support", href: "/support", icon: FileText },
    ],
  },
  {
    title: "Status",
    items: [
      { title: "Status", href: "/status", icon: FileText },
      { title: "Contact", href: "/contact", icon: FileText },
    ],
  },
]

function isActivePath(pathname: string, href: string) {
  if (href === "/docs") return pathname === "/docs"
  return pathname.startsWith(href)
}

export function PlatformDocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_circle_at_50%_-20%,rgba(56,189,248,0.14),transparent_52%)]" />
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex h-14 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/docs" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
              <div className="flex gap-0.5" aria-hidden="true">
                <div className="h-2.5 w-2.5 rounded-sm bg-foreground" />
                <div className="h-2.5 w-2.5 rounded-sm bg-foreground/60" />
                <div className="h-2.5 w-2.5 rounded-sm bg-accent" />
              </div>
              Entrestate Docs
            </Link>
            <nav className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
              <Link href="/docs/documentation" className="hover:text-foreground transition-colors">
                Platform Map
              </Link>
              <Link href="/docs/partners-apis" className="hover:text-foreground transition-colors">
                Partners
              </Link>
              <Link href="/docs/investors-relations" className="hover:text-foreground transition-colors">
                Investors
              </Link>
              <Link href="/docs/articles" className="hover:text-foreground transition-colors">
                Articles
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="hidden items-center gap-1 rounded-md border border-border/70 px-2 py-1 text-xs text-muted-foreground sm:flex hover:text-foreground"
            >
              <Command className="h-3.5 w-3.5" />
              <span>Search docs</span>
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Bot className="h-3.5 w-3.5" />
              AI Support
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-0 md:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-border/70 md:block">
          <div className="sticky top-14 h-[calc(100vh-56px)] overflow-y-auto p-4">
            <div className="space-y-5">
              {docsNavGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 px-2 text-xs uppercase tracking-wider text-muted-foreground">{group.title}</p>
                  <nav className="space-y-1">
                    {group.items.map((item) => {
                      const active = isActivePath(pathname, item.href)
                      return (
                        <Link
                          key={`${group.title}-${item.href}`}
                          href={item.href}
                          className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors ${
                            active
                              ? "bg-accent/15 text-foreground border border-accent/30"
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          }`}
                        >
                          <item.icon className="h-4 w-4" />
                          {item.title}
                        </Link>
                      )
                    })}
                  </nav>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-emerald-500/35 bg-emerald-500/10 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200">AI Workflow</p>
              <p className="mt-1 text-xs text-emerald-100/90">
                Ask AI to summarize any section into partner or investor-ready briefs.
              </p>
              <Link href="/chat" className="mt-2 inline-block text-xs font-medium text-emerald-100 underline-offset-2 hover:underline">
                Open assistant
              </Link>
            </div>
          </div>
        </aside>

        <main id="main-content" className="min-h-[calc(100vh-56px)]">
          <div className="mx-auto w-full max-w-[980px] px-4 py-6 sm:px-6 sm:py-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
