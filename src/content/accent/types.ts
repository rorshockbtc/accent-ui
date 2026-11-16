/**
 * ´ Accént — Pipes Design System content contract.
 *
 * One structured source per page, rendered two ways:
 *  - humans read the four tabs (Overview / Guidelines / Specs / Accessibility)
 *  - local models and agents receive `rules` (also exported at /design-system/rules.json
 *    and consumed by the stepwise prompt compiler).
 *
 * Tab bodies are Markdown (rendered by MarkdownRenderer). A line containing only
 * `::demo:<demo-id>::` inserts a live demo component from the demo registry.
 */

export type AccentSectionId =
  | 'start'
  | 'essays'
  | 'foundations'
  | 'components'
  | 'patterns'
  | 'ai';

export type AccentTabId = 'overview' | 'guidelines' | 'specs' | 'accessibility';

export type AiLifecyclePhase =
  | 'discovering'
  | 'instructing'
  | 'observing'
  | 'evaluating'
  | 'refining'
  | 'flows'
  | 'architecture';

export type InsightCategory =
  | 'philosophy'
  | 'signals'
  | 'workflows'
  | 'case-studies'
  | 'cheatsheets';

export type AgentRule = {
  /** Stable dotted id, e.g. `grid.multiple-of-8`. */
  id: string;
  /** One-sentence rule a 7B model can follow. */
  statement: string;
  /** Plain-English reason, for humans. */
  why: string;
  /**
   * Optional regex source that, if it MATCHES generated code, indicates a violation.
   * Kept as a string so the rule set is JSON-serialisable.
   */
  violationPattern?: string;
};

export type AccentPage = {
  /** URL slug under /design-system, e.g. `foundations/grid`. */
  slug: string;
  section: AccentSectionId;
  title: string;
  /** One-line summary used in nav cards and meta description. */
  summary: string;
  /** Estimated reading minutes for the Overview tab. */
  readingMinutes: number;
  /** Markdown per tab. Essays use only `overview`. */
  tabs: Partial<Record<AccentTabId, string>>;
  rules: AgentRule[];
  /** Essays are rendered as a single long-form article without tabs. */
  kind?: 'doc' | 'essay';
  /** Cross-posted Pipes namespaces (essays). */
  pipes?: string[];
  /** Human-AI interaction lifecycle phase (for patterns index grouping). */
  aiPhase?: AiLifecyclePhase;
  /** Sub-patterns unified under a grouping spec (e.g. Prompt Suggestions, Prompt Enhancement). */
  subPatterns?: string[];
  /** Cross-chromatic pastel/dark editorial surface pair for pattern & insight hubs. */
  chromaticPair?: { pastel: string; dark: string };
  /** Real product routes in Pipes / CHB where this pattern runs in production. */
  liveInPipes?: Array<{ label: string; href: string }>;
  /** Vertical category for /design-system/insights & /design-system/philosophy. */
  insightCategory?: InsightCategory;
  /** Cross-linked complementary doc/essay slugs. */
  relatedSlugs?: string[];
};
