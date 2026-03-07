"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, TrendingUp, Briefcase, Shield, Rocket, BarChart3, ArrowRight, SkipForward } from "lucide-react"

type Role = "broker" | "investor" | "developer" | "analyst"

const roles: { key: Role; label: string; description: string; icon: typeof Building2 }[] = [
  { key: "broker", label: "Broker", description: "I find and match buyers with the right properties", icon: Building2 },
  { key: "investor", label: "Investor", description: "I evaluate assets for capital growth or yield", icon: TrendingUp },
  { key: "developer", label: "Developer", description: "I build and sell residential or commercial projects", icon: Briefcase },
  { key: "analyst", label: "Analyst", description: "I research markets and produce reports", icon: BarChart3 },
]

const horizons = [
  { key: "ready", label: "Ready now", description: "Completed or near handover" },
  { key: "6-12mo", label: "6-12 months", description: "Under construction, soon" },
  { key: "1-2yr", label: "1-2 years", description: "Medium-term pipeline" },
  { key: "2-4yr", label: "2-4 years", description: "Long-term plays" },
  { key: "4yr+", label: "4+ years", description: "Strategic, patient capital" },
]

const budgetRanges = [
  { key: "under1m", label: "Under 1M AED", min: 0, max: 1_000_000 },
  { key: "1m-3m", label: "1M - 3M AED", min: 1_000_000, max: 3_000_000 },
  { key: "3m-10m", label: "3M - 10M AED", min: 3_000_000, max: 10_000_000 },
  { key: "10m+", label: "10M+ AED", min: 10_000_000, max: undefined },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<Role | null>(null)
  const [horizon, setHorizon] = useState("")
  const [budget, setBudget] = useState("")
  const [yieldBias, setYieldBias] = useState(50)
  const [saving, setSaving] = useState(false)

  async function finish() {
    setSaving(true)
    try {
      const profileUpdate: Record<string, unknown> = {}
      if (role) {
        profileUpdate.inferredSignals = { onboardingRole: role }
      }
      if (horizon) profileUpdate.horizon = horizon
      if (budget) {
        const match = budgetRanges.find((b) => b.key === budget)
        if (match) profileUpdate.preferredMarkets = [`budget:${match.min}-${match.max ?? "max"}`]
      }
      profileUpdate.yieldVsSafety = yieldBias / 100
      profileUpdate.riskBias = yieldBias > 60 ? 0.5 : 0.65

      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileUpdate),
      })
    } catch {
      // Profile save is non-blocking
    } finally {
      setSaving(false)
      const query = role === "broker" ? "Show me ready BUY-signal projects" : "What areas have the best yield?"
      router.push(`/chat?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= step ? "bg-foreground" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Role selection */}
        {step === 1 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Step 1 of 3</p>
            <h1 className="mt-3 text-2xl md:text-3xl font-serif text-foreground">What best describes you?</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This helps us tailor market signals and report formats to your workflow.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    setRole(r.key)
                    setStep(2)
                  }}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                    role === r.key
                      ? "border-primary/60 bg-primary/10"
                      : "border-border/60 bg-card/70 hover:border-primary/30"
                  }`}
                >
                  <r.icon className="h-5 w-5 mt-0.5 text-accent shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{r.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Budget + Horizon */}
        {step === 2 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Step 2 of 3</p>
            <h1 className="mt-3 text-2xl md:text-3xl font-serif text-foreground">Budget and timeline</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Optional. This helps filter default views and match scores.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Budget range</p>
                <div className="grid grid-cols-2 gap-2">
                  {budgetRanges.map((b) => (
                    <button
                      key={b.key}
                      onClick={() => setBudget(b.key)}
                      className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                        budget === b.key
                          ? "border-primary/60 bg-primary/10 text-foreground"
                          : "border-border/60 bg-background/50 text-foreground hover:border-primary/30"
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Investment horizon</p>
                <div className="space-y-2">
                  {horizons.map((h) => (
                    <button
                      key={h.key}
                      onClick={() => setHorizon(h.key)}
                      className={`w-full text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                        horizon === h.key
                          ? "border-primary/60 bg-primary/10 text-foreground"
                          : "border-border/60 bg-background/50 text-foreground hover:border-primary/30"
                      }`}
                    >
                      <span className="font-medium">{h.label}</span>
                      <span className="text-muted-foreground ml-2">{h.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
              >
                <SkipForward className="h-3.5 w-3.5" /> Skip
              </button>
              <button
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-5 py-2.5 text-sm font-medium transition hover:bg-foreground/90"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Yield vs Growth */}
        {step === 3 && (
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Step 3 of 3</p>
            <h1 className="mt-3 text-2xl md:text-3xl font-serif text-foreground">Investment style</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Optional. Tells the scoring engine how to weight opportunities for you.
            </p>

            <div className="mt-8">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  Capital preservation
                </div>
                <div className="flex items-center gap-1.5">
                  <Rocket className="h-3.5 w-3.5" />
                  Yield maximization
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={yieldBias}
                onChange={(e) => setYieldBias(Number(e.target.value))}
                className="w-full accent-foreground"
              />
              <div className="text-center mt-2">
                <span className="text-xs text-muted-foreground">
                  {yieldBias < 35
                    ? "Conservative — prioritize safety and capital preservation"
                    : yieldBias < 65
                      ? "Balanced — optimize for risk-adjusted returns"
                      : "Growth — prioritize yield and upside potential"}
                </span>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <button
                onClick={() => finish()}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
              >
                <SkipForward className="h-3.5 w-3.5" /> Skip
              </button>
              <button
                onClick={() => finish()}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background px-6 py-2.5 text-sm font-medium transition hover:bg-foreground/90 disabled:opacity-50"
              >
                {saving ? "Setting up..." : "Start exploring"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
