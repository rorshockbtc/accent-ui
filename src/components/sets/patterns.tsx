'use client';

import React, { useMemo, useState } from 'react';
import { Check, WifiOff, AlertTriangle, Inbox } from 'lucide-react';
import { Stage, Seg, DoDont, DimH, DimV, HitBox, Tag, FocusMark } from '../primitives';
import { getAllAccentRules } from '@/content/accent/registry';
import { EditorialPlate } from '../sample-media';

/* ---------- shared helpers (sample content + editorial illustrations) ---------- */

const INK = '#111827';
const MUTED = '#4B5563';
const PINK = '#A3285C';
const STONE = '#E8E2D5';
const CARD = '#F3EFE9';
const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3285C]';

const Art = ({ i = 0, className = '', style }: { i?: number; className?: string; style?: React.CSSProperties }) => (
  <EditorialPlate i={i} className={`border border-[#111827]/15 ${className}`} style={style} />
);

const Lorem = ({ n = 3 }: { n?: number }) => (
  <>
    {['A bakery opens at five. The first loaf is for the baker, the second for the street, and the rest for whoever shows up.', 'Good layouts work the same way: someone has to be served first, and it should be the reader.', 'The rest is spacing.'].slice(0, n).map((t, i) => (
      <p key={i} className="mb-3">{t}</p>
    ))}
  </>
);

function Phone({ children, w = 390, h = 560, scale = 0.62, label, landscape = false }: { children: React.ReactNode; w?: number; h?: number; scale?: number; label?: string; landscape?: boolean }) {
  const W = landscape ? h : w;
  const H = landscape ? w : h;
  return (
    <figure className="m-0 inline-block text-center" aria-label={label}>
      <div style={{ width: W * scale, height: H * scale }} className="relative overflow-hidden rounded-[22px] border-4 border-[#111827] bg-white">
        <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left' }} className="relative overflow-hidden text-[14px] leading-6 text-[#111827]">
          {children}
        </div>
      </div>
      {label && <figcaption className="mt-2 text-xs font-mono text-[#4B5563]">{label}</figcaption>}
    </figure>
  );
}

/* =====================================================================
   ARTICLE
   ===================================================================== */

function ArticleAnatomy() {
  const marks = [
    ['Kicker', 'Uppercase 12px, tracked 0.08em'],
    ['Title', 'Serif 40–56px, leading 1.1'],
    ['Dek', 'Sans 18px, muted'],
    ['Byline', 'Sans 14px, tabular dates'],
    ['Body', 'Serif 18–20px, 65ch, leading 1.7'],
    ['Pull quote', 'Once per essay, inside the measure'],
    ['Footnotes', '14px, numbered, linked back'],
    ['Related', 'After the end mark, never beside the text'],
  ];
  return (
    <Stage label="Reading view anatomy" caption="Eight parts, one column. Everything that is not in this list is competing with the words.">
      <div className="grid gap-6 md:grid-cols-[minmax(0,420px)_1fr]">
        <div className="relative mx-auto w-full max-w-[420px] rounded border border-[#E8E2D5] bg-white p-6" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
          <FocusMark n={1} className="-left-2 top-4" />
          <div className="text-xs font-mono uppercase tracking-[0.08em] text-[#A3285C]">Essay</div>
          <FocusMark n={2} className="-left-2 top-12" />
          <h4 className="mt-1 text-[28px] font-semibold leading-[1.1]">The loaf and the line</h4>
          <FocusMark n={3} className="-left-2 top-[96px]" />
          <p className="mt-2 text-sm text-[#4B5563]" style={{ fontFamily: 'var(--font-sans), system-ui' }}>On who a layout should serve first.</p>
          <FocusMark n={4} className="-left-2 top-[132px]" />
          <p className="mt-2 text-xs tabular-nums text-[#4B5563]" style={{ fontFamily: 'var(--font-sans), system-ui' }}>M. Okafor · 4 Mar 2026 · 6 min</p>
          <FocusMark n={5} className="-left-2 top-[170px]" />
          <p className="mt-3 text-base leading-7">A bakery opens at five. The first loaf is for the baker, the second for the street.</p>
          <FocusMark n={6} className="-left-2 top-[250px]" />
          <blockquote className="my-3 border-l-2 border-[#D44983] pl-3 text-lg italic leading-7">Someone has to be served first.</blockquote>
          <FocusMark n={7} className="-left-2 top-[320px]" />
          <p className="text-xs text-[#4B5563]" style={{ fontFamily: 'var(--font-sans), system-ui' }}>1. Sample footnote, linked back to its mark.</p>
          <FocusMark n={8} className="-left-2 top-[350px]" />
          <div className="mt-3 border-t border-[#E8E2D5] pt-2 text-xs text-[#4B5563]">Related: Spacing, Measure</div>
        </div>
        <ol className="m-0 list-none space-y-1 p-0 text-sm">
          {marks.map(([a, b], i) => (
            <li key={a} className="flex gap-2"><Tag tone="pink">{i + 1}</Tag><span><strong>{a}.</strong> {b}</span></li>
          ))}
        </ol>
      </div>
    </Stage>
  );
}

function ArticleDoMeasure() {
  return (
    <DoDont
      label="Measure"
      doExample={<div className="max-w-[34ch] text-[15px] leading-7" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}><Lorem n={2} /></div>}
      dontExample={<div className="w-full text-[15px] leading-[1.2] text-justify" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}><Lorem n={2} /><Lorem n={1} /></div>}
      doWhy="A 65ch column with 1.7 leading keeps the eye on its line (scaled down here)."
      dontWhy="Full-width, justified, tight leading: rivers of white space and lost line starts."
    />
  );
}

function ArticleDoImage() {
  const fig = (wide: boolean) => (
    <div className="w-full max-w-[300px] text-xs">
      <Art i={1} style={{ height: wide ? 104 : 90, width: wide ? '100%' : 120, float: wide ? undefined : 'left', margin: wide ? 0 : '0 10px 0 0' }} />
      {wide ? <p className="mt-1 text-xs text-[#4B5563]">Fig. 1. First sourdough boule out of the deck oven at 5:15 a.m.</p> : null}
      <p className="mt-2 text-[13px] leading-5">Body text continues here. Wrapping text around a small image squeezes the measure to a few words per line, so the reader stumbles.</p>
    </div>
  );
  return (
    <DoDont
      label="Images in articles"
      doExample={fig(true)}
      dontExample={fig(false)}
      doWhy="Image on its own row at column width, caption under it, text resumes at full measure."
      dontWhy="Floating a small image beside the text shrinks the measure and drops the caption entirely."
    />
  );
}

function ArticleRedline() {
  return (
    <Stage label="Redline: column and rhythm" caption="Column 65ch (about 620px at 19px). Leading 32px sits on the 8px grid. Space above a subhead is 2× the space below.">
      <div className="flex gap-3">
        <div className="pt-6"><DimV height={96} label="32 × 3" /></div>
        <div>
          <DimH width={300} label="65ch ≈ 620px (scaled)" />
          <div className="mt-6 w-[300px] border-x border-dashed border-[#D44983] px-0 text-[15px] leading-8" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
            <h4 className="mb-2 mt-4 text-xl font-semibold leading-8">Subhead</h4>
            <p>Body line one on the grid.<br />Body line two on the grid.<br />Body line three.</p>
          </div>
        </div>
      </div>
    </Stage>
  );
}

function ArticleLongNews() {
  const [m, setM] = useState<'long' | 'news'>('long');
  const long = m === 'long';
  return (
    <Stage label="Long-form vs news" controls={<Seg label="Article type" value={m} onChange={setM} options={[{ id: 'long', label: 'Long-form' }, { id: 'news', label: 'News' }]} />}
      caption={long ? 'Long-form: quiet header, 20px serif, 1.75 leading, one pull quote, footnotes.' : 'News: headline first, 17px serif, 1.55 leading, short paragraphs, related links near the top.'}>
      <div className="mx-auto max-w-[360px] rounded border border-[#E8E2D5] bg-white p-5" style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}>
        <h4 className={`font-semibold ${long ? 'text-[26px] leading-[1.15]' : 'text-[22px] leading-[1.2]'}`}>{long ? 'The loaf and the line' : 'Corner bakery extends hours'}</h4>
        <p className="mt-1 text-xs text-[#4B5563]" style={{ fontFamily: 'var(--font-sans), system-ui' }}>{long ? '6 min read' : 'Updated 9:40, 2 min'}</p>
        {!long && <p className="mt-2 text-xs font-medium text-[#A3285C]" style={{ fontFamily: 'var(--font-sans), system-ui' }}>Also: Hours, Parking</p>}
        <div className={`mt-3 ${long ? 'text-[17px] leading-[1.75]' : 'text-[15px] leading-[1.55]'}`}>
          <p className="mb-2">{long ? 'A bakery opens at five. The first loaf is for the baker.' : 'The shop will open at 6 a.m. starting Monday.'}</p>
          {long && <blockquote className="my-2 border-l-2 border-[#D44983] pl-3 italic">Someone has to be served first.</blockquote>}
          <p>{long ? 'The second is for the street.' : 'Owners cited commuter demand.'}</p>
        </div>
      </div>
    </Stage>
  );
}

function ArticleAx() {
  const [p, setP] = useState(40);
  return (
    <Stage label="Reading progress and landmarks" caption="Progress is decoration. It gets role=progressbar with a label, and nothing announces on scroll. The skip link is the first tab stop.">
      <div className="relative mx-auto max-w-[360px] rounded border border-[#E8E2D5] bg-white p-4">
        <FocusMark n={1} className="-left-2 -top-2" />
        <a href="#article-ax-main" className={`inline-flex min-h-[44px] items-center text-sm font-medium text-[#A3285C] underline ${FOCUS}`}>Skip to article</a>
        <div role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={p} className="my-2 h-1 w-full bg-[#E8E2D5]"><div className="h-1 bg-[#A3285C]" style={{ width: `${p}%` }} /></div>
        <article id="article-ax-main" className="relative text-[15px] leading-7"><FocusMark n={2} className="-left-6 top-0" /><h4 className="font-semibold">One h1, ordered subheads</h4><p>Landmarks: header, nav, main, article, footer.</p></article>
        <label className="mt-2 flex items-center gap-2 text-sm">Simulate scroll
          <input type="range" min={0} max={100} value={p} onChange={(e) => setP(+e.target.value)} className={`h-11 flex-1 ${FOCUS}`} />
          <span className="w-10 tabular-nums">{p}%</span></label>
      </div>
    </Stage>
  );
}

/* =====================================================================
   PORTFOLIO
   ===================================================================== */

const WORKS = [
  ['Studio A', 'Identity', 0], ['Harbor', 'Web', 1], ['Quarry', 'Print', 2], ['Moth', 'Identity', 3], ['Field Notes', 'Print', 4], ['Lantern', 'Web', 5],
] as const;

function PortfolioRatios() {
  const [r, setR] = useState<'4/5' | '1/1' | '3/2'>('4/5');
  return (
    <Stage label="Tile ratios" controls={<Seg label="Tile ratio" value={r} onChange={setR} options={[{ id: '4/5', label: '4:5' }, { id: '1/1', label: '1:1' }, { id: '3/2', label: '3:2' }]} />}
      caption="Pick one ratio per grid. 4:5 suits posters and print, 1:1 suits identity marks, 3:2 suits screens. Gap is 16px; the caption sits below the art.">
      <ul className="m-0 grid list-none grid-cols-3 gap-4 p-0">
        {WORKS.map(([t, k, i]) => (
          <li key={t}><Art i={i} className="w-full rounded-sm" style={{ aspectRatio: r.replace('/', ' / ') }} /><p className="mt-1 text-sm font-medium leading-5">{t}</p><p className="text-xs text-[#4B5563]">{k}</p></li>
        ))}
      </ul>
    </Stage>
  );
}

function PortfolioFilter() {
  const [f, setF] = useState('All');
  const cats = ['All', 'Identity', 'Web', 'Print'];
  const shown = WORKS.filter((w) => f === 'All' || w[1] === f);
  return (
    <Stage label="Filtering" caption="Filters are buttons with aria-pressed, not tabs. The count is announced politely; the page never reflows in a way that moves the buttons.">
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter work">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={f === c} onClick={() => setF(c)} className={`min-h-[44px] rounded-full border px-4 text-sm ${FOCUS} ${f === c ? 'border-[#111827] bg-[#111827] text-white' : 'border-[#E8E2D5] bg-white'}`}>{c}</button>
        ))}
      </div>
      <p role="status" className="mb-2 text-sm tabular-nums text-[#4B5563]">{shown.length} of {WORKS.length} projects</p>
      <ul className="m-0 grid min-h-[130px] list-none grid-cols-3 gap-4 p-0">
        {shown.map(([t, , i]) => (<li key={t}><Art i={i} className="aspect-[4/5] w-full" /><p className="mt-1 text-sm">{t}</p></li>))}
      </ul>
    </Stage>
  );
}

function PortfolioDoCaptions() {
  const [hov, setHov] = useState(false);
  return (
    <DoDont
      label="Captions"
      doExample={<figure className="m-0 w-[140px]"><Art i={2} className="aspect-[4/5]" /><figcaption className="mt-1 text-sm font-medium">Quarry, 2025<br /><span className="text-xs text-[#4B5563]">Poster series</span></figcaption></figure>}
      dontExample={<div className="relative w-[140px]" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}><Art i={2} className="aspect-[4/5]" />{hov && <div className="absolute inset-0 grid place-items-center bg-[#D44983]/90 text-center text-xs text-white">Quarry<br />Poster series</div>}<p className="mt-1 text-xs text-[#4B5563]">Hover the tile</p></div>}
      doWhy="Title and kind sit below the art, always visible, so touch and keyboard users get the same information."
      dontWhy="A hover-only caption does not exist on a phone and low-contrast pink text on art fails AAA."
    />
  );
}

function PortfolioDoRatio() {
  const mixed = [[60, 90], [60, 50], [60, 120], [60, 70], [60, 100], [60, 60]];
  return (
    <DoDont
      label="Tile proportions"
      doExample={<div className="grid w-[210px] grid-cols-3 gap-2">{[0, 1, 2, 3, 4, 5].map((i) => <Art key={i} i={i} className="aspect-[4/5]" />)}</div>}
      dontExample={<div className="flex w-[210px] items-start gap-[3px]">{mixed.map(([w, h], i) => <Art key={i} i={i} style={{ width: w / 3, height: h }} />)}</div>}
      doWhy="One ratio, one gap: the grid becomes the frame and the work supplies the variety."
      dontWhy="Random heights and 3px gaps make the page look like a collage and break the 8px rhythm."
    />
  );
}

function PortfolioRedline() {
  return (
    <Stage label="Redline: tile" caption="Tile 4:5 with 16px gap. Caption block 56px: title 14/20, kind 12/16, 8px above. The whole tile is one link.">
      <div className="flex items-start gap-3">
        <div className="pt-1"><DimV height={150} label="4:5" /></div>
        <div className="w-[120px]">
          <DimH width={120} label="col" />
          <Art i={3} className="mt-5 h-[150px] w-full" />
          <div className="mt-2 flex gap-2"><DimV height={40} label="56" /><div className="pl-8"><p className="text-sm font-medium leading-5">Moth</p><p className="text-xs leading-4 text-[#4B5563]">Identity</p></div></div>
        </div>
      </div>
    </Stage>
  );
}

function PortfolioCaseStudy() {
  const parts = [['Hero', 'Title, one-line outcome, role, year', 3], ['Context', 'Client, problem, constraints (60ch)', 4], ['Process', 'Two to four images, each with a caption', 2], ['Result', 'One number or one sentence that proves it', 5], ['Next', 'Link to the next project']] as const;
  return (
    <Stage label="Case study structure" caption="Five blocks, same order every time. Readers who only scroll still learn what you did and what happened.">
      <ol className="m-0 grid list-none gap-3 p-0 sm:grid-cols-5">
        {parts.map(([t, d, a], i) => (
          <li key={t} className="rounded border border-[#E8E2D5] bg-white p-2">
            {i < 4 ? <Art i={a} className="mb-2 h-14" /> : <div className="mb-2 h-14 border border-dashed border-[#D44983]" />}
            <p className="text-sm font-medium"><span className="tabular-nums">{i + 1}.</span> {t}</p><p className="text-xs leading-4 text-[#4B5563]">{d}</p>
          </li>
        ))}
      </ol>
    </Stage>
  );
}

function PortfolioAx() {
  return (
    <Stage label="Tile as a single link" caption="One focus stop per tile. Alt text describes the work, not the file. Touch area is the whole tile, well past 44px.">
      <div className="flex flex-wrap items-start gap-6">
        <a href="#portfolio-ax" className={`relative block w-[140px] ${FOCUS}`} aria-label="Moth, identity project">
          <FocusMark n={1} className="-left-2 -top-2 z-10" />
          <Art i={3} className="aspect-[4/5]" /><span className="mt-1 block text-sm">Moth</span>
        </a>
        <div className="max-w-[260px] text-sm leading-6">
          <p className="mb-2"><Tag>img alt</Tag> “Geometric moth emblem with cream and pink wings below a crescent moon on dark ink.”</p>
          <p className="mb-2"><Tag tone="bad">bad alt</Tag> “IMG_2231.png”</p>
          <p className="flex items-center gap-2"><HitBox w={44} h={44} label="44"><span className="text-xs">tap</span></HitBox></p>
        </div>
      </div>
    </Stage>
  );
}

/* =====================================================================
   MOBILE
   ===================================================================== */

const TabBar = ({ items = ['Home', 'Menu', 'Order', 'Visit'], sticky = true }: { items?: string[]; sticky?: boolean }) => (
  <nav aria-label="Primary" className={`${sticky ? 'absolute bottom-0 left-0 right-0' : ''} flex border-t border-[#E8E2D5] bg-white pb-[34px]`}>
    {items.map((t, i) => <span key={t} className={`grid min-h-[44px] flex-1 place-items-center text-xs font-medium ${i === 0 ? 'text-[#A3285C]' : 'text-[#4B5563]'}`}>{t}</span>)}
  </nav>
);

function MobileNavFrames() {
  const [zone, setZone] = useState(true);
  return (
    <Stage label="Thumb zones and navigation" controls={<Seg label="Zones" value={zone ? 'on' : 'off'} onChange={(v) => setZone(v === 'on')} options={[{ id: 'on', label: 'Zones on' }, { id: 'off', label: 'Off' }]} />}
      caption="Reach on a one-handed grip: green is easy, amber a stretch, red needs a second hand. A bottom bar lives in the easy zone; a top bar lives in the red.">
      <div className="flex flex-wrap justify-center gap-6">
        {(['Top nav', 'Bottom nav'] as const).map((k) => (
          <Phone key={k} label={k} h={600}>
            {zone && <div aria-hidden className="absolute inset-0 z-10" style={{ background: 'linear-gradient(180deg,rgba(159,18,57,.18) 0 25%,rgba(217,119,6,.18) 25% 55%,rgba(22,101,52,.2) 55% 100%)', pointerEvents: 'none' }} />}
            {k === 'Top nav' && <header className="flex min-h-[56px] items-center justify-between border-b border-[#E8E2D5] px-4 pt-6"><b>Corner Bakery</b><span className="text-xs">Menu</span></header>}
            {k === 'Bottom nav' && <header className="flex min-h-[56px] items-center border-b border-[#E8E2D5] px-4 pt-6"><b>Corner Bakery</b></header>}
            <Art i={4} className="m-4 h-40" /><p className="px-4">Sourdough, rye, and Saturday-only focaccia.</p>
            {k === 'Bottom nav' && <TabBar />}
          </Phone>
        ))}
      </div>
    </Stage>
  );
}

function MobileCta() {
  return (
    <Stage label="Sticky CTA and safe areas" caption="The CTA bar is 16px padded, 48px tall button, and adds env(safe-area-inset-bottom) so the home indicator never overlaps it. Content gets matching bottom padding.">
      <div className="flex flex-wrap justify-center gap-6">
        <Phone label="With safe area" h={600}>
          <div className="pt-8 px-4"><h4 className="text-xl font-semibold">Sourdough, large</h4><Art i={1} className="my-3 h-36" /><p>Baked at 5 a.m. daily.</p></div>
          <div className="absolute bottom-0 left-0 right-0 border-t border-[#E8E2D5] bg-white px-4 pt-3" style={{ paddingBottom: 34 }}>
            <button type="button" className={`h-12 w-full rounded bg-[#111827] text-sm font-semibold text-white ${FOCUS}`}>Order for pickup</button>
          </div>
          <div aria-hidden className="absolute bottom-[10px] left-1/2 h-1 w-[120px] -translate-x-1/2 rounded bg-[#111827]" />
        </Phone>
        <Phone label="Redline" h={600}>
          <div className="relative h-full">
            <div className="absolute bottom-0 left-0 right-0 bg-[#F3EFE9] px-4 pt-3" style={{ paddingBottom: 34 }}>
              <div className="h-12 rounded bg-[#111827]" />
            </div>
            <div className="absolute bottom-[34px] left-1 top-auto"><DimV height={60} label="12+48" /></div>
            <div className="absolute bottom-0 right-2"><DimV height={34} label="34" /></div>
            <div className="absolute bottom-[86px] left-4"><DimH width={358} label="390 − 2×16" /></div>
          </div>
        </Phone>
      </div>
    </Stage>
  );
}

function MobileFormFrame() {
  return (
    <Stage label="Forms on a phone" caption="One column, visible labels, 16px text so iOS does not zoom, the right keyboard (inputMode, autoComplete), and the submit button where the thumb is.">
      <div className="flex justify-center">
        <Phone label="Contact form" h={600}>
          <form className="px-4 pt-8" onSubmit={(e) => e.preventDefault()}>
            <h4 className="mb-3 text-xl font-semibold">Order a cake</h4>
            {[['Name', 'text', 'name', 'text'], ['Phone', 'tel', 'tel', 'tel'], ['Pickup date', 'text', 'off', 'numeric']].map(([l, t, ac, im]) => (
              <label key={l} className="mb-3 block text-sm font-medium">{l}
                <input type={t} autoComplete={ac} inputMode={im as 'text'} className={`mt-1 block h-12 w-full rounded border border-[#4B5563] px-3 text-base ${FOCUS}`} /></label>
            ))}
            <button type="submit" className={`h-12 w-full rounded bg-[#111827] text-sm font-semibold text-white ${FOCUS}`}>Send request</button>
          </form>
        </Phone>
      </div>
    </Stage>
  );
}

function MobileLandscape() {
  const [o, setO] = useState<'p' | 'l'>('p');
  return (
    <Stage label="Landscape" controls={<Seg label="Orientation" value={o} onChange={setO} options={[{ id: 'p', label: 'Portrait' }, { id: 'l', label: 'Landscape' }]} />}
      caption="Landscape is 844×390: the bottom bar eats a third of the height, and the notch moves to the side. Switch to a rail or hide the bar on scroll, and pad left/right safe areas (47px).">
      <div className="flex justify-center">
        <Phone landscape={o === 'l'} label={o === 'p' ? '390×844 (scaled)' : '844×390 (scaled)'} h={o === 'l' ? 844 : 600} scale={o === 'l' ? 0.45 : 0.62}>
          <div className={o === 'l' ? 'flex h-full' : ''}>
            {o === 'l' && <nav aria-label="Rail" className="flex w-[72px] flex-col items-center gap-1 border-r border-[#E8E2D5] py-2 pl-[47px]" ><span className="text-xs">Home</span></nav>}
            <div className="p-4 pt-8"><h4 className="text-xl font-semibold">Corner Bakery</h4><Art i={4} className="my-3 h-24" /><p>Open 6–2.</p></div>
          </div>
          {o === 'p' && <TabBar />}
        </Phone>
      </div>
    </Stage>
  );
}

function MobileDoNav() {
  return (
    <DoDont
      label="Mobile navigation"
      doExample={<Phone label="" h={300} scale={0.5}><Art i={4} className="m-4 h-24" /><TabBar /></Phone>}
      dontExample={<Phone label="" h={300} scale={0.5}><div className="flex justify-end gap-[2px] p-2">{['Home', 'Menu', 'Order', 'Visit', 'Blog', 'Cart', 'FAQ'].map((t) => <span key={t} className="text-[10px] underline">{t}</span>)}</div><Art i={4} className="m-4 h-24" /></Phone>}
      doWhy="Four labelled destinations in the thumb zone, each a full-height 44px+ target."
      dontWhy="Seven 10px text links crammed in the top corner: unreadable, untappable, out of reach."
    />
  );
}

function MobileDoCta() {
  return (
    <DoDont
      label="Sticky CTA"
      doExample={<Phone label="" h={300} scale={0.5}><div className="p-4"><p>Sourdough</p><Art i={1} className="my-2 h-20" /></div><div className="absolute bottom-0 left-0 right-0 bg-white px-4 pb-6 pt-2"><div className="grid h-12 place-items-center rounded bg-[#111827] text-sm font-semibold text-white">Order</div></div></Phone>}
      dontExample={<Phone label="" h={300} scale={0.5}><div className="p-4"><p>Sourdough</p><Art i={1} className="my-2 h-20" /><p>Details the CTA covers.</p></div><div className="absolute bottom-0 left-0 right-0 grid h-[24px] place-items-center bg-[#D44983] text-[11px] text-white">ORDER NOW!!!</div></Phone>}
      doWhy="Full-width 48px button, safe-area padding, and page content never sits under it."
      dontWhy="A 24px strip with 11px text on pink fails 44px targets and contrast, and it hides the last paragraph."
    />
  );
}

function MobileRedline() {
  return (
    <Stage label="Redline: 390px screen" caption="Margins 16, gutter 16, targets 44 minimum, status bar 47, home indicator zone 34. Body text 16px with 24px leading.">
      <div className="flex justify-center">
        <Phone label="390 × 844 (scaled)" h={560}>
          <div className="relative h-full">
            <div aria-hidden className="absolute inset-x-0 top-0 h-[47px] bg-[#E8E2D5]/70 text-center text-xs">status 47</div>
            <div className="absolute left-4 right-4 top-16 h-24 border border-dashed border-[#D44983]" />
            <div className="absolute left-0 top-28"><DimH width={16} label="16" /></div>
            <div className="absolute left-[60px] top-12"><DimH width={270} label="358" /></div>
            <div className="absolute left-4 top-[200px]"><HitBox w={120} h={44} label="44 min"><span className="text-sm">Button</span></HitBox></div>
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-[34px] bg-[#E8E2D5]/70 text-center text-xs">home 34</div>
          </div>
        </Phone>
      </div>
    </Stage>
  );
}

function MobileAx() {
  return (
    <Stage label="Reach, order and zoom" caption="Focus order follows reading order, not visual position. Never set maximum-scale=1; people pinch to zoom on purpose.">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <Phone label="Focus order" h={400} scale={0.55}>
          <div className="relative p-4 pt-8">
            <FocusMark n={1} className="left-1 top-6" /><b>Corner Bakery</b>
            <FocusMark n={2} className="right-2 top-6" /><span className="float-right text-xs">Menu</span>
            <Art i={0} className="my-4 h-24" />
            <FocusMark n={3} className="left-1 top-[170px]" /><div className="grid h-12 place-items-center rounded bg-[#111827] text-sm text-white">Order</div>
          </div>
        </Phone>
        <pre className="m-0 max-w-[260px] whitespace-pre-wrap rounded bg-[#111827] p-3 text-xs text-[#F3EFE9]">{'<meta name="viewport"\n content="width=device-width,\n initial-scale=1">\n<!-- never: maximum-scale=1 -->'}</pre>
      </div>
    </Stage>
  );
}

/* =====================================================================
   STATES
   ===================================================================== */

type Kind = 'list' | 'form' | 'card';
const STATES = ['Empty', 'Loading', 'Error', 'Offline', 'Partial', 'Success'] as const;

const Sk = ({ w = '100%', h = 12 }: { w?: string | number; h?: number }) => <div aria-hidden className="animate-pulse rounded bg-[#E8E2D5] motion-reduce:animate-none" style={{ width: w, height: h }} />;

function StateBody({ kind, s }: { kind: Kind; s: (typeof STATES)[number] }) {
  const rows = ['Rye loaf', 'Focaccia', 'Croissant'];
  const msg = (icon: React.ReactNode, t: string, d: string, a?: string, role?: string) => (
    <div role={role} className="flex flex-col items-start gap-1 text-sm">{icon}<b>{t}</b><span className="text-xs leading-4 text-[#4B5563]">{d}</span>{a && <button type="button" className={`mt-1 min-h-[44px] rounded border border-[#111827] px-3 text-sm font-medium ${FOCUS}`}>{a}</button>}</div>
  );
  if (s === 'Loading') return kind === 'card' ? <div className="space-y-2"><Sk h={64} /><Sk w="70%" h={16} /><Sk w="50%" /></div> : <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="flex gap-2"><Sk w={32} h={32} /><div className="flex-1 space-y-2"><Sk w="60%" h={14} /><Sk w="40%" /></div></div>)}<span className="sr-only" role="status">Loading</span></div>;
  if (s === 'Empty') return msg(<Inbox className="h-5 w-5 text-[#4B5563]" aria-hidden />, kind === 'form' ? 'No saved details' : 'Nothing here yet', 'Add your first item to see it here.', 'Add item');
  if (s === 'Error') return msg(<AlertTriangle className="h-5 w-5 text-[#9F1239]" aria-hidden />, 'Could not save', 'Your entries are kept. Check the connection and try again.', 'Try again', 'alert');
  if (s === 'Offline') return msg(<WifiOff className="h-5 w-5 text-[#4B5563]" aria-hidden />, 'You are offline', 'Showing what we saved at 9:40. Changes sync when you reconnect.');
  if (s === 'Partial') return <div className="text-sm"><p className="mb-1 text-xs text-[#4B5563]">Showing 2 of 3. One failed to load.</p><ul className="m-0 list-none p-0">{rows.slice(0, 2).map((r) => <li key={r} className="border-b border-[#E8E2D5] py-1">{r}</li>)}</ul><button type="button" className={`mt-1 min-h-[44px] text-sm font-medium text-[#A3285C] underline ${FOCUS}`}>Retry the rest</button></div>;
  return msg(<Check className="h-5 w-5 text-[#166534]" aria-hidden />, kind === 'form' ? 'Request sent' : 'Saved', kind === 'form' ? 'We will call by noon.' : 'All changes are up to date.');
}

function StatesMatrix() {
  const [k, setK] = useState<Kind>('list');
  return (
    <Stage label="Six states, side by side" controls={<Seg label="Component" value={k} onChange={setK} options={[{ id: 'list', label: 'List' }, { id: 'form', label: 'Form' }, { id: 'card', label: 'Card' }]} />}
      caption="Every state says what happened, what it means for you, and what to do next. Colour is never the only signal.">
      <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {STATES.map((s) => (
          <li key={s} className="min-h-[170px] rounded border border-[#E8E2D5] bg-white p-3"><Tag>{s}</Tag><div className="mt-2"><StateBody kind={k} s={s} /></div></li>
        ))}
      </ul>
    </Stage>
  );
}

function StatesDoEmpty() {
  return (
    <DoDont
      label="Empty state"
      doExample={<div className="w-[200px]"><StateBody kind="list" s="Empty" /></div>}
      dontExample={<div className="w-[200px] text-center text-sm text-[#4B5563]">No data.</div>}
      doWhy="Names what is missing and gives one action that fixes it."
      dontWhy="Two words, no next step: the user cannot tell if it is broken, loading or truly empty."
    />
  );
}

function StatesDoError() {
  const [v, setV] = useState('ana@example.com');
  return (
    <DoDont
      label="Error state"
      doExample={<div className="w-[220px]" role="alert"><label className="text-sm font-medium">Email<input readOnly defaultValue="ana@example" className="mt-1 block h-11 w-full rounded border-2 border-[#9F1239] px-2 text-base" aria-invalid /></label><p className="mt-1 flex gap-1 text-xs text-[#9F1239]"><AlertTriangle className="h-4 w-4 shrink-0" aria-hidden />Add the part after @, like ana@example.com.</p></div>}
      dontExample={<div className="w-[220px]"><label className="text-sm font-medium">Email<input value={v} onChange={(e) => setV(e.target.value)} className="mt-1 block h-11 w-full rounded border border-[#4B5563] px-2 text-base" /></label><button type="button" onClick={() => setV('')} className="mt-2 min-h-[44px] w-full rounded bg-[#D44983] text-sm text-white">Submit (clears field)</button><p className="mt-1 text-xs text-[#D44983]">Error 500</p></div>}
      doWhy="Says what is wrong and how to fix it, keeps the input, and announces itself."
      dontWhy="A code, pale pink text and a wiped field punish the person for our failure."
    />
  );
}

function StatesRedline() {
  return (
    <Stage label="Redline: skeleton matches content" caption="A skeleton uses the real layout: 32px avatar, 14px and 12px lines, 8px gaps, 16px row padding. Pulse 1.5s, off under reduced motion.">
      <div className="flex gap-6">
        <div className="w-[240px]">
          <DimH width={240} label="row 240" />
          <div className="mt-6 flex gap-3 py-2"><Sk w={32} h={32} /><div className="flex-1 space-y-2"><Sk w="70%" h={14} /><Sk w="45%" h={12} /></div></div>
        </div>
        <DimV height={48} label="48" />
      </div>
    </Stage>
  );
}

function StatesAx() {
  const [s, setS] = useState<'idle' | 'load' | 'err'>('idle');
  const go = () => { setS('load'); setTimeout(() => setS('err'), 900); };
  return (
    <Stage label="Announcing state changes" caption="Loading and success use role=status (polite). Blocking errors use role=alert (assertive). Focus moves to the error summary only when a submit fails.">
      <button type="button" onClick={go} className={`min-h-[44px] rounded bg-[#111827] px-4 text-sm font-medium text-white ${FOCUS}`}>Save changes</button>
      <div className="mt-3 min-h-[48px] text-sm">
        <div role="status">{s === 'load' && 'Saving…'}</div>
        <div role="alert">{s === 'err' && <span className="flex gap-1 text-[#9F1239]"><AlertTriangle className="h-4 w-4" aria-hidden />Could not save. Your changes are still here.</span>}</div>
      </div>
      <p className="text-xs text-[#4B5563]">Screen reader hears: {s === 'idle' ? 'nothing' : s === 'load' ? '“Saving”' : '“Alert: Could not save. Your changes are still here.”'}</p>
    </Stage>
  );
}

/* =====================================================================
   BANG (illustrative templates; the Bang knowledge base is not in this repo)
   ===================================================================== */

type Tpl = 'store' | 'service' | 'portfolio';
const TPL_RULES: Record<Tpl, string[]> = {
  store: ['Hero shows one product and one price', 'Grid is 3 columns on desktop, 2 on phone', 'Cart is always reachable, 44px', 'Prices use tabular lining numerals'],
  service: ['Phone and hours above the fold', 'Phone is a tel: link', 'Three services max in the first grid', 'Booking form has 3 visible-label fields'],
  portfolio: ['One tile ratio throughout', 'Captions below the art', 'Case study order is fixed', 'Contact is the last block, not a popup'],
};

function BangTemplates() {
  const [t, setT] = useState<Tpl>('store');
  const [g, setG] = useState(true);
  return (
    <Stage label="Three site skeletons" controls={<><Seg label="Template" value={t} onChange={setT} options={[{ id: 'store', label: 'Storefront' }, { id: 'service', label: 'Service' }, { id: 'portfolio', label: 'Portfolio' }]} /><Seg label="Grid" value={g ? 'on' : 'off'} onChange={(v) => setG(v === 'on')} options={[{ id: 'on', label: 'Grid on' }, { id: 'off', label: 'Off' }]} /></>}
      caption="Illustrative skeletons. The Bang knowledge base is not in this repository, so these show the shape of the rules, not its source files.">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
        <div className="relative overflow-hidden rounded border border-[#E8E2D5] bg-white p-3">
          {g && <div aria-hidden className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-2 px-3">{Array.from({ length: 12 }).map((_, i) => <div key={i} className="bg-[#D44983]/10" />)}</div>}
          <header className="relative mb-3 flex min-h-[44px] items-center justify-between border-b border-[#E8E2D5]"><b className="text-sm">Corner Bakery</b><span className="text-xs">{t === 'store' ? 'Cart (2)' : t === 'service' ? 'Call 555-0134' : 'Contact'}</span></header>
          <div className="relative mb-3 grid grid-cols-12 gap-2"><Art i={t === 'store' ? 1 : t === 'service' ? 5 : 2} className="col-span-7 h-28" /><div className="col-span-5 text-sm"><b>{t === 'store' ? 'Rye loaf, $7' : t === 'service' ? 'Catering for 20+' : 'Selected work'}</b><p className="text-xs text-[#4B5563]">{t === 'service' ? 'Mon–Sat 6–2' : 'Baked daily'}</p></div></div>
          <div className={`relative grid gap-2 ${t === 'service' ? 'grid-cols-3' : 'grid-cols-3'}`}>{[0, 3, 4].map((i) => <div key={i}><Art i={i} className={t === 'portfolio' ? 'aspect-[4/5]' : 'aspect-square'} /><p className="mt-1 text-xs">{t === 'service' ? 'Service ' + (i + 1) : t === 'store' ? 'Item ' + (i + 1) : 'Project ' + (i + 1)}</p></div>)}</div>
          <footer className="relative mt-3 border-t border-[#E8E2D5] pt-2 text-xs text-[#4B5563]">12 Main St · Open today until 2</footer>
        </div>
        <ul className="m-0 list-none space-y-2 p-0 text-sm">{TPL_RULES[t].map((r) => <li key={r} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[#166534]" aria-hidden />{r}</li>)}</ul>
      </div>
    </Stage>
  );
}

function BangDoHero() {
  return (
    <DoDont
      label="Small-business hero"
      doExample={<div className="w-[220px] text-sm"><b>Corner Bakery</b><p className="text-xs text-[#4B5563]">Fresh bread since 1998. Open today until 2.</p><a href="tel:+15550134" className={`mt-2 inline-flex min-h-[44px] items-center rounded bg-[#111827] px-3 text-white ${FOCUS}`}>Call 555-0134</a></div>}
      dontExample={<div className="w-[220px] bg-gradient-to-r from-fuchsia-500 to-cyan-400 p-3 text-sm text-white"><b>WELCOME TO THE BEST BAKERY EVER!!!</b><p className="text-xs">#1 in the world. Award winning. Scroll to learn more.</p></div>}
      doWhy="Name, one true sentence, hours and a tap-to-call button in the first screen."
      dontWhy="Superlatives nobody can verify, a neon gradient with weak contrast, and no way to reach anyone."
    />
  );
}

function BangDoForm() {
  return (
    <DoDont
      label="Contact form"
      doExample={<form className="w-[220px] text-sm" onSubmit={(e) => e.preventDefault()}><label className="block font-medium">Your phone<input type="tel" autoComplete="tel" className={`mt-1 block h-11 w-full rounded border border-[#4B5563] px-2 text-base ${FOCUS}`} /></label><button type="submit" className={`mt-2 min-h-[44px] w-full rounded bg-[#111827] text-white ${FOCUS}`}>Request a call</button></form>}
      dontExample={<form className="w-[220px]" onSubmit={(e) => e.preventDefault()}><input placeholder="phone" className="h-8 w-full rounded border border-[#E8E2D5] px-2 text-xs" /><button type="submit" className="mt-2 h-8 w-full bg-[#D44983] text-xs text-white">go</button></form>}
      doWhy="Visible label, the right keyboard, a button that says what happens."
      dontWhy="Placeholder-only label vanishes on typing, 32px controls, 12px text, white on pink."
    />
  );
}

function BangRedline() {
  return (
    <Stage label="Redline: skeleton order" caption="Header 56, hero 320 (phone) or 480 (desktop), sections 64 apart, footer last. All multiples of 8 except the 1px rules.">
      <div className="flex gap-3">
        <div className="flex flex-col gap-2">{[['56', 56], ['120', 120], ['64', 64], ['40', 40]].map(([l, h]) => <DimV key={l} height={h as number} label={l as string} />)}</div>
        <div className="w-[200px] space-y-2">{['Header', 'Hero', 'Services / products', 'Footer'].map((l, i) => <div key={l} className="grid place-items-center border border-[#E8E2D5] bg-white text-xs" style={{ height: [56, 120, 64, 40][i] }}>{l}</div>)}</div>
      </div>
    </Stage>
  );
}

function BangAx() {
  return (
    <Stage label="Template checks that protect visitors" caption="Every Bang site ships with these four, because the owner will not check them by hand.">
      <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
        {[['Phone is a link', 'tel:+15550134', 1], ['Hours are text, not an image', 'Open today until 2', 2], ['Form labels visible', 'Your phone', 3], ['Tap targets', '44 × 44 minimum', 4]].map(([a, b, n]) => (
          <li key={a as string} className="relative rounded border border-[#E8E2D5] bg-white p-3 text-sm"><FocusMark n={n as number} className="-left-2 -top-2" /><b>{a}</b><p className="m-0 font-mono text-xs text-[#4B5563]">{b}</p></li>
        ))}
      </ul>
    </Stage>
  );
}

/* =====================================================================
   AI RULES
   ===================================================================== */

const SAMPLE = `<button className="h-8 px-[13px] text-[10px] bg-pink-500">Buy</button>
<div className="p-[13px] w-[403px]">Hello</div>`;

function AiChecker() {
  const [code, setCode] = useState(SAMPLE);
  const rules = useMemo(() => getAllAccentRules().filter((r) => r.violationPattern), []);
  const hits = useMemo(() => rules.flatMap((r) => { try { const m = code.match(new RegExp(r.violationPattern!, 'g')); return m ? [{ r, m: m.slice(0, 3) }] : []; } catch { return []; } }), [code, rules]);
  return (
    <Stage label="Live rule checker" caption={`Runs every violationPattern from getAllAccentRules() (${rules.length} patterned rules) against your TSX. This is the same registry rules.json serves.`}>
      <label className="block text-sm font-medium">Paste TSX
        <textarea value={code} onChange={(e) => setCode(e.target.value)} rows={5} spellCheck={false} className={`mt-1 block w-full rounded border border-[#4B5563] bg-white p-2 font-mono text-xs ${FOCUS}`} /></label>
      <div role="status" className="mt-3 text-sm"><b className="tabular-nums">{hits.length}</b> rule{hits.length === 1 ? '' : 's'} violated</div>
      <ul className="m-0 mt-2 list-none space-y-2 p-0">
        {hits.map(({ r, m }) => (
          <li key={r.id} className="rounded border border-[#9F1239]/40 bg-white p-2 text-sm"><Tag tone="bad">{r.id}</Tag> <span>{r.statement}</span><p className="m-0 mt-1 font-mono text-xs text-[#4B5563]">matched: {m.join(' · ')}</p></li>
        ))}
        {hits.length === 0 && <li className="flex gap-2 text-sm text-[#166534]"><Check className="h-4 w-4" aria-hidden />No violations matched.</li>}
      </ul>
    </Stage>
  );
}

function AiCounts() {
  const rows = useMemo(() => {
    const all = getAllAccentRules();
    const by = new Map<string, { n: number; p: number }>();
    for (const r of all) { const c = r.id.split('.')[0]; const e = by.get(c) ?? { n: 0, p: 0 }; e.n++; if (r.violationPattern) e.p++; by.set(c, e); }
    return { total: all.length, list: [...by.entries()].sort((a, b) => b[1].n - a[1].n) };
  }, []);
  return (
    <Stage label="Rule categories (computed at render)" caption={`${rows.total} rules across ${rows.list.length} id prefixes. “Mechanical” rules have a regex a script can enforce; the rest need judgment.`}>
      <table className="w-full border-collapse text-left text-sm tabular-nums">
        <caption className="sr-only">Rule counts by category</caption>
        <thead><tr className="border-b border-[#111827]"><th scope="col" className="py-1">Category</th><th scope="col" className="py-1 text-right">Rules</th><th scope="col" className="py-1 text-right">Mechanical</th></tr></thead>
        <tbody>{rows.list.map(([c, v]) => <tr key={c} className="border-b border-[#E8E2D5]"><th scope="row" className="py-1 font-mono text-xs font-normal">{c}</th><td className="py-1 text-right">{v.n}</td><td className="py-1 text-right">{v.p}</td></tr>)}</tbody>
      </table>
    </Stage>
  );
}

function AiBeforeAfter() {
  const [w, setW] = useState(0);
  const sizes = ['w-[403px]', 'w-[400px]'];
  return (
    <Stage label="7B model enlarging a card" controls={<Seg label="Version" value={String(w) as '0' | '1'} onChange={(v) => setW(+v)} options={[{ id: '0', label: 'Before' }, { id: '1', label: 'After' }]} />}
      caption="Asked to “make it bigger,” a 7B model picks 403 and 13. With the rule “change size only in 8px steps,” it picks 400 and 16, and the grid survives.">
      <div className="space-y-3">
        <div className="text-xs font-mono">{w === 0 ? '403 × 417, padding 13' : '400 × 408, padding 16'}</div>
        <DimH width={w === 0 ? 242 : 240} label={sizes[w].slice(3, 6)} />
        <div className="rounded border border-[#E8E2D5] bg-[#F3EFE9]" style={{ width: w === 0 ? 242 : 240, padding: w === 0 ? 8 : 10, height: w === 0 ? 100 : 98 }}>
          <div className="h-full bg-[#E8E2D5]" /></div>
        <pre className="m-0 overflow-x-auto rounded bg-[#111827] p-2 text-xs text-[#F3EFE9]">{w === 0 ? '<Card className="w-[403px] p-[13px]">' : '<Card className="w-[400px] p-4">'}</pre>
      </div>
    </Stage>
  );
}

function AiDoScoped() {
  const chip = (t: string, bad = false) => <span className={`m-0.5 inline-block rounded px-1.5 text-xs font-mono ${bad ? 'bg-[#9F1239] text-white' : 'bg-[#166534] text-white'}`}>{t}</span>;
  return (
    <DoDont
      label="Prompt scope"
      doExample={<div className="w-[240px] text-sm"><b>Step 2 of 4: spacing</b><div>{chip('grid.multiple-of-8')}{chip('grid.no-arbitrary')}</div><p className="text-xs">Only the rules for this step.</p></div>}
      dontExample={<div className="w-[240px] text-sm"><b>One 2,500-word prompt</b><div>{['grid', 'type', 'color', 'icons', 'motion', 'nav', 'forms', 'cards', 'charts', 'dark', '…'].map((t) => chip(t, true))}</div><p className="text-xs">Everything at once.</p></div>}
      doWhy="Each step carries only the rules it needs, so a 7B model can keep them all in mind."
      dontWhy="Dumping every rule into one prompt overflows a small model's attention; it follows the last few."
    />
  );
}

function AiAx() {
  const pats = useMemo(() => getAllAccentRules().filter((r) => /target|hit|alt|aria|focus|contrast|text|min/i.test(r.id)), []);
  return (
    <Stage label="Rules that protect people" caption={`${pats.length} rules in the registry touch targets, text size, labels or focus. A failing generation here is an accessibility bug, not a style note.`}>
      <ul className="m-0 grid list-none gap-1 p-0 text-sm sm:grid-cols-2">{pats.slice(0, 12).map((r) => <li key={r.id} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-[#166534]" aria-hidden /><span><span className="font-mono text-xs">{r.id}</span></span></li>)}</ul>
    </Stage>
  );
}


function AiDoGridSteps() {
  return (
    <DoDont
      label="Resize instruction"
      doExample={<pre className="m-0 w-[250px] whitespace-pre-wrap rounded bg-[#111827] p-2 text-xs text-[#F3EFE9]">{'Make the card bigger.\nChange width/height in 8px steps only: 400 → 408 → 416.'}</pre>}
      dontExample={<pre className="m-0 w-[250px] whitespace-pre-wrap rounded bg-[#111827] p-2 text-xs text-[#F3EFE9]">{'Make the card bigger.\n(no constraint)\n→ w-[403px] p-[13px]'}</pre>}
      doWhy="A concrete step size gives a small model a rule it can check against its own output."
      dontWhy="“Bigger” with no unit lets the model pick any number, and it will pick odd ones."
    />
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'article-anatomy': ArticleAnatomy,
  'article-do-measure': ArticleDoMeasure,
  'article-do-image': ArticleDoImage,
  'article-redline': ArticleRedline,
  'article-long-vs-news': ArticleLongNews,
  'article-ax-reading': ArticleAx,
  'portfolio-ratios': PortfolioRatios,
  'portfolio-filter': PortfolioFilter,
  'portfolio-do-captions': PortfolioDoCaptions,
  'portfolio-do-ratio': PortfolioDoRatio,
  'portfolio-redline-tile': PortfolioRedline,
  'portfolio-case-study': PortfolioCaseStudy,
  'portfolio-ax-tile': PortfolioAx,
  'mobile-nav-frames': MobileNavFrames,
  'mobile-cta': MobileCta,
  'mobile-form-frame': MobileFormFrame,
  'mobile-landscape': MobileLandscape,
  'mobile-do-nav': MobileDoNav,
  'mobile-do-cta': MobileDoCta,
  'mobile-redline': MobileRedline,
  'mobile-ax-order': MobileAx,
  'states-matrix': StatesMatrix,
  'states-do-empty': StatesDoEmpty,
  'states-do-error': StatesDoError,
  'states-redline-skeleton': StatesRedline,
  'states-ax-announce': StatesAx,
  'bang-templates': BangTemplates,
  'bang-do-hero': BangDoHero,
  'bang-do-form': BangDoForm,
  'bang-redline-skeleton': BangRedline,
  'bang-ax-checks': BangAx,
  'ai-rule-checker': AiChecker,
  'ai-rule-counts': AiCounts,
  'ai-before-after-8px': AiBeforeAfter,
  'ai-do-scoped': AiDoScoped,
  'ai-ax-protect': AiAx,
  'ai-do-grid-steps': AiDoGridSteps,
};
