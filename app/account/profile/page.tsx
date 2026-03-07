import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getSyncedUser } from "@/lib/auth/sync"
import { ShieldCheck, Target, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react"
import StrategicProfileEditor from "@/components/profile/strategic-profile-editor"
import { redirect } from "next/navigation"
import { getCurrentEntitlement } from "@/lib/account-entitlement"
import { Badge } from "@/components/ui/badge"
import { Lock } from "lucide-react"

export const metadata: Metadata = {
  title: "Strategic Profile - Entrestate",
  description: "Tune your AI investment biases and market monitoring thresholds.",
}

export default async function StrategicProfilePage() {
  const user = await getSyncedUser()
  if (!user) redirect("/login")

  const entitlement = await getCurrentEntitlement(user.id)
  const isInstitutional = entitlement.tier === "institutional"
  
  const profile = user.profile || {
    userId: user.id,
    riskBias: 0.65,
    yieldVsSafety: 0.5,
    horizon: "Ready",
    preferredMarkets: [],
    inferredSignals: null,
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-[1400px] px-6 pb-20 pt-28 md:pt-36">
        <header className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500">
            <Target className="h-3 w-3" />
            Institutional Strategic Layer
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-foreground md:text-5xl tracking-tight">
            Strategic Profile
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Configure how the Decision Tunnel interprets market data for your account. 
            These biases directly impact AI roadmaps, automated deal screening, and report narratives.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 shadow-sm">
              {!isInstitutional && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-8 text-center">
                  <div className="rounded-full bg-amber-500/10 p-4 mb-4">
                    <Lock className="h-8 w-8 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Institutional Access Required</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
                    Strategic bias tuning and AI market monitoring are available exclusively to Institutional members.
                  </p>
                  <Link 
                    href="/pricing"
                    className="mt-6 flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
                  >
                    Upgrade to Institutional
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
              <StrategicProfileEditor initialProfile={JSON.parse(JSON.stringify(profile))} disabled={!isInstitutional} />
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-border bg-secondary/30 p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                Strategic Controls
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                These controls adjust the mathematical weight of objective market quality (Market Score) 
                versus your personal preferences (Match Score).
              </p>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <TrendingUp className="mt-0.5 h-3.5 w-3.5 text-accent" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Yield Maximization</p>
                    <p className="text-[10px] text-muted-foreground">Increases weight for rental income and price drift.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 text-red-400" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Risk Suppression</p>
                    <p className="text-[10px] text-muted-foreground">Prioritizes Grade-A developers and low stress test grades.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">AI Inference Log</h3>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-[10px] text-muted-foreground">Last Session Bias</span>
                  <span className="text-[10px] font-medium text-accent">Yield Seeker (+0.07)</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-[10px] text-muted-foreground">Confidence Threshold</span>
                  <span className="text-[10px] font-medium text-blue-400">High (78%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[10px] text-muted-foreground">Inferred Horizon</span>
                  <span className="text-[10px] font-medium text-foreground">Ready-to-Move</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  )
}
