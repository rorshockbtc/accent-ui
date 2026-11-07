import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AccentDoc } from '@/components/AccentDoc';
import { ACCENT_PAGES, ACCENT_SECTIONS, getAccentPage, getAdjacentPages } from '@/content/accent/registry';

type Params = { slug: string[] };

export function generateStaticParams(): Params[] {
  return ACCENT_PAGES.map((p) => ({ slug: p.slug.split('/') }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getAccentPage(slug.join('/'));
  if (!page) return {};
  return { title: page.title, description: page.summary };
}

export default async function AccentPageRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getAccentPage(slug.join('/'));
  if (!page) notFound();
  const { prev, next } = getAdjacentPages(page.slug);
  const sectionLabel = ACCENT_SECTIONS.find((s) => s.id === page.section)?.label ?? '';
  return (
    <AccentDoc
      slug={page.slug}
      title={page.title}
      summary={page.summary}
      sectionLabel={sectionLabel}
      readingMinutes={page.readingMinutes}
      kind={page.kind ?? 'doc'}
      pipes={page.pipes}
      tabs={page.tabs}
      rules={page.rules}
      prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
      next={next ? { slug: next.slug, title: next.title } : undefined}
    />
  );
}
