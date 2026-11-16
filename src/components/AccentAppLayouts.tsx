'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Code2, Terminal } from 'lucide-react';
import { BRAND_PROFILES, type BrandProfileId } from '@/styles/themes';

export const APP_TEMPLATES = [
  {
    id: 'archetype-pedestals',
    number: '01',
    title: '3-Column Discovery & Category Page',
    dialect: 'editorial-sandstone' as BrandProfileId,
    usedOn: 'pipes.pink/explore',
    previewKind: 'columns' as const,
    summary:
      'Open three-column directory layout for introducing Personal, Business, and Topic pages above a clean searchable list.',
    highlights: ['Open 2px top-rule columns', 'Single-row category & search bar', 'Zero stacked boxes'],
  },
  {
    id: 'chb-hero',
    number: '02',
    title: 'Studio Masthead & Service Flagship (:-])',
    dialect: 'playful-principal' as BrandProfileId,
    usedOn: 'colonhyphenbracket.pink',
    previewKind: 'hero' as const,
    summary:
      'High-impact studio homepage with confident display typography, one focal accent color, and clear direct call-to-action buttons.',
    highlights: ['Bold strike-through headline reveal', 'Clean pill action buttons', 'Single focal accent'],
  },
  {
    id: 'thesis-edition',
    number: '03',
    title: 'Long-Form Guide & Reading Room',
    dialect: 'cassandra-noir' as BrandProfileId,
    usedOn: 'pipes.pink/thesis/*',
    previewKind: 'article' as const,
    summary:
      'Three-column reading layout with table of contents on the left, comfortable 65-character prose middle column, and cited notes on the right.',
    highlights: ['High-contrast (>= 7.0:1) body text', '60–72 character line width', 'Zero distracting clutter'],
  },
  {
    id: 'agent-workbench',
    number: '04',
    title: 'Guided Question Counter & Local AI Stage',
    dialect: 'greater-terminal' as BrandProfileId,
    usedOn: 'pipes.pink/optimize',
    previewKind: 'workbench' as const,
    summary:
      'Plain-English assistant view showing pinned rules, cited sources, and measurable cost savings in a crisp status layout.',
    highlights: ['Clear command header', 'Clickable source citations', 'Instant press feedback'],
  },
  {
    id: 'tabular-ledger',
    number: '05',
    title: 'Civic & Price Schedule Table',
    dialect: 'terracotta-civic' as BrandProfileId,
    usedOn: 'marigoldinsights.org',
    previewKind: 'table' as const,
    summary:
      'Easy-to-scan table layout with generous 1.8 line spacing, aligned numbers on the right, and warm sandstone paper ground.',
    highlights: ['1.8 generous line spacing', 'Right-aligned prices & figures', '1px horizontal hairlines only'],
  },
  {
    id: 'daily-desk',
    number: '06',
    title: 'Daily Briefing & Audio Summary Desk',
    dialect: 'albers-perspectives' as BrandProfileId,
    usedOn: 'pipes.pink/curate',
    previewKind: 'briefing' as const,
    summary:
      'Balanced 3-story daily reading header paired with equal-height summary strips and a steady audio player bar.',
    highlights: ['Balanced 12-column header', 'Equal-height 3-story row', 'Steady bottom audio strip'],
  },
  {
    id: 'saas-operations',
    number: '07',
    title: 'Business SaaS, KPIs & Data Ledger',
    dialect: 'editorial-sandstone' as BrandProfileId,
    usedOn: 'Cloud AI / :-] Studio Tier',
    previewKind: 'saas' as const,
    summary:
      'Interactive operations console with KPI summary strip, single-row filter tabs, keyboard-scrollable client ledger table, and detail strip.',
    highlights: [
      'Keyboard-scrollable region table',
      'Single-row bottom-bordered filter tabs',
      'Right-aligned tabular figures',
    ],
  },
];

function AppTemplateVisualPreview({
  kind,
  bg,
  surface,
  ink,
  accent,
  displayFont,
}: {
  kind: 'columns' | 'hero' | 'article' | 'workbench' | 'table' | 'briefing' | 'saas';
  bg: string;
  surface: string;
  ink: string;
  accent: string;
  displayFont: string;
}) {
  const ruleColor = 'rgba(17,24,39,0.16)';
  return (
    <div
      style={{ backgroundColor: bg, color: ink, borderColor: ruleColor }}
      className="h-44 rounded-xl border p-4 flex flex-col justify-between overflow-hidden select-none"
      aria-hidden
    >
      <div className="flex items-center justify-between pb-2 border-b text-[13px] font-mono" style={{ borderColor: ruleColor }}>
        <span className="font-bold" style={{ color: accent }}>Layout Preview</span>
        <span className="h-2.5 w-16 rounded-full" style={{ backgroundColor: surface }} />
      </div>

      {kind === 'columns' && (
        <div className="grid grid-cols-3 gap-3 pt-2 flex-1 items-center">
          {[true, false, false].map((isPrimary, idx) => (
            <div key={idx} className="border-t-2 pt-2 space-y-1.5" style={{ borderColor: isPrimary ? accent : ink }}>
              <div className="h-2 w-12 rounded-sm" style={{ backgroundColor: accent }} />
              <div className="h-3 w-full rounded-sm opacity-80" style={{ backgroundColor: ink }} />
              <div className="h-2 w-5/6 rounded-sm opacity-35" style={{ backgroundColor: ink }} />
            </div>
          ))}
        </div>
      )}

      {kind === 'hero' && (
        <div className="space-y-2.5 py-2 flex-1 flex flex-col justify-center">
          <div style={{ fontFamily: displayFont }} className="text-xl font-bold leading-tight">
            <span className="line-through opacity-40 mr-2">Generic</span>
            <span style={{ color: accent }}>Original Craft.</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-full text-[13px] font-semibold text-white" style={{ backgroundColor: accent }}>
              Book Sprint
            </span>
            <span className="px-3 py-1 rounded-full text-[13px] border" style={{ borderColor: ruleColor }}>
              See Work
            </span>
          </div>
        </div>
      )}

      {kind === 'article' && (
        <div className="grid grid-cols-12 gap-3 pt-2 flex-1 items-start">
          <div className="col-span-3 space-y-1.5 pt-1">
            <div className="h-2 w-full rounded-sm" style={{ backgroundColor: accent }} />
            <div className="h-2 w-4/5 rounded-sm opacity-35" style={{ backgroundColor: ink }} />
            <div className="h-2 w-3/4 rounded-sm opacity-35" style={{ backgroundColor: ink }} />
          </div>
          <div className="col-span-6 space-y-2 border-x px-2.5" style={{ borderColor: ruleColor }}>
            <div style={{ fontFamily: displayFont }} className="text-sm font-semibold">Reading Room Spine</div>
            <div className="h-2 w-full rounded-sm opacity-60" style={{ backgroundColor: ink }} />
            <div className="h-2 w-11/12 rounded-sm opacity-45" style={{ backgroundColor: ink }} />
            <div className="h-2 w-4/5 rounded-sm opacity-45" style={{ backgroundColor: ink }} />
          </div>
          <div className="col-span-3 space-y-1.5 pt-1">
            <div className="h-2 w-3/4 rounded-sm opacity-50" style={{ backgroundColor: accent }} />
            <div className="h-2 w-full rounded-sm opacity-30" style={{ backgroundColor: ink }} />
          </div>
        </div>
      )}

      {kind === 'workbench' && (
        <div className="space-y-2.5 pt-1 flex-1 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-mono font-bold" style={{ color: accent }}>Q&amp;A + Verified Notes</span>
            <span className="px-2 py-0.5 rounded text-[13px] text-white font-mono" style={{ backgroundColor: accent }}>Local AI</span>
          </div>
          <div className="p-2.5 rounded-md space-y-1.5" style={{ backgroundColor: surface }}>
            <div className="h-2 w-3/4 rounded-sm opacity-75" style={{ backgroundColor: ink }} />
            <div className="h-2 w-1/2 rounded-sm opacity-40" style={{ backgroundColor: ink }} />
          </div>
        </div>
      )}

      {kind === 'table' && (
        <div className="divide-y pt-1 flex-1" style={{ borderColor: ruleColor }}>
          {[1, 2, 3].map((r) => (
            <div key={r} className="py-2 flex items-center justify-between gap-4">
              <div className="h-2.5 w-2/5 rounded-sm opacity-70" style={{ backgroundColor: ink }} />
              <div className="h-2.5 w-16 rounded-sm" style={{ backgroundColor: accent }} />
            </div>
          ))}
        </div>
      )}

      {kind === 'briefing' && (
        <div className="space-y-2.5 pt-1 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="p-2 rounded" style={{ backgroundColor: surface }}>
                <div className="h-2 w-1/2 rounded-sm mb-1.5" style={{ backgroundColor: accent }} />
                <div className="h-2 w-full rounded-sm opacity-65" style={{ backgroundColor: ink }} />
              </div>
            ))}
          </div>
          <div className="px-2.5 py-1.5 rounded flex items-center justify-between text-[13px] font-mono" style={{ backgroundColor: surface }}>
            <span>Audio Summary · 04:18</span>
            <span style={{ color: accent }}>Play ▸</span>
          </div>
        </div>
      )}

      {kind === 'saas' && (
        <div className="space-y-2.5 pt-1 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-1.5 border-b pb-2" style={{ borderColor: ruleColor }}>
            <div className="h-5 rounded-sm" style={{ backgroundColor: surface }} />
            <div className="h-5 rounded-sm" style={{ backgroundColor: surface }} />
            <div className="h-5 rounded-sm" style={{ backgroundColor: surface }} />
          </div>
          <div className="space-y-1.5 font-mono text-[13px]" style={{ color: ink }}>
            <div className="flex justify-between border-b pb-1" style={{ borderColor: ruleColor }}>
              <span>Client Ledger</span>
              <span style={{ color: accent }}>$28,450</span>
            </div>
            <div className="flex justify-between opacity-80">
              <span>Eastside Taco Co.</span>
              <span>Live</span>
            </div>
            <div className="flex justify-between opacity-75">
              <span>Brightline CPA</span>
              <span style={{ color: accent }}>Review</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface SaasClientRow {
  id: string;
  business: string;
  city: string;
  tier: 'Free Local' | 'Cloud AI' | 'Studio Sprint';
  status: 'Live' | 'Needs Review' | 'Drafting';
  monthly: string;
  updated: string;
  nextTask: string;
}

const SAAS_LEDGER_ROWS: SaasClientRow[] = [
  {
    id: 'taco',
    business: 'Eastside Taco Co.',
    city: 'Austin, TX',
    tier: 'Studio Sprint',
    status: 'Live',
    monthly: '$480 / mo',
    updated: '2 hrs ago',
    nextTask: 'Weekend breakfast special copy approved for Friday launch.',
  },
  {
    id: 'bank',
    business: 'Hill Country Community Bank',
    city: 'Fredericksburg, TX',
    tier: 'Studio Sprint',
    status: 'Needs Review',
    monthly: '$1,250 / mo',
    updated: '4 hrs ago',
    nextTask: 'CD rate sheet Monday update queued for branch manager sign-off.',
  },
  {
    id: 'office',
    business: 'Brightline Accounting',
    city: 'Columbus, OH',
    tier: 'Cloud AI',
    status: 'Live',
    monthly: '$240 / mo',
    updated: 'Yesterday',
    nextTask: 'Flat-fee tax call calendar synced cleanly for Q1 slots.',
  },
  {
    id: 'salon',
    business: 'Maple & Mirror Hair Studio',
    city: 'Denver, CO',
    tier: 'Studio Sprint',
    status: 'Needs Review',
    monthly: '$420 / mo',
    updated: 'Yesterday',
    nextTask: 'Verify color-service add-on wording with lead stylist.',
  },
  {
    id: 'portfolio',
    business: 'Jordan Lee Product Design',
    city: 'Portland, OR',
    tier: 'Cloud AI',
    status: 'Live',
    monthly: '$180 / mo',
    updated: '3 days ago',
    nextTask: 'Spring case-study gallery published and performance-checked.',
  },
  {
    id: 'cypress',
    business: 'Cypress Creek Coffee & Inn',
    city: 'Wimberley, TX',
    tier: 'Free Local',
    status: 'Drafting',
    monthly: '$0 / mo',
    updated: '5 days ago',
    nextTask: 'First local BANG! draft exported; ready for porch photos.',
  },
];

type SaasFilter = 'All' | 'Needs Review' | 'Live' | 'Drafting';

function SaasOperationsSpecimen() {
  const [statusFilter, setStatusFilter] = useState<SaasFilter>('All');
  const [selectedRowId, setSelectedRowId] = useState<string>('bank');

  const visibleRows =
    statusFilter === 'All'
      ? SAAS_LEDGER_ROWS
      : SAAS_LEDGER_ROWS.filter((r) => r.status === statusFilter);
  const activeRow =
    visibleRows.find((r) => r.id === selectedRowId) ?? visibleRows[0] ?? SAAS_LEDGER_ROWS[0];

  const filterTabs: { id: SaasFilter; label: string }[] = [
    { id: 'All', label: `All Clients (${SAAS_LEDGER_ROWS.length})` },
    { id: 'Needs Review', label: 'Needs Review (2)' },
    { id: 'Live', label: 'Live Sites (3)' },
    { id: 'Drafting', label: 'Drafting (1)' },
  ];

  return (
    <div className="rounded-2xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
            07 · Interactive Business SaaS &amp; Data-Table Specimen
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--a-ink)]">
            Operations Ledger &amp; Client Queue
          </h3>
          <p className="text-[14px] text-[var(--a-muted)] max-w-[65ch]">
            Complex filter tabs and multi-column data tables exceed what small local models handle reliably in one shot—so use Cloud AI + <code className="font-mono">STYLES.md</code> or a :-] Sprint for SaaS screens like this.
          </p>
        </div>
        <span className="inline-flex min-h-[36px] items-center rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 font-mono text-[13px] font-semibold text-[var(--a-ink)]">
          Tabular Numerals · Zero Nested Cards
        </span>
      </div>

      {/* KPI summary strip using 1px hairline rules instead of stacked cards */}
      <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
        {[
          ['Managed Client Sites', '48 active'],
          ['Average Reply Time', '1.4 hours'],
          ['Monthly Retainer Ledger', '$28,450'],
          ['Items Waiting Review', '2 updates'],
        ].map(([k, v]) => (
          <div key={k} className="py-3.5 px-3 first:pl-0">
            <dt className="text-[13px] text-[var(--a-muted)]">{k}</dt>
            <dd className="mt-1 font-mono text-xl font-bold text-[var(--a-ink)] tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>

      {/* Single-row scrolling tab filter strip with bottom-border indicator */}
      <div
        role="tablist"
        aria-label="Filter operations ledger by site status"
        className="flex flex-nowrap overflow-x-auto gap-1 border-b border-[var(--a-rule)]"
      >
        {filterTabs.map((tab) => {
          const active = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setStatusFilter(tab.id)}
              className={`shrink-0 whitespace-nowrap min-h-[44px] px-4 text-[13px] font-semibold cursor-pointer border-b-[3px] transition-colors ${
                active
                  ? 'border-[var(--a-accent)] text-[var(--a-ink)]'
                  : 'border-transparent text-[var(--a-muted)] hover:text-[var(--a-ink)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Keyboard-scrollable native data table */}
      <div
        className="overflow-x-auto bg-[var(--a-bg)] rounded-xl border border-[var(--a-rule)]"
        tabIndex={0}
        role="region"
        aria-label="Client sites and operations ledger"
      >
        <table className="w-full min-w-[660px] border-collapse text-left">
          <thead className="bg-[var(--a-surface)] border-b border-[var(--a-ink)]">
            <tr className="font-mono text-[13px] uppercase tracking-wider text-[var(--a-muted)]">
              <th scope="col" className="py-3.5 px-4">Business</th>
              <th scope="col" className="py-3.5 px-4">Build Path</th>
              <th scope="col" className="py-3.5 px-4">Status</th>
              <th scope="col" className="py-3.5 px-4 text-right">Monthly Plan</th>
              <th scope="col" className="py-3.5 px-4 text-right">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--a-rule)]">
            {visibleRows.map((row) => {
              const selected = activeRow.id === row.id;
              return (
                <tr
                  key={row.id}
                  onClick={() => setSelectedRowId(row.id)}
                  aria-selected={selected}
                  className={`cursor-pointer transition-colors ${
                    selected ? 'bg-[var(--a-surface)]' : 'hover:bg-[var(--a-surface)]/60'
                  }`}
                >
                  <th scope="row" className="py-3.5 px-4 font-semibold text-[14px] text-[var(--a-ink)]">
                    <div>{row.business}</div>
                    <div className="text-[13px] font-normal text-[var(--a-muted)]">{row.city}</div>
                  </th>
                  <td className="py-3.5 px-4 font-mono text-[13px] text-[var(--a-ink)]">{row.tier}</td>
                  <td className="py-3.5 px-4 text-[13px] font-semibold">
                    <span
                      className={
                        row.status === 'Needs Review'
                          ? 'text-[var(--a-accent-text)]'
                          : row.status === 'Live'
                            ? 'text-[var(--a-emerald)]'
                            : 'text-[var(--a-muted)]'
                      }
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[13px] text-[var(--a-ink)] tabular-nums">
                    {row.monthly}
                  </td>
                  <td className="py-3.5 px-4 text-right text-[13px] text-[var(--a-muted)] tabular-nums">
                    {row.updated}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected row action strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[13px]">
        <p className="text-[var(--a-ink)]">
          <strong className="font-semibold">{activeRow.business}:</strong>{' '}
          <span className="text-[var(--a-muted)]">{activeRow.nextTask}</span>
        </p>
        <span className="font-mono text-[13px] font-semibold text-[var(--a-accent-text)]">
          Click any row to inspect next step
        </span>
      </div>
    </div>
  );
}

/** Seven app, SaaS, and publication page layouts with interactive specimen and mini wireframes. */
export function AccentAppLayouts() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyPrompt = async (t: (typeof APP_TEMPLATES)[number]) => {
    const prompt = `Build the "${t.title}" layout using the Accént "${t.dialect}" palette.
1. Style guide: curl -s "https://design.pipes.pink/design-system/styles.md?brand=${t.dialect}" > STYLES.md
2. Key structure:
   - ${t.highlights.join('\n   - ')}
3. Validate against https://design.pipes.pink/design-system/rules.json before finishing.`;
    await navigator.clipboard.writeText(prompt);
    setCopiedKey(t.id);
    window.setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-12">
      <SaasOperationsSpecimen />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
          {APP_TEMPLATES.map((t) => {
            const profile = BRAND_PROFILES[t.dialect];
            const lt = profile.tokens.light;
            return (
              <article
                key={t.id}
                className="flex flex-col justify-between border-t-2 border-[var(--a-ink)] pt-6 space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 font-mono text-[13px]">
                    <span className="font-bold" style={{ color: lt['--a-accent-fill'] || lt['--a-accent'] }}>
                      {t.number} · {t.usedOn}
                    </span>
                    <span className="text-[var(--a-muted)]">{profile.name.split('(')[0].trim()}</span>
                  </div>

                  <AppTemplateVisualPreview
                    kind={t.previewKind}
                    bg={lt['--a-bg']}
                    surface={lt['--a-surface']}
                    ink={lt['--a-ink']}
                    accent={lt['--a-accent-fill'] || lt['--a-accent']}
                    displayFont={lt['--a-font-display']}
                  />

                  <h3
                    className="text-2xl font-semibold leading-snug text-[var(--a-ink)]"
                    style={{ fontFamily: lt['--a-font-display'] }}
                  >
                    {t.title}
                  </h3>

                  <p className="text-sm text-[var(--a-muted)] leading-relaxed">{t.summary}</p>

                  <ul className="space-y-1.5 pt-1">
                    {t.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-[13px] font-mono text-[var(--a-ink)]">
                        <span className="text-[var(--a-accent)] font-bold">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[var(--a-rule)] flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/design-system/playground?brand=${t.dialect}`}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] px-5 font-mono text-[13px] font-bold uppercase tracking-wider hover:opacity-90"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>Open in Playground</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleCopyPrompt(t)}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-4 font-mono text-[13px] font-semibold text-[var(--a-ink)] hover:border-[var(--a-accent)] cursor-pointer"
                  >
                    {copiedKey === t.id ? (
                      <>
                        <Check className="w-4 h-4 text-[var(--a-emerald)]" />
                        <span>Copied AI Prompt</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="w-4 h-4 text-[var(--a-accent)]" />
                        <span>Copy AI Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
}
