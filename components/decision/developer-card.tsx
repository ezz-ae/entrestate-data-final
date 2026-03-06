import Link from "next/link"
import { formatAed, formatScore } from "@/components/decision/formatters"

type DeveloperCardProps = {
  slug: string
  developer: string
  projects?: number | null
  reliability?: number | null
  avg_price?: number | null
  logo_url?: string | null
  top_areas?: string[] | null
  top_projects?: string[] | null
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function DeveloperCard(developer: DeveloperCardProps) {
  const topAreas = Array.isArray(developer.top_areas) ? developer.top_areas.slice(0, 3) : []
  const topProjects = Array.isArray(developer.top_projects) ? developer.top_projects.slice(0, 3) : []

  return (
    <article className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-primary/0 transition group-hover:border-primary/35" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(500px_circle_at_50%_-220px,rgba(59,130,246,0.18),transparent_55%)] opacity-70" />

      <div
        className="relative z-20 h-16 w-16 rounded-xl border border-border/60 bg-muted/50 bg-cover bg-center"
        style={{ backgroundImage: developer.logo_url ? `url(${developer.logo_url})` : undefined }}
      />
      <p className="relative z-20 mt-3 text-base font-semibold text-foreground">{developer.developer}</p>
      <div className="relative z-20 mt-2 space-y-1 text-xs text-muted-foreground">
        <p>Reliability: {formatScore(developer.reliability)}</p>
        <p>Projects: {developer.projects?.toLocaleString() ?? "—"}</p>
        <p>Avg ticket: {formatAed(developer.avg_price)}</p>
      </div>

      {(topAreas.length > 0 || topProjects.length > 0) ? (
        <div className="absolute inset-x-4 bottom-4 z-20 translate-y-3 rounded-xl border border-primary/20 bg-background/90 p-3 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {topAreas.length > 0 ? (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Top areas</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {topAreas.map((areaName) => (
                  <li key={`${developer.slug}-area-${areaName}`}>
                    <Link
                      href={`/areas/${slugify(areaName)}`}
                      className="rounded-full border border-border/70 bg-card px-2 py-1 text-[11px] text-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      {areaName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {topProjects.length > 0 ? (
            <div className="mt-2">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Top projects</p>
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {topProjects.map((projectName) => (
                  <li key={`${developer.slug}-project-${projectName}`}>
                    <Link
                      href={`/properties/${slugify(projectName)}`}
                      className="rounded-full border border-border/70 bg-card px-2 py-1 text-[11px] text-foreground transition hover:border-primary/40 hover:text-primary"
                    >
                      {projectName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <Link href={`/developers/${developer.slug}`} className="absolute inset-0 z-10" aria-label={`Open ${developer.developer} developer details`} />
    </article>
  )
}
