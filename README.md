<div align="center">
  <svg viewBox="0 0 24 32" width="48" height="64" aria-hidden="true">
    <path d="M9 30 L17 2 L23 2 L13 30 Z" fill="#EE2C82" />
  </svg>
  <h1>´ Accént Design System</h1>
  <p><strong>Typographic restraint, mathematical precision, and two-tier motion for editorial applications & local AI models.</strong></p>

  <p>
    <a href="https://github.com/rorshockbtc/accent-ui/actions"><img src="https://img.shields.io/github/actions/workflow/status/rorshockbtc/accent-ui/ci.yml?branch=main&label=CI&style=flat-square" alt="CI Status" /></a>
    <a href="https://github.com/rorshockbtc/accent-ui/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" /></a>
    <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Motion-Framer-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  </p>

  <p>
    <a href="https://design.pipes.pink"><strong>Live Documentation & Playground →</strong></a>
  </p>
</div>

---

## ✦ Philosophy

An accent changes how a word is spoken without changing the word itself.

**Accént** (`´ Accént`) is an open-source design system engineered for products that value readability, high information density, and calm authority over flashing trend-chasing UI. Originally architected as the foundation for the [Pipes Protocol](https://pipes.pink), Accént is deliberately built for dual consumption:

1. **Human Readers & Operators**: 8px baseline grids, hairline borders, guaranteed WCAG AA/AAA semantic contrasts, and authentic editorial typography.
2. **Local AI Agent Models**: Governed by machine-readable prompt constraints (`/rules.json`) that 7B–14B models can ingest to generate pristine, conforming interfaces without design hallucinations.

---

## ✦ Key Invariants

- **The 8-Point Grid (`essay.relief.multiple-of-8`)**: Spacing, heights, paddings, and media dimensions round to multiples of 8px (4px for fine hairline detail).
- **Two-Tier Motion Architecture**:
  - **Tier 1 (Product Utility)**: Snappy 120ms/200ms/320ms durations using `cubic-bezier(0.16, 1, 0.3, 1)`. Animate only opacity and transform. Zero text movement on operational tools.
  - **Tier 2 (Editorial Showcase)**: 650ms–850ms soft-settle curtain reveals (`cubic-bezier(0.22, 1, 0.36, 1)`), staggered word masks, and viewport reveals for marketing homepages and long-form thesis editions.
- **One Focal Color (`color.one-focus`)**: Pages choose one focal accent (Sovereign Pink `#EE2C82` or Crystalline Sky `#0284C7`); neutral wash and ink carry the information hierarchy.
- **Accessible Floor (`type.floor-13`)**: Zero text below 13px anywhere in the system. Minimum 44×44px interactive tap target bounds.
- **W3C Design Token Standard**: Machine-readable token scales in both JSON and strongly-typed TypeScript.

---

## ✦ Quick Start

### Installation

```bash
npm install accent-ui framer-motion lucide-react
# or
pnpm add accent-ui framer-motion lucide-react
```

### 1. Configure Tailwind

Import the token stylesheets into your root CSS:

```css
/* globals.css */
@import "tailwindcss";

@theme inline {
  --color-sandstone-light: #FAF8F5;
  --color-sandstone: #E8E2D5;
  --color-accent-mark: var(--a-accent);
}
```

### 2. Using Core Components

```tsx
import { AccentButton, AccentBadge, AccentCard } from 'accent-ui';

export function HeaderAction() {
  return (
    <div className="flex items-center gap-3">
      <AccentBadge tone="pink">v1.0.0</AccentBadge>
      <AccentButton variant="solid" tone="pink">
        Claim Handle
      </AccentButton>
    </div>
  );
}
```

### 3. Using Two-Tier & Corporate Motion Primitives

```tsx
import {
  MotionProvider,
  RiseLines,
  FadeUp,
  Hairline,
  ScaryHeadline,
  Smile,
  AccentRevealText,
  HOME_SCARY_PAIRS,
} from 'accent-ui';

export default function EditorialHero() {
  return (
    <MotionProvider>
      <section className="py-24 max-w-4xl mx-auto">
        <h1 className="text-5xl font-serif font-bold text-stone-900">
          <ScaryHeadline pairs={HOME_SCARY_PAIRS} />
        </h1>
        <Hairline className="my-8" />
        <FadeUp delay={0.2}>
          <p className="text-xl text-stone-600">
            A restrained, tactile design system for human-in-the-loop applications <Smile />
          </p>
        </FadeUp>
      </section>
    </MotionProvider>
  );
}
```

### 4. Multi-Brand Theming & Custom Brand Forks

Accént ships with three built-in brand presets in `src/styles/themes.ts`:
- `editorial-sandstone` (**Pipes Editorial** — Fraunces + Inter, Warm Sandstone `#E8E2D5`, Sovereign Pink `#D44983`)
- `playful-principal` (**CHB Corporate** — Bricolage Grotesque + Newsreader, Alabaster `#FAF8F5`, Hot Pink `#FE299E`, pill CTAs)
- `albers-perspectives` (**Albers Sandstone** — Warm Sandstone `#EAE0D0`, Deep Espresso `#281B16`, Blueprint Cobalt `#0B5CAB`)

```tsx
import { getBrandThemeVars } from 'accent-ui';

// Apply any brand preset's CSS custom properties to your root container:
const themeVars = getBrandThemeVars('playful-principal', 'light');
```

---

## ✦ Machine-Readable AI Rules (`rules.json`)

Accént provides an automated Edge endpoint exposing every architectural invariant formatted as structured rules for agentic prompt compilation:

```bash
curl https://design.pipes.pink/rules.json
```

Or import directly in code:

```typescript
import { getAllAccentRules } from 'accent-ui';

const rules = getAllAccentRules();
// Pass rules directly into your agentic LLM prompt context
```

---

## ✦ Running the Documentation Site Locally

Accént includes a full-featured documentation microsite covering 45+ foundation essays, component specs, and interactive token inspectors:

```bash
git clone https://github.com/rorshockbtc/accent-ui.git
cd accent-ui
npm install
npm run dev
```

Visit `http://localhost:3000` to browse the interactive documentation.

### Build Commands

```bash
npm run typecheck    # Validate strict TypeScript types
npm run build:lib    # Build ESM & CJS distribution bundles via tsup
npm run build        # Build Next.js documentation site
```

---

## ✦ License

[MIT](LICENSE) © [Colon Hyphen Bracket](https://github.com/rorshockbtc) & Kendall Kyle Cyree.
