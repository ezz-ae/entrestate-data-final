import { NextResponse } from "next/server"
import { getAuth } from "@/lib/auth/server"

type AuthParams = { params: Promise<{ path: string[] }> }

const auth = getAuth()
const handler = auth?.handler()

function deriveOrigin(request: Request) {
  const directOrigin = request.headers.get("origin")?.trim()
  if (directOrigin) return directOrigin

  const forwardedHost = request.headers.get("x-forwarded-host")?.trim()
  const host = forwardedHost || request.headers.get("host")?.trim()
  const forwardedProto = request.headers.get("x-forwarded-proto")?.trim()
  const proto = forwardedProto || (host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https")

  if (host) {
    return `${proto}://${host}`
  }

  return new URL(request.url).origin
}

function withOriginHeader(request: Request) {
  if (request.headers.get("origin")) {
    return request
  }

  const headers = new Headers(request.headers)
  headers.set("origin", deriveOrigin(request))

  return new Request(request.url, {
    method: request.method,
    headers,
    body: request.body,
    duplex: "half",
  } as RequestInit)
}

const missingAuth = async (_request: Request, context: AuthParams) => {
  const params = await context.params
  const path = params?.path?.[0]
  if (path === "get-session") {
    return NextResponse.json({ data: null }, { status: 200 })
  }
  return NextResponse.json({ error: "Neon Auth is not configured." }, { status: 501 })
}

export const GET = handler?.GET ?? (async (request: Request, context: AuthParams) => missingAuth(request, context))
export const POST = handler?.POST
  ? async (request: Request, context: AuthParams) => handler.POST(withOriginHeader(request), context)
  : async (request: Request, context: AuthParams) => missingAuth(request, context)
export const PUT = handler?.PUT ?? (async (request: Request, context: AuthParams) => missingAuth(request, context))
export const DELETE = handler?.DELETE ?? (async (request: Request, context: AuthParams) => missingAuth(request, context))
export const PATCH = handler?.PATCH ?? (async (request: Request, context: AuthParams) => missingAuth(request, context))
