'use client';

import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';

export interface StudioChapter {
  id: string;
  n: string;
  title: string;
  note: string;
}

/**
 * StudioPageNav — "On this page" rail for long studio pages (same scroll-spy idea as AccentDoc).
 * Desktop: sticky left rail with sliding active marker + progress.
 * Mobile: sticky horizontal chip bar under the header.
 */
export function StudioPageNav({ chapters, label = 'On this page' }: { chapters: StudioChapter[]; label?: string }) {
  const [active, setActive] = useState(chapters[0]?.id ?? '');

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: '-120px 0px -60% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [chapters]);

  useEffect(() => {
    const chip = document.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    chip?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const idx = Math.max(0, chapters.findIndex((c) => c.id === active));

  return (
    <>
      {/* Mobile / tablet chip bar */}
      <nav
        aria-label={label}
        className="lg:hidden sticky top-16 z-30 -mx-4 sm:-mx-6 border-b border-[var(--a-rule)] bg-[var(--a-bg)]/95 backdrop-blur"
      >
        <div className="flex gap-1.5 overflow-x-auto px-4 sm:px-6 py-2">
          {chapters.map((c) => {
            const on = c.id === active;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                data-chip={c.id}
                aria-current={on ? 'true' : undefined}
                className={`shrink-0 inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold ${
                  on
                    ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)]'
                    : 'border-[var(--a-rule)] text-[var(--a-ink)]'
                }`}
              >
                <span className="font-mono opacity-70">{c.n}</span>
                {c.title}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Desktop rail */}
      <nav aria-label={label} className="hidden lg:block sticky top-24 self-start">
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--a-muted)]">{label}</p>
        <div className="mt-3 flex items-center gap-2">
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--a-rule)]">
            <m.div
              className="h-full origin-left rounded-full bg-[var(--a-accent)]"
              animate={{ scaleX: (idx + 1) / chapters.length }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="font-mono text-[13px] tabular-nums text-[var(--a-muted)]">
            {idx + 1}/{chapters.length}
          </span>
        </div>
        <ol className="mt-5 space-y-0.5">
          {chapters.map((c) => {
            const on = c.id === active;
            return (
              <li key={c.id} className="relative">
                {on && (
                  <m.span
                    layoutId="studio-rail-active"
                    aria-hidden
                    className="absolute inset-0 rounded-lg bg-[var(--a-surface)] border border-[var(--a-rule)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                  />
                )}
                <a
                  href={`#${c.id}`}
                  aria-current={on ? 'true' : undefined}
                  className="relative flex gap-3 rounded-lg px-3 py-2.5"
                >
                  <span className={`font-mono text-[13px] font-bold pt-0.5 ${on ? 'text-[var(--a-accent-text,var(--a-accent))]' : 'text-[var(--a-muted)]'}`}>
                    {c.n}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[14px] leading-snug ${on ? 'font-semibold text-[var(--a-ink)]' : 'font-medium text-[var(--a-ink)]/80'}`}>
                      {c.title}
                    </span>
                    <span className="block text-[13px] leading-snug text-[var(--a-muted)]">{c.note}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
