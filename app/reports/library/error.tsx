"use client"

import Link from "next/link"

export default function ReportsLibraryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="container mx-auto px-6 py-24">
      <section className="mx-auto max-w-2xl rounded-2xl border border-border/70 bg-card/70 p-8 text-center">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Reports Library</p>
        <h1 className="mt-3 text-2xl font-semibold text-foreground">We hit a loading issue</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The report library failed to render this request. You can retry immediately or open generated reports.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            href="/reports/generated"
            className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:border-accent/40"
          >
            Open generated reports
          </Link>
        </div>

        {error?.digest ? <p className="mt-4 text-xs text-muted-foreground">Reference: {error.digest}</p> : null}
      </section>
    </main>
  )
}

