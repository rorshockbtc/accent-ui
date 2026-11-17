'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { MotionValue } from 'framer-motion';
import { useMotionPreference } from '@/components/motion/MotionProvider';

/* ============================================================================
 * 1. bloomHandlers + AccentBloomButton / AccentBloomLink
 * ========================================================================== */

/**
 * Sets `--bx` and `--by` origin custom properties on watercolor CTAs so pigment
 * blooms outward from the pointer entry point or center on keyboard focus.
 */
export function bloomHandlers<T extends HTMLElement>() {
  return {
    onPointerEnter: (e: React.PointerEvent<T>) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--bx', `${e.clientX - r.left}px`);
      el.style.setProperty('--by', `${e.clientY - r.top}px`);
    },
    onFocus: (e: React.FocusEvent<T>) => {
      e.currentTarget.style.setProperty('--bx', '50%');
      e.currentTarget.style.setProperty('--by', '50%');
    },
  };
}

export interface AccentBloomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'pink' | 'paper' | 'ink';
}

export function AccentBloomButton({
  variant = 'pink',
  className = '',
  type = 'button',
  children,
  ...rest
}: AccentBloomButtonProps) {
  const handlers = bloomHandlers<HTMLButtonElement>();
  const colors =
    variant === 'paper'
      ? 'bg-[var(--a-bg,#FAF8F5)] text-[var(--a-ink,#111827)] hover:text-white'
      : variant === 'ink'
      ? 'bg-[var(--a-ink,#111827)] text-white'
      : 'bg-[var(--a-accent-fill,#FE299E)] text-white shadow-[0_14px_36px_-14px_rgba(254,41,158,0.68)]';

  return (
    <button
      type={type}
      {...handlers}
      className={`wc-cta inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-7 text-base font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-accent,#FE299E)] ${colors} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ============================================================================
 * 2. AccentGlazeLayer (`mix-blend-mode: multiply` composite plate)
 * ========================================================================== */

export function AccentGlazeLayer({
  src,
  srcSet,
  sizes,
  alt,
  className = '',
}: {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={`wc-glaze select-none pointer-events-none ${className}`}
    />
  );
}

/* ============================================================================
 * 3. AccentShaderBackdrop (Lightweight WebGL1 wet-in-wet dawn sky + plate fallback)
 * ========================================================================== */

export interface SkyPalette {
  top: [number, number, number];
  mid: [number, number, number];
  low: [number, number, number];
  glow: [number, number, number];
  paper: [number, number, number];
}

export const FOLON_DAWN_PALETTE: SkyPalette = {
  top: [0.612, 0.561, 0.816], // #9C8FD0 Folon Violet
  mid: [0.98, 0.839, 0.722], // #FAD6B8 Peach Haze
  low: [0.969, 0.725, 0.788], // #F7B9C9 Dawn Pink
  glow: [0.996, 0.161, 0.62], // #FE299E Sovereign Pink Dawn Core
  paper: [0.98, 0.973, 0.961], // #FAF8F5 Alabaster Paper
};

export const FOLON_TWILIGHT_PALETTE: SkyPalette = {
  top: [0.141, 0.118, 0.271], // #241E45 Deep Twilight
  mid: [0.365, 0.286, 0.529], // #5D4987 Dusk Violet
  low: [0.969, 0.725, 0.788], // #F7B9C9 Horizon Rose
  glow: [0.996, 0.161, 0.62], // #FE299E Core
  paper: [0.141, 0.118, 0.271],
};

const VERT_SRC = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG_SRC = `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform float uProgress;
uniform vec2 uPointer;
uniform vec2 uResolution;
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uLow;
uniform vec3 uGlow;
uniform vec3 uPaper;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 3; i++) { v += a * noise(p); p = r * p * 2.03 + 11.7; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect, uv.y);
  vec2 ptr = vec2(uPointer.x * aspect, uPointer.y);
  float push = exp(-3.4 * distance(p, ptr));

  float t = uTime * 0.018;
  vec2 q = vec2(fbm(p * 1.5 + vec2(0.0, t)), fbm(p * 1.5 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 2.1 + 2.8 * q + vec2(1.7, 9.2) + t), fbm(p * 2.1 + 2.8 * q + vec2(8.3, 2.8) - t));
  float warp = fbm(p * 1.35 + 2.3 * r + push * 0.9);

  float h = uv.y + (warp - 0.5) * 0.34 - push * 0.07;
  float dawn = smoothstep(0.0, 1.0, uProgress);
  vec3 col = mix(uLow, uMid, smoothstep(0.08, 0.5, h));
  col = mix(col, uTop, smoothstep(0.46, 0.98, h));

  float glow = exp(-pow((uv.y - (0.14 + 0.16 * dawn)) * 4.0, 2.0)) * (0.34 + 0.42 * dawn);
  col = mix(col, uGlow, clamp(glow * (0.55 + 0.45 * warp) + push * 0.22, 0.0, 0.82));

  float bands = fract(h * 3.1 + warp * 0.78);
  float edge = smoothstep(0.0, 0.035, bands) * (1.0 - smoothstep(0.035, 0.09, bands));
  col *= 1.0 - edge * 0.07;

  float coverage = smoothstep(0.08, 0.92, warp * 0.72 + (1.0 - uv.y) * 0.42 + 0.18);
  col = mix(uPaper, col, 0.62 + 0.34 * coverage);
  float grain = noise(uv * uResolution * 0.45);
  col *= 0.978 + 0.022 * grain;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function AccentShaderBackdrop({
  palette = FOLON_DAWN_PALETTE,
  fallbackSrc,
  fallbackAlt = '',
  progress = 0.28,
  paused = false,
  className = '',
}: {
  palette?: SkyPalette;
  fallbackSrc?: string;
  fallbackAlt?: string;
  progress?: number | MotionValue<number>;
  paused?: boolean;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isReduced } = useMotionPreference();
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG_SRC);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setWebglFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setWebglFailed(true);
      return;
    }

    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uProgress = gl.getUniformLocation(prog, 'uProgress');
    const uPointer = gl.getUniformLocation(prog, 'uPointer');
    const uResolution = gl.getUniformLocation(prog, 'uResolution');
    gl.uniform3fv(gl.getUniformLocation(prog, 'uTop'), palette.top);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uMid'), palette.mid);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uLow'), palette.low);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uGlow'), palette.glow);
    gl.uniform3fv(gl.getUniformLocation(prog, 'uPaper'), palette.paper);

    let currentProgress = typeof progress === 'number' ? progress : progress.get();
    const unsubProgress =
      typeof progress === 'object' && 'on' in progress
        ? progress.on('change', (v) => {
            currentProgress = v;
          })
        : undefined;

    let ptrX = 0.5;
    let ptrY = 0.45;
    let inView = true;
    let raf = 0;
    const startMs = performance.now();

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const drawFrame = (sec: number) => {
      gl.uniform1f(uTime, sec);
      gl.uniform1f(uProgress, currentProgress);
      gl.uniform2f(uPointer, ptrX, ptrY);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const tick = () => {
      raf = 0;
      if (!inView || paused) return;
      drawFrame((performance.now() - startMs) / 1000);
      if (!isReduced && !paused) {
        raf = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !raf && !paused && !isReduced) tick();
      },
      { threshold: 0.01 }
    );
    io.observe(host);

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        ptrX = (e.clientX - r.left) / r.width;
        ptrY = 1 - (e.clientY - r.top) / r.height;
        if (paused || isReduced) {
          drawFrame(0);
        }
      }
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    drawFrame(0);
    if (!isReduced && !paused) tick();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      unsubProgress?.();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [isReduced, paused, palette, progress]);

  return (
    <div ref={hostRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {webglFailed && fallbackSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={fallbackSrc} alt={fallbackAlt} className="h-full w-full object-cover opacity-85" />
      ) : (
        <canvas ref={canvasRef} className="h-full w-full block" />
      )}
    </div>
  );
}

/* ============================================================================
 * 4. AccentWeatherBand — Progressive-Disclosure Status Strip (after WeatherBand)
 * ========================================================================== */

export interface WeatherCheckItem {
  id: string;
  label: string;
  status: 'pass' | 'warn';
  detail?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function AccentWeatherBand({
  checks,
  className = '',
}: {
  checks: WeatherCheckItem[];
  className?: string;
}) {
  const warnings = checks.filter((c) => c.status === 'warn');
  const passes = checks.filter((c) => c.status === 'pass');

  const skyState =
    checks.length === 0
      ? 'Blank page'
      : warnings.length === 0
      ? 'Clear skies'
      : warnings.length === 1
      ? 'Clearing'
      : 'Overcast';

  const skyTint =
    warnings.length === 0
      ? 'border-[var(--a-sky,#0284C7)]/40 bg-[#A9D3EA]/25 text-[#02212F]'
      : 'border-[var(--a-accent,#FE299E)]/35 bg-[#F7B9C9]/20 text-[var(--a-ink,#111827)]';

  return (
    <section
      aria-label="Preflight readiness"
      className={`border-y border-[var(--a-rule)] px-4 py-3.5 ${skyTint} ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-[14px]">
          <span className="font-mono text-[13px] font-semibold uppercase tracking-wider">{skyState}</span>
          <span className="text-[var(--a-muted)]">·</span>
          <span>
            {warnings.length === 0
              ? 'All checks clear and ready.'
              : `${warnings.length} item${warnings.length === 1 ? '' : 's'} to tune before sending.`}
          </span>
        </div>

        {passes.length > 0 && (
          <details className="text-[13px] text-[var(--a-muted)]">
            <summary className="inline-flex min-h-[44px] items-center cursor-pointer font-mono hover:text-[var(--a-ink)]">
              {passes.length} clear ✓
            </summary>
            <ul className="mt-1 space-y-1 pl-3 border-l border-[var(--a-rule)]">
              {passes.map((p) => (
                <li key={p.id}>{p.label}</li>
              ))}
            </ul>
          </details>
        )}
      </div>

      {warnings.length > 0 && (
        <ul className="mt-2.5 divide-y divide-[var(--a-rule)] border-t border-[var(--a-rule)]">
          {warnings.map((w) => (
            <li key={w.id} className="py-2.5 flex flex-wrap items-center justify-between gap-3 text-[14px]">
              <div>
                <span className="font-medium text-[var(--a-ink)]">{w.label}</span>
                {w.detail && <span className="ml-2 text-[var(--a-muted)]">{w.detail}</span>}
              </div>
              {w.actionLabel && w.onAction && (
                <button
                  type="button"
                  onClick={w.onAction}
                  className="min-h-[44px] px-3 font-mono text-[13px] font-semibold text-[var(--a-accent-text,#B81468)] hover:underline cursor-pointer"
                >
                  {w.actionLabel}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export * from './classical-stage';
export * from './synthesis-atlas';
export * from './folio-reader';
export * from './exhibition-template';
