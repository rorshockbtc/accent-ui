'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Code2, Check, Terminal } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { DURATION, EASE_ACCENT, SPRING_LAYOUT } from '@/lib/motion/tokens';
import { FadeUp, Hairline, RiseLines } from './editorial-motion/AccentBrandMotion';
import type { AccentTabId, AgentRule } from '@/content/accent/types';
import { AccentProse } from './AccentProse';

const TAB_LABELS: Record<AccentTabId, string> = {
  overview: 'Overview',
  guidelines: 'Guidelines',
  specs: 'Specs',
  accessibility: 'Accessibility',
};
const TAB_ORDER: AccentTabId[] = ['overview', 'guidelines', 'specs', 'accessibility'];

type PageLite = { slug: string; title: string };

export type AccentDocProps = {
  slug: string;
  title: string;
  summary: string;
  sectionLabel: string;
  readingMinutes: number;
  kind: 'doc' | 'essay';
  pipes?: string[];
  subPatterns?: string[];
  liveInPipes?: Array<{ label: string; href: string }>;
  relatedPages?: Array<{ slug: string; title: string; kind?: 'doc' | 'essay' }>;
  tabs: Partial<Record<AccentTabId, string>>;
  rules: AgentRule[];
  prev?: PageLite;
  next?: PageLite;
};

function OnThisPage({ deps }: { deps: unknown }) {
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const root = document.getElementById('accent-article');
    if (!root) return;
    const hs = Array.from(root.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]'));
    setItems(hs.map((h) => ({ id: h.id, text: h.textContent || '', level: h.tagName === 'H2' ? 2 : 3 })));
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px' }
    );
    hs.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [deps]);

  if (items.length < 2) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--a-muted)]">On this page</p>
      <ul className="space-y-1 border-l border-[var(--a-rule)]">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              className={`block py-1 leading-5 -ml-px border-l-2 t-color ${it.level === 3 ? 'pl-6' : 'pl-3'} ${
                active === it.id ? 'border-[var(--a-accent)] text-[var(--a-ink)] font-medium' : 'border-transparent text-[var(--a-muted)] hover:text-[var(--a-ink)]'
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function AccentDoc(props: AccentDocProps) {
  const available = TAB_ORDER.filter((t) => props.tabs[t]);
  const [tab, setTab] = useState<AccentTabId>(available[0] ?? 'overview');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLocalPrompt, setCopiedLocalPrompt] = useState(false);
  const [copiedRules, setCopiedRules] = useState(false);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.replace('#', '') as AccentTabId;
      if (available.includes(h)) setTab(h);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.slug]);

  const selectTab = (t: AccentTabId) => {
    setTab(t);
    history.replaceState(null, '', `#${t}`);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + available.length) % available.length;
    selectTab(available[n]);
    document.getElementById(`tab-${available[n]}`)?.focus();
  };

  const handleCopyAgentSpec = () => {
    const rulesList = props.rules
      .map((r) => `- [${r.id}] ${r.statement} (Why: ${r.why})${r.violationPattern ? ` [Regex: /${r.violationPattern}/]` : ''}`)
      .join('\n');
    const prompt = `# Accént 3.0 Agent Contract · ${props.title} (${props.slug})\n\nSummary: ${props.summary}\n\n## Hard Architectural Rules (${props.rules.length})\n${rulesList || '- Follow Accént 8px baseline grid and 13px minimum typography floor.'}\n\n## Specification (${TAB_LABELS[tab]})\n${props.tabs[tab] ?? ''}`;
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    window.setTimeout(() => setCopiedPrompt(false), 1800);
  };

  const handleCopyRulesJson = () => {
    navigator.clipboard.writeText(JSON.stringify(props.rules, null, 2));
    setCopiedRules(true);
    window.setTimeout(() => setCopiedRules(false), 1800);
  };

  const handleCopyLocalPrompt = () => {
    const rulesList = props.rules
      .map((r) => `- [${r.id}] ${r.statement}`)
      .join('\n');
    const cmd = `# Run locally with Ollama (0 cloud tokens) using Accént's STYLES.md contract:\ncurl -s https://accent.pipes.pink/styles.md > /tmp/accent-styles.md\nollama run qwen2.5-coder:7b "$(cat <<'EOF'\nImplement ${props.title} (${props.slug}) strictly following Accént 3.1.\nRules:\n${rulesList || '- Enforce >= 13px font floor, >= 44x44px hit targets, 0 Sparkles icons, and card.no-nesting.'}\nSpecification excerpt:\n${(props.tabs[tab] ?? '').slice(0, 1200)}\nEOF\n)"`;
    navigator.clipboard.writeText(cmd);
    setCopiedLocalPrompt(true);
    window.setTimeout(() => setCopiedLocalPrompt(false), 1800);
  };

  const isEssay = props.kind === 'essay';

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12">
      <article id="accent-article" className="min-w-0 py-10 sm:py-16">
        <header key={props.slug} className="max-w-[72ch]">
          <FadeUp immediate y={10}>
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-accent-text)]">
                {props.sectionLabel}
              </p>
              <span className="text-xs font-mono text-[var(--a-muted)]">·</span>
              <span className="text-xs font-mono text-[var(--a-muted)]">{props.slug}</span>
              {props.rules.length > 0 && (
                <span className="inline-flex items-center rounded-full border border-[var(--a-rule)] bg-[var(--a-surface)] px-2.5 py-0.5 text-xs font-mono text-[var(--a-ink)]">
                  {props.rules.length} Enforced {props.rules.length === 1 ? 'Rule' : 'Rules'}
                </span>
              )}
            </div>
          </FadeUp>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl leading-[1.1] font-semibold tracking-tight">
            <RiseLines immediate lines={[props.title]} />
          </h1>
          <FadeUp immediate delay={0.08} y={14}>
            <p className="mt-4 text-lg sm:text-xl leading-8 text-[var(--a-muted)]">{props.summary}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-[var(--a-rule)] py-3">
              <p className="text-xs font-mono text-[var(--a-muted)]">
                {props.readingMinutes} min read
                {props.pipes && props.pipes.length > 0 && (
                  <>
                    {' · Published in '}
                    {props.pipes.map((p, i) => (
                      <React.Fragment key={p}>
                        {i > 0 && ', '}
                        <Link href={`/explore/${p}`} className="font-mono underline underline-offset-4 hover:text-[var(--a-accent)]">
                          pipe\{p}
                        </Link>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </p>

              {/* Agent & Playground Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyAgentSpec}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-surface)] px-3.5 py-2 text-[13px] font-mono font-medium text-[var(--a-ink)] transition-colors hover:border-[var(--a-accent)] hover:text-[var(--a-accent-text)] cursor-pointer"
                >
                  {copiedPrompt ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <span className="font-bold text-[var(--a-accent-text)]" aria-hidden="true">&gt;</span>}
                  {copiedPrompt ? 'Copied Spec Prompt' : 'Copy Agent Spec'}
                </button>
                <button
                  type="button"
                  onClick={handleCopyLocalPrompt}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-surface)] px-3.5 py-2 text-[13px] font-mono font-medium text-[var(--a-ink)] transition-colors hover:border-[var(--a-accent)] hover:text-[var(--a-accent-text)] cursor-pointer"
                >
                  {copiedLocalPrompt ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Terminal className="h-3.5 w-3.5 text-[var(--a-accent-text)]" aria-hidden="true" />}
                  {copiedLocalPrompt ? 'Copied Ollama CLI' : 'Copy Sovereign Local Prompt'}
                </button>
                {props.rules.length > 0 && (
                  <button
                    type="button"
                    onClick={handleCopyRulesJson}
                    className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-surface)] px-3.5 py-2 text-[13px] font-mono font-medium text-[var(--a-muted)] transition-colors hover:border-[var(--a-ink)] hover:text-[var(--a-ink)] cursor-pointer"
                  >
                    {copiedRules ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Terminal className="h-3.5 w-3.5" />}
                    {copiedRules ? 'Copied JSON' : 'Rules JSON'}
                  </button>
                )}
                <Link
                  href="/design-system/playground"
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--a-ink)] px-4 py-2 text-[13px] font-mono font-semibold text-[var(--a-bg)] transition-colors hover:bg-[var(--a-accent-fill)] hover:text-[var(--a-accent-fg)]"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  Playground →
                </Link>
              </div>
            </div>

            {((props.subPatterns && props.subPatterns.length > 0) ||
              (props.liveInPipes && props.liveInPipes.length > 0)) && (
              <div className="border-b border-[var(--a-rule)] py-3 space-y-2 text-[13px] font-mono">
                {props.subPatterns && props.subPatterns.length > 0 && (
                  <p className="text-[var(--a-ink)] leading-relaxed">
                    <span className="text-[var(--a-muted)] uppercase mr-2">Sub-patterns:</span>
                    {props.subPatterns.join(' · ')}
                  </p>
                )}
                {props.liveInPipes && props.liveInPipes.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-[var(--a-muted)] uppercase">Live in Pipes:</span>
                    {props.liveInPipes.map((ref) => (
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
              </div>
            )}
          </FadeUp>
        </header>

        {!isEssay && available.length > 1 && (
          <div role="tablist" aria-label="Page sections" className="sticky top-16 z-30 mt-8 -mx-4 sm:mx-0 px-4 sm:px-0 flex gap-1 overflow-x-auto border-b border-[var(--a-rule)] bg-[var(--a-bg)]/95 backdrop-blur">
            {available.map((t, i) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  id={`tab-${t}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls={`panel-${t}`}
                  tabIndex={active ? 0 : -1}
                  onKeyDown={(e) => onTabKey(e, i)}
                  onClick={() => selectTab(t)}
                  className={`relative min-h-[48px] px-4 text-sm whitespace-nowrap -mb-px t-color cursor-pointer ${
                    active ? 'font-semibold text-[var(--a-ink)]' : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                  }`}
                >
                  {TAB_LABELS[t]}
                  {active && (
                    <m.span
                      layoutId={`accent-doc-tab-${props.slug}`}
                      transition={SPRING_LAYOUT}
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--a-accent)]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={`${props.slug}-${tab}`}
            id={`panel-${tab}`}
            role={isEssay ? undefined : 'tabpanel'}
            aria-labelledby={isEssay ? undefined : `tab-${tab}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: DURATION.base, ease: EASE_ACCENT }}
            className="mt-4"
          >
            <AccentProse markdown={props.tabs[tab] ?? ''} />
          </m.div>
        </AnimatePresence>

        {props.rules.length > 0 && (
          <section aria-labelledby="rules-heading" className="mt-16 pt-10">
            <Hairline className="mb-10 bg-[var(--a-rule)]" />
            <FadeUp>
              <div className="flex flex-wrap items-baseline justify-between gap-2 max-w-[68ch]">
                <h2 id="rules-heading" className="scroll-mt-28 font-serif text-2xl leading-10 font-semibold">
                  Machine-Enforced Rules for AI Models ({props.rules.length})
                </h2>
                <Link href="/design-system/rules.json" className="text-xs font-mono text-[var(--a-accent)] hover:underline">
                  GET /design-system/rules.json ↗
                </Link>
              </div>
              <p className="mt-2 text-base leading-7 text-[var(--a-muted)] max-w-[68ch]">
                Every rule below is published in{' '}
                <Link href="/design-system/rules.json" className="font-mono underline underline-offset-4">rules.json</Link>{' '}
                and enforced in the <Link href="/design-system/playground" className="font-mono underline underline-offset-4">Live Playground</Link> and CI test ratchet.
              </p>
              <ol className="mt-6 divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)] max-w-[68ch]">
                {props.rules.map((r) => (
                  <li key={r.id} className="py-5 grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-2 sm:gap-4">
                    <div>
                      <span className="inline-block font-mono text-xs font-semibold text-[var(--a-accent)]">{r.id}</span>
                      {r.violationPattern && (
                        <span className="mt-1 block font-mono text-xs text-[var(--a-muted)] break-all">
                          /{r.violationPattern}/
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="block text-base leading-7 font-medium text-[var(--a-ink)]">{r.statement}</span>
                      <span className="mt-1 block text-sm leading-6 text-[var(--a-muted)]">Why: {r.why}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </FadeUp>
          </section>
        )}

        {props.relatedPages && props.relatedPages.length > 0 && (
          <section aria-labelledby="bridge-heading" className="mt-14 pt-8 border-t border-[var(--a-rule)] max-w-[68ch]">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--a-accent-text)]">
              &gt; Theory ↔ Implementation Bridge
            </p>
            <h2 id="bridge-heading" className="mt-1 font-serif text-2xl font-semibold text-[var(--a-ink)]">
              Companion Specifications &amp; Essays
            </h2>
            <ul className="mt-4 divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
              {props.relatedPages.map((rp) => (
                <li key={rp.slug}>
                  <Link
                    href={`/design-system/${rp.slug}`}
                    className="flex min-h-[48px] items-center justify-between gap-4 py-3 text-base font-medium text-[var(--a-ink)] hover:text-[var(--a-accent-text)] group"
                  >
                    <span>{rp.title}</span>
                    <span className="inline-flex items-center gap-2 font-mono text-[13px] text-[var(--a-muted)] group-hover:text-[var(--a-accent-text)] shrink-0">
                      <span>{rp.kind === 'essay' ? 'Essay' : 'Spec'}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav aria-label="Pagination" className="mt-16 grid gap-4 sm:grid-cols-2 border-t border-[var(--a-rule)] pt-8">
          {props.prev ? (
            <Link href={`/design-system/${props.prev.slug}`} className="group flex min-h-[72px] flex-col justify-center rounded-md border border-[var(--a-rule)] px-5 t-press t-color hover:border-[var(--a-ink)] active:scale-[0.99]">
              <span className="flex items-center gap-1 text-xs text-[var(--a-muted)]"><ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" aria-hidden />Previous</span>
              <span className="font-medium">{props.prev.title}</span>
            </Link>
          ) : <span />}
          {props.next && (
            <Link href={`/design-system/${props.next.slug}`} className="group flex min-h-[72px] flex-col justify-center items-end text-right rounded-md border border-[var(--a-rule)] px-5 t-press t-color hover:border-[var(--a-ink)] active:scale-[0.99]">
              <span className="flex items-center gap-1 text-xs text-[var(--a-muted)]">Next<ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
              <span className="font-medium">{props.next.title}</span>
            </Link>
          )}
        </nav>
      </article>
      <aside className="hidden xl:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-16">
        <OnThisPage deps={`${props.slug}-${tab}`} />
      </aside>
    </div>
  );
}
