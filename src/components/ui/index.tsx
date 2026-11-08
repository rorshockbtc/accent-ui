'use client';

import React, { useEffect, useId } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { BACKDROP_FADE, RISE, SHEET_SLIDE_UP, SPRING_LAYOUT } from '@/lib/motion/tokens';
import type { SurfaceMode } from '@/styles/design-tokens';

export type AccentButtonVariant = 'primary' | 'sky' | 'sky-ice' | 'ink' | 'outline' | 'ghost';
export type AccentButtonSize = 'sm' | 'md' | 'lg';

function getButtonClasses(
  variant: AccentButtonVariant = 'primary',
  size: AccentButtonSize = 'md',
  surfaceMode: SurfaceMode = 'editorial',
  className = '',
): string {
  const base =
    'inline-flex items-center justify-center gap-2 font-sans font-semibold t-press t-color cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-accent)] disabled:opacity-45 disabled:pointer-events-none';

  const sizeMap: Record<AccentButtonSize, string> = {
    sm: 'min-h-[44px] px-3.5 text-xs rounded-[var(--a-radius-cta,6px)]',
    md: 'min-h-[44px] px-5 text-sm rounded-[var(--a-radius-cta,6px)]',
    lg: 'min-h-[48px] px-6 text-sm uppercase tracking-wider rounded-[var(--a-radius-cta,6px)]',
  };

  const variantMap: Record<AccentButtonVariant, string> = {
    primary:
      'bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] hover:bg-[var(--a-accent-fill-hover)] border border-transparent',
    sky: 'bg-[var(--a-sky)] text-[var(--a-sky-fg)] hover:opacity-90 border border-[#111827]/20',
    'sky-ice':
      'bg-[var(--a-sky-surface)] text-[var(--a-sky-ink)] hover:border-[var(--a-sky-text)] border border-[var(--a-sky)]/40',
    ink: 'bg-[var(--a-ink)] text-[var(--a-bg)] hover:opacity-90 border border-transparent',
    outline:
      'bg-transparent text-[var(--a-ink)] border border-[var(--a-rule)] hover:border-[var(--a-ink)] hover:bg-[var(--a-surface)]',
    ghost: 'bg-transparent text-[var(--a-ink)] hover:bg-[var(--a-rule)] border border-transparent',
  };

  const modePhysics =
    surfaceMode === 'commercial'
      ? 'rounded-none border-[#111827] shadow-[3px_3px_0px_#111827] dark:shadow-[3px_3px_0px_#F3EFE9] hover:-translate-y-0.5 active:translate-y-0'
      : 'active:scale-[0.97]';

  return [base, sizeMap[size], variantMap[variant], modePhysics, className]
    .filter(Boolean)
    .join(' ');
}

export interface AccentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AccentButtonVariant;
  size?: AccentButtonSize;
  surfaceMode?: SurfaceMode;
}

export function AccentButton({
  variant = 'primary',
  size = 'md',
  surfaceMode = 'editorial',
  className = '',
  type = 'button',
  children,
  ...rest
}: AccentButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClasses(variant, size, surfaceMode, className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export interface AccentLinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: AccentButtonVariant;
  size?: AccentButtonSize;
  surfaceMode?: SurfaceMode;
}

/**
 * Semantic Link styled as an Accént button.
 * Eliminates invalid `<Link><button>` nesting (rule `button.no-interactive-nesting`).
 */
export function AccentLinkButton({
  href,
  variant = 'primary',
  size = 'md',
  surfaceMode = 'editorial',
  className = '',
  children,
  ...rest
}: AccentLinkButtonProps) {
  return (
    <Link
      href={href}
      className={getButtonClasses(variant, size, surfaceMode, className)}
      {...rest}
    >
      {children}
    </Link>
  );
}

export interface AccentIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  variant?: 'outline' | 'ghost' | 'ink' | 'sky-ice';
}

/**
 * Enforces `button.hit-area-44` (`44×44px`) and `button.icon-needs-label`.
 */
export function AccentIconButton({
  variant = 'outline',
  className = '',
  type = 'button',
  children,
  ...rest
}: AccentIconButtonProps) {
  const variantStyles = {
    outline: 'border border-[var(--a-rule)] text-[var(--a-ink)] hover:border-[var(--a-ink)] bg-transparent',
    ghost: 'border border-transparent text-[var(--a-ink)] hover:bg-[var(--a-rule)]',
    ink: 'bg-[var(--a-ink)] text-[var(--a-bg)] border border-transparent',
    'sky-ice': 'bg-[var(--a-sky-surface)] text-[var(--a-sky-ink)] border border-[var(--a-sky)]/40',
  }[variant];

  return (
    <button
      type={type}
      className={`h-11 w-11 shrink-0 rounded-md grid place-items-center t-press t-color active:scale-[0.97] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-accent)] disabled:opacity-35 ${variantStyles} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export type AccentBadgeTone = 'neutral' | 'pink' | 'sky' | 'emerald';

export function AccentBadge({
  tone = 'neutral',
  className = '',
  children,
}: {
  tone?: AccentBadgeTone;
  className?: string;
  children: React.ReactNode;
}) {
  const tones: Record<AccentBadgeTone, string> = {
    neutral: 'bg-[var(--a-surface)] text-[var(--a-ink)] border-[var(--a-rule)]',
    pink: 'bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] border-transparent',
    sky: 'bg-[var(--a-sky-surface)] text-[var(--a-sky-ink)] border-[var(--a-sky)]/35',
    emerald: 'bg-emerald-950/10 text-[var(--a-emerald)] border-[var(--a-emerald)]/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm border text-xs font-mono font-semibold tracking-wider uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function AccentField({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[var(--a-ink)]">
        {label}
      </label>
      {hint && <p className="text-xs text-[var(--a-muted)]">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-[var(--a-accent-text)]">
          {error}
        </p>
      )}
    </div>
  );
}

export function AccentInput({
  className = '',
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full min-h-[44px] px-3.5 rounded-md bg-[var(--a-well)] text-[var(--a-ink)] border border-[var(--a-rule)] text-base sm:text-sm focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--a-accent)] ${className}`}
      {...rest}
    />
  );
}

export interface AccentTabItem<T extends string = string> {
  id: T;
  label: string;
  mobileLabel?: string;
  count?: number;
}

/**
 * Accént underline tablist (`components/tabs` & `patterns/mobile` 4-column mobile reflow).
 */
export function AccentTabs<T extends string = string>({
  tabs,
  activeTab,
  onSelect,
  ariaLabel,
  className = '',
}: {
  tabs: AccentTabItem<T>[];
  activeTab: T;
  onSelect: (id: T) => void;
  ariaLabel: string;
  className?: string;
}) {
  const tabsId = useId();
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`grid grid-cols-4 sm:flex sm:flex-wrap border-b border-[var(--a-rule)] gap-0 sm:gap-6 ${className}`}
    >
      {tabs.map((t) => {
        const active = t.id === activeTab;
        return (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onSelect(t.id)}
            className={`relative min-h-[44px] px-2 sm:px-1 -mb-px text-xs sm:text-sm font-medium t-color cursor-pointer whitespace-nowrap truncate ${
              active
                ? 'text-[var(--a-ink)] font-semibold'
                : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
            }`}
          >
            <span className="sm:hidden">{t.mobileLabel ?? t.label}</span>
            <span className="hidden sm:inline">{t.label}</span>
            {typeof t.count === 'number' && (
              <span className="ml-1 font-mono text-xs text-[var(--a-muted)] tabular-nums">
                ({t.count})
              </span>
            )}
            {active && (
              <m.span
                layoutId={`${tabsId}-underline`}
                transition={SPRING_LAYOUT}
                className="absolute inset-x-0 bottom-0 h-0.5 bg-[var(--a-accent)]"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Enforces `card.no-nesting`: 1px hairline-divided ordered list with tabular serif index numbers (`01`–`99`).
 */
export function AccentHairlineList({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ol className={`divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)] ${className}`}>
      {children}
    </ol>
  );
}

export function AccentHairlineItem({
  index,
  children,
  className = '',
}: {
  index?: number | string;
  children: React.ReactNode;
  className?: string;
}) {
  const formattedIndex =
    typeof index === 'number' ? String(index).padStart(2, '0') : index;

  if (formattedIndex === undefined) {
    return <li className={`py-5 ${className}`}>{children}</li>;
  }

  return (
    <li className={`py-5 grid grid-cols-[48px_1fr] gap-4 items-baseline ${className}`}>
      <span className="font-serif text-xl text-[var(--a-muted)] tabular-nums select-none">
        {formattedIndex}
      </span>
      <div className="min-w-0">{children}</div>
    </li>
  );
}

export interface ResponsiveTableColumn<Row> {
  key: string;
  header: string;
  render: (row: Row) => React.ReactNode;
  isPrimary?: boolean;
}

/**
 * Enforces `patterns/mobile`: semantic `<table>` on `md+`, stacked `<dl>` hairline cards on `< md`
 * so mobile viewports (`390×844`) never scroll horizontally.
 */
export function AccentResponsiveTable<Row>({
  caption,
  columns,
  rows,
  getRowKey,
}: {
  caption?: string;
  columns: ResponsiveTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, idx: number) => string;
}) {
  const primaryCol = columns.find((c) => c.isPrimary) ?? columns[0];
  const detailCols = columns.filter((c) => c.key !== primaryCol.key);

  return (
    <div>
      {/* Desktop semantic table (md+) */}
      <div className="hidden md:block overflow-x-auto border-y border-[var(--a-rule)]">
        <table className="w-full text-left border-collapse text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-[var(--a-surface)] border-b border-[var(--a-rule)]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="py-3.5 px-4 font-mono text-xs uppercase tracking-wider text-[var(--a-muted)] font-semibold"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--a-rule)]">
            {rows.map((row, idx) => (
              <tr key={getRowKey(row, idx)} className="align-top">
                {columns.map((col) => (
                  <td key={col.key} className="py-4 px-4 leading-6 text-[var(--a-ink)]">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked <dl> list (< md) — zero horizontal overflow */}
      <ol className="md:hidden divide-y divide-[var(--a-rule)] border-y border-[var(--a-rule)]">
        {rows.map((row, idx) => (
          <li key={getRowKey(row, idx)} className="py-5 space-y-3">
            <div className="font-serif text-lg font-semibold text-[var(--a-ink)]">
              {primaryCol.render(row)}
            </div>
            <dl className="space-y-2 text-sm">
              {detailCols.map((col) => (
                <div key={col.key} className="grid grid-cols-[110px_1fr] gap-3 items-baseline">
                  <dt className="font-mono text-xs uppercase tracking-wider text-[var(--a-muted)]">
                    {col.header}
                  </dt>
                  <dd className="text-[var(--a-ink)] leading-6">{col.render(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Accessible Slide-Over / Mobile Bottom Sheet (`dialog.escape-dismiss`, `dialog.mobile-bottom-sheet`).
 */
export function AccentSheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <m.button
            type="button"
            aria-label={`Close ${title}`}
            className="absolute inset-0 bg-black/45"
            onClick={onClose}
            variants={BACKDROP_FADE}
            initial="initial"
            animate="animate"
            exit="exit"
          />
          <m.div
            className="absolute inset-x-0 bottom-0 sm:inset-y-0 sm:right-0 sm:left-auto sm:w-[420px] max-h-[85vh] sm:max-h-none overflow-y-auto rounded-t-2xl sm:rounded-none bg-[var(--a-bg)] text-[var(--a-ink)] p-5 pb-10 border-t sm:border-t-0 sm:border-l border-[var(--a-rule)]"
            variants={SHEET_SLIDE_UP}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--a-rule)]">
              <span className="font-serif text-lg font-semibold">{title}</span>
              <AccentIconButton aria-label={`Close ${title}`} onClick={onClose}>
                <X className="h-4 w-4" aria-hidden />
              </AccentIconButton>
            </div>
            {children}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Once-only subtle card/image reveal (opacity + 8px rise, 320ms Accént curve)
 * sanctioned strictly for commercial surfaces (`mode="commercial"`).
 * Automatically collapses to an opacity-only fade when `prefers-reduced-motion: reduce` is active.
 */
export function AccentReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <m.div
      variants={RISE}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={delay > 0 ? { duration: 0.32, ease: [0.16, 1, 0.3, 1], delay } : undefined}
      className={className}
    >
      {children}
    </m.div>
  );
}
