'use client';

import React from 'react';
import { Stage, Seg, DoDont, DimH, DimV } from '../primitives';
import { Btn, serif, RING } from './components-b-kit';

const DATA = [
  { k: 'Mar', v: 1200 },
  { k: 'Apr', v: 1760 },
  { k: 'May', v: 2450 },
  { k: 'Jun', v: 2310 },
];
const MAX = 2450;
const nf = (n: number) => n.toLocaleString('en-US');
const NUM = 'tabular-nums [font-variant-numeric:lining-nums_tabular-nums]';

function Bars({ zero = true, hi = 'May' }: { zero?: boolean; hi?: string }) {
  const base = zero ? 0 : 1100;
  return (
    <figure className="w-full max-w-sm">
      <figcaption className="text-base font-semibold mb-2">Visits doubled after the redesign</figcaption>
      <div role="img" aria-label="Bar chart: weekly visits Mar 1,200, Apr 1,760, May 2,450, Jun 2,310" className="flex items-end gap-2 h-40 border-b border-[#111827]/60">
        {DATA.map((d) => (
          <div key={d.k} className="flex-1 flex flex-col justify-end h-full">
            <span className={`text-sm font-medium text-center ${NUM}`}>{nf(d.v)}</span>
            <div style={{ height: `${((d.v - base) / (MAX - base)) * 85}%`, background: d.k === hi ? '#A3285C' : '#9CA3AF' }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 text-sm text-[#4B5563]">
        {DATA.map((d) => (
          <span key={d.k} className="flex-1 text-center">{d.k}</span>
        ))}
      </div>
    </figure>
  );
}

function BarsDemo() {
  return (
    <Stage label="Bar chart" caption="Zero baseline, values on the bars, one highlighted series in the accent, the rest grey.">
      <div className="grid place-items-center">
        <Bars />
      </div>
    </Stage>
  );
}

function KpiSpark() {
  const pts = DATA.map((d, i) => `${i * 40},${40 - (d.v / MAX) * 36}`).join(' ');
  return (
    <Stage label="KPI with sparkline" caption="A single figure gets a big number, a delta in words and a sparkline for shape. Exact values live in the table.">
      <div className="inline-block bg-white border border-[#E8E2D5] rounded-lg p-5">
        <p className="text-sm text-[#4B5563]">Weekly visits</p>
        <p className={`text-5xl ${NUM}`} style={serif}>2,450</p>
        <p className="mt-1 text-sm text-[#166534] font-medium">▲ 104% since March</p>
        <svg role="img" aria-label="Sparkline: 1,200 rising to 2,450" width="120" height="44" viewBox="0 0 120 44" className="mt-2">
          <polyline points={pts} fill="none" stroke="#111827" strokeWidth="2" />
          <circle cx="80" cy={40 - 36} r="3.5" fill="#A3285C" />
        </svg>
      </div>
    </Stage>
  );
}

function Strip() {
  const parts = [
    { k: 'Rent', v: 48, c: '#111827', t: '#fff' },
    { k: 'Food', v: 27, c: '#A3285C', t: '#fff' },
    { k: 'Travel', v: 15, c: '#9CA3AF', t: '#111827' },
    { k: 'Other', v: 10, c: '#E8E2D5', t: '#111827' },
  ];
  return (
    <Stage label="Proportion strip" caption="Parts of a whole as a single bar, labelled inside. Reads faster than a pie and survives greyscale.">
      <div role="img" aria-label="Spending: Rent 48 percent, Food 27, Travel 15, Other 10" className="flex h-12 rounded overflow-hidden">
        {parts.map((p) => (
          <div key={p.k} style={{ width: `${p.v}%`, background: p.c, color: p.t }} className={`grid place-items-center text-sm font-medium ${NUM}`}>
            {p.k} {p.v}%
          </div>
        ))}
      </div>
    </Stage>
  );
}

function TableToggle() {
  const [v, setV] = React.useState<'chart' | 'table'>('chart');
  return (
    <Stage
      label="Chart or table"
      controls={<Seg label="View" value={v} onChange={setV} options={[{ id: 'chart', label: 'Chart' }, { id: 'table', label: 'Data table' }]} />}
      caption="Every chart has a table twin. It is the screen reader version and the answer for people who want exact numbers."
    >
      {v === 'chart' ? (
        <div className="grid place-items-center"><Bars /></div>
      ) : (
        <table className="w-full max-w-sm mx-auto text-sm">
          <caption className="text-left font-semibold pb-2">Weekly visits by month</caption>
          <thead><tr className="border-b border-[#111827]/40"><th scope="col" className="text-left py-2">Month</th><th scope="col" className="text-right">Visits</th></tr></thead>
          <tbody>
            {DATA.map((d) => (
              <tr key={d.k} className="border-b border-[#E8E2D5]"><th scope="row" className="text-left font-normal py-2">{d.k}</th><td className={`text-right ${NUM}`}>{nf(d.v)}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </Stage>
  );
}

function Lines({ legend }: { legend: boolean }) {
  const a = '0,60 60,50 120,30 180,20';
  const b = '0,70 60,66 120,62 180,64';
  return (
    <div className="w-full max-w-xs">
      <svg viewBox="0 0 260 90" role="img" aria-label="Line chart: Members rise, Guests flat" className="w-full">
        <polyline points={a} fill="none" stroke="#A3285C" strokeWidth="2" />
        <polyline points={b} fill="none" stroke="#6B7280" strokeWidth="2" strokeDasharray="5 3" />
        {!legend && (
          <>
            <text x="186" y="22" fontSize="13" fontWeight="500" fill="#A3285C">Members</text>
            <text x="186" y="68" fontSize="13" fontWeight="500" fill="#4B5563">Guests</text>
          </>
        )}
      </svg>
      {legend && (
        <div className="flex gap-4 text-sm"><span><i className="inline-block h-3 w-3 bg-[#d6a1b8] mr-1" />A</span><span><i className="inline-block h-3 w-3 bg-[#e0a3c2] mr-1" />B</span></div>
      )}
    </div>
  );
}

function DoDirect() {
  return (
    <DoDont
      label="Direct labels"
      doExample={<Lines legend={false} />}
      doWhy="Each line is named at its end and differs by dash pattern as well as colour, so nobody has to match swatches."
      dontExample={
        <div className="w-full max-w-xs">
          <svg viewBox="0 0 260 90" role="img" aria-label="Two similar pink lines" className="w-full">
            <polyline points="0,60 60,50 120,30 180,20" fill="none" stroke="#d6a1b8" strokeWidth="2" />
            <polyline points="0,70 60,66 120,62 180,64" fill="none" stroke="#e0a3c2" strokeWidth="2" />
          </svg>
          <div className="flex gap-4 text-sm"><span><i className="inline-block h-3 w-3 bg-[#d6a1b8] mr-1" />A</span><span><i className="inline-block h-3 w-3 bg-[#e0a3c2] mr-1" />B</span></div>
        </div>
      }
      dontWhy="Two near-identical pinks, a legend with anonymous names, and no pattern: the reader must guess which is which."
    />
  );
}

function DoZero() {
  return (
    <DoDont
      label="Axis baseline"
      doExample={<Bars />}
      doWhy="Bars start at zero, so bar length is the real ratio between values."
      dontExample={<Bars zero={false} />}
      dontWhy="Starting at 1,100 makes May look about thirteen times taller than March, when it is only double. Truncation exaggerates."
    />
  );
}

function Redline() {
  return (
    <Stage label="Redline: bar chart" caption="16px padding, 8px between bars, square corners, 1px axis, 13px minimum labels.">
      <div className="inline-block bg-white border border-[#E8E2D5] p-4 relative">
        <div className="mb-5"><DimH width={296} label="16px padding · 8px bar gap" /></div>
        <div className="flex items-end gap-2 h-32 w-[296px] border-b border-[#111827]">
          {[40, 62, 100, 94].map((h, i) => (
            <div key={i} className="flex-1" style={{ height: `${h}%`, background: i === 2 ? '#A3285C' : '#9CA3AF' }} />
          ))}
        </div>
        <div className="absolute right-[-30px] top-[56px] hidden sm:block"><DimV height={128} label="16:9" /></div>
      </div>
    </Stage>
  );
}

const SETS = [
  { n: 'Ink, pink, grey', c: ['#111827', '#A3285C', '#9CA3AF'], s: ['circle', 'square', 'triangle'] },
  { n: 'Okabe-Ito', c: ['#0072B2', '#E69F00', '#009E73'], s: ['circle', 'square', 'triangle'] },
  { n: 'Viridis 3', c: ['#440154', '#21908C', '#FDE725'], s: ['circle', 'square', 'triangle'] },
];

function Mark({ s, c }: { s: string; c: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      {s === 'circle' && <circle cx="9" cy="9" r="7" fill={c} />}
      {s === 'square' && <rect x="2" y="2" width="14" height="14" fill={c} />}
      {s === 'triangle' && <polygon points="9,2 16,16 2,16" fill={c} />}
    </svg>
  );
}

function Palettes() {
  const [grey, setGrey] = React.useState(false);
  return (
    <Stage label="Colour-blind-safe palettes" controls={<Btn kind="ghost" className="!min-h-[32px] text-xs" aria-pressed={grey} onClick={() => setGrey(!grey)}>Greyscale: {grey ? 'on' : 'off'}</Btn>} caption="Pair every colour with a shape and a name. If the greyscale view still reads, colour-blind readers are fine.">
      <div className="grid gap-3 sm:grid-cols-3" style={{ filter: grey ? 'grayscale(1)' : 'none' }}>
        {SETS.map((p) => (
          <div key={p.n} className="bg-white border border-[#E8E2D5] rounded p-3">
            <p className="text-sm font-semibold mb-2">{p.n}</p>
            <ul className="space-y-1 text-sm">
              {p.c.map((c, i) => (
                <li key={c} className="flex items-center gap-2 min-h-[28px]"><Mark s={p.s[i]} c={c} /> Series {i + 1} <span className="font-mono text-xs text-[#4B5563]">{c}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Stage>
  );
}

export const DEMOS: Record<string, React.ComponentType> = {
  'chart-bars': BarsDemo,
  'chart-kpi-spark': KpiSpark,
  'chart-strip': Strip,
  'chart-table-toggle': TableToggle,
  'chart-do-direct-labels': DoDirect,
  'chart-do-zero-axis': DoZero,
  'chart-redline-bars': Redline,
  'chart-ax-palettes': Palettes,
};
void RING;
