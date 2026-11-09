import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Palette, Code2, Layers, LayoutTemplate, Terminal, Sparkles } from 'lucide-react';
import { ACCENT_PAGES, ACCENT_SECTIONS, getAllAccentRules } from '@/content/accent/registry';
import {
  DESIGN_TOKENS,
  SEMANTIC_CONTRAST_PAIRS,
  getContrastRatio,
} from '@/styles/design-tokens';
import { DURATION_MS, EASE_ACCENT_CSS, SPRING_LAYOUT } from '@/lib/motion/tokens';
import { AccentButton, AccentBadge } from '@/components/ui';
import {
  RiseLines,
  FadeUp,
  Hairline,
  Stagger,
  StaggerItem,
  Smile,
} from '@/components/editorial-motion/AccentBrandMotion';
import { AccentRevealText } from '@/components/editorial-motion/AccentRevealText';
import { AccentHeroMotionShowcase } from '@/components/AccentHeroMotionShowcase';
import { AccentAstryxPowerStage } from '@/components/AccentAstryxPowerStage';

export const metadata: Metadata = {
  title: 'Accént 3.0 · The Exhaustive Agent-Ready Design System',
  description:
    'Grids, typography, Dual-Accent color (Sovereign Pink + Crystalline Sky Blue), 7-dialect 5-Axis theming, STYLES.md governance, and choreography primitives. Written for non-designers, engineers, and AI agents.',
};

const STUDIOS = [
  {
    href: '/design-system/themes',
    eyebrow: '01 · 5-Axis Theme Studio',
    title: '7 Brand Dialects · Live 5-Surface Canvas',
    description:
      'Switch between Sovereign Editorial, Playful Principal, Studio Portfolio, Swiss Corporate, Warm Well, Terminal Grid, and High-Contrast Civic. Customize chromatic math, display typography, CTA geometry, choreography, and punctuation in real time across 5 full application surfaces.',
    cta: 'Launch Theme Studio',
    badge: '7 Dialects · 5 Axes',
    icon: Palette,
  },
  {
    href: '/design-system/playground',
    eyebrow: '02 · Live Code, Linter & STYLES.md Playground',
    title: 'Split-Screen TSX Editor + Regex Ratchet',
    description:
      'Edit TSX templates, live-tweak all 5 axes plus custom CSS escape hatches, run the real-time regex rule linter against 200+ machine-enforceable rules, and compile zero-PR STYLES.md contracts or step-by-step 7B / 32B / Frontier agent prompts.',
    cta: 'Open Playground',
    badge: 'Live Linter · STYLES.md',
    icon: Code2,
  },
  {
    href: '/design-system/components',
    eyebrow: '03 · Exhaustive Component & Pattern Matrix',
    title: '57 Specification Pages · 4-Tab Architecture',
    description:
      'Every primitive, editorial layout, choreography engine, and AI governance specification includes Overview, Do/Don’t Guidelines, W3C DTCG Token & Prop Specs, WCAG Accessibility contracts, and regex violation patterns.',
    cta: 'Browse 57 Specs',
    badge: '57 Pages · 4 Tabs Each',
    icon: Layers,
  },
  {
    href: '/design-system/templates',
    eyebrow: '04 · Multi-Brand Production Blueprints',
    title: '6 Full-Page Architectural Templates',
    description:
      'Inspect Editorial Reading Room, 3-Archetype Browse Directory, Studio Portfolio & Toymaker Stage, Sovereign Publishing Desk, 3-Column Thesis Micro-Site, and DuckDB-Wasm Telemetry Ledger across every brand dialect.',
    cta: 'Explore Templates',
    badge: '6 Production Blueprints',
    icon: LayoutTemplate,
  },
];

const START = [
  { slug: 'start/introduction', label: 'New here', text: 'What Accént is and how to read it.' },
  { slug: 'foundations/motion', label: 'Motion & Choreography', text: 'Tier 1 operational vs. Tier 2 editorial & corporate motion.' },
  { slug: 'foundations/theming', label: 'Theming & Engineered Drift', text: '7 brand presets, defineAccentTheme(), and WCAG contrast math.' },
  { slug: 'ai/styles-md', label: 'STYLES.md Governance', text: 'Zero-PR design contracts separated from operational AGENTS.md.' },
  { slug: 'ai/mcp-and-cli', label: 'MCP Server & CLI', text: 'Query rules.json, styles.md, and tokens from any coding agent.' },
  { slug: 'ai/rules', label: 'Machine-Readable Rules', text: 'Every hard rule a local or frontier model must never break.' },
];

export default function AccentHome() {
  const essays = ACCENT_PAGES.filter((p) => p.section === 'essays');
  const counts = ACCENT_SECTIONS.map((s) => ({ ...s, n: ACCENT_PAGES.filter((p) => p.section === s.id).length }));
  const totalRules = getAllAccentRules().length;
  const computedContrasts = SEMANTIC_CONTRAST_PAIRS.map((pair) => ({
    ...pair,
    ratio: Number(getContrastRatio(pair.foreground, pair.background).toFixed(2)),
  }));

  return (
    <div className="py-12 sm:py-20 max-w-[1120px]">
      <section aria-labelledby="accent-hero">
        <FadeUp immediate y={12}>
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <AccentBadge tone="pink">v{DESIGN_TOKENS.version} · Exhaustive Edition</AccentBadge>
            <AccentBadge tone="sky">{ACCENT_PAGES.length} Pages · {totalRules} Machine-Enforced Rules</AccentBadge>
            <AccentBadge tone="neutral">7 Brand Dialects · 5-Axis Drift</AccentBadge>
            <AccentBadge tone="neutral">MIT Open Source · FOSS</AccentBadge>
            <a
              href="https://github.com/rorshockbtc/accent-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--a-muted)] hover:text-[var(--a-accent)] transition-colors ml-1"
            >
              <span>github.com/rorshockbtc/accent-ui ↗</span>
            </a>
          </div>
          <svg viewBox="0 0 24 32" width="48" height="64" aria-hidden className="select-none">
            <path d="M9 30 L17 2 L23 2 L13 30 Z" fill="var(--a-accent)" />
          </svg>
        </FadeUp>

        <h1 id="accent-hero" className="mt-2 font-serif text-5xl sm:text-7xl leading-[1.02] font-semibold tracking-tight">
          <RiseLines immediate lines={['Accént 3.0']} />
        </h1>

        <div className="mt-6 text-xl sm:text-2xl leading-9 max-w-[52ch]">
          <AccentRevealText
            immediate
            as="p"
            delay={0.12}
            text="The exhaustive, malleable, agent-native design system behind Pipes, Colon Hyphen Bracket, and Greater. An accent changes how a word is spoken without changing the word—governing 7 distinct brand voices from one mathematical spine."
            italicWords={[2, 3, 4]}
          />
        </div>

        <FadeUp immediate delay={0.3} y={16}>
          <p className="mt-4 text-base leading-7 text-[var(--a-muted)] max-w-[68ch]">
            Written for non-designers, principal engineers, and both local 7B models and frontier coding agents. Powered by a single W3C DTCG token source (<code className="font-mono text-xs">src/styles/design-tokens.json</code>), a 5-axis multi-brand theming engine (<code className="font-mono text-xs">src/styles/themes.ts</code>), zero-PR <code className="font-mono text-xs">STYLES.md</code> governance, and live machine-readable endpoints (<code className="font-mono text-xs">/design-system/styles.md</code> &amp; <code className="font-mono text-xs">/design-system/rules.json</code>).
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/design-system/themes"
              className="inline-flex items-center gap-2 rounded-[var(--a-cta-radius,9999px)] bg-[var(--a-accent)] px-6 py-3 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-accent-fg)] shadow-[var(--a-cta-shadow)] transition-colors hover:opacity-95"
            >
              <Palette className="h-4 w-4" aria-hidden />
              Launch 5-Axis Theme Studio →
            </Link>
            <Link
              href="/design-system/playground"
              className="inline-flex items-center gap-2 rounded-[var(--a-cta-radius,9999px)] border border-[var(--a-ink)] bg-[var(--a-surface)] px-6 py-3 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-ink)] transition-colors hover:border-[var(--a-accent)] hover:text-[var(--a-accent)]"
            >
              <Code2 className="h-4 w-4" aria-hidden />
              Open Live Playground &amp; Linter
            </Link>
            <Link
              href="/design-system/components"
              className="inline-flex items-center gap-2 rounded-[var(--a-cta-radius,9999px)] border border-[var(--a-rule)] bg-[var(--a-bg)] px-5 py-3 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-muted)] transition-colors hover:border-[var(--a-ink)] hover:text-[var(--a-ink)]"
            >
              Browse {ACCENT_PAGES.length} Specs ({totalRules} Rules)
            </Link>
          </div>
        </FadeUp>
      </section>

      {/* 4 Interactive Studios Bento Matrix */}
      <FadeUp delay={0.08}>
        <section aria-labelledby="studios-heading" className="mt-16">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <h2 id="studios-heading" className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-accent)]">
              Interactive Studios &amp; Agent Control Plane
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--a-muted)]">
              <a href="/design-system/styles.md" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--a-accent)] transition-colors">
                GET /design-system/styles.md ↗
              </a>
              <a href="/design-system/rules.json" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--a-accent)] transition-colors">
                GET /design-system/rules.json ↗
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-[var(--a-rule)] bg-[var(--a-surface)] divide-y md:divide-y-0 md:divide-x divide-[var(--a-rule)]">
            {STUDIOS.slice(0, 2).map((studio) => {
              const Icon = studio.icon;
              return (
                <Link
                  key={studio.href}
                  href={studio.href}
                  className="group flex flex-col justify-between p-7 sm:p-9 transition-colors hover:bg-[var(--a-bg)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-accent)]">
                        {studio.eyebrow}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-2.5 py-0.5 text-xs font-mono text-[var(--a-muted)]">
                        <Icon className="h-3.5 w-3.5 text-[var(--a-accent)]" aria-hidden />
                        {studio.badge}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[var(--a-ink)] group-hover:text-[var(--a-accent)] transition-colors">
                      {studio.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--a-muted)]">
                      {studio.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--a-rule)] flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-ink)] group-hover:text-[var(--a-accent)]">
                    <span>{studio.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-x border-b border-[var(--a-rule)] bg-[var(--a-surface)] divide-y md:divide-y-0 md:divide-x divide-[var(--a-rule)]">
            {STUDIOS.slice(2, 4).map((studio) => {
              const Icon = studio.icon;
              return (
                <Link
                  key={studio.href}
                  href={studio.href}
                  className="group flex flex-col justify-between p-7 sm:p-9 transition-colors hover:bg-[var(--a-bg)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-accent)]">
                        {studio.eyebrow}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-2.5 py-0.5 text-xs font-mono text-[var(--a-muted)]">
                        <Icon className="h-3.5 w-3.5 text-[var(--a-accent)]" aria-hidden />
                        {studio.badge}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-[var(--a-ink)] group-hover:text-[var(--a-accent)] transition-colors">
                      {studio.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--a-muted)]">
                      {studio.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[var(--a-rule)] flex items-center justify-between text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-ink)] group-hover:text-[var(--a-accent)]">
                    <span>{studio.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </FadeUp>

      {/* Interactive Corporate & Editorial Motion Showcase + Multi-Brand Theme Switcher */}
      <FadeUp delay={0.1}>
        <AccentHeroMotionShowcase />
      </FadeUp>

      {/* Agent Command Center & 5-Axis Architectural Benchmark Matrix */}
      <FadeUp delay={0.12}>
        <AccentAstryxPowerStage />
      </FadeUp>

      {/* Live Workbench: Dual-Accent & Surface Mode Specimen */}
      <FadeUp>
        <section
          data-testid="accent-surface-modes-specimen"
          aria-labelledby="workbench-heading"
          className="mt-16 border-y border-[var(--a-rule)] py-10"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="workbench-heading" className="text-xs font-mono font-semibold uppercase tracking-[0.12em] text-[var(--a-muted)]">
              Live Component Primitives · Editorial Mode vs. Commercial Mode
            </h2>
            <span className="font-mono text-xs text-[var(--a-muted)]">
              import &#123; AccentButton, AccentLinkButton, AccentBadge &#125; from &apos;@rorshockbtc/accent-ui&apos;
            </span>
          </div>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--a-muted)]">
                01 · Editorial Surface Mode (Quiet Hairlines · Reading Rooms &amp; Theses)
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <AccentButton variant="primary" surfaceMode="editorial">
                  Primary Pink
                </AccentButton>
                <AccentButton variant="sky-ice" surfaceMode="editorial">
                  Ice Sky (#D4EBF5)
                </AccentButton>
                <AccentButton variant="outline" surfaceMode="editorial">
                  Hairline Outline
                </AccentButton>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider text-[var(--a-muted)]">
                02 · Commercial Surface Mode (Tactile 3px Ink Shadow · Hero &amp; Pricing CTAs)
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <AccentButton variant="primary" surfaceMode="commercial">
                  Claim a Pipe
                </AccentButton>
                <AccentButton variant="sky" surfaceMode="commercial">
                  Launch Greater &gt;
                </AccentButton>
                <AccentButton variant="sky-ice" surfaceMode="commercial">
                  Explore Canon
                </AccentButton>
              </div>
            </div>
          </div>

          {/* Live Motion Tokens Ledger (`src/lib/motion/tokens.ts`) */}
          <div
            data-testid="accent-motion-specimen"
            className="mt-8 pt-6 border-t border-[var(--a-rule)] grid gap-4 sm:grid-cols-4 text-xs"
          >
            <div>
              <p className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Micro Feedback</p>
              <p className="mt-1 font-mono font-semibold text-[var(--a-ink)]">{DURATION_MS.fast}ms · scale(0.97)</p>
              <p className="text-[var(--a-muted)]">Button press &amp; Play/Pause morph</p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Standard Transition</p>
              <p className="mt-1 font-mono font-semibold text-[var(--a-ink)]">{DURATION_MS.base}ms · {EASE_ACCENT_CSS}</p>
              <p className="text-[var(--a-muted)]">View Transitions &amp; theme crossfade</p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Sheet / Reveal</p>
              <p className="mt-1 font-mono font-semibold text-[var(--a-ink)]">{DURATION_MS.slow}ms · {EASE_ACCENT_CSS}</p>
              <p className="text-[var(--a-muted)]">Bottom sheet &amp; Merkle path draw</p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Shared LayoutId Spring</p>
              <p className="mt-1 font-mono font-semibold text-[var(--a-ink)]">
                stiffness {SPRING_LAYOUT.stiffness} · damping {SPRING_LAYOUT.damping}
              </p>
              <p className="text-[var(--a-muted)]">Active episode bar &amp; tab underline</p>
            </div>
          </div>
        </section>
      </FadeUp>

      <section aria-labelledby="start-heading" className="mt-16">
        <FadeUp>
          <h2 id="start-heading" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--a-muted)]">
            Start where you are · Human &amp; Agent Entry Points
          </h2>
        </FadeUp>
        <Stagger className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--a-rule)]" staggerChildren={0.07}>
          {START.map((s) => (
            <StaggerItem key={s.slug} className="border-b border-r border-[var(--a-rule)]">
              <Link href={`/design-system/${s.slug}`} className="group flex min-h-[120px] flex-col justify-between p-6 t-color hover:bg-[var(--a-surface)]">
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-[var(--a-accent)]">{s.label}</span>
                <span className="mt-2 flex items-center justify-between gap-2 text-base font-medium text-[var(--a-ink)]">
                  <span className="link-swipe">{s.text}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Live Computed Token & Contrast Ledger (Zero Hand-Typed Ratios) */}
      <section
        data-testid="accent-computed-contrast-ledger"
        aria-labelledby="contrast-ledger-heading"
        className="mt-20"
      >
        <FadeUp>
          <h2 id="contrast-ledger-heading" className="font-serif text-3xl leading-10 font-semibold">
            Computed Semantic Contrast Ledger
          </h2>
          <p className="mt-2 text-base leading-7 text-[var(--a-muted)] max-w-[64ch]">
            Every ratio below is computed at render time from <code className="font-mono text-xs">src/styles/design-tokens.json</code> and enforced in CI by <code className="font-mono text-xs">design-system-spec.test.ts</code>.
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <ol className="mt-6 divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
            {computedContrasts.map((item, idx) => (
              <li key={item.id} className="py-4 grid grid-cols-[40px_1fr_auto] gap-4 items-center text-sm">
                <span className="font-serif text-lg text-[var(--a-muted)] tabular-nums">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <div className="font-medium text-[var(--a-ink)]">{item.label}</div>
                  <div className="text-xs font-mono text-[var(--a-muted)]">
                    {item.mode.toUpperCase()} · fg {item.foreground} on bg {item.background}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-sm font-mono text-xs font-semibold border border-[var(--a-rule)] tabular-nums"
                    style={{ backgroundColor: item.background, color: item.foreground }}
                  >
                    {item.ratio}:1
                  </span>
                  <span className="font-mono text-xs text-[var(--a-muted)] tabular-nums">
                    {item.ratio >= 7 ? 'AAA' : 'AA'}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </FadeUp>
      </section>

      <section aria-labelledby="essays-heading" className="mt-20">
        <FadeUp>
          <h2 id="essays-heading" className="font-serif text-3xl leading-10 font-semibold">Why we built it this way</h2>
          <p className="mt-2 text-base leading-7 text-[var(--a-muted)] max-w-[60ch]">Long-form essays on the thinking behind the system.</p>
        </FadeUp>
        <Stagger className="mt-8 divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]" staggerChildren={0.06}>
          {essays.map((e, i) => (
            <StaggerItem key={e.slug}>
              <Link href={`/design-system/${e.slug}`} className="grid grid-cols-[48px_1fr] gap-4 py-6 group">
                <span className="font-serif text-2xl text-[var(--a-muted)] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="inline-block font-serif text-xl sm:text-2xl leading-8 link-swipe">{e.title}</span>
                  <span className="block mt-1 text-base leading-7 text-[var(--a-muted)] max-w-[64ch]">{e.summary}</span>
                  <span className="block mt-1 text-sm text-[var(--a-muted)]">{e.readingMinutes} min read</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section aria-labelledby="contents-heading" className="mt-20">
        <FadeUp>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="contents-heading" className="font-serif text-3xl leading-10 font-semibold">
              Complete Specification Index ({ACCENT_PAGES.length} Pages · {totalRules} Rules)
            </h2>
            <Link
              href="/design-system/components"
              className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-accent)] hover:underline"
            >
              Open Interactive Matrix →
            </Link>
          </div>
        </FadeUp>
        <Stagger className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2" staggerChildren={0.08}>
          {counts.filter((s) => s.id !== 'start' && s.id !== 'essays').map((s) => (
            <StaggerItem key={s.id}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--a-muted)]">{s.label} · {s.n}</h3>
              <ul className="mt-3 space-y-1">
                {ACCENT_PAGES.filter((p) => p.section === s.id).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/design-system/${p.slug}`} className="inline-flex min-h-[40px] items-center justify-between w-full text-base link-swipe group">
                      <span>{p.title}</span>
                      <span className="text-xs font-mono text-[var(--a-muted)] group-hover:text-[var(--a-accent)]">
                        {p.rules.length} rules
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <div className="mt-20">
        <Hairline className="bg-[var(--a-rule)]" />
        <FadeUp className="pt-8 text-sm leading-6 text-[var(--a-muted)] max-w-[68ch]">
          Accént grew out of <Link href="/design-system/start/colors-type-grids" className="underline underline-offset-4">Colors Type Grids</Link>,
          a human-made poster by Kyle Cyree of Colon Hyphen Bracket{' '}
          <Smile className="inline-flex text-sm font-mono text-[var(--a-accent)]" winkEvery={3200} />. The interface, theming, and choreography
          layers are MIT open-source (<a href="https://github.com/rorshockbtc/accent-ui" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 font-mono text-xs">github.com/rorshockbtc/accent-ui</a>); Pipes business logic is not. Examples use sample content only.
        </FadeUp>
      </div>
    </div>
  );
}
