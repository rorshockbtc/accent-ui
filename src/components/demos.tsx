'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Check, X, Menu, Search, ChevronRight } from 'lucide-react';
import { Stage, Seg } from './primitives';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  PASTELS,
  TONAL_DARKS,
  getContrastRatio,
  type PastelName,
  type TonalDarkName,
} from '@/styles/design-tokens';
import { PIPE_BRANDS, type PipeBrandId } from '@/lib/pipe-brand';
import {
  compileStepwiseWorkflow,
  HARDWARE_TIERS,
  SAMPLE_WORKFLOW_TARGETS,
  type HardwareTierId,
} from '@/lib/bang/stepwise-prompt-compiler';
import { SAMPLE_PHOTOS } from './sample-media';

/* ------------------------------------------------------------------ */
/* Brand & poster                                                      */
/* ------------------------------------------------------------------ */

const FAMILY = [
  { glyph: '´', name: 'Accént', role: 'Design system', meaning: 'Emphasis. Changes how something is said without changing what is said.' },
  { glyph: '!', name: 'Bang', role: 'Website builder', meaning: 'Exclamation. A launch, an announcement, an open sign.' },
  { glyph: ':-]', name: 'Colon Hyphen Bracket', role: 'The studio', meaning: 'A face made of grammar. The people behind the marks.' },
  { glyph: ';-]', name: 'Semi', role: 'Companion / Ask', meaning: 'A wink. Someone in on the joke who will answer honestly.' },
  { glyph: '>', name: 'Greater', role: 'Conversational chatbot', meaning: 'Prompt chevron. Forward-moving dialogue inside a room.' },
  { glyph: '#', name: 'Hash', role: 'Journaling app', meaning: 'Octothorpe. Numbered entries, private indexing, and daily reflection.' },
  { glyph: '~', name: 'Trim', role: 'Editing & distillation', meaning: 'Tilde. Approximation, paring back, and cutting the excess.' },
  { glyph: '\\', name: 'pipe', role: 'Namespace', meaning: 'A path. pipe\\website-design says where knowledge lives.' },
];

function PunctuationFamily() {
  return (
    <Stage label="The punctuation family" caption="Each product is a mark that most written languages already share.">
      <ul className="divide-y divide-[#111827]/10">
        {FAMILY.map((f) => (
          <li key={f.name} className="grid grid-cols-[72px_1fr] sm:grid-cols-[96px_200px_1fr] gap-4 py-4 items-baseline">
            <span className="font-serif text-4xl leading-none text-[#D44983]" aria-hidden>{f.glyph}</span>
            <span>
              <strong className="block text-base">{f.name}</strong>
              <span className="text-sm text-[#4B5563]">{f.role}</span>
            </span>
            <span className="col-span-2 sm:col-span-1 text-base leading-7">{f.meaning}</span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

function Poster() {
  return (
    <figure className="not-prose my-8">
      <a href="https://cassandra.colonhyphenbracket.pink/colorstypegrids" target="_blank" rel="noreferrer" className="block rounded-lg overflow-hidden border border-[var(--a-rule)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/accent/colors-type-grids-poster-2000.jpg"
          alt="Colors Type Grids poster by Kyle Cyree: four columns covering a manifesto, grid-based design on an eight-point system, card anatomy studies, and the interaction of color."
          width={2000}
          height={2496}
          loading="lazy"
          className="w-full h-auto"
        />
      </a>
      <figcaption className="mt-2 text-sm text-[var(--a-muted)]">
        Colors Type Grids, by Kyle Cyree · Colon Hyphen Bracket. One hundred percent human-made.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Grid & spacing                                                      */
/* ------------------------------------------------------------------ */

function GridOverlay() {
  const [cols, setCols] = useState<'12' | '8' | '4'>('12');
  const [baseline, setBaseline] = useState<'on' | 'off'>('on');
  const n = Number(cols);
  const gutter = n === 4 ? 16 : 24;
  return (
    <Stage
      label="Grid overlay"
      controls={
        <>
          <Seg label="Columns" value={cols} onChange={setCols} options={[{ id: '12', label: '12 · desktop' }, { id: '8', label: '8 · tablet' }, { id: '4', label: '4 · mobile' }]} />
          <Seg label="Baseline" value={baseline} onChange={setBaseline} options={[{ id: 'on', label: '8px baseline' }, { id: 'off', label: 'Off' }]} />
        </>
      }
      caption={`${n} columns, ${gutter}px gutters. Every block snaps to a column edge and every vertical measure is a multiple of 8.`}
    >
      <div className="relative mx-auto" style={{ maxWidth: n === 4 ? 390 : n === 8 ? 768 : '100%' }}>
        <div className="absolute inset-0 grid pointer-events-none" style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, columnGap: gutter }} aria-hidden>
          {Array.from({ length: n }).map((_, i) => (
            <div key={i} className="bg-[#D44983]/10 border-x border-[#D44983]/20" />
          ))}
        </div>
        {baseline === 'on' && (
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{ backgroundImage: 'linear-gradient(to bottom, rgba(17,24,39,0.08) 1px, transparent 1px)', backgroundSize: '100% 8px' }}
          />
        )}
        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, columnGap: gutter, rowGap: 24 }}>
          <div className="bg-[#111827] text-[#FAF8F5] p-4 h-[48px] flex items-center text-sm font-medium" style={{ gridColumn: `span ${n}` }}>Navigation · 48px</div>
          <div className="bg-[#E8E2D5] p-6 h-[240px]" style={{ gridColumn: `span ${n === 4 ? 4 : n === 8 ? 8 : 7}` }}>
            <div className="font-serif text-2xl leading-8">Lead story spans {n === 12 ? 7 : n} columns</div>
            <div className="mt-2 text-sm leading-6 text-[#4B5563]">240px tall: 30 × 8.</div>
          </div>
          {n === 12 && (
            <div className="bg-[#F3EFE9] border border-[#111827]/10 p-6 h-[240px] text-sm leading-6" style={{ gridColumn: 'span 5' }}>
              Sidebar spans 5.
            </div>
          )}
          {Array.from({ length: n === 4 ? 2 : 3 }).map((_, i) => (
            <div key={i} className="bg-[#F3EFE9] border border-[#111827]/10 p-4 h-[136px] text-sm" style={{ gridColumn: `span ${n === 4 ? 4 : n === 8 ? (i === 2 ? 8 : 4) : 4}` }}>
              Card · 136px
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 96];
function SpacingScale() {
  return (
    <Stage label="Spacing scale" caption="Use these values only. 4 and 12 are for fine detail; everything structural is 8, 16, 24 or larger.">
      <ul className="space-y-2">
        {SPACING.map((s) => (
          <li key={s} className="grid grid-cols-[64px_1fr] items-center gap-4">
            <span className="font-mono text-sm tabular-nums">{s}px</span>
            <span className="h-4 bg-[#D44983] rounded-sm" style={{ width: s * 3 }} />
          </li>
        ))}
      </ul>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

const SERIFS = [
  { id: 'Fraunces', note: 'Soft, warm display serif. Pipes uses it for headlines.', fallback: "var(--font-serif), 'Fraunces', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif", css: "'Fraunces', 'Iowan Old Style', 'Palatino Linotype', Georgia, serif" },
  { id: 'EB Garamond', note: 'Classical book face. Elegant, but small x-height: size it up.', fallback: "var(--font-eb-garamond), 'EB Garamond', Garamond, 'Times New Roman', serif", css: "'EB Garamond', Garamond, 'Times New Roman', serif" },
  { id: 'Source Serif 4', note: 'Sturdy, screen-first. Hard to misuse.', fallback: "var(--font-source-serif), 'Source Serif 4', 'Iowan Old Style', Georgia, serif", css: "'Source Serif 4', 'Iowan Old Style', Georgia, serif" },
  { id: 'Literata', note: 'Designed for long reading on screens.', fallback: "var(--font-literata), 'Literata', 'Iowan Old Style', Georgia, serif", css: "'Literata', 'Iowan Old Style', Georgia, serif" },
  { id: 'Newsreader', note: 'Editorial and compact. Good for news layouts.', fallback: "var(--font-newsreader), 'Newsreader', 'Times New Roman', serif", css: "'Newsreader', 'Times New Roman', serif" },
  { id: 'Lora', note: 'Friendly, calligraphic curves. Good for small brands.', fallback: "var(--font-lora), 'Lora', Georgia, serif", css: "'Lora', Georgia, serif" },
];
const SANS = [
  { id: 'Inter', note: 'Neutral, excellent at small UI sizes. Pipes UI face.', fallback: "var(--font-sans), 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif", css: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" },
  { id: 'Roboto', note: 'Ubiquitous, slightly mechanical, very legible.', fallback: "var(--font-roboto), Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif", css: "Roboto, system-ui, -apple-system, 'Segoe UI', sans-serif" },
  { id: 'Source Sans 3', note: 'Humanist and quiet. Pairs naturally with Source Serif.', fallback: "var(--font-source-sans), 'Source Sans 3', system-ui, 'Segoe UI', sans-serif", css: "'Source Sans 3', system-ui, 'Segoe UI', sans-serif" },
  { id: 'IBM Plex Sans', note: 'Engineered character. Good for technical products.', fallback: "var(--font-plex-sans), 'IBM Plex Sans', system-ui, 'Segoe UI', sans-serif", css: "'IBM Plex Sans', system-ui, 'Segoe UI', sans-serif" },
  { id: 'Public Sans', note: 'Government-grade neutrality. Never in the way.', fallback: "var(--font-public-sans), 'Public Sans', system-ui, 'Segoe UI', sans-serif", css: "'Public Sans', system-ui, 'Segoe UI', sans-serif" },
  { id: 'Work Sans', note: 'Wide and friendly. Lively at large sizes.', fallback: "var(--font-work-sans), 'Work Sans', system-ui, 'Segoe UI', sans-serif", css: "'Work Sans', system-ui, 'Segoe UI', sans-serif" },
];

function stackFor(family: string, list: typeof SERIFS) {
  return list.find((f) => f.id === family)?.fallback ?? 'serif';
}

function TypePairing() {
  const [serif, setSerif] = useState('Source Serif 4');
  const [sans, setSans] = useState('Inter');
  const [mode, setMode] = useState<'pair' | 'serif' | 'sans'>('pair');
  const serifStack = stackFor(serif, SERIFS);
  const sansStack = stackFor(sans, SANS);
  const headFont = mode === 'sans' ? sansStack : serifStack;
  const bodyFont = mode === 'serif' ? serifStack : sansStack;
  const serifInfo = SERIFS.find((f) => f.id === serif)!;
  const sansInfo = SANS.find((f) => f.id === sans)!;
  const css = `:root {
  --font-display: ${mode === 'sans' ? sansInfo.css : serifInfo.css};
  --font-body: ${mode === 'serif' ? serifInfo.css : sansInfo.css};
}`;
  return (
    <Stage
      label="Type pairing lab"
      controls={<Seg label="Mode" value={mode} onChange={setMode} options={[{ id: 'pair', label: 'Pair' }, { id: 'serif', label: 'Serif only' }, { id: 'sans', label: 'Sans only' }]} />}
      caption="Pick one serif and one sans. Give each a job: the serif speaks (headlines), the sans works (interface and body). The fallback stack is what people see if the web font fails to load."
    >
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <label className="text-sm">
          <span className="block font-medium mb-1">Serif</span>
          <select value={serif} onChange={(e) => setSerif(e.target.value)} className="w-full min-h-[44px] rounded-md border border-[#111827]/20 bg-white px-3">
            {SERIFS.map((f) => <option key={f.id}>{f.id}</option>)}
          </select>
          <span className="block mt-1 text-[#4B5563]">{serifInfo.note}</span>
        </label>
        <label className="text-sm">
          <span className="block font-medium mb-1">Sans-serif</span>
          <select value={sans} onChange={(e) => setSans(e.target.value)} className="w-full min-h-[44px] rounded-md border border-[#111827]/20 bg-white px-3">
            {SANS.map((f) => <option key={f.id}>{f.id}</option>)}
          </select>
          <span className="block mt-1 text-[#4B5563]">{sansInfo.note}</span>
        </label>
      </div>
      <article className="max-w-[65ch] border-t border-[#111827]/10 pt-6">
        <p style={{ fontFamily: bodyFont }} className="text-xs uppercase tracking-[0.12em] text-[#4B5563]">Field notes · 6 min read</p>
        <h3 style={{ fontFamily: headFont }} className="mt-2 text-3xl sm:text-4xl font-semibold leading-[1.15]">The quiet grammar of a well-set page</h3>
        <p style={{ fontFamily: bodyFont }} className="mt-4 text-base leading-7">
          Good typography is mostly invisible. You notice it the way you notice a comfortable chair: by not
          thinking about it at all. The headline carries the voice; the body carries the reader.
        </p>
        <p style={{ fontFamily: bodyFont }} className="mt-4 text-base leading-7">Prices: $1,280.40 · $97.15 · $3,459.09</p>
      </article>
      <pre className="mt-6 overflow-x-auto rounded-md bg-[#111827] text-[#F3EFE9] p-4 text-xs leading-6"><code>{css}</code></pre>
    </Stage>
  );
}

function Numerals() {
  const rows = [
    ['Starter plan', '$1,349.99'],
    ['Pro plan', '$4,587.35'],
    ['Studio plan', '$9,736.48'],
    ['Annual total', '$15,673.82'],
  ];
  return (
    <Stage
      label="Numerals: Georgia vs. lining tabular figures"
      caption="Georgia uses old-style figures: 3, 4, 5, 7 and 9 drop below the baseline like lowercase letters. Lovely in a sentence, hard to scan in a column of money. Use lining, tabular figures for prices and tables."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {[
          { title: 'Georgia (old-style, proportional)', style: { fontFamily: 'Georgia, serif' }, ok: false },
          { title: 'Inter (lining, tabular)', style: { fontFamily: 'var(--font-sans), system-ui, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums' as const }, ok: true },
        ].map((c) => (
          <div key={c.title}>
            <p className="flex items-center gap-2 text-sm font-medium mb-2">
              {c.ok ? <Check className="h-4 w-4 text-[#166534]" aria-hidden /> : <X className="h-4 w-4 text-[#9F1239]" aria-hidden />}
              {c.ok ? 'Do: ' : "Don't: "}
              {c.title}
            </p>
            <table className="w-full text-lg" style={c.style}>
              <caption className="sr-only">{c.title} price table</caption>
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k} className="border-b border-[#111827]/10">
                    <th scope="row" className="py-2 text-left font-normal text-base">{k}</th>
                    <td className="py-2 text-right">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function LeadingRhythm() {
  const [lh, setLh] = useState<'tight' | 'grid' | 'loose'>('grid');
  const map = { tight: 18, grid: 24, loose: 36 };
  return (
    <Stage
      label="Leading & vertical rhythm"
      controls={<Seg label="Line height" value={lh} onChange={setLh} options={[{ id: 'tight', label: '16 / 18' }, { id: 'grid', label: '16 / 24 ✓' }, { id: 'loose', label: '16 / 36' }]} />}
      caption="16px text on a 24px line sits on the 8px baseline every third line. Tight leading crowds ascenders into descenders; loose leading breaks lines apart so the eye loses its place."
    >
      <div
        className="max-w-[65ch] relative"
        style={{ backgroundImage: 'linear-gradient(to bottom, rgba(212,73,131,0.18) 1px, transparent 1px)', backgroundSize: '100% 8px' }}
      >
        <p className="text-base" style={{ lineHeight: `${map[lh]}px` }}>
          Rhythm is why some pages feel calm and others feel nervous. When every line height, margin and
          image height is a multiple of the same small number, the page develops a pulse. Readers never see
          the grid, but they feel the regularity, and regularity reads as trust. Break it everywhere and the
          page feels improvised, even when every element is individually fine.
        </p>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Color                                                               */
/* ------------------------------------------------------------------ */

const LIGHT_SURFACES = [
  { name: 'Alabaster', hex: '#FAF8F5' },
  { name: 'Gallery Stone', hex: '#E8E2D5' },
  { name: 'Card', hex: '#F3EFE9' },
  { name: 'White', hex: '#FFFFFF' },
];
const LIGHT_INKS = [
  { name: 'Ink', hex: '#111827' },
  { name: 'Muted', hex: '#4B5563' },
  { name: 'Pink accent', hex: '#D44983' },
  { name: 'Placeholder grey', hex: '#9CA3AF' },
];

function ContrastExplorer() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [sel, setSel] = useState<{ fg: string; bg: string; fgName: string; bgName: string }>({
    fg: '#111827', bg: '#FAF8F5', fgName: 'Ink', bgName: 'Alabaster',
  });

  const fgs = mode === 'light'
    ? LIGHT_INKS
    : (Object.keys(PASTELS) as PastelName[]).map((k) => ({ name: k, hex: PASTELS[k].$value as string }));
  const bgs = mode === 'light'
    ? LIGHT_SURFACES
    : (Object.keys(TONAL_DARKS) as TonalDarkName[]).map((k) => ({ name: k, hex: TONAL_DARKS[k].$value as string }));

  const switchMode = (m: 'light' | 'dark') => {
    setMode(m);
    if (m === 'light') setSel({ fg: '#111827', bg: '#FAF8F5', fgName: 'Ink', bgName: 'Alabaster' });
    else {
      const p = Object.keys(PASTELS)[0] as PastelName;
      const d = Object.keys(TONAL_DARKS)[0] as TonalDarkName;
      setSel({ fg: PASTELS[p].$value as string, bg: TONAL_DARKS[d].$value as string, fgName: p, bgName: d });
    }
  };

  const ratio = getContrastRatio(sel.fg, sel.bg);
  const level = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA large only' : 'Fails';
  const pass = ratio >= 4.5;

  return (
    <Stage
      label="Contrast explorer"
      controls={<Seg label="Theme" value={mode} onChange={switchMode} options={[{ id: 'light', label: 'Light theme' }, { id: 'dark', label: 'Dark theme' }]} />}
      caption="Click any cell. Contrast is the brightness difference between text and background, written as a ratio. 4.5:1 is the legal minimum for body text (AA); Accént aims for 7:1 (AAA) on reading surfaces."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div tabIndex={0} role="region" aria-label="Contrast matrix" className="overflow-x-auto">
          <table className="border-separate border-spacing-1">
            <caption className="sr-only">Text colors (columns) on background colors (rows) with contrast ratios</caption>
            <thead>
              <tr>
                <th className="text-xs text-left font-medium text-[#4B5563] p-1">bg \ text</th>
                {fgs.map((f) => (
                  <th key={f.name} scope="col" className="text-xs font-medium capitalize p-1 whitespace-nowrap">{f.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bgs.map((b) => (
                <tr key={b.name}>
                  <th scope="row" className="text-xs font-medium capitalize text-left p-1 whitespace-nowrap">{b.name}</th>
                  {fgs.map((f) => {
                    const r = getContrastRatio(f.hex, b.hex);
                    const active = sel.fg === f.hex && sel.bg === b.hex;
                    return (
                      <td key={f.name}>
                        <button
                          type="button"
                          aria-pressed={active}
                          aria-label={`${f.name} on ${b.name}, ${r.toFixed(1)} to 1`}
                          onClick={() => setSel({ fg: f.hex, bg: b.hex, fgName: f.name, bgName: b.name })}
                          className={`w-[72px] h-[48px] rounded-md text-sm font-semibold tabular-nums border ${active ? 'ring-2 ring-[#D44983] ring-offset-2' : 'border-[#111827]/10'}`}
                          style={{ background: b.hex, color: f.hex }}
                        >
                          {r.toFixed(1)}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded-lg border border-[#111827]/10 overflow-hidden">
          <div className="p-6" style={{ background: sel.bg, color: sel.fg }}>
            <p className="font-serif text-2xl leading-8">The quick brown fox</p>
            <p className="mt-2 text-sm leading-6">Body text at 14px reads like this on this surface.</p>
          </div>
          <dl className="p-4 text-sm space-y-2 bg-white">
            <div className="flex justify-between"><dt>Text</dt><dd className="font-mono capitalize">{sel.fgName} {sel.fg}</dd></div>
            <div className="flex justify-between"><dt>Background</dt><dd className="font-mono capitalize">{sel.bgName} {sel.bg}</dd></div>
            <div className="flex justify-between"><dt>Ratio</dt><dd className="font-mono tabular-nums">{ratio.toFixed(2)}:1</dd></div>
            <div className="flex justify-between items-center">
              <dt>Level</dt>
              <dd className={`inline-flex items-center gap-1 font-semibold ${pass ? 'text-[#166534]' : 'text-[#9F1239]'}`}>
                {pass ? <Check className="h-4 w-4" aria-hidden /> : <X className="h-4 w-4" aria-hidden />}
                {level}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Stage>
  );
}

function RoomGallery() {
  const ids = Object.keys(PIPE_BRANDS) as PipeBrandId[];
  const [id, setId] = useState<PipeBrandId>('chapel');
  const b = PIPE_BRANDS[id];
  return (
    <Stage label="The 12 rooms" caption="Rooms are complete palettes, not accent swaps. Each sets wash, card, ink, muted, border and accent together so contrast holds.">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        {ids.map((k) => {
          const r = PIPE_BRANDS[k];
          return (
            <button
              key={k}
              type="button"
              aria-pressed={id === k}
              onClick={() => setId(k)}
              className={`min-h-[64px] rounded-md p-2 text-left text-xs font-medium border ${id === k ? 'ring-2 ring-[#D44983] ring-offset-2' : 'border-[#111827]/10'}`}
              style={{ background: r.colors.wash, color: r.colors.ink }}
            >
              <span className="block h-2 w-8 rounded-full mb-2" style={{ background: r.colors.accent }} />
              {r.label}
              <span className="block opacity-70">{r.mode}</span>
            </button>
          );
        })}
      </div>
      <div className="rounded-lg p-6 sm:p-8" style={{ background: b.colors.wash, color: b.colors.ink }}>
        <p className="text-xs uppercase tracking-[0.12em]" style={{ color: b.colors.muted }}>{b.label} room · {b.tagline}</p>
        <h3 className="font-serif text-3xl leading-10 mt-2">A room changes the light, not the furniture</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md p-4" style={{ background: b.colors.card, border: `1px solid ${b.colors.border}22` }}>
            <p className="text-sm leading-6" style={{ color: b.colors.muted }}>Card surface with muted text.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex min-h-[44px] items-center rounded-md px-4 text-sm font-semibold" style={{ background: b.colors.accent, color: b.colors.accentFg }}>Primary action</span>
            <span className="font-mono text-xs" style={{ color: b.colors.muted }}>{getContrastRatio(b.colors.ink, b.colors.wash).toFixed(1)}:1 ink</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Iconography, touch, layout                                          */
/* ------------------------------------------------------------------ */

function IconRestraint() {
  return (
    <Stage label="Icon restraint" caption="Left: an icon for every noun, the default look of AI-generated dashboards. Right: icons only where they speed recognition, always with a label.">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium mb-3"><X className="h-4 w-4 text-[#9F1239]" aria-hidden />Don&apos;t</p>
          <ul className="space-y-2 text-sm">
            {['✨ Overview', '🚀 Launch', '📊 Analytics', '⚡ Automations', '🔒 Security', '💡 Insights'].map((t) => (
              <li key={t} className="rounded-md border border-[#111827]/10 bg-white px-3 py-2">{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-medium mb-3"><Check className="h-4 w-4 text-[#166534]" aria-hidden />Do</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2 rounded-md border border-[#111827]/10 bg-white px-3 py-2"><Search className="h-4 w-4" strokeWidth={1.5} aria-hidden />Search</li>
            {['Overview', 'Launch', 'Analytics', 'Automations', 'Security'].map((t) => (
              <li key={t} className="rounded-md border border-[#111827]/10 bg-white px-3 py-2">{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
}

function TouchTargets() {
  return (
    <Stage label="Touch targets" caption="Fingertips are roughly 9mm wide. 44 × 44px is the minimum hit area; keep at least 8px between neighbouring targets. The visible button can be smaller than its hit area.">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium mb-3"><X className="h-4 w-4 text-[#9F1239]" aria-hidden />24px, no spacing</p>
          <div className="flex">
            {['A', 'B', 'C', 'D'].map((l) => (
              <span key={l} className="h-6 w-6 grid place-items-center border border-[#111827]/40 text-xs">{l}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-medium mb-3"><Check className="h-4 w-4 text-[#166534]" aria-hidden />44px, 8px apart</p>
          <div className="flex gap-2">
            {['A', 'B', 'C', 'D'].map((l) => (
              <span key={l} className="h-11 w-11 grid place-items-center rounded-md border border-dashed border-[#D44983]">
                <span className="h-6 w-6 grid place-items-center rounded bg-[#111827] text-[#FAF8F5] text-xs">{l}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}

const NAV_ITEMS = ['Front page', 'World', 'Business', 'Culture', 'Design', 'Bitcoin', 'Faith'];
function NavMock({ width }: { width: 'desktop' | 'tablet' | 'mobile' }) {
  const [open, setOpen] = useState(false);
  const visible = width === 'desktop' ? NAV_ITEMS.length : width === 'tablet' ? 4 : 0;
  const frame = width === 'desktop' ? '100%' : width === 'tablet' ? 768 : 390;
  return (
    <div className="mx-auto border border-[#111827]/15 rounded-md overflow-hidden bg-white relative" style={{ maxWidth: frame, minHeight: 280 }}>
      <nav aria-label="Example" className="flex items-center gap-2 h-14 px-4 border-b border-[#111827]/10">
        <span className="font-serif text-lg font-semibold mr-4">Pipes</span>
        <ul className="flex items-center gap-1 flex-1 min-w-0">
          {NAV_ITEMS.slice(0, visible).map((n, i) => (
            <li key={n}>
              <a href="#" onClick={(e) => e.preventDefault()} aria-current={i === 0 ? 'page' : undefined} className={`inline-flex min-h-[44px] items-center px-3 text-sm ${i === 0 ? 'font-semibold border-b-2 border-[#D44983]' : 'text-[#4B5563]'}`}>{n}</a>
            </li>
          ))}
          {width === 'tablet' && (
            <li><button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="inline-flex min-h-[44px] items-center gap-1 px-3 text-sm text-[#4B5563]">More <ChevronRight className="h-4 w-4 rotate-90" aria-hidden /></button></li>
          )}
        </ul>
        {width === 'mobile' && (
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open menu" className="ml-auto h-11 w-11 grid place-items-center rounded-md border border-[#111827]/15">
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        )}
      </nav>
      {open && width === 'tablet' && (
        <ul className="absolute right-4 top-14 w-48 bg-white border border-[#111827]/15 rounded-md shadow-sm py-1 z-10">
          {NAV_ITEMS.slice(visible).map((n) => <li key={n}><a href="#" onClick={(e) => e.preventDefault()} className="flex min-h-[44px] items-center px-4 text-sm">{n}</a></li>)}
        </ul>
      )}
      {open && width === 'mobile' && (
        <div className="absolute inset-x-0 bottom-0 bg-white border-t border-[#111827]/15 rounded-t-xl p-2 z-10">
          <ul>
            {NAV_ITEMS.map((n) => <li key={n}><a href="#" onClick={(e) => e.preventDefault()} className="flex min-h-[48px] items-center px-4 text-base border-b border-[#111827]/5">{n}</a></li>)}
          </ul>
        </div>
      )}
      <div className="p-6 text-sm text-[#4B5563]">Page content</div>
    </div>
  );
}

function NavDemo() {
  const [w, setW] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  return (
    <Stage
      label="Navigation under congestion"
      controls={<Seg label="Width" value={w} onChange={setW} options={[{ id: 'desktop', label: 'Desktop' }, { id: 'tablet', label: 'Tablet' }, { id: 'mobile', label: 'Mobile' }]} />}
      caption="Priority+: show what fits in priority order, move the rest into More. Under 768px the whole nav becomes a 44px menu button that opens a bottom sheet within thumb reach."
    >
      <NavMock key={w} width={w} />
    </Stage>
  );
}

function Breakpoints() {
  const bps = [
    { w: 390, name: 'Phone', cols: 4 },
    { w: 768, name: 'Tablet', cols: 8 },
    { w: 1024, name: 'Small laptop', cols: 12 },
    { w: 1280, name: 'Desktop', cols: 12 },
    { w: 1440, name: 'Wide', cols: 12 },
  ];
  return (
    <Stage label="Breakpoints" caption="Design at 390 first, then check 768, 1280 and 1440. Content width caps at 1280px; beyond that, margins grow, not lines.">
      <ul className="space-y-3">
        {bps.map((b) => (
          <li key={b.w} className="grid grid-cols-[120px_1fr] items-center gap-4">
            <span className="text-sm"><strong className="tabular-nums">{b.w}px</strong><span className="block text-[#4B5563]">{b.name} · {b.cols} col</span></span>
            <span className="h-8 rounded-sm bg-[#111827]/80" style={{ width: `${(b.w / 1440) * 100}%` }} />
          </li>
        ))}
      </ul>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Components                                                          */
/* ------------------------------------------------------------------ */

function CardAnatomy() {
  return (
    <Stage label="Card anatomy (after the poster)" caption="Surface holds everything. Art is the image or color field. Interaction is the one thing you can do. Anchor is the title that names the card. 400 × 408: two percent taller than wide.">
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="relative w-full max-w-[320px] aspect-[400/408] bg-[#EECEE2] p-6 flex flex-col" style={{ borderRadius: '0 12px 0 12px' }}>
          <span className="absolute -top-3 left-4 bg-[#111827] text-white text-xs px-2 py-0.5 rounded">Surface</span>
          <div className="relative flex-1 bg-[#73385D] grid place-items-center" style={{ borderRadius: '0 12px 0 12px' }}>
            <span className="absolute top-2 left-2 bg-white text-[#111827] text-xs px-2 py-0.5 rounded">Art</span>
            <span className="h-20 w-20 rounded-full bg-[#FFD14D]" />
          </div>
          <p className="relative mt-4 font-serif text-xl leading-8">
            <span className="absolute -left-2 -top-5 bg-white text-xs px-2 py-0.5 rounded font-sans">Anchor</span>
            Pink is an attitude
          </p>
          <span className="relative mt-2 inline-flex self-start min-h-[44px] items-center rounded-full bg-[#111827] text-white px-5 text-xs uppercase tracking-[0.08em]">
            Read the study
            <span className="absolute -right-2 -top-3 bg-white text-[#111827] text-xs px-2 py-0.5 rounded normal-case tracking-normal">Interaction</span>
          </span>
        </div>
        <ul className="text-sm leading-6 space-y-2">
          <li><strong>Radius</strong>: 0 12 0 12 (asymmetric, deliberate)</li>
          <li><strong>Padding</strong>: 24 (3 × 8)</li>
          <li><strong>Art</strong>: fills remaining height; circle may break padding</li>
          <li><strong>Anchor</strong>: serif 20/32</li>
          <li><strong>Interaction</strong>: one per card, ≥ 44px tall</li>
        </ul>
      </div>
    </Stage>
  );
}

const VARIANTS = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;
function ButtonStates() {
  return (
    <Stage label="Button: every variant and state" caption="Scan, don't click. Disabled buttons keep their label legible; focus shows a 2px ring; destructive pairs color with an explicit verb.">
      <div tabIndex={0} role="region" aria-label="Button states" className="overflow-x-auto">
        <table className="text-sm border-separate border-spacing-x-3 border-spacing-y-2">
          <caption className="sr-only">Button variants by state</caption>
          <thead><tr><th className="text-left text-xs text-[#4B5563] font-medium">Variant</th>{['Rest', 'Focus', 'Disabled', 'Small'].map((s) => <th key={s} className="text-left text-xs text-[#4B5563] font-medium">{s}</th>)}</tr></thead>
          <tbody>
            {VARIANTS.map((v) => (
              <tr key={v}>
                <th scope="row" className="text-left font-mono text-xs capitalize pr-2">{v}</th>
                <td><Button variant={v}>{v === 'destructive' ? 'Delete pipe' : 'Publish'}</Button></td>
                <td><Button variant={v} className="ring-2 ring-[#D44983] ring-offset-2">Publish</Button></td>
                <td><Button variant={v} disabled>Publish</Button></td>
                <td><Button variant={v} size="sm">Publish</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}

function BadgeStates() {
  return (
    <Stage label="Badge" caption="Badges label; they never act. Status badges always carry text and an icon, never color alone.">
      <div className="flex flex-wrap gap-3 items-center">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="outline" className="gap-1 text-[#166534] border-[#166534]/40"><Check className="h-3 w-3" aria-hidden />Verified</Badge>
        <Badge variant="outline" className="gap-1 text-[#9F1239] border-[#9F1239]/40"><X className="h-3 w-3" aria-hidden />Rejected</Badge>
        <Badge variant="outline" className="font-mono">pipe\website-design</Badge>
      </div>
    </Stage>
  );
}

function InputStates() {
  return (
    <Stage label="Inputs" caption="Labels sit above fields, always visible. Errors appear only after the person leaves the field (:user-invalid), with text, not just a red border.">
      <form className="grid gap-6 sm:grid-cols-2 max-w-2xl" noValidate onSubmit={(e) => e.preventDefault()}>
        <label className="text-sm">
          <span className="block font-medium mb-1">Name</span>
          <input className="w-full min-h-[44px] rounded-md border border-[#111827]/25 bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D44983]" placeholder="Ada Lovelace" />
          <span className="block mt-1 text-[#4B5563]">Rest</span>
        </label>
        <label className="text-sm">
          <span className="block font-medium mb-1">Email</span>
          <input type="email" required defaultValue="ada@" className="peer w-full min-h-[44px] rounded-md border-2 border-[#9F1239] bg-white px-3 text-base" aria-invalid="true" aria-describedby="email-err" />
          <span id="email-err" className="flex items-center gap-1 mt-1 text-[#9F1239]"><X className="h-4 w-4" aria-hidden />Enter a full email, like ada@example.com</span>
        </label>
        <label className="text-sm">
          <span className="block font-medium mb-1">Website</span>
          <input defaultValue="pipes.pink" className="w-full min-h-[44px] rounded-md border-2 border-[#166534] bg-white px-3 text-base" />
          <span className="flex items-center gap-1 mt-1 text-[#166534]"><Check className="h-4 w-4" aria-hidden />Looks good</span>
        </label>
        <label className="text-sm">
          <span className="block font-medium mb-1 text-[#4B5563]">Plan (locked)</span>
          <input disabled defaultValue="Studio" className="w-full min-h-[44px] rounded-md border border-[#111827]/15 bg-[#F3EFE9] px-3 text-base text-[#4B5563]" />
          <span className="block mt-1 text-[#4B5563]">Disabled</span>
        </label>
      </form>
    </Stage>
  );
}

function CardExamples() {
  return (
    <Stage label="Cards in use" caption="Three cards, three jobs. None of them contain another card.">
      <div className="grid gap-6 sm:grid-cols-3">
        <article className="bg-white border border-[#111827]/10 overflow-hidden" style={{ borderRadius: '0 12px 0 12px' }}>
          <div className="aspect-[4/5] bg-[#D9EEFD] overflow-hidden relative" style={{ borderRadius: '0 12px 0 0' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SAMPLE_PHOTOS.coast.src}
              alt={SAMPLE_PHOTOS.coast.alt}
              width={SAMPLE_PHOTOS.coast.width}
              height={SAMPLE_PHOTOS.coast.height}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-4"><p className="text-xs uppercase tracking-[0.12em] text-[#4B5563]">Portfolio · 2026</p><h3 className="font-serif text-lg leading-7 mt-1">Atlantic blue study</h3></div>
        </article>
        <article className="bg-white border border-[#111827]/10 p-6 flex flex-col" style={{ borderRadius: '0 12px 0 12px' }}>
          <p className="text-xs uppercase tracking-[0.12em] text-[#4B5563]">pipe\stoicism · 6 min</p>
          <h3 className="font-serif text-xl leading-8 mt-2">Why Seneca wrote letters instead of treatises</h3>
          <p className="text-sm leading-6 text-[#4B5563] mt-2 flex-1">A letter assumes a reader. That changes everything about the argument.</p>
          <a href="#" onClick={(e) => e.preventDefault()} className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold underline underline-offset-4">Read</a>
        </article>
        <article className="bg-[#111827] text-[#FAF8F5] p-6" style={{ borderRadius: '0 12px 0 12px' }}>
          <p className="text-xs uppercase tracking-[0.12em] text-[#E8E2D5]">Creator royalty</p>
          <p className="font-serif text-5xl leading-[56px] mt-4 tabular-nums">70%</p>
          <p className="text-sm leading-6 mt-2 text-[#E8E2D5]">of every paid read goes to the curator.</p>
        </article>
      </div>
    </Stage>
  );
}

function HeroDemo() {
  const [photo, setPhoto] = useState<'photo' | 'crest'>('photo');
  return (
    <Stage
      label="Room hero"
      controls={<Seg label="Media" value={photo} onChange={setPhoto} options={[{ id: 'photo', label: 'With photo' }, { id: 'crest', label: 'No photo: crest' }]} />}
      caption="The media box reserves its 16:10 space before anything loads, so the page never jumps. With no image, a deterministic crest built from the name fills the same box."
    >
      <div className="grid gap-6 lg:grid-cols-12 items-center">
        <div className="lg:col-span-6">
          <p className="text-xs uppercase tracking-[0.12em] text-[#4B5563]">pipe\website-design</p>
          <h3 className="font-serif text-3xl sm:text-4xl leading-[1.15] mt-2">Design that survives the second visit</h3>
          <p className="text-base leading-7 text-[#4B5563] mt-3 max-w-[60ch]">Field notes on grids, type and the craft of making screens people return to.</p>
        </div>
        <div className="lg:col-span-6 aspect-[16/10] rounded-lg overflow-hidden border border-[#111827]/10 bg-[#E8E2D5]">
          {photo === 'photo' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={SAMPLE_PHOTOS.library.src}
              alt={SAMPLE_PHOTOS.library.alt}
              width={SAMPLE_PHOTOS.library.width}
              height={SAMPLE_PHOTOS.library.height}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full grid place-items-center bg-[#111827]">
              <span className="h-24 w-24 rounded-full border-2 border-[#E8E2D5] grid place-items-center font-serif text-3xl text-[#E8E2D5]">WD</span>
            </div>
          )}
        </div>
      </div>
    </Stage>
  );
}

function ChartDemo() {
  const data = [
    { label: 'Monolithic prompt, 7B', value: 41 },
    { label: '2 phases, 7B', value: 68 },
    { label: '4 validated steps, 7B', value: 89 },
    { label: 'Single pass, frontier', value: 94 },
  ];
  return (
    <Stage label="Horizontal comparison bar" caption="Illustrative data. Direct labels beat legends; numbers sit at the end of each bar in tabular figures so they line up.">
      <figure role="group" aria-label="Spec compliance by prompting strategy (illustrative)" className="space-y-4 max-w-2xl">
        {data.map((d) => (
          <div key={d.label}>
            <div className="flex justify-between text-sm"><span>{d.label}</span><span className="font-semibold tabular-nums">{d.value}%</span></div>
            <div className="h-3 mt-1 bg-[#111827]/10 rounded-sm"><div className="h-full bg-[#111827] rounded-sm" style={{ width: `${d.value}%` }} /></div>
          </div>
        ))}
      </figure>
    </Stage>
  );
}

function StepwiseCompilerDemo() {
  const [tier, setTier] = useState<HardwareTierId>('local-7b');
  const steps = useMemo(() => compileStepwiseWorkflow(SAMPLE_WORKFLOW_TARGETS[0], tier), [tier]);
  return (
    <Stage
      label="Stepwise prompt compiler"
      controls={<Seg label="Hardware" value={tier} onChange={setTier} options={[{ id: 'local-7b', label: '7B laptop' }, { id: 'local-14b-32b', label: '14–32B' }, { id: 'cloud-frontier', label: 'Cloud' }]} />}
      caption={HARDWARE_TIERS[tier].whyThisChunking}
    >
      <ol className="space-y-4">
        {steps.map((s) => (
          <li key={s.stepNumber} className="border-l-2 border-[#D44983] pl-4">
            <p className="text-xs font-mono text-[#4B5563]">Step {s.stepNumber} of {s.totalSteps} · ~{s.estimatedTokens} tokens</p>
            <p className="font-medium mt-1">{s.title}</p>
            <p className="text-sm leading-6 text-[#4B5563] mt-1">{s.goalSummary}</p>
            <p className="text-xs mt-2">Gate: {s.validationRules.map((r) => r.label).join(' · ')}</p>
          </li>
        ))}
      </ol>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

import { DEMOS as COMPONENTS_A } from './sets/components-a';
import { DEMOS as COMPONENTS_B } from './sets/components-b';
import { DEMOS as FOUNDATIONS_A } from './sets/foundations-a';
import { DEMOS as FOUNDATIONS_B } from './sets/foundations-b';
import { DEMOS as FOUNDATIONS_C } from './sets/foundations-c';
import { DEMOS as PATTERNS } from './sets/patterns';
import { DEMOS as ESSAYS } from './sets/essays';
import { DEMOS as EXHAUSTIVE_3 } from './sets/exhaustive-3';

export const ACCENT_DEMOS: Record<string, React.ComponentType> = {
  ...COMPONENTS_A,
  ...COMPONENTS_B,
  ...FOUNDATIONS_A,
  ...FOUNDATIONS_B,
  ...FOUNDATIONS_C,
  ...PATTERNS,
  ...ESSAYS,
  ...EXHAUSTIVE_3,
  poster: Poster,
  'punctuation-family': PunctuationFamily,
  'grid-overlay': GridOverlay,
  'spacing-scale': SpacingScale,
  'type-pairing': TypePairing,
  numerals: Numerals,
  'leading-rhythm': LeadingRhythm,
  'contrast-explorer': ContrastExplorer,
  'room-gallery': RoomGallery,
  'icon-restraint': IconRestraint,
  'touch-targets': TouchTargets,
  breakpoints: Breakpoints,
  'card-anatomy': CardAnatomy,
  'button-states': ButtonStates,
  'badge-states': BadgeStates,
  'input-states': InputStates,
  'card-examples': CardExamples,
  'hero-demo': HeroDemo,
  'nav-demo': NavDemo,
  'chart-demo': ChartDemo,
  'stepwise-compiler': StepwiseCompilerDemo,
};
