"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Plus, Trash2, Clock, Map, Building2, User } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  const TYPE_ICONS: Record<string, any> = {
    client: User,
    area: Map,
    project: Building2,
    portfolio: BookOpen,
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pt-36">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-primary bg-primary/5 rounded-full border border-primary/10">
              <BookOpen className="h-3 w-3" />
              Strategic Intelligence Library
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">Market Notebooks</h1>
            <p className="mt-4 text-lg text-muted-foreground">AI-generated intelligence books for projects, areas, and portfolios. Every decision, documented.</p>
          </div>
          <Button
            onClick={() => setShowForm((v) => !v)}
            variant="intelligent"
            size="lg"
            className="h-12"
          >
            <Plus className="h-4 w-4" />
            New Intelligence Book
          </Button>
        </header>

        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleCreate}
            className="mb-12 rounded-2xl border border-border bg-card p-8 shadow-xl"
          >
            <h2 className="text-lg font-serif font-bold text-foreground mb-6">Create New Notebook</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</label>
                <input
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g. Emaar Q2 Review"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject</label>
                <input
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="e.g. Dubai Marina Performance"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                <select
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                >
                  <option value="project">Project Intelligence</option>
                  <option value="area">Area Performance</option>
                  <option value="client">Client Briefing</option>
                  <option value="portfolio">Portfolio Review</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" variant="premium" disabled={creating}>
                {creating ? "Creating..." : "Initialize Notebook"}
              </Button>
            </div>
          </motion.form>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Retrieving library...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-border bg-card/30 py-24 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-serif font-bold text-foreground">No notebooks found</h3>
            <p className="mt-2 text-muted-foreground max-w-xs mx-auto">Start by creating an AI-powered notebook to track your market research.</p>
            <Button variant="outline" className="mt-8" onClick={() => setShowForm(true)}>Initialize your first book</Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => {
              const Icon = TYPE_ICONS[book.type] || BookOpen
              return (
                <Link key={book.id} href={`/notebook/${book.id}`} className="group">
                  <motion.div 
                    whileHover={{ y: -4 }}
                    className="h-full rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`p-2 rounded-xl border ${TYPE_COLORS[book.type]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); handleDelete(book.id) }}
                        className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-destructive transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-primary transition-colors">{book.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{book.subject}</p>
                    
                    <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {new Date(book.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="h-3 w-px bg-border/40" />
                        <div className="text-[10px] font-bold uppercase tracking-wider text-primary">
                          {book.pageCount} Pages
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
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
