'use client';

import React from 'react';
import { Check, X } from 'lucide-react';

/**
 * Shared building blocks for Accént demos.
 * Rule of thumb: every demo is a <Stage>. Pair examples with <DoDont>.
 * Use <DimH>/<DimV>/<HitBox> to draw measurement "redlines" over real components.
 */

export function Stage({
  label,
  children,
  controls,
  caption,
  surface = 'light',
}: {
  label: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
  caption?: React.ReactNode;
  /** light = Alabaster canvas, dark = Ink canvas, none = no padding/background (child paints itself) */
  surface?: 'light' | 'dark' | 'none';
}) {
  const body =
    surface === 'dark'
      ? 'bg-[#111827] text-[#F3EFE9] p-4 sm:p-6'
      : surface === 'none'
        ? ''
        : 'bg-[#F3EFE9] text-[#111827] p-4 sm:p-6';
  return (
    <figure className="not-prose my-8 rounded-lg border border-[var(--a-rule)] overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 border-b border-[var(--a-rule)] bg-[var(--a-bg)]/60">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--a-muted)]">{label}</span>
        {controls && <div className="flex flex-wrap items-center gap-1">{controls}</div>}
      </div>
      <div className={body}>{children}</div>
      {caption && (
        <figcaption className="px-4 py-3 text-sm leading-6 text-[var(--a-muted)] border-t border-[var(--a-rule)] bg-[var(--a-bg)]/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Seg<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-md border border-[var(--a-rule)] p-0.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={`min-h-[32px] px-3 text-xs font-medium rounded ${
            value === o.id ? 'bg-[var(--a-ink)] text-[var(--a-bg)]' : 'text-[var(--a-ink)] hover:bg-[var(--a-rule)]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** A real Do / Don't pair. Both sides are live components; reasons are mandatory. */
export function DoDont({
  label = 'Do and don\u2019t',
  doExample,
  dontExample,
  doWhy,
  dontWhy,
  surface = 'light',
}: {
  label?: string;
  doExample: React.ReactNode;
  dontExample: React.ReactNode;
  doWhy: React.ReactNode;
  dontWhy: React.ReactNode;
  surface?: 'light' | 'dark';
}) {
  const canvas = surface === 'dark' ? 'bg-[#111827] text-[#F3EFE9]' : 'bg-[#F3EFE9] text-[#111827]';
  return (
    <figure className="not-prose my-8" aria-label={label}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border-2 border-[#166534]/60 overflow-hidden">
          <div className={`p-4 sm:p-6 min-h-[120px] flex items-center justify-center ${canvas}`}>{doExample}</div>
          <p className="flex items-start gap-2 px-4 py-3 text-sm leading-6 bg-[var(--a-surface)] text-[var(--a-ink)] border-t border-[var(--a-rule)]">
            <Check className="h-4 w-4 mt-1 shrink-0 text-[#166534]" aria-hidden />
            <span><strong>Do.</strong> {doWhy}</span>
          </p>
        </div>
        <div className="rounded-lg border-2 border-[#9F1239]/60 overflow-hidden">
          <div className={`p-4 sm:p-6 min-h-[120px] flex items-center justify-center ${canvas}`}>{dontExample}</div>
          <p className="flex items-start gap-2 px-4 py-3 text-sm leading-6 bg-[var(--a-surface)] text-[var(--a-ink)] border-t border-[var(--a-rule)]">
            <X className="h-4 w-4 mt-1 shrink-0 text-[#9F1239]" aria-hidden />
            <span><strong>Don&apos;t.</strong> {dontWhy}</span>
          </p>
        </div>
      </div>
    </figure>
  );
}

/** Horizontal dimension line. `width` is CSS (number = px). Label sits centred above. */
export function DimH({ width, label }: { width: number | string; label: string }) {
  return (
    <span className="relative inline-block h-5 mt-3 align-middle" style={{ width }} aria-hidden>
      <span className="absolute left-0 right-0 top-1/2 h-px bg-[#D44983]" />
      <span className="absolute left-0 top-1 bottom-1 w-px bg-[#D44983]" />
      <span className="absolute right-0 top-1 bottom-1 w-px bg-[#D44983]" />
      <span className="absolute left-1/2 -translate-x-1/2 -top-3.5 whitespace-nowrap text-xs font-mono text-[#A3285C] bg-[#F3EFE9] px-1 leading-4">
        {label}
      </span>
    </span>
  );
}

/** Vertical dimension line. */
export function DimV({ height, label }: { height: number | string; label: string }) {
  return (
    <span className="relative inline-block w-5 align-middle" style={{ height }} aria-hidden>
      <span className="absolute top-0 bottom-0 left-1/2 w-px bg-[#D44983]" />
      <span className="absolute top-0 left-1 right-1 h-px bg-[#D44983]" />
      <span className="absolute bottom-0 left-1 right-1 h-px bg-[#D44983]" />
      <span className="absolute top-1/2 left-5 -translate-y-1/2 whitespace-nowrap text-xs font-mono text-[#A3285C] bg-[#F3EFE9] px-1 leading-4">
        {label}
      </span>
    </span>
  );
}

/** Dashed minimum-hit-area box (default 44x44) drawn around its child. */
export function HitBox({
  w = 44,
  h = 44,
  label,
  children,
}: {
  w?: number;
  h?: number;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <span className="relative inline-grid place-items-center border border-dashed border-[#D44983] rounded-sm" style={{ width: w, minHeight: h }}>
      {children}
      {label && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-mono text-[#A3285C] whitespace-nowrap" aria-hidden>
          {label}
        </span>
      )}
    </span>
  );
}

/** Small annotation chip, e.g. the numbered markers for focus order. */
export function Tag({ children, tone = 'ink' }: { children: React.ReactNode; tone?: 'ink' | 'pink' | 'good' | 'bad' }) {
  const t = {
    ink: 'bg-[#111827] text-white',
    pink: 'bg-[#D44983] text-white',
    good: 'bg-[#166534] text-white',
    bad: 'bg-[#9F1239] text-white',
  }[tone];
  return <span className={`inline-flex items-center rounded px-1.5 text-xs font-mono leading-5 ${t}`}>{children}</span>;
}

/** Numbered focus-order marker positioned absolutely inside a relative parent. */
export function FocusMark({ n, className = '' }: { n: number; className?: string }) {
  return (
    <span aria-hidden className={`absolute grid place-items-center h-5 w-5 rounded-full bg-[#D44983] text-white text-xs font-mono ${className}`}>
      {n}
    </span>
  );
}
