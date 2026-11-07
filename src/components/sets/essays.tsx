'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Stage, Seg } from '../primitives';

/* Figures for the five essays. Every sample site, number and bar here is
   illustrative: drawn for explanation, not measured from real products. */

const INK = '#111827';
const PINK = '#D44983';

/* ---------------- punctuation ---------------- */

const PAUSE_VARIANTS = [
  { mark: ',', text: 'We are open, today', read: 'a soft breath; the sentence keeps moving' },
  { mark: '.', text: 'We are open. Today', read: 'a full stop; two separate statements' },
  { mark: '!', text: 'We are open! Today', read: 'raised voice; the opening is the news' },
  { mark: '?', text: 'We are open? Today', read: 'doubt; someone is checking' },
  { mark: '—', text: 'We are open — today', read: 'a held beat; here comes the catch' },
];

function PauseStress() {
  const [i, setI] = useState(0);
  const v = PAUSE_VARIANTS[i];
  return (
    <Stage
      label="Same words, different marks"
      controls={<Seg value={String(i)} onChange={(x: string) => setI(Number(x))} label="Mark" options={PAUSE_VARIANTS.map((p, k) => ({ id: String(k), label: p.mark }))} />}
      caption="The letters never change. Only the mark does, and the meaning moves."
    >
      <p className="font-serif text-3xl sm:text-4xl leading-snug">{v.text}</p>
      <p className="mt-3 text-sm text-[#111827]/70">Reads as: {v.read}.</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2 text-base">
        {PAUSE_VARIANTS.map((p, k) => (
          <li key={p.mark} className={k === i ? 'font-semibold' : 'opacity-60'}>
            <span className="font-mono mr-2" style={{ color: PINK }}>{p.mark}</span>
            {p.text}
          </li>
        ))}
      </ul>
    </Stage>
  );
}

const SCRIPTS = [
  { name: 'Latin', q: '?', e: '!', c: ',', f: '.', lang: 'en' },
  { name: 'Arabic', q: '؟', e: '!', c: '،', f: '.', lang: 'ar' },
  { name: 'Chinese / Japanese', q: '？', e: '！', c: '，', f: '。', lang: 'zh' },
  { name: 'Devanagari (Hindi)', q: '?', e: '!', c: ',', f: '।', lang: 'hi' },
];

function MarksAcrossScripts() {
  const cols = [
    ['Question', 'q'],
    ['Exclamation', 'e'],
    ['Comma', 'c'],
    ['Full stop', 'f'],
  ] as const;
  return (
    <Stage
      label="Marks across scripts"
      caption="Shapes shift by script, but every one of these writing systems has a mark for each job. Modern Hindi borrowed ? and ! from Latin; the danda । is its own."
    >
      <div className="overflow-x-auto">
        <div className="grid min-w-[480px] grid-cols-[150px_repeat(4,1fr)] gap-y-2 items-center">
          <span />
          {cols.map(([l]) => (
            <span key={l} className="text-xs font-mono uppercase tracking-wider text-[#111827]/60">{l}</span>
          ))}
          {SCRIPTS.map((s) => (
            <React.Fragment key={s.name}>
              <span className="text-sm">{s.name}</span>
              {cols.map(([l, k]) => (
                <span key={l} lang={s.lang} className="text-3xl" style={{ color: k === 'e' ? PINK : INK }}>{s[k]}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Stage>
  );
}

const LOCKUPS = [
  ['´', 'Accént'],
  ['!', 'Bang'],
  [':-]', 'Colon Hyphen Bracket'],
  [';-]', 'Semi'],
  ['>', 'Greater'],
  ['#', 'Hash'],
  ['~', 'Trim'],
  ['\\', 'pipe'],
] as const;

function WordmarkLockups() {
  return (
    <Stage label="Family wordmark lockups" caption="Mark first, word second. The mark is real text, so it scales, selects and reads aloud like any other character.">
      <ul className="grid gap-3 sm:grid-cols-2">
        {LOCKUPS.map(([m, w]) => (
          <li key={w} className="flex items-baseline gap-3 rounded-md border border-[#111827]/10 bg-white/60 px-4 py-3">
            <span className="font-mono text-4xl leading-none" style={{ color: PINK }} aria-hidden>{m}</span>
            <span className="font-serif text-2xl">{w}</span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

/* ---------------- shadcn ---------------- */

function MiniSite({ kind }: { kind: 'generic' | 'rooms' }) {
  const g = kind === 'generic';
  const wash = g ? '#FFFFFF' : '#F3EFE9';
  const ink = g ? '#18181B' : INK;
  const border = g ? '1px solid #E4E4E7' : 'none';
  const radius = g ? 8 : '0 12px 0 12px';
  return (
    <div aria-hidden className="rounded-md overflow-hidden text-[13px]" style={{ background: wash, color: ink, border: '1px solid rgba(17,24,39,.12)' }}>
      <div className="flex justify-between px-3 py-2" style={{ borderBottom: border, background: g ? '#fff' : '#E8E2D5' }}>
        <b style={{ fontFamily: g ? 'var(--font-inter, sans-serif)' : 'var(--font-serif, serif)' }}>Sample Co.</b>
        <span>Menu</span>
      </div>
      <div className="px-3 py-6 text-center" style={{ background: g ? 'linear-gradient(135deg,#e0e7ff,#fce7f3)' : '#FAF8F5' }}>
        <div className="text-lg font-semibold" style={{ fontFamily: g ? 'var(--font-inter, sans-serif)' : 'var(--font-serif, serif)' }}>
          {g ? 'Build faster' : 'Sunday brunch'}
        </div>
        <div className="mt-1 opacity-70">{g ? 'Ship your idea today' : 'Eggs, bread, a good table'}</div>
        <span className="mt-3 inline-block px-3 py-1 text-white" style={{ background: g ? '#18181B' : PINK, borderRadius: g ? 6 : '0 8px 0 8px' }}>Get started</span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {[0, 1, 2].map((n) => (
          <div key={n} className="p-2 text-center" style={{ border, borderRadius: radius, background: g ? '#fff' : n === 1 ? '#fff' : '#E8E2D5', boxShadow: g && n === 1 ? '0 0 0 2px #18181B' : 'none' }}>
            <div>{g ? ['Free', 'Pro', 'Team'][n] : ['Plain', 'Fried', 'Sweet'][n]}</div>
            <div className="opacity-60">{g ? '$0' : '$9'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SameLayoutSites() {
  return (
    <Stage label="Same layout, different soul" caption="Sample content only. Left: the template an agent reaches for. Right: the same bones in an Accént room (Gallery here).">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><p className="mb-2 text-xs font-mono uppercase tracking-wider opacity-60">Generic AI template</p><MiniSite kind="generic" /></div>
        <div><p className="mb-2 text-xs font-mono uppercase tracking-wider opacity-60">Accént room</p><MiniSite kind="rooms" /></div>
      </div>
    </Stage>
  );
}

function FingerprintCompare() {
  const rows = [
    ['Radius', '8px on everything', '0 / 12px / 0 / 12px on cards, set per room'],
    ['Border', '1px zinc line around each box', 'surface contrast first, borders only where needed'],
    ['Spacing', 'whatever the generator typed (12, 13, 14, 18)', 'multiples of 8, sometimes 4'],
    ['Text floor', '12 to 14px labels', '13px minimum, 16px body'],
  ];
  return (
    <Stage label="Fingerprint comparison" caption="Illustrative values: a typical stock-token look next to the Accént rules.">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-4 border" style={{ borderRadius: 8, borderColor: '#E4E4E7', background: '#fff' }}>
          <p className="text-xs font-mono uppercase mb-2 opacity-60">Stock</p>
          {rows.map((r) => <p key={r[0]} className="text-sm mb-2"><b>{r[0]}:</b> {r[1]}</p>)}
        </div>
        <div className="p-4" style={{ borderRadius: '0 12px 0 12px', background: '#F3EFE9' }}>
          <p className="text-xs font-mono uppercase mb-2 opacity-60">Accént</p>
          {rows.map((r) => <p key={r[0]} className="text-sm mb-2"><b>{r[0]}:</b> {r[2]}</p>)}
        </div>
      </div>
    </Stage>
  );
}

function Box({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="rounded-md border border-[#111827]/20 p-3 text-sm" style={{ background: tone }}>
      <b className="block mb-1">{title}</b>
      <ul className="opacity-80">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}

function StateOwnership() {
  return (
    <Stage label="Who owns which state" caption="Simplified. The headless layer owns behaviour and accessibility; the skin only paints what it is told.">
      <div className="grid items-center gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <Box title="Radix / Base UI" tone="#E8E2D5" items={['open / closed', 'focus and keyboard', 'ARIA attributes']} />
        <span aria-hidden className="text-center text-2xl" style={{ color: PINK }}>→</span>
        <Box title="shadcn/ui" tone="#F3EFE9" items={['class names (cva)', 'stock tokens', 'copied into your repo']} />
        <span aria-hidden className="text-center text-2xl" style={{ color: PINK }}>→</span>
        <Box title="Accént rooms" tone="#fff" items={['room tokens', 'radius and spacing', 'floor rules']} />
      </div>
    </Stage>
  );
}

/* ---------------- relief & focus ---------------- */

function AlbersIllusion() {
  const grounds = ['#D9D2C3', '#8B6F4E', '#EDE6D9'];
  return (
    <Stage label="One colour, three grounds" caption="The small squares are the exact same pink (#D44983). Your eye will not agree.">
      <div className="grid grid-cols-3 gap-0">
        {grounds.map((g) => (
          <div key={g} className="flex h-40 items-center justify-center" style={{ background: g }}>
            <div className="h-14 w-14" style={{ background: PINK }} />
          </div>
        ))}
      </div>
    </Stage>
  );
}

function ReliefVsFocus() {
  const Card = ({ bad }: { bad?: boolean }) => (
    <div className="p-4 h-full" style={{ borderRadius: '0 12px 0 12px', background: '#F3EFE9' }}>
      <div className="h-14 mb-3" style={{ background: '#E8E2D5', borderRadius: 4 }} />
      <b className="block">Sample card</b>
      <span className="text-sm opacity-70">Quiet supporting line</span>
      <div className="mt-3 flex gap-2">
        <span className="px-3 py-1 text-sm text-white" style={{ background: PINK }}>Primary</span>
        <span className="px-3 py-1 text-sm text-white" style={{ background: bad ? '#2563EB' : '#8B6F4E' }}>{bad ? 'Also loud' : 'Quiet'}</span>
      </div>
    </div>
  );
  return (
    <Stage label="Relief versus focus" caption="Left: one focal colour, the rest in relief. Right: two competing focal colours and the eye does not know where to land.">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card />
        <Card bad />
      </div>
    </Stage>
  );
}

function GridDrift() {
  const heights = (h: number) => Array.from({ length: 10 }, (_, i) => ({ i, h }));
  const col = (label: string, h: number, color: string) => {
    const total = h * 10;
    return (
      <div>
        <p className="text-sm mb-2"><b>{label}</b> ({h}px × 10 = {total}px)</p>
        <div className="flex">
          <div className="w-24">
            {heights(h).map((x) => <div key={x.i} style={{ height: h / 2, background: color, marginBottom: 0, opacity: x.i % 2 ? 0.7 : 1, width: '100%' }} />)}
          </div>
        </div>
      </div>
    );
  };
  return (
    <Stage label="Drift over ten stacked items" caption="One pixel per item looks harmless. By item ten the stack is 10px off the 8pt grid, and nothing below it lines up. Bars drawn at half scale.">
      <div className="grid gap-6 sm:grid-cols-2">
        {col('Left alone: 71px', 71, '#B45309')}
        {col('Rounded: 72px', 72, '#047857')}
      </div>
      <p className="mt-4 text-sm">Total difference: <b>710px vs 720px</b>, and 720 is divisible by 8.</p>
    </Stage>
  );
}

/* ---------------- mixing type ---------------- */

const PALETTE = ['#B45309', '#047857', '#2563EB', '#D44983', '#7C3AED', '#111827'];
const SERIFS = [
  ['EB Garamond', 'var(--font-eb-garamond)'],
  ['Source Serif', 'var(--font-source-serif)'],
  ['Literata', 'var(--font-literata)'],
  ['Newsreader', 'var(--font-newsreader)'],
  ['Lora', 'var(--font-lora)'],
  ['Fraunces', 'var(--font-serif)'],
];
const SANSES = [
  ['Roboto', 'var(--font-roboto)'],
  ['Source Sans', 'var(--font-source-sans)'],
  ['IBM Plex Sans', 'var(--font-plex-sans)'],
  ['Public Sans', 'var(--font-public-sans)'],
  ['Work Sans', 'var(--font-work-sans)'],
  ['Inter', 'var(--font-sans)'],
];

function XHeightOverlay() {
  const panel = (title: string, list: string[][]) => (
    <div>
      <p className="mb-2 text-xs font-mono uppercase tracking-wider opacity-60">{title}</p>
      <div className="relative h-32 border-b-2 border-[#111827] bg-white/60" aria-hidden>
        {list.map(([n, f], i) => (
          <span key={n} className="absolute bottom-0 left-4 text-[100px] leading-none" style={{ fontFamily: `${f}, system-ui, sans-serif`, color: PALETTE[i], opacity: 0.55, transform: 'translateY(0.22em)', mixBlendMode: 'multiply' }}>x</span>
        ))}
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        {list.map(([n], i) => (
          <li key={n}><span style={{ color: PALETTE[i] }}>■</span> {n}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <Stage label="x-height overlay, same size" caption="Six serifs and six sans, each an x at 100px, stacked on one baseline. The spread in height is why two fonts at one point size can look mismatched. Offsets are approximate.">
      <div className="grid gap-6 sm:grid-cols-2">
        {panel('Serifs', SERIFS)}
        {panel('Sans', SANSES)}
      </div>
    </Stage>
  );
}

const PAIRS = [
  { good: true, a: ['Fraunces', 'var(--font-serif)'], b: ['Inter', 'var(--font-sans)'], note: 'Clear roles, close proportions' },
  { good: true, a: ['EB Garamond', 'var(--font-eb-garamond)'], b: ['Roboto', 'var(--font-roboto)'], note: 'Old-style grace, plain workhorse' },
  { good: true, a: ['Literata', 'var(--font-literata)'], b: ['IBM Plex Sans', 'var(--font-plex-sans)'], note: 'Both built for screens' },
  { good: false, a: ['EB Garamond', 'var(--font-eb-garamond)'], b: ['Lora', 'var(--font-lora)'], note: 'Two serifs doing one job' },
  { good: false, a: ['Roboto', 'var(--font-roboto)'], b: ['Work Sans', 'var(--font-work-sans)'], note: 'Two sans, nearly the same: looks like a mistake' },
  { good: false, a: ['Fraunces', 'var(--font-serif)'], b: ['Public Sans', 'var(--font-public-sans)'], note: 'Playful display against a stiff civic sans, no shared logic' },
];

function PairingGallery() {
  return (
    <Stage label="Good and bad pairings" caption="Verdicts are judgement calls for illustration, not a rule from a test.">
      <div className="grid gap-3 sm:grid-cols-2">
        {PAIRS.map((p) => (
          <div key={p.a[0] + p.b[0]} className="rounded-md border border-[#111827]/10 bg-white/70 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase" style={{ color: p.good ? '#047857' : '#B91C1C' }}>
              {p.good ? <Check size={14} /> : <X size={14} />} {p.good ? 'Works' : 'Avoid'}
            </div>
            <div className="text-2xl leading-tight" style={{ fontFamily: `${p.a[1]}, serif` }}>Sunday brunch</div>
            <div className="mt-1 text-base" style={{ fontFamily: `${p.b[1]}, system-ui, sans-serif` }}>Eggs, bread and a good table, from nine until two.</div>
            <div className="mt-2 text-sm opacity-70">{p.a[0]} + {p.b[0]}: {p.note}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function FallbackSwap() {
  const [loaded, setLoaded] = useState(true);
  return (
    <Stage
      label="Fallback stack swap (simulated)"
      controls={<Seg value={loaded ? 'on' : 'off'} onChange={(v) => setLoaded(v === 'on')} label="Font state" options={[{ id: 'on', label: 'Font loaded' }, { id: 'off', label: 'Fallback' }]} />}
      caption="Simulated with a generic serif standing in for a missing font. A good fallback stack has a similar x-height so the swap barely moves the layout."
    >
      <p className="text-3xl leading-snug" style={{ fontFamily: loaded ? 'var(--font-eb-garamond), Georgia, serif' : 'Georgia, serif' }}>
        The quick brown fox jumps over a very lazy dog.
      </p>
      <p className="mt-2 font-mono text-xs opacity-60">font-family: {loaded ? 'var(--font-eb-garamond), Georgia, serif' : 'Georgia, serif'}</p>
    </Stage>
  );
}

/* ---------------- stepwise ---------------- */

function TokenBudget() {
  const bars = [
    ['One pass, 2,500-word spec', 3300, '#B45309'],
    ['Step 1', 200, PINK],
    ['Step 2', 200, PINK],
    ['Step 3', 200, PINK],
    ['Step 4', 200, PINK],
  ] as const;
  return (
    <Stage label="Instruction tokens (illustrative)" caption="Illustrative numbers, not measurements. 2,500 words is roughly 3,300 tokens at three-quarters of a word per token; each step carries about 200.">
      <div className="space-y-2">
        {bars.map(([l, v, c]) => (
          <div key={l} className="grid grid-cols-[170px_1fr_60px] items-center gap-3 text-sm">
            <span>{l}</span>
            <div className="h-4 bg-[#111827]/10"><div className="h-4" style={{ width: `${(v / 3300) * 100}%`, background: c }} /></div>
            <span className="font-mono text-xs">{v}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function StepTimeline() {
  const steps = [
    ['Skeleton', 'No raw hex values', true],
    ['Primitives', 'All targets 44px+', false],
    ['Primitives (retry)', 'All targets 44px+', true],
    ['Editorial', 'Text 13px+', true],
    ['Walkthrough', 'Contrast 7:1', true],
  ] as const;
  return (
    <Stage label="Steps and gates (example run)" caption="A made-up run. The second step fails its gate, reruns with the failure quoted back, then passes.">
      <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        {steps.map(([s, g, ok], i) => (
          <li key={i} className="flex-1 rounded-md border p-3 text-sm" style={{ borderColor: ok ? '#047857' : '#B91C1C', background: '#fff' }}>
            <b className="block">{s}</b>
            <span className="opacity-70">Gate: {g}</span>
            <span className="mt-2 flex items-center gap-1 font-mono text-xs" style={{ color: ok ? '#047857' : '#B91C1C' }}>
              {ok ? <Check size={14} /> : <X size={14} />} {ok ? 'pass' : 'fail'}
            </span>
          </li>
        ))}
      </ol>
    </Stage>
  );
}

function ContextFill() {
  const [k, setK] = useState<'4k' | '32k'>('4k');
  const cap = k === '4k' ? 4096 : 32768;
  const parts = [
    ['Spec', 3300, '#B45309'],
    ['Model output so far', 1800, PINK],
  ] as const;
  const used = parts.reduce((a, p) => a + p[1], 0);
  return (
    <Stage
      label="Context window fill (illustrative)"
      controls={<Seg value={k} onChange={(v) => setK(v as '4k' | '32k')} label="Window size" options={[{ id: '4k', label: '4k window' }, { id: '32k', label: '32k window' }]} />}
      caption="Illustrative sizes. In the 4k window a single-pass spec plus output overflows and early rules fall off the end; in 32k there is room to spare."
    >
      <div className="flex h-8 overflow-hidden border border-[#111827]/30 bg-white">
        {parts.map(([l, v, c]) => (
          <div key={l} style={{ width: `${Math.min(100, (v / cap) * 100)}%`, background: c }} title={l} />
        ))}
      </div>
      <p className="mt-3 text-sm">
        {used.toLocaleString()} of {cap.toLocaleString()} tokens: {used > cap ? <b style={{ color: '#B91C1C' }}>overflow, the oldest rules are dropped</b> : <b style={{ color: '#047857' }}>{Math.round((used / cap) * 100)}% full</b>}
      </p>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'fig-pause-stress': PauseStress,
  'fig-marks-scripts': MarksAcrossScripts,
  'fig-wordmark-lockups': WordmarkLockups,
  'fig-same-layout-sites': SameLayoutSites,
  'fig-fingerprint': FingerprintCompare,
  'fig-state-ownership': StateOwnership,
  'fig-albers-illusion': AlbersIllusion,
  'fig-relief-vs-focus': ReliefVsFocus,
  'fig-grid-drift': GridDrift,
  'fig-xheight-overlay': XHeightOverlay,
  'fig-pairing-gallery': PairingGallery,
  'fig-fallback-swap': FallbackSwap,
  'fig-token-budget': TokenBudget,
  'fig-step-timeline': StepTimeline,
  'fig-context-fill': ContextFill,
};
