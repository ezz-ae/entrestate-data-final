"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"solo" | "team" | "enterprise">("solo")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-background animate-in fade-in duration-300 overflow-y-auto">
      <button
        onClick={onClose}
        className="fixed right-6 top-6 text-muted-foreground hover:text-foreground transition-colors z-10"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedPlan("solo")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlan === "solo"
                  ? "bg-primary/10 text-primary border border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Solo
            </button>
            <button
              onClick={() => setSelectedPlan("team")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlan === "team"
                  ? "bg-primary/10 text-primary border border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Team
            </button>
            <button
              onClick={() => setSelectedPlan("enterprise")}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlan === "enterprise"
                  ? "bg-primary/10 text-primary border border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Enterprise
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="border border-border rounded-xl p-8 bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Pro</h3>
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">Popular</span>
              </div>

              <div className="mb-2">
                <span className="text-3xl font-bold">$29</span>
                <span className="text-sm text-muted-foreground"> USD / month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Billed monthly, cancel anytime.</p>

              <p className="text-sm text-muted-foreground mb-6">
                Best for analysts who need deeper research and trusted sources.
              </p>

              <Button variant="secondary" disabled className="w-full mb-6">
                Your current plan
              </Button>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>More citations per answer</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Access to advanced models</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Deep research reports and memos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>File and data uploads</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Custom workspace templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>

              <p className="text-xs text-muted-foreground mt-6">
                Existing subscriber? See{" "}
                <a href="#" className="text-foreground underline">
                  billing help
                </a>
              </p>
            </div>

            <div className="border border-border rounded-xl p-8 bg-card">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Enterprise</h3>
              </div>

              <div className="mb-2">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-sm text-muted-foreground"> USD / month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Custom pricing for larger teams.</p>

              <p className="text-sm text-muted-foreground mb-6">
                Unlock higher limits, private data controls, and team collaboration.
              </p>

              <Button className="w-full mb-6 bg-primary hover:bg-primary/90">Contact sales</Button>

              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Unlimited advanced model access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Team workspaces and sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Custom connectors and data controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>SSO and audit logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Dedicated support</span>
                </li>
              </ul>

              <p className="text-xs text-muted-foreground mt-6">
                For enterprise use only and subject to our{" "}
                <a href="#" className="text-foreground underline">
                  policies
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
