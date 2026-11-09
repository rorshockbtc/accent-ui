'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Download,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Code2,
  Sliders,
  ShieldCheck,
  ArrowRight,
  Zap,
  Terminal,
  Search,
} from 'lucide-react';
import {
  BRAND_PROFILES,
  BRAND_PROFILE_LIST,
  deriveAccessibleAccent,
  generateStylesMarkdown,
  generateFigmaVariablesJson,
  type BrandProfileId,
  type BrandProfile,
} from '@/styles/themes';
import {
  ScaryHeadline,
  Smile,
  DESIGN_SYSTEM_SCARY_PAIRS,
  HOME_SCARY_PAIRS,
} from '@/components/editorial-motion/AccentBrandMotion';

const DISPLAY_FONT_OPTIONS = [
  {
    label: 'Fraunces (Archival Serif)',
    value: 'Fraunces',
    css: "var(--font-serif), 'Fraunces', Georgia, serif",
    tracking: '-0.02em',
  },
  {
    label: 'Bricolage Grotesque (Playful Principal)',
    value: 'Bricolage Grotesque',
    css: "var(--font-bricolage), 'Bricolage Grotesque', 'Inter', system-ui, sans-serif",
    tracking: '-0.035em',
  },
  {
    label: 'Newsreader (Editorial Classical)',
    value: 'Newsreader',
    css: "var(--font-newsreader), 'Newsreader', Georgia, serif",
    tracking: '-0.02em',
  },
  {
    label: 'Cormorant Garamond (Cassandra Noir)',
    value: 'Cormorant Garamond',
    css: "var(--font-eb-garamond), 'Cormorant Garamond', Georgia, serif",
    tracking: '-0.025em',
  },
  {
    label: 'JetBrains Mono (Terminal Grid)',
    value: 'JetBrains Mono',
    css: "var(--font-mono), 'JetBrains Mono', monospace",
    tracking: '-0.01em',
  },
] as const;

const CTA_RADIUS_OPTIONS = [
  { label: '9999px · Full Pill + Pedestals', radius: '9999px', posture: 'pedestal-hairline' as const },
  { label: '6px · Archival Spine', radius: '6px', posture: 'archival-spine' as const },
  { label: '12px · Warm Tactile Well', radius: '12px', posture: 'warm-well' as const },
  { label: '4px · Crisp Terminal Grid', radius: '4px', posture: 'terminal-grid' as const },
] as const;

export default function AccentThemesStudioPage() {
  const [activeBrand, setActiveBrand] = useState<BrandProfileId>('playful-principal');
  const [customName, setCustomName] = useState(BRAND_PROFILES['playful-principal'].name);
  const [customMark, setCustomMark] = useState(BRAND_PROFILES['playful-principal'].mark);
  const [customBg, setCustomBg] = useState('#FAF8F5');
  const [customSurface, setCustomSurface] = useState('#F3EEE6');
  const [customInk, setCustomInk] = useState('#111827');
  const [customAccent, setCustomAccent] = useState('#FE299E');
  const [customSky, setCustomSky] = useState('#0A9BE0');
  const [customDisplayFont, setCustomDisplayFont] = useState<string>('Bricolage Grotesque');
  const [customCtaRadius, setCustomCtaRadius] = useState<string>('9999px');
  const [copied, setCopied] = useState<'none' | 'styles' | 'prompt'>('none');

  // Interactive states inside the live multi-app preview
  const [followedPipes, setFollowedPipes] = useState<string[]>(['cubby', 'chb', 'bitcoin']);
  const [paymentMethod, setPaymentMethod] = useState<'lightning' | 'card'>('lightning');
  const [ledgerFilter, setLedgerFilter] = useState('');
  const [activePromptIdx, setActivePromptIdx] = useState(0);

  const syncFromBrand = (id: BrandProfileId) => {
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
  };

  useEffect(() => {
    const saved = window.localStorage.getItem('accent-brand') as BrandProfileId | null;
    if (saved && saved in BRAND_PROFILES) {
      setActiveBrand(saved);
      syncFromBrand(saved);
    }
    const onBrandChange = (e: Event) => {
      const custom = e as CustomEvent<BrandProfileId>;
      if (custom.detail && custom.detail in BRAND_PROFILES) {
        setActiveBrand(custom.detail);
        syncFromBrand(custom.detail);
      }
    };
    window.addEventListener('accent-brand-change', onBrandChange);
    return () => window.removeEventListener('accent-brand-change', onBrandChange);
  }, []);

  const selectBrand = (id: BrandProfileId) => {
    setActiveBrand(id);
    syncFromBrand(id);
    window.localStorage.setItem('accent-brand', id);
    document.documentElement.setAttribute('data-accent-brand', id);
    window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: id }));
  };

  const derivedAccent = useMemo(
    () => deriveAccessibleAccent(customAccent, customBg),
    [customAccent, customBg]
  );

  const fontMeta =
    DISPLAY_FONT_OPTIONS.find((f) => f.value === customDisplayFont) ?? DISPLAY_FONT_OPTIONS[0];
  const radiusMeta =
    CTA_RADIUS_OPTIONS.find((r) => r.radius === customCtaRadius) ?? CTA_RADIUS_OPTIONS[0];

  const buildActiveProfile = (): BrandProfile => {
    const base = BRAND_PROFILES[activeBrand];
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
        summary: `Adaptive ${radiusMeta.posture} layout with ${customCtaRadius} CTA geometry.`,
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
    const md = generateStylesMarkdown(buildActiveProfile());
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

  const handleDownloadFigmaJson = () => {
    const figmaJson = JSON.stringify(generateFigmaVariablesJson(buildActiveProfile()), null, 2);
    const blob = new Blob([figmaJson], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeBrand}.figma-tokens.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyStylesMd = async () => {
    const md = generateStylesMarkdown(buildActiveProfile());
    await navigator.clipboard.writeText(md);
    setCopied('styles');
    window.setTimeout(() => setCopied('none'), 2200);
  };

  const handleCopyAgentPrompt = async () => {
    const prompt = `Adopt the Accént "${customName}" (${activeBrand}) dialect for this repository.
1. Fetch the machine-readable rules and style contract:
   - curl -s "https://design.pipes.pink/design-system/styles.md?brand=${activeBrand}" > STYLES.md
   - curl -s "https://design.pipes.pink/design-system/rules.json" > .accent-rules.json
2. Apply our 5-Axis Tokens:
   - Canvas (--a-bg): ${customBg} | Surface (--a-surface): ${customSurface} | Ink (--a-ink): ${customInk}
   - Signature Mark (--a-accent): ${customAccent} (${customMark}) | Accessible CTA Fill (--a-accent-fill): ${derivedAccent.fillHex} (${derivedAccent.fillContrastRatio}:1 WCAG AA)
   - Display Font: ${customDisplayFont} (${fontMeta.tracking}) | CTA Geometry: ${customCtaRadius} (${radiusMeta.posture})
3. Keep AGENTS.md strictly for operational workflows; write all project-specific style or motion extensions into Section 5 (customExtension) of STYLES.md.`;
    await navigator.clipboard.writeText(prompt);
    setCopied('prompt');
    window.setTimeout(() => setCopied('none'), 2200);
  };

  const previewStyle: React.CSSProperties = {
    backgroundColor: customBg,
    color: customInk,
    ['--a-bg' as string]: customBg,
    ['--a-surface' as string]: customSurface,
    ['--a-ink' as string]: customInk,
    ['--a-accent' as string]: customAccent,
    ['--a-accent-fill' as string]: derivedAccent.fillHex,
    ['--a-accent-text' as string]: derivedAccent.inlineTextHex,
    ['--a-sky' as string]: customSky,
    ['--a-radius-cta' as string]: customCtaRadius,
    ['--a-font-display' as string]: fontMeta.css,
  };

  const LEDGER_ITEMS = [
    { id: '01', path: 'pipe\\cubby', title: 'Kyle (Cubby) Studio Notebook', kind: 'Personal', notes: 372, yield: '+$1,420' },
    { id: '02', path: 'pipe\\chb', title: 'Colon-Hyphen-Bracket :-]', kind: 'Business', notes: 48, yield: '+$2,890' },
    { id: '03', path: 'pipe\\optimization', title: 'Trim (~) Context & Token Compiler', kind: 'Utility', notes: 34, yield: '−90% Tokens' },
    { id: '04', path: 'pipe\\bitcoin', title: 'Bitcoin Protocol & Sound Money', kind: 'Topic', notes: 57, yield: '+$980' },
    { id: '05', path: 'pipe\\stoicism', title: 'Classical Stoic Primary Canon', kind: 'Topic', notes: 38, yield: '+$640' },
    { id: '06', path: 'pipe\\website-design', title: 'Accént & Anti-Slop Web Codex', kind: 'Topic', notes: 44, yield: 'MIT FOSS' },
  ].filter(
    (item) =>
      !ledgerFilter.trim() ||
      item.title.toLowerCase().includes(ledgerFilter.toLowerCase()) ||
      item.path.toLowerCase().includes(ledgerFilter.toLowerCase())
  );

  const AGENT_PROMPTS = [
    {
      q: 'How do we adopt Accént motion in highdraw without manual PRs?',
      a: 'Drop STYLES.md in the repo root, wrap the app in <LazyMotion features={domAnimation}>, and declare custom spring curves in Section 5 (customExtension). Zero upstream PRs required.',
      cited: ['pipe\\website-design', 'pipe\\chb', 'STYLES.md'],
    },
    {
      q: 'Why does Accént split --a-accent (#FE299E) from --a-accent-fill (#B81468)?',
      a: 'Electric Hot Pink (#FE299E) makes punctuation marks (: - ]), <Smile /> winks, and strike-through bars pop, while auto-derived #B81468 guarantees 5.6:1 WCAG 2.1 AA contrast with white button text.',
      cited: ['deriveAccessibleAccent()', 'WCAG 2.1 AA'],
    },
    {
      q: 'How does Trim (~) cut Claude & Cursor prompt spend by 90%?',
      a: 'It strips conversational filler, pins frozen project invariants at byte-0 for a 90% repeat-read cache discount, and attaches only the top 3 SHA-256 verified Pipe notes.',
      cited: ['pipe\\optimization', 'MCP Bridge'],
    },
  ];

  return (
    <div className="py-8 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-[360px_minmax(0,1fr)] gap-8 items-start">
        {/* ================= LEFT STICKY RAIL: VISUAL THEME SELECTOR + 5-AXIS TUNER ================= */}
        <aside className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-96px)] lg:overflow-y-auto rounded-2xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-5 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--a-accent-text)] font-bold">
                /// 5-Axis Theme Studio
              </span>
              <span className="font-mono text-xs text-[var(--a-muted)]">7 Dialects</span>
            </div>
            <h1 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-[var(--a-ink)]">
              Themes &amp; Dialects
            </h1>
            <p className="mt-1.5 text-xs leading-5 text-[var(--a-muted)]">
              Accént ships with 7 sovereign brand dialects. Click any dialect below to watch the live multi-app canvas transform its palette, display typography, CTA geometry, and structural posture—then export your <code className="font-mono">STYLES.md</code>.
            </p>
          </div>

          {/* Primary Action Stack (Astryx "Use this theme" / "Try in Playground" + Agent Prompt) */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleDownloadStylesMd}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] hover:opacity-90 font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Use This Theme (STYLES.md)</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadFigmaJson}
              className="w-full min-h-[40px] inline-flex items-center justify-center gap-2 rounded-full border border-[var(--a-accent)]/40 bg-[var(--a-bg)] text-[var(--a-ink)] hover:border-[var(--a-accent)] hover:text-[var(--a-accent)] font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-[var(--a-accent)]" />
              <span>Export Figma Variables (.json)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyAgentPrompt}
                className="min-h-[40px] inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 font-mono text-[11px] font-semibold text-[var(--a-ink)] hover:border-[var(--a-accent)] transition-colors cursor-pointer"
              >
                {copied === 'prompt' ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[var(--a-emerald)]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-[var(--a-accent)]" />
                    <span>Agent Prompt</span>
                  </>
                )}
              </button>

              <Link
                href={`/design-system/playground?brand=${activeBrand}`}
                className="min-h-[40px] inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 font-mono text-[11px] font-semibold text-[var(--a-ink)] hover:border-[var(--a-accent)] transition-colors"
              >
                <Code2 className="h-3.5 w-3.5 text-[var(--a-accent)]" />
                <span>Playground →</span>
              </Link>
            </div>
          </div>

          {/* Visual Dialect Cards */}
          <div className="space-y-2.5 pt-2 border-t border-[var(--a-rule)]">
            <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--a-muted)]">
              Select Sovereign Dialect
            </span>
            {BRAND_PROFILE_LIST.map((profile) => {
              const selected = activeBrand === profile.id;
              const lt = profile.tokens.light;
              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => selectBrand(profile.id)}
                  aria-pressed={selected}
                  className={`w-full text-left rounded-xl p-3.5 border transition-all cursor-pointer ${
                    selected
                      ? 'border-[var(--a-accent)] ring-2 ring-[var(--a-accent)]/25 bg-[var(--a-bg)]'
                      : 'border-[var(--a-rule)] bg-[var(--a-bg)]/60 hover:border-[var(--a-ink)]'
                  }`}
                >
                  <div
                    className="rounded-lg p-3 mb-2.5 border border-black/10 flex items-center justify-between"
                    style={{ backgroundColor: lt['--a-bg'], color: lt['--a-ink'] }}
                  >
                    <div>
                      <span
                        className="font-mono text-xs font-bold block"
                        style={{ color: lt['--a-accent'] }}
                      >
                        {profile.mark}
                      </span>
                      <span
                        className="text-base font-semibold tracking-tight block mt-0.5"
                        style={{ fontFamily: lt['--a-font-display'] }}
                      >
                        {profile.name.split('(')[0].trim()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[lt['--a-surface'], lt['--a-ink'], lt['--a-accent'], lt['--a-sky']].map(
                        (hex, i) => (
                          <span
                            key={i}
                            className="h-4 w-4 rounded-full border border-black/20"
                            style={{ backgroundColor: hex }}
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--a-muted)]">
                    <span>{profile.typography.display}</span>
                    <span>CTA {profile.structure?.ctaRadius ?? '6px'}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live 5-Axis Customizer Controls */}
          <div className="pt-4 border-t border-[var(--a-rule)] space-y-3 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--a-ink)]">
              <Sliders className="h-3.5 w-3.5 text-[var(--a-accent)]" />
              <span>Customize Active Dialect Live</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <label className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--a-muted)] block">Canvas</span>
                <input
                  type="color"
                  value={customBg}
                  onChange={(e) => setCustomBg(e.target.value)}
                  className="h-9 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                />
              </label>
              <label className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--a-muted)] block">Ink</span>
                <input
                  type="color"
                  value={customInk}
                  onChange={(e) => setCustomInk(e.target.value)}
                  className="h-9 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                />
              </label>
              <label className="space-y-1">
                <span className="font-mono text-[11px] text-[var(--a-muted)] block">Accent</span>
                <input
                  type="color"
                  value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="h-9 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                />
              </label>
            </div>

            <label className="space-y-1 block">
              <span className="font-mono text-[11px] text-[var(--a-muted)] block">Display Font</span>
              <select
                value={customDisplayFont}
                onChange={(e) => setCustomDisplayFont(e.target.value)}
                className="w-full min-h-[38px] rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] px-2.5 text-xs text-[var(--a-ink)]"
              >
                {DISPLAY_FONT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 block">
              <span className="font-mono text-[11px] text-[var(--a-muted)] block">
                CTA Geometry &amp; Structural Posture
              </span>
              <select
                value={customCtaRadius}
                onChange={(e) => setCustomCtaRadius(e.target.value)}
                className="w-full min-h-[38px] rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] px-2.5 text-xs text-[var(--a-ink)]"
              >
                {CTA_RADIUS_OPTIONS.map((o) => (
                  <option key={o.radius} value={o.radius}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-2.5 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[var(--a-muted)] flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--a-emerald)]" />
                Auto-WCAG Fill:
              </span>
              <span className="font-mono text-[11px] font-bold text-[var(--a-ink)]">
                {derivedAccent.fillHex} ({derivedAccent.fillContrastRatio}:1 AA)
              </span>
            </div>
          </div>
        </aside>

        {/* ================= RIGHT FULL-CANVAS LIVE MULTI-SURFACE APPLICATION SUITE ================= */}
        <div
          style={previewStyle}
          className="rounded-2xl border border-[var(--a-rule)] p-6 sm:p-10 space-y-14 transition-colors duration-200 shadow-xs"
        >
          {/* SURFACE 01 · Live Studio Top Bar & Editorial Hero */}
          <section className="space-y-10">
            <div
              className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b"
              style={{ borderColor: 'rgba(17,24,39,0.14)' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: customAccent }}
                >
                  {customMark}
                </span>
                <span
                  className="text-lg font-semibold tracking-tight"
                  style={{ fontFamily: fontMeta.css }}
                >
                  {customName.split('(')[0].trim()}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {['Personal Pipes', 'Business Pipes', 'Topic Pipes', 'Trim (~)'].map(
                  (item, i) => (
                    <span
                      key={item}
                      className="px-3 py-1.5"
                      style={{
                        borderRadius: customCtaRadius,
                        backgroundColor: i === 0 ? customInk : 'transparent',
                        color: i === 0 ? customBg : customInk,
                      }}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyStylesMd}
                  style={{
                    borderRadius: customCtaRadius,
                    backgroundColor: customAccent,
                    color: '#FFFFFF',
                  }}
                  className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
                >
                  {copied === 'styles' ? '✓ Copied STYLES.md' : 'Export STYLES.md'}
                </button>
              </div>
            </div>

            {/* Hero Stage with Live ScaryHeadline & Morphing CTAs */}
            <div className="max-w-3xl mx-auto text-center space-y-5 py-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.22em]">
                <span style={{ color: customAccent }}>{customMark}</span>
                <span>5-Axis Live Brand Adaptation · {radiusMeta.posture}</span>
                <Smile className="text-sm" color={customAccent} winkEvery={3000} />
              </div>

              <div
                className="text-4xl sm:text-5xl lg:text-[54px] font-semibold leading-[1.06]"
                style={{
                  fontFamily: fontMeta.css,
                  letterSpacing: fontMeta.tracking,
                }}
              >
                <ScaryHeadline
                  accent={customAccent}
                  inkColor={customInk}
                  struckColor="rgba(17,24,39,0.45)"
                  pairs={
                    activeBrand === 'playful-principal'
                      ? HOME_SCARY_PAIRS
                      : DESIGN_SYSTEM_SCARY_PAIRS
                  }
                />
              </div>

              <p className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto leading-relaxed font-sans">
                Unlike single-theme component libraries, Accént adapts its canvas, optical typography ({customDisplayFont}), button geometry ({customCtaRadius}), and structural posture simultaneously—while locking WCAG 2.1 AA/AAA math in place.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadStylesMd}
                  style={{
                    borderRadius: customCtaRadius,
                    backgroundColor: derivedAccent.fillHex,
                    color: '#FFFFFF',
                  }}
                  className="px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider shadow-sm cursor-pointer"
                >
                  Download STYLES.md ({derivedAccent.fillContrastRatio}:1 AA)
                </button>
                <button
                  type="button"
                  onClick={handleCopyAgentPrompt}
                  style={{
                    borderRadius: customCtaRadius,
                    borderColor: 'rgba(17,24,39,0.25)',
                  }}
                  className="px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider border cursor-pointer"
                >
                  Copy Downstream Agent Prompt
                </button>
              </div>
            </div>
          </section>

          {/* SURFACE 02 · 3-Archetype Open Pedestals (Personal, Business, Topic Pipes) */}
          <section className="space-y-6">
            <div className="flex items-baseline justify-between">
              <span
                className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: customAccent }}
              >
                /// 01 · Open Architectural Pedestals (Zero Boxy Card Soup)
              </span>
              <span className="font-mono text-xs opacity-65">
                Posture: {radiusMeta.posture}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: 'cubby',
                  archetype: '01 · Personal Pipe',
                  path: 'pipe\\cubby',
                  title: 'Kyle (Cubby)',
                  desc: 'Personal working notebook, essays, and product architecture in one sovereign voice.',
                  highlight: true,
                },
                {
                  id: 'chb',
                  archetype: '02 · Business Pipe',
                  path: 'pipe\\chb',
                  title: 'Colon-Hyphen-Bracket',
                  desc: 'The studio source of truth—Accént Design System, Workshop, and verified product docs.',
                  highlight: false,
                },
                {
                  id: 'bitcoin',
                  archetype: '03 · Topic Pipe',
                  path: 'pipe\\bitcoin',
                  title: 'Bitcoin & Sound Money',
                  desc: 'Consensus rules, BIP specifications, and Lightning Network architecture curated by practitioners.',
                  highlight: false,
                },
              ].map((item) => {
                const isFollowed = followedPipes.includes(item.id);
                return (
                  <div
                    key={item.id}
                    style={{
                      borderTopWidth: '2px',
                      borderTopColor: item.highlight ? customAccent : customInk,
                      backgroundColor:
                        radiusMeta.posture === 'warm-well' ? customSurface : 'transparent',
                      padding: radiusMeta.posture === 'warm-well' ? '1.25rem' : '1.25rem 0 0 0',
                      borderRadius:
                        radiusMeta.posture === 'warm-well' ? customCtaRadius : '0px',
                    }}
                    className="flex flex-col justify-between transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold" style={{ color: customAccent }}>
                          {item.path}
                        </span>
                        <span className="opacity-60 uppercase">{item.archetype}</span>
                      </div>
                      <h3
                        className="text-2xl font-normal"
                        style={{
                          fontFamily: fontMeta.css,
                          letterSpacing: fontMeta.tracking,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm opacity-80 leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-black/10 flex items-center justify-between">
                      <a
                        href={`/explore/${item.id}`}
                        className="font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1"
                      >
                        <span>Open Pipe</span>
                        <ArrowRight className="w-3.5 h-3.5" style={{ color: customAccent }} />
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          setFollowedPipes((prev) =>
                            prev.includes(item.id)
                              ? prev.filter((x) => x !== item.id)
                              : [...prev, item.id]
                          )
                        }
                        style={{
                          borderRadius: customCtaRadius,
                          backgroundColor: isFollowed ? customAccent : 'transparent',
                          color: isFollowed ? '#FFFFFF' : customInk,
                          borderColor: isFollowed ? customAccent : 'rgba(17,24,39,0.25)',
                        }}
                        className="px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider border cursor-pointer"
                      >
                        {isFollowed ? '✓ Following' : '+ Follow'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SURFACE 03 & 05 · Split Stage: Semi (; - ]) AI Agent Workbench + 70/30 Checkout Well */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Semi AI Agent & MCP Workbench (7 Cols) */}
            <div
              style={{
                backgroundColor: customSurface,
                borderRadius: customCtaRadius === '9999px' ? '20px' : customCtaRadius,
              }}
              className="lg:col-span-7 border border-black/12 p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: customAccent }}
                  >
                    ; - ]
                  </span>
                  <span
                    className="font-semibold text-lg"
                    style={{ fontFamily: fontMeta.css }}
                  >
                    Semi Socratic Agent &amp; Trim (~) MCP
                  </span>
                </div>
                <span
                  style={{
                    borderRadius: customCtaRadius,
                    backgroundColor: customAccent,
                    color: '#FFFFFF',
                  }}
                  className="px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase"
                >
                  −90% Token Spend
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {AGENT_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePromptIdx(idx)}
                    style={{
                      borderRadius: customCtaRadius,
                      backgroundColor: activePromptIdx === idx ? customInk : customBg,
                      color: activePromptIdx === idx ? customBg : customInk,
                    }}
                    className="px-3 py-1.5 text-xs font-mono border border-black/15 cursor-pointer text-left"
                  >
                    0{idx + 1} · {p.q.slice(0, 42)}…
                  </button>
                ))}
              </div>

              <div
                style={{ backgroundColor: customBg }}
                className="rounded-xl p-4 border border-black/10 space-y-3"
              >
                <p className="font-mono text-xs opacity-65">
                  Q: {AGENT_PROMPTS[activePromptIdx].q}
                </p>
                <p className="text-sm leading-relaxed font-sans">
                  {AGENT_PROMPTS[activePromptIdx].a}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-black/10">
                  <span className="font-mono text-[11px] opacity-60 uppercase">
                    Verified Citations:
                  </span>
                  {AGENT_PROMPTS[activePromptIdx].cited.map((c) => (
                    <span
                      key={c}
                      style={{ color: customAccent }}
                      className="font-mono text-xs font-bold"
                    >
                      [{c}]
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Superstar 70/30 Royalty & Checkout Well (5 Cols) */}
            <div
              style={{
                backgroundColor: customSurface,
                borderRadius: customCtaRadius === '9999px' ? '20px' : customCtaRadius,
              }}
              className="lg:col-span-5 border border-black/12 p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <h3
                  className="text-lg font-semibold"
                  style={{ fontFamily: fontMeta.css }}
                >
                  70/30 Curator Settlement
                </h3>
                <span className="font-mono text-xs font-bold" style={{ color: customAccent }}>
                  $5 Comma / $21 Period
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('lightning')}
                  style={{
                    borderRadius: customCtaRadius,
                    backgroundColor: paymentMethod === 'lightning' ? customInk : customBg,
                    color: paymentMethod === 'lightning' ? customBg : customInk,
                  }}
                  className="py-2 px-3 font-mono text-xs font-bold uppercase border border-black/15 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" style={{ color: customAccent }} />
                  <span>Lightning</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    borderRadius: customCtaRadius,
                    backgroundColor: paymentMethod === 'card' ? customInk : customBg,
                    color: paymentMethod === 'card' ? customBg : customInk,
                  }}
                  className="py-2 px-3 font-mono text-xs font-bold uppercase border border-black/15 cursor-pointer"
                >
                  USD Card
                </button>
              </div>

              <div
                style={{ backgroundColor: customBg }}
                className="rounded-xl p-3.5 border border-black/10 space-y-2 text-xs font-mono"
              >
                <div className="flex justify-between">
                  <span className="opacity-70">Curator Royalty (70%)</span>
                  <span className="font-bold tabular-nums">$14.70 / mo</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Protocol &amp; Custody (30%)</span>
                  <span className="tabular-nums">$6.30 / mo</span>
                </div>
                <div className="pt-2 border-t border-black/10 flex justify-between font-bold">
                  <span>Period Full Tier</span>
                  <span style={{ color: customAccent }} className="tabular-nums">
                    $21.00 / mo
                  </span>
                </div>
              </div>

              <button
                type="button"
                style={{
                  borderRadius: customCtaRadius,
                  backgroundColor: derivedAccent.fillHex,
                  color: '#FFFFFF',
                }}
                className="w-full py-3 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                {paymentMethod === 'lightning'
                  ? 'Settle via Lightning Invoice →'
                  : 'Subscribe with USD Card →'}
              </button>
            </div>
          </section>

          {/* SURFACE 04 · Live Tabular Canon & Royalty Ledger */}
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.2em] block"
                  style={{ color: customAccent }}
                >
                  /// 02 · High-Density Tabular Ledger (tabular-nums)
                </span>
                <h3
                  className="text-2xl font-normal mt-0.5"
                  style={{ fontFamily: fontMeta.css }}
                >
                  Sovereign Canon &amp; Utility Index
                </h3>
              </div>

              <div className="relative w-64">
                <Search
                  className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: customAccent }}
                />
                <input
                  type="search"
                  value={ledgerFilter}
                  onChange={(e) => setLedgerFilter(e.target.value)}
                  placeholder="Filter canons…"
                  aria-label="Filter canons"
                  style={{
                    borderRadius: customCtaRadius,
                    backgroundColor: customSurface,
                  }}
                  className="w-full h-9 pl-9 pr-3 text-xs border border-black/15 outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-current text-xs font-mono uppercase opacity-70">
                    <th className="py-2.5 pr-4">#</th>
                    <th className="py-2.5 px-3">Namespace</th>
                    <th className="py-2.5 px-3">Canon Title</th>
                    <th className="py-2.5 px-3">Archetype</th>
                    <th className="py-2.5 px-3 text-right">Notes</th>
                    <th className="py-2.5 pl-3 text-right">Royalty / Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {LEDGER_ITEMS.map((row) => (
                    <tr key={row.id} className="hover:bg-black/5 transition-colors">
                      <td className="py-3 pr-4 font-mono text-xs opacity-60 tabular-nums">
                        {row.id}
                      </td>
                      <td
                        className="py-3 px-3 font-mono text-xs font-bold"
                        style={{ color: customAccent }}
                      >
                        {row.path}
                      </td>
                      <td
                        className="py-3 px-3 font-medium"
                        style={{ fontFamily: fontMeta.css }}
                      >
                        {row.title}
                      </td>
                      <td className="py-3 px-3 font-mono text-xs opacity-75">{row.kind}</td>
                      <td className="py-3 px-3 font-mono text-xs text-right tabular-nums">
                        {row.notes}
                      </td>
                      <td
                        className="py-3 pl-3 font-mono text-xs font-bold text-right tabular-nums"
                        style={{ color: customAccent }}
                      >
                        {row.yield}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
