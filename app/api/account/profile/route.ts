import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSyncedUser } from "@/lib/auth/sync"
import { getRequestId } from "@/lib/api-errors"
import { hasTierAccess } from "@/lib/tier-access"

export async function POST(request: Request) {
  const requestId = getRequestId(request)
  const user = await getSyncedUser()
  
  if (!user) {
    return NextResponse.json({ error: "Unauthorized", requestId }, { status: 401 })
  }

  // Restrict to Enterprise/Institutional
  if (!await hasTierAccess(request, "institutional")) {
    return NextResponse.json({ error: "Institutional tier required", requestId }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { riskBias, yieldVsSafety, horizon, preferredMarkets } = body

    const updatedProfile = await prisma.userProfile.update({
      where: { userId: user.id },
      data: {
        riskBias: typeof riskBias === "number" ? riskBias : undefined,
        yieldVsSafety: typeof yieldVsSafety === "number" ? yieldVsSafety : undefined,
        horizon: typeof horizon === "string" ? horizon : undefined,
        preferredMarkets: Array.isArray(preferredMarkets) ? preferredMarkets : undefined,
      },
    })

    return NextResponse.json({ profile: updatedProfile, requestId })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Failed to update profile", requestId }, { status: 500 })
  }
}
