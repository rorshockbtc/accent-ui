import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'foundations/accessibility',
  section: 'foundations',
  title: 'Accessibility, WCAG Contrast Math & Keyboard Ergonomics',
  summary:
    'Mathematical WCAG 2.1 AAA/AA luminance guarantees, 44×44px minimum touch targets, roving keyboard focus, screen-reader landmarks, and reduced-motion invariants.',
  readingMinutes: 8,
  tabs: {
    overview: `## Accessibility is an invariant, never an option

In Accént, accessibility is not a post-launch audit checklist—it is baked into the token math, component primitives, and regex CI ratchet. Whether a human engineer or a 7B local model writes a screen, five mechanical guarantees must hold:

1. **WCAG 2.1 AAA Body Contrast (\`>= 7.0:1\`)**: All prose and primary headings (\`--a-ink\` on \`--a-bg\`) meet AAA contrast across every official Brand Profile and all 49 cross-chromatic room pairs.
2. **WCAG 2.1 AA UI & Muted Contrast (\`>= 4.5:1\`)**: Secondary captions (\`--a-muted\`), inline links (\`--a-accent-text\`), and filled buttons (\`--a-accent-fg\` on \`--a-accent-fill\`) never drop below \`4.5:1\`.
3. **\`44×44px\` Minimum Hit Area**: Every interactive control (buttons, icon toggles, filter pills, pagination links) enforces \`min-h-[44px]\` or an equivalent touch target.
4. **Native Semantic HTML & Landmarks**: Buttons are \`<button>\`, links are \`<a href>\`, modals use \`role="dialog" aria-modal="true"\`, and icon-only buttons carry explicit \`aria-label\` attributes.
5. **Deterministic \`prefers-reduced-motion\`**: Every Framer Motion and CSS choreography primitive collapses duration to \`<= 120ms\` and strips spatial translation when reduced motion is requested.

::demo:a11y-audit-demo::`,

    guidelines: `## Keyboard Navigation & Focus Rings

- **Never strip focus outlines without a high-contrast replacement**: Use \`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-accent)]\` so keyboard users always see where focus is.
- **Skip-to-content link**: Every shell layout includes a \`Skip to content\` link as the first focusable DOM node.
- **Senior-accessible typography mode**: For civic and public-health products (such as Marigold \`terracotta-civic\`), body line-height expands to \`1.8\` and minimum prose size steps up to \`17px\` (\`1.0625rem\`).`,

    specs: `## Relative Luminance & Contrast Formula (\`getContrastRatio\`)

\`\`\`ts
export function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

export function getContrastRatio(fg: string, bg: string): number {
  const l1 = getRelativeLuminance(fg);
  const l2 = getRelativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
\`\`\``,

    accessibility: `## Automated CI Ratchet Checks

| Check | Requirement | Enforced By |
|---|---|---|
| Body Ink vs. Canvas | \`>= 7.0:1\` (AAA) | \`validateThemeContrast()\` |
| Muted Copy vs. Canvas | \`>= 4.5:1\` (AA) | \`validateThemeContrast()\` |
| Minimum Font Size | \`>= 13px\` (\`0.8125rem\`) | \`design-system-spec.test.ts\` |
| Interactive Hit Area | \`>= 44×44px\` | \`button.hit-area-44\` |
| Nested Interactive Tags | Forbidden (\`<Link><button>\`) | \`design-system-spec.test.ts\` |`,
  },
  rules: [
    {
      id: 'a11y.aaa-body-contrast',
      statement:
        'Primary body text (--a-ink on --a-bg) must maintain a WCAG 2.1 AAA contrast ratio of at least 7.0:1 in both light and dark modes.',
      why: 'Long-form reading demands print-grade contrast without eye strain.',
    },
    {
      id: 'a11y.no-nested-interactive',
      statement:
        'Never nest a <button> inside an <a> or <Link>, or an <a> inside a <button>.',
      why: 'Nested interactive elements violate HTML5 specs and break screen readers and keyboard tab order.',
      violationPattern: '<Link[^>]*>\\s*<button|<a[^>]*>\\s*<button',
    },
    {
      id: 'a11y.focus-visible',
      statement:
        'Never apply outline-none without providing a visible focus-visible ring or border state.',
      why: 'Sight-impaired and keyboard-only users rely on visible focus indicators.',
    },
  ],
};
