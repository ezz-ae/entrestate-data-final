"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import {
  ArrowLeft,
  Clock,
  User,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Type,
  Sun,
  Moon,
  Coffee,
  AlignLeft,
  AlignCenter,
  Columns,
  FileText,
  Database,
  Calculator,
  Link2,
  X,
  Copy,
  Mail,
  Download,
  Globe,
  Newspaper,
  Presentation,
  Check,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ExternalLink,
  BarChart3,
  Hash,
  Building2,
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type EvidenceType = "data" | "calculation" | "source"

export interface EvidenceItem {
  id: string
  refNum: number
  type: EvidenceType
  label: string
  value?: string
  formula?: string
  source?: string
  url?: string
  note?: string
}

export interface ReportCard {
  id: number
  title: string
  subtitle: string
  date: string
  dateLabel: string
  image: string
  author: string
  readTime: string
  category?: string
  content: string
  evidence?: EvidenceItem[]
}

type ReadingTheme = "light" | "sepia" | "dark"
type ScrollMode = "off" | "teleprompter" | "focus" | "presentation"
type ViewMode = "portal" | "media" | "executive"
type ColumnWidth = "narrow" | "standard" | "wide"

// ─── Content Parser ───────────────────────────────────────────────────────────

function parseContent(
  text: string,
  evidence: EvidenceItem[],
  onEvidenceClick: (id: string) => void,
  focusMode: boolean,
  activeParagraphIdx: number,
  paragraphRefs: React.MutableRefObject<(HTMLElement | null)[]>
): React.ReactNode[] {
  const blocks = text.split("\n\n")
  const evidenceMap = new Map(evidence.map((e) => [e.refNum, e]))

  const renderInlineText = (str: string, blockIdx: number): React.ReactNode => {
    const parts = str.split(/(\[\d+\])/g)
    return parts.map((part, i) => {
      const match = part.match(/^\[(\d+)\]$/)
      if (match) {
        const refNum = parseInt(match[1])
        const ev = evidenceMap.get(refNum)
        if (ev) {
          return (
            <button
              key={i}
              className="evidence-ref"
              title={ev.label}
              onClick={() => onEvidenceClick(ev.id)}
              aria-label={`Evidence ${refNum}: ${ev.label}`}
            >
              {refNum}
            </button>
          )
        }
      }
      return part
    })
  }

  return blocks.map((block, idx) => {
    const isActive = idx === activeParagraphIdx
    const paraClass = `reader-para${focusMode ? (isActive ? " reader-para-active" : "") : " reader-para-active"}`

    const setRef = (el: HTMLElement | null) => {
      paragraphRefs.current[idx] = el
    }

    if (block.startsWith("## ")) {
      return (
        <h2
          key={idx}
          ref={setRef as React.RefCallback<HTMLHeadingElement>}
          className={`${paraClass} mb-4 mt-12 font-serif text-2xl font-bold tracking-tight`}
          style={{ color: "var(--reader-text)" }}
        >
          {block.replace("## ", "")}
        </h2>
      )
    }
    if (block.startsWith("### ")) {
      return (
        <h3
          key={idx}
          ref={setRef as React.RefCallback<HTMLHeadingElement>}
          className={`${paraClass} mb-3 mt-8 text-xl font-semibold`}
          style={{ color: "var(--reader-text)" }}
        >
          {block.replace("### ", "")}
        </h3>
      )
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((l) => l.startsWith("- "))
      return (
        <ul
          key={idx}
          ref={setRef as React.RefCallback<HTMLUListElement>}
          className={`${paraClass} my-5 space-y-2.5 pl-6`}
          style={{ color: "var(--reader-text)" }}
        >
          {items.map((item, ii) => (
            <li key={ii} className="list-disc leading-relaxed">
              {renderInlineText(item.replace("- ", ""), idx)}
            </li>
          ))}
        </ul>
      )
    }
    if (block.includes("|") && block.trim().startsWith("|")) {
      const rows = block.split("\n").filter((r) => r.trim() && !r.includes("---"))
      return (
        <div
          key={idx}
          ref={setRef as React.RefCallback<HTMLDivElement>}
          className={`${paraClass} my-7 overflow-x-auto rounded-lg border`}
          style={{ borderColor: "var(--reader-border)" }}
        >
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ background: "var(--reader-gold-light)", borderBottom: `1px solid var(--reader-border)` }}>
                {rows[0]
                  ?.split("|")
                  .filter(Boolean)
                  .map((cell, ci) => (
                    <th
                      key={ci}
                      className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "var(--reader-navy)" }}
                    >
                      {cell.trim()}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((row, ri) => (
                <tr
                  key={ri}
                  style={{ borderBottom: `1px solid var(--reader-border)` }}
                  className="transition-colors hover:opacity-80"
                >
                  {row
                    .split("|")
                    .filter(Boolean)
                    .map((cell, ci) => (
                      <td key={ci} className="px-5 py-3 text-sm" style={{ color: "var(--reader-text)" }}>
                        {cell.trim()}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    if (block.trim()) {
      return (
        <p
          key={idx}
          ref={setRef as React.RefCallback<HTMLParagraphElement>}
          className={`${paraClass} my-5`}
          style={{
            color: "var(--reader-text)",
            fontSize: "var(--reader-font-size)",
            lineHeight: "var(--reader-line-height)",
          }}
        >
          {renderInlineText(block, idx)}
        </p>
      )
    }
    return null
  })
}

// ─── Evidence Panel ──────────────────────────────────────────────────────────

function EvidencePanel({
  evidence,
  activeId,
  onClose,
}: {
  evidence: EvidenceItem[]
  activeId: string | null
  onClose: () => void
}) {
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [activeId])

  const iconFor = (type: EvidenceType) => {
    if (type === "data") return <BarChart3 className="h-4 w-4" />
    if (type === "calculation") return <Calculator className="h-4 w-4" />
    return <Link2 className="h-4 w-4" />
  }

  const colorFor = (type: EvidenceType) => {
    if (type === "data") return { bg: "oklch(0.94 0.06 195)", text: "oklch(0.28 0.1 200)" }
    if (type === "calculation") return { bg: "oklch(0.95 0.06 150)", text: "oklch(0.28 0.1 155)" }
    return { bg: "var(--reader-gold-light)", text: "var(--reader-navy)" }
  }

  return (
    <div
      className="reader-no-print flex h-full w-full flex-col"
      style={{ background: "var(--reader-bg)", borderLeft: "1px solid var(--reader-border)" }}
    >
      {/* Panel Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid var(--reader-border)" }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "var(--reader-gold-light)" }}
          >
            <Database className="h-4 w-4" style={{ color: "var(--reader-gold)" }} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--reader-text)" }}>
              Evidence
            </p>
            <p className="text-xs" style={{ color: "var(--reader-muted)" }}>
              {evidence.length} references
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 transition-colors hover:opacity-70"
          style={{ color: "var(--reader-muted)" }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Evidence list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 reader-evidence-panel">
        {evidence.map((ev) => {
          const isActive = ev.id === activeId
          const { bg, text } = colorFor(ev.type)
          return (
            <div
              key={ev.id}
              ref={isActive ? (activeRef as React.RefObject<HTMLDivElement>) : undefined}
              className="rounded-xl p-4 transition-all duration-300"
              style={{
                background: isActive ? "var(--reader-highlight)" : "var(--reader-evidence-bg)",
                border: isActive ? `2px solid var(--reader-gold)` : "2px solid transparent",
              }}
            >
              {/* Badge + number */}
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold"
                    style={{ background: "var(--reader-gold)", color: "white" }}
                  >
                    {ev.refNum}
                  </span>
                  <span
                    className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                    style={{ background: bg, color: text }}
                  >
                    {iconFor(ev.type)}
                    {ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}
                  </span>
                </div>
              </div>

              {/* Label */}
              <p className="mb-1.5 text-sm font-semibold leading-snug" style={{ color: "var(--reader-text)" }}>
                {ev.label}
              </p>

              {/* Value / Formula */}
              {ev.value && (
                <div
                  className="mb-2 rounded-lg px-3 py-2 font-mono text-sm font-semibold"
                  style={{ background: "var(--reader-gold-light)", color: "var(--reader-navy)" }}
                >
                  {ev.value}
                </div>
              )}
              {ev.formula && (
                <div
                  className="mb-2 rounded-lg px-3 py-2 font-mono text-xs"
                  style={{ background: "var(--reader-border)", color: "var(--reader-muted)" }}
                >
                  {ev.formula}
                </div>
              )}

              {/* Note */}
              {ev.note && (
                <p className="mb-2 text-xs leading-relaxed" style={{ color: "var(--reader-muted)" }}>
                  {ev.note}
                </p>
              )}

              {/* Source / URL */}
              {ev.source && (
                <p className="text-xs" style={{ color: "var(--reader-muted)" }}>
                  Source: {ev.source}
                </p>
              )}
              {ev.url && (
                <a
                  href={ev.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 flex items-center gap-1 text-xs hover:underline"
                  style={{ color: "var(--reader-gold)" }}
                >
                  <ExternalLink className="h-3 w-3" />
                  View source
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Share Modal ─────────────────────────────────────────────────────────────

function ShareModal({
  report,
  onClose,
}: {
  report: ReportCard
  onClose: () => void
}) {
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"link" | "export" | "portal" | "media">("link")

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const portalEmbed = `<iframe src="https://entrestate.com/reports/embed/${report.id}" width="100%" height="600" frameborder="0" title="${report.title}" />`

  const pressRelease = `FOR IMMEDIATE RELEASE

${report.title.toUpperCase()}

${report.subtitle}

${report.date} — Entrestate Research

${report.content.split("\n\n").find((p) => !p.startsWith("#") && !p.startsWith("-") && p.trim().length > 40) ?? ""}

For full report visit: https://entrestate.com/reports/${report.id}

About Entrestate
Entrestate is the leading real estate intelligence platform in the Gulf region.

###
Media contact: media@entrestate.com`

  const tabs = [
    { id: "link" as const, label: "Share Link", icon: <Link2 className="h-4 w-4" /> },
    { id: "export" as const, label: "Export", icon: <Download className="h-4 w-4" /> },
    { id: "portal" as const, label: "Portal Embed", icon: <Globe className="h-4 w-4" /> },
    { id: "media" as const, label: "Media Kit", icon: <Newspaper className="h-4 w-4" /> },
  ]

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div
        className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "var(--reader-bg)", border: "1px solid var(--reader-border)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--reader-border)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "var(--reader-gold-light)" }}
            >
              <Share2 className="h-4 w-4" style={{ color: "var(--reader-gold)" }} />
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--reader-text)" }}>
                Share Report
              </p>
              <p className="text-xs" style={{ color: "var(--reader-muted)" }}>
                {report.title}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:opacity-70" style={{ color: "var(--reader-muted)" }}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: "1px solid var(--reader-border)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-1 items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors"
              style={{
                color: activeTab === tab.id ? "var(--reader-gold)" : "var(--reader-muted)",
                borderBottom: activeTab === tab.id ? "2px solid var(--reader-gold)" : "2px solid transparent",
              }}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {activeTab === "link" && (
            <>
              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: "var(--reader-muted)" }}>
                  Report URL
                </p>
                <div
                  className="flex items-center gap-2 rounded-xl px-4 py-3"
                  style={{ background: "var(--reader-evidence-bg)", border: "1px solid var(--reader-border)" }}
                >
                  <span className="flex-1 truncate text-sm font-mono" style={{ color: "var(--reader-text)" }}>
                    entrestate.com/reports/{report.id}
                  </span>
                  <button
                    onClick={() => copy(`https://entrestate.com/reports/${report.id}`, "url")}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
                    style={{ background: "var(--reader-gold)", color: "white" }}
                  >
                    {copied === "url" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied === "url" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium" style={{ color: "var(--reader-muted)" }}>
                  Send via Email
                </p>
                <a
                  href={`mailto:?subject=${encodeURIComponent(report.title)}&body=${encodeURIComponent(`Read the full report: https://entrestate.com/reports/${report.id}`)}`}
                  className="flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ background: "var(--reader-evidence-bg)", border: "1px solid var(--reader-border)", color: "var(--reader-text)" }}
                >
                  <Mail className="h-4 w-4" style={{ color: "var(--reader-gold)" }} />
                  Open in Mail
                </a>
              </div>
            </>
          )}

          {activeTab === "export" && (
            <div className="space-y-3">
              {[
                { label: "PDF Report", desc: "Full report with branding", icon: <FileText className="h-4 w-4" />, action: () => window.print() },
                { label: "Plain Text", desc: "Clean text without formatting", icon: <AlignLeft className="h-4 w-4" />, action: () => copy(report.content, "txt") },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.action}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:opacity-80"
                  style={{ background: "var(--reader-evidence-bg)", border: "1px solid var(--reader-border)" }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: "var(--reader-gold-light)", color: "var(--reader-gold)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--reader-text)" }}>
                      {item.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--reader-muted)" }}>
                      {item.desc}
                    </p>
                  </div>
                  <Download className="ml-auto h-4 w-4" style={{ color: "var(--reader-muted)" }} />
                </button>
              ))}
            </div>
          )}

          {activeTab === "portal" && (
            <>
              <p className="text-xs" style={{ color: "var(--reader-muted)" }}>
                Embed this report in Bayut, Property Finder, or any portal that accepts iframe widgets.
              </p>
              <div
                className="rounded-xl p-3"
                style={{ background: "var(--reader-evidence-bg)", border: "1px solid var(--reader-border)" }}
              >
                <pre
                  className="overflow-x-auto whitespace-pre-wrap text-xs font-mono"
                  style={{ color: "var(--reader-text)" }}
                >
                  {portalEmbed}
                </pre>
              </div>
              <button
                onClick={() => copy(portalEmbed, "embed")}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors"
                style={{ background: "var(--reader-gold)", color: "white" }}
              >
                {copied === "embed" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied === "embed" ? "Copied" : "Copy Embed Code"}
              </button>
            </>
          )}

          {activeTab === "media" && (
            <>
              <p className="text-xs" style={{ color: "var(--reader-muted)" }}>
                Formatted press release for Gulf News, Khaleej Times, and regional media outlets.
              </p>
              <div
                className="max-h-48 overflow-y-auto rounded-xl p-3"
                style={{ background: "var(--reader-evidence-bg)", border: "1px solid var(--reader-border)" }}
              >
                <pre
                  className="whitespace-pre-wrap text-xs font-mono"
                  style={{ color: "var(--reader-text)" }}
                >
                  {pressRelease}
                </pre>
              </div>
              <button
                onClick={() => copy(pressRelease, "press")}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-colors"
                style={{ background: "var(--reader-gold)", color: "white" }}
              >
                {copied === "press" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied === "press" ? "Copied" : "Copy Press Release"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Reading Controls Toolbar ─────────────────────────────────────────────────

function ReadingToolbar({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  columnWidth,
  setColumnWidth,
  scrollMode,
  setScrollMode,
  scrollSpeed,
  setScrollSpeed,
  isScrolling,
  toggleScroll,
  presentationIdx,
  setPresentationIdx,
  sectionCount,
  evidenceOpen,
  setEvidenceOpen,
  onShare,
  viewMode,
  setViewMode,
  report,
}: {
  theme: ReadingTheme
  setTheme: (t: ReadingTheme) => void
  fontSize: number
  setFontSize: (n: number) => void
  columnWidth: ColumnWidth
  setColumnWidth: (w: ColumnWidth) => void
  scrollMode: ScrollMode
  setScrollMode: (m: ScrollMode) => void
  scrollSpeed: number
  setScrollSpeed: (n: number) => void
  isScrolling: boolean
  toggleScroll: () => void
  presentationIdx: number
  setPresentationIdx: (n: number) => void
  sectionCount: number
  evidenceOpen: boolean
  setEvidenceOpen: (v: boolean) => void
  onShare: () => void
  viewMode: ViewMode
  setViewMode: (v: ViewMode) => void
  report: ReportCard
}) {
  const [showFontMenu, setShowFontMenu] = useState(false)
  const [showScrollMenu, setShowScrollMenu] = useState(false)
  const [showViewMenu, setShowViewMenu] = useState(false)

  const themeIcon = theme === "dark" ? <Moon className="h-4 w-4" /> : theme === "sepia" ? <Coffee className="h-4 w-4" /> : <Sun className="h-4 w-4" />
  const cycleTheme = () => setTheme(theme === "light" ? "sepia" : theme === "sepia" ? "dark" : "light")

  const widthIcon =
    columnWidth === "narrow" ? <AlignCenter className="h-4 w-4" /> : columnWidth === "standard" ? <AlignLeft className="h-4 w-4" /> : <Columns className="h-4 w-4" />
  const cycleWidth = () => setColumnWidth(columnWidth === "narrow" ? "standard" : columnWidth === "standard" ? "wide" : "narrow")

  const viewIcons: Record<ViewMode, React.ReactNode> = {
    portal: <Building2 className="h-4 w-4" />,
    media: <Newspaper className="h-4 w-4" />,
    executive: <Presentation className="h-4 w-4" />,
  }

  const btnBase = "reader-no-print flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all hover:opacity-80"
  const btnStyle = { background: "var(--reader-evidence-bg)", color: "var(--reader-text)", border: "1px solid var(--reader-border)" }
  const activeBtnStyle = { background: "var(--reader-gold)", color: "white", border: "1px solid var(--reader-gold)" }

  return (
    <div
      className="reader-no-print sticky top-0 z-50 flex items-center gap-2 overflow-x-auto px-5 py-2.5"
      style={{
        background: "var(--reader-bg)",
        borderBottom: "1px solid var(--reader-border)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Theme */}
      <button className={btnBase} style={btnStyle} onClick={cycleTheme} title="Toggle theme">
        {themeIcon}
        <span className="hidden sm:inline capitalize">{theme}</span>
      </button>

      {/* Font size */}
      <div className="relative">
        <button className={btnBase} style={btnStyle} onClick={() => { setShowFontMenu(!showFontMenu); setShowScrollMenu(false); setShowViewMenu(false) }}>
          <Type className="h-4 w-4" />
          <span className="hidden sm:inline">{fontSize}px</span>
          <ChevronDown className="h-3 w-3" />
        </button>
        {showFontMenu && (
          <div
            className="absolute left-0 top-full mt-1 w-36 rounded-xl p-2 shadow-xl z-50"
            style={{ background: "var(--reader-bg)", border: "1px solid var(--reader-border)" }}
          >
            {[14, 16, 18, 20, 24].map((s) => (
              <button
                key={s}
                onClick={() => { setFontSize(s); setShowFontMenu(false) }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm"
                style={{ background: fontSize === s ? "var(--reader-gold-light)" : "transparent", color: "var(--reader-text)" }}
              >
                {s}px {fontSize === s && <Check className="h-3 w-3" style={{ color: "var(--reader-gold)" }} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Column width */}
      <button className={btnBase} style={btnStyle} onClick={cycleWidth} title="Cycle column width">
        {widthIcon}
        <span className="hidden sm:inline capitalize">{columnWidth}</span>
      </button>

      {/* Scroll mode */}
      <div className="relative">
        <button
          className={btnBase}
          style={scrollMode !== "off" ? activeBtnStyle : btnStyle}
          onClick={() => { setShowScrollMenu(!showScrollMenu); setShowFontMenu(false); setShowViewMenu(false) }}
        >
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">{scrollMode === "off" ? "Read mode" : scrollMode}</span>
          <ChevronDown className="h-3 w-3" />
        </button>
        {showScrollMenu && (
          <div
            className="absolute left-0 top-full mt-1 w-44 rounded-xl p-2 shadow-xl z-50"
            style={{ background: "var(--reader-bg)", border: "1px solid var(--reader-border)" }}
          >
            {(["off", "teleprompter", "focus", "presentation"] as ScrollMode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setScrollMode(m); setShowScrollMenu(false) }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm capitalize"
                style={{ background: scrollMode === m ? "var(--reader-gold-light)" : "transparent", color: "var(--reader-text)" }}
              >
                {m === "off" ? "Off" : m}
                {scrollMode === m && <Check className="h-3 w-3" style={{ color: "var(--reader-gold)" }} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Scroll controls when active */}
      {scrollMode === "teleprompter" && (
        <>
          <button
            className={btnBase}
            style={isScrolling ? activeBtnStyle : btnStyle}
            onClick={toggleScroll}
          >
            {isScrolling ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button className={btnBase} style={btnStyle} onClick={() => setScrollSpeed(Math.max(1, scrollSpeed - 1))}>
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono px-1" style={{ color: "var(--reader-muted)" }}>{scrollSpeed}x</span>
          <button className={btnBase} style={btnStyle} onClick={() => setScrollSpeed(Math.min(8, scrollSpeed + 1))}>
            <Plus className="h-4 w-4" />
          </button>
        </>
      )}

      {scrollMode === "presentation" && (
        <>
          <button className={btnBase} style={btnStyle} onClick={() => setPresentationIdx(Math.max(0, presentationIdx - 1))}>
            <SkipBack className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono px-1" style={{ color: "var(--reader-muted)" }}>
            {presentationIdx + 1} / {sectionCount}
          </span>
          <button className={btnBase} style={btnStyle} onClick={() => setPresentationIdx(Math.min(sectionCount - 1, presentationIdx + 1))}>
            <SkipForward className="h-4 w-4" />
          </button>
        </>
      )}

      {/* Divider */}
      <div className="mx-1 h-5 w-px" style={{ background: "var(--reader-border)" }} />

      {/* View mode */}
      <div className="relative">
        <button
          className={btnBase}
          style={btnStyle}
          onClick={() => { setShowViewMenu(!showViewMenu); setShowFontMenu(false); setShowScrollMenu(false) }}
        >
          {viewIcons[viewMode]}
          <span className="hidden sm:inline capitalize">{viewMode}</span>
          <ChevronDown className="h-3 w-3" />
        </button>
        {showViewMenu && (
          <div
            className="absolute right-0 top-full mt-1 w-44 rounded-xl p-2 shadow-xl z-50"
            style={{ background: "var(--reader-bg)", border: "1px solid var(--reader-border)" }}
          >
            {(["portal", "media", "executive"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => { setViewMode(v); setShowViewMenu(false) }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm capitalize"
                style={{ background: viewMode === v ? "var(--reader-gold-light)" : "transparent", color: "var(--reader-text)" }}
              >
                {viewIcons[v]}
                {v === "portal" ? "Real Estate Portal" : v === "media" ? "Media / Press" : "Executive Summary"}
                {viewMode === v && <Check className="ml-auto h-3 w-3" style={{ color: "var(--reader-gold)" }} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Evidence toggle */}
      {(report.evidence?.length ?? 0) > 0 && (
        <button
          className={btnBase}
          style={evidenceOpen ? activeBtnStyle : btnStyle}
          onClick={() => setEvidenceOpen(!evidenceOpen)}
        >
          <Database className="h-4 w-4" />
          <span className="hidden sm:inline">Evidence</span>
          <span
            className="rounded-full px-1.5 py-0.5 text-xs font-bold"
            style={{ background: evidenceOpen ? "rgba(255,255,255,0.3)" : "var(--reader-gold)", color: "white" }}
          >
            {report.evidence?.length}
          </span>
        </button>
      )}

      {/* Share */}
      <button className={`${btnBase} ml-auto`} style={activeBtnStyle} onClick={onShare}>
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">Share</span>
      </button>
    </div>
  )
}

// ─── View Mode Wrappers ───────────────────────────────────────────────────────

function MediaBanner({ report }: { report: ReportCard }) {
  return (
    <div
      className="mb-6 rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--reader-border)" }}
    >
      <div
        className="px-6 py-3 flex items-center justify-between"
        style={{ background: "var(--reader-navy)" }}
      >
        <div className="flex items-center gap-2">
          <Newspaper className="h-4 w-4 text-white/70" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
            Media Version — Entrestate Research
          </span>
        </div>
        <span className="text-xs text-white/50">{report.date}</span>
      </div>
      <div className="px-6 py-4" style={{ background: "var(--reader-gold-light)" }}>
        <p className="text-sm" style={{ color: "var(--reader-navy)" }}>
          This version is formatted for editorial use by Gulf News, Khaleej Times, The National, and regional media. Evidence footnotes and proprietary data calculations are included in the full portal version.
        </p>
      </div>
    </div>
  )
}

function PortalBanner({ report }: { report: ReportCard }) {
  return (
    <div
      className="mb-6 rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--reader-border)" }}
    >
      <div
        className="px-6 py-3 flex items-center justify-between"
        style={{ background: "var(--reader-navy)" }}
      >
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-white/70" />
          <span className="text-xs font-semibold text-white/70 uppercase tracking-widest">
            Portal Intelligence Report
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">Bayut · Property Finder · Dubizzle</span>
        </div>
      </div>
      <div className="px-6 py-4 flex items-center justify-between" style={{ background: "var(--reader-gold-light)" }}>
        <p className="text-sm" style={{ color: "var(--reader-navy)" }}>
          Full data report with evidence and proprietary calculations. Approved for portal syndication.
        </p>
        <span
          className="ml-4 shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
          style={{ background: "var(--reader-gold)", color: "white" }}
        >
          Verified
        </span>
      </div>
    </div>
  )
}

function ExecutiveSummary({ report }: { report: ReportCard }) {
  const bullets = report.content
    .split("\n\n")
    .filter((p) => p.startsWith("- "))
    .flatMap((p) => p.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.replace("- ", "")))
    .slice(0, 6)

  const firstParagraph = report.content.split("\n\n").find((p) => !p.startsWith("#") && !p.startsWith("-") && !p.includes("|") && p.trim().length > 60) ?? ""

  return (
    <div
      className="mb-8 rounded-2xl overflow-hidden"
      style={{ border: "2px solid var(--reader-gold)" }}
    >
      <div
        className="px-6 py-3 flex items-center gap-2"
        style={{ background: "var(--reader-gold)" }}
      >
        <Presentation className="h-4 w-4 text-white" />
        <span className="text-xs font-semibold text-white uppercase tracking-widest">
          Executive Summary
        </span>
      </div>
      <div className="px-6 py-5" style={{ background: "var(--reader-evidence-bg)" }}>
        {firstParagraph && (
          <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--reader-text)" }}>
            {firstParagraph}
          </p>
        )}
        {bullets.length > 0 && (
          <ul className="space-y-2">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--reader-text)" }}>
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--reader-gold)" }}
                />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// ─── Main Report Reader ───────────────────────────────────────────────────────

export function ReportReader({
  report,
  allReports,
  onClose,
  onNavigate,
}: {
  report: ReportCard
  allReports: ReportCard[]
  onClose: () => void
  onNavigate: (report: ReportCard) => void
}) {
  const [theme, setTheme] = useState<ReadingTheme>("light")
  const [fontSize, setFontSize] = useState(18)
  const [columnWidth, setColumnWidth] = useState<ColumnWidth>("standard")
  const [scrollMode, setScrollMode] = useState<ScrollMode>("off")
  const [scrollSpeed, setScrollSpeed] = useState(2)
  const [isScrolling, setIsScrolling] = useState(false)
  const [presentationIdx, setPresentationIdx] = useState(0)
  const [activeParagraphIdx, setActiveParagraphIdx] = useState(0)
  const [evidenceOpen, setEvidenceOpen] = useState(false)
  const [activeEvidenceId, setActiveEvidenceId] = useState<string | null>(null)
  const [shareOpen, setShareOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>("portal")
  const [readProgress, setReadProgress] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)
  const paragraphRefs = useRef<(HTMLElement | null)[]>([])

  const evidence = report.evidence ?? []
  const currentIdx = allReports.findIndex((r) => r.id === report.id)

  // Column width map
  const colWidthMap: Record<ColumnWidth, string> = {
    narrow: "52ch",
    standard: "72ch",
    wide: "92ch",
  }

  // CSS variables for theme
  const themeClass =
    theme === "sepia" ? "reader-theme-sepia" : theme === "dark" ? "reader-theme-dark" : ""

  // Read progress
  const handleScrollProgress = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight)
    setReadProgress(Math.min(100, Math.round(pct * 100)))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", handleScrollProgress, { passive: true })
    return () => el.removeEventListener("scroll", handleScrollProgress)
  }, [handleScrollProgress])

  // Teleprompter auto-scroll via RAF
  useEffect(() => {
    if (scrollMode !== "teleprompter" || !isScrolling) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    const el = scrollRef.current
    if (!el) return
    const speed = scrollSpeed * 0.4
    const step = () => {
      el.scrollTop += speed
      if (el.scrollTop >= el.scrollHeight - el.clientHeight) {
        setIsScrolling(false)
        return
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [scrollMode, isScrolling, scrollSpeed])

  // Focus mode: track active paragraph via IntersectionObserver
  useEffect(() => {
    if (scrollMode !== "focus") return
    const refs = paragraphRefs.current.filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => {
          const ra = a.boundingClientRect
          const rb = b.boundingClientRect
          const centerA = Math.abs(ra.top + ra.height / 2 - window.innerHeight / 2)
          const centerB = Math.abs(rb.top + rb.height / 2 - window.innerHeight / 2)
          return centerA - centerB
        })
        if (visible.length > 0) {
          const idx = refs.indexOf(visible[0].target as HTMLElement)
          if (idx !== -1) setActiveParagraphIdx(idx)
        }
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    )
    refs.forEach((r) => observer.observe(r))
    return () => observer.disconnect()
  }, [scrollMode, report.id])

  // Presentation mode: scroll to section by idx
  const sections = report.content.split("\n\n").filter((b) => b.startsWith("## "))
  useEffect(() => {
    if (scrollMode !== "presentation") return
    const heading = sections[presentationIdx]
    if (!heading) return
    const text = heading.replace("## ", "")
    const el = Array.from(scrollRef.current?.querySelectorAll("h2") ?? []).find(
      (h) => h.textContent?.trim() === text.trim()
    )
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [presentationIdx, scrollMode])

  // Keyboard nav for presentation mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (scrollMode !== "presentation") return
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setPresentationIdx((p) => Math.min(sections.length - 1, p + 1))
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setPresentationIdx((p) => Math.max(0, p - 1))
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [scrollMode, sections.length])

  // Reset scroll + state on report change
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    setReadProgress(0)
    setActiveParagraphIdx(0)
    setPresentationIdx(0)
    setIsScrolling(false)
    paragraphRefs.current = []
  }, [report.id])

  const handleEvidenceClick = (id: string) => {
    setActiveEvidenceId(id)
    setEvidenceOpen(true)
  }

  const toggleScroll = () => setIsScrolling((v) => !v)

  const contentNodes = parseContent(
    report.content,
    evidence,
    handleEvidenceClick,
    scrollMode === "focus",
    activeParagraphIdx,
    paragraphRefs
  )

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[100] flex flex-col overflow-hidden ${themeClass}`}
      style={{ background: "var(--reader-bg)" }}
    >
      {/* Top nav bar */}
      <div
        className="reader-no-print flex items-center justify-between px-5 py-3 shrink-0"
        style={{ borderBottom: "1px solid var(--reader-border)", background: "var(--reader-bg)" }}
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
          style={{ color: "var(--reader-muted)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Reports</span>
        </button>

        {/* Breadcrumb */}
        <div className="hidden items-center gap-2 md:flex">
          <Building2 className="h-3.5 w-3.5" style={{ color: "var(--reader-gold)" }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--reader-gold)" }}>
            entrestate
          </span>
          <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--reader-muted)" }} />
          <span className="max-w-xs truncate text-xs" style={{ color: "var(--reader-muted)" }}>
            {report.title}
          </span>
        </div>

        {/* Progress + meta */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 sm:flex">
            <div
              className="h-1 w-24 overflow-hidden rounded-full"
              style={{ background: "var(--reader-border)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${readProgress}%`, background: "var(--reader-gold)" }}
              />
            </div>
            <span className="text-xs tabular-nums" style={{ color: "var(--reader-muted)" }}>
              {readProgress}%
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--reader-muted)" }}>
            <Clock className="h-3.5 w-3.5" />
            {report.readTime}
          </div>
        </div>
      </div>

      {/* Reading toolbar */}
      <ReadingToolbar
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        columnWidth={columnWidth}
        setColumnWidth={setColumnWidth}
        scrollMode={scrollMode}
        setScrollMode={setScrollMode}
        scrollSpeed={scrollSpeed}
        setScrollSpeed={setScrollSpeed}
        isScrolling={isScrolling}
        toggleScroll={toggleScroll}
        presentationIdx={presentationIdx}
        setPresentationIdx={setPresentationIdx}
        sectionCount={sections.length}
        evidenceOpen={evidenceOpen}
        setEvidenceOpen={setEvidenceOpen}
        onShare={() => setShareOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        report={report}
      />

      {/* Main reading area + evidence panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Article scroll area */}
        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto ${scrollMode === "focus" ? "reader-focus-mode" : ""} ${scrollMode === "teleprompter" ? "reader-teleprompter" : ""}`}
          style={{ background: "var(--reader-bg)" }}
        >
          {/* Hero image */}
          <div className="relative w-full" style={{ height: "45vh", minHeight: 280 }}>
            <img
              src={report.image || "/placeholder.svg"}
              alt={report.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--reader-bg) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" }} />
            <div className="absolute inset-x-0 bottom-0 px-8 pb-10">
              <div className="mx-auto" style={{ maxWidth: colWidthMap[columnWidth] }}>
                {report.category && (
                  <span
                    className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
                    style={{ background: "var(--reader-gold)", color: "white" }}
                  >
                    {report.category}
                  </span>
                )}
                <h1
                  className="font-serif text-4xl font-bold tracking-tight text-balance md:text-5xl"
                  style={{ color: theme === "dark" ? "var(--reader-text)" : "white" }}
                >
                  {report.title}
                </h1>
                <p
                  className="mt-3 text-xl leading-snug text-balance"
                  style={{ color: theme === "dark" ? "var(--reader-muted)" : "rgba(255,255,255,0.80)" }}
                >
                  {report.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Article body */}
          <div
            className="mx-auto px-6 pb-24 pt-10"
            style={{ maxWidth: colWidthMap[columnWidth] }}
          >
            {/* Byline */}
            <div
              className="mb-8 flex flex-wrap items-center gap-5 border-b pb-6"
              style={{ borderColor: "var(--reader-border)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                  style={{ background: "var(--reader-gold-light)", color: "var(--reader-gold)" }}
                >
                  {report.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--reader-text)" }}>
                    {report.author}
                  </p>
                  <p className="text-xs" style={{ color: "var(--reader-muted)" }}>
                    Entrestate Research
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--reader-muted)" }}>
                <Hash className="h-3.5 w-3.5" />
                {report.date}
              </div>
              {evidence.length > 0 && (
                <div
                  className="ml-auto flex items-center gap-1.5 cursor-pointer rounded-full px-3 py-1 text-xs font-medium"
                  style={{ background: "var(--reader-gold-light)", color: "var(--reader-gold)" }}
                  onClick={() => setEvidenceOpen(true)}
                >
                  <Database className="h-3.5 w-3.5" />
                  {evidence.length} evidence items
                </div>
              )}
            </div>

            {/* View mode banners */}
            {viewMode === "media" && <MediaBanner report={report} />}
            {viewMode === "portal" && <PortalBanner report={report} />}
            {viewMode === "executive" && <ExecutiveSummary report={report} />}

            {/* Content */}
            <div
              style={{
                "--reader-font-size": `${fontSize}px`,
                "--reader-line-height": "1.85",
              } as React.CSSProperties}
            >
              {contentNodes}
            </div>
          </div>

          {/* Report navigation footer */}
          <div
            className="reader-print-footer border-t"
            style={{ borderColor: "var(--reader-border)", background: "var(--reader-focus-bg)" }}
          >
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-8">
              {currentIdx < allReports.length - 1 && (
                <button
                  onClick={() => onNavigate(allReports[currentIdx + 1])}
                  className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:opacity-70"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" style={{ color: "var(--reader-muted)" }} />
                  <div className="text-left">
                    <p className="text-xs" style={{ color: "var(--reader-muted)" }}>Previous</p>
                    <p className="text-sm font-medium" style={{ color: "var(--reader-text)" }}>
                      {allReports[currentIdx + 1].title}
                    </p>
                  </div>
                </button>
              )}
              {currentIdx > 0 && (
                <button
                  onClick={() => onNavigate(allReports[currentIdx - 1])}
                  className="group ml-auto flex items-center gap-3 rounded-xl p-3 text-right transition-colors hover:opacity-70"
                >
                  <div>
                    <p className="text-xs" style={{ color: "var(--reader-muted)" }}>Next</p>
                    <p className="text-sm font-medium" style={{ color: "var(--reader-text)" }}>
                      {allReports[currentIdx - 1].title}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" style={{ color: "var(--reader-muted)" }} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Evidence Drawer */}
        {evidenceOpen && evidence.length > 0 && (
          <div
            className="reader-no-print flex w-80 shrink-0 flex-col overflow-hidden xl:w-96"
            style={{ borderLeft: "1px solid var(--reader-border)" }}
          >
            <EvidencePanel
              evidence={evidence}
              activeId={activeEvidenceId}
              onClose={() => { setEvidenceOpen(false); setActiveEvidenceId(null) }}
            />
          </div>
        )}
      </div>

      {/* Share modal */}
      {shareOpen && <ShareModal report={report} onClose={() => setShareOpen(false)} />}
    </div>
  )
}
