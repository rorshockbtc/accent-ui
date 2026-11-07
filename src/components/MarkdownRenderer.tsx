'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  linkClassName?: string;
}

/**
 * Lightweight, zero-dependency, safe Markdown renderer for Semi / Greater chats.
 * Handles headings, bold, italic, inline code, code blocks, lists, blockquotes, and links.
 */
function getHeadingSlugs(text: string): { primary: string; alt?: string } {
  const clean = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#*_`]/g, '');
  const standard = clean
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');

  const github = clean
    .toLowerCase()
    .split('')
    .filter((c) => /[\w\s-]/.test(c))
    .join('')
    .replace(/ /g, '-');

  return {
    primary: standard,
    alt: github && github !== standard ? github : undefined,
  };
}

export function MarkdownRenderer({ content, className = '', linkClassName = 'text-primary underline hover:opacity-80 font-medium' }: MarkdownRendererProps) {
  const blocks = useMemo(() => parseMarkdownToBlocks(content), [content]);

  return (
    <div className={`space-y-2.5 text-inherit font-sans leading-relaxed ${className}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4';
            const { primary, alt } = getHeadingSlugs(block.text);
            const sizeClass =
              block.level === 1
                ? 'text-lg sm:text-xl font-serif font-semibold tracking-tight text-current mt-3 mb-1.5 leading-snug scroll-mt-24'
                : block.level === 2
                ? 'text-base sm:text-lg font-serif font-semibold tracking-tight text-current mt-3 mb-1.5 leading-snug border-b border-current/10 pb-1 scroll-mt-24'
                : block.level === 3
                ? 'text-sm sm:text-base font-sans font-semibold tracking-tight text-current mt-2.5 mb-1 leading-snug scroll-mt-24'
                : 'text-sm font-sans font-semibold text-current mt-2 mb-1 scroll-mt-24';
            return (
              <Tag key={i} id={primary} className={`${sizeClass} flex items-center gap-1.5 relative group`}>
                {alt && <span id={alt} className="absolute -top-24 scroll-mt-24 pointer-events-none" aria-hidden="true" />}
                <InlineRenderer text={block.text} linkClassName={linkClassName} />
              </Tag>
            );
          }
          case 'codeblock': {
            return (
              <pre
                key={i}
                className="my-2.5 p-3 bg-stone-900 text-stone-100 rounded-md text-xs overflow-x-auto border border-stone-800"
              >
                <code>{block.text}</code>
              </pre>
            );
          }
          case 'blockquote': {
            return (
              <blockquote
                key={i}
                className="my-2.5 pl-3.5 border-l-2 border-[#D44983] italic text-current opacity-90 text-sm leading-relaxed bg-current/[0.04] py-2 rounded-r-sm"
              >
                <InlineRenderer text={block.text} linkClassName={linkClassName} />
              </blockquote>
            );
          }
          case 'ul': {
            return (
              <ul key={i} className="my-2 space-y-1.5 list-disc list-outside pl-5 text-[13.5px] font-sans leading-relaxed text-current">
                {block.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    <InlineRenderer text={item} linkClassName={linkClassName} />
                  </li>
                ))}
              </ul>
            );
          }
          case 'ol': {
            return (
              <ol key={i} className="my-2 space-y-1.5 list-decimal list-outside pl-5 text-[13.5px] font-sans leading-relaxed text-current">
                {block.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    <InlineRenderer text={item} linkClassName={linkClassName} />
                  </li>
                ))}
              </ol>
            );
          }
          case 'hr': {
            return <hr key={i} className="my-3 border-current/15" />;
          }
          case 'table': {
            return (
              <div key={i} className="my-2.5 overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      {block.header.map((h, j) => (
                        <th key={j} className="text-left font-semibold border-b border-current/20 px-2 py-1">
                          <InlineRenderer text={h} linkClassName={linkClassName} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((c, k) => (
                          <td key={k} className="border-b border-current/10 px-2 py-1 align-top">
                            <InlineRenderer text={c} linkClassName={linkClassName} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          case 'paragraph':
          default: {
            return (
              <p key={i} className="text-[13.5px] font-sans leading-relaxed text-current my-1.5">
                <InlineRenderer text={block.text} linkClassName={linkClassName} />
              </p>
            );
          }
        }
      })}
    </div>
  );
}

export type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'codeblock'; lang: string; text: string }
  | { type: 'blockquote'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'hr' }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'paragraph'; text: string };

export function parseMarkdownToBlocks(md: string): Block[] {
  if (!md) return [];
  const lines = md.split('\n');
  const blocks: Block[] = [];

  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines: string[] = [];

  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = () => {
    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check code blocks ```
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        blocks.push({
          type: 'codeblock',
          lang: codeBlockLang,
          text: codeBlockLines.join('\n'),
        });
        inCodeBlock = false;
        codeBlockLines = [];
        codeBlockLang = '';
      } else {
        flushList();
        inCodeBlock = true;
        codeBlockLang = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(rawLine);
      continue;
    }

    // Blank line
    if (!trimmed) {
      flushList();
      continue;
    }

    // Horizontal rule --- or ***
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(trimmed)) {
      flushList();
      blocks.push({ type: 'hr' });
      continue;
    }

    // Headings #, ##, ###, ####
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushList();
      blocks.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      continue;
    }

    // Table: header row, then a |---|---| separator row, then body rows
    if (
      trimmed.startsWith('|') &&
      i + 1 < lines.length &&
      /^\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1].trim()) &&
      lines[i + 1].includes('-')
    ) {
      flushList();
      const splitRow = (row: string) =>
        row
          .trim()
          .replace(/^\|/, '')
          .replace(/\|$/, '')
          .split(/(?<!\\)\|/)
          .map((c) => c.trim().replace(/\\\|/g, '|'));
      const header = splitRow(trimmed);
      const rows: string[][] = [];
      let j = i + 2;
      while (j < lines.length && lines[j].trim().startsWith('|')) {
        rows.push(splitRow(lines[j]));
        j++;
      }
      blocks.push({ type: 'table', header, rows });
      i = j - 1;
      continue;
    }

    // Blockquote >
    if (trimmed.startsWith('>')) {
      flushList();
      const quoteText = trimmed.replace(/^>\s?/, '');
      blocks.push({
        type: 'blockquote',
        text: quoteText,
      });
      continue;
    }

    // Unordered List - or *
    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      if (!currentList || currentList.type !== 'ul') {
        flushList();
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(ulMatch[1]);
      continue;
    }

    // Ordered List 1. 2.
    const olMatch = trimmed.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      if (!currentList || currentList.type !== 'ol') {
        flushList();
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(olMatch[1]);
      continue;
    }

    // Regular line / Paragraph
    flushList();
    blocks.push({
      type: 'paragraph',
      text: trimmed,
    });
  }

  flushList();

  if (inCodeBlock && codeBlockLines.length > 0) {
    blocks.push({
      type: 'codeblock',
      lang: codeBlockLang,
      text: codeBlockLines.join('\n'),
    });
  }

  return blocks;
}

/**
 * Universal plain-text Markdown scrubber for card titles, single-line labels,
 * and plain-text summaries so raw **bold**, *italic*, `code`, [links](url),
 * and ### headings never leak into the UI.
 */
export function stripMarkdownSyntax(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\s+#{1,6}\s+/g, ' ')
    .replace(/^>\s*/gm, '')
    .replace(/\|[\s-:]+\|/g, ' ')
    .replace(/\*\*\*([^*]+)\*\*\*/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/___([^_]+)___/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/(^|\s)_([^_]+)_(\s|[.,!?;:]|$)/g, '$1$2$3')
    .replace(/~~([^~]+)~~/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^---+$/gm, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

interface InlineRendererProps {
  text: string;
  linkClassName?: string;
}

/**
 * Renders inline elements: [link](url), `code`, ***bold-italic***, **bold**, *italic*, __bold__, _italic_, ~~strike~~
 */
export function InlineRenderer({ text, linkClassName }: InlineRendererProps) {
  if (!text) return null;

  // Split tokens by regex capturing links, code, bold-italic, bold, italic, strikethrough
  const pattern =
    /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|~~[^~]+~~)/g;
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;

        // Link: [label](url)
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          const [, rawLabel, url] = linkMatch;
          const label = stripMarkdownSyntax(rawLabel);
          if (url.startsWith('#')) {
            return (
              <a key={index} href={url} className={linkClassName}>
                {label}
              </a>
            );
          }
          if (url.startsWith('/')) {
            return (
              <Link key={index} href={url} className={linkClassName}>
                {label}
              </Link>
            );
          }
          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {label}
            </a>
          );
        }

        // Inline code: `code`
        const codeMatch = part.match(/^`([^`]+)`$/);
        if (codeMatch) {
          return (
            <code
              key={index}
              className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[0.85em] font-medium text-[#D44983] dark:text-[#F472B6]"
            >
              {codeMatch[1]}
            </code>
          );
        }

        // Bold + Italic: ***text***
        const boldItalicMatch = part.match(/^\*\*\*([^*]+)\*\*\*$/);
        if (boldItalicMatch) {
          return (
            <strong key={index} className="font-semibold italic text-current">
              {boldItalicMatch[1]}
            </strong>
          );
        }

        // Bold: **text** or __text__
        const boldMatch = part.match(/^(?:\*\*([^*]+)\*\*|__([^_]+)__)$/);
        if (boldMatch) {
          return (
            <strong key={index} className="font-semibold text-current">
              <InlineRenderer text={boldMatch[1] || boldMatch[2]} linkClassName={linkClassName} />
            </strong>
          );
        }

        // Italic: *text*
        const italicMatch = part.match(/^\*([^*]+)\*$/);
        if (italicMatch) {
          return (
            <em key={index} className="italic text-current opacity-95">
              <InlineRenderer text={italicMatch[1]} linkClassName={linkClassName} />
            </em>
          );
        }

        // Strikethrough: ~~text~~
        const strikeMatch = part.match(/^~~([^~]+)~~$/);
        if (strikeMatch) {
          return (
            <del key={index} className="line-through text-current opacity-75">
              {strikeMatch[1]}
            </del>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}
