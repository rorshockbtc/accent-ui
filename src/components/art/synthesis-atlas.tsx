'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';
import { EASE_ACCENT, SPRING_LAYOUT } from '@/lib/motion/tokens';
import { ARCHIVAL_CHART_PALETTE } from '@/styles/themes';

/* ============================================================================
 * 1. Shared Data Contracts for Cross-Pipe Synthesis Visualizations
 * ========================================================================== */

export interface AtlasMatrixRow {
  episodeNumber: number;
  stage: string;
  cells: string[];
  pipes?: string[];
  evidencePin?: string;
}

export interface AtlasPipeNode {
  slug: string;
  label: string;
  discipline?: string;
  why?: string;
  episodes: number[];
}

export interface AtlasEpisodeNode {
  episodeNumber: number;
  title: string;
  themeTitle?: string;
  durationSeconds?: number;
  essayWords?: number;
  quoteRatioPercent?: number;
  claimsCount?: number;
  illustrationUrl?: string;
  primarySourcesCited?: string[];
}

export interface AtlasBibliographyNode {
  id: string;
  author: string;
  title: string;
  year: string;
  url: string;
  pipe: string;
  roleInThesis?: string;
}

export interface AccentSynthesisAtlasProps {
  title: string;
  kicker?: string;
  subtitle?: string;
  columns: string[];
  rows: AtlasMatrixRow[];
  pipes: AtlasPipeNode[];
  episodes: AtlasEpisodeNode[];
  bibliography: AtlasBibliographyNode[];
  activeEpisodeNumber?: number;
  defaultLens?: 'trajectory' | 'loom' | 'chronology' | 'table';
  compact?: boolean;
  onSelectEpisode?: (epNum: number) => void;
  onPlayEpisode?: (epNum: number) => void;
  onShareStage?: (stageIdx: number) => void;
  className?: string;
}

type AtlasLens = 'trajectory' | 'loom' | 'chronology' | 'table';

/** Parses historical publication strings ("133 BC", "c. 390 AD", "1776-1789", "2024") into integer year. */
export function parseHistoricalYear(raw: string): number | null {
  const s = (raw || '').trim();
  if (!s) return null;
  const bcMatch = s.match(/(\d{1,4})\s*(?:BC|B\.C\.|BCE)/i);
  if (bcMatch) return -Number(bcMatch[1]);
  const yrMatch = s.match(/(-?\d{2,4})/);
  if (!yrMatch) return null;
  return Number(yrMatch[1]);
}

function cubicPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx.toFixed(1)} ${p0.y.toFixed(1)}, ${cx.toFixed(1)} ${p1.y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  }
  return d;
}

function extractShortEvidencePin(row: AtlasMatrixRow): string {
  if (row.evidencePin) return row.evidencePin;
  const joined = row.cells.join(' · ');
  const numMatch = joined.match(/(\d[\d,]*\s*(?:iugera|million|officials|bits|%|BC|AD|19\d\d|18\d\d|17\d\d))/i);
  if (numMatch) return numMatch[1];
  const firstClause = (row.cells[0] || '').split(/[;.]/)[0] || '';
  return firstClause.length > 52 ? `${firstClause.slice(0, 49)}…` : firstClause;
}

function resolveCurveProfiles(rows: AtlasMatrixRow[], columns: string[]) {
  const n = Math.max(2, rows.length);
  const colJoined = columns.join(' ').toLowerCase();
  const isEpistemicOrSoftware =
    colJoined.includes('mathematical') ||
    colJoined.includes('mainframe') ||
    colJoined.includes('logic');

  return rows.map((_, idx) => {
    const t = n === 1 ? 0 : idx / (n - 1);
    if (isEpistemicOrSoftware) {
      // Resilience / Direct Agency rises across disciplined stages
      return {
        agencyPct: Math.round(28 + 64 * Math.pow(t, 0.9)),
        driftPct: Math.round(82 - 58 * Math.pow(t, 0.95)),
        shellPct: Math.round(52 + Math.sin(t * Math.PI) * 14),
      };
    }
    // Classic civilizational capture arc: Household Stake declines, Administrative Capture rises, Formal Shell stays deceptively intact
    return {
      agencyPct: Math.round(86 - 70 * Math.pow(t, 1.05)),
      driftPct: Math.round(16 + 76 * Math.pow(t, 0.95)),
      shellPct: Math.round(80 - 16 * t),
    };
  });
}

/* ============================================================================
 * 2. AccentSynthesisAtlas — 4-Lens Interactive Dataviz Component
 * ========================================================================== */

export function AccentSynthesisAtlas({
  title,
  kicker,
  subtitle,
  columns,
  rows,
  pipes,
  episodes,
  bibliography,
  activeEpisodeNumber,
  defaultLens = 'trajectory',
  compact = false,
  onSelectEpisode,
  onPlayEpisode,
  onShareStage,
  className = '',
}: AccentSynthesisAtlasProps) {
  const { isReduced } = useMotionPreference();
  const [lens, setLens] = useState<AtlasLens>(defaultLens);
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(() => {
    if (typeof activeEpisodeNumber === 'number') {
      const idx = rows.findIndex((r) => r.episodeNumber === activeEpisodeNumber);
      if (idx >= 0) return idx;
    }
    return 0;
  });
  const [focusedPipeSlug, setFocusedPipeSlug] = useState<string | null>(null);
  const [focusedEpNum, setFocusedEpNum] = useState<number | null>(null);
  const [selectedBibId, setSelectedBibId] = useState<string | null>(
    bibliography[0]?.id ?? null,
  );

  useEffect(() => {
    if (typeof activeEpisodeNumber === 'number') {
      const idx = rows.findIndex((r) => r.episodeNumber === activeEpisodeNumber);
      if (idx >= 0) setSelectedStageIdx(idx);
    }
  }, [activeEpisodeNumber, rows]);

  const colJoined = columns.join(' ').toLowerCase();
  const isPositiveAscent =
    colJoined.includes('mathematical') ||
    colJoined.includes('mainframe') ||
    colJoined.includes('logic');

  const curveLabels = isPositiveAscent
    ? {
        primary: 'Verified Discipline / Ownership',
        secondary: 'Fragility / Cloud Lock-in',
        baseline: 'Surface Interface Continuity',
      }
    : {
        primary: 'Citizen & Household Autonomy',
        secondary: 'Administrative & Rent Capture',
        baseline: 'Formal Offices Preserved',
      };

  const curveData = useMemo(() => resolveCurveProfiles(rows, columns), [rows, columns]);

  // SVG coordinate constants (`viewBox="0 0 860 296"`)
  const trajWidth = 860;
  const trajHeight = 296;
  const padL = 54;
  const padR = 232;
  const padT = 36;
  const padB = 54;
  const plotW = trajWidth - padL - padR;
  const plotH = trajHeight - padT - padB;

  const trajectoryPoints = useMemo(() => {
    const count = Math.max(1, rows.length);
    return rows.map((row, idx) => {
      const x = count === 1 ? padL + plotW / 2 : padL + (idx / (count - 1)) * plotW;
      const d = curveData[idx] ?? { agencyPct: 50, driftPct: 50, shellPct: 70 };
      const toY = (pct: number) => padT + ((100 - pct) / 100) * plotH;
      return {
        idx,
        row,
        x,
        yAgency: toY(d.agencyPct),
        yDrift: toY(d.driftPct),
        yShell: toY(d.shellPct),
        agencyPct: d.agencyPct,
        driftPct: d.driftPct,
        pin: extractShortEvidencePin(row),
      };
    });
  }, [rows, curveData, plotW, plotH]);

  const selectedStagePoint =
    trajectoryPoints[selectedStageIdx] ?? trajectoryPoints[0];

  // Loom layout calculation (`viewBox="0 0 880 360"`)
  const loomData = useMemo(() => {
    const leftPipes = pipes.slice(0, 9);
    const midEps = [...episodes].sort((a, b) => a.episodeNumber - b.episodeNumber).slice(0, 6);
    const rightSources = bibliography.slice(0, 9);

    const distributeY = (len: number, top = 36, bottom = 334) => {
      if (len <= 1) return [(top + bottom) / 2];
      return Array.from({ length: len }, (_, i) => top + (i / (len - 1)) * (bottom - top));
    };

    const pipeY = distributeY(leftPipes.length);
    const epY = distributeY(midEps.length);
    const srcY = distributeY(rightSources.length);

    return {
      pipes: leftPipes.map((p, i) => ({
        ...p,
        x: 224,
        y: pipeY[i],
        color: ARCHIVAL_CHART_PALETTE[i % ARCHIVAL_CHART_PALETTE.length],
      })),
      episodes: midEps.map((e, i) => ({
        ...e,
        x: 468,
        y: epY[i],
      })),
      sources: rightSources.map((s, i) => ({
        ...s,
        x: 706,
        y: srcY[i],
      })),
    };
  }, [pipes, episodes, bibliography]);

  // Chronology Horizon layout (`viewBox="0 0 840 280"`)
  const chronologyNodes = useMemo(() => {
    const parsed = bibliography
      .map((item) => {
        const yNum = parseHistoricalYear(item.year);
        return yNum === null ? null : { ...item, yearNum: yNum };
      })
      .filter((x): x is AtlasBibliographyNode & { yearNum: number } => Boolean(x))
      .sort((a, b) => a.yearNum - b.yearNum);

    if (parsed.length === 0) return { nodes: [], hasAntiquity: false, minYear: 1900, maxYear: 2026 };

    const minYear = parsed[0].yearNum;
    const maxYear = Math.max(minYear + 10, parsed[parsed.length - 1].yearNum);
    const hasAntiquity = minYear < 1200;

    // Piecewise scale when antiquity + modern both exist so BC..450AD takes 32%, 1400..1900 takes 28%, 1900..now takes 40%
    const mapYearToX = (yr: number): number => {
      const left = 52;
      const right = 788;
      const w = right - left;
      if (!hasAntiquity) {
        return left + ((yr - minYear) / Math.max(1, maxYear - minYear)) * w;
      }
      if (yr <= 500) {
        const frac = (yr - Math.min(-150, minYear)) / Math.max(1, 500 - Math.min(-150, minYear));
        return left + Math.max(0, Math.min(1, frac)) * (w * 0.30);
      }
      if (yr <= 1900) {
        const frac = (yr - 500) / (1900 - 500);
        return left + w * 0.32 + Math.max(0, Math.min(1, frac)) * (w * 0.28);
      }
      const frac = (yr - 1900) / Math.max(10, maxYear - 1900);
      return left + w * 0.62 + Math.max(0, Math.min(1, frac)) * (w * 0.38);
    };

    const pipeIndex = new Map<string, number>();
    pipes.forEach((p, idx) => pipeIndex.set(p.slug, idx));

    const nodes = parsed.map((item, idx) => {
      const pIdx = pipeIndex.get(item.pipe) ?? idx;
      const lane = idx % 4;
      const y = 70 + lane * 42;
      return {
        ...item,
        x: mapYearToX(item.yearNum),
        y,
        token: ARCHIVAL_CHART_PALETTE[pIdx % ARCHIVAL_CHART_PALETTE.length],
      };
    });

    return { nodes, hasAntiquity, minYear, maxYear };
  }, [bibliography, pipes]);

  const activeBibItem =
    chronologyNodes.nodes.find((n) => n.id === selectedBibId) ??
    chronologyNodes.nodes[0] ??
    null;

  return (
    <section
      aria-label={title}
      className={`border-y border-[var(--a-rule)] bg-[var(--a-surface)]/45 ${
        compact ? 'py-6 px-4 sm:px-6' : 'py-8 px-4 sm:px-8'
      } ${className}`}
    >
      {/* Atlas Header & 4-Lens Switcher (Zero Mobile Overflow: grid-cols-2 on < sm) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-[var(--a-rule)]">
        <div className="max-w-[60ch]">
          {kicker && (
            <p className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--a-accent-text)] font-semibold">
              {kicker}
            </p>
          )}
          <h3
            className={`mt-1 font-serif font-semibold tracking-tight text-[var(--a-ink)] ${
              compact ? 'text-xl sm:text-2xl leading-8' : 'text-2xl sm:text-3xl leading-9'
            }`}
            style={{ fontFamily: 'var(--font-accent-display), Georgia, serif' }}
          >
            {title}
          </h3>
          {subtitle && !compact && (
            <p className="mt-1.5 text-sm leading-6 text-[var(--a-muted)]">{subtitle}</p>
          )}
        </div>

        <div
          role="tablist"
          aria-label="Synthesis visualization lenses"
          className="grid grid-cols-2 sm:inline-flex border border-[var(--a-rule)] bg-[var(--a-bg)] divide-x divide-y sm:divide-y-0 divide-[var(--a-rule)] shrink-0"
        >
          {(
            [
              { id: 'trajectory', label: '01 · Trajectory' },
              { id: 'loom', label: '02 · Pipe Loom' },
              { id: 'chronology', label: '03 · Chronology' },
              { id: 'table', label: '04 · Data Table' },
            ] as const
          ).map((item) => {
            const active = lens === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                data-testid={`atlas-lens-${item.id}`}
                onClick={() => setLens(item.id)}
                className={`relative min-h-[44px] px-3 font-mono text-xs cursor-pointer t-color whitespace-nowrap ${
                  active
                    ? 'bg-[var(--a-surface)] font-semibold text-[var(--a-ink)]'
                    : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                }`}
              >
                {active && (
                  <m.span
                    layoutId="atlas-lens-indicator"
                    transition={isReduced ? { duration: 0.05 } : SPRING_LAYOUT}
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--a-accent)]"
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lens Body */}
      <div className="pt-6">
        <AnimatePresence mode="wait" initial={false}>
          {/* ═══════════════════════════════════════════════════════════════
              LENS 1: STRUCTURAL TRAJECTORY CURVES + HARD EVIDENCE PINS
             ═══════════════════════════════════════════════════════════════ */}
          {lens === 'trajectory' && rows.length > 0 && (
            <m.div
              key="lens-trajectory"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_ACCENT }}
              className="space-y-5"
            >
              <div className="bg-[var(--a-bg)] border border-[var(--a-rule)] p-3 sm:p-5">
                <svg
                  viewBox={`0 0 ${trajWidth} ${trajHeight}`}
                  role="img"
                  aria-label={`${title}: Structural trajectory across ${rows.length} stages`}
                  className="w-full h-auto block max-w-full"
                >
                  {/* Subtle Horizontal Guide Lines (0%, 50%, 100%) */}
                  {[0, 50, 100].map((tick) => {
                    const y = padT + ((100 - tick) / 100) * plotH;
                    return (
                      <g key={tick}>
                        <line
                          x1={padL}
                          x2={padL + plotW}
                          y1={y}
                          y2={y}
                          stroke="var(--a-rule)"
                          strokeDasharray={tick === 50 ? '4 4' : undefined}
                        />
                        <text
                          x={padL - 10}
                          y={y + 4}
                          textAnchor="end"
                          fontSize="12"
                          fill="var(--a-muted)"
                          fontFamily="var(--font-mono), monospace"
                        >
                          {tick}%
                        </text>
                      </g>
                    );
                  })}

                  {/* Active Stage Hairline Cursor */}
                  {selectedStagePoint && (
                    <line
                      x1={selectedStagePoint.x}
                      x2={selectedStagePoint.x}
                      y1={padT - 8}
                      y2={padT + plotH + 6}
                      stroke="var(--a-accent)"
                      strokeWidth="1.5"
                      strokeOpacity="0.65"
                    />
                  )}

                  {/* Curve C: Dashed Formal Continuity */}
                  <path
                    d={cubicPath(trajectoryPoints.map((p) => ({ x: p.x, y: p.yShell })))}
                    fill="none"
                    stroke="var(--a-muted)"
                    strokeWidth="1.75"
                    strokeDasharray="6 4"
                    opacity="0.72"
                  />

                  {/* Curve A: Ink Line */}
                  <path
                    d={cubicPath(trajectoryPoints.map((p) => ({ x: p.x, y: p.yAgency })))}
                    fill="none"
                    stroke="var(--a-ink)"
                    strokeWidth="2.6"
                  />

                  {/* Curve B: Accent Capture/Discipline Line */}
                  <path
                    d={cubicPath(trajectoryPoints.map((p) => ({ x: p.x, y: p.yDrift })))}
                    fill="none"
                    stroke="var(--a-accent-text)"
                    strokeWidth="2.6"
                  />

                  {/* Direct End Labels (Accént `chart-do-direct-labels` rule — wrapped full labels, never truncated!) */}
                  {trajectoryPoints.length > 0 && (() => {
                    const last = trajectoryPoints[trajectoryPoints.length - 1];
                    const splitTwoLines = (txt: string): [string, string | null] => {
                      if (txt.length <= 20) return [txt, null];
                      const words = txt.split(/\s+/);
                      const half = Math.ceil(words.length / 2);
                      return [words.slice(0, half).join(' '), words.slice(half).join(' ')];
                    };
                    const pLines = splitTwoLines(curveLabels.primary);
                    const sLines = splitTwoLines(curveLabels.secondary);
                    const bLines = splitTwoLines(curveLabels.baseline);
                    const lx = last.x + 14;
                    return (
                      <g fontSize="13" fontWeight="600" fontFamily="var(--font-sans), sans-serif">
                        <text x={lx} y={pLines[1] ? last.yAgency - 2 : last.yAgency + 4} fill="var(--a-ink)">
                          <tspan x={lx}>{pLines[0]}</tspan>
                          {pLines[1] && <tspan x={lx} dy="15">{pLines[1]}</tspan>}
                        </text>
                        <text x={lx} y={sLines[1] ? last.yDrift - 2 : last.yDrift + 4} fill="var(--a-accent-text)">
                          <tspan x={lx}>{sLines[0]}</tspan>
                          {sLines[1] && <tspan x={lx} dy="15">{sLines[1]}</tspan>}
                        </text>
                        <text x={lx} y={bLines[1] ? last.yShell - 2 : last.yShell + 4} fill="var(--a-muted)" fontWeight="500">
                          <tspan x={lx}>{bLines[0]}</tspan>
                          {bLines[1] && <tspan x={lx} dy="15">{bLines[1]}</tspan>}
                        </text>
                      </g>
                    );
                  })()}

                  {/* Interactive Stage Medallion Nodes */}
                  {trajectoryPoints.map((pt) => {
                    const active = selectedStageIdx === pt.idx;
                    return (
                      <g
                        key={pt.row.stage}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedStageIdx(pt.idx);
                          onSelectEpisode?.(pt.row.episodeNumber);
                        }}
                      >
                        {/* Invisible wide hit-column */}
                        <rect
                          x={pt.x - 28}
                          y={padT - 12}
                          width="56"
                          height={plotH + 54}
                          fill="transparent"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.yAgency}
                          r={active ? 6.5 : 4.5}
                          fill={active ? 'var(--a-ink)' : 'var(--a-bg)'}
                          stroke="var(--a-ink)"
                          strokeWidth="2"
                        />
                        <rect
                          x={pt.x - (active ? 6 : 4.5)}
                          y={pt.yDrift - (active ? 6 : 4.5)}
                          width={active ? 12 : 9}
                          height={active ? 12 : 9}
                          transform={`rotate(45 ${pt.x} ${pt.yDrift})`}
                          fill={active ? 'var(--a-accent-fill)' : 'var(--a-bg)'}
                          stroke="var(--a-accent-text)"
                          strokeWidth="2"
                        />
                        <text
                          x={pt.x}
                          y={padT + plotH + 24}
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight={active ? '700' : '500'}
                          fill={active ? 'var(--a-accent-text)' : 'var(--a-muted)'}
                          fontFamily="var(--font-mono), monospace"
                        >
                          Ep 0{pt.row.episodeNumber}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Mobile & Keyboard Accessible Stage Selector Strip */}
                <div className="mt-3 pt-3 border-t border-[var(--a-rule)] flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {rows.map((r, idx) => (
                      <button
                        key={r.stage}
                        type="button"
                        onClick={() => setSelectedStageIdx(idx)}
                        className={`min-h-[44px] px-2.5 text-xs font-mono border cursor-pointer t-color ${
                          selectedStageIdx === idx
                            ? 'border-[var(--a-accent)] bg-[var(--a-surface)] font-semibold text-[var(--a-ink)]'
                            : 'border-[var(--a-rule)] text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                        }`}
                      >
                        Ep 0{r.episodeNumber}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    {onPlayEpisode && selectedStagePoint && (
                      <button
                        type="button"
                        onClick={() => onPlayEpisode(selectedStagePoint.row.episodeNumber)}
                        className="min-h-[44px] text-[var(--a-accent-text)] font-semibold hover:underline underline-offset-4 cursor-pointer"
                      >
                        ▶ Hear Ep 0{selectedStagePoint.row.episodeNumber}
                      </button>
                    )}
                    {onShareStage && (
                      <button
                        type="button"
                        onClick={() => onShareStage(selectedStageIdx)}
                        className="min-h-[44px] text-[var(--a-ink)] hover:underline underline-offset-4 cursor-pointer"
                      >
                        ✦ Share Stage Card
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Active Stage 3-Column Comparative Proof Strip */}
              {selectedStagePoint && (
                <div className="border-t border-[var(--a-rule)] pt-4 space-y-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4
                      className="font-serif text-lg sm:text-xl font-semibold text-[var(--a-ink)]"
                      style={{ fontFamily: 'var(--font-accent-display), Georgia, serif' }}
                    >
                      {selectedStagePoint.row.stage}
                    </h4>
                    <span className="font-mono text-xs text-[var(--a-accent-text)] font-semibold">
                      Key Datum: {selectedStagePoint.pin}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[var(--a-rule)] pt-3">
                    {columns.map((col, cIdx) => (
                      <div key={col} className="border-l-2 border-[var(--a-rule)] pl-3">
                        <div className="font-mono text-xs uppercase tracking-wider text-[var(--a-muted)]">
                          {col}
                        </div>
                        <p className="mt-1 text-sm leading-6 text-[var(--a-ink)]">
                          {selectedStagePoint.row.cells[cIdx] || ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </m.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              LENS 2: COMBINED-PIPE LOOM (Pipes -> Episodes -> Primary Sources)
             ═══════════════════════════════════════════════════════════════ */}
          {lens === 'loom' && (
            <m.div
              key="lens-loom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_ACCENT }}
              className="space-y-4"
            >
              {/* Pipe Interactive Pill Isolator */}
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setFocusedPipeSlug(null);
                    setFocusedEpNum(null);
                  }}
                  className={`min-h-[44px] px-3 text-xs font-mono border cursor-pointer ${
                    !focusedPipeSlug && focusedEpNum === null
                      ? 'border-[var(--a-accent)] bg-[var(--a-bg)] font-semibold text-[var(--a-ink)]'
                      : 'border-[var(--a-rule)] text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                  }`}
                >
                  All {pipes.length} Pipes
                </button>
                {loomData.pipes.map((p) => {
                  const active = focusedPipeSlug === p.slug;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => {
                        setFocusedEpNum(null);
                        setFocusedPipeSlug((cur) => (cur === p.slug ? null : p.slug));
                      }}
                      className={`min-h-[44px] px-2.5 text-xs font-mono border cursor-pointer flex items-center gap-1.5 t-color ${
                        active
                          ? 'border-[var(--a-accent)] bg-[var(--a-bg)] font-semibold text-[var(--a-ink)]'
                          : 'border-[var(--a-rule)] text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: p.color.lightHex }}
                      />
                      <span>{p.label.replace(/^pipe\\/, '')}</span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-[var(--a-bg)] border border-[var(--a-rule)] p-3 sm:p-4">
                <svg
                  viewBox="0 0 880 360"
                  role="img"
                  aria-label="Combined-Pipe Loom connecting Subject Pipes, Episodes, and Primary Sources"
                  className="w-full h-auto block max-w-full"
                >
                  <g fontSize="12" fontFamily="var(--font-mono), monospace" fill="var(--a-muted)">
                    <text x="224" y="18" textAnchor="end">SUBJECT PIPES</text>
                    <text x="468" y="18" textAnchor="middle">EPISODES</text>
                    <text x="706" y="18" textAnchor="start">PRIMARY WORKS</text>
                  </g>

                  {/* Ribbons: Pipes -> Episodes */}
                  {loomData.pipes.flatMap((p) =>
                    p.episodes
                      .map((epNum) => {
                        const ep = loomData.episodes.find((e) => e.episodeNumber === epNum);
                        if (!ep) return null;
                        const isLit =
                          focusedPipeSlug === p.slug ||
                          focusedEpNum === epNum ||
                          (!focusedPipeSlug && focusedEpNum === null);
                        const d = `M ${p.x + 6} ${p.y} C ${(p.x + ep.x) / 2} ${p.y}, ${(p.x + ep.x) / 2} ${ep.y}, ${ep.x - 62} ${ep.y}`;
                        return (
                          <path
                            key={`${p.slug}-${epNum}`}
                            d={d}
                            fill="none"
                            stroke={
                              focusedPipeSlug === p.slug || focusedEpNum === epNum
                                ? 'var(--a-accent)'
                                : p.color.lightHex
                            }
                            strokeWidth={focusedPipeSlug === p.slug || focusedEpNum === epNum ? 2.6 : 1.5}
                            strokeOpacity={isLit ? 0.65 : 0.08}
                          />
                        );
                      })
                      .filter(Boolean),
                  )}

                  {/* Ribbons: Episodes -> Primary Sources */}
                  {loomData.sources.map((src) => {
                    const connectedPipe = loomData.pipes.find((p) => p.slug === src.pipe);
                    const targetEps = connectedPipe?.episodes?.filter((n) => n >= 1) ?? [1];
                    return targetEps.slice(0, 2).map((epNum) => {
                      const ep = loomData.episodes.find((e) => e.episodeNumber === epNum);
                      if (!ep) return null;
                      const isLit =
                        focusedPipeSlug === src.pipe ||
                        focusedEpNum === epNum ||
                        (!focusedPipeSlug && focusedEpNum === null);
                      const d = `M ${ep.x + 62} ${ep.y} C ${(ep.x + src.x) / 2} ${ep.y}, ${(ep.x + src.x) / 2} ${src.y}, ${src.x - 6} ${src.y}`;
                      return (
                        <path
                          key={`ep-${epNum}-src-${src.id}`}
                          d={d}
                          fill="none"
                          stroke={
                            focusedPipeSlug === src.pipe || focusedEpNum === epNum
                              ? 'var(--a-accent)'
                              : 'var(--a-ink)'
                          }
                          strokeWidth={focusedPipeSlug === src.pipe || focusedEpNum === epNum ? 2 : 1.1}
                          strokeOpacity={isLit ? 0.35 : 0.06}
                        />
                      );
                    });
                  })}

                  {/* Pipe Labels (Left) */}
                  {loomData.pipes.map((p) => {
                    const active = focusedPipeSlug === p.slug;
                    return (
                      <g
                        key={p.slug}
                        className="cursor-pointer"
                        onClick={() => {
                          setFocusedEpNum(null);
                          setFocusedPipeSlug((cur) => (cur === p.slug ? null : p.slug));
                        }}
                      >
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={active ? 6 : 4.5}
                          fill={active ? 'var(--a-accent)' : p.color.lightHex}
                        />
                        <text
                          x={p.x - 12}
                          y={p.y + 4}
                          textAnchor="end"
                          fontSize="12"
                          fontWeight={active ? '700' : '500'}
                          fill={active ? 'var(--a-ink)' : 'var(--a-muted)'}
                          fontFamily="var(--font-mono), monospace"
                        >
                          {p.label.length > 28 ? `${p.label.slice(0, 26)}…` : p.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Episode Pills (Center) */}
                  {loomData.episodes.map((ep) => {
                    const active =
                      focusedEpNum === ep.episodeNumber ||
                      activeEpisodeNumber === ep.episodeNumber;
                    return (
                      <g
                        key={ep.episodeNumber}
                        className="cursor-pointer"
                        onClick={() => {
                          setFocusedPipeSlug(null);
                          setFocusedEpNum((cur) =>
                            cur === ep.episodeNumber ? null : ep.episodeNumber,
                          );
                          onSelectEpisode?.(ep.episodeNumber);
                        }}
                      >
                        <rect
                          x={ep.x - 58}
                          y={ep.y - 14}
                          width="116"
                          height="28"
                          rx="4"
                          fill={active ? 'var(--a-surface)' : 'var(--a-bg)'}
                          stroke={active ? 'var(--a-accent)' : 'var(--a-rule)'}
                          strokeWidth={active ? '1.8' : '1'}
                        />
                        <text
                          x={ep.x}
                          y={ep.y + 4}
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="600"
                          fill="var(--a-ink)"
                          fontFamily="var(--font-mono), monospace"
                        >
                          Ep 0{ep.episodeNumber}
                        </text>
                      </g>
                    );
                  })}

                  {/* Primary Work Nodes (Right) */}
                  {loomData.sources.map((src) => {
                    const active = focusedPipeSlug === src.pipe;
                    const shortLabel = `${src.author.split(' ').pop() || src.author} (${src.year})`;
                    return (
                      <g key={src.id}>
                        <rect
                          x={src.x - 4}
                          y={src.y - 4}
                          width="8"
                          height="8"
                          fill={active ? 'var(--a-accent)' : 'var(--a-ink)'}
                        />
                        <text
                          x={src.x + 12}
                          y={src.y + 4}
                          textAnchor="start"
                          fontSize="12"
                          fontWeight={active ? '600' : '400'}
                          fill={active ? 'var(--a-ink)' : 'var(--a-muted)'}
                          fontFamily="var(--font-sans), sans-serif"
                        >
                          {shortLabel.length > 21 ? `${shortLabel.slice(0, 19)}…` : shortLabel}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Active Filter Readout */}
                <div className="mt-3 pt-3 border-t border-[var(--a-rule)] flex flex-wrap items-center justify-between gap-2 text-xs">
                  {focusedPipeSlug ? (
                    (() => {
                      const p = pipes.find((x) => x.slug === focusedPipeSlug);
                      return p ? (
                        <p className="text-[var(--a-ink)]">
                          <span className="font-mono font-semibold text-[var(--a-accent-text)]">
                            {p.label}
                          </span>
                          {p.discipline ? ` · ${p.discipline}` : ''} — {p.why}
                        </p>
                      ) : null;
                    })()
                  ) : (
                    <p className="font-mono text-[var(--a-muted)]">
                      Tap any Pipe, Episode, or primary work to isolate its citation threads.
                    </p>
                  )}
                  <span className="font-mono text-[var(--a-muted)] tabular-nums">
                    {pipes.length} Pipes · {episodes.length} Episodes · {bibliography.length} Works
                  </span>
                </div>
              </div>
            </m.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              LENS 3: DEEP-TIME SOURCE HORIZON (Chronology)
             ═══════════════════════════════════════════════════════════════ */}
          {lens === 'chronology' && (
            <m.div
              key="lens-chronology"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_ACCENT }}
              className="space-y-4"
            >
              <div className="bg-[var(--a-bg)] border border-[var(--a-rule)] p-3 sm:p-5">
                <svg
                  viewBox="0 0 840 270"
                  role="img"
                  aria-label="Chronological plot of primary and secondary sources"
                  className="w-full h-auto block max-w-full"
                >
                  {/* Baseline Spine */}
                  <line x1="40" x2="800" y1="226" y2="226" stroke="var(--a-ink)" strokeOpacity="0.35" />

                  {chronologyNodes.hasAntiquity ? (
                    <g fontSize="12" fontFamily="var(--font-mono), monospace" fill="var(--a-muted)">
                      <text x="52" y="250">Classical Antiquity</text>
                      <text x="315" y="250">1500 – 1900</text>
                      <text x="615" y="250">1900 – Present</text>
                    </g>
                  ) : (
                    <g fontSize="12" fontFamily="var(--font-mono), monospace" fill="var(--a-muted)">
                      <text x="52" y="250">{chronologyNodes.minYear}</text>
                      <text x="788" y="250" textAnchor="end">{chronologyNodes.maxYear}</text>
                    </g>
                  )}

                  {chronologyNodes.nodes.map((node) => {
                    const active = activeBibItem?.id === node.id;
                    return (
                      <g
                        key={node.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedBibId(node.id)}
                      >
                        <line
                          x1={node.x}
                          x2={node.x}
                          y1={node.y + 8}
                          y2={226}
                          stroke={active ? 'var(--a-accent)' : 'var(--a-rule)'}
                          strokeWidth={active ? '1.8' : '1'}
                        />
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={active ? 8 : 5.5}
                          fill={active ? 'var(--a-accent-fill)' : node.token.lightHex}
                          stroke="var(--a-bg)"
                          strokeWidth="1.5"
                        />
                        <text
                          x={node.x}
                          y={node.y - 12}
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight={active ? '700' : '500'}
                          fill={active ? 'var(--a-accent-text)' : 'var(--a-ink)'}
                          fontFamily="var(--font-sans), sans-serif"
                        >
                          {node.author.split(' ').pop()} ({node.yearNum < 0 ? `${Math.abs(node.yearNum)} BC` : node.yearNum})
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {activeBibItem && (
                  <div className="mt-3 pt-3 border-t border-[var(--a-rule)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[var(--a-ink)]">
                        {activeBibItem.author},{' '}
                        <em className="font-serif">{activeBibItem.title}</em> ({activeBibItem.year})
                      </p>
                      {activeBibItem.roleInThesis && (
                        <p className="text-xs text-[var(--a-muted)] mt-0.5">
                          {activeBibItem.roleInThesis}
                        </p>
                      )}
                    </div>
                    <a
                      href={activeBibItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] inline-flex items-center px-3 border border-[var(--a-rule)] bg-[var(--a-surface)] font-mono text-xs text-[var(--a-ink)] hover:border-[var(--a-ink)] shrink-0"
                    >
                      Verify Primary Source ↗
                    </a>
                  </div>
                )}
              </div>
            </m.div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              LENS 4: ACCESSIBLE DATA TABLE TWIN (`md+` Table + `< md` Stacked List)
             ═══════════════════════════════════════════════════════════════ */}
          {lens === 'table' && (
            <m.div
              key="lens-table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_ACCENT }}
            >
              {/* Mobile Stacked List */}
              <ol className="md:hidden divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
                {rows.map((row) => (
                  <li key={`${row.episodeNumber}-${row.stage}`} className="py-5 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectEpisode?.(row.episodeNumber)}
                        className="text-left font-serif text-lg font-semibold underline underline-offset-4 text-[var(--a-ink)] cursor-pointer"
                      >
                        {row.stage}
                      </button>
                      <span className="font-mono text-xs text-[var(--a-muted)] shrink-0">
                        Ep 0{row.episodeNumber} →
                      </span>
                    </div>
                    <dl className="space-y-2.5 text-sm leading-6">
                      {columns.map((colLabel, colIdx) => (
                        <div key={colLabel} className="pl-3 border-l-2 border-[var(--a-rule)]">
                          <dt className="font-mono text-xs uppercase tracking-wider text-[var(--a-muted)]">
                            {colLabel}
                          </dt>
                          <dd className="mt-0.5 text-[var(--a-ink)]">{row.cells[colIdx] || ''}</dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                ))}
              </ol>

              {/* Desktop Semantic Comparison Table */}
              <div
                tabIndex={0}
                role="region"
                aria-label={title}
                className="hidden md:block max-h-[75vh] overflow-auto border border-[var(--a-rule)] bg-[var(--a-bg)]"
              >
                <table className="w-full min-w-[680px] text-sm leading-6 border-separate border-spacing-0">
                  <caption className="sr-only">{title}</caption>
                  <thead className="sticky top-0 z-10 bg-[var(--a-surface)]">
                    <tr>
                      <th
                        scope="col"
                        className="text-left font-semibold px-4 py-3 border-b border-[var(--a-rule)] w-[18%]"
                      >
                        Stage &amp; Episode
                      </th>
                      {columns.map((colLabel, idx) => (
                        <th
                          key={colLabel}
                          scope="col"
                          className={`text-left font-semibold px-4 py-3 border-b border-[var(--a-rule)] ${
                            idx === 2 ? 'w-[28%]' : 'w-[27%]'
                          }`}
                        >
                          {colLabel}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => (
                      <tr
                        key={`${row.episodeNumber}-${row.stage}`}
                        className="border-b border-[var(--a-rule)] last:border-0"
                      >
                        <th
                          scope="row"
                          className="sticky left-0 bg-[var(--a-bg)] text-left font-medium px-4 py-4 align-top"
                        >
                          <button
                            type="button"
                            onClick={() => onSelectEpisode?.(row.episodeNumber)}
                            className="text-left font-serif text-base font-semibold underline underline-offset-4 hover:text-[var(--a-accent-text)] cursor-pointer"
                          >
                            {row.stage}
                          </button>
                          <div className="mt-1 text-xs font-mono text-[var(--a-muted)]">
                            Episode {row.episodeNumber}
                          </div>
                        </th>
                        <td className="px-4 py-4 align-top text-[var(--a-ink)]">{row.cells[0]}</td>
                        <td className="px-4 py-4 align-top text-[var(--a-ink)]">{row.cells[1]}</td>
                        <td className="px-4 py-4 align-top text-[var(--a-ink)]">{row.cells[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ============================================================================
 * 3. AccentSharePlateDialog — 1200x630 Museum & Dataviz Postcard Exporter
 * ========================================================================== */

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number,
): number {
  const words = (text || '').split(/\s+/).filter(Boolean);
  let line = '';
  let curY = y;
  let lineCount = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lineCount++;
      if (lineCount >= maxLines) {
        ctx.fillText(`${line}…`, x, curY);
        return curY + lineHeight;
      }
      ctx.fillText(line, x, curY);
      line = words[i];
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line && lineCount < maxLines) {
    ctx.fillText(line, x, curY);
    curY += lineHeight;
  }
  return curY;
}

export interface AccentSharePlateDialogProps {
  open: boolean;
  onClose: () => void;
  seriesTitle: string;
  episodeLabel: string;
  episodeTitle: string;
  plateSrc: string;
  plateCredit: string;
  quoteOrThesis: string;
  sourceAttribution: string;
  shareUrl: string;
  asteriskShareUrl?: string;
}

export function AccentSharePlateDialog({
  open,
  onClose,
  seriesTitle,
  episodeLabel,
  episodeTitle,
  plateSrc,
  plateCredit,
  quoteOrThesis,
  sourceAttribution,
  shareUrl,
  asteriskShareUrl,
}: AccentSharePlateDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [finish, setFinish] = useState<'sandstone' | 'obsidian'>('sandstone');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 1200;
    const H = 630;
    const dark = finish === 'obsidian';

    const drawPoster = (img?: HTMLImageElement) => {
      ctx.fillStyle = dark ? '#111827' : '#EFEAE0';
      ctx.fillRect(0, 0, W, H);

      // Inner museum mat border
      ctx.strokeStyle = dark ? 'rgba(243,239,233,0.22)' : 'rgba(17,24,39,0.18)';
      ctx.lineWidth = 2;
      ctx.strokeRect(24, 24, W - 48, H - 48);

      // Left column typographic plate (width 600px)
      const leftX = 56;
      const colW = 580;

      // Accent slash mark
      ctx.fillStyle = dark ? '#EE8AB4' : '#B8326D';
      ctx.beginPath();
      ctx.moveTo(leftX + 4, 82);
      ctx.lineTo(leftX + 14, 54);
      ctx.lineTo(leftX + 20, 54);
      ctx.lineTo(leftX + 8, 82);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = dark ? '#C9C2B6' : '#4B5563';
      ctx.font = '600 15px ui-monospace, Menlo, monospace';
      wrapCanvasText(
        ctx,
        `${seriesTitle.toUpperCase()} · ${episodeLabel.toUpperCase()}`,
        leftX + 30,
        74,
        colW - 36,
        20,
        1,
      );

      ctx.fillStyle = dark ? '#FAF8F5' : '#111827';
      ctx.font = '600 36px Georgia, serif';
      const afterTitleY = wrapCanvasText(ctx, episodeTitle, leftX, 132, colW, 44, 3);

      // Divider rule + quote
      ctx.fillStyle = dark ? '#EE8AB4' : '#B8326D';
      ctx.fillRect(leftX, afterTitleY + 10, 44, 3);

      ctx.fillStyle = dark ? '#E5E0D8' : '#1F2937';
      ctx.font = 'italic 22px Georgia, serif';
      const afterQuoteY = wrapCanvasText(
        ctx,
        `“${quoteOrThesis}”`,
        leftX,
        afterTitleY + 48,
        colW,
        32,
        5,
      );

      // Mini structural curve watermark above colophon
      const sparkY = Math.max(afterQuoteY + 28, 495);
      ctx.strokeStyle = dark ? 'rgba(238,138,180,0.45)' : 'rgba(184,50,109,0.35)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(leftX, sparkY);
      ctx.bezierCurveTo(leftX + 110, sparkY - 24, leftX + 200, sparkY + 18, leftX + 310, sparkY - 12);
      ctx.stroke();

      ctx.fillStyle = dark ? '#C9C2B6' : '#4B5563';
      ctx.font = '500 15px ui-monospace, Menlo, monospace';
      wrapCanvasText(ctx, `Source: ${sourceAttribution}`, leftX, 544, colW, 20, 1);
      ctx.fillText(shareUrl.replace(/^https?:\/\//, ''), leftX, 578);

      // Right 44% classical painting mat
      const imgX = 670;
      const imgY = 52;
      const imgW = 474;
      const imgH = 442;
      ctx.fillStyle = '#181512';
      ctx.fillRect(imgX, imgY, imgW, imgH);
      if (img) {
        const srcRatio = img.naturalWidth / Math.max(1, img.naturalHeight);
        const dstRatio = imgW / imgH;
        let sx = 0;
        let sy = 0;
        let sw = img.naturalWidth;
        let sh = img.naturalHeight;
        if (srcRatio > dstRatio) {
          sw = img.naturalHeight * dstRatio;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sh = img.naturalWidth / dstRatio;
          sy = (img.naturalHeight - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, imgX, imgY, imgW, imgH);
      }
      ctx.strokeStyle = dark ? 'rgba(243,239,233,0.22)' : 'rgba(17,24,39,0.2)';
      ctx.strokeRect(imgX, imgY, imgW, imgH);

      ctx.fillStyle = dark ? '#C9C2B6' : '#4B5563';
      ctx.font = '400 14px Georgia, serif';
      wrapCanvasText(ctx, plateCredit, imgX, imgY + imgH + 26, imgW, 20, 2);
    };

    drawPoster();

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => drawPoster(img);
    img.onerror = () => drawPoster();
    img.src = plateSrc;
  }, [
    open,
    finish,
    seriesTitle,
    episodeLabel,
    episodeTitle,
    plateSrc,
    plateCredit,
    quoteOrThesis,
    sourceAttribution,
    shareUrl,
  ]);

  if (!open) return null;

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${episodeLabel.toLowerCase().replace(/\s+/g, '-')}-exhibition-plate.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    }, 'image/png');
  };

  const handleNativeShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas || typeof navigator === 'undefined') return;
    if (typeof navigator.share === 'function') {
      try {
        const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
        if (blob) {
          const file = new File([blob], 'pipes-exhibition-plate.png', { type: 'image/png' });
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
              title: `${episodeTitle} · ${seriesTitle}`,
              text: `"${quoteOrThesis}" — ${sourceAttribution}`,
              url: shareUrl,
              files: [file],
            });
            return;
          }
        }
        await navigator.share({
          title: `${episodeTitle} · ${seriesTitle}`,
          text: `"${quoteOrThesis}" — ${sourceAttribution}`,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard link copy
      }
    }
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Share Exhibition Postcard"
      data-testid="share-plate-dialog"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs grid place-items-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl border border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-ink)] p-4 sm:p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--a-rule)] pb-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--a-accent-text)] font-semibold">
              Museum &amp; Evidence Postcard (1200×630)
            </p>
            <h3 className="font-serif text-lg sm:text-xl font-semibold">
              Share {episodeLabel}: {episodeTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-3 border border-[var(--a-rule)] font-mono text-xs cursor-pointer hover:border-[var(--a-ink)]"
          >
            Close ✕
          </button>
        </div>

        {/* Mat Finish Selector */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="inline-flex border border-[var(--a-rule)] divide-x divide-[var(--a-rule)]">
            <button
              type="button"
              onClick={() => setFinish('sandstone')}
              className={`min-h-[44px] px-3 cursor-pointer ${
                finish === 'sandstone'
                  ? 'bg-[var(--a-surface)] font-semibold text-[var(--a-ink)]'
                  : 'text-[var(--a-muted)]'
              }`}
            >
              Warm Sandstone Mat
            </button>
            <button
              type="button"
              onClick={() => setFinish('obsidian')}
              className={`min-h-[44px] px-3 cursor-pointer ${
                finish === 'obsidian'
                  ? 'bg-[var(--a-surface)] font-semibold text-[var(--a-ink)]'
                  : 'text-[var(--a-muted)]'
              }`}
            >
              Gallery Obsidian Mat
            </button>
          </div>
          <span className="text-[var(--a-muted)]">High-resolution social &amp; print plate</span>
        </div>

        <div className="border border-[var(--a-rule)] overflow-hidden bg-black/5">
          <canvas ref={canvasRef} width={1200} height={630} className="w-full h-auto block" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadPng}
              className="min-h-[44px] px-4 bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] font-mono text-xs font-semibold cursor-pointer"
            >
              ↓ Download Postcard (.png)
            </button>
            <button
              type="button"
              onClick={handleNativeShare}
              className="min-h-[44px] px-4 border border-[var(--a-rule)] bg-[var(--a-surface)] font-mono text-xs cursor-pointer hover:border-[var(--a-ink)]"
            >
              ↗ Share Image / Link
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(shareUrl).catch(() => {});
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="min-h-[44px] px-3 font-mono text-xs underline underline-offset-4 cursor-pointer text-[var(--a-muted)] hover:text-[var(--a-ink)]"
            >
              {copiedLink ? '✓ Copied Deep Link' : 'Copy Link'}
            </button>
          </div>
          {asteriskShareUrl && (
            <a
              href={asteriskShareUrl}
              className="min-h-[44px] inline-flex items-center px-3 font-mono text-xs font-semibold text-[var(--a-accent-text)] hover:underline underline-offset-4"
            >
              * Post Quote &amp; Link to Asterisk ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
