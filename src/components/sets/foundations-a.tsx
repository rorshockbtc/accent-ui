'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, X, Download, Search, Settings, Trash2, Share2, Bell, Mail, Star, Home, User, Sparkles, Heart, Folder } from 'lucide-react';
import { Stage, Seg, DoDont, DimH, DimV, HitBox, Tag } from '../primitives';

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const INK = '#111827';
const MUTED = '#4B5563';
const PINK = '#D44983';
const PINK_TEXT = '#A3285C';
const STONE = '#E8E2D5';
const CARD = '#F3EFE9';
const ALABASTER = '#FAF8F5';
const GOOD = '#166534';
const BAD = '#9F1239';

function hexToRgb(h: string): [number, number, number] {
  const n = parseInt(h.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function lum(h: string): number {
  const [r, g, b] = hexToRgb(h).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a: string, b: string): number {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  const c = ca.map((v, i) => Math.round(v + (cb[i] - v) * t));
  return '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}
const fmt = (n: number) => n.toFixed(2);

function Pass({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded px-1.5 text-xs font-mono leading-5 ${ok ? 'bg-[#DCFCE7] text-[#14532D]' : 'bg-[#FFE4E6] text-[#881337]'}`}>
      {ok ? <Check className="h-3 w-3" strokeWidth={1.5} aria-hidden /> : <X className="h-3 w-3" strokeWidth={1.5} aria-hidden />}
      {label} {ok ? 'pass' : 'fail'}
    </span>
  );
}

const SPECIMEN = 'The quick brown fox, 1,234 items.';

/* ------------------------------------------------------------------ */
/* GRID                                                                */
/* ------------------------------------------------------------------ */

function ColumnDiagram({ name, cols, width, scale, margin, gutter }: { name: string; cols: number; width: number; scale: number; margin: number; gutter: number }) {
  const col = (width - margin * 2 - gutter * (cols - 1)) / cols;
  return (
    <div className="mb-8">
      <p className="mb-6 text-sm font-medium">
        {name}: {cols} columns · {fmt(col)}px each at {width}px wide
      </p>
      <div className="relative" style={{ width: width * scale, height: 64, background: '#fff', border: `1px solid ${STONE}` }}>
        <div className="absolute inset-y-0 flex" style={{ left: margin * scale, gap: gutter * scale }}>
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} style={{ width: col * scale, background: 'rgba(212,73,131,0.18)' }} />
          ))}
        </div>
        <div className="absolute left-0" style={{ top: -22 }}>
          <DimH width={margin * scale} label={String(margin)} />
        </div>
        <div className="absolute" style={{ top: -22, left: (margin + col) * scale }}>
          <DimH width={gutter * scale} label={String(gutter)} />
        </div>
      </div>
    </div>
  );
}

function GridRedlineColumns() {
  return (
    <Stage label="Redline · 12 / 8 / 4 columns" caption="Pink lines are margins (first) and gutters (second), in real pixels. Diagrams are drawn at a reduced scale so they fit; the numbers are not scaled.">
      <div className="overflow-x-auto pt-6">
        <div style={{ minWidth: 640 }}>
          <ColumnDiagram name="Desktop ≥1024" cols={12} width={1280} scale={0.5} margin={32} gutter={24} />
          <ColumnDiagram name="Tablet 768–1023" cols={8} width={768} scale={0.75} margin={24} gutter={24} />
          <ColumnDiagram name="Mobile <768" cols={4} width={375} scale={1} margin={16} gutter={16} />
        </div>
      </div>
    </Stage>
  );
}

const PARA = 'Rhythm is the steady beat of lines landing at predictable intervals. Your eye stops searching and starts reading. Keep every line on the same beat and the page feels calm even when it is busy.';

function GridBaseline() {
  const lines = (lh: number): React.CSSProperties => ({
    fontSize: 16,
    lineHeight: `${lh}px`,
    backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 7px, rgba(212,73,131,0.35) 7px, rgba(212,73,131,0.35) 8px)',
  });
  return (
    <Stage label="Baseline grid · lines every 8px" caption="Left: 24px leading is three grid steps, so every line lands on a pink rule. Right: line-height 1.4 gives 22.4px, and by the fifth line the text has drifted off the beat.">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Tag tone="good">16 / 24 · on grid</Tag>
          <p className="mt-2" style={lines(24)}>{PARA}</p>
        </div>
        <div>
          <Tag tone="bad">16 × 1.4 = 22.4 · drifts</Tag>
          <p className="mt-2" style={lines(22.4)}>{PARA}</p>
        </div>
      </div>
    </Stage>
  );
}

function BoxStack({ h, tone }: { h: number; tone: 'good' | 'bad' }) {
  const total = h * 4 + 8 * 3;
  return (
    <div>
      <Tag tone={tone}>{h}px boxes · stack = {total}px</Tag>
      <div className="mt-2 flex gap-3">
        <div className="flex flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="grid place-items-center rounded-md text-xs font-mono" style={{ height: h, width: 120, background: CARD, border: `1px solid ${STONE}` }}>
              {h}
            </div>
          ))}
        </div>
        <div className="relative w-16" style={{ height: total, backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0, transparent 7px, rgba(17,24,39,0.25) 7px, rgba(17,24,39,0.25) 8px)' }}>
          <span className="absolute left-0 right-0 border-t-2" style={{ top: total - 1, borderColor: PINK }} />
        </div>
      </div>
      <p className="mt-2 text-xs font-mono" style={{ color: tone === 'good' ? GOOD : BAD }}>
        {total} ÷ 8 = {fmt(total / 8)} {total % 8 === 0 ? '✓ lands on a rule' : '→ ends mid-step'}
      </p>
    </div>
  );
}

function GridRoundStack() {
  return (
    <Stage label="71 → 72 · what a lazy auto-layout costs" caption="Four auto-layout boxes with 8px gaps. At 71px each, the stack ends at 308px, which is not a multiple of 8, and every sibling below inherits the error. Round to 72 and the stack ends on a rule.">
      <div className="flex flex-wrap gap-8">
        <BoxStack h={71} tone="bad" />
        <BoxStack h={72} tone="good" />
      </div>
    </Stage>
  );
}

function GridBreakReason() {
  return (
    <Stage label="Breaking the grid, with a reason" caption="The avatar is 44px because that is the smallest size that stays tappable and recognisable. 44 is not a multiple of 8, so padding drops to 6 and the row stays 56px. The circle matters more than the padding.">
      <div className="flex flex-wrap items-center gap-8">
        <div className="flex items-center gap-3 rounded-lg bg-white" style={{ height: 56, padding: '0 6px', border: `1px solid ${STONE}`, width: 260 }}>
          <span className="grid place-items-center rounded-full text-sm font-semibold text-white" style={{ width: 44, height: 44, background: INK }}>MR</span>
          <span className="text-sm leading-5">
            <strong className="block">Maya Reyes</strong>
            <span style={{ color: MUTED }}>Owner, Corner Bakery</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DimV height={44} label="44 (break)" />
          <span className="ml-20" />
          <DimV height={56} label="56 (on grid)" />
        </div>
      </div>
      <p className="mt-6 text-sm" style={{ color: MUTED }}>
        Commit message test: <em>&quot;Avatar 44px to meet the tap target; padding trimmed to 6 to hold the 56px row.&quot;</em> Passes.
      </p>
    </Stage>
  );
}

function PadCard({ pad, gaps, label }: { pad: number; gaps: number[]; label: string }) {
  return (
    <div className="w-full max-w-[260px]">
      <div className="rounded-lg border bg-white" style={{ padding: pad, borderColor: STONE }}>
        <p className="text-xs font-mono uppercase tracking-wider" style={{ color: MUTED, marginBottom: gaps[0] }}>Plan</p>
        <p className="text-base font-semibold leading-6" style={{ marginBottom: gaps[1] }}>Studio</p>
        <p className="text-sm leading-5" style={{ color: MUTED, marginBottom: gaps[2] }}>Five pages, one domain.</p>
        <span className="inline-flex items-center rounded-md px-3 text-sm font-medium text-white" style={{ background: INK, minHeight: 44 }}>Choose</span>
      </div>
      <p className="mt-2 text-xs font-mono" style={{ color: MUTED }}>{label}</p>
    </div>
  );
}

function GridDoScale() {
  return (
    <DoDont
      label="Spacing from the scale"
      doExample={<PadCard pad={16} gaps={[4, 8, 16]} label="pad 16 · gaps 4 / 8 / 16 (scale)" />}
      dontExample={<PadCard pad={13} gaps={[15, 15, 15]} label="pad 13 · gaps 15 / 15 / 15" />}
      doWhy="Padding 16 and gaps of 4, 8 and 16 come from the scale, so the card groups its parts: label hugs title, button stands apart."
      dontWhy="Padding 13 and identical 15px gaps are off the scale and flatten hierarchy, so nothing groups and nothing lines up with its neighbours."
    />
  );
}

function RoundBox({ h, note }: { h: number; note: string }) {
  return (
    <div className="w-full max-w-[240px]">
      <div className="rounded-md p-3 text-sm leading-6" style={{ minHeight: h, height: h, background: CARD, border: `1px solid ${STONE}` }}>
        Same copy, same card. Auto layout reported {note}.
      </div>
      <div className="mt-2 flex items-center gap-2">
        <DimV height={h} label={`${h}`} />
      </div>
    </div>
  );
}

function GridDoRounding() {
  return (
    <DoDont
      label="Round auto-layout output"
      doExample={<RoundBox h={72} note="71.4, rounded to 72" />}
      dontExample={<RoundBox h={71} note="71 and shipped it" />}
      doWhy="Rounding to 72 keeps this card and everything stacked below it on the 8px rules."
      dontWhy="Shipping 71px shifts every sibling by 1px, and the error compounds one lazy auto layout at a time."
    />
  );
}

function GridRedlineCard() {
  return (
    <Stage label="Redline · spacing on a real card" caption="Outer padding 16 (--space-4), 8 between title and body, 24 before the action. The button is 44px tall.">
      <div className="inline-block py-6">
        <div className="relative rounded-lg bg-white" style={{ width: 280, padding: 16, border: `1px solid ${STONE}` }}>
          <p className="text-base font-semibold leading-6">Studio plan</p>
          <p className="text-sm leading-5" style={{ color: MUTED, marginTop: 8 }}>Five pages, one domain, no surprises.</p>
          <span className="inline-flex items-center rounded-md px-4 text-sm font-medium text-white" style={{ background: INK, minHeight: 44, marginTop: 24 }}>Choose plan</span>
          <div className="absolute" style={{ top: -22, left: 0 }}><DimH width={16} label="16" /></div>
          <div className="absolute" style={{ left: 296, top: 16 + 24 + 8 - 20 }}><DimV height={8} label="8" /></div>
          <div className="absolute" style={{ left: 296, top: 16 + 24 + 8 + 20 + 4 }}><DimV height={24} label="24" /></div>
          <div className="absolute" style={{ left: 296, bottom: 16 }}><DimV height={44} label="44" /></div>
        </div>
      </div>
      <div className="mt-2 pr-24" />
    </Stage>
  );
}

function GridAxTextSpacing() {
  const spaced: React.CSSProperties = { lineHeight: 1.5, letterSpacing: '0.12em', wordSpacing: '0.16em', fontSize: 14 };
  const copy = 'Delivery is free over $40. Orders placed before noon ship the same day.';
  return (
    <Stage label="WCAG 1.4.12 · text spacing override" caption="Both cards have user text-spacing applied (line-height 1.5, letter-spacing 0.12em, word-spacing 0.16em). The fixed-height card clips the second sentence; the flexible card grows.">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Tag tone="bad">height: 48px · clips</Tag>
          <div className="mt-2 overflow-hidden rounded-md bg-white p-2" style={{ height: 48, border: `1px solid ${STONE}`, ...spaced }}>{copy}</div>
        </div>
        <div>
          <Tag tone="good">padding only · grows</Tag>
          <div className="mt-2 rounded-md bg-white p-2" style={{ border: `1px solid ${STONE}`, ...spaced }}>{copy}</div>
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* TYPOGRAPHY                                                          */
/* ------------------------------------------------------------------ */

const SCALE: [number, number, string][] = [
  [13, 20, 'caption'],
  [14, 20, 'small'],
  [16, 24, 'body'],
  [18, 28, 'lead'],
  [24, 32, 'h3'],
  [32, 40, 'h2'],
  [48, 56, 'h1'],
];

function TypeScaleRedline() {
  return (
    <Stage label="Redline · type scale, size / leading" caption="Each pink bracket is the line box. Sizes 13–48; leading on 4, and two-line blocks land on 8.">
      <div className="overflow-x-auto">
        <div className="space-y-4" style={{ minWidth: 520 }}>
          {SCALE.map(([s, l, role]) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-28 shrink-0 text-xs font-mono" style={{ color: MUTED }}>{s}/{l} {role}</span>
              <DimV height={l} label="" />
              <span className="ml-2 whitespace-nowrap" style={{ fontFamily: 'var(--font-serif)', fontSize: s, lineHeight: `${l}px`, background: 'rgba(212,73,131,0.10)' }}>
                Rhythm, then rules
              </span>
              <span className="text-xs font-mono tabular-nums" style={{ color: PINK_TEXT }}>{l}px · {fmt(l / s)}</span>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

function TypeLeadingCompare() {
  const copy = 'Good leading gives every line room to breathe without letting go of the line above. Too little and lines collide. Too much and the paragraph falls apart into separate strips.';
  return (
    <Stage label="Leading comparison · 16px text" caption="1.0 crowds ascenders into descenders. 1.5 is the Accent body setting. 2.0 reads as double-spaced homework.">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { lh: 16, tone: 'bad' as const, t: '1.0 · 16px' },
          { lh: 24, tone: 'good' as const, t: '1.5 · 24px' },
          { lh: 32, tone: 'bad' as const, t: '2.0 · 32px' },
        ].map((c) => (
          <div key={c.lh}>
            <Tag tone={c.tone}>{c.t}</Tag>
            <p className="mt-2" style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: `${c.lh}px` }}>{copy}</p>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function TypeMeasure() {
  const copy = 'Measure is line length. Your eye reads a line, jumps back to the start of the next and has to find it again. Short lines make that jump constant. Long lines make it easy to land on the wrong row. Most people read comfortably somewhere between sixty and seventy characters.';
  return (
    <Stage label="Measure · 45ch, 65ch, 90ch" caption="45ch chops thoughts into fragments. 65ch is the target. At 90ch the return trip gets risky. Pink brackets are the actual ch widths.">
      <div className="space-y-8 pt-4">
        {[
          { ch: 45, tone: 'bad' as const },
          { ch: 65, tone: 'good' as const },
          { ch: 90, tone: 'bad' as const },
        ].map((m) => (
          <div key={m.ch} style={{ maxWidth: '100%' }}>
            <div className="mb-1 flex items-center gap-2"><Tag tone={m.tone}>{m.ch}ch</Tag></div>
            <div className="mb-1" style={{ width: `min(${m.ch}ch, 100%)`, fontSize: 16 }}><DimH width="100%" label={`${m.ch}ch`} /></div>
            <p style={{ width: `min(${m.ch}ch, 100%)`, fontSize: 16, lineHeight: '24px', fontFamily: 'var(--font-sans)' }}>{copy}</p>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function TypeTracking() {
  const rows = [0, 0.04, 0.08, 0.16];
  return (
    <Stage label="Uppercase tracking" caption="Capitals have no ascenders or descenders to shape the word, so they need air. 0.08em is the Accent label setting; 0.16em starts to look like a movie poster.">
      <div className="space-y-3">
        {rows.map((t) => (
          <div key={t} className="flex flex-wrap items-baseline gap-4">
            <span className="w-24 text-xs font-mono" style={{ color: MUTED }}>{t.toFixed(2)}em</span>
            <span className="uppercase" style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, letterSpacing: `${t}em` }}>
              Quarterly report · March
            </span>
            {t === 0.08 && <Tag tone="good">Accent</Tag>}
            {t === 0 && <Tag tone="bad">cramped</Tag>}
          </div>
        ))}
      </div>
    </Stage>
  );
}

const FONT_ROWS: [string, string][] = [
  ['Fraunces', '--font-serif'],
  ['EB Garamond', '--font-eb-garamond'],
  ['Source Serif', '--font-source-serif'],
  ['Literata', '--font-literata'],
  ['Newsreader', '--font-newsreader'],
  ['Lora', '--font-lora'],
  ['Inter', '--font-sans'],
  ['Roboto', '--font-roboto'],
  ['Source Sans', '--font-source-sans'],
  ['IBM Plex Sans', '--font-plex-sans'],
  ['Public Sans', '--font-public-sans'],
  ['Work Sans', '--font-work-sans'],
];

function XRow({ name, v }: { name: string; v: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [xr, setXr] = useState<number | null>(null);
  useEffect(() => {
    let live = true;
    const run = () => {
      if (!ref.current) return;
      const ff = getComputedStyle(ref.current).fontFamily;
      const ctx = document.createElement('canvas').getContext('2d');
      if (!ctx) return;
      ctx.font = `100px ${ff}`;
      const m = ctx.measureText('x');
      if (live) setXr(m.actualBoundingBoxAscent / 100);
    };
    document.fonts?.ready.then(run);
    run();
    return () => {
      live = false;
    };
  }, []);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="w-32 shrink-0 text-xs font-mono" style={{ color: MUTED }}>{name}</span>
      <span ref={ref} className="w-40 shrink-0" style={{ fontFamily: `var(${v})`, fontSize: 32, lineHeight: '40px' }}>xHxeg</span>
      <span className="relative h-3 w-40 rounded-sm" style={{ background: STONE }} aria-hidden>
        <span className="absolute inset-y-0 left-0 rounded-sm" style={{ width: `${Math.min(100, ((xr ?? 0) / 0.6) * 100)}%`, background: PINK }} />
      </span>
      <span className="text-xs font-mono tabular-nums">{xr === null ? '…' : `${xr.toFixed(3)} em`}</span>
    </div>
  );
}

function TypeXHeight() {
  return (
    <Stage label="x-height · same 32px size, different fonts" caption="Measured live from the font in your browser. A bigger x-height looks bigger at the same nominal size, which is why a pair needs its sizes tuned, not copied.">
      <div className="space-y-3">
        {FONT_ROWS.map(([n, v]) => <XRow key={v} name={n} v={v} />)}
      </div>
    </Stage>
  );
}

function TypeFallbackRender() {
  const rows = [
    { t: 'No fallback', ff: '"Missing Web Font"', tone: 'bad' as const, note: 'Browser default (often Times)' },
    { t: 'Full stack', ff: '"Missing Web Font", "Iowan Old Style", "Palatino Linotype", Georgia, serif', tone: 'good' as const, note: 'Next closest installed face' },
    { t: 'Sans stack', ff: '"Missing Web Font", system-ui, -apple-system, "Segoe UI", sans-serif', tone: 'good' as const, note: 'Platform UI face' },
  ];
  return (
    <Stage label="What a failed font load looks like" caption="The first family never loads in all three rows. Only the stack decides what you see instead.">
      <div className="space-y-4">
        {rows.map((r) => (
          <div key={r.t} className="flex flex-wrap items-center gap-3">
            <span className="w-28 shrink-0"><Tag tone={r.tone}>{r.t}</Tag></span>
            <span style={{ fontFamily: r.ff, fontSize: 24, lineHeight: '32px' }}>Menu, pricing, contact</span>
            <span className="text-xs font-mono" style={{ color: MUTED }}>{r.note}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function MeasureBlock({ ch }: { ch: number }) {
  return (
    <p className="text-sm leading-6" style={{ maxWidth: `${ch}ch`, width: '100%', fontFamily: 'var(--font-sans)' }}>
      We bake in small batches. Orders close at noon, pick-up starts at three, and anything left over goes to the shelter down the road. If you are running late, call and we will hold your box until six, but not past it, because the croissants do not.
    </p>
  );
}

function TypeDoMeasure() {
  return (
    <DoDont
      label="Measure"
      doExample={<MeasureBlock ch={34} />}
      dontExample={<div style={{ width: '100%', overflow: 'hidden' }}><p className="text-sm leading-6" style={{ width: '90ch', maxWidth: 'none', fontFamily: 'var(--font-sans)' }}>We bake in small batches. Orders close at noon, pick-up starts at three, and anything left over goes to the shelter down the road. If you are running late, call and we will hold your box until six, but not past it, because the croissants do not.</p></div>}
      doWhy="A capped column (65ch on a full page; narrower here to fit the card) keeps the return trip short and the paragraph shaped."
      dontWhy="A 90ch line runs off the card on a phone and makes the eye hunt for the next row on a desktop. Uncapped text is the default way to get this wrong."
    />
  );
}

function PriceTable({ lining }: { lining: boolean }) {
  const f = lining ? { fontVariantNumeric: 'lining-nums tabular-nums' } : { fontVariantNumeric: 'oldstyle-nums proportional-nums' };
  return (
    <div className="w-full max-w-[240px]">
      <table className="w-full text-base" style={{ fontFamily: 'Georgia, serif', ...f }}>
        <caption className="sr-only">Invoice totals</caption>
        <tbody>
          {[['Hosting', '$1,347.95'], ['Domain', '$9.00'], ['Support', '$594.30'], ['Total', '$1,951.25']].map(([k, v]) => (
            <tr key={k} className={k === 'Total' ? 'border-t font-semibold' : ''} style={{ borderColor: INK }}>
              <th scope="row" className="py-1 text-left font-normal">{k}</th>
              <td className="py-1 text-right">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TypeDoNumerals() {
  return (
    <DoDont
      label="Numerals in tables"
      doExample={<PriceTable lining />}
      dontExample={<PriceTable lining={false} />}
      doWhy="Lining, tabular figures sit on the baseline at one width, so the decimal points stack and a total can be checked by eye."
      dontWhy="Old-style, proportional figures (Georgia's default look) bounce above and below the baseline, so columns stop aligning and 1 vs 7 gets hard to tell."
    />
  );
}

function TypeAxSpacing() {
  const spaced: React.CSSProperties = { fontSize: 16, lineHeight: 1.5, letterSpacing: '0.12em', wordSpacing: '0.16em', maxWidth: '65ch' };
  return (
    <Stage label="Accessibility · text under user spacing and 200% size" caption="Left: your text at normal settings. Right: the same text after a user applies WCAG 1.4.12 spacing at 200% zoom equivalent. Nothing clips because no height is fixed and measure is in ch.">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Tag tone="ink">default</Tag>
          <p className="mt-2 text-base leading-6" style={{ maxWidth: '65ch' }}>Reading should survive a user changing their settings. Fixed heights and px font sizes are what break first.</p>
        </div>
        <div>
          <Tag tone="good">overridden · still fine</Tag>
          <p className="mt-2" style={spaced}>Reading should survive a user changing their settings. Fixed heights and px font sizes are what break first.</p>
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* COLOR                                                               */
/* ------------------------------------------------------------------ */

function ColorContrastVisual() {
  const rows = ['#D6D0C4', '#A8A29E', '#78716C', '#57534E', '#292524'];
  return (
    <Stage label="Contrast ratio, drawn" caption="Ratio = (lighter luminance + 0.05) ÷ (darker luminance + 0.05). 1:1 is invisible, 21:1 is black on white. The bar shows where each pair sits between those ends.">
      <div className="space-y-4">
        {rows.map((c) => {
          const r = ratio(c, ALABASTER);
          return (
            <div key={c} className="flex flex-wrap items-center gap-4">
              <span className="w-24 text-xs font-mono tabular-nums" style={{ color: MUTED }}>{c}</span>
              <span className="text-base font-medium flex-1 min-w-[160px]" style={{ color: c }}>Can you read this at arm&apos;s length?</span>
              <span className="relative h-3 w-32 rounded-sm" style={{ background: STONE }} aria-hidden>
                <span className="absolute inset-y-0 left-0 rounded-sm" style={{ width: `${(r / 21) * 100}%`, background: INK }} />
              </span>
              <span className="w-16 text-sm font-mono tabular-nums">{fmt(r)}:1</span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

const PAIRS: [string, string, string][] = [
  ['Ink on Alabaster', INK, ALABASTER],
  ['Muted on Alabaster', MUTED, ALABASTER],
  ['Pink on Alabaster', PINK, ALABASTER],
  ['Text pink on Alabaster', PINK_TEXT, ALABASTER],
  ['White on Pink', '#FFFFFF', PINK],
  ['White on Text pink', '#FFFFFF', PINK_TEXT],
];

function ColorAaAaa() {
  return (
    <Stage label="AA vs AAA, computed" caption="AA normal text needs 4.5:1, AA large text (24px, or 18.66px bold) needs 3:1, AAA normal needs 7:1. Accent targets AAA for body copy.">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: 560 }}>
          <caption className="sr-only">Contrast results for Accent colour pairs</caption>
          <thead>
            <tr className="text-left text-xs font-mono uppercase tracking-wider" style={{ color: MUTED }}>
              <th scope="col" className="py-2 pr-3">Pair</th><th scope="col" className="pr-3">Sample</th><th scope="col" className="pr-3">Ratio</th><th scope="col">Results</th>
            </tr>
          </thead>
          <tbody>
            {PAIRS.map(([n, fg, bg]) => {
              const r = ratio(fg, bg);
              return (
                <tr key={n} className="border-t" style={{ borderColor: STONE }}>
                  <th scope="row" className="py-2 pr-3 text-left font-medium">{n}</th>
                  <td className="pr-3"><span className="rounded px-2 py-1 text-sm font-medium" style={{ color: fg, background: bg, border: `1px solid ${STONE}` }}>Aa 16px</span></td>
                  <td className="pr-3 font-mono tabular-nums">{fmt(r)}</td>
                  <td className="space-x-1 space-y-1">
                    <Pass ok={r >= 3} label="AA large" /><Pass ok={r >= 4.5} label="AA" /><Pass ok={r >= 7} label="AAA" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}

function ColorReliefFocus() {
  const Sq = ({ bg }: { bg: string }) => (
    <span className="grid place-items-center rounded-md" style={{ width: 96, height: 96, background: bg }}>
      <span style={{ width: 40, height: 40, background: '#8A8378' }} />
    </span>
  );
  const Btn = ({ pink }: { pink?: boolean }) => (
    <span className="inline-flex items-center rounded-md px-3 text-sm font-medium" style={{ minHeight: 44, background: pink ? PINK_TEXT : STONE, color: pink ? '#fff' : INK }}>
      {pink ? 'Start free' : 'Learn more'}
    </span>
  );
  return (
    <Stage label="Relief and focus · Albers" caption="Left: the centre squares are the same grey (#8A8378). Their ground changes how you read them; no colour exists alone. Right: one pink button is in focus because everything else holds back in relief. Pink on all four and none of them is.">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="flex items-center gap-3"><Sq bg={CARD} /><Sq bg={INK} /></div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2"><Btn /><Btn /><Btn pink /></div>
          <div className="flex flex-wrap gap-2"><Btn pink /><Btn pink /><Btn pink /></div>
        </div>
      </div>
    </Stage>
  );
}

function Ramp({ title, base, toward, steps }: { title: string; base: string; toward: string; steps: number }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{title}</p>
      <div className="grid grid-cols-5 gap-1 sm:grid-cols-10">
        {Array.from({ length: steps }).map((_, i) => {
          const t = i / (steps - 1);
          const c = mix(toward, base, t);
          const onW = ratio(c, '#FFFFFF');
          const fg = onW >= ratio(c, INK) ? '#FFFFFF' : INK;
          return (
            <div key={i} className="rounded p-1 text-center" style={{ background: c, color: fg, border: `1px solid ${STONE}` }}>
              <div className="text-xs font-mono">{i * 100 || 50}</div>
              <div className="text-xs font-mono tabular-nums">{fmt(ratio(c, fg))}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ColorRamps() {
  return (
    <Stage label="Tint and shade ramps" caption="Tints mix with white, shades with black. Each swatch lists its step and its best-case text contrast (white or Ink, whichever wins). Pink only reaches 7:1 around the 800 step.">
      <div className="space-y-6">
        <Ramp title="Pink #D44983 (steps 50 to 900)" base={PINK} toward="#FFFFFF" steps={5} />
        <Ramp title="Pink shades" base="#1A0610" toward={PINK} steps={5} />
        <Ramp title="Ink #111827, tints to white" base={INK} toward="#FFFFFF" steps={10} />
      </div>
    </Stage>
  );
}

const MATRICES: [string, string][] = [
  ['Typical vision', ''],
  ['Protanopia (no red)', '0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0'],
  ['Deuteranopia (no green)', '0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0'],
  ['Tritanopia (no blue)', '0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0'],
];
const STATUS: [string, string, React.ReactNode][] = [
  ['Paid', GOOD, <Check key="c" className="h-4 w-4" strokeWidth={1.5} aria-hidden />],
  ['Due soon', '#92400E', <Bell key="b" className="h-4 w-4" strokeWidth={1.5} aria-hidden />],
  ['Failed', BAD, <X key="x" className="h-4 w-4" strokeWidth={1.5} aria-hidden />],
];

function ColorBlindSim() {
  return (
    <Stage label="Colour-vision simulation" caption="Simulated with SVG colour matrices (approximate, not a medical model). The dots-only row is what colour-alone status looks like: under deuteranopia, Paid and Failed are close to the same olive. The labelled chips survive.">
      <svg width="0" height="0" aria-hidden className="absolute">
        {MATRICES.slice(1).map(([n, m], i) => (
          <filter key={n} id={`fa-cb-${i}`}><feColorMatrix type="matrix" values={m} /></filter>
        ))}
      </svg>
      <div className="space-y-4">
        {MATRICES.map(([n], i) => (
          <div key={n} className="flex flex-wrap items-center gap-4" style={i ? { filter: `url(#fa-cb-${i - 1})` } : undefined}>
            <span className="w-44 shrink-0 text-xs font-mono" style={{ color: MUTED, filter: 'none' }}>{n}</span>
            <span className="flex gap-2" aria-hidden>
              {STATUS.map(([l, c]) => <span key={l} className="h-4 w-4 rounded-full" style={{ background: c }} />)}
            </span>
            <span className="flex flex-wrap gap-2">
              {STATUS.map(([l, c, ic]) => (
                <span key={l} className="inline-flex items-center gap-1 rounded-md px-2 text-sm font-medium text-white" style={{ background: c, minHeight: 28 }}>{ic}{l}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function StatusRow({ labelled }: { labelled: boolean }) {
  return (
    <ul className="w-full max-w-[260px] space-y-2 text-sm">
      {STATUS.map(([l, c, ic]) => (
        <li key={l} className="flex items-center gap-2" style={{ minHeight: 28 }}>
          {labelled ? <span style={{ color: c }}>{ic}</span> : <span className="h-3 w-3 rounded-full" style={{ background: c }} />}
          {labelled ? <span className="font-medium" style={{ color: INK }}>{l}</span> : <span className="text-xs font-mono" style={{ color: MUTED }}>invoice #{l.length * 211}</span>}
        </li>
      ))}
    </ul>
  );
}

function ColorDoNeverAlone() {
  return (
    <DoDont
      label="Never colour alone"
      doExample={<StatusRow labelled />}
      dontExample={<StatusRow labelled={false} />}
      doWhy="Colour, a distinct icon and a word all say the same thing, so it still works in greyscale, in sunlight and for one in twelve men."
      dontWhy="A green, amber or red dot is the only status signal. Someone with deuteranopia sees two near-identical dots and no label to fall back on."
    />
  );
}

function ContrastSample({ fg, label }: { fg: string; label: string }) {
  const r = ratio(fg, ALABASTER);
  return (
    <div className="w-full max-w-[260px] rounded-md p-4" style={{ background: ALABASTER, border: `1px solid ${STONE}` }}>
      <p className="text-sm leading-5" style={{ color: fg }}>Free shipping on orders over $40. Returns within 30 days, no questions.</p>
      <p className="mt-2 text-xs font-mono tabular-nums" style={{ color: MUTED }}>{label} · {fmt(r)}:1 · {r >= 7 ? 'AAA' : r >= 4.5 ? 'AA only' : 'fails AA'}</p>
    </div>
  );
}

function ColorDoContrast() {
  return (
    <DoDont
      label="Body text contrast"
      doExample={<ContrastSample fg={INK} label="Ink" />}
      dontExample={<ContrastSample fg="#A8A29E" label="Light grey" />}
      doWhy="Ink on Alabaster clears AAA by a wide margin, so it holds up on a cracked phone in daylight."
      dontWhy="Light grey on a light surface looks refined on a calibrated monitor and fails AA everywhere else. It is the most common contrast mistake on the web."
    />
  );
}

const TOKENS: [string, string][] = [['Alabaster', ALABASTER], ['Gallery Stone', STONE], ['Card', CARD], ['Ink', INK], ['Pink', PINK], ['Text pink', PINK_TEXT]];

function ColorRedlineTokens() {
  return (
    <Stage label="Redline · colour tokens, swatch and best contrast" caption="64px swatches on the grid. The ratio is the stronger of white or Ink text on that swatch.">
      <div className="flex flex-wrap gap-x-8 gap-y-4 pl-8">
        {TOKENS.map(([n, c]) => {
          const best = Math.max(ratio(c, '#FFFFFF'), ratio(c, INK));
          return (
            <div key={n} className="flex items-center gap-1">
              <div>
                <div className="rounded-md" style={{ width: 64, height: 64, background: c, border: `1px solid ${STONE}` }} />
                <p className="mt-1 text-xs font-medium">{n}</p>
                <p className="text-xs font-mono tabular-nums" style={{ color: MUTED }}>{c} · {fmt(best)}</p>
              </div>
              {n === 'Alabaster' && <DimV height={64} label="" />}
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

function ColorAxRing() {
  const rows: [string, string][] = [['Focus ring (Text pink)', PINK_TEXT], ['Focus ring (Pink)', PINK], ['Border (Gallery Stone)', STONE], ['Border (Muted)', MUTED]];
  return (
    <Stage label="Accessibility · non-text contrast (WCAG 1.4.11, 3:1)" caption="Rings and control borders need 3:1 against the surface they sit on. Gallery Stone is fine for decoration, not for the only edge of an input.">
      <div className="space-y-3">
        {[ALABASTER, CARD].map((bg) => (
          <div key={bg} className="rounded-md p-3" style={{ background: bg }}>
            <p className="mb-2 text-xs font-mono" style={{ color: MUTED }}>On {bg === ALABASTER ? 'Alabaster' : 'Card'}</p>
            <div className="flex flex-wrap gap-3">
              {rows.map(([n, c]) => {
                const r = ratio(c, bg);
                return (
                  <span key={n} className="inline-flex items-center gap-2 text-xs">
                    <span className="h-6 w-10 rounded" style={{ border: `2px solid ${c}` }} aria-hidden />
                    <span>{n}</span>
                    <Pass ok={r >= 3} label={`${fmt(r)}`} />
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* ICONOGRAPHY                                                         */
/* ------------------------------------------------------------------ */

function IconStrokeSizes() {
  const sizes = [16, 20, 24];
  const strokes: [number, 'good' | 'bad', string][] = [[1.5, 'good', '1.5 Accent'], [2, 'bad', '2 default'], [1, 'bad', '1 hairline']];
  return (
    <Stage label="Stroke weight 1.5 at 16, 20 and 24" caption="Lucide ships at stroke 2. At 16px that is a heavy 12.5% of the icon; Accent sets 1.5 so icons match 400-weight text instead of shouting over it.">
      <div className="space-y-3">
        {strokes.map(([w, tone, t]) => (
          <div key={w} className="flex flex-wrap items-center gap-6">
            <span className="w-28 shrink-0"><Tag tone={tone}>{t}</Tag></span>
            {sizes.map((s) => (
              <span key={s} className="inline-flex items-center gap-2">
                <Settings width={s} height={s} strokeWidth={w} aria-hidden />
                <Search width={s} height={s} strokeWidth={w} aria-hidden />
                <span className="text-xs font-mono">{s}px</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-end gap-6 pl-6">
        {sizes.map((s) => (
          <span key={s} className="inline-flex items-center gap-1"><DimV height={s} label="" /><Folder width={s} height={s} strokeWidth={1.5} aria-hidden /><span className="text-xs font-mono">{s}</span></span>
        ))}
      </div>
    </Stage>
  );
}

function IconOpticalBaseline() {
  const Row = ({ shift, tag, tone }: { shift: number; tag: string; tone: 'good' | 'bad' }) => (
    <div className="flex flex-wrap items-center gap-4">
      <span className="w-36 shrink-0"><Tag tone={tone}>{tag}</Tag></span>
      <span className="relative inline-flex items-center gap-2 px-2" style={{ height: 40, fontSize: 16, fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
        <span className="absolute inset-x-0 top-1/2 h-px" style={{ background: PINK }} aria-hidden />
        <Download width={16} height={16} strokeWidth={1.5} aria-hidden style={{ transform: `translateY(${shift}px)`, background: ALABASTER }} />
        <span style={{ background: ALABASTER, lineHeight: '24px' }}>Download report</span>
      </span>
    </div>
  );
  return (
    <Stage label="Optical alignment with the text" caption="The pink line runs through the centre of the line box. A 16px icon beside 16px text should share that centre. Even 2px low reads as a wobble you can feel but not name.">
      <div className="space-y-3">
        <Row shift={0} tag="Centred" tone="good" />
        <Row shift={3} tag="3px low" tone="bad" />
      </div>
    </Stage>
  );
}

function IconRedlineButton() {
  return (
    <Stage label="Redline · icon button anatomy" caption="Height 44. Icon 16 at stroke 1.5. Gap 8 between icon and label. Padding 16 on each side.">
      <div className="pb-4 pt-8 pl-2">
        <div className="relative inline-flex items-center rounded-md" style={{ height: 44, paddingInline: 16, gap: 8, background: INK, color: '#fff' }}>
          <Download width={16} height={16} strokeWidth={1.5} aria-hidden />
          <span className="text-sm font-medium">Download</span>
          <div className="absolute" style={{ top: -22, left: 0 }}><DimH width={16} label="16" /></div>
          <div className="absolute" style={{ top: -22, left: 16 }}><DimH width={16} label="16" /></div>
          <div className="absolute" style={{ top: -22, left: 32 }}><DimH width={8} label="8" /></div>
          <div className="absolute" style={{ left: -28, top: 0 }}><DimV height={44} label="" /></div>
        </div>
        <p className="mt-3 text-xs font-mono" style={{ color: MUTED }}>pad 16 · icon 16 · gap 8 · label · pad 16 · height 44</p>
      </div>
    </Stage>
  );
}

const TOOLS: [React.ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean }>, string][] = [
  [Share2, 'Share'], [Trash2, 'Delete'], [Star, 'Save'], [Bell, 'Alerts'], [Mail, 'Send'],
];

function ToolRow({ labelled }: { labelled: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TOOLS.map(([I, n]) => (
        <button key={n} type="button" aria-label={n} className="inline-flex flex-col items-center justify-center gap-0.5 rounded-md border px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" style={{ minHeight: 44, minWidth: 44, borderColor: STONE, background: '#fff', outlineColor: PINK_TEXT }}>
          <I className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          {labelled && <span className="text-xs">{n}</span>}
        </button>
      ))}
    </div>
  );
}

function IconDoLabel() {
  return (
    <DoDont
      label="Labels beside icons"
      doExample={<ToolRow labelled />}
      dontExample={<ToolRow labelled={false} />}
      doWhy="Every icon carries its word, so nobody has to hover, guess or learn your private vocabulary."
      dontWhy="Five bare icons: is the star Save, Favourite or Rate? Is the envelope Send or Contact? An aria-label helps screen readers but sighted users still have to guess."
    />
  );
}

const ROWS: [React.ComponentType<{ className?: string; strokeWidth?: number }>, string][] = [
  [Home, 'Dashboard'], [User, 'Customers'], [Heart, 'Favourites'], [Sparkles, 'Insights'], [Settings, 'Settings'],
];

function IconDoRestraint() {
  return (
    <DoDont
      label="Lucide everywhere vs restrained"
      doExample={
        <ul className="w-full max-w-[220px] space-y-1 text-sm">
          {ROWS.map(([, t], i) => (
            <li key={t} className="flex items-center justify-between rounded-md px-2" style={{ minHeight: 44, background: i === 0 ? CARD : 'transparent', fontWeight: i === 0 ? 600 : 400 }}>
              {t}{i === 0 && <span className="text-xs font-mono" style={{ color: PINK_TEXT }}>current</span>}
            </li>
          ))}
        </ul>
      }
      dontExample={
        <ul className="w-full max-w-[220px] space-y-1 text-sm">
          {ROWS.map(([I, t]) => (
            <li key={t} className="flex items-center gap-2 rounded-md px-2" style={{ minHeight: 44 }}>
              <I className="h-5 w-5" strokeWidth={2} />{t}
            </li>
          ))}
        </ul>
      }
      doWhy="Words carry the meaning; the only extra mark is the current page. Type and weight do the work an icon would."
      dontWhy="A default-weight Lucide icon on every row, including a sparkle for Insights, is decoration. It slows scanning and makes the product look like every other template."
    />
  );
}

function IconGlyphVsIcon() {
  const cards: [string, string, string][] = [
    ['´', 'Glyph', 'A character in the type. Inherits size, colour, weight and language. Scales with text.'],
    ['!', 'Glyph', 'Punctuation as a mark: shared by most written languages and free of an asset pipeline.'],
    [';-]', 'Glyph', 'Built from characters, so it prints, copies and reads aloud as text.'],
  ];
  return (
    <Stage label="Glyph vs icon" caption="A glyph is a character in a font. An icon is a drawn shape from a set. Prefer a glyph when a character already says it; draw an icon only when none does.">
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map(([g, t, d]) => (
          <div key={g} className="rounded-md bg-white p-3" style={{ border: `1px solid ${STONE}` }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 32, lineHeight: '40px' }}>{g}</p>
            <p className="text-xs font-mono uppercase tracking-wider" style={{ color: MUTED }}>{t}</p>
            <p className="mt-1 text-sm leading-5">{d}</p>
          </div>
        ))}
        <div className="rounded-md bg-white p-3" style={{ border: `1px solid ${STONE}` }}>
          <Share2 width={32} height={32} strokeWidth={1.5} aria-hidden />
          <p className="mt-2 text-xs font-mono uppercase tracking-wider" style={{ color: MUTED }}>Icon</p>
          <p className="mt-1 text-sm leading-5">A drawn shape. Needed when no character exists (share, download). Label it.</p>
        </div>
      </div>
    </Stage>
  );
}

function IconAxNames() {
  const rows: [React.ReactNode, string, 'good' | 'bad'][] = [
    [<button key="1" type="button" className="inline-flex items-center gap-2 rounded-md px-4 text-sm font-medium text-white" style={{ minHeight: 44, background: INK }}><Download className="h-4 w-4" strokeWidth={1.5} aria-hidden />Download</button>, '“Download, button”', 'good'],
    [<button key="2" type="button" aria-label="Search" className="inline-grid place-items-center rounded-md border" style={{ minHeight: 44, minWidth: 44, borderColor: MUTED, background: '#fff' }}><Search className="h-5 w-5" strokeWidth={1.5} aria-hidden /></button>, '“Search, button” (aria-label)', 'good'],
    [<button key="3" type="button" className="inline-grid place-items-center rounded-md border" style={{ minHeight: 44, minWidth: 44, borderColor: MUTED, background: '#fff' }}><Trash2 className="h-5 w-5" strokeWidth={1.5} /></button>, '“button” and nothing else', 'bad'],
  ];
  return (
    <Stage label="Accessibility · what a screen reader says" caption="The decorative icon is aria-hidden so it is never read. An icon-only control gets aria-label. The third button has neither, so it is announced as an unnamed button.">
      <div className="space-y-4">
        {rows.map(([el, said, tone], i) => (
          <div key={i} className="flex flex-wrap items-center gap-4">
            <span className="w-36 shrink-0"><HitBox label="">{el}</HitBox></span>
            <Tag tone={tone}>{said}</Tag>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function ColorEyeFatigue() {
  const [surface, setSurface] = useState<'sandstone' | 'card' | 'white' | 'oled'>('sandstone');
  const SURFACES = {
    sandstone: {
      name: 'Warm Sandstone (#E8E2D5 · Layer 0 Canvas)',
      bg: '#E8E2D5',
      ink: '#111827',
      rgb: [232, 226, 213],
      lum: '77%',
      blueReduction: '−16.5% blue sub-pixel output vs #FFFFFF',
      contrast: '12.6:1 (WCAG AAA)',
      verdict: 'Recommended · Museum papyrus warmth; relaxes pupil constriction and cuts short-wavelength (~450nm) glare.',
      tone: 'good' as const,
    },
    card: {
      name: 'Archival Card (#F3EFE9 · Layer 1 Surface)',
      bg: '#F3EFE9',
      ink: '#111827',
      rgb: [243, 239, 233],
      lum: '86%',
      blueReduction: '−8.6% blue sub-pixel output vs #FFFFFF',
      contrast: '14.1:1 (WCAG AAA)',
      verdict: 'Recommended · Raised card surface; steps gently above Sandstone without turning into a clinical lightbox.',
      tone: 'good' as const,
    },
    white: {
      name: 'Pure Clinical White (#FFFFFF · Avoid)',
      bg: '#FFFFFF',
      ink: '#000000',
      rgb: [255, 255, 255],
      lum: '100%',
      blueReduction: '0% (100% blue sub-pixel intensity)',
      contrast: '21.0:1 (Over-sharp stripe glare)',
      verdict: 'Avoid · Fires blue sub-pixels at 100%, forces sustained pupil constriction, and causes pattern glare on long text.',
      tone: 'bad' as const,
    },
    oled: {
      name: 'Pure OLED Black (#000000 · Avoid)',
      bg: '#000000',
      ink: '#FFFFFF',
      rgb: [0, 0, 0],
      lum: '0% (with 100% white text spikes)',
      blueReduction: '100% blue spikes on every letterform',
      contrast: '21.0:1 (Halation / astigmatism bloom)',
      verdict: 'Avoid · Wide-open pupils in a dark room cause bright white letters to bleed and shimmer (halation). Use #111827 instead.',
      tone: 'bad' as const,
    },
  }[surface];

  return (
    <Stage
      label="Visual ergonomics · blue light, luminance & eye fatigue"
      controls={
        <Seg
          label="Surface comparison"
          value={surface}
          onChange={setSurface}
          options={[
            { id: 'sandstone', label: 'Sandstone #E8E2D5' },
            { id: 'card', label: 'Card #F3EFE9' },
            { id: 'white', label: 'Pure White #FFF' },
            { id: 'oled', label: 'Pure Black #000' },
          ]}
        />
      }
      caption="Pure white (#FFFFFF) drives the blue sub-pixel channel (B: 255) at full power, acting like a light bulb pointed at the reader. Warm Sandstone (#E8E2D5, B: 213) steps down short-wavelength blue emission and total luminance while still clearing 12.6:1 WCAG AAA."
    >
      <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <div
          className="rounded-lg p-5 transition-colors border"
          style={{
            background: SURFACES.bg,
            color: SURFACES.ink,
            borderColor: surface === 'oled' ? 'rgba(255,255,255,0.2)' : 'rgba(17,24,39,0.16)',
          }}
        >
          <p className="text-xs font-mono uppercase tracking-wider opacity-75">{SURFACES.name}</p>
          <h4 className="mt-1 font-serif text-xl font-semibold">Reading for forty minutes without eye strain</h4>
          <p className="mt-2 text-sm leading-6">
            A book page reflects the warm ambient light of the room you are sitting in. A computer monitor emits light directly into your retina. Stepping the page canvas down from clinical white to warm sandstone stops the screen from outshining your room.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Tag tone={SURFACES.tone}>{SURFACES.contrast}</Tag>
            <span className="text-xs font-mono opacity-80">Luminance: {SURFACES.lum}</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 border border-[#111827]/12 space-y-3 text-sm">
          <p className="text-xs font-mono uppercase tracking-wider text-[#4B5563]">Sub-pixel channel emission (0–255)</p>
          {(['R', 'G', 'B'] as const).map((ch, idx) => {
            const val = SURFACES.rgb[idx];
            const pct = Math.round((val / 255) * 100);
            const barColor = ch === 'R' ? '#DC2626' : ch === 'G' ? '#16A34A' : '#2563EB';
            return (
              <div key={ch} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span>{ch === 'B' ? 'Blue (~450nm short-wave)' : ch === 'G' ? 'Green (~530nm)' : 'Red (~620nm)'}</span>
                  <span className="tabular-nums">{val} / 255 ({pct}%)</span>
                </div>
                <div className="h-2.5 w-full rounded-sm bg-[#E8E2D5] overflow-hidden">
                  <div className="h-full transition-all" style={{ width: `${pct}%`, background: barColor }} />
                </div>
              </div>
            );
          })}
          <p className="pt-1 text-xs font-mono text-[#A3285C]">{SURFACES.blueReduction}</p>
          <p className="text-xs leading-5 text-[#4B5563]">{SURFACES.verdict}</p>
        </div>
      </div>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'color-eye-fatigue': ColorEyeFatigue,
  'grid-redline-columns': GridRedlineColumns,
  'grid-baseline': GridBaseline,
  'grid-round-stack': GridRoundStack,
  'grid-break-reason': GridBreakReason,
  'grid-do-scale': GridDoScale,
  'grid-do-rounding': GridDoRounding,
  'grid-redline-card': GridRedlineCard,
  'grid-ax-textspacing': GridAxTextSpacing,
  'type-scale-redline': TypeScaleRedline,
  'type-leading-compare': TypeLeadingCompare,
  'type-measure': TypeMeasure,
  'type-tracking': TypeTracking,
  'type-xheight': TypeXHeight,
  'type-fallback-render': TypeFallbackRender,
  'type-do-measure': TypeDoMeasure,
  'type-do-numerals': TypeDoNumerals,
  'type-ax-spacing': TypeAxSpacing,
  'color-contrast-visual': ColorContrastVisual,
  'color-aa-aaa': ColorAaAaa,
  'color-relief-focus': ColorReliefFocus,
  'color-ramps': ColorRamps,
  'color-blind-sim': ColorBlindSim,
  'color-do-never-alone': ColorDoNeverAlone,
  'color-do-contrast': ColorDoContrast,
  'color-redline-tokens': ColorRedlineTokens,
  'color-ax-ring': ColorAxRing,
  'icon-stroke-sizes': IconStrokeSizes,
  'icon-optical-baseline': IconOpticalBaseline,
  'icon-redline-button': IconRedlineButton,
  'icon-do-label': IconDoLabel,
  'icon-do-restraint': IconDoRestraint,
  'icon-glyph-vs-icon': IconGlyphVsIcon,
  'icon-ax-names': IconAxNames,
};
