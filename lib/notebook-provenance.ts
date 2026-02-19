import "server-only"
import { prisma } from "@/lib/prisma"
import type { PrismaClient } from "@prisma/client"

export type NotebookProvenance = {
  run_id: string
  snapshot_ts: string | null
  sources_used: string[] | null
  exclusion_policy_version: string | null
  column_registry_version: string | null
}

type DbClient = Pick<PrismaClient, "$queryRaw">

type ProvenanceRow = {
  run_id: string
  snapshot_ts: Date | string | null
  sources_used: unknown
  exclusion_policy_version: string | null
  column_registry_version: string | null
}

function toIsoString(value: Date | string | null): string | null {
  if (!value) return null
  if (value instanceof Date) return value.toISOString()
  return value
}

function toStringArray(value: unknown): string[] | null {
  if (!value) return null
  if (Array.isArray(value)) return value.map((entry) => String(entry))
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value)
      return Array.isArray(parsed) ? parsed.map((entry) => String(entry)) : null
    } catch {
      return null
    }
  }
  return null
}

export async function getLatestNotebookProvenance(
  db: DbClient = prisma,
): Promise<NotebookProvenance | null> {
  const rows = await db.$queryRaw<ProvenanceRow[]>`
    SELECT run_id, snapshot_ts, sources_used, exclusion_policy_version, column_registry_version
    FROM notebook_provenance
    ORDER BY snapshot_ts DESC NULLS LAST
    LIMIT 1
  `
  if (rows.length === 0) return null
  const row = rows[0]
  return {
    run_id: row.run_id,
    snapshot_ts: toIsoString(row.snapshot_ts),
    sources_used: toStringArray(row.sources_used),
    exclusion_policy_version: row.exclusion_policy_version,
    column_registry_version: row.column_registry_version,
  }
}
