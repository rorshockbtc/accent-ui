'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Monitor,
  Smartphone,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Phone,
  Palette,
  Sliders,
} from 'lucide-react';
import type { WebsiteThemeId } from '@/styles/website-themes';

export type StudyId =
  | 'mirador'
  | 'hearth'
  | 'dispatch'
  | 'almanac'
  | 'studio';

interface StudyConfig {
  id: StudyId;
  number: string;
  themeId: WebsiteThemeId;
  brandName: string;
  industry: string;
  summary: string;
  screens: [string, string, string];
  colors: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    accentFill: string;
    rule: string;
  };
  fontDisplay: string;
  fontBody: string;
  ctaRadius: string;
}

const STUDIES: StudyConfig[] = [
  {
    id: 'mirador',
    number: '01',
    themeId: 'hacienda-hospitality',
    brandName: 'Cypress Creek',
    industry: 'Coffee Roastery & Porch Inn',
    summary:
      'Warm cream paper, forest green ink accents, serif headings, and spacious landscape photography.',
    screens: ['Porch Home', 'Roasts & Menu', 'Book a Tasting'],
    colors: {
      bg: '#F4EFE6',
      surface: '#EAE2D4',
      ink: '#1C241E',
      muted: '#525C54',
      accent: '#1E5B3A',
      accentFill: '#1E5B3A',
      rule: 'rgba(28,36,30,0.14)',
    },
    fontDisplay: "var(--font-serif), 'Fraunces', Georgia, serif",
    fontBody: "var(--font-sans), system-ui, sans-serif",
    ctaRadius: '8px',
  },
  {
    id: 'hearth',
    number: '02',
    themeId: 'hearth-provisions',
    brandName: 'Hearth & Rye',
    industry: 'Neighborhood Bakery & Kitchen',
    summary:
      'Flour-warm paper surfaces, terracotta trim, crisp oven schedules, and an interactive pre-order counter.',
    screens: ['Morning Counter', 'Pre-Order Box', 'Flour & Sourcing'],
    colors: {
      bg: '#FBF7F0',
      surface: '#F2E9DB',
      ink: '#231B15',
      muted: '#66584D',
      accent: '#B84A27',
      accentFill: '#A33E1E',
      rule: 'rgba(35,27,21,0.14)',
    },
    fontDisplay: "var(--font-serif), 'Fraunces', Georgia, serif",
    fontBody: "var(--font-sans), system-ui, sans-serif",
    ctaRadius: '6px',
  },
  {
    id: 'dispatch',
    number: '03',
    themeId: 'field-dispatch',
    brandName: 'Barton Creek',
    industry: 'Plumbing & Urgent Home Service',
    summary:
      'High-legibility slate paper, clear arrival estimates, upfront flat-rate prices, and instant scheduling.',
    screens: ['Urgent Dispatch', 'Upfront Prices', 'Book Service'],
    colors: {
      bg: '#F5F7F9',
      surface: '#E9EEF2',
      ink: '#111827',
      muted: '#4B5563',
      accent: '#1E3A8A',
      accentFill: '#1E3A8A',
      rule: 'rgba(17,24,39,0.14)',
    },
    fontDisplay: "var(--font-bricolage), var(--font-sans), system-ui, sans-serif",
    fontBody: "var(--font-sans), system-ui, sans-serif",
    ctaRadius: '4px',
  },
  {
    id: 'almanac',
    number: '04',
    themeId: 'civic-almanac',
    brandName: 'Oak Park Almanac',
    industry: 'Local Publication & Public Data',
    summary:
      'Classic 3-column reading layout paired with clean public data tables and calm sandstone paper.',
    screens: ['Lead Brief', 'Public Data Table', 'Reader Editions'],
    colors: {
      bg: '#E8E2D5',
      surface: '#DDD5C5',
      ink: '#18181B',
      muted: '#4B4843',
      accent: '#B8332A',
      accentFill: '#9F2B23',
      rule: 'rgba(24,24,27,0.16)',
    },
    fontDisplay: "var(--font-newsreader), Georgia, serif",
    fontBody: "var(--font-sans), system-ui, sans-serif",
    ctaRadius: '2px',
  },
  {
    id: 'studio',
    number: '05',
    themeId: 'case-study-studio',
    brandName: 'Cascade Studio :-]',
    industry: 'Architecture & Design Practice',
    summary:
      'Chalk canvas, bold headline typography, signature accent marks, and interactive project showcase plates.',
    screens: ['Selected Works', '2-Week Sprint', 'Project Scope'],
    colors: {
      bg: '#FAF8F5',
      surface: '#EFEAE0',
      ink: '#111827',
      muted: '#4B5563',
      accent: '#FE299E',
      accentFill: '#B81468',
      rule: 'rgba(17,24,39,0.14)',
    },
    fontDisplay: "var(--font-bricolage), var(--font-sans), system-ui, sans-serif",
    fontBody: "var(--font-sans), system-ui, sans-serif",
    ctaRadius: '9999px',
  },
];

const MIRADOR_MENU = [
  { name: 'Cypress Washed Bourbon (12 oz)', category: 'Washed', notes: 'Tangerine peel, brown sugar, cocoa finish', price: '$18' },
  { name: 'Hill Country Honey Lot (12 oz)', category: 'Honey', notes: 'Slow patio-dried, ripe peach & toasted almond', price: '$21' },
  { name: 'Roastery Espresso Flight', category: 'Espresso Bar', notes: 'Single-origin espresso + cortado + sparkling', price: '$9' },
  { name: 'Porch Breakfast Tacos & Pour-Over', category: 'Espresso Bar', notes: 'Warm flour tortillas, farm eggs, V60 carafe', price: '$14' },
];

const HEARTH_BOX_ITEMS = [
  { id: 'country', name: 'Country Miche (2 lb)', detail: '36-hour stone-milled midwestern wheat fermentation', price: 11 },
  { id: 'cardamom', name: 'Morning Cardamom Bun (2-pack)', detail: 'Brown butter, freshly crushed green pods', price: 9 },
  { id: 'focaccia', name: 'Rosemary & Potato Focaccia', detail: 'Crisp olive-oil pan bake, sea salt flake', price: 10 },
  { id: 'granola', name: 'Toasted Pecan & Oat Jar', detail: 'Maple-roasted orchard blend, 1 lb jar', price: 13 },
];

const DISPATCH_PRICES = [
  { category: 'Leak & Pipe', job: 'Copper Pinhole Leak Repair', timing: 'Same Day · 60 min', price: '$185 – $290' },
  { category: 'Leak & Pipe', job: 'Main Shutoff Valve Replacement', timing: 'Same Day · 90 min', price: '$260 – $380' },
  { category: 'Water Heaters', job: '50-Gal Natural Gas Tank Install', timing: 'Next Morning · 3 hrs', price: '$1,650 – $1,980' },
  { category: 'Drain Clear', job: 'Main Line Hydro-Jet & Camera Check', timing: 'Today · 75 min', price: '$245 flat' },
];

const ALMANAC_ROWS = [
  { sector: 'Housing', metric: 'Median 2-Bed Monthly Rent (Travis Co.)', source: 'Austin Housing Desk · Q3', value: '$1,690' },
  { sector: 'Energy', metric: 'Residential Grid Average (ERCOT)', source: 'Public Utility Filing · Oct', value: '13.8 ¢/kWh' },
  { sector: 'Schools', metric: 'District Per-Pupil Classroom Share', source: 'State Budget Ledger · FY26', value: '$11,420' },
  { sector: 'Housing', metric: 'Single-Family Permit Turnaround', source: 'City Dev Services · Q3', value: '38 days' },
];

const STUDIO_WORKS = [
  {
    num: '01',
    title: 'Cascade Timber Pavilion',
    location: 'Bellingham, WA',
    spec: '2,400 sq ft · Reclaimed Cypress',
    img: '/themes/assets/timber-architecture.webp',
    alt: 'Exposed heavy timber beams and warm wood ceiling of a modern open pavilion',
    notes: 'Open-air tasting canopy built with interlocking pegged joinery and corrugated acoustic bays.',
  },
  {
    num: '02',
    title: 'Joinery & Millwork Shop',
    location: 'Eugene, OR',
    spec: '1,800 sq ft · North Daylight',
    img: '/themes/assets/joinery-chisels.webp',
    alt: 'Hand wood chisels and joinery tools arranged on a sunlit carpenter workbench',
    notes: 'Bespoke workbench layouts and dust-free client sample library built on a 6-week turnaround.',
  },
  {
    num: '03',
    title: 'Park Overlook Walkway',
    location: 'Hood River, OR',
    spec: 'Public Trailhead · Stone & Cedar',
    img: '/themes/assets/valley-overlook.webp',
    alt: 'Stone walkway looking out across green valley ridges at golden hour',
    notes: 'Low-impact retaining terraces framing views across three watersheds.',
  },
];

export function AccentMaterialStudies() {
  const [activeStudyId, setActiveStudyId] = useState<StudyId>('mirador');
  const [screenIdx, setScreenIdx] = useState<number>(0);
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  // Study 01 state
  const [menuFilter, setMenuFilter] = useState<string>('All');
  const [tastingGuests, setTastingGuests] = useState<number>(2);
  const [tastingSlot, setTastingSlot] = useState<string>('9:30 AM Morning Walk');
  const [tastingBooked, setTastingBooked] = useState<boolean>(false);

  // Study 02 state
  const [cart, setCart] = useState<Record<string, number>>({ country: 1, cardamom: 1, focaccia: 0, granola: 0 });

  // Study 03 state
  const [serviceArea, setServiceArea] = useState<'South Austin' | 'Dripping Springs' | 'Westlake'>('South Austin');
  const [priceCategory, setPriceCategory] = useState<string>('All');
  const [dispatchUrgency, setDispatchUrgency] = useState<'today' | 'scheduled'>('today');

  // Study 04 state
  const [almanacFilter, setAlmanacFilter] = useState<string>('All');
  const [editionPlan, setEditionPlan] = useState<'free' | 'print'>('print');

  // Study 05 state
  const [workIdx, setWorkIdx] = useState<number>(0);
  const [studioScope, setStudioScope] = useState<'site' | 'system' | 'refresh'>('site');

  const study = useMemo(
    () => STUDIES.find((s) => s.id === activeStudyId) ?? STUDIES[0],
    [activeStudyId]
  );

  const c = study.colors;

  const selectStudy = (id: StudyId) => {
    setActiveStudyId(id);
    setScreenIdx(0);
  };

  const hearthTotal = HEARTH_BOX_ITEMS.reduce((sum, item) => sum + item.price * (cart[item.id] ?? 0), 0);
  const hearthCount = HEARTH_BOX_ITEMS.reduce((sum, item) => sum + (cart[item.id] ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* 5 Clickable Study Tabs — Clean Hairline Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-[var(--a-rule)] bg-[var(--a-bg)] divide-y sm:divide-y-0 sm:divide-x divide-[var(--a-rule)]">
        {STUDIES.map((s) => {
          const active = s.id === study.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => selectStudy(s.id)}
              aria-pressed={active}
              className={`min-h-[76px] p-4 text-left transition-colors cursor-pointer flex flex-col justify-between ${
                active ? 'bg-[var(--a-surface)]' : 'hover:bg-[var(--a-surface)]/60'
              }`}
              style={{
                borderTopWidth: active ? '3px' : '0px',
                borderTopColor: active ? s.colors.accentFill : 'transparent',
              }}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="font-mono text-[13px] font-bold" style={{ color: s.colors.accentFill }}>
                  {s.number}
                </span>
                <span
                  className="h-3.5 w-3.5 rounded-full border border-black/15 shrink-0"
                  style={{ backgroundColor: s.colors.accent }}
                  aria-hidden
                />
              </div>
              <div className="mt-1.5">
                <div className="font-serif text-base font-semibold text-[var(--a-ink)]">
                  {s.brandName}
                </div>
                <div className="text-[13px] text-[var(--a-muted)] leading-snug">
                  {s.industry}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Study Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--a-rule)] pb-4">
        <div className="max-w-2xl">
          <p className="text-sm text-[var(--a-muted)] leading-relaxed">{study.summary}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg border border-[var(--a-rule)] bg-[var(--a-surface)] p-1">
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`min-h-[44px] px-3.5 rounded-md text-[13px] font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                viewport === 'desktop'
                  ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                  : 'text-[var(--a-ink)] hover:bg-black/5'
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Laptop</span>
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`min-h-[44px] px-3.5 rounded-md text-[13px] font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                viewport === 'mobile'
                  ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                  : 'text-[var(--a-ink)] hover:bg-black/5'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Phone 390px</span>
            </button>
          </div>

          <Link
            href={`/design-system/themes?theme=${study.themeId}`}
            className="min-h-[44px] px-4 rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] text-[13px] font-semibold text-[var(--a-ink)] inline-flex items-center gap-1.5 hover:border-[var(--a-ink)]"
          >
            <Palette className="w-4 h-4 text-[var(--a-accent)]" />
            <span>Customize Theme</span>
          </Link>

          <Link
            href={`/design-system/playground?theme=${study.themeId}`}
            className="min-h-[44px] px-4 rounded-lg bg-[var(--a-ink)] text-[var(--a-bg)] text-[13px] font-semibold inline-flex items-center gap-1.5 hover:opacity-90"
          >
            <Sliders className="w-4 h-4" />
            <span>Try Your Copy</span>
          </Link>
        </div>
      </div>

      {/* Live Clickable Multi-Screen Study Stage */}
      <div className="rounded-2xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-3 sm:p-6 flex justify-center">
        <div
          style={{
            width: viewport === 'mobile' ? '390px' : '100%',
            maxWidth: '100%',
            backgroundColor: c.bg,
            color: c.ink,
            fontFamily: study.fontBody,
            borderColor: c.rule,
          }}
          className="rounded-xl border overflow-hidden transition-all duration-200"
        >
          {/* App Top Chrome + Interactive Internal Screen Switcher */}
          <div
            style={{ backgroundColor: c.surface, borderColor: c.rule }}
            className="px-4 sm:px-6 py-3 border-b flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: c.accent }}
                aria-hidden
              />
              <span
                style={{ fontFamily: study.fontDisplay }}
                className="text-lg font-semibold tracking-tight"
              >
                {study.brandName}
              </span>
            </div>

            <nav aria-label={`${study.brandName} screens`} className="flex flex-wrap items-center gap-1.5">
              {study.screens.map((label, idx) => {
                const isScreenActive = idx === screenIdx;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setScreenIdx(idx)}
                    style={{
                      borderRadius: study.ctaRadius,
                      backgroundColor: isScreenActive ? c.accentFill : 'transparent',
                      color: isScreenActive ? '#FFFFFF' : c.ink,
                      borderColor: isScreenActive ? c.accentFill : c.rule,
                    }}
                    className="min-h-[40px] px-3.5 text-[13px] font-medium border transition-colors cursor-pointer"
                  >
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* STUDY BODY — Each Study × Each Screen */}
          <div className="p-5 sm:p-8 min-h-[430px]">
            {/* 01 · MIRADOR COFFEE ESTATE */}
            {study.id === 'mirador' && screenIdx === 0 && (
              <div
                className={`grid gap-8 items-center ${
                  viewport === 'mobile' ? 'grid-cols-1' : 'lg:grid-cols-12'
                }`}
              >
                <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-6'} space-y-4`}>
                  <p className="font-mono text-[13px] font-bold uppercase tracking-wider" style={{ color: c.accentFill }}>
                    Wimberley, TX · Cypress Creek
                  </p>
                  <h3 style={{ fontFamily: study.fontDisplay }} className="text-3xl sm:text-4xl font-semibold leading-tight">
                    Small-batch morning roasts poured beside the limestone creek.
                  </h3>
                  <p style={{ color: c.muted }} className="text-sm leading-relaxed">
                    Morning pour-overs, warm breakfast plates, and 60-minute guided tastings through our backyard roastery.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setScreenIdx(2)}
                      style={{ backgroundColor: c.accentFill, color: '#FFFFFF', borderRadius: study.ctaRadius }}
                      className="min-h-[44px] px-5 text-sm font-semibold cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Book Porch Tasting</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setScreenIdx(1)}
                      style={{ borderColor: c.rule, borderRadius: study.ctaRadius }}
                      className="min-h-[44px] px-5 text-sm font-semibold border cursor-pointer"
                    >
                      View Fresh Roasts
                    </button>
                  </div>
                </div>
                <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-6'} space-y-3`}>
                  <img
                    src="/themes/assets/hero.webp"
                    alt="Green courtyard veranda overlooking mountain coffee hills"
                    className="w-full h-60 object-cover rounded-lg border"
                    style={{ borderColor: c.rule }}
                  />
                  <div className="grid grid-cols-3 pt-2 border-t text-[13px]" style={{ borderColor: c.rule }}>
                    <div>
                      <strong className="block">Hours</strong>
                      <span style={{ color: c.muted }}>Tue–Sun 7:30–6</span>
                    </div>
                    <div>
                      <strong className="block">Elevation</strong>
                      <span style={{ color: c.muted }}>1,350 m cloud slope</span>
                    </div>
                    <div>
                      <strong className="block">Roast Days</strong>
                      <span style={{ color: c.muted }}>Mon &amp; Thu AM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {study.id === 'mirador' && screenIdx === 1 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: c.rule }}>
                  <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-semibold">
                    Current Harvest &amp; Courtyard Bar
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Washed', 'Honey', 'Espresso Bar'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setMenuFilter(cat)}
                        style={{
                          borderRadius: study.ctaRadius,
                          backgroundColor: menuFilter === cat ? c.ink : 'transparent',
                          color: menuFilter === cat ? c.bg : c.ink,
                          borderColor: c.rule,
                        }}
                        className="min-h-[40px] px-3 text-[13px] font-medium border cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={`grid gap-6 ${viewport === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-12'}`}>
                  <div className={viewport === 'mobile' ? '' : 'md:col-span-8'}>
                    <div className="divide-y border-y" style={{ borderColor: c.rule }}>
                      {MIRADOR_MENU.filter((m) => menuFilter === 'All' || m.category === menuFilter).map((item) => (
                        <div key={item.name} className="py-3.5 flex items-baseline justify-between gap-4">
                          <div>
                            <div className="font-semibold text-base">{item.name}</div>
                            <div className="text-[13px]" style={{ color: c.muted }}>{item.notes}</div>
                          </div>
                          <div className="font-mono text-base font-bold tabular-nums shrink-0" style={{ color: c.accentFill }}>
                            {item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`${viewport === 'mobile' ? 'grid grid-cols-2 gap-3' : 'md:col-span-4 space-y-3'}`}>
                    <img
                      src="/themes/assets/roasted-beans.webp"
                      alt="Freshly roasted whole coffee beans"
                      className="w-full h-32 object-cover rounded-lg border"
                      style={{ borderColor: c.rule }}
                    />
                    <img
                      src="/themes/assets/cafe-latte.webp"
                      alt="Steamed milk latte served on a wooden counter"
                      className="w-full h-32 object-cover rounded-lg border"
                      style={{ borderColor: c.rule }}
                    />
                  </div>
                </div>
              </div>
            )}

            {study.id === 'mirador' && screenIdx === 2 && (
              <div className={`grid gap-8 ${viewport === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-12'}`}>
                <div className={`${viewport === 'mobile' ? '' : 'md:col-span-7'} space-y-5`}>
                  <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-semibold">
                    Reserve Your Walking Tour &amp; Cupping Table
                  </h3>
                  <div className="space-y-2">
                    <span className="block text-[13px] font-semibold">Party Size ($28 per guest)</span>
                    <div className="flex flex-wrap gap-2">
                      {[2, 4, 6].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => {
                            setTastingGuests(n);
                            setTastingBooked(false);
                          }}
                          style={{
                            borderRadius: study.ctaRadius,
                            backgroundColor: tastingGuests === n ? c.ink : c.surface,
                            color: tastingGuests === n ? c.bg : c.ink,
                            borderColor: c.rule,
                          }}
                          className="min-h-[44px] px-4 text-sm font-semibold border cursor-pointer"
                        >
                          {n} Guests (${n * 28})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-[13px] font-semibold">Daily Departure</span>
                    <div className="flex flex-wrap gap-2">
                      {['9:30 AM Morning Walk', '2:00 PM Patio Cupping'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setTastingSlot(slot);
                            setTastingBooked(false);
                          }}
                          style={{
                            borderRadius: study.ctaRadius,
                            backgroundColor: tastingSlot === slot ? c.accentFill : c.surface,
                            color: tastingSlot === slot ? '#FFFFFF' : c.ink,
                            borderColor: c.rule,
                          }}
                          className="min-h-[44px] px-4 text-sm font-medium border cursor-pointer"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: c.surface, borderColor: c.rule }}
                  className={`${viewport === 'mobile' ? '' : 'md:col-span-5'} p-5 rounded-xl border space-y-4`}
                >
                  <div className="text-[13px] font-mono font-bold uppercase" style={{ color: c.accentFill }}>
                    Visit Summary
                  </div>
                  <div className="divide-y text-sm" style={{ borderColor: c.rule }}>
                    <div className="py-2 flex justify-between">
                      <span style={{ color: c.muted }}>Session</span>
                      <span className="font-medium">{tastingSlot}</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span style={{ color: c.muted }}>Guests</span>
                      <span className="font-mono font-bold">{tastingGuests}</span>
                    </div>
                    <div className="py-2 flex justify-between text-base font-bold">
                      <span>Total Due at Patio</span>
                      <span className="font-mono tabular-nums" style={{ color: c.accentFill }}>
                        ${tastingGuests * 28} USD
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTastingBooked(true)}
                    style={{ backgroundColor: c.accentFill, color: '#FFFFFF', borderRadius: study.ctaRadius }}
                    className="w-full min-h-[44px] text-sm font-semibold cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    {tastingBooked ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Spot Held for {tastingGuests} Guests</span>
                      </>
                    ) : (
                      <span>Hold My Tasting Spots →</span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* 02 · MASA & HEARTH BAKERY */}
            {study.id === 'hearth' && screenIdx === 0 && (
              <div className={`grid gap-8 items-center ${viewport === 'mobile' ? 'grid-cols-1' : 'lg:grid-cols-12'}`}>
                <div className={viewport === 'mobile' ? '' : 'lg:col-span-6'}>
                  <img
                    src="/themes/assets/sourdough-bread.webp"
                    alt="Golden crusty sourdough loaves cooling on a baker tray"
                    className="w-full h-64 object-cover rounded-lg border"
                    style={{ borderColor: c.rule }}
                  />
                </div>
                <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-6'} space-y-4`}>
                  <span className="font-mono text-[13px] font-bold uppercase" style={{ color: c.accentFill }}>
                    Stone-Milled Daily · East Cesar Chavez
                  </span>
                  <h3 style={{ fontFamily: study.fontDisplay }} className="text-3xl font-semibold leading-tight">
                    Slow bread pulled warm on the hour.
                  </h3>
                  <div className="divide-y border-y text-sm" style={{ borderColor: c.rule }}>
                    <div className="py-2.5 flex justify-between">
                      <strong>7:00 AM</strong>
                      <span style={{ color: c.muted }}>Country Wheat &amp; Seeded Rye Loaves</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <strong>8:30 AM</strong>
                      <span style={{ color: c.muted }}>Cardamom Buns &amp; Morning Pastries</span>
                    </div>
                    <div className="py-2.5 flex justify-between">
                      <strong>11:00 AM</strong>
                      <span style={{ color: c.muted }}>Rosemary Sea-Salt Focaccia Trays</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setScreenIdx(1)}
                    style={{ backgroundColor: c.accentFill, color: '#FFFFFF', borderRadius: study.ctaRadius }}
                    className="min-h-[44px] px-5 text-sm font-semibold cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Build Weekend Pickup Box</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {study.id === 'hearth' && screenIdx === 1 && (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: c.rule }}>
                  <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-semibold">
                    Saturday Pickup Box ({hearthCount} items · ${hearthTotal})
                  </h3>
                  <span className="text-[13px] font-mono" style={{ color: c.accentFill }}>
                    Pickup Sat 8:00 AM – 1:00 PM
                  </span>
                </div>
                <div className="divide-y border-y" style={{ borderColor: c.rule }}>
                  {HEARTH_BOX_ITEMS.map((item) => {
                    const qty = cart[item.id] ?? 0;
                    return (
                      <div key={item.id} className="py-3.5 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="font-semibold text-base">{item.name}</div>
                          <div className="text-[13px]" style={{ color: c.muted }}>{item.detail}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold tabular-nums">${item.price}</span>
                          <div className="inline-flex items-center border rounded-md" style={{ borderColor: c.rule }}>
                            <button
                              type="button"
                              aria-label={`Remove ${item.name}`}
                              onClick={() => setCart((p) => ({ ...p, [item.id]: Math.max(0, (p[item.id] ?? 0) - 1) }))}
                              className="w-10 h-10 font-bold text-base cursor-pointer"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-mono text-sm font-bold tabular-nums">{qty}</span>
                            <button
                              type="button"
                              aria-label={`Add ${item.name}`}
                              onClick={() => setCart((p) => ({ ...p, [item.id]: (p[item.id] ?? 0) + 1 }))}
                              className="w-10 h-10 font-bold text-base cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {study.id === 'hearth' && screenIdx === 2 && (
              <div className="space-y-4">
                <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-semibold">
                  Regional Grain &amp; Mill Partners
                </h3>
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 text-[13px] font-mono uppercase" style={{ borderColor: c.ink, color: c.muted }}>
                      <th className="py-2.5 pr-4">Grain</th>
                      <th className="py-2.5 px-3">Partner Farm / Mill</th>
                      <th className="py-2.5 pl-3 text-right">Fermentation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: c.rule }}>
                    <tr>
                      <td className="py-3 pr-4 font-semibold">Turkey Red Heritage Wheat</td>
                      <td className="py-3 px-3" style={{ color: c.muted }}>Barton Springs Mill, Dripping Springs TX</td>
                      <td className="py-3 pl-3 text-right font-mono tabular-nums">36 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold">Whole Grain Danko Rye</td>
                      <td className="py-3 px-3" style={{ color: c.muted }}>San Luis Valley Co-op</td>
                      <td className="py-3 pl-3 text-right font-mono tabular-nums">28 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 font-semibold">Cultured Farm Butter</td>
                      <td className="py-3 px-3" style={{ color: c.muted }}>Luckenbach Creamery</td>
                      <td className="py-3 pl-3 text-right font-mono tabular-nums">Weekly Churn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 03 · BARTON CREEK DISPATCH */}
            {study.id === 'dispatch' && screenIdx === 0 && (
              <div className="space-y-6">
                <div className={`grid gap-8 items-center ${viewport === 'mobile' ? 'grid-cols-1' : 'lg:grid-cols-12'}`}>
                  <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-7'} space-y-4`}>
                    <div className="inline-flex items-center gap-2 font-mono text-[13px] font-bold uppercase" style={{ color: c.accentFill }}>
                      <Phone className="w-4 h-4" />
                      <span>Same-Day Licensed Dispatch · (512) 555-0192</span>
                    </div>
                    <h3 style={{ fontFamily: study.fontDisplay }} className="text-3xl font-bold leading-tight">
                      Straightforward plumbing repair with written flat-rate pricing before we touch a pipe.
                    </h3>
                    <div className="space-y-2">
                      <span className="block text-[13px] font-semibold">Check Arrival Window by Area:</span>
                      <div className="flex flex-wrap gap-2">
                        {(['South Austin', 'Dripping Springs', 'Westlake'] as const).map((area) => (
                          <button
                            key={area}
                            type="button"
                            onClick={() => setServiceArea(area)}
                            style={{
                              borderRadius: study.ctaRadius,
                              backgroundColor: serviceArea === area ? c.accentFill : c.surface,
                              color: serviceArea === area ? '#FFFFFF' : c.ink,
                              borderColor: c.rule,
                            }}
                            className="min-h-[42px] px-3.5 text-[13px] font-semibold border cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{area}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium pt-1">
                      Next truck in <strong>{serviceArea}</strong>:{' '}
                      <span style={{ color: c.accentFill }}>
                        {serviceArea === 'South Austin' ? '35–50 minutes' : serviceArea === 'Westlake' ? '45–65 minutes' : '60–80 minutes'}
                      </span>
                    </p>
                  </div>
                  <div className={viewport === 'mobile' ? '' : 'lg:col-span-5'}>
                    <img
                      src="/themes/assets/copper-pipes.webp"
                      alt="Cleanly soldered residential copper water manifold"
                      className="w-full h-56 object-cover rounded-lg border"
                      style={{ borderColor: c.rule }}
                    />
                  </div>
                </div>
              </div>
            )}

            {study.id === 'dispatch' && screenIdx === 1 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b" style={{ borderColor: c.rule }}>
                  <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-bold">
                    Published Flat-Rate Guide
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {['All', 'Leak & Pipe', 'Water Heaters', 'Drain Clear'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPriceCategory(cat)}
                        style={{
                          borderRadius: study.ctaRadius,
                          backgroundColor: priceCategory === cat ? c.accentFill : c.surface,
                          color: priceCategory === cat ? '#FFFFFF' : c.ink,
                        }}
                        className="min-h-[40px] px-3 text-[13px] font-medium cursor-pointer"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="divide-y border-y" style={{ borderColor: c.rule }}>
                  {DISPATCH_PRICES.filter((r) => priceCategory === 'All' || r.category === priceCategory).map((row) => (
                    <div key={row.job} className="py-3 flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold text-base">{row.job}</div>
                        <div className="text-[13px]" style={{ color: c.muted }}>{row.timing}</div>
                      </div>
                      <span className="font-mono text-base font-bold tabular-nums" style={{ color: c.accentFill }}>
                        {row.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {study.id === 'dispatch' && screenIdx === 2 && (
              <div className="space-y-5 max-w-xl">
                <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-bold">
                  Request Dispatch in {serviceArea}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDispatchUrgency('today')}
                    style={{
                      borderRadius: study.ctaRadius,
                      backgroundColor: dispatchUrgency === 'today' ? c.accentFill : c.surface,
                      color: dispatchUrgency === 'today' ? '#FFFFFF' : c.ink,
                      borderColor: c.rule,
                    }}
                    className="min-h-[56px] p-3 text-left border cursor-pointer"
                  >
                    <div className="font-bold text-sm flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>Active Leak / Urgent</span>
                    </div>
                    <div className="text-[13px] opacity-85 mt-0.5">Priority same-day dispatch</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDispatchUrgency('scheduled')}
                    style={{
                      borderRadius: study.ctaRadius,
                      backgroundColor: dispatchUrgency === 'scheduled' ? c.accentFill : c.surface,
                      color: dispatchUrgency === 'scheduled' ? '#FFFFFF' : c.ink,
                      borderColor: c.rule,
                    }}
                    className="min-h-[56px] p-3 text-left border cursor-pointer"
                  >
                    <div className="font-bold text-sm">Planned Upgrade</div>
                    <div className="text-[13px] opacity-85 mt-0.5">Choose morning or afternoon</div>
                  </button>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: c.muted }}>
                  {dispatchUrgency === 'today'
                    ? 'A master plumber calls you within 10 minutes with an exact truck ETA and $79 diagnostic waiver upon repair approval.'
                    : 'Book an 8:00 AM or 1:00 PM window with zero dispatch charge and itemized written options.'}
                </p>
              </div>
            )}

            {/* 04 · MARIGOLD ALMANAC */}
            {study.id === 'almanac' && screenIdx === 0 && (
              <div className={`grid gap-6 ${viewport === 'mobile' ? 'grid-cols-1' : 'lg:grid-cols-12'}`}>
                <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-3'} border-t-2 pt-3 space-y-2`} style={{ borderColor: c.accentFill }}>
                  <div className="font-mono text-[13px] font-bold uppercase" style={{ color: c.accentFill }}>
                    In This Briefing
                  </div>
                  <ul className="space-y-1.5 text-[13px]" style={{ color: c.muted }}>
                    <li>01 · Permit Timeline Audit</li>
                    <li>02 · Utility Rate Ledger</li>
                    <li>03 · Primary City Filings</li>
                  </ul>
                </div>
                <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-6'} space-y-3`}>
                  <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl sm:text-3xl font-semibold leading-tight">
                    Why regional infrastructure timelines double between design and breaking ground
                  </h3>
                  <p className="text-sm leading-7" style={{ color: c.muted }}>
                    Good public journalism pairs clean readable columns with primary filings anybody can inspect in seconds—no paywalled PDFs, no popup overlays, and verified citations anchored to the margin.
                  </p>
                  <button
                    type="button"
                    onClick={() => setScreenIdx(1)}
                    style={{ backgroundColor: c.accentFill, color: '#FFFFFF', borderRadius: study.ctaRadius }}
                    className="min-h-[44px] px-4 text-sm font-semibold cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Inspect Verified Data Table</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-3'} border-t pt-3 space-y-2`} style={{ borderColor: c.rule }}>
                  <div className="font-mono text-[13px] font-bold uppercase">Source Margin</div>
                  <p className="text-[13px] leading-relaxed" style={{ color: c.muted }}>
                    Every stat links to its timestamped municipal filing so neighbors and city staff read the exact same numbers.
                  </p>
                </div>
              </div>
            )}

            {study.id === 'almanac' && screenIdx === 1 && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: c.rule }}>
                  <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-semibold">
                    Public Data Index
                  </h3>
                  <div className="flex gap-1.5">
                    {['All', 'Housing', 'Energy', 'Schools'].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setAlmanacFilter(sec)}
                        style={{
                          borderRadius: study.ctaRadius,
                          backgroundColor: almanacFilter === sec ? c.ink : c.surface,
                          color: almanacFilter === sec ? c.bg : c.ink,
                        }}
                        className="min-h-[40px] px-3 text-[13px] font-medium cursor-pointer"
                      >
                        {sec}
                      </button>
                    ))}
                  </div>
                </div>
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 text-[13px] font-mono uppercase" style={{ borderColor: c.ink, color: c.muted }}>
                      <th className="py-2.5 pr-4">Metric</th>
                      <th className="py-2.5 px-3">Source Record</th>
                      <th className="py-2.5 pl-3 text-right">Reading</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: c.rule }}>
                    {ALMANAC_ROWS.filter((r) => almanacFilter === 'All' || r.sector === almanacFilter).map((row) => (
                      <tr key={row.metric}>
                        <td className="py-3 pr-4 font-medium">{row.metric}</td>
                        <td className="py-3 px-3 text-[13px]" style={{ color: c.muted }}>{row.source}</td>
                        <td className="py-3 pl-3 text-right font-mono font-bold tabular-nums" style={{ color: c.accentFill }}>
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {study.id === 'almanac' && screenIdx === 2 && (
              <div className="space-y-5 max-w-xl">
                <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-semibold">
                  Support Independent Reporting
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setEditionPlan('free')}
                    style={{
                      borderColor: editionPlan === 'free' ? c.accentFill : c.rule,
                      backgroundColor: editionPlan === 'free' ? c.surface : 'transparent',
                      borderRadius: study.ctaRadius,
                    }}
                    className="min-h-[88px] p-4 border text-left cursor-pointer"
                  >
                    <div className="font-semibold text-base">Sunday Digest · $0</div>
                    <div className="text-[13px] mt-1" style={{ color: c.muted }}>
                      Weekly plain-English brief sent straight to your inbox.
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditionPlan('print')}
                    style={{
                      borderColor: editionPlan === 'print' ? c.accentFill : c.rule,
                      backgroundColor: editionPlan === 'print' ? c.surface : 'transparent',
                      borderRadius: study.ctaRadius,
                    }}
                    className="min-h-[88px] p-4 border text-left cursor-pointer"
                  >
                    <div className="font-semibold text-base">Quarterly Print + Data · $12/mo</div>
                    <div className="text-[13px] mt-1" style={{ color: c.muted }}>
                      Full source archives, downloadable CSVs, and printed quarterly issue.
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* 05 · ESTUDIO MIRADOR :-] */}
            {study.id === 'studio' && screenIdx === 0 && (
              <div className={`grid gap-8 items-start ${viewport === 'mobile' ? 'grid-cols-1' : 'lg:grid-cols-12'}`}>
                <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-6'} space-y-3`}>
                  <div className="font-mono text-[13px] font-bold uppercase tracking-wider" style={{ color: c.accentFill }}>
                    Click a Project to Swap Plate →
                  </div>
                  <div className="divide-y border-y" style={{ borderColor: c.rule }}>
                    {STUDIO_WORKS.map((w, i) => {
                      const active = i === workIdx;
                      return (
                        <button
                          key={w.num}
                          type="button"
                          onClick={() => setWorkIdx(i)}
                          style={{ backgroundColor: active ? c.surface : 'transparent' }}
                          className="w-full min-h-[60px] py-3.5 px-3 text-left flex items-baseline justify-between gap-4 cursor-pointer transition-colors"
                        >
                          <div>
                            <span className="font-mono text-[13px] font-bold mr-2.5" style={{ color: c.accentFill }}>
                              {w.num}
                            </span>
                            <span style={{ fontFamily: study.fontDisplay }} className="text-lg font-semibold">
                              {w.title}
                            </span>
                          </div>
                          <span className="text-[13px] shrink-0" style={{ color: c.muted }}>{w.location}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-sm leading-relaxed pt-1" style={{ color: c.muted }}>
                    {STUDIO_WORKS[workIdx].notes}
                  </p>
                </div>

                <div className={`${viewport === 'mobile' ? '' : 'lg:col-span-6'} space-y-2.5`}>
                  <img
                    src={STUDIO_WORKS[workIdx].img}
                    alt={STUDIO_WORKS[workIdx].alt}
                    className="w-full h-60 object-cover rounded-xl border"
                    style={{ borderColor: c.rule }}
                  />
                  <div className="flex items-center justify-between text-[13px] font-mono" style={{ color: c.muted }}>
                    <span>{STUDIO_WORKS[workIdx].spec}</span>
                    <span style={{ color: c.accentFill }}>Plate {STUDIO_WORKS[workIdx].num}</span>
                  </div>
                </div>
              </div>
            )}

            {study.id === 'studio' && screenIdx === 1 && (
              <div className="space-y-4">
                <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-bold">
                  How a 2-Week Colon Hyphen Bracket (:-]) Sprint Ships
                </h3>
                <div className={`grid gap-6 pt-2 ${viewport === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'}`}>
                  {[
                    { step: 'Days 1–3', title: 'Direction & Honest Copy', body: 'Replace generic filler copy with clear offers, real photography, and page structure.' },
                    { step: 'Days 4–7', title: 'Design & Live Interaction', body: 'Build custom visual pacing, tables, booking forms, and mobile 390px polish.' },
                    { step: 'Days 8–10', title: 'Custom Domain & Launch', body: 'Configure Cloudflare/Vercel, speed audit, search metadata, and clean handoff.' },
                  ].map((phase) => (
                    <div key={phase.step} className="border-t-2 pt-4 space-y-1.5" style={{ borderColor: c.accentFill }}>
                      <div className="font-mono text-[13px] font-bold" style={{ color: c.accentFill }}>{phase.step}</div>
                      <div style={{ fontFamily: study.fontDisplay }} className="text-lg font-semibold">{phase.title}</div>
                      <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{phase.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {study.id === 'studio' && screenIdx === 2 && (
              <div className="space-y-5 max-w-2xl">
                <h3 style={{ fontFamily: study.fontDisplay }} className="text-2xl font-bold">
                  Choose Your Sprint Scope
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'site', label: 'Flagship Business Site' },
                    { id: 'system', label: 'App + Design System' },
                    { id: 'refresh', label: 'Copy & Mobile Overhaul' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setStudioScope(opt.id as typeof studioScope)}
                      style={{
                        borderRadius: study.ctaRadius,
                        backgroundColor: studioScope === opt.id ? c.accentFill : c.surface,
                        color: studioScope === opt.id ? '#FFFFFF' : c.ink,
                        borderColor: c.rule,
                      }}
                      className="min-h-[44px] px-4 text-sm font-semibold border cursor-pointer"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2 text-sm" style={{ borderColor: c.rule }}>
                  <p>
                    <strong>Included: </strong>
                    {studioScope === 'site'
                      ? 'Art-directed home + 4 core sections, real photography editing, interactive booking/quote form, and custom domain DNS launch.'
                      : studioScope === 'system'
                        ? 'Multi-screen React/Next.js frontend, reusable token system, accessible contrast math, and AI handoff files.'
                        : 'Full rewrite of unclear pages, responsive 390px mobile rebuild, and image performance optimization.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
