'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Code2,
  Palette,
  FileCode2,
  Monitor,
  Smartphone,
  ShieldCheck,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import {
  BRAND_PROFILES,
  BRAND_PROFILE_LIST,
  deriveAccessibleAccent,
  generateStylesMarkdown,
  type BrandProfileId,
  type BrandProfile,
} from '@/styles/themes';
import { getAllAccentRules } from '@/content/accent/registry';
import {
  ScaryHeadline,
  Smile,
  RiseLines,
  HOME_SCARY_PAIRS,
  DESIGN_SYSTEM_SCARY_PAIRS,
} from '@/components/editorial-motion/AccentBrandMotion';

type TemplateId =
  | 'archetype-pedestals'
  | 'chb-hero'
  | 'agent-workbench'
  | 'thesis-edition'
  | 'tabular-ledger';

const PLAYGROUND_TEMPLATES: Record<
  TemplateId,
  { label: string; description: string; defaultCode: string }
> = {
  'archetype-pedestals': {
    label: '01 · 3-Archetype Discovery Pedestals',
    description: 'Open border-t-2 architectural pedestals showing Personal, Business, and Topic Pipes.',
    defaultCode: `<section className="py-12 px-6 max-w-5xl mx-auto">
  <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--a-accent)]">
    ||| One Address · Three Ways to Use It ; - ]
  </span>
  <h2 className="mt-2 font-serif text-4xl text-[var(--a-ink)]">
    Personal, Business & Topic Pipes.
  </h2>
  <div className="mt-10 grid md:grid-cols-3 gap-8">
    <article className="pt-5 border-t-2 border-[var(--a-accent)]">
      <span className="font-mono text-xs font-bold text-[var(--a-accent)]">pipe\\cubby</span>
      <h3 className="mt-2 font-serif text-2xl">Kyle (Cubby)</h3>
      <p className="mt-2 text-sm text-[var(--a-muted)]">
        Personal working notebook, essays, and product architecture in his own voice.
      </p>
    </article>
    <article className="pt-5 border-t-2 border-[var(--a-ink)]">
      <span className="font-mono text-xs font-bold text-[var(--a-accent)]">pipe\\chb</span>
      <h3 className="mt-2 font-serif text-2xl">Colon-Hyphen-Bracket</h3>
      <p className="mt-2 text-sm text-[var(--a-muted)]">
        Studio source of truth housing Accént, Workshop, and verified product docs.
      </p>
    </article>
    <article className="pt-5 border-t-2 border-[var(--a-ink)]">
      <span className="font-mono text-xs font-bold text-[var(--a-accent)]">pipe\\bitcoin</span>
      <h3 className="mt-2 font-serif text-2xl">Bitcoin & Sound Money</h3>
      <p className="mt-2 text-sm text-[var(--a-muted)]">
        Consensus rules, BIP specifications, and Lightning Network architecture.
      </p>
    </article>
  </div>
</section>`,
  },
  'chb-hero': {
    label: '02 · CHB Corporate Hero + ScaryHeadline',
    description: 'Tier 2 editorial choreography with 3-phase strike-through ScaryHeadline and Smile wink.',
    defaultCode: `<section className="py-14 px-6 max-w-4xl mx-auto">
  <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em]">
    <span className="text-[var(--a-accent)]">: - ]</span>
    <span>Playful-Principal Flagship</span>
    <Smile color="var(--a-accent)" winkEvery={2800} />
  </div>
  <div className="mt-4 font-serif text-5xl leading-[1.05]">
    <ScaryHeadline
      accent="var(--a-accent)"
      inkColor="var(--a-ink)"
      struckColor="var(--a-muted)"
      pairs={HOME_SCARY_PAIRS}
    />
  </div>
  <p className="mt-5 text-base text-[var(--a-muted)] max-w-xl leading-relaxed">
    One principal, zero handoffs, shipped production code. Governed by STYLES.md and 200+ machine-readable Accént rules.
  </p>
  <div className="mt-8 flex flex-wrap gap-3">
    <button className="min-h-[44px] px-6 rounded-[var(--a-radius-cta)] bg-[var(--a-accent-fill)] text-white font-mono text-xs font-bold uppercase tracking-wider">
      Download STYLES.md →
    </button>
  </div>
</section>`,
  },
  'agent-workbench': {
    label: '03 · Semi (; - ]) AI Agent & Trim (~) Stage',
    description: 'Socratic agent citation workbench with 90% token compression metrics.',
    defaultCode: `<section className="p-6 rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)]">
  <div className="flex items-center justify-between pb-4 border-b border-[var(--a-rule)]">
    <span className="font-mono text-xs font-bold text-[var(--a-accent)]">
      ; - ] Semi Agent · pipe\\optimization (~)
    </span>
    <span className="px-2.5 py-1 rounded-full bg-[var(--a-accent-fill)] text-white font-mono text-xs font-bold">
      −90% Token Burn
    </span>
  </div>
  <p className="mt-4 text-sm leading-relaxed text-[var(--a-ink)]">
    Pinned 14 project rules at byte-0 and retrieved 3 SHA-256 verified slices from pipe\\website-design.
  </p>
</section>`,
  },
  'thesis-edition': {
    label: '04 · Sovereign Thesis Edition Spine',
    description: '3-column academic & investigative monograph layout with marginalia.',
    defaultCode: `<article className="py-10 px-6 max-w-4xl mx-auto border-t-2 border-[var(--a-ink)]">
  <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[var(--a-accent)]">
    Thesis Edition · Vol. IV
  </span>
  <h1 className="mt-2 font-serif text-4xl leading-tight text-[var(--a-ink)]">
    Why Engineered Drift Beats Monolithic Design Systems
  </h1>
  <p className="mt-4 text-base leading-relaxed text-[var(--a-muted)]">
    When mathematical invariants stay locked at Layer 1, every brand in the ecosystem can express its own typography, canvas warmth, and structural posture at Layer 2.
  </p>
</article>`,
  },
  'tabular-ledger': {
    label: '05 · High-Density Tabular Canon Ledger',
    description: 'Hairline-divided schedule with tabular-nums alignment and zero vertical cages.',
    defaultCode: `<div className="overflow-x-auto">
  <table className="w-full text-left border-collapse text-sm">
    <thead>
      <tr className="border-b-2 border-[var(--a-ink)] font-mono text-xs uppercase text-[var(--a-muted)]">
        <th className="py-3 pr-4">Namespace</th>
        <th className="py-3 px-3">Topic</th>
        <th className="py-3 pl-3 text-right">Volume</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-[var(--a-rule)]">
      <tr>
        <td className="py-3 pr-4 font-mono text-xs font-bold text-[var(--a-accent)]">pipe\\bitcoin</td>
        <td className="py-3 px-3 font-serif text-base">Bitcoin & Sound Money</td>
        <td className="py-3 pl-3 font-mono text-xs text-right tabular-nums">57 notes</td>
      </tr>
    </tbody>
  </table>
</div>`,
  },
};

export default function AccentPlaygroundPage() {
  const [activeBrand, setActiveBrand] = useState<BrandProfileId>('playful-principal');
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('archetype-pedestals');
  const [leftTab, setLeftTab] = useState<'code' | 'theme' | 'styles-md'>('code');
  const [viewport, setViewport] = useState<'desktop' | 'mobile' | 'extension'>('desktop');
  const [code, setCode] = useState(PLAYGROUND_TEMPLATES['archetype-pedestals'].defaultCode);

  // Live 5-Axis Tokens
  const [customBg, setCustomBg] = useState('#FAF8F5');
  const [customSurface, setCustomSurface] = useState('#F3EEE6');
  const [customInk, setCustomInk] = useState('#111827');
  const [customAccent, setCustomAccent] = useState('#FE299E');
  const [customDisplayFont, setCustomDisplayFont] = useState('Bricolage Grotesque');
  const [customCtaRadius, setCustomCtaRadius] = useState('9999px');
  const [customCss, setCustomCss] = useState(
    `/* Live Scoped CSS Escape Hatch (customExtension.css) */\n.playground-pedestal {\n  transition: border-color 180ms ease;\n}`
  );
  const [copied, setCopied] = useState<'none' | 'code' | 'styles'>('none');

  const syncFromBrand = (id: BrandProfileId) => {
    const p = BRAND_PROFILES[id];
    if (!p) return;
    setCustomBg(p.tokens.light['--a-bg']);
    setCustomSurface(p.tokens.light['--a-surface']);
    setCustomInk(p.tokens.light['--a-ink']);
    setCustomAccent(p.tokens.light['--a-accent']);
    setCustomDisplayFont(p.typography.display);
    setCustomCtaRadius(p.structure?.ctaRadius ?? '6px');
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
          : 'playful-principal';
    setActiveBrand(initial);
    syncFromBrand(initial);
  }, []);

  const handleSelectBrand = (id: BrandProfileId) => {
    setActiveBrand(id);
    syncFromBrand(id);
    window.localStorage.setItem('accent-brand', id);
    document.documentElement.setAttribute('data-accent-brand', id);
    window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: id }));
  };

  const handleSelectTemplate = (id: TemplateId) => {
    setActiveTemplate(id);
    setCode(PLAYGROUND_TEMPLATES[id].defaultCode);
  };

  // Real-Time Regex Rule Ratchet Linter against all getAllAccentRules()
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

  const derivedAccent = useMemo(
    () => deriveAccessibleAccent(customAccent, customBg),
    [customAccent, customBg]
  );

  const compiledStylesMd = useMemo(() => {
    const base = BRAND_PROFILES[activeBrand];
    const profile: BrandProfile = {
      ...base,
      typography: {
        ...base.typography,
        display: customDisplayFont,
      },
      structure: {
        ctaRadius: customCtaRadius,
        posture: customCtaRadius === '9999px' ? 'pedestal-hairline' : 'archival-spine',
        summary: `Configured in Accént Playground with ${customDisplayFont} and ${customCtaRadius} CTA radius.`,
      },
      customExtension: {
        css: customCss.trim() || undefined,
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
    return generateStylesMarkdown(profile);
  }, [
    activeBrand,
    customBg,
    customSurface,
    customInk,
    customAccent,
    customDisplayFont,
    customCtaRadius,
    customCss,
    derivedAccent,
  ]);

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

  const previewVars: React.CSSProperties = {
    backgroundColor: customBg,
    color: customInk,
    ['--a-bg' as string]: customBg,
    ['--a-surface' as string]: customSurface,
    ['--a-ink' as string]: customInk,
    ['--a-accent' as string]: customAccent,
    ['--a-accent-fill' as string]: derivedAccent.fillHex,
    ['--a-accent-text' as string]: derivedAccent.inlineTextHex,
    ['--a-radius-cta' as string]: customCtaRadius,
  };

  return (
    <div className="py-6 space-y-5">
      {/* ================= TOP PLAYGROUND CONTROL BAR (Astryx-Class + Live Rule Ratchet) ================= */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-serif text-lg font-semibold text-[var(--a-ink)] mr-1">
            Playground
          </span>

          {/* Dialect Selector */}
          <select
            value={activeBrand}
            onChange={(e) => handleSelectBrand(e.target.value as BrandProfileId)}
            aria-label="Select brand dialect"
            className="min-h-[38px] rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-3.5 text-xs font-mono font-semibold text-[var(--a-ink)] cursor-pointer"
          >
            {BRAND_PROFILE_LIST.map((b) => (
              <option key={b.id} value={b.id}>
                Theme: {b.name.split('(')[0].trim()} ({b.mark})
              </option>
            ))}
          </select>

          {/* Template Selector */}
          <select
            value={activeTemplate}
            onChange={(e) => handleSelectTemplate(e.target.value as TemplateId)}
            aria-label="Select template"
            className="min-h-[38px] rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-3.5 text-xs font-mono font-semibold text-[var(--a-ink)] cursor-pointer"
          >
            {Object.entries(PLAYGROUND_TEMPLATES).map(([id, meta]) => (
              <option key={id} value={id}>
                Template: {meta.label}
              </option>
            ))}
          </select>
        </div>

        {/* Center: Viewport Switcher (Desktop / Mobile 390px / Chrome Extension 400px) */}
        <div className="flex items-center gap-1 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] p-1">
          {[
            { id: 'desktop', label: 'Desktop', icon: Monitor },
            { id: 'mobile', label: 'Mobile 390px', icon: Smartphone },
            { id: 'extension', label: 'Ext 400px', icon: Sparkles },
          ].map((vp) => {
            const Icon = vp.icon;
            const active = viewport === vp.id;
            return (
              <button
                key={vp.id}
                type="button"
                onClick={() => setViewport(vp.id as typeof viewport)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-mono font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                    : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{vp.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Live Regex Rule Ratchet Status + Export STYLES.md */}
        <div className="flex items-center gap-2.5">
          {ruleViolations.length === 0 ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--a-rule)] bg-[var(--a-bg)] px-3 py-1.5 font-mono text-xs font-semibold text-[var(--a-emerald)]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>0 Violations · WCAG {derivedAccent.fillContrastRatio}:1</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 px-3 py-1.5 font-mono text-xs font-semibold text-amber-700 dark:text-amber-300">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>
                {ruleViolations.length}{' '}
                {ruleViolations.length === 1 ? 'Rule Violation' : 'Rule Violations'}
              </span>
            </span>
          )}

          <button
            type="button"
            onClick={handleDownloadStylesMd}
            className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[var(--a-ink)] text-[var(--a-bg)] px-4 font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export STYLES.md</span>
          </button>
        </div>
      </div>

      {/* ================= SPLIT-SCREEN IDE: LEFT EDITOR + RIGHT LIVE STAGE ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANE (5 Cols): Code Editor / 5-Axis Tokens / Compiled STYLES.md */}
        <div className="lg:col-span-5 rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-[var(--a-rule)] px-3 py-2 bg-[var(--a-bg)]/60">
            <div className="flex items-center gap-1">
              {[
                { id: 'code', label: '01 · TSX & Linter', icon: Code2 },
                { id: 'theme', label: '02 · 5-Axis Theme', icon: Palette },
                { id: 'styles-md', label: '03 · STYLES.md', icon: FileCode2 },
              ].map((t) => {
                const Icon = t.icon;
                const active = leftTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setLeftTab(t.id as typeof leftTab)}
                    className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-xs font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                        : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  leftTab === 'styles-md' ? compiledStylesMd : code
                );
                setCopied(leftTab === 'styles-md' ? 'styles' : 'code');
                window.setTimeout(() => setCopied('none'), 2000);
              }}
              className="inline-flex items-center gap-1 rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] px-2.5 py-1 font-mono text-xs text-[var(--a-ink)] cursor-pointer"
            >
              {copied !== 'none' ? (
                <>
                  <Check className="w-3 h-3 text-[var(--a-emerald)]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[var(--a-accent)]" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {leftTab === 'code' ? (
            <div className="p-4 space-y-4">
              <textarea
                rows={18}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                aria-label="TSX Code Editor"
                className="w-full rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-3.5 font-mono text-xs leading-relaxed text-[var(--a-ink)] outline-none focus:border-[var(--a-accent)]"
              />

              {/* Live Rule Ratchet Diagnostic Feed */}
              <div className="rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--a-ink)]">
                    Live Accént Regex Ratchet
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCode(
                        `${code}\n<!-- Test violation: <span className="text-[10px] h-[37px]">Tiny text</span> -->`
                      )
                    }
                    className="font-mono text-[11px] text-[var(--a-accent)] hover:underline cursor-pointer"
                  >
                    + Simulate Violation
                  </button>
                </div>

                {ruleViolations.length === 0 ? (
                  <p className="text-xs text-[var(--a-muted)]">
                    All {getAllAccentRules().length} Accént rules pass. Try clicking{' '}
                    <strong className="text-[var(--a-ink)]">+ Simulate Violation</strong> to see how the CI ratchet catches sub-13px type or off-grid pixel dimensions.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {ruleViolations.map((v) => (
                      <li
                        key={v.id}
                        className="rounded border border-amber-500/40 bg-amber-500/10 p-2.5 text-xs space-y-1"
                      >
                        <div className="font-mono font-bold text-amber-800 dark:text-amber-300">
                          [{v.id}] {v.statement}
                        </div>
                        <div className="text-[var(--a-muted)]">{v.why}</div>
                      </li>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setCode(PLAYGROUND_TEMPLATES[activeTemplate].defaultCode)
                      }
                      className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[var(--a-accent)] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore Valid Template Code</span>
                    </button>
                  </ul>
                )}
              </div>
            </div>
          ) : leftTab === 'theme' ? (
            <div className="p-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1 block">
                  <span className="font-mono text-[var(--a-muted)] uppercase">
                    Canvas (--a-bg)
                  </span>
                  <input
                    type="color"
                    value={customBg}
                    onChange={(e) => setCustomBg(e.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="font-mono text-[var(--a-muted)] uppercase">
                    Primary Ink (--a-ink)
                  </span>
                  <input
                    type="color"
                    value={customInk}
                    onChange={(e) => setCustomInk(e.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="font-mono text-[var(--a-muted)] uppercase">
                    Brand Mark (--a-accent)
                  </span>
                  <input
                    type="color"
                    value={customAccent}
                    onChange={(e) => setCustomAccent(e.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-[var(--a-rule)]"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="font-mono text-[var(--a-muted)] uppercase">
                    CTA Radius (--a-radius-cta)
                  </span>
                  <select
                    value={customCtaRadius}
                    onChange={(e) => setCustomCtaRadius(e.target.value)}
                    className="h-10 w-full rounded border border-[var(--a-rule)] bg-[var(--a-bg)] px-2.5 text-xs"
                  >
                    <option value="9999px">9999px (Full Pill · CHB)</option>
                    <option value="6px">6px (Archival Spine · Pipes)</option>
                    <option value="12px">12px (Warm Well · Marigold)</option>
                    <option value="4px">4px (Terminal Grid · Greater)</option>
                  </select>
                </label>
              </div>

              <label className="space-y-1.5 block">
                <span className="font-mono text-[var(--a-ink)] font-semibold uppercase">
                  Custom CSS Escape Hatch (Section 5 of STYLES.md)
                </span>
                <textarea
                  rows={8}
                  value={customCss}
                  onChange={(e) => setCustomCss(e.target.value)}
                  className="w-full rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-3 font-mono text-xs text-[var(--a-ink)]"
                />
              </label>
            </div>
          ) : (
            <div className="p-4">
              <pre className="max-h-[520px] overflow-auto rounded-lg border border-[var(--a-rule)] bg-[var(--a-bg)] p-4 font-mono text-xs leading-relaxed text-[var(--a-ink)]">
                <code>{compiledStylesMd}</code>
              </pre>
            </div>
          )}
        </div>

        {/* RIGHT PANE (7 Cols): LIVE INTERACTIVE PREVIEW STAGE */}
        <div className="lg:col-span-7 rounded-xl border border-[var(--a-rule)] bg-[var(--a-surface)] p-4 sm:p-6 flex flex-col items-center">
          <div
            style={{
              ...previewVars,
              width:
                viewport === 'mobile'
                  ? '390px'
                  : viewport === 'extension'
                    ? '400px'
                    : '100%',
            }}
            className="rounded-xl border border-black/15 p-6 sm:p-8 transition-all duration-300 min-h-[540px] flex flex-col justify-between"
          >
            {activeTemplate === 'archetype-pedestals' ? (
              <div className="space-y-8">
                <div>
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: customAccent }}
                  >
                    ||| One Address · Three Ways to Use It ; - ]
                  </span>
                  <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal">
                    Personal, Business &amp; Topic Pipes.
                  </h2>
                </div>

                <div
                  className={`grid gap-8 ${
                    viewport === 'desktop' ? 'md:grid-cols-3' : 'grid-cols-1'
                  }`}
                >
                  {[
                    {
                      path: 'pipe\\cubby',
                      kind: '01 · Personal',
                      title: 'Kyle (Cubby)',
                      body: 'Personal working notebook, essays, and product architecture in his own voice.',
                      primary: true,
                    },
                    {
                      path: 'pipe\\chb',
                      kind: '02 · Business',
                      title: 'Colon-Hyphen-Bracket',
                      body: 'Studio source of truth housing Accént, Workshop, and verified product docs.',
                      primary: false,
                    },
                    {
                      path: 'pipe\\bitcoin',
                      kind: '03 · Topic',
                      title: 'Bitcoin & Sound Money',
                      body: 'Consensus rules, BIP specifications, and Lightning Network architecture.',
                      primary: false,
                    },
                  ].map((item) => (
                    <article
                      key={item.path}
                      style={{
                        borderTopWidth: '2px',
                        borderTopColor: item.primary ? customAccent : customInk,
                      }}
                      className="pt-5 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="font-bold" style={{ color: customAccent }}>
                            {item.path}
                          </span>
                          <span className="opacity-60">{item.kind}</span>
                        </div>
                        <h3 className="font-serif text-2xl">{item.title}</h3>
                        <p className="text-sm opacity-80 leading-relaxed">{item.body}</p>
                      </div>
                      <div className="pt-5 mt-5 border-t border-black/10 flex items-center justify-between font-mono text-xs font-bold uppercase">
                        <span>Open Pipe</span>
                        <ArrowRight className="w-3.5 h-3.5" style={{ color: customAccent }} />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : activeTemplate === 'chb-hero' ? (
              <div className="space-y-6 py-6">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em]">
                  <span style={{ color: customAccent }}>: - ]</span>
                  <span>Playful-Principal Flagship</span>
                  <Smile color={customAccent} winkEvery={2800} />
                </div>
                <div className="font-serif text-4xl sm:text-5xl leading-[1.06]">
                  <ScaryHeadline
                    accent={customAccent}
                    inkColor={customInk}
                    struckColor="rgba(17,24,39,0.45)"
                    pairs={HOME_SCARY_PAIRS}
                  />
                </div>
                <p className="text-base opacity-80 max-w-xl leading-relaxed">
                  One principal, zero handoffs, shipped production code. Governed by STYLES.md and {getAllAccentRules().length} machine-readable Accént rules.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadStylesMd}
                    style={{
                      borderRadius: customCtaRadius,
                      backgroundColor: derivedAccent.fillHex,
                      color: '#FFFFFF',
                    }}
                    className="min-h-[44px] px-6 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Download STYLES.md →
                  </button>
                </div>
              </div>
            ) : activeTemplate === 'agent-workbench' ? (
              <div className="space-y-6 py-4">
                <div
                  style={{ backgroundColor: customSurface }}
                  className="p-6 rounded-xl border border-black/15 space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-black/10">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: customAccent }}
                    >
                      ; - ] Semi Agent · pipe\optimization (~)
                    </span>
                    <span
                      style={{
                        borderRadius: customCtaRadius,
                        backgroundColor: derivedAccent.fillHex,
                        color: '#FFFFFF',
                      }}
                      className="px-3 py-1 font-mono text-xs font-bold"
                    >
                      −90% Token Burn
                    </span>
                  </div>
                  <RiseLines
                    immediate
                    lines={[
                      'Deterministic 8-stage context compiler.',
                      'Zero hallucinated citations.',
                    ]}
                  />
                  <p className="text-sm opacity-80 leading-relaxed">
                    Pinned 14 project rules at byte-0 and retrieved 3 SHA-256 verified slices from pipe\website-design and pipe\chb.
                  </p>
                </div>
              </div>
            ) : activeTemplate === 'thesis-edition' ? (
              <article className="space-y-5 py-6 border-t-2 border-current">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.22em]"
                  style={{ color: customAccent }}
                >
                  Thesis Edition · Vol. IV
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl leading-tight">
                  Why Engineered Drift Beats Monolithic Design Systems
                </h2>
                <p className="text-base opacity-80 leading-relaxed">
                  When mathematical invariants stay locked at Layer 1, every brand in the ecosystem can express its own typography, canvas warmth, and structural posture at Layer 2—governed by a standalone STYLES.md file.
                </p>
              </article>
            ) : (
              <div className="space-y-4 py-4">
                <span
                  className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: customAccent }}
                >
                  /// Tabular Canon Ledger (tabular-nums)
                </span>
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-current font-mono text-xs uppercase opacity-70">
                      <th className="py-2.5 pr-4">Namespace</th>
                      <th className="py-2.5 px-3">Topic</th>
                      <th className="py-2.5 pl-3 text-right">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {[
                      { ns: 'pipe\\cubby', topic: 'Kyle (Cubby) Studio Notebook', vol: '372 notes' },
                      { ns: 'pipe\\bitcoin', topic: 'Bitcoin & Sound Money', vol: '57 notes' },
                      { ns: 'pipe\\stoicism', topic: 'Classical Stoic Canon', vol: '38 notes' },
                      { ns: 'pipe\\website-design', topic: 'Accént & Anti-Slop Codex', vol: '44 notes' },
                    ].map((r) => (
                      <tr key={r.ns}>
                        <td
                          className="py-3 pr-4 font-mono text-xs font-bold"
                          style={{ color: customAccent }}
                        >
                          {r.ns}
                        </td>
                        <td className="py-3 px-3 font-serif text-base">{r.topic}</td>
                        <td className="py-3 pl-3 font-mono text-xs text-right tabular-nums">
                          {r.vol}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer inside Live Preview */}
            <div className="pt-6 mt-8 border-t border-black/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono opacity-75">
              <span>Dialect: {BRAND_PROFILES[activeBrand].name.split('(')[0].trim()}</span>
              <span>
                Canvas {customBg} · Accent {customAccent} · Fill {derivedAccent.fillHex} (
                {derivedAccent.fillContrastRatio}:1 AA)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
