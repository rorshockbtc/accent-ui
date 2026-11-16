'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calculator,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Layers,
  MapPin,
  Minus,
  Pause,
  Phone,
  Play,
  Plus,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { EASE_ACCENT, EASE_EDITORIAL, SPRING_LAYOUT } from '@/lib/motion/tokens';
import {
  BANK_OFFICERS,
  PORTFOLIO_CASE_STUDIES,
  SALON_GROWOUT_TAGS,
  STUDIO_EDITORIAL_BY_ID,
  TACO_ITEM_BADGES,
  TACO_SALSA_SHU,
  type StudioArticle,
} from './showcase-articles';
import {
  BankBriefingsPage,
  BankFdicSafetyPage,
  BankHomeBriefingsLedger,
  OfficeDeadlinesPage,
  OfficeHomeMemosSection,
  OfficeMemosPage,
  PortfolioColophonPage,
  PortfolioHomeWritingSection,
  PortfolioReaderPage,
  SalonHomeJournalIndex,
  SalonJournalPage,
  SalonStylistsPage,
  TacoDispatchesPage,
  TacoGroupBoxesPage,
  TacoHomeEditorialStrip,
} from './StudioEditorialViews';
import type { ShowcaseBusiness } from './showcase-content';

export interface StudioVariantProps {
  business: ShowcaseBusiness;
  containerRef?: React.RefObject<HTMLElement | null>;
  preview?: boolean;
  showCallouts?: boolean;
}

type StudioPageKey = 'home' | 'articles' | 'secondary';

function scrollToTarget(
  containerRef: React.RefObject<HTMLElement | null> | undefined,
  shouldReduceMotion: boolean | null,
  elementId?: string
) {
  const behavior: ScrollBehavior = shouldReduceMotion ? 'auto' : 'smooth';
  const scrollParent = containerRef?.current;
  if (!elementId) {
    if (scrollParent) scrollParent.scrollTo({ top: 0, behavior });
    else if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior });
    return;
  }
  window.setTimeout(() => {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (scrollParent) {
      const parentRect = scrollParent.getBoundingClientRect();
      const targetRect = el.getBoundingClientRect();
      const nextTop = scrollParent.scrollTop + (targetRect.top - parentRect.top) - 72;
      scrollParent.scrollTo({ top: Math.max(0, nextTop), behavior });
    } else {
      el.scrollIntoView({ behavior, block: 'start' });
    }
  }, 60);
}

function CalloutBadge({ n, show, corner = 'left' }: { n: number; show: boolean; corner?: 'left' | 'right' }) {
  if (!show) return null;
  return (
    <m.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, delay: n * 0.06 }}
      className={`absolute ${corner === 'right' ? 'right-4 -top-3' : 'left-4 top-4'} z-20 grid h-9 w-9 place-items-center rounded-full bg-[#FE299E] text-white text-[14px] font-bold shadow-lg ring-4 ring-white/80`}
      aria-label={`Change ${n}`}
    >
      {n}
    </m.span>
  );
}

function parsePrice(price: string): number {
  const match = price.replace(/,/g, '').match(/[\d.]+/);
  return match ? Number.parseFloat(match[0]) : 0;
}

/* ============================================================================
 * 1 · TACO STUDIO: Interactive Walk-Up Pickup Order App (Austin)
 * Palette: warm masa #FBF6EE, mesquite #1F1712, salsa-roja #C2410C
 * Motion: snappy SPRING_LAYOUT tabs, snap kitchen strip, pauseable ticker
 * ========================================================================== */
function TacoStudioSite({
  business: b,
  containerRef,
  preview = false,
  showCallouts = false,
}: StudioVariantProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activePage, setActivePage] = useState<StudioPageKey>('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(
    STUDIO_EDITORIAL_BY_ID.taco.articles[0].id
  );
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [salsa, setSalsa] = useState<'Verde (Mild)' | 'Roja (Medium)' | 'Habanero (Hot)'>('Verde (Mild)');
  const [bag, setBag] = useState<Record<string, { name: string; price: number; qty: number }>>({
    'Bacon, egg & cheese': { name: 'Bacon, egg & cheese', price: 4.25, qty: 2 },
    'Cold brew': { name: 'Cold brew', price: 4.0, qty: 1 },
  });
  const [pickupSlot, setPickupSlot] = useState(b.booking.options[0] ?? '8:00 am');
  const [orderedTicket, setOrderedTicket] = useState<string | null>(null);
  const [tickerPaused, setTickerPaused] = useState(false);

  const navigateTaco = (page: StudioPageKey) => {
    setActivePage(page);
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const openTacoArticle = (id: string) => {
    setActiveArticleId(id);
    setActivePage('articles');
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const addItem = (name: string, priceStr: string) => {
    const price = parsePrice(priceStr);
    setOrderedTicket(null);
    setBag((prev) => {
      const existing = prev[name];
      return {
        ...prev,
        [name]: { name, price, qty: existing ? existing.qty + 1 : 1 },
      };
    });
  };

  const handleTacoAction = (action: StudioArticle['ctaAction']) => {
    if (action === 'add-brisket') {
      addItem('Smoked brisket', '$5.50');
    } else if (action === 'salsa-habanero') {
      setSalsa('Habanero (Hot)');
    }
    setActivePage('home');
    scrollToTarget(containerRef, shouldReduceMotion, 'taco-order-app');
  };

  const adjustQty = (name: string, delta: number) => {
    setOrderedTicket(null);
    setBag((prev) => {
      const existing = prev[name];
      if (!existing) return prev;
      const nextQty = existing.qty + delta;
      if (nextQty <= 0) {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      }
      return { ...prev, [name]: { ...existing, qty: nextQty } };
    });
  };

  const bagItems = Object.values(bag);
  const bagCount = bagItems.reduce((sum, it) => sum + it.qty, 0);
  const subtotal = bagItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  const tax = subtotal * 0.0825;
  const total = subtotal + tax;
  const activeCat = b.menu.categories[activeCatIdx] ?? b.menu.categories[0];

  const container = 'mx-auto w-full max-w-[1200px] px-5 @3xl:px-10';

  return (
    <div
      className="@container min-h-full bg-[#FFF8EF] text-[#1F1712]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="studio"
      data-studio-archetype="taco"
    >
      <header className="sticky top-0 z-30 border-b border-[#1F1712]/12 bg-[#FFF8EF]">
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <button
            type="button"
            onClick={() => navigateTaco('home')}
            className="text-left text-[22px] font-bold tracking-tight cursor-pointer min-h-[44px] inline-flex items-center"
            style={{ fontFamily: b.brand.display }}
          >
            {b.name}
          </button>
          <nav aria-label="Eastside Taco Co. pages" className="hidden @3xl:flex items-center gap-6 text-[15px]">
            {[
              { id: 'home', label: 'Counter & Menu', testId: 'studio-nav-home' },
              { id: 'articles', label: 'Kitchen Stories (3)', testId: 'studio-nav-articles' },
              { id: 'secondary', label: 'Group Taco Boxes', testId: 'studio-nav-secondary' },
            ].map((item) => {
              const on = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={item.testId}
                  aria-current={on ? 'page' : undefined}
                  onClick={() => navigateTaco(item.id as StudioPageKey)}
                  className={`min-h-[44px] inline-flex items-center border-b-2 cursor-pointer transition-colors ${
                    on
                      ? 'border-[#C2410C] font-bold text-[#1F1712]'
                      : 'border-transparent text-[#5E4E43] hover:text-[#1F1712]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              scrollToTarget(containerRef, shouldReduceMotion, 'taco-order-app');
            }}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#C2410C] px-5 text-[14px] font-semibold text-white cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Bag ({bagCount})</span>
          </button>
        </div>
      </header>

      {!preview && (
        <nav
          aria-label="Eastside Taco Co. mobile pages"
          className="@3xl:hidden flex gap-2 overflow-x-auto border-b border-[#1F1712]/12 bg-[#FBEBD7] px-5 py-2"
        >
          {[
            { id: 'home', label: 'Menu & Bag' },
            { id: 'articles', label: 'Kitchen Stories (3)' },
            { id: 'secondary', label: 'Group Boxes' },
          ].map((item) => {
            const on = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => navigateTaco(item.id as StudioPageKey)}
                className={`shrink-0 min-h-[44px] rounded-full border px-4 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#1F1712] bg-[#1F1712] text-[#FFF8EF]'
                    : 'border-[#1F1712]/18 bg-white text-[#1F1712]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}

      {activePage === 'articles' ? (
        <TacoDispatchesPage
          business={b}
          articles={STUDIO_EDITORIAL_BY_ID.taco.articles}
          activeArticleId={activeArticleId}
          onSelectArticle={(id) => {
            setActiveArticleId(id);
            scrollToTarget(containerRef, shouldReduceMotion);
          }}
          onBackHome={() => navigateTaco('home')}
          onAction={handleTacoAction}
          preview={preview}
        />
      ) : activePage === 'secondary' ? (
        <TacoGroupBoxesPage business={b} onBackHome={() => navigateTaco('home')} />
      ) : (
        <>

      {/* 1 · SPLIT POSTER HERO */}
      <section className="relative border-b border-[#1F1712]/12">
        <CalloutBadge n={1} show={showCallouts} />
        <div className={`${container} py-12 @3xl:py-16 grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-center`}>
          <div className="@3xl:col-span-6 space-y-6">
            <div className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1F1712]/15 bg-[#FBEBD7] px-4 text-[13px] font-semibold text-[#9A3412]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#15803D]" aria-hidden />
              <span>Counter open · Ready in ~10 min</span>
            </div>

            <h1
              className="text-[42px] @3xl:text-[58px] font-extrabold leading-[0.98] tracking-tight"
              style={{ fontFamily: b.brand.display }}
            >
              {b.headline.map((line, i) => (
                <m.span
                  key={line}
                  className="block"
                  initial={preview || shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.09, ease: EASE_ACCENT }}
                >
                  {line}
                </m.span>
              ))}
            </h1>

            <p className="text-[17px] leading-relaxed text-[#5E4E43] max-w-[46ch]">{b.intro}</p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#taco-order-app"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#C2410C] px-7 text-[15px] font-semibold text-white hover:bg-[#9A3412] transition-colors"
              >
                Start Pickup Order <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#taco-kitchen"
                className="inline-flex min-h-[48px] items-center rounded-full border border-[#1F1712]/25 px-6 text-[15px] font-semibold text-[#1F1712] hover:border-[#1F1712]"
              >
                See Our Kitchen
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-[#1F1712]/12 pt-5">
              {b.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[26px] font-bold leading-none tabular-nums" style={{ fontFamily: b.brand.display }}>
                    {s.value}
                  </div>
                  <div className="mt-1 text-[13px] text-[#5E4E43]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="@3xl:col-span-6 space-y-3">
            <div className="overflow-hidden rounded-3xl border border-[#1F1712]/14 bg-[#FBEBD7]">
              <img
                src={b.images.hero.src}
                alt={b.images.hero.alt}
                data-bang-image-slot="hero"
                className="w-full aspect-[4/3] @3xl:aspect-[5/4] object-cover"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#5E4E43] px-1">
              <span className="font-semibold text-[#1F1712]">{b.address}</span>
              <span>Free counter salsa bar included</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · INTERACTIVE PICKUP ORDER APP */}
      <section id="taco-order-app" className="relative py-16">
        <CalloutBadge n={2} show={showCallouts} />
        <div className={`${container} space-y-8`}>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1F1712]/14 pb-6">
            <div>
              <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
                Live Walk-Up Ordering
              </p>
              <h2 className="mt-1 text-[34px] font-bold tracking-tight" style={{ fontFamily: b.brand.display }}>
                Build your morning pickup bag.
              </h2>
            </div>

            {/* Salsa heat selector */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Included salsa choice">
              <span className="text-[13px] font-semibold text-[#5E4E43]">Free salsa:</span>
              {(['Verde (Mild)', 'Roja (Medium)', 'Habanero (Hot)'] as const).map((opt) => {
                const active = salsa === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSalsa(opt)}
                    aria-pressed={active}
                    className={`min-h-[44px] rounded-full border px-4 text-[13px] font-semibold cursor-pointer transition-colors ${
                      active
                        ? 'border-[#1F1712] bg-[#1F1712] text-[#FFF8EF]'
                        : 'border-[#1F1712]/20 bg-white text-[#1F1712] hover:border-[#1F1712]'
                    }`}
                  >
                    {opt} · {TACO_SALSA_SHU[opt]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-start">
            {/* Menu column */}
            <div className="@3xl:col-span-7 space-y-6">
              <div className="flex flex-wrap gap-2">
                {b.menu.categories.map((cat, idx) => {
                  const on = idx === activeCatIdx;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => setActiveCatIdx(idx)}
                      className="relative min-h-[44px] rounded-full border border-[#1F1712]/15 px-5 text-[14px] font-semibold cursor-pointer"
                      style={{ color: on ? '#FFFFFF' : '#1F1712' }}
                    >
                      {on && (
                        <m.span
                          layoutId={preview ? undefined : 'taco-cat-pill'}
                          className="absolute inset-0 rounded-full bg-[#C2410C]"
                          transition={SPRING_LAYOUT}
                        />
                      )}
                      <span className="relative">{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="divide-y divide-[#1F1712]/12 rounded-2xl border border-[#1F1712]/14 bg-white px-5">
                {activeCat.items.map((item, idx) => {
                  const inBag = bag[item.name]?.qty ?? 0;
                  return (
                    <div key={item.name} className="py-5 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-baseline gap-2.5">
                          <span className="text-[18px] font-bold" style={{ fontFamily: b.brand.display }}>
                            {item.name}
                          </span>
                          <span className="font-mono text-[15px] font-bold text-[#9A3412] tabular-nums">
                            {item.price}
                          </span>
                          {inBag > 0 && (
                            <span className="rounded-full bg-[#FBEBD7] px-2.5 py-0.5 text-[13px] font-semibold text-[#9A3412]">
                              {inBag} in bag
                            </span>
                          )}
                        </div>
                        <p className="text-[14px] text-[#5E4E43]">{item.detail}</p>
                        {TACO_ITEM_BADGES[item.name] && (
                          <div className="font-mono text-[13px] text-[#9A3412]">{TACO_ITEM_BADGES[item.name]}</div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => addItem(item.name, item.price)}
                        data-testid={activeCatIdx === 0 && idx === 0 ? 'taco-add-item' : undefined}
                        className="min-h-[44px] shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#1F1712] px-4 text-[14px] font-semibold text-[#FFF8EF] hover:bg-[#C2410C] cursor-pointer transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Pickup Bag */}
            <aside className="relative @3xl:col-span-5 rounded-3xl border border-[#1F1712]/16 bg-[#FBEBD7] p-6 space-y-5">
              <CalloutBadge n={4} show={showCallouts} corner="right" />
              <div className="flex items-center justify-between border-b border-[#1F1712]/14 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#C2410C]" />
                  <h3 className="text-[20px] font-bold" style={{ fontFamily: b.brand.display }}>
                    Your Pickup Bag
                  </h3>
                </div>
                <span className="font-mono text-[13px] font-bold text-[#9A3412]" data-testid="taco-bag-count">
                  {bagCount} items
                </span>
              </div>

              {bagItems.length === 0 ? (
                <p className="py-4 text-[14px] text-[#5E4E43]">
                  Tap + Add on any menu item to start a counter pickup order.
                </p>
              ) : (
                <ul className="divide-y divide-[#1F1712]/12">
                  {bagItems.map((it) => (
                    <li key={it.name} className="py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-[15px] font-semibold truncate">{it.name}</div>
                        <div className="font-mono text-[13px] text-[#5E4E43] tabular-nums">
                          ${(it.price * it.qty).toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => adjustQty(it.name, -1)}
                          aria-label={`Remove one ${it.name}`}
                          className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full border border-[#1F1712]/20 bg-white cursor-pointer hover:border-[#1F1712]"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-mono text-[14px] font-bold tabular-nums">{it.qty}</span>
                        <button
                          type="button"
                          onClick={() => adjustQty(it.name, 1)}
                          aria-label={`Add one ${it.name}`}
                          className="grid min-h-[44px] min-w-[44px] place-items-center rounded-full border border-[#1F1712]/20 bg-white cursor-pointer hover:border-[#1F1712]"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="space-y-2 border-t border-[#1F1712]/14 pt-4">
                <div className="text-[13px] font-semibold text-[#5E4E43]">Included salsa: {salsa}</div>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {b.booking.options.slice(0, 3).map((tOpt) => {
                    const selected = pickupSlot === tOpt;
                    return (
                      <button
                        key={tOpt}
                        type="button"
                        onClick={() => setPickupSlot(tOpt)}
                        className={`min-h-[44px] rounded-full border px-2 text-[13px] font-semibold cursor-pointer ${
                          selected
                            ? 'border-[#1F1712] bg-[#1F1712] text-[#FFF8EF]'
                            : 'border-[#1F1712]/20 bg-white text-[#1F1712]'
                        }`}
                      >
                        {tOpt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <output
                className="block rounded-2xl bg-white p-4 space-y-1.5 text-[14px] border border-[#1F1712]/10"
                data-testid="taco-bag-output"
              >
                <div className="flex justify-between text-[#5E4E43]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#5E4E43]">
                  <span>Austin tax (8.25%)</span>
                  <span className="font-mono tabular-nums">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-[#1F1712]/12 pt-2 text-[16px] font-bold">
                  <span>Pay at counter ({pickupSlot})</span>
                  <span className="font-mono tabular-nums text-[#9A3412]">${total.toFixed(2)}</span>
                </div>
              </output>

              {orderedTicket ? (
                <div className="rounded-2xl bg-[#1F1712] p-4 text-[#FFF8EF] text-[14px] flex items-center gap-2.5">
                  <Check className="h-5 w-5 text-[#B8F25C] shrink-0" />
                  <span>
                    Ticket <strong>{orderedTicket}</strong> queued for {pickupSlot} ({salsa}).
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={bagItems.length === 0}
                  onClick={() => setOrderedTicket('#ET-204')}
                  className="w-full min-h-[48px] rounded-full bg-[#C2410C] text-[15px] font-semibold text-white hover:bg-[#9A3412] disabled:opacity-40 cursor-pointer transition-colors"
                >
                  Hold Order for {pickupSlot}
                </button>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* 3 · HORIZONTAL SCROLL-SNAP KITCHEN STRIP */}
      <section id="taco-kitchen" className="relative border-y border-[#1F1712]/12 bg-[#FBEBD7] py-16">
        <CalloutBadge n={3} show={showCallouts} />
        <div className={`${container} space-y-6`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
                {b.story.eyebrow}
              </p>
              <h2 className="mt-1 text-[32px] font-bold" style={{ fontFamily: b.brand.display }}>
                {b.story.heading}
              </h2>
            </div>
            <span className="text-[13px] font-medium text-[#5E4E43]">Swipe or scroll horizontally</span>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-label="Eastside kitchen craft steps"
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
          >
            {b.story.steps.map((step, i) => (
              <article
                key={step.title}
                className="w-[300px] @3xl:w-[360px] shrink-0 snap-start rounded-2xl border border-[#1F1712]/12 bg-white overflow-hidden"
              >
                <img src={step.image.src} alt={step.image.alt} className="w-full aspect-[4/3] object-cover" />
                <div className="p-5 space-y-2">
                  <span className="font-mono text-[13px] font-bold text-[#9A3412]">0{i + 1}</span>
                  <h3 className="text-[20px] font-bold leading-snug" style={{ fontFamily: b.brand.display }}>
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#5E4E43] leading-relaxed">{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · PAUSEABLE MARQUEE + FOOTER */}
      <section id="taco-reviews" className="relative py-12 overflow-hidden">
        <CalloutBadge n={5} show={showCallouts} />
        <div className={`${container} mb-5 flex items-center justify-between gap-4`}>
          <span className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
            What Austin regulars say
          </span>
          <button
            type="button"
            onClick={() => setTickerPaused((p) => !p)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1F1712]/20 bg-white px-4 text-[13px] font-semibold cursor-pointer"
          >
            {tickerPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            <span>{tickerPaused ? 'Play reviews' : 'Pause reviews'}</span>
          </button>
        </div>

        <m.div
          className="flex gap-8 whitespace-nowrap px-5"
          animate={preview || tickerPaused || shouldReduceMotion ? { x: 0 } : { x: ['0%', '-50%'] }}
          transition={
            preview || tickerPaused || shouldReduceMotion
              ? { duration: 0.2 }
              : { repeat: Infinity, duration: 36, ease: 'linear' }
          }
        >
          {[...b.quotes, ...b.quotes].map((q, i) => (
            <div key={i} className="inline-flex items-baseline gap-3 text-[16px]">
              <span className="font-medium">&ldquo;{q.text}&rdquo;</span>
              <span className="text-[14px] text-[#5E4E43]">— {q.who}</span>
            </div>
          ))}
        </m.div>
      </section>

      <TacoHomeEditorialStrip
        business={b}
        onOpenArticle={openTacoArticle}
        onOpenPage={(p) => navigateTaco(p)}
      />
        </>
      )}

      <footer className="border-t border-[#1F1712]/12 bg-[#1F1712] text-[#FFF8EF] py-10">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 text-[14px]`}>
          <div>
            <span className="font-bold text-[18px]" style={{ fontFamily: b.brand.display }}>{b.name}</span>
            <span className="ml-3 opacity-80">{b.address} · {b.phone}</span>
          </div>
          <span className="opacity-75">Concept preview for Colon Hyphen Bracket</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 2 · BANK STUDIO: Interactive CD Yield & Equipment Loan Calculator + Concierge
 * Palette: clean limestone white #FFFFFF, slate #EEF3FA, deep navy #0B1F3A, cobalt #1D4ED8
 * Motion: calm 200ms opacity fades only (zero parallax, zero marquee)
 * ========================================================================== */
function BankStudioSite({
  business: b,
  containerRef,
  preview = false,
  showCallouts = false,
}: StudioVariantProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activePage, setActivePage] = useState<StudioPageKey>('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(
    STUDIO_EDITORIAL_BY_ID.bank.articles[0].id
  );
  const [calcMode, setCalcMode] = useState<'cd' | 'loan'>('cd');
  const [amount, setAmount] = useState(25000);
  const [cdMonths, setCdMonths] = useState<6 | 12 | 24>(12);
  const [loanYears, setLoanYears] = useState<3 | 5 | 7>(5);
  const [topic, setTopic] = useState('Business Checking / SBA Loan');
  const [slot, setSlot] = useState(b.booking.options[0] ?? 'Mon 10:00 am');
  const [booked, setBooked] = useState(false);

  const navigateBank = (page: StudioPageKey) => {
    setActivePage(page);
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const openBankArticle = (id: string) => {
    setActiveArticleId(id);
    setActivePage('articles');
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const handleBankAction = (action: StudioArticle['ctaAction']) => {
    if (action === 'cd-75k') {
      setCalcMode('cd');
      setAmount(75000);
      setCdMonths(12);
      setActivePage('home');
      scrollToTarget(containerRef, shouldReduceMotion, 'bank-calc');
      return;
    }
    if (action === 'loan-committee') {
      setCalcMode('loan');
      setAmount(50000);
      setLoanYears(5);
      setActivePage('home');
      scrollToTarget(containerRef, shouldReduceMotion, 'bank-calc');
      return;
    }
    setTopic('Wire Fraud Prevention & Positive Pay');
    setActivePage('home');
    scrollToTarget(containerRef, shouldReduceMotion, 'bank-concierge');
  };

  const cdRates: Record<6 | 12 | 24, number> = { 6: 0.039, 12: 0.0415, 24: 0.0405 };
  const apy = cdRates[cdMonths];
  const hillInterest = Math.round(amount * apy * (cdMonths / 12));
  const bigBankInterest = Math.round(amount * 0.0045 * (cdMonths / 12));
  const apr = 0.072;
  const r = apr / 12;
  const n = loanYears * 12;
  const monthlyPayment = Math.round((amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));

  const container = 'mx-auto w-full max-w-[1200px] px-5 @3xl:px-10';

  return (
    <div
      className="@container min-h-full bg-white text-[#0B1F3A]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="studio"
      data-studio-archetype="bank"
    >
      {/* Utility FDIC bar */}
      <div className="bg-[#0B1F3A] text-white px-5 py-2.5 text-[13px]">
        <div className="mx-auto max-w-[1200px] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="h-4 w-4 text-[#93C5FD]" />
            <span>Member FDIC · Equal Housing Lender · ABA Routing #1149-0284-1</span>
          </div>
          <span className="font-mono text-[13px] opacity-90">Fredericksburg &amp; Kerrville · {b.phone}</span>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-[#0B1F3A]/12 bg-white">
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <button
            type="button"
            onClick={() => navigateBank('home')}
            className="text-left text-[21px] font-semibold tracking-tight cursor-pointer min-h-[44px] inline-flex items-center"
            style={{ fontFamily: b.brand.display }}
          >
            {b.name}
          </button>
          <nav aria-label="Hill Country Bank pages" className="hidden @3xl:flex items-center gap-6 text-[15px]">
            {[
              { id: 'home', label: 'Rates & Calculator', testId: 'studio-nav-home' },
              { id: 'articles', label: 'Treasury Briefings (3)', testId: 'studio-nav-articles' },
              { id: 'secondary', label: 'FDIC & Wire Safety', testId: 'studio-nav-secondary' },
            ].map((item) => {
              const on = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={item.testId}
                  aria-current={on ? 'page' : undefined}
                  onClick={() => navigateBank(item.id as StudioPageKey)}
                  className={`min-h-[44px] inline-flex items-center border-b-2 cursor-pointer transition-colors ${
                    on
                      ? 'border-[#1D4ED8] font-semibold text-[#0B1F3A]'
                      : 'border-transparent text-[#44546A] hover:text-[#0B1F3A]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              scrollToTarget(containerRef, shouldReduceMotion, 'bank-concierge');
            }}
            className="inline-flex min-h-[44px] items-center rounded-[6px] bg-[#1D4ED8] px-5 text-[14px] font-semibold text-white cursor-pointer"
          >
            Talk to a Banker
          </button>
        </div>
      </header>

      {!preview && (
        <nav
          aria-label="Hill Country Bank mobile pages"
          className="@3xl:hidden flex gap-2 overflow-x-auto border-b border-[#0B1F3A]/12 bg-[#EEF3FA] px-5 py-2"
        >
          {[
            { id: 'home', label: 'Rates & Calc' },
            { id: 'articles', label: 'Briefings (3)' },
            { id: 'secondary', label: 'FDIC & Wire Safety' },
          ].map((item) => {
            const on = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => navigateBank(item.id as StudioPageKey)}
                className={`shrink-0 min-h-[44px] rounded-[6px] border px-3.5 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                    : 'border-[#0B1F3A]/18 bg-white text-[#0B1F3A]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}

      {activePage === 'articles' ? (
        <BankBriefingsPage
          business={b}
          articles={STUDIO_EDITORIAL_BY_ID.bank.articles}
          activeArticleId={activeArticleId}
          onSelectArticle={(id) => {
            setActiveArticleId(id);
            scrollToTarget(containerRef, shouldReduceMotion);
          }}
          onBackHome={() => navigateBank('home')}
          onAction={handleBankAction}
          preview={preview}
        />
      ) : activePage === 'secondary' ? (
        <BankFdicSafetyPage business={b} onBackHome={() => navigateBank('home')} />
      ) : (
        <>

      {/* 1 · CALM INSTITUTIONAL SPLIT MASTHEAD */}
      <section className="relative border-b border-[#0B1F3A]/12 bg-[#F8FAFD]">
        <CalloutBadge n={1} show={showCallouts} />
        <div className={`${container} py-12 @3xl:py-16 grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-center`}>
          <div className="@3xl:col-span-6 space-y-5">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
              {b.city} · {b.status}
            </p>
            <h1
              className="text-[38px] @3xl:text-[50px] font-semibold leading-[1.06]"
              style={{ fontFamily: b.brand.display }}
            >
              {b.headline.join(' ')}
            </h1>
            <p className="text-[17px] leading-relaxed text-[#44546A] max-w-[50ch]">{b.intro}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#bank-calc"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-[6px] bg-[#1D4ED8] px-6 text-[15px] font-semibold text-white"
              >
                <Calculator className="h-4 w-4" />
                Run Your Numbers
              </a>
              <a
                href="#bank-rates"
                className="inline-flex min-h-[48px] items-center rounded-[6px] border border-[#0B1F3A]/20 bg-white px-6 text-[15px] font-semibold text-[#0B1F3A]"
              >
                View Monday Rates
              </a>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t border-[#0B1F3A]/12 pt-5">
              {b.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[28px] font-semibold tabular-nums" style={{ fontFamily: b.brand.display }}>
                    {s.value}
                  </div>
                  <div className="text-[13px] text-[#44546A]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="@3xl:col-span-6">
            <img
              src={b.images.hero.src}
              alt={b.images.hero.alt}
              data-bang-image-slot="hero"
              className="w-full aspect-[16/11] object-cover rounded-lg border border-[#0B1F3A]/14"
            />
          </div>
        </div>
      </section>

      {/* 2 · INTERACTIVE CD YIELD & EQUIPMENT LOAN CALCULATOR */}
      <section id="bank-calc" className="relative py-16 border-b border-[#0B1F3A]/12">
        <CalloutBadge n={2} show={showCallouts} />
        <div className={`${container} space-y-8`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                Transparent Local Numbers
              </p>
              <h2 className="mt-1 text-[32px] font-semibold" style={{ fontFamily: b.brand.display }}>
                Estimate a 12-Month CD or Equipment Loan.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCalcMode('cd')}
                className={`min-h-[44px] rounded-[6px] border px-4 text-[14px] font-semibold cursor-pointer ${
                  calcMode === 'cd'
                    ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                    : 'border-[#0B1F3A]/20 bg-white text-[#0B1F3A]'
                }`}
              >
                Grow Savings (CD · 4.15% APY)
              </button>
              <button
                type="button"
                data-testid="bank-mode-loan"
                onClick={() => setCalcMode('loan')}
                className={`min-h-[44px] rounded-[6px] border px-4 text-[14px] font-semibold cursor-pointer ${
                  calcMode === 'loan'
                    ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                    : 'border-[#0B1F3A]/20 bg-white text-[#0B1F3A]'
                }`}
              >
                Estimate Equipment Loan (7.2% APR)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-center rounded-xl border border-[#0B1F3A]/15 bg-[#EEF3FA] p-6 @3xl:p-8">
            <div className="@3xl:col-span-7 space-y-6">
              <label className="block space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-[15px] font-semibold">
                    {calcMode === 'cd' ? 'Opening CD Deposit' : 'Equipment / Ranch Loan Principal'}
                  </span>
                  <span className="font-mono text-[22px] font-bold text-[#1D4ED8] tabular-nums">
                    ${amount.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={250000}
                  step={5000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full min-h-[44px] accent-[#1D4ED8] cursor-pointer"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {[10000, 25000, 50000, 100000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`min-h-[44px] rounded-[6px] border px-4 font-mono text-[13px] font-semibold cursor-pointer ${
                      amount === preset
                        ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white'
                        : 'border-[#0B1F3A]/20 bg-white text-[#0B1F3A]'
                    }`}
                  >
                    ${(preset / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <span className="text-[14px] font-semibold block">
                  {calcMode === 'cd' ? 'CD Maturity Term' : 'Fixed Repayment Term'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {calcMode === 'cd'
                    ? ([6, 12, 24] as const).map((mo) => (
                        <button
                          key={mo}
                          type="button"
                          onClick={() => setCdMonths(mo)}
                          className={`min-h-[44px] rounded-[6px] border px-4 text-[14px] font-semibold cursor-pointer ${
                            cdMonths === mo
                              ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                              : 'border-[#0B1F3A]/20 bg-white text-[#0B1F3A]'
                          }`}
                        >
                          {mo} Months ({(cdRates[mo] * 100).toFixed(2)}% APY)
                        </button>
                      ))
                    : ([3, 5, 7] as const).map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setLoanYears(yr)}
                          className={`min-h-[44px] rounded-[6px] border px-4 text-[14px] font-semibold cursor-pointer ${
                            loanYears === yr
                              ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                              : 'border-[#0B1F3A]/20 bg-white text-[#0B1F3A]'
                          }`}
                        >
                          {yr} Years ({yr * 12} mo)
                        </button>
                      ))}
                </div>
              </div>
            </div>

            <div className="@3xl:col-span-5">
              <m.output
                key={`${calcMode}-${amount}-${cdMonths}-${loanYears}`}
                initial={preview || shouldReduceMotion ? false : { opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, ease: EASE_ACCENT }}
                data-testid="bank-calc-output"
                className="block rounded-xl border border-[#0B1F3A]/15 bg-white p-6 space-y-4 shadow-xs"
              >
                {calcMode === 'cd' ? (
                  <>
                    <div className="text-[13px] font-mono uppercase tracking-wider text-[#1D4ED8] font-semibold">
                      Hill Country {cdMonths}-Mo CD Estimate
                    </div>
                    <div className="text-[40px] font-semibold leading-none tabular-nums" style={{ fontFamily: b.brand.display }}>
                      +${hillInterest.toLocaleString()}
                    </div>
                    <p className="text-[14px] text-[#44546A]">
                      Total earned at maturity: <strong>${(amount + hillInterest).toLocaleString()}</strong> balance.
                    </p>
                    <div className="border-t border-[#0B1F3A]/12 pt-3 flex items-baseline justify-between text-[14px]">
                      <span className="text-[#44546A]">National megabank avg (0.45%)</span>
                      <span className="font-mono tabular-nums font-semibold">+${bigBankInterest.toLocaleString()}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[13px] font-mono uppercase tracking-wider text-[#1D4ED8] font-semibold">
                      Estimated Monthly Payment ({loanYears}-Yr Fixed)
                    </div>
                    <div className="text-[40px] font-semibold leading-none tabular-nums" style={{ fontFamily: b.brand.display }}>
                      ${monthlyPayment.toLocaleString()} <span className="text-[18px] font-normal">/ mo</span>
                    </div>
                    <p className="text-[14px] text-[#44546A]">
                      Assumes 7.20% APR reviewed locally in Fredericksburg — weekly committee decisions in 1 business day.
                    </p>
                  </>
                )}
              </m.output>
            </div>
          </div>
        </div>
      </section>

      {/* 3 · 3-PILLAR RELATIONSHIP LEDGER */}
      <section id="bank-story" className="relative py-16 border-b border-[#0B1F3A]/12">
        <CalloutBadge n={3} show={showCallouts} />
        <div className={`${container} space-y-10`}>
          <div className="max-w-[60ch] space-y-2">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">{b.story.eyebrow}</p>
            <h2 className="text-[32px] font-semibold" style={{ fontFamily: b.brand.display }}>{b.story.heading}</h2>
          </div>

          <div className="space-y-8">
            {b.story.steps.map((step, idx) => (
              <div
                key={step.title}
                className="grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-center border-t border-[#0B1F3A]/12 pt-8"
              >
                <div className="@3xl:col-span-5">
                  <img
                    src={step.image.src}
                    alt={step.image.alt}
                    className="w-full aspect-[16/10] object-cover rounded-lg border border-[#0B1F3A]/12"
                  />
                </div>
                <div className="@3xl:col-span-7 space-y-3">
                  <span className="font-mono text-[13px] font-semibold text-[#1D4ED8]">0{idx + 1}</span>
                  <h3 className="text-[26px] font-semibold" style={{ fontFamily: b.brand.display }}>{step.title}</h3>
                  <p className="text-[16px] leading-relaxed text-[#44546A]">{step.body}</p>
                  {b.quotes[idx] && (
                    <blockquote className="border-l-2 border-[#1D4ED8] pl-4 pt-1 text-[15px] italic text-[#0B1F3A]">
                      &ldquo;{b.quotes[idx].text}&rdquo; — <span className="not-italic text-[13px] text-[#44546A]">{b.quotes[idx].who}</span>
                    </blockquote>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · MONDAY RATE SHEET + 20-MIN BANKER CONCIERGE */}
      <section id="bank-rates" className="relative py-16 bg-[#F8FAFD]">
        <CalloutBadge n={4} show={showCallouts} />
        <div className={`${container} grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-start`}>
          <div className="@3xl:col-span-7 space-y-4">
            <h2 className="text-[28px] font-semibold" style={{ fontFamily: b.brand.display }}>
              {b.menu.heading}
            </h2>
            <div
              tabIndex={0}
              role="region"
              aria-label="Published Monday bank rates"
              className="overflow-x-auto rounded-lg border border-[#0B1F3A]/15 bg-white"
            >
              <table className="w-full min-w-[480px] text-left border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-[#0B1F3A]/18 bg-[#EEF3FA] font-mono text-[13px] uppercase">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Details</th>
                    <th className="py-3 px-4 text-right">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B1F3A]/10">
                  {b.menu.categories.flatMap((c) =>
                    c.items.map((item) => (
                      <tr key={`${c.name}-${item.name}`}>
                        <td className="py-3 px-4 font-semibold">{item.name}</td>
                        <td className="py-3 px-4 text-[#44546A]">{item.detail}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-[#1D4ED8] tabular-nums whitespace-nowrap">
                          {item.price}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div id="bank-concierge" className="relative @3xl:col-span-5 rounded-xl border border-[#0B1F3A]/15 bg-white p-6 space-y-5">
            <CalloutBadge n={5} show={showCallouts} corner="right" />
            <div>
              <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                {b.booking.eyebrow}
              </p>
              <h3 className="mt-1 text-[24px] font-semibold" style={{ fontFamily: b.brand.display }}>
                {b.booking.heading}
              </h3>
              <p className="mt-1 text-[14px] text-[#44546A]">{b.booking.note}</p>
            </div>

            <div className="space-y-2">
              <span className="text-[13px] font-semibold text-[#0B1F3A] block">Discussion topic</span>
              <div className="flex flex-wrap gap-2">
                {['Business Checking / SBA Loan', '12-Mo CD Treasury', 'Construction / Home Loan'].map((tp) => (
                  <button
                    key={tp}
                    type="button"
                    onClick={() => { setTopic(tp); setBooked(false); }}
                    className={`min-h-[44px] rounded-[6px] border px-3 text-[13px] font-semibold cursor-pointer ${
                      topic === tp
                        ? 'border-[#1D4ED8] bg-[#EEF3FA] text-[#1D4ED8]'
                        : 'border-[#0B1F3A]/15 text-[#0B1F3A]'
                    }`}
                  >
                    {tp}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {b.booking.options.slice(0, 4).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { setSlot(opt); setBooked(false); }}
                  className={`min-h-[44px] rounded-[6px] border px-3 text-[13px] font-semibold cursor-pointer ${
                    slot === opt
                      ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                      : 'border-[#0B1F3A]/15 bg-white text-[#0B1F3A]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {booked ? (
              <div className="rounded-lg bg-[#EEF3FA] border border-[#1D4ED8]/30 p-4 text-[14px]">
                <strong>Confirmed:</strong> {topic} · {slot}. {b.booking.confirm}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setBooked(true)}
                className="w-full min-h-[48px] rounded-[6px] bg-[#1D4ED8] text-[15px] font-semibold text-white cursor-pointer"
              >
                Request {slot} Visit
              </button>
            )}
          </div>
        </div>

        {/* Named Local Officers Strip */}
        <div className={`${container} mt-12 grid grid-cols-1 @3xl:grid-cols-3 gap-4 border-t border-[#0B1F3A]/12 pt-8`}>
          {BANK_OFFICERS.map((off) => (
            <div key={off.name} className="rounded-lg border border-[#0B1F3A]/12 bg-white p-4 flex items-baseline justify-between gap-3">
              <div>
                <div className="text-[15px] font-semibold text-[#0B1F3A]">{off.name}</div>
                <div className="text-[13px] text-[#44546A]">{off.role}</div>
              </div>
              <span className="font-mono text-[13px] font-bold text-[#1D4ED8] shrink-0">{off.ext}</span>
            </div>
          ))}
        </div>
      </section>

      <BankHomeBriefingsLedger
        business={b}
        onOpenArticle={openBankArticle}
        onOpenPage={(p) => navigateBank(p)}
      />
        </>
      )}

      <footer className="border-t border-[#0B1F3A]/14 py-8 text-[13px] text-[#44546A]">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4`}>
          <span>© 2026 {b.name} · Member FDIC · {b.address}</span>
          <span>Concept preview for Colon Hyphen Bracket</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 3 · SALON STUDIO: Editorial Lookbook + Interactive Stylist & Chair Matcher
 * Palette: linen #FBF4F1, rose #F2E3DE, espresso #1E1416, rosewood #9D2C57
 * Motion: 600ms EASE_EDITORIAL curtain reveal & lookbook crossfade
 * ========================================================================== */
function SalonStudioSite({
  business: b,
  containerRef,
  preview = false,
  showCallouts = false,
}: StudioVariantProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activePage, setActivePage] = useState<StudioPageKey>('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(
    STUDIO_EDITORIAL_BY_ID.salon.articles[0].id
  );
  const [lookIdx, setLookIdx] = useState(0);
  const [catIdx, setCatIdx] = useState(0);
  const [selectedServiceName, setSelectedServiceName] = useState(b.menu.categories[0].items[0].name);
  const [stylist, setStylist] = useState('Maya Lin · Cut & Texture');
  const [chairTime, setChairTime] = useState(b.booking.options[0] ?? 'Today 3:30 pm');
  const [reserved, setReserved] = useState(false);

  const navigateSalon = (page: StudioPageKey) => {
    setActivePage(page);
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const openSalonArticle = (id: string) => {
    setActiveArticleId(id);
    setActivePage('articles');
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const handleSalonAction = (action: StudioArticle['ctaAction']) => {
    setReserved(false);
    if (action === 'book-highlights-elena') {
      setCatIdx(1);
      setSelectedServiceName('Lived-in highlights');
      setStylist('Elena Rostova · Lived-In Color');
    } else if (action === 'book-cut-maya') {
      setCatIdx(0);
      setSelectedServiceName('Signature cut');
      setStylist('Maya Lin · Cut & Texture');
    }
    setActivePage('home');
    scrollToTarget(containerRef, shouldReduceMotion, 'salon-matcher');
  };

  const allItems = b.menu.categories.flatMap((c) => c.items);
  const chosenService = allItems.find((i) => i.name === selectedServiceName) ?? allItems[0];
  const activeStep = b.story.steps[lookIdx] ?? b.story.steps[0];
  const activeCategory = b.menu.categories[catIdx] ?? b.menu.categories[0];

  const container = 'mx-auto w-full max-w-[1160px] px-5 @3xl:px-10';

  return (
    <div
      className="@container min-h-full bg-[#FBF4F1] text-[#1E1416]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="studio"
      data-studio-archetype="salon"
    >
      <header className="sticky top-0 z-30 border-b border-[#1E1416]/12 bg-[#FBF4F1]">
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <button
            type="button"
            onClick={() => navigateSalon('home')}
            className="text-left text-[24px] font-medium tracking-tight cursor-pointer min-h-[44px] inline-flex items-center"
            style={{ fontFamily: b.brand.display }}
          >
            {b.name}
          </button>
          <nav aria-label="Maple & Mirror pages" className="hidden @3xl:flex items-center gap-6 text-[15px]">
            {[
              { id: 'home', label: 'Studio & Booking', testId: 'studio-nav-home' },
              { id: 'articles', label: 'The Chair Journal (3)', testId: 'studio-nav-articles' },
              { id: 'secondary', label: 'Stylists & Formulas', testId: 'studio-nav-secondary' },
            ].map((item) => {
              const on = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={item.testId}
                  aria-current={on ? 'page' : undefined}
                  onClick={() => navigateSalon(item.id as StudioPageKey)}
                  className={`min-h-[44px] inline-flex items-center border-b-2 cursor-pointer transition-colors ${
                    on
                      ? 'border-[#9D2C57] font-semibold text-[#1E1416]'
                      : 'border-transparent text-[#5E4C50] hover:text-[#1E1416]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              scrollToTarget(containerRef, shouldReduceMotion, 'salon-matcher');
            }}
            className="inline-flex min-h-[44px] items-center rounded-[2px] bg-[#9D2C57] px-5 text-[14px] font-semibold text-white cursor-pointer"
          >
            Reserve Chair
          </button>
        </div>
      </header>

      {!preview && (
        <nav
          aria-label="Maple & Mirror mobile pages"
          className="@3xl:hidden flex gap-2 overflow-x-auto border-b border-[#1E1416]/12 bg-[#F2E3DE] px-5 py-2"
        >
          {[
            { id: 'home', label: 'Studio & Book' },
            { id: 'articles', label: 'Chair Journal (3)' },
            { id: 'secondary', label: 'Stylists' },
          ].map((item) => {
            const on = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => navigateSalon(item.id as StudioPageKey)}
                className={`shrink-0 min-h-[44px] border px-4 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#1E1416] bg-[#1E1416] text-white'
                    : 'border-[#1E1416]/20 bg-white text-[#1E1416]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}

      {activePage === 'articles' ? (
        <SalonJournalPage
          business={b}
          articles={STUDIO_EDITORIAL_BY_ID.salon.articles}
          activeArticleId={activeArticleId}
          onSelectArticle={(id) => {
            setActiveArticleId(id);
            scrollToTarget(containerRef, shouldReduceMotion);
          }}
          onBackHome={() => navigateSalon('home')}
          onAction={handleSalonAction}
          preview={preview}
        />
      ) : activePage === 'secondary' ? (
        <SalonStylistsPage
          business={b}
          onBackHome={() => navigateSalon('home')}
          onBookStylist={(stylistValue) => {
            setStylist(stylistValue);
            setReserved(false);
            setActivePage('home');
            scrollToTarget(containerRef, shouldReduceMotion, 'salon-matcher');
          }}
        />
      ) : (
        <>

      {/* 1 · EDITORIAL MAGAZINE MASTHEAD */}
      <section className="relative border-b border-[#1E1416]/12">
        <CalloutBadge n={1} show={showCallouts} />
        <div className={`${container} py-12 @3xl:py-16 grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-center`}>
          <div className="@3xl:col-span-7 space-y-6">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[#9D2C57]">
              Highlands, Denver · Gratuity-Free Pricing · {b.status}
            </p>
            <h1
              className="text-[44px] @3xl:text-[62px] font-medium leading-[1.0]"
              style={{ fontFamily: b.brand.display }}
            >
              {b.headline.map((line, i) => (
                <m.span
                  key={line}
                  className={i === 1 ? 'block italic text-[#9D2C57]' : 'block'}
                  initial={preview || shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_EDITORIAL }}
                >
                  {line}
                </m.span>
              ))}
            </h1>
            <p className="text-[17px] text-[#5E4C50] leading-relaxed max-w-[46ch]">{b.intro}</p>
            <div className="flex flex-wrap gap-6 border-t border-[#1E1416]/12 pt-5">
              {b.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[30px] font-medium leading-none" style={{ fontFamily: b.brand.display }}>{s.value}</div>
                  <div className="mt-1 text-[13px] text-[#5E4C50]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <m.div
            className="@3xl:col-span-5 overflow-hidden border border-[#1E1416]/14 bg-[#F2E3DE]"
            initial={preview || shouldReduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.65, ease: EASE_EDITORIAL }}
          >
            <img
              src={b.images.hero.src}
              alt={b.images.hero.alt}
              data-bang-image-slot="hero"
              className="w-full aspect-[4/5] object-cover"
            />
          </m.div>
        </div>
      </section>

      {/* 2 · INTERACTIVE 3-CHAPTER LOOKBOOK */}
      <section id="salon-lookbook" className="relative border-b border-[#1E1416]/12 bg-[#F2E3DE] py-16">
        <CalloutBadge n={2} show={showCallouts} />
        <div className={`${container} grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-center`}>
          <div className="@3xl:col-span-5 space-y-6">
            <div>
              <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#9D2C57]">
                {b.story.eyebrow}
              </p>
              <h2 className="mt-1 text-[36px] font-medium leading-tight" style={{ fontFamily: b.brand.display }}>
                {b.story.heading}
              </h2>
            </div>

            <div className="divide-y divide-[#1E1416]/14 border-y border-[#1E1416]/14">
              {b.story.steps.map((step, i) => {
                const active = lookIdx === i;
                return (
                  <button
                    key={step.title}
                    type="button"
                    data-testid={`salon-lookbook-tab-${i}`}
                    onClick={() => setLookIdx(i)}
                    className={`w-full min-h-[56px] py-4 text-left flex items-start gap-3 cursor-pointer transition-opacity ${
                      active ? 'opacity-100' : 'opacity-60 hover:opacity-90'
                    }`}
                  >
                    <span className="font-mono text-[13px] font-bold text-[#9D2C57] mt-1">0{i + 1}</span>
                    <div>
                      <div className="text-[19px] font-medium" style={{ fontFamily: b.brand.display }}>{step.title}</div>
                      {active && <p className="mt-1 text-[14px] text-[#5E4C50] leading-relaxed">{step.body}</p>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="@3xl:col-span-7">
            <AnimatePresence mode="wait">
              <m.figure
                key={activeStep.title}
                initial={preview || shouldReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_EDITORIAL }}
                className="space-y-3"
              >
                <img
                  src={activeStep.image.src}
                  alt={activeStep.image.alt}
                  className="w-full aspect-[16/10] object-cover border border-[#1E1416]/14"
                />
                <figcaption className="text-[14px] text-[#5E4C50]">
                  Chapter 0{lookIdx + 1} — {activeStep.title}
                </figcaption>
              </m.figure>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3 · INTERACTIVE 3-STEP SERVICE, STYLIST & CHAIR MATCHER */}
      <section id="salon-matcher" className="relative py-16 border-b border-[#1E1416]/12 bg-white">
        <CalloutBadge n={3} show={showCallouts} />
        <div className={`${container} space-y-8`}>
          <div>
            <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#9D2C57]">
              3-Step Chair Reservation
            </p>
            <h2 className="mt-1 text-[34px] font-medium" style={{ fontFamily: b.brand.display }}>
              {b.menu.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-start">
            <div className="relative @3xl:col-span-7 space-y-5">
              <CalloutBadge n={4} show={showCallouts} />
              <div className="flex flex-wrap gap-2">
                {b.menu.categories.map((cat, idx) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCatIdx(idx)}
                    className={`min-h-[44px] border px-5 text-[14px] font-semibold cursor-pointer ${
                      catIdx === idx
                        ? 'border-[#1E1416] bg-[#1E1416] text-white'
                        : 'border-[#1E1416]/20 bg-white text-[#1E1416]'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-[#1E1416]/12 border-y border-[#1E1416]/12">
                {activeCategory.items.map((item) => {
                  const picked = selectedServiceName === item.name;
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        setSelectedServiceName(item.name);
                        setReserved(false);
                      }}
                      className={`w-full min-h-[56px] py-4 px-3 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                        picked ? 'bg-[#FBF4F1]' : 'hover:bg-[#FBF4F1]/60'
                      }`}
                    >
                      <div>
                        <div className="text-[18px] font-medium" style={{ fontFamily: b.brand.display }}>
                          {item.name}
                        </div>
                        <div className="text-[14px] text-[#5E4C50]">{item.detail}</div>
                        {SALON_GROWOUT_TAGS[item.name] && (
                          <div className="mt-1 font-mono text-[13px] text-[#9D2C57]">
                            {SALON_GROWOUT_TAGS[item.name]}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-[15px] font-semibold text-[#9D2C57]">{item.price}</span>
                        {picked && <Check className="h-4 w-4 text-[#9D2C57]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <aside className="@3xl:col-span-5 border border-[#1E1416]/16 bg-[#FBF4F1] p-6 space-y-5">
              <div className="space-y-2">
                <span className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9D2C57]">
                  Step 2 · Choose Stylist
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Maya Lin · Cut & Texture',
                    'Elena Rostova · Lived-In Color',
                    'First Available Senior Stylist',
                  ].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        setStylist(st);
                        setReserved(false);
                      }}
                      className={`min-h-[44px] border px-3 text-left text-[14px] font-medium cursor-pointer ${
                        stylist === st
                          ? 'border-[#1E1416] bg-[#1E1416] text-white'
                          : 'border-[#1E1416]/20 bg-white text-[#1E1416]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9D2C57]">
                  Step 3 · Chair Opening
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {b.booking.options.slice(0, 4).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setChairTime(opt);
                        setReserved(false);
                      }}
                      className={`min-h-[44px] border px-2 text-[13px] font-semibold cursor-pointer ${
                        chairTime === opt
                          ? 'border-[#9D2C57] bg-[#9D2C57] text-white'
                          : 'border-[#1E1416]/20 bg-white text-[#1E1416]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <output
                data-testid="salon-book-output"
                className="block border-t border-[#1E1416]/14 pt-4 space-y-1 text-[14px]"
              >
                <div className="font-semibold text-[16px]" style={{ fontFamily: b.brand.display }}>
                  {chosenService.name} · {chosenService.price}
                </div>
                <div className="text-[#5E4C50]">
                  With {stylist} · {chairTime} (Gratuity included)
                </div>
              </output>

              {reserved ? (
                <div className="border border-[#9D2C57] bg-white p-4 text-[14px]">
                  <strong>Chair Held:</strong> {chosenService.name} at {chairTime}. {b.booking.confirm}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setReserved(true)}
                  className="w-full min-h-[48px] bg-[#9D2C57] text-[15px] font-semibold text-white cursor-pointer"
                >
                  Hold {chairTime} Chair
                </button>
              )}
            </aside>
          </div>
        </div>
      </section>

      <SalonHomeJournalIndex
        business={b}
        onOpenArticle={openSalonArticle}
        onOpenPage={(p) => navigateSalon(p)}
      />

      {/* 4 · THREE-COLUMN EDITORIAL PULL-QUOTES */}
      <section id="salon-quotes" className="relative py-16">
        <CalloutBadge n={5} show={showCallouts} />
        <div className={`${container} grid grid-cols-1 @3xl:grid-cols-3 gap-8 divide-y @3xl:divide-y-0 @3xl:divide-x divide-[#1E1416]/12`}>
          {b.quotes.map((q) => (
            <blockquote key={q.who} className="pt-5 @3xl:pt-0 @3xl:pl-8 first:pl-0 first:pt-0 space-y-2">
              <p className="text-[22px] italic leading-snug" style={{ fontFamily: b.brand.display }}>
                &ldquo;{q.text}&rdquo;
              </p>
              <footer className="text-[13px] font-medium text-[#5E4C50]">— {q.who}</footer>
            </blockquote>
          ))}
        </div>
      </section>
        </>
      )}

      <footer className="border-t border-[#1E1416]/14 py-8 text-[13px] text-[#5E4C50]">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4`}>
          <span>© 2026 {b.name} · {b.address} · {b.phone}</span>
          <span>Concept preview for Colon Hyphen Bracket</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 4 · OFFICE STUDIO: Flat-Fee CPA Plan Recommender & Q1–Q4 Tax Roadmap
 * Palette: alabaster #F7F9FC, slate #102A43, muted #486581, terracotta #C2410C
 * Motion: crisp 150ms EASE_ACCENT Swiss-grid swaps
 * ========================================================================== */
function OfficeStudioSite({
  business: b,
  containerRef,
  preview = false,
  showCallouts = false,
}: StudioVariantProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activePage, setActivePage] = useState<StudioPageKey>('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(
    STUDIO_EDITORIAL_BY_ID.office.articles[0].id
  );
  const [entity, setEntity] = useState<'solo' | 'llc' | 'personal'>('llc');
  const [staff, setStaff] = useState<'0' | '1-5' | '6-10'>('1-5');
  const [midYearReview, setMidYearReview] = useState(true);
  const [quarter, setQuarter] = useState<'Q1' | 'Q2' | 'Q3' | 'Q4'>('Q1');
  const [slot, setSlot] = useState(b.booking.options[0] ?? 'Mon 9:00 am');
  const [booked, setBooked] = useState(false);

  const navigateOffice = (page: StudioPageKey) => {
    setActivePage(page);
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const openOfficeArticle = (id: string) => {
    setActiveArticleId(id);
    setActivePage('articles');
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const handleOfficeAction = (action: StudioArticle['ctaAction']) => {
    setBooked(false);
    if (action === 'scope-scorp') {
      setEntity('llc');
      setStaff('1-5');
      setMidYearReview(true);
      setActivePage('home');
      scrollToTarget(containerRef, shouldReduceMotion, 'office-estimator');
    } else if (action === 'scope-bookkeeping') {
      setEntity('solo');
      setStaff('0');
      setActivePage('home');
      scrollToTarget(containerRef, shouldReduceMotion, 'office-estimator');
    } else {
      setActivePage('home');
      scrollToTarget(containerRef, shouldReduceMotion, 'office-call');
    }
  };

  const recommended = useMemo(() => {
    if (entity === 'personal') {
      const fee = midYearReview ? 475 : 275;
      return {
        planName: midYearReview ? 'Personal Return + Tax Projection' : 'Personal Tax Return',
        feeLabel: `$${fee} flat / yr`,
        items: ['Federal + Ohio W-2 & 1099 preparation', 'Audit notice response protection', ...(midYearReview ? ['60-min mid-year withholding checkup'] : [])],
      };
    }
    if (entity === 'solo') {
      const fee = staff === '0' ? (midYearReview ? 425 : 350) : 520;
      return {
        planName: 'Solo Business Bookkeeping & Schedule C',
        feeLabel: `$${fee} / mo`,
        items: ['Monthly QuickBooks reconciliation', 'Quarterly IRS voucher preparation', '24-hr written CPA email support'],
      };
    }
    const base = staff === '6-10' ? 790 : staff === '1-5' ? 620 : 520;
    const total = midYearReview ? base + 70 : base;
    return {
      planName: 'Full-Service LLC / S-Corp Plan',
      feeLabel: `$${total} / mo`,
      items: [
        'Monthly books + Gusto payroll sync',
        'Form 1120-S / 1065 business tax filing + K-1',
        'Personal owner return included',
      ],
    };
  }, [entity, staff, midYearReview]);

  const quarterDetails = {
    Q1: { title: b.story.steps[0].title, body: b.story.steps[0].body, img: b.story.steps[0].image },
    Q2: { title: b.story.steps[1].title, body: b.story.steps[1].body, img: b.story.steps[1].image },
    Q3: { title: b.story.steps[2].title, body: b.story.steps[2].body, img: b.story.steps[2].image },
    Q4: {
      title: 'Year-end S-Corp salary & Solo 401(k) lock',
      body: 'Before December 31 we finalize owner W-2 bonuses, retirement contributions, and equipment purchases so April is just signatures.',
      img: b.story.steps[2].image,
    },
  }[quarter];

  const container = 'mx-auto w-full max-w-[1200px] px-5 @3xl:px-10';

  return (
    <div
      className="@container min-h-full bg-[#F7F9FC] text-[#102A43]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="studio"
      data-studio-archetype="office"
    >
      <header className="sticky top-0 z-30 border-b border-[#102A43]/12 bg-white">
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <button
            type="button"
            onClick={() => navigateOffice('home')}
            className="text-left text-[20px] font-bold tracking-tight cursor-pointer min-h-[44px] inline-flex items-center"
          >
            {b.name}
          </button>
          <nav aria-label="Northstar CPA pages" className="hidden @3xl:flex items-center gap-6 text-[15px]">
            {[
              { id: 'home', label: 'Scope & Calendar', testId: 'studio-nav-home' },
              { id: 'articles', label: 'Client Advisory Memos (4)', testId: 'studio-nav-articles' },
              { id: 'secondary', label: '2026 Deadlines', testId: 'studio-nav-secondary' },
            ].map((item) => {
              const on = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={item.testId}
                  aria-current={on ? 'page' : undefined}
                  onClick={() => navigateOffice(item.id as StudioPageKey)}
                  className={`min-h-[44px] inline-flex items-center border-b-2 cursor-pointer transition-colors ${
                    on
                      ? 'border-[#C2410C] font-bold text-[#102A43]'
                      : 'border-transparent text-[#486581] hover:text-[#102A43]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              scrollToTarget(containerRef, shouldReduceMotion, 'office-call');
            }}
            className="inline-flex min-h-[44px] items-center rounded-[4px] bg-[#C2410C] px-5 text-[14px] font-semibold text-white cursor-pointer"
          >
            {b.primaryCta}
          </button>
        </div>
      </header>

      {!preview && (
        <nav
          aria-label="Northstar CPA mobile pages"
          className="@3xl:hidden flex gap-2 overflow-x-auto border-b border-[#102A43]/12 bg-[#E8EEF6] px-5 py-2"
        >
          {[
            { id: 'home', label: 'Scope & Q1–Q4' },
            { id: 'articles', label: 'CPA Memos (4)' },
            { id: 'secondary', label: '2026 Deadlines' },
          ].map((item) => {
            const on = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => navigateOffice(item.id as StudioPageKey)}
                className={`shrink-0 min-h-[44px] rounded-[4px] border px-4 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#102A43] bg-[#102A43] text-white'
                    : 'border-[#102A43]/20 bg-white text-[#102A43]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}

      {activePage === 'articles' ? (
        <OfficeMemosPage
          business={b}
          articles={STUDIO_EDITORIAL_BY_ID.office.articles}
          activeArticleId={activeArticleId}
          onSelectArticle={(id) => {
            setActiveArticleId(id);
            scrollToTarget(containerRef, shouldReduceMotion);
          }}
          onBackHome={() => navigateOffice('home')}
          onAction={handleOfficeAction}
          preview={preview}
        />
      ) : activePage === 'secondary' ? (
        <OfficeDeadlinesPage onBackHome={() => navigateOffice('home')} />
      ) : (
        <>

      {/* 1 · SWISS-GRID SLA MASTHEAD */}
      <section className="relative border-b border-[#102A43]/12 bg-white">
        <CalloutBadge n={1} show={showCallouts} />
        <div className={`${container} py-12 @3xl:py-16 grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-center`}>
          <div className="@3xl:col-span-6 space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="rounded bg-[#E8EEF6] px-3 py-1.5 font-mono text-[13px] font-bold text-[#102A43]">
                24-hr written reply SLA
              </span>
              <span className="rounded bg-[#E8EEF6] px-3 py-1.5 font-mono text-[13px] font-bold text-[#9A3412]">
                $0 surprise April hourly bills
              </span>
              <span className="rounded border border-[#102A43]/18 bg-white px-3 py-1.5 font-mono text-[13px] font-semibold text-[#102A43]">
                Ohio Permit #OH-44912 · SOC-2 Vault
              </span>
            </div>
            <h1 className="text-[38px] @3xl:text-[50px] font-bold leading-[1.05] tracking-tight">
              {b.headline.join(' ')}
            </h1>
            <p className="text-[17px] text-[#486581] leading-relaxed">{b.intro}</p>
            <div className="grid grid-cols-3 gap-4 border-t border-[#102A43]/12 pt-5">
              {b.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-[26px] font-bold text-[#102A43] tabular-nums">{s.value}</div>
                  <div className="text-[13px] text-[#486581]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="@3xl:col-span-6">
            <img
              src={b.images.hero.src}
              alt={b.images.hero.alt}
              data-bang-image-slot="hero"
              className="w-full aspect-[16/10] object-cover rounded border border-[#102A43]/12"
            />
          </div>
        </div>
      </section>

      {/* 2 · INTERACTIVE FLAT-FEE PLAN RECOMMENDER */}
      <section id="office-estimator" className="relative py-16 border-b border-[#102A43]/12">
        <CalloutBadge n={2} show={showCallouts} />
        <div className={`${container} grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-start`}>
          <div className="@3xl:col-span-7 space-y-6">
            <div>
              <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
                Interactive Scope Recommender
              </p>
              <h2 className="mt-1 text-[32px] font-bold">See your flat price in 10 seconds.</h2>
            </div>

            <div className="space-y-2">
              <span className="text-[14px] font-bold block">1. Business or Filing Setup</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'solo', label: 'Solo / Freelancer (Schedule C)' },
                  { id: 'llc', label: 'LLC or S-Corp' },
                  { id: 'personal', label: 'Personal Return Only' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    data-testid={opt.id === 'llc' ? 'office-entity-llc' : `office-entity-${opt.id}`}
                    onClick={() => setEntity(opt.id as 'solo' | 'llc' | 'personal')}
                    className={`min-h-[44px] rounded-[4px] border px-4 text-[14px] font-semibold cursor-pointer ${
                      entity === opt.id
                        ? 'border-[#102A43] bg-[#102A43] text-white'
                        : 'border-[#102A43]/20 bg-white text-[#102A43]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {entity !== 'personal' && (
              <div className="space-y-2">
                <span className="text-[14px] font-bold block">2. Team / W-2 Payroll Size</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: '0', label: 'Just me (no W-2)' },
                    { id: '1-5', label: '1–5 employees' },
                    { id: '6-10', label: '6–10 employees' },
                  ].map((sz) => (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => setStaff(sz.id as '0' | '1-5' | '6-10')}
                      className={`min-h-[44px] rounded-[4px] border px-4 text-[14px] font-semibold cursor-pointer ${
                        staff === sz.id
                          ? 'border-[#C2410C] bg-[#C2410C] text-white'
                          : 'border-[#102A43]/20 bg-white text-[#102A43]'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <label className="inline-flex min-h-[44px] items-center gap-3 rounded border border-[#102A43]/15 bg-white px-4 cursor-pointer">
              <input
                type="checkbox"
                checked={midYearReview}
                onChange={(e) => setMidYearReview(e.target.checked)}
                className="h-4 w-4 accent-[#C2410C]"
              />
              <span className="text-[14px] font-medium">
                Include quarterly tax-savings checkups &amp; entity review
              </span>
            </label>
          </div>

          <m.output
            key={recommended.planName + recommended.feeLabel}
            initial={preview || shouldReduceMotion ? false : { opacity: 0.7 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: EASE_ACCENT }}
            data-testid="office-plan-output"
            className="@3xl:col-span-5 block rounded border-2 border-[#102A43] bg-white p-6 space-y-5"
          >
            <div className="border-b border-[#102A43]/12 pb-4">
              <div className="font-mono text-[13px] font-bold uppercase text-[#9A3412]">Recommended Scope</div>
              <h3 className="mt-1 text-[22px] font-bold">{recommended.planName}</h3>
              <div className="mt-2 font-mono text-[32px] font-bold text-[#102A43] tabular-nums">
                {recommended.feeLabel}
              </div>
            </div>
            <ul className="space-y-2.5 text-[14px]">
              {recommended.items.map((it) => (
                <li key={it} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#C2410C] mt-0.5 shrink-0" />
                  <span>{it}</span>
                </li>
              ))}
            </ul>
            <a
              href="#office-call"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-[4px] bg-[#C2410C] text-[15px] font-semibold text-white"
            >
              Lock This Scope Into Call
            </a>
          </m.output>
        </div>
      </section>

      {/* 3 · Q1–Q4 TAX ROADMAP + ACCESSIBLE NATIVE FAQ */}
      <section id="office-roadmap" className="relative py-16 bg-white border-b border-[#102A43]/12">
        <CalloutBadge n={3} show={showCallouts} />
        <div className={`${container} space-y-12`}>
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
                  Year-Round Rhythm
                </p>
                <h2 className="mt-1 text-[30px] font-bold">Four quiet quarters instead of one stressful April.</h2>
              </div>
              <div className="flex gap-2">
                {(['Q1', 'Q2', 'Q3', 'Q4'] as const).map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuarter(q)}
                    className={`min-h-[44px] min-w-[54px] rounded-[4px] border font-mono text-[14px] font-bold cursor-pointer ${
                      quarter === q
                        ? 'border-[#102A43] bg-[#102A43] text-white'
                        : 'border-[#102A43]/20 bg-[#F7F9FC] text-[#102A43]'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-center rounded border border-[#102A43]/12 bg-[#F7F9FC] p-6">
              <div className="@3xl:col-span-5">
                <img
                  src={quarterDetails.img.src}
                  alt={quarterDetails.img.alt}
                  className="w-full aspect-[16/10] object-cover rounded border border-[#102A43]/12"
                />
              </div>
              <div className="@3xl:col-span-7 space-y-2">
                <span className="font-mono text-[13px] font-bold text-[#9A3412]">{quarter} Focus</span>
                <h3 className="text-[24px] font-bold">{quarterDetails.title}</h3>
                <p className="text-[15px] text-[#486581] leading-relaxed">{quarterDetails.body}</p>
              </div>
            </div>
          </div>

          <div className="relative space-y-4">
            <CalloutBadge n={4} show={showCallouts} />
            <h3 className="text-[22px] font-bold">Switching &amp; Software Questions</h3>
            <div className="divide-y divide-[#102A43]/12 border-y border-[#102A43]/12">
              {[
                {
                  q: 'How does switching from our existing CPA work mid-year?',
                  a: 'We collect your prior two years of returns and handle accountant transfers directly so nothing falls between quarters.',
                },
                {
                  q: 'Which bookkeeping and payroll tools do you connect with?',
                  a: 'QuickBooks Online, Xero, Gusto, Rippling, and standard Mercury/Chase business bank feeds.',
                },
              ].map((faq) => (
                <details key={faq.q} className="group py-3">
                  <summary className="inline-flex min-h-[44px] items-center gap-2 text-[16px] font-semibold cursor-pointer list-none">
                    <ChevronRight className="h-4 w-4 text-[#C2410C] transition-transform group-open:rotate-90 shrink-0" />
                    <span>{faq.q}</span>
                  </summary>
                  <p className="mt-1 pl-6 text-[14px] text-[#486581] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!preview && (
        <OfficeHomeMemosSection
          business={b}
          onOpenArticle={openOfficeArticle}
          onOpenPage={(p) => navigateOffice(p)}
        />
      )}

      {/* 4 · PREFILLED 20-MIN INTRO CALL */}
      <section id="office-call" className="relative py-16">
        <CalloutBadge n={5} show={showCallouts} />
        <div className={`${container} grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-start`}>
          <div className="@3xl:col-span-5 space-y-3">
            <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
              {b.booking.eyebrow}
            </p>
            <h2 className="text-[32px] font-bold">{b.booking.heading}</h2>
            <p className="text-[15px] text-[#486581]">{b.booking.note}</p>
            <div className="rounded border border-[#102A43]/15 bg-white p-4 text-[14px]">
              <strong>Prefilled scope:</strong> {recommended.planName} ({recommended.feeLabel})
            </div>
          </div>
          <div className="@3xl:col-span-7 rounded border border-[#102A43]/15 bg-white p-6 space-y-5">
            <div className="grid grid-cols-2 @3xl:grid-cols-3 gap-2">
              {b.booking.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSlot(opt);
                    setBooked(false);
                  }}
                  className={`min-h-[44px] rounded-[4px] border px-3 text-[13px] font-semibold cursor-pointer ${
                    slot === opt
                      ? 'border-[#102A43] bg-[#102A43] text-white'
                      : 'border-[#102A43]/18 bg-[#F7F9FC] text-[#102A43]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {booked ? (
              <div className="rounded bg-[#E8EEF6] p-4 text-[14px]">
                <strong>Booked ({slot}):</strong> {recommended.planName}. {b.booking.confirm}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setBooked(true)}
                className="w-full min-h-[48px] rounded-[4px] bg-[#C2410C] text-[15px] font-semibold text-white cursor-pointer"
              >
                Book {slot} Intro Call ({recommended.feeLabel})
              </button>
            )}
          </div>
        </div>
      </section>
        </>
      )}

      <footer className="border-t border-[#102A43]/12 bg-white py-8 text-[13px] text-[#486581]">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4`}>
          <span>© 2026 {b.name} · {b.address} · {b.phone}</span>
          <span>Concept preview for Colon Hyphen Bracket</span>
        </div>
      </footer>
    </div>
  );
}

/* ============================================================================
 * 5 · PORTFOLIO STUDIO: Dark-Mode Interactive Case-Study Workbench & Sprint Scope Builder
 * Palette: obsidian #111113, surface #1C1C20, chalk #F4F4F2, lime #B8F25C (ink #111113)
 * Motion: SPRING_LAYOUT shared-element active case indicator
 * ========================================================================== */
function PortfolioStudioSite({
  business: b,
  containerRef,
  preview = false,
  showCallouts = false,
}: StudioVariantProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activePage, setActivePage] = useState<StudioPageKey>('home');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(
    PORTFOLIO_CASE_STUDIES[0].id
  );
  const [caseIdx, setCaseIdx] = useState(0);
  const [lens, setLens] = useState<'outcome' | 'shipped' | 'quote'>('outcome');
  const [selectedScopeIdx, setSelectedScopeIdx] = useState(0);
  const [callSlot, setCallSlot] = useState(b.booking.options[0] ?? 'Tue 9:00 am PT');
  const [booked, setBooked] = useState(false);

  const portfolioArticles = useMemo(
    () => STUDIO_EDITORIAL_BY_ID.portfolio.articles,
    []
  );

  const navigatePortfolio = (page: StudioPageKey) => {
    setActivePage(page);
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const openPortfolioArticle = (id: string) => {
    setActiveArticleId(id);
    setActivePage('articles');
    scrollToTarget(containerRef, shouldReduceMotion);
  };

  const handlePortfolioAction = (action: StudioArticle['ctaAction']) => {
    setBooked(false);
    if (action === 'sprint-2wk') {
      setSelectedScopeIdx(0);
      setActivePage('home');
      scrollToTarget(containerRef, shouldReduceMotion, 'portfolio-scope');
    } else if (action === 'sprint-audit') {
      setSelectedScopeIdx(2);
      setActivePage('home');
      scrollToTarget(containerRef, shouldReduceMotion, 'portfolio-scope');
    } else {
      setActivePage('home');
      scrollToTarget(containerRef, shouldReduceMotion, 'portfolio-call');
    }
  };

  const scopes = useMemo(
    () => [
      {
        name: b.menu.categories[0].items[0].name,
        price: b.menu.categories[0].items[0].price,
        detail: b.menu.categories[0].items[0].detail,
        weeks: [
          'Week 1 · Founder interviews, workflow map, and interactive clickable prototype',
          'Week 2 · User tests + production React/Tailwind component handoff',
        ],
      },
      {
        name: b.menu.categories[0].items[1].name,
        price: b.menu.categories[0].items[1].price,
        detail: b.menu.categories[0].items[1].detail,
        weeks: [
          'Weeks 1–3 · Core product architecture, design tokens, and key screens',
          'Weeks 4–8 · Full engineering PR reviews and launch QA with your team',
        ],
      },
      {
        name: b.menu.categories[0].items[2].name,
        price: b.menu.categories[0].items[2].price,
        detail: b.menu.categories[0].items[2].detail,
        weeks: [
          'Days 1–3 · Full click-through audit across desktop and mobile flows',
          'Days 4–5 · Prioritized Loom walkthrough + annotated Figma fixes',
        ],
      },
      {
        name: b.menu.categories[1].items[0].name,
        price: b.menu.categories[1].items[0].price,
        detail: b.menu.categories[1].items[0].detail,
        weeks: [
          'Embedded 2 days/wk · Shared Slack, weekly shipped builds, design system upkeep',
          'Pause or adjust monthly with zero long-term lock-in',
        ],
      },
    ],
    [b]
  );

  const activeCase = b.story.steps[caseIdx] ?? b.story.steps[0];
  const activeQuote = b.quotes[caseIdx] ?? b.quotes[0];
  const activeScope = scopes[selectedScopeIdx] ?? scopes[0];
  const container = 'mx-auto w-full max-w-[1200px] px-5 @3xl:px-10';

  const caseOutcomes = [
    { metric: '12 min → 3 min onboarding · +38% retention', shipped: 'Offline iOS field log, token system, and production Swift/React specs' },
    { metric: '0 → launch in 14 weeks with 4 engineers', shipped: 'End-to-end invoice composer, payment states, and dark-mode ledger UI' },
    { metric: '200,000+ Portland residents served offline', shipped: 'WCAG AAA contrast trail map, trailhead cards, and zero-signal cache UX' },
  ][caseIdx] ?? { metric: activeCase.body, shipped: activeCase.body };

  return (
    <div
      className="@container min-h-full bg-[#111113] text-[#F4F4F2]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="studio"
      data-studio-archetype="portfolio"
    >
      <header className="sticky top-0 z-30 border-b border-white/12 bg-[#111113]">
        <div className={`${container} flex h-16 items-center justify-between gap-4`}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigatePortfolio('home')}
              className="text-left text-[21px] font-medium tracking-tight cursor-pointer min-h-[44px] inline-flex items-center"
              style={{ fontFamily: b.brand.display }}
            >
              {b.name}
            </button>
            <span className="hidden @3xl:inline-flex items-center gap-1.5 rounded-full border border-[#B8F25C]/35 bg-[#B8F25C]/10 px-3 py-1 font-mono text-[13px] text-[#B8F25C]">
              <span className="h-2 w-2 rounded-full bg-[#B8F25C]" aria-hidden />
              {b.status}
            </span>
          </div>
          <nav aria-label="Aria Chen Studio pages" className="hidden @3xl:flex items-center gap-6 text-[15px]">
            {[
              { id: 'home', label: 'Work & Sprint', testId: 'studio-nav-home' },
              { id: 'articles', label: 'Case Studies & Notes (6)', testId: 'studio-nav-articles' },
              { id: 'secondary', label: 'Sprint Colophon', testId: 'studio-nav-secondary' },
            ].map((item) => {
              const on = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={item.testId}
                  aria-current={on ? 'page' : undefined}
                  onClick={() => navigatePortfolio(item.id as StudioPageKey)}
                  className={`min-h-[44px] inline-flex items-center border-b-2 cursor-pointer transition-colors ${
                    on
                      ? 'border-[#B8F25C] font-semibold text-white'
                      : 'border-transparent text-[#A8A8A2] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => {
              setActivePage('home');
              scrollToTarget(containerRef, shouldReduceMotion, 'portfolio-call');
            }}
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#B8F25C] px-5 text-[14px] font-semibold text-[#111113] cursor-pointer"
          >
            Request Call
          </button>
        </div>
      </header>

      {!preview && (
        <nav
          aria-label="Aria Chen Studio mobile pages"
          className="@3xl:hidden flex gap-2 overflow-x-auto border-b border-white/12 bg-[#161619] px-5 py-2"
        >
          {[
            { id: 'home', label: 'Work & Sprint' },
            { id: 'articles', label: 'Cases & Notes (6)' },
            { id: 'secondary', label: 'Colophon' },
          ].map((item) => {
            const on = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => navigatePortfolio(item.id as StudioPageKey)}
                className={`shrink-0 min-h-[44px] rounded-full border px-4 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#B8F25C] bg-[#B8F25C] text-[#111113]'
                    : 'border-white/20 bg-[#1C1C20] text-[#F4F4F2]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}

      {activePage === 'articles' ? (
        <PortfolioReaderPage
          business={b}
          articles={portfolioArticles}
          activeArticleId={activeArticleId}
          onSelectArticle={(id) => {
            setActiveArticleId(id);
            scrollToTarget(containerRef, shouldReduceMotion);
          }}
          onBackHome={() => navigatePortfolio('home')}
          onAction={handlePortfolioAction}
          preview={preview}
        />
      ) : activePage === 'secondary' ? (
        <PortfolioColophonPage business={b} onBackHome={() => navigatePortfolio('home')} />
      ) : (
        <>

      {/* 1 · DARK STUDIO MASTHEAD */}
      <section className="relative border-b border-white/12">
        <CalloutBadge n={1} show={showCallouts} />
        <div className={`${container} py-12 @3xl:py-16 grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-center`}>
          <div className="@3xl:col-span-7 space-y-6">
            <p className="font-mono text-[13px] uppercase tracking-wider text-[#B8F25C]">
              {b.city} · Independent Product Design
            </p>
            <h1
              className="text-[42px] @3xl:text-[58px] font-medium leading-[1.02]"
              style={{ fontFamily: b.brand.display }}
            >
              {b.headline.map((line, i) => (
                <m.span
                  key={line}
                  className="block"
                  initial={preview || shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: EASE_EDITORIAL }}
                >
                  {line}
                </m.span>
              ))}
            </h1>
            <p className="text-[17px] text-[#A8A8A2] leading-relaxed max-w-[50ch]">{b.intro}</p>
            <div className="grid grid-cols-3 gap-5 border-t border-white/12 pt-5">
              {b.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-[28px] font-medium text-[#B8F25C] tabular-nums" style={{ fontFamily: b.brand.display }}>
                    {s.value}
                  </div>
                  <div className="mt-1 text-[13px] text-[#A8A8A2]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="@3xl:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-white/14 bg-[#1C1C20]">
              <img
                src={b.images.hero.src}
                alt={b.images.hero.alt}
                data-bang-image-slot="hero"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-4 flex items-center justify-between text-[13px] text-[#A8A8A2] border-t border-white/10">
                <span>14 weeks fastest MVP shipped</span>
                <span className="font-mono text-[#B8F25C]">100% hands-on</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · INTERACTIVE CASE-STUDY WORKBENCH */}
      <section id="portfolio-workbench" className="relative border-b border-white/12 bg-[#161619] py-16">
        <CalloutBadge n={2} show={showCallouts} />
        <div className={`${container} grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-start`}>
          <div className="@3xl:col-span-5 space-y-5">
            <div>
              <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#B8F25C]">
                {b.story.eyebrow}
              </p>
              <h2 className="mt-1 text-[32px] font-medium" style={{ fontFamily: b.brand.display }}>
                Inspect shipped work.
              </h2>
            </div>

            <div className="space-y-2">
              {b.story.steps.map((proj, idx) => {
                const active = caseIdx === idx;
                return (
                  <button
                    key={proj.title}
                    type="button"
                    data-testid={`portfolio-case-${idx}`}
                    onClick={() => setCaseIdx(idx)}
                    className={`relative w-full min-h-[64px] rounded-xl border p-4 text-left cursor-pointer transition-colors ${
                      active ? 'border-[#B8F25C]/60 bg-[#1C1C20]' : 'border-white/10 bg-[#111113] hover:border-white/25'
                    }`}
                  >
                    {active && (
                      <m.span
                        layoutId={preview ? undefined : 'portfolio-case-active'}
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-[#B8F25C]"
                        transition={SPRING_LAYOUT}
                      />
                    )}
                    <div className="flex items-baseline justify-between gap-2 pl-2">
                      <span className="font-mono text-[13px] text-[#B8F25C]">0{idx + 1}</span>
                      <span className="flex-1 text-[17px] font-medium" style={{ fontFamily: b.brand.display }}>
                        {proj.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative @3xl:col-span-7 space-y-5">
            <CalloutBadge n={3} show={showCallouts} />
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'outcome', label: 'Outcome & Metrics' },
                { id: 'shipped', label: 'What Shipped' },
                { id: 'quote', label: 'Founder Quote' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  data-testid={`portfolio-lens-${tab.id}`}
                  onClick={() => setLens(tab.id as 'outcome' | 'shipped' | 'quote')}
                  className={`min-h-[44px] rounded-full border px-4 text-[13px] font-semibold cursor-pointer ${
                    lens === tab.id
                      ? 'border-[#B8F25C] bg-[#B8F25C] text-[#111113]'
                      : 'border-white/15 bg-[#1C1C20] text-[#F4F4F2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/14 bg-[#111113]">
              <img src={activeCase.image.src} alt={activeCase.image.alt} className="w-full aspect-[16/9] object-cover" />
              <div className="p-6 space-y-2 border-t border-white/12">
                {lens === 'outcome' && (
                  <>
                    <div className="font-mono text-[13px] font-semibold text-[#B8F25C]">Measured Impact</div>
                    <p className="text-[18px] font-medium" style={{ fontFamily: b.brand.display }}>{caseOutcomes.metric}</p>
                    <p className="text-[14px] text-[#A8A8A2]">{activeCase.body}</p>
                  </>
                )}
                {lens === 'shipped' && (
                  <>
                    <div className="font-mono text-[13px] font-semibold text-[#B8F25C]">Production Deliverables</div>
                    <p className="text-[18px] font-medium" style={{ fontFamily: b.brand.display }}>{caseOutcomes.shipped}</p>
                  </>
                )}
                {lens === 'quote' && (
                  <>
                    <div className="font-mono text-[13px] font-semibold text-[#B8F25C]">Client Note</div>
                    <p className="text-[20px] italic" style={{ fontFamily: b.brand.display }}>
                      &ldquo;{activeQuote.text}&rdquo;
                    </p>
                    <p className="text-[13px] text-[#A8A8A2]">— {activeQuote.who}</p>
                  </>
                )}
                {!preview && PORTFOLIO_CASE_STUDIES[caseIdx] && (
                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[13px] text-[#A8A8A2]">
                      Case deep-dive · Architecture, constraints &amp; metrics
                    </span>
                    <button
                      type="button"
                      data-testid="studio-article-open-0"
                      onClick={() => openPortfolioArticle(PORTFOLIO_CASE_STUDIES[caseIdx].id)}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#B8F25C]/45 bg-[#B8F25C]/12 px-4 text-[13px] font-semibold text-[#B8F25C] hover:bg-[#B8F25C] hover:text-[#111113] transition-colors cursor-pointer"
                    >
                      <span>Read Full Case Deep-Dive</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {!preview && (
        <PortfolioHomeWritingSection
          business={b}
          onOpenArticle={openPortfolioArticle}
          onOpenPage={(p) => navigatePortfolio(p)}
        />
      )}

      {/* 3 · SPRINT SCOPE BUILDER & FOUNDER CALL */}
      <section id="portfolio-scope" className="relative py-16">
        <CalloutBadge n={4} show={showCallouts} />
        <div className={`${container} grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-start`}>
          <div className="@3xl:col-span-7 space-y-5">
            <div>
              <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#B8F25C]">
                Interactive Sprint Builder
              </p>
              <h2 className="mt-1 text-[32px] font-medium" style={{ fontFamily: b.brand.display }}>
                Pick an engagement shape.
              </h2>
            </div>

            <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-3">
              {scopes.map((sc, idx) => {
                const active = selectedScopeIdx === idx;
                return (
                  <button
                    key={sc.name}
                    type="button"
                    onClick={() => {
                      setSelectedScopeIdx(idx);
                      setBooked(false);
                    }}
                    className={`min-h-[88px] rounded-xl border p-4 text-left cursor-pointer transition-colors ${
                      active
                        ? 'border-[#B8F25C] bg-[#1C1C20]'
                        : 'border-white/12 bg-[#161619] hover:border-white/28'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[17px] font-medium" style={{ fontFamily: b.brand.display }}>{sc.name}</span>
                      <span className="font-mono text-[13px] font-bold text-[#B8F25C]">{sc.price}</span>
                    </div>
                    <p className="mt-1 text-[13px] text-[#A8A8A2]">{sc.detail}</p>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-white/12 bg-[#1C1C20] p-5 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[13px] font-semibold text-[#B8F25C]">
                <Layers className="h-4 w-4" />
                <span>What ships in {activeScope.name}</span>
              </div>
              <ul className="space-y-2 text-[14px] text-[#E4E4E7]">
                {activeScope.weeks.map((wk) => (
                  <li key={wk} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#B8F25C] mt-0.5 shrink-0" />
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside id="portfolio-call" className="relative @3xl:col-span-5 rounded-2xl border border-white/14 bg-[#1C1C20] p-6 space-y-5">
            <CalloutBadge n={5} show={showCallouts} corner="right" />
            <div>
              <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#B8F25C]">
                {b.booking.eyebrow}
              </p>
              <h3 className="mt-1 text-[24px] font-medium" style={{ fontFamily: b.brand.display }}>
                {b.booking.heading}
              </h3>
              <p className="mt-1 text-[14px] text-[#A8A8A2]">{b.booking.note}</p>
            </div>

            <div className="rounded-lg border border-[#B8F25C]/30 bg-[#111113] p-3.5 text-[13px]">
              <span className="text-[#A8A8A2]">Selected scope:</span>{' '}
              <strong className="text-[#B8F25C]">{activeScope.name} ({activeScope.price})</strong>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {b.booking.options.slice(0, 4).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setCallSlot(opt);
                    setBooked(false);
                  }}
                  className={`min-h-[44px] rounded-full border px-3 text-[13px] font-semibold cursor-pointer ${
                    callSlot === opt
                      ? 'border-[#B8F25C] bg-[#B8F25C] text-[#111113]'
                      : 'border-white/15 bg-[#111113] text-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {booked ? (
              <div className="rounded-xl border border-[#B8F25C]/40 bg-[#111113] p-4 text-[14px]">
                <strong>Requested ({callSlot}):</strong> {activeScope.name}. {b.booking.confirm}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setBooked(true)}
                className="w-full min-h-[48px] rounded-full bg-[#B8F25C] text-[15px] font-semibold text-[#111113] cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Request {callSlot} Call</span>
                </span>
              </button>
            )}
          </aside>
        </div>
      </section>
        </>
      )}

      <footer className="border-t border-white/12 py-8 text-[13px] text-[#A8A8A2]">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4`}>
          <span>© 2026 {b.name} · {b.address}</span>
          <span>Concept preview for Colon Hyphen Bracket</span>
        </div>
      </footer>
    </div>
  );
}

export function DispatchStudioSite(props: StudioVariantProps) {
  switch (props.business.id) {
    case 'taco':
      return <TacoStudioSite {...props} />;
    case 'bank':
      return <BankStudioSite {...props} />;
    case 'salon':
      return <SalonStudioSite {...props} />;
    case 'office':
      return <OfficeStudioSite {...props} />;
    case 'portfolio':
      return <PortfolioStudioSite {...props} />;
  }
}
