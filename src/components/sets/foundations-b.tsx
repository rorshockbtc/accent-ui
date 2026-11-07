'use client';

import React, { useState } from 'react';
import { Check, X, Play, RotateCcw } from 'lucide-react';
import { Stage, Seg, DoDont, DimH, DimV, HitBox, Tag, FocusMark } from '../primitives';
import { CoastalLighthouseScene, SAMPLE_PHOTOS } from '../sample-media';
import {
  RiseLines,
  FadeUp,
  Hairline,
  ScaryHeadline,
  Smile,
  HOME_SCARY_PAIRS,
  DESIGN_SYSTEM_SCARY_PAIRS,
} from '../editorial-motion/AccentBrandMotion';
import { AccentRevealText } from '../editorial-motion/AccentRevealText';
import { AccentKineticBadge } from '../editorial-motion/AccentKineticBadge';

/* Foundations B: imagery, shape, layout, touch, motion. */

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';
const btn =
  'inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-4 rounded-md bg-[#111827] text-white text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3285C]';
const Cap = ({ children }: { children: React.ReactNode }) => (
  <span className="text-xs font-mono text-[#4B5563] tabular-nums">{children}</span>
);

function lum(hex: string) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
function blend(top: string, alpha: number, base: string) {
  const ch = [1, 3, 5].map((i) => Math.round(parseInt(top.slice(i, i + 2), 16) * alpha + parseInt(base.slice(i, i + 2), 16) * (1 - alpha)));
  return '#' + ch.map((v) => v.toString(16).padStart(2, '0')).join('');
}
function Replay({ children }: { children: (k: number) => React.ReactNode }) {
  const [k, setK] = useState(0);
  return (
    <div className="flex flex-col gap-3 w-full">
      <div>{children(k)}</div>
      <button type="button" className={btn + ' self-start'} onClick={() => setK((n) => n + 1)}>
        <Play className="h-4 w-4" aria-hidden /> Replay
      </button>
    </div>
  );
}
/** Box that slides on mount/replay. mode=transform|width. */
function Slider({ k, ms, ease, mode = 'transform' }: { k: number; ms: number; ease: string; mode?: 'transform' | 'width' }) {
  const [on, setOn] = useState(false);
  React.useEffect(() => {
    setOn(false);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
    return () => cancelAnimationFrame(id);
  }, [k]);
  const t = `${ms}ms ${ease}`;
  return (
    <div className="relative h-12 w-full rounded bg-[#E8E2D5] overflow-hidden">
      {mode === 'transform' ? (
        <div className="absolute left-0 top-2 h-8 w-12 rounded bg-[#A3285C]" style={{ transform: on ? 'translateX(160px)' : 'translateX(0)', transition: `transform ${t}` }} />
      ) : (
        <div className="absolute left-0 top-2 h-8 rounded bg-[#9F1239]" style={{ width: on ? 208 : 48, transition: `width ${t}` }} />
      )}
    </div>
  );
}

/* ===================== IMAGERY ===================== */

function ImgRatioLadder() {
  const items: [string, string, number][] = [
    ['16:10 hero', 'aspect-[16/10]', 168],
    ['4:5 portrait', 'aspect-[4/5]', 96],
    ['1:1 square', 'aspect-square', 112],
    ['400×408 card art', 'aspect-[400/408]', 112],
    ['3:1 banner', 'aspect-[3/1]', 240],
  ];
  return (
    <Stage label="Aspect ratio ladder" caption="Five frames, drawn at real proportions around the same coastal lighthouse scene (focal point anchored on the tower). Anything else is a crop away from one of these.">
      <ul className="flex flex-wrap items-end gap-6 list-none p-0 m-0">
        {items.map(([name, cls, w]) => (
          <li key={name} className="flex flex-col gap-2">
            <div className={`${cls} rounded overflow-hidden border border-[#111827]/15 bg-[#E8E2D5]`} style={{ width: w }}>
              <CoastalLighthouseScene preserveAspectRatio="xMaxYMid slice" ariaLabel={`${name} crop of lighthouse`} />
            </div>
            <Cap>{name}</Cap>
          </li>
        ))}
      </ul>
    </Stage>
  );
}

function ImgCls() {
  const [loaded, setLoaded] = useState(true);
  const text = <p className="text-sm leading-6 mt-3 m-0">Price: $24 per month. This paragraph is what the reader was about to tap.</p>;
  return (
    <Stage
      label="Reserving space (CLS)"
      controls={<Seg label="Image state" value={loaded ? 'l' : 'p'} onChange={(v) => setLoaded(v === 'l')} options={[{ id: 'p', label: 'Loading' }, { id: 'l', label: 'Loaded' }]} />}
      caption="Toggle between Loading and Loaded. Left: no dimensions, so the paragraph jumps 120px when the photo arrives. Right: the 16:6 frame is held open in Sandstone (#E8E2D5), so nothing moves."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Tag tone="bad">No dimensions (shifts layout)</Tag>
          <div className="mt-2 rounded overflow-hidden border border-[#111827]/10" style={{ height: loaded ? 120 : 0 }}>
            {loaded && <CoastalLighthouseScene preserveAspectRatio="xMaxYMid slice" />}
          </div>
          {text}
        </div>
        <div>
          <Tag tone="good">aspect-ratio reserved (zero shift)</Tag>
          <div className="mt-2 rounded overflow-hidden aspect-[16/6] bg-[#E8E2D5] border border-[#111827]/15 relative">
            {!loaded && (
              <span className="absolute inset-0 grid place-items-center text-xs font-mono text-[#4B5563]">
                16:6 reserved slot (loading…)
              </span>
            )}
            <div className="h-full w-full" style={{ opacity: loaded ? 1 : 0, transition: `opacity 200ms ${EASE}` }}>
              <CoastalLighthouseScene preserveAspectRatio="xMaxYMid slice" />
            </div>
          </div>
          {text}
        </div>
      </div>
    </Stage>
  );
}

function ImgFocal() {
  const [ar, setAr] = useState('4/5');
  const [focus, setFocus] = useState<'center' | 'subject'>('subject');
  return (
    <Stage
      label="Crop-safe focal point"
      controls={
        <>
          <Seg label="Crop" value={ar} onChange={setAr} options={[{ id: '16/10', label: '16:10' }, { id: '1/1', label: '1:1' }, { id: '4/5', label: '4:5' }]} />
          <Seg label="Focal point" value={focus} onChange={setFocus} options={[{ id: 'subject', label: 'Subject (78% 40%)' }, { id: 'center', label: 'Centre (50% 50%)' }]} />
        </>
      }
      caption="The lighthouse sits on the right headland at 78% / 40% (marked by the pink reticle on the master frame). Anchor the focal point there and every crop keeps the tower. Centre-crop it in 4:5 or 1:1 and the lighthouse is sliced right off the edge."
    >
      <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr] items-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#4B5563] mb-2">Source master (16:10) with focal reticle</p>
          <div className="w-full max-w-[320px] aspect-[16/10] overflow-hidden rounded border border-[#111827]/20 bg-[#E8E2D5]">
            <CoastalLighthouseScene preserveAspectRatio="xMidYMid slice" showReticle reticleAt={focus} />
          </div>
        </div>
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#4B5563] mb-2">
            Cropped result ({ar.replace('/', ':')} · {focus === 'subject' ? 'focal-point anchored' : 'dead-centre crop'})
          </p>
          <div className="w-44 overflow-hidden rounded border border-[#111827]/20 bg-[#E8E2D5]" style={{ aspectRatio: ar }}>
            <CoastalLighthouseScene
              preserveAspectRatio={focus === 'subject' ? 'xMaxYMid slice' : 'xMidYMid slice'}
              showReticle
              reticleAt={focus}
            />
          </div>
          <p className="mt-2 text-xs text-[#4B5563]">
            object-position: <code className="font-mono text-[#A3285C]">{focus === 'subject' ? '78% 40%' : '50% 50%'}</code>
          </p>
        </div>
      </div>
    </Stage>
  );
}

function Crest({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M32 6 54 14v18c0 14-10 22-22 26C20 54 10 46 10 32V14z" fill="#FAF8F5" stroke="#111827" strokeWidth="2.5" />
      <path d="M22 34h20M32 22v24" stroke="#A3285C" strokeWidth="2.5" />
    </svg>
  );
}
function ImgCrest() {
  const [broken, setBroken] = useState(false);
  return (
    <Stage
      label="Crest fallback"
      controls={<Seg label="Image" value={broken ? 'n' : 'y'} onChange={(v) => setBroken(v === 'n')} options={[{ id: 'y', label: 'Has photo' }, { id: 'n', label: 'No photo (crest)' }]} />}
      caption="Both states shown side by side, with the active toggle highlighted on the left. When a story has no photo, a deterministic room crest fills the exact same 400×408 slot so the card grid never collapses."
    >
      <div className="flex flex-wrap gap-6 items-start">
        <div className="w-56 overflow-hidden border border-[#111827]/20 bg-[#F3EFE9]" style={{ borderRadius: '0 12px 0 12px' }}>
          <div className="aspect-[400/408] grid place-items-center overflow-hidden bg-[#E8E2D5]">
            {broken ? (
              <div className="flex flex-col items-center gap-2">
                <Crest size={72} />
                <span className="text-xs font-mono text-[#4B5563]">HN · Crest fallback</span>
              </div>
            ) : (
              <CoastalLighthouseScene preserveAspectRatio="xMaxYMid slice" />
            )}
          </div>
          <p className="m-0 px-4 py-3 text-sm font-medium border-t border-[#111827]/10">Harbour Notes · Active view</p>
        </div>
        <div className="w-56 overflow-hidden border border-[#111827]/15 bg-[#F3EFE9] opacity-85" style={{ borderRadius: '0 12px 0 12px' }}>
          <div className="aspect-[400/408] grid place-items-center overflow-hidden bg-[#E8E2D5]">
            {!broken ? (
              <div className="flex flex-col items-center gap-2">
                <Crest size={72} />
                <span className="text-xs font-mono text-[#4B5563]">HN · Crest fallback</span>
              </div>
            ) : (
              <CoastalLighthouseScene preserveAspectRatio="xMaxYMid slice" />
            )}
          </div>
          <p className="m-0 px-4 py-3 text-sm font-medium border-t border-[#111827]/10">
            {broken ? 'With photo (comparison)' : 'No photo: crest (comparison)'}
          </p>
        </div>
      </div>
    </Stage>
  );
}

function ImgAltDo() {
  const Fig = ({ alt }: { alt: string }) => (
    <figure className="m-0 w-full max-w-[240px]">
      <div className="aspect-[16/10] rounded overflow-hidden border border-[#111827]/15">
        <CoastalLighthouseScene preserveAspectRatio="xMaxYMid slice" ariaLabel={alt} />
      </div>
      <figcaption className="mt-2 text-xs font-mono leading-5 text-[#4B5563] break-words">alt=&quot;{alt}&quot;</figcaption>
    </figure>
  );
  return (
    <DoDont
      label="Alt text"
      doExample={<Fig alt="White lighthouse with a pink band on a green headland at dawn" />}
      doWhy="Describes what the image actually shows and why it is here, in the words a person would say aloud."
      dontExample={<Fig alt="image of IMG_2041.jpg photo picture lighthouse beach sunset best cheap travel" />}
      dontWhy="Starts with 'image of', repeats a filename and stuffs keywords. Screen readers read all of it, and search engines penalise it."
    />
  );
}
function ImgDimsDo() {
  return (
    <DoDont
      label="Image dimensions"
      doExample={
        <div className="w-full max-w-[230px]">
          <div className="rounded bg-[#E8E2D5] overflow-hidden border border-[#111827]/15 relative" style={{ aspectRatio: '16/10' }}>
            <CoastalLighthouseScene preserveAspectRatio="xMaxYMid slice" />
            <span className="absolute bottom-1.5 right-1.5 rounded bg-[#111827]/85 px-1.5 py-0.5 text-[10px] font-mono text-[#FAF8F5]">
              width=800 height=500
            </span>
          </div>
          <p className="m-0 mt-2 text-sm font-medium leading-6">Buy print ($24)</p>
          <Cap>aspect-ratio: 16/10 · 138px held before load</Cap>
        </div>
      }
      doWhy="The 16:10 frame exists before the image file arrives, so the Buy button is already where the finger lands."
      dontExample={
        <div className="w-full max-w-[230px]">
          <div className="rounded border-2 border-dashed border-[#9F1239] bg-[#FFE4E6]/60 px-2 py-1 text-[11px] font-mono text-[#9F1239]">
            ↕ 0px while loading → jumps to 138px!
          </div>
          <div className="mt-1 rounded overflow-hidden border border-[#9F1239]/40 h-20 opacity-85">
            <CoastalLighthouseScene preserveAspectRatio="xMaxYMid slice" />
          </div>
          <p className="m-0 mt-2 text-sm font-medium leading-6 text-[#9F1239]">↓ Buy print (shoved down on load)</p>
          <Cap>No width/height: 0px → 138px layout shift</Cap>
        </div>
      }
      dontWhy="Without width and height or aspect-ratio, the browser lays out a 0px box and shoves the button down when the image arrives."
    />
  );
}

function ImgRedline() {
  return (
    <Stage label="Redline: 400×408 card art" caption="Card art is 400 wide by 408 tall (2% taller than square so the optical centre sits slightly high). Shown at 50%.">
      <div className="inline-flex items-center gap-2 pt-6">
        <div className="flex flex-col items-center gap-1">
          <DimH width={200} label="400" />
          <div className="overflow-hidden border border-[#111827]/20" style={{ width: 200, height: 204, borderRadius: '0 12px 0 12px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SAMPLE_PHOTOS.studio.src}
              alt={SAMPLE_PHOTOS.studio.alt}
              width={400}
              height={408}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <DimV height={204} label="408" />
      </div>
    </Stage>
  );
}

function ImgAxContrast() {
  const [mode, setMode] = useState<'none' | 'overlay' | 'duotone'>('overlay');
  const worst = mode === 'none' ? '#F7E3B5' : mode === 'overlay' ? blend('#111827', 0.72, '#F7E3B5') : '#4B122A';
  const r = ratio('#FFFFFF', worst);
  const pass = r >= 7;
  return (
    <Stage
      label="Text on images: worst-pixel contrast"
      controls={<Seg label="Treatment" value={mode} onChange={setMode} options={[{ id: 'none', label: 'Raw photo (fails)' }, { id: 'overlay', label: 'Ink scrim 72%' }, { id: 'duotone', label: 'Duotone map' }]} />}
      caption="Check the lightest sky pixel behind the text (#F7E3B5), not the average. White body text needs 7:1; large headings need at least 4.5:1."
    >
      <div className="relative rounded overflow-hidden min-h-[168px] flex flex-col justify-end p-6 border border-[#111827]/15">
        <div className="absolute inset-0">
          <CoastalLighthouseScene preserveAspectRatio="xMidYMid slice" />
        </div>
        {mode === 'overlay' && <div className="absolute inset-0 bg-[#111827]/72" aria-hidden />}
        {mode === 'duotone' && <div className="absolute inset-0 bg-gradient-to-br from-[#111827]/95 to-[#4B122A]/95 mix-blend-multiply" aria-hidden />}
        <div className="relative z-10 flex flex-col gap-1">
          <p className="m-0 text-xl font-semibold text-white" style={{ fontFamily: 'var(--font-serif)' }}>Harbour Notes, spring issue</p>
          <p className="m-0 text-sm text-white">Twelve small stories from the coast.</p>
        </div>
      </div>
      <p className="mt-3 mb-0 flex items-center gap-2 text-sm">
        {pass ? <Check className="h-4 w-4 text-[#166534]" aria-hidden /> : <X className="h-4 w-4 text-[#9F1239]" aria-hidden />}
        <span className="tabular-nums">
          White on lightest sky pixel ({worst.toUpperCase()}): <strong>{r.toFixed(1)}:1</strong> — {pass ? 'passes WCAG AAA (≥7:1)' : r >= 4.5 ? 'AA only, fails body copy' : 'fails WCAG (<4.5:1)'}
        </span>
      </p>
    </Stage>
  );
}

/* ===================== SHAPE ===================== */

function ShapeRadiusScale() {
  const steps: [number, string][] = [[0, 'Tables, rules'], [4, 'Inputs, chips'], [8, 'Buttons'], [12, 'Signature corners'], [999, 'Pills, avatars']];
  return (
    <Stage label="Radius scale: 0 / 4 / 8 / 12 / 999" caption="Five values. Nothing at 6, 10 or 16.">
      <ul className="flex flex-wrap gap-6 list-none p-0 m-0">
        {steps.map(([r, use]) => (
          <li key={r} className="flex flex-col gap-2">
            <div className="h-16 w-24 bg-[#F3EFE9] border-2 border-[#111827]" style={{ borderRadius: r }} aria-hidden />
            <span className="text-sm font-mono font-medium tabular-nums">{r}px</span>
            <Cap>{use}</Cap>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
function ShapeAsym() {
  const v: [string, string, 'good' | 'bad'][] = [['0 12 0 12 (signature)', '0 12px 0 12px', 'good'], ['12 0 12 0 (flipped)', '12px 0 12px 0', 'bad'], ['12 all round', '12px', 'bad']];
  return (
    <Stage label="The asymmetric corner" caption="Top-left and bottom-right are square, the other two are 12. It reads as a deliberate cut, not a default.">
      <ul className="flex flex-wrap gap-6 list-none p-0 m-0">
        {v.map(([n, r, t]) => (
          <li key={n} className="flex flex-col items-start gap-2">
            <div className="h-24 w-24 bg-[#F3EFE9] border border-[#111827]" style={{ borderRadius: r }} aria-hidden />
            <Tag tone={t}>{t === 'good' ? 'Use' : 'Avoid'}</Tag>
            <Cap>{n}</Cap>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
function ShapeBorderShadow() {
  const rows: [string, string, string | undefined][] = [
    ['Border (rest)', 'border border-[#E8E2D5] bg-[#F3EFE9]', undefined],
    ['Shadow (floating)', 'bg-[#FAF8F5]', '0 8px 24px rgba(17,24,39,.16)'],
    ['Both (avoid)', 'border border-[#E8E2D5] bg-[#F3EFE9]', '0 20px 50px rgba(17,24,39,.35)'],
  ];
  return (
    <Stage label="Border vs shadow" caption="The border gives the same separation at rest and survives forced-colours mode. Reserve shadow for things that float.">
      <div className="grid gap-6 sm:grid-cols-3">
        {rows.map(([n, c, s]) => (
          <div key={n} className={`h-24 rounded-lg p-4 text-sm ${c}`} style={{ boxShadow: s }}>
            {n}
          </div>
        ))}
      </div>
    </Stage>
  );
}
function NCard({ children, cls = '', shadow }: { children?: React.ReactNode; cls?: string; shadow?: string }) {
  return (
    <div className={`border border-[#E8E2D5] bg-[#F3EFE9] w-full max-w-[240px] ${cls}`} style={{ borderRadius: '0 12px 0 12px', boxShadow: shadow }}>
      {children}
    </div>
  );
}
function ShapeNestDo() {
  return (
    <DoDont
      label="Card in card"
      doExample={
        <NCard cls="p-4">
          <p className="m-0 text-sm font-medium">Plan</p>
          <p className="m-0 mt-2 text-sm leading-6">Studio, 24 per month.</p>
          <hr className="my-3 border-[#E8E2D5]" />
          <p className="m-0 text-sm">Renews 3 May.</p>
        </NCard>
      }
      doWhy="One surface. Rules and spacing divide the content inside it."
      dontExample={
        <NCard cls="p-4">
          <p className="m-0 text-sm font-medium">Plan</p>
          <NCard cls="mt-2 p-3" shadow="0 4px 10px rgba(17,24,39,.2)">
            <p className="m-0 text-sm">Studio, 24 per month.</p>
            <NCard cls="mt-2 p-2" shadow="0 2px 6px rgba(17,24,39,.2)">
              <p className="m-0 text-sm">Renews 3 May.</p>
            </NCard>
          </NCard>
        </NCard>
      }
      dontWhy="Three borders, two shadows and three corner cuts for one sentence of content. The eye cannot tell which box is the card."
    />
  );
}
function ShapeBorderDo() {
  return (
    <DoDont
      label="Resting elevation"
      doExample={<div className="w-full max-w-[220px] rounded-lg border border-[#E8E2D5] bg-[#F3EFE9] p-4 text-sm leading-6">Quarterly summary. Static content.</div>}
      doWhy="A 1px Gallery Stone border marks the edge of something that does not move."
      dontExample={<div className="w-full max-w-[220px] rounded-lg bg-[#FAF8F5] p-4 text-sm leading-6" style={{ boxShadow: '0 12px 32px rgba(17,24,39,.35), 0 2px 6px rgba(17,24,39,.3)' }}>Quarterly summary. Static content.</div>}
      dontWhy="A heavy stacked shadow on static content claims the card is floating, and it disappears entirely in high-contrast mode."
    />
  );
}
function ShapeRedline() {
  return (
    <Stage label="Redline: card" caption="Padding 24, 1px border, 0/12/0/12 corners, 8px stack gap.">
      <div className="inline-flex flex-col items-start gap-1 pt-6">
        <DimH width={280} label="max 400" />
        <div className="border border-[#E8E2D5] bg-[#F3EFE9] p-6" style={{ width: 280, borderRadius: '0 12px 0 12px' }}>
          <div className="h-4 w-2/3 rounded bg-[#111827]" aria-hidden />
          <div className="mt-2 h-3 w-full rounded bg-[#4B5563]/50" aria-hidden />
          <div className="mt-2 h-3 w-4/5 rounded bg-[#4B5563]/50" aria-hidden />
        </div>
        <DimH width={24} label="24" />
      </div>
    </Stage>
  );
}
function ShapeStrokes() {
  return (
    <Stage label="Stroke widths" caption="1px for borders and rules, 2px for focus and emphasis, 3px for the loudest thing on the page. Never 1.5.">
      <ul className="flex flex-wrap gap-8 list-none p-0 m-0">
        {[1, 2, 3].map((w) => (
          <li key={w} className="flex flex-col gap-2">
            <div className="h-16 w-24 rounded-lg" style={{ border: `${w}px solid #111827` }} aria-hidden />
            <span className="text-sm font-mono tabular-nums">{w}px</span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
function ShapeAxForced() {
  const [forced, setForced] = useState(false);
  const C = ({ shadow }: { shadow: boolean }) => (
    <div
      className="h-20 w-full max-w-[200px] rounded-lg p-3 text-sm"
      style={forced ? { background: '#000', color: '#fff', border: shadow ? 'none' : '1px solid #fff' } : { background: '#FAF8F5', border: shadow ? 'none' : '1px solid #8A8478', boxShadow: shadow ? '0 8px 24px rgba(17,24,39,.2)' : undefined }}
    >
      {shadow ? 'Shadow only' : 'Border'}
    </div>
  );
  return (
    <Stage
      label="Forced-colours simulation"
      controls={<Seg label="Mode" value={forced ? 'f' : 'n'} onChange={(v) => setForced(v === 'f')} options={[{ id: 'n', label: 'Normal' }, { id: 'f', label: 'Forced colours' }]} />}
      caption="Switch to forced colours: the shadow-only card loses its edge, the bordered card keeps it."
    >
      <div className="flex flex-wrap gap-6" style={forced ? { background: '#000', padding: 16, borderRadius: 8 } : undefined}>
        <C shadow={false} />
        <C shadow />
      </div>
    </Stage>
  );
}

/* ===================== LAYOUT ===================== */

function MiniLayout({ w, cols, sidebar, max, pad }: { w: number; cols: number; sidebar: boolean; max: number; pad: number }) {
  const s = 0.2;
  return (
    <div style={{ width: w * s, height: 520 * s }} className="overflow-hidden rounded border border-[#8A8478] bg-[#FAF8F5]" aria-hidden>
      <div style={{ width: w, height: 520, transform: `scale(${s})`, transformOrigin: 'top left' }}>
        <div className="bg-[#111827]" style={{ height: 64 }} />
        <div className="flex mx-auto" style={{ width: Math.min(w, max), padding: pad, gap: 24 }}>
          {sidebar && <div className="bg-[#E8E2D5] shrink-0" style={{ width: 240, height: 400 }} />}
          <div className="grid flex-1" style={{ gridTemplateColumns: `repeat(${cols},1fr)`, gap: 16 }}>
            {Array.from({ length: cols * 2 }).map((_, i) => (
              <div key={i} className="bg-[#D44983]/40" style={{ height: 190 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function LayoutLadder() {
  const L = [[390, 1, false, 390, 16], [768, 2, false, 768, 24], [1280, 3, true, 1280, 32], [1440, 3, true, 1440, 48]] as const;
  return (
    <Stage label="Breakpoint ladder, drawn at 20%" caption="Same page at four real widths. Columns grow 1, 2, 3, 3. The sidebar appears at 1280 and padding steps 16, 24, 32, 48.">
      <ul className="flex flex-wrap items-end gap-6 list-none p-0 m-0">
        {L.map(([w, c, sb, m, p]) => (
          <li key={w} className="flex flex-col gap-2">
            <MiniLayout w={w} cols={c} sidebar={sb} max={m} pad={p} />
            <Cap>{w}px, {c} col, pad {p}</Cap>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
function LayoutContainers() {
  const rows: [string, number][] = [['Reading column', 680], ['App container', 1280], ['Wide container', 1440]];
  return (
    <Stage label="Container widths" caption="Bars share one scale (1px = 4 CSS px). Past the cap, extra screen becomes margin, never wider lines.">
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        {rows.map(([n, w]) => (
          <li key={n} className="flex flex-wrap items-center gap-3">
            <span className="w-36 shrink-0 text-sm">{n}</span>
            <div className="h-5 rounded bg-[#A3285C]" style={{ width: w / 4 }} aria-hidden />
            <Cap>{w}px</Cap>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
const NAV = ['Overview', 'Pricing', 'Journal', 'Studio', 'Support', 'Careers'];
function LayoutPriority() {
  const [w, setW] = useState('560');
  const fit = Math.max(1, Math.floor((Number(w) - 150) / 100));
  const more = NAV.slice(fit);
  return (
    <Stage
      label="Priority-plus collapse"
      controls={<Seg label="Width" value={w} onChange={setW} options={[{ id: '320', label: '320' }, { id: '440', label: '440' }, { id: '560', label: '560' }]} />}
      caption="Least important items fall into More first. The primary link never leaves."
    >
      <nav aria-label="Demo" className="flex items-center gap-1 rounded bg-[#F3EFE9] border border-[#E8E2D5] p-1 overflow-hidden" style={{ width: Number(w), maxWidth: '100%' }}>
        {NAV.slice(0, fit).map((n) => (
          <a key={n} href="#priority" onClick={(e) => e.preventDefault()} className="inline-flex min-h-[44px] items-center px-3 text-sm rounded focus-visible:outline-2 focus-visible:outline-[#A3285C]">
            {n}
          </a>
        ))}
        {more.length > 0 && (
          <button type="button" className="inline-flex min-h-[44px] items-center px-3 text-sm rounded border border-[#111827]" aria-haspopup="true">
            More ({more.length})
          </button>
        )}
      </nav>
      {more.length > 0 && <p className="mt-3 mb-0 text-sm text-[#4B5563]">In More: {more.join(', ')}</p>}
    </Stage>
  );
}
function LayoutReadVsApp() {
  return (
    <Stage label="Reading column vs app layout" caption="Left: one 680px column, 65-character lines. Right: header, nav rail, work area and inspector, each on purpose.">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded border border-[#E8E2D5] p-4 flex flex-col items-center gap-2" aria-hidden>
          <div className="h-3 w-3/4 rounded bg-[#111827]" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-2 w-3/4 rounded bg-[#4B5563]/40" />
          ))}
        </div>
        <div className="rounded border border-[#E8E2D5] p-2 grid grid-cols-[56px_1fr_72px] grid-rows-[24px_100px] gap-1" aria-hidden>
          <div className="col-span-3 bg-[#111827] rounded-sm" />
          <div className="bg-[#E8E2D5] rounded-sm" />
          <div className="bg-[#D44983]/40 rounded-sm" />
          <div className="bg-[#E8E2D5] rounded-sm" />
        </div>
      </div>
    </Stage>
  );
}
const Z: [string, number, string][] = [['Base content', 0, '#E8E2D5'], ['Sticky header', 10, '#F3EFE9'], ['Dropdown, popover', 20, '#FAF8F5'], ['Modal backdrop', 30, '#4B5563'], ['Modal', 40, '#111827'], ['Toast', 50, '#A3285C']];
function LayoutZ() {
  return (
    <Stage label="Z-index scale" caption="Six layers, ten apart. Never z-[9999]: if something needs to beat a modal, it is a toast.">
      <ol className="relative list-none m-0 p-0 h-64 w-full max-w-md">
        {Z.map(([n, z, c], i) => (
          <li key={n} className="absolute flex items-center justify-between rounded border border-[#111827] px-3 h-12 text-sm font-medium" style={{ left: i * 28, top: i * 32, right: 0, background: c, color: lum(c) > 0.3 ? '#111827' : '#fff', zIndex: z }}>
            <span>{n}</span>
            <span className="font-mono tabular-nums">z-{z}</span>
          </li>
        ))}
      </ol>
    </Stage>
  );
}
function LayoutMeasureDo() {
  const t = 'Good pages are read in one sitting. Keep lines near sixty-five characters so the eye finds the next line without hunting for it across the screen.';
  return (
    <DoDont
      label="Measure"
      doExample={<p className="m-0 text-sm leading-6" style={{ maxWidth: '65ch' }}>{t}</p>}
      doWhy="Capped near 65 characters, the eye lands on the next line easily."
      dontExample={<p className="m-0 text-sm leading-6 w-[900px] max-w-none whitespace-nowrap overflow-hidden">{t} {t} {t}</p>}
      dontWhy="Lines of 150+ characters on a wide screen. Readers lose their place at every line break."
    />
  );
}
function StickyFrame({ bars }: { bars: string[] }) {
  return (
    <div className="relative h-40 w-full max-w-[220px] overflow-hidden rounded border border-[#8A8478] bg-[#FAF8F5]">
      <div className="absolute inset-x-0 top-0">
        {bars.map((b) => (
          <div key={b} className="flex h-9 items-center bg-[#111827] px-2 text-xs text-white border-b border-white/30">
            {b}
          </div>
        ))}
      </div>
      <div className="absolute inset-x-2 bottom-2 h-10 rounded bg-[#E8E2D5]" />
    </div>
  );
}
function LayoutStickyDo() {
  return (
    <DoDont
      label="Sticky regions"
      doExample={<StickyFrame bars={['Header, 64px']} />}
      doWhy="One sticky bar per edge. Most of the screen is content."
      dontExample={<StickyFrame bars={['Header', 'Promo banner', 'Cookie notice', 'Chat widget']} />}
      dontWhy="Four stacked sticky bars eat more than half a phone screen, and the page you came to read is a letterbox."
    />
  );
}
function LayoutRedline() {
  return (
    <Stage label="Redline: app shell" caption="Sidebar 240, content gutter 32, grid gap 16. Drawn at 23%.">
      <div className="inline-flex flex-col items-start gap-1 pt-6">
        <DimH width={300} label="1280 → 300" />
        <div className="flex border border-[#8A8478]" style={{ width: 300 }} aria-hidden>
          <div className="bg-[#E8E2D5]" style={{ width: 56, height: 90 }} />
          <div className="flex-1 bg-[#FAF8F5] p-2 grid grid-cols-3 gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-[#D44983]/40 h-8" />
            ))}
          </div>
        </div>
        <DimH width={56} label="240" />
      </div>
    </Stage>
  );
}
function LayoutAxLandmarks() {
  return (
    <Stage label="Landmarks and tab order" caption="Numbers show the order a keyboard user meets each region. Skip link and header first, then nav, main, footer.">
      <div className="relative grid grid-cols-[88px_1fr] grid-rows-[40px_120px_40px] gap-2 max-w-md text-xs font-mono">
        <div className="relative col-span-2 grid place-items-center bg-[#111827] text-white rounded px-6">
          Skip link, header
          <FocusMark n={1} className="left-1 top-1/2 -translate-y-1/2" />
        </div>
        <div className="relative grid place-items-center bg-[#E8E2D5] rounded">
          nav
          <FocusMark n={2} className="left-1 top-1" />
        </div>
        <div className="relative grid place-items-center bg-[#F3EFE9] border border-[#E8E2D5] rounded">
          main
          <FocusMark n={3} className="left-1 top-1" />
        </div>
        <div className="relative col-span-2 grid place-items-center bg-[#E8E2D5] rounded">
          footer
          <FocusMark n={4} className="left-1 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </Stage>
  );
}

/* ===================== TOUCH ===================== */

function TouchSizes() {
  const S: [number, string][] = [[24, 'Too small'], [32, 'Too small'], [40, 'Almost'], [44, 'Minimum'], [48, 'Comfortable']];
  return (
    <Stage label="Target sizes at 1:1" caption="Fingertip pads are 10 to 14mm wide. Below 44 CSS px, misses climb quickly.">
      <ul className="flex flex-wrap items-end gap-6 list-none p-0 m-0">
        {S.map(([s, n]) => (
          <li key={s} className="flex flex-col items-start gap-2">
            <div className="grid place-items-center rounded-md text-xs font-mono text-white tabular-nums" style={{ width: s, height: s, background: s >= 44 ? '#166534' : '#9F1239' }} aria-hidden>
              {s}
            </div>
            <Cap>{s}px, {n}</Cap>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
function TouchThumb() {
  return (
    <Stage label="Thumb reach (right hand)" caption="Illustrative, based on one-handed grips on a 6-inch phone. The bottom third is easy, the top is a stretch. Put the primary action low.">
      <div className="relative mx-auto h-72 w-36 overflow-hidden rounded-2xl border-4 border-[#111827] bg-[#FAF8F5]" role="img" aria-label="Phone with reach zones: hard at the top, ok in the middle, easy at the bottom">
        <div className="absolute inset-x-0 top-0 h-[35%]" style={{ background: 'rgba(159,18,57,.25)' }} />
        <div className="absolute inset-x-0 top-[35%] h-[35%]" style={{ background: 'rgba(217,119,6,.3)' }} />
        <div className="absolute inset-x-0 bottom-0 h-[30%]" style={{ background: 'rgba(22,101,52,.3)' }} />
        {['Hard', 'OK', 'Easy'].map((n, i) => (
          <span key={n} className="absolute left-2 text-xs font-mono font-medium" style={{ top: ['8%', '45%', '78%'][i] }}>
            {n}
          </span>
        ))}
        <div className="absolute bottom-2 inset-x-3 h-11 rounded-md bg-[#111827] grid place-items-center text-xs text-white font-medium">Primary action</div>
      </div>
    </Stage>
  );
}
function TouchHover() {
  return (
    <Stage label="Hover vs touch" caption="Hover (mouse only) adds a tint. The Edit action is always visible, so touch and keyboard get it too.">
      <div className="flex items-center justify-between gap-4 max-w-sm rounded-lg border border-[#E8E2D5] bg-[#F3EFE9] p-3 transition-colors hover:bg-[#E8E2D5]">
        <span className="text-sm">Quarterly report.pdf</span>
        <button type="button" className={btn}>Edit</button>
      </div>
    </Stage>
  );
}
function TouchSizeDo() {
  const B = ({ s }: { s: number }) => (
    <div className="flex items-center gap-2">
      <button type="button" aria-label="Close" className="grid place-items-center rounded bg-[#111827] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3285C]" style={{ width: s, height: s }}>
        <X className="h-4 w-4" aria-hidden />
      </button>
      <Cap>{s}×{s}</Cap>
    </div>
  );
  return (
    <DoDont
      label="Target size"
      doExample={<B s={44} />}
      doWhy="44 by 44 holds a thumb pad with room for error."
      dontExample={<B s={24} />}
      dontWhy="A 24px close button is a lottery on a bus. A small icon with a large hit area is fine; a small hit area is not."
    />
  );
}
function TouchSpacingDo() {
  const Row = ({ gap }: { gap: number }) => (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex" style={{ gap }}>
        <button type="button" className={btn}>Save</button>
        <button type="button" className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 rounded-md bg-[#9F1239] text-white text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3285C]">
          Delete
        </button>
      </div>
      <Cap>gap {gap}px</Cap>
    </div>
  );
  return (
    <DoDont
      label="Target spacing"
      doExample={<Row gap={16} />}
      doWhy="16px between Save and Delete (8px minimum) means a wobbly tap lands on dead space."
      dontExample={<Row gap={0} />}
      dontWhy="Touching buttons, one of them destructive. One slip deletes the work."
    />
  );
}
function TouchRedline() {
  const ic = 'grid h-11 w-11 place-items-center rounded text-[#111827] focus-visible:outline-2 focus-visible:outline-[#A3285C]';
  return (
    <Stage label="Redline: icon button hit area" caption="The icon is 20px. The hit area is 44 by 44, and the next target starts 8px later.">
      <div className="flex items-center gap-2 pb-6">
        <HitBox label="44×44">
          <button type="button" aria-label="Search" className={ic}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m12.5 12.5 5 5" stroke="currentColor" strokeWidth="2" /></svg>
          </button>
        </HitBox>
        <DimH width={8} label="8" />
        <HitBox label="44×44">
          <button type="button" aria-label="Menu" className={ic}>
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" /></svg>
          </button>
        </HitBox>
      </div>
    </Stage>
  );
}
function TouchAxFocus() {
  return (
    <Stage label="Focus-visible rings" caption="Tab through both. The left ring is 2px accent with 2px offset. The right one had its outline removed, so a keyboard user is blind.">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex flex-col items-start gap-2">
          <button type="button" className={btn}>With ring</button>
          <Tag tone="good">Visible</Tag>
        </div>
        <div className="flex flex-col items-start gap-2">
          <button type="button" className="inline-flex min-h-[44px] items-center px-4 rounded-md bg-[#111827] text-white text-sm font-medium outline-none focus:outline-none">outline: none</button>
          <Tag tone="bad">Invisible</Tag>
        </div>
      </div>
    </Stage>
  );
}
function TouchUserValid() {
  return (
    <Stage label=":user-valid and :user-invalid" caption="Type a bad address, then tab away. The border and message appear only after you leave the field. Colour is paired with text.">
      <style>{`.uv:user-invalid{border-color:#9F1239}.uv:user-valid{border-color:#166534}.uv:user-invalid~.uv-msg{display:block}`}</style>
      <label className="block max-w-xs text-sm font-medium">
        Email
        <input type="email" required placeholder="you@example.com" aria-describedby="uv-msg" className="uv mt-1 block min-h-[44px] w-full rounded-md border-2 border-[#8A8478] bg-white px-3 text-base text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3285C]" />
        <span id="uv-msg" className="uv-msg mt-1 hidden text-sm text-[#9F1239]">Enter an address like name@example.com</span>
      </label>
    </Stage>
  );
}

/* ===================== MOTION ===================== */

const CURVES: Record<string, [number, number, number, number]> = {
  accent: [0.16, 1, 0.3, 1],
  editorial: [0.22, 1, 0.36, 1],
  linear: [0, 0, 1, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
};
function Curve({ c }: { c: [number, number, number, number] }) {
  const p = (x: number, y: number) => `${10 + x * 100},${110 - y * 100}`;
  return (
    <svg viewBox="0 0 120 120" className="h-32 w-32 shrink-0 rounded border border-[#E8E2D5] bg-[#FAF8F5]" role="img" aria-label={`Easing curve cubic-bezier(${c.join(', ')})`}>
      <line x1="10" y1="110" x2="110" y2="10" stroke="#E8E2D5" strokeDasharray="3 3" />
      <line x1="10" y1="110" x2={10 + c[0] * 100} y2={110 - c[1] * 100} stroke="#D44983" />
      <line x1="110" y1="10" x2={10 + c[2] * 100} y2={110 - c[3] * 100} stroke="#D44983" />
      <path d={`M${p(0, 0)} C${p(c[0], c[1])} ${p(c[2], c[3])} ${p(1, 1)}`} fill="none" stroke="#111827" strokeWidth="2.5" />
    </svg>
  );
}
function MotionPlayground() {
  const [ms, setMs] = useState('200');
  const [ez, setEz] = useState('accent');
  const [reduce, setReduce] = useState(false);
  const [on, setOn] = useState(false);
  const c = CURVES[ez];
  const dur = reduce ? 120 : Number(ms);
  const css = `cubic-bezier(${c.join(',')})`;
  return (
    <Stage
      label="Duration and easing playground"
      controls={
        <>
          <Seg label="Duration" value={ms} onChange={setMs} options={[{ id: '120', label: '120' }, { id: '200', label: '200' }, { id: '320', label: '320' }, { id: '650', label: '650 (editorial)' }, { id: '850', label: '850 (reveal)' }]} />
          <Seg label="Easing" value={ez} onChange={setEz} options={Object.keys(CURVES).map((id) => ({ id, label: id }))} />
          <Seg label="Reduced motion" value={reduce ? 'r' : 'n'} onChange={(v) => setReduce(v === 'r')} options={[{ id: 'n', label: 'Motion' }, { id: 'r', label: 'Reduced' }]} />
        </>
      }
      caption={reduce ? 'Reduced motion on: the slide becomes a 120ms fade. Same information, no travel.' : 'Press Play. The pink block uses the settings above. Accent means 120, 200 or 320ms and the first curve.'}
    >
      <div className="flex flex-wrap items-center gap-6">
        <Curve c={c} />
        <div className="flex-1 min-w-[220px] flex flex-col gap-3">
          <div className="relative h-12 rounded bg-[#E8E2D5] overflow-hidden">
            <div className="absolute left-0 top-2 h-8 w-12 rounded bg-[#A3285C]" style={{ transform: reduce || !on ? 'none' : 'translateX(160px)', opacity: reduce ? (on ? 1 : 0.15) : 1, transition: `${reduce ? 'opacity' : 'transform'} ${dur}ms ${css}` }} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className={btn} onClick={() => setOn((v) => !v)}>
              <Play className="h-4 w-4" aria-hidden />
              {on ? 'Reverse' : 'Play'}
            </button>
            <Cap>{dur}ms, cubic-bezier({c.join(', ')})</Cap>
          </div>
        </div>
      </div>
    </Stage>
  );
}
function MotionReduced() {
  return (
    <Stage label="What reduced motion changes" caption="Reduced motion removes travel, scale and parallax. It keeps fades and state changes, because those carry meaning without moving.">
      <Replay>
        {(k) => (
          <div className="grid gap-4 sm:grid-cols-2" key={k}>
            <style>{`@keyframes accSlide{from{transform:translateX(-40px);opacity:0}to{transform:none;opacity:1}}@keyframes accFade{from{opacity:0}to{opacity:1}}`}</style>
            {([['Default: slide + fade', 'accSlide'], ['Reduced: fade only', 'accFade']] as const).map(([n, a]) => (
              <div key={n} className="flex flex-col gap-2">
                <Cap>{n}</Cap>
                <div className="h-14 overflow-hidden rounded bg-[#E8E2D5]">
                  <div className="h-full w-24 rounded bg-[#A3285C]" style={{ animation: `${a} 320ms ${EASE} both` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Replay>
    </Stage>
  );
}
function MotionTransform() {
  return (
    <Stage label="transform and opacity only" caption="Both bars take 320ms. The pink one moves with transform on the GPU compositor. The red one animates width and forces layout every frame.">
      <Replay>
        {(k) => (
          <div className="flex flex-col gap-3">
            <Slider k={k} ms={320} ease={EASE} />
            <Slider k={k} ms={320} ease={EASE} mode="width" />
          </div>
        )}
      </Replay>
    </Stage>
  );
}
function MotionNever() {
  const items: [string, string][] = [['Body text', 'Typewriter reveals make people wait to read.'], ['Prices and balances', 'Counting up delays the one fact they came for.'], ['Focus rings', 'Must appear on the same frame as focus.'], ['Error messages', 'Shaking forms scold people who are already stuck.'], ['Looping decoration', 'Anything over 5 seconds needs a pause control.'], ['Layout on load', 'Content should simply be there.']];
  return (
    <Stage label="What never animates" caption="Six things that stay still, with the reason.">
      <ul className="grid gap-3 sm:grid-cols-2 list-none p-0 m-0">
        {items.map(([a, b]) => (
          <li key={a} className="flex gap-3 rounded border border-[#E8E2D5] bg-[#F3EFE9] p-3">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-[#9F1239]" aria-hidden />
            <span className="text-sm leading-6"><strong>{a}.</strong> {b}</span>
          </li>
        ))}
      </ul>
    </Stage>
  );
}
function MotionBox({ ms, ease, mode = 'transform', note }: { ms: number; ease: string; mode?: 'transform' | 'width'; note: string }) {
  return (
    <Replay>
      {(k) => (
        <div className="w-full max-w-[280px]">
          <Slider k={k} ms={ms} ease={ease} mode={mode} />
          <Cap>{note}</Cap>
        </div>
      )}
    </Replay>
  );
}
function MotionDurDo() {
  return (
    <DoDont
      label="Duration and curve"
      doExample={<MotionBox ms={200} ease={EASE} note="200ms, accent curve" />}
      doWhy="200ms with an ease-out curve starts fast, so the interface feels like it answered you."
      dontExample={<MotionBox ms={900} ease="ease-in" note="900ms, ease-in" />}
      dontWhy="900ms with ease-in starts slowly and lands abruptly. The person has finished their thought before the menu has started."
    />
  );
}
function MotionLayoutDo() {
  return (
    <DoDont
      label="What to animate"
      doExample={<MotionBox ms={320} ease={EASE} note="transform" />}
      doWhy="Transform and opacity run on the compositor and stay smooth on a five-year-old phone."
      dontExample={<MotionBox ms={320} ease={EASE} mode="width" note="width (reflows each frame)" />}
      dontWhy="Animating width, height, top or left makes the browser re-layout the page every frame. Expect stutter."
    />
  );
}
function MotionRedline() {
  return (
    <Stage label="Redline: durations at 0.5px per ms" caption="Three durations, one curve. Anything past 400ms (the dashed edge) is a spectacle.">
      <ul className="flex flex-col gap-4 list-none p-0 m-0">
        {[120, 200, 320].map((ms) => (
          <li key={ms} className="flex items-center gap-3">
            <span className="w-16 text-sm font-mono tabular-nums">{ms}ms</span>
            <DimH width={ms / 2} label={`${ms}`} />
          </li>
        ))}
        <li className="flex items-center gap-3">
          <span className="w-16 text-sm font-mono tabular-nums">400ms</span>
          <span className="h-5 border-r-2 border-dashed border-[#9F1239]" style={{ width: 200 }} aria-hidden />
          <Cap>limit</Cap>
        </li>
      </ul>
    </Stage>
  );
}
function MotionAx() {
  const [r, setR] = useState(true);
  return (
    <Stage
      label="Honouring prefers-reduced-motion"
      controls={<Seg label="OS setting" value={r ? 'r' : 'n'} onChange={(v) => setR(v === 'r')} options={[{ id: 'n', label: 'Motion OK' }, { id: 'r', label: 'Reduce' }]} />}
      caption="With Reduce, the toast fades in place, and a live region announces it for people who never see motion."
    >
      <Replay>
        {(k) => (
          <div key={k + (r ? 'r' : 'n')} role="status" className="max-w-xs rounded-md bg-[#111827] px-4 py-3 text-sm text-white" style={{ animation: `${r ? 'accFade2' : 'accRise'} 200ms ${EASE} both` }}>
            <style>{`@keyframes accRise{from{transform:translateY(16px);opacity:0}to{transform:none;opacity:1}}@keyframes accFade2{from{opacity:0}to{opacity:1}}`}</style>
            Saved. Your changes are live.
          </div>
        )}
      </Replay>
    </Stage>
  );
}

function MotionEditorialShowcase() {
  const [k, setK] = useState(0);
  const [copySet, setCopySet] = useState<'corporate' | 'design'>('corporate');
  return (
    <Stage
      label="Tier 2 Editorial & Corporate Choreography (RiseLines, ScaryHeadline, Smile, Hairline)"
      controls={
        <>
          <Seg
            label="Preset"
            value={copySet}
            onChange={(v) => setCopySet(v as 'corporate' | 'design')}
            options={[
              { id: 'corporate', label: 'CHB Corporate' },
              { id: 'design', label: 'Accént System' },
            ]}
          />
          <button type="button" className={btn} onClick={() => setK((n) => n + 1)}>
            <RotateCcw className="h-4 w-4" aria-hidden /> Replay all
          </button>
        </>
      }
      caption="Upstreamed from colonhyphenbracket.pink (feat/playful-principal). Uses cubic-bezier(0.22, 1, 0.36, 1) for masked line rises (RiseLines), a 3-phase strike-through + spring swap (ScaryHeadline), and a winking ASCII mark (Smile)."
    >
      <div key={k} className="grid gap-6 md:grid-cols-2">
        <div className="rounded-md border border-[#111827]/15 bg-[#FAF8F5] p-5">
          <AccentKineticBadge label="ScaryHeadline · 3-Phase Strike" />
          <div className="mt-3 font-serif text-2xl sm:text-3xl font-semibold leading-tight text-[#111827]">
            <ScaryHeadline
              accent="#D44983"
              inkColor="#111827"
              struckColor="rgba(17,24,39,0.35)"
              pairs={copySet === 'corporate' ? HOME_SCARY_PAIRS : DESIGN_SYSTEM_SCARY_PAIRS}
            />
          </div>
          <Hairline className="mt-5 bg-[#111827]/15" delay={0.2} />
          <p className="mt-2 mb-0 font-mono text-xs text-[#4B5563]">
            Phase 1 (scary) → Phase 2 (strike bar) → Phase 3 (spring swap + Smile wink)
          </p>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-md border border-[#111827]/15 bg-[#FAF8F5] p-5">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#4B5563]">
              RiseLines + AccentRevealText
            </span>
            <div className="mt-2 font-serif text-xl sm:text-2xl font-semibold text-[#111827]">
              <RiseLines
                immediate
                lines={[
                  'Masked line-by-line rise',
                  'on cubic-bezier(0.22, 1, 0.36, 1).',
                ]}
              />
            </div>
            <div className="mt-3 text-sm text-[#4B5563]">
              <AccentRevealText
                immediate
                delay={0.2}
                text="Words settle gently without shifting surrounding layout."
              />
            </div>
          </div>

          <FadeUp immediate delay={0.3} className="pt-3 border-t border-[#111827]/15 flex items-center justify-between">
            <span className="font-mono text-xs text-[#4B5563]">Hover or wait for wink:</span>
            <Smile className="text-2xl font-bold" color="#D44983" winkEvery={2500} />
          </FadeUp>
        </div>
      </div>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'imagery-ratio-ladder': ImgRatioLadder,
  'imagery-cls-reserve': ImgCls,
  'imagery-focal-crop': ImgFocal,
  'imagery-crest-fallback': ImgCrest,
  'imagery-do-alt': ImgAltDo,
  'imagery-do-dimensions': ImgDimsDo,
  'imagery-redline-card-art': ImgRedline,
  'imagery-ax-contrast': ImgAxContrast,
  'shape-radius-scale': ShapeRadiusScale,
  'shape-asymmetric-corner': ShapeAsym,
  'shape-border-vs-shadow': ShapeBorderShadow,
  'shape-do-no-nesting': ShapeNestDo,
  'shape-do-border-rest': ShapeBorderDo,
  'shape-redline-card': ShapeRedline,
  'shape-strokes': ShapeStrokes,
  'shape-ax-forced-colours': ShapeAxForced,
  'layout-breakpoint-ladder': LayoutLadder,
  'layout-containers': LayoutContainers,
  'layout-priority-plus': LayoutPriority,
  'layout-reading-vs-app': LayoutReadVsApp,
  'layout-z-index': LayoutZ,
  'layout-do-measure': LayoutMeasureDo,
  'layout-do-sticky': LayoutStickyDo,
  'layout-redline-shell': LayoutRedline,
  'layout-ax-landmarks': LayoutAxLandmarks,
  'touch-target-sizes': TouchSizes,
  'touch-thumb-reach': TouchThumb,
  'touch-hover-vs-touch': TouchHover,
  'touch-do-size': TouchSizeDo,
  'touch-do-spacing': TouchSpacingDo,
  'touch-redline-hitarea': TouchRedline,
  'touch-ax-focus': TouchAxFocus,
  'touch-user-valid': TouchUserValid,
  'motion-playground': MotionPlayground,
  'motion-editorial-showcase': MotionEditorialShowcase,
  'motion-reduced-compare': MotionReduced,
  'motion-transform-only': MotionTransform,
  'motion-never': MotionNever,
  'motion-do-duration': MotionDurDo,
  'motion-do-properties': MotionLayoutDo,
  'motion-redline-durations': MotionRedline,
  'motion-ax-reduced': MotionAx,
};
