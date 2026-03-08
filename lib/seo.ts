const DEFAULT_SITE_URL = "https://entrestate.com"

export const SEO = {
  siteName: "Entrestate",
  defaultTitle: "Entrestate | UAE Real Estate Intelligence Platform",
  defaultDescription:
    "Entrestate is a UAE real estate intelligence platform for evidence-backed market analysis, project scoring, and investor-grade reports.",
  defaultOgImagePath: "/seq-poster.svg",
}

export function getSiteUrl(): string {
  const candidate =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    DEFAULT_SITE_URL

  const withProtocol = candidate.startsWith("http") ? candidate : `https://${candidate}`
  return withProtocol.replace(/\/$/, "")
}

export function absoluteUrl(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${getSiteUrl()}${normalizedPath}`
}
