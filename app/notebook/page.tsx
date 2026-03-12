"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

type BookSummary = {
  id: string
  title: string
  subject: string
  type: "client" | "area" | "project" | "portfolio"
  pageCount: number
  feedCount: number
  updatedAt: string
}

const TYPE_LABELS: Record<string, string> = {
  client: "Client",
  area: "Area",
  project: "Project",
  portfolio: "Portfolio",
}

const TYPE_COLORS: Record<string, string> = {
  client: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  area: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  project: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  portfolio: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export default function NotebookPage() {
  const [books, setBooks] = useState<BookSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: "", subject: "", type: "project" as BookSummary["type"] })

  useEffect(() => {
    fetch("/api/notebook/books")
      .then((r) => r.json())
      .then((d) => setBooks(d.books ?? []))
      .finally(() => setLoading(false))
  }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim() || !form.subject.trim()) return
    setCreating(true)
    try {
      const res = await fetch("/api/notebook/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.book) {
        setBooks((prev) => [data.book, ...prev])
        setShowForm(false)
        setForm({ title: "", subject: "", type: "project" })
      }
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this notebook?")) return
    await fetch(`/api/notebook/books/${id}`, { method: "DELETE" })
    setBooks((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <main id="main-content">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 md:pt-32">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Market Notebooks</h1>
            <p className="mt-1 text-sm text-zinc-400">AI-generated intelligence books for projects, areas, and portfolios.</p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
          >
            + New Notebook
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleCreate}
            className="mb-8 rounded-xl border border-zinc-700 bg-zinc-900 p-6 space-y-4"
          >
            <h2 className="text-sm font-semibold text-white">New Notebook</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-zinc-400">Title</label>
                <input
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. Emaar Q2 Review"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-zinc-400">Subject</label>
                <input
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. Emaar Beachfront, JVC, Marina Vista"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-zinc-400">Type</label>
              <select
                className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as BookSummary["type"] }))}
              >
                <option value="project">Project</option>
                <option value="area">Area</option>
                <option value="client">Client</option>
                <option value="portfolio">Portfolio</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors"
              >
                {creating ? "Creating…" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="py-16 text-center text-sm text-zinc-500">Loading notebooks…</div>
        ) : books.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-16 text-center">
            <p className="text-sm text-zinc-400">No notebooks yet.</p>
            <p className="mt-1 text-xs text-zinc-600">Create one to generate AI-powered market intelligence.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {books.map((book) => (
              <div
                key={book.id}
                className="group relative rounded-xl border border-zinc-800 bg-zinc-900 p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/notebook/${book.id}`}
                      className="block truncate text-sm font-medium text-white hover:text-emerald-400 transition-colors"
                    >
                      {book.title}
                    </Link>
                    <p className="mt-0.5 truncate text-xs text-zinc-500">{book.subject}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[book.type]}`}
                  >
                    {TYPE_LABELS[book.type]}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-zinc-600">
                  <span>
                    {book.pageCount} page{book.pageCount !== 1 ? "s" : ""}
                    {book.feedCount > 0 ? ` · ${book.feedCount} updates` : ""}
                  </span>
                  <div className="flex items-center gap-3">
                    <span>{new Date(book.updatedAt).toLocaleDateString()}</span>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
