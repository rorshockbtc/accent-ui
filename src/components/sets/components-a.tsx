'use client';

import React, { useId, useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Stage, Seg, DoDont, DimH, DimV, HitBox, Tag, FocusMark } from '../primitives';
import { EditorialPlate } from '../sample-media';

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const FOCUS = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3285C]';
const LABEL = 'text-sm font-medium text-[#111827]';
const FIELD = `min-h-[44px] w-full border border-[#4B5563] bg-white px-3 text-base text-[#111827] ${FOCUS}`;

function KeyMap({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
      {rows.map(([k, v]) => (
        <React.Fragment key={k}>
          <dt>
            <kbd className="inline-block min-w-[44px] rounded border border-[#4B5563] bg-white px-2 py-1 text-center font-mono text-xs text-[#111827]">{k}</kbd>
          </dt>
          <dd className="self-center text-[#111827]">{v}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function Checkbox({ label, checked, indeterminate, onChange, hint }: { label: string; checked: boolean; indeterminate?: boolean; onChange: (v: boolean) => void; hint?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-[#111827]">
      <input ref={ref} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className={`h-5 w-5 accent-[#A3285C] ${FOCUS}`} />
      <span>
        {label}
        {hint && <span className="block text-xs text-[#4B5563]">{hint}</span>}
      </span>
    </label>
  );
}

function Switch({ label, on, onChange }: { label: string; on: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4 text-sm text-[#111827]">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <span className="w-7 text-xs tabular-nums text-[#4B5563]" aria-hidden>{on ? 'On' : 'Off'}</span>
        <span className="relative inline-block h-6 w-11">
          <input type="checkbox" role="switch" checked={on} onChange={(e) => onChange(e.target.checked)} className={`peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full border border-[#4B5563] bg-[#E8E2D5] checked:border-[#A3285C] checked:bg-[#A3285C] ${FOCUS}`} />
          <span className="pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
        </span>
      </span>
    </label>
  );
}

const ROOMS = [
  { group: 'Public', items: ['Gallery', 'Chapel', 'Atelier', 'Fairway'] },
  { group: 'Work', items: ['Ledger', 'Forge', 'Signal', 'Atlas'] },
  { group: 'Private', items: ['Vault', 'Orbit'] },
];

function Combo({ items = ROOMS, label = 'Room' }: { items?: typeof ROOMS; label?: string }) {
  const id = useId();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState('');
  const groups = items.map((g) => ({ ...g, items: g.items.filter((i) => i.toLowerCase().includes(q.toLowerCase())) })).filter((g) => g.items.length);
  const flat = groups.flatMap((g) => g.items);
  const pick = (v: string) => { setPicked(v); setQ(v); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, flat.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === 'Home' && open) { e.preventDefault(); setActive(0); }
    else if (e.key === 'End' && open) { e.preventDefault(); setActive(flat.length - 1); }
    else if (e.key === 'Enter' && open && flat[active]) { e.preventDefault(); pick(flat[active]); }
    else if (e.key === 'Escape') setOpen(false);
  };
  let n = -1;
  return (
    <div className="relative w-full max-w-sm">
      <label htmlFor={`${id}-in`} className={LABEL}>{label}</label>
      <input id={`${id}-in`} role="combobox" aria-expanded={open} aria-controls={`${id}-lb`} aria-autocomplete="list" aria-activedescendant={open && flat[active] ? `${id}-o${active}` : undefined} value={q} placeholder="Type to filter" autoComplete="off"
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} onKeyDown={onKey} className={`${FIELD} mt-1`} />
      <ul id={`${id}-lb`} role="listbox" aria-label={label} hidden={!open} className="absolute z-10 mt-1 max-h-60 w-full overflow-auto border border-[#4B5563] bg-white py-1 shadow-md">
        {groups.map((g) => (
          <li key={g.group} role="presentation">
            <span id={`${id}-g-${g.group}`} className="block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#4B5563]">{g.group}</span>
            <ul role="group" aria-labelledby={`${id}-g-${g.group}`}>
              {g.items.map((it) => { n += 1; const i = n; return (
                <li key={it} id={`${id}-o${i}`} role="option" aria-selected={picked === it} onMouseDown={(e) => { e.preventDefault(); pick(it); }}
                  className={`flex min-h-[44px] cursor-pointer items-center justify-between px-3 text-sm text-[#111827] ${i === active ? 'bg-[#E8E2D5]' : ''}`}>
                  {it}{picked === it && <span className="text-xs font-medium text-[#166534]">Selected</span>}
                </li>); })}
            </ul>
          </li>
        ))}
        {flat.length === 0 && <li role="presentation" className="px-3 py-3 text-sm text-[#4B5563]">No room matches “{q}”. Clear the filter to see all 10.</li>}
      </ul>
    </div>
  );
}

/** ARIA tabs with roving tabindex and automatic activation. */
function AriaTabs({ tabs, label = 'Account sections' }: { tabs: { id: string; label: string; body: string }[]; label?: string }) {
  const uid = useId();
  const [sel, setSel] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const go = (i: number) => { const j = (i + tabs.length) % tabs.length; setSel(j); refs.current[j]?.focus(); };
  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(tabs.length - 1); }
  };
  return (
    <div className="w-full max-w-md">
      <div role="tablist" aria-label={label} className="flex border-b border-[#4B5563]">
        {tabs.map((t, i) => (
          <button key={t.id} ref={(el) => { refs.current[i] = el; }} role="tab" id={`${uid}-t${i}`} aria-selected={sel === i} aria-controls={`${uid}-p${i}`} tabIndex={sel === i ? 0 : -1}
            onClick={() => setSel(i)} onKeyDown={(e) => onKey(e, i)}
            className={`min-h-[44px] px-4 text-sm font-medium -mb-px border-b-2 ${sel === i ? 'border-[#A3285C] text-[#111827]' : 'border-transparent text-[#4B5563] hover:text-[#111827]'} ${FOCUS}`}>{t.label}</button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} role="tabpanel" id={`${uid}-p${i}`} aria-labelledby={`${uid}-t${i}`} hidden={sel !== i} tabIndex={0} className={`py-4 text-sm leading-6 text-[#111827] ${FOCUS}`}>{t.body}</div>
      ))}
    </div>
  );
}

const ACCOUNT_TABS = [
  { id: 'profile', label: 'Profile', body: 'Name, photo and the one-line bio shown on your pipe.' },
  { id: 'billing', label: 'Billing', body: 'Plan, invoices and the card on file.' },
  { id: 'team', label: 'Team', body: 'Who can edit, who can only read.' },
];

/* ------------------------------------------------------------------ */
/* BUTTON                                                              */
/* ------------------------------------------------------------------ */

function ButtonDoOnePrimary() {
  return (
    <DoDont label="One primary button"
      doExample={<div className="flex gap-2"><Button variant="outline">Cancel</Button><Button>Publish page</Button></div>}
      dontExample={<div className="flex gap-2"><Button>Save draft</Button><Button>Publish page</Button></div>}
      doWhy="One solid button marks the action you want. Cancel steps back into outline."
      dontWhy="Two solid buttons ask the reader to stop and decide which one you meant." />
  );
}

function ButtonDoVerbLabel() {
  return (
    <DoDont label="Button labels"
      doExample={<div className="flex gap-2"><Button variant="outline">Keep room</Button><Button variant="destructive">Delete room</Button></div>}
      dontExample={<div className="flex gap-2"><Button variant="outline">No</Button><Button>OK</Button></div>}
      doWhy="The label names the action, so the red button still reads correctly with the colour removed."
      dontWhy={'“OK” and “No” only make sense if you reread the question, and the question has scrolled away.'} />
  );
}

function ButtonDoLinkVsButton() {
  return (
    <DoDont label="Link or button"
      doExample={<div className="flex items-center gap-4"><a href="#pricing" onClick={(e) => e.preventDefault()} className={`inline-flex min-h-[44px] items-center text-sm font-medium text-[#A3285C] underline underline-offset-4 ${FOCUS}`}>See pricing</a><Button>Start trial</Button></div>}
      dontExample={<div className="flex items-center gap-4"><Button onClick={() => undefined}>See pricing</Button><div role="presentation" onClick={() => undefined} className="inline-flex h-8 cursor-pointer items-center bg-[#111827] px-3 text-sm text-white">Start trial</div></div>}
      doWhy="Going somewhere is a link; doing something is a button. Each gets the right role and keyboard behaviour."
      dontWhy="A button that navigates breaks open-in-new-tab, and a div with onClick cannot be reached with Tab at all." />
  );
}

function ButtonRedlineSizes() {
  const rows: [string, string, number][] = [['xs', 'Dense', 24], ['sm', 'Small', 28], ['default', 'Default', 32], ['lg', 'Large', 36]];
  return (
    <Stage label="Redline / button heights" caption="Drawn heights step by 4px. The dashed box is the 44px hit area every size must keep.">
      <div className="flex flex-wrap items-end gap-8 pt-6">
        {rows.map(([s, l, h]) => (
          <div key={s} className="flex items-center gap-2">
            <DimV height={h} label={`${h}`} />
            <div className="pl-8"><HitBox w={96} h={44}><Button size={s === 'default' ? 'default' : (s as 'xs' | 'sm' | 'lg')}>{l}</Button></HitBox></div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function ButtonRedlineAnatomy() {
  return (
    <Stage label="Redline / default button anatomy" caption="10px side padding, 16px icon, 6px gap, label in 14px/500. Height 32px, radius 0.">
      <div className="flex flex-col items-start gap-6 pt-6">
        <DimH width={168} label="auto width" />
        <Button><span aria-hidden className="mr-1.5 inline-block h-4 w-4 border-2 border-current" />Add room</Button>
        <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-[#A3285C]"><span>10</span><span>16</span><span>6</span><span>label</span><span>10</span><span className="text-[#4B5563]">(px, left to right)</span></div>
      </div>
    </Stage>
  );
}

function ButtonAxHitarea() {
  return (
    <Stage label="Accessibility / 44px hit area" caption="Solid is what you see (32px). Dashed is what a thumb can hit (44px). The second button keeps the extra 6px above and below without moving the layout.">
      <div className="flex flex-wrap items-center gap-10 pb-6">
        <HitBox w={120} h={44} label="44 hit"><Button className="relative after:absolute after:-inset-y-1.5 after:inset-x-0 after:content-['']">Save draft</Button></HitBox>
        <HitBox w={44} h={44} label="44 x 44"><Button size="icon" variant="ghost" aria-label="Close dialog" className="relative after:absolute after:-inset-1.5 after:content-['']"><span aria-hidden className="text-base leading-none">×</span></Button></HitBox>
      </div>
    </Stage>
  );
}

function ButtonAxFocusOrder() {
  return (
    <Stage label="Accessibility / focus order" caption="Tab walks left to right, in the order the eye reads. Primary last in the row, so it is the final stop before the next section.">
      <div className="relative flex flex-wrap gap-4 pt-6">
        {['Back', 'Save draft', 'Publish page'].map((l, i) => (
          <div key={l} className="relative"><FocusMark n={i + 1} className="-top-5 left-0" /><Button variant={i === 2 ? 'default' : 'outline'}>{l}</Button></div>
        ))}
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* BADGE                                                               */
/* ------------------------------------------------------------------ */

function BadgeDoText() {
  return (
    <DoDont label="Badge needs words"
      doExample={<div className="flex gap-2"><Badge variant="secondary">Paid</Badge><Badge variant="destructive">Overdue</Badge></div>}
      dontExample={<div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-[#16a34a]" /><span className="h-3 w-3 rounded-full bg-[#dc2626]" /></div>}
      doWhy="A word carries the status. Colour is a bonus for people who can see it."
      dontWhy="A green dot and a red dot mean nothing to the 1 in 12 men with red-green colour blindness, or to a screen reader." />
  );
}

function BadgeDoMaxTwo() {
  return (
    <DoDont label="Badge count"
      doExample={<div className="flex items-center gap-3 text-sm text-[#111827]"><span className="font-medium">Invoice 1042</span><Badge variant="secondary">Paid</Badge></div>}
      dontExample={<div className="flex flex-wrap items-center gap-1 text-sm text-[#111827]"><span className="font-medium">Invoice 1042</span><Badge>New</Badge><Badge variant="secondary">Paid</Badge><Badge variant="outline">Q3</Badge><Badge variant="destructive">Flagged</Badge><Badge>Hot</Badge></div>}
      doWhy="One badge states one fact. The eye lands on it and moves on."
      dontWhy="Five badges is a rash. When everything is flagged, nothing is." />
  );
}

function BadgeRedline() {
  return (
    <Stage label="Redline / badge" caption="20px tall, 8px side padding, 12px/500 text, fully rounded. Read-only, so no 44px hit area: if it can be clicked, it is a button.">
      <div className="flex items-center gap-8 pt-6">
        <div className="flex items-center gap-2"><DimV height={20} label="20" /><div className="pl-8"><Badge variant="secondary">Paid</Badge></div></div>
        <div className="flex flex-col gap-3"><DimH width={52} label="52" /><Badge variant="outline">Draft</Badge></div>
      </div>
    </Stage>
  );
}

function BadgeAxContrast() {
  const chips: [string, string, string, string][] = [['Paid', '#166534', '#DCFCE7', '7.0:1'], ['Overdue', '#9F1239', '#FFE4E6', '7.4:1'], ['Draft', '#111827', '#E8E2D5', '13.2:1']];
  return (
    <Stage label="Accessibility / contrast chips" caption="Text and fill pairs shown with their ratios. The word does the work; colour only agrees with it.">
      <ul className="flex flex-wrap gap-4">
        {chips.map(([t, fg, bg, r]) => (
          <li key={t} className="flex flex-col items-start gap-1 text-xs tabular-nums text-[#4B5563]">
            <span className="inline-flex h-5 items-center rounded-full px-2 text-xs font-medium" style={{ color: fg, background: bg }}>{t}</span>
            {r} · AAA
          </li>
        ))}
      </ul>
    </Stage>
  );
}

function BadgeAxSr() {
  return (
    <Stage label="Accessibility / what a screen reader says" caption="Left: what you see. Right: what is announced. Context goes in visually hidden text, never in the badge label itself.">
      <div className="grid gap-4 sm:grid-cols-2 text-sm text-[#111827]">
        <div className="flex items-center gap-2">Messages <Badge>3<span className="sr-only"> unread</span></Badge></div>
        <p className="font-mono text-xs text-[#4B5563]">“Messages, 3 unread”</p>
        <div className="flex items-center gap-2">Invoice 1042 <Badge variant="destructive">Overdue</Badge></div>
        <p className="font-mono text-xs text-[#4B5563]">“Invoice 1042, Overdue”</p>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* INPUT                                                               */
/* ------------------------------------------------------------------ */

function InputDoLabel() {
  return (
    <DoDont label="Visible labels"
      doExample={<div className="w-full max-w-xs"><label htmlFor="inp-do-email" className={LABEL}>Work email</label><Input id="inp-do-email" type="email" placeholder="you@company.com" className="mt-1 h-11 text-base" /></div>}
      dontExample={<div className="w-full max-w-xs"><Input aria-label="Email" placeholder="Email" className="h-11 text-base" /><p className="mt-1 text-xs text-[#4B5563]">Placeholder-only: gone on first keystroke.</p></div>}
      doWhy="The label stays put while you type, and clicking it focuses the field."
      dontWhy="A placeholder vanishes the moment you type, so a half-finished form leaves you guessing what each field was." />
  );
}

function InputDoError() {
  return (
    <DoDont label="Error messages"
      doExample={<div className="w-full max-w-xs"><label htmlFor="inp-do-err" className={LABEL}>Card number</label><Input id="inp-do-err" aria-invalid defaultValue="4242 4242 4242" aria-describedby="inp-do-err-m" className="mt-1 h-11 text-base" /><p id="inp-do-err-m" className="mt-1 text-sm text-[#9F1239]">Card numbers have 16 digits. You entered 12.</p></div>}
      dontExample={<div className="w-full max-w-xs"><label htmlFor="inp-dont-err" className={LABEL}>Card number</label><Input id="inp-dont-err" defaultValue="4242 4242 4242" className="mt-1 h-11 border-[#dc2626] text-base" /><p className="mt-1 text-sm text-[#dc2626]">Invalid input</p></div>}
      doWhy="Says what is wrong and how to fix it, in words, linked to the field."
      dontWhy="“Invalid input” in light red tells nobody what to change, and it is only 3.8:1 on white." />
  );
}

function InputRedline() {
  return (
    <Stage label="Redline / text field" caption="Label 14px, 4px gap, 44px field, 12px side padding, 8px to helper text, 16px type so iOS does not zoom.">
      <div className="flex items-start gap-8 pt-2">
        <div className="w-64">
          <p className={LABEL}>Project name</p>
          <div className="mt-1 h-11 border border-[#4B5563] bg-white px-3 text-base leading-[42px] text-[#111827]">Spring menu</div>
          <p className="mt-2 text-sm text-[#4B5563]">Shown on your public page.</p>
        </div>
        <div className="flex gap-4 pt-6"><DimV height={44} label="44" /><DimH width={64} label="w 256" /></div>
      </div>
    </Stage>
  );
}

function InputAxFocusOrder() {
  return (
    <Stage label="Accessibility / focus order" caption="Tab order follows the visual order, one column, labels first. The submit button is last.">
      <form onSubmit={(e) => e.preventDefault()} className="relative grid w-full max-w-xs gap-4 pl-8">
        {['Full name', 'Email'].map((l, i) => (
          <div key={l} className="relative"><FocusMark n={i + 1} className="-left-7 top-8" /><label htmlFor={`inp-ax-${i}`} className={LABEL}>{l}</label><Input id={`inp-ax-${i}`} className="mt-1 h-11 text-base" /></div>
        ))}
        <div className="relative"><FocusMark n={3} className="-left-7 top-3" /><Button type="submit" className="h-11">Create account</Button></div>
      </form>
    </Stage>
  );
}

function InputAxSr() {
  return (
    <Stage label="Accessibility / label, hint and error together" caption="The announcement stitches the label, the hint (aria-describedby) and the error into one sentence.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inp-ax-sr" className={LABEL}>Phone <span className="text-[#4B5563]">(optional)</span></label>
          <Input id="inp-ax-sr" aria-invalid aria-describedby="inp-ax-sr-h inp-ax-sr-e" defaultValue="555" className="mt-1 h-11 text-base" />
          <p id="inp-ax-sr-h" className="mt-1 text-sm text-[#4B5563]">Used only for delivery texts.</p>
          <p id="inp-ax-sr-e" className="text-sm text-[#9F1239]">Enter 10 digits.</p>
        </div>
        <p className="self-center font-mono text-xs leading-5 text-[#4B5563]">“Phone, optional, edit text, invalid entry. Used only for delivery texts. Enter 10 digits.”</p>
      </div>
    </Stage>
  );
}

function InputWidthToAnswer() {
  return (
    <Stage label="Size the field to the answer" caption="Width is a hint. A short box says “a few characters”. A full-width box says “a paragraph”.">
      <div className="grid max-w-md gap-4">
        {[['ZIP code', 'w-24', '94107'], ['Expiry', 'w-20', '08/27'], ['Street address', 'w-full', '221 Baker Street']].map(([l, w, v], i) => (
          <div key={l}><label htmlFor={`inp-w-${i}`} className={LABEL}>{l}</label><Input id={`inp-w-${i}`} defaultValue={v} className={`mt-1 h-11 text-base ${w}`} /></div>
        ))}
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* CARD                                                                */
/* ------------------------------------------------------------------ */

const RADIUS = 'rounded-[0_12px_0_12px]';

function CardParts() {
  const parts: [string, string, string][] = [['1', 'Surface', 'Card #F3EFE9 on Sandstone #E8E2D5'], ['2', 'Art', 'Sits slightly above centre (400×408)'], ['3', 'Interaction', 'One action, one place'], ['4', 'Anchor', 'The title: what this is']];
  return (
    <Stage label="Card: the four parts, numbered" caption="Each number is a job. If a card has a fifth thing in it, move that thing somewhere else.">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,260px)_1fr]">
        <div className={`relative flex aspect-[400/408] flex-col overflow-hidden bg-[#F3EFE9] ring-1 ring-[#111827]/15 ${RADIUS}`}>
          <FocusMark n={1} className="left-2 top-2 z-10" />
          <div className="relative flex-1 overflow-hidden bg-[#E8E2D5]">
            <FocusMark n={2} className="left-2 top-10 z-10" />
            <EditorialPlate i={0} className="h-full w-full" />
          </div>
          <div className="relative p-4"><FocusMark n={4} className="right-2 top-2" /><p className="font-[family-name:var(--font-serif)] text-base font-medium text-[#111827]">Color is never alone</p><div className="relative mt-3 inline-block"><FocusMark n={3} className="-right-6 top-2" /><span className="text-sm font-medium text-[#A3285C] underline underline-offset-4">Read the essay</span></div></div>
        </div>
        <ol className="grid gap-3 text-sm text-[#111827]">{parts.map(([n, t, d]) => <li key={n} className="flex gap-3"><Tag tone="pink">{n}</Tag><span><strong>{t}.</strong> {d}</span></li>)}</ol>
      </div>
    </Stage>
  );
}

function CardDoNesting() {
  return (
    <DoDont label="Nesting cards"
      doExample={<Card className={`w-full max-w-[220px] ${RADIUS}`}><CardHeader><CardTitle>Q3 report</CardTitle><CardDescription>Updated today</CardDescription><div className="mt-2 flex items-center gap-2"><Badge variant="secondary">Final</Badge></div></CardHeader></Card>}
      dontExample={<Card className={`w-full max-w-[220px] p-2 ${RADIUS}`}><Card className="p-2"><Card className="p-2"><CardTitle>Q3 report</CardTitle><CardDescription>Updated today</CardDescription></Card></Card></Card>}
      doWhy="One surface, with spacing and type doing the grouping."
      dontWhy="Boxes inside boxes inside boxes: three borders, 24px of padding gone, and no hierarchy to show for it." />
  );
}

function CardDoRadius() {
  return (
    <DoDont label="Shape language"
      doExample={<div className="flex gap-3">{[0, 1].map((i) => <div key={i} className={`h-20 w-24 bg-[#F3EFE9] ring-1 ring-[#111827]/15 ${RADIUS}`} />)}</div>}
      dontExample={<div className="flex gap-3"><div className={`h-20 w-24 bg-[#F3EFE9] ring-1 ring-[#111827]/15 ${RADIUS}`} /><div className="h-20 w-24 rounded-3xl bg-gradient-to-br from-fuchsia-400 to-cyan-300 shadow-xl" /></div>}
      doWhy="Same corners everywhere. The grid reads as one family."
      dontWhy="A gradient pill beside an asymmetric card says two designers never met. Pick one shape and keep it." />
  );
}

function CardRedline() {
  return (
    <Stage label="Redline / card 400 x 408" caption="Scaled to 50%. 16px padding, 12px radius on top-right and bottom-left, 2% taller than wide.">
      <div className="flex items-end gap-4 pt-6 pl-8">
        <DimV height={204} label="408" />
        <div className="flex flex-col gap-1"><DimH width={200} label="400" />
          <div className={`flex h-[204px] w-[200px] flex-col justify-end bg-[#F3EFE9] p-4 ring-1 ring-[#111827]/10 ${RADIUS}`}><DimH width={168} label="p 16" /><p className="mt-2 text-sm font-medium text-[#111827]">Anchor title</p></div>
        </div>
      </div>
    </Stage>
  );
}

function CardAxKeyboard() {
  return (
    <Stage label="Accessibility / one stop per card" caption="The whole card is clickable, but only the title link takes focus. Tab moves card to card; a screen reader hears one link per card.">
      <div className="grid gap-4 sm:grid-cols-2">
        {['Gallery', 'Ledger'].map((t, i) => (
          <article key={t} className={`group relative bg-[#F3EFE9] p-4 ring-1 ring-[#111827]/10 focus-within:ring-2 focus-within:ring-[#A3285C] ${RADIUS}`}>
            <FocusMark n={i + 1} className="-top-2 -left-2" />
            <h3 className="text-base font-medium text-[#111827]"><a href="#room" onClick={(e) => e.preventDefault()} className="outline-none after:absolute after:inset-0 after:content-['']">{t} room</a></h3>
            <p className="mt-1 text-sm text-[#4B5563]">Quiet, light, lots of air.</p>
          </article>
        ))}
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* SELECT                                                              */
/* ------------------------------------------------------------------ */

function SelectNativeVsCustom() {
  const [mode, setMode] = useState<'native' | 'combo'>('native');
  return (
    <Stage label="Native select or combobox" controls={<Seg label="Control" value={mode} onChange={setMode} options={[{ id: 'native', label: 'Native' }, { id: 'combo', label: 'Combobox' }]} />}
      caption="Under about 15 options with no search need, use the native select. It is free, accessible, and the best on phones. Reach for a combobox when people must search.">
      <div className="min-h-[300px]">
        {mode === 'native' ? (
          <div className="w-full max-w-sm"><label htmlFor="sel-native" className={LABEL}>Country</label>
            <select id="sel-native" defaultValue="" className={`${FIELD} mt-1`}><option value="" disabled>Choose a country</option><option>Canada</option><option>Mexico</option><option>United States</option></select></div>
        ) : <Combo />}
      </div>
    </Stage>
  );
}

function SelectComboDemo() {
  return (
    <Stage label="Combobox: search, groups, empty state" caption="Try “zz” for the empty state, or use ArrowDown, Enter and Escape. Headings are groups, not options.">
      <div className="min-h-[340px]"><Combo /></div>
    </Stage>
  );
}

function SelectDoNative() {
  return (
    <DoDont label="Pick the right control"
      doExample={<div className="w-full max-w-[220px]"><label htmlFor="sel-do-n" className={LABEL}>Plan</label><select id="sel-do-n" className={`${FIELD} mt-1`}><option>Monthly</option><option>Yearly</option></select></div>}
      dontExample={<div className="w-full max-w-[220px]"><span className={LABEL}>Plan</span><div role="presentation" onClick={() => undefined} className="mt-1 flex h-9 cursor-pointer items-center justify-between border border-[#9ca3af] bg-white px-2 text-sm text-[#9ca3af]">Select… <span>▾</span></div></div>}
      doWhy="Two options: a native select (or radios) works with every keyboard, screen reader and phone."
      dontWhy="A div pretending to be a dropdown: no keyboard, no role, 36px tall, and 2.5:1 grey text." />
  );
}

function SelectDoEmpty() {
  return (
    <DoDont label="Empty results"
      doExample={<div className="w-full max-w-[240px] border border-[#4B5563] bg-white px-3 py-3 text-sm text-[#111827]">No room matches “zz”.<br /><span className="text-[#4B5563]">Clear the filter to see all 10.</span></div>}
      dontExample={<div className="h-20 w-full max-w-[240px] border border-[#4B5563] bg-white" aria-hidden />}
      doWhy="Say there are no matches and offer a way out."
      dontWhy="A blank box looks broken. Screen reader users hear nothing at all." />
  );
}

function SelectRedline() {
  return (
    <Stage label="Redline / select and options" caption="Trigger and options are 44px tall. Options have 12px side padding; group headings are 12px caps, 28px tall.">
      <div className="flex items-start gap-8 pt-2">
        <div className="flex gap-3"><DimV height={44} label="44" /><div className="pl-8 w-56 border border-[#4B5563] bg-white"><div className="flex h-[42px] items-center justify-between pr-3 text-base text-[#111827]">Gallery<span aria-hidden>▾</span></div></div></div>
        <div className="w-44 border border-[#4B5563] bg-white py-1"><span className="block h-7 px-3 text-xs font-semibold uppercase leading-7 tracking-wider text-[#4B5563]">Public</span><div className="flex h-11 items-center bg-[#E8E2D5] px-3 text-sm text-[#111827]">Gallery</div><div className="flex h-11 items-center px-3 text-sm text-[#111827]">Chapel</div></div>
      </div>
    </Stage>
  );
}

function SelectAxKeymap() {
  return (
    <Stage label="Accessibility / combobox keyboard map" caption="Focus stays in the input the whole time. The highlighted option is announced through aria-activedescendant.">
      <KeyMap rows={[['↓', 'Open the list, move to the next option'], ['↑', 'Move to the previous option'], ['Home / End', 'Jump to first or last option'], ['Enter', 'Choose the highlighted option and close'], ['Esc', 'Close the list, keep the typed text'], ['Type', 'Filter; the first match is highlighted']]} />
    </Stage>
  );
}

function SelectAxHitarea() {
  return (
    <Stage label="Accessibility / hit areas and announcements" caption="Every option is a 44px row. A screen reader hears the group name, the option, its position and whether it is selected.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="w-44 border border-[#4B5563] bg-white">{['Gallery', 'Chapel'].map((r) => <HitBox key={r} w={174} h={44}><span className="text-sm text-[#111827]">{r}</span></HitBox>)}</div>
        <p className="self-center font-mono text-xs leading-5 text-[#4B5563]">“Public, group. Chapel, 2 of 4, selected.”</p>
      </div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* SELECTION CONTROLS                                                  */
/* ------------------------------------------------------------------ */

function ScMatrix() {
  const [a, setA] = useState(true);
  const [r, setR] = useState('weekly');
  const [s, setS] = useState(true);
  return (
    <Stage label="Three controls, three jobs" caption="The question you ask decides the control, not the look you want.">
      <div className="grid gap-6 md:grid-cols-3">
        <fieldset><legend className={LABEL}>Checkbox: pick any</legend><Checkbox label="Receipts" checked={a} onChange={setA} /><Checkbox label="Product news" checked={false} onChange={() => undefined} /></fieldset>
        <fieldset><legend className={LABEL}>Radio: pick one</legend>
          {['daily', 'weekly'].map((v) => <label key={v} className="flex min-h-[44px] items-center gap-3 text-sm capitalize text-[#111827]"><input type="radio" name="sc-m" checked={r === v} onChange={() => setR(v)} className={`h-5 w-5 accent-[#A3285C] ${FOCUS}`} />{v} digest</label>)}</fieldset>
        <fieldset><legend className={LABEL}>Switch: apply now</legend><Switch label="Dark mode" on={s} onChange={setS} /></fieldset>
      </div>
    </Stage>
  );
}

function ScDoGroupType() {
  return (
    <DoDont label="Radio or checkbox"
      doExample={<fieldset className="w-full max-w-[220px]"><legend className={LABEL}>Delivery</legend>{['Pickup', 'Courier'].map((v, i) => <label key={v} className="flex min-h-[44px] items-center gap-3 text-sm text-[#111827]"><input type="radio" name="sc-do" defaultChecked={i === 0} className={`h-5 w-5 accent-[#A3285C] ${FOCUS}`} />{v}</label>)}</fieldset>}
      dontExample={<fieldset className="w-full max-w-[220px]"><legend className={LABEL}>Delivery</legend>{['Pickup', 'Courier'].map((v) => <label key={v} className="flex min-h-[44px] items-center gap-3 text-sm text-[#111827]"><input type="checkbox" className="h-5 w-5" />{v}</label>)}<p className="text-xs text-[#9F1239]">Both can be ticked. Which one ships?</p></fieldset>}
      doWhy="Exactly one answer, so radios. The group has a legend and the choice cannot be both."
      dontWhy="Checkboxes for a one-of-two question let people pick both or neither and push the error to the server." />
  );
}

function ScDoLabelHit() {
  return (
    <DoDont label="Labels and hit areas"
      doExample={<label className="flex min-h-[44px] w-full max-w-[240px] cursor-pointer items-center gap-3 text-sm text-[#111827]"><input type="checkbox" className={`h-5 w-5 accent-[#A3285C] ${FOCUS}`} />I agree to the terms of service</label>}
      dontExample={<div className="flex w-full max-w-[240px] items-center gap-1 text-sm text-[#111827]"><input type="checkbox" className="h-3 w-3" /><span>I agree to the terms of service</span></div>}
      doWhy="The whole row is the label, so the target is 240 x 44 and the text is announced with the box."
      dontWhy="A 12px box with a loose span: tiny to hit, and the label is not tied to the input." />
  );
}

function ScIndeterminate() {
  const [items, setItems] = useState([true, false, true]);
  const all = items.every(Boolean);
  const some = items.some(Boolean) && !all;
  return (
    <Stage label="Indeterminate parent" caption="The parent shows a dash when only some children are on. It is a display state: clicking sets all children.">
      <div className="max-w-xs">
        <Checkbox label="Notify me about" checked={all} indeterminate={some} onChange={(v) => setItems(items.map(() => v))} />
        <div className="ml-8">{['Replies', 'Mentions', 'Digest'].map((l, i) => <Checkbox key={l} label={l} checked={items[i]} onChange={(v) => setItems(items.map((x, j) => (j === i ? v : x)))} />)}</div>
        <p className="mt-2 text-xs tabular-nums text-[#4B5563]">{items.filter(Boolean).length} of 3 selected</p>
      </div>
    </Stage>
  );
}

function ScRedline() {
  return (
    <Stage label="Redline / controls" caption="Visible box 20px, label row 44px high. Switch track 44 x 24, thumb 20px with 2px inset.">
      <div className="flex flex-wrap items-start gap-10 pt-6">
        <div className="flex gap-2"><DimV height={44} label="44" /><div className="pl-8"><HitBox w={170} h={44}><Checkbox label="Receipts" checked onChange={() => undefined} /></HitBox></div></div>
        <div className="flex flex-col gap-1"><DimH width={44} label="44" /><div className="flex items-center gap-2"><DimV height={24} label="24" /><span className="relative ml-6 inline-block h-6 w-11 rounded-full bg-[#A3285C]"><span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" /></span></div></div>
      </div>
    </Stage>
  );
}

function ScAxKeymap() {
  return (
    <Stage label="Accessibility / keyboard map" caption="Radio groups are one tab stop; arrows move and select. Checkboxes and switches are each their own stop.">
      <KeyMap rows={[['Tab', 'Move to the control (radio group: to the checked radio)'], ['Space', 'Toggle a checkbox or switch; select a focused radio'], ['↑ ↓ ← →', 'Move within a radio group and select'], ['Enter', 'Submits the form. Does not toggle a checkbox']]} />
    </Stage>
  );
}

function ScAxSr() {
  const [on, setOn] = useState(true);
  return (
    <Stage label="Accessibility / state is words, not just position" caption="The switch announces its state because it has role=switch. The visible On/Off text backs it up for people who cannot judge a thumb position.">
      <div className="grid gap-4 sm:grid-cols-2"><div className="max-w-xs"><Switch label="Email receipts" on={on} onChange={setOn} /></div><p className="self-center font-mono text-xs text-[#4B5563]">“Email receipts, switch, {on ? 'on' : 'off'}.”</p></div>
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* TABS                                                                */
/* ------------------------------------------------------------------ */

function TabsCompare() {
  const [seg, setSeg] = useState('day');
  return (
    <Stage label="Tabs, segmented control, navigation" caption="Tabs swap panels on one page. A segmented control changes how the same data is shown. Navigation changes the URL.">
      <div className="grid gap-8">
        <div><p className="mb-1 text-xs font-mono uppercase tracking-wider text-[#4B5563]">Tabs: different content</p><AriaTabs tabs={ACCOUNT_TABS} label="Account demo" /></div>
        <div><p className="mb-2 text-xs font-mono uppercase tracking-wider text-[#4B5563]">Segmented: same content, different view</p><Seg label="Range" value={seg} onChange={setSeg} options={[{ id: 'day', label: 'Day' }, { id: 'week', label: 'Week' }, { id: 'month', label: 'Month' }]} /></div>
        <div><p className="mb-1 text-xs font-mono uppercase tracking-wider text-[#4B5563]">Navigation: different pages</p>
          <nav aria-label="Demo sections"><ul className="flex gap-1">{['Overview', 'Pricing', 'Docs'].map((l, i) => <li key={l}><a href="#nav" onClick={(e) => e.preventDefault()} aria-current={i === 0 ? 'page' : undefined} className={`inline-flex min-h-[44px] items-center px-3 text-sm ${i === 0 ? 'font-semibold underline decoration-[#A3285C] decoration-2 underline-offset-8' : 'text-[#4B5563]'} ${FOCUS}`}>{l}</a></li>)}</ul></nav></div>
      </div>
    </Stage>
  );
}

function TabsAriaDemo() {
  return (
    <Stage label="Working ARIA tabs" caption="Click a tab, or Tab into the list and use ← → Home End. Only the selected tab is in the tab order; the panel itself is focusable.">
      <AriaTabs tabs={ACCOUNT_TABS} />
    </Stage>
  );
}

function TabsDoLabels() {
  const Row = ({ labels }: { labels: string[] }) => <div className="flex border-b border-[#4B5563]">{labels.map((l, i) => <span key={l} className={`inline-flex min-h-[44px] items-center px-3 text-sm ${i === 0 ? '-mb-px border-b-2 border-[#A3285C] font-medium text-[#111827]' : 'text-[#4B5563]'}`}>{l}</span>)}</div>;
  return (
    <DoDont label="Tab labels"
      doExample={<div className="w-full"><Row labels={['Profile', 'Billing', 'Team']} /></div>}
      dontExample={<div className="w-full"><Row labels={['Click to see your profile settings', 'Billing & payment preferences', 'Team']} /></div>}
      doWhy="One word each, same part of speech, similar length. The row scans in a glance."
      dontWhy="Sentence-long tabs wrap, overflow and push the third tab off the screen." />
  );
}

function TabsDoOverflow() {
  const many = ['Overview', 'Activity', 'Members', 'Billing', 'Webhooks', 'Audit log', 'Danger zone'];
  return (
    <DoDont label="Too many tabs"
      doExample={<div className="w-full max-w-[280px]"><label htmlFor="tabs-sel" className={LABEL}>Section</label><select id="tabs-sel" className={`${FIELD} mt-1`}>{many.map((m) => <option key={m}>{m}</option>)}</select></div>}
      dontExample={<div className="flex w-full max-w-[280px] overflow-hidden border-b border-[#4B5563]">{many.map((m) => <span key={m} className="inline-flex h-8 shrink-0 items-center px-2 text-xs text-[#4B5563]">{m}</span>)}</div>}
      doWhy="Past five tabs on a phone, swap to a select or a list. Everything stays reachable."
      dontWhy="Cropped tabs hide Billing and Danger zone with no cue that they exist, and 32px rows miss the target size." />
  );
}

function TabsMobileOverflow() {
  const many = ['Overview', 'Activity', 'Members', 'Billing', 'Webhooks', 'Audit log'];
  return (
    <Stage label="Scrollable tabs: show the edge" caption="If you must scroll, clip a tab mid-word so the edge says “more”, and let the selected tab scroll into view.">
      <div className="relative w-full max-w-[300px] border border-dashed border-[#D44983] p-1">
        <div role="tablist" aria-label="Project sections" className="flex overflow-x-auto">
          {many.map((m, i) => <button key={m} role="tab" aria-selected={i === 0} tabIndex={i === 0 ? 0 : -1} className={`min-h-[44px] shrink-0 px-4 text-sm ${i === 0 ? 'border-b-2 border-[#A3285C] font-medium text-[#111827]' : 'text-[#4B5563]'} ${FOCUS}`}>{m}</button>)}
        </div>
        <span aria-hidden className="pointer-events-none absolute inset-y-1 right-1 w-8 bg-gradient-to-l from-[#FAF8F5] to-transparent" />
      </div>
    </Stage>
  );
}

function TabsRedline() {
  return (
    <Stage label="Redline / tab row" caption="44px tall, 16px side padding, 14px/500 label, 2px selected indicator that overlaps the 1px rule.">
      <div className="pt-6">
        <DimH width={92} label="w auto" />
        <div className="mt-1 flex border-b border-[#4B5563]">
          <div className="flex items-center gap-2"><DimV height={44} label="44" /></div>
          <span className="ml-8 inline-flex h-11 items-center border-b-2 border-[#A3285C] px-4 text-sm font-medium text-[#111827]">Profile</span>
          <span className="inline-flex h-11 items-center px-4 text-sm text-[#4B5563]">Billing</span>
        </div>
      </div>
    </Stage>
  );
}

function TabsAxKeymap() {
  return (
    <Stage label="Accessibility / tab keyboard map" caption="Roving tabindex: the row is a single Tab stop. Arrow keys change tabs; the panel follows automatically for cheap content.">
      <KeyMap rows={[['Tab', 'Enter the tab row (on the selected tab), then the panel'], ['→ / ←', 'Next or previous tab, wrapping at the ends'], ['Home / End', 'First or last tab'], ['Space / Enter', 'Activate a tab (only if you use manual activation)']]} />
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'button-do-one-primary': ButtonDoOnePrimary,
  'button-do-verb-label': ButtonDoVerbLabel,
  'button-do-link-vs-button': ButtonDoLinkVsButton,
  'button-redline-sizes': ButtonRedlineSizes,
  'button-redline-anatomy': ButtonRedlineAnatomy,
  'button-ax-hitarea': ButtonAxHitarea,
  'button-ax-focus-order': ButtonAxFocusOrder,
  'badge-do-text': BadgeDoText,
  'badge-do-max-two': BadgeDoMaxTwo,
  'badge-redline': BadgeRedline,
  'badge-ax-contrast': BadgeAxContrast,
  'badge-ax-sr': BadgeAxSr,
  'input-do-label': InputDoLabel,
  'input-do-error': InputDoError,
  'input-redline': InputRedline,
  'input-ax-focus-order': InputAxFocusOrder,
  'input-ax-sr': InputAxSr,
  'input-width-to-answer': InputWidthToAnswer,
  'card-parts': CardParts,
  'card-do-nesting': CardDoNesting,
  'card-do-radius': CardDoRadius,
  'card-redline': CardRedline,
  'card-ax-keyboard': CardAxKeyboard,
  'select-native-vs-custom': SelectNativeVsCustom,
  'select-combo': SelectComboDemo,
  'select-do-native': SelectDoNative,
  'select-do-empty': SelectDoEmpty,
  'select-redline': SelectRedline,
  'select-ax-keymap': SelectAxKeymap,
  'select-ax-hitarea': SelectAxHitarea,
  'sc-matrix': ScMatrix,
  'sc-do-group-type': ScDoGroupType,
  'sc-do-label-hit': ScDoLabelHit,
  'sc-indeterminate': ScIndeterminate,
  'sc-redline': ScRedline,
  'sc-ax-keymap': ScAxKeymap,
  'sc-ax-sr': ScAxSr,
  'tabs-compare': TabsCompare,
  'tabs-aria': TabsAriaDemo,
  'tabs-do-labels': TabsDoLabels,
  'tabs-do-overflow': TabsDoOverflow,
  'tabs-mobile-overflow': TabsMobileOverflow,
  'tabs-redline': TabsRedline,
  'tabs-ax-keymap': TabsAxKeymap,
};
