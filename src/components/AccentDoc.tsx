'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
              className={`block py-1 leading-5 -ml-px border-l-2 ${it.level === 3 ? 'pl-6' : 'pl-3'} ${
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
        <header className="max-w-[68ch]">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--a-accent-text)]">{props.sectionLabel}</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl leading-[1.1] font-semibold tracking-tight">{props.title}</h1>
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
        </header>

        {!isEssay && available.length > 1 && (
          <div role="tablist" aria-label="Page sections" className="sticky top-16 z-30 mt-10 -mx-4 sm:mx-0 px-4 sm:px-0 flex gap-1 overflow-x-auto border-b border-[var(--a-rule)] bg-[var(--a-bg)]">
            {available.map((t, i) => (
              <button
                key={t}
                id={`tab-${t}`}
                role="tab"
                type="button"
                aria-selected={tab === t}
                aria-controls={`panel-${t}`}
                tabIndex={tab === t ? 0 : -1}
                onKeyDown={(e) => onTabKey(e, i)}
                onClick={() => selectTab(t)}
                className={`min-h-[48px] px-4 text-sm whitespace-nowrap border-b-2 -mb-px ${
                  tab === t ? 'border-[var(--a-accent)] font-semibold' : 'border-transparent text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                }`}
              >
                {TAB_LABELS[t]}
              </button>
            ))}
          </div>
        )}

        <div id={`panel-${tab}`} role={isEssay ? undefined : 'tabpanel'} aria-labelledby={isEssay ? undefined : `tab-${tab}`} className="mt-4">
          <AccentProse key={`${props.slug}-${tab}`} markdown={props.tabs[tab] ?? ''} />
        </div>

        {props.rules.length > 0 && (
          <section aria-labelledby="rules-heading" className="mt-16 border-t border-[var(--a-rule)] pt-10">
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
          </section>
        )}

        <nav aria-label="Pagination" className="mt-16 grid gap-4 sm:grid-cols-2 border-t border-[var(--a-rule)] pt-8">
          {props.prev ? (
            <Link href={`/design-system/${props.prev.slug}`} className="group flex min-h-[72px] flex-col justify-center rounded-md border border-[var(--a-rule)] px-5 hover:border-[var(--a-ink)]">
              <span className="flex items-center gap-1 text-xs text-[var(--a-muted)]"><ArrowLeft className="h-3 w-3" aria-hidden />Previous</span>
              <span className="font-medium">{props.prev.title}</span>
            </Link>
          ) : <span />}
          {props.next && (
            <Link href={`/design-system/${props.next.slug}`} className="group flex min-h-[72px] flex-col justify-center items-end text-right rounded-md border border-[var(--a-rule)] px-5 hover:border-[var(--a-ink)]">
              <span className="flex items-center gap-1 text-xs text-[var(--a-muted)]">Next<ArrowRight className="h-3 w-3" aria-hidden /></span>
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
