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
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card/50 p-1 md:p-1.5 shadow-2xl shadow-black/5">
              <div className="rounded-[1.4rem] bg-card p-8">
                {!isInstitutional && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-xl p-8 text-center rounded-3xl">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="rounded-3xl bg-primary/5 p-6 mb-6 border border-primary/10 shadow-inner"
                    >
                      <Lock className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-serif font-bold text-foreground">Institutional Access Required</h3>
                    <p className="mt-3 text-muted-foreground max-w-xs mx-auto font-medium">
                      Strategic bias tuning and AI market monitoring are reserved for institutional partners.
                    </p>
                    <Button 
                      variant="intelligent"
                      size="lg"
                      asChild
                      className="mt-8 h-12 px-10"
                    >
                      <Link href="/pricing">
                        Upgrade Intelligence Tier
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
                <StrategicProfileEditor initialProfile={JSON.parse(JSON.stringify(profile))} disabled={!isInstitutional} />
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="rounded-3xl border border-border bg-secondary/20 p-8 backdrop-blur-sm">
              <h3 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.2em] text-foreground/70">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Strategic Controls
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground font-medium">
                These controls adjust the mathematical weight of objective market quality (Market Score) 
                versus your personal preferences (Match Score).
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/40 border border-border/40">
                  <TrendingUp className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Yield Maximization</p>
                    <p className="text-[11px] mt-1 text-muted-foreground/80 leading-snug">Prioritizes projects with strong rental drift and historical yield performance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-background/40 border border-border/40">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Risk Suppression</p>
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
