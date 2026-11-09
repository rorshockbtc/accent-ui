'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Moon, Sun, X, List, Palette, Terminal, Sparkles, Search, ArrowRight } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { BACKDROP_FADE, SHEET_SLIDE_UP, SPRING_LAYOUT } from '@/lib/motion/tokens';
import {
  BRAND_PROFILES,
  BRAND_PROFILE_LIST,
  getBrandThemeVars,
  type BrandProfileId,
} from '@/styles/themes';
import { ACCENT_PAGES, type AccentNavItem } from '@/content/accent/registry';
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

const TOP_NAV_LINKS = [
  { href: '/design-system', label: 'Overview', match: (p: string) => p === '/design-system' },
  {
    href: '/design-system/start/introduction',
    label: 'Docs',
    match: (p: string) =>
      p.startsWith('/design-system/start') ||
      p.startsWith('/design-system/essays') ||
      p.startsWith('/design-system/foundations') ||
      p.startsWith('/design-system/patterns') ||
      p.startsWith('/design-system/ai'),
  },
  {
    href: '/design-system/components',
    label: 'Components',
    match: (p: string) => p.startsWith('/design-system/components'),
  },
  {
    href: '/design-system/templates',
    label: 'Templates',
    match: (p: string) => p.startsWith('/design-system/templates'),
  },
  {
    href: '/design-system/themes',
    label: 'Themes',
    match: (p: string) => p.startsWith('/design-system/themes'),
  },
  {
    href: '/design-system/playground',
    label: 'Playground',
    match: (p: string) => p.startsWith('/design-system/playground'),
  },
];

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
      <div className="mb-5 pb-4 border-b border-[var(--a-rule)] space-y-1">
        <p className="px-3 mb-1.5 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-accent-text)]">
          Interactive Studios
        </p>
        {[
          { href: '/design-system', slug: '', label: 'System Overview' },
          { href: '/design-system/themes', slug: 'themes', label: 'Theme Studio (7 Brands)' },
          { href: '/design-system/components', slug: 'components', label: 'Component Gallery' },
          { href: '/design-system/templates', slug: 'templates', label: 'Ready-to-Ship Templates' },
          { href: '/design-system/playground', slug: 'playground', label: 'Live Code & Agent Playground' },
        ].map((studio) => {
          const active = current === studio.slug;
          return (
            <Link
              key={studio.href}
              href={studio.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={`relative flex min-h-[38px] items-center rounded-md px-3 text-sm t-color ${
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
              {studio.label}
            </Link>
          );
        })}
      </div>

      {nav.map((s) => (
        <div key={s.id} className="mt-6">
          <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--a-muted)]">
            {s.label} ({s.items.length})
          </p>
          <ul>
            {s.items.map((it) => {
              const active = current === it.slug;
              return (
                <li key={it.slug}>
                  <Link
                    href={`/design-system/${it.slug}`}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex min-h-[38px] items-center rounded-md px-3 text-sm leading-5 t-color ${
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
  const pathname = usePathname() || '/design-system';
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [brand, setBrand] = useState<BrandProfileId>('editorial-sandstone');
  const [sheet, setSheet] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');

  // Full-bleed studio routes (Themes & Playground) get wider canvas when needed
  const isFullWidthStudio =
    pathname === '/design-system/themes' || pathname === '/design-system/playground';

  useEffect(() => {
    const saved =
      window.localStorage.getItem('accent-theme') ||
      window.localStorage.getItem('pipes_theme_mode');
    if (saved === 'dark' || saved === 'light') setTheme(saved);
    const savedBrand = window.localStorage.getItem('accent-brand') as BrandProfileId | null;
    if (savedBrand && savedBrand in BRAND_PROFILES) {
      setBrand(savedBrand);
    }

    const onBrandChange = (e: Event) => {
      const custom = e as CustomEvent<BrandProfileId>;
      if (custom.detail && custom.detail in BRAND_PROFILES) {
        setBrand(custom.detail);
      }
    };
    window.addEventListener('accent-brand-change', onBrandChange);
    return () => window.removeEventListener('accent-brand-change', onBrandChange);
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
    window.localStorage.setItem('accent-brand', brand);
    document.documentElement.setAttribute('data-accent-brand', brand);
  }, [brand]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
        setSheet(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const brandVars = getBrandThemeVars(brand, theme);
  const activeProfile = BRAND_PROFILES[brand] || BRAND_PROFILES['editorial-sandstone'];

  const cycleBrand = () => {
    document.documentElement.classList.add('theme-fade');
    window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 220);
    const idx = BRAND_PROFILE_LIST.findIndex((p) => p.id === brand);
    const next = BRAND_PROFILE_LIST[(idx + 1) % BRAND_PROFILE_LIST.length];
    setBrand(next.id);
    window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: next.id }));
  };

  const selectDialect = (id: BrandProfileId) => {
    document.documentElement.classList.add('theme-fade');
    window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 220);
    setBrand(id);
    window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: id }));
    setCmdOpen(false);
  };

  const filteredPages = useMemo(() => {
    const q = cmdQuery.trim().toLowerCase();
    if (!q) return ACCENT_PAGES.slice(0, 12);
    return ACCENT_PAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.rules.some((r) => r.id.toLowerCase().includes(q) || r.statement.toLowerCase().includes(q))
    ).slice(0, 14);
  }, [cmdQuery]);

  return (
    <div
      data-accent-theme={theme}
      data-accent-brand={brand}
      style={brandVars as React.CSSProperties}
      className="accent-root w-full max-w-[100vw] overflow-x-clip min-h-screen bg-[var(--a-bg)] text-[var(--a-ink)]"
    >
      <a
        href="#accent-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--a-ink)] focus:text-[var(--a-bg)] focus:px-4 focus:py-2 focus:rounded-md"
      >
        Skip to content
      </a>

      {/* Sticky Top Header — Astryx-Class Studio Navigation + ⌘K Command Palette + 7-Brand Dialect Switcher */}
      <header className="sticky top-0 z-40 h-16 border-b border-[var(--a-rule)] bg-[var(--a-bg)]/95 backdrop-blur">
        <div className="mx-auto max-w-[1440px] h-full px-4 sm:px-6 flex items-center gap-2.5 sm:gap-4">
          <button
            type="button"
            onClick={() => setSheet(true)}
            aria-label="Open contents"
            aria-expanded={sheet}
            className="lg:hidden h-11 w-11 grid place-items-center rounded-md border border-[var(--a-rule)]"
          >
            <List className="h-5 w-5" aria-hidden />
          </button>

          <Link href="/design-system" className="min-h-[44px] inline-flex items-center shrink-0">
            <AccentMark />
          </Link>

          {/* Primary Studio Navigation Links (Overview, Docs, Components, Templates, Themes, Playground) */}
          <nav
            aria-label="Accént primary navigation"
            className="hidden md:flex items-center gap-1 ml-1"
          >
            {TOP_NAV_LINKS.map((link) => {
              const active = link.match(pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex min-h-[38px] items-center px-3 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? 'bg-[var(--a-surface)] text-[var(--a-ink)] font-semibold border border-[var(--a-rule)]'
                      : 'text-[var(--a-muted)] hover:text-[var(--a-ink)] hover:bg-[var(--a-surface)]/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            {/* Global ⌘K Command Palette Trigger */}
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              aria-label="Open Accént command palette (Command+K)"
              className="inline-flex min-h-[40px] shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)]/80 px-3 text-xs font-mono text-[var(--a-muted)] hover:border-[var(--a-ink)] hover:text-[var(--a-ink)] transition-colors cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-[var(--a-accent)] shrink-0" />
              <span className="hidden 2xl:inline">Search 57 specs...</span>
              <span className="2xl:hidden">Search</span>
              <kbd className="hidden sm:inline-block rounded border border-[var(--a-rule)] bg-[var(--a-bg)] px-1.5 py-0.5 text-xs font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Multi-Brand Theme Preset Switcher (Cycles all 7 Sovereign Dialects) */}
            <button
              type="button"
              onClick={cycleBrand}
              title={`Active Dialect: ${activeProfile.name}. Click to cycle all 7 sovereign brand dialects.`}
              aria-label={`Switch brand theme preset (current: ${activeProfile.name})`}
              className="inline-flex min-h-[40px] shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 text-xs font-mono t-press t-color hover:border-[var(--a-ink)] active:scale-[0.98] cursor-pointer"
            >
              <Palette className="h-3.5 w-3.5 text-[var(--a-accent)] shrink-0" aria-hidden="true" />
              <span className="font-bold text-[var(--a-accent)]">{activeProfile.mark}</span>
              <span className="hidden sm:inline font-semibold text-[var(--a-ink)] max-w-[120px] truncate">
                {activeProfile.name.split('(')[0].trim()}
              </span>
            </button>

            {/* Agent-Ready Machine Endpoints */}
            <Link
              href={`/design-system/styles.md?brand=${brand}`}
              className="hidden xl:inline-flex min-h-[40px] shrink-0 items-center gap-1 whitespace-nowrap rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)]/60 px-2.5 text-xs font-mono hover:border-[var(--a-accent)] transition-colors"
              title="Download or curl machine-readable STYLES.md contract for this dialect"
            >
              <Sparkles className="h-3 w-3 text-[var(--a-accent)] shrink-0" />
              <span>STYLES.md</span>
            </Link>

            <Link
              href="/design-system/rules.json"
              className="hidden lg:inline-flex min-h-[40px] shrink-0 items-center gap-1 whitespace-nowrap rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)]/60 px-2.5 text-xs font-mono hover:border-[var(--a-accent)] transition-colors"
              title="Machine-readable rules.json endpoint for AI coding agents"
            >
              <Terminal className="h-3 w-3 text-[var(--a-accent)] shrink-0" />
              <span>rules.json</span>
            </Link>

            <Link
              href="/"
              className="hidden sm:inline-flex min-h-[40px] shrink-0 items-center whitespace-nowrap px-2 text-xs font-mono uppercase tracking-wider text-[var(--a-muted)] hover:text-[var(--a-ink)]"
            >
              pipes.pink ↗
            </Link>

            <button
              type="button"
              onClick={() => {
                document.documentElement.classList.add('theme-fade');
                window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 220);
                setTheme(theme === 'light' ? 'dark' : 'light');
              }}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className="h-11 w-11 grid place-items-center rounded-md border border-[var(--a-rule)] t-press t-color active:scale-[0.97] cursor-pointer"
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
                    <Moon className="h-4 w-4" aria-hidden />
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
                    <Sun className="h-4 w-4" aria-hidden />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {isFullWidthStudio ? (
        <div id="accent-main" className="mx-auto max-w-[1440px] px-4 sm:px-6 min-w-0">
          {children}
        </div>
      ) : (
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:grid lg:grid-cols-[256px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto py-8 pr-2">
            <SidebarNav nav={nav} layoutScope="desktop" />
          </aside>
          <div id="accent-main" className="min-w-0">
            {children}
          </div>
        </div>
      )}

      {/* Global ⌘K Command Palette Modal */}
      <AnimatePresence>
        {cmdOpen && (
          <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Accént Command Palette"
          >
            <m.button
              type="button"
              aria-label="Close command palette"
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setCmdOpen(false)}
              variants={BACKDROP_FADE}
              initial="initial"
              animate="animate"
              exit="exit"
            />
            <m.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 w-full max-w-2xl rounded-lg border-2 border-[var(--a-ink)] bg-[var(--a-bg)] text-[var(--a-ink)] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 h-14 border-b border-[var(--a-rule)] bg-[var(--a-surface)]">
                <Search className="h-4 w-4 text-[var(--a-accent)] shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={cmdQuery}
                  onChange={(e) => setCmdQuery(e.target.value)}
                  placeholder="Jump to any of 57 specs, 4 studios, 7 brand dialects, or 223 rules..."
                  aria-label="Search Accént specifications, studios, and brand dialects"
                  className="w-full bg-transparent text-sm font-sans focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setCmdOpen(false)}
                  className="px-2 py-1 rounded border border-[var(--a-rule)] font-mono text-xs text-[var(--a-muted)] hover:text-[var(--a-ink)] cursor-pointer"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-[68vh] overflow-y-auto divide-y divide-[var(--a-rule)]">
                {/* Quick Switch: 7 Brand Dialects */}
                <div className="p-3 bg-[var(--a-surface)]/40">
                  <div className="px-2 mb-2 text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--a-muted)]">
                    Switch Active Brand Dialect (7 Voices)
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {BRAND_PROFILE_LIST.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => selectDialect(b.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono cursor-pointer transition-colors ${
                          b.id === brand
                            ? 'bg-[var(--a-accent-fill,var(--a-accent))] text-white font-bold'
                            : 'border border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-ink)] hover:border-[var(--a-accent)]'
                        }`}
                      >
                        <span>{b.mark}</span>
                        <span>{b.name.split('(')[0].trim()}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Matching Specification Pages */}
                <div className="p-2">
                  <div className="px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-[0.14em] text-[var(--a-muted)]">
                    Specification Pages ({filteredPages.length})
                  </div>
                  <ul>
                    {filteredPages.map((p) => (
                      <li key={p.slug}>
                        <button
                          type="button"
                          onClick={() => {
                            setCmdOpen(false);
                            router.push(`/design-system/${p.slug}`);
                          }}
                          className="w-full px-3 py-2.5 rounded-md flex items-center justify-between gap-4 text-left hover:bg-[var(--a-surface)] transition-colors cursor-pointer group"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[var(--a-ink)] group-hover:text-[var(--a-accent)] truncate">
                              {p.title}
                            </div>
                            <div className="text-xs text-[var(--a-muted)] truncate">{p.summary}</div>
                          </div>
                          <div className="shrink-0 flex items-center gap-2 font-mono text-xs text-[var(--a-muted)]">
                            <span>{p.rules.length} rules</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Sheet */}
      <AnimatePresence>
        {sheet && (
          <div
            className="lg:hidden fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Contents"
          >
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
                <button
                  type="button"
                  onClick={() => setSheet(false)}
                  aria-label="Close contents"
                  className="h-11 w-11 grid place-items-center rounded-md border border-[var(--a-rule)] t-press active:scale-[0.97]"
                >
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
