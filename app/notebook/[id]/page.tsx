"use client"

import { useEffect, useState, use } from "react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"

type BookPageStatus = "pending" | "generating" | "ready" | "error"
type BookPageType = "overview" | "transactions" | "comparison" | "opportunity" | "risk" | "memo" | "content"

type BookPage = {
  id: string
  type: BookPageType
  title: string
  rawText: string | null
  status: BookPageStatus
  updatedAt: string
}

type BookDetail = {
  id: string
  title: string
  subject: string
  type: string
  pageCount: number
  pages: BookPage[]
  updatedAt: string
}

const ALL_PAGE_TYPES: BookPageType[] = ["overview", "risk", "memo", "opportunity", "comparison", "transactions"]

const PAGE_ICONS: Record<string, string> = {
  overview: "◈",
  risk: "⚡",
  memo: "📄",
  opportunity: "◎",
  comparison: "⇌",
  transactions: "↗",
  content: "○",
}

export default function NotebookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [book, setBook] = useState<BookDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [activePage, setActivePage] = useState<string>("overview")
  const [generating, setGenerating] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<BookPageType[]>(["overview", "risk"])

  useEffect(() => {
    fetch(`/api/notebook/books/${id}`)
      .then((r) => r.json())
      .then((d) => {
        setBook(d.book ?? null)
        if (d.book?.pages?.length > 0) {
          setActivePage(d.book.pages[0].type)
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  async function handleGenerate() {
    if (!book || generating) return
    setGenerating(true)
    try {
      const res = await fetch(`/api/notebook/books/${id}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages: selectedTypes }),
      })
      const data = await res.json()
      if (data.pages) {
        setBook((prev) => {
          if (!prev) return prev
          const existing = prev.pages.filter((p) => !data.pages.some((np: BookPage) => np.type === p.type))
          return { ...prev, pages: [...existing, ...data.pages], pageCount: existing.length + data.pages.length }
        })
        setActivePage(data.pages[0]?.type ?? activePage)
      }
    } finally {
      setGenerating(false)
    }
  }

  function toggleType(type: BookPageType) {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    )
  }

  if (loading) {
    return (
      <main id="main-content">
        <Navbar />
        <div className="mx-auto max-w-5xl px-6 pt-32 text-center text-sm text-zinc-500">Loading…</div>
      </main>
    )
  }

  if (!book) {
    return (
      <main id="main-content">
        <Navbar />
        <div className="mx-auto max-w-5xl px-6 pt-32 text-center">
          <p className="text-sm text-zinc-400">Notebook not found.</p>
          <Link href="/notebook" className="mt-4 inline-block text-sm text-emerald-400 hover:underline">
            ← Back to notebooks
          </Link>
        </div>
      </main>
    )
  }

  const currentPage = book.pages.find((p) => p.type === activePage)

  return (
    <main id="main-content">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-32">
        {/* Header */}
        <div className="mb-6">
          <Link href="/notebook" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Notebooks
          </Link>
          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-white">{book.title}</h1>
              <p className="mt-0.5 text-sm text-zinc-400">{book.subject}</p>
            </div>
            <span className="shrink-0 rounded-md border border-zinc-700 px-2 py-0.5 text-xs text-zinc-400 uppercase">
              {book.type}
            </span>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-48 shrink-0 space-y-1">
            {book.pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.type)}
                className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  activePage === page.type
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <span className="text-xs">{PAGE_ICONS[page.type] ?? "○"}</span>
                <span className="capitalize">{page.title}</span>
              </button>
            ))}

            {/* Generate section */}
            <div className="mt-4 border-t border-zinc-800 pt-4">
              <p className="mb-2 px-1 text-xs font-medium text-zinc-500 uppercase tracking-wide">Generate</p>
              {ALL_PAGE_TYPES.filter((t) => !book.pages.some((p) => p.type === t)).map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-zinc-800/50 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="accent-emerald-500"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span className="text-xs text-zinc-400 capitalize">{type}</span>
                </label>
              ))}
              {ALL_PAGE_TYPES.some((t) => !book.pages.some((p) => p.type === t)) && (
                <button
                  onClick={handleGenerate}
                  disabled={generating || selectedTypes.length === 0}
                  className="mt-2 w-full rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors"
                >
                  {generating ? "Generating…" : "Generate Pages"}
                </button>
              )}
            </div>

            {/* Regenerate existing */}
            {book.pages.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:text-white hover:border-zinc-600 disabled:opacity-50 transition-colors"
                >
                  {generating ? "…" : "↺ Regenerate"}
                </button>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {book.pages.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-16 text-center">
                <p className="text-sm text-zinc-400">No pages generated yet.</p>
                <p className="mt-1 text-xs text-zinc-600">Select page types from the sidebar and click Generate.</p>
              </div>
            ) : currentPage ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white capitalize">
                    {PAGE_ICONS[currentPage.type]} {currentPage.title}
                  </h2>
                  <span className="text-xs text-zinc-600">
                    {new Date(currentPage.updatedAt).toLocaleString()}
                  </span>
                </div>
                {currentPage.rawText ? (
                  <pre className="whitespace-pre-wrap font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
                    {currentPage.rawText}
                  </pre>
                ) : (
                  <p className="text-sm text-zinc-500">No content generated.</p>
                )}
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-16 text-center">
                <p className="text-sm text-zinc-400">Select a page from the sidebar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
