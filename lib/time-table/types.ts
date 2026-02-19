import { TableSpec } from "../tablespec"

export type TimeTableVisibility = "private" | "team" | "public"
export type TimeTableRefreshPolicy = "manual" | "daily" | "weekly" | "monthly"

export type TimeTableRow = Record<string, string | number | boolean | null>

export type TimeTableMetadata = {
  id: string
  hash: string
  createdAt: string
  owner?: string
  visibility: TimeTableVisibility
  refreshPolicy: TimeTableRefreshPolicy
  rowCount: number
  spec: TableSpec
  version?: string
}

export type TimeTablePreview = {
  metadata: TimeTableMetadata
  rows: TimeTableRow[]
}

export type TimeTablePage = {
  metadata: TimeTableMetadata
  page: number
  pageSize: number
  total: number
  rows: TimeTableRow[]
}
