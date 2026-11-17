'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';
import { EASE_EDITORIAL, SPRING_LAYOUT } from '@/lib/motion/tokens';
import type { SkyPalette } from './index';

/* ============================================================================
 * 1. Domain & Episode Pigment Resolver (`resolveThesisMoodPalette`)
 * ========================================================================== */

const LIGHT_PAPER: [number, number, number] = [0.91, 0.886, 0.835]; // #E8E2D5 Warm Sandstone
const DARK_PAPER: [number, number, number] = [0.067, 0.094, 0.153]; // #111827 Slate Charcoal

const ROMANOV_EPISODE_MOODS_LIGHT: Record<number, SkyPalette> = {
  0: {
    // 1905 Overture — Baltic winter slate, crimson silk banner, ember glow
    top: [0.43, 0.48, 0.56],
    mid: [0.78, 0.74, 0.69],
    low: [0.76, 0.48, 0.50],
    glow: [0.72, 0.20, 0.30],
    paper: LIGHT_PAPER,
  },
  1: {
    // Agrarian / Volga Barge Haulers — river sky, sunburnt flax ochre, wheat amber
    top: [0.54, 0.62, 0.66],
    mid: [0.87, 0.76, 0.58],
    low: [0.83, 0.67, 0.50],
    glow: [0.82, 0.51, 0.24],
    paper: LIGHT_PAPER,
  },
  2: {
    // Petrograd 1917 & Deserted Campania — river fog, pale limestone, iron terracotta
    top: [0.47, 0.55, 0.63],
    mid: [0.83, 0.79, 0.74],
    low: [0.78, 0.55, 0.46],
    glow: [0.74, 0.25, 0.38],
    paper: LIGHT_PAPER,
  },
  3: {
    // Kustodiev's The Bolshevik & Roman Senate — twilight smoke, snow glare, carmine
    top: [0.39, 0.38, 0.44],
    mid: [0.85, 0.80, 0.75],
    low: [0.77, 0.38, 0.33],
    glow: [0.76, 0.18, 0.26],
    paper: LIGHT_PAPER,
  },
  4: {
    // Cole's Consummation & Cathedral — imperial coastal teal, marble cream, gilt rose
    top: [0.45, 0.56, 0.59],
    mid: [0.89, 0.81, 0.63],
    low: [0.87, 0.72, 0.68],
    glow: [0.72, 0.20, 0.43],
    paper: LIGHT_PAPER,
  },
  5: {
    // Alma-Tadema Praetorians & Cole's Desolation — twilight plum, tapestry gold, rose
    top: [0.40, 0.35, 0.46],
    mid: [0.82, 0.74, 0.61],
    low: [0.71, 0.42, 0.45],
    glow: [0.72, 0.20, 0.43],
    paper: LIGHT_PAPER,
  },
};

export const THESIS_MOOD_PALETTES: Record<string, SkyPalette> = {
  'epistemic-signal': {
    // Bell Labs oscilloscope phosphor & chalkboard slate
    top: [0.32, 0.53, 0.58],
    mid: [0.79, 0.86, 0.84],
    low: [0.84, 0.86, 0.80],
    glow: [0.05, 0.52, 0.74],
    paper: LIGHT_PAPER,
  },
  'constitutional-mint': {
    // Philadelphia parchment, verdigris copper & die-struck brass
    top: [0.42, 0.54, 0.49],
    mid: [0.87, 0.81, 0.68],
    low: [0.84, 0.74, 0.58],
    glow: [0.72, 0.43, 0.17],
    paper: LIGHT_PAPER,
  },
  'household-limestone': {
    // Antioch stone, olive grove & hearth terracotta
    top: [0.49, 0.56, 0.45],
    mid: [0.88, 0.82, 0.73],
    low: [0.83, 0.64, 0.54],
    glow: [0.72, 0.26, 0.35],
    paper: LIGHT_PAPER,
  },
  'crt-cobalt': {
    // Engelbart workbench cobalt blue & artisan paper
    top: [0.35, 0.48, 0.68],
    mid: [0.81, 0.84, 0.88],
    low: [0.89, 0.77, 0.82],
    glow: [0.72, 0.20, 0.43],
    paper: LIGHT_PAPER,
  },
  'sandstone-editorial': {
    top: [0.58, 0.53, 0.68],
    mid: [0.89, 0.82, 0.73],
    low: [0.88, 0.75, 0.78],
    glow: [0.72, 0.20, 0.43],
    paper: LIGHT_PAPER,
  },
};

function darkenPalette(p: SkyPalette): SkyPalette {
  const scale = (rgb: [number, number, number], f: number): [number, number, number] => [
    Number((rgb[0] * f).toFixed(3)),
    Number((rgb[1] * f).toFixed(3)),
    Number((rgb[2] * f).toFixed(3)),
  ];
  return {
    top: scale(p.top, 0.28),
    mid: scale(p.mid, 0.24),
    low: scale(p.low, 0.28),
    glow: scale(p.glow, 0.65),
    paper: DARK_PAPER,
  };
}

/**
 * Resolves an atmospheric pigment palette tailored to the Thesis Edition's connected
 * Pipes and active episode so every generated edition inhabits its historical/technical world.
 */
export function resolveThesisMoodPalette(
  pipes: string[],
  episodeNumber: number,
  mode: 'light' | 'dark' = 'light',
): SkyPalette {
  const joined = pipes.join(' ').toLowerCase();
  let base: SkyPalette;

  if (
    joined.includes('ancient-history') ||
    joined.includes('institutional-capture') ||
    joined.includes('politics') ||
    joined.includes('history')
  ) {
    base = ROMANOV_EPISODE_MOODS_LIGHT[episodeNumber] ?? ROMANOV_EPISODE_MOODS_LIGHT[1];
  } else if (
    joined.includes('information-theory') ||
    joined.includes('bayesian') ||
    joined.includes('reasoning')
  ) {
    base = THESIS_MOOD_PALETTES['epistemic-signal'];
  } else if (
    joined.includes('bitcoin') ||
    joined.includes('constitutional') ||
    joined.includes('austrian')
  ) {
    base = THESIS_MOOD_PALETTES['constitutional-mint'];
  } else if (
    joined.includes('christianity') ||
    joined.includes('family') ||
    joined.includes('architecture')
  ) {
    base = THESIS_MOOD_PALETTES['household-limestone'];
  } else if (
    joined.includes('local-first') ||
    joined.includes('website-design') ||
    joined.includes('software-architecture')
  ) {
    base = THESIS_MOOD_PALETTES['crt-cobalt'];
  } else {
    base = THESIS_MOOD_PALETTES['sandstone-editorial'];
  }

  return mode === 'dark' ? darkenPalette(base) : base;
}

/* ============================================================================
 * 2. AccentClassicalStage — Living Masterwork Frame + 2.5x Curator's Optical Loupe
 * ========================================================================== */

export interface StageHotspot {
  xPct: number;
  yPct: number;
  label: string;
  detail: string;
  source?: string;
}

export interface ClassicalStagePlate {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  licenseFormatted?: string;
  sourceUrl?: string;
  coldOpen?: string;
  plateLabel: string;
  hotspots?: StageHotspot[];
}

export interface AccentClassicalStageProps {
  activePlate: ClassicalStagePlate;
  seriesCoverPlate?: ClassicalStagePlate;
  isPlaying?: boolean;
  atmosphereLive: boolean;
  onToggleAtmosphere: () => void;
  salonExpanded?: boolean;
  onToggleSalon?: () => void;
  onOpenSharePlate?: () => void;
  compactMobile?: boolean;
  className?: string;
}

export function AccentClassicalStage({
  activePlate,
  seriesCoverPlate,
  isPlaying = false,
  atmosphereLive,
  onToggleAtmosphere,
  salonExpanded = false,
  onToggleSalon,
  onOpenSharePlate,
  compactMobile = false,
  className = '',
}: AccentClassicalStageProps) {
  const { isReduced } = useMotionPreference();
  const stageRef = useRef<HTMLDivElement>(null);

  const [plateMode, setPlateMode] = useState<'episode' | 'cover'>('episode');
  const [inspectOpen, setInspectOpen] = useState(false);
  const [pointerHovering, setPointerHovering] = useState(false);
  const [pointerNorm, setPointerNorm] = useState({ x: 0.5, y: 0.45 });
  const [stageSize, setStageSize] = useState({ w: 480, h: 300 });
  const [activeHotspotIdx, setActiveHotspotIdx] = useState<number>(0);

  // Return to the episode painting automatically whenever the user switches episodes
  useEffect(() => {
    setPlateMode('episode');
    setActiveHotspotIdx(0);
  }, [activePlate.src]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r && r.width > 0 && r.height > 0) {
        setStageSize({ w: r.width, h: r.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const displayedPlate =
    plateMode === 'cover' && seriesCoverPlate ? seriesCoverPlate : activePlate;

  const hotspots = useMemo(() => {
    if (displayedPlate.hotspots && displayedPlate.hotspots.length > 0) {
      return displayedPlate.hotspots.slice(0, 3);
    }
    return [];
  }, [displayedPlate.hotspots]);

  const loupeVisible = !compactMobile && (inspectOpen || pointerHovering);
  const loupeDiameter = 160;
  const loupeHalf = loupeDiameter / 2;
  const clampedX = Math.max(
    8,
    Math.min(Math.max(8, stageSize.w - loupeDiameter - 8), pointerNorm.x * stageSize.w - loupeHalf),
  );
  const clampedY = Math.max(
    8,
    Math.min(Math.max(8, stageSize.h - loupeDiameter - 8), pointerNorm.y * stageSize.h - loupeHalf),
  );

  // Gentle depth drift on pointer move (GPU transform only)
  const driftX = !isReduced && atmosphereLive && pointerHovering ? (pointerNorm.x - 0.5) * -10 : 0;
  const driftY = !isReduced && atmosphereLive && pointerHovering ? (pointerNorm.y - 0.5) * -8 : 0;

  return (
    <figure
      className={
        compactMobile
          ? `border border-[var(--a-rule)] bg-[var(--a-surface)]/85 ${className}`
          : `border border-[var(--a-ink)]/20 bg-[var(--a-bg)] shadow-[0_32px_72px_-24px_rgba(17,24,39,0.42)] ${className}`
      }
    >
      {/* Archival Plate Control Strip */}
      {!compactMobile && (
        <div className="px-4 py-2 border-b border-[var(--a-rule)] bg-[var(--a-surface)]/95 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--a-muted)]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-semibold text-[var(--a-ink)] truncate">
              {displayedPlate.plateLabel}
            </span>
            {seriesCoverPlate && seriesCoverPlate.src !== activePlate.src && (
              <button
                type="button"
                onClick={() => setPlateMode((m) => (m === 'episode' ? 'cover' : 'episode'))}
                className="underline underline-offset-4 hover:text-[var(--a-ink)] cursor-pointer shrink-0"
              >
                {plateMode === 'episode' ? 'View series cover' : 'View episode plate'}
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {onToggleSalon && (
              <button
                type="button"
                data-testid="toggle-salon-wall-btn"
                onClick={onToggleSalon}
                className="hidden lg:inline-flex cursor-pointer font-semibold text-[var(--a-ink)] hover:text-[var(--a-accent-text)] underline-offset-4 hover:underline"
                title="Expand masterwork across the full gallery wall"
              >
                {salonExpanded ? '⤡ Overlapping Stage' : '⤢ Full Salon Wall'}
              </button>
            )}
            <button
              type="button"
              onClick={() => setInspectOpen((v) => !v)}
              aria-pressed={inspectOpen}
              className={`cursor-pointer underline-offset-4 hover:text-[var(--a-ink)] ${
                inspectOpen ? 'text-[var(--a-accent-text)] font-semibold underline' : ''
              }`}
            >
              {inspectOpen ? 'Exit Loupe' : 'Inspect 2.5×'}
            </button>
            <button
              type="button"
              onClick={onToggleAtmosphere}
              className="cursor-pointer hover:text-[var(--a-ink)] underline-offset-4 hover:underline"
              title="Toggle background pigment motion"
            >
              {atmosphereLive ? 'Atmosphere: Live' : 'Atmosphere: Still'}
            </button>
            {onOpenSharePlate && (
              <button
                type="button"
                data-testid="stage-share-plate-btn"
                onClick={onOpenSharePlate}
                className="cursor-pointer font-semibold text-[var(--a-accent-text)] hover:underline underline-offset-4"
              >
                ✦ Share Plate
              </button>
            )}
          </div>
        </div>
      )}

      {/* Museum Outer Ebonized Mat + Bevel Frame */}
      <div className={compactMobile ? '' : 'bg-[#13110F] p-2 sm:p-3.5'}>
        <div
          ref={stageRef}
          onPointerEnter={(e) => {
            if (compactMobile || e.pointerType === 'touch') return;
            setPointerHovering(true);
          }}
          onPointerLeave={() => setPointerHovering(false)}
          onPointerMove={(e) => {
            if (compactMobile || e.pointerType === 'touch') return;
            const r = e.currentTarget.getBoundingClientRect();
            if (r.width > 0 && r.height > 0) {
              setPointerNorm({
                x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
                y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
              });
            }
          }}
          className={`relative w-full overflow-hidden bg-[#141210] ${
            compactMobile
              ? 'aspect-[16/8.5]'
              : salonExpanded
              ? 'aspect-[21/9.5]'
              : 'aspect-[16/9]'
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={displayedPlate.src}
              initial={isReduced ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
              animate={
                isReduced
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      scale: isPlaying && atmosphereLive ? 1.02 : 1,
                      x: driftX,
                      y: driftY,
                    }
              }
              exit={isReduced ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: isReduced ? 0.16 : 0.48, ease: EASE_EDITORIAL }}
              className="h-full w-full will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayedPlate.src}
                alt={displayedPlate.alt}
                fetchPriority="high"
                className="h-full w-full object-cover select-none"
              />
            </m.div>
          </AnimatePresence>

          {/* Subtle Inner Linen Gallery Bevel */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#F3EFE9]/25"
          />

          {/* Optical Curator's 2.5x Magnifying Loupe (Strict container clamp — zero overflow) */}
          {loupeVisible && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 w-40 h-40 rounded-full border-2 border-[#FAF8F5]/90 ring-1 ring-black/60 shadow-2xl overflow-hidden"
              style={{
                transform: `translate3d(${clampedX}px, ${clampedY}px, 0)`,
                backgroundImage: `url("${displayedPlate.src}")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '250% 250%',
                backgroundPosition: `${Math.round(pointerNorm.x * 100)}% ${Math.round(
                  pointerNorm.y * 100,
                )}%`,
              }}
            >
              <span className="absolute inset-x-0 top-1/2 h-px bg-[#FAF8F5]/35" />
              <span className="absolute inset-y-0 left-1/2 w-px bg-[#FAF8F5]/35" />
              <span className="absolute bottom-1.5 inset-x-0 text-center font-mono text-xs tracking-wider text-[#FAF8F5] drop-shadow">
                2.5×
              </span>
            </div>
          )}

          {/* Documentary Hotspot Pins (Revealed when Inspecting or Hovered) */}
          {!compactMobile &&
            (inspectOpen || pointerHovering) &&
            hotspots.map((spot, idx) => {
              const isSelected = activeHotspotIdx === idx;
              return (
                <button
                  key={spot.label}
                  type="button"
                  onClick={() => {
                    setActiveHotspotIdx(idx);
                    setPointerNorm({ x: spot.xPct / 100, y: spot.yPct / 100 });
                  }}
                  onMouseEnter={() => {
                    setActiveHotspotIdx(idx);
                    setPointerNorm({ x: spot.xPct / 100, y: spot.yPct / 100 });
                  }}
                  aria-label={`Inspect detail ${idx + 1}: ${spot.label}`}
                  style={{
                    left: `${Math.max(10, Math.min(90, spot.xPct))}%`,
                    top: `${Math.max(14, Math.min(82, spot.yPct))}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-mono text-xs font-semibold grid place-items-center cursor-pointer transition-transform ${
                    isSelected
                      ? 'bg-[var(--a-accent-fill)] text-white scale-110 ring-2 ring-white'
                      : 'bg-[#111827]/85 text-[#FAF8F5] border border-white/60 hover:scale-105'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
        </div>
      </div>

      {/* Archival Detail Annotation Shelf (strictly inside frame when inspecting) */}
      {!compactMobile && inspectOpen && hotspots[activeHotspotIdx] && (
        <div className="px-4 py-2.5 border-t border-[var(--a-rule)] bg-[var(--a-well,var(--a-bg))] text-xs leading-5">
          <span className="font-mono font-semibold text-[var(--a-accent-text)]">
            0{activeHotspotIdx + 1} · {hotspots[activeHotspotIdx].label}:{' '}
          </span>
          <span className="text-[var(--a-ink)]">{hotspots[activeHotspotIdx].detail}</span>
        </div>
      )}

      {/* Museum Wall Placard: Cold-Open Narrative Mat & Provenance Attribution */}
      <figcaption className="px-4 sm:px-5 py-3 border-t border-[var(--a-rule)] bg-[var(--a-bg)]/95 space-y-1.5">
        {!compactMobile && displayedPlate.coldOpen && (
          <p
            className="text-base leading-7 italic text-[var(--a-ink)]"
            style={{ fontFamily: 'var(--font-accent-serif), Georgia, serif' }}
          >
            {displayedPlate.coldOpen}
          </p>
        )}
        <p className={`text-xs leading-5 text-[var(--a-muted)] ${compactMobile ? 'line-clamp-2' : ''}`}>
          {displayedPlate.caption}{' '}
          {displayedPlate.sourceUrl ? (
            <a
              href={displayedPlate.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-[var(--a-ink)]"
            >
              {displayedPlate.licenseFormatted
                ? `${displayedPlate.credit} (${displayedPlate.licenseFormatted})`
                : displayedPlate.credit}
            </a>
          ) : (
            <span>{displayedPlate.credit}</span>
          )}
        </p>
      </figcaption>
    </figure>
  );
}

/* ============================================================================
 * 3. AccentFolioStrip — Hairline Gallery Contact-Sheet Episode Selector
 * ========================================================================== */

export interface FolioStripItem {
  episodeNumber: number;
  shortLabel: string;
  title: string;
  durationLabel: string;
  thumbnailSrc?: string;
  testId: string;
}

export function AccentFolioStrip({
  items,
  activeEpisodeNumber,
  isPlaying = false,
  layoutScope = 'hero',
  variant = 'polyptych',
  onSelectEpisode,
  className = '',
}: {
  items: FolioStripItem[];
  activeEpisodeNumber: number;
  isPlaying?: boolean;
  layoutScope?: string;
  variant?: 'compact' | 'polyptych';
  onSelectEpisode: (epNum: number) => void;
  className?: string;
}) {
  const { isReduced } = useMotionPreference();
  const colsClass =
    items.length <= 4
      ? 'grid-cols-2 sm:grid-cols-4'
      : items.length === 5
      ? 'grid-cols-3 sm:grid-cols-5'
      : 'grid-cols-3 sm:grid-cols-6';

  return (
    <div
      className={`border border-[var(--a-rule)] bg-[var(--a-bg)]/90 backdrop-blur-xs grid ${colsClass} divide-x divide-y sm:divide-y-0 divide-[var(--a-rule)] ${className}`}
    >
      {items.map((item) => {
        const active = activeEpisodeNumber === item.episodeNumber;
        return (
          <button
            key={item.episodeNumber}
            type="button"
            data-testid={item.testId}
            aria-current={active ? 'true' : undefined}
            title={`${item.shortLabel}: ${item.title} (${item.durationLabel})`}
            onClick={() => onSelectEpisode(item.episodeNumber)}
            className={`group relative min-h-[48px] text-left cursor-pointer t-color ${
              variant === 'polyptych'
                ? 'p-2 sm:p-3 flex flex-col justify-between gap-2'
                : 'px-2 py-2 flex items-center gap-2'
            } ${
              active
                ? 'bg-[var(--a-surface)] text-[var(--a-ink)] font-semibold'
                : 'text-[var(--a-muted)] hover:text-[var(--a-ink)] hover:bg-[var(--a-surface)]/65'
            }`}
          >
            {active && (
              <m.span
                layoutId={`folio-active-rule-${layoutScope}`}
                transition={isReduced ? { duration: 0.05 } : SPRING_LAYOUT}
                className="absolute inset-x-0 top-0 h-[3px] bg-[var(--a-accent)]"
              />
            )}
            {item.thumbnailSrc && variant === 'polyptych' && (
              <div className="hidden lg:block w-full aspect-[16/9] overflow-hidden bg-[#141210] border border-[var(--a-rule)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnailSrc}
                  alt=""
                  aria-hidden="true"
                  className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04] ${
                    active ? 'opacity-100' : 'opacity-75 group-hover:opacity-100'
                  }`}
                />
              </div>
            )}
            {item.thumbnailSrc && variant === 'compact' && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.thumbnailSrc}
                alt=""
                aria-hidden="true"
                className={`hidden sm:block w-7 h-5 object-cover shrink-0 border border-[var(--a-rule)] ${
                  active ? 'opacity-100' : 'opacity-70'
                }`}
              />
            )}
            <div className="min-w-0 w-full">
              <div className="flex items-center justify-between gap-1 font-mono text-xs leading-tight">
                <span className={active ? 'text-[var(--a-accent-text)] font-semibold' : ''}>
                  {item.shortLabel}
                </span>
                <span className="text-[var(--a-muted)] font-normal tabular-nums">
                  {item.durationLabel}
                </span>
              </div>
              {variant === 'polyptych' && (
                <span
                  className="hidden lg:block mt-1 font-serif text-[13px] leading-snug text-[var(--a-ink)] line-clamp-2 font-medium"
                  style={{ fontFamily: 'var(--font-accent-display), Georgia, serif' }}
                >
                  {item.title}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================================
 * 4. AccentAudioCadenceBar — Proportional Chapters + Web Audio Reed Visualizer
 * ========================================================================== */

export interface CadenceChapter {
  index: number;
  title: string;
  startTime: number;
  timestampFormatted: string;
  primarySource?: string;
}

const STATIC_REED_WEIGHTS = [
  0.38, 0.56, 0.44, 0.78, 0.64, 0.48, 0.88, 0.62, 0.42, 0.74, 0.84, 0.54, 0.72, 0.92, 0.58, 0.46,
  0.80, 0.68, 0.50, 0.86, 0.70, 0.56, 0.44, 0.76, 0.62, 0.48, 0.66, 0.52,
];

function fmtClock(sec: number): string {
  const s = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${String(m).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
}

export function AccentAudioCadenceBar({
  episodeLabel,
  episodeTitle,
  activeChapterTitle,
  chapters,
  currentTime,
  duration,
  isPlaying,
  analyserNode,
  onSeek,
  onSkipDelta,
  seekSliderTestId = 'hero-seek-slider',
  currentTimeTestId = 'hero-current-time',
  skipBackTestId = 'hero-skip-back-15',
  skipFwdTestId = 'hero-skip-fwd-15',
}: {
  episodeLabel: string;
  episodeTitle: string;
  activeChapterTitle?: string;
  chapters: CadenceChapter[];
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  analyserNode?: AnalyserNode | null;
  onSeek: (sec: number) => void;
  onSkipDelta: (delta: number) => void;
  seekSliderTestId?: string;
  currentTimeTestId?: string;
  skipBackTestId?: string;
  skipFwdTestId?: string;
}) {
  const { isReduced } = useMotionPreference();
  const reedRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [hoveredChapter, setHoveredChapter] = useState<CadenceChapter | null>(null);

  const safeDuration = Math.max(1, duration || 1);
  const ratio = Math.max(0, Math.min(1, (currentTime || 0) / safeDuration));

  // Media-coupled Web Audio frequency animation (updates DOM transforms directly — 0 React re-renders)
  useEffect(() => {
    if (!isPlaying || !analyserNode || isReduced) {
      reedRefs.current.forEach((el, idx) => {
        if (el) {
          el.style.transform = `scaleY(${STATIC_REED_WEIGHTS[idx] ?? 0.5})`;
        }
      });
      return;
    }

    const bins = new Uint8Array(analyserNode.frequencyBinCount || 32);
    let raf = 0;

    const tick = () => {
      analyserNode.getByteFrequencyData(bins);
      for (let i = 0; i < STATIC_REED_WEIGHTS.length; i++) {
        const el = reedRefs.current[i];
        if (!el) continue;
        const bin = bins[i % bins.length] ?? 0;
        const live = Math.max(0.22, Math.min(1, 0.25 + (bin / 255) * 0.78));
        el.style.transform = `scaleY(${live.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying, analyserNode, isReduced]);

  return (
    <div className="space-y-2">
      {/* Unboxed Readout + Skip Controls */}
      <div className="space-y-0.5 text-xs font-mono">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-semibold text-[var(--a-accent-text)] uppercase tracking-wider shrink-0">
            {episodeLabel}
          </span>
          <span className="text-[var(--a-rule)] shrink-0">·</span>
          <span className="text-[var(--a-ink)] font-medium truncate">{episodeTitle}</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-[var(--a-muted)] tabular-nums">
          <span className="truncate min-w-0">
            {hoveredChapter?.title || activeChapterTitle || ''}
          </span>
          <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            data-testid={skipBackTestId}
            onClick={() => onSkipDelta(-15)}
            aria-label="Skip back 15 seconds"
            title="Skip back 15 seconds (←)"
            className="min-h-[44px] min-w-[44px] px-2 inline-flex items-center justify-center hover:text-[var(--a-ink)] cursor-pointer t-press active:scale-95"
          >
            ↺ 15s
          </button>
          <span className="text-[var(--a-ink)]">
            <span data-testid={currentTimeTestId}>{fmtClock(currentTime)}</span>
            {' / '}
            <span>{fmtClock(safeDuration)}</span>
          </span>
          <button
            type="button"
            data-testid={skipFwdTestId}
            onClick={() => onSkipDelta(15)}
            aria-label="Skip forward 15 seconds"
            title="Skip forward 15 seconds (→)"
            className="min-h-[44px] min-w-[44px] px-1.5 inline-flex items-center justify-center hover:text-[var(--a-ink)] cursor-pointer t-press active:scale-95"
          >
            15s ↻
          </button>
          </div>
        </div>
      </div>

      {/* Interactive Harmonic Reed & Chapter Timeline (Single Native Range Overlaid Cleanly) */}
      <div className="relative min-h-[44px] flex flex-col justify-center">
        <div className="relative h-8 w-full flex items-end gap-[3px] pointer-events-none" aria-hidden="true">
          {STATIC_REED_WEIGHTS.map((baseH, idx) => {
            const reedRatio = idx / (STATIC_REED_WEIGHTS.length - 1);
            const passed = reedRatio <= ratio;
            return (
              <span
                key={idx}
                ref={(el) => {
                  reedRefs.current[idx] = el;
                }}
                style={{
                  transform: `scaleY(${baseH})`,
                  transformOrigin: 'bottom center',
                }}
                className={`flex-1 h-7 rounded-xs origin-bottom ${
                  passed ? 'bg-[var(--a-accent)]' : 'bg-[var(--a-ink)]/20'
                }`}
              />
            );
          })}
        </div>

        {/* Chapter Boundary Markers */}
        <div className="relative h-1.5 w-full mt-1 flex items-center pointer-events-none" aria-hidden="true">
          <div className="absolute inset-x-0 h-px bg-[var(--a-rule)]" />
          <div
            className="absolute inset-x-0 h-[2px] origin-left bg-[var(--a-accent)]"
            style={{ transform: `scaleX(${ratio})` }}
          />
          {chapters.slice(0, 10).map((ch) => {
            const leftPct = Math.max(0, Math.min(98, (ch.startTime / safeDuration) * 100));
            return (
              <span
                key={ch.index}
                style={{ left: `${leftPct}%` }}
                className={`absolute w-1.5 h-1.5 rotate-45 -translate-x-1/2 ${
                  currentTime >= ch.startTime ? 'bg-[var(--a-accent)]' : 'bg-[var(--a-muted)]'
                }`}
              />
            );
          })}
        </div>

        {/* Invisible accessible native range overlay for instant drag, keyboard & E2E .fill() seeking */}
        <input
          type="range"
          min={0}
          max={safeDuration}
          value={Math.min(currentTime, safeDuration)}
          onChange={(e) => onSeek(Number(e.target.value))}
          onMouseMove={(e) => {
            if (!chapters.length) return;
            const r = e.currentTarget.getBoundingClientRect();
            const frac = Math.max(0, Math.min(1, (e.clientX - r.left) / Math.max(1, r.width)));
            const sec = frac * safeDuration;
            let matched = chapters[0];
            for (const ch of chapters) {
              if (sec >= ch.startTime) matched = ch;
            }
            setHoveredChapter(matched);
          }}
          onMouseLeave={() => setHoveredChapter(null)}
          data-testid={seekSliderTestId}
          aria-label={`Seek audio for ${episodeLabel}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>
    </div>
  );
}
