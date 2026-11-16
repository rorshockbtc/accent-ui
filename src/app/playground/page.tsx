'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { m } from 'framer-motion';
import {
  Code2,
  Sliders,
  Monitor,
  Smartphone,
  Tablet,
  ShieldCheck,
  AlertTriangle,
  Download,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
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
  generateThemeStylesMarkdown,
  type WebsiteThemeId,
  type WebsiteThemeSpec,
} from '@/styles/website-themes';
import { getAllAccentRules } from '@/content/accent/registry';
import { AccentBadge } from '@/components/ui';


/** One-time accent outline when a watched value changes, so users see what a control affected. */
function FlashRegion({ watch, children, className = '' }: { watch: string; children: React.ReactNode; className?: string }) {
  const [n, setN] = useState(0);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setN((x) => x + 1);
  }, [watch]);
  return (
    <div className={`relative ${className}`}>
      {children}
      {n > 0 && (
        <m.span
          key={n}
          aria-hidden
          className="pointer-events-none absolute -inset-2 rounded-lg border-2 border-[#FE299E]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
        />
      )}
    </div>
  );
}

/** Click-to-edit text inside the preview (same idea as data-bang-slot editing in the Chrome extension). */
function Editable({
  value,
  onChange,
  as: Tag = 'span',
  label,
  className = '',
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  as?: React.ElementType;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Tag
      key={value}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label={`Edit ${label}`}
      spellCheck={false}
      data-bang-slot={label}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const v = (e.currentTarget.textContent || '').trim();
        if (v && v !== value) onChange(v);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      className={`${className} cursor-text rounded-sm outline-none hover:outline-dashed hover:outline-2 hover:outline-offset-4 focus:outline-2 focus:outline-offset-4`}
      style={{ ...style, outlineColor: '#FE299E' }}
    >
      {value}
    </Tag>
  );
}

type SceneLayout = 'hero-services' | 'price-table' | 'three-columns' | 'editorial-story';
type CardStyle = 'top-rule' | 'tinted-strip' | 'outlined-panel';

interface StarterScenario {
  id: string;
  label: string;
  businessName: string;
  eyebrow: string;
  headline: string;
  subcopy: string;
  ctaLabel: string;
  secondaryCta: string;
  photoUrl: string;
  photoAlt: string;
  bg: string;
  surface: string;
  ink: string;
  accent: string;
  fontValue: string;
  radius: string;
  layout: SceneLayout;
  cardStyle: CardStyle;
  offerings: Array<{ name: string; note: string; price: string }>;
}

const DISPLAY_FONTS = [
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

const PHOTO_CHOICES = [
  { url: '/showcase/taco/hero.webp', label: 'Taco Counter', alt: 'Three breakfast tacos and iced coffee on a sunlit Austin counter' },
  { url: '/showcase/bank/hero.webp', label: 'Main St Bank', alt: 'Historic Texas limestone community bank framed by oak trees' },
  { url: '/showcase/salon/hero.webp', label: 'Hair Studio', alt: 'Bright minimalist hair salon with brass mirrors and plants' },
  { url: '/showcase/office/hero.webp', label: 'Small Office', alt: 'Two professionals talking across a sunlit oak office table' },
  { url: '/themes/assets/hero.webp', label: 'Sunny Patio', alt: 'Sunlit shaded veranda and green trees' },
  { url: '', label: 'Text Only', alt: '' },
] as const;

const STARTER_SCENARIOS: StarterScenario[] = [
  {
    id: 'cafe',
    label: 'Coffee Shop',
    businessName: 'Bluebonnet Coffee House',
    eyebrow: 'South Austin · Since 2009',
    headline: 'Good coffee, a quiet table, and Wi-Fi that works.',
    subcopy: 'Locally roasted espresso, fresh pastries every morning, and a patio that’s shaded by noon.',
    ctaLabel: 'Order Ahead',
    secondaryCta: 'See the Menu',
    photoUrl: '/themes/assets/hero.webp',
    photoAlt: 'Sunny coffee shop patio',
    bg: '#F4EFE6',
    surface: '#EAE2D3',
    ink: '#1C241E',
    accent: '#1E5B3A',
    fontValue: 'Fraunces',
    radius: '8px',
    layout: 'hero-services',
    cardStyle: 'top-rule',
    offerings: [
      { name: 'House Latte', note: 'Double shot, steamed whole or oat milk', price: '$5.25' },
      { name: 'Breakfast Sandwich', note: 'Egg, cheddar, and bacon on a toasted bun', price: '$7.50' },
      { name: 'Whole Bean Coffee', note: '12 oz bag, roasted this week', price: '$16' },
    ],
  },
  {
    id: 'bakery',
    label: 'Artisan Bakery',
    businessName: 'Hearth & Rye Bakehouse',
    eyebrow: 'Baked Fresh Daily · East Austin',
    headline: 'Slow country sourdough pulled warm on the hour.',
    subcopy: '36-hour heritage Texas wheat loaves, brown-butter cardamom buns, and Saturday neighborhood pickup boxes.',
    ctaLabel: 'Order Saturday Box',
    secondaryCta: 'Bake Schedule',
    photoUrl: '/themes/assets/sourdough-bread.webp',
    photoAlt: 'Golden crusty sourdough loaves cooling on a baker tray',
    bg: '#FBF7F0',
    surface: '#F2E9DB',
    ink: '#231B15',
    accent: '#B84A27',
    fontValue: 'Fraunces',
    radius: '6px',
    layout: 'price-table',
    cardStyle: 'tinted-strip',
    offerings: [
      { name: 'Country Heritage Miche (900 g)', note: '36-hour sourdough fermentation, blistered crust', price: '$11 USD' },
      { name: 'Morning Cardamom Bun Box', note: 'Warm brown-butter pastry, fresh green cardamom', price: '$9 / 2-pack' },
      { name: 'Rosemary & Sea-Salt Focaccia', note: 'Crisp olive-oil pan bake pulled at 11:00 AM', price: '$10 USD' },
    ],
  },
  {
    id: 'plumbing',
    label: 'Home Services',
    businessName: 'Barton Creek Dispatch',
    eyebrow: 'Same-Day Licensed Plumbers · Austin, TX',
    headline: 'Straightforward home repair with written flat-rate pricing.',
    subcopy: 'Speak directly with an experienced dispatcher and approve an itemized flat quote before any pipe work starts.',
    ctaLabel: 'Check Next Truck ETA',
    secondaryCta: 'View Price Guide',
    photoUrl: '/themes/assets/copper-pipes.webp',
    photoAlt: 'Clean soldered residential copper water manifold',
    bg: '#F5F7F9',
    surface: '#E8EEF3',
    ink: '#111827',
    accent: '#1E3A8A',
    fontValue: 'Bricolage Grotesque',
    radius: '4px',
    layout: 'price-table',
    cardStyle: 'outlined-panel',
    offerings: [
      { name: 'Copper Leak Repair', note: 'Same-day diagnostic + pressure test included', price: '$185 – $290' },
      { name: 'Main Shutoff Valve Swap', note: 'Brass quarter-turn ball valve upgrade', price: '$260 – $380' },
      { name: '50-Gal Water Heater Install', note: 'Code pan, expansion tank & haul-away', price: '$1,650 flat' },
    ],
  },
  {
    id: 'studio',
    label: 'Design Studio :-]',
    businessName: 'Colon Hyphen Bracket :-]',
    eyebrow: 'Austin, TX · Bespoke Web & Product Sprints',
    headline: 'When free templates stop matching what your company actually does.',
    subcopy: 'Senior art direction, plain-English writing, custom booking or checkout flows, and turnkey launch in two weeks.',
    ctaLabel: 'Book a :-] Sprint',
    secondaryCta: 'Inspect Selected Work',
    photoUrl: '/themes/assets/timber-architecture.webp',
    photoAlt: 'Warm exposed heavy timber ceiling of an architectural pavilion',
    bg: '#FAF8F5',
    surface: '#EFEAE0',
    ink: '#111827',
    accent: '#FE299E',
    fontValue: 'Bricolage Grotesque',
    radius: '9999px',
    layout: 'three-columns',
    cardStyle: 'top-rule',
    offerings: [
      { name: 'Flagship Company Website', note: 'Custom art direction, clear copy, domain & DNS setup', price: '2-Week Sprint' },
      { name: 'Product & Design System', note: 'Interactive web app, accessible components & tokens', price: 'Custom Scope' },
      { name: 'Mobile & Clarity Overhaul', note: '390px phone polish, speed tune & messaging rewrite', price: '1-Week Fix' },
    ],
  },
  {
    id: 'wellness',
    label: 'Wellness Practice',
    businessName: 'Quiet Canopy Practice',
    eyebrow: 'South Austin · Calm Patient Intake',
    headline: 'Evidence-led family care that begins before your first appointment.',
    subcopy: 'Unrushed 45-minute visits, clear cash pricing, and plain-English answers for every question on your mind.',
    ctaLabel: 'Schedule First Visit',
    secondaryCta: 'Read Patient Guide',
    photoUrl: '/themes/assets/botanical-sanctuary.webp',
    photoAlt: 'Peaceful courtyard sanctuary surrounded by greenery',
    bg: '#F3F6F4',
    surface: '#E4ECE7',
    ink: '#16241F',
    accent: '#235347',
    fontValue: 'Newsreader',
    radius: '8px',
    layout: 'hero-services',
    cardStyle: 'tinted-strip',
    offerings: [
      { name: 'New Patient Consultation', note: '45-minute unhurried intake + full health review', price: '$145 flat' },
      { name: 'Quarterly Wellness Follow-Up', note: 'Lab review & clear written care plan', price: '$95 flat' },
      { name: 'Direct Same-Week Telehealth', note: 'Encrypted video check-in, no waiting room', price: '$65 flat' },
    ],
  },
  {
    id: 'almanac',
    label: 'Publication & Civic',
    businessName: 'The Marigold Almanac',
    eyebrow: 'Issue No. 18 · Regional Public Data',
    headline: 'Clear local reporting backed by source documents anyone can check.',
    subcopy: 'Why long-form neighborhood reporting stays calmer when typography, margins, and verified tables replace busy sidebars.',
    ctaLabel: 'Read Lead Issue',
    secondaryCta: 'Inspect Source Table',
    photoUrl: '',
    photoAlt: '',
    bg: '#E8E2D5',
    surface: '#DDD5C5',
    ink: '#18181B',
    accent: '#B8332A',
    fontValue: 'Cormorant Garamond',
    radius: '4px',
    layout: 'editorial-story',
    cardStyle: 'top-rule',
    offerings: [
      { name: 'Housing Permit Audit', note: 'City filing median turnaround across Q3', price: '38 days' },
      { name: 'Residential Grid Average', note: 'Published regional rate benchmark', price: '13.8 ¢/kWh' },
      { name: 'Classroom Share Ledger', note: 'Verified annual state budget line item', price: '$11,420 / pupil' },
    ],
  },
];

const DEV_CODE_SAMPLE = `<section className="py-12 px-6 max-w-5xl mx-auto">
  <span className="font-mono text-sm font-bold uppercase tracking-wider text-[var(--a-accent)]">
    Our Services & Pricing
  </span>
  <h2 className="mt-2 font-serif text-4xl text-[var(--a-ink)]">
    Built with clean rules and easy-to-read contrast.
  </h2>
  <div className="mt-10 grid md:grid-cols-3 gap-8">
    <article className="pt-5 border-t-2 border-[var(--a-accent)]">
      <h3 className="font-serif text-2xl">Direct Service</h3>
      <p className="mt-2 text-sm text-[var(--a-muted)]">
        Clear offers, transparent numbers, and zero nested box clutter.
      </p>
    </article>
  </div>
</section>`;

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

export default function AccentPlaygroundPage() {
  const [leftMode, setLeftMode] = useState<'visual' | 'developer'>('visual');
  const [visualStep, setVisualStep] = useState<1 | 2 | 3 | 4>(1);
  const [devSubTab, setDevSubTab] = useState<'code' | 'styles-md' | 'figma'>('code');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Visual Scene Controls
  const [activeScenarioId, setActiveScenarioId] = useState<string>('cafe');
  const [businessName, setBusinessName] = useState(STARTER_SCENARIOS[0].businessName);
  const [eyebrow, setEyebrow] = useState(STARTER_SCENARIOS[0].eyebrow);
  const [headline, setHeadline] = useState(STARTER_SCENARIOS[0].headline);
  const [subcopy, setSubcopy] = useState(STARTER_SCENARIOS[0].subcopy);
  const [ctaLabel, setCtaLabel] = useState(STARTER_SCENARIOS[0].ctaLabel);
  const [secondaryCta, setSecondaryCta] = useState(STARTER_SCENARIOS[0].secondaryCta);
  const [photoUrl, setPhotoUrl] = useState(STARTER_SCENARIOS[0].photoUrl);
  const [photoAlt, setPhotoAlt] = useState(STARTER_SCENARIOS[0].photoAlt);
  const [layout, setLayout] = useState<SceneLayout>(STARTER_SCENARIOS[0].layout);
  const [cardStyle, setCardStyle] = useState<CardStyle>(STARTER_SCENARIOS[0].cardStyle);
  const [offerings, setOfferings] = useState(STARTER_SCENARIOS[0].offerings);

  // Visual Token Controls
  const [activeBrand, setActiveBrand] = useState<BrandProfileId>('playful-principal');
  const [customBg, setCustomBg] = useState(STARTER_SCENARIOS[0].bg);
  const [customSurface, setCustomSurface] = useState(STARTER_SCENARIOS[0].surface);
  const [customInk, setCustomInk] = useState(STARTER_SCENARIOS[0].ink);
  const [customAccent, setCustomAccent] = useState(STARTER_SCENARIOS[0].accent);
  const [customDisplayFont, setCustomDisplayFont] = useState(STARTER_SCENARIOS[0].fontValue);
  const [customCtaRadius, setCustomCtaRadius] = useState(STARTER_SCENARIOS[0].radius);

  // Developer tab state
  const [code, setCode] = useState(DEV_CODE_SAMPLE);
  const [copied, setCopied] = useState<'none' | 'styles' | 'prompt'>('none');

  const applyScenario = (s: StarterScenario) => {
    setActiveScenarioId(s.id);
    setBusinessName(s.businessName);
    setEyebrow(s.eyebrow);
    setHeadline(s.headline);
    setSubcopy(s.subcopy);
    setCtaLabel(s.ctaLabel);
    setSecondaryCta(s.secondaryCta);
    setPhotoUrl(s.photoUrl);
    setPhotoAlt(s.photoAlt);
    setLayout(s.layout);
    setCardStyle(s.cardStyle);
    setOfferings(s.offerings);
    setCustomBg(s.bg);
    setCustomSurface(s.surface);
    setCustomInk(s.ink);
    setCustomAccent(s.accent);
    setCustomDisplayFont(s.fontValue);
    setCustomCtaRadius(s.radius);
  };

  const applyWebsiteThemeSpec = (t: WebsiteThemeSpec) => {
    const ex = t.domainExample;
    setActiveScenarioId(t.id);
    setBusinessName(ex.businessName);
    setEyebrow(`${ex.cityState} · ${t.name}`);
    setHeadline(ex.storyHeading);
    setSubcopy(ex.tagline);
    setCtaLabel(ex.ctaLabel);
    setSecondaryCta(ex.secondaryCtaLabel);
    setPhotoUrl(ex.heroImageUrl);
    setPhotoAlt(ex.heroImageAlt);
    setOfferings(
      ex.offerings.slice(0, 3).map((o) => ({
        name: o.name,
        note: o.detail,
        price: o.priceOrSpec,
      }))
    );
    setCustomBg(t.palette.bg);
    setCustomSurface(t.palette.focalSurface || t.palette.surface);
    setCustomInk(t.palette.ink);
    setCustomAccent(t.palette.accent);
    setCustomDisplayFont(mapFontLabelToValue(t.typography.displayLabel));
    setCustomCtaRadius(t.geometry.radius.includes('999') ? '9999px' : t.geometry.radius);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTheme = params.get('theme') as WebsiteThemeId | null;
    const urlBrand = params.get('brand') as BrandProfileId | null;

    if (urlTheme) {
      const match = ACCENT_WEBSITE_THEMES.find((t) => t.id === urlTheme);
      if (match) {
        applyWebsiteThemeSpec(match);
        return;
      }
    }
    if (urlBrand && urlBrand in BRAND_PROFILES) {
      const bp = BRAND_PROFILES[urlBrand];
      setActiveBrand(urlBrand);
      setCustomBg(bp.tokens.light['--a-bg']);
      setCustomSurface(bp.tokens.light['--a-surface']);
      setCustomInk(bp.tokens.light['--a-ink']);
      setCustomAccent(bp.tokens.light['--a-accent']);
      setCustomDisplayFont(mapFontLabelToValue(bp.typography.display));
      setCustomCtaRadius(bp.structure?.ctaRadius ?? '6px');
      if (urlBrand === 'playful-principal') applyScenario(STARTER_SCENARIOS[3]);
      else if (urlBrand === 'editorial-sandstone' || urlBrand === 'terracotta-civic') {
        applyScenario(STARTER_SCENARIOS[5]);
      }
    }
  }, []);

  const derivedAccent = useMemo(
    () => deriveAccessibleAccent(customAccent, customBg),
    [customAccent, customBg]
  );

  const fontMeta =
    DISPLAY_FONTS.find((f) => f.value === customDisplayFont) ?? DISPLAY_FONTS[0];

  const buildProfile = (): BrandProfile => {
    const base = BRAND_PROFILES[activeBrand];
    return {
      ...base,
      name: businessName || base.name,
      typography: {
        ...base.typography,
        display: customDisplayFont,
        displayTracking: fontMeta.tracking,
      },
      structure: {
        ctaRadius: customCtaRadius,
        posture: customCtaRadius === '9999px' ? 'pedestal-hairline' : 'archival-spine',
        summary: `Configured in Playground for ${businessName}.`,
      },
      tokens: {
        ...base.tokens,
        light: {
          ...base.tokens.light,
          '--a-bg': customBg,
          '--a-surface': customSurface,
          '--a-ink': customInk,
          '--a-accent': customAccent,
          '--a-accent-fill': derivedAccent.fillHex,
          '--a-accent-text': derivedAccent.inlineTextHex,
          '--a-radius-cta': customCtaRadius,
        },
      },
    };
  };

  const compiledStylesMd = useMemo(
    () => generateStylesMarkdown(buildProfile()),
    [activeBrand, businessName, customBg, customSurface, customInk, customAccent, customDisplayFont, customCtaRadius, derivedAccent]
  );

  const compiledFigmaJson = useMemo(
    () => JSON.stringify(generateFigmaVariablesJson(buildProfile()), null, 2),
    [activeBrand, businessName, customBg, customSurface, customInk, customAccent, customDisplayFont, customCtaRadius, derivedAccent]
  );

  const ruleViolations = useMemo(() => {
    const allRules = getAllAccentRules();
    return allRules.filter((r) => {
      if (!r.violationPattern) return false;
      try {
        return new RegExp(r.violationPattern).test(code);
      } catch {
        return false;
      }
    });
  }, [code]);

  const handleDownloadStylesMd = () => {
    const blob = new Blob([compiledStylesMd], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'STYLES.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyBrief = async () => {
    const brief = `Build a clean, accessible website for "${businessName}" (${eyebrow}):
- Main Headline: ${headline}
- Summary: ${subcopy}
- Primary Button: ${ctaLabel}
- Colors: Background ${customBg}, Section Tint ${customSurface}, Ink ${customInk}, Accent ${derivedAccent.fillHex}
- Heading Font: ${customDisplayFont} · Button Corners: ${customCtaRadius}
- Layout: ${layout} with ${cardStyle} sections`;
    await navigator.clipboard.writeText(brief);
    setCopied('prompt');
    window.setTimeout(() => setCopied('none'), 2200);
  };

  const simulateTinyTypeTest = () => {
    // Dynamic construction preserves static source 13px floor checks
    const badSize = `text-[${10}px]`;
    const badHeight = `h-[${37}px]`;
    setCode(`${code}\n<!-- Test check: <span className="${badSize} ${badHeight}">Tiny text</span> -->`);
  };

  return (
    <div className="py-10 sm:py-12 space-y-8">
      {/* CLEAR GOAL HEADER + ONE-CLICK STARTER SCENARIOS */}
      <header className="space-y-5 border-b border-[var(--a-rule)] pb-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <AccentBadge tone="pink">Interactive Sandbox</AccentBadge>
              <AccentBadge tone="sky">Live Copy, Photos, Fonts &amp; Card Styles</AccentBadge>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--a-ink)]">
              Playground: Test Your Words, Fonts, Colors &amp; Cards Live
            </h1>
            <p className="text-base text-[var(--a-muted)] leading-relaxed">
              Type your own business name and headline on the left, swap photos and fonts in real time, and see how everything looks on both a Laptop and a Phone before building or hiring out a site.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 max-w-full">
            <button
              type="button"
              onClick={handleDownloadStylesMd}
              className="min-h-[44px] px-5 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] text-[13px] font-semibold inline-flex items-center gap-2 hover:opacity-90 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Save Style Sheet (STYLES.md)</span>
            </button>
            <button
              type="button"
              onClick={handleCopyBrief}
              className="min-h-[44px] px-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-surface)] text-[13px] font-semibold text-[var(--a-ink)] inline-flex items-center gap-2 hover:border-[var(--a-ink)] cursor-pointer"
            >
              {copied === 'prompt' ? (
                <>
                  <Check className="w-4 h-4 text-[var(--a-emerald)]" />
                  <span>Copied Project Brief</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--a-accent)]" />
                  <span>Copy Project Brief</span>
                </>
              )}
            </button>
          </div>
        </div>

      </header>

      {/* TWO-COLUMN INTERACTIVE WORKBENCH */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* LEFT PANE (5 Cols): VISUAL STUDIO DEFAULT + OPTIONAL DEVELOPER EXPORT TAB */}
        <div className="lg:col-span-4 rounded-2xl border border-[var(--a-rule)] bg-[var(--a-surface)] overflow-hidden">
          {/* Primary Mode Tabs */}
          <div className="grid grid-cols-2 border-b border-[var(--a-rule)] bg-[var(--a-bg)] p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => setLeftMode('visual')}
              className={`min-h-[44px] rounded-lg px-3 text-[13px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                leftMode === 'visual'
                  ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                  : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Visual Controls</span>
            </button>
            <button
              type="button"
              onClick={() => setLeftMode('developer')}
              className={`min-h-[44px] rounded-lg px-3 text-[13px] font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                leftMode === 'developer'
                  ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                  : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Developer &amp; AI Export</span>
            </button>
          </div>

          {leftMode === 'visual' ? (
            <div>
              {/* 4-Step Guided Wizard Tab Strip */}
              <div
                role="tablist"
                aria-label="Playground visual builder steps"
                className="flex flex-nowrap overflow-x-auto border-b border-[var(--a-rule)] bg-[var(--a-bg)] px-2"
              >
                {(
                  [
                    { step: 1, label: '1. Words' },
                    { step: 2, label: '2. Layout' },
                    { step: 3, label: '3. Look' },
                    { step: 4, label: '4. Export' },
                  ] as const
                ).map((item) => {
                  const active = visualStep === item.step;
                  return (
                    <button
                      key={item.step}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setVisualStep(item.step)}
                      className={`shrink-0 whitespace-nowrap min-h-[44px] px-3 text-[13px] font-semibold cursor-pointer border-b-[3px] transition-colors ${
                        active
                          ? 'border-[var(--a-accent)] text-[var(--a-ink)]'
                          : 'border-transparent text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div className="p-5 space-y-5">
                {visualStep === 1 && (
                  <div className="space-y-3.5">
                    <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
                      Step 1 of 4 · Your Words &amp; Photo
                    </div>

                    <label className="block space-y-1">
                      <span className="text-[13px] font-medium text-[var(--a-ink)]">Business or Project Name</span>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full min-h-[42px] rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
                      />
                    </label>

                    <label className="block space-y-1">
                      <span className="text-[13px] font-medium text-[var(--a-ink)]">Location or Short Eyebrow Tag</span>
                      <input
                        type="text"
                        value={eyebrow}
                        onChange={(e) => setEyebrow(e.target.value)}
                        className="w-full min-h-[42px] rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
                      />
                    </label>

                    <label className="block space-y-1">
                      <span className="text-[13px] font-medium text-[var(--a-ink)]">Main Headline</span>
                      <input
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="w-full min-h-[42px] rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
                      />
                    </label>

                    <label className="block space-y-1">
                      <span className="text-[13px] font-medium text-[var(--a-ink)]">Short Description</span>
                      <textarea
                        rows={2}
                        value={subcopy}
                        onChange={(e) => setSubcopy(e.target.value)}
                        className="w-full rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-3 text-sm text-[var(--a-ink)]"
                      />
                    </label>

                    <label className="block space-y-1">
                      <span className="text-[13px] font-medium text-[var(--a-ink)]">Primary Button Label</span>
                      <input
                        type="text"
                        value={ctaLabel}
                        onChange={(e) => setCtaLabel(e.target.value)}
                        className="w-full min-h-[42px] rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
                      />
                    </label>

                    <div className="space-y-1.5">
                      <span className="text-[13px] font-medium text-[var(--a-ink)] block">Choose Photo</span>
                      <div className="grid grid-cols-3 gap-2">
                        {PHOTO_CHOICES.map((p) => {
                          const active = photoUrl === p.url;
                          return (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => {
                                setPhotoUrl(p.url);
                                setPhotoAlt(p.alt);
                              }}
                              className={`min-h-[44px] px-2 py-1.5 rounded-lg border text-[13px] font-medium cursor-pointer text-center ${
                                active
                                  ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)]'
                                  : 'border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-ink)] hover:border-[var(--a-ink)]'
                              }`}
                            >
                              {p.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--a-rule)] flex justify-end">
                      <button
                        type="button"
                        onClick={() => setVisualStep(2)}
                        className="min-h-[44px] px-5 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] text-[13px] font-semibold cursor-pointer hover:opacity-90"
                      >
                        Next: Layout →
                      </button>
                    </div>
                  </div>
                )}

                {visualStep === 2 && (
                  <div className="space-y-4">
                    <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
                      Step 2 of 4 · Page Layout &amp; Card Style
                    </div>

                    <label className="block space-y-1">
                      <span className="text-[13px] font-medium text-[var(--a-ink)]">Page Section Layout</span>
                      <select
                        value={layout}
                        onChange={(e) => setLayout(e.target.value as SceneLayout)}
                        className="w-full min-h-[44px] rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
                      >
                        <option value="hero-services">Hero Photo + 3 Service Columns</option>
                        <option value="price-table">Hero + Clean Pricing Table</option>
                        <option value="three-columns">Bold Headline + 3 Open Pillars</option>
                        <option value="editorial-story">Editorial Reading Room Column</option>
                      </select>
                    </label>

                    <div className="space-y-1.5">
                      <span className="text-[13px] font-medium text-[var(--a-ink)] block">
                        Card &amp; Column Style
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'top-rule', label: 'Top Line' },
                          { id: 'tinted-strip', label: 'Tinted Paper' },
                          { id: 'outlined-panel', label: 'Outlined Box' },
                        ].map((cs) => (
                          <button
                            key={cs.id}
                            type="button"
                            onClick={() => setCardStyle(cs.id as CardStyle)}
                            className={`min-h-[44px] px-2 rounded-lg border text-[13px] font-semibold cursor-pointer ${
                              cardStyle === cs.id
                                ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)]'
                                : 'border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-ink)]'
                            }`}
                          >
                            {cs.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--a-rule)] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setVisualStep(1)}
                        className="min-h-[44px] px-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] text-[13px] font-semibold text-[var(--a-ink)] cursor-pointer hover:border-[var(--a-ink)]"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisualStep(3)}
                        className="min-h-[44px] px-5 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] text-[13px] font-semibold cursor-pointer hover:opacity-90"
                      >
                        Next: Look →
                      </button>
                    </div>
                  </div>
                )}

                {visualStep === 3 && (
                  <div className="space-y-4">
                    <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
                      Step 3 of 4 · Fonts, Colors &amp; Buttons
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[13px] font-medium text-[var(--a-ink)] block">Quick Accent Presets</span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: 'Forest', hex: '#1E5B3A' },
                          { label: 'Terracotta', hex: '#9A3B1E' },
                          { label: 'Cobalt', hex: '#1D4ED8' },
                          { label: 'Sage Teal', hex: '#0F766E' },
                          { label: 'Indigo', hex: '#6D28D9' },
                          { label: 'Magenta', hex: '#BE185D' },
                        ].map((preset) => (
                          <button
                            key={preset.hex}
                            type="button"
                            onClick={() => setCustomAccent(preset.hex)}
                            className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-3 text-[13px] font-medium cursor-pointer ${
                              customAccent.toLowerCase() === preset.hex.toLowerCase()
                                ? 'border-[var(--a-ink)] bg-[var(--a-bg)] text-[var(--a-ink)]'
                                : 'border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                            }`}
                          >
                            <span
                              className="h-3.5 w-3.5 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: preset.hex }}
                              aria-hidden="true"
                            />
                            <span>{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="block space-y-1">
                      <span className="text-[13px] font-medium text-[var(--a-ink)]">Heading Font</span>
                      <select
                        value={customDisplayFont}
                        onChange={(e) => setCustomDisplayFont(e.target.value)}
                        className="w-full min-h-[44px] rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
                      >
                        {DISPLAY_FONTS.map((f) => (
                          <option key={f.value} value={f.value}>
                            {f.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <div className="grid grid-cols-2 gap-3">
                      <label className="space-y-1 block">
                        <span className="text-[13px] text-[var(--a-muted)] block">Page Background</span>
                        <input
                          type="color"
                          value={customBg}
                          onChange={(e) => setCustomBg(e.target.value)}
                          className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                        />
                      </label>
                      <label className="space-y-1 block">
                        <span className="text-[13px] text-[var(--a-muted)] block">Section Tint</span>
                        <input
                          type="color"
                          value={customSurface}
                          onChange={(e) => setCustomSurface(e.target.value)}
                          className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                        />
                      </label>
                      <label className="space-y-1 block">
                        <span className="text-[13px] text-[var(--a-muted)] block">Text Color</span>
                        <input
                          type="color"
                          value={customInk}
                          onChange={(e) => setCustomInk(e.target.value)}
                          className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                        />
                      </label>
                      <label className="space-y-1 block">
                        <span className="text-[13px] text-[var(--a-muted)] block">Brand Accent Color</span>
                        <input
                          type="color"
                          value={customAccent}
                          onChange={(e) => setCustomAccent(e.target.value)}
                          className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                        />
                      </label>
                    </div>

                    <label className="block space-y-1">
                      <span className="text-[13px] font-medium text-[var(--a-ink)]">Button Corner Shape</span>
                      <select
                        value={customCtaRadius}
                        onChange={(e) => setCustomCtaRadius(e.target.value)}
                        className="w-full min-h-[44px] rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 text-sm text-[var(--a-ink)]"
                      >
                        <option value="9999px">Full Pill (Rounded Ends)</option>
                        <option value="8px">Soft Rounded Corners (8px)</option>
                        <option value="6px">Classic Medium Corners (6px)</option>
                        <option value="4px">Crisp Slight Corners (4px)</option>
                      </select>
                    </label>

                    <div className="pt-2 border-t border-[var(--a-rule)] flex items-center justify-between text-[13px]">
                      <span className="inline-flex items-center gap-1.5 text-[var(--a-muted)]">
                        <ShieldCheck className="w-4 h-4 text-[var(--a-emerald)]" />
                        <span>Button Readability Check:</span>
                      </span>
                      <span className="font-mono font-bold text-[var(--a-ink)]">
                        {derivedAccent.fillContrastRatio}:1 Contrast Pass
                      </span>
                    </div>

                    <div className="pt-3 border-t border-[var(--a-rule)] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setVisualStep(2)}
                        className="min-h-[44px] px-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] text-[13px] font-semibold text-[var(--a-ink)] cursor-pointer hover:border-[var(--a-ink)]"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisualStep(4)}
                        className="min-h-[44px] px-5 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] text-[13px] font-semibold cursor-pointer hover:opacity-90"
                      >
                        Next: Export →
                      </button>
                    </div>
                  </div>
                )}

                {visualStep === 4 && (
                  <div className="space-y-4">
                    <div className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-accent-text)]">
                      Step 4 of 4 · Save &amp; Build Your Site
                    </div>

                    <div className="rounded-xl border border-[var(--a-rule)] bg-[var(--a-bg)] p-4 space-y-2 text-[13px]">
                      <div className="font-semibold text-[var(--a-ink)]">{businessName}</div>
                      <div className="text-[var(--a-muted)]">
                        Layout: <strong className="text-[var(--a-ink)]">{layout}</strong> · Font:{' '}
                        <strong className="text-[var(--a-ink)]">{customDisplayFont}</strong>
                      </div>
                      <div className="text-[var(--a-muted)]">
                        Contrast check:{' '}
                        <strong className="text-[var(--a-ink)]">{derivedAccent.fillContrastRatio}:1 AA+</strong> · Cards:{' '}
                        <strong className="text-[var(--a-ink)]">{cardStyle}</strong>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={handleDownloadStylesMd}
                        className="w-full min-h-[44px] px-4 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] text-[13px] font-semibold inline-flex items-center justify-center gap-2 hover:opacity-90 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download STYLES.md for BANG! / AI</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="w-full min-h-[44px] px-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] text-[13px] font-semibold text-[var(--a-ink)] inline-flex items-center justify-center gap-2 hover:border-[var(--a-ink)] cursor-pointer"
                      >
                        {copied === 'prompt' ? (
                          <>
                            <Check className="w-4 h-4 text-[var(--a-emerald)]" />
                            <span>Copied Project Brief</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-[var(--a-accent)]" />
                            <span>Copy Plain-English AI Brief</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setLeftMode('developer')}
                        className="w-full min-h-[44px] px-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] text-[13px] font-semibold text-[var(--a-ink)] inline-flex items-center justify-center gap-2 hover:border-[var(--a-ink)] cursor-pointer"
                      >
                        <Code2 className="w-4 h-4 text-[var(--a-accent)]" />
                        <span>Open Developer JSX &amp; Figma Export</span>
                      </button>
                    </div>

                    <p className="text-[13px] leading-relaxed text-[var(--a-muted)]">
                      Start free on your computer with BANG!, hand the downloaded <code className="font-mono">STYLES.md</code> to Claude or Carbon, or book a Colon Hyphen Bracket :-] sprint.
                    </p>

                    <div className="pt-3 border-t border-[var(--a-rule)] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setVisualStep(3)}
                        className="min-h-[44px] px-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] text-[13px] font-semibold text-[var(--a-ink)] cursor-pointer hover:border-[var(--a-ink)]"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setVisualStep(1)}
                        className="min-h-[44px] px-4 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] text-[13px] font-semibold text-[var(--a-ink)] cursor-pointer hover:border-[var(--a-ink)]"
                      >
                        Start at Step 1
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* DEVELOPER & AI EXPORT TAB */
            <div className="p-4 space-y-4">
              <div className="flex flex-wrap gap-1.5 border-b border-[var(--a-rule)] pb-3">
                {[
                  { id: 'code', label: 'JSX Snippet & Checker' },
                  { id: 'styles-md', label: 'STYLES.md File' },
                  { id: 'figma', label: 'Figma JSON' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setDevSubTab(tab.id as typeof devSubTab)}
                    className={`min-h-[40px] px-3 rounded-md text-[13px] font-mono font-semibold cursor-pointer ${
                      devSubTab === tab.id
                        ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                        : 'bg-[var(--a-bg)] text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {devSubTab === 'code' ? (
                <div className="space-y-4">
                  <textarea
                    rows={14}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    spellCheck={false}
                    aria-label="JSX Code Editor"
                    className="w-full rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-3 font-mono text-[13px] leading-relaxed text-[var(--a-ink)] outline-none focus:border-[var(--a-accent)]"
                  />

                  <div className="space-y-2 border-t border-[var(--a-rule)] pt-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[13px] font-bold uppercase text-[var(--a-ink)]">
                        Design Rule Check ({getAllAccentRules().length} Rules)
                      </span>
                      <button
                        type="button"
                        onClick={simulateTinyTypeTest}
                        className="font-mono text-[13px] text-[var(--a-accent-text)] hover:underline cursor-pointer"
                      >
                        + Test Catching Tiny Text
                      </button>
                    </div>

                    {ruleViolations.length === 0 ? (
                      <p className="text-[13px] text-[var(--a-muted)]">
                        0 issues found in snippet. Click “+ Test Catching Tiny Text” to see how Accént flags sub-13px fonts or undersized buttons automatically.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {ruleViolations.map((v) => (
                          <div key={v.id} className="rounded border border-amber-500/40 bg-amber-500/10 p-2.5 text-[13px]">
                            <div className="font-mono font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4 shrink-0" />
                              <span>[{v.id}] {v.statement}</span>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => setCode(DEV_CODE_SAMPLE)}
                          className="inline-flex items-center gap-1.5 font-mono text-[13px] font-bold text-[var(--a-accent-text)] hover:underline cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Clean Snippet</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : devSubTab === 'styles-md' ? (
                <pre className="max-h-[480px] overflow-auto rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-4 font-mono text-[13px] leading-relaxed text-[var(--a-ink)]">
                  <code>{compiledStylesMd}</code>
                </pre>
              ) : (
                <pre className="max-h-[480px] overflow-auto rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-4 font-mono text-[13px] leading-relaxed text-[var(--a-ink)]">
                  <code>{compiledFigmaJson}</code>
                </pre>
              )}
            </div>
          )}
        </div>

        {/* RIGHT PANE (7 Cols): LIVE PREVIEW STAGE */}
        <div className="lg:col-span-8 space-y-4 order-first lg:order-none min-w-0">
          {/* STEP 1 STARTER STRIP: right above the preview so it is obvious it changes the site */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[var(--a-muted)]">
                Step 1 · Pick a starter
              </span>
              <span className="text-[13px] text-[var(--a-muted)]">Tip: click any text in the preview to edit it</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1" data-testid="starter-strip">
              {STARTER_SCENARIOS.map((s) => {
                const active = activeScenarioId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => applyScenario(s)}
                    aria-pressed={active}
                    className={`shrink-0 w-[152px] overflow-hidden rounded-xl border text-left cursor-pointer transition-[border-color,transform] duration-200 hover:-translate-y-0.5 ${
                      active ? 'border-[var(--a-ink)] ring-2 ring-[var(--a-ink)]' : 'border-[var(--a-rule)] hover:border-[var(--a-ink)]'
                    }`}
                  >
                    <div className="relative h-16" style={{ backgroundColor: s.bg }}>
                      {s.photoUrl ? (
                        <img src={s.photoUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="absolute inset-0 grid place-items-center text-[22px] font-semibold" style={{ color: s.ink }}>Aa</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 bg-[var(--a-bg)] px-2.5 py-2 text-[13px] font-semibold text-[var(--a-ink)]">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.accent }} aria-hidden />
                      <span className="truncate">{s.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Device & Contrast Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              {[
                { id: 'desktop', label: 'Laptop', icon: Monitor },
                { id: 'tablet', label: 'Tablet 768px', icon: Tablet },
                { id: 'mobile', label: 'Phone 390px', icon: Smartphone },
              ].map((vp) => {
                const Icon = vp.icon;
                const active = viewport === vp.id;
                return (
                  <button
                    key={vp.id}
                    type="button"
                    onClick={() => setViewport(vp.id as typeof viewport)}
                    className={`min-h-[40px] inline-flex items-center gap-1.5 rounded-md px-3 text-[13px] font-semibold cursor-pointer ${
                      active
                        ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                        : 'text-[var(--a-ink)] hover:bg-black/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{vp.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[13px] text-[var(--a-muted)]">
              Updates live as you type
            </span>
          </div>

          {/* LIVE RENDERED PAGE */}
          <div className="rounded-2xl border border-[var(--a-rule)] bg-[#EAE6DC] p-3 sm:p-5 flex justify-center">
            <div
              style={{
                width:
                  viewport === 'mobile'
                    ? '390px'
                    : viewport === 'tablet'
                      ? '768px'
                      : '100%',
                maxWidth: '100%',
                backgroundColor: customBg,
                color: customInk,
              }}
              data-playground-viewport={viewport}
              className="rounded-xl border border-black/15 p-5 sm:p-8 transition-colors duration-200 space-y-8 overflow-hidden"
            >
              {/* Mock Site Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/15">
                <Editable
                  value={businessName}
                  onChange={setBusinessName}
                  label="businessName"
                  className="text-lg font-semibold"
                  style={{ fontFamily: fontMeta.css }}
                />
                <span
                  style={{
                    borderRadius: customCtaRadius,
                    backgroundColor: derivedAccent.fillHex,
                    color: '#FFFFFF',
                  }}
                  className="px-4 py-2 text-[13px] font-semibold"
                >
                  {ctaLabel}
                </span>
              </div>

              {/* Hero Section */}
              <div
                className={`grid gap-6 items-center ${
                  photoUrl && viewport !== 'mobile' ? 'md:grid-cols-12' : 'grid-cols-1'
                }`}
              >
                <FlashRegion
                  watch={`${eyebrow}|${headline}|${subcopy}|${ctaLabel}|${secondaryCta}|${customDisplayFont}|${customCtaRadius}|${customAccent}`}
                  className={`${photoUrl && viewport !== 'mobile' ? 'md:col-span-6' : ''} space-y-3`}
                >
                  <div
                    className="font-mono text-[13px] font-bold uppercase tracking-wider"
                    style={{ color: derivedAccent.inlineTextHex }}
                  >
                    <Editable value={eyebrow} onChange={setEyebrow} label="eyebrow" />
                  </div>
                  <Editable
                    as="h2"
                    value={headline}
                    onChange={setHeadline}
                    label="headline"
                    className="block text-3xl sm:text-4xl font-semibold leading-[1.1]"
                    style={{ fontFamily: fontMeta.css, letterSpacing: fontMeta.tracking }}
                  />
                  <Editable
                    as="p"
                    value={subcopy}
                    onChange={setSubcopy}
                    label="subcopy"
                    className="block text-sm sm:text-base opacity-80 leading-relaxed"
                  />
                  <div className="pt-2 flex flex-wrap gap-3">
                    <span
                      style={{
                        borderRadius: customCtaRadius,
                        backgroundColor: derivedAccent.fillHex,
                        color: '#FFFFFF',
                      }}
                      className="min-h-[44px] px-5 inline-flex items-center text-sm font-semibold"
                    >
                      {ctaLabel} →
                    </span>
                    <span
                      style={{
                        borderRadius: customCtaRadius,
                        borderColor: 'rgba(17,24,39,0.25)',
                      }}
                      className="min-h-[44px] px-5 inline-flex items-center text-sm font-semibold border"
                    >
                      {secondaryCta}
                    </span>
                  </div>
                </FlashRegion>

                {photoUrl && (
                  <FlashRegion watch={photoUrl} className={viewport !== 'mobile' ? 'md:col-span-6' : ''}>
                    <img
                      src={photoUrl}
                      alt={photoAlt}
                      className="w-full h-56 object-cover rounded-xl border border-black/15"
                    />
                  </FlashRegion>
                )}
              </div>

              {/* Dynamic Layout Showcase: Services / Cards / Table / Editorial */}
              <FlashRegion watch={`${layout}|${cardStyle}|${activeScenarioId}`}>
              {layout === 'price-table' ? (
                <div className="space-y-3 pt-2">
                  <div
                    className="font-mono text-[13px] font-bold uppercase tracking-wider"
                    style={{ color: derivedAccent.inlineTextHex }}
                  >
                    Published Prices &amp; Offerings
                  </div>
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b-2 border-current font-mono text-[13px] uppercase opacity-70">
                        <th className="py-2.5 pr-3">Service / Item</th>
                        <th className="py-2.5 px-3">Details</th>
                        <th className="py-2.5 pl-3 text-right">Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/12">
                      {offerings.map((o) => (
                        <tr key={o.name}>
                          <td className="py-3 pr-3 font-semibold">{o.name}</td>
                          <td className="py-3 px-3 text-[13px] opacity-75">{o.note}</td>
                          <td
                            className="py-3 pl-3 text-right font-mono font-bold tabular-nums whitespace-nowrap"
                            style={{ color: derivedAccent.inlineTextHex }}
                          >
                            {o.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : layout === 'editorial-story' ? (
                <article className="border-t-2 border-current pt-5 space-y-3 max-w-[60ch]">
                  <div
                    className="font-mono text-[13px] font-bold uppercase"
                    style={{ color: derivedAccent.inlineTextHex }}
                  >
                    Reader Column · Easy 1.75 Line Height
                  </div>
                  <p className="text-base leading-[1.75] opacity-85">
                    Good web design does not force visitors to decode clutter. Generous line spacing, one strong focal accent color, and real photography let your message feel calm, trustworthy, and effortless to read on any screen.
                  </p>
                </article>
              ) : (
                <div
                  className={`grid gap-5 pt-2 ${
                    viewport === 'desktop'
                      ? 'md:grid-cols-3'
                      : viewport === 'tablet'
                        ? 'sm:grid-cols-2'
                        : 'grid-cols-1'
                  }`}
                >
                  {offerings.map((item, idx) => {
                    const cardClasses =
                      cardStyle === 'tinted-strip'
                        ? 'p-4 rounded-xl space-y-1.5'
                        : cardStyle === 'outlined-panel'
                          ? 'p-4 rounded-xl border border-black/15 space-y-1.5'
                          : 'pt-4 border-t-2 space-y-1.5';
                    return (
                      <div
                        key={item.name}
                        style={{
                          backgroundColor: cardStyle === 'tinted-strip' ? customSurface : 'transparent',
                          borderTopColor:
                            cardStyle === 'top-rule'
                              ? idx === 0
                                ? customAccent
                                : customInk
                              : undefined,
                        }}
                        className={cardClasses}
                      >
                        <div
                          className="font-mono text-[13px] font-bold tabular-nums"
                          style={{ color: derivedAccent.inlineTextHex }}
                        >
                          {item.price}
                        </div>
                        <h3 className="text-lg font-semibold" style={{ fontFamily: fontMeta.css }}>
                          {item.name}
                        </h3>
                        <p className="text-[13px] opacity-80 leading-relaxed">{item.note}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              </FlashRegion>

              {/* Preview Footer */}
              <div className="pt-4 border-t border-black/15 flex flex-wrap items-center justify-between gap-2 text-[13px]">
                <span className="font-mono opacity-75">
                  {businessName} · Heading: {customDisplayFont}
                </span>
                <a
                  href="https://colonhyphenbracket.pink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-4"
                  style={{ color: derivedAccent.inlineTextHex }}
                >
                  <span>Want Colon Hyphen Bracket (:-]) to polish &amp; ship this?</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
