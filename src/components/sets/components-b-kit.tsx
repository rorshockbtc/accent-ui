'use client';

import React from 'react';

/** Small shared helpers for the components-b demo set. Light-canvas hex colours only. */
export const RING =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A3285C]';

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { kind?: 'primary' | 'ghost' | 'danger' };

export const Btn = React.forwardRef<HTMLButtonElement, BtnProps>(function Btn({ kind = 'primary', className = '', type = 'button', ...p }, ref) {
  const k = {
    primary: 'bg-[#111827] text-white hover:bg-[#1f2937]',
    ghost: 'bg-white text-[#111827] border border-[#111827]/40 hover:bg-[#F3EFE9]',
    danger: 'bg-[#9F1239] text-white hover:bg-[#881337]',
  }[kind];
  return (
    <button
      ref={ref}
      type={type}
      {...p}
      className={`inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-4 rounded-md text-sm font-medium disabled:opacity-50 ${k} ${RING} ${className}`}
    />
  );
});

export const serif = { fontFamily: 'var(--font-serif), Georgia, serif' } as const;
export const sans = { fontFamily: 'var(--font-sans), system-ui, sans-serif' } as const;
export const mono = { fontFamily: 'var(--font-mono), ui-monospace, monospace' } as const;

export function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-[#E8E2D5] bg-[#F3EFE9] ${className}`}>{children}</div>;
}

/** Simulated clock: returns [t, playing, toggle, seek]. Advances t by `rate` seconds per second. */
export function useSim(duration: number, rate = 1) {
  const [t, setT] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setT((v) => {
        const n = v + 0.25 * rate;
        if (n >= duration) {
          setPlaying(false);
          return duration;
        }
        return n;
      });
    }, 250);
    return () => window.clearInterval(id);
  }, [playing, rate, duration]);
  return {
    t,
    playing,
    toggle: () => setPlaying((p) => (t >= duration ? (setT(0), true) : !p)),
    seek: (v: number) => setT(Math.max(0, Math.min(duration, v))),
  };
}

export const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
