import type { AccentPage } from '../types';

export const page: AccentPage = {
  slug: 'essays/stepwise-7b',
  section: 'essays',
  kind: 'essay',
  title: 'Stepwise Spec-to-Build: Figma-Free Design Workflows on 7B Local Models',
  summary:
    'A frontier model can read a 2,500-word design spec in one go. A 7B model on a laptop cannot. Here is how we split the job into four small, checked steps.',
  readingMinutes: 10,
  pipes: ['website-design', 'chb', 'cubby'],
  rules: [
    {
      id: 'stepwise.tier-by-hardware',
      statement: 'Choose the prompt plan by model size: 4 steps for 7B models, 2 phases for 14B to 32B, 1 pass for frontier cloud models.',
      why: 'Small models lose constraints in long prompts; splitting the work keeps each instruction in focus.',
    },
    {
      id: 'stepwise.gate-between-steps',
      statement: 'Run the deterministic gate check after each step and do not start the next step until it passes.',
      why: 'Errors caught early are cheap; errors carried forward compound.',
    },
    {
      id: 'stepwise.skeleton-no-hex',
      statement: 'In the skeleton step, output only semantic landmarks, the grid and room CSS variables, with zero raw hex values.',
      why: 'The skeleton sets the token contract every later step depends on.',
      violationPattern: '#[0-9a-fA-F]{3,8}\\b',
    },
    {
      id: 'stepwise.primitives-44',
      statement: 'In the primitives step, every interactive element must be at least 44px by 44px and show a visible keyboard focus ring.',
      why: 'Touch and keyboard users need targets they can hit and see.',
    },
  ],
  tabs: {
    overview: `# Stepwise Spec-to-Build

The workflow at the heart of this essay comes from Ming Li at Okou.ai, in a post called ["AI Product Design Workflow Without Figma"](https://www.okou.ai/en/blog/posts/ai-product-design-workflow-without-figma). Read it. It is clear and practical, and what follows is our adaptation of it for people who run AI on their own laptops. The good ideas are Okou's. The compromises are ours.

## The workflow, as Okou describes it

### Three stages, no vector canvas

The Okou workflow ships product interfaces without drawing them in Figma first. It has three stages:

- **ui-design**: go from product intent straight to layout options and a direction.
- **ui-implement**: build the chosen direction as real code, with tokens, accessible components and typed state, directly in the repository.
- **ui-walkthrough**: run a headless browser agent over the result to check breakpoints, interactions and accessibility, and get back a plain PASS or FAIL.

A headless browser, for the non-engineers, is a real web browser running without a window, driven by a script. It can click, resize and measure things the way a careful tester would.

### Why it works

The workflow treats design as a spec that becomes code, then gets checked. No handoff file. No drift between mockup and build. For a small team it removes a whole category of meetings.

## Where it breaks: the laptop

### Frontier models have room

Hand that workflow to a frontier cloud model with a context window around 200,000 tokens, and you can paste a 2,500-word spec and get a working screen. A token is roughly three-quarters of a word; the context window is how much text the model can hold in mind at once.

### Local models do not

Now imagine a café owner using Bang, our website builder, on an 8GB or 16GB MacBook Air. Bang can run a local model such as Qwen 2.5 Coder 7B, so her data stays on her machine and she does not pay per request. Seven billion parameters is small by AI standards. It runs on a laptop. It does not have a frontier model's attention span.

Give that model the same 2,500-word spec and two things happen.

The same spec behaves differently in a small and a large context window.

::demo:fig-context-fill::

### Constraints fall off the end

The first is attention dilution. By the time the model finishes writing the outer page grid, it has forgotten the rule in paragraph four about minimum text size. It starts inventing hex colours. It drops the focus rings. The spec was correct; the model just could not hold all of it at once.

### The laptop gets hot

The second is physical. Long reasoning over a bloated prompt pushes memory pressure up on a machine that shares memory between CPU and GPU. Tokens per second fall. The fan spins. The owner thinks her computer is broken.

## The fix: compile the prompt to the hardware

### One spec, three plans

We kept the spec. We changed how it is delivered. Accent has a stepwise prompt compiler that takes the full design spec and emits a different plan depending on the model:

- **Tier 1, 8 to 16GB Macs, 7B models**: four sequential micro-steps, about 200 tokens of instruction each.
- **Tier 2, 16 to 64GB Macs, 14B to 32B models**: two phases.
- **Tier 3, cloud frontier models**: one unified pass, Okou-style.

::demo:stepwise-compiler::

Compare the instruction budget of one pass with four steps.

::demo:fig-token-budget::

### Gates between steps

Between steps, a deterministic gate runs. Deterministic means it is ordinary code, not another AI call. It checks the output against the rules for that step. If it fails, the step reruns with the specific failure quoted back. If it passes, the next step unlocks.

A run looks like this, including one failed gate.

::demo:fig-step-timeline::

## The four steps, in detail

### Step 1: skeleton

The model writes only the structure: semantic HTML landmarks such as header, main and section, the responsive 12-column grid, and the room's CSS variables, for example --room-wash and --room-ink.

Gate: zero raw hex values, and every image slot has an explicit aspect ratio reserved so the page does not jump when images load.

### Step 2: primitives

The model replaces placeholder actions with locked components built on Base UI and cva: Button, Badge, Input. It does not invent its own.

Gate: every interactive element is at least 44 by 44 pixels and has a visible keyboard focus ring.

### Step 3: editorial and data

The model fills in content. Headings in the display serif (Fraunces in Pipes), body text at a 65-character measure, nothing smaller than 13px.

Gate: reject any text class below the floor, and reject stock AI filler phrases. Yes, we lint for "unleash".

### Step 4: walkthrough

The automated walkthrough from Okou's third stage runs here: layout at each breakpoint, keyboard navigation, and contrast. Body text must hit WCAG AAA, a contrast ratio of at least 7:1.

### Why 200 tokens

Two hundred tokens is about a paragraph. That is short enough that a 7B model keeps every instruction in view while it writes. Longer steps start to bring back the same drift the method is meant to remove.

## A worked example

### The request

The café owner types: "A page for our weekend brunch menu, with prices, photos, and a booking button."

### What a single pass on 7B produced

Picture the typical result: a single 2,500-word pass on a 7B model produces a decent layout with problems: three invented colours, 12px price captions, a booking button 36px tall, and no focus styles. Nothing catastrophic. Everything slightly wrong.

### What four steps are designed to produce

The stepwise plan is built to yield a skeleton in the Brew room with no hex codes, real Button components at 48px, prices in tabular figures at 16px, and a walkthrough that catches a low-contrast caption and sends it back for a retry. Total instruction tokens come in lower than the single pass, because no step needed the whole spec.

## What the tiers look like in between

### Tier 2: two phases

Mid-sized models (14B to 32B parameters, which want 16 to 64GB of memory) hold more in mind but still wobble on very long specs. For them, the compiler merges steps. Phase one is skeleton plus primitives: structure, tokens and real components together. Phase two is editorial content plus the walkthrough. Gates still run between phases, and each gate simply combines the checks from the steps it covers.

### Tier 3: one pass

Frontier cloud models get the whole spec in one prompt, exactly as Okou describes. The gates still run at the end. A bigger model makes fewer mistakes, not zero.

### How the compiler picks

Bang reads the model name and, where it can, the available memory. If it is unsure, it picks the smaller tier. Erring small costs a few extra turns. Erring large costs a broken page and a hot laptop. That asymmetry decides it.

## What the rules have to look like

### Short and testable

A rule a 7B model can follow is one sentence long and says something checkable. "Never set text below 13px" works. "Use a harmonious typographic scale" does not, because no model and no gate can tell you whether it was obeyed.

### Paired with a reason

Every Accent rule ships with a plain-English "why". The model does not need it. People do. When a gate fails and someone asks what happened, the reason is right there, in words a café owner can read.

## The counter-argument: just use the cloud

### Frontier models are better

They are. A frontier model will do the whole thing in one go, faster, and probably with more taste. If you can use one, Tier 3 exists for you.

### But not everyone can or should

Some people cannot afford per-request pricing. Some work offline. Some handle client data they are not allowed to send to a third party. Some simply prefer to own their tools. A design system that only works with the most expensive model is a design system for the people who need it least.

### More steps, more latency

Four steps take more wall-clock turns than one. True. On a 7B model, each step is short and fast, and gates are cheap. In practice the total time is similar, and the failure rate is much lower, which matters more than raw speed when the alternative is redoing the page.

### Gates can be gamed

A model could learn to pass a regex while still doing something silly. Also true. Gates catch the common, measurable failures: hex codes, tiny text, small targets. They do not replace taste. That is why the rules are short and specific, and why the walkthrough checks the rendered page rather than just the source.

## What this means for design systems

### A spec is now an execution harness

A design system used to be a sticker sheet of buttons. With AI building the pages, it has to be something models can run: tokens, rules short enough to follow, and checks that can say pass or fail. Accent exports its rules as JSON for exactly this reason, and the stepwise compiler reads them.

### Same rigour on cheap hardware

The goal is simple to say. Someone building their site on a \$999 laptop should get the same accessibility, the same calm typography and the same contrast as an engineer on a frontier cluster. Splitting the work is how we get there.

## Closing

Ming Li's workflow at Okou.ai showed that you can go from intent to tested interface without a drawing tool in the middle. We took that idea and cut it into pieces small enough for a laptop. Four steps, each one checked. It is less glamorous than one magic prompt. It also works on the computer you already own.
`,
  },
};
