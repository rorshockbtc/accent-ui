'use client';

import React from 'react';
import { Check, AlertTriangle, Info, X } from 'lucide-react';
import { Stage, Seg, DoDont, DimH, DimV, HitBox, Tag } from '../primitives';
import { Btn, RING } from './components-b-kit';

type T = { id: number; msg: string; kind: 'ok' | 'err' | 'info'; ms: number; action?: string };

const ICON = { ok: Check, err: AlertTriangle, info: Info };
const TONE = { ok: 'border-[#166534]', err: 'border-[#9F1239]', info: 'border-[#111827]' };
const WORD = { ok: 'Saved', err: 'Error', info: 'Note' };

function Toast({ t, onClose, onAction }: { t: T; onClose: (id: number) => void; onAction?: (t: T) => void }) {
  const [hold, setHold] = React.useState(false);
  React.useEffect(() => {
    if (!t.ms || hold) return;
    const id = window.setTimeout(() => onClose(t.id), t.ms);
    return () => window.clearTimeout(id);
  }, [hold, t, onClose]);
  const I = ICON[t.kind];
  return (
    <div
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
      className={`flex items-center gap-3 min-h-[48px] max-w-[360px] w-full rounded-md border-l-4 bg-white pl-3 pr-1 py-1 shadow-md text-sm ${TONE[t.kind]}`}
    >
      <I className="h-5 w-5 shrink-0" aria-hidden />
      <span className="flex-1"><span className="sr-only">{WORD[t.kind]}: </span>{t.msg}</span>
      {t.action && <Btn kind="ghost" className="!min-h-[44px]" onClick={() => onAction?.(t)}>{t.action}</Btn>}
      <button type="button" aria-label="Dismiss" onClick={() => onClose(t.id)} className={`grid h-11 w-11 place-items-center ${RING}`}><X className="h-4 w-4" aria-hidden /></button>
    </div>
  );
}

function useToasts(max = 3) {
  const [list, setList] = React.useState<T[]>([]);
  const n = React.useRef(0);
  const push = (x: Omit<T, 'id'>) => setList((l) => [...l, { ...x, id: ++n.current }].slice(-max));
  const close = React.useCallback((id: number) => setList((l) => l.filter((x) => x.id !== id)), []);
  return { list, push, close };
}

function Live() {
  const [mode, setMode] = React.useState<'polite' | 'assertive'>('polite');
  const { list, push, close } = useToasts();
  const err = mode === 'assertive';
  return (
    <Stage
      label="Toast: polite vs assertive"
      controls={<Seg label="Urgency" value={mode} onChange={setMode} options={[{ id: 'polite', label: 'Polite' }, { id: 'assertive', label: 'Assertive' }]} />}
      caption="Polite waits for the screen reader to finish. Assertive interrupts, so keep it for failures. Hover or focus a toast to pause its timer."
    >
      <Btn onClick={() => push(err ? { msg: 'Upload failed. Check your connection.', kind: 'err', ms: 0 } : { msg: 'Draft saved.', kind: 'ok', ms: 5000 })}>
        {err ? 'Trigger a failure' : 'Save draft'}
      </Btn>
      <div className="mt-4 min-h-[112px] flex flex-col gap-2 items-start">
        <div role="status" aria-live="polite" className="flex flex-col gap-2 w-full items-start">
          {list.filter((x) => x.kind !== 'err').map((x) => <Toast key={x.id} t={x} onClose={close} />)}
        </div>
        <div role="alert" className="flex flex-col gap-2 w-full items-start">
          {list.filter((x) => x.kind === 'err').map((x) => <Toast key={x.id} t={x} onClose={close} />)}
        </div>
      </div>
    </Stage>
  );
}

function Undo() {
  const [items, setItems] = React.useState(['Lemon tart', 'Sunday roast', 'Plain rice']);
  const [gone, setGone] = React.useState<{ name: string; at: number } | null>(null);
  const timer = React.useRef<number | undefined>(undefined);
  const del = (name: string, at: number) => {
    setItems((l) => l.filter((x) => x !== name));
    setGone({ name, at });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setGone(null), 8000);
  };
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  const undo = () => {
    if (!gone) return;
    setItems((l) => { const c = [...l]; c.splice(gone.at, 0, gone.name); return c; });
    setGone(null);
  };
  return (
    <Stage label="Undo pattern" caption="Delete first, offer Undo for 8 seconds. Faster than a confirm dialog and just as safe.">
      <ul className="max-w-sm">
        {items.map((x, i) => (
          <li key={x} className="flex items-center justify-between border-b border-[#E8E2D5] pl-1">
            <span className="text-sm">{x}</span>
            <Btn kind="ghost" className="my-1" aria-label={`Delete ${x}`} onClick={() => del(x, i)}>Delete</Btn>
          </li>
        ))}
      </ul>
      <div role="status" aria-live="polite" className="mt-3 min-h-[52px]">
        {gone && (
          <div className="flex items-center gap-3 max-w-[360px] min-h-[48px] bg-[#111827] text-white rounded-md pl-4 pr-1 text-sm">
            <span className="flex-1">Deleted “{gone.name}”.</span>
            <button type="button" onClick={undo} className={`min-h-[44px] px-3 font-semibold underline ${RING}`}>Undo</button>
          </div>
        )}
      </div>
    </Stage>
  );
}

function Choose() {
  return (
    <Stage label="Toast, alert or inline?" caption="Ask two questions: did the person just do something, and must they act? Toast confirms, alert interrupts, inline stays put.">
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ['Toast', 'Draft saved.', 'You did it; nothing to do. Disappears.', 'ok'],
          ['Alert', 'Payment failed. Card declined.', 'Needs action now. Stays until fixed.', 'err'],
          ['Inline', 'Password needs 12 characters.', 'About one field. Sits beside it.', 'info'],
        ].map(([h, m, w, k]) => (
          <div key={h} className="bg-white border border-[#E8E2D5] rounded p-3">
            <p className="text-xs font-mono uppercase text-[#4B5563]">{h}</p>
            <p className={`mt-2 text-sm border-l-4 pl-2 py-1 ${TONE[k as T['kind']]}`}>{m}</p>
            <p className="mt-2 text-sm text-[#4B5563]">{w}</p>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function Stack() {
  const { list, push, close } = useToasts(3);
  const n = React.useRef(0);
  return (
    <Stage label="Stacking" caption="Three at most, newest at the bottom, oldest drops off. Never pile up ten.">
      <Btn onClick={() => push({ msg: `Photo ${++n.current} uploaded.`, kind: 'ok', ms: 6000 })}>Upload a photo</Btn>
      <div role="status" aria-live="polite" className="mt-3 min-h-[170px] flex flex-col gap-2 justify-end items-start">
        {list.map((x) => <Toast key={x.id} t={x} onClose={close} />)}
      </div>
    </Stage>
  );
}

function DoPersist() {
  return (
    <DoDont
      label="Errors"
      doExample={
        <div className="w-full max-w-xs border-l-4 border-[#9F1239] bg-white p-3 text-sm" role="alert">
          <p className="font-semibold flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-[#9F1239]" aria-hidden /> Upload failed</p>
          <p className="mt-1 text-[#4B5563]">The file is over 10 MB. Resize it and try again.</p>
          <Btn kind="ghost" className="mt-2">Choose another file</Btn>
        </div>
      }
      doWhy="An error that needs a fix stays on screen, says what happened and offers the next step."
      dontExample={
        <div className="w-full max-w-xs">
          <div className="rounded bg-[#ef4444] text-white text-xs px-3 py-2">Error 500</div>
          <div className="mt-1 h-1 bg-white/60"><div className="h-1 w-1/5 bg-[#9F1239]" /></div>
          <p className="mt-2 text-xs text-[#4B5563]">Auto-dismisses in 2 seconds.</p>
        </div>
      }
      dontWhy="A two-second toast with a bare code vanishes before anyone reads it, and nothing tells them what to do."
    />
  );
}

function DoPosition() {
  return (
    <DoDont
      label="Position"
      doExample={
        <div className="relative w-full max-w-xs h-36 bg-white rounded border border-[#E8E2D5] p-3">
          <div className="flex justify-end"><span className="min-h-[44px] px-4 inline-flex items-center rounded bg-[#111827] text-white text-sm">Publish</span></div>
          <div className="absolute left-3 bottom-3 rounded bg-[#111827] text-white text-sm px-3 py-2">Draft saved.</div>
        </div>
      }
      doWhy="Bottom-left keeps the toast clear of the primary action and the reading path."
      dontExample={
        <div className="relative w-full max-w-xs h-36 bg-white rounded border border-[#E8E2D5] p-3">
          <div className="flex justify-end"><span className="min-h-[44px] px-4 inline-flex items-center rounded bg-[#111827] text-white text-sm">Publish</span></div>
          <div className="absolute right-2 top-3 rounded bg-[#4B5563] text-white text-sm px-3 py-3 shadow-lg">Saved ✓ Saved ✓ Saved ✓</div>
        </div>
      }
      dontWhy="The toast sits right on top of the Publish button, so the one thing the person wants to click is covered."
    />
  );
}

function Redline() {
  return (
    <Stage label="Redline: toast" caption="Max width 360px, minimum height 48px, 16px side padding, 44px action and dismiss targets.">
      <div className="overflow-x-auto pb-4">
        <div className="mb-5"><DimH width={360} label="max 360px" /></div>
        <div className="flex items-center gap-2">
          <div className="flex w-[360px] items-center gap-3 min-h-[48px] bg-[#111827] text-white rounded-md pl-4 pr-1 text-sm">
            <span className="flex-1">Deleted “Lemon tart”.</span>
            <HitBox w={64} h={44}><span className="text-sm font-semibold underline">Undo</span></HitBox>
          </div>
          <DimV height={48} label="48px min" />
        </div>
      </div>
    </Stage>
  );
}

function AxLive() {
  const [mode, setMode] = React.useState<'polite' | 'assertive'>('polite');
  return (
    <Stage
      label="What a screen reader hears"
      controls={<Seg label="Region" value={mode} onChange={setMode} options={[{ id: 'polite', label: 'role=status' }, { id: 'assertive', label: 'role=alert' }]} />}
      caption="The sr-only prefix gives the status in words, so the icon never carries the message alone."
    >
      <div className="grid gap-3 sm:grid-cols-2 items-start">
        <div>
          <p className="text-xs font-mono uppercase text-[#4B5563] mb-1">Visible</p>
          <Toast t={mode === 'polite' ? { id: 1, msg: 'Draft saved.', kind: 'ok', ms: 0 } : { id: 2, msg: 'Upload failed.', kind: 'err', ms: 0 }} onClose={() => undefined} />
        </div>
        <div>
          <p className="text-xs font-mono uppercase text-[#4B5563] mb-1">Announced</p>
          <p className="text-sm bg-white border border-[#E8E2D5] rounded p-3">
            {mode === 'polite' ? '“Saved: Draft saved.” after the current sentence.' : '“Error: Upload failed.” immediately, interrupting.'}
          </p>
          <div className="mt-2 flex gap-2"><Tag tone={mode === 'polite' ? 'good' : 'bad'}>{mode === 'polite' ? 'aria-live=polite' : 'aria-live=assertive'}</Tag></div>
        </div>
      </div>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'toast-live-regions': Live,
  'toast-undo': Undo,
  'toast-choose': Choose,
  'toast-stacking': Stack,
  'toast-do-persist-errors': DoPersist,
  'toast-do-position': DoPosition,
  'toast-redline': Redline,
  'toast-ax-announce': AxLive,
};
