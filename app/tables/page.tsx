"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Table2, Clock, Bookmark, Plus, Loader2, RefreshCw } from "lucide-react"

type SavedTable = {
  id: string
  title: string
  hash: string
  visibility: string
  refreshPolicy: string
  lastRefreshAt: string | null
  createdAt: string
  updatedAt: string
}

export default function TablesPage() {
  const [tables, setTables] = useState<SavedTable[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/timetables")
      .then((res) => (res.ok ? res.json() : { tables: [] }))
      .then((data) => setTables(data.tables ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Saved Time Tables</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Tables are the system memory.</h1>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
                Every Time Table is a reusable object with provenance, filters, and outputs attached.
              </p>
            </div>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-2.5 text-sm font-medium transition hover:bg-foreground/90 shrink-0"
            >
              <Plus className="h-4 w-4" /> New table
            </Link>
          </header>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : tables.length === 0 ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 p-12 text-center">
                <Table2 className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No saved tables yet.</p>
                <p className="text-xs text-muted-foreground mt-1">Use the Search builder or Chat to create your first Time Table.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Live Time Tables", detail: "Pinned tables with refresh policy and last run metadata.", icon: Table2 },
                  { title: "Snapshots", detail: "Historical cuts tied to a provenance run and timestamp.", icon: Clock },
                  { title: "Saved Filters", detail: "Reusable filters and column bundles for future runs.", icon: Bookmark },
                ].map((card) => (
                  <div key={card.title} className="rounded-2xl border border-border/70 bg-card/70 p-6">
                    <card.icon className="h-5 w-5 text-accent" />
                    <h2 className="mt-4 text-lg font-semibold text-foreground">{card.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{card.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {tables.map((table) => (
                <Link
                  key={table.id}
                  href={`/t/${table.id}`}
                  className="flex items-center justify-between rounded-2xl border border-border/70 bg-card/70 p-5 transition hover:border-primary/30"
                >
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{table.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{table.visibility}</span>
                      <span className="inline-flex items-center gap-1">
                        <RefreshCw className="h-3 w-3" /> {table.refreshPolicy}
                      </span>
                      <span>Created {new Date(table.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">{table.hash.slice(0, 12)}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
