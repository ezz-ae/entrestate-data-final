import Link from "next/link"
import { ConfidenceBadge, StressGradeBadge, TimingSignalBadge } from "@/components/decision/badges"
import { formatAed, formatScore, formatYield } from "@/components/decision/formatters"

type ProjectCardProps = {
  slug: string
  name: string
  area?: string | null
  developer?: string | null
  l1_canonical_price?: number | null
  l1_canonical_yield?: number | null
  l2_stress_test_grade?: string | null
  l3_timing_signal?: string | null
  engine_god_metric?: number | null
  l1_confidence?: string | null
}

export function ProjectCard(project: ProjectCardProps) {
  return (
    <Link
      href={`/properties/${project.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-card"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-primary/0 transition group-hover:border-primary/35" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(480px_circle_at_50%_-210px,rgba(59,130,246,0.16),transparent_55%)] opacity-70" />

      <p className="relative z-10 text-base font-semibold text-foreground">{project.name}</p>
      <p className="relative z-10 mt-1 text-xs text-muted-foreground">
        {[project.area, project.developer].filter(Boolean).join(" · ") || "Area and developer pending"}
      </p>

      <div className="relative z-10 mt-3 grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="font-medium text-foreground">{formatAed(project.l1_canonical_price)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Yield</p>
          <p className="font-medium text-foreground">{formatYield(project.l1_canonical_yield)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">God metric</p>
          <p className="font-medium text-foreground">{formatScore(project.engine_god_metric)}</p>
        </div>
      </div>

      <div className="relative z-10 mt-3 flex flex-wrap gap-2">
        <StressGradeBadge grade={project.l2_stress_test_grade} />
        <TimingSignalBadge signal={project.l3_timing_signal} />
        <ConfidenceBadge confidence={project.l1_confidence} />
      </div>

      <p className="relative z-10 mt-3 text-[11px] uppercase tracking-wider text-primary/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Open project details
      </p>
    </Link>
  )
}
