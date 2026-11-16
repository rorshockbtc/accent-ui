'use client';

import React, { useId, useMemo, useRef, useState, useEffect } from 'react';
import { diffLines, diffWords } from 'diff';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { CURATED_PAIRINGS } from '@/styles/design-tokens';

/* ============================================================================
 * Accént 3.1 — Human–AI Interaction Primitives (MIT Open Source)
 * Self-contained across both `pipes-unified` and standalone `accent-ui`:
 * Zero Pipes-only imports, zero `next/link`, zero sparkle icons or emoji chrome.
 * Strict adherence to `modern-web-guidance` (tabs, accordion, hovercard,
 * search-hidden-content, responsive-table) + WCAG 1.4.1 / AAA luminance.
 * ========================================================================== */

export type AccentEngineTierId = 'local-0ms' | 'webgpu-slm' | 'cloud-byok';

export interface AccentEngineTierSpec {
  id: AccentEngineTierId;
  numeral: string;
  label: string;
  shortLabel: string;
  latency: string;
  footprint: string;
  privacyPosture: string;
  description: string;
  pairingIndex: number;
}

export const DEFAULT_ENGINE_TIERS: AccentEngineTierSpec[] = [
  {
    id: 'local-0ms',
    numeral: '01',
    label: 'Instant Local (0ms)',
    shortLabel: '01 · Local 0ms',
    latency: '0 ms deterministic',
    footprint: '0 MB RAM · Zero network',
    privacyPosture: 'Air-gapped client rules & structured SQL/templates',
    description:
      'Executes structured filters, W3C token math, and pre-compiled DuckDB/Parquet slices instantaneously before invoking any neural weights.',
    pairingIndex: 4, // Ice Sky + Marine Abyss
  },
  {
    id: 'webgpu-slm',
    numeral: '02',
    label: 'Browser WebGPU SLM',
    shortLabel: '02 · WebGPU SLM',
    latency: '18–45 tok/s on-device',
    footprint: '~1.1 GB IndexedDB cache',
    privacyPosture: '100% sovereign on-device Web Worker (Qwen 1.7B/4B)',
    description:
      'Runs small language models locally in IndexedDB and WebGPU Workers when synthesis requires flexible prose without external server logs.',
    pairingIndex: 3, // Botanical Sage + Forest
  },
  {
    id: 'cloud-byok',
    numeral: '03',
    label: 'Sovereign BYOK Stream',
    shortLabel: '03 · Sovereign BYOK',
    latency: 'SSE streaming + AbortController',
    footprint: 'User API key · SHA-256 receipt',
    privacyPosture: 'Byte-0 pruned (~) envelope with signed citation ledger',
    description:
      'Streams deep cross-corpus synthesis using user-supplied credentials, bounded by verifiable primary-source citations and human-in-the-loop diffs.',
    pairingIndex: 1, // Sunlit Peach + Saddle Leather
  },
];

/* -------------------------------------------------------------------------- */
/* 1. AccentEngineTierSwitch — Progressive Local Intelligence Switcher        */
/* Single-row `role="tablist"` with pseudo-element border-bottom (WCAG 1.4.1)  */
/* -------------------------------------------------------------------------- */
export function AccentEngineTierSwitch({
  tiers = DEFAULT_ENGINE_TIERS,
  value,
  onChange,
  label = 'Execution Intelligence Tier',
}: {
  tiers?: AccentEngineTierSpec[];
  value?: AccentEngineTierId;
  onChange?: (tier: AccentEngineTierId) => void;
  label?: string;
}) {
  const [internalTier, setInternalTier] = useState<AccentEngineTierId>(tiers[0]?.id ?? 'local-0ms');
  const activeId = value ?? internalTier;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const selectTier = (next: AccentEngineTierId) => {
    if (value === undefined) setInternalTier(next);
    onChange?.(next);
  };

  const activeTier = tiers.find((t) => t.id === activeId) ?? tiers[0];
  const pairing = CURATED_PAIRINGS[activeTier.pairingIndex % CURATED_PAIRINGS.length];

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tiers.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tiers.length) % tiers.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = tiers.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      selectTier(tiers[nextIdx].id);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  return (
    <section aria-label={label} className="border-t-2 border-[var(--a-ink)] bg-[var(--a-surface)]">
      {/* Single-row non-wrapping tab strip (`tabs` guidance) */}
      <div
        role="tablist"
        aria-label={label}
        className="flex flex-nowrap overflow-x-auto border-b border-[var(--a-rule)] px-3 sm:px-5 gap-2"
      >
        {tiers.map((tier, idx) => {
          const isSelected = tier.id === activeTier.id;
          return (
            <button
              key={tier.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`${baseId}-tab-${tier.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${tier.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => selectTier(tier.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`accent-tab-btn min-h-[44px] shrink-0 whitespace-nowrap px-3 py-2 font-mono text-[13px] transition-colors cursor-pointer ${
                isSelected
                  ? 'font-bold text-[var(--a-ink)]'
                  : 'font-medium text-[var(--a-muted)] hover:text-[var(--a-ink)]'
              }`}
            >
              {tier.shortLabel}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel-${activeTier.id}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeTier.id}`}
        className="p-4 sm:p-6"
      >
        <div
          className="border-l-4 pl-4 sm:pl-5 py-1"
          style={{ borderColor: pairing.background }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <span
                className="font-serif text-3xl sm:text-4xl font-semibold tabular-nums"
                style={{ color: 'var(--a-accent-text)' }}
              >
                {activeTier.numeral}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--a-ink)]">
                {activeTier.label}
              </h3>
            </div>
            <span className="font-mono text-[13px] text-[var(--a-muted)] tabular-nums">
              {activeTier.latency}
            </span>
          </div>

          <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--a-ink)]">
            {activeTier.description}
          </p>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2 border-t border-[var(--a-rule)] pt-3 text-[13px] font-mono">
            <div>
              <dt className="text-[var(--a-muted)] uppercase tracking-wider">Memory &amp; Compute</dt>
              <dd className="mt-0.5 font-semibold text-[var(--a-ink)]">{activeTier.footprint}</dd>
            </div>
            <div>
              <dt className="text-[var(--a-muted)] uppercase tracking-wider">Custody &amp; Privacy</dt>
              <dd className="mt-0.5 font-semibold text-[var(--a-ink)]">{activeTier.privacyPosture}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. AccentPromptComposer — Structured Recipes + Context Chips + Abort Stop  */
/* -------------------------------------------------------------------------- */
export interface AccentPromptRecipe {
  id: string;
  label: string;
  template: string;
  scope?: string;
}

export interface AccentContextScope {
  id: string;
  label: string;
}

export function AccentPromptComposer({
  value,
  onChange,
  recipes = [],
  contextScopes = [],
  onRemoveScope,
  onSubmit,
  onStop,
  streaming = false,
  onVoiceToggle,
  voiceActive = false,
  placeholder = 'Ask a question or pick a structured recipe above — use pipe\\slug to ground citations...',
  submitLabel = 'Run Query',
}: {
  value?: string;
  onChange?: (val: string) => void;
  recipes?: AccentPromptRecipe[];
  contextScopes?: AccentContextScope[];
  onRemoveScope?: (id: string) => void;
  onSubmit?: (payload: { prompt: string; recipeId?: string; scopes: string[] }) => void;
  onStop?: () => void;
  streaming?: boolean;
  onVoiceToggle?: () => void;
  voiceActive?: boolean;
  placeholder?: string;
  submitLabel?: string;
}) {
  const [internalValue, setInternalValue] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | undefined>(recipes[0]?.id);
  const inputId = useId();

  const text = value ?? internalValue;
  const setText = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const applyRecipe = (recipe: AccentPromptRecipe) => {
    setSelectedRecipeId(recipe.id);
    setText(recipe.template);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (streaming) {
      onStop?.();
      return;
    }
    if (!text.trim()) return;
    onSubmit?.({
      prompt: text.trim(),
      recipeId: selectedRecipeId,
      scopes: contextScopes.map((s) => s.id),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t-2 border-[var(--a-ink)] bg-[var(--a-surface)] p-4 sm:p-5 space-y-4"
    >
      {/* Structured zero-shot recipe selector ("Don't Make People Prompt") */}
      {recipes.length > 0 && (
        <div className="space-y-1.5">
          <span className="block font-mono text-[13px] font-semibold uppercase tracking-wider text-[var(--a-muted)]">
            01 · Structured Intent Recipes (Zero Prompting Required)
          </span>
          <div className="flex flex-wrap gap-2">
            {recipes.map((r) => {
              const active = selectedRecipeId === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => applyRecipe(r)}
                  className={`min-h-[44px] px-3.5 py-2 font-mono text-[13px] border transition-colors cursor-pointer ${
                    active
                      ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)] font-semibold'
                      : 'border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-ink)] hover:border-[var(--a-accent)]'
                  }`}
                >
                  &gt; {r.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grounded Context Scopes (`pipe\...`) */}
      {contextScopes.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-y border-[var(--a-rule)] py-2">
          <span className="font-mono text-[13px] text-[var(--a-muted)]">Scoped Canons:</span>
          {contextScopes.map((s) => (
            <span
              key={s.id}
              className="inline-flex items-center gap-1.5 pl-2.5 pr-1 border border-[var(--a-rule)] bg-[var(--a-bg)] font-mono text-[13px] text-[var(--a-ink)]"
            >
              <span>{s.label}</span>
              {onRemoveScope && (
                <button
                  type="button"
                  onClick={() => onRemoveScope(s.id)}
                  aria-label={`Remove scope ${s.label}`}
                  className="min-h-[44px] min-w-[36px] inline-flex items-center justify-center text-[var(--a-muted)] hover:text-[var(--a-ink)] cursor-pointer"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      {/* Input well + explicit Submit / AbortController Stop */}
      <div className="space-y-2">
        <label htmlFor={inputId} className="sr-only">
          Query or prompt input
        </label>
        <textarea
          id={inputId}
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-[var(--a-rule)] bg-[var(--a-well)] px-3.5 py-3 text-sm sm:text-base text-[var(--a-ink)] placeholder:text-[var(--a-muted)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--a-accent)]"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            {onVoiceToggle && (
              <button
                type="button"
                aria-pressed={voiceActive}
                onClick={onVoiceToggle}
                className="min-h-[44px] px-3.5 rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] font-mono text-[13px] font-semibold text-[var(--a-ink)] hover:border-[var(--a-accent)] cursor-pointer"
              >
                {voiceActive ? '~ Listening...' : '~ Dictate'}
              </button>
            )}
            <span className="font-mono text-[13px] text-[var(--a-muted)] tabular-nums">
              {text.length} chars
            </span>
          </div>

          <div className="flex items-center gap-2">
            {streaming && onStop ? (
              <button
                type="button"
                onClick={onStop}
                className="min-h-[44px] px-4 rounded-md border-2 border-[#9F1239] bg-[#9F1239] text-white font-mono text-[13px] font-semibold cursor-pointer hover:opacity-90"
              >
                ■ Stop Generation
              </button>
            ) : (
              <button
                type="submit"
                disabled={!text.trim()}
                style={{ borderRadius: 'var(--a-radius-cta, 6px)' }}
                className="min-h-[44px] px-5 bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] font-mono text-[13px] font-semibold disabled:opacity-45 hover:opacity-95 cursor-pointer disabled:cursor-not-allowed"
              >
                &gt; {submitLabel} →
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. healStreamingMarkdown & AccentStreamingProse — Self-Healing Stream       */
/* -------------------------------------------------------------------------- */
export function healStreamingMarkdown(raw: string): string {
  if (!raw) return '';
  let out = raw;

  // 1. Close unclosed triple-backtick code fences safely mid-stream.
  const fenceMatches = out.match(/```/g);
  const hasOpenFence = Boolean(fenceMatches && fenceMatches.length % 2 === 1);
  if (hasOpenFence) {
    out = `${out}\n\`\`\``;
    return out;
  }

  // 2. Fix incomplete Markdown table header divider if header row arrived without separator row.
  const lines = out.split('\n');
  if (lines.length >= 1) {
    const last = lines[lines.length - 1];
    const prev = lines.length >= 2 ? lines[lines.length - 2] : '';
    if (last.trim().startsWith('|') && prev.trim().startsWith('|') && /^\|[\s:-]*$/.test(last.trim())) {
      const colCount = Math.max(1, prev.split('|').filter((c) => c.trim().length > 0).length);
      lines[lines.length - 1] = `| ${Array(colCount).fill('---').join(' | ')} |`;
      out = lines.join('\n');
    }
  }

  // 3. Heal unclosed inline code backtick or bold marker on the trailing line.
  const finalLines = out.split('\n');
  let tail = finalLines[finalLines.length - 1] ?? '';
  const singleTicks = (tail.match(/`/g) || []).length;
  if (singleTicks % 2 === 1) {
    tail = `${tail}\``;
  }
  const boldMarkers = (tail.match(/\*\*/g) || []).length;
  if (boldMarkers % 2 === 1) {
    tail = `${tail}**`;
  }
  finalLines[finalLines.length - 1] = tail;
  return finalLines.join('\n');
}

export function AccentStreamingProse({
  markdown,
  streaming = false,
  statusLabel,
}: {
  markdown: string;
  streaming?: boolean;
  statusLabel?: string;
}) {
  const healed = useMemo(() => healStreamingMarkdown(markdown), [markdown]);

  return (
    <div className="space-y-2">
      <div
        aria-live="polite"
        className="flex items-center justify-between border-b border-[var(--a-rule)] pb-2 font-mono text-[13px]"
      >
        <span className="font-semibold text-[var(--a-ink)]">
          <span className="text-[var(--a-accent-text)] mr-1.5" aria-hidden="true">&gt;</span>
          {statusLabel ?? (streaming ? 'Streaming synthesis...' : 'Synthesis complete')}
        </span>
        <span className="text-[var(--a-muted)] tabular-nums">
          {markdown.length} chars
        </span>
      </div>

      <div className="relative">
        <MarkdownRenderer content={healed} />
        {streaming && (
          <span
            aria-hidden="true"
            className="inline-block ml-1 px-1.5 font-mono text-[13px] font-bold bg-[var(--a-ink)] text-[var(--a-bg)]"
          >
            &gt;
          </span>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. AccentReasoningTrace — Searchable Native <details> Reasoning Log        */
/* Rules (`modern-web-guidance`): NO heading inside <summary>; marker before   */
/* label text; plain DOM inside <details> is natively Cmd+F searchable.       */
/* -------------------------------------------------------------------------- */
export interface AccentTraceStep {
  id: string;
  phase: string;
  label: string;
  durationMs?: number;
  detail: string;
  source?: string;
}

export function AccentReasoningTrace({
  steps,
  summaryLabel = 'Reasoning & Retrieval Trace',
  defaultOpen = false,
}: {
  steps: AccentTraceStep[];
  summaryLabel?: string;
  defaultOpen?: boolean;
}) {
  const totalMs = steps.reduce((acc, s) => acc + (s.durationMs ?? 0), 0);

  return (
    <details
      open={defaultOpen}
      className="accent-disclosure border-y border-[var(--a-rule)] bg-[var(--a-surface)]/70 px-4 py-1"
    >
      <summary className="min-h-[44px] flex flex-wrap items-center gap-2 cursor-pointer font-mono text-[13px] font-semibold text-[var(--a-ink)] select-none">
        <span className="accent-disclosure-marker text-[var(--a-accent-text)] font-bold" aria-hidden="true">
          ▸
        </span>
        <span>{summaryLabel}</span>
        <span className="text-[var(--a-muted)] font-normal tabular-nums">
          ({steps.length} steps{totalMs > 0 ? ` · ${totalMs}ms` : ''})
        </span>
      </summary>

      <ol className="divide-y divide-[var(--a-rule)] border-t border-[var(--a-rule)] mt-1">
        {steps.map((step, i) => (
          <li key={step.id} className="py-3 grid gap-1 sm:grid-cols-[120px_1fr_auto] sm:items-baseline sm:gap-4 text-[13px]">
            <span className="font-mono font-bold text-[var(--a-accent-text)] tabular-nums">
              {String(i + 1).padStart(2, '0')} · {step.phase}
            </span>
            <div>
              <p className="font-semibold text-[var(--a-ink)]">{step.label}</p>
              <p className="mt-0.5 text-[var(--a-muted)] leading-relaxed">{step.detail}</p>
              {step.source && (
                <p className="mt-1 font-mono text-[var(--a-ink)]">Source: {step.source}</p>
              )}
            </div>
            {typeof step.durationMs === 'number' && (
              <span className="font-mono text-[var(--a-muted)] tabular-nums">
                {step.durationMs}ms
              </span>
            )}
          </li>
        ))}
      </ol>
    </details>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. AccentCitationLink & AccentVerificationLedger                           */
/* `hovercard` rules: `aria-describedby` + `role="tooltip"` on [popover],     */
/* NEVER `aria-expanded` on navigation/action link; supplemental preview only.*/
/* -------------------------------------------------------------------------- */
export interface AccentCitationEntry {
  id: string;
  claim: string;
  sourceTitle: string;
  pipeNamespace: string;
  href: string;
  cid: string;
  confidencePct: number;
  verifiedAt: string;
}

export function AccentCitationLink({
  index,
  title,
  pipeNamespace,
  href,
  cid,
  verifiedAt,
}: {
  index: number;
  title: string;
  pipeNamespace: string;
  href: string;
  cid: string;
  verifiedAt: string;
}) {
  const tooltipId = useId();
  const popoverRef = useRef<HTMLSpanElement | null>(null);
  const [fallbackOpen, setFallbackOpen] = useState(false);

  const showHint = () => {
    setFallbackOpen(true);
    try {
      const el = popoverRef.current as (HTMLSpanElement & { showPopover?: () => void }) | null;
      if (el && typeof el.showPopover === 'function' && !el.matches(':popover-open')) {
        el.showPopover();
      }
    } catch {
      // gracefully degrade to fallbackOpen if top-layer popover unavailable
    }
  };

  const hideHint = () => {
    setFallbackOpen(false);
    try {
      const el = popoverRef.current as (HTMLSpanElement & { hidePopover?: () => void }) | null;
      if (el && typeof el.hidePopover === 'function' && el.matches(':popover-open')) {
        el.hidePopover();
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!fallbackOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hideHint();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fallbackOpen]);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={showHint}
      onMouseLeave={hideHint}
    >
      <a
        href={href}
        aria-describedby={tooltipId}
        onFocus={showHint}
        onBlur={hideHint}
        className="inline-flex items-baseline gap-1 px-1.5 py-0.5 border-b-2 border-[var(--a-accent)] font-mono text-[13px] font-bold text-[var(--a-accent-text)] hover:bg-[var(--a-surface)] transition-colors"
      >
        <span>[{String(index).padStart(2, '0')}]</span>
        <span className="underline underline-offset-4">{title}</span>
      </a>

      <span
        ref={popoverRef}
        id={tooltipId}
        role="tooltip"
        popover="manual"
        className={`accent-hovercard border-2 border-[var(--a-ink)] bg-[var(--a-well)] p-3 text-left text-[13px] text-[var(--a-ink)] ${
          fallbackOpen ? 'block' : 'hidden'
        }`}
      >
        <span className="block font-mono font-bold text-[var(--a-accent-text)]">{pipeNamespace}</span>
        <span className="block mt-1 font-serif text-base font-semibold leading-snug">{title}</span>
        <span className="block mt-1.5 font-mono text-[var(--a-muted)]">CID: {cid.slice(0, 16)}…</span>
        <span className="block font-mono text-[var(--a-muted)]">Verified: {verifiedAt} · Click link to open source</span>
      </span>
    </span>
  );
}

export function AccentVerificationLedger({
  entries,
  label = 'Primary-Source Verification Ledger',
  caption = 'Every synthesized claim links directly to its SHA-256 content-addressed source node.',
}: {
  entries: AccentCitationEntry[];
  label?: string;
  caption?: string;
}) {
  return (
    <section aria-label={label} className="space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)]">
          {label} ({entries.length})
        </h3>
        <p className="text-[13px] text-[var(--a-muted)]">{caption}</p>
      </div>

      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="overflow-x-auto border-y border-[var(--a-rule)] bg-[var(--a-bg)]"
      >
        <table className="w-full min-w-[600px] border-collapse text-left text-sm">
          <thead className="sticky top-0 bg-[var(--a-surface)] border-b-2 border-[var(--a-ink)] font-mono text-[13px] uppercase tracking-wider text-[var(--a-muted)]">
            <tr>
              <th scope="col" className="py-3 px-3">Ref</th>
              <th scope="col" className="py-3 px-3">Claim / Finding</th>
              <th scope="col" className="py-3 px-3">Canon</th>
              <th scope="col" className="py-3 px-3">SHA-256 CID</th>
              <th scope="col" className="py-3 px-3 text-right">Match</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--a-rule)]">
            {entries.map((entry, idx) => (
              <tr key={entry.id} className="hover:bg-[var(--a-surface)] transition-colors">
                <td className="py-3.5 px-3 font-mono font-bold tabular-nums text-[var(--a-accent-text)]">
                  [{String(idx + 1).padStart(2, '0')}]
                </td>
                <td className="py-3.5 px-3">
                  <p className="font-medium text-[var(--a-ink)]">{entry.claim}</p>
                  <a
                    href={entry.href}
                    className="mt-1 inline-flex min-h-[44px] items-center font-mono text-[13px] underline underline-offset-4 text-[var(--a-link)] hover:text-[var(--a-accent-text)]"
                  >
                    Inspect Source: {entry.sourceTitle} →
                  </a>
                </td>
                <td className="py-3.5 px-3 font-mono text-[13px] text-[var(--a-ink)] whitespace-nowrap">
                  {entry.pipeNamespace}
                </td>
                <td className="py-3.5 px-3 font-mono text-[13px] text-[var(--a-muted)] whitespace-nowrap">
                  {entry.cid.slice(0, 14)}…
                </td>
                <td className="py-3.5 px-3 font-mono text-[13px] font-semibold text-right tabular-nums whitespace-nowrap">
                  {entry.confidencePct}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. AccentDiffViewer (MIT jsdiff) & AccentFollowUpList ("Seal to Pipe")     */
/* Accessible shape+prefix indicators (`[-]` / `[+]`), never color alone.     */
/* -------------------------------------------------------------------------- */
export function AccentDiffViewer({
  before,
  after,
  title = 'Proposed Revision Diff',
  onAccept,
  onReject,
}: {
  before: string;
  after: string;
  title?: string;
  onAccept?: (acceptedText: string) => void;
  onReject?: () => void;
}) {
  const [granularity, setGranularity] = useState<'words' | 'lines'>('words');
  const [decision, setDecision] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  const hunks = useMemo(
    () => (granularity === 'words' ? diffWords(before, after) : diffLines(before, after)),
    [before, after, granularity]
  );

  return (
    <div className="border-t-2 border-[var(--a-ink)] bg-[var(--a-surface)] p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--a-rule)] pb-3">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[var(--a-ink)]">{title}</h3>
          <p className="font-mono text-[13px] text-[var(--a-muted)]">
            Computed cleanly client-side via MIT jsdiff · [-] Removed / [+] Added
          </p>
        </div>
        <div className="flex items-center gap-1 font-mono text-[13px]">
          {(['words', 'lines'] as const).map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={granularity === g}
              onClick={() => setGranularity(g)}
              className={`min-h-[44px] px-3 border cursor-pointer capitalize ${
                granularity === g
                  ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)] font-semibold'
                  : 'border-[var(--a-rule)] bg-[var(--a-bg)] text-[var(--a-ink)]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div
        tabIndex={0}
        className={`rounded-md border border-[var(--a-rule)] bg-[var(--a-well)] p-4 text-sm sm:text-base leading-relaxed overflow-x-auto ${
          granularity === 'lines' ? 'font-mono text-[13px] whitespace-pre-wrap' : ''
        }`}
      >
        {hunks.map((part, idx) => {
          if (part.removed) {
            return (
              <del
                key={idx}
                className="mx-0.5 px-1 border-b-2 border-[#9F1239] bg-[#9F1239]/10 text-[#9F1239] dark:text-[#FDA4AF] line-through"
              >
                <span className="font-mono text-[13px] no-underline mr-0.5">[-]</span>
                {part.value}
              </del>
            );
          }
          if (part.added) {
            return (
              <ins
                key={idx}
                className="mx-0.5 px-1 border-b-2 border-[#1B5E3A] bg-[#1B5E3A]/10 text-[#14532D] dark:text-[#86EFAC] underline decoration-2 underline-offset-4"
              >
                <span className="font-mono text-[13px] no-underline mr-0.5">[+]</span>
                {part.value}
              </ins>
            );
          }
          return <span key={idx}>{part.value}</span>;
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <span className="font-mono text-[13px] text-[var(--a-muted)]">
          Status: {decision.toUpperCase()}
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setDecision('rejected');
              onReject?.();
            }}
            className="min-h-[44px] px-4 rounded-md border border-[var(--a-rule)] bg-[var(--a-bg)] font-mono text-[13px] font-semibold text-[var(--a-ink)] hover:border-[#9F1239] cursor-pointer"
          >
            × Reject Revision
          </button>
          <button
            type="button"
            onClick={() => {
              setDecision('accepted');
              onAccept?.(after);
            }}
            style={{ borderRadius: 'var(--a-radius-cta, 6px)' }}
            className="min-h-[44px] px-4 bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] font-mono text-[13px] font-semibold hover:opacity-95 cursor-pointer"
          >
            + Accept into Draft
          </button>
        </div>
      </div>
    </div>
  );
}

export function AccentFollowUpList({
  questions,
  onSelectQuestion,
  onSealToPipe,
  sealTarget = 'pipe\\my-pipe',
}: {
  questions: string[];
  onSelectQuestion?: (question: string) => void;
  onSealToPipe?: () => void;
  sealTarget?: string;
}) {
  return (
    <section aria-label="Socratic Follow-Ups & Pipe Graduation" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-mono text-[13px] font-bold uppercase tracking-wider text-[var(--a-ink)]">
          Socratic Branches &amp; Distillation
        </h3>
        {onSealToPipe && (
          <button
            type="button"
            onClick={onSealToPipe}
            style={{ borderRadius: 'var(--a-radius-cta, 6px)' }}
            className="min-h-[44px] px-4 bg-[var(--a-ink)] text-[var(--a-bg)] font-mono text-[13px] font-semibold hover:bg-[var(--a-accent-fill)] hover:text-white transition-colors cursor-pointer"
          >
            \ Seal Verified Synthesis to {sealTarget}
          </button>
        )}
      </div>

      <ul className="divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
        {questions.map((q) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => onSelectQuestion?.(q)}
              className="min-h-[44px] w-full py-3 px-2 text-left flex items-baseline justify-between gap-4 hover:bg-[var(--a-surface)] transition-colors cursor-pointer"
            >
              <span className="text-sm sm:text-base text-[var(--a-ink)]">
                <span className="font-mono font-bold text-[var(--a-accent-text)] mr-2" aria-hidden="true">&gt;</span>
                {q}
              </span>
              <span className="font-mono text-[13px] text-[var(--a-muted)] shrink-0">Branch →</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
