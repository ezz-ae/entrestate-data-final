import { getRequestId } from "@/lib/api-errors"
import { getReport } from "@/lib/runtime-store"
import { hasTierAccess } from "@/lib/tier-access"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const requestId = getRequestId(request)
  const url = new URL(request.url)
  const requestedFormat = url.searchParams.get("format") ?? "pdf"
  if (!await hasTierAccess(request, "team")) {
    return new Response(JSON.stringify({ error: "Team tier required", requestId }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })
  }

  const { id } = await context.params
  const report = getReport(id)
  if (!report) {
    return new Response(JSON.stringify({ error: "Report not found", requestId }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  }

  const reportPayload =
    report.payload && typeof report.payload === "object"
      ? (report.payload as Record<string, unknown>)
      : null

  const profilePayload =
    reportPayload?.profile && typeof reportPayload.profile === "object"
      ? (reportPayload.profile as Record<string, unknown>)
      : null

  const enabledExports = Array.isArray(profilePayload?.enabledExports)
    ? profilePayload.enabledExports.filter((item): item is string => typeof item === "string")
    : ["pdf", "json", "brandedFiles"]

  if (
    (requestedFormat === "json" && !enabledExports.includes("json")) ||
    (requestedFormat === "pdf" && !enabledExports.includes("pdf")) ||
    (requestedFormat === "branded" && !enabledExports.includes("brandedFiles"))
  ) {
    return new Response(JSON.stringify({ error: "Export format not enabled for this profile", requestId }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    })
  }

  const content = `Entrestate Report\n\nTitle: ${report.title}\nGenerated: ${report.createdAt}\n\n${JSON.stringify(report.payload, null, 2)}`

  if (requestedFormat === "json") {
    return new Response(JSON.stringify(report.payload, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${report.id}.json"`,
        "x-request-id": requestId,
      },
    })
  }

  const fileName = requestedFormat === "branded" ? `${report.id}-branded.pdf` : `${report.id}.pdf`

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "x-request-id": requestId,
    },
  })
}
