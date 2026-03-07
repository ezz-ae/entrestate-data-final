import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getRequestId } from "@/lib/api-errors"
import { listAreas, getMarketPulse } from "@/lib/decision-infrastructure"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

/**
 * Public API for Enterprise users to connect Entrestate data to their sites.
 * Requires an x-api-key header for authentication.
 */
export async function GET(request: Request) {
  const requestId = getRequestId(request)
  const apiKey = request.headers.get("x-api-key")

  if (!apiKey) {
    return NextResponse.json({ error: "Missing x-api-key header", requestId }, { status: 401 })
  }

  // Validate the API key
  const keyRecord = await prisma.apiKey.findUnique({
    where: { key: apiKey },
    include: { user: { include: { memberships: { include: { team: true } } } } }
  })

  if (!keyRecord) {
    return NextResponse.json({ error: "Invalid API key", requestId }, { status: 403 })
  }

  // Update last used at
  await prisma.apiKey.update({
    where: { id: keyRecord.id },
    data: { lastUsedAt: new Date() }
  })

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") || "dashboard"

    if (type === "dashboard") {
      const pulse = await getMarketPulse()
      const areas = await listAreas()
      
      return NextResponse.json({
        data_as_of: pulse.data_as_of,
        summary: pulse.summary,
        timing_signals: pulse.timing_signals,
        top_areas: areas.areas.slice(0, 10).map(a => ({
          name: a.area,
          projects: a.projects,
          avg_price: a.avg_price,
          avg_yield: a.avg_yield,
          slug: a.slug
        })),
        requestId,
      })
    }

    if (type === "listings") {
      // Return top-tier inventory for external display
      const rows = await prisma.entrestateMaster.findMany({
        take: 50,
        orderBy: { investment_score: "desc" },
        where: { data_confidence: "HIGH" }
      })

      return NextResponse.json({
        data_as_of: new Date().toISOString(),
        listings: rows,
        requestId,
      })
    }

    return NextResponse.json({ error: "Invalid feed type. Use 'dashboard' or 'listings'.", requestId }, { status: 400 })
  } catch (error) {
    console.error("External data API error:", error)
    return NextResponse.json({ error: "Internal market feed error", requestId }, { status: 500 })
  }
}
