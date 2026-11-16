'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink, Maximize2, MoveHorizontal } from 'lucide-react';
import { ACCENT_WEBSITE_THEMES, ECOSYSTEM_HANDOFF_STEPS } from '@/styles/website-themes';
import { AccentBadge } from '@/components/ui';
import { AccentMaterialStudies } from '@/components/AccentMaterialStudies';
import { AccentAppLayouts } from '@/components/AccentAppLayouts';
import { StudioPageNav, type StudioChapter } from '@/components/StudioPageNav';
import { BangDraftSite } from '@/components/showcase/BangDraftSite';
import { StudioCraftedSite } from '@/components/showcase/StudioCraftedSite';
import { SHOWCASE_BUSINESSES, SHOWCASE_BY_ID, type ShowcaseBusiness } from '@/components/showcase/showcase-content';

const CHAPTERS: StudioChapter[] = [
  { id: 'start', n: '01', title: 'Start here', note: 'Pick what you came for' },
  { id: 'difference', n: '02', title: 'Free draft vs. studio build', note: 'See the gap side by side' },
  { id: 'themes', n: '03', title: '8 website themes', note: 'Whole-site looks, free to use' },
  { id: 'studies', n: '04', title: 'Clickable example apps', note: 'Feel a theme across screens' },
  { id: 'tradeoffs', n: '05', title: 'Which path fits you?', note: 'Cost, time, and results' },
  { id: 'layouts', n: '06', title: 'App & docs layouts', note: 'For product teams' },
  { id: 'handoff', n: '07', title: 'How the tools connect', note: 'From notes to a live site' },
];

/** next/font family mapping lives in a shared module (page files may only export the page). */
import { THEME_FONT_VAR } from '@/components/showcase/theme-fonts';

function ChapterHeader({ n, eyebrow, title, intro }: { n: string; eyebrow: string; title: string; intro: string }) {
  return (
    <div className="space-y-3 border-b border-[var(--a-rule)] pb-6">
      <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[var(--a-accent-text,var(--a-accent))]">
        {n} · {eyebrow}
      </p>
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--a-ink)]">{title}</h2>
      <p className="max-w-[64ch] text-base leading-relaxed text-[var(--a-muted)]">{intro}</p>
    </div>
  );
}

/** Drag-to-compare poster: both builds rendered at laptop width, scaled to fit. */
function CompareTeaser({ business }: { business: ShowcaseBusiness }) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.6);
  const [split, setSplit] = useState(50);
  const SITE_W = 1280;
  const H = 520;

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / SITE_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layer = (child: React.ReactNode) => (
    <div
      className="absolute left-0 top-0 origin-top-left pointer-events-none"
      style={{ width: SITE_W, height: H / scale, transform: `scale(${scale})` }}
      aria-hidden
    >
      <div className="h-full overflow-hidden">{child}</div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden rounded-2xl border border-[var(--a-rule)] bg-white shadow-sm"
        style={{ height: H }}
      >
        {layer(<BangDraftSite business={business} />)}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
          {layer(<StudioCraftedSite business={business} preview />)}
        </div>

        {/* Handle */}
        <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${split}%` }}>
          <div className="absolute inset-y-0 -left-px w-[2px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
          <div className="absolute top-1/2 -left-6 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-[#111] shadow-lg ring-1 ring-black/10">
            <MoveHorizontal className="h-5 w-5" />
          </div>
        </div>
        <span className="absolute left-3 top-3 z-10 rounded-full bg-black/75 px-3 py-1.5 text-[13px] font-semibold text-white">
          BANG! Local Draft
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-full bg-[#FE299E] px-3 py-1.5 text-[13px] font-semibold text-white">
          Studio Crafted :-]
        </span>
        <input
          type="range"
          min={4}
          max={96}
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Drag to compare the free draft and the studio build"
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="text-[13px] text-[var(--a-muted)]">Drag the handle to compare the free local draft against a Studio build.</p>
    </div>
  );
}

export default function AccentTemplatesPage() {
  const [bizId, setBizId] = useState<ShowcaseBusiness['id']>('taco');
  const business = SHOWCASE_BY_ID[bizId];
  const websiteThemes = useMemo(() => ACCENT_WEBSITE_THEMES, []);

  const TIERS = [
    { key: 'free', label: 'BANG! Local Draft', sub: 'Free · on your computer' },
    { key: 'cloud', label: 'Cloud AI + STYLES.md', sub: 'Claude, Argon, Carbon' },
    { key: 'studio', label: 'Colon Hyphen Bracket :-]', sub: 'Studio sprint' },
  ] as const;

  const ROWS: { label: string; free: string; cloud: string; studio: string }[] = [
    { label: 'Cost', free: '$0', cloud: 'Your AI subscription or API tokens', studio: 'Fixed-price sprint' },
    { label: 'Time to a first version', free: 'An afternoon', cloud: 'A day or two', studio: '1–2 weeks, launched' },
    { label: 'Words on the page', free: 'Your notes, lightly cleaned up', cloud: 'Better drafts you still edit', studio: 'Written with you by a copywriter' },
    { label: 'Photos', free: 'Your photos, as-is', cloud: 'Your photos, better cropped', studio: 'Photo direction and art-directed crops' },
    { label: 'Layout & design', free: 'A clean theme, applied well', cloud: 'Theme plus custom sections', studio: 'Designed for your business' },
    { label: 'Motion & interaction', free: 'None', cloud: 'Basic', studio: 'Purposeful animation throughout' },
    { label: 'Booking, menus, rates', free: 'Contact form', cloud: 'Simple widgets', studio: 'Built and tested for your workflow' },
    { label: 'Dashboards & data tables', free: 'Simple schedule list', cloud: 'Custom data views', studio: 'Filterable SaaS console & client ledger' },
    { label: 'Domain & launch help', free: 'Step-by-step guides', cloud: 'Guides plus AI help', studio: 'Done with you, start to finish' },
    { label: 'Who owns the code', free: 'You', cloud: 'You', studio: 'You' },
  ];

  const PATHS = [
    { href: '#themes', title: 'I want it free', body: 'Pick a theme and build on your own computer with Pipes Desktop.', cta: 'Browse themes' },
    { href: '#tradeoffs', title: 'I already pay for AI tools', body: 'Use Claude, Cursor, or Antigravity with our style sheet for a sharper result.', cta: 'Compare paths' },
    { href: '#difference', title: 'I want it done for me', body: 'See what a Colon Hyphen Bracket sprint adds, then book one.', cta: 'See the difference' },
  ];

  return (
    <div className="py-10 sm:py-12">
      {/* MASTHEAD */}
      <header className="space-y-5 pb-8">
        <div className="flex flex-wrap gap-2">
          <AccentBadge tone="pink">5 example businesses</AccentBadge>
          <AccentBadge tone="sky">8 free website themes</AccentBadge>
        </div>
        <h1 className="max-w-4xl font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--a-ink)]">
          Templates: what you can build, and what a pro adds.
        </h1>
        <p className="max-w-[68ch] text-base sm:text-lg leading-relaxed text-[var(--a-muted)]">
          Start free with a theme and Pipes Desktop, sharpen it with cloud AI, or hand it to Colon Hyphen Bracket. Use the guide on the left to jump around.
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        <StudioPageNav chapters={CHAPTERS} />

        <div className="min-w-0 space-y-24 pt-6 lg:pt-0">
          {/* 01 START */}
          <section id="start" className="scroll-mt-32 space-y-8">
            <ChapterHeader n="01" eyebrow="Start here" title="What are you here to do?" intro="Pick the path that sounds most like you. Each one jumps to the right part of this page." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PATHS.map((p, i) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="group flex flex-col justify-between gap-6 rounded-2xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[var(--a-ink)]"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[13px] font-bold text-[var(--a-accent-text,var(--a-accent))]">Path {i + 1}</span>
                    <h3 className="font-serif text-2xl font-semibold text-[var(--a-ink)]">{p.title}</h3>
                    <p className="text-[15px] leading-relaxed text-[var(--a-muted)]">{p.body}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--a-ink)]">
                    {p.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* 02 DIFFERENCE */}
          <section id="difference" className="scroll-mt-32 space-y-8">
            <ChapterHeader
              n="02"
              eyebrow="Free draft vs. studio build"
              title="Same business, two very different websites."
              intro="On the left is what BANG! builds for free on your computer: clean and usable. On the right is the same business designed by Colon Hyphen Bracket. Open the full-screen view to click through both."
            />
            <div className="flex flex-wrap gap-2" aria-label="Example business">
              {SHOWCASE_BUSINESSES.map((b) => {
                const on = b.id === bizId;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBizId(b.id)}
                    aria-pressed={on}
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-[14px] font-semibold cursor-pointer transition-colors ${
                      on ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)]' : 'border-[var(--a-rule)] bg-[var(--a-surface)] text-[var(--a-ink)] hover:border-[var(--a-ink)]'
                    }`}
                  >
                    <span className="h-3 w-3 rounded-full border border-black/20" style={{ backgroundColor: b.brand.accent }} />
                    {b.kind}
                  </button>
                );
              })}
            </div>
            <CompareTeaser business={business} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-4 text-[13px]">
              <div>
                <span className="font-mono font-bold uppercase text-[var(--a-muted)]">Left · BANG! Local Draft</span>
                <p className="mt-0.5 font-medium text-[var(--a-ink)]">{business.draftPatternLabel}</p>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-[var(--a-rule)] pt-2.5 md:pt-0 md:pl-4">
                <span className="font-mono font-bold uppercase text-[var(--a-accent-text,var(--a-accent))]">Right · Studio Crafted :-]</span>
                <p className="mt-0.5 font-medium text-[var(--a-ink)]">{business.studioPatternLabel}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/design-system/templates/compare?business=${bizId}&view=draft`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[var(--a-ink)] px-6 text-[14px] font-semibold text-[var(--a-bg)] hover:opacity-90"
              >
                <Maximize2 className="h-4 w-4" /> Open full-screen comparison
              </Link>
              <a
                href="https://colonhyphenbracket.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[var(--a-ink)] px-6 text-[14px] font-semibold text-[var(--a-ink)] hover:bg-[var(--a-surface)]"
              >
                Book a :-] sprint <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>

          {/* 03 THEMES */}
          <section id="themes" className="scroll-mt-32 space-y-8">
            <ChapterHeader
              n="03"
              eyebrow="8 website themes"
              title="Start from a look that fits your kind of business."
              intro="Each theme sets the layout, fonts, colors, and pacing of a whole site. Pick one, preview it full size in Themes, then add your own words in Playground."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-5 gap-y-8">
              {websiteThemes.map((t) => (
                <Link key={t.id} href={`/design-system/themes?theme=${t.id}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--a-rule)]" style={{ backgroundColor: t.palette.bg }}>
                    <img
                      src={t.domainExample.heroImageUrl}
                      alt=""
                      className="absolute inset-x-0 bottom-0 h-[58%] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 top-0 p-3">
                      <div className="text-[18px] font-semibold leading-tight" style={{ fontFamily: THEME_FONT_VAR[t.typography.displayLabel], color: t.palette.ink }}>
                        {t.shortName}
                      </div>
                      <div className="mt-1.5 flex gap-1">
                        {[t.palette.accent, t.palette.ink, t.palette.focalSurface].map((c, i) => (
                          <span key={`${c}-${i}`} className="h-3 w-6 rounded-sm border border-black/10" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-3 text-[16px] font-semibold text-[var(--a-ink)] group-hover:underline">{t.name}</h3>
                  <p className="mt-1 text-[14px] leading-snug text-[var(--a-muted)]">{t.bestFor}</p>
                </Link>
              ))}
            </div>
            <Link href="/design-system/themes" className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-[var(--a-ink)] underline underline-offset-4">
              Preview all themes full size <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>

          {/* 04 STUDIES */}
          <section id="studies" className="scroll-mt-32 space-y-8">
            <ChapterHeader
              n="04"
              eyebrow="Clickable example apps"
              title="Click through a theme across several screens."
              intro="Like Material Design’s studies: each example is a small multi-screen app so you can feel how type, color, and spacing hold together."
            />
            <AccentMaterialStudies />
            <div className="border-t border-[var(--a-rule)] pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1 max-w-[58ch]">
                <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[var(--a-accent-text,var(--a-accent))]">
                  * · Live Production Case Study · Playful-Principal + Folon Watercolor
                </p>
                <h3 className="font-serif text-xl font-semibold text-[var(--a-ink)]">
                  Asterisk (asterisk.pipes.pink) — Print typography paired with watercolor plates
                </h3>
                <p className="text-[14px] text-[var(--a-muted)]">
                  Separates a choreographed Threshold homepage from a calm Sanctuary writing studio, using Accént 3.1 Sovereign Pink pills, single-row channel tabs, and atmospheric readiness weather.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href="https://pipes.pink/asterisk"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--a-accent-fill)] px-5 text-[14px] font-semibold text-[var(--a-accent-fg)]"
                >
                  Open Asterisk × Pipes bridge <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="https://asterisk.pipes.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--a-rule)] px-5 text-[14px] font-semibold text-[var(--a-ink)] hover:border-[var(--a-ink)]"
                >
                  Visit asterisk.pipes.pink <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          {/* 05 TRADEOFFS */}
          <section id="tradeoffs" className="scroll-mt-32 space-y-8">
            <ChapterHeader
              n="05"
              eyebrow="Which path fits you?"
              title="Free, AI-assisted, or done with a studio."
              intro="All three paths use the same design system, so you can start free and upgrade later without starting over."
            />
            <div
              className="overflow-x-auto border-y border-[var(--a-rule)]"
              tabIndex={0}
              role="region"
              aria-label="Comparison of free local draft, cloud AI, and studio sprint"
            >
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead>
                  <tr className="border-b-2 border-[var(--a-ink)]">
                    <th className="py-4 pr-4 text-[13px] font-mono uppercase text-[var(--a-muted)]">&nbsp;</th>
                    {TIERS.map((tier) => (
                      <th key={tier.key} className={`py-4 px-4 align-bottom ${tier.key === 'studio' ? 'bg-[var(--a-surface)]' : ''}`}>
                        <div className="text-[15px] font-semibold text-[var(--a-ink)]">{tier.label}</div>
                        <div className="text-[13px] font-normal text-[var(--a-muted)]">{tier.sub}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--a-rule)]">
                  {ROWS.map((r) => (
                    <tr key={r.label} className="align-top">
                      <th scope="row" className="py-4 pr-4 text-[14px] font-semibold text-[var(--a-ink)]">{r.label}</th>
                      <td className="py-4 px-4 text-[14px] text-[var(--a-muted)]">{r.free}</td>
                      <td className="py-4 px-4 text-[14px] text-[var(--a-muted)]">{r.cloud}</td>
                      <td className="py-4 px-4 text-[14px] font-medium text-[var(--a-ink)] bg-[var(--a-surface)]">{r.studio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 06 LAYOUTS */}
          <section id="layouts" className="scroll-mt-32 space-y-8">
            <ChapterHeader
              n="06"
              eyebrow="SaaS & app layouts"
              title="Page layouts for SaaS dashboards, data tables, and guides."
              intro="Complex dashboards and filterable data tables are where Cloud AI + STYLES.md or a :-] Sprint really shine. Explore seven tested layouts below."
            />
            <AccentAppLayouts />
          </section>

          {/* 07 HANDOFF */}
          <section id="handoff" className="scroll-mt-32 space-y-8">
            <ChapterHeader
              n="07"
              eyebrow="How the tools connect"
              title="From rough notes to a live site."
              intro="Draft notes on your phone, build a first site on your computer, fix words right in Chrome, and hand clean files to any AI coding tool when you want more."
            />
            <ol className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
              {ECOSYSTEM_HANDOFF_STEPS.map((s) => (
                <li key={s.step} className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 py-5 md:grid-cols-[40px_220px_minmax(0,1fr)]">
                  <span className="font-mono text-[14px] font-bold text-[var(--a-accent-text,var(--a-accent))]">0{s.step}</span>
                  <div>
                    <div className="text-[16px] font-semibold text-[var(--a-ink)]">{s.product}</div>
                    <div className="text-[13px] text-[var(--a-muted)]">{s.role}</div>
                  </div>
                  <p className="col-start-2 md:col-start-3 text-[14px] leading-relaxed text-[var(--a-muted)]">{s.plainEnglishSummary}</p>
                </li>
              ))}
            </ol>
            <div className="flex flex-col gap-5 rounded-2xl bg-[var(--a-ink)] p-8 text-[var(--a-bg)] md:flex-row md:items-center md:justify-between">
              <div className="max-w-[52ch] space-y-2">
                <p className="font-mono text-[13px] font-bold uppercase tracking-wider opacity-70">When you want it finished</p>
                <p className="font-serif text-2xl font-semibold">Start free. Bring in Colon Hyphen Bracket whenever you’re ready.</p>
              </div>
              <a
                href="https://colonhyphenbracket.pink"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] shrink-0 items-center gap-2 self-start rounded-full bg-[var(--a-bg)] px-6 text-[14px] font-semibold text-[var(--a-ink)] md:self-auto"
              >
                Book a :-] design sprint <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
