'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Copy, Play, Terminal } from 'lucide-react';
import { RiseLines, Hairline } from '@/components/editorial-motion/AccentBrandMotion';

type ClientId = 'claude' | 'cursor' | 'agy' | 'ollama';
type ToolId =
  | 'accent_search_patterns'
  | 'accent_get_spec'
  | 'accent_get_brand_contract'
  | 'accent_lint_code';

const CLIENT_CONFIGS: Array<{
  id: ClientId;
  label: string;
  filename: string;
  snippet: string;
}> = [
  {
    id: 'claude',
    label: 'Claude Code',
    filename: 'Terminal / .mcp.json',
    snippet: `{
  "mcpServers": {
    "accent-ui": {
      "type": "http",
      "url": "https://pipes.pink/api/mcp"
    }
  }
}`,
  },
  {
    id: 'cursor',
    label: 'Cursor IDE',
    filename: '.cursor/mcp.json',
    snippet: `{
  "mcpServers": {
    "accent-ui": {
      "url": "https://pipes.pink/api/mcp",
      "headers": {
        "Content-Type": "application/json"
      }
    }
  }
}`,
  },
  {
    id: 'agy',
    label: 'Antigravity (AGY)',
    filename: '~/.gemini/config/mcp_config.json',
    snippet: `{
  "mcpServers": {
    "accent-ui": {
      "command": "npx",
      "args": ["-y", "@pipes/mcp-server"],
      "env": {
        "PIPES_MCP_URL": "https://pipes.pink/api/mcp"
      }
    }
  }
}`,
  },
  {
    id: 'ollama',
    label: 'Local Ollama',
    filename: 'bash (0 Cloud Tokens)',
    snippet: `# 1. Fetch verified STYLES.md contract for any brand dialect
curl -sL "https://accent.pipes.pink/styles.md?brand=editorial-sandstone" > STYLES.md

# 2. Query public Accént MCP locally via curl or stdio bridge
curl -s -X POST https://pipes.pink/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"accent_get_spec","arguments":{"slug":"patterns/evaluating"}}}' | jq .

# 3. Hand STYLES.md to your local coding model
ollama run qwen2.5-coder:7b "Read STYLES.md and implement <AccentVerificationLedger /> with zero Sparkles icons."`,
  },
];

const TOOL_PRESETS: Record<
  ToolId,
  {
    label: string;
    description: string;
    sampleArgs: string;
  }
> = {
  accent_search_patterns: {
    label: 'accent_search_patterns',
    description: 'Search 66+ Accént lifecycle patterns, specs, components, and essays.',
    sampleArgs: JSON.stringify(
      {
        query: 'verification ledger citations',
        section: 'patterns',
      },
      null,
      2
    ),
  },
  accent_get_spec: {
    label: 'accent_get_spec',
    description: 'Fetch full 4-tab Markdown specs, sub-patterns, and AgentRules for any slug.',
    sampleArgs: JSON.stringify(
      {
        slug: 'patterns/evaluating',
      },
      null,
      2
    ),
  },
  accent_get_brand_contract: {
    label: 'accent_get_brand_contract',
    description: 'Compile STYLES.md, WCAG AAA contrast report, and W3C tokens for a dialect.',
    sampleArgs: JSON.stringify(
      {
        brand: 'editorial-sandstone',
      },
      null,
      2
    ),
  },
  accent_lint_code: {
    label: 'accent_lint_code',
    description: 'Lint TSX/CSS against 13px floor, HTML nesting, and arbitrary dimension rules.',
    sampleArgs: JSON.stringify(
      {
        code: `<span className="text-[11px]">Tiny Badge</span>\n<div className="w-[17px] h-[19px]">Off-grid box</div>\n<Link href="/foo"><button>Click</button></Link>`,
      },
      null,
      2
    ),
  },
};

export default function AccentMcpPage() {
  const [activeClient, setActiveClient] = useState<ClientId>('claude');
  const [copiedClient, setCopiedClient] = useState(false);

  const [selectedTool, setSelectedTool] = useState<ToolId>('accent_lint_code');
  const [argsJson, setArgsJson] = useState<string>(TOOL_PRESETS.accent_lint_code.sampleArgs);
  const [rpcOutput, setRpcOutput] = useState<string>(
    '// Click "Execute JSON-RPC Call" to invoke live /api/mcp right from the browser.'
  );
  const [running, setRunning] = useState(false);

  const currentClient = CLIENT_CONFIGS.find((c) => c.id === activeClient) ?? CLIENT_CONFIGS[0];

  const handleCopyClient = async () => {
    try {
      await navigator.clipboard.writeText(currentClient.snippet);
      setCopiedClient(true);
      window.setTimeout(() => setCopiedClient(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleSelectTool = (tool: ToolId) => {
    setSelectedTool(tool);
    setArgsJson(TOOL_PRESETS[tool].sampleArgs);
  };

  const handleExecuteRpc = async () => {
    setRunning(true);
    try {
      let parsedArgs: Record<string, unknown> = {};
      try {
        parsedArgs = JSON.parse(argsJson) as Record<string, unknown>;
      } catch (err: unknown) {
        setRpcOutput(
          `JSON parse error in arguments: ${err instanceof Error ? err.message : String(err)}`
        );
        setRunning(false);
        return;
      }

      const payload = {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'tools/call',
        params: {
          name: selectedTool,
          arguments: parsedArgs,
        },
      };

      const res = await fetch('/api/mcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setRpcOutput(JSON.stringify(json, null, 2));
    } catch (err: unknown) {
      setRpcOutput(`Request error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="py-10 sm:py-16 space-y-14 max-w-[1100px]">
      {/* Masthead */}
      <header className="space-y-5">
        <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--a-accent-text)]">
          &gt; Model Context Protocol · Zero-Key Public Tools
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-[var(--a-ink)] leading-[1.05]">
          <RiseLines
            immediate
            lines={[
              'Accént speaks MCP',
              <>
                over <span className="text-[var(--a-accent-text)]">live JSON-RPC</span> &amp; stdio.
              </>,
            ]}
          />
        </h1>
        <p className="text-base sm:text-xl text-[var(--a-muted)] max-w-[66ch] leading-relaxed">
          Connect Claude Code, Cursor, Antigravity, or local Ollama scripts directly to Accént 3.1. Search Human–AI patterns, retrieve `STYLES.md` brand dialect contracts, and lint UI code against our zero-sparkle and WCAG AAA contracts—no API key required.
        </p>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-[var(--a-rule)]">
          <Link
            href="/design-system/patterns"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-bold text-[var(--a-ink)] hover:text-[var(--a-accent-text)] underline underline-offset-4"
          >
            <span>Browse 01–06 AI Patterns</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/design-system/insights"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[13px] font-semibold text-[var(--a-accent-text)] hover:text-[var(--a-ink)] underline underline-offset-4"
          >
            <span>Read Design Philosophy &amp; Color Matrix →</span>
          </Link>
        </div>
        <Hairline className="bg-[var(--a-rule)]" />
      </header>

      {/* Client Config Setup */}
      <section aria-labelledby="mcp-clients-heading" className="space-y-5">
        <div className="space-y-1">
          <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--a-muted)]">
            Step 01 · Configure Your Agent Host
          </p>
          <h2 id="mcp-clients-heading" className="font-serif text-3xl font-semibold text-[var(--a-ink)]">
            Client Snippets (HTTP &amp; Local CLI)
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="MCP client configuration examples"
          className="flex flex-wrap gap-2 border-b border-[var(--a-rule)]"
        >
          {CLIENT_CONFIGS.map((client) => {
            const selected = activeClient === client.id;
            return (
              <button
                key={client.id}
                role="tab"
                type="button"
                aria-selected={selected}
                onClick={() => setActiveClient(client.id)}
                className={`accent-tab-btn min-h-[44px] px-4 py-2 font-mono text-[13px] font-semibold cursor-pointer ${
                  selected
                    ? 'text-[var(--a-accent-text)]'
                    : 'text-[var(--a-muted)] hover:text-[var(--a-ink)]'
                }`}
              >
                {client.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[13px] text-[var(--a-muted)] flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[var(--a-accent-text)]" aria-hidden="true" />
              <span>{currentClient.filename}</span>
            </span>
            <button
              type="button"
              onClick={handleCopyClient}
              className="inline-flex min-h-[44px] px-4 items-center gap-2 border border-[var(--a-ink)] font-mono text-[13px] font-semibold cursor-pointer hover:bg-[var(--a-ink)] hover:text-[var(--a-bg)] transition-colors"
            >
              {copiedClient ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              <span>{copiedClient ? 'Copied Config' : 'Copy Config'}</span>
            </button>
          </div>
          <pre className="p-5 bg-[#111827] text-[#F3EFE9] font-mono text-[13px] leading-relaxed overflow-x-auto border border-[var(--a-rule)]">
            <code>{currentClient.snippet}</code>
          </pre>
        </div>
      </section>

      {/* Interactive Live Tester */}
      <section aria-labelledby="mcp-tester-heading" className="space-y-6 pt-6 border-t border-[var(--a-rule)]">
          <div className="space-y-1">
            <p className="font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--a-muted)]">
              Step 02 · Live JSON-RPC 2.0 Console
            </p>
            <h2 id="mcp-tester-heading" className="font-serif text-3xl font-semibold text-[var(--a-ink)]">
              Test Accént MCP Tools Directly
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Select MCP tool">
            {(Object.keys(TOOL_PRESETS) as ToolId[]).map((toolId) => {
              const active = selectedTool === toolId;
              return (
                <button
                  key={toolId}
                  type="button"
                  aria-pressed={active}
                  onClick={() => handleSelectTool(toolId)}
                  className={`min-h-[44px] px-3.5 py-2 font-mono text-[13px] border cursor-pointer transition-colors ${
                    active
                      ? 'border-[var(--a-ink)] bg-[var(--a-ink)] text-[var(--a-bg)] font-bold'
                      : 'border-[var(--a-rule)] bg-[var(--a-surface)] text-[var(--a-ink)] hover:border-[var(--a-accent)]'
                  }`}
                >
                  {toolId}
                </button>
              );
            })}
          </div>

          <p className="text-base text-[var(--a-muted)]">{TOOL_PRESETS[selectedTool].description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <label
                htmlFor="mcp-args-input"
                className="block font-mono text-[13px] font-semibold uppercase tracking-wider text-[var(--a-ink)]"
              >
                Arguments (`params.arguments`)
              </label>
              <textarea
                id="mcp-args-input"
                rows={7}
                value={argsJson}
                onChange={(e) => setArgsJson(e.target.value)}
                className="w-full p-4 border border-[var(--a-rule)] bg-[var(--a-well)] text-[var(--a-ink)] font-mono text-[13px] leading-relaxed focus:outline-2 focus:outline-[var(--a-accent)]"
              />
              <button
                type="button"
                onClick={handleExecuteRpc}
                disabled={running}
                style={{ borderRadius: 'var(--a-radius-cta, 6px)' }}
                className="inline-flex min-h-[44px] px-5 items-center gap-2 bg-[var(--a-accent-fill)] text-[var(--a-accent-fg)] font-mono text-[13px] font-semibold cursor-pointer hover:opacity-95 disabled:opacity-50"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                <span>{running ? 'Executing POST /api/mcp...' : 'Execute JSON-RPC Call →'}</span>
              </button>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[13px] font-semibold uppercase tracking-wider text-[var(--a-ink)]">
                JSON-RPC Response (`POST /api/mcp`)
              </p>
              <pre
                aria-live="polite"
                className="p-4 max-h-[340px] overflow-auto bg-[#111827] text-[#F3EFE9] font-mono text-[13px] leading-relaxed border border-[var(--a-rule)]"
              >
                <code>{rpcOutput}</code>
              </pre>
            </div>
          </div>
        </section>

      {/* Tool Catalog Reference Table */}
      <section aria-labelledby="mcp-catalog-heading" className="space-y-4 pt-6 border-t border-[var(--a-rule)]">
        <h2 id="mcp-catalog-heading" className="font-serif text-3xl font-semibold text-[var(--a-ink)]">
          Public Tool Surface Summary
        </h2>
        <div
          role="region"
          aria-label="Exposed Accént MCP Tools"
          tabIndex={0}
          className="overflow-x-auto border-y border-[var(--a-rule)]"
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[var(--a-rule)]">
                <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">Tool</th>
                <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">Required Input</th>
                <th scope="col" className="py-3 px-3 font-mono text-[13px] font-bold">Output Payload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--a-rule)] font-mono text-[13px]">
              <tr>
                <td className="py-3.5 px-3 font-bold text-[var(--a-accent-text)]">accent_search_patterns</td>
                <td className="py-3.5 px-3">query (+ section?, aiPhase?)</td>
                <td className="py-3.5 px-3 font-sans text-sm sm:text-base text-[var(--a-muted)]">Ranked specs, sub-patterns, live Pipe links &amp; rule counts</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-[var(--a-accent-text)]">accent_get_spec</td>
                <td className="py-3.5 px-3">slug</td>
                <td className="py-3.5 px-3 font-sans text-sm sm:text-base text-[var(--a-muted)]">Complete Overview/Guidelines/Specs/Accessibility tabs + AgentRules</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-[var(--a-accent-text)]">accent_get_brand_contract</td>
                <td className="py-3.5 px-3">brand? (7 dialects)</td>
                <td className="py-3.5 px-3 font-sans text-sm sm:text-base text-[var(--a-muted)]">STYLES.md Markdown, contrast audit, tokens &amp; 49-pair AAA palette</td>
              </tr>
              <tr>
                <td className="py-3.5 px-3 font-bold text-[var(--a-accent-text)]">accent_lint_code</td>
                <td className="py-3.5 px-3">code</td>
                <td className="py-3.5 px-3 font-sans text-sm sm:text-base text-[var(--a-muted)]">Line-numbered violations for AgentRules, Sparkles ban, 13px floor &amp; nesting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
