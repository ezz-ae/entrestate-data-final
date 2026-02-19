"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Code2, Lock, Unlock } from "lucide-react"

const STORAGE_KEY = "entrestate.developer-mode"

const endpoints = [
  "/api/chat",
  "/api/markets",
  "/api/market-score/*",
  "/api/automation-runtime/*",
  "/api/daas",
]

export default function ApiPage() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    setEnabled(window.localStorage.getItem(STORAGE_KEY) === "true")
  }, [])

  const toggleMode = (value: boolean) => {
    setEnabled(value)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value ? "true" : "false")
    }
  }

  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1000px] px-6">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Developer mode</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">API surface</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              The API is hidden by default. Enable developer mode when you need to inspect endpoints and payloads.
            </p>
          </header>

          <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Code2 className="h-4 w-4 text-accent" />
                Developer access
              </div>
              <button
                onClick={() => toggleMode(!enabled)}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-foreground hover:border-primary/40"
              >
                {enabled ? <Unlock className="h-3.5 w-3.5 text-accent" /> : <Lock className="h-3.5 w-3.5" />}
                {enabled ? "Disable mode" : "Enable mode"}
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-border/60 bg-background/50 p-4 text-sm text-muted-foreground">
              {enabled
                ? "Developer mode is enabled. Endpoint listings are visible below."
                : "Enable developer mode to reveal API endpoints."}
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint}
                  className={`rounded-xl border border-border/60 px-4 py-3 text-sm ${
                    enabled ? "bg-background/60 text-foreground" : "bg-muted/30 text-muted-foreground"
                  }`}
                >
                  {enabled ? endpoint : "Hidden endpoint"}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
