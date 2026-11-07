'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, X, List } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { BACKDROP_FADE, SHEET_SLIDE_UP, SPRING_LAYOUT } from '@/lib/motion/tokens';
import type { AccentNavItem } from '@/content/accent/registry';
import type { AccentSectionId } from '@/content/accent/types';

type Nav = { id: AccentSectionId; label: string; items: AccentNavItem[] }[];

export function AccentMark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <svg viewBox="0 0 24 32" width="18" height="24" aria-hidden className="self-center">
        <path d="M9 30 L17 2 L23 2 L13 30 Z" fill="var(--a-accent)" />
      </svg>
      <span className="font-serif text-xl font-semibold tracking-tight">Accént</span>
    </span>
  );
}

function SidebarNav({
  nav,
  onNavigate,
  layoutScope = 'desktop',
}: {
  nav: Nav;
  onNavigate?: () => void;
  layoutScope?: string;
}) {
  const pathname = usePathname() || '';
  const current = pathname.replace(/^\/design-system\/?/, '');
  return (
    <nav aria-label="Accént documentation">
      <Link
        href="/design-system"
        onClick={onNavigate}
        aria-current={current === '' ? 'page' : undefined}
        className={`relative flex min-h-[40px] items-center rounded-md px-3 text-sm t-color ${current === '' ? 'bg-[var(--a-rule)] font-semibold' : 'hover:bg-[var(--a-rule)]'}`}
      >
        {current === '' && (
          <m.span
            layoutId={`accent-sidebar-active-${layoutScope}`}
            transition={SPRING_LAYOUT}
            className="absolute inset-y-1.5 left-0 w-0.5 bg-[var(--a-accent)]"
          />
        )}
        Home
      </Link>
      {nav.map((s) => (
        <div key={s.id} className="mt-6">
          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--a-muted)]">{s.label}</p>
          <ul>
            {s.items.map((it) => {
              const active = current === it.slug;
              return (
                <li key={it.slug}>
                  <Link
                    href={`/design-system/${it.slug}`}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex min-h-[40px] items-center rounded-md px-3 text-sm leading-5 t-color ${
                      active ? 'bg-[var(--a-rule)] font-semibold' : 'hover:bg-[var(--a-rule)]'
                    }`}
                  >
                    {active && (
                      <m.span
                        layoutId={`accent-sidebar-active-${layoutScope}`}
                        transition={SPRING_LAYOUT}
                        className="absolute inset-y-1.5 left-0 w-0.5 bg-[var(--a-accent)]"
                      />
                    )}
                    {it.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function AccentShell({ nav, children }: { nav: Nav; children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('accent-theme') || window.localStorage.getItem('pipes_theme_mode');
    if (saved === 'dark' || saved === 'light') setTheme(saved);
  }, []);
  useEffect(() => {
    window.localStorage.setItem('accent-theme', theme);
    window.localStorage.setItem('pipes_theme_mode', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-accent-theme', theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sheet]);

  return (
    <div data-accent-theme={theme} className="accent-root w-full max-w-[100vw] overflow-x-clip min-h-screen bg-[var(--a-bg)] text-[var(--a-ink)]">
      <a href="#accent-main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--a-ink)] focus:text-[var(--a-bg)] focus:px-4 focus:py-2 focus:rounded-md">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 h-16 border-b border-[var(--a-rule)] bg-[var(--a-bg)]/95 backdrop-blur">
        <div className="mx-auto max-w-[1440px] h-full px-4 sm:px-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setSheet(true)}
            aria-label="Open contents"
            aria-expanded={sheet}
            className="lg:hidden h-11 w-11 grid place-items-center rounded-md border border-[var(--a-rule)]"
          >
            <List className="h-5 w-5" aria-hidden />
          </button>
          <Link href="/design-system" className="min-h-[44px] inline-flex items-center"><AccentMark /></Link>
          <span className="hidden md:inline text-sm text-[var(--a-muted)]">The Pipes Design System</span>
          <div className="ml-auto flex items-center gap-2">
            <Link href="/design-system/rules.json" className="hidden sm:inline-flex min-h-[44px] items-center px-3 text-sm font-mono hover:underline">rules.json</Link>
            <Link href="/" className="hidden sm:inline-flex min-h-[44px] items-center px-3 text-sm hover:underline">pipes.pink</Link>
            <button
              type="button"
              onClick={() => {
                document.documentElement.classList.add('theme-fade');
                window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 220);
                setTheme(theme === 'light' ? 'dark' : 'light');
              }}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className="h-11 w-11 grid place-items-center rounded-md border border-[var(--a-rule)] t-press t-color active:scale-[0.97]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                  <m.span
                    key="moon"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.12 }}
                    className="grid place-items-center"
                  >
                    <Moon className="h-5 w-5" aria-hidden />
                  </m.span>
                ) : (
                  <m.span
                    key="sun"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.12 }}
                    className="grid place-items-center"
                  >
                    <Sun className="h-5 w-5" aria-hidden />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:grid lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-8 pr-2">
          <SidebarNav nav={nav} layoutScope="desktop" />
        </aside>
        <div id="accent-main" className="min-w-0">{children}</div>
      </div>

      <AnimatePresence>
        {sheet && (
          <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Contents">
            <m.button
              type="button"
              aria-label="Close contents"
              className="absolute inset-0 bg-black/40"
              onClick={() => setSheet(false)}
              variants={BACKDROP_FADE}
              initial="initial"
              animate="animate"
              exit="exit"
            />
            <m.div
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-[var(--a-bg)] text-[var(--a-ink)] p-4 pb-8 border-t border-[var(--a-rule)]"
              variants={SHEET_SLIDE_UP}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex items-center justify-between mb-2">
                <AccentMark />
                <button type="button" onClick={() => setSheet(false)} aria-label="Close contents" className="h-11 w-11 grid place-items-center rounded-md border border-[var(--a-rule)] t-press active:scale-[0.97]">
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>
              <SidebarNav nav={nav} layoutScope="mobile" onNavigate={() => setSheet(false)} />
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
