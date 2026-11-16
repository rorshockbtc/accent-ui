'use client';

import React, { useState } from 'react';
import { Stage, Seg, DoDont, Tag } from '../primitives';
import {
  AccentEngineTierSwitch,
  AccentPromptComposer,
  AccentStreamingProse,
  AccentReasoningTrace,
  AccentCitationLink,
  AccentVerificationLedger,
  AccentDiffViewer,
  AccentFollowUpList,
  healStreamingMarkdown,
  type AccentCitationEntry,
  type AccentTraceStep,
} from '../ai';

/* ============================================================================
 * Interactive AI Pattern & Philosophy Essay Figures
 * Shared identically by `pipes-unified` and standalone `accent-ui`.
 * ========================================================================== */

const CODE_PRE =
  'rounded-md border border-[var(--a-rule)] bg-[#111827] text-[#F3EFE9] p-4 font-mono text-[13px] leading-relaxed overflow-x-auto';

const SAMPLE_STEPS: AccentTraceStep[] = [
  {
    id: 'step-1',
    phase: 'Retrieve',
    label: 'Read IndexedDB parquet slice & SHA-256 index',
    durationMs: 14,
    detail: 'Matched 4 canonical nodes in pipe\\stoicism via client-side BM25.',
    source: 'pipe\\stoicism#c4a912f0',
  },
  {
    id: 'step-2',
    phase: 'Verify',
    label: 'Recompute content-addressed digest (pipes:node:v1)',
    durationMs: 6,
    detail: 'Confirmed primary source integrity and trimmed redundant boilerplate via ~.',
    source: 'sha256:9f820b714d3c',
  },
  {
    id: 'step-3',
    phase: 'Synthesize',
    label: 'Stream grounded prose with inline citation indices',
    durationMs: 280,
    detail: 'Emitted 2 verified footnotes mapped cleanly to source paragraphs.',
  },
];

const SAMPLE_CITATIONS: AccentCitationEntry[] = [
  {
    id: 'cit-1',
    claim: 'Seneca frames time poverty as unexamined fragmentation rather than short lifespan.',
    sourceTitle: 'On the Shortness of Life (De Brevitate Vitae, §1)',
    pipeNamespace: 'pipe\\stoicism',
    href: '#verify-source-1',
    cid: '9f820b714d3ca8120f5c41ab29',
    confidencePct: 99,
    verifiedAt: '2026-11-10',
  },
  {
    id: 'cit-2',
    claim: 'Local-first browser queries eliminate round-trip API exposure for sensitive resident datasets.',
    sourceTitle: 'Zero-Knowledge Civic Analytics Spec',
    pipeNamespace: 'pipe\\marigold',
    href: '#verify-source-2',
    cid: '7a319c88201e90bc321fa4481d',
    confidencePct: 97,
    verifiedAt: '2026-11-12',
  },
];

/* ---------------------- 01 · Discovering ---------------------- */
function AiDiscoverOverviewDemo() {
  return (
    <Stage
      label="Progressive Local Intelligence Tier Switcher"
      caption="Zero-latency SQL/template filters resolve first; WebGPU small models and BYOK streams escalate only when needed."
    >
      <AccentEngineTierSwitch />
    </Stage>
  );
}

function AiDiscoverRecipeDemo() {
  const [output, setOutput] = useState('Select a zero-shot recipe above to inspect deterministic SQL/JSON synthesis.');
  return (
    <Stage
      label="Structured Zero-Shot Discovery Composer"
      caption="Replace blank prompt boxes with inspectable intent recipes tailored to your domain corpus."
    >
      <AccentPromptComposer
        recipes={[
          {
            id: 'compare',
            label: 'Compare Primary Letters',
            template: 'Compare Seneca Letter XVI with Epictetus Enchiridion §1 around volition and habit.',
          },
          {
            id: 'timeline',
            label: 'Extract Chronology (0ms SQL)',
            template: 'List primary editions chronologically with curator SHA-256 verification status.',
          },
        ]}
        onSubmit={({ prompt }) => setOutput(`Executed scoped discovery query: "${prompt}"`)}
      />
      <p className="mt-3 font-mono text-[13px] text-[var(--a-muted)]">{output}</p>
    </Stage>
  );
}

function AiDiscoverAffordanceDemo() {
  return (
    <DoDont
      label="Structured Entry Affordance vs. Blank Prompt Paralysis"
      doExample={
        <div className="space-y-2 text-[13px] font-mono">
          <div className="border-l-2 border-[#FE299E] pl-3">01 · Compare Editions (0ms Local Filter)</div>
          <div className="border-l-2 border-[#111827] pl-3">02 · Summarize Primary Sources (pipe\stoicism)</div>
        </div>
      }
      dontExample={
        <div className="rounded border p-3 text-[13px]">
          &quot;Ask AI anything...&quot; empty white bar + generic purple wand badge
        </div>
      }
      doWhy="Concrete recipes orient first-time visitors immediately without making them invent prompt engineering syntax."
      dontWhy="Empty chat boxes create blank-page anxiety and force trial-and-error guessing."
    />
  );
}

function AiDiscoverSpecDemo() {
  return (
    <Stage label="Zero-Latency Intent Recipe Payload" caption="Recipes declare explicit prompt templates and optional scope constraints.">
      <pre tabIndex={0} className={CODE_PRE}>
        <code>{`const RECIPES: AccentPromptRecipe[] = [\n  { id: 'diff-sources', label: 'Compare Editions', template: 'Compare two canonical editions...' }\n];`}</code>
      </pre>
    </Stage>
  );
}

function AiDiscoverA11yDemo() {
  return (
    <Stage label="Roving Keyboard Tablist Verification" caption="Use Left/Right Arrow, Home, and End keys to move across progressive tiers; active state uses a pseudo-element border-bottom (WCAG 1.4.1), never color alone.">
      <AccentEngineTierSwitch label="Keyboard Roving Tablist Sample" />
    </Stage>
  );
}

/* ---------------------- 02 · Instructing ---------------------- */
function AiInstructOverviewDemo() {
  const [scopes, setScopes] = useState([
    { id: 'stoicism', label: 'pipe\\stoicism' },
    { id: 'website-design', label: 'pipe\\website-design' },
  ]);
  const [streaming, setStreaming] = useState(false);

  return (
    <Stage label="Scoped Context Composer with Abort Stop" caption="Attach explicit pipe\\ canons and halt active generation immediately with Stop Generation.">
      <AccentPromptComposer
        contextScopes={scopes}
        onRemoveScope={(id) => setScopes((prev) => prev.filter((s) => s.id !== id))}
        streaming={streaming}
        onSubmit={() => setStreaming(true)}
        onStop={() => setStreaming(false)}
        recipes={[
          { id: 'cite', label: 'Cite Sources Strictly', template: 'Answer using only verified quotes from attached scopes.' },
        ]}
      />
    </Stage>
  );
}

function AiInstructScopeDemo() {
  return (
    <DoDont
      label="Explicit Canon Scoping vs. Unbounded Chat"
      doExample={<p className="font-mono text-[13px]">Attached Scopes: [pipe\stoicism] [pipe\ethics] -&gt; Zero hallucinated corpora</p>}
      dontExample={<p className="font-mono text-[13px]">Unbounded global query across unverified web weights</p>}
      doWhy="Visible removable scope chips clarify exactly which canons govern the synthesis."
      dontWhy="Hidden system prompts leave users guessing what sources the model is reading."
    />
  );
}

function AiInstructAbortDemo() {
  const [running, setRunning] = useState(true);
  return (
    <Stage label="Sovereign AbortController Interruption" caption="Running streams expose a high-contrast Stop Generation button instead of disabling controls.">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className={`min-h-[44px] px-4 rounded-md font-mono text-[13px] font-semibold cursor-pointer ${
            running ? 'bg-[#9F1239] text-white' : 'bg-[var(--a-ink)] text-[var(--a-bg)]'
          }`}
        >
          {running ? '■ Stop Generation (Click to Halt)' : '> Start Mock Stream'}
        </button>
        <span className="font-mono text-[13px] text-[var(--a-muted)]">
          State: {running ? 'streaming + AbortController active' : 'aborted cleanly'}
        </span>
      </div>
    </Stage>
  );
}

function AiInstructSpecDemo() {
  return (
    <Stage label="Byte-0 Context Budget Comparator" caption="Context scopes prune repeated instructions using Trim (~) envelopes before model execution.">
      <pre tabIndex={0} className={CODE_PRE}>
        <code>{`Raw conversation context: 14,820 tokens\nPruned pipe\\~ envelope:  1,640 tokens (88.9% reduction)`}</code>
      </pre>
    </Stage>
  );
}

function AiInstructA11yDemo() {
  return (
    <Stage label="44×44px Scope Chips & Screen-Reader Labels" caption="Remove buttons on scope chips hold full >= 44px vertical clearance and announce remove scope semantics clearly.">
      <p className="font-mono text-[13px] p-3 border border-[var(--a-rule)] bg-[var(--a-surface)]">
        &lt;button aria-label=&quot;Remove scope pipe\stoicism&quot; className=&quot;min-h-[44px] min-w-[36px]&quot;&gt;×&lt;/button&gt;
      </p>
    </Stage>
  );
}

/* ---------------------- 03 · Observing ---------------------- */
function AiObserveOverviewDemo() {
  const [partial, setPartial] = useState(true);
  const sample = partial
    ? `## Synthesized Finding\n\nVerified primary sources confirm **deterministic SHA-256 checking`
    : `## Synthesized Finding\n\nVerified primary sources confirm **deterministic SHA-256 checking** holds cleanly.`;

  return (
    <Stage
      label="Self-Healing Stream & Native Reasoning Disclosure"
      controls={
        <Seg
          label="Stream"
          value={partial ? 'mid' : 'done'}
          onChange={(v) => setPartial(v === 'mid')}
          options={[
            { id: 'mid', label: 'Mid-Stream (Unclosed Bold)' },
            { id: 'done', label: 'Complete' },
          ]}
        />
      }
      caption="Mid-stream tokens render cleanly without raw markdown artifacts while <details> exposes searchable step latencies."
    >
      <div className="space-y-4">
        <AccentStreamingProse markdown={sample} streaming={partial} />
        <AccentReasoningTrace steps={SAMPLE_STEPS} />
      </div>
    </Stage>
  );
}

function AiObserveHealDemo() {
  const [stage, setStage] = useState<'fence' | 'table' | 'tick'>('fence');
  const raw =
    stage === 'fence'
      ? '```ts\nconst cid = sha256(node);'
      : stage === 'table'
        ? '| Canon | Nodes |\n|:'
        : 'Inline check: `deriveAccessibleAccent';

  return (
    <Stage
      label="healStreamingMarkdown() Deterministic Guard"
      controls={
        <Seg
          label="Chunk"
          value={stage}
          onChange={setStage}
          options={[
            { id: 'fence', label: 'Unclosed Code Fence' },
            { id: 'table', label: 'Partial Table Row' },
            { id: 'tick', label: 'Open Backtick' },
          ]}
        />
      }
      caption="Prevents mid-stream syntax flicker by healing incomplete tokens cleanly until final bytes arrive."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <pre tabIndex={0} className={CODE_PRE}><code>{`// RAW STREAM CHUNK\n${raw}`}</code></pre>
        <pre tabIndex={0} className={CODE_PRE}><code>{`// HEALED OUTPUT\n${healStreamingMarkdown(raw)}`}</code></pre>
      </div>
    </Stage>
  );
}

function AiObserveTraceDontDemo() {
  return (
    <DoDont
      label="Inspectable Step Trace vs. Opaque Spinner"
      doExample={<AccentReasoningTrace steps={SAMPLE_STEPS.slice(0, 2)} summaryLabel="2 Verified Retrieval Steps" />}
      dontExample={<p className="font-mono text-[13px] italic opacity-75">Thinking... (infinite looping dots with zero source visibility)</p>}
      doWhy="Structured steps show exact corpora queried and millisecond budgets transparently."
      dontWhy="Infinite pulsing animations waste focus and hide whether retrieval grounded or guessed."
    />
  );
}

function AiObserveSpecDemo() {
  return (
    <Stage label="Streaming Cursor & Polite Live Region Contract" caption="Updates announce completion politely via aria-live without stealing keyboard focus mid-read.">
      <pre tabIndex={0} className={CODE_PRE}>
        <code>{`<div aria-live="polite">Streaming synthesis...</div>\n<AccentProse markdown={healStreamingMarkdown(chunk)} />`}</code>
      </pre>
    </Stage>
  );
}

function AiObserveA11yDemo() {
  return (
    <Stage label="Native Cmd+F Findability Inside Closed <details>" caption="Closed native <details> elements automatically open during browser Find-in-Page without putting headings inside <summary>.">
      <AccentReasoningTrace steps={SAMPLE_STEPS} summaryLabel="Search inside closed trace (Try Finding 'BM25')" />
    </Stage>
  );
}

/* ---------------------- 04 · Evaluating ---------------------- */
function AiEvaluateOverviewDemo() {
  return (
    <Stage label="Inline Hovercard Citation + Sticky Verification Ledger" caption="Hover or focus inline footnote markers for supplemental provenance; inspect full CID rows below.">
      <div className="space-y-5">
        <p className="text-base leading-relaxed">
          Roman Stoics framed agency around what lies within rational assent{' '}
          <AccentCitationLink
            index={1}
            title="On the Shortness of Life"
            pipeNamespace="pipe\\stoicism"
            href="#ledger-preview"
            cid="9f820b714d3ca8120f5c"
            verifiedAt="2026-11-10"
          />
          , a principle echoed by modern local-first archives{' '}
          <AccentCitationLink
            index={2}
            title="Zero-Knowledge Civic Spec"
            pipeNamespace="pipe\\marigold"
            href="#ledger-preview"
            cid="7a319c88201e90bc321f"
            verifiedAt="2026-11-12"
          />
          .
        </p>
        <div id="ledger-preview">
          <AccentVerificationLedger entries={SAMPLE_CITATIONS} />
        </div>
      </div>
    </Stage>
  );
}

function AiEvaluatePopoverDemo() {
  return (
    <Stage label="Hover/Focus Supplemental Hint Contract" caption="Per modern-web-guidance: trigger uses aria-describedby + [popover] role='tooltip', never aria-expanded.">
      <p className="text-sm">
        Focus or hover marker:{' '}
        <AccentCitationLink
          index={1}
          title="De Brevitate Vitae §1"
          pipeNamespace="pipe\\stoicism"
          href="#source-anchor"
          cid="9f820b714d3ca8120f5c"
          verifiedAt="2026-11-10"
        />{' '}
        — Press Enter to follow link or Escape to dismiss hint.
      </p>
    </Stage>
  );
}

function AiEvaluateAntiSlopDemo() {
  return (
    <DoDont
      label="Cryptographic Ledger vs. Hollow Confidence Percentage"
      doExample={<div className="font-mono text-[13px]"><p>[01] De Brevitate Vitae · sha256:9f820b…</p><Tag tone="good">Verified CID</Tag></div>}
      dontExample={<p className="font-mono text-[13px]">Green check &quot;99% AI Verified&quot; pill linking nowhere</p>}
      doWhy="Users inspect exact primary source URLs and deterministic SHA-256 content hashes directly."
      dontWhy="Self-graded AI accuracy numbers create false authority without proof."
    />
  );
}

function AiEvaluateSpecDemo() {
  return (
    <Stage label="Canonical Node CID v1 Verification Format" caption="Every citation row tracks normalized claim, pipe\\namespace, and 256-bit checksum.">
      <pre tabIndex={0} className={CODE_PRE}>
        <code>{`spec: 'pipes:node:v1'\nsha256: '9f820b714d3ca8120f5c41ab29e8d310...'`}</code>
      </pre>
    </Stage>
  );
}

function AiEvaluateA11yDemo() {
  return (
    <Stage label="390px Responsive Ledger Scroll Container" caption="Narrow screens scroll the ledger inside a focusable tabIndex={0} region without breaking viewport width.">
      <div className="max-w-[340px]">
        <AccentVerificationLedger entries={SAMPLE_CITATIONS} label="Compact Mobile Verification Region" />
      </div>
    </Stage>
  );
}

/* ---------------------- 05 · Refining ---------------------- */
function AiRefineOverviewDemo() {
  const [log, setLog] = useState('Inspect word or line diffs below.');
  return (
    <Stage label="Client-Side MIT jsdiff + Hairline Socratic Follow-Ups" caption="Users explicitly approve revisions word-by-word before sealing synthesized insights to their Pipe.">
      <div className="space-y-6">
        <AccentDiffViewer
          before="Stoicism recommends ignoring civic life to preserve internal calm."
          after="Stoicism demands active civic duty while preserving rational assent over external impressions."
          onAccept={() => setLog('Revision accepted into draft.')}
          onReject={() => setLog('Revision rejected.')}
        />
        <AccentFollowUpList
          questions={[
            'Compare Musonius Rufus on civic engagement against Epicurean withdrawal.',
            'Audit primary-source citations from Books IV–VI of Meditations.',
          ]}
          onSelectQuestion={(q) => setLog(`Branched follow-up: "${q}"`)}
          onSealToPipe={() => setLog('Sealed verified synthesis to pipe\\website-design.')}
          sealTarget="pipe\\website-design"
        />
        <p className="font-mono text-[13px] text-[var(--a-muted)]">Event: {log}</p>
      </div>
    </Stage>
  );
}

function AiRefineFollowUpsDemo() {
  return (
    <DoDont
      label="Hairline Vertical Socratic List vs. Pill Suggestion Cloud"
      doExample={
        <AccentFollowUpList
          questions={['Compare Seneca Letter XVI with Epictetus Discourse I.', 'Export verified citations as Markdown.']}
        />
      }
      dontExample={<p className="font-mono text-[13px]">Five floating pastel bubble pills wrapping across 3 lines</p>}
      doWhy="Horizontal 1px hairlines match editorial reading cadence and remain effortless to tap on mobile."
      dontWhy="Wrapped rounded pill clouds fight typography and create noisy visual confetti."
    />
  );
}

function AiRefineHitlDemo() {
  return (
    <Stage label="Human-in-the-Loop Accept / Reject Granularity" caption="Switch seamlessly between inline word comparison and structural line diffs via jsdiff.">
      <AccentDiffViewer
        before="line 1: use unverified web cache\nline 2: return answer without sources"
        after="line 1: query indexed pipe\\stoicism slice\nline 2: render AccentVerificationLedger with CIDs"
        title="Workflow Policy Revision"
      />
    </Stage>
  );
}

function AiRefineSpecDemo() {
  return (
    <Stage label="MIT diff Package Contract (diffWords / diffLines)" caption="Computes zero-server token diffs in < 1ms cleanly in browser workers or React client components.">
      <pre tabIndex={0} className={CODE_PRE}>
        <code>{`import { diffWords, diffLines } from 'diff';\nconst changes = diffWords(beforeText, afterText);`}</code>
      </pre>
    </Stage>
  );
}

function AiRefineA11yDemo() {
  return (
    <Stage label="WCAG 1.4.1 Shape & Prefix Markers (No Color Alone)" caption="Deleted passages pair strikethrough + [-] prefix; inserted text pairs double-underline + [+] prefix.">
      <p className="text-sm font-mono">
        <del className="line-through text-[#9F1239] mr-3">[-] omitted pass</del>
        <ins className="underline decoration-2 text-[#14532D]">[+] verified addition</ins>
      </p>
    </Stage>
  );
}

/* ---------------------- 06 · Sovereign Flows ---------------------- */
function AiFlowsOverviewDemo() {
  const [tier, setTier] = useState<'local-0ms' | 'webgpu-slm' | 'cloud-byok'>('local-0ms');
  const [draft, setDraft] = useState('Click Run Query above to watch Tier -> Composer -> Stream flow.');
  return (
    <Stage label="Unified Sovereign Intelligence Flow" caption="One cohesive composition spanning 0ms Tier Switch -> Scoped Composer -> Self-Healing Stream.">
      <div className="space-y-4">
        <AccentEngineTierSwitch value={tier} onChange={setTier} />
        <AccentPromptComposer
          recipes={[{ id: 'synth', label: `Run via ${tier}`, template: 'Audit component token contrast across Sandstone and Dark Slate.' }]}
          onSubmit={({ prompt }) => setDraft(`### Synthesis (${tier})\n\nProcessed safely: **${prompt}**`)}
        />
        <AccentStreamingProse markdown={draft} />
      </div>
    </Stage>
  );
}

function AiFlowsHandoffDemo() {
  return (
    <DoDont
      label="Inline Editorial Flow vs. Modal Trap Wizard"
      doExample={<p className="font-mono text-[13px]">Query -&gt; Stream -&gt; Verify -&gt; Seal executes right inside the active reading column.</p>}
      dontExample={<p className="font-mono text-[13px]">Full-screen AI modal blocks access to the document being edited.</p>}
      doWhy="Keeping synthesis inline lets humans cross-check paragraphs beside citations without losing scroll position."
      dontWhy="Interruptive wizards hide the very content the user wants to improve."
    />
  );
}

function AiFlowsGraduationDemo() {
  const [step, setStep] = useState<'draft' | 'verified' | 'sealed'>('verified');
  return (
    <Stage label="Knowledge Graduation Stepper" controls={<Seg label="Phase" value={step} onChange={setStep} options={[{ id: 'draft', label: '01 Draft' }, { id: 'verified', label: '02 Verified' }, { id: 'sealed', label: '03 Sealed CID' }]} />} caption="Ephemeral AI outputs graduate into permanent, citable Pipe knowledge nodes.">
      <p className="font-mono text-[13px] p-3 border-l-2 border-[#FE299E] bg-[var(--a-surface)]">
        {step === 'draft' && 'Step 01 · Unverified local draft — editable freely via AccentDiffViewer.'}
        {step === 'verified' && 'Step 02 · Citations verified in AccentVerificationLedger (99% claim alignment).'}
        {step === 'sealed' && 'Step 03 · Canonical node sealed at sha256:9f820b… inside pipe\\website-design.'}
      </p>
    </Stage>
  );
}

function AiFlowsSpecDemo() {
  return (
    <Stage label="Sovereign Flow State Machine" caption="Deterministic states keep UI responsive across 0ms SQL lookups and multi-second WebGPU streams.">
      <pre tabIndex={0} className={CODE_PRE}>
        <code>{`idle -> scoping(pipe\\slug) -> streaming(AbortController) -> verifying(SHA-256) -> refining(diff) -> sealed(node)`}</code>
      </pre>
    </Stage>
  );
}

function AiFlowsA11yDemo() {
  return (
    <Stage label="Non-Stealing Focus Choreography Across Phases" caption="Streaming updates write to aria-live='polite' without yanking focus away from the composer or Stop button.">
      <p className="text-sm font-mono p-3 border border-[var(--a-rule)] bg-[var(--a-surface)]">
        Focus remains on Stop Generation / Accept Revision while screen readers queue polite completion status.
      </p>
    </Stage>
  );
}

/* ---------------------- Philosophy Essay Figures ---------------------- */
function EssayZeroShotLatencyDemo() {
  const rows = [
    { label: 'Tier 1 · Deterministic SQL / W3C Rule', ms: 0, pct: 95 },
    { label: 'Tier 2 · Browser WebGPU SLM (Qwen 1.7B)', ms: 420, pct: 75 },
    { label: 'Tier 3 · Remote Cloud API Cold Start', ms: 3400, pct: 35 },
  ];
  return (
    <Stage label="Figure 1 · Latency & Cost of Interaction Affordances" caption="Zero-shot deterministic controls resolve before remote tokens even leave the socket.">
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between font-mono text-[13px]">
              <span>{r.label}</span>
              <span className="tabular-nums font-bold">{r.ms} ms</span>
            </div>
            <div className="h-2.5 mt-1 bg-[var(--a-rule)] rounded-sm">
              <div className="h-full bg-[var(--a-ink)] rounded-sm" style={{ width: `${r.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Stage>
  );
}

function EssayRecipeVsBlankDemo() {
  return (
    <DoDont
      label="Figure 2 · Zero-Prompt Recipe vs. Empty Textarea"
      doExample={<AccentPromptComposer recipes={[{ id: 'audit', label: 'Audit Contrast Math', template: 'Verify all 7 dialects pass 7.0:1 AAA ink contrast.' }]} />}
      dontExample={<p className="font-mono text-[13px] p-4 border rounded">Blank 1-line box: &quot;Ask anything...&quot; with zero domain hints</p>}
      doWhy="Structured domain actions encode expert workflow directly into the UI."
      dontWhy="Empty text boxes force non-experts to reverse-engineer internal capabilities."
    />
  );
}

function EssayLocalCustodyStackDemo() {
  return (
    <Stage label="Figure 3 · Progressive Local Intelligence Custody Stack" caption="Data stays inside the browser or local daemon unless the user explicitly crosses to Tier 3 BYOK.">
      <div className="grid gap-3 sm:grid-cols-3 text-[13px] font-mono">
        <div className="p-3 border-t-2 border-[#0369A1] bg-[var(--a-surface)]">01 · Client Templates (0 MB · 0 ms)</div>
        <div className="p-3 border-t-2 border-[#1B5E3A] bg-[var(--a-surface)]">02 · WebGPU IndexedDB Worker</div>
        <div className="p-3 border-t-2 border-[#FE299E] bg-[var(--a-surface)]">03 · Encrypted User Key BYOK</div>
      </div>
    </Stage>
  );
}

function EssayStreamHealDiagramDemo() {
  return (
    <Stage label="Figure 1 · Closing Unfinished Markdown Mid-Stream" caption="Self-healing heals unclosed ``` fences so mobile layouts never jump or flash raw syntax.">
      <AccentStreamingProse
        markdown={`### Mid-Stream Preview\n\n\`\`\`ts\nexport const contract = 'safe';`}
        streaming={true}
      />
    </Stage>
  );
}

function EssayCitationLedgerVsBadgeDemo() {
  return (
    <Stage label="Figure 2 · Verifiable Citation Ledger vs. Sparkle Theater" caption="Readers trust cryptographic addresses and inspectable quotes over decorative badges.">
      <AccentVerificationLedger entries={SAMPLE_CITATIONS} label="Verifiable Provenance Specimen" />
    </Stage>
  );
}

function EssayTraceFindabilityDemo() {
  return (
    <Stage label="Figure 3 · Keyboard & Find-in-Page Ready Disclosure" caption="Native <details> keeps model reasoning inspectable and searchable via Cmd+F without heavy animations.">
      <AccentReasoningTrace steps={SAMPLE_STEPS} summaryLabel="Inspectable Retrieval Phases" />
    </Stage>
  );
}

export const AI_PATTERN_DEMOS: Record<string, React.ComponentType> = {
  'ai-discover-overview': AiDiscoverOverviewDemo,
  'ai-discover-recipe': AiDiscoverRecipeDemo,
  'ai-discover-affordance': AiDiscoverAffordanceDemo,
  'ai-discover-spec': AiDiscoverSpecDemo,
  'ai-discover-a11y': AiDiscoverA11yDemo,
  'ai-instruct-overview': AiInstructOverviewDemo,
  'ai-instruct-scope': AiInstructScopeDemo,
  'ai-instruct-abort': AiInstructAbortDemo,
  'ai-instruct-spec': AiInstructSpecDemo,
  'ai-instruct-a11y': AiInstructA11yDemo,
  'ai-observe-overview': AiObserveOverviewDemo,
  'ai-observe-heal': AiObserveHealDemo,
  'ai-observe-trace-dont': AiObserveTraceDontDemo,
  'ai-observe-spec': AiObserveSpecDemo,
  'ai-observe-a11y': AiObserveA11yDemo,
  'ai-evaluate-overview': AiEvaluateOverviewDemo,
  'ai-evaluate-popover': AiEvaluatePopoverDemo,
  'ai-evaluate-anti-slop': AiEvaluateAntiSlopDemo,
  'ai-evaluate-spec': AiEvaluateSpecDemo,
  'ai-evaluate-a11y': AiEvaluateA11yDemo,
  'ai-refine-overview': AiRefineOverviewDemo,
  'ai-refine-followups': AiRefineFollowUpsDemo,
  'ai-refine-hitl': AiRefineHitlDemo,
  'ai-refine-spec': AiRefineSpecDemo,
  'ai-refine-a11y': AiRefineA11yDemo,
  'ai-flows-overview': AiFlowsOverviewDemo,
  'ai-flows-handoff': AiFlowsHandoffDemo,
  'ai-flows-graduation': AiFlowsGraduationDemo,
  'ai-flows-spec': AiFlowsSpecDemo,
  'ai-flows-a11y': AiFlowsA11yDemo,
  'essay-zero-shot-latency': EssayZeroShotLatencyDemo,
  'essay-recipe-vs-blank': EssayRecipeVsBlankDemo,
  'essay-local-custody-stack': EssayLocalCustodyStackDemo,
  'essay-stream-heal-diagram': EssayStreamHealDiagramDemo,
  'essay-citation-ledger-vs-badge': EssayCitationLedgerVsBadgeDemo,
  'essay-trace-findability': EssayTraceFindabilityDemo,
};
