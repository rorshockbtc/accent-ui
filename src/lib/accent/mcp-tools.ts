import { ACCENT_PAGES, getAccentPage } from '@/content/accent/registry';
import type { AccentSectionId, AiLifecyclePhase } from '@/content/accent/types';
import { PASTELS, TONAL_DARKS } from '@/styles/design-tokens';
import {
  BRAND_PROFILES,
  generateStylesMarkdown,
  validateThemeContrast,
  type BrandProfileId,
} from '@/styles/themes';

export interface AccentMcpToolDef {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

export const ACCENT_MCP_TOOL_DEFS: AccentMcpToolDef[] = [
  {
    name: 'accent_search_patterns',
    description:
      'Search Accént 3.1 Human–AI lifecycle patterns, foundations, components, and theory essays across all 66+ open-source specifications.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query (e.g. "streaming markdown", "diff", "verification ledger", "zero-shot").',
        },
        section: {
          type: 'string',
          enum: ['start', 'essays', 'foundations', 'components', 'patterns', 'ai'],
          description: 'Optional section filter.',
        },
        aiPhase: {
          type: 'string',
          enum: ['discovering', 'instructing', 'observing', 'evaluating', 'refining', 'flows', 'architecture'],
          description: 'Optional Human–AI lifecycle phase filter.',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'accent_get_spec',
    description:
      'Retrieve a complete Accént 3.1 specification (Overview, Guidelines, Specs, Accessibility tabs, enforced rules, sub-patterns, and related essays) by slug.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'Page slug (e.g. "patterns/evaluating", "essays/dont-make-people-prompt", "components/pedestal").',
        },
      },
      required: ['slug'],
    },
  },
  {
    name: 'accent_get_brand_contract',
    description:
      'Return the complete Accént 3.1 STYLES.md contract, WCAG contrast audit, W3C tokens, and 49-pair AAA matrix summary for a brand dialect.',
    inputSchema: {
      type: 'object',
      properties: {
        brand: {
          type: 'string',
          enum: [
            'editorial-sandstone',
            'playful-principal',
            'albers-perspectives',
            'cassandra-noir',
            'hacienda-emerald',
            'terracotta-civic',
            'greater-terminal',
          ],
          description: 'Brand dialect ID (defaults to "editorial-sandstone").',
        },
      },
    },
  },
  {
    name: 'accent_lint_code',
    description:
      'Lint TSX/HTML/CSS code against all Accént 3.1 enforced AgentRules, zero-sparkle anti-slop ban, 13px typography floor, and nested Link/Button accessibility rules.',
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Component source code or markup snippet to audit.',
        },
      },
      required: ['code'],
    },
  },
];

const ACCENT_TOOL_NAMES = new Set(ACCENT_MCP_TOOL_DEFS.map((t) => t.name));

export function isAccentMcpTool(name: string): boolean {
  return ACCENT_TOOL_NAMES.has(name);
}

export interface AccentLintViolation {
  ruleId: string;
  severity: 'error' | 'warning';
  line: number;
  snippet: string;
  message: string;
  why: string;
}

function getLineNumber(source: string, index: number): number {
  return source.slice(0, Math.max(0, index)).split('\n').length;
}

function getLineSnippet(source: string, line: number): string {
  const lines = source.split('\n');
  return (lines[line - 1] ?? '').trim().slice(0, 140);
}

export function lintAccentCode(code: string): {
  ok: boolean;
  violationCount: number;
  scannedRuleCount: number;
  violations: AccentLintViolation[];
} {
  const violations: AccentLintViolation[] = [];
  const seen = new Set<string>();

  const pushViolation = (v: AccentLintViolation) => {
    const key = `${v.ruleId}:${v.line}`;
    if (seen.has(key)) return;
    seen.add(key);
    violations.push(v);
  };

  let scannedRuleCount = 0;

  // 1. Scan all registry AgentRules with regex violationPatterns
  for (const page of ACCENT_PAGES) {
    for (const rule of page.rules) {
      scannedRuleCount += 1;
      if (!rule.violationPattern) continue;
      try {
        const regex = new RegExp(rule.violationPattern, 'g');
        let match: RegExpExecArray | null;
        while ((match = regex.exec(code)) !== null) {
          const line = getLineNumber(code, match.index);
          pushViolation({
            ruleId: rule.id,
            severity: 'error',
            line,
            snippet: getLineSnippet(code, line),
            message: rule.statement,
            why: rule.why,
          });
          if (match[0].length === 0) break;
        }
      } catch {
        // Ignore malformed custom regex
      }
    }
  }

  // 2. Explicit Accént 3.1 invariant guards
  const sparkleRegex = /(?:import\b[^;\n]*\bSparkles\b|<Sparkles\b|✨)/g;
  let m: RegExpExecArray | null;
  while ((m = sparkleRegex.exec(code)) !== null) {
    const line = getLineNumber(code, m.index);
    pushViolation({
      ruleId: 'ai.no-sparkle-slop',
      severity: 'error',
      line,
      snippet: getLineSnippet(code, line),
      message: 'Remove Sparkles icon imports and ✨ glyphs; use bold Fraunces typography, color, or CHB punctuation marks (´, >, \\, :-]).',
      why: 'Zero sparkle cliché preserves serious editorial credibility.',
    });
  }

  const smallTextRegex = /\btext-\[(?:[0-9]|1[0-2])px\]/g;
  while ((m = smallTextRegex.exec(code)) !== null) {
    const line = getLineNumber(code, m.index);
    pushViolation({
      ruleId: 'type.floor-13',
      severity: 'error',
      line,
      snippet: getLineSnippet(code, line),
      message: 'Never render text smaller than 13px (0.8125rem).',
      why: 'Ensures effortless readability on mobile and high-DPI displays.',
    });
  }

  const nestedLinkBtnRegex = /<(?:Link|a)\b[\s\S]{0,240}?<button\b/gi;
  while ((m = nestedLinkBtnRegex.exec(code)) !== null) {
    const line = getLineNumber(code, m.index);
    pushViolation({
      ruleId: 'a11y.no-link-button-nesting',
      severity: 'error',
      line,
      snippet: getLineSnippet(code, line),
      message: 'Never nest a <button> inside <Link> or <a>; style the link directly or separate interactive actions.',
      why: 'Prevents invalid HTML interactive nesting and broken screen-reader focus.',
    });
  }

  return {
    ok: violations.length === 0,
    violationCount: violations.length,
    scannedRuleCount: scannedRuleCount + 3,
    violations,
  };
}

export function executeAccentMcpTool(
  toolName: string,
  args: Record<string, unknown>
): {
  structuredContent: unknown;
  content: Array<{ type: 'text'; text: string }>;
} {
  if (toolName === 'accent_search_patterns') {
    const rawQuery = String(args.query ?? '').trim().toLowerCase();
    if (!rawQuery) {
      throw Object.assign(new Error('`query` is required for accent_search_patterns.'), { rpcCode: -32602 });
    }
    const section = args.section ? (String(args.section).trim() as AccentSectionId) : undefined;
    const aiPhase = args.aiPhase ? (String(args.aiPhase).trim() as AiLifecyclePhase) : undefined;
    const terms = rawQuery.split(/\s+/).filter(Boolean);

    const ranked = ACCENT_PAGES.filter((p) => {
      if (section && p.section !== section) return false;
      if (aiPhase && p.aiPhase !== aiPhase) return false;
      return true;
    })
      .map((p) => {
        const hay = `${p.title} ${p.summary} ${p.slug} ${(p.subPatterns ?? []).join(' ')} ${p.rules
          .map((r) => `${r.id} ${r.statement}`)
          .join(' ')}`.toLowerCase();
        let score = 0;
        for (const t of terms) {
          if (p.title.toLowerCase().includes(t)) score += 4;
          if (p.slug.toLowerCase().includes(t)) score += 3;
          if ((p.subPatterns ?? []).some((sp) => sp.toLowerCase().includes(t))) score += 3;
          if (hay.includes(t)) score += 1;
        }
        return { page: p, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);

    const payload = {
      query: rawQuery,
      totalMatches: ranked.length,
      items: ranked.map(({ page, score }) => ({
        slug: page.slug,
        title: page.title,
        section: page.section,
        kind: page.kind ?? 'doc',
        aiPhase: page.aiPhase,
        subPatterns: page.subPatterns ?? [],
        liveInPipes: page.liveInPipes ?? [],
        relatedSlugs: page.relatedSlugs ?? [],
        summary: page.summary,
        ruleCount: page.rules.length,
        score,
      })),
    };

    return {
      structuredContent: payload,
      content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
    };
  }

  if (toolName === 'accent_get_spec') {
    const rawSlug = String(args.slug ?? '').trim().replace(/^\/?(?:design-system\/)?/, '');
    if (!rawSlug) {
      throw Object.assign(new Error('`slug` is required for accent_get_spec.'), { rpcCode: -32602 });
    }
    const page = getAccentPage(rawSlug);
    if (!page) {
      throw Object.assign(new Error(`Unknown Accént page slug: "${rawSlug}". Try accent_search_patterns first.`), {
        rpcCode: -32602,
      });
    }
    const payload = {
      slug: page.slug,
      title: page.title,
      section: page.section,
      kind: page.kind ?? 'doc',
      readingMinutes: page.readingMinutes,
      summary: page.summary,
      aiPhase: page.aiPhase,
      subPatterns: page.subPatterns ?? [],
      chromaticPair: page.chromaticPair,
      liveInPipes: page.liveInPipes ?? [],
      relatedSlugs: page.relatedSlugs ?? [],
      rules: page.rules,
      tabs: page.tabs,
    };
    return {
      structuredContent: payload,
      content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
    };
  }

  if (toolName === 'accent_get_brand_contract') {
    const requested = String(args.brand ?? 'editorial-sandstone').trim() as BrandProfileId;
    const profile = BRAND_PROFILES[requested] ?? BRAND_PROFILES['editorial-sandstone'];
    const contrastReport = validateThemeContrast(profile);
    const stylesMarkdown = generateStylesMarkdown(profile);
    const payload = {
      system: 'Accént 3.1',
      dialectId: profile.id,
      name: profile.name,
      mark: profile.mark,
      typography: profile.typography,
      structure: profile.structure,
      tokens: profile.tokens,
      contrastAudit: contrastReport,
      chromaticPalette: {
        pastels: Object.fromEntries(Object.entries(PASTELS).map(([k, v]) => [k, v.$value])),
        tonalDarks: Object.fromEntries(Object.entries(TONAL_DARKS).map(([k, v]) => [k, v.$value])),
      },
      totalSpecPages: ACCENT_PAGES.length,
      stylesMarkdown,
    };
    return {
      structuredContent: payload,
      content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
    };
  }

  if (toolName === 'accent_lint_code') {
    const code = String(args.code ?? '');
    if (!code.trim()) {
      throw Object.assign(new Error('`code` snippet is required for accent_lint_code.'), { rpcCode: -32602 });
    }
    const audit = lintAccentCode(code);
    return {
      structuredContent: audit,
      content: [{ type: 'text', text: JSON.stringify(audit, null, 2) }],
    };
  }

  throw Object.assign(new Error(`Unknown Accént MCP tool: ${toolName}`), { rpcCode: -32602 });
}
