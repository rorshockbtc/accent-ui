'use client';

import React from 'react';
import { Stage, Seg, DoDont, DimH, DimV, Tag, FocusMark } from '../primitives';
import { Btn, serif, sans, RING } from './components-b-kit';
import { SAMPLE_PHOTOS } from '../sample-media';

function KitchenPhoto({ className = 'h-full w-full object-cover' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SAMPLE_PHOTOS.kitchen.src}
      alt={SAMPLE_PHOTOS.kitchen.alt}
      width={SAMPLE_PHOTOS.kitchen.width}
      height={SAMPLE_PHOTOS.kitchen.height}
      loading="lazy"
      className={className}
    />
  );
}

function HeroCopy({ children }: { children?: React.ReactNode }) {
  return (
    <div className="max-w-md">
      <p className="text-xs font-mono uppercase tracking-wider text-[#4B5563]">pipe\recipes</p>
      <h3 className="text-3xl leading-tight mt-1" style={serif}>
        Recipes from my grandmother&apos;s kitchen
      </h3>
      <p className="mt-2 text-base text-[#4B5563]" style={sans}>
        Forty years of Sunday dinners, written down.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function OneAction() {
  return (
    <DoDont
      label="Hero actions"
      doExample={
        <HeroCopy>
          <Btn>Read the first recipe</Btn>
        </HeroCopy>
      }
      doWhy="One headline, one primary action. The visitor knows what the room is and what to do next."
      dontExample={
        <div
          className="w-full rounded-lg p-4 text-white"
          style={{ background: 'linear-gradient(135deg,#ff2d95,#7b2ff7,#00e5ff)' }}
        >
          <h3 className="text-xl font-bold">WELCOME!!! Recipes</h3>
          <h3 className="text-xl font-bold text-yellow-300">Stories</h3>
          <h3 className="text-xl font-bold">Videos</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Join now', 'Subscribe', 'Shop'].map((l) => (
              <span key={l} className="min-h-[32px] px-3 grid place-items-center bg-white text-[#111827] rounded text-sm">
                {l}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2" aria-label="Slide 1 of 5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className={`h-2 w-2 rounded-full ${i ? 'bg-white/50' : 'bg-white'}`} />
            ))}
          </div>
        </div>
      }
      dontWhy="Three headlines, three equal buttons and a carousel mean the room has not decided what it is, and the neon gradient fights the text."
    />
  );
}

function Scrim() {
  return (
    <DoDont
      label="Text over imagery"
      doExample={
        <div className="w-full rounded-lg overflow-hidden relative h-48 border border-[#111827]/15">
          <KitchenPhoto />
          <div className="absolute inset-x-0 bottom-0 bg-[#111827]/90 text-[#FAF8F5] p-4">
            <p className="text-lg" style={serif}>
              She never measured anything.
            </p>
            <p className="text-sm text-[#E8E2D5]">I did, badly, for a decade.</p>
          </div>
        </div>
      }
      doWhy="A solid ink scrim under the text gives 7:1 or better no matter how bright the flour on the table is."
      dontExample={
        <div className="w-full rounded-lg overflow-hidden relative h-48 grid place-items-center p-4 border border-[#111827]/15">
          <div className="absolute inset-0">
            <KitchenPhoto />
          </div>
          <p className="relative z-10 text-lg text-white font-light drop-shadow-none" style={serif}>
            She never measured anything. I did, badly, for a decade.
          </p>
        </div>
      }
      dontWhy="Thin white text straight on a busy kitchen photograph crosses bright flour and bowls, so words disappear."
    />
  );
}

function RedlineLayout() {
  return (
    <Stage label="Redline: desktop 7 / 5 grid" caption="Seven of twelve columns for text, five for the image, 24px gutter, 64px vertical padding.">
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          <div className="flex items-end gap-6 pl-8 mb-5">
            <DimH width="58.33%" label="7 cols" />
            <DimH width="41.67%" label="5 cols" />
          </div>
          <div className="flex items-stretch gap-2">
            <DimV height={160} label="" />
            <div className="flex-1 grid grid-cols-12 gap-6 bg-[#F3EFE9] rounded p-4 border border-[#111827]/10" style={{ minHeight: 160 }}>
              <div className="col-span-7 self-center">
                <p className="text-2xl leading-tight" style={serif}>Recipes from my grandmother&apos;s kitchen</p>
                <p className="text-sm text-[#4B5563] mt-1">Subtitle, 18px sans on a 28px line</p>
              </div>
              <div className="col-span-5 overflow-hidden rounded-tr-[12px] rounded-bl-[12px] border border-[#111827]/15" style={{ aspectRatio: '4 / 5', maxHeight: 136 }}>
                <KitchenPhoto />
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs font-mono text-[#A3285C]">vertical padding 64px desktop · 40px mobile · radius 0 12 0 12</p>
        </div>
      </div>
    </Stage>
  );
}

function Responsive() {
  const [v, setV] = React.useState<'desktop' | 'mobile'>('desktop');
  const mob = v === 'mobile';
  return (
    <Stage
      label="Layout by viewport"
      controls={
        <Seg
          label="Viewport"
          value={v}
          onChange={setV}
          options={[
            { id: 'desktop', label: 'Desktop' },
            { id: 'mobile', label: 'Mobile' },
          ]}
        />
      }
      caption="Text first on mobile so the headline is above the fold before the image loads."
    >
      <div className={`mx-auto bg-[#F3EFE9] rounded p-4 grid gap-4 border border-[#111827]/10 ${mob ? 'max-w-[260px]' : 'max-w-xl grid-cols-[7fr_5fr] items-center'}`}>
        <div>
          <p className={mob ? 'text-xl' : 'text-3xl'} style={serif}>Recipes from my grandmother&apos;s kitchen</p>
          <p className="text-sm text-[#4B5563] mt-1">Forty years of Sunday dinners.</p>
        </div>
        <div className="h-32 overflow-hidden rounded-tr-[12px] rounded-bl-[12px] border border-[#111827]/15">
          <KitchenPhoto />
        </div>
      </div>
    </Stage>
  );
}

function States() {
  const [s, setS] = React.useState<'image' | 'loading' | 'none'>('image');
  return (
    <Stage
      label="Hero states"
      controls={
        <Seg
          label="State"
          value={s}
          onChange={setS}
          options={[
            { id: 'image', label: 'With image' },
            { id: 'loading', label: 'Loading' },
            { id: 'none', label: 'No image' },
          ]}
        />
      }
      caption="Text always renders immediately. A loading image is a Sandstone-coloured reserved block (never a spinner); 'No image' expands the text or renders the room crest."
    >
      <div className={`bg-white rounded p-4 grid gap-4 border border-[#E8E2D5] items-center ${s === 'none' ? '' : 'sm:grid-cols-[7fr_5fr]'}`}>
        <div>
          <h3 className="text-2xl" style={serif}>Recipes from my grandmother&apos;s kitchen</h3>
          <p className="text-sm text-[#4B5563] mt-2 max-w-[65ch]">She never measured anything. I did, badly, for a decade. This room holds the results, with the failures left in.</p>
        </div>
        {s !== 'none' && (
          <div className="h-32 overflow-hidden rounded-tr-[12px] rounded-bl-[12px] border border-[#111827]/15 bg-[#E8E2D5] relative">
            {s === 'loading' ? (
              <div className="h-full w-full animate-pulse bg-[#E8E2D5] grid place-items-center text-xs font-mono text-[#4B5563]">
                16:10 reserved slot…
              </div>
            ) : (
              <KitchenPhoto />
            )}
          </div>
        )}
      </div>
    </Stage>
  );
}

function AxHeadings() {
  return (
    <Stage label="Reading order and landmarks" caption="One h1, image alt only when it carries meaning, and a scrim contrast chip you can check.">
      <div className="relative bg-white rounded border border-[#E8E2D5] p-6 pl-9">
        <FocusMark n={1} className="left-2 top-6" />
        <h1 className="text-2xl" style={serif}>Recipes from my grandmother&apos;s kitchen</h1>
        <FocusMark n={2} className="left-2 top-[72px]" />
        <p className="text-sm text-[#4B5563] mt-3">Forty years of Sunday dinners, written down.</p>
        <FocusMark n={3} className="left-2 top-[104px]" />
        <a href="#recipes" onClick={(e) => e.preventDefault()} className={`inline-flex min-h-[44px] items-center text-sm underline text-[#A3285C] ${RING}`}>
          Read the first recipe
        </a>
        <div className="mt-2 flex flex-wrap gap-2 items-center">
          <Tag tone="good">h1 ×1</Tag>
          <Tag tone="good">scrim ≥ 7:1</Tag>
          <Tag tone="pink">alt=&quot;&quot; (decorative)</Tag>
        </div>
      </div>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'hero-do-one-action': OneAction,
  'hero-do-scrim': Scrim,
  'hero-redline-layout': RedlineLayout,
  'hero-layout-responsive': Responsive,
  'hero-states': States,
  'hero-ax-reading-order': AxHeadings,
};
