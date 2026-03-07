import "server-only"
import { prisma } from "@/lib/prisma"
import { getSyncedUser } from "@/lib/auth/sync"

export type EnterpriseStrategicContext = {
  riskBias: number
  yieldVsSafety: number
  horizon: string
  preferredMarkets: string[]
  isInstitutional: boolean
}

/**
 * Fetches the user's strategic profile and returns it as a context object
 * for the AI to personalize its recommendations.
 */
export async function getEnterpriseStrategicContext(): Promise<EnterpriseStrategicContext | null> {
  const user = await getSyncedUser()
  if (!user) return null

  // Ensure we have a profile
  const profile = user.profile || await prisma.userProfile.findUnique({
    where: { userId: user.id }
  })

  return {
    riskBias: profile?.riskBias ?? 0.65,
    yieldVsSafety: profile?.yieldVsSafety ?? 0.5,
    horizon: profile?.horizon ?? "Ready",
    preferredMarkets: profile?.preferredMarkets ?? [],
    // You'd typically check entitlements here as well
    isInstitutional: true, 
  }
}

/**
 * Generates a strategic narrative based on the user's profile biases.
 */
export function getStrategicNarrative(context: EnterpriseStrategicContext): string {
  const bias = context.yieldVsSafety > 0.6 ? "Yield Maximization" : context.yieldVsSafety < 0.4 ? "Capital Safety" : "Balanced Growth"
  const risk = context.riskBias > 0.7 ? "Aggressive" : context.riskBias < 0.3 ? "Conservative" : "Moderate"
  
  return `Analyzing through the lens of ${bias} with a ${risk} risk profile and a ${context.horizon} investment horizon.`
}
