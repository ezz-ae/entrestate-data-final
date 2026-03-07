import type React from "react"
import type { Metadata } from "next"
import { PlatformDocsShell } from "@/components/docs/platform-docs-shell"

export const metadata: Metadata = {
  title: "Platform Docs - Entrestate",
  description:
    "Comprehensive platform documentation for partners, APIs, industry context, careers, and investor relations.",
  openGraph: {
    title: "Platform Docs - Entrestate",
    description: "Comprehensive platform documentation and operating architecture.",
  },
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PlatformDocsShell>{children}</PlatformDocsShell>
}
