'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  RotateCcw,
  Palette,
  Sparkles,
  GitFork,
  Download,
  Copy,
  Check,
  Code2,
  Sliders,
  ExternalLink,
  Share2,
  ShieldCheck,
} from 'lucide-react';
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
import { AccentButton } from './ui';
import {
  BRAND_PROFILES,
  BRAND_PROFILE_LIST,
  deriveAccessibleAccent,
  generateStylesMarkdown,
  type BrandProfileId,
  type BrandProfile,
} from '@/styles/themes';

const DISPLAY_FONT_OPTIONS = [
  { label: 'Fraunces (Archival Serif)', value: 'Fraunces', css: "var(--font-serif), 'Fraunces', Georgia, serif", tracking: '-0.02em' },
  { label: 'Bricolage Grotesque (Playful Principal)', value: 'Bricolage Grotesque', css: "var(--font-bricolage), 'Bricolage Grotesque', 'Inter', system-ui, sans-serif", tracking: '-0.035em' },
  { label: 'Newsreader (Editorial Classical)', value: 'Newsreader', css: "var(--font-newsreader), 'Newsreader', Georgia, serif", tracking: '-0.02em' },
  { label: 'Cormorant Garamond (Cassandra Noir)', value: 'Cormorant Garamond', css: "var(--font-eb-garamond), 'Cormorant Garamond', Georgia, serif", tracking: '-0.025em' },
  { label: 'JetBrains Mono (Terminal Grid)', value: 'JetBrains Mono', css: "var(--font-mono), 'JetBrains Mono', monospace", tracking: '-0.01em' },
] as const;

const CTA_RADIUS_OPTIONS = [
  { label: '6px · Archival Spine (Pipes)', radius: '6px', posture: 'archival-spine' as const },
  { label: '9999px · Full Pill + Pedestals (CHB Corporate)', radius: '9999px', posture: 'pedestal-hairline' as const },
  { label: '12px · Warm Tactile Well (Marigold Civic)', radius: '12px', posture: 'warm-well' as const },
  { label: '4px · Crisp Terminal Geometry (Greater >)', radius: '4px', posture: 'terminal-grid' as const },
] as const;

/**
 * Interactive Corporate & Editorial Motion Showcase + 5-Axis Programmable Brand Interface
 * Displayed on the Accént Design System homepage (`design.pipes.pink`) and `/foundations/motion`.
 */
export function AccentHeroMotionShowcase() {
  const [replayKey, setReplayKey] = useState(0);
  const [pairMode, setPairMode] = useState<'design' | 'corporate'>('design');
  const [activeBrand, setActiveBrand] = useState<BrandProfileId>('editorial-sandstone');

  // Interactive Brand Customizer & Optional Agentic Code Injection State
  const [customName, setCustomName] = useState('Playful Principal (Colon Hyphen Bracket)');
  const [customMark, setCustomMark] = useState(': - ]');
  const [customBg, setCustomBg] = useState('#FAF8F5');
  const [customSurface, setCustomSurface] = useState('#F3EEE6');
  const [customInk, setCustomInk] = useState('#111827');
  const [customAccent, setCustomAccent] = useState('#FE299E');
  const [customSky, setCustomSky] = useState('#0A9BE0');
  const [customDisplayFont, setCustomDisplayFont] = useState<string>('Bricolage Grotesque');
  const [customCtaRadius, setCustomCtaRadius] = useState<string>('9999px');
  const [showCodeInjection, setShowCodeInjection] = useState(false);
  const [customCss, setCustomCss] = useState(
    `/* Optional CSS / Agentic Style Extension (scoped to .accent-root) */\n.accent-pedestal {\n  border-top: 1px solid rgba(17, 24, 39, 0.15);\n  padding-top: 1.5rem;\n}`
  );
  const [customRulesText, setCustomRulesText] = useState(
    `Preserve Sovereign Hot Pink (#FE299E) on punctuation marks (: - ]), <Smile /> winks, and <ScaryHeadline /> strike bars.\nUse --a-accent-fill (#B81468) strictly for filled primary CTA buttons carrying white text.\nPrefer open architectural pedestals (border-l / border-t hairlines) over boxed cards.`
  );
  const [customSnippet, setCustomSnippet] = useState('');
  const [copiedState, setCopiedState] = useState<'none' | 'styles' | 'url'>('none');

  const syncCustomizerFromBrand = (id: BrandProfileId) => {
    const p = BRAND_PROFILES[id];
    if (!p) return;
    setCustomName(p.name);
    setCustomMark(p.mark);
    setCustomBg(p.tokens.light['--a-bg']);
    setCustomSurface(p.tokens.light['--a-surface']);
    setCustomInk(p.tokens.light['--a-ink']);
    setCustomAccent(p.tokens.light['--a-accent']);
    setCustomSky(p.tokens.light['--a-sky']);
    setCustomDisplayFont(p.typography.display);
    setCustomCtaRadius(p.structure?.ctaRadius ?? '6px');
    if (p.customExtension?.css) {
      setCustomCss(p.customExtension.css);
    }
    if (p.customExtension?.rules?.length) {
      setCustomRulesText(p.customExtension.rules.join('\n'));
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlBrand = params.get('brand') as BrandProfileId | null;
    const saved = window.localStorage.getItem('accent-brand') as BrandProfileId | null;
    const initial =
      urlBrand && urlBrand in BRAND_PROFILES
        ? urlBrand
        : saved && saved in BRAND_PROFILES
          ? saved
          : 'editorial-sandstone';

    setActiveBrand(initial);
    syncCustomizerFromBrand(initial);
    if (urlBrand && urlBrand in BRAND_PROFILES) {
      applyBrandToDom(urlBrand);
    }

    const onBrandChange = (e: Event) => {
      const custom = e as CustomEvent<BrandProfileId>;
      if (custom.detail && custom.detail in BRAND_PROFILES) {
        setActiveBrand(custom.detail);
        syncCustomizerFromBrand(custom.detail);
      }
    };
    window.addEventListener('accent-brand-change', onBrandChange);
    return () => window.removeEventListener('accent-brand-change', onBrandChange);
  }, []);

  // Inject optional custom CSS extension into live DOM when modified
  useEffect(() => {
    let styleEl = document.getElementById('accent-custom-extension-style') as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'accent-custom-extension-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = customCss;
  }, [customCss]);

  const applyBrandToDom = (id: BrandProfileId) => {
    window.localStorage.setItem('accent-brand', id);
    document.documentElement.classList.add('theme-fade');
    window.setTimeout(() => document.documentElement.classList.remove('theme-fade'), 220);
    document.documentElement.setAttribute('data-accent-brand', id);
    window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: id }));
    const root = document.querySelector('.accent-root') as HTMLElement | null;
    if (root) {
      const mode = (root.getAttribute('data-accent-theme') as 'light' | 'dark') || 'light';
      const vars = BRAND_PROFILES[id].tokens[mode];
      Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
      root.setAttribute('data-accent-brand', id);
    }
  };

  const selectBrand = (id: BrandProfileId) => {
    setActiveBrand(id);
    syncCustomizerFromBrand(id);
    applyBrandToDom(id);
  };

  const derivedAccent = useMemo(
    () => deriveAccessibleAccent(customAccent, customBg),
    [customAccent, customBg]
  );

  const applyLiveCustomTokens = (
    nextBg = customBg,
    nextSurface = customSurface,
    nextInk = customInk,
    nextAccent = customAccent,
    nextSky = customSky,
    nextFont = customDisplayFont,
    nextRadius = customCtaRadius
  ) => {
    const derived = deriveAccessibleAccent(nextAccent, nextBg);
    const fontMeta =
      DISPLAY_FONT_OPTIONS.find((f) => f.value === nextFont) ?? DISPLAY_FONT_OPTIONS[0];
    const root = document.querySelector('.accent-root') as HTMLElement | null;
    if (root) {
      root.style.setProperty('--a-bg', nextBg);
      root.style.setProperty('--a-surface', nextSurface);
      root.style.setProperty('--a-card', nextSurface);
      root.style.setProperty('--a-ink', nextInk);
      root.style.setProperty('--a-accent', nextAccent);
      root.style.setProperty('--a-accent-fill', derived.fillHex);
      root.style.setProperty('--a-accent-text', derived.inlineTextHex);
      root.style.setProperty('--a-accent-fg', derived.fillForegroundHex);
      root.style.setProperty('--a-sky', nextSky);
      root.style.setProperty('--a-font-display', fontMeta.css);
      root.style.setProperty('--a-tracking-display', fontMeta.tracking);
      root.style.setProperty('--a-radius-cta', nextRadius);
    }
  };

  const buildActiveCustomProfile = (): BrandProfile => {
    const base = BRAND_PROFILES[activeBrand];
    const fontMeta =
      DISPLAY_FONT_OPTIONS.find((f) => f.value === customDisplayFont) ?? DISPLAY_FONT_OPTIONS[0];
    const radiusMeta =
      CTA_RADIUS_OPTIONS.find((r) => r.radius === customCtaRadius) ?? CTA_RADIUS_OPTIONS[0];
    const parsedRules = customRulesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    return {
      ...base,
      name: customName || base.name,
      mark: customMark || base.mark,
      typography: {
        ...base.typography,
        display: customDisplayFont,
        displayTracking: fontMeta.tracking,
      },
      structure: {
        ctaRadius: customCtaRadius,
        posture: radiusMeta.posture,
        summary: base.structure?.summary ?? `Adaptive ${radiusMeta.posture} layout with ${customCtaRadius} CTA geometry.`,
      },
      customExtension: {
        css: customCss.trim() || undefined,
        rules: parsedRules.length > 0 ? parsedRules : undefined,
        codeSnippet: customSnippet.trim() || undefined,
      },
      tokens: {
        ...base.tokens,
        light: {
          ...base.tokens.light,
          '--a-bg': customBg,
          '--a-surface': customSurface,
          '--a-card': customSurface,
          '--a-ink': customInk,
          '--a-accent': customAccent,
          '--a-accent-fill': derivedAccent.fillHex,
          '--a-accent-text': derivedAccent.inlineTextHex,
          '--a-accent-fg': derivedAccent.fillForegroundHex,
          '--a-sky': customSky,
          '--a-radius-cta': customCtaRadius,
          '--a-font-display': fontMeta.css,
          '--a-tracking-display': fontMeta.tracking,
        },
      },
    };
  };

  const handleDownloadStylesMd = () => {
    const md = generateStylesMarkdown(buildActiveCustomProfile());
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'STYLES.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyStylesMd = async () => {
    const md = generateStylesMarkdown(buildActiveCustomProfile());
    await navigator.clipboard.writeText(md);
    setCopiedState('styles');
    window.setTimeout(() => setCopiedState('none'), 2200);
  };

  const handleCopyShareUrl = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?brand=${activeBrand}`;
    await navigator.clipboard.writeText(shareUrl);
    setCopiedState('url');
    window.setTimeout(() => setCopiedState('none'), 2200);
  };

  const currentProfile = BRAND_PROFILES[activeBrand];

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
            <Eyebrow mark={currentProfile.mark} color="var(--a-accent)">
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
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-xs font-mono t-press t-color hover:border-[var(--a-ink)] active:scale-[0.97] cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-[var(--a-accent)]" aria-hidden="true" />
              <span>Copy: {pairMode === 'design' ? 'Accént Design' : 'CHB Corporate'}</span>
            </button>
            <AccentButton
              variant="primary"
              onClick={() => setReplayKey((k) => k + 1)}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Replay Entrance</span>
            </AccentButton>
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

      {/* 2. Multi-Brand Theme Presets & 5-Axis Programmable Design Interface */}
      <section
        data-testid="accent-multi-brand-theming"
        aria-labelledby="theming-heading"
        className="rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] p-6 sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3 pb-5 border-b border-[var(--a-rule)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-[var(--a-accent-text)]">
              <Palette className="h-3.5 w-3.5" aria-hidden="true" />
              <span>5-Axis Programmable Design Interface · STYLES.md Governance</span>
            </div>
            <h2 id="theming-heading" className="mt-1 font-serif text-2xl sm:text-3xl font-semibold tracking-tight">
              One Design System, Seven Sovereign Dialects
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--a-muted)]">
            Click any brand to adapt palette, display font, CTA geometry &amp; motion live
          </span>
        </div>

        <p className="mt-4 text-sm sm:text-base leading-7 text-[var(--a-muted)] max-w-[68ch]">
          Accént separates invariant ergonomics (8-point rhythm, ≥ 13px type floor, ≥ 44px touch targets, and WCAG 2.1 AA contrast) from expressive brand dialects. Switching brands below adapts not just colors, but display typography (<code className="font-mono text-xs">--a-font-display</code>), button geometry (<code className="font-mono text-xs">--a-radius-cta</code>), and architectural posture—and compiles directly into a standalone <code className="font-mono text-xs">STYLES.md</code> contract with zero GitHub pull requests required.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BRAND_PROFILE_LIST.map((profile) => {
            const isSelected = activeBrand === profile.id;
            const lightTokens = profile.tokens.light;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={() => selectBrand(profile.id as BrandProfileId)}
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
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-sm border border-[var(--a-rule)] font-mono text-xs text-[var(--a-muted)]">
                        {profile.structure?.ctaRadius ?? '6px'}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-sm bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] font-mono text-xs font-semibold uppercase">
                          Active
                        </span>
                      )}
                    </div>
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
                    {profile.typography.display} · {profile.structure?.posture ?? 'archival-spine'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Brand 5-Axis Dialect Inspector + 7-Product Slot Matrix */}
        <div
          data-testid="accent-dialect-inspector"
          className="mt-6 rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] p-5 sm:p-6 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--a-rule)] pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-accent-text)]">
                Active Dialect Inspector · {currentProfile.id}
              </span>
              <h3 className="font-serif text-xl font-semibold text-[var(--a-ink)]">
                {currentProfile.name} <span className="font-mono text-sm text-[var(--a-accent)]">{currentProfile.mark}</span>
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {currentProfile.productionUrl && (
                <a
                  href={currentProfile.productionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 text-xs font-mono text-[var(--a-ink)] hover:border-[var(--a-ink)]"
                >
                  <span>Live Site: {currentProfile.usedBy}</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              <a
                href={currentProfile.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 text-xs font-mono text-[var(--a-ink)] hover:border-[var(--a-ink)]"
              >
                <GitFork className="h-3.5 w-3.5 text-[var(--a-accent)]" aria-hidden="true" />
                <span>GitHub Repo</span>
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 text-xs">
            <div className="rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] p-4 space-y-1.5">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Axis 1 · Dual-Accent Chromatic</span>
              <p className="font-semibold text-[var(--a-ink)]">
                Mark <code className="font-mono">{currentProfile.tokens.light['--a-accent']}</code> → Fill <code className="font-mono">{currentProfile.tokens.light['--a-accent-fill']}</code>
              </p>
              <p className="text-[var(--a-muted)] leading-5">
                Punctuation marks stay electric; filled CTAs auto-darken for ≥ 4.5:1 WCAG AA contrast.
              </p>
            </div>
            <div className="rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] p-4 space-y-1.5">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Axis 2 · Typographic Voice</span>
              <p className="font-semibold text-[var(--a-ink)]">
                {currentProfile.typography.display} ({currentProfile.typography.displayTracking ?? '-0.02em'})
              </p>
              <p className="text-[var(--a-muted)] leading-5">
                Paired with {currentProfile.typography.serif} prose &amp; {currentProfile.typography.mono} specs.
              </p>
            </div>
            <div className="rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] p-4 space-y-1.5">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Axis 3 · Structural Posture</span>
              <p className="font-semibold text-[var(--a-ink)]">
                {currentProfile.structure?.posture ?? 'archival-spine'} · CTA {currentProfile.structure?.ctaRadius ?? '6px'}
              </p>
              <p className="text-[var(--a-muted)] leading-5">
                {currentProfile.structure?.summary}
              </p>
            </div>
          </div>

          {currentProfile.productSlots && currentProfile.productSlots.length > 0 && (
            <div className="pt-2 border-t border-[var(--a-rule)]">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-ink)] font-semibold">
                  7 Non-Repeating Punctuation Product Signature Colors ({currentProfile.name})
                </span>
                <span className="font-mono text-xs text-[var(--a-muted)]">Zero color collision invariant</span>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {currentProfile.productSlots.map((slot) => (
                  <div
                    key={slot.name}
                    className="flex items-center gap-3 rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] p-3"
                  >
                    <span
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-bold text-white"
                      style={{ backgroundColor: slot.color }}
                    >
                      {slot.mark}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-sm font-semibold text-[var(--a-ink)]">{slot.name}</span>
                        <code className="font-mono text-xs text-[var(--a-muted)]">{slot.color}</code>
                      </div>
                      <p className="text-xs text-[var(--a-muted)] truncate">{slot.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3. Interactive Brand Customizer + Optional Agentic Code Injection Control */}
        <div
          data-testid="accent-brand-studio-customizer"
          className="mt-6 rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] p-5 sm:p-6 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--a-rule)] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--a-accent-text)]">
                <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Self-Service Brand Studio · Zero GitHub PRs Required</span>
              </div>
              <h3 className="font-serif text-xl font-semibold text-[var(--a-ink)]">
                Adapt Accént &amp; Export Your <code className="font-mono text-base">STYLES.md</code> Contract
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCodeInjection((v) => !v)}
                aria-expanded={showCodeInjection}
                data-testid="toggle-code-injection"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] px-3.5 text-xs font-mono font-semibold text-[var(--a-ink)] hover:border-[var(--a-ink)] cursor-pointer"
              >
                <Code2 className="h-4 w-4 text-[var(--a-accent)]" aria-hidden="true" />
                <span>{showCodeInjection ? 'Hide Custom Code Injection' : 'Optional: Inject Custom CSS / Agent Rules'}</span>
              </button>
              <AccentButton variant="primary" onClick={handleDownloadStylesMd}>
                <Download className="h-4 w-4" aria-hidden="true" />
                <span>Download STYLES.md</span>
              </AccentButton>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-xs">
            <label className="space-y-1.5 block">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Brand Name</span>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full min-h-[40px] rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 font-sans text-sm text-[var(--a-ink)]"
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Punctuation Mark</span>
              <input
                type="text"
                value={customMark}
                onChange={(e) => setCustomMark(e.target.value)}
                className="w-full min-h-[40px] rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 font-mono text-sm text-[var(--a-ink)]"
              />
            </label>
            <label className="space-y-1.5 block">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Display Typography</span>
              <select
                value={customDisplayFont}
                onChange={(e) => {
                  setCustomDisplayFont(e.target.value);
                  applyLiveCustomTokens(customBg, customSurface, customInk, customAccent, customSky, e.target.value, customCtaRadius);
                }}
                className="w-full min-h-[40px] rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 font-sans text-sm text-[var(--a-ink)]"
              >
                {DISPLAY_FONT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1.5 block">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">CTA Radius &amp; Posture</span>
              <select
                value={customCtaRadius}
                onChange={(e) => {
                  setCustomCtaRadius(e.target.value);
                  applyLiveCustomTokens(customBg, customSurface, customInk, customAccent, customSky, customDisplayFont, e.target.value);
                }}
                className="w-full min-h-[40px] rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 font-sans text-sm text-[var(--a-ink)]"
              >
                {CTA_RADIUS_OPTIONS.map((opt) => (
                  <option key={opt.radius} value={opt.radius}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-4 text-xs pt-2">
            <label className="space-y-1.5 block">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Canvas (--a-bg)</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customBg}
                  onChange={(e) => {
                    setCustomBg(e.target.value);
                    applyLiveCustomTokens(e.target.value, customSurface, customInk, customAccent, customSky, customDisplayFont, customCtaRadius);
                  }}
                  className="h-10 w-12 cursor-pointer rounded-sm border border-[var(--a-rule)] bg-transparent"
                />
                <input
                  type="text"
                  value={customBg}
                  onChange={(e) => {
                    setCustomBg(e.target.value);
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      applyLiveCustomTokens(e.target.value, customSurface, customInk, customAccent, customSky, customDisplayFont, customCtaRadius);
                    }
                  }}
                  className="w-full min-h-[40px] rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] px-2.5 font-mono text-xs text-[var(--a-ink)]"
                />
              </div>
            </label>

            <label className="space-y-1.5 block">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Primary Ink (--a-ink)</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customInk}
                  onChange={(e) => {
                    setCustomInk(e.target.value);
                    applyLiveCustomTokens(customBg, customSurface, e.target.value, customAccent, customSky, customDisplayFont, customCtaRadius);
                  }}
                  className="h-10 w-12 cursor-pointer rounded-sm border border-[var(--a-rule)] bg-transparent"
                />
                <input
                  type="text"
                  value={customInk}
                  onChange={(e) => {
                    setCustomInk(e.target.value);
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      applyLiveCustomTokens(customBg, customSurface, e.target.value, customAccent, customSky, customDisplayFont, customCtaRadius);
                    }
                  }}
                  className="w-full min-h-[40px] rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] px-2.5 font-mono text-xs text-[var(--a-ink)]"
                />
              </div>
            </label>

            <label className="space-y-1.5 block">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)]">Raw Brand Accent (--a-accent)</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customAccent}
                  onChange={(e) => {
                    setCustomAccent(e.target.value);
                    applyLiveCustomTokens(customBg, customSurface, customInk, e.target.value, customSky, customDisplayFont, customCtaRadius);
                  }}
                  className="h-10 w-12 cursor-pointer rounded-sm border border-[var(--a-rule)] bg-transparent"
                />
                <input
                  type="text"
                  value={customAccent}
                  onChange={(e) => {
                    setCustomAccent(e.target.value);
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                      applyLiveCustomTokens(customBg, customSurface, customInk, e.target.value, customSky, customDisplayFont, customCtaRadius);
                    }
                  }}
                  className="w-full min-h-[40px] rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] px-2.5 font-mono text-xs text-[var(--a-ink)]"
                />
              </div>
            </label>

            <div className="space-y-1.5">
              <span className="font-mono uppercase tracking-wider text-[var(--a-muted)] flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--a-emerald)]" aria-hidden="true" />
                <span>Auto-Derived WCAG CTA Fill</span>
              </span>
              <div className="flex items-center justify-between min-h-[40px] rounded-sm border border-[var(--a-rule)] bg-[var(--a-surface)] px-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-5 w-5 rounded-full border border-black/20"
                    style={{ backgroundColor: derivedAccent.fillHex }}
                  />
                  <code className="font-mono text-xs font-semibold text-[var(--a-ink)]">
                    {derivedAccent.fillHex}
                  </code>
                </div>
                <span className="font-mono text-xs text-[var(--a-emerald)] font-semibold">
                  {derivedAccent.fillContrastRatio}:1 AA
                </span>
              </div>
            </div>
          </div>

          {/* Optional Agentic / Custom Code Injection Drawer */}
          {showCodeInjection && (
            <div
              data-testid="custom-code-injection-drawer"
              className="mt-4 rounded-md border border-[var(--a-accent)]/40 bg-[var(--a-surface)] p-4 sm:p-5 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-accent-text)] font-semibold">
                    Optional Agentic &amp; Custom Code Escape Hatch (customExtension)
                  </span>
                  <p className="text-xs text-[var(--a-muted)] mt-0.5">
                    Need more malleability than the 5 preset axes? Inject custom CSS rules (applied live to this page) or bespoke component invariants—they compile directly into Section 5 of your exported <code className="font-mono">STYLES.md</code>.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <label className="space-y-1.5 block">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-ink)] font-semibold">
                    Live Custom CSS Overrides (Injected into DOM &amp; STYLES.md)
                  </span>
                  <textarea
                    rows={5}
                    value={customCss}
                    onChange={(e) => setCustomCss(e.target.value)}
                    placeholder="/* Custom CSS classes or variable overrides */"
                    className="w-full rounded-sm border border-[var(--a-rule)] bg-[var(--a-bg)] p-3 font-mono text-xs text-[var(--a-ink)] leading-relaxed"
                  />
                </label>

                <label className="space-y-1.5 block">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-ink)] font-semibold">
                    Custom Brand &amp; Component Rules (One rule per line in STYLES.md)
                  </span>
                  <textarea
                    rows={5}
                    value={customRulesText}
                    onChange={(e) => setCustomRulesText(e.target.value)}
                    placeholder="Enter custom architectural rules for your project..."
                    className="w-full rounded-sm border border-[var(--a-rule)] bg-[var(--a-bg)] p-3 font-mono text-xs text-[var(--a-ink)] leading-relaxed"
                  />
                </label>
              </div>

              <label className="space-y-1.5 block">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--a-ink)] font-semibold">
                  Optional Custom Component / Adapter Code Snippet (Included in STYLES.md)
                </span>
                <textarea
                  rows={3}
                  value={customSnippet}
                  onChange={(e) => setCustomSnippet(e.target.value)}
                  placeholder="// Optional TSX/CSS snippet for downstream agents or engineers (e.g. custom pedestal wrapper or bespoke motion)"
                  className="w-full rounded-sm border border-[var(--a-rule)] bg-[var(--a-bg)] p-3 font-mono text-xs text-[var(--a-ink)] leading-relaxed"
                />
              </label>
            </div>
          )}

          <div className="pt-3 border-t border-[var(--a-rule)] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyStylesMd}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 font-mono text-xs font-semibold text-[var(--a-ink)] hover:border-[var(--a-ink)] cursor-pointer"
              >
                {copiedState === 'styles' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--a-emerald)]" aria-hidden="true" />
                    <span>Copied STYLES.md to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[var(--a-accent)]" aria-hidden="true" />
                    <span>Copy STYLES.md</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCopyShareUrl}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--a-rule)] bg-[var(--a-surface)] px-3 font-mono text-xs font-semibold text-[var(--a-ink)] hover:border-[var(--a-ink)] cursor-pointer"
              >
                {copiedState === 'url' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--a-emerald)]" aria-hidden="true" />
                    <span>Copied Shareable Brand URL</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5 text-[var(--a-sky-text)]" aria-hidden="true" />
                    <span>Share ?brand={activeBrand} URL</span>
                  </>
                )}
              </button>
            </div>
            <span className="font-mono text-xs text-[var(--a-muted)]">
              Drop <code className="font-mono">STYLES.md</code> into your repo root · Keep <code className="font-mono">AGENTS.md</code> for operational workflows
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
