'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Terminal } from 'lucide-react';
import { ACCENT_PAGES } from '@/content/accent/registry';
import { AccentButton, AccentBadge } from '@/components/ui';
import { Smile } from '@/components/editorial-motion/AccentBrandMotion';
import { AccentAppLayouts } from '@/components/AccentAppLayouts';

type FilterId = 'all' | 'components' | 'foundations' | 'patterns' | 'ai' | 'layouts';

export default function AccentComponentsGalleryPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterId>('all');

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ACCENT_PAGES.filter((p) => {
      if (p.section === 'start' || p.section === 'essays') return false;
      if (filter !== 'all' && p.section !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  return (
    <div className="py-10 sm:py-14 space-y-10 max-w-[1080px]">
      <header className="space-y-4 border-b border-[var(--a-rule)] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <AccentBadge tone="pink">{ACCENT_PAGES.length} Exhaustive Specs</AccentBadge>
          <AccentBadge tone="sky">4-Tab Docs + Machine Regex Rules</AccentBadge>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--a-ink)]">
          Components, Foundations &amp; AI Contracts
        </h1>
        <p className="text-base sm:text-lg text-[var(--a-muted)] max-w-[65ch] leading-relaxed">
          Every component, foundation primitive, and agent rule in Accént—with Overview, Guidelines, Specs, Accessibility, and machine-enforced <code className="font-mono text-[13px]">violationPattern</code> regexes.
        </p>

        {/* Single-Row Filter + Search Bar */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Specs' },
              { id: 'components', label: 'Components (22)' },
              { id: 'foundations', label: 'Foundations (16)' },
              { id: 'patterns', label: 'Patterns (7)' },
              { id: 'ai', label: 'Building with AI (4)' },
              { id: 'layouts', label: 'App & SaaS Layouts (7)' },
            ].map((tab) => {
              const active = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id as FilterId)}
                  className={`min-h-[40px] px-3.5 py-2 rounded-full text-[13px] font-mono font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    active
                      ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                      : 'border border-[var(--a-rule)] bg-[var(--a-surface)] text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[var(--a-accent)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components & specs…"
              aria-label="Search components"
              className="w-full h-10 pl-9 pr-3 rounded-full border border-[var(--a-rule)] bg-[var(--a-surface)] text-[13px] text-[var(--a-ink)] outline-none focus:border-[var(--a-accent)]"
            />
          </div>
        </div>
      </header>

      {/* Live Interactive Mini-Stage for Signature Primitives */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-5 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[13px] uppercase tracking-wider text-[var(--a-accent-text)] font-bold">
              Live Primitive · Button &amp; Badge
            </span>
            <div className="my-5 flex flex-wrap items-center gap-2.5">
              <AccentButton variant="primary">Primary Action</AccentButton>
              <AccentButton variant="outline">Hairline</AccentButton>
              <AccentBadge tone="pink">Sovereign</AccentBadge>
            </div>
          </div>
          <Link
            href="/design-system/components/button"
            className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)] hover:text-[var(--a-accent)] inline-flex items-center gap-1"
          >
            <span>Button Spec</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-5 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[13px] uppercase tracking-wider text-[var(--a-accent-text)] font-bold">
              Live Primitive · Open Pedestal
            </span>
            <div className="my-4 pt-3 border-t-2 border-[var(--a-accent)]">
              <span className="font-mono text-[13px] font-bold text-[var(--a-accent)]">
                pipe\website-design
              </span>
              <p className="font-serif text-lg text-[var(--a-ink)] mt-0.5">
                De-cardified editorial pedestal
              </p>
            </div>
          </div>
          <Link
            href="/design-system/components/pedestal"
            className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)] hover:text-[var(--a-accent)] inline-flex items-center gap-1"
          >
            <span>Pedestal Spec</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-5 flex flex-col justify-between">
          <div>
            <span className="font-mono text-[13px] uppercase tracking-wider text-[var(--a-accent-text)] font-bold">
              Live Primitive · Tier-2 Motion
            </span>
            <div className="my-4 flex items-center justify-between">
              <span className="font-serif text-lg text-[var(--a-ink)]">
                Interactive Punctuation
              </span>
              <Smile className="text-3xl" color="var(--a-accent)" winkEvery={2600} />
            </div>
          </div>
          <Link
            href="/design-system/foundations/motion"
            className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)] hover:text-[var(--a-accent)] inline-flex items-center gap-1"
          >
            <span>Motion Spec</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Exhaustive Specification Grid */}
      {filter !== 'layouts' && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 pt-4">
          {items.map((page) => (
            <Link
              key={page.slug}
              href={`/design-system/${page.slug}`}
              className="group pt-5 border-t-2 border-[var(--a-ink)] hover:border-[var(--a-accent)] flex flex-col justify-between transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono text-[13px]">
                  <span className="font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
                    {page.section}
                  </span>
                  <span className="text-[var(--a-muted)]">
                    {page.rules.length} {page.rules.length === 1 ? 'rule' : 'rules'}
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-medium text-[var(--a-ink)] group-hover:text-[var(--a-accent)] transition-colors leading-snug">
                  {page.title}
                </h2>
                <p className="text-sm text-[var(--a-muted)] leading-relaxed line-clamp-3">
                  {page.summary}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[var(--a-rule)] flex items-center justify-between font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)] group-hover:text-[var(--a-accent)]">
                <span>Read 4-Tab Spec</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </section>
      )}

      {(filter === 'all' || filter === 'layouts') && (
        <section className="space-y-6 pt-8 border-t border-[var(--a-rule)]" aria-label="App and SaaS page layouts">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
                Cross-Linked Layouts
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--a-ink)]">
                SaaS Dashboards, Client Ledgers &amp; App Page Layouts
              </h2>
            </div>
            <Link
              href="/design-system/templates#layouts"
              className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[13px] font-semibold text-[var(--a-accent-text)] hover:underline"
            >
              <span>View in Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <AccentAppLayouts />
        </section>
      )}
    </div>
  );
}
