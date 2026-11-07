'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw, Palette, Sparkles, GitFork } from 'lucide-react';
import {
  RiseLines,
  FadeUp,
  Hairline,
  ScaryHeadline,
  Smile,
  Eyebrow,
  DESIGN_SYSTEM_SCARY_PAIRS,
  HOME_SCARY_PAIRS,
} from './editorial-motion/AccentBrandMotion';
import { AccentRevealText } from './editorial-motion/AccentRevealText';
import { AccentKineticBadge } from './editorial-motion/AccentKineticBadge';
import {
  BRAND_PROFILES,
  BRAND_PROFILE_LIST,
  type BrandProfileId,
} from '@/styles/themes';

/**
 * Interactive Corporate & Editorial Motion Showcase + Multi-Brand Theme Switcher
 * Displayed on the Accént Design System homepage (`design.pipes.pink`) and `/foundations/motion`.
 */
export function AccentHeroMotionShowcase() {
  const [replayKey, setReplayKey] = useState(0);
  const [pairMode, setPairMode] = useState<'design' | 'corporate'>('design');
  const [activeBrand, setActiveBrand] = useState<BrandProfileId>('editorial-sandstone');

  useEffect(() => {
    const saved = window.localStorage.getItem('accent-brand') as BrandProfileId | null;
    if (saved && saved in BRAND_PROFILES) {
      setActiveBrand(saved);
    }
    const onBrandChange = (e: Event) => {
      const custom = e as CustomEvent<BrandProfileId>;
      if (custom.detail && custom.detail in BRAND_PROFILES) {
        setActiveBrand(custom.detail);
      }
    };
    window.addEventListener('accent-brand-change', onBrandChange);
    return () => window.removeEventListener('accent-brand-change', onBrandChange);
  }, []);

  const selectBrand = (id: BrandProfileId) => {
    setActiveBrand(id);
    window.localStorage.setItem('accent-brand', id);
    document.documentElement.classList.add('theme-fade');
    window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 220);
    document.documentElement.setAttribute('data-accent-brand', id);
    window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: id }));
    // Also update the nearest .accent-root style vars immediately
    const root = document.querySelector('.accent-root') as HTMLElement | null;
    if (root) {
      const mode = (root.getAttribute('data-accent-theme') as 'light' | 'dark') || 'light';
      const vars = BRAND_PROFILES[id].tokens[mode];
      Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
      root.setAttribute('data-accent-brand', id);
    }
  };

  return (
    <div className="mt-14 space-y-12">
      {/* 1. Tier 2 Editorial & Corporate Motion Primitives Live Stage */}
      <section
        data-testid="accent-corporate-motion-showcase"
        aria-labelledby="corporate-motion-heading"
        className="rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--a-rule)]">
          <div className="space-y-1">
            <Eyebrow mark="´" color="var(--a-accent)">
              Dogfooding Accént Motion · Tier 2 Editorial &amp; Corporate Primitives
            </Eyebrow>
            <h2 id="corporate-motion-heading" className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight">
              Live Choreography Stage
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPairMode((m) => (m === 'design' ? 'corporate' : 'design'))}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-xs font-mono t-press t-color hover:border-[var(--a-ink)] active:scale-[0.97] cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--a-accent)]" aria-hidden="true" />
              <span>Copy: {pairMode === 'design' ? 'Accént Design' : 'CHB Corporate'}</span>
            </button>
            <button
              type="button"
              onClick={() => setReplayKey((k) => k + 1)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md bg-[var(--a-ink)] text-[var(--a-bg)] px-3.5 text-xs font-mono font-semibold t-press t-color hover:opacity-90 active:scale-[0.97] cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Replay Entrance</span>
            </button>
          </div>
        </div>

        <div key={replayKey} className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_1fr] items-start">
          {/* Left: ScaryHeadline 3-phase strike-through + spring swap */}
          <div className="rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-2 mb-4">
              <AccentKineticBadge label="ScaryHeadline · 3-Phase Strike & Spring" />
              <span className="font-mono text-xs text-[var(--a-muted)]">stiffness 240 · damping 24</span>
            </div>
            <div className="font-serif text-3xl sm:text-4xl font-semibold leading-[1.08] tracking-tight">
              <ScaryHeadline
                accent="var(--a-accent)"
                inkColor="var(--a-ink)"
                struckColor="var(--a-muted)"
                pairs={pairMode === 'design' ? DESIGN_SYSTEM_SCARY_PAIRS : HOME_SCARY_PAIRS}
              />
            </div>
            <Hairline className="mt-6 bg-[var(--a-rule)]" delay={0.15} />
            <p className="mt-3 text-xs font-mono text-[var(--a-muted)]">
              import &#123; ScaryHeadline, Smile, Hairline &#125; from &apos;@rorshockbtc/accent-ui&apos;
            </p>
          </div>

          {/* Right: RiseLines + AccentRevealText + Link Swipe + Smile Wink */}
          <div className="space-y-4">
            <div className="rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-muted)]">
                  01 · RiseLines (Masked Line Rise)
                </span>
                <span className="font-mono text-xs text-[var(--a-accent-text)]">900ms · [0.22, 1, 0.36, 1]</span>
              </div>
              <div className="font-serif text-xl sm:text-2xl font-semibold leading-snug">
                <RiseLines
                  immediate
                  lines={[
                    'One principal.',
                    'Zero handoffs. Shipped code.',
                  ]}
                />
              </div>
            </div>

            <div className="rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-muted)]">
                  02 · AccentRevealText (Word Stagger)
                </span>
                <span className="font-mono text-xs text-[var(--a-accent-text)]">35ms/word</span>
              </div>
              <AccentRevealText
                immediate
                as="p"
                text="Every word rises from behind an overflow mask with zero layout shift."
                italicWords={[1, 6]}
                className="font-serif text-lg leading-relaxed text-[var(--a-ink)]"
              />
            </div>

            <FadeUp immediate delay={0.2} className="rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] p-5 flex items-center justify-between gap-4">
              <div>
                <span className="block font-mono text-xs uppercase tracking-wider text-[var(--a-muted)]">
                  03 · Interactive Punctuation &amp; Link Swipe
                </span>
                <a
                  href="#corporate-motion-heading"
                  onClick={(e) => {
                    e.preventDefault();
                    setReplayKey((k) => k + 1);
                  }}
                  className="mt-1 inline-block font-serif text-base font-medium link-swipe text-[var(--a-ink)]"
                >
                  Hover for .link-swipe underline or hover the mark →
                </a>
              </div>
              <Smile
                className="text-3xl sm:text-4xl shrink-0"
                color="var(--a-accent)"
                winkEvery={2800}
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. Multi-Brand Theme Presets & Forkable Architecture */}
      <section
        data-testid="accent-multi-brand-theming"
        aria-labelledby="theming-heading"
        className="rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-5 border-b border-[var(--a-rule)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[var(--a-accent-text)]">
              <Palette className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Multi-Brand Theme Engine · Forkable Architecture</span>
            </div>
            <h2 id="theming-heading" className="mt-1 font-serif text-2xl sm:text-3xl font-semibold tracking-tight">
              One Design System, Multiple Brand Voices
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--a-muted)]">
            src/styles/themes.ts · Click any preset to live-switch this entire site
          </span>
        </div>

        <p className="mt-4 text-sm sm:text-base leading-7 text-[var(--a-muted)] max-w-[68ch]">
          Whether you are building an archival publication like <strong>Pipes</strong>, a high-converting studio flagship like <strong>Colon Hyphen Bracket</strong> (<code className="font-mono text-xs">feat/playful-principal</code>), or forking <code className="font-mono text-xs">accent-ui</code> for your own brand, every semantic variable (<code className="font-mono text-xs">--a-bg</code>, <code className="font-mono text-xs">--a-accent</code>, <code className="font-mono text-xs">--a-surface</code>) adapts automatically while preserving our 8-point grid and WCAG contrast guarantees.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {BRAND_PROFILE_LIST.map((profile) => {
            const isSelected = activeBrand === profile.id;
            const lightTokens = profile.tokens.light;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => selectBrand(profile.id)}
                aria-pressed={isSelected}
                className={`text-left rounded-md p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[var(--a-accent)] bg-[var(--a-bg)] ring-2 ring-[var(--a-accent)]/30'
                    : 'border-[var(--a-rule)] bg-[var(--a-bg)]/60 hover:border-[var(--a-ink)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm font-bold" style={{ color: lightTokens['--a-accent'] }}>
                      {profile.mark}
                    </span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-sm bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] font-mono text-xs font-semibold uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-[var(--a-ink)]">
                    {profile.name}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[var(--a-muted)]">
                    {profile.tagline}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--a-rule)] space-y-2">
                  <div className="flex items-center gap-1.5">
                    {[
                      lightTokens['--a-bg'],
                      lightTokens['--a-surface'],
                      lightTokens['--a-ink'],
                      lightTokens['--a-accent'],
                      lightTokens['--a-sky'],
                    ].map((hex, idx) => (
                      <span
                        key={idx}
                        className="h-5 w-5 rounded-full border border-black/20"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                  <div className="font-mono text-xs text-[var(--a-muted)] truncate">
                    {profile.typography.display} + {profile.typography.sans}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-[var(--a-rule)] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[var(--a-muted)]">
            <GitFork className="h-4 w-4 text-[var(--a-accent)] shrink-0" aria-hidden="true" />
            <span>
              Want to add a custom brand preset or template? Fork <code className="font-mono">rorshockbtc/accent-ui</code>, add an entry in <code className="font-mono">src/styles/themes.ts</code>, and open a Pull Request.
            </span>
          </div>
          <a
            href="https://github.com/rorshockbtc/accent-ui/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-semibold text-[var(--a-accent-text)] underline underline-offset-4 hover:opacity-80"
          >
            Read Theme Contribution Guide ↗
          </a>
        </div>
      </section>
    </div>
  );
}
