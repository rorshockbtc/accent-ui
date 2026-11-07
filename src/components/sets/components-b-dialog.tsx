'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Stage, Seg, DoDont, DimH, DimV, HitBox, FocusMark, Tag } from '../primitives';
import { Btn, RING, serif } from './components-b-kit';

function Native() {
  const ref = React.useRef<HTMLDialogElement>(null);
  const trig = React.useRef<HTMLButtonElement>(null);
  const [log, setLog] = React.useState('Dialog closed. Focus is on the trigger.');
  React.useEffect(() => () => void (document.body.style.overflow = ''), []);
  const open = () => {
    document.body.style.overflow = 'hidden';
    ref.current?.showModal();
    setLog('Opened with showModal(): page is inert, scroll locked, focus is inside.');
  };
  return (
    <Stage label="Native dialog" caption="Built on the platform: showModal() gives the focus trap, Escape, inert background and top layer for free. We add scroll lock and focus return.">
      <Btn ref={trig} onClick={open}>Delete project…</Btn>
      <p role="status" className="mt-3 text-sm text-[#4B5563]">{log}</p>
      <dialog
        ref={ref}
        aria-labelledby="nd-title"
        aria-describedby="nd-desc"
        onClose={() => {
          document.body.style.overflow = '';
          trig.current?.focus();
          setLog('Closed. Focus returned to the trigger.');
        }}
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="rounded-lg p-0 w-[min(480px,calc(100vw-32px))] backdrop:bg-[#111827]/60 text-[#111827]"
      >
        <form method="dialog" className="p-6">
          <h3 id="nd-title" className="text-xl" style={serif}>Delete “Sunday dinners”?</h3>
          <p id="nd-desc" className="mt-2 text-sm text-[#4B5563]">This removes 42 recipes. You can restore them from Trash for 30 days.</p>
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Btn kind="ghost" value="cancel" type="submit" autoFocus>Keep project</Btn>
            <Btn kind="danger" value="delete" type="submit">Delete 42 recipes</Btn>
          </div>
        </form>
      </dialog>
    </Stage>
  );
}

const KINDS = {
  modal: ['Modal dialog', 'Blocks the page. Use when the person must decide before anything else makes sense: confirm a destructive action, finish a required step.', 'Delete 42 recipes?'],
  sheet: ['Bottom sheet', 'Modal on a phone, anchored to the thumb. Use for menus, pickers and short forms on small screens.', 'Sort by…'],
  popover: ['Popover', 'Non-modal, anchored to its trigger, dismisses on outside click. Use for small menus and extra detail.', 'Share options'],
  inline: ['Inline', 'No overlay at all. Use for anything that does not need to interrupt: help text, errors, expandable details.', 'Why we ask'],
} as const;

function Chooser() {
  const [k, setK] = React.useState<keyof typeof KINDS>('modal');
  const [t, d, ex] = KINDS[k];
  return (
    <Stage
      label="Which one?"
      controls={<Seg label="Pattern" value={k} onChange={setK} options={(Object.keys(KINDS) as (keyof typeof KINDS)[]).map((id) => ({ id, label: KINDS[id][0].split(' ')[0] }))} />}
      caption="Start at the bottom of this list and move up only when the lighter option fails."
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr] items-center">
        <div><h4 className="text-lg font-semibold">{t}</h4><p className="text-sm mt-1 text-[#4B5563]">{d}</p></div>
        <div className="relative h-32 rounded bg-[#E8E2D5] overflow-hidden" aria-hidden>
          {k === 'modal' && <div className="absolute inset-0 bg-[#111827]/40 grid place-items-center"><div className="bg-white rounded p-3 text-sm">{ex}</div></div>}
          {k === 'sheet' && <div className="absolute inset-x-6 bottom-0 bg-white rounded-t-xl p-3 text-sm">{ex}</div>}
          {k === 'popover' && <div className="absolute left-6 top-6"><span className="bg-[#111827] text-white text-sm rounded px-3 py-2 inline-block">Share</span><div className="mt-1 bg-white rounded shadow p-2 text-sm">{ex}</div></div>}
          {k === 'inline' && <div className="absolute inset-x-4 top-8 bg-white rounded p-3 text-sm">{ex}: we use it to pick your first room.</div>}
        </div>
      </div>
    </Stage>
  );
}

function Sheet() {
  const [open, setOpen] = React.useState(false);
  const trig = React.useRef<HTMLButtonElement>(null);
  const first = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => { if (open) first.current?.focus(); }, [open]);
  const close = () => { setOpen(false); trig.current?.focus(); };
  const opts = ['Newest', 'Oldest', 'Most cooked'];
  return (
    <Stage label="Mobile bottom sheet" caption="Grabber, title, 48px options, dimmed page behind. Escape and the Close button both return focus.">
      <div className="relative mx-auto w-[280px] h-[320px] overflow-hidden rounded-2xl border-2 border-[#111827] bg-white" onKeyDown={(e) => e.key === 'Escape' && close()}>
        <div className="p-4"><Btn ref={trig} kind="ghost" aria-haspopup="dialog" onClick={() => setOpen(true)}>Sort recipes</Btn></div>
        {open && (
          <>
            <div className="absolute inset-0 bg-[#111827]/50" onClick={close} aria-hidden />
            <div role="dialog" aria-modal="true" aria-labelledby="sh-t" className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-4">
              <div className="mx-auto mb-2 h-1 w-10 rounded bg-[#9CA3AF]" aria-hidden />
              <h4 id="sh-t" className="text-base font-semibold mb-1">Sort by</h4>
              {opts.map((o, i) => (
                <button key={o} ref={i === 0 ? first : undefined} type="button" onClick={close} className={`flex w-full min-h-[48px] items-center text-base ${RING}`}>{o}</button>
              ))}
              <Btn kind="ghost" className="w-full mt-2" onClick={close}>Close</Btn>
            </div>
          </>
        )}
      </div>
    </Stage>
  );
}

function LongContent() {
  return (
    <Stage label="Long content" caption="The body scrolls, the title and actions stay put. The page behind never moves.">
      <div className="mx-auto w-full max-w-md bg-white rounded-lg border border-[#E8E2D5] flex flex-col h-64">
        <h4 className="p-4 text-lg border-b border-[#E8E2D5]" style={serif}>Terms of the room</h4>
        <div className="flex-1 overflow-y-auto p-4 text-sm leading-6 text-[#4B5563]" tabIndex={0} role="region" aria-label="Terms, scrollable">
          {Array.from({ length: 8 }, (_, i) => <p key={i} className="mb-3">Clause {i + 1}. Rooms belong to the people who make them. We keep the lights on and do not read your drafts.</p>)}
        </div>
        <div className="p-3 border-t border-[#E8E2D5] flex justify-end gap-2"><Btn kind="ghost">Decline</Btn><Btn>Accept</Btn></div>
      </div>
    </Stage>
  );
}

function DoConfirm() {
  return (
    <DoDont
      label="Confirmation copy"
      doExample={
        <div className="bg-white rounded-lg border border-[#E8E2D5] p-4 w-full max-w-xs">
          <h4 className="text-base font-semibold">Delete 3 files?</h4>
          <p className="text-sm text-[#4B5563] mt-1">They move to Trash for 30 days.</p>
          <div className="mt-3 flex gap-2 justify-end"><Btn kind="ghost">Keep files</Btn><Btn kind="danger">Delete 3 files</Btn></div>
        </div>
      }
      doWhy="The title names the object and the buttons repeat the verb, so no one has to re-read the question."
      dontExample={
        <div className="bg-white rounded-lg border border-[#E8E2D5] p-4 w-full max-w-xs relative">
          <button type="button" className="absolute right-1 top-1 h-5 w-5 grid place-items-center"><X className="h-3 w-3 text-[#9CA3AF]" aria-hidden /></button>
          <h4 className="text-base font-semibold">Are you sure?</h4>
          <div className="mt-3 flex gap-2 justify-end"><span className="px-3 py-1 text-sm bg-[#2563eb] text-white rounded">OK</span><span className="px-3 py-1 text-sm bg-[#2563eb] text-white rounded">Cancel</span></div>
        </div>
      }
      dontWhy="“Are you sure?” says nothing, OK and Cancel look identical, and the close icon is a 20px grey target nobody can hit."
    />
  );
}

function DoNonModal() {
  return (
    <DoDont
      label="Interrupting"
      doExample={
        <div className="w-full max-w-xs text-sm">
          <label className="block font-medium" htmlFor="dd-e">Email</label>
          <input id="dd-e" className="mt-1 w-full min-h-[44px] rounded border border-[#111827]/40 px-3" defaultValue="sam@example.com" />
          <p className="mt-1 text-[#4B5563]">We only use this to send your receipt.</p>
        </div>
      }
      doWhy="Explanation that nobody must act on sits inline next to the field it explains."
      dontExample={
        <div className="relative w-full max-w-xs h-36 bg-[#E8E2D5] rounded overflow-hidden">
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-4 bg-white rounded p-3 text-sm">
            <p className="font-bold">Wait! Get 10% off!</p>
            <p className="text-xs text-[#9CA3AF] mt-4">No thanks, I hate saving money</p>
          </div>
        </div>
      }
      dontWhy="A modal that appears on arrival blocks reading, shames the exit and hides a tiny low-contrast dismiss link."
    />
  );
}

function Redline() {
  return (
    <Stage label="Redline: dialog anatomy" caption="Max width 560px, 24px padding, 44px actions with 8px between them, radius 8px.">
      <div className="overflow-x-auto pb-4">
        <div className="min-w-[420px] max-w-[560px]">
          <div className="mb-5"><DimH width="100%" label="max 560px" /></div>
          <div className="flex gap-2">
            <div className="flex-1 bg-white border border-[#E8E2D5] rounded-lg p-6 shadow-sm">
              <h4 className="text-xl" style={serif}>Dialog title</h4>
              <p className="text-sm text-[#4B5563] mt-2">Body copy at 14px on a 24px line.</p>
              <div className="mt-6 flex justify-end gap-2">
                <HitBox w={96} h={44}><span className="text-sm">Cancel</span></HitBox>
                <HitBox w={120} h={44}><span className="text-sm">Confirm</span></HitBox>
              </div>
            </div>
            <DimV height={24} label="24px" />
          </div>
        </div>
      </div>
    </Stage>
  );
}

function AxFocus() {
  return (
    <Stage label="Focus trap and return" caption="Focus lands on the safest action, cycles inside, and goes back to the trigger on close.">
      <div className="relative flex flex-wrap items-center gap-8 py-6">
        <span className="relative inline-flex min-h-[44px] items-center px-4 text-sm border border-dashed border-[#D44983] rounded"><FocusMark n={4} className="-top-3 -right-2" />Trigger</span>
        <div className="relative bg-white border border-[#E8E2D5] rounded-lg p-4 flex gap-4">
          {['Close', 'Keep project', 'Delete'].map((l, i) => (
            <span key={l} className="relative inline-flex min-h-[44px] items-center px-3 text-sm border border-dashed border-[#D44983] rounded"><FocusMark n={i + 1} className="-top-3 -left-2" />{l}</span>
          ))}
        </div>
        <Tag tone="pink">Tab after 3 wraps to 1</Tag>
        <Tag tone="good">Close returns to the trigger (4)</Tag>
      </div>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'dialog-native': Native,
  'dialog-chooser': Chooser,
  'dialog-sheet-mobile': Sheet,
  'dialog-long-content': LongContent,
  'dialog-do-confirm': DoConfirm,
  'dialog-do-inline': DoNonModal,
  'dialog-redline-anatomy': Redline,
  'dialog-ax-focus': AxFocus,
};
