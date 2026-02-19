import { prisma } from "@/lib/prisma"
import { UserProfile } from "./types"

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  // @ts-ignore
  const profile = await prisma.userProfile.findUnique({
    where: { userId }
  })
  return profile as UserProfile | null
}

export async function upsertUserProfile(profile: Partial<UserProfile> & { userId: string }): Promise<UserProfile> {
  // @ts-ignore
  const updated = await prisma.userProfile.upsert({
    where: { userId: profile.userId },
    update: profile,
    create: {
      userId: profile.userId,
      riskBias: profile.riskBias ?? 0.65,
      horizon: profile.horizon,
      yieldVsSafety: profile.yieldVsSafety ?? 0.5,
      preferredMarkets: profile.preferredMarkets ?? []
    }
  })
  return updated as UserProfile
}

export async function recordBehavioralSignal(userId: string, signal: any) {
  // In a real system, this would append to inferredSignals JSON or a separate signals table
  // For now, we'll just log it or update a counter
  console.log(`Recording signal for user ${userId}:`, signal)
}
