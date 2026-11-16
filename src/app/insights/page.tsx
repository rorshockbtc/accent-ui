'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { ACCENT_PAGES } from '@/content/accent/registry';
import type { InsightCategory } from '@/content/accent/types';
import {
  PASTELS,
  TONAL_DARKS,
  getCrossChromaticPair,
  type PastelName,
  type TonalDarkName,
} from '@/styles/design-tokens';
import { RiseLines, FadeUp, Hairline } from '@/components/editorial-motion/AccentBrandMotion';

type CheatsheetTab = 'matrix' | 'punctuation' | 'mobile';

const PILLARS: Array<{
  numeral: string;
  title: string;
  thesis: string;
  contrast: string;
  pastel: PastelName;
  dark: TonalDarkName;
  linkHref: string;
  linkLabel: string;
}> = [
  {
    numeral: '01',
    title: 'Paper Over Glass',
    thesis:
      'Interfaces exist to clarify judgment, not entertain eyes. Replacing blur panels and nested drop shadows with warm sandstone paper (#E8E2D5), slate ink, and 1px hairlines removes visual static before a single word is read.',
    contrast: 'Rejects glassmorphism cards, nested elevations (card.no-nesting), and decorative chrome.',
    pastel: 'butter',
    dark: 'oxblood',
    linkHref: '/design-system/essays/relief-and-focus',
    linkLabel: 'Read: Relief, Paper & Focus',
  },
  {
    numeral: '02',
    title: 'Typography & Color Over Icon Soup',
    thesis:
      'Every extra icon or pastel pill asks the eye to decode an arbitrary hieroglyph. Express hierarchy through Fraunces editorial weight, tabular figures, ROYGBIV contrast, and eight explicit CHB punctuation glyphs.',
    contrast: 'Zero sparkle icons (ai.no-sparkle-slop) and zero ornamental status badges.',
    pastel: 'ice',
    dark: 'midnight',
    linkHref: '/design-system/essays/punctuation-not-icons',
    linkLabel: 'Read: Punctuation, Not Icons',
  },
  {
    numeral: '03',
    title: 'Engineered Drift Over Monoculture',
    thesis:
      'Default purple-indigo AI templates flatten distinct publications into interchangeable SaaS brochures. Pair 7 curated Pastels with 7 Tonal Darks across a verified 49-cell AAA matrix so variety never breaks legibility.',
    contrast: 'Every combination clears >= 7.0:1 WCAG AAA contrast in both light and dark modes.',
    pastel: 'peach',
    dark: 'forest',
    linkHref: '/design-system/themes',
    linkLabel: 'Inspect Theme Matrix & Drift',
  },
  {
    numeral: '04',
    title: 'Local-First Agency Over Cloud Theater',
    thesis:
      'Do not force human readers into empty prompt textareas or fake typing indicators. Anchor interaction in local 0ms retrieval, self-healing streams, Find-in-Page traces, and SHA-256 verification ledgers.',
    contrast: 'Treats LLMs as inspectable collaborators whose work graduates into durable citations.',
    pastel: 'sage',
    dark: 'plum',
    linkHref: '/design-system/essays/dont-make-people-prompt',
    linkLabel: 'Read: Don\'t Make People Prompt',
  },
];

const CHB_PUNCTUATION = [
  {
    glyph: '´',
    name: 'Acute Accent',
    role: 'Primary Curated Signal & Brand Mark',
    usage: 'Anchor mark of Accént & headline emphasis where other UIs drop sparkled badges.',
  },
  {
    glyph: '!',
    name: 'Bang Direct',
    role: 'Zero-Latency Bang Query Prefix',
    usage: 'Invokes client-side Bang synthesis and Pipe routing directly from command bars.',
  },
  {
    glyph: ':-]',
    name: 'Calm Witness',
    role: 'Verified Neutral / Canonical State',
    usage: 'Signals stable system health or completed local checks without cartoon emoji.',
  },
  {
    glyph: '; - ]',
    name: 'Wry Aside',
    role: 'Editorial Humor & Socratic Twist',
    usage: 'Optional aside mark in long-form essay marginalia and empty states.',
  },
  {
    glyph: '>',
    name: 'Prompt & Scope',
    role: 'Section Prefix, Breadcrumb & CLI Action',
    usage: 'Marks navigation breadcrumbs, terminal instructions, and AI retrieval scope.',
  },
  {
    glyph: '#',
    name: 'Canonical Index',
    role: 'Node Hash, Section Anchor & Fragment Link',
    usage: 'Prefixes stable citation anchors, tabular row indexes, and deep-link targets.',
  },
  {
    glyph: '~',
    name: 'Streaming State',
    role: 'Active Synthesis & Drift Parameter',
    usage: 'Honest textual indicator while tokens stream (`~ synthesizing`) before sealing.',
  },
  {
    glyph: '\\',
    name: 'Pipe Seal & Namespace',
    role: 'Knowledge Namespace (`pipe\\slug`) & Seal',
    usage: 'Separates sovereign Pipe paths and anchors the final Seal-to-Pipe commit action.',
  },
];

const MOBILE_CONTRACT_ROWS = [
  {
    rule: 'Typography Floor',
    spec: '>= 13px everywhere (>= 16px body prose)',
    rationale: 'Prevents pinch-zoom fatigue and fails lint on utility classes under 13px.',
  },
  {
    rule: 'Interactive Hit Targets',
    spec: '>= 44×44px minimum on links, tabs & buttons',
    rationale: 'Meets Apple HIG and WCAG 2.5.5 touch ergonomics across 390×844 viewports.',
  },
  {
    rule: 'Scrollable Data Tables',
    spec: 'overflow-x-auto + role="region" tabIndex={0}',
    rationale: 'Keeps page scrollWidth === innerWidth while allowing keyboard horizontal pan.',
  },
  {
    rule: 'Nesting Hygiene',
    spec: '0 nested cards, 0 <Link><button> nesting',
    rationale: 'Preserves native browser focus outlines and predictable screen-reader trees.',
  },
  {
    rule: 'Motion Respect',
    spec: 'prefers-reduced-motion disables height & slide transitions',
    rationale: 'Native <details> stays instant while editorial reveals settle smoothly when allowed.',
  },
];

const CATEGORY_FILTERS: Array<{ id: 'all' | InsightCategory; label: string }> = [
  { id: 'all', label: 'All Theory' },
  { id: 'philosophy', label: 'Philosophy' },
  { id: 'signals', label: 'Signals' },
  { id: 'workflows', label: 'Workflows' },
  { id: 'case-studies', label: 'Case Studies' },
];

const CHEATSHEET_TABS: Array<{ id: CheatsheetTab; label: string }> = [
  { id: 'matrix', label: '49-Pair AAA Color Matrix' },
  { id: 'punctuation', label: 'CHB Punctuation Grammar' },
  { id: 'mobile', label: '390×844 Mobile Contract' },
];

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function AccentInsightsPhilosophyPage() {
  const [activeSheet, setActiveSheet] = useState<CheatsheetTab>('matrix');
  const [categoryFilter, setCategoryFilter] = useState<'all' | InsightCategory>('all');
  const [selectedPair, setSelectedPair] = useState<{ pastel: PastelName; dark: TonalDarkName }>({
    pastel: 'butter',
    dark: 'oxblood',
  });
  const [copiedPair, setCopiedPair] = useState(false);

  const pastelKeys = useMemo(() => Object.keys(PASTELS) as PastelName[], []);
  const darkKeys = useMemo(() => Object.keys(TONAL_DARKS) as TonalDarkName[], []);

  const selectedMetrics = useMemo(
    () => getCrossChromaticPair(selectedPair.pastel, selectedPair.dark),
    [selectedPair]
  );

  const pageLookup = useMemo(() => {
    const map = new Map<string, (typeof ACCENT_PAGES)[number]>();
    for (const p of ACCENT_PAGES) map.set(p.slug, p);
    return map;
  }, []);

  const essays = useMemo(() => {
    const allEssays = ACCENT_PAGES.filter((p) => p.kind === 'essay');
    if (categoryFilter === 'all') return allEssays;
    return allEssays.filter((e) => e.insightCategory === categoryFilter);
  }, [categoryFilter]);

  const handleCopyPair = async () => {
    const css = `color: ${selectedMetrics.foreground}; /* ${selectedPair.pastel} */\nbackground-color: ${selectedMetrics.background}; /* ${selectedPair.dark} · ${selectedMetrics.contrastRatio}:1 AAA */`;
    try {
      await navigator.clipboard.writeText(css);
      setCopiedPair(true);
      window.setTimeout(() => setCopiedPair(false), 1800);
    } catch {
      // Clipboard API unavailable in non-HTTPS test context
    }
  };

  const handleSheetKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const nextIdx =
      e.key === 'ArrowRight'
        ? (idx + 1) % CHEATSHEET_TABS.length
        : (idx - 1 + CHEATSHEET_TABS.length) % CHEATSHEET_TABS.length;
    setActiveSheet(CHEATSHEET_TABS[nextIdx].id);
  };

  return (
    <div className="py-10 sm:py-16 space-y-16 max-w-[1160px]">
      {/* Masthead */}
      <header className="space-y-5">
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--a-accent-text)]">
          &gt; Philosophy &amp; Insights · Two Sides of One Sovereign System
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-[var(--a-ink)] leading-[1.05]">
          <RiseLines
            immediate
            lines={[
              'Theory for thinkers.',
              <>
                Precision for <span className="text-[var(--a-accent-text)]">builders</span>.
              </>,
            ]}
          />
        </h1>
        <p className="text-base sm:text-xl text-[var(--a-muted)] max-w-[68ch] leading-relaxed">
          Components explain <em>how</em> an interface renders. Philosophy explains <em>why</em> a reader trusts it. Explore Accént&apos;s founding editorial theses, live WCAG AAA cross-chromatic matrix, CHB punctuation grammar, and long-form theory connecting human cognition with honest local–cloud AI.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-[var(--a-rule)]">
          <Link
            href="/design-system/patterns"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-bold text-[var(--a-ink)] hover:text-[var(--a-accent-text)] underline underline-offset-4"
          >
            <span>Explore 01–06 AI Patterns</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/design-system/mcp"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-bold text-[var(--a-accent-text)] hover:text-[var(--a-ink)] underline underline-offset-4"
          >
            <span>Connect Live MCP Server</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/design-system/components"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-semibold text-[var(--a-muted)] hover:text-[var(--a-ink)]"
          >
            <span>View Developer Component Catalog →</span>
          </Link>
        </div>
        <Hairline className="bg-[var(--a-rule)]" />
      </header>

      {/* Section 1: 4 Design Philosophy Pillars */}
      <section aria-labelledby="pillars-heading" className="space-y-6">
        <div className="space-y-1">
          <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--a-muted)]">
            01–04 · Founding Manifesto
          </p>
          <h2 id="pillars-heading" className="font-serif text-3xl font-semibold text-[var(--a-ink)]">
            The Four Pillars of Accént
          </h2>
        </div>

        <div className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
          {PILLARS.map((pillar) => {
            const pair = getCrossChromaticPair(pillar.pastel, pillar.dark);
            return (
              <article
                key={pillar.numeral}
                className="py-7 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
              >
                {/* Solid Cross-Chromatic Numeral Stamp (no inner card border nesting) */}
                <div className="md:col-span-4 space-y-3">
                  <div
                    className="px-4 py-3 flex items-baseline justify-between gap-3"
                    style={{
                      backgroundColor: pair.background,
                      color: pair.foreground,
                    }}
                  >
                    <span className="font-serif text-3xl sm:text-4xl font-bold tabular-nums leading-none">
                      {pillar.numeral}
                    </span>
                    <span className="font-mono text-[13px] font-semibold uppercase tracking-wider">
                      {cap(pillar.pastel)} / {cap(pillar.dark)} · {pair.contrastRatio}:1 AAA
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[var(--a-ink)]">
                    {pillar.title}
                  </h3>
                </div>

                <div className="md:col-span-5 space-y-2">
                  <p className="text-base text-[var(--a-ink)] leading-relaxed">{pillar.thesis}</p>
                  <p className="font-mono text-[13px] text-[var(--a-muted)]">{pillar.contrast}</p>
                </div>

                <div className="md:col-span-3 md:text-right">
                  <Link
                    href={pillar.linkHref}
                    className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[13px] font-bold text-[var(--a-accent-text)] hover:text-[var(--a-ink)] underline underline-offset-4"
                  >
                    <span>{pillar.linkLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 2: Interactive Reference Cheatsheets */}
      <FadeUp>
        <section aria-labelledby="cheatsheets-heading" className="space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--a-muted)]">
              Interactive Field Cheatsheets
            </p>
            <h2 id="cheatsheets-heading" className="font-serif text-3xl font-semibold text-[var(--a-ink)]">
              Color Matrix, Punctuation &amp; Mobile Floor
            </h2>
          </div>

          {/* WAI-ARIA Tablist */}
          <div
            role="tablist"
            aria-label="Design System Reference Cheatsheets"
            className="flex flex-wrap gap-2 border-b border-[var(--a-rule)]"
          >
            {CHEATSHEET_TABS.map((tab, idx) => {
              const selected = activeSheet === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`sheet-tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`sheet-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveSheet(tab.id)}
                  onKeyDown={(e) => handleSheetKeyDown(e, idx)}
                  className={`accent-tab-btn min-h-[44px] px-4 py-2 font-mono text-[13px] font-semibold cursor-pointer transition-colors ${
                    selected
                      ? 'text-[var(--a-accent-text)]'
                      : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Panel 1: 49-Pair AAA Matrix */}
          <div
            id="sheet-panel-matrix"
            role="tabpanel"
            aria-labelledby="sheet-tab-matrix"
            hidden={activeSheet !== 'matrix'}
            className="space-y-5"
          >
            {/* Selected Pair Live Inspector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 border border-[var(--a-rule)]">
              <div className="flex items-center gap-4">
                <div
                  className="px-4 py-2 font-serif text-xl font-bold shrink-0"
                  style={{
                    backgroundColor: selectedMetrics.background,
                    color: selectedMetrics.foreground,
                  }}
                >
                  Aa · {selectedMetrics.contrastRatio}:1
                </div>
                <div className="space-y-0.5">
                  <p className="font-mono text-[13px] font-bold text-[var(--a-ink)]">
                    {cap(selectedPair.pastel)} ({selectedMetrics.foreground}) on{' '}
                    {cap(selectedPair.dark)} ({selectedMetrics.background})
                  </p>
                  <p className="font-mono text-[13px] text-[var(--a-muted)]">
                    {selectedMetrics.isAaa ? 'Passes WCAG AAA (>= 7.0:1)' : 'Passes WCAG AA'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyPair}
                className="inline-flex min-h-[44px] px-4 items-center gap-2 border border-[var(--a-ink)] font-mono text-[13px] font-semibold cursor-pointer hover:bg-[var(--a-ink)] hover:text-[var(--a-bg)] transition-colors"
              >
                {copiedPair ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                <span>{copiedPair ? 'Copied CSS Pair' : 'Copy Pair CSS'}</span>
              </button>
            </div>

            <div
              role="region"
              aria-label="49-Pair AAA Cross-Chromatic Color Matrix"
              tabIndex={0}
              className="overflow-x-auto border-y border-[var(--a-rule)]"
            >
              <table className="w-full min-w-[700px] border-collapse text-left">
                <caption className="py-2 text-left font-mono text-[13px] text-[var(--a-muted)]">
                  Click any cell to inspect its live foreground/background token pair and copy CSS.
                </caption>
                <thead>
                  <tr className="border-b border-[var(--a-rule)]">
                    <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold text-[var(--a-ink)]">
                      Dark ↓ / Pastel →
                    </th>
                    {pastelKeys.map((p) => (
                      <th
                        key={p}
                        scope="col"
                        className="py-3 px-2 font-mono text-[13px] font-semibold text-[var(--a-ink)]"
                      >
                        {cap(p)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--a-rule)]">
                  {darkKeys.map((dark) => (
                    <tr key={dark}>
                      <th
                        scope="row"
                        className="py-2 px-3 font-mono text-[13px] font-semibold text-[var(--a-ink)] whitespace-nowrap"
                      >
                        {cap(dark)}
                      </th>
                      {pastelKeys.map((pastel) => {
                        const metrics = getCrossChromaticPair(pastel, dark);
                        const isSelected =
                          selectedPair.pastel === pastel && selectedPair.dark === dark;
                        return (
                          <td key={`${dark}-${pastel}`} className="p-1">
                            <button
                              type="button"
                              onClick={() => setSelectedPair({ pastel, dark })}
                              style={{
                                backgroundColor: metrics.background,
                                color: metrics.foreground,
                              }}
                              aria-label={`${cap(pastel)} on ${cap(dark)}: contrast ${metrics.contrastRatio} to 1`}
                              aria-pressed={isSelected}
                              className={`w-full min-h-[44px] px-2 font-mono text-[13px] font-bold tabular-nums cursor-pointer transition-transform ${
                                isSelected ? 'ring-2 ring-[var(--a-ink)] scale-[1.02]' : ''
                              }`}
                            >
                              {metrics.contrastRatio}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tab Panel 2: CHB Punctuation Grammar */}
          <div
            id="sheet-panel-punctuation"
            role="tabpanel"
            aria-labelledby="sheet-tab-punctuation"
            hidden={activeSheet !== 'punctuation'}
          >
            <div
              role="region"
              aria-label="CHB Punctuation Grammar Table"
              tabIndex={0}
              className="overflow-x-auto border-y border-[var(--a-rule)]"
            >
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--a-rule)]">
                    <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">
                      Glyph
                    </th>
                    <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">
                      Mark
                    </th>
                    <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">
                      Syntactic Role
                    </th>
                    <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">
                      Interface Application
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--a-rule)]">
                  {CHB_PUNCTUATION.map((item) => (
                    <tr key={item.glyph}>
                      <td className="py-3.5 px-3 font-mono text-xl font-bold text-[var(--a-accent-text)] whitespace-nowrap">
                        {item.glyph}
                      </td>
                      <td className="py-3.5 px-3 font-serif text-base font-semibold text-[var(--a-ink)] whitespace-nowrap">
                        {item.name}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[13px] text-[var(--a-ink)]">
                        {item.role}
                      </td>
                      <td className="py-3.5 px-3 text-sm sm:text-base text-[var(--a-muted)]">
                        {item.usage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tab Panel 3: 390x844 Mobile Contract */}
          <div
            id="sheet-panel-mobile"
            role="tabpanel"
            aria-labelledby="sheet-tab-mobile"
            hidden={activeSheet !== 'mobile'}
          >
            <div
              role="region"
              aria-label="Mobile and Accessibility Floor Contract"
              tabIndex={0}
              className="overflow-x-auto border-y border-[var(--a-rule)]"
            >
              <table className="w-full min-w-[600px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[var(--a-rule)]">
                    <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">
                      Invariant
                    </th>
                    <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">
                      Verified Floor
                    </th>
                    <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">
                      Design Rationale
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--a-rule)]">
                  {MOBILE_CONTRACT_ROWS.map((row) => (
                    <tr key={row.rule}>
                      <td className="py-3.5 px-3 font-serif text-base font-semibold text-[var(--a-ink)] whitespace-nowrap">
                        {row.rule}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[13px] font-semibold text-[var(--a-accent-text)]">
                        {row.spec}
                      </td>
                      <td className="py-3.5 px-3 text-sm sm:text-base text-[var(--a-muted)]">
                        {row.rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* Section 3: Filterable Theory & Signal Index (All 7 Essays + Companion Spec Bridges) */}
      <section aria-labelledby="theory-index-heading" className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[var(--a-rule)] pb-4">
          <div className="space-y-1">
            <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--a-muted)]">
              Long-Form Essays &amp; Case Studies ({essays.length})
            </p>
            <h2 id="theory-index-heading" className="font-serif text-3xl font-semibold text-[var(--a-ink)]">
              Theory &amp; Signal Index
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter essays by category">
            {CATEGORY_FILTERS.map((cat) => {
              const active = categoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryFilter(cat.id)}
                  aria-pressed={active}
                  className={`min-h-[44px] px-3.5 py-2 font-mono text-[13px] font-semibold cursor-pointer border-b-2 transition-colors ${
                    active
                      ? 'border-[var(--a-accent)] text-[var(--a-ink)]'
                      : 'border-transparent text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="divide-y divide-[var(--a-rule)] border-b border-[var(--a-rule)]">
          {essays.map((essay, idx) => (
            <article
              key={essay.slug}
              className="py-7 grid grid-cols-1 md:grid-cols-12 gap-5 items-start"
            >
              <div className="md:col-span-2 flex md:flex-col items-baseline gap-3 md:gap-1">
                <span className="font-serif text-2xl font-bold tabular-nums text-[var(--a-accent-text)]">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-[13px] uppercase tracking-wider text-[var(--a-muted)]">
                  {essay.insightCategory ?? 'philosophy'} · {essay.readingMinutes}m
                </span>
              </div>

              <div className="md:col-span-6 space-y-2.5">
                <h3 className="font-serif text-2xl font-semibold text-[var(--a-ink)] leading-snug">
                  <Link
                    href={`/design-system/${essay.slug}`}
                    className="hover:text-[var(--a-accent-text)] underline-offset-4 hover:underline"
                  >
                    {essay.title}
                  </Link>
                </h3>
                <p className="text-base text-[var(--a-muted)] leading-relaxed">{essay.summary}</p>
              </div>

              <div className="md:col-span-4 space-y-2">
                {essay.relatedSlugs && essay.relatedSlugs.length > 0 && (
                  <div className="space-y-1">
                    <p className="font-mono text-[13px] uppercase tracking-wider text-[var(--a-muted)]">
                      Companion Implementation Specs
                    </p>
                    <ul className="space-y-1">
                      {essay.relatedSlugs.map((relSlug) => {
                        const target = pageLookup.get(relSlug);
                        if (!target) return null;
                        return (
                          <li key={relSlug}>
                            <Link
                              href={`/design-system/${target.slug}`}
                              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[13px] font-semibold text-[var(--a-accent-text)] hover:text-[var(--a-ink)] underline underline-offset-4"
                            >
                              <span>{target.title}</span>
                              <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                <Link
                  href={`/design-system/${essay.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-bold text-[var(--a-ink)] hover:text-[var(--a-accent-text)]"
                >
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
