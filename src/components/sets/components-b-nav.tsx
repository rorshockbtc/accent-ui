'use client';

import React from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Stage, Seg, DoDont, DimV, HitBox, FocusMark, Tag } from '../primitives';
import { Btn, RING, serif } from './components-b-kit';

const LINKS = ['Home', 'Library', 'Greater', 'Ask', 'Export', 'Theme'];

function NavLink({ label, current, size = 'ok' }: { label: string; current?: boolean; size?: 'ok' | 'bad' }) {
  return (
    <a
      href="#nav"
      onClick={(e) => e.preventDefault()}
      aria-current={current ? 'page' : undefined}
      className={`relative inline-flex items-center px-3 ${size === 'ok' ? 'min-h-[44px] text-sm' : 'min-h-[24px] text-xs'} ${current ? 'font-semibold' : 'font-medium'} text-[#111827] hover:underline ${RING}`}
    >
      {label}
      {current && size === 'ok' && <span className="absolute left-3 right-3 bottom-1 h-0.5 bg-[#D44983]" />}
    </a>
  );
}

function DoCurrent() {
  return (
    <DoDont
      label="Current page"
      doExample={
        <nav aria-label="Do example" className="flex flex-wrap">
          {LINKS.slice(0, 4).map((l) => (
            <NavLink key={l} label={l} current={l === 'Library'} />
          ))}
        </nav>
      }
      doWhy="Underline plus weight plus aria-current. Three signals, none of them colour alone."
      dontExample={
        <nav aria-label="Don't example" className="flex flex-wrap">
          {LINKS.slice(0, 4).map((l) => (
            <a
              key={l}
              href="#nav"
              onClick={(e) => e.preventDefault()}
              className="px-2 min-h-[24px] text-xs"
              style={{ color: l === 'Library' ? '#e8a0bf' : '#9ca3af' }}
            >
              {l}
            </a>
          ))}
        </nav>
      }
      dontWhy="The current page differs only by a pale pink, and 12px links with 24px hit areas are tiny and low contrast."
    />
  );
}

function DoTrigger() {
  return (
    <DoDont
      label="Mobile menu trigger"
      doExample={
        <Btn kind="ghost">
          <Menu className="h-5 w-5" aria-hidden /> Menu
        </Btn>
      }
      doWhy="The word Menu sits beside the icon, the target is 44px, and the name is read aloud."
      dontExample={
        <button type="button" className="h-6 w-6 grid place-items-center">
          <Menu className="h-4 w-4 text-[#9ca3af]" aria-hidden />
        </button>
      }
      dontWhy="A bare 24px grey icon has no accessible name, a tiny target and no word for people who do not read hamburger."
    />
  );
}

function PriorityPlus() {
  const [n, setN] = React.useState<'6' | '4' | '2'>('6');
  const shown = LINKS.slice(0, Number(n));
  const rest = LINKS.slice(Number(n));
  const [open, setOpen] = React.useState(false);
  return (
    <Stage
      label="Priority-plus"
      controls={
        <Seg
          label="Available width"
          value={n}
          onChange={(v) => {
            setN(v);
            setOpen(false);
          }}
          options={[
            { id: '6', label: 'Wide' },
            { id: '4', label: 'Medium' },
            { id: '2', label: 'Narrow' },
          ]}
        />
      }
      caption="Links are ranked. The ones that fit stay; the rest move to More. Nothing wraps and nothing shrinks."
    >
      <nav aria-label="Priority-plus example" className="relative flex items-center h-16 px-4 bg-white border border-[#E8E2D5] rounded">
        <span className="mr-4 text-lg" style={serif}>Gallery</span>
        {shown.map((l) => (
          <NavLink key={l} label={l} current={l === 'Home'} />
        ))}
        {rest.length > 0 && (
          <div className="relative">
            <button
              type="button"
              aria-expanded={open}
              aria-controls="pp-more"
              onClick={() => setOpen(!open)}
              onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
              className={`min-h-[44px] px-3 text-sm font-medium ${RING}`}
            >
              More
            </button>
            {open && (
              <ul id="pp-more" className="absolute left-0 top-12 z-10 min-w-[160px] rounded border border-[#E8E2D5] bg-white shadow-md py-1">
                {rest.map((l) => (
                  <li key={l}>
                    <a href="#nav" onClick={(e) => e.preventDefault()} className={`flex min-h-[44px] items-center px-4 text-sm hover:bg-[#F3EFE9] ${RING}`}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </nav>
      {open && <div className="h-28" aria-hidden />}
    </Stage>
  );
}

function MobileSheet() {
  const [open, setOpen] = React.useState(false);
  const trig = React.useRef<HTMLButtonElement>(null);
  const first = React.useRef<HTMLAnchorElement>(null);
  React.useEffect(() => {
    if (open) first.current?.focus();
  }, [open]);
  const close = () => {
    setOpen(false);
    trig.current?.focus();
  };
  return (
    <Stage label="Mobile bottom sheet" caption="Opens where the thumb is. Focus moves into the sheet, Escape or Close returns it to the Menu button.">
      <div className="relative mx-auto w-[280px] h-[340px] overflow-hidden rounded-2xl border-2 border-[#111827] bg-white" onKeyDown={(e) => e.key === 'Escape' && close()}>
        <div className="flex items-center justify-between h-14 px-3 border-b border-[#E8E2D5]">
          <span style={serif} className="text-lg">Gallery</span>
          <button ref={trig} type="button" aria-expanded={open} aria-controls="m-sheet" onClick={() => setOpen(true)} className={`inline-flex items-center gap-1 min-h-[44px] px-3 text-sm font-medium ${RING}`}>
            <Menu className="h-5 w-5" aria-hidden /> Menu
          </button>
        </div>
        <p className="p-4 text-sm text-[#4B5563]">Page content sits here, dimmed while the sheet is open.</p>
        {open && (
          <>
            <div className="absolute inset-0 bg-[#111827]/50" onClick={close} aria-hidden />
            <div id="m-sheet" role="dialog" aria-modal="true" aria-label="Site menu" className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-4 shadow-xl">
              <div className="mx-auto mb-3 h-1 w-10 rounded bg-[#E8E2D5]" aria-hidden />
              <ul>
                {LINKS.slice(0, 5).map((l, i) => (
                  <li key={l}>
                    <a ref={i === 0 ? first : undefined} href="#nav" onClick={(e) => e.preventDefault()} className={`flex min-h-[48px] items-center text-base ${RING}`}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
              <Btn kind="ghost" className="w-full mt-2" onClick={close}>
                <X className="h-4 w-4" aria-hidden /> Close
              </Btn>
            </div>
          </>
        )}
      </div>
    </Stage>
  );
}

function SkipLink() {
  const [force, setForce] = React.useState(false);
  return (
    <Stage
      label="Skip link"
      controls={<Btn kind="ghost" className="!min-h-[32px] text-xs" aria-pressed={force} onClick={() => setForce(!force)}>{force ? 'Hide it' : 'Pin it visible'}</Btn>}
      caption="Click into the frame, then press Tab once. The link appears top-left, before any navigation."
    >
      <div className="relative bg-white rounded border border-[#E8E2D5] p-4 pt-14">
        <a
          href="#skip-main"
          onClick={(e) => e.preventDefault()}
          className={`absolute left-2 top-2 rounded bg-[#111827] px-4 min-h-[44px] inline-flex items-center text-sm text-white ${RING} ${force ? '' : 'opacity-0 focus:opacity-100'}`}
        >
          Skip to content
        </a>
        <div className="flex flex-wrap">{LINKS.slice(0, 4).map((l) => <NavLink key={l} label={l} />)}</div>
        <p id="skip-main" className="mt-3 text-sm text-[#4B5563]">Main content starts here.</p>
      </div>
    </Stage>
  );
}

function Crumbs() {
  return (
    <Stage label="Breadcrumbs and footer nav" caption="Breadcrumbs supplement the top nav on deep pages. The footer repeats the main links plus the small print.">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center text-sm">
        {['Library', 'Recipes', 'Sunday dinners'].map((c, i, a) => (
          <React.Fragment key={c}>
            <a href="#nav" onClick={(e) => e.preventDefault()} aria-current={i === a.length - 1 ? 'page' : undefined} className={`inline-flex min-h-[44px] items-center px-1 ${i === a.length - 1 ? 'font-semibold' : 'underline text-[#A3285C]'} ${RING}`}>
              {c}
            </a>
            {i < a.length - 1 && <ChevronRight className="h-4 w-4 text-[#4B5563]" aria-hidden />}
          </React.Fragment>
        ))}
      </nav>
      <footer className="mt-4 border-t border-[#E8E2D5] pt-3 grid sm:grid-cols-2 gap-2">
        <nav aria-label="Footer" className="flex flex-wrap">
          {['Home', 'Library', 'Contact', 'Privacy'].map((l) => <NavLink key={l} label={l} />)}
        </nav>
        <p className="text-sm text-[#4B5563] sm:text-right self-center">© Sample Author</p>
      </footer>
    </Stage>
  );
}

function RedlineHeights() {
  return (
    <Stage label="Redline: nav heights and hit areas" caption="64px on desktop, 56px on mobile. Link hit areas are 44px tall inside both.">
      <div className="grid gap-6 sm:grid-cols-[1fr_auto] items-start">
        {[64, 56].map((h) => (
          <div key={h} className="contents">
            <div className="flex items-center gap-3 px-3 bg-white border border-[#E8E2D5] rounded overflow-x-auto" style={{ height: h }}>
              <span className="text-lg" style={serif}>Gallery</span>
              {['Home', 'Library', 'Ask'].map((l) => (
                <HitBox key={l} w={72} h={44}>
                  <span className="text-sm font-medium">{l}</span>
                </HitBox>
              ))}
              <Tag tone="pink">{h === 64 ? 'desktop' : 'mobile'}</Tag>
            </div>
            <div className="hidden sm:block"><DimV height={h} label={`${h}px`} /></div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs font-mono text-[#A3285C]">link padding 12px · items gap 8px · underline 2px · 44px minimum hit area</p>
    </Stage>
  );
}

function AxFocusOrder() {
  return (
    <Stage label="Focus order" caption="Skip link first, then brand, then links in reading order, then utility actions.">
      <div className="relative flex flex-wrap items-center gap-6 bg-white border border-[#E8E2D5] rounded px-4 py-8">
        {['Skip to content', 'Gallery', 'Home', 'Library', 'Menu'].map((l, i) => (
          <span key={l} className="relative inline-flex min-h-[44px] items-center px-3 text-sm border border-dashed border-[#D44983] rounded">
            <FocusMark n={i + 1} className="-top-3 -left-2" />
            {l}
          </span>
        ))}
      </div>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'nav-do-current': DoCurrent,
  'nav-do-menu-trigger': DoTrigger,
  'nav-priority-plus': PriorityPlus,
  'nav-mobile-sheet': MobileSheet,
  'nav-skip-link': SkipLink,
  'nav-breadcrumbs-footer': Crumbs,
  'nav-redline-heights': RedlineHeights,
  'nav-ax-focus-order': AxFocusOrder,
};
