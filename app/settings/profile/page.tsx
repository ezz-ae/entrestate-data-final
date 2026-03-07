"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Target, Gauge, Brain, Save, Loader2, Check } from "lucide-react"

const horizonOptions = [
  { value: "ready", label: "Ready now" },
  { value: "6-12mo", label: "6-12 months" },
  { value: "1-2yr", label: "1-2 years" },
  { value: "2-4yr", label: "2-4 years" },
  { value: "4yr+", label: "4+ years" },
]

export default function ProfileSettingsPage() {
  const [riskBias, setRiskBias] = useState(65)
  const [yieldVsSafety, setYieldVsSafety] = useState(50)
  const [horizon, setHorizon] = useState("ready")
  const [preferredMarkets, setPreferredMarkets] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data) {
          setRiskBias(Math.round((data.riskBias ?? 0.65) * 100))
          setYieldVsSafety(Math.round((data.yieldVsSafety ?? 0.5) * 100))
          setHorizon(data.horizon ?? "ready")
          setPreferredMarkets((data.preferredMarkets ?? []).join(", "))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function saveProfile() {
    setSaving(true)
    setSaved(false)
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          riskBias: riskBias / 100,
          yieldVsSafety: yieldVsSafety / 100,
          horizon,
          preferredMarkets: preferredMarkets
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      // Silent failure
    } finally {
      setSaving(false)
    }
  }

  return (
    <main id="main-content">
      <Navbar />
      <div className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <header className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Settings - Profile</p>
            <h1 className="mt-3 text-3xl md:text-5xl font-serif text-foreground">Decision profile</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
              Profile settings drive how match scores and narratives are weighted across the platform.
            </p>
          </header>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Risk + Horizon */}
              <div className="rounded-2xl border border-border/70 bg-card/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Risk + Horizon</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Market weight bias ({riskBias}%)
                    </label>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Higher = more weight on objective market data vs personal match.
                    </p>
                    <input
                      type="range"
                      min={30}
                      max={90}
                      value={riskBias}
                      onChange={(e) => setRiskBias(Number(e.target.value))}
                      className="w-full accent-foreground"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>Personal match</span>
                      <span>Market data</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Investment horizon
                    </label>
                    <select
                      value={horizon}
                      onChange={(e) => setHorizon(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                      {horizonOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Yield vs Safety */}
              <div className="rounded-2xl border border-border/70 bg-card/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Investment style</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Yield vs Safety ({yieldVsSafety}%)
                    </label>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      {yieldVsSafety < 35
                        ? "Conservative: prioritize safety and capital preservation."
                        : yieldVsSafety < 65
                          ? "Balanced: optimize for risk-adjusted returns."
                          : "Growth: prioritize yield and upside potential."}
                    </p>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={yieldVsSafety}
                      onChange={(e) => setYieldVsSafety(Number(e.target.value))}
                      className="w-full accent-foreground"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>Capital safety</span>
                      <span>Yield growth</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Current archetype: </span>
                      {yieldVsSafety < 35
                        ? "Conservative"
                        : yieldVsSafety < 65
                          ? "Balanced"
                          : yieldVsSafety < 85
                            ? "Growth"
                            : "Opportunistic"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="rounded-2xl border border-border/70 bg-card/70 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Gauge className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">
                      Preferred markets
                    </label>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Comma-separated areas or cities to prioritize.
                    </p>
                    <input
                      type="text"
                      value={preferredMarkets}
                      onChange={(e) => setPreferredMarkets(e.target.value)}
                      placeholder="Dubai Marina, JVC, Downtown"
                      className="w-full rounded-xl border border-border/60 bg-background/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                    <p className="text-xs text-muted-foreground">
                      Preferences drive default filters and match-score weighting across chat, search, and reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          {!loading && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={saveProfile}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-6 py-2.5 text-sm font-medium transition hover:bg-foreground/90 disabled:opacity-50"
              >
                {saving ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                ) : saved ? (
                  <><Check className="h-4 w-4" /> Saved</>
                ) : (
                  <><Save className="h-4 w-4" /> Save profile</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
