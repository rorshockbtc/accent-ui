'use client';

import React, { useEffect, useId, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { m } from 'framer-motion';
import { RISE } from '@/lib/motion/tokens';
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
    'inline-flex items-center justify-center gap-2 font-sans font-semibold t-press t-color transition-[transform,color,background-color,border-color] duration-150 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-accent)] disabled:opacity-45 disabled:pointer-events-none';

  const sizeMap: Record<AccentButtonSize, string> = {
    sm: 'min-h-[44px] px-3.5 text-[13px] rounded-[var(--a-radius-cta,6px)]',
    md: 'min-h-[44px] px-5 text-sm rounded-[var(--a-radius-cta,6px)]',
    lg: 'min-h-[48px] px-6 text-sm uppercase tracking-wider rounded-[var(--a-radius-cta,6px)]',
  };

  const primaryBg =
    size === 'sm'
      ? 'bg-[var(--a-accent-fill-aa,var(--a-accent-fill))]'
      : 'bg-[var(--a-accent-fill)]';

  const variantMap: Record<AccentButtonVariant, string> = {
    primary: `${primaryBg} text-[var(--a-accent-fg)] hover:bg-[var(--a-accent-fill-hover)] border border-transparent`,
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
      className={`min-h-[44px] min-w-[44px] h-11 w-11 shrink-0 rounded-md grid place-items-center t-press t-color transition-[transform,color,background-color,border-color] duration-150 active:scale-[0.97] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-accent)] disabled:opacity-35 ${variantStyles} ${className}`}
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
    pink: 'bg-[var(--a-accent-fill-aa,var(--a-accent-fill))] text-[var(--a-accent-fg)] border-transparent',
    sky: 'bg-[var(--a-sky-surface)] text-[var(--a-sky-ink)] border-[var(--a-sky)]/35',
    emerald: 'bg-emerald-950/10 text-[var(--a-emerald)] border-[var(--a-emerald)]/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm border text-[13px] font-mono font-semibold tracking-wider uppercase ${tones[tone]} ${className}`}
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
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const enhancedChild = React.isValidElement<Record<string, unknown>>(children)
    ? React.cloneElement(children, {
        id: (children.props as Record<string, unknown>).id ?? id,
        'aria-describedby':
          [(children.props as Record<string, unknown>)['aria-describedby'], describedBy]
            .filter(Boolean)
            .join(' ') || undefined,
        'aria-invalid': error ? true : (children.props as Record<string, unknown>)['aria-invalid'],
      })
    : children;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[var(--a-ink)]">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="text-[13px] text-[var(--a-muted)]">
          {hint}
        </p>
      )}
      {enhancedChild}
      {error && (
        <p id={errorId} role="alert" className="text-[13px] font-medium text-[var(--a-accent-text)]">
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

/**
 * Auto-growing editorial textarea locked to `width: 100%` (`field-sizing: content`).
 */
export function AccentTextarea({
  className = '',
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`a-textarea w-full min-h-[120px] px-3.5 py-2.5 rounded-md bg-[var(--a-well)] text-[var(--a-ink)] border border-[var(--a-rule)] text-base leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--a-accent)] ${className}`}
      {...rest}
    />
  );
}

/**
 * Native accessible `<select>` enforcing 44px minimum touch height and 16px mobile input font floor.
 */
export function AccentSelect({
  className = '',
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full min-h-[44px] px-3.5 rounded-md bg-[var(--a-well)] text-[var(--a-ink)] border border-[var(--a-rule)] text-base sm:text-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--a-accent)] ${className}`}
      {...rest}
    >
      {children}
    </select>
  );
}

/**
 * De-cardified open architectural pedestal (`border-t` top rule or `border-l` left rule).
 */
export function AccentPedestal({
  axis = 'top',
  children,
  className = '',
}: {
  axis?: 'top' | 'left';
  children: React.ReactNode;
  className?: string;
}) {
  const posture =
    axis === 'left'
      ? 'border-l border-[var(--a-rule)] pl-5 sm:pl-6'
      : 'border-t border-[var(--a-rule)] pt-5 sm:pt-6';

  return <section className={`${posture} ${className}`}>{children}</section>;
}

/**
 * Editorial plate container with subject-aware aspect/caption framing and zero badge-over-face clutter.
 */
export function AccentArtPlate({
  src,
  srcSet,
  sizes,
  alt,
  caption,
  aspect = 'aspect-[16/10]',
  priority = false,
  className = '',
}: {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt: string;
  caption?: string;
  aspect?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`space-y-2.5 ${className}`}>
      <div className="overflow-hidden border border-[var(--a-rule)] bg-[var(--a-surface)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={`block w-full ${aspect} object-cover object-[50%_20%]`}
        />
      </div>
      {caption && (
        <figcaption className="font-mono text-[13px] text-[var(--a-muted)] border-t border-[var(--a-rule)] pt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export interface AccentTabItem<T extends string = string> {
  id: T;
  label: string;
  mobileLabel?: string;
  count?: number;
}

/**
 * Accént single-row accessible tablist supporting `'4-col'` or scrolling `'scroll'` layout,
 * ArrowLeft/ArrowRight/Home/End keyboard navigation, scrollIntoView, and forced-colors-safe `::after` border indicator.
 */
export function AccentTabs<T extends string = string>({
  tabs,
  activeTab,
  onSelect,
  ariaLabel,
  layout,
  className = '',
}: {
  tabs: AccentTabItem<T>[];
  activeTab: T;
  onSelect: (id: T) => void;
  ariaLabel: string;
  layout?: '4-col' | 'scroll';
  className?: string;
}) {
  const effectiveLayout = layout ?? (tabs.length > 4 ? 'scroll' : '4-col');
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === activeTab);
    if (activeIndex >= 0) {
      buttonRefs.current[activeIndex]?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [activeTab, tabs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = tabs.length - 1;
    else return;

    e.preventDefault();
    const targetTab = tabs[nextIdx];
    onSelect(targetTab.id);
    buttonRefs.current[nextIdx]?.focus();
  };

  const containerLayout =
    effectiveLayout === 'scroll'
      ? 'flex overflow-x-auto gap-5 sm:gap-7 snap-x snap-proximity'
      : 'grid grid-cols-4 sm:flex sm:flex-wrap gap-0 sm:gap-6';

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`${containerLayout} border-b border-[var(--a-rule)] ${className}`}
    >
      {tabs.map((t, idx) => {
        const active = t.id === activeTab;
        return (
          <button
            key={t.id}
            ref={(el) => {
              buttonRefs.current[idx] = el;
            }}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(t.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`relative shrink-0 snap-start min-h-[44px] px-2 sm:px-1 -mb-px text-[13px] sm:text-sm font-medium t-color cursor-pointer whitespace-nowrap truncate after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:border-b-[2.5px] ${
              active
                ? 'text-[var(--a-ink)] after:border-[var(--a-accent)]'
                : 'text-[var(--a-muted)] hover:text-[var(--a-ink)] after:border-transparent'
            }`}
          >
            <span className="sm:hidden">{t.mobileLabel ?? t.label}</span>
            <span className="hidden sm:inline">{t.label}</span>
            {typeof t.count === 'number' && (
              <span className="ml-1 font-mono text-[13px] text-[var(--a-muted)] tabular-nums">
                ({t.count})
              </span>
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
 * Enforces `patterns/mobile`: keyboard-scrollable semantic `<table>` on `md+`, stacked `<dl>` hairline cards on `< md`
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
      {/* Desktop keyboard-scrollable semantic table (md+) */}
      <div
        tabIndex={0}
        role="region"
        aria-label={caption || 'Data table'}
        className="hidden md:block overflow-x-auto border-y border-[var(--a-rule)]"
      >
        <table className="w-full text-left border-collapse text-sm">
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="bg-[var(--a-surface)] border-b border-[var(--a-rule)]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className="py-3.5 px-4 font-mono text-[13px] uppercase tracking-wider text-[var(--a-muted)] font-semibold"
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
                  <dt className="font-mono text-[13px] uppercase tracking-wider text-[var(--a-muted)]">
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
 * Native `<dialog closedby="any">` Slide-Over / Mobile Bottom Sheet with `showModal()` top-layer
 * focus trapping and Safari backdrop coordinate fallback.
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
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open) {
      if (!dlg.open) dlg.showModal();
    } else if (dlg.open) {
      dlg.close();
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dlg = dialogRef.current;
    if (!dlg || e.target !== dlg) return;
    // Fallback for browsers without native `closedby="any"` support (e.g., Safari)
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const rect = dlg.getBoundingClientRect();
      const inside =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!inside) dlg.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: 'any' } as Record<string, string>)}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="fixed inset-0 m-0 ml-auto mt-auto sm:mt-0 h-auto max-h-[85vh] sm:h-dvh sm:max-h-dvh w-full sm:w-[420px] max-w-none overflow-y-auto overscroll-contain rounded-t-2xl sm:rounded-none bg-[var(--a-bg)] text-[var(--a-ink)] p-5 pb-10 border-t sm:border-t-0 sm:border-l border-[var(--a-rule)] backdrop:bg-black/45"
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--a-rule)]">
        <h2 id={titleId} className="font-serif text-lg font-semibold text-[var(--a-ink)]">
          {title}
        </h2>
        <AccentIconButton aria-label={`Close ${title}`} onClick={() => dialogRef.current?.close()}>
          <X className="h-4 w-4" aria-hidden />
        </AccentIconButton>
      </div>
      {children}
    </dialog>
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
