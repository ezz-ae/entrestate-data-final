import Link from "next/link"
import { formatAed, formatYield } from "@/components/decision/formatters"

type AreaCardProps = {
  slug: string
  area: string
  projects?: number | null
  city?: string | null
  avg_price?: number | null
  avg_yield?: number | null
  image_url?: string | null
  top_projects?: string[] | null
}

const CITY_CENTERS: Record<string, { lat: number; lon: number }> = {
  dubai: { lat: 25.2048, lon: 55.2708 },
  "abu dhabi": { lat: 24.4539, lon: 54.3773 },
  sharjah: { lat: 25.3463, lon: 55.4209 },
  ajman: { lat: 25.4052, lon: 55.5136 },
  "ras al khaimah": { lat: 25.8007, lon: 55.9762 },
  fujairah: { lat: 25.1288, lon: 56.3265 },
  "umm al quwain": { lat: 25.5647, lon: 55.5552 },
}

function hashToUnit(value: string) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0
  }
  return (hash % 1000) / 999
}

function tileCoordinate(latitude: number, longitude: number, zoom: number) {
  const latRad = (latitude * Math.PI) / 180
  const n = 2 ** zoom
  const x = Math.floor(((longitude + 180) / 360) * n)
  const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n)
  return { x, y }
}

function slugifyProject(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function buildStaticMapTileUrl(areaName: string, city?: string | null) {
  const normalizedCity = (city ?? "dubai").toLowerCase().trim()
  const center = CITY_CENTERS[normalizedCity] ?? CITY_CENTERS.dubai

  const jitterLat = (hashToUnit(`${areaName}-lat`) - 0.5) * 0.18
  const jitterLon = (hashToUnit(`${areaName}-lon`) - 0.5) * 0.22

  const lat = Math.min(Math.max(center.lat + jitterLat, 22.8), 26.7)
  const lon = Math.min(Math.max(center.lon + jitterLon, 51.8), 56.9)
  const zoom = 11
  const { x, y } = tileCoordinate(lat, lon, zoom)

  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`
}

export function AreaCard(area: AreaCardProps) {
  const mapImageUrl = buildStaticMapTileUrl(area.area, area.city)
  const topProjects = Array.isArray(area.top_projects) ? area.top_projects.slice(0, 3) : []

  return (
    <article className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40">
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-primary/0 transition group-hover:border-primary/35" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(520px_circle_at_50%_-200px,rgba(59,130,246,0.18),transparent_55%)] opacity-70" />

      <div className="relative h-28 overflow-hidden rounded-xl border border-border/60 bg-muted/20">
        <img
          src={mapImageUrl}
          alt={`Map of ${area.area}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute left-5 top-8 h-2.5 w-2.5 rounded-full border border-white/80 bg-primary shadow-[0_0_0_4px_rgba(59,130,246,0.28)]" />
      </div>

      <div className="relative z-20">
        <p className="mt-3 text-base font-semibold text-foreground">{area.area}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{area.city ?? "UAE"}</p>
      </div>

      <div className="relative z-20 mt-2 space-y-1 text-xs text-muted-foreground">
        <p>Projects: {area.projects?.toLocaleString() ?? "—"}</p>
        <p>Avg price: {formatAed(area.avg_price)}</p>
        <p>Avg yield: {formatYield(area.avg_yield)}</p>
      </div>

      {topProjects.length > 0 ? (
        <div className="absolute inset-x-4 bottom-4 z-20 translate-y-3 rounded-xl border border-primary/20 bg-background/90 p-3 opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Top projects</p>
          <ul className="mt-1 flex flex-wrap gap-1.5 text-xs text-foreground">
            {topProjects.map((project) => (
              <li key={`${area.slug}-${project}`}>
                <Link
                  href={`/properties/${slugifyProject(project)}`}
                  className="rounded-full border border-border/70 bg-card px-2 py-1 text-[11px] text-foreground transition hover:border-primary/40 hover:text-primary"
                >
                  {project}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Link href={`/areas/${area.slug}`} className="absolute inset-0 z-10" aria-label={`Open ${area.area} area details`} />
    </article>
  )
}
