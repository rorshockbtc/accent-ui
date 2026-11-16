'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Info, Monitor, Smartphone, X } from 'lucide-react';
import { EASE_EDITORIAL } from '@/lib/motion/tokens';
import { BangDraftSite } from '@/components/showcase/BangDraftSite';
import { StudioCraftedSite } from '@/components/showcase/StudioCraftedSite';
import {
  SHOWCASE_BUSINESSES,
  SHOWCASE_BY_ID,
  STUDIO_CALLOUTS,
  type ShowcaseBusiness,
} from '@/components/showcase/showcase-content';

type View = 'draft' | 'studio';
type Device = 'laptop' | 'phone';

function Pane({
  view,
  business,
  showCallouts,
}: {
  view: View;
  business: ShowcaseBusiness;
  showCallouts: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={ref} className="absolute inset-0 overflow-y-auto overscroll-contain" data-compare-pane={view}>
      {view === 'draft' ? (
        <BangDraftSite business={business} />
      ) : (
        <StudioCraftedSite business={business} containerRef={ref} showCallouts={showCallouts} />
      )}
    </div>
  );
}

export default function TemplatesComparePage() {
  const [view, setView] = useState<View>('draft');
  const [bizId, setBizId] = useState<ShowcaseBusiness['id']>('taco');
  const [device, setDevice] = useState<Device>('laptop');
  const [drawer, setDrawer] = useState(false);
  const [urlReady, setUrlReady] = useState(false);
  const reduce = useReducedMotion();
  const business = SHOWCASE_BY_ID[bizId];
  const activeCallouts = business.callouts ?? STUDIO_CALLOUTS;

  useEffect(() => {
    if (urlReady) return;
    const p = new URLSearchParams(window.location.search);
    const v = p.get('view');
    const biz = p.get('business') as ShowcaseBusiness['id'] | null;
    if (v === 'draft' || v === 'studio') setView(v);
    if (biz && biz in SHOWCASE_BY_ID) setBizId(biz);
    setUrlReady(true);
  }, [urlReady]);

  useEffect(() => {
    if (!urlReady) return;
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    url.searchParams.set('business', bizId);
    window.history.replaceState(null, '', url.toString());
  }, [view, bizId, urlReady]);

  const toggle = useCallback(() => setView((v) => (v === 'draft' ? 'studio' : 'draft')), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowLeft') setView('draft');
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowRight') setView('studio');
      if (e.key === 'Escape') setDrawer(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const segBtn = (v: View, label: string, sub: string) => {
    const on = view === v;
    return (
      <button
        type="button"
        role="tab"
        aria-selected={on}
        onClick={() => setView(v)}
        className="relative min-h-[44px] px-3 sm:px-4 rounded-full text-[13px] sm:text-[14px] font-semibold cursor-pointer"
        style={{ color: on ? 'var(--a-bg)' : 'var(--a-ink)' }}
      >
        {on && (
          <m.span
            layoutId="compare-seg"
            className="absolute inset-0 rounded-full bg-[var(--a-ink)]"
            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
          />
        )}
        <span className="relative flex flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-1.5">
          <span>{label}</span>
          <span className="hidden md:inline text-[13px] font-medium opacity-70">{sub}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-[var(--a-surface)]">
      {/* TOOLBAR */}
      <div className="z-40 border-b border-[var(--a-rule)] bg-[var(--a-bg)]">
        <div className="flex flex-wrap items-center gap-2 px-3 py-2 sm:px-4">
          <Link
            href="/design-system/templates#difference"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md px-2 text-[14px] font-medium text-[var(--a-muted)] hover:text-[var(--a-ink)]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Templates</span>
          </Link>

          <div role="tablist" aria-label="Choose version" className="mx-auto flex items-center rounded-full border border-[var(--a-rule)] bg-[var(--a-surface)] p-1">
            {segBtn('draft', 'BANG! Local Draft', '· free, on your computer')}
            {segBtn('studio', 'Studio Crafted', '· by :-]')}
          </div>

          <div className="flex items-center gap-1">
            <div className="hidden md:flex items-center rounded-md border border-[var(--a-rule)] p-0.5">
              {(['laptop', 'phone'] as Device[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDevice(d)}
                  aria-pressed={device === d}
                  aria-label={d === 'laptop' ? 'Laptop view' : 'Phone view'}
                  className={`grid h-10 w-10 place-items-center rounded cursor-pointer ${device === d ? 'bg-[var(--a-ink)] text-[var(--a-bg)]' : 'text-[var(--a-muted)]'}`}
                >
                  {d === 'laptop' ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setDrawer((o) => !o)}
              aria-expanded={drawer}
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[var(--a-rule)] px-3 text-[14px] font-semibold cursor-pointer hover:border-[var(--a-ink)]"
            >
              <Info className="h-4 w-4 text-[var(--a-accent)]" />
              <span className="hidden sm:inline">What changed?</span>
            </button>
            <a
              href="https://colonhyphenbracket.pink"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[var(--a-accent-fill,var(--a-accent))] px-4 text-[14px] font-semibold text-white"
            >
              Book a :-] Sprint <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Business switcher */}
        <div className="flex gap-1.5 overflow-x-auto border-t border-[var(--a-rule)] px-3 py-2 sm:px-4" aria-label="Example business">
          <span className="shrink-0 self-center pr-1 text-[13px] font-semibold uppercase tracking-wider text-[var(--a-muted)]">Example:</span>
          {SHOWCASE_BUSINESSES.map((b) => {
            const on = b.id === bizId;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBizId(b.id)}
                aria-pressed={on}
                className={`shrink-0 inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3 text-[13px] font-semibold cursor-pointer ${
                  on ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)]' : 'border-[var(--a-rule)] text-[var(--a-ink)] hover:border-[var(--a-ink)]'
                }`}
              >
                <span className="h-3 w-3 rounded-full border border-black/20" style={{ backgroundColor: b.brand.accent }} />
                {b.kind}
              </button>
            );
          })}
        </div>
      </div>

      {/* STAGE */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className={`relative h-full ${device === 'phone' ? 'mx-auto my-0 w-[390px] max-w-full border-x border-[var(--a-rule)] shadow-2xl' : 'w-full'}`}
        >
          <AnimatePresence initial={false}>
            <m.div
              key={`${view}-${bizId}`}
              className="absolute inset-0 bg-white"
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 100% 0 0)', zIndex: 2 }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0% 0 0)', zIndex: 2 }}
              exit={{ zIndex: 1, opacity: 1, transition: { duration: reduce ? 0 : 0.7 } }}
              transition={{ duration: reduce ? 0.15 : 0.7, ease: EASE_EDITORIAL }}
            >
              <Pane view={view} business={business} showCallouts={drawer && view === 'studio'} />
            </m.div>
          </AnimatePresence>
        </div>

        {/* WHAT CHANGED DRAWER */}
        <AnimatePresence>
          {drawer && (
            <m.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.32, ease: EASE_EDITORIAL }}
              className="absolute right-0 top-0 z-30 h-full w-full max-w-[380px] overflow-y-auto border-l border-[var(--a-rule)] bg-[var(--a-bg)] p-6 shadow-2xl"
              aria-label="What the studio build changes"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-wider text-[var(--a-accent-text,var(--a-accent))]">What changed?</p>
                  <h2 className="mt-1 font-serif text-[24px] font-semibold leading-tight">
                    Same business, same facts. Different result.
                  </h2>
                </div>
                <button type="button" onClick={() => setDrawer(false)} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--a-rule)] cursor-pointer">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-4 rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-3.5 space-y-1.5 text-[13px]">
                <div>
                  <span className="font-mono font-bold uppercase text-[var(--a-muted)]">BANG! Draft:</span>{' '}
                  <span className="text-[var(--a-ink)]">{business.draftPatternLabel}</span>
                </div>
                <div>
                  <span className="font-mono font-bold uppercase text-[var(--a-accent-text,var(--a-accent))]">Studio :-]:</span>{' '}
                  <span className="text-[var(--a-ink)]">{business.studioPatternLabel}</span>
                </div>
              </div>
              {view === 'draft' && (
                <button
                  type="button"
                  onClick={() => setView('studio')}
                  className="mt-4 w-full min-h-[44px] rounded-full bg-[var(--a-ink)] text-[14px] font-semibold text-[var(--a-bg)] cursor-pointer"
                >
                  Switch to Studio Crafted to see the numbered spots
                </button>
              )}
              <ol className="mt-6 divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
                {activeCallouts.map((c, i) => (
                  <m.li
                    key={c.n}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex gap-3 py-4"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FE299E] text-[14px] font-bold text-white">{c.n}</span>
                    <div>
                      <p className="text-[15px] font-semibold">{c.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-[var(--a-muted)]">{c.body}</p>
                    </div>
                  </m.li>
                ))}
              </ol>
              <div className="mt-6 space-y-3 text-[14px] leading-relaxed text-[var(--a-muted)]">
                <p>
                  <strong className="text-[var(--a-ink)]">BANG! Local Draft</strong> is free and runs on your own computer. It gets a clean, working site about 80% of the way there.
                </p>
                <p>
                  <strong className="text-[var(--a-ink)]">Studio Crafted</strong> adds art direction, written copy, photography direction, motion, and booking, built and launched with you by Colon Hyphen Bracket.
                </p>
              </div>
              <a
                href="https://colonhyphenbracket.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[var(--a-accent-fill,var(--a-accent))] text-[14px] font-semibold text-white"
              >
                Book a :-] Design Sprint <ExternalLink className="h-4 w-4" />
              </a>
            </m.aside>
          )}
        </AnimatePresence>

        {/* Keyboard hint */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-[13px] text-white md:block">
          Press <kbd className="font-mono">D</kbd> / <kbd className="font-mono">S</kbd> or ← → to switch
        </div>
      </div>

      <button type="button" onClick={toggle} className="sr-only">
        Switch version
      </button>
    </div>
  );
}
