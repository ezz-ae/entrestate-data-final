export type RiskAppetite = "conservative" | "balanced" | "growth" | "opportunistic"
export type HorizonBand = "ready" | "6-12mo" | "1-2yr" | "2-4yr" | "4yr+"

export type UserProfile = {
  userId: string
  riskBias: number // Default market weight (0.65)
  horizon?: string // "Ready", "1-2yr", etc.
  yieldVsSafety: number // 0.5 default
  preferredMarkets: string[]
  inferredSignals?: any // JSON blob
  updatedAt?: string
}

export type BehavioralSignal = {
  type: "lens_selected" | "suggestion_ignored" | "signal_toggled"
  lens?: "chat" | "search" | "map"
  signal?: "yield" | "risk" | "liquidity" | "price"
  timestamp?: string
}

export type ProfileAdjustment = {
  field: keyof UserProfile
  from: number | string | undefined
  to: number | string | undefined
  reason: string
}

export type ProfileInferenceResult = {
  profile: UserProfile
  adjustments: ProfileAdjustment[]
}
