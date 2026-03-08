import type { Metadata } from "next"
import { TimeMachineRolodex } from "@/components/time-machine-rolodex"
import { SEO, absoluteUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Reports Library",
  description:
    "Read long-form real estate intelligence reports, market deep-dives, and developer analysis from Entrestate.",
  alternates: {
    canonical: "/reports/library",
  },
  openGraph: {
    title: `Reports Library | ${SEO.siteName}`,
    description:
      "Read long-form real estate intelligence reports, market deep-dives, and developer analysis from Entrestate.",
    url: "/reports/library",
    images: [absoluteUrl(SEO.defaultOgImagePath)],
    type: "website",
  },
}

export default function ReportsLibraryPage() {
  return <TimeMachineRolodex />
}
