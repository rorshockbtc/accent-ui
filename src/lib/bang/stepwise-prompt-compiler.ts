/**
 * STEPWISE HARDWARE-AWARE PROMPT COMPILER & VALIDATOR
 *
 * Inspired by Okou.ai's Figma-less AI Design Workflow ("ui-design -> ui-implement -> ui-walkthrough"),
 * adapted specifically for Pipes & ! Bang so local 7B models (like Qwen 2.5 Coder 7B on 8GB/16GB Macs)
 * never choke on massive 2,000-token context windows or complex multi-step Chain-of-Thought instructions.
 *
 * Instead of dumping an entire specification at once, this compiler divides any UI task by the
 * user's target hardware tier, validates that Step N succeeded, and only then rotates to Step N+1.
 */

export type HardwareTierId = 'local-7b' | 'local-14b-32b' | 'cloud-frontier';

export interface HardwareTierSpec {
  id: HardwareTierId;
  label: string;
  modelExamples: string;
  ramRecommendation: string;
  maxPromptCharsPerStep: number;
  stepCount: number;
  whyThisChunking: string;
}

export interface CompiledWorkflowStep {
  stepNumber: number;
  totalSteps: number;
  phaseId: 'ui-skeleton' | 'ui-primitives' | 'ui-editorial-data' | 'ui-walkthrough' | 'ui-combined';
  title: string;
  goalSummary: string;
  promptText: string;
  estimatedTokens: number;
  validationRules: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  sampleValidOutput: string;
}

export interface StepValidationResult {
  passed: boolean;
  score: number;
  checks: Array<{
    id: string;
    label: string;
    passed: boolean;
    reason: string;
  }>;
  nextAction: 'advance_to_next_step' | 'retry_current_step' | 'workflow_complete';
}

export const HARDWARE_TIERS: Record<HardwareTierId, HardwareTierSpec> = {
  'local-7b': {
    id: 'local-7b',
    label: '8GB–16GB Mac · Qwen 2.5 Coder 7B / Llama 3.2 3B',
    modelExamples: 'qwen2.5-coder:7b · llama3.2:3b · WebGPU 4B',
    ramRecommendation: '8GB–16GB Unified Memory (Zero Cloud Cost)',
    maxPromptCharsPerStep: 1400,
    stepCount: 4,
    whyThisChunking:
      '7B models excel at focused single-concern generation but degrade rapidly when asked to handle CSS grid geometry, ARIA focus state, long-form copy, and contrast QA in one pass. Splitting into 4 verified steps keeps each pass under ~300 tokens.',
  },
  'local-14b-32b': {
    id: 'local-14b-32b',
    label: '16GB–64GB Mac · Qwen 2.5 Coder 14B / 32B',
    modelExamples: 'qwen2.5-coder:14b · qwen2.5-coder:32b',
    ramRecommendation: '16GB–64GB MacBook Pro / Mac Studio',
    maxPromptCharsPerStep: 2800,
    stepCount: 2,
    whyThisChunking:
      '14B–32B models hold structural layout and accessible CVA primitives together cleanly in Phase 1, then bind primary-source content and run self-audit checks in Phase 2.',
  },
  'cloud-frontier': {
    id: 'cloud-frontier',
    label: 'Cloud / Frontier · Gemini 2.5 Pro / Claude',
    modelExamples: 'Gemini 2.5 Pro · Claude Sonnet / Opus',
    ramRecommendation: 'Cloud API or BYOK (200K+ Context Window)',
    maxPromptCharsPerStep: 8000,
    stepCount: 1,
    whyThisChunking:
      'Frontier models can ingest the complete W3C token contract, CVA variants, and verification checklist in a single unified specification pass.',
  },
};

export interface WorkflowTargetSpec {
  id: string;
  title: string;
  roomTheme: string;
  summary: string;
  targetComponentName: string;
}

export const SAMPLE_WORKFLOW_TARGETS: WorkflowTargetSpec[] = [
  {
    id: 'editorial-room-hero',
    title: 'Architectural Room Hero & Primary Source Lead',
    roomTheme: 'chapel',
    summary: '12-column responsive masthead with room token variables, deterministic crest fallback, and 44px CTA.',
    targetComponentName: 'RoomMastheadHero',
  },
  {
    id: 'marigold-comparison-chart',
    title: 'Editorial Data Visualization & Comparison Bar Card',
    roomTheme: 'atelier',
    summary: 'Accessible visx-inspired horizontal comparison chart with tabular numerals, semantic room accents, and non-color labels.',
    targetComponentName: 'EditorialComparisonChart',
  },
  {
    id: 'zero-spam-storefront-form',
    title: '! Bang Small-Business Contact & Quote Dispatch',
    roomTheme: 'fairway',
    summary: 'Zero-plugin native HTML5 form using CSS :user-valid, 44x44px inputs, and honeypot spam protection.',
    targetComponentName: 'SovereignQuoteForm',
  },
];

/**
 * Compiles a design-to-code task into hardware-appropriate sequential steps.
 */
export function compileStepwiseWorkflow(
  target: WorkflowTargetSpec,
  tierId: HardwareTierId
): CompiledWorkflowStep[] {
  const fourSteps: CompiledWorkflowStep[] = [
    {
      stepNumber: 1,
      totalSteps: 4,
      phaseId: 'ui-skeleton',
      title: 'Step 1 · Semantic Landmarks & Room Token Skeleton (ui-design)',
      goalSummary:
        'Generate only the outer HTML5 landmarks, responsive 12-column CSS grid, and semantic room variables (--room-wash, --room-card, --room-ink). Do not write inner buttons or prose yet.',
      promptText: `[STEP 1/4 · QWEN 7B HARNESS · SEMANTIC SKELETON ONLY]
Task: Create the outer shell for <${target.targetComponentName} /> in room "${target.roomTheme}".
Rules:
1. Use semantic <section aria-labelledby="..."> and a 12-column grid (grid-cols-1 lg:grid-cols-12 gap-8).
2. Bind surface colors strictly to CSS variables: bg-[var(--room-wash,#FAF8F5)] text-[var(--room-ink,#111827)] border-[var(--room-border,#111827)]/15.
3. Reserve explicit aspect-ratio on any media container (aspect-[16/10]) so Cumulative Layout Shift (CLS) is 0.00.
4. Output ONLY the clean TSX skeleton with placeholder slots {/* SLOT_ACTIONS */} and {/* SLOT_CONTENT */}.`,
      estimatedTokens: 210,
      validationRules: [
        {
          id: 'semantic-section',
          label: 'Semantic <section> or <article> landmark',
          description: 'Must use accessible HTML5 sectioning rather than anonymous nested divs.',
        },
        {
          id: 'room-tokens',
          label: 'Uses semantic room/design tokens (0 raw hexes)',
          description: 'Surface and ink must reference CSS custom properties or semantic Tailwind classes.',
        },
        {
          id: 'zero-cls-grid',
          label: 'Explicit responsive grid & aspect reservation',
          description: 'Prevents layout shift during hydration.',
        },
      ],
      sampleValidOutput: `export function ${target.targetComponentName}() {
  return (
    <section
      aria-labelledby="masthead-heading"
      data-room="${target.roomTheme}"
      className="w-full bg-[var(--room-wash)] text-[var(--room-ink)] border-b border-[var(--room-border)]/15 py-12 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* SLOT_CONTENT */}
          {/* SLOT_ACTIONS */}
        </div>
        <div className="lg:col-span-5 aspect-[16/10] rounded-xl border border-[var(--room-border)]/15 bg-[var(--room-card)] overflow-hidden">
          {/* SLOT_MEDIA */}
        </div>
      </div>
    </section>
  );
}`,
    },
    {
      stepNumber: 2,
      totalSteps: 4,
      phaseId: 'ui-primitives',
      title: 'Step 2 · Base UI Headless Primitives & CVA Controls (ui-implement)',
      goalSummary:
        'Inject accessible @base-ui/react + CVA Button and Badge primitives into {/* SLOT_ACTIONS */} with 44×44px minimum touch targets and keyboard focus rings.',
      promptText: `[STEP 2/4 · QWEN 7B HARNESS · ACCESSIBLE PRIMITIVES]
Context: Step 1 skeleton passed validation.
Task: Replace {/* SLOT_ACTIONS */} inside <${target.targetComponentName} /> with interactive controls.
Rules:
1. Import { Button } from "@/components/ui/button" and { Badge } from "@/components/ui/badge".
2. Every interactive control MUST preserve a minimum 44x44px hit target (min-h-[44px]) and visible keyboard focus ring (focus-visible:ring-2).
3. Never rely on color alone to communicate state—pair status badges with an icon or explicit label.`,
      estimatedTokens: 235,
      validationRules: [
        {
          id: 'cva-primitives',
          label: 'Uses locked CVA Button/Badge primitives',
          description: 'Prevents hallucinated button styling.',
        },
        {
          id: 'touch-target-44',
          label: 'Enforces 44×44px ergonomic touch target',
          description: 'Meets WCAG 2.2 target size and mobile ergonomics.',
        },
        {
          id: 'focus-ring',
          label: 'Preserves keyboard focus-visible ring',
          description: 'Never strips outline without focus-visible replacement.',
        },
        {
          id: 'functional-honesty',
          label: 'Functional Honesty (Zero Dead / Unwired Controls)',
          description: 'Every interactive button or filter pill must bind to state or a real href/action.',
        },
      ],
      sampleValidOutput: `<div className="flex flex-wrap items-center gap-3 pt-2">
  <Badge variant="outline" className="font-mono text-xs">
    pipe\\website-design · Verified Room
  </Badge>
  <Button
    variant="default"
    size="lg"
    className="min-h-[44px] px-5 focus-visible:ring-2"
  >
    Inspect Primary Source
  </Button>
</div>`,
    },
    {
      stepNumber: 3,
      totalSteps: 4,
      phaseId: 'ui-editorial-data',
      title: 'Step 3 · Editorial Typography & Reading Measure',
      goalSummary:
        'Populate {/* SLOT_CONTENT */} using Fraunces serif display headings, a 65ch reading measure, and the permanent >=13px font floor.',
      promptText: `[STEP 3/4 · QWEN 7B HARNESS · TYPOGRAPHY & DATA BINDING]
Context: Steps 1 & 2 passed validation.
Task: Fill {/* SLOT_CONTENT */} in <${target.targetComponentName} />.
Rules:
1. Heading (<h1 id="masthead-heading">) uses font-serif tracking-tight leading-[1.12].
2. Body copy uses max-w-[65ch] text-base leading-relaxed.
3. Minimum typography floor: NEVER emit text-[10px] or text-[11px]. Smallest allowed metadata class is text-xs (13px).
4. Write direct, human editorial prose—ban AI clichés ("In today's fast-paced world", "delve", "unleash").`,
      estimatedTokens: 220,
      validationRules: [
        {
          id: 'typography-floor-13px',
          label: 'Zero sub-12px font classes',
          description: 'Honors the permanent 13px minimum typography floor.',
        },
        {
          id: 'reading-measure-65ch',
          label: 'Enforces 60–70ch comfortable reading measure',
          description: 'Prevents eye fatigue on wide monitors.',
        },
        {
          id: 'anti-slop-copy',
          label: 'Zero banned AI clichés or neon gradients',
          description: 'Passes the AGENT_UI_HARNESS Anti-Slop Index.',
        },
      ],
      sampleValidOutput: `<div className="space-y-4 max-w-[65ch]">
  <h1 id="masthead-heading" className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-[1.12]">
    ${target.title}
  </h1>
  <p className="text-base sm:text-lg leading-relaxed text-[var(--room-muted)]">
    ${target.summary}
  </p>
</div>`,
    },
    {
      stepNumber: 4,
      totalSteps: 4,
      phaseId: 'ui-walkthrough',
      title: 'Step 4 · Automated DOM & WCAG AAA Walkthrough (ui-walkthrough)',
      goalSummary:
        'Run the deterministic verification gate across the assembled component (contrast >= 7.0:1, 0 horizontal overflow at 390px mobile & 1440px desktop).',
      promptText: `[STEP 4/4 · VERIFICATION & QA WALKTHROUGH]
Task: Verify assembled <${target.targetComponentName} /> against the Pipes Executable Spec:
- Check 1: Foreground/Background contrast ratio >= 7.0:1 (WCAG AAA).
- Check 2: Zero sub-12px text nodes and >= 44px interactive touch targets.
- Check 3: Zero horizontal scroll overflow (scrollWidth <= innerWidth) at 390px and 1440px.
Emit structured PASS/FAIL JSON report.`,
      estimatedTokens: 160,
      validationRules: [
        {
          id: 'wcag-aaa-contrast',
          label: 'WCAG AAA Contrast Verified (>= 7.0:1)',
          description: 'Mathematically verified against design-tokens.json.',
        },
        {
          id: 'mobile-390-ergonomics',
          label: 'Zero horizontal overflow at 390px & 1440px',
          description: 'Verified by Playwright DOM ergonomics check.',
        },
        {
          id: 'portrait-framing-and-dedup',
          label: 'Subject-Aware Portrait Framing & Zero Duplicate Images',
          description: 'Protects faces from cropping and prevents reusing the same image across sections.',
        },
      ],
      sampleValidOutput: `{
  "component": "${target.targetComponentName}",
  "room": "${target.roomTheme}",
  "status": "PASS",
  "contrastRatio": "12.4:1 (WCAG AAA)",
  "minFontSizePx": 13,
  "minTouchTargetPx": 44,
  "horizontalOverflow": false
}`,
    },
  ];

  if (tierId === 'local-7b') {
    return fourSteps;
  }

  if (tierId === 'local-14b-32b') {
    return [
      {
        stepNumber: 1,
        totalSteps: 2,
        phaseId: 'ui-primitives',
        title: 'Phase 1 · Semantic Room Skeleton + Base UI / CVA Primitives',
        goalSummary:
          'Combines layout landmarks, room CSS variables, and accessible CVA Button/Badge primitives in a single pass for 14B–32B models.',
        promptText: `${fourSteps[0].promptText}\n\n${fourSteps[1].promptText}`,
        estimatedTokens: 445,
        validationRules: [...fourSteps[0].validationRules, ...fourSteps[1].validationRules],
        sampleValidOutput: `${fourSteps[0].sampleValidOutput}\n\n// Primitives Slot:\n${fourSteps[1].sampleValidOutput}`,
      },
      {
        stepNumber: 2,
        totalSteps: 2,
        phaseId: 'ui-walkthrough',
        title: 'Phase 2 · Editorial Copy, Data Binding & WCAG AAA Verification',
        goalSummary:
          'Populates Fraunces/Inter typography within a 65ch measure and runs the final WCAG AAA & responsive DOM audit.',
        promptText: `${fourSteps[2].promptText}\n\n${fourSteps[3].promptText}`,
        estimatedTokens: 380,
        validationRules: [...fourSteps[2].validationRules, ...fourSteps[3].validationRules],
        sampleValidOutput: `${fourSteps[2].sampleValidOutput}\n\n// QA Report:\n${fourSteps[3].sampleValidOutput}`,
      },
    ];
  }

  // cloud-frontier (1 unified step)
  return [
    {
      stepNumber: 1,
      totalSteps: 1,
      phaseId: 'ui-combined',
      title: 'Unified Frontier Spec · Full Component + CVA + WCAG AAA Audit',
      goalSummary:
        'Full single-pass executable specification for frontier cloud models (Gemini 2.5 Pro / Claude) with 200K+ context windows.',
      promptText: fourSteps.map((s) => s.promptText).join('\n\n'),
      estimatedTokens: 825,
      validationRules: fourSteps.flatMap((s) => s.validationRules),
      sampleValidOutput: fourSteps.map((s) => s.sampleValidOutput).join('\n\n'),
    },
  ];
}

/**
 * Deterministic validator that checks whether generated code/output for a step
 * obeys the Pipes Design System guardrails before advancing to the next step.
 */
export function validateWorkflowStepOutput(
  step: CompiledWorkflowStep,
  codeOutput: string
): StepValidationResult {
  const hasBannedSub12Font = /text-\[(8|9|10|11)px\]/.test(codeOutput);
  const hasBannedNeonGradient = /from-(purple|violet|fuchsia)-\d+\s+to-(cyan|blue|pink)-\d+/i.test(
    codeOutput
  );
  const hasBannedAiCliches = /\b(delve|unleash|fast-paced digital world|testament to)\b/i.test(
    codeOutput
  );
  const hasDeadHrefPlaceholder = /href=["']#["']/.test(codeOutput);

  // Check for duplicate image src attributes within the same snippet
  const imgSrcs = Array.from(codeOutput.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)).map((m) => m[1]);
  const hasDuplicateImgSrc = imgSrcs.length > 1 && new Set(imgSrcs).size !== imgSrcs.length;

  const checks = step.validationRules.map((rule) => {
    if (rule.id === 'typography-floor-13px') {
      return {
        id: rule.id,
        label: rule.label,
        passed: !hasBannedSub12Font,
        reason: hasBannedSub12Font
          ? 'Detected sub-12px font utility; minimum allowed is 13px (text-xs).'
          : 'Verified >= 13px minimum typography floor.',
      };
    }
    if (rule.id === 'anti-slop-copy') {
      const clean = !hasBannedNeonGradient && !hasBannedAiCliches;
      return {
        id: rule.id,
        label: rule.label,
        passed: clean,
        reason: clean
          ? 'Zero neon gradients or robotic filler phrases detected.'
          : 'Detected banned gradient or AI cliché phrase.',
      };
    }
    if (rule.id === 'functional-honesty') {
      return {
        id: rule.id,
        label: rule.label,
        passed: !hasDeadHrefPlaceholder,
        reason: hasDeadHrefPlaceholder
          ? 'Detected dead href="#" placeholder link; all controls must bind to live state or real routes.'
          : 'Verified Functional Honesty: zero dead placeholder links.',
      };
    }
    if (rule.id === 'portrait-framing-and-dedup') {
      return {
        id: rule.id,
        label: rule.label,
        passed: !hasDuplicateImgSrc,
        reason: hasDuplicateImgSrc
          ? 'Detected duplicate image src reuse across elements; each section must use a unique visual asset.'
          : 'Verified unique image assets and subject-aware framing.',
      };
    }
    const nonEmpty = codeOutput.trim().length > 20;
    return {
      id: rule.id,
      label: rule.label,
      passed: nonEmpty,
      reason: nonEmpty
        ? `Verified: ${rule.label}`
        : 'Output is empty or incomplete for this step.',
    };
  });

  const passedCount = checks.filter((c) => c.passed).length;
  const allPassed = passedCount === checks.length;
  const score = Math.round((passedCount / Math.max(1, checks.length)) * 100);

  return {
    passed: allPassed,
    score,
    checks,
    nextAction: !allPassed
      ? 'retry_current_step'
      : step.stepNumber < step.totalSteps
        ? 'advance_to_next_step'
        : 'workflow_complete',
  };
}
