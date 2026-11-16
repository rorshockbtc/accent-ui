'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Moon,
  Sun,
  X,
  List,
  Search,
  ArrowRight,
  ChevronDown,
  Check,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { AnimatePresence, m, useScroll, useSpring } from 'framer-motion';
import { create, insertMultiple, search, type AnyOrama } from '@orama/orama';
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

function normalizeAccentPath(pathname: string): string {
  const stripped = (pathname || '/').replace(/^\/design-system/, '');
  return stripped === '' ? '/' : stripped;
}

const BRAND_SHORT_NAMES: Record<BrandProfileId, string> = {
  'editorial-sandstone': 'Sandstone',
  'playful-principal': 'Playful :-]',
  'albers-perspectives': 'Perspectives',
  'cassandra-noir': 'Noir',
  'hacienda-emerald': 'Hacienda',
  'terracotta-civic': 'Civic',
  'greater-terminal': 'Terminal',
};

const TOP_NAV_LINKS = [
  { href: '/design-system', label: 'Overview', match: (p: string) => p === '/' },
  {
    href: '/design-system/templates',
    label: 'Templates',
    match: (p: string) => p.startsWith('/templates'),
  },
  {
    href: '/design-system/themes',
    label: 'Themes',
    match: (p: string) => p.startsWith('/themes'),
  },
  {
    href: '/design-system/playground',
    label: 'Playground',
    match: (p: string) => p.startsWith('/playground'),
  },
  {
    href: '/design-system/components',
    label: 'Components',
    match: (p: string) => p.startsWith('/components'),
  },
  {
    href: '/design-system/start/introduction',
    label: 'Docs',
    match: (p: string) =>
      p !== '/' &&
      !p.startsWith('/templates') &&
      !p.startsWith('/themes') &&
      !p.startsWith('/playground') &&
      !p.startsWith('/components'),
  },
];

const REFERENCE_HUBS = [
  { href: '/design-system/patterns', slug: 'patterns', label: 'Human–AI Patterns (01–06)' },
  { href: '/design-system/philosophy', slug: 'philosophy', label: 'Design Philosophy' },
  { href: '/design-system/insights', slug: 'insights', label: 'Color & Contrast Matrix' },
  { href: '/design-system/mcp', slug: 'mcp', label: 'MCP & Agent Server' },
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
  const clean = normalizeAccentPath(pathname);
  const current = clean.replace(/^\//, '');

  return (
    <nav aria-label="Accént documentation">
      {layoutScope === 'mobile' && (
        <div className="mb-5 pb-4 border-b border-[var(--a-rule)] space-y-1">
          <p className="px-3 mb-1.5 text-[13px] font-mono font-semibold uppercase tracking-[0.12em] text-[var(--a-accent-text)]">
            Main Destinations
          </p>
          {TOP_NAV_LINKS.map((item) => {
            const active = item.match(clean);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={`relative flex min-h-[44px] items-center rounded-md px-3 text-sm t-color ${
                  active ? 'bg-[var(--a-rule)] font-semibold' : 'hover:bg-[var(--a-rule)]'
                }`}
              >
                {active && (
                  <m.span
                    layoutId={`accent-sidebar-active-${layoutScope}`}
                    transition={SPRING_LAYOUT}
                    className="absolute inset-y-2 left-0 w-0.5 bg-[var(--a-accent)]"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      <div className="mb-5 pb-4 border-b border-[var(--a-rule)] space-y-1">
        <p className="px-3 mb-1.5 text-[13px] font-mono font-semibold uppercase tracking-[0.12em] text-[var(--a-accent-text)]">
          Reference Hubs
        </p>
        {REFERENCE_HUBS.map((hub) => {
          const active = current === hub.slug;
          return (
            <Link
              key={hub.href}
              href={hub.href}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={`relative flex min-h-[44px] items-center rounded-md px-3 text-sm t-color ${
                active ? 'bg-[var(--a-rule)] font-semibold' : 'hover:bg-[var(--a-rule)]'
              }`}
            >
              {active && (
                <m.span
                  layoutId={`accent-sidebar-active-${layoutScope}`}
                  transition={SPRING_LAYOUT}
                  className="absolute inset-y-2 left-0 w-0.5 bg-[var(--a-accent)]"
                />
              )}
              {hub.label}
            </Link>
          );
        })}
      </div>

      {nav.map((s) => (
        <div key={s.id} className="mt-6">
          <p className="px-3 mb-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--a-muted)]">
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
                    className={`relative flex min-h-[40px] items-center rounded-md px-3 text-sm leading-5 t-color ${
                      active ? 'bg-[var(--a-rule)] font-semibold' : 'hover:bg-[var(--a-rule)]'
                    }`}
                  >
                    {active && (
                      <m.span
                        layoutId={`accent-sidebar-active-${layoutScope}`}
                        transition={SPRING_LAYOUT}
                        className="absolute inset-y-2 left-0 w-0.5 bg-[var(--a-accent)]"
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
  const cleanPath = normalizeAccentPath(pathname);
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [brand, setBrand] = useState<BrandProfileId>('editorial-sandstone');
  const [sheet, setSheet] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [oramaDb, setOramaDb] = useState<AnyOrama | null>(null);
  const [oramaSlugs, setOramaSlugs] = useState<string[] | null>(null);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);

  const isFullWidthStudio =
    cleanPath === '/templates' || cleanPath === '/themes' || cleanPath === '/playground';
  const isImmersive = cleanPath.startsWith('/templates/compare');
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });

  useEffect(() => {
    let active = true;
    const initOrama = async () => {
      const db = create({
        schema: {
          slug: 'string',
          title: 'string',
          summary: 'string',
          subPatterns: 'string',
          rulesText: 'string',
        },
      });
      await Promise.resolve(
        insertMultiple(
          db,
          ACCENT_PAGES.map((p) => ({
            slug: p.slug,
            title: p.title,
            summary: p.summary,
            subPatterns: (p.subPatterns ?? []).join(' '),
            rulesText: p.rules.map((r) => `${r.id} ${r.statement}`).join(' '),
          }))
        )
      );
      if (active) setOramaDb(db);
    };
    void initOrama();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const q = cmdQuery.trim();
    if (!q || !oramaDb) {
      setOramaSlugs(null);
      return;
    }
    const runSearch = async () => {
      const res = await Promise.resolve(search(oramaDb, { term: q, limit: 16 }));
      if (!cancelled) {
        setOramaSlugs(
          res.hits
            .map((h) => (h.document as { slug?: string })?.slug)
            .filter((s): s is string => Boolean(s))
        );
      }
    };
    void runSearch();
    return () => {
      cancelled = true;
    };
  }, [cmdQuery, oramaDb]);

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
        setThemeMenuOpen(false);
      } else if (e.key === 'Escape') {
        setCmdOpen(false);
        setSheet(false);
        setThemeMenuOpen(false);
      }
    };
    const onPointerDown = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  const brandVars = getBrandThemeVars(brand, theme);
  const activeProfile = BRAND_PROFILES[brand] || BRAND_PROFILES['editorial-sandstone'];

  const selectDialect = (id: BrandProfileId) => {
    document.documentElement.classList.add('theme-fade');
    window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 220);
    setBrand(id);
    window.localStorage.setItem('accent-brand', id);
    window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: id }));
    setCmdOpen(false);
    setThemeMenuOpen(false);
  };

  const pageMap = useMemo(() => new Map(ACCENT_PAGES.map((p) => [p.slug, p])), []);

  const filteredPages = useMemo(() => {
    const q = cmdQuery.trim().toLowerCase();
    if (!q) return ACCENT_PAGES.slice(0, 14);
    if (oramaSlugs && oramaSlugs.length > 0) {
      return oramaSlugs
        .map((s) => pageMap.get(s))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
        .slice(0, 14);
    }
    return ACCENT_PAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.subPatterns ?? []).some((sp) => sp.toLowerCase().includes(q)) ||
        p.rules.some((r) => r.id.toLowerCase().includes(q) || r.statement.toLowerCase().includes(q))
    ).slice(0, 14);
  }, [cmdQuery, oramaSlugs, pageMap]);

  if (isImmersive) {
    return (
      <div
        data-accent-theme={theme}
        data-accent-brand={brand}
        style={brandVars as React.CSSProperties}
        className="accent-root w-full max-w-[100vw] overflow-x-clip min-h-screen bg-[var(--a-bg)] text-[var(--a-ink)]"
      >
        <div id="accent-main">{children}</div>
      </div>
    );
  }

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

      {/* Clean Sticky Header — 6 Primary Destinations + Search + Combined Theme & Tools Popover */}
      <header className="sticky top-0 z-40 h-16 border-b border-[var(--a-rule)] bg-[var(--a-bg)]/95 backdrop-blur">
        <div className="mx-auto max-w-[1440px] h-full px-4 sm:px-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSheet(true)}
            aria-label="Open menu"
            aria-expanded={sheet}
            className="lg:hidden h-11 w-11 shrink-0 grid place-items-center rounded-md border border-[var(--a-rule)] cursor-pointer"
          >
            <List className="h-5 w-5" aria-hidden />
          </button>

          <Link href="/design-system" className="min-h-[44px] inline-flex items-center shrink-0 pr-2">
            <AccentMark />
          </Link>

          <nav
            aria-label="Accént primary navigation"
            className="hidden lg:flex items-center gap-1"
          >
            {TOP_NAV_LINKS.map((link) => {
              const active = link.match(cleanPath);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`relative inline-flex min-h-[44px] items-center px-3 rounded-md text-sm whitespace-nowrap transition-colors ${
                    active
                      ? 'text-[var(--a-ink)] font-semibold'
                      : 'text-[var(--a-muted)] hover:text-[var(--a-ink)] font-medium'
                  }`}
                >
                  {active && (
                    <m.span
                      layoutId="accent-top-nav-active"
                      aria-hidden
                      className="absolute inset-0 rounded-md bg-[var(--a-surface)] border border-[var(--a-rule)]"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              aria-label="Search Accént pages and rules (Command+K)"
              className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)]/80 px-3 text-[13px] font-mono text-[var(--a-muted)] hover:border-[var(--a-ink)] hover:text-[var(--a-ink)] transition-colors cursor-pointer"
            >
              <Search className="h-4 w-4 text-[var(--a-accent-text)] shrink-0" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block rounded border border-[var(--a-rule)] bg-[var(--a-bg)] px-1.5 py-0.5 text-[13px] font-mono">
                ⌘K
              </kbd>
            </button>

            <div className="relative" ref={themeMenuRef}>
              <button
                type="button"
                onClick={() => setThemeMenuOpen((v) => !v)}
                aria-expanded={themeMenuOpen}
                aria-haspopup="menu"
                aria-label={`Switch page color theme or open AI files (current: ${BRAND_SHORT_NAMES[brand]})`}
                className="inline-flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 text-[13px] font-medium text-[var(--a-ink)] hover:border-[var(--a-ink)] transition-colors cursor-pointer"
              >
                <span className="font-mono font-bold text-[var(--a-accent)]">{activeProfile.mark}</span>
                <span className="hidden sm:inline">{BRAND_SHORT_NAMES[brand]}</span>
                <ChevronDown
                  className={`h-4 w-4 text-[var(--a-muted)] transition-transform ${
                    themeMenuOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden
                />
              </button>

              {themeMenuOpen && (
                <div
                  role="menu"
                  aria-label="Page theme and developer tools"
                  className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl border border-[var(--a-ink)]/20 bg-[var(--a-bg)] text-[var(--a-ink)] shadow-xl p-3 z-50"
                >
                  <div className="px-2 pb-1.5 text-[13px] font-mono font-semibold uppercase tracking-wider text-[var(--a-muted)]">
                    Switch Site Voice (7 Presets)
                  </div>
                  <div className="space-y-1">
                    {BRAND_PROFILE_LIST.map((b) => {
                      const active = b.id === brand;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          role="menuitemradio"
                          aria-checked={active}
                          onClick={() => selectDialect(b.id)}
                          className={`w-full min-h-[44px] px-2.5 rounded-lg flex items-center justify-between gap-2 text-left text-[13px] transition-colors cursor-pointer ${
                            active
                              ? 'bg-[var(--a-surface)] font-semibold text-[var(--a-ink)]'
                              : 'hover:bg-[var(--a-surface)]/70 text-[var(--a-ink)]'
                          }`}
                        >
                          <span className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/20 shrink-0"
                              style={{ backgroundColor: b.tokens.light['--a-accent'] }}
                              aria-hidden
                            />
                            <span className="font-mono font-bold text-[var(--a-accent)] shrink-0">
                              {b.mark}
                            </span>
                            <span className="truncate">{BRAND_SHORT_NAMES[b.id]}</span>
                          </span>
                          {active && <Check className="h-4 w-4 text-[var(--a-accent)] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-[var(--a-rule)] space-y-1">
                    <div className="px-2 pb-1 text-[13px] font-mono font-semibold uppercase tracking-wider text-[var(--a-muted)]">
                      AI Files &amp; Ecosystem
                    </div>
                    <Link
                      href={`/design-system/styles.md?brand=${brand}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setThemeMenuOpen(false)}
                      className="min-h-[44px] px-2.5 rounded-lg flex items-center justify-between text-[13px] font-mono text-[var(--a-ink)] hover:bg-[var(--a-surface)]"
                    >
                      <span>STYLES.md Style Sheet</span>
                      <ExternalLink className="h-3.5 w-3.5 text-[var(--a-muted)]" />
                    </Link>
                    <Link
                      href="/design-system/rules.json"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setThemeMenuOpen(false)}
                      className="min-h-[44px] px-2.5 rounded-lg flex items-center justify-between text-[13px] font-mono text-[var(--a-ink)] hover:bg-[var(--a-surface)]"
                    >
                      <span>rules.json Check List</span>
                      <Terminal className="h-3.5 w-3.5 text-[var(--a-muted)]" />
                    </Link>
                    <Link
                      href="/design-system/mcp"
                      onClick={() => setThemeMenuOpen(false)}
                      className="min-h-[44px] px-2.5 rounded-lg flex items-center justify-between text-[13px] font-mono text-[var(--a-ink)] hover:bg-[var(--a-surface)]"
                    >
                      <span>MCP &amp; Coding Agent Server</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--a-muted)]" />
                    </Link>
                    <div className="pt-1 border-t border-[var(--a-rule)] flex items-center justify-between gap-2">
                      <a
                        href="https://pipes.pink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] flex-1 px-2.5 rounded-lg inline-flex items-center justify-between text-[13px] font-mono text-[var(--a-muted)] hover:text-[var(--a-ink)] hover:bg-[var(--a-surface)]"
                      >
                        <span>pipes.pink</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href="https://colonhyphenbracket.pink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[40px] flex-1 px-2.5 rounded-lg inline-flex items-center justify-between text-[13px] font-mono text-[var(--a-muted)] hover:text-[var(--a-ink)] hover:bg-[var(--a-surface)]"
                      >
                        <span>:-] studio</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                document.documentElement.classList.add('theme-fade');
                window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 220);
                setTheme(theme === 'light' ? 'dark' : 'light');
              }}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              className="h-11 w-11 shrink-0 grid place-items-center rounded-md border border-[var(--a-rule)] t-press t-color active:scale-[0.97] cursor-pointer"
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
        <m.div
          aria-hidden
          className="absolute left-0 right-0 -bottom-px h-[2px] origin-left bg-[var(--a-accent)]"
          style={{ scaleX: progressScale }}
        />
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
            aria-label="Accént Search"
          >
            <m.button
              type="button"
              aria-label="Close search"
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
                  placeholder={`Search ${ACCENT_PAGES.length} guides, components, themes, or design rules...`}
                  aria-label="Search Accént guides, components, and themes"
                  className="w-full bg-transparent text-sm font-sans focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setCmdOpen(false)}
                  className="min-h-[36px] px-2.5 py-1 rounded border border-[var(--a-rule)] font-mono text-[13px] text-[var(--a-muted)] hover:text-[var(--a-ink)] cursor-pointer"
                >
                  ESC
                </button>
              </div>

              <div className="max-h-[68vh] overflow-y-auto divide-y divide-[var(--a-rule)]">
                <div className="p-3 bg-[var(--a-surface)]/40">
                  <div className="px-2 mb-2 text-[13px] font-mono font-bold uppercase tracking-[0.12em] text-[var(--a-muted)]">
                    Switch Page Voice (7 Presets)
                  </div>
                  <div className="flex flex-wrap gap-1.5 px-2">
                    {BRAND_PROFILE_LIST.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => selectDialect(b.id)}
                        className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-mono cursor-pointer transition-colors ${
                          b.id === brand
                            ? 'bg-[var(--a-accent-fill,var(--a-accent))] text-white font-bold'
                            : 'border border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-ink)] hover:border-[var(--a-accent)]'
                        }`}
                      >
                        <span>{b.mark}</span>
                        <span>{BRAND_SHORT_NAMES[b.id]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-2">
                  <div className="px-3 py-1.5 text-[13px] font-mono font-bold uppercase tracking-[0.12em] text-[var(--a-muted)]">
                    Guides &amp; Specifications ({filteredPages.length})
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
                          className="w-full min-h-[44px] px-3 py-2.5 rounded-md flex items-center justify-between gap-4 text-left hover:bg-[var(--a-surface)] transition-colors cursor-pointer group"
                        >
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[var(--a-ink)] group-hover:text-[var(--a-accent)] truncate">
                              {p.title}
                            </div>
                            <div className="text-[13px] text-[var(--a-muted)] truncate">{p.summary}</div>
                          </div>
                          <div className="shrink-0 flex items-center gap-2 font-mono text-[13px] text-[var(--a-muted)]">
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
                  className="h-11 w-11 grid place-items-center rounded-md border border-[var(--a-rule)] t-press active:scale-[0.97] cursor-pointer"
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
