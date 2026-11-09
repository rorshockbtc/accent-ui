'use client';

import React, { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import {
  Terminal,
  Sparkles,
  Check,
  Copy,
  ShieldCheck,
  Layers,
  Cpu,
  Sliders,
  ArrowRight,
  Code2,
  Palette,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import {
  BRAND_PROFILES,
  BRAND_PROFILE_LIST,
  generateFigmaVariablesJson,
  generateFigmaCodeConnectManifest,
  type BrandProfileId,
} from '@/styles/themes';
import { SPRING_LAYOUT, EASE_EDITORIAL } from '@/lib/motion/tokens';

type AgentChannel =
  | 'npm-sdk'
  | 'styles-md'
  | 'figma-sync'
  | 'mcp-json'
  | 'stepwise-7b'
  | 'frontier-1pass'
  | 'tailwind-css';

const COMPARISON_ROWS = [
  {
    dimension: '01 · Multi-Brand Theming Engine',
    astryx: '1-Axis Color & Font Swap on 6 static e-commerce presets',
    accent:
      '5-Axis Engineered Drift across 7 Sovereign Dialects: Auto-WCAG triad math (--a-accent / --a-accent-fill / --a-accent-text), Optical Display Typography, CTA Geometry & Shadow Posture, Two-Tier Choreography, and Punctuation Identity.',
    multiplier: '5× Axes',
  },
  {
    dimension: '02 · Figma Variables & Code Connect',
    astryx: 'No W3C DTCG Figma Variables API or Dev Mode Code Connect manifest',
    accent:
      'Bi-directional W3C DTCG + Figma Variables REST API JSON (/design-system/figma-tokens.json?brand=<id>), Light/Dark Mode variable scopes, Tokens Studio sets, and @figma/code-connect Dev Mode manifests.',
    multiplier: 'Figma Native',
  },
  {
    dimension: '03 · Specification & Rule Depth',
    astryx: '~18 high-level component pages with prose descriptions',
    accent:
      '57 Exhaustive 4-Tab Pages (Overview, Guidelines, W3C DTCG Specs, WCAG Accessibility) + 223 Machine-Enforced AgentRule contracts with JavaScript regex violationPatterns.',
    multiplier: '3.2× Specs',
  },
  {
    dimension: '04 · Interactive Live Playground',
    astryx: 'Read-only preview with basic preset dropdown',
    accent:
      'Split-Screen Live TSX Editor + Real-Time 223-Rule Regex Ratchet Linter + 5-Axis Token & Custom CSS Escape Hatch + Desktop / Mobile (390px) / Extension (400px) Viewport Switcher.',
    multiplier: 'Full IDE',
  },
  {
    dimension: '05 · AI Agent Control Plane',
    astryx: 'Static CLI install command (`npx skills add`)',
    accent:
      'Zero-PR STYLES.md Governance separated from operational AGENTS.md + Live Edge Endpoints (/design-system/styles.md & /design-system/rules.json) + Stepwise 7B / 32B / Frontier Prompt Compiler.',
    multiplier: 'Zero-PR CI',
  },
  {
    dimension: '06 · Motion & Choreography System',
    astryx: 'Standard CSS hover transitions only',
    accent:
      'Two-Tier Motion Architecture: Tier 1 Operational Utility (120ms/200ms/320ms GPU-only) + Tier 2 Editorial & Corporate Choreography (ScaryHeadline 3-phase strike, RiseLines, Smile wink, GhostNumeral parallax).',
    multiplier: '2-Tier GPU',
  },
];

export function AccentAstryxPowerStage() {
  const [selectedBrand, setSelectedBrand] = useState<BrandProfileId>('playful-principal');
  const [channel, setChannel] = useState<AgentChannel>('npm-sdk');
  const [copied, setCopied] = useState(false);

  const profile = BRAND_PROFILES[selectedBrand] || BRAND_PROFILES['editorial-sandstone'];
  const light = profile.tokens.light;

  const selectDialect = (id: BrandProfileId) => {
    setSelectedBrand(id);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('accent-brand', id);
      document.documentElement.setAttribute('data-accent-brand', id);
      window.dispatchEvent(new CustomEvent('accent-brand-change', { detail: id }));
    }
  };

  const getChannelPayload = (): { title: string; subtitle: string; code: string } => {
    switch (channel) {
      case 'npm-sdk':
        return {
          title: `Adopt via npm & defineAccentTheme() (${profile.name})`,
          subtitle: 'Strict Layer 1 Guardrails + 5-Axis Freedom + Section 5 Custom Leeway',
          code: `// 1. Install the open-source package & pull your Zero-PR STYLES.md contract:
// npm install @rorshockbtc/accent-ui framer-motion lucide-react
// curl -sL "https://accent.design.pipes.pink/styles.md?brand=${profile.id}" > STYLES.md

import {
  defineAccentTheme,
  validateThemeContrast,
  AccentButton,
  ScaryHeadline,
  Smile,
} from '@rorshockbtc/accent-ui';

// 2. Fork any of the 7 dialects with full creative leeway + automatic WCAG math:
export const myBrand = defineAccentTheme({
  id: 'my-sovereign-app',
  name: 'My Sovereign App',
  tagline: 'Built on Accént 3.0 with custom leeway.',
  usedBy: 'my-repo',
  extends: '${profile.id}',
  mark: '${profile.mark}',
  tokens: {
    light: {
      '--a-bg': '${light['--a-bg']}',
      '--a-ink': '${light['--a-ink']}',
      '--a-accent': '${light['--a-accent']}', // Auto-derives --a-accent-fill (${light['--a-accent-fill']}) & --a-accent-text (${light['--a-accent-text']})
    },
  },
  // 3. Creative Leeway Escape Hatch (Section 5 of STYLES.md):
  customExtension: {
    css: '.hero-stage { border-top: 2px solid var(--a-accent); }',
    rules: ['Allow full-bleed canvas stages on /studio routes while keeping >= 13px type floor.'],
  },
});

const audit = validateThemeContrast(myBrand); // Mathematically verifies AA/AAA compliance`,
        };
      case 'styles-md':
        return {
          title: `STYLES.md · Zero-PR Design Contract (${profile.name})`,
          subtitle: `GET /design-system/styles.md?brand=${profile.id}`,
          code: `# STYLES.md — ${profile.name} (${profile.mark})
# Generated by Accént 3.0 · Design System Control Plane (Zero-PR Governance)

## 1. Brand Identity & Punctuation Voice
- Dialect ID: \`${profile.id}\`
- Signature Mark: \`${profile.mark}\` (${profile.tagline})
- Surface Posture: \`${profile.structure?.posture ?? 'archival-spine'}\`

## 2. Verified Chromatic & WCAG Contrast Triad (Light Mode)
- Canvas Background (\`--a-bg\`): \`${light['--a-bg']}\`
- Elevated Surface (\`--a-surface\`): \`${light['--a-surface']}\`
- Primary Ink (\`--a-ink\`): \`${light['--a-ink']}\`
- Brand Accent Display (\`--a-accent\`): \`${light['--a-accent']}\`
- WCAG AA Solid Button Fill (\`--a-accent-fill\`): \`${light['--a-accent-fill']}\` (Guaranteed >= 4.5:1 with #FFFFFF)
- WCAG AA Inline Link Text (\`--a-accent-text\`): \`${light['--a-accent-text']}\` (Guaranteed >= 4.5:1 on ${light['--a-bg']})

## 3. Typography & CTA Geometry
- Display Font (\`--a-font-display\`): \`${profile.typography.display}\` (tracking \`${profile.typography.displayTracking}\`)
- CTA Border Radius (\`--a-cta-radius\`): \`${profile.structure?.ctaRadius ?? '6px'}\`
- Hard Invariants: Minimum 13px font floor (\`type.floor-13\`), 8pt spacing grid (\`grid.8pt\`), zero nested cards (\`card.no-nesting\`).`,
        };
      case 'figma-sync': {
        const figmaPayload = generateFigmaVariablesJson(profile);
        const codeConnect = generateFigmaCodeConnectManifest(profile);
        return {
          title: `Figma Variables (W3C DTCG) & Dev Mode Code Connect (${profile.name})`,
          subtitle: `GET /design-system/figma-tokens.json?brand=${profile.id}`,
          code: `// 1. Pull W3C DTCG + Figma Variables REST API JSON (Light & Dark Modes + com.figma.codeSyntax.WEB):
// curl -sL "https://accent.design.pipes.pink/figma-tokens.json?brand=${profile.id}" > figma-tokens.json
//
// 2. Pull Figma Dev Mode Code Connect Manifest (@figma/code-connect):
// curl -sL "https://accent.design.pipes.pink/figma-tokens.json?brand=${profile.id}&format=code-connect" > ${profile.id}.figma.tsx

${JSON.stringify(
  {
    $schema: figmaPayload.$schema,
    collection: figmaPayload.collection,
    variables: {
      color: {
        'canvas/bg': figmaPayload.variables.color['canvas/bg'],
        'text/ink': figmaPayload.variables.color['text/ink'],
        'accent/mark': figmaPayload.variables.color['accent/mark'],
        'accent/fill': figmaPayload.variables.color['accent/fill'],
      },
      typography: figmaPayload.variables.typography,
      geometry: figmaPayload.variables.geometry,
    },
  },
  null,
  2
)}

${codeConnect}`,
        };
      }
      case 'mcp-json':
        return {
          title: 'MCP Server & CLI Integration (`mcp_config.json`)',
          subtitle: 'Connect Claude Code, Cursor, Windsurf, or Antigravity directly to Accént',
          code: `{
  "mcpServers": {
    "accent-design-system": {
      "command": "npx",
      "args": ["-y", "@rorshockbtc/accent-mcp@latest", "--brand=${profile.id}"],
      "env": {
        "ACCENT_RULES_ENDPOINT": "https://design.pipes.pink/design-system/rules.json",
        "ACCENT_STYLES_ENDPOINT": "https://design.pipes.pink/design-system/styles.md?brand=${profile.id}"
      }
    }
  }
}

# Or fetch directly in any agent workflow:
curl -sL "https://design.pipes.pink/design-system/styles.md?brand=${profile.id}" > STYLES.md
curl -sL "https://design.pipes.pink/design-system/rules.json" | jq '.rules | length' # -> 223 rules`,
        };
      case 'stepwise-7b':
        return {
          title: '4-Step Local 7B–14B Model Prompt Compiler (`stepwise-prompt-compiler.ts`)',
          subtitle: 'Prevents small local models (Qwen-2.5-7B, Llama-3.1-8B) from dropping rules',
          code: `[STEP 1 OF 4 · SKELETON & 8PT SPINE]
Build the semantic HTMLlandmarks (<header>, <main>, <section>) using max-w-6xl mx-auto px-6 py-16.
Do NOT add colors or shadows yet. Enforce 8pt spacing multiples (p-6, gap-8, py-16).

[STEP 2 OF 4 · TYPOGRAPHY & >= 13PX FLOOR]
Apply ${profile.typography.display} (--a-font-display) to h1/h2 headings with tracking ${profile.typography.displayTracking}.
Apply Inter (--font-sans) to body copy (max-w-[65ch]) and JetBrains Mono (--font-mono) to metadata eyebrows.
HARD RULE [type.floor-13]: Never use text-[10px], text-[11px], or text-[12px].

[STEP 3 OF 4 · CHROMATIC TRIAD & OPEN PEDESTALS]
Bind canvas to var(--a-bg) (${light['--a-bg']}) and ink to var(--a-ink) (${light['--a-ink']}).
Use open 2px top-rule pedestals (border-t-2 border-[var(--a-ink)] pt-6) instead of nested boxy cards.
Use var(--a-accent-fill) (${light['--a-accent-fill']}) for primary CTA fills with radius ${profile.structure?.ctaRadius ?? '6px'}.

[STEP 4 OF 4 · CI RATCHET SELF-AUDIT]
Verify zero <Link><button> nesting, zero transition-all layout animations, and >= 44x44px tap targets.`,
        };
      case 'frontier-1pass':
        return {
          title: 'Single-Pass Frontier Agent Contract (Claude / Gemini / GPT)',
          subtitle: 'Complete 5-axis system prompt with embedded regex ratchet invariants',
          code: `You are building a production surface governed by Accént 3.0 (Dialect: ${profile.name} \`${profile.mark}\`).
Enforce these non-negotiable architectural invariants:
1. Palette Triad: Canvas \`${light['--a-bg']}\`, Surface \`${light['--a-surface']}\`, Ink \`${light['--a-ink']}\`, Display Accent \`${light['--a-accent']}\`, Solid CTA Fill \`${light['--a-accent-fill']}\` (white text), Inline Accent Text \`${light['--a-accent-text']}\`.
2. Typography: \`${profile.typography.display}\` for display headlines (\`${profile.typography.displayTracking}\`), \`Inter\` for prose (\`60-70ch\`), \`JetBrains Mono\` for eyebrows. Strict \`>= 13px\` minimum font size (zero \`text-[10px]\`, \`text-[11px]\`, \`text-[12px]\`).
3. Structure: Open architectural pedestals (\`border-t-2\` or \`border-l-2\`) with hairline dividers. Never nest a card inside a card (\`card.no-nesting\`).
4. Motion: GPU-only \`transform\` and \`opacity\`. Never use \`transition-all\`.`,
        };
      case 'tailwind-css':
        return {
          title: `W3C DTCG CSS Custom Properties (${profile.id})`,
          subtitle: 'Ready to paste into globals.css or inject via getBrandThemeVars()',
          code: `:root[data-accent-brand="${profile.id}"] {
  --a-bg: ${light['--a-bg']};
  --a-surface: ${light['--a-surface']};
  --a-ink: ${light['--a-ink']};
  --a-muted: ${light['--a-muted']};
  --a-rule: ${light['--a-rule']};
  --a-accent: ${light['--a-accent']};
  --a-accent-fill: ${light['--a-accent-fill']};
  --a-accent-text: ${light['--a-accent-text']};
  --a-sky: ${light['--a-sky']};
  --a-font-display: ${profile.typography.display};
  --a-tracking-display: ${profile.typography.displayTracking};
  --a-cta-radius: ${profile.structure?.ctaRadius ?? '6px'};
}`,
        };
    }
  };

  const payload = getChannelPayload();

  const handleCopy = () => {
    navigator.clipboard.writeText(payload.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section aria-labelledby="agent-command-center-heading" className="mt-20 space-y-16">
      {/* PART 1: AGENT COMMAND CENTER & MULTI-DIALECT COMPILER */}
      <div className="border-2 border-[var(--a-ink)] bg-[var(--a-surface)] p-6 sm:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--a-rule)]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-[0.18em] text-[var(--a-accent)]">
              <Terminal className="h-4 w-4" />
              <span>Agent Command Center · Zero-PR Design Control Plane</span>
            </div>
            <h2 id="agent-command-center-heading" className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[var(--a-ink)]">
              One click to arm any AI agent or codebase.
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[var(--a-muted)] max-w-[68ch]">
              Select any of the 7 sovereign brand dialects below to compile its live <code className="font-mono text-xs">STYLES.md</code> contract, MCP server config, 4-step 7B local model prompt, or W3C DTCG CSS variables—and watch this entire documentation site morph in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/design-system/themes"
              className="inline-flex items-center gap-1.5 rounded-[var(--a-cta-radius,6px)] bg-[var(--a-accent-fill,var(--a-accent))] px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:opacity-95"
            >
              <Palette className="h-3.5 w-3.5" />
              <span>Full 5-Axis Studio →</span>
            </Link>
            <Link
              href="/design-system/playground"
              className="inline-flex items-center gap-1.5 rounded-[var(--a-cta-radius,6px)] border border-[var(--a-ink)] bg-[var(--a-bg)] px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-[0.12em] text-[var(--a-ink)] transition-colors hover:border-[var(--a-accent)] hover:text-[var(--a-accent)]"
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Live Linter IDE →</span>
            </Link>
          </div>
        </div>

        {/* Step 1: 7 Brand Dialect Selector Strip */}
        <div className="mt-6">
          <div className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[var(--a-muted)] mb-3">
            01 · Select Active Brand Dialect (Morphs Site &amp; Compiles Contract Immediately)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {BRAND_PROFILE_LIST.map((b) => {
              const active = b.id === selectedBrand;
              const bLight = b.tokens.light;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => selectDialect(b.id)}
                  className={`group flex flex-col justify-between rounded-md border p-3 text-left transition-colors cursor-pointer ${
                    active
                      ? 'border-[var(--a-accent)] bg-[var(--a-bg)] ring-1 ring-[var(--a-accent)]'
                      : 'border-[var(--a-rule)] bg-[var(--a-bg)]/60 hover:border-[var(--a-ink)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: bLight['--a-accent'] }}
                    >
                      {b.mark}
                    </span>
                    <div className="flex items-center -space-x-1">
                      <span
                        className="h-3 w-3 rounded-full border border-black/20"
                        style={{ backgroundColor: bLight['--a-bg'] }}
                      />
                      <span
                        className="h-3 w-3 rounded-full border border-black/20"
                        style={{ backgroundColor: bLight['--a-ink'] }}
                      />
                      <span
                        className="h-3 w-3 rounded-full border border-black/20"
                        style={{ backgroundColor: bLight['--a-accent'] }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 font-serif text-xs font-semibold text-[var(--a-ink)] line-clamp-1">
                    {b.name.split('(')[0].trim()}
                  </div>
                  <div className="mt-0.5 font-mono text-xs text-[var(--a-muted)] truncate">
                    {b.typography.display.split(' ')[0]}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Export Channel Tabs + Live Code Output */}
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Agent export format">
              {(
                [
                  { id: 'npm-sdk', label: '01 · npm & defineAccentTheme()' },
                  { id: 'styles-md', label: '02 · STYLES.md Contract' },
                  { id: 'figma-sync', label: '03 · Figma Variables & Code Connect' },
                  { id: 'mcp-json', label: '04 · MCP & CLI' },
                  { id: 'stepwise-7b', label: '05 · 4-Step 7B Prompt' },
                  { id: 'frontier-1pass', label: '06 · Frontier Agent Prompt' },
                  { id: 'tailwind-css', label: '07 · W3C CSS Variables' },
                ] as const
              ).map((tab) => {
                const active = channel === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setChannel(tab.id)}
                    className={`relative rounded-md px-3.5 py-2 text-xs font-mono font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[var(--a-ink)] text-[var(--a-bg)]'
                        : 'border border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md bg-[var(--a-accent-fill,var(--a-accent))] px-4 py-2 text-xs font-mono font-semibold text-white transition-colors hover:opacity-95 cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Contract'}</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <m.div
              key={`${selectedBrand}-${channel}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: EASE_EDITORIAL }}
              className="rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 border-b border-[var(--a-rule)] bg-[var(--a-surface)] text-xs font-mono">
                <span className="font-semibold text-[var(--a-ink)]">{payload.title}</span>
                <span className="text-[var(--a-muted)]">{payload.subtitle}</span>
              </div>
              <pre className="p-4 sm:p-5 text-xs font-mono leading-relaxed text-[var(--a-ink)] overflow-x-auto max-h-[320px]">
                <code>{payload.code}</code>
              </pre>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* PART 1.5: THE 3-LAYER SOVEREIGN GOVERNANCE MODEL (GUARDRAILS VS. LEEWAY) */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-[var(--a-rule)] bg-[var(--a-bg)] divide-y md:divide-y-0 md:divide-x divide-[var(--a-rule)]">
        <div className="p-6 sm:p-8 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold uppercase tracking-[0.14em] text-[var(--a-ink)]">Layer 01 · Hard Guardrails</span>
            <span className="px-2 py-0.5 rounded bg-[var(--a-surface)] border border-[var(--a-rule)] text-[var(--a-muted)]">Locked in CI</span>
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[var(--a-ink)]">
            Never Compromised
          </h3>
          <p className="text-sm text-[var(--a-muted)] leading-relaxed">
            No adopter or AI model can accidentally break human legibility: <strong>8pt spatial grid</strong>, <strong>&gt;= 13px minimum font floor</strong>, <strong>&gt;= 44×44px touch targets</strong>, <strong>WCAG AAA (7.0:1) body ink</strong>, and <strong>zero nested card soup</strong>.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold uppercase tracking-[0.14em] text-[var(--a-accent)]">Layer 02 · 5-Axis Dialect Drift</span>
            <span className="px-2 py-0.5 rounded bg-[var(--a-surface)] border border-[var(--a-rule)] text-[var(--a-accent)]">7 Presets + Custom</span>
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[var(--a-ink)]">
            Guided Brand Expression
          </h3>
          <p className="text-sm text-[var(--a-muted)] leading-relaxed">
            Dial in your own <strong>Canvas &amp; Signature Hex</strong> (auto-deriving accessible button fills via <code className="font-mono text-xs">deriveAccessibleAccent</code>), <strong>Optical Display Font</strong>, <strong>CTA Geometry</strong> (<code className="font-mono text-xs">6px</code> vs <code className="font-mono text-xs">9999px</code>), and <strong>Choreography Tier</strong>.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="font-bold uppercase tracking-[0.14em] text-[var(--a-sky-text,var(--a-ink))]">Layer 03 · Section 5 Leeway</span>
            <span className="px-2 py-0.5 rounded bg-[var(--a-surface)] border border-[var(--a-rule)] text-[var(--a-muted)]">customExtension</span>
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[var(--a-ink)]">
            100% Creative Leeway
          </h3>
          <p className="text-sm text-[var(--a-muted)] leading-relaxed">
            Need bespoke shaders, custom WebGL canvases, or domain-specific rules? Inject custom CSS, TSX adapter snippets, and repo-specific prompt rules into <strong>Section 5 of <code className="font-mono text-xs">STYLES.md</code></strong> with zero upstream PR friction.
          </p>
        </div>
      </div>

      {/* PART 2: ARCHITECTURAL BENCHMARK MATRIX (ACCÉNT 3.0 VS. CONVENTIONAL / ASTRYX) */}
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[var(--a-accent)]">
              Architectural Benchmark · Why Accént 3.0 Is in a Class of Its Own
            </span>
            <h2 className="mt-1 font-serif text-3xl leading-10 font-semibold text-[var(--a-ink)]">
              5-Axis Sovereign Governance vs. Single-Axis Preset Switchers
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--a-muted)]">
            57 Pages · 223 Regex Rules · 7 Brand Dialects · 49 WCAG AAA Pairs
          </span>
        </div>

        <div className="border-y border-[var(--a-rule)] divide-y divide-[var(--a-rule)]">
          <div className="hidden md:grid md:grid-cols-12 gap-4 py-3 text-xs font-mono font-bold uppercase tracking-[0.12em] text-[var(--a-muted)] bg-[var(--a-surface)] px-4">
            <div className="col-span-3">System Dimension</div>
            <div className="col-span-3">Conventional / Single-Axis Systems</div>
            <div className="col-span-5 text-[var(--a-accent)]">Accént 3.0 Exhaustive Edition</div>
            <div className="col-span-1 text-right">Delta</div>
          </div>

          {COMPARISON_ROWS.map((row) => (
            <div
              key={row.dimension}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 py-5 px-4 items-start hover:bg-[var(--a-surface)]/60 transition-colors"
            >
              <div className="md:col-span-3 font-mono text-xs font-bold text-[var(--a-ink)]">
                {row.dimension}
              </div>
              <div className="md:col-span-3 text-xs sm:text-sm text-[var(--a-muted)] leading-relaxed">
                {row.astryx}
              </div>
              <div className="md:col-span-5 text-xs sm:text-sm text-[var(--a-ink)] font-medium leading-relaxed">
                {row.accent}
              </div>
              <div className="md:col-span-1 md:text-right">
                <span className="inline-flex items-center rounded-full border border-[var(--a-accent)]/40 bg-[var(--a-surface)] px-2.5 py-0.5 font-mono text-xs font-bold text-[var(--a-accent)]">
                  {row.multiplier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
