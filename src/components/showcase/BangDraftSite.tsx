'use client';

import React, { useState } from 'react';
import { Check, ChevronRight, Clock, MapPin, Phone } from 'lucide-react';
import type { ShowcaseBusiness } from './showcase-content';

function StaticInquiryForm({
  business,
  accentColor,
  buttonInk = '#FFFFFF',
  label = 'Send Inquiry',
  surfaceBg = '#FFFFFF',
  borderColor = 'rgba(0,0,0,0.16)',
  compact = false,
}: {
  business: ShowcaseBusiness;
  accentColor: string;
  buttonInk?: string;
  label?: string;
  surfaceBg?: string;
  borderColor?: string;
  compact?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="rounded-lg border p-4 text-[14px] leading-relaxed"
        style={{ backgroundColor: surfaceBg, borderColor }}
        role="status"
      >
        <div className="flex items-center gap-2 font-semibold">
          <Check className="h-4 w-4 shrink-0" style={{ color: accentColor }} />
          <span>Inquiry saved for {business.name}</span>
        </div>
        <p className="mt-1 opacity-80">
          {business.booking.confirm} Or call {business.phone}.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-3 inline-flex min-h-[44px] items-center text-[13px] font-semibold underline underline-offset-4 cursor-pointer"
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form
      className={compact ? 'space-y-3' : 'space-y-4'}
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <label className="block text-[14px] font-medium">
        <span>Your name</span>
        <input
          required
          type="text"
          placeholder="Alex Rivera"
          className="mt-1 w-full min-h-[44px] rounded border px-3 text-[14px]"
          style={{ backgroundColor: surfaceBg, borderColor }}
        />
      </label>
      <label className="block text-[14px] font-medium">
        <span>Email or phone</span>
        <input
          required
          type="text"
          placeholder="alex@example.com"
          className="mt-1 w-full min-h-[44px] rounded border px-3 text-[14px]"
          style={{ backgroundColor: surfaceBg, borderColor }}
        />
      </label>
      <label className="block text-[14px] font-medium">
        <span>How can we help?</span>
        <textarea
          rows={compact ? 2 : 3}
          placeholder={`Question for ${business.name}...`}
          className="mt-1 w-full rounded border p-3 text-[14px]"
          style={{ backgroundColor: surfaceBg, borderColor }}
        />
      </label>
      <button
        type="submit"
        className="w-full min-h-[44px] rounded px-5 text-[14px] font-semibold cursor-pointer"
        style={{ backgroundColor: accentColor, color: buttonInk, borderRadius: business.brand.radius }}
      >
        {label}
      </button>
    </form>
  );
}

/** 1 · TACO DRAFT: Counter Menu Board (hours bar + split hero + full 3-column paper menu board + 3-photo strip) */
function DraftTacoSite({ b }: { b: ShowcaseBusiness }) {
  return (
    <div
      className="@container min-h-full bg-[#FFFDF9] text-[#1F1712]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="draft"
      data-draft-archetype="taco"
    >
      <div className="bg-[#C2410C] text-white px-5 py-2.5 text-[13px] font-medium">
        <div className="mx-auto max-w-[1080px] flex flex-wrap items-center justify-between gap-2">
          <span>{b.hours}</span>
          <span>Walk-up counter · {b.address}</span>
        </div>
      </div>

      <header className="border-b border-[#1F1712]/12 bg-[#FFF8EF]">
        <div className="mx-auto max-w-[1080px] px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="text-[22px] font-bold tracking-tight" style={{ fontFamily: b.brand.display }} data-bang-slot="businessName">
            {b.name}
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-[14px] font-medium">
            <a href="#draft-taco-menu" className="min-h-[44px] inline-flex items-center hover:underline">Counter Menu</a>
            <a href="#draft-taco-kitchen" className="min-h-[44px] inline-flex items-center hover:underline">Kitchen</a>
            <a href="#draft-taco-contact" className="min-h-[44px] inline-flex items-center hover:underline">Catering &amp; Hours</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-[1080px] px-5 py-10 grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-center">
        <div className="@3xl:col-span-7 space-y-4">
          <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
            {b.city} · Breakfast &amp; Smoked Brisket Tacos
          </p>
          <h1
            className="text-[32px] @3xl:text-[42px] font-bold leading-[1.1]"
            style={{ fontFamily: b.brand.display }}
            data-bang-slot="headline"
          >
            {b.draftHeadline}
          </h1>
          <p className="text-[16px] leading-relaxed text-[#5E4E43] max-w-[54ch]" data-bang-slot="intro">
            {b.draftIntro}
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href="#draft-taco-menu"
              className="inline-flex min-h-[44px] items-center rounded-full bg-[#C2410C] px-6 text-[14px] font-semibold text-white"
            >
              Read Full Menu
            </a>
            <a
              href="#draft-taco-contact"
              className="inline-flex min-h-[44px] items-center rounded-full border border-[#1F1712]/25 px-5 text-[14px] font-semibold text-[#1F1712]"
            >
              Call Counter: {b.phone}
            </a>
          </div>
        </div>
        <div className="@3xl:col-span-5">
          <img
            src={b.images.hero.src}
            alt={b.images.hero.alt}
            data-bang-image-slot="hero"
            className="w-full aspect-[4/3] object-cover rounded-xl border border-[#1F1712]/12"
          />
        </div>
      </section>

      <section id="draft-taco-menu" className="border-y border-[#1F1712]/12 bg-[#FAF4EA] py-12" data-bang-slot="menu">
        <div className="mx-auto max-w-[1080px] px-5 space-y-8">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-[#1F1712] pb-3">
            <h2 className="text-[26px] font-bold" style={{ fontFamily: b.brand.display }}>
              Daily Counter Menu Board
            </h2>
            <span className="font-mono text-[13px] text-[#5E4E43]">Order at the window · Tax extra</span>
          </div>

          <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-8">
            {b.menu.categories.map((cat) => (
              <div key={cat.name} className="rounded-lg border border-[#1F1712]/14 bg-white p-5 space-y-4">
                <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412] border-b border-[#1F1712]/12 pb-2">
                  {cat.name}
                </h3>
                <ul className="divide-y divide-[#1F1712]/10">
                  {cat.items.map((item) => (
                    <li key={item.name} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[15px] font-semibold">{item.name}</span>
                        <span className="font-mono text-[14px] font-bold text-[#9A3412] tabular-nums shrink-0">
                          {item.price}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-[#5E4E43]">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="draft-taco-kitchen" className="mx-auto max-w-[1080px] px-5 py-12 space-y-6">
        <h2 className="text-[24px] font-bold" style={{ fontFamily: b.brand.display }}>
          From the Comal &amp; Smoker
        </h2>
        <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-5">
          {b.story.steps.map((step) => (
            <figure key={step.title} className="space-y-2.5">
              <img
                src={step.image.src}
                alt={step.image.alt}
                className="w-full aspect-[4/3] object-cover rounded-lg border border-[#1F1712]/12"
              />
              <figcaption className="text-[15px] font-semibold">{step.title}</figcaption>
              <p className="text-[14px] text-[#5E4E43] leading-relaxed">{step.body}</p>
            </figure>
          ))}
        </div>
      </section>

      <section id="draft-taco-contact" className="border-t border-[#1F1712]/12 bg-[#F5EDE1] py-10" data-bang-slot="contact">
        <div className="mx-auto max-w-[1080px] px-5 grid grid-cols-1 @3xl:grid-cols-12 gap-8">
          <div className="@3xl:col-span-5 space-y-3">
            <h2 className="text-[24px] font-bold" style={{ fontFamily: b.brand.display }}>
              Catering &amp; Large Office Orders
            </h2>
            <p className="text-[14px] text-[#5E4E43] leading-relaxed">
              Need 30+ breakfast tacos for a morning crew? Leave a note with your pickup time or call our East 6th counter.
            </p>
            <div className="space-y-1.5 pt-2 text-[14px]">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#C2410C]" /><span>{b.address}</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#C2410C]" /><span>{b.hours}</span></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#C2410C]" /><span>{b.phone}</span></div>
            </div>
          </div>
          <div className="@3xl:col-span-7 rounded-lg border border-[#1F1712]/14 bg-white p-5">
            <StaticInquiryForm business={b} accentColor="#C2410C" label="Request Catering / Counter Hold" compact />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1F1712]/12 bg-[#1F1712] text-[#FBF6EE] py-5 px-5 text-center text-[13px]">
        © 2026 {b.name} · {b.address} · {b.phone}
      </footer>
    </div>
  );
}

/** 2 · BANK DRAFT: Main Street Institutional Ledger (FDIC bar + wide banner + semantic Monday Rate Table) */
function DraftBankSite({ b }: { b: ShowcaseBusiness }) {
  return (
    <div
      className="@container min-h-full bg-white text-[#0B1F3A]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="draft"
      data-draft-archetype="bank"
    >
      <div className="bg-[#0B1F3A] text-white px-5 py-2 text-[13px]">
        <div className="mx-auto max-w-[1080px] flex flex-wrap items-center justify-between gap-2">
          <span>Member FDIC · Equal Housing Lender · Routing #114924782</span>
          <span>Fredericksburg Branch · {b.phone}</span>
        </div>
      </div>

      <header className="border-b border-[#0B1F3A]/12 bg-[#F8FAFC]">
        <div className="mx-auto max-w-[1080px] px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="text-[22px] font-bold tracking-tight" style={{ fontFamily: b.brand.display }} data-bang-slot="businessName">
            {b.name}
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-[14px] font-medium text-[#334155]">
            <a href="#draft-bank-rates" className="min-h-[44px] inline-flex items-center hover:text-[#0B1F3A]">Monday Rates</a>
            <a href="#draft-bank-about" className="min-h-[44px] inline-flex items-center hover:text-[#0B1F3A]">Local Lending</a>
            <a href="#draft-bank-contact" className="min-h-[44px] inline-flex items-center hover:text-[#0B1F3A]">Lobby Hours</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-[1080px] px-5 pt-8 pb-10 space-y-6">
        <div className="grid grid-cols-1 @3xl:grid-cols-12 gap-6 items-end">
          <div className="@3xl:col-span-8 space-y-3">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#1D4ED8]">
              Serving Gillespie County Since 1962
            </p>
            <h1
              className="text-[32px] @3xl:text-[40px] font-semibold leading-[1.12]"
              style={{ fontFamily: b.brand.display }}
              data-bang-slot="headline"
            >
              {b.draftHeadline}
            </h1>
            <p className="text-[16px] text-[#44546A] max-w-[60ch]" data-bang-slot="intro">
              {b.draftIntro}
            </p>
          </div>
          <div className="@3xl:col-span-4 flex @3xl:justify-end">
            <a
              href="#draft-bank-contact"
              className="inline-flex min-h-[44px] items-center rounded bg-[#1D4ED8] px-5 text-[14px] font-semibold text-white"
            >
              Talk to a Branch Banker
            </a>
          </div>
        </div>
        <img
          src={b.images.hero.src}
          alt={b.images.hero.alt}
          data-bang-image-slot="hero"
          className="w-full aspect-[16/7] object-cover rounded border border-[#0B1F3A]/14"
        />
      </section>

      <section id="draft-bank-rates" className="border-y border-[#0B1F3A]/12 bg-[#F4F7FB] py-12" data-bang-slot="menu">
        <div className="mx-auto max-w-[1080px] px-5 space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="text-[26px] font-semibold" style={{ fontFamily: b.brand.display }}>
                Published Monday Rate Sheet
              </h2>
              <p className="text-[14px] text-[#44546A]">
                All personal, CD, and business rates reviewed weekly by our Fredericksburg committee.
              </p>
            </div>
            <span className="font-mono text-[13px] text-[#1D4ED8]">Effective Monday 8:30 am CT</span>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-label="Published deposit and loan rates"
            className="overflow-x-auto rounded border border-[#0B1F3A]/15 bg-white"
          >
            <table className="w-full min-w-[560px] text-left border-collapse text-[14px]">
              <thead>
                <tr className="border-b border-[#0B1F3A]/20 bg-[#EEF3FA] font-mono text-[13px] uppercase text-[#0B1F3A]">
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Account / Product</th>
                  <th className="py-3 px-4">Terms</th>
                  <th className="py-3 px-4 text-right">Published Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B1F3A]/10">
                {b.menu.categories.flatMap((cat) =>
                  cat.items.map((item) => (
                    <tr key={`${cat.name}-${item.name}`}>
                      <td className="py-3 px-4 font-mono text-[13px] text-[#44546A]">{cat.name}</td>
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
      </section>

      <section id="draft-bank-about" className="mx-auto max-w-[1080px] px-5 py-12 space-y-6" data-bang-slot="about">
        <h2 className="text-[24px] font-semibold" style={{ fontFamily: b.brand.display }}>
          Why Customers Bank on Main Street
        </h2>
        <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-6">
          {b.story.steps.map((s) => (
            <div key={s.title} className="border-t-2 border-[#1D4ED8] pt-4 space-y-2.5">
              <img src={s.image.src} alt={s.image.alt} className="w-full aspect-[16/10] object-cover rounded border border-[#0B1F3A]/10" />
              <h3 className="text-[17px] font-semibold">{s.title}</h3>
              <p className="text-[14px] text-[#44546A] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="draft-bank-contact" className="border-t border-[#0B1F3A]/12 bg-[#F8FAFC] py-10" data-bang-slot="contact">
        <div className="mx-auto max-w-[1080px] px-5 grid grid-cols-1 @3xl:grid-cols-12 gap-8">
          <div className="@3xl:col-span-5 space-y-3">
            <h2 className="text-[24px] font-semibold" style={{ fontFamily: b.brand.display }}>
              Fredericksburg Lobby &amp; Officer Desk
            </h2>
            <p className="text-[14px] text-[#44546A]">{b.intro}</p>
            <div className="space-y-1.5 text-[14px] pt-2">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#1D4ED8]" /><span>{b.address}</span></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#1D4ED8]" /><span>{b.hours}</span></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#1D4ED8]" /><span>{b.phone}</span></div>
            </div>
          </div>
          <div className="@3xl:col-span-7 rounded border border-[#0B1F3A]/15 bg-white p-5">
            <StaticInquiryForm business={b} accentColor="#1D4ED8" label="Request Officer Callback" compact />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#0B1F3A]/12 py-5 px-5 text-center text-[13px] text-[#44546A]">
        © 2026 {b.name} · Member FDIC · Equal Housing Lender
      </footer>
    </div>
  );
}

/** 3 · SALON DRAFT: Centered Editorial Lookbook & Transparent 2-Column Price Sheet */
function DraftSalonSite({ b }: { b: ShowcaseBusiness }) {
  return (
    <div
      className="@container min-h-full bg-[#FBF4F1] text-[#1E1416]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="draft"
      data-draft-archetype="salon"
    >
      <header className="border-b border-[#1E1416]/12 py-5 px-5">
        <div className="mx-auto max-w-[960px] flex flex-col items-center gap-2 text-center">
          <div className="text-[28px] font-medium tracking-tight" style={{ fontFamily: b.brand.display }} data-bang-slot="businessName">
            {b.name}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[13px] text-[#5E4C50]">
            <span>{b.address}</span>
            <span>·</span>
            <span>{b.hours}</span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[960px] px-5 pt-10 pb-8 text-center space-y-5">
        <h1
          className="text-[36px] @3xl:text-[48px] font-medium leading-[1.08]"
          style={{ fontFamily: b.brand.display }}
          data-bang-slot="headline"
        >
          {b.draftHeadline}
        </h1>
        <p className="mx-auto max-w-[54ch] text-[16px] text-[#5E4C50] leading-relaxed" data-bang-slot="intro">
          {b.draftIntro}
        </p>
        <div className="pt-1">
          <a
            href="#draft-salon-book"
            className="inline-flex min-h-[44px] items-center bg-[#9D2C57] px-7 text-[14px] font-semibold text-white"
            style={{ borderRadius: b.brand.radius }}
          >
            Request Appointment
          </a>
        </div>

        {/* 3-Plate Photo Triptych */}
        <div className="pt-4 grid grid-cols-1 @3xl:grid-cols-3 gap-4 text-left">
          <figure className="space-y-2">
            <img
              src={b.images.hero.src}
              alt={b.images.hero.alt}
              data-bang-image-slot="hero"
              className="w-full aspect-[4/5] object-cover border border-[#1E1416]/12"
            />
            <figcaption className="text-[13px] text-[#5E4C50]">Plate 01 · Natural-light Highlands studio</figcaption>
          </figure>
          <figure className="space-y-2">
            <img
              src={b.story.steps[0].image.src}
              alt={b.story.steps[0].image.alt}
              className="w-full aspect-[4/5] object-cover border border-[#1E1416]/12"
            />
            <figcaption className="text-[13px] text-[#5E4C50]">Plate 02 · One-on-one dry hair consultation</figcaption>
          </figure>
          <figure className="space-y-2">
            <img
              src={b.story.steps[2].image.src}
              alt={b.story.steps[2].image.alt}
              className="w-full aspect-[4/5] object-cover border border-[#1E1416]/12"
            />
            <figcaption className="text-[13px] text-[#5E4C50]">Plate 03 · Low-maintenance grow-out</figcaption>
          </figure>
        </div>
      </section>

      <section id="draft-salon-menu" className="border-y border-[#1E1416]/12 bg-white py-12" data-bang-slot="menu">
        <div className="mx-auto max-w-[960px] px-5 space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-[30px] font-medium" style={{ fontFamily: b.brand.display }}>
              Service &amp; Price List
            </h2>
            <p className="text-[14px] text-[#5E4C50]">Simple pricing. Consultation and style finish included.</p>
          </div>

          <div className="grid grid-cols-1 @3xl:grid-cols-3 gap-8">
            {b.menu.categories.map((cat) => (
              <div key={cat.name} className="space-y-3">
                <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9D2C57] border-b border-[#1E1416]/15 pb-2">
                  {cat.name}
                </h3>
                <ul className="divide-y divide-[#1E1416]/10">
                  {cat.items.map((item) => (
                    <li key={item.name} className="py-3 flex items-baseline justify-between gap-3">
                      <div>
                        <div className="text-[15px] font-medium">{item.name}</div>
                        <div className="text-[13px] text-[#5E4C50]">{item.detail}</div>
                      </div>
                      <span className="font-mono text-[14px] font-semibold text-[#9D2C57] whitespace-nowrap">
                        {item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="draft-salon-book" className="mx-auto max-w-[680px] px-5 py-12 space-y-6" data-bang-slot="contact">
        <div className="text-center space-y-2" data-bang-slot="about">
          <h2 className="text-[28px] font-medium" style={{ fontFamily: b.brand.display }}>
            Book Your Chair
          </h2>
          <p className="text-[14px] text-[#5E4C50]">{b.intro}</p>
        </div>
        <div className="border border-[#1E1416]/14 bg-white p-6">
          <StaticInquiryForm business={b} accentColor="#9D2C57" label="Send Appointment Request" compact />
        </div>
      </section>

      <footer className="border-t border-[#1E1416]/12 py-6 px-5 text-center text-[13px] text-[#5E4C50]">
        © 2026 {b.name} · {b.phone} · {b.address}
      </footer>
    </div>
  );
}

/** 4 · OFFICE DRAFT: Two-Column CPA Advisory Dossier (Sticky Credentials Rail + Native Disclosures) */
function DraftOfficeSite({ b }: { b: ShowcaseBusiness }) {
  const faqs = [
    {
      q: 'How do flat monthly plans work for small businesses?',
      a: 'We scope your transaction volume and payroll headcount on a 20-minute call and set one monthly fee covering bookkeeping, payroll, and year-end filings.',
    },
    {
      q: 'Can you take over clean-up mid-year from another CPA?',
      a: 'Yes. Most new clients join between May and November. We request prior-year returns and QuickBooks/Gusto access on day one.',
    },
    {
      q: 'What is included if the IRS or Ohio Department of Taxation sends a letter?',
      a: 'Routine notice responses and transcript pulls are included in every Small Business and Personal plan with zero hourly surprise billing.',
    },
  ];

  return (
    <div
      className="@container min-h-full bg-[#F7F9FC] text-[#102A43]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="draft"
      data-draft-archetype="office"
    >
      <header className="border-b border-[#102A43]/12 bg-white px-5 py-4">
        <div className="mx-auto max-w-[1080px] flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[20px] font-bold tracking-tight" data-bang-slot="businessName">
              {b.name}
            </div>
            <div className="font-mono text-[13px] text-[#486581]">
              Licensed Ohio CPA Firm · {b.city} · Flat-Fee Tax &amp; Bookkeeping
            </div>
          </div>
          <a
            href="#draft-office-contact"
            className="inline-flex min-h-[44px] items-center rounded bg-[#C2410C] px-5 text-[14px] font-semibold text-white"
          >
            Schedule 20-Min Call
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1080px] px-5 py-10 grid grid-cols-1 @3xl:grid-cols-12 gap-8 items-start">
        {/* Sticky Advisory Rail */}
        <aside id="draft-office-contact" className="@3xl:col-span-4 rounded-lg border border-[#102A43]/14 bg-white p-5 space-y-5" data-bang-slot="contact">
          <div className="border-b border-[#102A43]/12 pb-3 space-y-1">
            <p className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
              Client Advisory Desk
            </p>
            <p className="text-[14px] text-[#486581]">{b.status}</p>
          </div>
          <div className="space-y-2 text-[14px]">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-[#C2410C] mt-0.5 shrink-0" />
              <span>{b.address}</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-[#C2410C] mt-0.5 shrink-0" />
              <span>{b.hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#C2410C] shrink-0" />
              <span>{b.phone}</span>
            </div>
          </div>
          <div className="border-t border-[#102A43]/12 pt-4">
            <h2 className="text-[16px] font-bold mb-3">Request Intro Call</h2>
            <StaticInquiryForm business={b} accentColor="#C2410C" label="Request Free Call" compact />
          </div>
        </aside>

        {/* Main Dossier Column */}
        <main className="@3xl:col-span-8 space-y-8">
          <section className="rounded-lg border border-[#102A43]/14 bg-white p-6 space-y-5">
            <h1 className="text-[30px] @3xl:text-[38px] font-bold leading-[1.15]" data-bang-slot="headline">
              {b.draftHeadline}
            </h1>
            <p className="text-[16px] text-[#486581] leading-relaxed" data-bang-slot="intro">
              {b.draftIntro}
            </p>
            <img
              src={b.images.hero.src}
              alt={b.images.hero.alt}
              data-bang-image-slot="hero"
              className="w-full aspect-[16/9] object-cover rounded border border-[#102A43]/12"
            />
            <p className="text-[15px] text-[#334E68] leading-relaxed" data-bang-slot="about">
              {b.intro}
            </p>
          </section>

          <section id="draft-office-pricing" className="rounded-lg border border-[#102A43]/14 bg-white p-6 space-y-5" data-bang-slot="menu">
            <h2 className="text-[22px] font-bold">Published Flat-Fee Schedule</h2>
            <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-6">
              {b.menu.categories.map((cat) => (
                <div key={cat.name} className="space-y-3 border-t-2 border-[#102A43] pt-3">
                  <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-[#9A3412]">
                    {cat.name}
                  </h3>
                  <ul className="divide-y divide-[#102A43]/10">
                    {cat.items.map((item) => (
                      <li key={item.name} className="py-2.5 flex items-baseline justify-between gap-2">
                        <div>
                          <div className="text-[14px] font-semibold">{item.name}</div>
                          <div className="text-[13px] text-[#486581]">{item.detail}</div>
                        </div>
                        <span className="font-mono text-[13px] font-bold text-[#9A3412] shrink-0">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-[#102A43]/14 bg-white p-6 space-y-3">
            <h2 className="text-[20px] font-bold">Common Client Questions</h2>
            <div className="divide-y divide-[#102A43]/12 border-y border-[#102A43]/12">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-3">
                  <summary className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold cursor-pointer list-none">
                    <ChevronRight className="h-4 w-4 text-[#C2410C] transition-transform group-open:rotate-90 shrink-0" />
                    <span>{faq.q}</span>
                  </summary>
                  <p className="mt-1 pl-6 text-[14px] text-[#486581] leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="border-t border-[#102A43]/12 bg-white py-5 px-5 text-center text-[13px] text-[#486581]">
        © 2026 {b.name} · {b.address} · {b.phone}
      </footer>
    </div>
  );
}

/** 5 · PORTFOLIO DRAFT: Minimalist Maker Index (Light Stone Single-Column Dossier + Numbered Work + Rates) */
function DraftPortfolioSite({ b }: { b: ShowcaseBusiness }) {
  return (
    <div
      className="@container min-h-full bg-[#F6F5F1] text-[#18181B]"
      style={{ fontFamily: b.brand.body }}
      data-showcase-view="draft"
      data-draft-archetype="portfolio"
    >
      <header className="border-b border-[#18181B]/12 px-5 py-4">
        <div className="mx-auto max-w-[840px] flex flex-wrap items-center justify-between gap-3">
          <div className="text-[20px] font-semibold tracking-tight" style={{ fontFamily: b.brand.display }} data-bang-slot="businessName">
            {b.name}
          </div>
          <div className="font-mono text-[13px] text-[#3F6212]">
            {b.status}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[840px] px-5 py-10 space-y-12">
        <section className="flex flex-col @3xl:flex-row @3xl:items-center gap-6 border-b border-[#18181B]/12 pb-8">
          <img
            src={b.images.hero.src}
            alt={b.images.hero.alt}
            data-bang-image-slot="hero"
            className="h-28 w-28 shrink-0 rounded-xl object-cover border border-[#18181B]/15"
          />
          <div className="space-y-2.5">
            <h1 className="text-[32px] @3xl:text-[40px] font-medium leading-[1.1]" style={{ fontFamily: b.brand.display }} data-bang-slot="headline">
              {b.draftHeadline}
            </h1>
            <p className="text-[15px] text-[#52525B] leading-relaxed max-w-[58ch]" data-bang-slot="intro">
              {b.draftIntro}
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#draft-portfolio-work"
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#3F6212] px-5 text-[14px] font-semibold text-white"
              >
                Selected Work
              </a>
              <a
                href="#draft-portfolio-contact"
                className="inline-flex min-h-[44px] items-center rounded-full border border-[#18181B]/25 px-5 text-[14px] font-semibold text-[#18181B]"
              >
                Email or Schedule
              </a>
            </div>
          </div>
        </section>

        <section id="draft-portfolio-work" className="space-y-5" data-bang-slot="about">
          <div className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#3F6212]">
            Selected Shipped Products
          </div>
          <ol className="divide-y divide-[#18181B]/12 border-y border-[#18181B]/12">
            {b.story.steps.map((proj, idx) => (
              <li key={proj.title} className="py-5 grid grid-cols-1 @3xl:grid-cols-12 gap-4 items-center">
                <div className="@3xl:col-span-8 space-y-1.5">
                  <span className="font-mono text-[13px] font-semibold text-[#3F6212]">
                    0{idx + 1}
                  </span>
                  <h2 className="text-[20px] font-medium" style={{ fontFamily: b.brand.display }}>
                    {proj.title}
                  </h2>
                  <p className="text-[14px] text-[#52525B] leading-relaxed">{proj.body}</p>
                </div>
                <div className="@3xl:col-span-4">
                  <img
                    src={proj.image.src}
                    alt={proj.image.alt}
                    className="w-full aspect-[16/10] object-cover rounded-lg border border-[#18181B]/12"
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="draft-portfolio-rates" className="space-y-4" data-bang-slot="menu">
          <div className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[#3F6212]">
            Engagement Models &amp; Rates
          </div>
          <div className="divide-y divide-[#18181B]/12 rounded-xl border border-[#18181B]/14 bg-white px-5">
            {b.menu.categories.flatMap((c) => c.items).map((item) => (
              <div key={item.name} className="py-3.5 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-[15px] font-semibold">{item.name}</span>
                  <span className="ml-2 text-[14px] text-[#52525B]">· {item.detail}</span>
                </div>
                <span className="font-mono text-[14px] font-bold text-[#3F6212]">{item.price}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="draft-portfolio-contact" className="rounded-xl border border-[#18181B]/14 bg-white p-6 space-y-4" data-bang-slot="contact">
          <h2 className="text-[22px] font-medium" style={{ fontFamily: b.brand.display }}>
            Tell Me What You&rsquo;re Building
          </h2>
          <StaticInquiryForm business={b} accentColor="#3F6212" label="Send Project Note" compact />
        </section>
      </main>

      <footer className="border-t border-[#18181B]/12 py-6 px-5 text-center text-[13px] text-[#52525B]">
        © 2026 {b.name} · {b.address} · {b.phone}
      </footer>
    </div>
  );
}

/**
 * BangDraftSite — 5 genuinely distinct, clean local-build architectures tailored
 * to each showcase business (Counter Menu Board, Institutional Ledger, Editorial Triptych,
 * CPA Advisory Dossier, and Minimalist Maker Index). Static, legible, honest $0 builds.
 */
export function BangDraftSite({ business: b }: { business: ShowcaseBusiness }) {
  switch (b.id) {
    case 'taco':
      return <DraftTacoSite b={b} />;
    case 'bank':
      return <DraftBankSite b={b} />;
    case 'salon':
      return <DraftSalonSite b={b} />;
    case 'office':
      return <DraftOfficeSite b={b} />;
    case 'portfolio':
      return <DraftPortfolioSite b={b} />;
  }
}
