import { NextResponse } from "next/server"
import { z } from "zod"
import { getRequestId, getPublicErrorMessage } from "@/lib/api-errors"
import { getSessionUserId } from "@/lib/auth/server"
import { listBooks, createBook } from "@/lib/notebook/queries"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const createSchema = z.object({
  title: z.string().trim().min(1).max(200),
  subject: z.string().trim().min(1).max(500),
  type: z.enum(["client", "area", "project", "portfolio"]),
  metadata: z.record(z.unknown()).optional(),
})

export async function GET(request: Request) {
  const requestId = getRequestId(request)
  try {
    const ownerId = await getSessionUserId()
    const books = await listBooks(ownerId)
    return NextResponse.json({ books, requestId })
  } catch (error) {
    return NextResponse.json(
      { error: getPublicErrorMessage(error, "Failed to fetch notebooks."), requestId },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  const requestId = getRequestId(request)
  try {
    const ownerId = await getSessionUserId()
    const body = await request.json()
    const parsed = createSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request.", requestId }, { status: 400 })
    }
    const book = await createBook({ ownerId, ...parsed.data })
    return NextResponse.json({ book, requestId }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: getPublicErrorMessage(error, "Failed to create notebook."), requestId },
      { status: 500 },
    )
  }
}
