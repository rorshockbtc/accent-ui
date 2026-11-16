'use client';

import React, { useMemo, useState } from 'react';
import { Stage, Seg, DoDont, DimH, Tag } from '../primitives';
import { deriveAccessibleAccent, BRAND_PROFILES, type BrandProfileId } from '@/styles/themes';
import { getContrastRatio } from '@/styles/design-tokens';

/* ============================================================================
 * Pass-3 "Shows, Not Just Tells" Interactive Visual Demos
 * Zero Sparkles, zero pill soup, strictly self-contained (zero Pipes-only imports)
 * so both `pipes-unified` and standalone `accent-ui` share this exact file.
 * ========================================================================== */

const SURFACE_CODE = 'rounded-md border border-[var(--a-rule)] bg-[#111827] text-[#F3EFE9] p-4 font-mono text-[13px] leading-relaxed overflow-x-auto';

/* 1. foundations/tokens */
function TokensShadcnBridgeDemo() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const vars =
    mode === 'light'
      ? `--a-bg: #E8E2D5;\n--a-ink: #111827;\n--a-accent: #FE299E;\n--a-accent-fill: #B8326D;\n--background: var(--a-bg);\n--foreground: var(--a-ink);\n--primary: var(--a-accent-fill);`
      : `--a-bg: #161413;\n--a-ink: #F1EBD8;\n--a-accent: #FE299E;\n--a-accent-fill: #B81468;\n--background: var(--a-bg);\n--foreground: var(--a-ink);\n--primary: var(--a-accent-fill);`;

  return (
    <Stage
      label="shadcn/ui Variable Bridge"
      controls={<Seg label="Mode" value={mode} onChange={setMode} options={[{ id: 'light', label: 'Light Canvas' }, { id: 'dark', label: 'Dark Canvas' }]} />}
      caption="getShadcnBridgeVars() maps Tailwind/shadcn tokens directly onto Accént semantic variables so no duplicate palettes drift."
    >
      <pre tabIndex={0} className={SURFACE_CODE}><code>{vars}</code></pre>
    </Stage>
  );
}

function TokensFloorGuardDemo() {
  return (
    <DoDont
      label="Typographic Minimum Floor (13px / 0.8125rem)"
      doExample={<div className="space-y-2"><p className="font-mono text-[13px] font-semibold">pipe\archival-economics · 24 nodes · WCAG 7.8:1</p><p className="text-sm text-[#4B5563]">Readable without pinching or squinting on OLED phones.</p></div>}
      dontExample={<div className="space-y-2"><p className="font-mono opacity-65" style={{ fontSize: '11px' }}>tag: micro-caption · 11px label</p><p className="font-mono" style={{ fontSize: '10px' }}>sub-13px utility blocked by accent CI ratchet</p></div>}
      doWhy="All metadata labels stay at 13px (0.8125rem) or above so mobile readers and seniors never strain."
      dontWhy="Sub-13px micro-labels (text-[10px]–text-[12px]) fail CI regex checks and wash out on warm sandstone."
    />
  );
}

function TokensDtcgInspectorDemo() {
  const [fmt, setFmt] = useState<'dtcg' | 'css'>('dtcg');
  return (
    <Stage
      label="Single Source of Truth: W3C DTCG JSON to CSS"
      controls={<Seg label="Format" value={fmt} onChange={setFmt} options={[{ id: 'dtcg', label: 'DTCG JSON' }, { id: 'css', label: 'CSS Variables' }]} />}
      caption="Every runtime variable compiles from design-tokens.json — zero magic numbers in component styles."
    >
      <pre tabIndex={0} className={SURFACE_CODE}>
        <code>
          {fmt === 'dtcg'
            ? `{\n  "color": {\n    "canvas": { "$value": "#E8E2D5", "$type": "color" },\n    "accent": { "$value": "#FE299E", "$type": "color" },\n    "accentFill": { "$value": "#B8326D", "$type": "color" }\n  },\n  "fontSize": { "xs": { "$value": "0.8125rem", "$type": "dimension" } }\n}`
            : `:root[data-accent-brand="editorial-sandstone"] {\n  --a-bg: #E8E2D5;\n  --a-accent: #FE299E;\n  --a-accent-fill: #B8326D;\n  --a-font-xs: 0.8125rem;\n}`}
        </code>
      </pre>
    </Stage>
  );
}

function TokensLuminanceLadderDemo() {
  const rows = [
    { token: '--a-ink', fg: '#111827', bg: '#E8E2D5', grade: 'AAA' },
    { token: '--a-muted', fg: '#4B5563', bg: '#E8E2D5', grade: 'AA' },
    { token: '--a-accent-text', fg: '#9B1B56', bg: '#E8E2D5', grade: 'AA' },
    { token: '--a-accent-fg on --a-accent-fill', fg: '#FFFFFF', bg: '#B8326D', grade: 'AA' },
  ];
  return (
    <Stage label="Computed WCAG Luminance Ladder on Sandstone (#E8E2D5)" caption="Contrast is verified mathematically per token pair before any dialect ships.">
      <div className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
        {rows.map((r) => {
          const ratio = getContrastRatio(r.fg, r.bg).toFixed(2);
          return (
            <div key={r.token} className="flex flex-wrap items-center justify-between gap-3 py-3 text-[13px]">
              <span className="font-mono font-semibold">{r.token}</span>
              <span className="px-2.5 py-1 rounded font-mono" style={{ backgroundColor: r.bg, color: r.fg }}>Sample Text</span>
              <span className="font-mono font-bold tabular-nums">{ratio}:1 · {r.grade}</span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

/* 2. foundations/accessibility */
function A11yFocusRingDemo() {
  return (
    <DoDont
      label="Keyboard Focus Ring Discipline"
      doExample={<button type="button" className="min-h-[44px] px-4 rounded-md border border-[#111827] bg-[#FAF8F5] text-sm font-medium outline-2 outline-offset-2 outline-[#FE299E]">Publish Note</button>}
      dontExample={<button type="button" className="min-h-[44px] px-4 rounded-md border border-[#111827]/20 bg-[#FAF8F5] text-sm font-medium outline-none">Publish Note (focus invisible)</button>}
      doWhy="focus-visible:outline-2 focus-visible:outline-[#FE299E] keeps keyboard navigation unmistakable."
      dontWhy="Stripping outline without a high-contrast replacement strands keyboard-only users."
    />
  );
}

function A11ySeniorModeDemo() {
  const [senior, setSenior] = useState<'standard' | 'senior'>('senior');
  return (
    <Stage
      label="Senior Civic Reading Cadence"
      controls={<Seg label="Preset" value={senior} onChange={setSenior} options={[{ id: 'standard', label: 'Editorial 15px' }, { id: 'senior', label: 'Civic 17px / 1.8' }]} />}
      caption="Public-interest and Marigold civic modes expand minimum prose size to 17px and leading to 1.8 without breaking grid hairlines."
    >
      <p className={senior === 'senior' ? 'text-[17px] leading-[1.8] max-w-[60ch]' : 'text-[15px] leading-[1.6] max-w-[60ch]'}>
        Local water tables shifted 1.4 meters between 2018 and 2024; zero-knowledge browser queries render the verified series directly without exposing resident addresses.
      </p>
    </Stage>
  );
}

function A11yWcagMathDemo() {
  const [fg, setFg] = useState('#111827');
  const [bg, setBg] = useState('#E8E2D5');
  const ratio = getContrastRatio(fg, bg);
  const verdict = ratio >= 7 ? 'PASS AAA (>= 7.0:1)' : ratio >= 4.5 ? 'PASS AA (>= 4.5:1)' : 'FAIL UI/TEXT (< 4.5:1)';
  return (
    <Stage label="Live Luminance Math Tester" caption="Test any foreground/background pair against getContrastRatio().">
      <div className="flex flex-wrap items-center gap-4">
        <label className="text-[13px] font-mono">FG <input aria-label="Foreground color" type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="ml-1 h-8 w-10 align-middle cursor-pointer" /></label>
        <label className="text-[13px] font-mono">BG <input aria-label="Background color" type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="ml-1 h-8 w-10 align-middle cursor-pointer" /></label>
        <div className="px-4 py-2 rounded font-mono text-[13px] font-semibold" style={{ color: fg, backgroundColor: bg }}>
          {ratio.toFixed(2)}:1 — {verdict}
        </div>
      </div>
    </Stage>
  );
}

function A11yLandmarkTreeDemo() {
  return (
    <Stage label="Required Semantic Landmark Progression" caption="Screen-reader rotor navigation depends on unique landmarks and sequential h1-h3 headings.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`<header>  (Skip link -> Navigation -> Theme Toggle)\n<main id="main-content">\n  <article>\n    <h1>Document Title</h1>\n    <section aria-labelledby="sec-1"><h2>Section</h2></section>\n    <aside>Why callout / Provenance</aside>\n  </article>\n</main>\n<footer>  (Corpus & Repository Links)`}</code></pre>
    </Stage>
  );
}

/* 3. foundations/theming */
function ThemingDriftMatrixDemo() {
  const sampleIds: BrandProfileId[] = ['editorial-sandstone', 'playful-principal', 'hacienda-emerald'];
  return (
    <Stage label="Engineered Drift: 3 Live Brand Profiles Under One Structural Law" caption="Surfaces, marks, and radii drift per property while 8pt rhythm, >=13px floor, and WCAG luminance remain locked.">
      <div className="grid gap-4 sm:grid-cols-3">
        {sampleIds.map((id) => {
          const p = BRAND_PROFILES[id];
          return (
            <div key={id} className="p-4 border-t-2" style={{ backgroundColor: p.tokens.light['--a-bg'], color: p.tokens.light['--a-ink'], borderColor: p.tokens.light['--a-accent'] }}>
              <p className="font-mono text-[13px] font-bold" style={{ color: p.tokens.light['--a-accent-text'] }}>{p.mark} {p.id}</p>
              <p className="font-serif text-lg font-semibold mt-1">{p.name}</p>
              <span className="mt-3 inline-block px-3 py-1 text-[13px] font-mono" style={{ backgroundColor: p.tokens.light['--a-accent-fill'], color: '#FFFFFF', borderRadius: p.structure?.ctaRadius ?? '6px' }}>Action</span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

function ThemingDefineBuilderDemo() {
  const [brandId, setBrandId] = useState<BrandProfileId>('playful-principal');
  const prof = BRAND_PROFILES[brandId];
  const derived = useMemo(() => deriveAccessibleAccent(prof.tokens.light['--a-accent'], prof.tokens.light['--a-bg']), [prof]);
  return (
    <Stage
      label="defineAccentTheme() Live Output"
      controls={<Seg label="Dialect" value={brandId} onChange={setBrandId} options={[{ id: 'editorial-sandstone', label: 'Pipes' }, { id: 'playful-principal', label: 'CHB :-]' }, { id: 'terracotta-civic', label: 'Marigold' }]} />}
      caption="Select a dialect to inspect derived AA fill & text tokens."
    >
      <div className="grid gap-3 sm:grid-cols-3 text-[13px] font-mono">
        <div className="p-3 rounded border border-[var(--a-rule)]"><span className="block opacity-70">Raw Mark</span><strong>{derived.markHex}</strong></div>
        <div className="p-3 rounded border border-[var(--a-rule)]"><span className="block opacity-70">CTA Fill ({derived.fillContrastRatio}:1)</span><strong>{derived.fillHex}</strong></div>
        <div className="p-3 rounded border border-[var(--a-rule)]"><span className="block opacity-70">Inline Text ({derived.textContrastRatio}:1)</span><strong>{derived.inlineTextHex}</strong></div>
      </div>
    </Stage>
  );
}

function ThemingLayerBoundaryDemo() {
  return (
    <Stage label="Layer 1 Invariants vs. Layer 2 Brand Adapter" caption="Projects freely override Layer 2 tokens in STYLES.md without ever altering Layer 1 mathematical invariants.">
      <div className="grid gap-4 sm:grid-cols-2 text-[13px]">
        <div className="p-4 border-l-4 border-[#111827] bg-[var(--a-surface)]">
          <p className="font-mono font-bold uppercase tracking-wider mb-2">Layer 1 · Locked Core</p>
          <p>8pt spatial grid · &gt;= 13px floor · &gt;= 44×44px targets · GPU-only transforms · AAA body contrast</p>
        </div>
        <div className="p-4 border-l-4 border-[#FE299E] bg-[var(--a-surface)]">
          <p className="font-mono font-bold uppercase tracking-wider mb-2">Layer 2 · Free Drift</p>
          <p>--a-bg / --a-ink / --a-accent · Display serif/sans pairing · CTA radius · Signature mark</p>
        </div>
      </div>
    </Stage>
  );
}

function ThemingProfileSpecimenDemo() {
  return (
    <Stage label="Generated Dialect Adapter Payload" caption="Downstream repositories import a compiled BrandProfile rather than redeclaring tokens manually.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`defineAccentTheme({\n  id: 'marigold-civic',\n  extends: 'terracotta-civic',\n  mark: '§',\n  tokens: { light: { '--a-bg': '#FDFBF7', '--a-accent-fill': '#AD3617' } }\n});`}</code></pre>
    </Stage>
  );
}

function ThemingContrastPairsDemo() {
  const pairs = ['body-ink-on-bg >= 7.0:1', 'muted-on-bg >= 4.5:1', 'primary-cta-fill >= 4.5:1', 'accent-text-on-bg >= 4.5:1', 'sky-text-on-bg >= 4.5:1'];
  return (
    <Stage label="5 Audited Contrast Pairs Enforced Per Dialect" caption="validateThemeContrast() fails CI whenever light or dark palettes dip beneath threshold.">
      <ul className="divide-y divide-[var(--a-rule)] text-[13px] font-mono">
        {pairs.map((p, idx) => (
          <li key={p} className="py-2 flex items-center justify-between">
            <span>0{idx + 1} · {p}</span>
            <Tag tone="good">PASS</Tag>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

/* 4. components/pedestal */
function PedestalDensityRuleDemo() {
  const [view, setView] = useState<'few' | 'many'>('few');
  return (
    <Stage
      label="Item Density Switches Pedestal vs. Hairline Ledger"
      controls={<Seg label="Count" value={view} onChange={setView} options={[{ id: 'few', label: '3 Featured -> Pedestals' }, { id: 'many', label: '12+ Directory -> Ledger' }]} />}
      caption="Open pedestals carry 3-column showcases; ledgers compress dense directories into scannable horizontal hairlines."
    >
      {view === 'few' ? (
        <div className="grid gap-6 sm:grid-cols-3">
          {['pipe\\stoicism', 'pipe\\typography', 'pipe\\chb'].map((slug, i) => (
            <div key={slug} className={`pt-4 border-t-2 ${i === 0 ? 'border-[#FE299E]' : 'border-[#111827]'}`}>
              <p className="font-mono text-[13px] font-semibold">{slug}</p>
              <p className="font-serif text-lg mt-1">Featured Collection {i + 1}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)] text-[13px] font-mono">
          {['pipe\\economics · 42 notes', 'pipe\\systems · 31 notes', 'pipe\\history · 19 notes', 'pipe\\rhetoric · 28 notes'].map((row) => (
            <div key={row} className="py-2.5 flex justify-between"><span>{row.split(' · ')[0]}</span><span className="tabular-nums opacity-70">{row.split(' · ')[1]}</span></div>
          ))}
        </div>
      )}
    </Stage>
  );
}

function PedestalNestingDontDemo() {
  return (
    <DoDont
      label="Open Canvas Pedestal vs. Nested Card Soup"
      doExample={<div className="pt-4 border-t-2 border-[#FE299E]"><p className="font-mono text-[13px]">01 · Archival Rule</p><p className="font-serif text-xl mt-1">Typography carries hierarchy directly on sandstone.</p></div>}
      dontExample={<div className="rounded-xl bg-white p-3 shadow-md border"><div className="rounded-lg bg-gray-50 p-3 border text-[13px]">Card inside a card with drop-shadow and inner pill</div></div>}
      doWhy="Zero nested boxes lets content sit cleanly on the paper canvas."
      dontWhy="Box-in-box nesting creates optical stripes and wastes mobile horizontal width."
    />
  );
}

function PedestalAnatomyDemo() {
  return (
    <Stage label="Open Pedestal Redlines" caption="2px top border anchors reading start; generous gap-y-14 separates rows without vertical boxes.">
      <div className="max-w-md pt-5 border-t-2 border-[#FE299E]">
        <DimH width="100%" label="100% column width · border-t-2 focal rule" />
        <p className="font-mono text-[13px] mt-2 text-[#B8326D]">pipe\website-design · 18 nodes</p>
        <p className="font-serif text-2xl mt-1">De-Cardified Architecture</p>
        <p className="text-sm opacity-75 mt-2">Generous 24px top spacing separates rule from headline cleanly.</p>
      </div>
    </Stage>
  );
}

function PedestalHeadingTreeDemo() {
  return (
    <Stage label="Pedestal Landmark & Heading Hierarchy" caption="Each pedestal is an <article> or list item; headings advance in strict document order (h2 -> h3).">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`<section aria-labelledby="featured-heading">\n  <h2 id="featured-heading">Featured Pipes</h2>\n  <div className="grid lg:grid-cols-3">\n    <article><h3>pipe\\stoicism</h3>...</article>\n  </div>\n</section>`}</code></pre>
    </Stage>
  );
}

/* 5. components/table */
function TableTabularNumsDemo() {
  return (
    <DoDont
      label="Numeric Column Alignment (tabular-nums)"
      doExample={<div className="font-mono text-[13px] tabular-nums space-y-1"><div className="flex justify-between"><span>NIM Spread</span><span>3.41%</span></div><div className="flex justify-between"><span>RoAA Ratio</span><span>1.08%</span></div></div>}
      dontExample={<div className="font-sans text-[13px] space-y-1"><div className="flex justify-between"><span>NIM Spread</span><span>1.11%</span></div><div className="flex justify-between"><span>RoAA Ratio</span><span>8.88%</span></div></div>}
      doWhy="tabular-nums keeps decimals aligned down a ledger column for rapid scanning."
      dontWhy="Proportional numerals shift left and right between rows."
    />
  );
}

function TableCellRestraintDemo() {
  return (
    <DoDont
      label="Single-Datum Table Cells"
      doExample={<div className="py-2 border-b border-[var(--a-rule)] flex justify-between text-[13px]"><span>Q3 Deposit Beta</span><span className="font-mono tabular-nums">41.2%</span></div>}
      dontExample={<div className="p-2 border rounded bg-white text-[13px]"><span>Q3 Beta</span> <span className="border px-1">41.2%</span> <button type="button" className="underline ml-2">Edit</button></div>}
      doWhy="Horizontal hairlines and plain values let comparison happen at a glance."
      dontWhy="Stuffing cards or toolbars inside cells breaks visual scanlines."
    />
  );
}

function TableAnatomyRedlineDemo() {
  const [compact, setCompact] = useState<'editorial' | 'financial'>('financial');
  return (
    <Stage
      label="Hairline Table Spacing Spec"
      controls={<Seg label="Density" value={compact} onChange={setCompact} options={[{ id: 'editorial', label: 'Editorial (py-3.5)' }, { id: 'financial', label: 'Ledger (tabular)' }]} />}
      caption="No vertical borders; every row keeps >= 44px touch clearance when interactive."
    >
      <table className="w-full text-[13px] border-collapse">
        <thead><tr className="border-b-2 border-[#111827] text-left font-mono"><th>Metric</th><th className="text-right">Value</th></tr></thead>
        <tbody className="divide-y divide-[var(--a-rule)]">
          <tr><td className={compact === 'editorial' ? 'py-3.5' : 'py-3'}>Tier-1 Capital Ratio</td><td className="text-right font-mono tabular-nums">14.20%</td></tr>
          <tr><td className={compact === 'editorial' ? 'py-3.5' : 'py-3'}>Cost of Funds</td><td className="text-right font-mono tabular-nums">2.18%</td></tr>
        </tbody>
      </table>
    </Stage>
  );
}

function TableScrollRegionDemo() {
  return (
    <Stage label="Keyboard-Scrollable Mobile Table Wrapper" caption="Wide ledgers wrap in overflow-x-auto role='region' tabIndex={0} so 390px screens scroll the table alone, never the viewport.">
      <div role="region" aria-label="Scrollable ledger sample" tabIndex={0} className="max-w-[300px] overflow-x-auto border border-[var(--a-rule)] p-2">
        <table className="min-w-[460px] text-[13px] font-mono">
          <thead><tr className="border-b border-[#111827]"><th>Period</th><th>Assets</th><th>Deposits</th><th>NIM</th></tr></thead>
          <tbody><tr><td className="py-2">2026-Q3</td><td>\$4.2B</td><td>\$3.5B</td><td>3.41%</td></tr></tbody>
        </table>
      </div>
    </Stage>
  );
}

/* 6. components/command-palette */
function CmdInstantFilterDemo() {
  const [q, setQ] = useState('');
  const items = ['pipe\\stoicism', 'pipe\\typography', 'pipe\\local-first', 'pipe\\commercial-banking', 'pipe\\marigold'];
  const matches = items.filter((x) => x.toLowerCase().includes(q.toLowerCase()));
  return (
    <Stage label="Single-Row Instant Client Filter" caption="Under 500 items, filter instantaneously per keystroke without a submit reload.">
      <input type="search" aria-label="Filter sample pipes" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter pipes (e.g. local)..." className="w-full h-11 px-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-well)] text-sm" />
      <p className="mt-2 font-mono text-[13px] text-[var(--a-muted)]">{matches.length} matched: {matches.join(', ') || 'None'}</p>
    </Stage>
  );
}

function CmdZeroRecoveryDemo() {
  const [cleared, setCleared] = useState(false);
  return (
    <Stage label="Constructive Zero-State Recovery" caption="Zero-match queries never strand users; a 44px reset action restores the list in one tap.">
      <div className="p-4 border-l-2 border-[#FE299E] bg-[var(--a-surface)] flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm">{cleared ? 'Filter reset · Showing all 260 public Pipes.' : '0 Pipes matched "qwerty99".'}</span>
        <button type="button" onClick={() => setCleared((v) => !v)} className="min-h-[44px] px-4 rounded-md border border-[var(--a-ink)] font-mono text-[13px] cursor-pointer">
          {cleared ? 'Simulate Empty Query' : 'Clear Search ×'}
        </button>
      </div>
    </Stage>
  );
}

function CmdHeightRedlineDemo() {
  return (
    <Stage label="44px Command Bar Height Redline" caption="Category controls and search stay aligned on one horizontal row.">
      <div className="flex flex-wrap items-center gap-2">
        <span className="min-h-[44px] inline-flex items-center px-3 rounded-full bg-[#111827] text-[#FAF8F5] text-[13px] font-mono">All</span>
        <span className="min-h-[44px] inline-flex items-center px-3 rounded-full border border-[var(--a-rule)] text-[13px] font-mono">Philosophy</span>
        <span className="min-h-[44px] inline-flex items-center px-4 rounded-full border border-[#FE299E] text-[13px] flex-1 min-w-[160px]">Search ⌘K... (h-11 / 44px)</span>
      </div>
    </Stage>
  );
}

function CmdAriaPressedDemo() {
  const [active, setActive] = useState('All');
  return (
    <Stage label="Live aria-pressed & type='search' Attributes" caption="Screen readers receive explicit toggle state on every category control.">
      <div className="flex flex-wrap gap-2">
        {['All', 'Foundations', 'AI Patterns'].map((tab) => (
          <button key={tab} type="button" aria-pressed={active === tab} onClick={() => setActive(tab)} className={`min-h-[44px] px-4 rounded-md font-mono text-[13px] cursor-pointer border ${active === tab ? 'border-[#FE299E] font-bold' : 'border-[var(--a-rule)]'}`}>
            {tab} ({active === tab ? 'aria-pressed=true' : 'false'})
          </button>
        ))}
      </div>
    </Stage>
  );
}

/* 7. components/code-block */
function CodeCopyChoreographyDemo() {
  const [copied, setCopied] = useState(false);
  return (
    <Stage label="1500ms Clipboard Copy Choreography" caption="Explicit Copy -> Copied state avoids silent clicks.">
      <div className="flex items-center justify-between p-3 rounded bg-[#111827] text-[#F3EFE9] font-mono text-[13px]">
        <code>npx accent init --brand playful-principal</code>
        <button type="button" onClick={() => { setCopied(true); window.setTimeout(() => setCopied(false), 1500); }} className="min-h-[38px] px-3 rounded bg-white/10 hover:bg-white/20 cursor-pointer">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </Stage>
  );
}

function CodeLanguageHeaderDemo() {
  return (
    <DoDont
      label="Explicit Language & Path Header"
      doExample={<div className="rounded bg-[#111827] text-[#F3EFE9] overflow-hidden font-mono text-[13px]"><div className="px-3 py-2 border-b border-white/10 text-[#FE299E]">STYLES.md · Markdown</div><pre className="p-3">brand: editorial-sandstone</pre></div>}
      dontExample={<pre className="p-3 rounded bg-gray-200 text-[13px]">brand: editorial-sandstone (unlabeled)</pre>}
      doWhy="A file + language header tells humans and AI coding agents immediately where the snippet belongs."
      dontWhy="Raw unlabeled grey blocks blur prose into code."
    />
  );
}

function CodeTokenAnatomyDemo() {
  return (
    <Stage label="Archival Espresso Specimen Anatomy" caption="JetBrains Mono >= 13px with 1.6 leading prevents glyph collisions (0/O, 1/l/I).">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`// bg: #111827 · ink: #F3EFE9 · min: 13px · leading: 1.6\nconst контраст = getContrastRatio('#F3EFE9', '#111827'); // 15.86:1 AAA`}</code></pre>
    </Stage>
  );
}

function CodeScrollTabindexDemo() {
  return (
    <Stage label="Focusable Overflow + Polite Copy Status" caption="Long commands scroll cleanly inside tabIndex={0} while aria-live announces clipboard status.">
      <pre tabIndex={0} aria-label="Scrollable shell snippet" className={SURFACE_CODE}><code>{`curl -sL "https://design.pipes.pink/styles.md?brand=editorial-sandstone" > STYLES.md && echo "READY"`}</code></pre>
    </Stage>
  );
}

/* 8. components/accordion */
function AccordionEscapeHatchDemo() {
  return (
    <Stage label="Native <details> Progressive Disclosure" caption="Native HTML <details>/<summary> handles keyboard toggles, Find-in-Page expansion, and Screen Readers with zero JS state bugs.">
      <details className="accent-disclosure border-y border-[var(--a-rule)] py-2">
        <summary className="min-h-[44px] flex items-center gap-2 font-mono text-[13px] font-semibold cursor-pointer">
          Optional: Inject Custom CSS &amp; Section 5 Rules
        </summary>
        <div className="pt-2 pb-3 text-sm text-[var(--a-muted)]">
          Overrides declared inside <code>customExtension.css</code> load downstream while preserving Layer 1 AAA luminance math.
        </div>
      </details>
    </Stage>
  );
}

function AccordionSummaryHeadingDemo() {
  return (
    <DoDont
      label="Keep Headings Out of <summary> (modern-web-guidance)"
      doExample={<div className="space-y-1"><h3 className="font-serif text-base font-semibold">Custom Dialect Overrides</h3><details className="border-b border-[var(--a-rule)] py-1"><summary className="cursor-pointer font-mono text-[13px]">View customExtension CSS</summary></details></div>}
      dontExample={<details className="border p-2"><summary><h3>heading inside summary breaks JAWS/TalkBack</h3></summary></details>}
      doWhy="JAWS and TalkBack expose summary as a button and strip inner heading semantics, so headings must live outside or stay plain phrasing."
      dontWhy="Nesting <h3> inside <summary> erases heading navigation for screen-reader users."
    />
  );
}

function AccordionDetailsSpecDemo() {
  return (
    <Stage label="Native ::details-content Disclosure Transition" caption="Uses interpolate-size + allow-discrete only inside prefers-reduced-motion: no-preference — zero max-height layout thrash.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`@media (prefers-reduced-motion: no-preference) {\n  details.accent-disclosure::details-content {\n    transition: block-size 220ms cubic-bezier(0.16, 1, 0.3, 1), content-visibility 220ms allow-discrete;\n  }\n}`}</code></pre>
    </Stage>
  );
}

function AccordionKeyboardStateDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Stage label="Native Toggle State & Find-in-Page Readiness" caption="Enter or Space toggles disclosure state cleanly; Ctrl+F / Cmd+F auto-expands native <details>.">
      <details open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)} className="border border-[var(--a-rule)] rounded p-3">
        <summary className="min-h-[44px] flex items-center font-mono text-[13px] font-semibold cursor-pointer">
          Disclosure State: {open ? 'OPEN (visible to screen readers)' : 'COLLAPSED (auto-opens on Cmd+F)'}
        </summary>
        <p className="mt-2 text-sm text-[var(--a-muted)]">Hidden text inside details remains searchable via browser Find-in-Page without custom JavaScript hacks.</p>
      </details>
    </Stage>
  );
}

/* 9. components/sheet */
function SheetDismissPathsDemo() {
  const [lastPath, setLastPath] = useState<string>('Ready — test any dismissal path below');
  return (
    <Stage label="Three Redundant Sheet Dismissal Paths" caption="Users can always dismiss overlays via Close button, backdrop tap, or Escape key.">
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setLastPath('Dismissed via 44×44px Close × button')} className="min-h-[44px] px-3 rounded border border-[var(--a-rule)] font-mono text-[13px] cursor-pointer">Trigger × Close</button>
        <button type="button" onClick={() => setLastPath('Dismissed via dimmed backdrop tap')} className="min-h-[44px] px-3 rounded border border-[var(--a-rule)] font-mono text-[13px] cursor-pointer">Trigger Backdrop</button>
        <button type="button" onClick={() => setLastPath('Dismissed via Escape keydown listener')} className="min-h-[44px] px-3 rounded border border-[var(--a-rule)] font-mono text-[13px] cursor-pointer">Trigger Escape</button>
      </div>
      <p className="mt-3 font-mono text-[13px] text-[var(--a-accent-text)]">Last path verified: {lastPath}</p>
    </Stage>
  );
}

function SheetThumbZoneDemo() {
  return (
    <DoDont
      label="85vh Mobile Bottom Sheet vs. Top-Corner Drawer"
      doExample={<div className="h-28 border border-[var(--a-rule)] rounded flex flex-col justify-end p-2 bg-[#E8E2D5]/50"><div className="bg-[var(--a-well)] rounded-t-xl border-t-2 border-[#FE299E] p-2 text-[13px] font-mono">85vh Sheet in Thumb Zone</div></div>}
      dontExample={<div className="h-28 border border-[var(--a-rule)] rounded p-2"><div className="text-[13px] font-mono border-b pb-1">Top-left drawer requires two-hand stretch</div></div>}
      doWhy="Mobile visitors already hold phones near the bottom third; sheets rise cleanly into thumb reach."
      dontWhy="Top-corner drawers push primary navigation out of one-handed reach on 390×844 viewports."
    />
  );
}

function SheetSpringTokensDemo() {
  const [reduced, setReduced] = useState(false);
  return (
    <Stage label="SHEET_SLIDE_UP & Reduced Motion Collapse" controls={<Seg label="Motion" value={reduced ? 'reduced' : 'full'} onChange={(v) => setReduced(v === 'reduced')} options={[{ id: 'full', label: 'Default 320ms' }, { id: 'reduced', label: 'Reduced <= 120ms' }]} />} caption="Uses GPU transform translateY only; collapses spatial slide when prefers-reduced-motion is active.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{reduced ? `initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.1 } }` : `initial: { y: '100%' }, animate: { y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } }`}</code></pre>
    </Stage>
  );
}

function SheetDialogAriaDemo() {
  return (
    <Stage label="Dialog ARIA Attributes & Focus Return" caption="Sheets declare role='dialog', aria-modal='true', and restore focus to the invoking trigger on close.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`<div role="dialog" aria-modal="true" aria-label="Navigation menu" className="max-h-[85vh] rounded-t-2xl">\n  <button aria-label="Close navigation sheet" className="min-h-[44px] min-w-[44px]">×</button>\n</div>`}</code></pre>
    </Stage>
  );
}

/* 10. patterns/onboarding */
function OnboardJumpBarDemo() {
  const [arch, setArch] = useState<'all' | 'personal' | 'business' | 'topic'>('all');
  const rows = [
    { type: 'personal', label: '01 Personal · pipe\\dr-cyree' },
    { type: 'business', label: '02 Business · pipe\\chb' },
    { type: 'topic', label: '03 Topic · pipe\\local-first' },
  ].filter((r) => arch === 'all' || r.type === arch);
  return (
    <Stage label="Single-Row Archetype Jump Bar" controls={<Seg label="Archetype" value={arch} onChange={setArch} options={[{ id: 'all', label: 'All' }, { id: 'personal', label: '01 Personal' }, { id: 'business', label: '02 Business' }, { id: 'topic', label: '03 Topics' }]} />} caption="Shows concrete live humans, businesses, and subjects before protocol definitions.">
      <ul className="divide-y divide-[var(--a-rule)] text-[13px] font-mono">
        {rows.map((r) => <li key={r.label} className="py-2">{r.label}</li>)}
      </ul>
    </Stage>
  );
}

function OnboardCanvasCopyDemo() {
  return (
    <DoDont
      label="Canvas-Direct Summaries vs. Boxed Cards"
      doExample={<div className="pt-3 border-t-2 border-[#111827]"><p className="font-mono text-[13px]">02 · Business Canon</p><p className="text-sm mt-1">Descriptions sit directly on the sandstone canvas.</p></div>}
      dontExample={<div className="rounded-xl border bg-white p-3"><div className="rounded border p-2 text-[13px]">Inner summary box trapped inside outer white card</div></div>}
      doWhy="Removing inner borders reduces visual fatigue across 270+ Pipes."
      dontWhy="Nested borders steal attention away from headlines and sample notes."
    />
  );
}

function OnboardCadenceGridDemo() {
  const [cols, setCols] = useState<'1' | '2' | '3'>('3');
  return (
    <Stage label="Responsive Airy Grid Cadence" controls={<Seg label="Cols" value={cols} onChange={setCols} options={[{ id: '1', label: '390px (1 col)' }, { id: '2', label: '768px (2 col)' }, { id: '3', label: '1280px (3 col)' }]} />} caption="gap-x-10 lg:gap-x-12 gap-y-14 preserves editorial whitespace across viewports.">
      <div className={`grid gap-4 ${cols === '1' ? 'grid-cols-1' : cols === '2' ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {['01 Personal', '02 Business', '03 Topic'].map((x) => <div key={x} className="pt-3 border-t border-[var(--a-rule)] font-mono text-[13px]">{x}</div>)}
      </div>
    </Stage>
  );
}

function OnboardLandmarkSectionsDemo() {
  return (
    <Stage label="Archetype Section Landmarks" caption="Each discovery band declares an explicit <section aria-labelledby> with sequential <h2> headings.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`<main>\n  <section aria-labelledby="personal-h2"><h2 id="personal-h2">How Personal Pipes Work</h2></section>\n  <section aria-labelledby="business-h2"><h2 id="business-h2">How Business Pipes Work</h2></section>\n</main>`}</code></pre>
    </Stage>
  );
}

/* 11. patterns/cross-platform */
function PlatformTokenParityDemo() {
  const [profile, setProfile] = useState<BrandProfileId>('editorial-sandstone');
  const p = BRAND_PROFILES[profile];
  const targets = ['Web 1440px', 'Mobile 390px', 'Chrome Ext 400px', 'Tauri Desktop'];
  return (
    <Stage label="4 Surfaces Consuming One Brand Profile" controls={<Seg label="Profile" value={profile} onChange={setProfile} options={[{ id: 'editorial-sandstone', label: 'Sandstone' }, { id: 'playful-principal', label: 'CHB' }, { id: 'greater-terminal', label: 'Greater >' }]} />} caption="Switching Brand Profile updates web, mobile, extension side-panel, and native desktop simultaneously.">
      <div className="grid gap-3 sm:grid-cols-4">
        {targets.map((t) => (
          <div key={t} className="p-3 border-t-2 text-[13px] font-mono" style={{ backgroundColor: p.tokens.light['--a-bg'], color: p.tokens.light['--a-ink'], borderColor: p.tokens.light['--a-accent'] }}>
            <span className="block font-bold">{p.mark}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function PlatformFloorInExtDemo() {
  return (
    <Stage label="13px Floor Preserved Inside 400px Side Panel" caption="Extension popups reduce columns to 1 without shrinking prose or metadata below 13px.">
      <div className="max-w-[360px] border border-[var(--a-rule)] p-4 bg-[var(--a-surface)] space-y-2">
        <p className="font-mono text-[13px] font-bold text-[var(--a-accent-text)]">Clip to pipe\design · 400×600</p>
        <p className="text-[14px] leading-relaxed">Selected quote saved with cryptographic SHA-256 provenance.</p>
      </div>
    </Stage>
  );
}

function PlatformBreakpointSwitcherDemo() {
  const [vp, setVp] = useState<'mobile' | 'ext' | 'desktop'>('mobile');
  const desc = vp === 'mobile' ? '390px · 1 column · 85vh bottom sheet' : vp === 'ext' ? '400px · 1 column · 4-tab pill bar' : '1440px · 3 pedestals / 12-col grid';
  return (
    <Stage label="Cross-Platform Breakpoint Adaptation" controls={<Seg label="Target" value={vp} onChange={setVp} options={[{ id: 'mobile', label: '390px Mobile' }, { id: 'ext', label: '400px Ext' }, { id: 'desktop', label: '1440px Web' }]} />} caption="Column geometry adapts while token semantics remain invariant.">
      <p className="font-mono text-[13px] p-3 border-l-2 border-[#FE299E] bg-[var(--a-surface)]">{desc}</p>
    </Stage>
  );
}

function PlatformReducedMotionSyncDemo() {
  return (
    <Stage label="OS Reduced Motion & Color-Scheme Cascade" caption="All 4 runtimes honor prefers-reduced-motion and prefers-color-scheme uniformly.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { transition-duration: 120ms !important; animation-iteration-count: 1 !important; }\n}`}</code></pre>
    </Stage>
  );
}

/* 12. ai/styles-md */
function StylesMdAnatomyTabsDemo() {
  const [sec, setSec] = useState<'01' | '03' | '05'>('05');
  const map = {
    '01': '01 · Brand Identity: Profile ID, signature mark (´ / :-] / >), Accént 3.1 contract version.',
    '03': '03 · Layer 2 Token Table: Semantic --a-bg, --a-ink, --a-accent, --a-accent-fill pairs for light & dark.',
    '05': '05 · customExtension Escape Hatch: Local CSS overrides and project-specific rules preserved across syncs.',
  };
  return (
    <Stage label="STYLES.md 5-Section Contract Explorer" controls={<Seg label="Section" value={sec} onChange={setSec} options={[{ id: '01', label: '01 Identity' }, { id: '03', label: '03 Tokens' }, { id: '05', label: '05 Escape Hatch' }]} />} caption="Agents read STYLES.md deterministically without guessing design intent.">
      <p className="text-sm font-mono p-3 border-l-2 border-[#FE299E] bg-[var(--a-surface)]">{map[sec]}</p>
    </Stage>
  );
}

function StylesMdAgentsSplitDemo() {
  return (
    <DoDont
      label="Separate Operational AGENTS.md from Design STYLES.md"
      doExample={<div className="font-mono text-[13px] space-y-1"><p>AGENTS.md -&gt; DB, tests, deploys</p><p>STYLES.md -&gt; Tokens, UI rules, Escape Hatch</p></div>}
      dontExample={<p className="font-mono text-[13px]">Dump CSS hex rules + migration commands into one 900-line prompt</p>}
      doWhy="Separating concerns prevents model context dilution and removes cross-repo PR bottlenecks."
      dontWhy="Mixing git safety gates with UI aesthetics causes agents to forget token constraints."
    />
  );
}

function StylesMdCurlPreviewDemo() {
  const [brand, setBrand] = useState('editorial-sandstone');
  return (
    <Stage label="Zero-PR STYLES.md Fetch & Extension" controls={<Seg label="Dialect" value={brand} onChange={setBrand} options={[{ id: 'editorial-sandstone', label: 'Sandstone' }, { id: 'playful-principal', label: 'CHB' }, { id: 'greater-terminal', label: 'Greater' }]} />} caption="Pull any brand contract as plain text/markdown over HTTP.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`curl -sL "https://design.pipes.pink/styles.md?brand=${brand}" > STYLES.md`}</code></pre>
    </Stage>
  );
}

function StylesMdContrastEmbedDemo() {
  return (
    <Stage label="Embedded Contrast Ledger Inside Every STYLES.md" caption="Downstream coding agents verify mathematical AAA/AA compliance from the contract itself.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`## Automated WCAG 2.1 Audit\n- body-ink-on-bg (Light): 13.78:1 PASS AAA\n- primary-cta-fill:       5.60:1 PASS AA`}</code></pre>
    </Stage>
  );
}

/* 13. ai/agent-adapters */
function AdapterForkWorkflowDemo() {
  const [step, setStep] = useState<'1' | '2' | '3'>('1');
  const copy = {
    '1': '01 Invoke: Fetch canonical motion tokens + base STYLES.md from accent-ui or /styles.md.',
    '2': '02 Adapt: Instantiate defineAccentTheme() in local accent.config.ts without upstream PR waits.',
    '3': '03 Experiment: Document local variants inside Section 5 customExtension under Layer 1 math.',
  };
  return (
    <Stage label="3-Step Fork-and-Adapt Protocol" controls={<Seg label="Step" value={step} onChange={setStep} options={[{ id: '1', label: '01 Invoke' }, { id: '2', label: '02 Adapt' }, { id: '3', label: '03 Experiment' }]} />} caption="Empowers sibling repos (chb-corporate-site, marigold, highdraw) to move independently.">
      <p className="text-sm font-mono p-3 border-l-2 border-[#FE299E] bg-[var(--a-surface)]">{copy[step]}</p>
    </Stage>
  );
}

function AdapterLazyMotionDemo() {
  return (
    <DoDont
      label="GPU-Safe Motion Under <LazyMotion>"
      doExample={<pre className="font-mono text-[13px]">transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1)</pre>}
      dontExample={<pre className="font-mono text-[13px]">transition: all 400ms; height: auto;</pre>}
      doWhy="Only compositing properties (transform, opacity) hold 60fps across low-power laptops and phones."
      dontWhy="transition-all triggers layout recalculations and stutters during stream updates."
    />
  );
}

function AdapterTierInspectorDemo() {
  const [tier, setTier] = useState<'t1' | 't2'>('t1');
  return (
    <Stage label="Two-Tier Motion Physics" controls={<Seg label="Tier" value={tier} onChange={setTier} options={[{ id: 't1', label: 'Tier 1 Operational' }, { id: 't2', label: 'Tier 2 Editorial' }]} />} caption="Fast tactile buttons never wait for slow editorial curtains.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{tier === 't1' ? `DURATION.base = 200ms · ease: [0.16, 1, 0.3, 1] · TAP: scale(0.97)` : `EDITORIAL_DURATION.reveal = 850ms · ease: [0.22, 1, 0.36, 1] · RiseLines`}</code></pre>
    </Stage>
  );
}

function AdapterMotionAuditDemo() {
  return (
    <Stage label="Reduced-Motion Safety Contract" caption="useReducedMotion() collapses Y-displacement and holds fade transitions <= 120ms.">
      <p className="text-sm font-mono p-3 border border-[var(--a-rule)] bg-[var(--a-surface)]">Ambient infinite loops are forbidden on reading surfaces; only the discrete &lt;Smile /&gt; punctuation mark breathes and halts immediately when reduced motion is active.</p>
    </Stage>
  );
}

/* 14. ai/mcp-and-cli */
function McpToolRosterDemo() {
  const [tool, setTool] = useState<'search' | 'spec' | 'brand' | 'lint'>('search');
  const map = {
    search: 'accent_search_patterns({ query: "evaluating provenance", limit: 5 })',
    spec: 'accent_get_spec({ slug: "patterns/evaluating", includeTabs: true })',
    brand: 'accent_get_brand_contract({ brand: "editorial-sandstone", format: "styles.md" })',
    lint: 'accent_lint_code({ code: "<Sparkles /><div className=\\"text-[10px]\\"></div>" })',
  };
  return (
    <Stage label="Live Accént MCP Tools (/api/mcp & stdio CLI)" controls={<Seg label="Tool" value={tool} onChange={setTool} options={[{ id: 'search', label: 'search' }, { id: 'spec', label: 'get_spec' }, { id: 'brand', label: 'brand_contract' }, { id: 'lint', label: 'lint_code' }]} />} caption="All 4 Accént MCP tools execute deterministically over JSON-RPC 2.0.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{map[tool]}</code></pre>
    </Stage>
  );
}

function McpDeterministicDontDemo() {
  return (
    <DoDont
      label="Structured MCP / JSON vs. HTML Scraping"
      doExample={<pre className="font-mono text-[13px]">POST /api/mcp -&gt; accent_get_spec</pre>}
      dontExample={<pre className="font-mono text-[13px]">Scrape DOM &lt;div&gt; wrappers &amp; guess token names</pre>}
      doWhy="MCP returns exact markdown specs, regex violationPatterns, and live contrast reports."
      dontWhy="HTML scraping bloats context windows and breaks across minor template refactors."
    />
  );
}

function McpJsonRpcEnvelopeDemo() {
  return (
    <Stage label="JSON-RPC 2.0 Request Envelope" caption="Copy directly into Claude Desktop, Cursor, or Antigravity MCP config.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`{\n  "jsonrpc": "2.0",\n  "id": 1,\n  "method": "tools/call",\n  "params": { "name": "accent_get_brand_contract", "arguments": { "brand": "playful-principal" } }\n}`}</code></pre>
    </Stage>
  );
}

function McpCliA11yDemo() {
  return (
    <Stage label="Plain-Text & Keyboard Accessible Terminal Payloads" caption="MCP outputs strip noisy ANSI escape sequences so screen readers and small CLI wrappers parse reliably inside tabIndex={0} regions.">
      <pre tabIndex={0} className={SURFACE_CODE}><code>{`[OK] accent_lint_code -> 0 violations (type floor, nested interactive, sparkle check)`}</code></pre>
    </Stage>
  );
}

/* 15. ai/contributing-back */
function ContributeGraduationFlowDemo() {
  const [stage, setStage] = useState<'1' | '2' | '3' | '4'>('3');
  const notes = {
    '1': '01 Private Experiment: Validate UX inside one repo first (e.g. pipes-unified or marigold).',
    '2': '02 Incubate: Register extension rules inside local STYLES.md Section 5 (customExtension).',
    '3': '03 Parameterize: Replace every raw hex with semantic var(--a-*) and verify >= 44px hit boxes.',
    '4': '04 Graduate: Port to accent-ui + pipes-unified registry and update MCP search index.',
  };
  return (
    <Stage label="4-Stage Upstream Graduation Stepper" controls={<Seg label="Stage" value={stage} onChange={setStage} options={[{ id: '1', label: '01' }, { id: '2', label: '02' }, { id: '3', label: '03' }, { id: '4', label: '04' }]} />} caption="Keep local iteration fast while graduating proven primitives back to core.">
      <p className="text-sm font-mono p-3 border-l-2 border-[#FE299E] bg-[var(--a-surface)]">{notes[stage]}</p>
    </Stage>
  );
}

function ContributeHexCleanupDemo() {
  return (
    <DoDont
      label="Parameterize Tokens Before Upstreaming"
      doExample={<pre className="font-mono text-[13px]">border-[var(--a-accent)] bg-[var(--a-surface)]</pre>}
      dontExample={<pre className="font-mono text-[13px]">border-[#FE299E] bg-[#FAF8F5] // breaks dark &amp; Marigold</pre>}
      doWhy="Semantic tokens adapt automatically across all 7 official dialects and dark mode."
      dontWhy="Hardcoded hexes leak one brand's palette into every other imprint."
    />
  );
}

function ContributeRatchetSimDemo() {
  const checks = ['Zero raw hexes', '>= 13px type floor', '>= 44×44px targets', 'GPU-only transforms', 'AAA/AA contrast'];
  return (
    <Stage label="6-Point Upstream Verification Ratchet" caption="Components run typecheck, vitest, and build:lib before entering accent-ui.">
      <ul className="divide-y divide-[var(--a-rule)] text-[13px] font-mono">
        {checks.map((c, i) => <li key={c} className="py-2 flex justify-between"><span>0{i + 1} · {c}</span><Tag tone="good">VERIFIED</Tag></li>)}
      </ul>
    </Stage>
  );
}

function ContributeTriadA11yDemo() {
  return (
    <Stage label="Protecting Triad Contrast Across Downstream Forks" caption="Raw electric brand colors populate --a-accent marks while deriveAccessibleAccent handles button text math.">
      <div className="flex flex-wrap gap-3 text-[13px] font-mono">
        <span className="px-3 py-2 border-b-2 border-[#FE299E]">Mark --a-accent: #FE299E</span>
        <span className="px-3 py-2 rounded text-white" style={{ backgroundColor: '#B81468' }}>Button --a-accent-fill: #B81468 (5.6:1 AA)</span>
      </div>
    </Stage>
  );
}

export const PASS3_AND_AI_DEMOS: Record<string, React.ComponentType> = {
  'tokens-shadcn-bridge': TokensShadcnBridgeDemo,
  'tokens-floor-guard': TokensFloorGuardDemo,
  'tokens-dtcg-inspector': TokensDtcgInspectorDemo,
  'tokens-luminance-ladder': TokensLuminanceLadderDemo,
  'a11y-focus-ring': A11yFocusRingDemo,
  'a11y-senior-mode': A11ySeniorModeDemo,
  'a11y-wcag-math': A11yWcagMathDemo,
  'a11y-landmark-tree': A11yLandmarkTreeDemo,
  'theming-drift-matrix': ThemingDriftMatrixDemo,
  'theming-define-builder': ThemingDefineBuilderDemo,
  'theming-layer-boundary': ThemingLayerBoundaryDemo,
  'theming-profile-specimen': ThemingProfileSpecimenDemo,
  'theming-contrast-pairs': ThemingContrastPairsDemo,
  'pedestal-density-rule': PedestalDensityRuleDemo,
  'pedestal-nesting-dont': PedestalNestingDontDemo,
  'pedestal-anatomy': PedestalAnatomyDemo,
  'pedestal-heading-tree': PedestalHeadingTreeDemo,
  'table-tabular-nums': TableTabularNumsDemo,
  'table-cell-restraint': TableCellRestraintDemo,
  'table-anatomy-redline': TableAnatomyRedlineDemo,
  'table-scroll-region': TableScrollRegionDemo,
  'cmd-instant-filter': CmdInstantFilterDemo,
  'cmd-zero-recovery': CmdZeroRecoveryDemo,
  'cmd-height-redline': CmdHeightRedlineDemo,
  'cmd-aria-pressed': CmdAriaPressedDemo,
  'code-copy-choreography': CodeCopyChoreographyDemo,
  'code-language-header': CodeLanguageHeaderDemo,
  'code-token-anatomy': CodeTokenAnatomyDemo,
  'code-scroll-tabindex': CodeScrollTabindexDemo,
  'accordion-escape-hatch': AccordionEscapeHatchDemo,
  'accordion-summary-heading': AccordionSummaryHeadingDemo,
  'accordion-details-spec': AccordionDetailsSpecDemo,
  'accordion-keyboard-state': AccordionKeyboardStateDemo,
  'sheet-dismiss-paths': SheetDismissPathsDemo,
  'sheet-thumb-zone': SheetThumbZoneDemo,
  'sheet-spring-tokens': SheetSpringTokensDemo,
  'sheet-dialog-aria': SheetDialogAriaDemo,
  'onboard-jump-bar': OnboardJumpBarDemo,
  'onboard-canvas-copy': OnboardCanvasCopyDemo,
  'onboard-cadence-grid': OnboardCadenceGridDemo,
  'onboard-landmark-sections': OnboardLandmarkSectionsDemo,
  'platform-token-parity': PlatformTokenParityDemo,
  'platform-floor-in-ext': PlatformFloorInExtDemo,
  'platform-breakpoint-switcher': PlatformBreakpointSwitcherDemo,
  'platform-reduced-motion-sync': PlatformReducedMotionSyncDemo,
  'stylesmd-anatomy-tabs': StylesMdAnatomyTabsDemo,
  'stylesmd-agents-split': StylesMdAgentsSplitDemo,
  'stylesmd-curl-preview': StylesMdCurlPreviewDemo,
  'stylesmd-contrast-embed': StylesMdContrastEmbedDemo,
  'adapter-fork-workflow': AdapterForkWorkflowDemo,
  'adapter-lazy-motion': AdapterLazyMotionDemo,
  'adapter-tier-inspector': AdapterTierInspectorDemo,
  'adapter-motion-audit': AdapterMotionAuditDemo,
  'mcp-tool-roster': McpToolRosterDemo,
  'mcp-deterministic-dont': McpDeterministicDontDemo,
  'mcp-jsonrpc-envelope': McpJsonRpcEnvelopeDemo,
  'mcp-cli-a11y': McpCliA11yDemo,
  'contribute-graduation-flow': ContributeGraduationFlowDemo,
  'contribute-hex-cleanup': ContributeHexCleanupDemo,
  'contribute-ratchet-sim': ContributeRatchetSimDemo,
  'contribute-triad-a11y': ContributeTriadA11yDemo,
};
