'use client';

import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  Copy,
  Search,
  Sliders,
  Sparkles,
  Terminal,
  ShieldCheck,
  Code2,
  Eye,
  Volume2,
  ArrowRight,
  Smartphone,
  Monitor,
  Puzzle,
} from 'lucide-react';
import { Stage, Seg } from '../primitives';
import {
  BRAND_PROFILES,
  BRAND_PROFILE_LIST,
  deriveAccessibleAccent,
  generateStylesMarkdown,
  type BrandProfileId,
} from '@/styles/themes';

/* -------------------------------------------------------------------------- */
/* 1. foundations/tokens -> TriadExplorerDemo                                 */
/* -------------------------------------------------------------------------- */
function TriadExplorerDemo() {
  const [rawHex, setRawHex] = useState('#FE299E');
  const [canvasHex, setCanvasHex] = useState('#FAF8F5');
  const derived = deriveAccessibleAccent(rawHex, canvasHex);

  return (
    <Stage
      label="Live W3C DTCG Accent Triad Calculator (deriveAccessibleAccent)"
      caption="Pick any raw signature color. Accént mathematically derives --a-accent-fill (>= 4.6:1 with #FFFFFF) and --a-accent-text (>= 4.6:1 on canvas) in real time."
    >
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--a-muted)]">
              Raw Brand Signature (--a-accent)
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={rawHex}
                onChange={(e) => setRawHex(e.target.value)}
                className="h-10 w-12 rounded border border-[var(--a-rule)] cursor-pointer"
              />
              <input
                type="text"
                value={rawHex}
                onChange={(e) => /^#[0-9A-Fa-f]{0,6}$/.test(e.target.value) && setRawHex(e.target.value)}
                className="h-10 flex-1 rounded border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 font-mono text-sm"
              />
            </div>
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--a-muted)]">
              Active Page Canvas (--a-bg)
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={canvasHex}
                onChange={(e) => setCanvasHex(e.target.value)}
                className="h-10 w-12 rounded border border-[var(--a-rule)] cursor-pointer"
              />
              <input
                type="text"
                value={canvasHex}
                onChange={(e) => /^#[0-9A-Fa-f]{0,6}$/.test(e.target.value) && setCanvasHex(e.target.value)}
                className="h-10 flex-1 rounded border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 font-mono text-sm"
              />
            </div>
          </label>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--a-rule)]">
          <div className="p-4 rounded border border-[var(--a-rule)]" style={{ backgroundColor: canvasHex }}>
            <div className="text-xs font-mono uppercase tracking-wider text-[#4B5563]">01 · --a-accent (Mark)</div>
            <div className="mt-2 font-serif text-3xl font-bold" style={{ color: derived.markHex }}>
              : - ] · {derived.markHex}
            </div>
            <div className="mt-1 text-xs font-mono text-[#4B5563]">Punctuation, strike bars &amp; focus rings</div>
          </div>

          <div className="p-4 rounded border border-[var(--a-rule)]" style={{ backgroundColor: canvasHex }}>
            <div className="text-xs font-mono uppercase tracking-wider text-[#4B5563]">02 · --a-accent-fill (CTA)</div>
            <div className="mt-2">
              <span
                className="inline-flex items-center px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: derived.fillHex, color: derived.fillForegroundHex }}
              >
                Fill {derived.fillHex} ({derived.fillContrastRatio}:1 AA)
              </span>
            </div>
            <div className="mt-2 text-xs font-mono text-[#4B5563]">Guaranteed white-text button contrast</div>
          </div>

          <div className="p-4 rounded border border-[var(--a-rule)]" style={{ backgroundColor: canvasHex }}>
            <div className="text-xs font-mono uppercase tracking-wider text-[#4B5563]">03 · --a-accent-text (Link)</div>
            <div className="mt-2 font-sans text-base font-semibold underline underline-offset-4" style={{ color: derived.inlineTextHex }}>
              Inline Link {derived.inlineTextHex} ({derived.textContrastRatio}:1)
            </div>
            <div className="mt-1 text-xs font-mono text-[#4B5563]">Guaranteed body-copy link legibility</div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. foundations/accessibility -> A11yAuditDemo                              */
/* -------------------------------------------------------------------------- */
function A11yAuditDemo() {
  const [focusMode, setFocusMode] = useState<'keyboard' | 'screenreader' | 'contrast'>('keyboard');
  return (
    <Stage
      label="Interactive Accessibility & Keyboard Ergonomics Inspector"
      controls={
        <Seg
          label="Audit Layer"
          value={focusMode}
          onChange={setFocusMode}
          options={[
            { id: 'keyboard', label: 'Keyboard & Focus Ring' },
            { id: 'screenreader', label: 'ARIA Live & Landmarks' },
            { id: 'contrast', label: '44×44px Tap Bounds' },
          ]}
        />
      }
      caption="Every Accént primitive ships with deterministic focus rings, semantic landmarks, and 44×44px minimum touch bounds."
    >
      {focusMode === 'keyboard' && (
        <div className="space-y-4">
          <p className="text-sm text-[var(--a-muted)]">
            Press <kbd className="px-2 py-0.5 rounded border border-[var(--a-rule)] bg-[var(--a-bg)] font-mono text-xs">Tab</kbd> across the controls below to inspect the `2px` `--a-accent` focus ring with `2px` offset:
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="min-h-[44px] px-5 rounded-full bg-[var(--a-accent-fill)] text-white font-mono text-xs font-semibold uppercase tracking-wider ring-2 ring-[var(--a-accent)] ring-offset-2 ring-offset-[var(--a-bg)]"
            >
              Focused Primary CTA (44px)
            </button>
            <button
              type="button"
              className="min-h-[44px] px-5 rounded-full border border-[var(--a-ink)] text-[var(--a-ink)] font-mono text-xs font-semibold uppercase tracking-wider focus:ring-2 focus:ring-[var(--a-accent)] focus:ring-offset-2"
            >
              Secondary Action (Tab to test)
            </button>
          </div>
        </div>
      )}
      {focusMode === 'screenreader' && (
        <div className="p-4 rounded border border-[var(--a-rule)] bg-[var(--a-bg)] font-mono text-xs space-y-2">
          <div className="text-[var(--a-accent-text)] font-bold">// Screen Reader Announcement Tree</div>
          <div>&lt;header role=&quot;banner&quot;&gt; Skip to #accent-main link active</div>
          <div>&lt;main id=&quot;accent-main&quot;&gt; Sequential h1 → h2 → h3 hierarchy verified</div>
          <div>&lt;div role=&quot;status&quot; aria-live=&quot;polite&quot;&gt; &quot;Copied STYLES.md contract to clipboard&quot;</div>
        </div>
      )}
      {focusMode === 'contrast' && (
        <div className="flex flex-wrap items-center gap-6">
          <div className="inline-flex h-[44px] w-[44px] items-center justify-center rounded border-2 border-dashed border-[var(--a-accent)] font-mono text-xs font-bold">
            44×44
          </div>
          <div className="text-sm leading-6 max-w-lg">
            <strong>Zero sub-44px interactive controls (`touch.44px`):</strong> Icon buttons, theme toggles, and mobile drawer triggers never shrink below `44×44px` (`h-11 w-11`).
          </div>
        </div>
      )}
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. components/pedestal -> PedestalComparisonDemo                           */
/* -------------------------------------------------------------------------- */
function PedestalComparisonDemo() {
  const [posture, setPosture] = useState<'pedestal' | 'ledger' | 'card-soup'>('pedestal');
  return (
    <Stage
      label="De-Cardification Specimen: Open Pedestals vs. Hairline Ledgers vs. Card Soup"
      controls={
        <Seg
          label="Posture"
          value={posture}
          onChange={setPosture}
          options={[
            { id: 'pedestal', label: '✓ Open Pedestals' },
            { id: 'ledger', label: '✓ Hairline Ledger' },
            { id: 'card-soup', label: '× Forbidden Card Soup' },
          ]}
        />
      }
      caption="Open top-rule pedestals and hairline ledgers let typography breathe without nested boxes."
    >
      {posture === 'pedestal' && (
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { handle: 'pipe\\cubby', role: '01 · PERSONAL', title: 'Kyle (Cubby)', focal: true, desc: 'Working notebook, essays, and studio architecture.' },
            { handle: 'pipe\\chb', role: '02 · BUSINESS', title: 'Colon-Hyphen-Bracket', focal: false, desc: 'Studio source of truth, Workshop, and verified product docs.' },
            { handle: 'pipe\\bitcoin', role: '03 · TOPIC', title: 'Bitcoin & Sound Money', focal: false, desc: 'Consensus rules, BIP specifications, and Lightning architecture.' },
          ].map((item) => (
            <article
              key={item.handle}
              className={`pt-5 border-t-2 ${item.focal ? 'border-[#FE299E]' : 'border-[var(--a-ink)]'} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[var(--a-accent-text)]">{item.handle}</span>
                  <span className="text-[var(--a-muted)]">{item.role}</span>
                </div>
                <h4 className="mt-2 font-serif text-2xl font-semibold">{item.title}</h4>
                <p className="mt-2 text-sm text-[var(--a-muted)] leading-relaxed">{item.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-[var(--a-rule)] font-mono text-xs font-bold uppercase tracking-wider">
                Open Pipe →
              </div>
            </article>
          ))}
        </div>
      )}
      {posture === 'ledger' && (
        <div className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
          {[
            { idx: '01', handle: 'pipe\\website-design', nodes: '48 nodes', status: 'VERIFIED CANON' },
            { idx: '02', handle: 'pipe\\optimization', nodes: '32 nodes', status: 'TRIM (~) STUDIO' },
            { idx: '03', handle: 'pipe\\stoicism', nodes: '64 nodes', status: 'ARCHIVAL EDITION' },
          ].map((r) => (
            <div key={r.idx} className="py-3.5 grid grid-cols-[40px_1fr_auto_auto] gap-4 items-center text-sm">
              <span className="font-serif text-[var(--a-muted)] tabular-nums">{r.idx}</span>
              <span className="font-mono font-semibold">{r.handle}</span>
              <span className="font-mono text-xs text-[var(--a-muted)] tabular-nums">{r.nodes}</span>
              <span className="font-mono text-xs font-bold text-[var(--a-accent-text)]">{r.status}</span>
            </div>
          ))}
        </div>
      )}
      {posture === 'card-soup' && (
        <div className="p-4 rounded-xl border-2 border-rose-500/40 bg-rose-500/5 space-y-2">
          <div className="text-xs font-mono font-bold uppercase text-rose-700">
            × Violation [card.no-nesting]: Box inside a box inside a box
          </div>
          <div className="p-4 rounded-lg border bg-white shadow-md">
            <div className="p-3 rounded border bg-stone-50 shadow-sm">
              <div className="p-2 rounded border bg-white text-xs text-stone-600">
                Nested inner card with competing borders, shadows, and cramped padding.
              </div>
            </div>
          </div>
        </div>
      )}
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. components/table -> HairlineTableDemo                                   */
/* -------------------------------------------------------------------------- */
function HairlineTableDemo() {
  const [sortBy, setSortBy] = useState<'ratio' | 'token'>('ratio');
  const rows = [
    { token: '--a-ink on --a-bg', fg: '#111827', bg: '#E8E2D5', ratio: 12.82, grade: 'AAA' },
    { token: '--a-ink on --a-surface', fg: '#111827', bg: '#FAF8F5', ratio: 16.45, grade: 'AAA' },
    { token: '#FFFFFF on --a-accent-fill', fg: '#FFFFFF', bg: '#B81468', ratio: 5.64, grade: 'AA' },
    { token: '--a-accent-text on --a-bg', fg: '#9B1B56', bg: '#E8E2D5', ratio: 5.42, grade: 'AA' },
  ].sort((a, b) => (sortBy === 'ratio' ? b.ratio - a.ratio : a.token.localeCompare(b.token)));

  return (
    <Stage
      label="Native Semantic Data Table with Tabular Numerals (tabular-nums)"
      controls={
        <Seg
          label="Sort"
          value={sortBy}
          onChange={setSortBy}
          options={[
            { id: 'ratio', label: 'Contrast Ratio (High → Low)' },
            { id: 'token', label: 'Token Name (A → Z)' },
          ]}
        />
      }
      caption="Left-align text columns, right-align numeric columns in tabular-nums, and never use zebra striping."
    >
      <div className="overflow-x-auto border-y border-[var(--a-rule)]">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[var(--a-ink)] text-xs font-mono uppercase tracking-wider text-[var(--a-muted)]">
              <th className="py-3 pr-4 text-left">Semantic Pair</th>
              <th className="py-3 px-4 text-left">Foreground</th>
              <th className="py-3 px-4 text-left">Background</th>
              <th className="py-3 px-4 text-right">Contrast Ratio</th>
              <th className="py-3 pl-4 text-right">WCAG Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--a-rule)]">
            {rows.map((r) => (
              <tr key={r.token} className="hover:bg-[var(--a-surface)] transition-colors">
                <th scope="row" className="py-3 pr-4 text-left font-mono text-xs font-semibold">
                  {r.token}
                </th>
                <td className="py-3 px-4 font-mono text-xs">{r.fg}</td>
                <td className="py-3 px-4 font-mono text-xs">{r.bg}</td>
                <td className="py-3 px-4 text-right font-mono font-semibold tabular-nums">{r.ratio.toFixed(2)}:1</td>
                <td className="py-3 pl-4 text-right font-mono text-xs font-bold text-[var(--a-accent-text)]">{r.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. components/command-palette -> CommandPaletteDemo                        */
/* -------------------------------------------------------------------------- */
function CommandPaletteDemo() {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { group: 'Studios', label: 'Launch 5-Axis Theme Studio', shortcut: 'G T', href: '/design-system/themes' },
    { group: 'Studios', label: 'Open Live TSX & Regex Linter Playground', shortcut: 'G P', href: '/design-system/playground' },
    { group: 'Agent Contracts', label: 'Download STYLES.md (Playful-Principal)', shortcut: '⌘ S', href: '/design-system/styles.md?brand=playful-principal' },
    { group: 'Agent Contracts', label: 'Inspect 223 Machine Rules (rules.json)', shortcut: '⌘ J', href: '/design-system/rules.json' },
    { group: 'Pipes', label: 'Browse 3-Archetype Pipe Directory', shortcut: 'G E', href: '/explore' },
  ].filter((it) => it.label.toLowerCase().includes(query.toLowerCase()) || it.group.toLowerCase().includes(query.toLowerCase()));

  return (
    <Stage
      label="Interactive Command Palette (⌘K) Specimen"
      caption="Type to filter or use Up/Down arrow buttons. Notice the 1px hairline anatomy and right-aligned monospace keycaps."
    >
      <div className="max-w-xl mx-auto rounded-lg border border-[var(--a-ink)] bg-[var(--a-bg)] shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 h-12 border-b border-[var(--a-rule)] bg-[var(--a-surface)]">
          <Search className="h-4 w-4 text-[var(--a-accent)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search 57 specs, 7 brand dialects, or agent actions..."
            aria-label="Command palette search"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
          <kbd className="px-2 py-0.5 rounded border border-[var(--a-rule)] font-mono text-xs text-[var(--a-muted)]">ESC</kbd>
        </div>
        <ul role="listbox" aria-label="Command results" className="divide-y divide-[var(--a-rule)] max-h-[240px] overflow-y-auto">
          {items.map((it, idx) => {
            const active = idx === activeIndex;
            return (
              <li
                key={it.label}
                role="option"
                aria-selected={active}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`px-4 py-3 flex items-center justify-between text-sm cursor-pointer transition-colors ${
                  active ? 'bg-[var(--a-surface)] font-semibold text-[var(--a-ink)]' : 'text-[var(--a-muted)]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-accent-text)]">{it.group}</span>
                  <span>·</span>
                  <span>{it.label}</span>
                </div>
                <kbd className="px-2 py-0.5 rounded border border-[var(--a-rule)] bg-[var(--a-bg)] font-mono text-xs">
                  {it.shortcut}
                </kbd>
              </li>
            );
          })}
        </ul>
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. components/code-block -> CodeBlockDemo                                  */
/* -------------------------------------------------------------------------- */
function CodeBlockDemo() {
  const [copied, setCopied] = useState(false);
  const snippet = `import { defineAccentTheme, validateBrandAdapter } from '@rorshockbtc/accent-ui';

export const STUDIO_THEME = defineAccentTheme({
  id: 'playful-principal',
  mark: ':-]',
  tokens: { light: { '--a-accent': '#FE299E', '--a-bg': '#FAF8F5' } },
});`;

  return (
    <Stage
      label="Archival Espresso Code Block (#111827) with Language Header & Copy Feedback"
      caption="Code blocks maintain >= 13px JetBrains Mono type, explicit language labels, and 1-click clipboard confirmation."
    >
      <div className="rounded-md border border-[var(--a-rule)] bg-[#111827] text-[#F3EFE9] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-black/30 font-mono text-xs">
          <span className="text-[#FE299E] font-semibold">src/styles/studio-theme.ts · TypeScript</span>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(snippet);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/15 hover:border-[#FE299E] text-xs cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-4 font-mono text-[13px] leading-6 overflow-x-auto">
          <code>{snippet}</code>
        </pre>
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. components/accordion -> AccordionDemo                                   */
/* -------------------------------------------------------------------------- */
function AccordionDemo() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = [
    {
      q: 'Why does Accént separate --a-accent from --a-accent-fill?',
      a: 'So brands can keep electric signature marks (like Sovereign Hot Pink #FE299E on : - ] and strike bars) while automatically darkening solid button fills (#B81468) to pass WCAG 2.1 AA (4.5:1) with white text.',
    },
    {
      q: 'Why is STYLES.md separate from AGENTS.md?',
      a: 'AGENTS.md governs operational agent safety (tests, git, database rules). STYLES.md governs visual identity, 5-axis tokens, and custom CSS escape hatches so design forks require zero cross-repo PR arbitration.',
    },
    {
      q: 'Can multiple accordion items stay open simultaneously?',
      a: 'Yes. Accént never forces artificial single-open locks unless space is strictly constrained, and always keeps summary text inside a single 65ch reading measure.',
    },
  ];

  return (
    <Stage
      label="Hairline Disclosure Accordion"
      caption="48px minimum header touch height, 180deg chevron rotation, and zero nested box borders."
    >
      <div className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)] max-w-2xl">
        {items.map((it, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={it.q}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full min-h-[52px] py-3 flex items-center justify-between gap-4 text-left font-serif text-lg font-semibold cursor-pointer"
              >
                <span>{it.q}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[var(--a-accent)] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="pb-4 text-sm sm:text-base text-[var(--a-muted)] leading-relaxed max-w-[65ch]">
                  {it.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 8. components/sheet -> SheetDemo                                           */
/* -------------------------------------------------------------------------- */
function SheetDemo() {
  const [mode, setMode] = useState<'desktop-drawer' | 'mobile-sheet'>('desktop-drawer');
  return (
    <Stage
      label="Responsive Drawer & Mobile Bottom Sheet Specimen"
      controls={
        <Seg
          label="Viewport"
          value={mode}
          onChange={setMode}
          options={[
            { id: 'desktop-drawer', label: 'Desktop Right Drawer (420px)' },
            { id: 'mobile-sheet', label: 'Mobile Bottom Sheet (85vh)' },
          ]}
        />
      }
      caption="Uses SHEET_SLIDE_UP (320ms cubic-bezier(0.16, 1, 0.3, 1)), Escape-key dismissal, and 44×44px close target."
    >
      <div className="relative h-[260px] rounded-lg border border-[var(--a-rule)] bg-black/25 overflow-hidden flex items-end justify-end p-4">
        {mode === 'desktop-drawer' ? (
          <div className="h-full w-full max-w-[340px] rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--a-rule)]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
                  Inspector Drawer · 420px
                </span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded border border-[var(--a-rule)] font-mono text-xs">
                  ✕
                </span>
              </div>
              <p className="mt-3 text-sm text-[var(--a-muted)]">
                Slides from the right edge on desktop viewports while trapping keyboard focus inside the dialog.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--a-rule)] flex justify-end">
              <span className="px-4 py-1.5 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] font-mono text-xs font-semibold">
                Apply Changes
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[380px] mx-auto rounded-t-2xl border-t border-x border-[var(--a-rule)] bg-[var(--a-bg)] p-5 shadow-xl">
            <div className="w-10 h-1 rounded-full bg-[var(--a-muted)]/40 mx-auto mb-3" />
            <div className="flex items-center justify-between pb-2 border-b border-[var(--a-rule)]">
              <span className="font-serif text-lg font-semibold">Mobile Navigation Sheet</span>
              <span className="font-mono text-xs text-[var(--a-muted)]">max-h-[85vh]</span>
            </div>
            <p className="mt-2 text-sm text-[var(--a-muted)]">
              Anchors to the bottom thumb zone on 390×844 viewports with safe-area bottom padding.
            </p>
          </div>
        )}
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 9. patterns/onboarding -> ThreeArchetypeOnboardingDemo                     */
/* -------------------------------------------------------------------------- */
function ThreeArchetypeOnboardingDemo() {
  const [selected, setSelected] = useState<'personal' | 'business' | 'topic'>('personal');
  const archetypes = {
    personal: {
      badge: '01 · PERSONAL PIPE (pipe\\your-name)',
      handle: 'pipe\\cubby',
      title: 'Your Sovereign Personal Notebook & Voice',
      desc: 'Publish essays, reading notes, and curated links under your own name without feeding an outrage algorithm.',
      example: 'Examples: pipe\\cubby (Kyle), pipe\\dr-cyree (Dr. Ken Cyree), pipe\\bombthrower',
    },
    business: {
      badge: '02 · BUSINESS & STUDIO PIPE (pipe\\your-company)',
      handle: 'pipe\\chb',
      title: 'Your Company Source of Truth & Playbooks',
      desc: 'Give your studio, product, or research team a verified canon that customers and AI agents can query without hallucinating.',
      example: 'Examples: pipe\\chb (Colon-Hyphen-Bracket), pipe\\optimization (Trim ~), pipe\\marigold',
    },
    topic: {
      badge: '03 · TOPIC-BASED PIPE (pipe\\subject)',
      handle: 'pipe\\bitcoin',
      title: 'A Living Domain Library Curated by Practitioners',
      desc: 'Steward the definitive primary-source canon on a subject you know inside-out and earn 70% of subscriber & AI query royalties.',
      example: 'Examples: pipe\\bitcoin, pipe\\website-design, pipe\\stoicism (240+ active topics)',
    },
  }[selected];

  return (
    <Stage
      label="3-Archetype Progressive Onboarding Pattern"
      controls={
        <Seg
          label="Archetype"
          value={selected}
          onChange={setSelected}
          options={[
            { id: 'personal', label: '01 · Personal Pipe' },
            { id: 'business', label: '02 · Business Pipe' },
            { id: 'topic', label: '03 · Topic Pipe' },
          ]}
        />
      }
      caption="Show concrete real-world archetypes before presenting a 240-item directory so first-time visitors immediately grasp WIIFM."
    >
      <div className="p-6 border-t-2 border-[#FE299E] bg-[var(--a-surface)] space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="font-bold text-[#FE299E]">{archetypes.badge}</span>
          <span className="px-2.5 py-0.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] font-semibold">
            {archetypes.handle}
          </span>
        </div>
        <h4 className="font-serif text-2xl sm:text-3xl font-semibold">{archetypes.title}</h4>
        <p className="text-sm sm:text-base text-[var(--a-muted)] max-w-[65ch]">{archetypes.desc}</p>
        <p className="pt-2 font-mono text-xs text-[var(--a-ink)]">{archetypes.example}</p>
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 10. patterns/cross-platform -> CrossPlatformParityDemo                     */
/* -------------------------------------------------------------------------- */
function CrossPlatformParityDemo() {
  const [surface, setSurface] = useState<'web' | 'mobile' | 'extension' | 'desktop'>('web');
  return (
    <Stage
      label="4-Surface Cross-Platform Token Parity (Web, Mobile, Chrome Extension, Tauri Desktop)"
      controls={
        <Seg
          label="Surface"
          value={surface}
          onChange={setSurface}
          options={[
            { id: 'web', label: 'Web (1440px)' },
            { id: 'mobile', label: 'Mobile (390×844)' },
            { id: 'extension', label: 'Extension (400×600)' },
            { id: 'desktop', label: 'Tauri Desktop' },
          ]}
        />
      }
      caption="One W3C DTCG token spine governs all 4 surfaces with zero dark-only drift."
    >
      <div className="p-5 rounded border border-[var(--a-rule)] bg-[var(--a-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
            {surface === 'web' && '01 · Web Flagship (max-w-6xl · 12-Col Grid)'}
            {surface === 'mobile' && '02 · Mobile Reading & Curate Sheet (390×844 · Single-Col Reflow)'}
            {surface === 'extension' && '03 · Chrome Extension Clipper Popup (400×600 · Warm Sandstone Default)'}
            {surface === 'desktop' && '04 · Tauri Native Desktop App (Local DuckDB-Wasm + 3-Pane Reader)'}
          </div>
          <p className="text-sm text-[var(--a-muted)] max-w-xl">
            {surface === 'web' && 'Alternates #E8E2D5 sandstone and #FAF8F5 archival paper with 2px top-rule pedestals.'}
            {surface === 'mobile' && 'Collapses multi-column grids to 1 column below 640px with 44×44px thumb-zone controls.'}
            {surface === 'extension' && 'Defaults to Light Archival Sandstone (#FAF8F5) with Sovereign Pink clip actions.'}
            {surface === 'desktop' && 'Shares the exact same --a-* CSS custom properties and keyboard-first ⌘K navigation.'}
          </p>
        </div>
        <span className="shrink-0 font-mono text-xs px-3 py-1.5 rounded border border-[var(--a-rule)] bg-[var(--a-bg)]">
          100% Token Parity
        </span>
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 11. ai/styles-md -> StylesMdCompilerDemo                                   */
/* -------------------------------------------------------------------------- */
function StylesMdCompilerDemo() {
  const [brand, setBrand] = useState<BrandProfileId>('playful-principal');
  const md = generateStylesMarkdown(BRAND_PROFILES[brand]).slice(0, 680) + '\n...';
  return (
    <Stage
      label="Live STYLES.md Zero-PR Contract Compiler"
      controls={
        <Seg
          label="Dialect"
          value={brand}
          onChange={setBrand}
          options={[
            { id: 'editorial-sandstone', label: '´ Pipes Editorial' },
            { id: 'playful-principal', label: ':-] Playful-Principal' },
            { id: 'greater-terminal', label: '> Greater Terminal' },
          ]}
        />
      }
      caption="Select any dialect to preview the generated STYLES.md contract served at /design-system/styles.md."
    >
      <pre className="p-4 rounded bg-[#111827] text-[#F3EFE9] font-mono text-xs leading-relaxed overflow-x-auto">
        <code>{md}</code>
      </pre>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 12. ai/agent-adapters -> AgentAdapterPlaygroundDemo                        */
/* -------------------------------------------------------------------------- */
function AgentAdapterPlaygroundDemo() {
  const [brand, setBrand] = useState<BrandProfileId>('playful-principal');
  const p = BRAND_PROFILES[brand];
  return (
    <Stage
      label="7-Repository Brand Adapter Inspector (defineAccentTheme)"
      controls={
        <Seg
          label="Adapter"
          value={brand}
          onChange={setBrand}
          options={BRAND_PROFILE_LIST.slice(0, 4).map((b) => ({ id: b.id, label: `${b.mark} ${b.name.split('(')[0].trim()}` }))}
        />
      }
      caption="Inspect how each repository binds its display font, CTA radius, and semantic triad to the shared Accént spine."
    >
      <div className="grid sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-3 rounded border border-[var(--a-rule)] bg-[var(--a-bg)]">
          <div className="text-[var(--a-muted)]">USED BY</div>
          <div className="mt-1 font-bold text-sm">{p.usedBy}</div>
        </div>
        <div className="p-3 rounded border border-[var(--a-rule)] bg-[var(--a-bg)]">
          <div className="text-[var(--a-muted)]">DISPLAY FONT</div>
          <div className="mt-1 font-bold text-sm">{p.typography.display}</div>
        </div>
        <div className="p-3 rounded border border-[var(--a-rule)] bg-[var(--a-bg)]">
          <div className="text-[var(--a-muted)]">CTA RADIUS</div>
          <div className="mt-1 font-bold text-sm">{p.structure?.ctaRadius ?? '6px'}</div>
        </div>
        <div className="p-3 rounded border border-[var(--a-rule)] bg-[var(--a-bg)]">
          <div className="text-[var(--a-muted)]">POSTURE</div>
          <div className="mt-1 font-bold text-sm">{p.structure?.posture ?? 'archival-spine'}</div>
        </div>
      </div>
    </Stage>
  );
}

/* -------------------------------------------------------------------------- */
/* 13. ai/mcp-and-cli -> McpEndpointTesterDemo                                */
/* -------------------------------------------------------------------------- */
function McpEndpointTesterDemo() {
  const [endpoint, setEndpoint] = useState<'rules' | 'styles' | 'mcp'>('rules');
  return (
    <Stage
      label="Live MCP Server & HTTP Endpoint Inspector"
      controls={
        <Seg
          label="Endpoint"
          value={endpoint}
          onChange={setEndpoint}
          options={[
            { id: 'rules', label: 'GET /design-system/rules.json' },
            { id: 'styles', label: 'GET /design-system/styles.md' },
            { id: 'mcp', label: 'MCP Tool Call' },
          ]}
        />
      }
      caption="Coding agents query Accént deterministically over HTTP or MCP without scraping HTML."
    >
      <pre className="p-4 rounded bg-[#111827] text-[#F3EFE9] font-mono text-xs leading-relaxed overflow-x-auto">
        <code>
          {endpoint === 'rules' &&
            `// GET https://accent.design.pipes.pink/rules.json\n{\n  "system": "Accént (Pipes Design System)",\n  "version": "3.0.0",\n  "totalRules": 223,\n  "sampleRule": {\n    "id": "type.floor-13",\n    "statement": "Never render any text smaller than 13px (0.8125rem).",\n    "violationPattern": "text-\\\\[(8|9|10|11|12)px\\\\]"\n  }\n}`}
          {endpoint === 'styles' &&
            `# GET https://accent.design.pipes.pink/styles.md?brand=playful-principal\n# Returns text/markdown (Cache-Control: public, max-age=3600)\ncurl -sL "https://accent.design.pipes.pink/styles.md?brand=playful-principal" > STYLES.md`}
          {endpoint === 'mcp' &&
            `// MCP Tool Call: get_accent_brand_contract({ brand: "playful-principal" })\n// Returns verified W3C tokens, 223 regex rules, and stepwise prompt instructions.`}
        </code>
      </pre>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'triad-explorer': TriadExplorerDemo,
  'a11y-audit-demo': A11yAuditDemo,
  'pedestal-comparison': PedestalComparisonDemo,
  'hairline-table-demo': HairlineTableDemo,
  'command-palette-demo': CommandPaletteDemo,
  'code-block-demo': CodeBlockDemo,
  'accordion-demo': AccordionDemo,
  'sheet-demo': SheetDemo,
  'three-archetype-onboarding': ThreeArchetypeOnboardingDemo,
  'cross-platform-parity': CrossPlatformParityDemo,
  'styles-md-compiler': StylesMdCompilerDemo,
  'agent-adapter-playground': AgentAdapterPlaygroundDemo,
  'mcp-endpoint-tester': McpEndpointTesterDemo,
};
