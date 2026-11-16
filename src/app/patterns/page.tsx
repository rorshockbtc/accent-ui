'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import { ACCENT_PAGES } from '@/content/accent/registry';
import type { AiLifecyclePhase } from '@/content/accent/types';
import { PASTELS, TONAL_DARKS, type PastelName, type TonalDarkName } from '@/styles/design-tokens';
import { RiseLines, FadeUp, Hairline } from '@/components/editorial-motion/AccentBrandMotion';

const PHASE_FILTERS: Array<{ id: 'all' | AiLifecyclePhase; code: string; label: string }> = [
  { id: 'all', code: 'ALL', label: 'All Phases (13)' },
  { id: 'discovering', code: '01', label: 'Discovering' },
  { id: 'instructing', code: '02', label: 'Instructing' },
  { id: 'observing', code: '03', label: 'Observing' },
  { id: 'evaluating', code: '04', label: 'Evaluating' },
  { id: 'refining', code: '05', label: 'Refining' },
  { id: 'flows', code: '06', label: 'Sovereign Flows' },
  { id: 'architecture', code: 'ARC', label: 'Site Architecture' },
];

const PHASE_COPY: Record<AiLifecyclePhase, { summary: string; numeral: string }> = {
  discovering: {
    numeral: '01',
    summary: 'Zero-shot intent recipes & 0ms local tiers that orient visitors before prompting.',
  },
  instructing: {
    numeral: '02',
    summary: 'Scoped pipe\\slug context chips, constraints, dictation hooks & AbortController stops.',
  },
  observing: {
    numeral: '03',
    summary: 'Self-healing streamed Markdown & Find-in-Page searchable <details> execution traces.',
  },
  evaluating: {
    numeral: '04',
    summary: 'Anchored [popover] hints & sticky SHA-256 verification ledgers linking primary sources.',
  },
  refining: {
    numeral: '05',
    summary: 'MIT jsdiff word/line redlines with explicit Accept/Reject & hairline Socratic follow-ups.',
  },
  flows: {
    numeral: '06',
    summary: 'Inline reading-to-curation compositions ending cleanly at Seal to Pipe.',
  },
  architecture: {
    numeral: 'ARC',
    summary: 'Core reading columns, mobile sheets, onboarding archetypes & Bang templates.',
  },
};

export default function AccentPatternsHubPage() {
  const [phaseFilter, setPhaseFilter] = useState<'all' | AiLifecyclePhase>('all');
  const [query, setQuery] = useState('');

  const patternPages = useMemo(
    () => ACCENT_PAGES.filter((p) => p.section === 'patterns'),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patternPages.filter((p) => {
      if (phaseFilter !== 'all' && p.aiPhase !== phaseFilter) return false;
      if (!q) return true;
      const haystack = `${p.title} ${p.summary} ${(p.subPatterns ?? []).join(' ')}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [patternPages, phaseFilter, query]);

  const aiLifecyclePages = filtered.filter((p) => p.aiPhase && p.aiPhase !== 'architecture');
  const architecturePages = filtered.filter((p) => p.aiPhase === 'architecture' || !p.aiPhase);

  return (
    <div className="py-10 sm:py-16 space-y-14 max-w-[1160px]">
      {/* Bold Typographic Masthead (No Sparkles, No Pill Soup) */}
      <header className="space-y-5">
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--a-accent-text)]">
          &gt; Patterns · 01–06 Human–AI Lifecycle &amp; Site Architecture
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-[var(--a-ink)] leading-[1.05]">
          <RiseLines
            immediate
            lines={[
              'Cohesive interaction',
              <>patterns from zero-shot <span className="text-[var(--a-accent-text)]">discovery</span> to verifiable proof.</>,
            ]}
          />
        </h1>
        <p className="text-base sm:text-xl text-[var(--a-muted)] max-w-[66ch] leading-relaxed">
          Instead of fragmenting AI UX across 40 thin marketing pages or masking uncertainty behind sparkle icons, Accént organizes every interaction into six multi-tab engineering specifications paired with core spatial layouts—open-source under MIT and inspectable right in the browser.
        </p>
        <Hairline className="bg-[var(--a-rule)]" />
      </header>

      {/* Single-Row Control & Search Strip */}
      <section aria-label="Filter patterns by phase" className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--a-rule)] pb-5">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Lifecycle Phase Filter">
            {PHASE_FILTERS.map((f) => {
              const active = phaseFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPhaseFilter(f.id)}
                  className={`min-h-[44px] px-3.5 py-2 font-mono text-[13px] transition-colors cursor-pointer border ${
                    active
                      ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)] font-bold'
                      : 'border-[var(--a-rule)] bg-[var(--a-surface)] text-[var(--a-ink)] hover:border-[var(--a-accent)]'
                  }`}
                >
                  <span className="opacity-70 mr-1.5 tabular-nums">{f.code}</span>
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--a-accent-text)]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Filter pattern specs and sub-patterns"
              placeholder="Search citations, diffs, 0ms..."
              className="w-full min-h-[44px] pl-10 pr-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-well)] text-sm text-[var(--a-ink)] placeholder:text-[var(--a-muted)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--a-accent)]"
            />
          </div>
        </div>
      </section>

      {/* 01-06 Human-AI Lifecycle Pedestals (AAA Cross-Chromatic Accent Bars) */}
      {aiLifecyclePages.length > 0 && (
        <section aria-labelledby="ai-lifecycle-heading" className="space-y-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="ai-lifecycle-heading" className="font-serif text-3xl sm:text-4xl font-semibold text-[var(--a-ink)]">
              Human–AI Interaction Lifecycle
            </h2>
            <span className="font-mono text-[13px] text-[var(--a-muted)]">
              Backed by 6 MIT primitives in <code className="font-bold text-[var(--a-ink)]">accent-ui</code>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {aiLifecyclePages.map((page) => {
              const phaseKey = page.aiPhase ?? 'discovering';
              const phaseMeta = PHASE_COPY[phaseKey];
              const pKey = (page.chromaticPair?.pastel ?? 'ice') as PastelName;
              const dKey = (page.chromaticPair?.dark ?? 'abyss') as TonalDarkName;
              const pastel = PASTELS[pKey];
              const dark = TONAL_DARKS[dKey];

              return (
                <article
                  key={page.slug}
                  style={{ borderTopColor: dark.$value }}
                  className="border-t-4 pt-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className="font-serif text-4xl sm:text-5xl font-semibold tabular-nums leading-none"
                        style={{ color: 'var(--a-ink)' }}
                      >
                        {phaseMeta.numeral}
                      </span>
                      <span
                        className="px-2.5 py-1 font-mono text-[13px] font-bold"
                        style={{ backgroundColor: pastel.$value, color: dark.$value }}
                      >
                        {page.rules.length} {page.rules.length === 1 ? 'rule' : 'rules'}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-semibold text-[var(--a-ink)] leading-snug">
                      {page.title.replace(/^\d{2}\s*·\s*/, '')}
                    </h3>

                    <p className="text-sm sm:text-base text-[var(--a-muted)] leading-relaxed">
                      {page.summary}
                    </p>

                    {page.subPatterns && page.subPatterns.length > 0 && (
                      <p className="font-mono text-[13px] text-[var(--a-ink)] leading-relaxed border-t border-[var(--a-rule)] pt-3">
                        <span className="text-[var(--a-muted)] uppercase block mb-1">Covers:</span>
                        {page.subPatterns.join(' · ')}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[var(--a-rule)]">
                    {page.liveInPipes && page.liveInPipes.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[13px]">
                        <span className="text-[var(--a-muted)]">Live in Pipes:</span>
                        {page.liveInPipes.map((ref) => (
                          <Link
                            key={ref.href}
                            href={ref.href}
                            className="inline-flex min-h-[44px] items-center underline underline-offset-4 text-[var(--a-accent-text)] hover:text-[var(--a-ink)]"
                          >
                            {ref.label} ↗
                          </Link>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/design-system/${page.slug}`}
                      className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)] hover:text-[var(--a-accent-text)] transition-colors"
                    >
                      <span>Open 4-Tab Pattern Spec</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Architectural & Spatial Patterns Ledger */}
      {architecturePages.length > 0 && (
        <FadeUp>
          <section aria-labelledby="architecture-patterns-heading" className="space-y-6 pt-6 border-t border-[var(--a-rule)]">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="architecture-patterns-heading" className="font-serif text-3xl font-semibold text-[var(--a-ink)]">
                Spatial &amp; Editorial Architecture Patterns
              </h2>
              <Link
                href="/design-system/insights"
                className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[13px] font-semibold underline underline-offset-4 text-[var(--a-accent-text)]"
              >
                Read the Philosophy &amp; Theory Behind These Decisions →
              </Link>
            </div>

            <div className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
              {architecturePages.map((p, idx) => (
                <div
                  key={p.slug}
                  className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline hover:bg-[var(--a-surface)]/50 px-2 transition-colors"
                >
                  <div className="md:col-span-4 flex items-baseline gap-3">
                    <span className="font-mono text-[13px] font-bold tabular-nums text-[var(--a-accent-text)]">
                      A{String(idx + 1).padStart(2, '0')}
                    </span>
                    <Link
                      href={`/design-system/${p.slug}`}
                      className="font-serif text-xl font-semibold text-[var(--a-ink)] hover:text-[var(--a-accent-text)] underline-offset-4 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </div>
                  <p className="md:col-span-5 text-sm sm:text-base text-[var(--a-muted)] leading-relaxed">
                    {p.summary}
                  </p>
                  <div className="md:col-span-3 md:text-right">
                    <Link
                      href={`/design-system/${p.slug}`}
                      className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[13px] font-semibold text-[var(--a-ink)] hover:text-[var(--a-accent-text)]"
                    >
                      <span>Read Spec ({p.readingMinutes} min)</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeUp>
      )}

      {filtered.length === 0 && (
        <div className="py-12 border-y border-[var(--a-rule)] flex flex-wrap items-center justify-between gap-4">
          <p className="text-base text-[var(--a-muted)]">
            No pattern specifications matched &quot;{query}&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setPhaseFilter('all');
              setQuery('');
            }}
            className="min-h-[44px] px-4 border border-[var(--a-ink)] font-mono text-[13px] font-semibold cursor-pointer"
          >
            Reset Filters ×
          </button>
        </div>
      )}
    </div>
  );
}
