'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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

  const isEssay = props.kind === 'essay';

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12">
      <article id="accent-article" className="min-w-0 py-10 sm:py-16">
        <header key={props.slug} className="max-w-[68ch]">
          <FadeUp immediate y={10}>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--a-accent-text)]">
              {props.sectionLabel}
            </p>
          </FadeUp>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl leading-[1.1] font-semibold tracking-tight">
            <RiseLines immediate lines={[props.title]} />
          </h1>
          <FadeUp immediate delay={0.08} y={14}>
            <p className="mt-4 text-lg sm:text-xl leading-8 text-[var(--a-muted)]">{props.summary}</p>
            <p className="mt-4 text-sm text-[var(--a-muted)]">
              {props.readingMinutes} min read
              {props.pipes && props.pipes.length > 0 && (
                <>
                  {' · Published in '}
                  {props.pipes.map((p, i) => (
                    <React.Fragment key={p}>
                      {i > 0 && ', '}
                      <Link href={`/${p}`} className="font-mono underline underline-offset-4">pipe\{p}</Link>
                    </React.Fragment>
                  ))}
                </>
              )}
            </p>
          </FadeUp>
        </header>

        {!isEssay && available.length > 1 && (
          <div role="tablist" aria-label="Page sections" className="sticky top-16 z-30 mt-10 -mx-4 sm:mx-0 px-4 sm:px-0 flex gap-1 overflow-x-auto border-b border-[var(--a-rule)] bg-[var(--a-bg)]/95 backdrop-blur">
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
              <h2 id="rules-heading" className="scroll-mt-28 font-serif text-2xl leading-10 font-semibold">Rules for AI models</h2>
              <p className="mt-2 text-base leading-7 text-[var(--a-muted)] max-w-[68ch]">
                The same decisions, written so a small local model can follow them one at a time. Also published in{' '}
                <Link href="/design-system/rules.json" className="font-mono underline underline-offset-4">rules.json</Link>.
              </p>
              <ol className="mt-6 space-y-6 max-w-[68ch]">
                {props.rules.map((r) => (
                  <li key={r.id} className="grid grid-cols-[auto_1fr] gap-x-4">
                    <span className="font-mono text-xs text-[var(--a-muted)] pt-1">{r.id}</span>
                    <span>
                      <span className="block text-base leading-7 font-medium">{r.statement}</span>
                      <span className="block text-sm leading-6 text-[var(--a-muted)]">Why: {r.why}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </FadeUp>
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
