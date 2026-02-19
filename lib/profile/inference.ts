import type { BehavioralSignal, ProfileAdjustment, ProfileInferenceResult, UserProfile } from "./types"

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))

const normalizeBiases = (yieldBias: number, safetyBias: number) => {
  const total = yieldBias + safetyBias
  if (total === 0) return { yieldBias: 0.5, safetyBias: 0.5 }
  return { yieldBias: yieldBias / total, safetyBias: safetyBias / total }
}

export function inferProfileUpdate(profile: UserProfile, signals: BehavioralSignal[]): ProfileInferenceResult {
  let riskBias = profile.riskBias
  let yieldVsSafety = profile.yieldVsSafety
  const adjustments: ProfileAdjustment[] = []

  for (const signal of signals) {
    if (signal.type === "lens_selected") {
      if (signal.lens === "map") yieldVsSafety += 0.05
      if (signal.lens === "search") yieldVsSafety -= 0.05
      if (signal.lens === "chat") riskBias += 0.02
    }

    if (signal.type === "signal_toggled") {
      if (signal.signal === "yield") yieldVsSafety += 0.07
      if (signal.signal === "risk") yieldVsSafety -= 0.07
      if (signal.signal === "liquidity") riskBias -= 0.04
      if (signal.signal === "price") riskBias += 0.03
    }

    if (signal.type === "suggestion_ignored" && signal.signal === "risk") {
      yieldVsSafety += 0.04
    }
  }

  const updated: UserProfile = {
    ...profile,
    riskBias: clamp(riskBias),
    yieldVsSafety: clamp(yieldVsSafety),
    updatedAt: new Date().toISOString(),
  }

  if (updated.riskBias !== profile.riskBias) {
    adjustments.push({
      field: "riskBias",
      from: profile.riskBias,
      to: updated.riskBias,
      reason: "behavioral_signals",
    })
  }

  if (updated.yieldVsSafety !== profile.yieldVsSafety) {
    adjustments.push({
      field: "yieldVsSafety",
      from: profile.yieldVsSafety,
      to: updated.yieldVsSafety,
      reason: "behavioral_signals",
    })
  }

  return { profile: updated, adjustments }
}
