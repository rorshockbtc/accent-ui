'use client';

import React, { useState } from 'react';
import { DimH, DimV, DoDont, FocusMark, HitBox, Seg, Stage, Tag } from '../primitives';
import { PIPE_BRANDS } from '@/lib/pipe-brand';
import { EditorialPlate } from '../sample-media';

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const INK = '#111827';
const PINK = '#D44983';
const RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3285C]';

/** WCAG relative luminance contrast ratio, computed live so the numbers cannot drift. */
function lum(hex: string) {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a: string, b: string) {
  const x = lum(a);
  const y = lum(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
const fmt = (n: number) => n.toFixed(2);

function Btn({ children, tone = 'ink' }: { children: React.ReactNode; tone?: 'ink' | 'ghost' }) {
  const t = tone === 'ink' ? 'bg-[#111827] text-white' : 'border border-[#111827] text-[#111827] bg-transparent';
  return (
    <button type="button" className={`min-h-[44px] min-w-[44px] px-4 rounded-md text-sm font-medium ${t} ${RING}`}>
      {children}
    </button>
  );
}

type MarkKind = 'accent' | 'bang' | 'cbb' | 'semi' | 'greater' | 'hash' | 'trim' | 'pipe';
const MARK_W: Record<MarkKind, number> = { accent: 32, bang: 16, cbb: 64, semi: 64, greater: 28, hash: 32, trim: 32, pipe: 32 };
const MARK_NAME: Record<MarkKind, string> = {
  accent: 'Accént',
  bang: 'Bang',
  cbb: 'Colon Hyphen Bracket',
  semi: 'Semi',
  greater: 'Greater',
  hash: 'Hash',
  trim: 'Trim',
  pipe: 'Pipe namespace',
};

/** The punctuation family marks drawn as paths on a 32-unit-tall grid, so they stay crisp where a font glyph would blur. */
function Mark({ kind, h = 64, color = PINK, stretch = 1, outline = false, label }: { kind: MarkKind; h?: number; color?: string; stretch?: number; outline?: boolean; label?: string }) {
  const w = MARK_W[kind];
  const fill = outline ? 'none' : color;
  const stroke = outline ? { stroke: color, strokeWidth: 1.5 } : {};
  const dash = <rect x="20" y="14" width="14" height="4" rx="2" fill={fill} {...stroke} />;
  const bracket = <path d="M46 4 H56 V28 H46" fill="none" stroke={color} strokeWidth="4" strokeLinecap="square" />;
  return (
    <svg
      viewBox={`0 0 ${w} 32`}
      height={h}
      width={(h * w * stretch) / 32}
      preserveAspectRatio="none"
      role="img"
      aria-label={label ?? MARK_NAME[kind]}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {kind === 'accent' && <path d="M9 30 L17 2 L23 2 L13 30 Z" fill={fill} {...stroke} />}
      {kind === 'bang' && (
        <>
          <rect x="5" y="2" width="6" height="19" rx="3" fill={fill} {...stroke} />
          <circle cx="8" cy="27" r="3.2" fill={fill} {...stroke} />
        </>
      )}
      {(kind === 'cbb' || kind === 'semi') && (
        <>
          <circle cx="8" cy="9" r="3.5" fill={fill} {...stroke} />
          <circle cx="8" cy="23" r="3.5" fill={fill} {...stroke} />
          {kind === 'semi' && <path d="M9 25 L5 31" stroke={color} strokeWidth="2.6" strokeLinecap="round" />}
          {dash}
          {bracket}
        </>
      )}
      {kind === 'greater' && (
        <path d="M5 6 L22 16 L5 26" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {kind === 'hash' && (
        <g stroke={color} strokeWidth="3.5" strokeLinecap="round">
          <line x1="11" y1="4" x2="8" y2="28" />
          <line x1="23" y1="4" x2="20" y2="28" />
          <line x1="4" y1="12" x2="28" y2="12" />
          <line x1="4" y1="21" x2="28" y2="21" />
        </g>
      )}
      {kind === 'trim' && (
        <path d="M3 18 C8 9, 14 9, 16 16 C18 23, 24 23, 29 14" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
      )}
      {kind === 'pipe' && <path d="M6 2 L12 2 L26 30 L20 30 Z" fill={fill} {...stroke} />}
    </svg>
  );
}

const Panel = ({ children, bg, fg = INK, className = '' }: { children: React.ReactNode; bg: string; fg?: string; className?: string }) => (
  <div className={`rounded-md p-4 ${className}`} style={{ background: bg, color: fg }}>
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* ELEVATION                                                           */
/* ------------------------------------------------------------------ */

const LAYERS = [
  { n: 'canvas', z: 0, bg: '#FAF8F5', note: 'The page itself' },
  { n: 'surface', z: 1, bg: '#F3EFE9', note: 'Cards, panels, table bodies' },
  { n: 'raised', z: 10, bg: '#FFFFFF', note: 'Sticky bars, hovered cards' },
  { n: 'overlay', z: 100, bg: '#FFFFFF', note: 'Menus, popovers, tooltips' },
  { n: 'modal', z: 200, bg: '#FFFFFF', note: 'Dialogs with a scrim' },
];

function ElevationLayers() {
  return (
    <Stage label="Five layers, one rule" caption="Each step up gets a lighter fill and a 1px border. Shadow appears only on overlay and modal, where the thing really does float.">
      <div className="relative mx-auto max-w-[520px] h-[300px]" role="group" aria-label="Elevation layers stacked">
        {LAYERS.map((l, i) => (
          <div
            key={l.n}
            className="absolute rounded-md border border-[#111827]/40 p-3"
            style={{
              left: i * 28,
              top: i * 40,
              right: (LAYERS.length - 1 - i) * 28,
              bottom: 0,
              background: l.bg,
              boxShadow: i >= 3 ? `0 ${i * 4}px ${i * 10}px rgba(17,24,39,0.18)` : 'none',
            }}
          >
            <p className="text-xs font-mono uppercase tracking-wider text-[#111827]">
              {l.n} <span className="tabular-nums text-[#4B5563]">z {l.z}</span>
            </p>
            {i === LAYERS.length - 1 && <p className="mt-1 text-sm text-[#4B5563]">{l.note}</p>}
          </div>
        ))}
      </div>
    </Stage>
  );
}

function ElevationShadowToggle() {
  const [lvl, setLvl] = useState<'none' | 'menu' | 'modal'>('menu');
  const shadow = { none: 'none', menu: '0 4px 12px rgba(17,24,39,0.14)', modal: '0 16px 40px rgba(17,24,39,0.22)' }[lvl];
  return (
    <Stage
      label="Shadow tokens"
      controls={<Seg label="Shadow level" value={lvl} onChange={setLvl} options={[{ id: 'none', label: 'none' }, { id: 'menu', label: 'menu' }, { id: 'modal', label: 'modal' }]} />}
      caption="Shadow is a tint, not a style. Ink at 14% and 22% opacity, never a colour, never a glow."
    >
      <div className="grid place-items-center min-h-[160px] bg-[#F3EFE9] rounded-md border border-[#111827]/20 p-4">
        <div className="rounded-md border border-[#111827]/40 bg-white p-4 w-full max-w-[300px] text-sm" style={{ boxShadow: shadow }}>
          <p className="font-medium">Sort by</p>
          <p className="text-[#4B5563] tabular-nums break-words">box-shadow: {shadow}</p>
        </div>
      </div>
    </Stage>
  );
}

function ElevationDoBorders() {
  return (
    <DoDont
      label="Borders over shadows for resting cards"
      doExample={
        <div className="w-full max-w-[240px] rounded-md border border-[#111827]/40 bg-[#F3EFE9] p-4 text-sm">
          <p className="font-semibold">Quarterly report</p>
          <p className="text-[#4B5563]">Draft, 12 pages</p>
        </div>
      }
      dontExample={
        <div className="w-full max-w-[240px] rounded-xl bg-white p-4 text-sm" style={{ boxShadow: '0 20px 45px -5px rgba(17,24,39,0.45), 0 8px 12px rgba(212,73,131,0.35)' }}>
          <p className="font-semibold">Quarterly report</p>
          <p className="text-[#4B5563]">Draft, 12 pages</p>
        </div>
      }
      doWhy="A 1px border at 40% ink holds the edge on any background and costs nothing to render."
      dontWhy="A big tinted shadow makes a resting card look like it is hovering, blurs the edge, and disappears on dark rooms."
    />
  );
}

function ElevationDoCardInCard() {
  const inner = 'rounded-md border border-[#111827]/30 p-3 text-sm';
  return (
    <DoDont
      label="No cards inside cards"
      doExample={
        <div className="w-full max-w-[260px] rounded-md border border-[#111827]/40 bg-[#F3EFE9] p-4 text-sm">
          <p className="font-semibold">Invoice 1042</p>
          <dl className="mt-2 divide-y divide-[#111827]/15 tabular-nums">
            <div className="flex justify-between py-1.5"><dt>Design</dt><dd>$1,200.00</dd></div>
            <div className="flex justify-between py-1.5"><dt>Hosting</dt><dd>$48.00</dd></div>
          </dl>
        </div>
      }
      dontExample={
        <div className="w-full max-w-[260px] rounded-md border border-[#111827]/40 bg-[#F3EFE9] p-4 text-sm shadow-md">
          <p className="font-semibold">Invoice 1042</p>
          <div className={`${inner} mt-2 bg-white shadow`}>
            <div className={`${inner} flex justify-between bg-[#FAF8F5] shadow-sm`}><span>Design</span><span>$1,200.00</span></div>
            <div className={`${inner} mt-2 flex justify-between bg-[#FAF8F5] shadow-sm`}><span>Hosting</span><span>$48.00</span></div>
          </div>
        </div>
      }
      doWhy="One card, hairline dividers. The invoice reads as one object and the amounts line up."
      dontWhy="Three nested boxes eat padding on every side, shrink the text column, and make the reader work out which edge matters."
    />
  );
}

function ElevationDoScrim() {
  return (
    <DoDont
      label="Overlays need an opaque fill and a scrim"
      doExample={
        <div className="relative h-[150px] w-full max-w-[260px] overflow-hidden rounded-md border border-[#111827]/30 bg-[#FAF8F5]">
          <p className="p-3 text-sm text-[#4B5563]">Page content sits behind the scrim and stays out of the way of the dialog.</p>
          <div className="absolute inset-0 bg-[#111827]/50" />
          <div className="absolute left-4 right-4 top-6 rounded-md border border-[#111827]/50 bg-white p-3 text-sm" style={{ boxShadow: '0 16px 40px rgba(17,24,39,0.22)' }}>
            <p className="font-semibold">Delete draft?</p>
          </div>
        </div>
      }
      dontExample={
        <div className="relative h-[150px] w-full max-w-[260px] overflow-hidden rounded-md border border-[#111827]/30 bg-[#FAF8F5]">
          <p className="p-3 text-sm text-[#4B5563]">Page content sits behind the dialog and shows straight through it, fighting with the title.</p>
          <div className="absolute left-4 right-4 top-6 rounded-md bg-white/30 p-3 text-sm">
            <p className="font-semibold">Delete draft?</p>
          </div>
        </div>
      }
      doWhy="Opaque panel, 50% ink scrim. Foreground and background can never be confused."
      dontWhy="A translucent panel lets body copy bleed through the heading, so contrast depends on whatever sits underneath."
    />
  );
}

function ElevationRedline() {
  return (
    <Stage label="Redline: menu on a card" caption="Overlay anatomy: 8px padding, 44px items, 1px border, 200px minimum width, 8px gap to the trigger.">
      <div className="inline-block">
        <Btn tone="ghost">Sort</Btn>
        <div className="mt-2 flex items-start gap-3">
          <DimV height={8 + 44 * 2 + 8} label="" />
          <div className="w-[200px] rounded-md border border-[#111827]/50 bg-white p-2" style={{ boxShadow: '0 4px 12px rgba(17,24,39,0.14)' }} role="menu" aria-label="Sort options">
            {['Newest first', 'Oldest first'].map((t) => (
              <button key={t} role="menuitem" type="button" className={`flex min-h-[44px] w-full items-center rounded px-2 text-left text-sm hover:bg-[#F3EFE9] ${RING}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="self-center text-xs font-mono leading-5 text-[#A3285C]">
            <p>pad 8</p>
            <p>item 44</p>
            <p>total 104</p>
          </div>
        </div>
        <div className="mt-6 ml-8"><DimH width={200} label="200 min" /></div>
      </div>
    </Stage>
  );
}

function ElevationAxFocusTrap() {
  return (
    <Stage label="Layer order is focus order" caption="When a modal opens, Tab cycles through 1, 2, 3 and back to 1. Everything on the layer below is inert. Escape closes and returns focus to the button that opened it.">
      <div className="mx-auto max-w-[380px] rounded-md border border-[#111827]/30 bg-[#F3EFE9] p-4">
        <p className="text-sm text-[#4B5563]">Inert page layer (not focusable while the dialog is open)</p>
        <div className="relative mt-6 rounded-md border border-[#111827]/50 bg-white p-4" role="group" aria-label="Dialog example" style={{ boxShadow: '0 16px 40px rgba(17,24,39,0.22)' }}>
          <p className="text-sm font-semibold">Delete this draft?</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <span className="relative"><Btn tone="ghost">Keep draft</Btn><FocusMark n={1} className="-top-2 -left-2" /></span>
            <span className="relative"><Btn>Delete draft</Btn><FocusMark n={2} className="-top-2 -left-2" /></span>
          </div>
          <span className="absolute -top-6 right-0"><HitBox w={44} h={44}><span className="text-xs font-mono" aria-hidden>Esc</span></HitBox></span>
          <FocusMark n={3} className="-top-8 right-10" />
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* DARK THEME                                                          */
/* ------------------------------------------------------------------ */

const DARK_LADDER = [
  { n: 'canvas', hex: '#0B0F14' },
  { n: 'surface', hex: '#111822' },
  { n: 'raised', hex: '#1E293B' },
  { n: 'overlay', hex: '#263349' },
  { n: 'modal', hex: '#2F3E57' },
];

function DarkToggle() {
  const [mode, setMode] = useState<'light' | 'dark' | 'inverted'>('dark');
  const p = {
    light: { bg: '#FAF8F5', card: '#F3EFE9', ink: '#111827', muted: '#4B5563', acc: '#A3285C', border: 'rgba(17,24,39,0.4)' },
    dark: { bg: '#0B0F14', card: '#1E293B', ink: '#E8EEF6', muted: '#94A3B8', acc: '#F4A3C3', border: 'rgba(232,238,246,0.25)' },
    inverted: { bg: '#050A00', card: '#0C0602', ink: '#EEE7DE', muted: '#B4ACA2', acc: '#2BB67C', border: 'rgba(238,231,222,0.25)' },
  }[mode];
  return (
    <Stage
      surface="none"
      label="Dark is its own design"
      controls={<Seg label="Theme" value={mode} onChange={setMode} options={[{ id: 'light', label: 'Light' }, { id: 'dark', label: 'Designed dark' }, { id: 'inverted', label: 'Auto-inverted' }]} />}
      caption={
        <>
          Designed dark swaps the pink for a pastel (<span className="tabular-nums">{fmt(ratio('#F4A3C3', '#1E293B'))}:1</span> on raised) and lifts surfaces by lightness. Auto-invert turns pink into green and every cream into a muddy brown.
        </>
      }
    >
      <div className="p-4 sm:p-6" style={{ background: p.bg, color: p.ink }}>
        <div className="mx-auto max-w-[360px] rounded-md p-4" style={{ background: p.card, border: `1px solid ${p.border}` }}>
          <p className="text-xs font-mono uppercase tracking-wider" style={{ color: p.muted }}>Order 2041</p>
          <h4 className="mt-1 font-serif text-xl">Your site is live</h4>
          <p className="mt-1 text-sm leading-6" style={{ color: p.muted }}>Three pages published. Next up: connect a domain.</p>
          <p className="mt-3 text-sm font-medium underline underline-offset-4" style={{ color: p.acc }}>Connect domain</p>
        </div>
      </div>
    </Stage>
  );
}

function DarkLadder() {
  return (
    <Stage surface="dark" label="Surface ladder" caption="Each step is a little lighter than the one below. Text is #E8EEF6 throughout; the ratio drops as the fill rises and still clears 9:1.">
      <ol className="m-0 grid list-none gap-2 p-0 sm:grid-cols-5">
        {DARK_LADDER.map((l) => (
          <li key={l.n} className="rounded-md border border-white/20 p-3" style={{ background: l.hex }}>
            <p className="text-xs font-mono uppercase text-[#E8EEF6]">{l.n}</p>
            <p className="mt-1 text-xs font-mono tabular-nums text-[#E8EEF6]">{l.hex}</p>
            <p className="mt-2 text-sm tabular-nums text-[#E8EEF6]">{fmt(ratio('#E8EEF6', l.hex))}:1</p>
          </li>
        ))}
      </ol>
    </Stage>
  );
}

function DarkRoomsContrast() {
  const rows = Object.values(PIPE_BRANDS);
  return (
    <Stage label="The 12 rooms, measured" caption="Live from PIPE_BRANDS. Ink on wash is AAA in every room. Muted text lands between 5.07 and 7.50. Accent is text-safe only where the card says so.">
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((b) => {
          const c = b.colors;
          const acc = ratio(c.accent, c.wash);
          return (
            <li key={b.id} className="rounded-md border border-[#111827]/30 p-3" style={{ background: c.wash, color: c.ink }}>
              <div className="flex items-center justify-between gap-2">
                <span className="font-serif text-base">{b.label}</span>
                <span className="text-xs font-mono uppercase" style={{ color: c.muted }}>{b.mode}</span>
              </div>
              <p className="mt-2 text-sm tabular-nums">Ink {fmt(ratio(c.ink, c.wash))}:1</p>
              <p className="text-sm tabular-nums" style={{ color: c.muted }}>Muted {fmt(ratio(c.muted, c.wash))}:1</p>
              <p className="text-sm tabular-nums" style={{ color: c.ink }}>
                Accent {fmt(acc)}:1 {acc >= 4.5 ? '(text ok)' : '(graphics only)'}
              </p>
              <span className="mt-1 inline-block h-2 w-full rounded-sm" style={{ background: c.accent }} aria-hidden />
            </li>
          );
        })}
      </ul>
    </Stage>
  );
}

function DarkDoNotBlack() {
  return (
    <DoDont
      surface="dark"
      label="No pure black, no pure white"
      doExample={
        <div className="w-full max-w-[240px] rounded-md border border-white/20 p-4" style={{ background: '#111822' }}>
          <p className="text-sm font-semibold" style={{ color: '#E8EEF6' }}>Weekly summary</p>
          <p className="mt-1 text-sm leading-6" style={{ color: '#94A3B8' }}>Visits are up. Two pages need a new photo.</p>
        </div>
      }
      dontExample={
        <div className="w-full max-w-[240px] p-4" style={{ background: '#000000' }}>
          <p className="text-sm font-semibold" style={{ color: '#FFFFFF' }}>Weekly summary</p>
          <p className="mt-1 text-sm leading-6" style={{ color: '#FFFFFF' }}>Visits are up. Two pages need a new photo.</p>
        </div>
      }
      doWhy="Tonal dark with off-white text (15.28:1) is easy to read for an hour."
      dontWhy="#FFF on #000 is 21:1. The glare makes letters bloom (halation) and flattens the difference between title and body."
    />
  );
}

function DarkDoPastel() {
  return (
    <DoDont
      surface="dark"
      label="Pastel accents on dark"
      doExample={
        <div className="w-full max-w-[240px] rounded-md border border-white/20 bg-[#111822] p-4 text-sm">
          <p style={{ color: '#E8EEF6' }}>Plan expires in 3 days.</p>
          <p className="mt-2 font-medium underline underline-offset-4" style={{ color: '#F4A3C3' }}>Renew plan ({fmt(ratio('#F4A3C3', '#111822'))}:1)</p>
        </div>
      }
      dontExample={
        <div className="w-full max-w-[240px] bg-black p-4 text-sm">
          <p style={{ color: '#E8EEF6' }}>Plan expires in 3 days.</p>
          <p className="mt-2 font-medium underline underline-offset-4" style={{ color: '#FF0066' }}>Renew plan ({fmt(ratio('#FF0066', '#000000'))}:1)</p>
        </div>
      }
      doWhy="Lighten and desaturate the brand pink for dark. Same hue, calmer, well past 7:1."
      dontWhy="Fully saturated pink on black vibrates at the letter edges and misses AAA for body-size links."
    />
  );
}

function DarkDoImages() {
  return (
    <DoDont
      surface="dark"
      label="Images in dark rooms"
      doExample={
        <div className="w-full max-w-[240px] overflow-hidden rounded-md border border-white/20">
          <div className="h-[104px] overflow-hidden" style={{ filter: 'brightness(0.84) contrast(1.02)' }}>
            <EditorialPlate i={2} className="h-full w-full" label="Pale print poster study dimmed 16% to sit comfortably in a dark room" />
          </div>
          <p className="bg-[#111822] p-3 text-sm text-[#E8EEF6]">Dimmed to 84%, 1px border.</p>
        </div>
      }
      dontExample={
        <div className="w-full max-w-[240px] overflow-hidden rounded-md">
          <div className="h-[104px] overflow-hidden bg-white p-2">
            <EditorialPlate i={2} className="h-full w-full brightness-110" label="Full-white studio print study with no border on dark canvas" />
          </div>
          <p className="bg-[#111822] p-3 text-sm text-[#E8EEF6]">Full white ground, no edge.</p>
        </div>
      }
      doWhy="Brightness at ~84% and a 1px hairline border keep a bright studio plate from acting like a floodlight in a dark room."
      dontWhy="An undimmed white-ground graphic on a dark surface becomes the brightest object on screen and pulls the eye off the headline."
    />
  );
}

function DarkRedline() {
  return (
    <Stage surface="dark" label="Redline: three steps of the ladder" caption="The card sits on surface with a 1px border at 25% white. The inner chip uses raised. Padding 16, radius 12.">
      <div className="inline-block rounded-xl border border-white/25 bg-[#111822] p-4">
        <DimH width={16} label="16" />
        <div className="mt-6 flex items-center gap-3">
          <div className="rounded-md border border-white/25 bg-[#1E293B] px-4 py-3 text-sm text-[#E8EEF6]">raised #1E293B</div>
          <DimV height={48} label="48" />
        </div>
        <p className="mt-3 text-xs font-mono text-[#E8EEF6]">surface #111822 on canvas #0B0F14</p>
      </div>
    </Stage>
  );
}

function DarkAxContrast() {
  const pairs: [string, string, string][] = [
    ['Body', '#E8EEF6', '#111822'],
    ['Muted', '#94A3B8', '#111822'],
    ['Muted on modal', '#94A3B8', '#2F3E57'],
    ['Pastel pink', '#F4A3C3', '#111822'],
    ['Brand pink', '#D44983', '#111822'],
  ];
  return (
    <Stage surface="dark" label="Contrast chips" caption="Under 4.5 is a bug for text. Muted-on-modal fails, so muted copy never goes on the top two steps of the ladder. Brand pink passes AA only, so it is for graphics and large text.">
      <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
        {pairs.map(([n, fg, bg]) => {
          const r = ratio(fg, bg);
          const pass = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : 'Fail';
          return (
            <li key={n} className="flex items-center justify-between gap-3 rounded-md border border-white/20 p-3" style={{ background: bg }}>
              <span className="text-sm" style={{ color: fg }}>{n}</span>
              <span className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#E8EEF6]">
                {fmt(r)}:1 <Tag tone={pass === 'Fail' ? 'bad' : 'good'}>{pass}</Tag>
              </span>
            </li>
          );
        })}
      </ul>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* WRITING                                                             */
/* ------------------------------------------------------------------ */

const Small = ({ children }: { children: React.ReactNode }) => <div className="w-full max-w-[260px] rounded-md border border-[#111827]/30 bg-white p-4 text-sm">{children}</div>;

function WritingRewriteLab() {
  const [i, setI] = useState<'a' | 'b' | 'c'>('a');
  const rows = {
    a: ['We are delighted to announce a seamless, robust new way to unlock your potential.', 'You can now publish your site in one click.'],
    b: ['Oops! Something went wrong. Please try again later.', 'We could not save your page because you are offline. Reconnect and press Save again.'],
    c: ['Are you sure you want to proceed with this action?', 'Delete 3 pages? You cannot undo this.'],
  }[i];
  return (
    <Stage
      label="Rewrite lab"
      controls={<Seg label="Example" value={i} onChange={setI} options={[{ id: 'a', label: 'Launch' }, { id: 'b', label: 'Error' }, { id: 'c', label: 'Confirm' }]} />}
      caption="Same information, fewer words. The rewrite names the thing and says what happens next."
    >
      <div className="grid gap-3 md:grid-cols-2">
        <Panel bg="#FFFFFF" className="border border-[#9F1239]/50"><Tag tone="bad">Before</Tag><p className="mt-2 text-sm leading-6">{rows[0]}</p></Panel>
        <Panel bg="#FFFFFF" className="border border-[#166534]/50"><Tag tone="good">After</Tag><p className="mt-2 text-sm leading-6">{rows[1]}</p></Panel>
      </div>
    </Stage>
  );
}

function WritingDoButtons() {
  return (
    <DoDont
      label="Button labels: verb plus noun"
      doExample={<div className="flex flex-wrap gap-2"><Btn>Save draft</Btn><Btn tone="ghost">Discard draft</Btn></div>}
      dontExample={<div className="flex flex-wrap gap-2"><Btn>OK</Btn><Btn tone="ghost">Click here</Btn></div>}
      doWhy="The label finishes the sentence “I want to…”, so the choice makes sense without the paragraph above."
      dontWhy="“OK” and “Click here” force the reader to scroll up and decode what each button does."
    />
  );
}

function WritingDoErrors() {
  return (
    <DoDont
      label="Error messages: what, why, fix"
      doExample={
        <Small>
          <p className="font-semibold text-[#9F1239]">Card not accepted</p>
          <p className="mt-1 leading-6">The expiry date has passed. Check the date on the card, or use a different one.</p>
        </Small>
      }
      dontExample={
        <Small>
          <p className="font-semibold text-[#9F1239]">Error 4032</p>
          <p className="mt-1 leading-6">Oops! Something went wrong. Please try again later.</p>
        </Small>
      }
      doWhy="It says what failed, why, and what to do. Nobody needs a support ticket."
      dontWhy="A code, a shrug and a cheerful “oops” explain nothing. The reader cannot fix what the message will not name."
    />
  );
}

function WritingDoEmpty() {
  return (
    <DoDont
      label="Empty states"
      doExample={
        <Small>
          <p className="font-semibold">No invoices yet</p>
          <p className="mb-3 mt-1 leading-6 text-[#4B5563]">Invoices you send appear here, newest first.</p>
          <Btn>Create invoice</Btn>
        </Small>
      }
      dontExample={
        <Small>
          <p className="italic text-[#4B5563]">Nothing to see here!</p>
        </Small>
      }
      doWhy="A title that states the fact, one line on what belongs here, and the single next step."
      dontWhy="A blank with a quip leaves a first-time user stuck with no way forward."
    />
  );
}

function WritingDoConfirm() {
  return (
    <DoDont
      label="Confirmation copy"
      doExample={
        <Small>
          <p className="font-semibold">Delete 3 pages?</p>
          <p className="mb-3 mt-1 leading-6 text-[#4B5563]">This cannot be undone.</p>
          <div className="flex flex-wrap gap-2"><Btn tone="ghost">Keep pages</Btn><Btn>Delete pages</Btn></div>
        </Small>
      }
      dontExample={
        <Small>
          <p className="font-semibold">Are you sure you want to proceed?</p>
          <div className="mt-3 flex gap-2"><Btn tone="ghost">No</Btn><Btn>Yes</Btn></div>
        </Small>
      }
      doWhy="The title names the count and the verb. Buttons repeat the action, so nothing depends on how the question was read."
      dontWhy="“Proceed” with what? Yes and No flip meaning depending on how the reader parsed the question."
    />
  );
}

function WritingNumbers() {
  const rows: [string, string, string][] = [
    ['Currency', '$1,234.50', '1234.5 dollars'],
    ['Date', '14 Mar 2026', '3/14/26'],
    ['Time', '4:30 PM MT', '16h30'],
    ['Range', '10 to 20 minutes', '10-20min'],
    ['Count', '1,204 visits', '1204 Visits'],
  ];
  return (
    <Stage label="Numbers, dates, currency" caption="Spell the month so 3/4 never means two things. Use digits for every number in the interface, and keep them tabular so columns line up.">
      <table className="w-full text-sm">
        <caption className="sr-only">Formatting examples, correct and incorrect</caption>
        <thead><tr className="text-left text-xs font-mono uppercase text-[#4B5563]"><th className="py-2 pr-3">Kind</th><th className="py-2 pr-3">Write</th><th className="py-2">Not</th></tr></thead>
        <tbody className="tabular-nums">
          {rows.map(([k, a, b]) => (
            <tr key={k} className="border-t border-[#111827]/20">
              <th scope="row" className="py-2 pr-3 text-left font-medium">{k}</th>
              <td className="py-2 pr-3 text-[#166534]">{a}</td>
              <td className="py-2 text-[#9F1239] line-through">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Stage>
  );
}

function WritingRedline() {
  return (
    <Stage label="Redline: an error message" caption="Title is one line, body stays within 65 characters, the action is a 44px button. Measure is set in ch, not pixels.">
      <div className="max-w-full">
        <div className="mb-6"><DimH width="min(65ch, 100%)" label="65ch max" /></div>
        <div className="flex items-start gap-3">
          <div className="max-w-[65ch] rounded-md border border-[#9F1239]/60 bg-white p-4">
            <p className="text-base font-semibold text-[#9F1239]">Card not accepted</p>
            <p className="mt-1 text-sm leading-6">The expiry date has passed. Check the date on the card, or use a different one.</p>
            <div className="mt-3"><Btn>Use another card</Btn></div>
          </div>
          <DimV height={44} label="44" />
        </div>
      </div>
    </Stage>
  );
}

function WritingAxScreenReader() {
  return (
    <Stage label="What a screen reader hears" caption="Links and buttons are read out of context, as a list. “Read more” six times is useless; a name that stands alone is not.">
      <div className="grid gap-3 text-sm md:grid-cols-2">
        <Panel bg="#FFFFFF" className="border border-[#9F1239]/50">
          <Tag tone="bad">Reads as</Tag>
          <ul className="mt-2 list-disc space-y-1 pl-5"><li>link, Read more</li><li>link, Read more</li><li>button, Click here</li></ul>
        </Panel>
        <Panel bg="#FFFFFF" className="border border-[#166534]/50">
          <Tag tone="good">Reads as</Tag>
          <ul className="mt-2 list-disc space-y-1 pl-5"><li>link, Read the pricing guide</li><li>link, Read the refund policy</li><li>button, Download invoice</li></ul>
        </Panel>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <a href="#writing-ax" onClick={(e) => e.preventDefault()} className={`inline-flex min-h-[44px] items-center text-[#A3285C] underline underline-offset-4 ${RING}`}>
          Read more<span className="sr-only"> about the refund policy</span>
        </a>
        <span className="text-[#4B5563]">Visible text stays short; <code className="font-mono text-xs">sr-only</code> finishes the name.</span>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* BRAND                                                               */
/* ------------------------------------------------------------------ */

const MARK_ORDER: { k: MarkKind; note: string }[] = [
  { k: 'accent', note: 'Design system' },
  { k: 'bang', note: 'Website builder' },
  { k: 'cbb', note: 'The studio' },
  { k: 'semi', note: 'Companion / Ask' },
  { k: 'greater', note: 'Chatbot' },
  { k: 'hash', note: 'Journaling app' },
  { k: 'trim', note: 'Editing tool' },
  { k: 'pipe', note: 'Namespace path' },
];

function BrandMarksSheet() {
  return (
    <Stage label="The punctuation suite" caption="Eight marks, one grid: 32 units tall, 4-unit strokes, round terminals on dots, square on the bracket.">
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-4">
        {MARK_ORDER.map((m) => (
          <li key={m.k} className="flex flex-col items-center gap-3 rounded-md border border-[#111827]/25 bg-[#F3EFE9] p-4 text-center">
            <div className="grid h-[80px] place-items-center"><Mark kind={m.k} h={56} /></div>
            <p className="text-sm font-semibold">{MARK_NAME[m.k]}</p>
            <p className="text-xs text-[#4B5563]">{m.note}</p>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

function BrandConstruction() {
  const x = 64;
  return (
    <Stage label="Clear space" caption={`Clear space on all four sides equals the height of the mark, x (here ${x}px). Nothing enters the dashed box: not text, not an edge, not another logo.`}>
      <div className="grid place-items-center overflow-x-auto">
        <div className="relative border border-dashed border-[#D44983]" style={{ padding: x }}>
          <Mark kind="accent" h={x} />
          <span className="absolute left-1/2 top-0 -translate-x-1/2 bg-[#FAF8F5] px-1 text-xs font-mono text-[#A3285C]">x = {x}</span>
          <span className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#FAF8F5] px-1 text-xs font-mono text-[#A3285C]">x</span>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#FAF8F5] px-1 text-xs font-mono text-[#A3285C]">x</span>
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-[#FAF8F5] px-1 text-xs font-mono text-[#A3285C]">x</span>
        </div>
      </div>
    </Stage>
  );
}

function BrandDoClearSpace() {
  return (
    <DoDont
      label="Clear space"
      doExample={<div className="flex items-center gap-6 p-2"><Mark kind="bang" h={40} /><span className="text-sm text-[#4B5563]">Bang, launched this spring</span></div>}
      dontExample={<div className="flex items-center gap-0.5"><Mark kind="bang" h={40} /><span className="text-sm text-[#4B5563]">Bang, launched this spring</span></div>}
      doWhy="Air around the mark, at least half its height beside running text and a full height everywhere else."
      dontWhy="Text touching the mark turns it into a typographic accident, and the silhouette stops reading as a symbol."
    />
  );
}

function BrandDoWrongUses() {
  return (
    <DoDont
      label="Never distort or recolour"
      doExample={
        <div className="flex items-center gap-6">
          <Mark kind="cbb" h={40} />
          <Mark kind="accent" h={40} color={INK} />
        </div>
      }
      dontExample={
        <div className="flex items-center gap-4">
          <Mark kind="cbb" h={40} stretch={1.6} />
          <Mark kind="accent" h={40} color="#22D3EE" outline />
        </div>
      }
      doWhy="Original proportions, in pink or in ink. One colour, filled."
      dontWhy="Stretching breaks the 4-unit stroke, and outline plus off-palette cyan turns a mark into clip art."
    />
  );
}

function BrandColourVersions() {
  const tiles: { n: string; bg: string; fg: string; border?: boolean; label: string }[] = [
    { n: 'Pink on Alabaster', bg: '#FAF8F5', fg: PINK, border: true, label: '#4B5563' },
    { n: 'Ink, one colour', bg: '#FFFFFF', fg: INK, border: true, label: '#4B5563' },
    { n: 'Reversed on Ink', bg: INK, fg: '#FFFFFF', label: '#E8EEF6' },
    { n: 'Pastel on dark', bg: '#111822', fg: '#F4A3C3', label: '#E8EEF6' },
  ];
  return (
    <Stage label="Colour versions" caption="Four sanctioned versions. Pink needs 3:1 against its ground as a graphic (3.90 on Alabaster); on dark, switch to the pastel or to white.">
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4">
        {tiles.map((t) => (
          <li key={t.n} className={`rounded-md p-4 text-center ${t.border ? 'border border-[#111827]/25' : ''}`} style={{ background: t.bg }}>
            <div className="grid h-[64px] place-items-center"><Mark kind="semi" h={40} color={t.fg} /></div>
            <p className="mt-2 text-xs font-mono tabular-nums" style={{ color: t.label }}>
              {t.n} {fmt(ratio(t.fg, t.bg))}:1
            </p>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

function BrandMinSizes() {
  const sizes = [16, 24, 32, 48];
  return (
    <Stage label="Redline: minimum sizes" caption="Digital minimum is 16px tall for the single-glyph marks and 20px for the two-glyph faces (:-] and ;-]), where the dots must stay at least 3px.">
      <div className="flex flex-wrap items-end gap-8 pl-2">
        {sizes.map((s) => (
          <div key={s} className="flex items-end gap-1">
            <Mark kind="accent" h={s} />
            <DimV height={s} label={`${s}`} />
          </div>
        ))}
        <div className="flex items-end gap-1"><Mark kind="cbb" h={20} /><DimV height={20} label="20" /></div>
      </div>
      <div className="mt-8"><DimH width={64} label="64 wide (:-] at 20)" /></div>
    </Stage>
  );
}

function BrandNewProduct() {
  const steps: [string, string, string][] = [
    ['1', 'Pick a mark already on your readers’ keyboards', 'Any punctuation shared by most written languages. Skip anything that means something rude somewhere.'],
    ['2', 'Say what it means in one sentence', '“Pause and emphasis”, “path”, “wink”. If you need two sentences, pick another.'],
    ['3', 'Draw it on the 32-unit grid', 'Same stroke, same terminals. Test it at 16px.'],
    ['4', 'Name it in words too', 'The mark is never the only name. Screen readers need “Accént”, not “acute accent”.'],
  ];
  return (
    <Stage label="How a new product gets a mark" caption="Four steps, in order. The mark follows the product; no product follows a mark it has not earned.">
      <ol className="m-0 list-none space-y-2 p-0">
        {steps.map(([n, t, d]) => (
          <li key={n} className="flex gap-3 rounded-md border border-[#111827]/25 bg-white p-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#111827] text-sm font-mono tabular-nums text-white">{n}</span>
            <div><p className="text-sm font-semibold">{t}</p><p className="text-sm leading-6 text-[#4B5563]">{d}</p></div>
          </li>
        ))}
      </ol>
    </Stage>
  );
}

function BrandAxNames() {
  return (
    <Stage label="Marks need names" caption="Decorative marks get aria-hidden. Marks that stand alone get an accessible name. Punctuation is read aloud as “acute accent” or silence, so supply the word.">
      <div className="grid gap-3 text-sm md:grid-cols-2">
        <Panel bg="#FFFFFF" className="border border-[#9F1239]/50">
          <Tag tone="bad">Unnamed</Tag>
          <div>
            <a href="#brand-ax" onClick={(e) => e.preventDefault()} className={`mt-3 inline-grid min-h-[44px] min-w-[44px] place-items-center ${RING}`}>
              <span aria-hidden className="font-serif text-3xl text-[#D44983]">´</span>
            </a>
          </div>
          <p className="mt-2 text-[#4B5563]">Announced as “link” with no name.</p>
        </Panel>
        <Panel bg="#FFFFFF" className="border border-[#166534]/50">
          <Tag tone="good">Named</Tag>
          <div>
            <a href="#brand-ax" onClick={(e) => e.preventDefault()} className={`mt-3 inline-grid min-h-[44px] min-w-[44px] place-items-center ${RING}`}>
              <Mark kind="accent" h={28} label="Accént home" />
            </a>
          </div>
          <p className="mt-2 text-[#4B5563]">Announced as “link, Accént home”. Hit area 44px.</p>
        </Panel>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */

export const DEMOS: Record<string, React.ComponentType> = {
  'elevation-layers': ElevationLayers,
  'elevation-shadow-toggle': ElevationShadowToggle,
  'elevation-do-borders': ElevationDoBorders,
  'elevation-do-card-in-card': ElevationDoCardInCard,
  'elevation-do-scrim': ElevationDoScrim,
  'elevation-redline-menu': ElevationRedline,
  'elevation-ax-focus-trap': ElevationAxFocusTrap,
  'dark-toggle': DarkToggle,
  'dark-ladder': DarkLadder,
  'dark-rooms-contrast': DarkRoomsContrast,
  'dark-do-not-black': DarkDoNotBlack,
  'dark-do-pastel': DarkDoPastel,
  'dark-do-images': DarkDoImages,
  'dark-redline-ladder': DarkRedline,
  'dark-ax-contrast': DarkAxContrast,
  'writing-rewrite-lab': WritingRewriteLab,
  'writing-do-buttons': WritingDoButtons,
  'writing-do-errors': WritingDoErrors,
  'writing-do-empty': WritingDoEmpty,
  'writing-do-confirm': WritingDoConfirm,
  'writing-numbers': WritingNumbers,
  'writing-redline-error': WritingRedline,
  'writing-ax-screenreader': WritingAxScreenReader,
  'brand-marks-sheet': BrandMarksSheet,
  'brand-construction': BrandConstruction,
  'brand-do-clearspace': BrandDoClearSpace,
  'brand-do-wrong-uses': BrandDoWrongUses,
  'brand-colour-versions': BrandColourVersions,
  'brand-min-sizes': BrandMinSizes,
  'brand-new-product': BrandNewProduct,
  'brand-ax-names': BrandAxNames,
};
