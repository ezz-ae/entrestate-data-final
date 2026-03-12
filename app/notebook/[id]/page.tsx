"use client"

import { useEffect, useState, use } from "react"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, ChevronLeft, ChevronRight, FileText, Globe, Loader2, Play, RefreshCcw, Save, Share2, Sparkles, WandSparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      <main id="main-content" className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-40 space-y-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Opening Book...</p>
        </div>
      </main>
    )
  }

  if (!book) {
    return (
      <main id="main-content" className="min-h-screen bg-background flex flex-col items-center justify-center">
        <Navbar />
        <h2 className="text-2xl font-serif font-bold text-foreground">Notebook not found</h2>
        <Button variant="link" asChild className="mt-4">
          <Link href="/notebook">Return to Library</Link>
        </Button>
      </main>
    )
  }

  const activePageData = book.pages.find((p) => p.type === activePage)

  return (
    <main id="main-content" className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* ── Header ── */}
      <div className="border-b border-border bg-card/30 backdrop-blur-md pt-24 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Link href="/notebook" className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  <BookOpen className="h-3 w-3" />
                  Notebook Intelligence
                </div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-tight">{book.title}</h1>
                <p className="text-sm text-muted-foreground font-medium mt-1">{book.subject}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button 
                variant="intelligent" 
                size="sm" 
                className="rounded-xl h-10 gap-2 px-6"
                onClick={handleGenerate}
                disabled={generating}
              >
                {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
                Sync Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ── Sidebar Navigation ── */}
          <aside className="lg:col-span-3">
            <div className="space-y-1 sticky top-36">
              <p className="px-3 mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">Chapters</p>
              {ALL_PAGE_TYPES.map((type) => {
                const page = book.pages.find((p) => p.type === type)
                const isActive = activePage === type
                return (
                  <button
                    key={type}
                    onClick={() => page && setActivePage(type)}
                    disabled={!page}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                        : page 
                          ? "hover:bg-secondary text-foreground/70 hover:text-foreground" 
                          : "opacity-30 cursor-not-allowed grayscale"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg opacity-80 group-hover:scale-110 transition-transform">
                        {PAGE_ICONS[type]}
                      </span>
                      <span className="capitalize">{type}</span>
                    </div>
                    {page && !isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />}
                  </button>
                )
              })}

              <div className="mt-10 p-4 rounded-2xl bg-secondary/30 border border-border/40">
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest mb-3">
                  <Sparkles className="h-3 w-3" />
                  AI Sync Controls
                </div>
                <div className="space-y-2">
                  {ALL_PAGE_TYPES.map(type => (
                    <label key={`check-${type}`} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="rounded border-border text-primary focus:ring-primary/20"
                      />
                      <span className="text-[11px] font-bold text-muted-foreground group-hover:text-foreground transition-colors capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main Content Area ── */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[600px] rounded-3xl border border-border bg-card shadow-2xl shadow-black/5 overflow-hidden"
              >
                {activePageData ? (
                  <div className="p-8 md:p-12">
                    <header className="mb-10 pb-8 border-b border-border/40">
                      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/60 mb-3">
                        <div className="w-8 h-px bg-primary/20" />
                        Intelligence Chapter
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground capitalize leading-tight">
                        {activePageData.title || activePageData.type}
                      </h2>
                    </header>
                    
                    <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-lg prose-headings:font-serif prose-headings:font-bold">
                      {activePageData.rawText ? (
                        <div className="whitespace-pre-wrap leading-relaxed text-lg text-muted-foreground/90">
                          {activePageData.rawText}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                          <WandSparkles className="h-12 w-12 mb-4" />
                          <p className="text-lg italic">Analysis content is being processed...</p>
                        </div>
                      )}
                    </div>

                    <footer className="mt-20 pt-8 border-t border-border/40 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                      <span>Ref: NB-{book.id.slice(0, 4)}-{activePageData.id.slice(0, 4)}</span>
                      <span>Verified Intelligence Output</span>
                    </footer>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-40 text-center">
                    <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-6">
                      <FileText className="h-10 w-10 text-muted-foreground/40" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground">Chapter Empty</h3>
                    <p className="mt-2 text-muted-foreground max-w-xs mx-auto">This intelligence chapter hasn't been generated yet.</p>
                    <Button 
                      variant="outline" 
                      className="mt-8 h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-xs"
                      onClick={handleGenerate}
                    >
                      <Play className="h-3.5 w-3.5 mr-2" />
                      Run Synthesis
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  )
}
