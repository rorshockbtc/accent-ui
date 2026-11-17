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
 * 1b. Living Masterwork Atmospheric Canvas Overlay (`snow` / `embers` / `sunbeams` / `signal`)
 * ========================================================================== */

export type MasterworkSceneEffect = 'snow' | 'embers' | 'sunbeams' | 'signal';

function resolveSceneEffect(plate: ClassicalStagePlate): MasterworkSceneEffect {
  if (plate.sceneEffect) return plate.sceneEffect;
  const hay = `${plate.src} ${plate.alt} ${plate.plateLabel} ${plate.caption}`.toLowerCase();
  if (/petrograd|bolshevik|1917|winter|duma|russia|1905|savage/.test(hay)) {
    return 'snow';
  }
  if (/destruction|desolation|praetorian|collapse|fire|burn|auction/.test(hay)) {
    return 'embers';
  }
  if (/shannon|mouse|feynman|hamming|workbench|interface|epistemic|channel|signal/.test(hay)) {
    return 'signal';
  }
  return 'sunbeams';
}

function MasterworkAtmosphereCanvas({
  effect,
  active,
  pointerX,
}: {
  effect: MasterworkSceneEffect;
  active: boolean;
  pointerX: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef(pointerX);
  pointerRef.current = pointerX;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = Math.max(320, parent?.clientWidth || 640);
      const h = Math.max(180, parent?.clientHeight || 360);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    resize();

    // Deterministic seeded particles distributed immediately across the entire canvas
    const seed = (i: number, mult: number) => {
      const x = Math.sin(i * 12.9898 + mult * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    const count =
      effect === 'snow' ? 68 : effect === 'embers' ? 50 : effect === 'signal' ? 34 : 42;
    const particles = Array.from({ length: count }, (_, i) => ({
      xFrac: seed(i + 1, 1.3),
      yFrac: seed(i + 1, 2.7),
      radius:
        effect === 'snow'
          ? 1.4 + seed(i + 1, 4.1) * 2.8
          : effect === 'embers'
          ? 1.3 + seed(i + 1, 5.2) * 2.6
          : 1.5 + seed(i + 1, 6.4) * 2.4,
      speed: 0.45 + seed(i + 1, 3.9) * 0.95,
      drift: (seed(i + 1, 7.1) - 0.5) * 0.7,
      phase: seed(i + 1, 9.2) * Math.PI * 2,
      alpha:
        effect === 'snow'
          ? 0.42 + seed(i + 1, 8.3) * 0.48
          : effect === 'embers'
          ? 0.55 + seed(i + 1, 8.3) * 0.42
          : 0.25 + seed(i + 1, 8.3) * 0.45,
    }));

    let raf = 0;
    const start = performance.now();

    const drawFrame = (now: number) => {
      resize();
      const w = canvas.width;
      const h = canvas.height;
      const t = (now - start) / 1000;
      const parallaxShift = (pointerRef.current - 0.5) * -18;
      ctx.clearRect(0, 0, w, h);

      // Edge museum vignette so light highlights contrast vividly against any painting
      const vig = ctx.createRadialGradient(w * 0.52, h * 0.45, w * 0.18, w * 0.5, h * 0.5, w * 0.78);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(12,10,9,0.34)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      if (effect === 'sunbeams') {
        ctx.save();
        for (let b = 0; b < 3; b++) {
          const swing = Math.sin(t * 0.35 + b * 1.9) * (w * 0.035) + parallaxShift;
          const xTop = w * (0.18 + b * 0.27) + swing;
          const beamW = w * 0.18;
          const grad = ctx.createLinearGradient(xTop, 0, xTop + w * 0.22, h);
          grad.addColorStop(0, 'rgba(255, 240, 200, 0.22)');
          grad.addColorStop(0.55, 'rgba(255, 234, 185, 0.09)');
          grad.addColorStop(1, 'rgba(255, 234, 185, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.moveTo(xTop, 0);
          ctx.lineTo(xTop + beamW, 0);
          ctx.lineTo(xTop + beamW + w * 0.26, h);
          ctx.lineTo(xTop + w * 0.22, h);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      } else if (effect === 'embers') {
        const horizon = ctx.createLinearGradient(0, h * 0.55, 0, h);
        const pulse = 0.16 + Math.sin(t * 1.4) * 0.05;
        horizon.addColorStop(0, 'rgba(254, 120, 40, 0)');
        horizon.addColorStop(1, `rgba(254, 110, 32, ${pulse.toFixed(3)})`);
        ctx.fillStyle = horizon;
        ctx.fillRect(0, h * 0.55, w, h * 0.45);
      } else if (effect === 'signal') {
        ctx.save();
        for (let line = 0; line < 2; line++) {
          ctx.beginPath();
          ctx.strokeStyle =
            line === 0 ? 'rgba(56, 189, 248, 0.32)' : 'rgba(254, 41, 158, 0.25)';
          ctx.lineWidth = 1.6;
          for (let px = 0; px <= w; px += 10) {
            const waveY =
              h * (0.35 + line * 0.3) +
              Math.sin(px * 0.014 + t * (1.1 + line * 0.4) + line * 1.7) * 18 +
              Math.cos(px * 0.006 - t * 0.6) * 8;
            if (px === 0) ctx.moveTo(px, waveY);
            else ctx.lineTo(px, waveY);
          }
          ctx.stroke();
        }
        ctx.restore();
      }

      for (const p of particles) {
        let px = ((p.xFrac + (effect === 'snow' ? t * 0.018 * p.speed : 0) + Math.sin(t * 0.8 + p.phase) * 0.025) % 1) * w + parallaxShift * 0.5;
        if (px < 0) px += w;
        if (px > w) px -= w;

        let pyFrac: number;
        if (effect === 'embers') {
          pyFrac = (p.yFrac - t * 0.055 * p.speed) % 1;
          if (pyFrac < 0) pyFrac += 1;
        } else if (effect === 'snow') {
          pyFrac = (p.yFrac + t * 0.068 * p.speed) % 1;
        } else {
          pyFrac = (p.yFrac + Math.sin(t * 0.45 + p.phase) * 0.03) % 1;
          if (pyFrac < 0) pyFrac += 1;
        }
        const py = pyFrac * h;
        const sizeScale = Math.max(0.55, Math.min(1, w / 720));
        const r = p.radius * sizeScale;

        if (effect === 'snow') {
          const flake = ctx.createRadialGradient(px, py, 0, px, py, r * 2.1);
          flake.addColorStop(0, `rgba(255, 253, 250, ${(p.alpha * 0.92).toFixed(2)})`);
          flake.addColorStop(0.5, `rgba(248, 250, 252, ${(p.alpha * 0.42).toFixed(2)})`);
          flake.addColorStop(1, 'rgba(248, 250, 252, 0)');
          ctx.fillStyle = flake;
          ctx.beginPath();
          ctx.arc(px, py, r * 2.1, 0, Math.PI * 2);
          ctx.fill();
        } else if (effect === 'embers') {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 3.0);
          glow.addColorStop(0, `rgba(255, 214, 102, ${p.alpha.toFixed(2)})`);
          glow.addColorStop(0.45, `rgba(249, 115, 22, ${(p.alpha * 0.62).toFixed(2)})`);
          glow.addColorStop(1, 'rgba(249, 115, 22, 0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, r * 3.0, 0, Math.PI * 2);
          ctx.fill();
        } else if (effect === 'signal') {
          const dot = ctx.createRadialGradient(px, py, 0, px, py, r * 2.2);
          const col = p.phase > 3.14 ? '125, 211, 252' : '254, 150, 200';
          dot.addColorStop(0, `rgba(${col}, ${(p.alpha * 0.9).toFixed(2)})`);
          dot.addColorStop(1, `rgba(${col}, 0)`);
          ctx.fillStyle = dot;
          ctx.beginPath();
          ctx.arc(px, py, r * 2.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const mote = ctx.createRadialGradient(px, py, 0, px, py, r * 1.9);
          mote.addColorStop(0, `rgba(255, 240, 192, ${(p.alpha * 0.55).toFixed(2)})`);
          mote.addColorStop(0.55, `rgba(255, 232, 168, ${(p.alpha * 0.22).toFixed(2)})`);
          mote.addColorStop(1, 'rgba(255, 232, 168, 0)');
          ctx.fillStyle = mote;
          ctx.beginPath();
          ctx.arc(px, py, r * 1.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (active) {
        raf = requestAnimationFrame(drawFrame);
      }
    };

    drawFrame(start);
    return () => cancelAnimationFrame(raf);
  }, [effect, active]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full z-10"
    />
  );
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
  sceneEffect?: MasterworkSceneEffect;
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

  const sceneEffect = useMemo(() => resolveSceneEffect(displayedPlate), [displayedPlate]);

  const hotspots = useMemo(() => {
    if (displayedPlate.hotspots && displayedPlate.hotspots.length > 0) {
      return displayedPlate.hotspots.slice(0, 3);
    }
    return [];
  }, [displayedPlate.hotspots]);

  const loupeVisible = !compactMobile && (inspectOpen || pointerHovering);
  const loupeDiameter = 152;
  const loupeHalf = loupeDiameter / 2;
  const clampedX = Math.max(
    8,
    Math.min(Math.max(8, stageSize.w - loupeDiameter - 8), pointerNorm.x * stageSize.w - loupeHalf),
  );
  const clampedY = Math.max(
    8,
    Math.min(Math.max(8, stageSize.h - loupeDiameter - 8), pointerNorm.y * stageSize.h - loupeHalf),
  );

  // Subtle 3D pointer drift (GPU transform only)
  const driftX = !isReduced && atmosphereLive && pointerHovering ? (pointerNorm.x - 0.5) * -14 : 0;
  const driftY = !isReduced && atmosphereLive && pointerHovering ? (pointerNorm.y - 0.5) * -10 : 0;

  return (
    <figure className={`w-full min-w-0 ${className}`}>
      {/* Seamless Museum Canvas Frame (Zero Spreadsheet Top Header Bar!) */}
      <div
        className={`relative rounded-2xl overflow-hidden bg-[#141210] ring-1 ring-black/15 ${
          compactMobile
            ? 'shadow-[0_18px_42px_-16px_rgba(17,24,39,0.34)]'
            : 'shadow-[0_28px_70px_-20px_rgba(17,24,39,0.42)]'
        }`}
      >
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
              ? 'aspect-[16/9]'
              : salonExpanded
              ? 'aspect-[21/9.5]'
              : 'aspect-[16/10]'
          }`}
        >
          {/* Floating Minimal Curator Header Strip (`inset-x` bounded — zero overflow at 390px!) */}
          <div className="pointer-events-none absolute inset-x-2.5 sm:inset-x-3 top-2.5 z-20 flex items-center justify-between gap-2">
            <span className="min-w-0 truncate rounded-full bg-black/50 backdrop-blur-md px-3 py-1 font-sans text-xs font-medium text-white/95 border border-white/15">
              {displayedPlate.plateLabel}
            </span>

            <div className="pointer-events-auto shrink-0 flex items-center gap-1 rounded-full bg-black/55 backdrop-blur-md px-2 py-0.5 text-xs font-sans text-white/90 border border-white/15">
              {!compactMobile && (
                <button
                  type="button"
                  onClick={() => setInspectOpen((v) => !v)}
                  aria-pressed={inspectOpen}
                  className={`min-h-[34px] px-2 rounded-full cursor-pointer transition-colors ${
                    inspectOpen ? 'bg-[#FE299E] text-white font-semibold' : 'hover:text-white'
                  }`}
                >
                  {inspectOpen ? 'Exit Loupe' : '2.5× Loupe'}
                </button>
              )}
              {!compactMobile && onToggleSalon && (
                <button
                  type="button"
                  data-testid="toggle-salon-wall-btn"
                  onClick={onToggleSalon}
                  className="hidden lg:inline-flex items-center min-h-[34px] px-2 rounded-full cursor-pointer hover:text-white font-medium"
                  title="Expand masterwork across the full gallery width"
                >
                  {salonExpanded ? '⤡ Split View' : '⤢ Expand'}
                </button>
              )}
              <button
                type="button"
                onClick={onToggleAtmosphere}
                className="min-h-[34px] px-2 rounded-full cursor-pointer hover:text-white font-medium whitespace-nowrap"
                title="Toggle animated painting & sky motion"
              >
                {atmosphereLive ? 'Motion: Live' : 'Motion: Off'}
              </button>
              {!compactMobile && onOpenSharePlate && (
                <button
                  type="button"
                  data-testid="stage-share-plate-btn"
                  onClick={onOpenSharePlate}
                  className="min-h-[34px] px-2 rounded-full cursor-pointer font-semibold text-[#F4B4CF] hover:text-white"
                >
                  ✦ Share
                </button>
              )}
            </div>
          </div>

          {/* Plane A: Painting with Smooth Transition, Ken Burns Cinema Drift & 3D Parallax */}
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={displayedPlate.src}
              initial={isReduced ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
              animate={
                isReduced
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      scale: isPlaying && atmosphereLive ? 1.03 : 1,
                      x: driftX,
                      y: driftY,
                    }
              }
              exit={isReduced ? { opacity: 0 } : { opacity: 0 }}
              transition={{ duration: isReduced ? 0.16 : 0.55, ease: EASE_EDITORIAL }}
              className="h-full w-full will-change-transform"
            >
              <div
                className={`h-full w-full ${
                  isReduced
                    ? ''
                    : atmosphereLive
                    ? 'accent-ken-burns'
                    : 'accent-ken-burns accent-ken-burns-paused'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayedPlate.src}
                  alt={displayedPlate.alt}
                  fetchPriority="high"
                  className="h-full w-full object-cover select-none"
                />
              </div>
            </m.div>
          </AnimatePresence>

          {/* Plane B: Domain-Specific 60fps Particle & Light-Shaft Canvas Overlay */}
          <MasterworkAtmosphereCanvas
            effect={sceneEffect}
            active={Boolean(atmosphereLive && !isReduced)}
            pointerX={pointerNorm.x}
          />

          {/* Interactive Warm Spotlight Following Pointer */}
          {!compactMobile && pointerHovering && atmosphereLive && !isReduced && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
              style={{
                background: `radial-gradient(280px circle at ${Math.round(
                  pointerNorm.x * 100,
                )}% ${Math.round(pointerNorm.y * 100)}%, rgba(255,244,218,0.18), transparent 72%)`,
              }}
            />
          )}

          {/* Optical Curator's 2.5x Magnifying Loupe (Strict container clamp — zero overflow) */}
          {loupeVisible && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 z-20 w-38 h-38 rounded-full border-2 border-[#FAF8F5]/95 ring-1 ring-black/60 shadow-2xl overflow-hidden"
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
              <span className="absolute bottom-1.5 inset-x-0 text-center font-sans text-xs font-semibold tracking-wider text-[#FAF8F5] drop-shadow">
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
                  className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-sans tabular-nums text-xs font-semibold grid place-items-center cursor-pointer transition-transform ${
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

        {/* Archival Detail Annotation Shelf (strictly inside bottom of frame when inspecting) */}
        {!compactMobile && inspectOpen && hotspots[activeHotspotIdx] && (
          <div className="px-4 py-2.5 border-t border-white/10 bg-[#181512] text-xs leading-5 text-[#F3EFE9]">
            <span className="font-sans font-semibold text-[#EE8AB4]">
              0{activeHotspotIdx + 1} · {hotspots[activeHotspotIdx].label}:{' '}
            </span>
            <span>{hotspots[activeHotspotIdx].detail}</span>
          </div>
        )}
      </div>

      {/* Unobstructed Museum Wall Placard Below Canvas — Zero Overlapping Box! */}
      <figcaption className="mt-3 px-0.5 space-y-1.5">
        {!compactMobile && displayedPlate.coldOpen && (
          <p
            className="font-serif italic text-base sm:text-[17px] leading-relaxed text-[var(--a-ink)] text-pretty"
            style={{ fontFamily: 'var(--font-accent-serif, var(--font-serif), Georgia, serif)' }}
          >
            {displayedPlate.coldOpen}
          </p>
        )}
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className={`font-sans text-xs leading-5 text-[var(--a-muted)] ${compactMobile ? 'line-clamp-2' : ''}`}>
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
          {seriesCoverPlate && seriesCoverPlate.src !== activePlate.src && (
            <button
              type="button"
              onClick={() => setPlateMode((m) => (m === 'episode' ? 'cover' : 'episode'))}
              className="font-sans text-xs font-medium text-[var(--a-accent-text)] underline underline-offset-4 hover:opacity-80 cursor-pointer shrink-0"
            >
              {plateMode === 'episode' ? 'View series cover' : 'View episode plate'}
            </button>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

/* ============================================================================
 * 3. AccentFolioStrip — Illustrated Visual Contact-Sheet Episode Selector
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
      ? 'grid-cols-2 sm:grid-cols-5'
      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6';

  return (
    <div className={`grid ${colsClass} gap-2.5 sm:gap-3 ${className}`}>
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
            className={`group relative rounded-xl border text-left cursor-pointer transition-colors overflow-hidden ${
              variant === 'polyptych'
                ? 'p-2 flex flex-col justify-between gap-2'
                : 'px-2.5 py-2 flex items-center gap-2.5 min-h-[48px]'
            } ${
              active
                ? 'border-[var(--a-accent)] bg-[var(--a-surface)] text-[var(--a-ink)] shadow-sm'
                : 'border-[var(--a-rule)] bg-[var(--a-bg)]/75 text-[var(--a-muted)] hover:text-[var(--a-ink)] hover:border-[var(--a-ink)]/35 hover:bg-[var(--a-surface)]/80'
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
              <div className="w-full aspect-[16/9] overflow-hidden rounded-lg bg-[#141210]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.thumbnailSrc}
                  alt=""
                  aria-hidden="true"
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
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
                className={`w-9 h-6 object-cover rounded shrink-0 ${
                  active ? 'opacity-100' : 'opacity-75'
                }`}
              />
            )}
            <div className="min-w-0 w-full">
              <div className="flex items-center justify-between gap-1 font-sans tabular-nums text-xs leading-tight">
                <span className={active ? 'text-[var(--a-accent-text)] font-semibold' : 'font-medium'}>
                  {item.shortLabel}
                </span>
                <span className="text-[var(--a-muted)] font-normal">
                  {item.durationLabel}
                </span>
              </div>
              {variant === 'polyptych' && (
                <span
                  className="mt-1 block font-serif text-[13px] leading-snug text-[var(--a-ink)] line-clamp-2 font-medium"
                  style={{ fontFamily: 'var(--font-accent-display, var(--font-serif), Georgia, serif)' }}
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
 * 4. AccentAudioCadenceBar — Breathing Waveform + Web Audio Reactive Visualizer
 * ========================================================================== */

export interface CadenceChapter {
  title: string;
  startTime: number;
  index: number;
}

const STATIC_REED_WEIGHTS = [
  0.34, 0.56, 0.72, 0.45, 0.84, 0.62, 0.38, 0.90, 0.54, 0.68,
  0.42, 0.78, 0.96, 0.50, 0.64, 0.86, 0.40, 0.74, 0.58, 0.88,
  0.46, 0.66, 0.80, 0.42, 0.60, 0.76, 0.48, 0.70, 0.52, 0.36,
];

function fmtClock(sec: number): string {
  const s = Math.max(0, Math.floor(sec || 0));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function AccentAudioCadenceBar({
  episodeLabel,
  episodeTitle,
  activeChapterTitle,
  chapters,
  currentTime,
  duration,
  isPlaying,
  atmosphereLive = true,
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
  atmosphereLive?: boolean;
  analyserNode?: AnalyserNode | null;
  onSeek: (sec: number) => void;
  onSkipDelta: (delta: number) => void;
  seekSliderTestId?: string;
  currentTimeTestId?: string;
  skipBackTestId?: string;
  skipFwdTestId?: string;
}) {
  const { isReduced } = useMotionPreference();
  const reedRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hoveredChapter, setHoveredChapter] = useState<CadenceChapter | null>(null);

  const safeDuration = Math.max(1, duration || 1);
  const ratio = Math.min(1, Math.max(0, (currentTime || 0) / safeDuration));

  // Direct DOM `scaleY` animation loop synced to live audio frequencies — 0 React re-renders
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
    <div className="space-y-1.5">
      {/* Crisp Sans Typography Readout + Skip Controls */}
      <div className="space-y-0.5 text-xs font-sans">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="font-semibold text-[var(--a-accent-text)] uppercase tracking-[0.1em] shrink-0">
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
              className="min-h-[44px] min-w-[44px] px-1.5 inline-flex items-center justify-center rounded-full hover:bg-[var(--a-ink)]/8 hover:text-[var(--a-ink)] cursor-pointer t-press active:scale-95"
            >
              ↺ 15s
            </button>
            <span className="text-[var(--a-ink)] font-medium">
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
              className="min-h-[44px] min-w-[44px] px-1.5 inline-flex items-center justify-center rounded-full hover:bg-[var(--a-ink)]/8 hover:text-[var(--a-ink)] cursor-pointer t-press active:scale-95"
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
            const useIdleBreathe = !isPlaying && atmosphereLive && !isReduced;
            const breatheMin = Math.max(0.22, baseH * 0.72).toFixed(2);
            const breatheMax = Math.min(1, baseH * 1.18).toFixed(2);
            const breatheDur = `${(2.1 + (idx % 5) * 0.35).toFixed(2)}s`;
            const breatheDelay = `${((idx * 0.14) % 1.8).toFixed(2)}s`;

            return (
              <span
                key={idx}
                ref={(el) => {
                  reedRefs.current[idx] = el;
                }}
                style={
                  {
                    transform: `scaleY(${baseH})`,
                    transformOrigin: 'bottom center',
                    '--reed-min': breatheMin,
                    '--reed-max': breatheMax,
                    '--reed-dur': breatheDur,
                    '--reed-delay': breatheDelay,
                  } as React.CSSProperties
                }
                className={`flex-1 h-7 rounded-xs origin-bottom ${
                  useIdleBreathe ? 'accent-wave-breathe' : ''
                } ${passed ? 'bg-[var(--a-accent)]' : 'bg-[var(--a-ink)]/20'}`}
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
