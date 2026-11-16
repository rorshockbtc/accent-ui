'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Download,
  Copy,
  Check,
  Sliders,
  ShieldCheck,
  ArrowRight,
  Terminal,
  Search,
  Monitor,
  Smartphone,
  ExternalLink,
  Layers,
  ArrowLeftRight,
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
  ACCENT_WEBSITE_THEMES,
  FINCA_MIRADOR_BASE_CONTENT,
  generateThemeStylesMarkdown,
  renderStandaloneThemeBundle,
  type SiteContentContract,
  type WebsiteThemeId,
  type WebsiteThemeSpec,
} from '@/styles/website-themes';
import { AccentBadge } from '@/components/ui';
import { AnimatePresence, m } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { THEME_FONT_VAR } from '@/components/showcase/theme-fonts';

/** Real theme engine preview: every theme renders its own layout, hero, fonts, and section order. */
function RealThemeStage({
  theme,
  content,
  device,
  compact = false,
}: {
  theme: WebsiteThemeSpec;
  content: SiteContentContract;
  device: 'desktop' | 'mobile';
  compact?: boolean;
}) {
  const html = useMemo(
    () => renderStandaloneThemeBundle(content, theme.id, { includePreviewBridge: true }).html,
    [content, theme]
  );

  const openFull = () => {
    const withBase = html.replace('<head>', `<head><base href="${window.location.origin}/">`);
    const url = URL.createObjectURL(new Blob([withBase], { type: 'text/html' }));
    window.open(url, '_blank', 'noopener');
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-center">
        <div
          className="relative overflow-hidden rounded-2xl border border-[var(--a-rule)] bg-white shadow-sm"
          style={{ width: device === 'mobile' ? 390 : '100%', maxWidth: '100%', height: compact ? 620 : 780 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={`${theme.id}-${content.slug}`}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <iframe
                title={`${theme.name} live preview`}
                srcDoc={html}
                className="h-full w-full border-0"
                data-theme-preview={theme.id}
              />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-[var(--a-muted)]">
          Showing <strong className="font-semibold text-[var(--a-ink)]">{theme.shortName}</strong> with{' '}
          <strong className="font-semibold text-[var(--a-ink)]">{content.businessName}</strong>. Scroll inside the preview.
        </p>
        <button
          type="button"
          onClick={openFull}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[var(--a-ink)] px-4 text-[13px] font-semibold text-[var(--a-ink)] cursor-pointer hover:bg-[var(--a-surface)]"
        >
          <Maximize2 className="h-4 w-4" /> Open full screen
        </button>
      </div>
    </div>
  );
}

/** Side-by-side live comparison of any two Accént website themes. */
function CompareThemesStage({
  leftTheme,
  rightTheme,
  onSelectLeft,
  onSelectRight,
  contentMode,
  device,
}: {
  leftTheme: WebsiteThemeSpec;
  rightTheme: WebsiteThemeSpec;
  onSelectLeft: (theme: WebsiteThemeSpec) => void;
  onSelectRight: (id: WebsiteThemeId) => void;
  contentMode: 'native' | 'same-business';
  device: 'desktop' | 'mobile';
}) {
  const columns = [
    {
      slotLabel: 'Theme A',
      theme: leftTheme,
      onChange: (id: WebsiteThemeId) => {
        const found = ACCENT_WEBSITE_THEMES.find((t) => t.id === id);
        if (found) onSelectLeft(found);
      },
    },
    {
      slotLabel: 'Theme B',
      theme: rightTheme,
      onChange: (id: WebsiteThemeId) => onSelectRight(id),
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
      {columns.map((col) => {
        const content: SiteContentContract =
          contentMode === 'same-business'
            ? { ...FINCA_MIRADOR_BASE_CONTENT, themeId: col.theme.id }
            : col.theme.domainExample;
        return (
          <div
            key={col.slotLabel}
            className="rounded-2xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-4 space-y-3 min-w-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[var(--a-rule)]">
              <span className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-muted)]">
                {col.slotLabel}
              </span>
              <label className="min-w-0 flex-1 max-w-[260px]">
                <span className="sr-only">Choose {col.slotLabel}</span>
                <select
                  value={col.theme.id}
                  onChange={(e) => col.onChange(e.target.value as WebsiteThemeId)}
                  className="w-full min-h-[44px] rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-[13px] font-semibold text-[var(--a-ink)]"
                >
                  {ACCENT_WEBSITE_THEMES.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="text-[13px] leading-snug text-[var(--a-muted)]">
              <strong className="text-[var(--a-ink)]">{col.theme.archetypeLabel}</strong>
              {contentMode === 'same-business' ? ` — ${col.theme.sameBusinessNote}` : ''}
            </p>
            <RealThemeStage theme={col.theme} content={content} device={device} compact />
          </div>
        );
      })}
    </div>
  );
}

/** Plain-English "personality" summary of a website theme (replaces color pickers on this page). */
function ThemePersonality({ theme, playgroundHref }: { theme: WebsiteThemeSpec; playgroundHref: string }) {
  const rows: [string, string][] = [
    ['Best for', theme.bestFor],
    ['Not ideal for', theme.avoidFor],
    ['Page layout', theme.archetypeLabel],
    ['First screen', theme.geometry.heroStyle],
    ['Buttons & corners', theme.personality.buttonShapeLabel],
    ['Voice & feel', theme.personality.voice],
    ['Motion rule', theme.personality.motionProfile],
    ['Fonts', `${theme.typography.displayLabel} headings · ${theme.typography.bodyLabel} text`],
  ];
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-muted)]">About this theme</div>
        <div className="text-[26px] font-semibold leading-tight text-[var(--a-ink)]" style={{ fontFamily: THEME_FONT_VAR[theme.typography.displayLabel] }}>
          {theme.name}
        </div>
        <p className="text-[14px] leading-relaxed text-[var(--a-muted)]">{theme.summary}</p>
        <p
          className="border-l-2 pl-3 text-[15px] italic text-[var(--a-ink)]"
          style={{ borderColor: theme.palette.accent, fontFamily: THEME_FONT_VAR[theme.typography.displayLabel] }}
        >
          “{theme.personality.sampleHeadline}”
        </p>
        <div className="flex gap-1.5 pt-1" aria-label="Theme colors">
          {[theme.palette.bg, theme.palette.ink, theme.palette.accent, theme.palette.focalSurface].map((c, i) => (
            <span key={`${c}-${i}`} className="h-7 w-10 rounded border border-black/15" style={{ backgroundColor: c }} title={c} />
          ))}
        </div>
      </div>
      <dl className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
        {rows.map(([k, v]) => (
          <div key={k} className="py-2.5">
            <dt className="text-[13px] font-semibold text-[var(--a-ink)]">{k}</dt>
            <dd className="text-[13px] leading-snug text-[var(--a-muted)]">{v}</dd>
          </div>
        ))}
      </dl>
      <Link
        href={playgroundHref}
        className="flex w-full min-h-[46px] items-center justify-center gap-2 rounded-full bg-[var(--a-accent-fill,var(--a-accent))] text-sm font-semibold text-white hover:opacity-90"
      >
        Use this theme in Playground →
      </Link>
      <p className="text-[13px] leading-snug text-[var(--a-muted)]">
        Want different colors or fonts? Fine-tune them in Playground after you add your own words.
      </p>
    </div>
  );
}

const DISPLAY_FONT_OPTIONS = [
  {
    label: 'Newsreader (Editorial Serif)',
    value: 'Newsreader',
    css: "var(--font-newsreader), 'Newsreader', Georgia, serif",
    tracking: '-0.02em',
  },
  {
    label: 'Fraunces (Warm Craft Serif)',
    value: 'Fraunces',
    css: "var(--font-serif), 'Fraunces', Georgia, serif",
    tracking: '-0.02em',
  },
  {
    label: 'Bricolage Grotesque (Bold Studio Sans)',
    value: 'Bricolage Grotesque',
    css: "var(--font-bricolage), 'Bricolage Grotesque', system-ui, sans-serif",
    tracking: '-0.035em',
  },
  {
    label: 'Cormorant Garamond (Classic Book Serif)',
    value: 'Cormorant Garamond',
    css: "var(--font-eb-garamond), 'Cormorant Garamond', Georgia, serif",
    tracking: '-0.025em',
  },
  {
    label: 'JetBrains Mono (Technical Mono)',
    value: 'JetBrains Mono',
    css: "var(--font-mono), 'JetBrains Mono', monospace",
    tracking: '-0.01em',
  },
] as const;

const CTA_RADIUS_OPTIONS = [
  { label: 'Full Pill (9999px)', radius: '9999px', posture: 'pedestal-hairline' as const },
  { label: 'Classic Soft Corners (8px)', radius: '8px', posture: 'warm-well' as const },
  { label: 'Archival Hairline (6px)', radius: '6px', posture: 'archival-spine' as const },
  { label: 'Sharp Trade Edge (4px)', radius: '4px', posture: 'terminal-grid' as const },
] as const;

const BRAND_PLAIN_SUBTITLES: Record<BrandProfileId, string> = {
  'editorial-sandstone': 'Warm paper & crimson for libraries and publications',
  'playful-principal': 'Chalk & hot pink :-] for modern creative studios',
  'albers-perspectives': 'Balanced grid & cobalt blue for daily briefings',
  'cassandra-noir': 'Deep bookplate ink & forest green for long essays',
  'hacienda-emerald': 'Warm plaster & pine for hospitality and retreats',
  'terracotta-civic': 'Clay & terracotta for civic ledgers and reports',
  'greater-terminal': 'High-contrast workspace for research & comparisons',
};

function mapFontLabelToValue(label: string): string {
  const lower = label.toLowerCase();
  if (lower.includes('bricolage') || lower.includes('inter') || lower.includes('grotesk')) {
    return 'Bricolage Grotesque';
  }
  if (lower.includes('fraunces')) return 'Fraunces';
  if (lower.includes('cormorant') || lower.includes('garamond') || lower.includes('literata')) {
    return 'Cormorant Garamond';
  }
  if (lower.includes('mono') || lower.includes('jetbrains')) return 'JetBrains Mono';
  return 'Newsreader';
}

function mapWebsiteRadius(raw: string): string {
  if (raw.includes('999')) return '9999px';
  if (raw.includes('8')) return '8px';
  if (raw.includes('6')) return '6px';
  return '4px';
}

export default function AccentThemesStudioPage() {
  const [catalogTab, setCatalogTab] = useState<'websites' | 'brands'>('websites');
  const [selectedWebsiteId, setSelectedWebsiteId] = useState<WebsiteThemeId>('hacienda-hospitality');
  const [compareThemeId, setCompareThemeId] = useState<WebsiteThemeId>('case-study-studio');
  const [stageMode, setStageMode] = useState<'single' | 'compare'>('single');
  const [contentMode, setContentMode] = useState<'native' | 'same-business'>('native');
  const [activeBrand, setActiveBrand] = useState<BrandProfileId>('editorial-sandstone');
  const [previewSurface, setPreviewSurface] = useState<'website' | 'app'>('website');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Customizer token state
  const [customName, setCustomName] = useState<string>(ACCENT_WEBSITE_THEMES[0].name);
  const [customMark, setCustomMark] = useState<string>(': - ]');
  const [customBg, setCustomBg] = useState<string>(ACCENT_WEBSITE_THEMES[0].palette.bg);
  const [customSurface, setCustomSurface] = useState<string>(ACCENT_WEBSITE_THEMES[0].palette.focalSurface);
  const [customInk, setCustomInk] = useState<string>(ACCENT_WEBSITE_THEMES[0].palette.ink);
  const [customAccent, setCustomAccent] = useState<string>(ACCENT_WEBSITE_THEMES[0].palette.accent);
  const [customDisplayFont, setCustomDisplayFont] = useState<string>('Fraunces');
  const [customCtaRadius, setCustomCtaRadius] = useState<string>('8px');

  const [copied, setCopied] = useState<'none' | 'styles' | 'prompt'>('none');
  const [ledgerFilter, setLedgerFilter] = useState('');
  const [activeQaIdx, setActiveQaIdx] = useState(0);

  const selectedWebsiteTheme: WebsiteThemeSpec = useMemo(
    () => ACCENT_WEBSITE_THEMES.find((t) => t.id === selectedWebsiteId) ?? ACCENT_WEBSITE_THEMES[0],
    [selectedWebsiteId]
  );

  const compareWebsiteTheme: WebsiteThemeSpec = useMemo(
    () => ACCENT_WEBSITE_THEMES.find((t) => t.id === compareThemeId) ?? ACCENT_WEBSITE_THEMES[6],
    [compareThemeId]
  );

  const applyWebsiteTheme = (t: WebsiteThemeSpec) => {
    setCatalogTab('websites');
    setSelectedWebsiteId(t.id);
    setCustomName(t.name);
    setCustomMark(t.shortName);
    setCustomBg(t.palette.bg);
    setCustomSurface(t.palette.focalSurface || t.palette.surface);
    setCustomInk(t.palette.ink);
    setCustomAccent(t.palette.accent);
    setCustomDisplayFont(mapFontLabelToValue(t.typography.displayLabel));
    setCustomCtaRadius(mapWebsiteRadius(t.geometry.radius));
  };

  const applyBrandProfile = (p: BrandProfile) => {
    setCatalogTab('brands');
    setActiveBrand(p.id);
    setCustomName(p.name.split('(')[0].trim());
    setCustomMark(p.mark);
    setCustomBg(p.tokens.light['--a-bg']);
    setCustomSurface(p.tokens.light['--a-surface']);
    setCustomInk(p.tokens.light['--a-ink']);
    setCustomAccent(p.tokens.light['--a-accent']);
    setCustomDisplayFont(mapFontLabelToValue(p.typography.display));
    setCustomCtaRadius(p.structure?.ctaRadius ?? '6px');
    window.localStorage.setItem('accent-brand', p.id);
    document.documentElement.setAttribute('data-accent-brand', p.id);
    window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: p.id }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme') as WebsiteThemeId | null;
    const urlBrand = params.get('brand') as BrandProfileId | null;

    if (urlTheme) {
      const match = ACCENT_WEBSITE_THEMES.find((t) => t.id === urlTheme);
      if (match) {
        applyWebsiteTheme(match);
        setPreviewSurface('website');
        return;
      }
    }
    if (urlBrand && urlBrand in BRAND_PROFILES) {
      applyBrandProfile(BRAND_PROFILES[urlBrand]);
      setPreviewSurface('app');
      return;
    }
  }, []);

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
        summary: `${radiusMeta.label} layout with ${customCtaRadius} buttons.`,
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
          '--a-radius-cta': customCtaRadius,
          '--a-font-display': fontMeta.css,
          '--a-tracking-display': fontMeta.tracking,
        },
      },
    };
  };

  const activeStylesMd = () => {
    if (catalogTab === 'websites') {
      return generateThemeStylesMarkdown(selectedWebsiteTheme);
    }
    return generateStylesMarkdown(buildActiveProfile());
  };

  const handleDownloadStylesMd = () => {
    const blob = new Blob([activeStylesMd()], { type: 'text/markdown;charset=utf-8' });
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
    a.download = `${catalogTab === 'websites' ? selectedWebsiteId : activeBrand}.figma-tokens.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyPrompt = async () => {
    const prompt = `Use the "${customName}" Accént theme:
- Page Background: ${customBg}
- Section Tint: ${customSurface}
- Text Color: ${customInk}
- Accent Color: ${customAccent} (accessible button fill: ${derivedAccent.fillHex}, contrast ${derivedAccent.fillContrastRatio}:1)
- Heading Font: ${customDisplayFont}
- Button Corner Radius: ${customCtaRadius}
- Rules: Keep body text >= 13px, interactive buttons >= 44px tall, zero background gradients, and 1px hairline dividers instead of nested cards.`;
    await navigator.clipboard.writeText(prompt);
    setCopied('prompt');
    window.setTimeout(() => setCopied('none'), 2000);
  };

  const exampleSite = selectedWebsiteTheme.domainExample;
  const playgroundHref =
    catalogTab === 'websites'
      ? `/design-system/playground?theme=${selectedWebsiteTheme.id}`
      : `/design-system/playground?brand=${activeBrand}`;

  const QA_SAMPLES = [
    {
      q: 'What actually changes when I pick a new theme?',
      a: 'Everything adjusts together—background warmth, heading font, button corners, and spacing—while Accént locks readable dark/light contrast so text never washes out.',
      tags: ['Accessible Contrast', 'Mobile Ready'],
    },
    {
      q: 'Can I bring my own business colors and still stay readable?',
      a: 'Yes. Pick any brand color under “Accent Color” on the left. Accént automatically darkens button fills slightly when needed so white button labels remain crisp and easy to read.',
      tags: ['Auto Contrast Check', 'Your Brand Colors'],
    },
    {
      q: 'What is STYLES.md and where do I put it?',
      a: 'STYLES.md is a plain text checklist telling Pipes Desktop (BANG!), Claude, Cursor, or any developer the exact colors, fonts, and rules to follow for your site.',
      tags: ['Pipes Desktop', 'Claude / Cursor'],
    },
  ];

  const SAMPLE_DIRECTORY = [
    { id: '01', name: 'Cypress Creek Coffee & Inn', type: 'Hospitality', pages: '4 Sections', status: 'Live POC' },
    { id: '02', name: 'Hearth & Rye Bakery', type: 'Neighborhood Shop', pages: 'Menu + Pre-Order', status: 'Included' },
    { id: '03', name: 'Barton Creek Plumbing', type: 'Home Trades', pages: 'Dispatch + Prices', status: 'Included' },
    { id: '04', name: 'Colon Hyphen Bracket :-]', type: 'Custom Studio', pages: 'Bespoke Sprint', status: 'Studio Tier' },
  ].filter(
    (item) =>
      !ledgerFilter.trim() ||
      item.name.toLowerCase().includes(ledgerFilter.toLowerCase()) ||
      item.type.toLowerCase().includes(ledgerFilter.toLowerCase())
  );

  return (
    <div className="py-10 sm:py-14 space-y-10">
      {/* PLAIN-ENGLISH HEADER + 3-STEP HOW-TO STRIP */}
      <header className="space-y-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <AccentBadge tone="pink">15 Ready Themes</AccentBadge>
            <AccentBadge tone="sky">Built-In Readability Check</AccentBadge>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--a-ink)]">
            Themes: Pick a Starting Look for Your Site or App
          </h1>
          <p className="text-base sm:text-lg text-[var(--a-muted)] leading-relaxed">
            A theme is the whole personality of a site: page layout, first screen, fonts, colors, and pacing. Pick one on the left and the preview on the right rebuilds the entire site, not just the colors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-[var(--a-rule)] py-5">
          <div className="space-y-1">
            <span className="font-mono text-[13px] font-bold text-[var(--a-accent-text)]">
              Step 01 · Pick a Preset
            </span>
            <p className="text-sm font-semibold text-[var(--a-ink)]">
              8 Business Website Themes + 7 App Voices
            </p>
            <p className="text-[13px] text-[var(--a-muted)] leading-relaxed">
              Start with an industry match (coffee shop, bakery, plumber, clinic, studio) or a publication palette.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[13px] font-bold text-[var(--a-accent-text)]">
              Step 02 · Compare Whole Sites
            </span>
            <p className="text-sm font-semibold text-[var(--a-ink)]">
              See the Real Layout, Full Size
            </p>
            <p className="text-[13px] text-[var(--a-muted)] leading-relaxed">
              Each theme changes the layout, hero, fonts, and section order. Open any theme full screen to scroll it like a real site.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[13px] font-bold text-[var(--a-accent-text)]">
              Step 03 · Build or Commission
            </span>
            <p className="text-sm font-semibold text-[var(--a-ink)]">
              Free Style Sheet or Full :-] Sprint
            </p>
            <p className="text-[13px] text-[var(--a-muted)] leading-relaxed">
              Test your own text in the Playground, drop <code className="font-mono">STYLES.md</code> into BANG!, or hire Colon Hyphen Bracket.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN TWO-COLUMN STUDIO */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] gap-8 items-start">
        {/* LEFT CONTROL RAIL */}
        <aside className="rounded-2xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-5 space-y-6">
          {/* Category Switcher: 8 Websites vs 7 App Brands */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)]">
                Choose Starting Preset
              </span>
              <span className="font-mono text-[13px] text-[var(--a-muted)]">15 Total</span>
            </div>

            <div className="grid grid-cols-2 rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-1 gap-1">
              <button
                type="button"
                onClick={() => {
                  setCatalogTab('websites');
                  setPreviewSurface('website');
                }}
                className={`min-h-[42px] px-2.5 rounded-md text-[13px] font-semibold cursor-pointer ${
                  catalogTab === 'websites'
                    ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                    : 'text-[var(--a-ink)] hover:bg-black/5'
                }`}
              >
                Websites (8)
              </button>
              <button
                type="button"
                onClick={() => {
                  setCatalogTab('brands');
                  setPreviewSurface('app');
                }}
                className={`min-h-[42px] px-2.5 rounded-md text-[13px] font-semibold cursor-pointer ${
                  catalogTab === 'brands'
                    ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                    : 'text-[var(--a-ink)] hover:bg-black/5'
                }`}
              >
                Apps &amp; Docs (7)
              </button>
            </div>
          </div>

          {/* Preset Selector List — Clean Single-Level Hairline Rows (Zero Nested Cards) */}
          <div className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)] max-h-[340px] overflow-y-auto">
            {catalogTab === 'websites'
              ? ACCENT_WEBSITE_THEMES.map((t) => {
                  const selected = selectedWebsiteId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => applyWebsiteTheme(t)}
                      aria-pressed={selected}
                      className={`w-full min-h-[56px] py-3 px-2.5 text-left transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                        selected ? 'bg-[var(--a-bg)]' : 'hover:bg-[var(--a-bg)]/60'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-3.5 w-3.5 rounded-full border border-black/20 shrink-0"
                            style={{ backgroundColor: t.palette.accent }}
                            aria-hidden
                          />
                          <span className="font-semibold text-sm text-[var(--a-ink)] truncate">
                            {t.name}
                          </span>
                        </div>
                        <div className="text-[13px] text-[var(--a-muted)] truncate pl-5.5 mt-0.5">
                          {t.bestFor}
                        </div>
                      </div>
                      <span
                        className="h-6 w-6 rounded border border-black/15 shrink-0"
                        style={{ backgroundColor: t.palette.bg }}
                        title={`Paper background ${t.palette.bg}`}
                        aria-hidden
                      />
                    </button>
                  );
                })
              : BRAND_PROFILE_LIST.map((p) => {
                  const selected = activeBrand === p.id;
                  const lt = p.tokens.light;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyBrandProfile(p)}
                      aria-pressed={selected}
                      className={`w-full min-h-[56px] py-3 px-2.5 text-left transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                        selected ? 'bg-[var(--a-bg)]' : 'hover:bg-[var(--a-bg)]/60'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono text-[13px] font-bold shrink-0"
                            style={{ color: lt['--a-accent'] }}
                          >
                            {p.mark}
                          </span>
                          <span className="font-semibold text-sm text-[var(--a-ink)] truncate">
                            {p.name.split('(')[0].trim()}
                          </span>
                        </div>
                        <div className="text-[13px] text-[var(--a-muted)] truncate mt-0.5">
                          {BRAND_PLAIN_SUBTITLES[p.id]}
                        </div>
                      </div>
                      <span
                        className="h-6 w-6 rounded border border-black/15 shrink-0"
                        style={{ backgroundColor: lt['--a-bg'] }}
                        aria-hidden
                      />
                    </button>
                  );
                })}
          </div>

          {catalogTab === 'websites' && (
            <ThemePersonality theme={selectedWebsiteTheme} playgroundHref={playgroundHref} />
          )}

          {/* PLAIN-ENGLISH VISUAL CUSTOMIZER (app & publication voices only) */}
          {catalogTab === 'brands' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)]">
              <Sliders className="h-4 w-4 text-[var(--a-accent)]" />
              <span>Customize Selected Look</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 block">
                <span className="text-[13px] font-medium text-[var(--a-muted)] block">Page Background</span>
                <input
                  type="color"
                  value={customBg}
                  onChange={(e) => setCustomBg(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                />
              </label>
              <label className="space-y-1 block">
                <span className="text-[13px] font-medium text-[var(--a-muted)] block">Section Tint</span>
                <input
                  type="color"
                  value={customSurface}
                  onChange={(e) => setCustomSurface(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                />
              </label>
              <label className="space-y-1 block">
                <span className="text-[13px] font-medium text-[var(--a-muted)] block">Text Color</span>
                <input
                  type="color"
                  value={customInk}
                  onChange={(e) => setCustomInk(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                />
              </label>
              <label className="space-y-1 block">
                <span className="text-[13px] font-medium text-[var(--a-muted)] block">Accent Color</span>
                <input
                  type="color"
                  value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                />
              </label>
            </div>

            <label className="space-y-1 block">
              <span className="text-[13px] font-medium text-[var(--a-muted)] block">Heading Font</span>
              <select
                value={customDisplayFont}
                onChange={(e) => setCustomDisplayFont(e.target.value)}
                className="w-full min-h-[44px] rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
              >
                {DISPLAY_FONT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 block">
              <span className="text-[13px] font-medium text-[var(--a-muted)] block">
                Button &amp; Corner Shape
              </span>
              <select
                value={customCtaRadius}
                onChange={(e) => setCustomCtaRadius(e.target.value)}
                className="w-full min-h-[44px] rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
              >
                {CTA_RADIUS_OPTIONS.map((o) => (
                  <option key={o.radius} value={o.radius}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="pt-2 border-t border-[var(--a-rule)] flex items-center justify-between gap-2 text-[13px]">
              <span className="flex items-center gap-1.5 text-[var(--a-muted)]">
                <ShieldCheck className="h-4 w-4 text-[var(--a-emerald)] shrink-0" />
                <span>Button Readability Check:</span>
              </span>
              <span className="font-mono font-bold text-[var(--a-ink)]">
                {derivedAccent.fillContrastRatio}:1 Pass
              </span>
            </div>
          </div>
          )}

          {/* PLAIN-ENGLISH NEXT ACTIONS */}
          <div className="space-y-2.5 pt-2 border-t border-[var(--a-rule)]">
            {catalogTab === 'brands' && (
            <Link
              href={playgroundHref}
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] hover:opacity-90 text-sm font-semibold transition-all"
            >
              <span>Test Your Business Name &amp; Copy →</span>
            </Link>
            )}

            <button
              type="button"
              onClick={handleDownloadStylesMd}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full border border-[var(--a-ink)] bg-[var(--a-bg)] text-[var(--a-ink)] hover:border-[var(--a-accent)] text-[13px] font-semibold cursor-pointer"
            >
              <Download className="h-4 w-4 text-[var(--a-accent)]" />
              <span>Download Style Sheet (STYLES.md)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-[13px] font-medium text-[var(--a-ink)] hover:border-[var(--a-ink)] cursor-pointer"
              >
                {copied === 'prompt' ? (
                  <>
                    <Check className="h-4 w-4 text-[var(--a-emerald)]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 text-[var(--a-accent)]" />
                    <span>Copy AI Prompt</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadFigmaJson}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-[13px] font-medium text-[var(--a-ink)] hover:border-[var(--a-ink)] cursor-pointer"
              >
                <Terminal className="h-4 w-4 text-[var(--a-accent)]" />
                <span>Figma Tokens</span>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT STAGE: LIVE MULTI-MODE PREVIEW */}
        <div className="space-y-4 min-w-0">
          {/* Preview Mode Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] px-4 py-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPreviewSurface('website')}
                className={`min-h-[40px] px-3.5 rounded-md text-[13px] font-semibold cursor-pointer ${
                  previewSurface === 'website'
                    ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                    : 'text-[var(--a-ink)] hover:bg-black/5'
                }`}
              >
                Business Website Preview
              </button>
              <button
                type="button"
                onClick={() => setPreviewSurface('app')}
                className={`min-h-[40px] px-3.5 rounded-md text-[13px] font-semibold cursor-pointer ${
                  previewSurface === 'app'
                    ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                    : 'text-[var(--a-ink)] hover:bg-black/5'
                }`}
              >
                App &amp; Directory Preview
              </button>
            </div>

            {catalogTab === 'websites' && previewSurface === 'website' && (
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-1">
                  <button
                    type="button"
                    onClick={() => setStageMode('single')}
                    className={`min-h-[38px] px-3 rounded text-[13px] font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                      stageMode === 'single'
                        ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                        : 'text-[var(--a-ink)] hover:bg-black/5'
                    }`}
                  >
                    <Layers className="w-4 h-4" aria-hidden="true" />
                    <span>Single Theme</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStageMode('compare')}
                    className={`min-h-[38px] px-3 rounded text-[13px] font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                      stageMode === 'compare'
                        ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                        : 'text-[var(--a-ink)] hover:bg-black/5'
                    }`}
                  >
                    <ArrowLeftRight className="w-4 h-4" aria-hidden="true" />
                    <span>Compare 2 Themes</span>
                  </button>
                </div>

                <div className="inline-flex rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-1">
                  <button
                    type="button"
                    onClick={() => setContentMode('native')}
                    className={`min-h-[38px] px-3 rounded text-[13px] font-semibold cursor-pointer ${
                      contentMode === 'native'
                        ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                        : 'text-[var(--a-ink)] hover:bg-black/5'
                    }`}
                  >
                    Industry Example
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentMode('same-business')}
                    className={`min-h-[38px] px-3 rounded text-[13px] font-semibold cursor-pointer ${
                      contentMode === 'same-business'
                        ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                        : 'text-[var(--a-ink)] hover:bg-black/5'
                    }`}
                  >
                    Same Business
                  </button>
                </div>
              </div>
            )}

            <div className="inline-flex rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-1">
              <button
                type="button"
                onClick={() => setPreviewDevice('desktop')}
                className={`min-h-[38px] px-3 rounded text-[13px] font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                  previewDevice === 'desktop'
                    ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                    : 'text-[var(--a-ink)]'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Laptop</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice('mobile')}
                className={`min-h-[38px] px-3 rounded text-[13px] font-semibold inline-flex items-center gap-1.5 cursor-pointer ${
                  previewDevice === 'mobile'
                    ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                    : 'text-[var(--a-ink)]'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Phone 390px</span>
              </button>
            </div>
          </div>

          {/* LIVE RENDERED CANVAS */}
          {catalogTab === 'websites' && previewSurface === 'website' ? (
            stageMode === 'compare' ? (
              <CompareThemesStage
                leftTheme={selectedWebsiteTheme}
                rightTheme={compareWebsiteTheme}
                onSelectLeft={applyWebsiteTheme}
                onSelectRight={setCompareThemeId}
                contentMode={contentMode}
                device={previewDevice}
              />
            ) : (
              <RealThemeStage
                theme={selectedWebsiteTheme}
                content={
                  contentMode === 'same-business'
                    ? { ...FINCA_MIRADOR_BASE_CONTENT, themeId: selectedWebsiteTheme.id }
                    : selectedWebsiteTheme.domainExample
                }
                device={previewDevice}
              />
            )
          ) : (
          <div className="flex justify-center">
            <div
              style={{
                width: previewDevice === 'mobile' ? '390px' : '100%',
                maxWidth: '100%',
                backgroundColor: customBg,
                color: customInk,
              }}
              className="rounded-2xl border border-[var(--a-rule)] p-5 sm:p-9 space-y-10 transition-colors duration-200 overflow-hidden"
            >
              {/* TOP BAR INSIDE LIVE PREVIEW */}
              <div
                className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b"
                style={{ borderColor: 'rgba(17,24,39,0.15)' }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: customAccent }}
                    aria-hidden
                  />
                  <span
                    className="text-lg font-semibold tracking-tight"
                    style={{ fontFamily: fontMeta.css }}
                  >
                    {previewSurface === 'website' ? exampleSite.businessName : customName}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[13px]">
                  <span className="opacity-75">About</span>
                  <span className="opacity-75">Services</span>
                  <button
                    type="button"
                    onClick={handleDownloadStylesMd}
                    style={{
                      borderRadius: customCtaRadius,
                      backgroundColor: derivedAccent.fillHex,
                      color: '#FFFFFF',
                    }}
                    className="min-h-[40px] px-4 text-[13px] font-semibold cursor-pointer"
                  >
                    {previewSurface === 'website' ? exampleSite.ctaLabel : 'Use This Look'}
                  </button>
                </div>
              </div>

              {previewSurface === 'website' ? (
                <>
                  {/* BUSINESS HERO + PHOTOGRAPHY */}
                  <section
                    className={`grid gap-8 items-center ${
                      previewDevice === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-12'
                    }`}
                  >
                    <div className={`${previewDevice === 'mobile' ? '' : 'md:col-span-6'} space-y-4`}>
                      <div
                        className="font-mono text-[13px] font-bold uppercase tracking-wider"
                        style={{ color: derivedAccent.inlineTextHex }}
                      >
                        {exampleSite.cityState} · {selectedWebsiteTheme.name}
                      </div>
                      <h2
                        className="text-3xl sm:text-4xl font-semibold leading-tight"
                        style={{ fontFamily: fontMeta.css, letterSpacing: fontMeta.tracking }}
                      >
                        {exampleSite.storyHeading}
                      </h2>
                      <p className="text-sm sm:text-base opacity-80 leading-relaxed">
                        {exampleSite.tagline}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1">
                        <span
                          style={{
                            borderRadius: customCtaRadius,
                            backgroundColor: derivedAccent.fillHex,
                            color: '#FFFFFF',
                          }}
                          className="min-h-[44px] px-5 inline-flex items-center text-sm font-semibold"
                        >
                          {exampleSite.ctaLabel} →
                        </span>
                        <span
                          style={{
                            borderRadius: customCtaRadius,
                            borderColor: 'rgba(17,24,39,0.22)',
                          }}
                          className="min-h-[44px] px-5 inline-flex items-center text-sm font-semibold border"
                        >
                          {exampleSite.secondaryCtaLabel}
                        </span>
                      </div>
                    </div>

                    <div className={previewDevice === 'mobile' ? '' : 'md:col-span-6'}>
                      <img
                        src={exampleSite.heroImageUrl}
                        alt={exampleSite.heroImageAlt}
                        className="w-full h-60 object-cover rounded-xl border border-black/10"
                      />
                    </div>
                  </section>

                  {/* 3-COLUMN SERVICES STRIP (OPEN TOP-RULE PEDESTALS) */}
                  <section className="space-y-4">
                    <div
                      className="font-mono text-[13px] font-bold uppercase tracking-wider"
                      style={{ color: derivedAccent.inlineTextHex }}
                    >
                      {exampleSite.offeringsTitle}
                    </div>
                    <div
                      className={`grid gap-6 ${
                        previewDevice === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'
                      }`}
                    >
                      {exampleSite.offerings.slice(0, 3).map((item, idx) => (
                        <article
                          key={item.name}
                          style={{
                            borderTopWidth: '2px',
                            borderTopColor: idx === 0 ? customAccent : customInk,
                          }}
                          className="pt-4 space-y-2"
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <span
                              className="font-mono text-[13px] font-bold"
                              style={{ color: derivedAccent.inlineTextHex }}
                            >
                              {item.priceOrSpec}
                            </span>
                            {item.badge && (
                              <span className="text-[13px] opacity-65">{item.badge}</span>
                            )}
                          </div>
                          <h3
                            className="text-xl font-semibold"
                            style={{ fontFamily: fontMeta.css }}
                          >
                            {item.name}
                          </h3>
                          <p className="text-sm opacity-80 leading-relaxed">{item.detail}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  {/* FACTS & SCHEDULE TABLE */}
                  <section className="space-y-3">
                    <h3 className="text-xl font-semibold" style={{ fontFamily: fontMeta.css }}>
                      {exampleSite.scheduleOrSpecsTitle}
                    </h3>
                    <div className="divide-y border-y border-black/15">
                      {exampleSite.scheduleOrSpecs.slice(0, 4).map((row) => (
                        <div
                          key={row.label}
                          className="py-3 flex flex-wrap items-baseline justify-between gap-3 text-sm"
                        >
                          <span className="font-semibold">{row.label}</span>
                          <span className="font-mono text-[13px] opacity-85">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                <>
                  {/* APP & DIRECTORY PREVIEW */}
                  <section className="space-y-6">
                    <div className="max-w-2xl space-y-3">
                      <span
                        className="font-mono text-[13px] font-bold uppercase tracking-wider"
                        style={{ color: derivedAccent.inlineTextHex }}
                      >
                        {customMark} · Active App Palette
                      </span>
                      <h2
                        className="text-3xl sm:text-4xl font-semibold leading-tight"
                        style={{ fontFamily: fontMeta.css, letterSpacing: fontMeta.tracking }}
                      >
                        Clear headlines, calm paper surfaces, and readable data tables.
                      </h2>
                      <p className="text-base opacity-80 leading-relaxed">
                        This preview shows how your selected colors and heading font look across a 3-column directory, a guided Q&amp;A helper, and a searchable schedule table.
                      </p>
                    </div>

                    <div
                      className={`grid gap-6 ${
                        previewDevice === 'mobile' ? 'grid-cols-1' : 'md:grid-cols-3'
                      }`}
                    >
                      {[
                        { tag: '01 · Overview', title: 'Clear Story', desc: 'Open columns separated by thin 2px top lines instead of stacked boxes.' },
                        { tag: '02 · Offer', title: 'Direct Actions', desc: 'Primary buttons adjust automatically to stay high-contrast on any shade.' },
                        { tag: '03 · Facts', title: 'Aligned Tables', desc: 'Prices, times, and metrics line up cleanly down every column.' },
                      ].map((col, idx) => (
                        <div
                          key={col.tag}
                          style={{
                            borderTopWidth: '2px',
                            borderTopColor: idx === 0 ? customAccent : customInk,
                          }}
                          className="pt-4 space-y-2"
                        >
                          <div
                            className="font-mono text-[13px] font-bold"
                            style={{ color: derivedAccent.inlineTextHex }}
                          >
                            {col.tag}
                          </div>
                          <h3 className="text-xl font-semibold" style={{ fontFamily: fontMeta.css }}>
                            {col.title}
                          </h3>
                          <p className="text-sm opacity-80 leading-relaxed">{col.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* PLAIN-ENGLISH INTERACTIVE Q&A */}
                  <section
                    style={{ backgroundColor: customSurface }}
                    className="rounded-xl border border-black/12 p-5 space-y-4"
                  >
                    <div className="flex flex-wrap gap-2">
                      {QA_SAMPLES.map((item, idx) => (
                        <button
                          key={item.q}
                          type="button"
                          onClick={() => setActiveQaIdx(idx)}
                          style={{
                            borderRadius: customCtaRadius,
                            backgroundColor: activeQaIdx === idx ? customInk : customBg,
                            color: activeQaIdx === idx ? customBg : customInk,
                          }}
                          className="min-h-[40px] px-3.5 text-[13px] font-medium border border-black/15 cursor-pointer text-left"
                        >
                          {item.q}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed">{QA_SAMPLES[activeQaIdx].a}</p>
                  </section>

                  {/* SEARCHABLE DIRECTORY TABLE */}
                  <section className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-xl font-semibold" style={{ fontFamily: fontMeta.css }}>
                        Sample Project Directory
                      </h3>
                      <div className="relative w-64">
                        <Search
                          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                          style={{ color: customAccent }}
                        />
                        <input
                          type="search"
                          value={ledgerFilter}
                          onChange={(e) => setLedgerFilter(e.target.value)}
                          placeholder="Filter examples…"
                          aria-label="Filter examples"
                          style={{
                            borderRadius: customCtaRadius,
                            backgroundColor: customSurface,
                          }}
                          className="w-full min-h-[40px] pl-9 pr-3 text-[13px] border border-black/15 outline-none"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-sm">
                        <thead>
                          <tr className="border-b-2 border-current text-[13px] font-mono uppercase opacity-70">
                            <th className="py-2.5 pr-4">#</th>
                            <th className="py-2.5 px-3">Project</th>
                            <th className="py-2.5 px-3">Category</th>
                            <th className="py-2.5 px-3">Structure</th>
                            <th className="py-2.5 pl-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/10">
                          {SAMPLE_DIRECTORY.map((row) => (
                            <tr key={row.id}>
                              <td className="py-3 pr-4 font-mono text-[13px] opacity-65 tabular-nums">{row.id}</td>
                              <td className="py-3 px-3 font-medium" style={{ fontFamily: fontMeta.css }}>
                                {row.name}
                              </td>
                              <td className="py-3 px-3 text-[13px] opacity-80">{row.type}</td>
                              <td className="py-3 px-3 font-mono text-[13px] opacity-80">{row.pages}</td>
                              <td
                                className="py-3 pl-3 font-mono text-[13px] font-bold text-right"
                                style={{ color: derivedAccent.inlineTextHex }}
                              >
                                {row.status}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </>
              )}

              {/* PREVIEW FOOTER */}
              <div className="pt-4 border-t border-black/15 flex flex-wrap items-center justify-between gap-3 text-[13px]">
                <span className="font-mono opacity-75">
                  Theme: {customName} · Background {customBg} · Accent {customAccent}
                </span>
                <a
                  href="https://colonhyphenbracket.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-4"
                  style={{ color: derivedAccent.inlineTextHex }}
                >
                  <span>Want Colon Hyphen Bracket (:-]) to build &amp; launch yours?</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
