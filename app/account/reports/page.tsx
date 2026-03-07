import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getSyncedUser } from "@/lib/auth/sync"
import { prisma } from "@/lib/prisma"
import { FileText, Download, Calendar, ExternalLink, Filter } from "lucide-react"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Reports & Downloads - Entrestate",
  description: "Browse and download your generated decision objects, memos, and reports.",
}

export default async function ReportsPage() {
  const user = await getSyncedUser()
  if (!user) redirect("/login")

  const reports = await prisma.decisionObject.findMany({
    where: { ownerId: user.id },
    include: { timetable: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-28 md:pt-36">
        <header className="mb-12 flex items-end justify-between border-b border-border/50 pb-8">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Downloads</p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground md:text-5xl tracking-tight">
              Reports Gallery
            </h1>
            <p className="mt-4 text-muted-foreground">
              {reports.length} generated artifacts stored in your cloud safe. 
              Each report includes an auditable evidence drawer.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 rounded-xl border border-border bg-card/50 p-2 shadow-sm">
            <button className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-foreground">
              <Filter className="h-3 w-3" />
              All Artifacts
            </button>
          </div>
        </header>

        {reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="rounded-full bg-secondary/50 p-6 mb-4">
              <FileText className="h-8 w-8 text-muted-foreground opacity-20" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No reports found</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Start a decision session in AI chat to generate your first institutional report.
            </p>
            <a href="/chat" className="mt-6 rounded-lg bg-accent px-6 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent/90 transition-colors">
              Open AI chat
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reports.map((report) => (
              <div key={report.id} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-start justify-between mb-4">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <h3 className="text-base font-semibold text-foreground line-clamp-1 mb-2">
                  {report.type.replace(/_/g, " ")}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-6 h-8">
                  Generated from session intent: {report.timetable.intent}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      report.status === "ready" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {report.status}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground">
                      v{report.version}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-secondary/80">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white shadow-sm hover:bg-accent/90">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
