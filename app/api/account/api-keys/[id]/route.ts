import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSyncedUser } from "@/lib/auth/sync"
import { getRequestId } from "@/lib/api-errors"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const requestId = getRequestId(request)
  const user = await getSyncedUser()
  if (!user) return NextResponse.json({ error: "Unauthorized", requestId }, { status: 401 })

  try {
    await prisma.apiKey.delete({
      where: { 
        id: params.id,
        userId: user.id // Ensure owner
      }
    })

    return NextResponse.json({ success: true, requestId })
  } catch (error) {
    console.error("Failed to revoke API key:", error)
    return NextResponse.json({ error: "Failed to revoke API key", requestId }, { status: 500 })
  }
}
