'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Code2, Copy, Check, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { BRAND_PROFILES, type BrandProfileId } from '@/styles/themes';
import { AccentBadge } from '@/components/ui';

const TEMPLATES = [
  {
    id: 'archetype-pedestals',
    number: '01',
    title: '3-Archetype Discovery Page (Personal, Business & Topic Pipes)',
    dialect: 'editorial-sandstone' as BrandProfileId,
    usedOn: 'pipes.pink/explore',
    summary:
      'Airy max-w-6xl discovery layout that introduces Personal Pipes, Business Pipes, and Topic-based Pipes on open border-t-2 architectural pedestals before presenting the full directory.',
    highlights: ['Open 2px top-rule pedestals', 'Single-row category + search bar', 'Zero nested boxes inside cards'],
  },
  {
    id: 'chb-hero',
    number: '02',
    title: 'Playful-Principal Corporate Studio Flagship (:-])',
    dialect: 'playful-principal' as BrandProfileId,
    usedOn: 'colonhyphenbracket.pink',
    summary:
      'High-converting studio masthead pairing Bricolage Grotesque (-0.035em), Sovereign Hot Pink (#FE299E) punctuation marks, 3-phase ScaryHeadline strike-throughs, and 7 non-repeating product color slots.',
    highlights: ['ScaryHeadline + Smile wink', '9999px Full-Pill CTAs', '7 non-repeating product slots'],
  },
  {
    id: 'thesis-edition',
    number: '03',
    title: 'Sovereign Thesis Edition & Monograph Reading Room',
    dialect: 'cassandra-noir' as BrandProfileId,
    usedOn: 'pipes.pink/thesis/* · hire.colonhyphenbracket.pink',
    summary:
      '3-column academic and investigative long-form reading spine with left Table of Contents, 65ch Fraunces/Newsreader prose column, and right citation marginalia.',
    highlights: ['WCAG AAA (>= 7.0:1) prose', '60–72ch optimal measure', 'Zero box-shadow distractions'],
  },
  {
    id: 'agent-workbench',
    number: '04',
    title: 'Semi (; - ]) AI Agent & Trim (~) MCP Workbench',
    dialect: 'greater-terminal' as BrandProfileId,
    usedOn: 'pipes.pink/optimize · greater.pink',
    summary:
      'Socratic AI assistant and 8-stage prompt compression dashboard showing byte-0 pinned invariants, SHA-256 verified Pipe slices, and 90% token savings.',
    highlights: ['JetBrains Mono terminal stage', 'Verified citation badges', '140ms micro-press feedback'],
  },
  {
    id: 'tabular-ledger',
    number: '05',
    title: 'Zero-Knowledge Civic & Financial Analytics Ledger',
    dialect: 'terracotta-civic' as BrandProfileId,
    usedOn: 'marigoldinsights.org · pipe\\commercial-banking',
    summary:
      'Senior-accessible (1.8 line-height) data storytelling template with DuckDB-Wasm schedule tables, tabular-nums alignment, and warm parchment wells.',
    highlights: ['1.8 senior-friendly leading', 'tabular-nums right alignment', 'Horizontal 1px hairlines only'],
  },
  {
    id: 'daily-desk',
    number: '06',
    title: 'Personal Daily Desk & Audio Dispatch Edition',
    dialect: 'albers-perspectives' as BrandProfileId,
    usedOn: 'pipes.pink/curate',
    summary:
      'Balanced 12-column daily briefing masthead paired with a 3-column Today’s Three pedestal row, two-host audio dispatch bar, and backfilled 8+4 editorial stream.',
    highlights: ['12-column balanced masthead', 'Equal-height 3-col lead row', 'Persistent audio waveform bar'],
  },
];

export default function AccentTemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPrompt = async (t: (typeof TEMPLATES)[number]) => {
    const prompt = `Scaffold the Accént "${t.title}" template using the "${t.dialect}" BrandProfile.
1. Fetch the style contract: curl -s "https://design.pipes.pink/design-system/styles.md?brand=${t.dialect}" > STYLES.md
2. Key architectural rules for this template:
   - ${t.highlights.join('\n   - ')}
3. Validate generated code against https://design.pipes.pink/design-system/rules.json before finishing.`;
    await navigator.clipboard.writeText(prompt);
    setCopiedId(t.id);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="py-10 sm:py-14 space-y-12 max-w-[1080px]">
      <header className="space-y-4 border-b border-[var(--a-rule)] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <AccentBadge tone="pink">6 Production Templates</AccentBadge>
          <AccentBadge tone="sky">Multi-Brand Adaptive · Agent Ready</AccentBadge>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--a-ink)]">
          Ready-to-Ship Templates
        </h1>
        <p className="text-base sm:text-lg text-[var(--a-muted)] max-w-[66ch] leading-relaxed">
          Production-proven page architectures powering Pipes, Colon Hyphen Bracket, Portfolio, Marigold, and Greater. Open any template in the live Playground or copy its Agent Scaffold Prompt in one click.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {TEMPLATES.map((t) => {
          const profile = BRAND_PROFILES[t.dialect];
          const lt = profile.tokens.light;
          return (
            <article
              key={t.id}
              className="flex flex-col justify-between rounded-2xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-6 sm:p-7 space-y-6"
            >
              <div className="space-y-4">
                {/* Mini Visual Dialect Preview Header */}
                <div
                  style={{ backgroundColor: lt['--a-bg'], color: lt['--a-ink'] }}
                  className="rounded-xl p-5 border border-black/10 space-y-3"
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold" style={{ color: lt['--a-accent'] }}>
                      {t.number} · {profile.mark} {profile.name.split('(')[0].trim()}
                    </span>
                    <span className="opacity-65">{t.usedOn}</span>
                  </div>
                  <div
                    className="pt-3 border-t-2"
                    style={{ borderColor: lt['--a-accent'] }}
                  >
                    <h2
                      className="text-xl sm:text-2xl font-semibold leading-snug"
                      style={{ fontFamily: lt['--a-font-display'] }}
                    >
                      {t.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-[var(--a-muted)] leading-relaxed">
                  {t.summary}
                </p>

                <ul className="space-y-1.5 pt-1">
                  {t.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-xs font-mono text-[var(--a-ink)]"
                    >
                      <span className="text-[var(--a-accent)] font-bold">✓</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[var(--a-rule)] flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/design-system/playground?brand=${t.dialect}`}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] px-4 font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Open in Playground →</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleCopyPrompt(t)}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-4 font-mono text-xs font-semibold text-[var(--a-ink)] hover:border-[var(--a-accent)] cursor-pointer"
                >
                  {copiedId === t.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--a-emerald)]" />
                      <span>Copied Agent Prompt</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-[var(--a-accent)]" />
                      <span>Copy Agent Prompt</span>
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
