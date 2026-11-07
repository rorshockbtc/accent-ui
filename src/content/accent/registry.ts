import type { AccentPage, AccentSectionId, AgentRule } from './types';

import { page as startIntroduction } from './pages/start-introduction';
import { page as startPoster } from './pages/start-poster';

import { page as essayPunctuation } from './pages/essay-punctuation';
import { page as essayShadcn } from './pages/essay-shadcn';
import { page as essayReliefFocus } from './pages/essay-relief-focus';
import { page as essayMixingType } from './pages/essay-mixing-type';
import { page as essayStepwise } from './pages/essay-stepwise';

import { page as foundationsGrid } from './pages/foundations-grid';
import { page as foundationsTypography } from './pages/foundations-typography';
import { page as foundationsColor } from './pages/foundations-color';
import { page as foundationsIconography } from './pages/foundations-iconography';
import { page as foundationsImagery } from './pages/foundations-imagery';
import { page as foundationsShape } from './pages/foundations-shape';
import { page as foundationsLayout } from './pages/foundations-layout';
import { page as foundationsTouch } from './pages/foundations-touch';
import { page as foundationsMotion } from './pages/foundations-motion';

import { page as componentButton } from './pages/component-button';
import { page as componentBadge } from './pages/component-badge';
import { page as componentInput } from './pages/component-input';
import { page as componentCard } from './pages/component-card';
import { page as componentHero } from './pages/component-hero';
import { page as componentNavigation } from './pages/component-navigation';
import { page as componentChart } from './pages/component-chart';

import { page as patternArticle } from './pages/pattern-article';
import { page as patternPortfolio } from './pages/pattern-portfolio';
import { page as patternMobile } from './pages/pattern-mobile';
import { page as patternStates } from './pages/pattern-states';
import { page as patternBang } from './pages/pattern-bang';

import { page as aiRules } from './pages/ai-rules';
import { page as startGlossary } from './pages/start-glossary';
import { page as foundationsElevation } from './pages/foundations-elevation';
import { page as foundationsDarkTheme } from './pages/foundations-dark-theme';
import { page as foundationsWriting } from './pages/foundations-writing';
import { page as foundationsBrand } from './pages/foundations-brand';
import { page as componentSelect } from './pages/component-select';
import { page as componentSelectionControls } from './pages/component-selection-controls';
import { page as componentTabs } from './pages/component-tabs';
import { page as componentDialog } from './pages/component-dialog';
import { page as componentToast } from './pages/component-toast';
import { page as componentAvatar } from './pages/component-avatar';
import { page as componentPagination } from './pages/component-pagination';
import { page as componentAudioDispatch } from './pages/component-audio-dispatch';
import { page as componentTooltip } from './pages/component-tooltip';

export const ACCENT_SECTIONS: { id: AccentSectionId; label: string }[] = [
  { id: 'start', label: 'Start here' },
  { id: 'essays', label: 'Why Accént' },
  { id: 'foundations', label: 'Foundations' },
  { id: 'components', label: 'Components' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'ai', label: 'Building with AI' },
];

/** Ordered list; order drives sidebar and prev/next pagination. */
export const ACCENT_PAGES: AccentPage[] = [
  startIntroduction,
  startPoster,
  startGlossary,
  essayPunctuation,
  essayShadcn,
  essayReliefFocus,
  essayMixingType,
  essayStepwise,
  foundationsGrid,
  foundationsTypography,
  foundationsColor,
  foundationsIconography,
  foundationsImagery,
  foundationsShape,
  foundationsElevation,
  foundationsDarkTheme,
  foundationsWriting,
  foundationsBrand,
  foundationsLayout,
  foundationsTouch,
  foundationsMotion,
  componentButton,
  componentBadge,
  componentInput,
  componentSelect,
  componentSelectionControls,
  componentTabs,
  componentCard,
  componentDialog,
  componentToast,
  componentAvatar,
  componentPagination,
  componentTooltip,
  componentHero,
  componentNavigation,
  componentAudioDispatch,
  componentChart,
  patternArticle,
  patternPortfolio,
  patternMobile,
  patternStates,
  patternBang,
  aiRules,
];

export function getAccentPage(slug: string): AccentPage | undefined {
  return ACCENT_PAGES.find((p) => p.slug === slug);
}

export function getAdjacentPages(slug: string): { prev?: AccentPage; next?: AccentPage } {
  const i = ACCENT_PAGES.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  return { prev: ACCENT_PAGES[i - 1], next: ACCENT_PAGES[i + 1] };
}

export type AccentNavItem = { slug: string; title: string; section: AccentSectionId };

/** Serializable nav (safe to pass to client components). */
export function getAccentNav(): { id: AccentSectionId; label: string; items: AccentNavItem[] }[] {
  return ACCENT_SECTIONS.map((s) => ({
    ...s,
    items: ACCENT_PAGES.filter((p) => p.section === s.id).map((p) => ({
      slug: p.slug,
      title: p.title.split(':')[0].trim(),
      section: p.section,
    })),
  }));
}

export function getAllAccentRules(): (AgentRule & { page: string })[] {
  return ACCENT_PAGES.flatMap((p) => p.rules.map((r) => ({ ...r, page: p.slug })));
}
