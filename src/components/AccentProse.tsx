'use client';

import React, { useMemo } from 'react';
import { parseMarkdownToBlocks, InlineRenderer } from '@/components/MarkdownRenderer';
import { ACCENT_DEMOS } from './demos';

export function slugifyHeading(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*_`]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

const LINK = 'text-[var(--a-link)] underline underline-offset-4 decoration-1 hover:decoration-2';

/** Splits markdown on `::demo:id::` lines and renders reading-size prose. */
export function AccentProse({ markdown }: { markdown: string }) {
  const chunks = useMemo(() => markdown.split(/^\s*::demo:([a-z0-9-]+)::\s*$/m), [markdown]);
  return (
    <div className="accent-prose">
      {chunks.map((chunk, i) => {
        if (i % 2 === 1) {
          const Demo = ACCENT_DEMOS[chunk];
          return Demo ? <Demo key={i} /> : null;
        }
        return <ProseBlocks key={i} md={chunk} />;
      })}
    </div>
  );
}

function ProseBlocks({ md }: { md: string }) {
  const blocks = useMemo(() => parseMarkdownToBlocks(md), [md]);
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'heading': {
            const id = slugifyHeading(b.text);
            if (b.level <= 2)
              return (
                <h2 key={i} id={id} className="scroll-mt-28 font-serif text-2xl sm:text-[28px] leading-10 font-semibold tracking-tight mt-16 mb-4">
                  <InlineRenderer text={b.text} linkClassName={LINK} />
                </h2>
              );
            return (
              <h3 key={i} id={id} className="scroll-mt-28 text-lg leading-8 font-semibold mt-10 mb-2">
                <InlineRenderer text={b.text} linkClassName={LINK} />
              </h3>
            );
          }
          case 'codeblock':
            return (
              <pre key={i} tabIndex={0} className="my-6 overflow-x-auto rounded-md bg-[#111827] text-[#F3EFE9] p-4 text-[13px] leading-6 border border-[var(--a-rule)]">
                <code>{b.text}</code>
              </pre>
            );
          case 'blockquote': {
            const m = b.text.match(/^\*\*(Why|Note|Warning|Rule)[:.]?\*\*\s*(.*)$/i);
            if (m) {
              const kind = m[1].toLowerCase();
              const tone =
                kind === 'warning'
                  ? 'border-[#9F1239]'
                  : kind === 'why'
                    ? 'border-[var(--a-accent)]'
                    : 'border-[var(--a-muted)]';
              return (
                <aside key={i} className={`my-6 max-w-[68ch] border-l-4 ${tone} bg-[var(--a-surface)] px-5 py-4 text-base leading-7`}>
                  <strong className="block text-xs uppercase tracking-[0.12em] text-[var(--a-muted)] mb-1">
                    {kind === 'why' ? 'Why we decided this' : m[1]}
                  </strong>
                  <InlineRenderer text={m[2]} linkClassName={LINK} />
                </aside>
              );
            }
            return (
              <blockquote key={i} className="my-8 border-l-2 border-[var(--a-accent)] pl-6 font-serif text-xl leading-8 italic">
                <InlineRenderer text={b.text} linkClassName={LINK} />
              </blockquote>
            );
          }
          case 'table':
            return (
              <div key={i} tabIndex={0} role="region" aria-label="Data table" className="my-8 overflow-x-auto rounded-md border border-[var(--a-rule)]">
                <table className="w-full min-w-[480px] text-sm leading-6 border-collapse">
                  <thead className="bg-[var(--a-surface)]">
                    <tr>
                      {b.header.map((h, j) => (
                        <th key={j} scope="col" className="text-left font-semibold px-4 py-3 border-b border-[var(--a-rule)] whitespace-nowrap">
                          <InlineRenderer text={h} linkClassName={LINK} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-b border-[var(--a-rule)] last:border-0">
                        {r.map((c, k) =>
                          k === 0 ? (
                            <th key={k} scope="row" className="text-left font-medium px-4 py-3 align-top whitespace-nowrap">
                              <InlineRenderer text={c} linkClassName={LINK} />
                            </th>
                          ) : (
                            <td key={k} className="px-4 py-3 align-top tabular-nums">
                              <InlineRenderer text={c} linkClassName={LINK} />
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case 'ul':
          case 'ol': {
            const Tag = b.type;
            return (
              <Tag key={i} className={`my-4 space-y-2 pl-6 text-base sm:text-[17px] leading-7 sm:leading-8 max-w-[68ch] ${b.type === 'ul' ? 'list-disc' : 'list-decimal'} marker:text-[var(--a-muted)]`}>
                {b.items.map((it, j) => (
                  <li key={j} className="pl-1"><InlineRenderer text={it} linkClassName={LINK} /></li>
                ))}
              </Tag>
            );
          }
          case 'hr':
            return <hr key={i} className="my-12 border-[var(--a-rule)]" />;
          default:
            return (
              <p key={i} className="my-4 text-base sm:text-[17px] leading-7 sm:leading-8 max-w-[68ch]">
                <InlineRenderer text={b.text} linkClassName={LINK} />
              </p>
            );
        }
      })}
    </>
  );
}
