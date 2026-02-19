"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ShieldCheck } from "lucide-react"
import { TimeTableDisplay } from "@/components/timetable/display"
import { AgentResponse } from "@/lib/notebook-agent/runtime"
import { ProfileSuggestion } from "@/components/profile/suggestion"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const initialIntent = searchParams?.get("intent")

  const [message, setMessage] = useState("")
  const [chatResponse, setChatResponse] = useState<AgentResponse | null>(null)
  const [note, setNote] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const userId = "cls47m4f100003l8b4z7k2s0x"; // Placeholder: Replace with actual user ID logic

  useEffect(() => {
    if (initialIntent) {
      handleSendMessage(initialIntent, true)
    }
  }, [initialIntent])

  const handleSendMessage = async (inputMessage: string, isGoldenPath = false) => {
    if (!inputMessage.trim()) return

    setIsLoading(true)
    setError(null)
    setChatResponse(null) // Clear previous response

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ intent: inputMessage, userId }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to get response from agent.")
      }

      const data: AgentResponse = await res.json()
      setChatResponse(data)
      setMessage("") // Clear input after sending
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1440px] px-6">
          <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Decision Tunnel</p>
              <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Chat + Note + Time Table</h1>
              <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
                Run a question through the tunnel, capture the narrative, and inspect the Time Table in one split view.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              Pro+ split view enabled
            </div>
          </header>

          {!chatResponse && !isLoading && !error && (
            <div className="rounded-2xl border border-border/70 bg-card/70 p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4">Start a conversation or use a golden path:</p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => handleSendMessage("Underwrite development site", true)} variant="outline">
                  Underwrite Development Site
                </Button>
                <Button onClick={() => handleSendMessage("Compare area yields", true)} variant="outline">
                  Compare Area Yields
                </Button>
                <Button onClick={() => handleSendMessage("Draft SPA contract", true)} variant="outline">
                  Draft SPA Contract
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6">
            <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Note</h2>
                <span className="text-xs text-muted-foreground">Narrative + memo</span>
              </div>
              <div className="mt-4 space-y-4">
                {isLoading && <div className="text-sm text-muted-foreground">Loading response...</div>}
                {error && <div className="text-sm text-red-500">Error: {error}</div>}

                {chatResponse ? (
                  <div className="space-y-4">
                    <ProfileSuggestion userId={userId} context={chatResponse.title} />
                    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                      <h3 className="text-base font-semibold text-foreground">Narrative: {chatResponse.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{chatResponse.narrative}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-border/70 bg-background/40 p-4 text-sm text-muted-foreground">
                    Notes appear here after you run a question through the tunnel.
                  </div>
                )}

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Your memo</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Summarize key findings, client context, or next steps..."
                    className="mt-2 w-full min-h-[140px] rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border/70 bg-card/70 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Time Table</h2>
                <span className="text-xs text-muted-foreground">Evidence view</span>
              </div>
              <div className="mt-4">
                {chatResponse?.timetableId ? (
                  <TimeTableDisplay
                    id={chatResponse.timetableId}
                    citations={chatResponse.citations}
                    narrative={chatResponse.narrative}
                  />
                ) : (
                  <div className="rounded-xl border border-dashed border-border/70 bg-background/40 p-6 text-sm text-muted-foreground">
                    The Time Table appears here once a query is resolved.
                  </div>
                )}
              </div>

              {chatResponse?.suggestedActions && chatResponse.suggestedActions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Next actions</h3>
                  <div className="flex flex-wrap gap-2">
                    {chatResponse.suggestedActions.map((action, index) => (
                      <Button key={index} variant="outline">
                        {action.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 bg-card/70 p-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                type="text"
                placeholder="Ask Entrestate OS a question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(message)
                  }
                }}
                disabled={isLoading}
                className="flex-1"
              />
              <Button onClick={() => handleSendMessage(message)} disabled={isLoading}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
