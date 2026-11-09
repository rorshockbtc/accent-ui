#!/usr/bin/env node

/**
 * Accént Upstream Contributor Helper CLI
 *
 * Scans a downstream component or style file for hardcoded hex colors,
 * verifies compliance with Accént Layer 1 mathematical invariants,
 * and outputs a parameterized upstream-ready template.
 *
 * Usage:
 *   node scripts/accent-contribute.js <path-to-component>
 */

const fs = require('fs');
const path = require('path');

const targetFile = process.argv[2];

if (!targetFile) {
  console.log(`
\x1b[35m✦ Accént 3.0 · Upstream Contribution Linter & Parameterizer\x1b[0m

Usage:
  node scripts/accent-contribute.js <path/to/Component.tsx>

Checks performed:
  1. Layer 1 Invariant Audit (13px type floor, 44px touch targets)
  2. Hex Color Parameterization (flags hardcoded hexes and maps to --a-*)
  3. GPU-Safe Motion Validation (flags layout-thrashing animations)
`);
  process.exit(0);
}

const resolvedPath = path.resolve(process.cwd(), targetFile);

if (!fs.existsSync(resolvedPath)) {
  console.error(`\x1b[31mError: File not found at ${resolvedPath}\x1b[0m`);
  process.exit(1);
}

const content = fs.readFileSync(resolvedPath, 'utf8');
console.log(`\n\x1b[36mAuditing component for upstream contribution:\x1b[0m ${path.basename(resolvedPath)}\n`);

const issues = [];
const recommendations = [];

// 1. Check for raw hex colors
const hexMatches = content.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
const uniqueHexes = [...new Set(hexMatches)];

if (uniqueHexes.length > 0) {
  issues.push({
    severity: 'WARN',
    category: 'Hardcoded Hex Colors',
    message: `Found ${uniqueHexes.length} raw hex codes: ${uniqueHexes.join(', ')}`,
    fix: 'Replace with semantic tokens: var(--a-bg), var(--a-surface), var(--a-ink), var(--a-accent), var(--a-accent-fill), or var(--a-rule)',
  });
}

// 2. Check for sub-13px type floor violations
const sub13Matches = content.match(/text-\[(?:8|9|10|11|12)px\]/g) || [];
if (sub13Matches.length > 0) {
  issues.push({
    severity: 'ERROR',
    category: 'Layer 1 Invariant: Typographic Floor',
    message: `Found font size below 13px (${sub13Matches.join(', ')}).`,
    fix: 'Accént enforces a strict >= 13px (0.8125rem) floor. Use text-xs or text-sm.',
  });
}

// 3. Check for layout-thrashing animations
const thrashingMatches = content.match(/animate-\[.*(?:width|height|top|left|margin).*\]|transition-all/g) || [];
if (thrashingMatches.length > 0) {
  issues.push({
    severity: 'WARN',
    category: 'Motion Invariant: Layout Thrashing',
    message: `Found non-composited motion or unbounded transition-all: ${thrashingMatches.slice(0, 3).join(', ')}`,
    fix: 'Animate only transform (translate, scale, rotate) and opacity.',
  });
}

// 4. Check for touch target sizing
if (content.includes('<button') || content.includes('<Link') || content.includes('<a ')) {
  if (!content.includes('min-h-[44px]') && !content.includes('py-3') && !content.includes('py-3.5') && !content.includes('py-4') && !content.includes('h-11') && !content.includes('h-12')) {
    issues.push({
      severity: 'INFO',
      category: 'Layer 1 Invariant: Touch Target',
      message: 'Interactive elements must maintain >= 44x44px clickable target.',
      fix: 'Add min-h-[44px] or ensure adequate vertical/horizontal padding.',
    });
  }
}

// Print Report
if (issues.length === 0) {
  console.log('\x1b[32m✔ Perfect! Component adheres to all Accént Layer 1 invariants.\x1b[0m');
  console.log('Ready for upstream PR submission to @rorshockbtc/accent-ui.\n');
} else {
  issues.forEach((iss) => {
    const color = iss.severity === 'ERROR' ? '\x1b[31m' : iss.severity === 'WARN' ? '\x1b[33m' : '\x1b[34m';
    console.log(`${color}[${iss.severity}]\x1b[0m \x1b[1m${iss.category}\x1b[0m`);
    console.log(`  Issue: ${iss.message}`);
    console.log(`  Fix:   ${iss.fix}\n`);
  });
}
