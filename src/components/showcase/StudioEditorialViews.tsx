'use client';

import React, { useMemo, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Coffee,
  Layers,
  Lock,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { EASE_EDITORIAL } from '@/lib/motion/tokens';
import type { ShowcaseBusiness } from './showcase-content';
import {
  BANK_OFFICERS,
  FDIC_CATEGORIES,
  OFFICE_2026_DEADLINES,
  PORTFOLIO_CASE_STUDIES,
  PORTFOLIO_COLOPHON,
  PORTFOLIO_ESSAYS,
  PORTFOLIO_SPRINT_DAYS,
  SALON_STYLIST_PROFILES,
  STUDIO_EDITORIAL_BY_ID,
  TACO_GROUP_BOXES,
  type StudioArticle,
} from './showcase-articles';

interface HomeEditorialProps {
  business: ShowcaseBusiness;
  onOpenArticle: (articleId: string) => void;
  onOpenPage?: (page: 'articles' | 'secondary') => void;
}

interface ReaderViewProps {
  business: ShowcaseBusiness;
  articles: StudioArticle[];
  activeArticleId: string | null;
  onSelectArticle: (id: string) => void;
  onBackHome: () => void;
  onAction: (action: StudioArticle['ctaAction']) => void;
  preview?: boolean;
}

/* ============================================================================
 * 1 · TACO EDITORIAL VIEWS ("From the 5 AM Comal" + Group Boxes)
 * ========================================================================== */
export function TacoHomeEditorialStrip({ business: b, onOpenArticle, onOpenPage }: HomeEditorialProps) {
  const bundle = STUDIO_EDITORIAL_BY_ID.taco;
  const lead = bundle.articles[0];
  const secondary = bundle.articles.slice(1);

  return (
    <section id="taco-stories" className="border-t border-[#1F1712]/12 bg-[#FFF8EF] py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 @3xl:px-10 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1F1712]/14 pb-5">
          <div className="space-y-1">
            <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
              Counter Zine · Three Stories
            </p>
            <h2 className="text-[32px] font-bold tracking-tight text-balance" style={{ fontFamily: b.brand.display }}>
              {bundle.publicationTitle}
            </h2>
            <p className="max-w-[60ch] text-[15px] text-[#5E4E43] text-pretty">{bundle.publicationSubtitle}</p>
          </div>
          {onOpenPage && (
            <button
              type="button"
              onClick={() => onOpenPage('secondary')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1F1712]/25 bg-white px-5 text-[14px] font-semibold text-[#1F1712] hover:border-[#1F1712] cursor-pointer"
            >
              <Users className="h-4 w-4 text-[#C2410C]" />
              <span>Group Taco Boxes (10–40ppl)</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-6 items-stretch">
          {/* Lead illustrated counter dispatch */}
          <article className="@3xl:col-span-7 flex flex-col justify-between overflow-hidden rounded-3xl border border-[#1F1712]/14 bg-[#FBEBD7]">
            {lead.image && (
              <img
                src={lead.image}
                alt={lead.imageAlt || lead.title}
                className="w-full aspect-[16/9] object-cover border-b border-[#1F1712]/12"
              />
            )}
            <div className="p-6 @3xl:p-8 flex-1 flex flex-col justify-between gap-5">
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[13px] text-[#9A3412]">
                  <span className="font-bold">{lead.eyebrow}</span>
                  <span>·</span>
                  <span>{lead.readTime}</span>
                </div>
                <h3 className="text-[26px] @3xl:text-[30px] font-bold leading-tight text-balance" style={{ fontFamily: b.brand.display }}>
                  {lead.title}
                </h3>
                <p className="max-w-[58ch] text-[15px] leading-relaxed text-[#5E4E43] text-pretty">{lead.dek}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1F1712]/12 pt-4">
                <span className="text-[13px] font-semibold text-[#1F1712]">
                  By {lead.author}, {lead.role}
                </span>
                <button
                  type="button"
                  data-testid="studio-article-open-0"
                  onClick={() => onOpenArticle(lead.id)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#C2410C] px-5 text-[14px] font-semibold text-white hover:bg-[#9A3412] cursor-pointer transition-colors"
                >
                  <span>Read Story</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>

          {/* Stacked Dispatches 02 & 03 */}
          <div className="@3xl:col-span-5 flex flex-col gap-5">
            {secondary.map((art) => (
              <article
                key={art.id}
                className="flex-1 rounded-3xl border border-[#1F1712]/14 bg-white p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[13px] text-[#9A3412]">
                    <span className="font-bold">{art.eyebrow}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-[21px] font-bold leading-snug text-balance" style={{ fontFamily: b.brand.display }}>
                    {art.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#5E4E43] text-pretty">{art.dek}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenArticle(art.id)}
                  className="inline-flex min-h-[44px] self-start items-center gap-1.5 rounded-full border border-[#1F1712]/20 px-4 text-[13px] font-semibold text-[#1F1712] hover:border-[#C2410C] hover:text-[#9A3412] cursor-pointer transition-colors"
                >
                  <span>Read {art.category} Note</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TacoDispatchesPage({
  business: b,
  articles,
  activeArticleId,
  onSelectArticle,
  onBackHome,
  onAction,
}: ReaderViewProps) {
  const current = articles.find((a) => a.id === activeArticleId) ?? articles[0];
  const currentIdx = articles.findIndex((a) => a.id === current.id);
  const nextArticle = articles[(currentIdx + 1) % articles.length];

  return (
    <div className="mx-auto w-full max-w-[1060px] px-5 @3xl:px-10 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          data-testid="studio-article-back"
          onClick={onBackHome}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1F1712]/20 bg-white px-4 text-[14px] font-semibold text-[#1F1712] hover:border-[#1F1712] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Pickup Menu</span>
        </button>

        <nav aria-label="Switch kitchen dispatch" className="flex flex-wrap gap-2">
          {articles.map((art, i) => {
            const on = art.id === current.id;
            return (
              <button
                key={art.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => onSelectArticle(art.id)}
                className={`min-h-[44px] rounded-full border px-4 text-[13px] font-semibold cursor-pointer transition-colors ${
                  on
                    ? 'border-[#1F1712] bg-[#1F1712] text-[#FFF8EF]'
                    : 'border-[#1F1712]/20 bg-white text-[#1F1712] hover:border-[#1F1712]'
                }`}
              >
                0{i + 1} · {art.category}
              </button>
            );
          })}
        </nav>
      </div>

      <article
        data-testid="studio-article-reader"
        className="rounded-3xl border border-[#1F1712]/14 bg-white overflow-hidden"
      >
        {current.image && (
          <img
            src={current.image}
            alt={current.imageAlt || current.title}
            className="w-full max-h-[380px] object-cover border-b border-[#1F1712]/12"
          />
        )}
        <div className="p-6 @3xl:p-12 space-y-8">
          <header className="space-y-3 border-b border-[#1F1712]/12 pb-6">
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[13px] text-[#9A3412]">
              <span className="font-bold">{current.eyebrow}</span>
              <span>·</span>
              <span>{current.date}</span>
              <span>·</span>
              <span>{current.readTime}</span>
            </div>
            <h1 className="text-[32px] @3xl:text-[42px] font-bold leading-[1.08] text-balance" style={{ fontFamily: b.brand.display }}>
              {current.title}
            </h1>
            <p className="max-w-[62ch] text-[18px] leading-relaxed text-[#5E4E43] text-pretty">{current.dek}</p>
            <p className="text-[14px] font-semibold text-[#1F1712]">
              {current.author} — <span className="font-normal text-[#5E4E43]">{current.role}</span>
            </p>
          </header>

          {current.pullQuote && (
            <blockquote className="border-l-4 border-[#C2410C] pl-5 py-1">
              <p className="max-w-[56ch] text-[22px] font-bold leading-snug text-[#1F1712] text-pretty" style={{ fontFamily: b.brand.display }}>
                &ldquo;{current.pullQuote}&rdquo;
              </p>
            </blockquote>
          )}

          <div className="space-y-6 max-w-[62ch]">
            {current.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                {sec.heading && (
                  <h2 className="text-[22px] font-bold text-balance" style={{ fontFamily: b.brand.display }}>
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[17px] leading-[1.7] text-[#352B24] text-pretty">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {current.specBox && (
            <div className="rounded-2xl border-2 border-dashed border-[#1F1712]/25 bg-[#FBEBD7] p-6 space-y-4">
              <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
                {current.specBox.title}
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.specBox.items.map((item) => (
                  <div key={item.label} className="border-t border-[#1F1712]/12 pt-2.5">
                    <dt className="text-[13px] font-semibold text-[#5E4E43]">{item.label}</dt>
                    <dd className="mt-0.5 text-[15px] font-bold text-[#1F1712]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {current.table && (
            <div className="space-y-2">
              <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
                {current.table.caption}
              </div>
              <div
                tabIndex={0}
                role="region"
                aria-label={current.table.caption}
                className="overflow-x-auto rounded-2xl border border-[#1F1712]/14 bg-[#FFF8EF]"
              >
                <table className="w-full min-w-[540px] text-left border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-[#1F1712]/16 bg-[#FBEBD7] font-mono text-[13px]">
                      {current.table.columns.map((col) => (
                        <th key={col} className="py-3 px-4 font-bold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1712]/10">
                    {current.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={`py-3 px-4 ${cIdx === 0 ? 'font-bold text-[#1F1712]' : 'text-[#5E4E43]'}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1F1712]/12 pt-6">
            <button
              type="button"
              onClick={() => onAction(current.ctaAction)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#C2410C] px-6 text-[15px] font-semibold text-white hover:bg-[#9A3412] cursor-pointer transition-colors"
            >
              <span>{current.ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectArticle(nextArticle.id)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1F1712]/20 bg-[#FFF8EF] px-5 text-[14px] font-semibold text-[#1F1712] hover:border-[#1F1712] cursor-pointer"
            >
              <span>Next Dispatch: {nextArticle.category}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </footer>
        </div>
      </article>
    </div>
  );
}

export function TacoGroupBoxesPage({
  business: b,
  onBackHome,
}: {
  business: ShowcaseBusiness;
  onBackHome: () => void;
}) {
  const [headcount, setHeadcount] = useState(16);
  const [includeCoffee, setIncludeCoffee] = useState(true);
  const [heldBoxTicket, setHeldBoxTicket] = useState(false);

  const recommendedBox =
    headcount <= 10 ? TACO_GROUP_BOXES[0] : headcount <= 22 ? TACO_GROUP_BOXES[1] : TACO_GROUP_BOXES[2];
  const coffeePrice = includeCoffee ? 26 : 0;
  const totalBoxPrice = recommendedBox.price + coffeePrice;

  return (
    <div className="mx-auto w-full max-w-[1060px] px-5 @3xl:px-10 py-10 space-y-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1F1712]/20 bg-white px-4 text-[14px] font-semibold text-[#1F1712] hover:border-[#1F1712] cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Counter Menu</span>
      </button>

      <div className="rounded-3xl border border-[#1F1712]/14 bg-white p-6 @3xl:p-10 space-y-8">
        <header className="space-y-2 border-b border-[#1F1712]/12 pb-6">
          <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
            Morning Office &amp; Crew Catering
          </p>
          <h1 className="text-[34px] font-bold text-balance" style={{ fontFamily: b.brand.display }}>
            Feed the whole crew with warm comal boxes.
          </h1>
          <p className="max-w-[60ch] text-[16px] text-[#5E4E43] text-pretty">
            Hot breakfast tacos foil-wrapped individually by tortilla preference with half-pint salsa tubs, plates, and optional East Austin cold brew travelers. Order 45 minutes ahead for East 6th counter pickup.
          </p>
        </header>

        <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-start">
          <div className="@3xl:col-span-7 space-y-5">
            <div>
              <span className="text-[14px] font-bold block mb-2">How many hungry coworkers? ({headcount} people)</span>
              <div className="flex flex-wrap gap-2">
                {[8, 16, 25, 36].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => {
                      setHeadcount(cnt);
                      setHeldBoxTicket(false);
                    }}
                    className={`min-h-[44px] rounded-full border px-4 text-[14px] font-semibold cursor-pointer ${
                      headcount === cnt
                        ? 'border-[#1F1712] bg-[#1F1712] text-[#FFF8EF]'
                        : 'border-[#1F1712]/20 bg-[#FFF8EF] text-[#1F1712]'
                    }`}
                  >
                    {cnt} people
                  </button>
                ))}
              </div>
            </div>

            <label className="inline-flex min-h-[44px] items-center gap-3 rounded-2xl border border-[#1F1712]/15 bg-[#FFF8EF] px-4 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCoffee}
                onChange={(e) => {
                  setIncludeCoffee(e.target.checked);
                  setHeldBoxTicket(false);
                }}
                className="h-4 w-4 accent-[#C2410C]"
              />
              <Coffee className="h-4 w-4 text-[#9A3412]" />
              <span className="text-[14px] font-semibold">Add 96 oz Cold Brew Cambro + Cups (+$26)</span>
            </label>

            <div className="divide-y divide-[#1F1712]/12 border-y border-[#1F1712]/12">
              {TACO_GROUP_BOXES.map((box) => {
                const picked = box.id === recommendedBox.id;
                return (
                  <div key={box.id} className={`py-4 flex items-baseline justify-between gap-4 ${picked ? 'text-[#1F1712]' : 'opacity-70'}`}>
                    <div>
                      <div className="text-[17px] font-bold" style={{ fontFamily: b.brand.display }}>
                        {box.name} <span className="font-mono text-[13px] font-normal text-[#9A3412]">({box.serves})</span>
                      </div>
                      <p className="text-[14px] text-[#5E4E43]">{box.contents}</p>
                    </div>
                    <span className="font-mono text-[16px] font-bold tabular-nums">${box.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <output className="@3xl:col-span-5 block rounded-3xl border border-[#1F1712]/16 bg-[#FBEBD7] p-6 space-y-4">
            <div className="font-mono text-[13px] font-bold uppercase text-[#9A3412]">Recommended Pickup Crate</div>
            <h2 className="text-[24px] font-bold" style={{ fontFamily: b.brand.display }}>{recommendedBox.name}</h2>
            <p className="text-[14px] text-[#5E4E43]">{recommendedBox.contents}</p>
            <div className="border-t border-[#1F1712]/14 pt-3 flex items-baseline justify-between font-bold text-[18px]">
              <span>Estimated Pre-Tax Total</span>
              <span className="font-mono text-[#9A3412] tabular-nums">${totalBoxPrice.toFixed(2)}</span>
            </div>
            {heldBoxTicket ? (
              <div className="rounded-2xl bg-[#1F1712] p-4 text-[14px] text-[#FFF8EF]">
                <strong>Ticket #ET-BOX reserved.</strong> Ready 45 min prior at 1708 E 6th counter.
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setHeldBoxTicket(true)}
                className="w-full min-h-[48px] rounded-full bg-[#C2410C] text-[15px] font-semibold text-white hover:bg-[#9A3412] cursor-pointer"
              >
                Reserve {recommendedBox.name}
              </button>
            )}
          </output>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 2 · BANK EDITORIAL VIEWS ("Gillespie County Treasury & Ag Notes" + FDIC Safety)
 * ========================================================================== */
export function BankHomeBriefingsLedger({ business: b, onOpenArticle, onOpenPage }: HomeEditorialProps) {
  const bundle = STUDIO_EDITORIAL_BY_ID.bank;

  return (
    <section id="bank-briefings" className="border-y border-[#0B1F3A]/12 bg-white py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 @3xl:px-10 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
              Customer Advisory Ledger · Issues 46–48
            </p>
            <h2 className="text-[32px] font-semibold text-balance" style={{ fontFamily: b.brand.display }}>
              {bundle.publicationTitle}
            </h2>
            <p className="max-w-[62ch] text-[15px] text-[#44546A] text-pretty">{bundle.publicationSubtitle}</p>
          </div>
          {onOpenPage && (
            <button
              type="button"
              onClick={() => onOpenPage('secondary')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[#0B1F3A]/20 bg-[#EEF3FA] px-4 text-[14px] font-semibold text-[#0B1F3A] hover:border-[#1D4ED8] cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-[#1D4ED8]" />
              <span>FDIC Coverage &amp; Wire Rules</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-[#0B1F3A]/12 border-y border-[#0B1F3A]/15">
          {bundle.articles.map((art, idx) => (
            <article key={art.id} className="py-6 grid grid-cols-1 @3xl:grid-cols-12 gap-6 items-center">
              <div className="@3xl:col-span-3 space-y-1">
                <div className="font-mono text-[13px] font-semibold text-[#1D4ED8]">{art.eyebrow}</div>
                <div className="text-[13px] text-[#44546A]">
                  {art.author} · {art.readTime}
                </div>
              </div>
              <div className="@3xl:col-span-6 space-y-1.5">
                <h3 className="text-[22px] font-semibold leading-snug text-balance" style={{ fontFamily: b.brand.display }}>
                  {art.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#44546A] text-pretty">{art.dek}</p>
              </div>
              <div className="@3xl:col-span-3 flex @3xl:justify-end">
                <button
                  type="button"
                  data-testid={idx === 0 ? 'studio-article-open-0' : undefined}
                  onClick={() => onOpenArticle(art.id)}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[#0B1F3A]/22 bg-white px-4 text-[14px] font-semibold text-[#0B1F3A] hover:border-[#1D4ED8] hover:text-[#1D4ED8] cursor-pointer"
                >
                  <span>Read Briefing</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BankBriefingsPage({
  business: b,
  articles,
  activeArticleId,
  onSelectArticle,
  onBackHome,
  onAction,
}: ReaderViewProps) {
  const current = articles.find((a) => a.id === activeArticleId) ?? articles[0];

  return (
    <div className="mx-auto w-full max-w-[1160px] px-5 @3xl:px-10 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#0B1F3A]/12 pb-5">
        <button
          type="button"
          data-testid="studio-article-back"
          onClick={onBackHome}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[#0B1F3A]/20 bg-white px-4 text-[14px] font-semibold text-[#0B1F3A] hover:border-[#1D4ED8] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Bank Home</span>
        </button>

        <nav aria-label="Switch bank briefing" className="flex flex-wrap gap-2">
          {articles.map((art) => {
            const on = art.id === current.id;
            return (
              <button
                key={art.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => onSelectArticle(art.id)}
                className={`min-h-[44px] rounded-[6px] border px-3.5 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                    : 'border-[#0B1F3A]/18 bg-white text-[#0B1F3A] hover:border-[#1D4ED8]'
                }`}
              >
                {art.category}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-10 items-start" data-testid="studio-article-reader">
        <article className="@3xl:col-span-8 space-y-6 rounded-xl border border-[#0B1F3A]/14 bg-white p-6 @3xl:p-10">
          <header className="space-y-3 border-b border-[#0B1F3A]/12 pb-6">
            <div className="font-mono text-[13px] font-semibold text-[#1D4ED8]">
              {current.eyebrow} · {current.date} · {current.readTime}
            </div>
            <h1 className="text-[32px] @3xl:text-[40px] font-semibold leading-[1.1] text-balance" style={{ fontFamily: b.brand.display }}>
              {current.title}
            </h1>
            <p className="max-w-[60ch] text-[17px] leading-relaxed text-[#44546A] text-pretty">{current.dek}</p>
            <div className="text-[14px] font-semibold text-[#0B1F3A]">
              {current.author} <span className="font-normal text-[#44546A]">· {current.role}</span>
            </div>
          </header>

          {current.image && (
            <img
              src={current.image}
              alt={current.imageAlt || current.title}
              className="w-full aspect-[16/9] object-cover rounded-lg border border-[#0B1F3A]/12"
            />
          )}

          {current.pullQuote && (
            <blockquote className="border-l-2 border-[#1D4ED8] pl-4 py-1">
              <p className="max-w-[56ch] text-[20px] italic text-[#0B1F3A] text-pretty" style={{ fontFamily: b.brand.display }}>
                &ldquo;{current.pullQuote}&rdquo;
              </p>
            </blockquote>
          )}

          <div className="space-y-5 max-w-[62ch]">
            {current.sections.map((sec, i) => (
              <section key={i} className="space-y-2.5">
                {sec.heading && (
                  <h2 className="text-[22px] font-semibold text-balance" style={{ fontFamily: b.brand.display }}>
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-[16px] leading-[1.7] text-[#22324A] text-pretty">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {current.table && (
            <div className="space-y-2 pt-2">
              <div className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                {current.table.caption}
              </div>
              <div
                tabIndex={0}
                role="region"
                aria-label={current.table.caption}
                className="overflow-x-auto rounded-lg border border-[#0B1F3A]/16"
              >
                <table className="w-full min-w-[540px] text-left border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-[#0B1F3A]/15 bg-[#EEF3FA] font-mono text-[13px]">
                      {current.table.columns.map((col) => (
                        <th key={col} className="py-3 px-4 font-semibold">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0B1F3A]/10">
                    {current.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={`py-3 px-4 ${cIdx === 0 ? 'font-semibold text-[#0B1F3A]' : 'text-[#44546A]'}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="border-t border-[#0B1F3A]/12 pt-5">
            <button
              type="button"
              onClick={() => onAction(current.ctaAction)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-[6px] bg-[#1D4ED8] px-6 text-[15px] font-semibold text-white cursor-pointer"
            >
              <span>{current.ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </article>

        {/* Institutional Officer Desk Sidebar */}
        <aside className="@3xl:col-span-4 space-y-5 @3xl:sticky @3xl:top-20">
          {current.checklist && (
            <div className="rounded-xl border border-[#0B1F3A]/15 bg-[#EEF3FA] p-5 space-y-3">
              <div className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
                {current.checklist.title}
              </div>
              <ul className="space-y-2 text-[14px] text-[#0B1F3A]">
                {current.checklist.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-pretty">
                    <Check className="h-4 w-4 text-[#1D4ED8] mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="rounded-xl border border-[#0B1F3A]/15 bg-white p-5 space-y-4">
            <div className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
              Direct Fredericksburg Officers
            </div>
            <div className="divide-y divide-[#0B1F3A]/10 text-[14px]">
              {BANK_OFFICERS.map((off) => (
                <div key={off.name} className="py-2.5 flex items-baseline justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[#0B1F3A]">{off.name}</div>
                    <div className="text-[13px] text-[#44546A]">{off.specialty}</div>
                  </div>
                  <span className="font-mono text-[13px] font-bold text-[#1D4ED8] shrink-0">{off.ext}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#0B1F3A]/12 pt-3 font-mono text-[13px] text-[#44546A]">
              ABA Routing: <strong className="text-[#0B1F3A]">1149-0284-1</strong>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function BankFdicSafetyPage({
  business: b,
  onBackHome,
}: {
  business: ShowcaseBusiness;
  onBackHome: () => void;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['single', 'joint', 'business']);

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const totalCovered = FDIC_CATEGORIES.filter((c) => selectedCategories.includes(c.id)).reduce(
    (sum, c) => sum + c.coverageLimit,
    0
  );

  return (
    <div className="mx-auto w-full max-w-[1060px] px-5 @3xl:px-10 py-10 space-y-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-[6px] border border-[#0B1F3A]/20 bg-white px-4 text-[14px] font-semibold text-[#0B1F3A] hover:border-[#1D4ED8] cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Bank Home</span>
      </button>

      <div className="rounded-xl border border-[#0B1F3A]/15 bg-white p-6 @3xl:p-10 space-y-8">
        <header className="space-y-2 border-b border-[#0B1F3A]/12 pb-6">
          <div className="flex items-center gap-2 font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
            <ShieldCheck className="h-4 w-4" />
            <span>Member FDIC · Routing #1149-0284-1</span>
          </div>
          <h1 className="text-[34px] font-semibold text-balance" style={{ fontFamily: b.brand.display }}>
            FDIC Coverage Estimator &amp; Wire Protection Protocol
          </h1>
          <p className="max-w-[62ch] text-[16px] text-[#44546A] text-pretty">
            FDIC insurance covers $250,000 per depositor, per ownership category. Select the account registrations your family or Hill Country business maintains to inspect your insured ceiling.
          </p>
        </header>

        <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-start">
          <div className="@3xl:col-span-7 space-y-3">
            {FDIC_CATEGORIES.map((cat) => {
              const checked = selectedCategories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className={`flex min-h-[60px] items-start justify-between gap-4 rounded-lg border p-4 cursor-pointer ${
                    checked ? 'border-[#1D4ED8] bg-[#EEF3FA]' : 'border-[#0B1F3A]/15 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(cat.id)}
                      className="mt-1 h-4 w-4 accent-[#1D4ED8]"
                    />
                    <div>
                      <div className="text-[15px] font-semibold text-[#0B1F3A]">{cat.label}</div>
                      <div className="text-[13px] text-[#44546A]">{cat.note}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[14px] font-bold text-[#1D4ED8] shrink-0">
                    +${(cat.coverageLimit / 1000).toFixed(0)}k
                  </span>
                </label>
              );
            })}
          </div>

          <output
            data-testid="bank-fdic-output"
            className="@3xl:col-span-5 block rounded-xl border border-[#0B1F3A]/15 bg-[#EEF3FA] p-6 space-y-4"
          >
            <div className="font-mono text-[13px] font-semibold uppercase text-[#1D4ED8]">
              Combined Insured Deposit Ceiling
            </div>
            <div className="text-[42px] font-semibold tabular-nums leading-none" style={{ fontFamily: b.brand.display }}>
              ${totalCovered.toLocaleString()}
            </div>
            <p className="text-[14px] text-[#44546A] text-pretty">
              Across <strong>{selectedCategories.length}</strong> distinct ownership categories held at Hill Country Community Bank. Need multi-million municipal sweep coverage? Ask Hannah Mueller on Ext. 204.
            </p>
            <div className="border-t border-[#0B1F3A]/12 pt-3 space-y-1.5 text-[13px] text-[#0B1F3A]">
              <div className="font-semibold">Wire Verification Guarantee:</div>
              <p className="text-[#44546A]">
                All outgoing wires over $10,000 require a verified voice callback to your signature-card phone number before release.
              </p>
            </div>
          </output>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 3 · SALON EDITORIAL VIEWS ("The Chair Journal" + Stylist Bios & Formulas)
 * ========================================================================== */
export function SalonHomeJournalIndex({ business: b, onOpenArticle, onOpenPage }: HomeEditorialProps) {
  const bundle = STUDIO_EDITORIAL_BY_ID.salon;

  return (
    <section id="salon-journal" className="border-t border-[#1E1416]/12 bg-[#FBF4F1] py-16">
      <div className="mx-auto w-full max-w-[1160px] px-5 @3xl:px-10 space-y-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#1E1416]/14 pb-6">
          <div className="space-y-1">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[#9D2C57]">
              Editorial Notes · Highlands Studio
            </p>
            <h2 className="text-[36px] font-medium text-balance" style={{ fontFamily: b.brand.display }}>
              {bundle.publicationTitle}
            </h2>
            <p className="max-w-[60ch] text-[15px] text-[#5E4C50] text-pretty">{bundle.publicationSubtitle}</p>
          </div>
          {onOpenPage && (
            <button
              type="button"
              onClick={() => onOpenPage('secondary')}
              className="inline-flex min-h-[44px] items-center gap-2 border border-[#1E1416]/25 bg-white px-5 text-[14px] font-semibold text-[#1E1416] hover:border-[#9D2C57] cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-[#9D2C57]" />
              <span>Meet the 3 Lead Stylists</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-[#1E1416]/14 border-b border-[#1E1416]/14">
          {bundle.articles.map((art, idx) => (
            <article key={art.id} className="py-7 grid grid-cols-1 @3xl:grid-cols-12 gap-6 items-center">
              {art.image && (
                <div className="@3xl:col-span-3">
                  <img
                    src={art.image}
                    alt={art.imageAlt || art.title}
                    className="w-full aspect-[4/3] object-cover border border-[#1E1416]/14"
                  />
                </div>
              )}
              <div className="@3xl:col-span-6 space-y-2">
                <div className="font-mono text-[13px] text-[#9D2C57]">
                  {art.eyebrow} · {art.readTime}
                </div>
                <h3 className="text-[26px] font-medium leading-tight text-balance" style={{ fontFamily: b.brand.display }}>
                  {art.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-[#5E4C50] text-pretty">{art.dek}</p>
              </div>
              <div className="@3xl:col-span-3 flex @3xl:justify-end">
                <button
                  type="button"
                  data-testid={idx === 0 ? 'studio-article-open-0' : undefined}
                  onClick={() => onOpenArticle(art.id)}
                  className="inline-flex min-h-[44px] items-center gap-2 border border-[#1E1416] bg-[#1E1416] px-5 text-[14px] font-semibold text-white hover:bg-[#9D2C57] hover:border-[#9D2C57] cursor-pointer transition-colors"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SalonJournalPage({
  business: b,
  articles,
  activeArticleId,
  onSelectArticle,
  onBackHome,
  onAction,
  preview = false,
}: ReaderViewProps) {
  const shouldReduceMotion = useReducedMotion();
  const current = articles.find((a) => a.id === activeArticleId) ?? articles[0];

  return (
    <div className="mx-auto w-full max-w-[980px] px-5 @3xl:px-10 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E1416]/12 pb-5">
        <button
          type="button"
          data-testid="studio-article-back"
          onClick={onBackHome}
          className="inline-flex min-h-[44px] items-center gap-2 border border-[#1E1416]/20 bg-white px-4 text-[14px] font-semibold text-[#1E1416] hover:border-[#9D2C57] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Studio Overview</span>
        </button>

        <nav aria-label="Switch journal essay" className="flex flex-wrap gap-2">
          {articles.map((art, i) => {
            const on = art.id === current.id;
            return (
              <button
                key={art.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => onSelectArticle(art.id)}
                className={`min-h-[44px] border px-4 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#1E1416] bg-[#1E1416] text-white'
                    : 'border-[#1E1416]/20 bg-white text-[#1E1416] hover:border-[#9D2C57]'
                }`}
              >
                0{i + 1} · {art.category}
              </button>
            );
          })}
        </nav>
      </div>

      <m.article
        key={current.id}
        data-testid="studio-article-reader"
        initial={preview || shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASE_EDITORIAL }}
        className="border border-[#1E1416]/14 bg-white p-6 @3xl:p-12 space-y-8"
      >
        <header className="space-y-4 border-b border-[#1E1416]/12 pb-6">
          <div className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#9D2C57]">
            {current.eyebrow} · {current.readTime}
          </div>
          <h1 className="text-[36px] @3xl:text-[46px] font-medium leading-[1.06] text-balance" style={{ fontFamily: b.brand.display }}>
            {current.title}
          </h1>
          <p className="max-w-[58ch] text-[18px] leading-relaxed text-[#5E4C50] text-pretty">{current.dek}</p>
          <p className="text-[14px] text-[#1E1416] font-medium">
            Written by {current.author} — <span className="text-[#5E4C50]">{current.role}</span>
          </p>
        </header>

        {current.image && (
          <img
            src={current.image}
            alt={current.imageAlt || current.title}
            className="w-full max-h-[380px] object-cover border border-[#1E1416]/14"
          />
        )}

        {current.pullQuote && (
          <blockquote className="border-l-2 border-[#9D2C57] pl-5 py-1">
            <p className="max-w-[52ch] text-[24px] italic leading-snug text-[#1E1416] text-pretty" style={{ fontFamily: b.brand.display }}>
              &ldquo;{current.pullQuote}&rdquo;
            </p>
          </blockquote>
        )}

        <div className="space-y-6 max-w-[60ch]">
          {current.sections.map((sec, idx) => (
            <section key={idx} className="space-y-2.5">
              {sec.heading && (
                <h2 className="text-[24px] font-medium text-balance" style={{ fontFamily: b.brand.display }}>
                  {sec.heading}
                </h2>
              )}
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[16px] leading-[1.75] text-[#2F2225] text-pretty">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {current.specBox && (
          <div className="border border-[#1E1416]/14 bg-[#FBF4F1] p-6 space-y-3">
            <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9D2C57]">
              {current.specBox.title}
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.specBox.items.map((item) => (
                <div key={item.label}>
                  <dt className="text-[13px] font-semibold text-[#5E4C50]">{item.label}</dt>
                  <dd className="text-[15px] font-medium text-[#1E1416]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {current.table && (
          <div className="space-y-2">
            <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9D2C57]">
              {current.table.caption}
            </div>
            <div
              tabIndex={0}
              role="region"
              aria-label={current.table.caption}
              className="overflow-x-auto border border-[#1E1416]/14"
            >
              <table className="w-full min-w-[540px] text-left border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-[#1E1416]/16 bg-[#F2E3DE] font-mono text-[13px]">
                    {current.table.columns.map((col) => (
                      <th key={col} className="py-3 px-4 font-semibold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E1416]/10">
                  {current.table.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`py-3 px-4 ${cIdx === 0 ? 'font-semibold text-[#1E1416]' : 'text-[#5E4C50]'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="border-t border-[#1E1416]/12 pt-6">
          <button
            type="button"
            onClick={() => onAction(current.ctaAction)}
            className="inline-flex min-h-[48px] items-center gap-2 bg-[#9D2C57] px-6 text-[15px] font-semibold text-white hover:bg-[#1E1416] cursor-pointer transition-colors"
          >
            <span>{current.ctaLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </m.article>
    </div>
  );
}

export function SalonStylistsPage({
  business: b,
  onBackHome,
  onBookStylist,
}: {
  business: ShowcaseBusiness;
  onBackHome: () => void;
  onBookStylist: (stylistValue: string) => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[1160px] px-5 @3xl:px-10 py-10 space-y-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex min-h-[44px] items-center gap-2 border border-[#1E1416]/20 bg-white px-4 text-[14px] font-semibold text-[#1E1416] hover:border-[#9D2C57] cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Chair Matcher</span>
      </button>

      <header className="space-y-2 border-b border-[#1E1416]/14 pb-6">
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[#9D2C57]">
          Five Highland Chairs · Zero Commission Rushes
        </p>
        <h1 className="text-[38px] font-medium text-balance" style={{ fontFamily: b.brand.display }}>
          Senior Stylists &amp; Signature Formulas
        </h1>
      </header>

      <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-6">
        {SALON_STYLIST_PROFILES.map((st) => (
          <article key={st.name} className="border border-[#1E1416]/14 bg-white flex flex-col justify-between">
            <div>
              <img src={st.image} alt={st.imageAlt} className="w-full aspect-[4/3] object-cover border-b border-[#1E1416]/12" />
              <div className="p-6 space-y-3">
                <div className="font-mono text-[13px] font-semibold text-[#9D2C57]">{st.role}</div>
                <h2 className="text-[26px] font-medium" style={{ fontFamily: b.brand.display }}>{st.name}</h2>
                <p className="text-[14px] font-semibold text-[#1E1416]">{st.specialty}</p>
                <p className="text-[14px] leading-relaxed text-[#5E4C50] text-pretty">{st.bio}</p>
                <div className="border-t border-[#1E1416]/12 pt-3 text-[13px]">
                  <span className="font-semibold text-[#1E1416]">Signature approach:</span>{' '}
                  <span className="text-[#5E4C50]">{st.favoriteFormula}</span>
                </div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                type="button"
                onClick={() => onBookStylist(st.matcherValue)}
                className="w-full min-h-[44px] bg-[#1E1416] text-[14px] font-semibold text-white hover:bg-[#9D2C57] cursor-pointer transition-colors"
              >
                Reserve with {st.name}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * 4 · OFFICE EDITORIAL VIEWS ("Plain-English Client Tax Memos" + Deadlines)
 * ========================================================================== */
export function OfficeHomeMemosSection({ onOpenArticle, onOpenPage }: HomeEditorialProps) {
  const bundle = STUDIO_EDITORIAL_BY_ID.office;
  const [filterCat, setFilterCat] = useState<'All' | 'S-Corp & LLC' | 'Payroll' | 'Bookkeeping' | 'IRS Notices'>('All');

  const visibleMemos = useMemo(
    () => (filterCat === 'All' ? bundle.articles : bundle.articles.filter((a) => a.category === filterCat)),
    [bundle.articles, filterCat]
  );

  return (
    <section id="office-memos" className="border-y border-[#102A43]/12 bg-white py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 @3xl:px-10 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
              Ohio Small-Business Advisory Binder
            </p>
            <h2 className="text-[32px] font-bold text-balance">{bundle.publicationTitle}</h2>
            <p className="max-w-[62ch] text-[15px] text-[#486581] text-pretty">{bundle.publicationSubtitle}</p>
          </div>
          {onOpenPage && (
            <button
              type="button"
              onClick={() => onOpenPage('secondary')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border border-[#102A43]/20 bg-[#F7F9FC] px-4 text-[14px] font-semibold text-[#102A43] hover:border-[#C2410C] cursor-pointer"
            >
              <Calendar className="h-4 w-4 text-[#C2410C]" />
              <span>2026 Federal &amp; Ohio Deadlines</span>
            </button>
          )}
        </div>

        {/* Category Filter Bar (Shape + Check indicator, never color alone) */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter CPA memos by topic">
          {(['All', 'S-Corp & LLC', 'Payroll', 'Bookkeeping', 'IRS Notices'] as const).map((cat) => {
            const on = filterCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCat(cat)}
                className={`inline-flex min-h-[44px] items-center gap-1.5 rounded-[4px] border px-4 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#102A43] border-b-4 bg-[#102A43] text-white'
                    : 'border-[#102A43]/20 bg-[#F7F9FC] text-[#102A43] hover:border-[#102A43]'
                }`}
              >
                {on && <Check className="h-3.5 w-3.5" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-5">
          {visibleMemos.map((memo, idx) => (
            <article
              key={memo.id}
              className="rounded border border-[#102A43]/15 bg-[#F7F9FC] p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[13px]">
                  <span className="font-bold text-[#9A3412]">{memo.eyebrow}</span>
                  <span className="text-[#486581]">{memo.readTime}</span>
                </div>
                <h3 className="text-[20px] font-bold leading-snug text-balance">{memo.title}</h3>
                {memo.bottomLine && (
                  <p className="rounded bg-white border border-[#102A43]/10 p-3 text-[13px] font-medium text-[#102A43] text-pretty">
                    {memo.bottomLine}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-[13px] text-[#486581]">{memo.author}</span>
                <button
                  type="button"
                  data-testid={idx === 0 ? 'studio-article-open-0' : undefined}
                  onClick={() => onOpenArticle(memo.id)}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-[4px] bg-[#102A43] px-4 text-[13px] font-semibold text-white hover:bg-[#C2410C] cursor-pointer transition-colors"
                >
                  <span>Read Full Memo</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OfficeMemosPage({
  articles,
  activeArticleId,
  onSelectArticle,
  onBackHome,
  onAction,
}: ReaderViewProps) {
  const current = articles.find((a) => a.id === activeArticleId) ?? articles[0];

  return (
    <div className="mx-auto w-full max-w-[1060px] px-5 @3xl:px-10 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#102A43]/12 pb-5">
        <button
          type="button"
          data-testid="studio-article-back"
          onClick={onBackHome}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border border-[#102A43]/20 bg-white px-4 text-[14px] font-semibold text-[#102A43] hover:border-[#C2410C] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Estimator</span>
        </button>

        <nav aria-label="Switch CPA advisory memo" className="flex flex-wrap gap-2">
          {articles.map((art) => {
            const on = art.id === current.id;
            return (
              <button
                key={art.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => onSelectArticle(art.id)}
                className={`min-h-[44px] rounded-[4px] border px-3.5 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#102A43] bg-[#102A43] text-white'
                    : 'border-[#102A43]/20 bg-white text-[#102A43] hover:border-[#C2410C]'
                }`}
              >
                {art.category}
              </button>
            );
          })}
        </nav>
      </div>

      <article
        data-testid="studio-article-reader"
        className="rounded border border-[#102A43]/15 bg-white p-6 @3xl:p-10 space-y-7"
      >
        <header className="space-y-3 border-b border-[#102A43]/12 pb-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[13px]">
            <span className="font-bold text-[#9A3412]">{current.eyebrow}</span>
            <span className="text-[#486581]">· {current.date} · {current.readTime}</span>
          </div>
          <h1 className="text-[32px] @3xl:text-[40px] font-bold leading-[1.08] text-balance">{current.title}</h1>
          <p className="max-w-[62ch] text-[17px] text-[#486581] leading-relaxed text-pretty">{current.dek}</p>
          <p className="text-[14px] font-semibold text-[#102A43]">
            {current.author} <span className="font-normal text-[#486581]">· {current.role}</span>
          </p>
        </header>

        {current.bottomLine && (
          <div className="rounded border-l-4 border-[#C2410C] bg-[#E8EEF6] p-5 space-y-1">
            <div className="font-mono text-[13px] font-bold uppercase text-[#9A3412]">Executive Summary</div>
            <p className="text-[16px] font-semibold text-[#102A43] text-pretty">{current.bottomLine}</p>
          </div>
        )}

        <div className="space-y-5 max-w-[64ch]">
          {current.sections.map((sec, idx) => (
            <section key={idx} className="space-y-2.5">
              {sec.heading && <h2 className="text-[21px] font-bold text-balance">{sec.heading}</h2>}
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-[16px] leading-[1.7] text-[#243B53] text-pretty">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        {current.checklist && (
          <div className="rounded border border-[#102A43]/15 bg-[#F7F9FC] p-6 space-y-3">
            <div className="font-mono text-[13px] font-bold uppercase text-[#9A3412]">{current.checklist.title}</div>
            <ul className="space-y-2 text-[14px] text-[#102A43]">
              {current.checklist.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-pretty">
                  <Check className="h-4 w-4 text-[#C2410C] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {current.table && (
          <div className="space-y-2">
            <div className="font-mono text-[13px] font-bold uppercase text-[#9A3412]">{current.table.caption}</div>
            <div
              tabIndex={0}
              role="region"
              aria-label={current.table.caption}
              className="overflow-x-auto rounded border border-[#102A43]/16"
            >
              <table className="w-full min-w-[540px] text-left border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-[#102A43]/15 bg-[#E8EEF6] font-mono text-[13px]">
                    {current.table.columns.map((col) => (
                      <th key={col} className="py-3 px-4 font-bold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#102A43]/10">
                  {current.table.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={`py-3 px-4 font-mono tabular-nums ${cIdx === 0 ? 'font-bold text-[#102A43]' : 'text-[#486581]'}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="border-t border-[#102A43]/12 pt-5">
          <button
            type="button"
            onClick={() => onAction(current.ctaAction)}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-[4px] bg-[#C2410C] px-6 text-[15px] font-semibold text-white cursor-pointer"
          >
            <span>{current.ctaLabel}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </article>
    </div>
  );
}

export function OfficeDeadlinesPage({ onBackHome }: { onBackHome: () => void }) {
  return (
    <div className="mx-auto w-full max-w-[1060px] px-5 @3xl:px-10 py-10 space-y-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-[4px] border border-[#102A43]/20 bg-white px-4 text-[14px] font-semibold text-[#102A43] hover:border-[#C2410C] cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Flat-Fee Estimator</span>
      </button>

      <div className="rounded border border-[#102A43]/15 bg-white p-6 @3xl:p-10 space-y-8">
        <header className="space-y-2 border-b border-[#102A43]/12 pb-6">
          <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
            Columbus &amp; Federal Compliance Reference
          </p>
          <h1 className="text-[32px] font-bold text-balance">2026 Federal, Ohio &amp; RITA Filing Calendar</h1>
          <p className="max-w-[62ch] text-[15px] text-[#486581] text-pretty">
            Monthly Brightline clients never track these dates alone—our team prepares W-2s, K-1s, Ohio IT 1040s, and RITA filings 14 days ahead of each cutoff.
          </p>
        </header>

        <div
          tabIndex={0}
          role="region"
          aria-label="2026 Federal and Ohio tax deadlines"
          className="overflow-x-auto rounded border border-[#102A43]/16"
        >
          <table className="w-full min-w-[560px] text-left border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-[#102A43]/15 bg-[#E8EEF6] font-mono text-[13px]">
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-4">Required Filing</th>
                <th className="py-3 px-4">Applies To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#102A43]/10">
              {OFFICE_2026_DEADLINES.map((row) => (
                <tr key={row.filing}>
                  <td className="py-3 px-4 font-mono font-bold text-[#9A3412] whitespace-nowrap">{row.date}</td>
                  <td className="py-3 px-4 font-semibold text-[#102A43]">{row.jurisdiction}</td>
                  <td className="py-3 px-4 font-medium">{row.filing}</td>
                  <td className="py-3 px-4 text-[#486581]">{row.whoNeedsIt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded border border-[#102A43]/15 bg-[#F7F9FC] p-5 flex items-start gap-3">
          <Lock className="h-5 w-5 text-[#C2410C] shrink-0 mt-0.5" />
          <div className="text-[14px] text-[#243B53] text-pretty">
            <strong>Encrypted Portal Security:</strong> Never email unencrypted W-2 PDFs or SSNs. All tax documents travel via Brightline’s SOC-2 encrypted vault under Ohio CPA Firm Permit <strong>#OH-44912</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
 * 5 · PORTFOLIO EDITORIAL VIEWS ("Case Deep-Dives + Design Essays + Colophon")
 * ========================================================================== */
export function PortfolioHomeWritingSection({ business: b, onOpenArticle, onOpenPage }: HomeEditorialProps) {
  return (
    <section id="portfolio-writing" className="border-t border-white/12 bg-[#111113] py-16">
      <div className="mx-auto w-full max-w-[1200px] px-5 @3xl:px-10 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/12 pb-6">
          <div className="space-y-1">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#B8F25C]">
              Writing &amp; Field Notes
            </p>
            <h2 className="text-[32px] font-medium text-balance" style={{ fontFamily: b.brand.display }}>
              Notes on Small-Team Product Design
            </h2>
            <p className="max-w-[58ch] text-[15px] text-[#A8A8A2] text-pretty">
              Practical essays alongside detailed architecture write-ups for Fieldnote, Ledgerly, and Parkside.
            </p>
          </div>
          {onOpenPage && (
            <button
              type="button"
              onClick={() => onOpenPage('secondary')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-[#1C1C20] px-5 text-[14px] font-semibold text-white hover:border-[#B8F25C] cursor-pointer"
            >
              <Layers className="h-4 w-4 text-[#B8F25C]" />
              <span>10-Day Sprint Breakdown &amp; Colophon</span>
            </button>
          )}
        </div>

        <div className="divide-y divide-white/12 border-b border-white/12">
          {PORTFOLIO_ESSAYS.map((essay, idx) => (
            <button
              key={essay.id}
              type="button"
              onClick={() => onOpenArticle(essay.id)}
              className="w-full py-6 text-left grid grid-cols-1 @3xl:grid-cols-12 gap-4 items-center group hover:bg-[#161619] px-3 transition-colors cursor-pointer"
            >
              <div className="@3xl:col-span-3 font-mono text-[13px] text-[#B8F25C]">
                0{idx + 1} · {essay.date} · {essay.readTime}
              </div>
              <div className="@3xl:col-span-7 space-y-1">
                <div className="text-[22px] font-medium text-[#F4F4F2] group-hover:text-[#B8F25C] transition-colors" style={{ fontFamily: b.brand.display }}>
                  {essay.title}
                </div>
                <p className="text-[14px] text-[#A8A8A2] text-pretty">{essay.dek}</p>
              </div>
              <div className="@3xl:col-span-2 flex @3xl:justify-end">
                <span className="inline-flex items-center gap-1.5 font-mono text-[13px] font-semibold text-[#F4F4F2] group-hover:text-[#B8F25C]">
                  <span>Read Note</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PortfolioReaderPage({
  business: b,
  articles,
  activeArticleId,
  onSelectArticle,
  onBackHome,
  onAction,
}: ReaderViewProps) {
  const current = articles.find((a) => a.id === activeArticleId) ?? articles[0];

  return (
    <div className="mx-auto w-full max-w-[1060px] px-5 @3xl:px-10 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 pb-5">
        <button
          type="button"
          data-testid="studio-article-back"
          onClick={onBackHome}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-[#1C1C20] px-4 text-[14px] font-semibold text-white hover:border-[#B8F25C] cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Case Workbench</span>
        </button>

        <nav aria-label="Switch case study or essay" className="flex flex-wrap gap-2">
          {articles.map((art) => {
            const on = art.id === current.id;
            const shortLabel = art.id.startsWith('case-')
              ? art.title.split(':')[0]
              : art.category;
            return (
              <button
                key={art.id}
                type="button"
                aria-current={on ? 'page' : undefined}
                onClick={() => onSelectArticle(art.id)}
                className={`min-h-[44px] rounded-full border px-4 text-[13px] font-semibold cursor-pointer ${
                  on
                    ? 'border-[#B8F25C] bg-[#B8F25C] text-[#111113]'
                    : 'border-white/15 bg-[#1C1C20] text-[#F4F4F2] hover:border-white/40'
                }`}
              >
                {shortLabel}
              </button>
            );
          })}
        </nav>
      </div>

      <article
        data-testid="studio-article-reader"
        className="rounded-2xl border border-white/14 bg-[#161619] overflow-hidden"
      >
        {current.image && (
          <img
            src={current.image}
            alt={current.imageAlt || current.title}
            className="w-full max-h-[380px] object-cover border-b border-white/12"
          />
        )}
        <div className="p-6 @3xl:p-12 space-y-8">
          <header className="space-y-3 border-b border-white/12 pb-6">
            <div className="font-mono text-[13px] font-semibold text-[#B8F25C]">
              {current.eyebrow} · {current.date} · {current.readTime}
            </div>
            <h1 className="text-[32px] @3xl:text-[42px] font-medium leading-[1.08] text-balance" style={{ fontFamily: b.brand.display }}>
              {current.title}
            </h1>
            <p className="max-w-[60ch] text-[18px] leading-relaxed text-[#A8A8A2] text-pretty">{current.dek}</p>
          </header>

          {current.pullQuote && (
            <blockquote className="border-l-2 border-[#B8F25C] pl-5 py-1">
              <p className="max-w-[54ch] text-[22px] italic text-[#F4F4F2] text-pretty" style={{ fontFamily: b.brand.display }}>
                &ldquo;{current.pullQuote}&rdquo;
              </p>
            </blockquote>
          )}

          <div className="space-y-6 max-w-[62ch]">
            {current.sections.map((sec, idx) => (
              <section key={idx} className="space-y-2.5">
                {sec.heading && (
                  <h2 className="text-[22px] font-medium text-[#F4F4F2] text-balance" style={{ fontFamily: b.brand.display }}>
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[17px] leading-[1.7] text-[#E4E4E7] text-pretty">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {current.specBox && (
            <div className="rounded-xl border border-[#B8F25C]/30 bg-[#1C1C20] p-6 space-y-4">
              <div className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#B8F25C]">
                {current.specBox.title}
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {current.specBox.items.map((item) => (
                  <div key={item.label} className="border-t border-white/10 pt-2.5">
                    <dt className="text-[13px] text-[#A8A8A2]">{item.label}</dt>
                    <dd className="mt-0.5 text-[15px] font-semibold text-[#F4F4F2]">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="border-t border-white/12 pt-6">
            <button
              type="button"
              onClick={() => onAction(current.ctaAction)}
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#B8F25C] px-6 text-[15px] font-semibold text-[#111113] cursor-pointer"
            >
              <span>{current.ctaLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export function PortfolioColophonPage({
  business: b,
  onBackHome,
}: {
  business: ShowcaseBusiness;
  onBackHome: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-[1060px] px-5 @3xl:px-10 py-10 space-y-8">
      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-[#1C1C20] px-4 text-[14px] font-semibold text-white hover:border-[#B8F25C] cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Sprint Builder</span>
      </button>

      <div className="rounded-2xl border border-white/14 bg-[#161619] p-6 @3xl:p-10 space-y-8">
        <header className="space-y-2 border-b border-white/12 pb-6">
          <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#B8F25C]">
            How a 2-Week Engagement Works
          </p>
          <h1 className="text-[36px] font-medium text-balance" style={{ fontFamily: b.brand.display }}>
            Day 01 → Day 10 Sprint Schedule &amp; Colophon
          </h1>
        </header>

        <div className="divide-y divide-white/12 border-y border-white/12">
          {PORTFOLIO_SPRINT_DAYS.map((row) => (
            <div key={row.day} className="py-4 grid grid-cols-1 @3xl:grid-cols-12 gap-3 items-baseline">
              <div className="@3xl:col-span-3 font-mono text-[14px] font-semibold text-[#B8F25C]">{row.day}</div>
              <div className="@3xl:col-span-4 text-[18px] font-medium text-[#F4F4F2]" style={{ fontFamily: b.brand.display }}>
                {row.milestone}
              </div>
              <div className="@3xl:col-span-5 text-[14px] text-[#A8A8A2]">{row.output}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PORTFOLIO_COLOPHON.map((c) => (
            <div key={c.label} className="rounded-xl border border-white/12 bg-[#1C1C20] p-4">
              <div className="font-mono text-[13px] text-[#B8F25C]">{c.label}</div>
              <div className="mt-1 text-[15px] text-[#F4F4F2]">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
