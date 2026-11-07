import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ACCENT_PAGES, ACCENT_SECTIONS, getAllAccentRules } from '@/content/accent/registry';
import {
  DESIGN_TOKENS,
  SEMANTIC_CONTRAST_PAIRS,
  getContrastRatio,
} from '@/styles/design-tokens';
import { DURATION_MS, EASE_ACCENT_CSS, SPRING_LAYOUT } from '@/lib/motion/tokens';
import { AccentButton, AccentBadge } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Accént 3.0 · The Pipes Design System',
  description:
    'Grids, typography, Dual-Accent color (Sovereign Pink + Crystalline Sky Blue), components and the reasons behind them. Written for non-designers, engineers and local AI models.',
};

const START = [
  { slug: 'start/introduction', label: 'New here', text: 'What Accént is and how to read it.' },
  { slug: 'foundations/grid', label: 'Designing a page', text: 'Start with the 8-point grid.' },
  { slug: 'essays/mixing-typefaces', label: 'Choosing fonts', text: 'Pair Fraunces serif, Inter sans, and JetBrains Mono.' },
  { slug: 'ai/rules', label: 'Building with AI', text: 'Rules a local model must never break.' },
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
    <div className="py-12 sm:py-20 max-w-[1040px]">
      <section aria-labelledby="accent-hero">
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <AccentBadge tone="pink">v{DESIGN_TOKENS.version}</AccentBadge>
          <AccentBadge tone="sky">{ACCENT_PAGES.length} Pages · {totalRules} Enforced Rules</AccentBadge>
          <AccentBadge tone="neutral">WCAG AA / AAA Verified</AccentBadge>
        </div>
        <svg viewBox="0 0 24 32" width="48" height="64" aria-hidden className="select-none">
          <path d="M9 30 L17 2 L23 2 L13 30 Z" fill="var(--a-accent)" />
        </svg>
        <h1 id="accent-hero" className="mt-2 font-serif text-5xl sm:text-6xl leading-[1.05] font-semibold tracking-tight">
          Accént
        </h1>
        <p className="mt-6 text-xl sm:text-2xl leading-9 max-w-[44ch]">
          The design system behind Pipes. An accent changes how a word is spoken without changing the word.
          That is what design does to a product.
        </p>
        <p className="mt-4 text-base leading-7 text-[var(--a-muted)] max-w-[62ch]">
          Written for people who are not designers yet, the engineers who build with them, and the small AI
          models running on their laptops. Powered by a single W3C DTCG token source (<code className="font-mono text-xs">src/styles/design-tokens.json</code>), bold Fraunces serif headings, crisp JetBrains Mono metadata, and our Dual-Accent palette: <strong>Sovereign Pink</strong> and <strong>Crystalline Sky Blue</strong>.
        </p>
      </section>

      {/* Live Workbench: Dual-Accent & Surface Mode Specimen */}
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
            import &#123; AccentButton, AccentLinkButton, AccentBadge &#125; from &apos;@/components&apos;
          </span>
        </div>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--a-muted)]">
              01 · Editorial Surface Mode (Quiet Hairlines · Reading Rooms &amp; Theses)
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <AccentButton variant="primary" surfaceMode="editorial">
                Primary Pink (#B8326D)
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

      <section aria-labelledby="start-heading" className="mt-16">
        <h2 id="start-heading" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--a-muted)]">Start where you are</h2>
        <ul className="mt-4 grid sm:grid-cols-2 border-t border-[var(--a-rule)]">
          {START.map((s) => (
            <li key={s.slug} className="border-b border-[var(--a-rule)] sm:odd:border-r">
              <Link href={`/design-system/${s.slug}`} className="group flex min-h-[112px] flex-col justify-center p-6 hover:bg-[var(--a-surface)]">
                <span className="text-sm text-[var(--a-muted)]">{s.label}</span>
                <span className="mt-1 flex items-center gap-2 text-lg font-medium">
                  {s.text}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Live Computed Token & Contrast Ledger (Zero Hand-Typed Ratios) */}
      <section
        data-testid="accent-computed-contrast-ledger"
        aria-labelledby="contrast-ledger-heading"
        className="mt-20"
      >
        <h2 id="contrast-ledger-heading" className="font-serif text-3xl leading-10 font-semibold">
          Computed Semantic Contrast Ledger
        </h2>
        <p className="mt-2 text-base leading-7 text-[var(--a-muted)] max-w-[64ch]">
          Every ratio below is computed at render time from <code className="font-mono text-xs">src/styles/design-tokens.json</code> and enforced in CI by <code className="font-mono text-xs">design-system-spec.test.ts</code>.
        </p>
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
      </section>

      <section aria-labelledby="essays-heading" className="mt-20">
        <h2 id="essays-heading" className="font-serif text-3xl leading-10 font-semibold">Why we built it this way</h2>
        <p className="mt-2 text-base leading-7 text-[var(--a-muted)] max-w-[60ch]">Long-form essays on the thinking behind the system.</p>
        <ol className="mt-8 divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
          {essays.map((e, i) => (
            <li key={e.slug}>
              <Link href={`/design-system/${e.slug}`} className="grid grid-cols-[48px_1fr] gap-4 py-6 group">
                <span className="font-serif text-2xl text-[var(--a-muted)] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block font-serif text-xl sm:text-2xl leading-8 group-hover:underline underline-offset-4">{e.title}</span>
                  <span className="block mt-1 text-base leading-7 text-[var(--a-muted)] max-w-[64ch]">{e.summary}</span>
                  <span className="block mt-1 text-sm text-[var(--a-muted)]">{e.readingMinutes} min read</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="contents-heading" className="mt-20">
        <h2 id="contents-heading" className="font-serif text-3xl leading-10 font-semibold">What&apos;s inside</h2>
        <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {counts.filter((s) => s.id !== 'start' && s.id !== 'essays').map((s) => (
            <div key={s.id}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--a-muted)]">{s.label} · {s.n}</h3>
              <ul className="mt-3 space-y-1">
                {ACCENT_PAGES.filter((p) => p.section === s.id).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/design-system/${p.slug}`} className="inline-flex min-h-[40px] items-center text-base hover:underline underline-offset-4">{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-[var(--a-rule)] pt-8 text-sm leading-6 text-[var(--a-muted)] max-w-[68ch]">
        Accént grew out of <Link href="/design-system/start/colors-type-grids" className="underline underline-offset-4">Colors Type Grids</Link>,
        a human-made poster by Kyle Cyree of Colon Hyphen Bracket <span className="font-mono">:-]</span>. The interface and interaction
        layers are public; Pipes business logic is not. Examples use sample content only.
      </section>
    </div>
  );
}
