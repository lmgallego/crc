import { useTranslations } from 'next-intl';
import type { Publication } from '@/lib/data/publications';
import { PageHero } from '@/components/blocks/shared/page-hero';

type Stats = {
  total: number;
  yearsActive: number;
  oldestYear: number;
  q1Count: number;
  topAuthor?: string;
};

export function PublicationsHero({
  publications: _publications,
  stats,
}: {
  publications?: Publication[];
  stats?: Stats;
} = {}) {
  const t = useTranslations('publications');

  const titleText = stats
    ? t('titleDynamic', { total: stats.total, years: stats.yearsActive })
    : t('title');

  // Stats strip removed in refactor/publications-filters-desktop —
  // restore <DataStrip> with PUBLICATIONS / INDEXED / Q1 / MOST ACTIVE YEAR if needed.
  return (
    <PageHero eyebrow={t('eyebrow')} title={titleText} subtitle={t('subtitle')} />
  );
}
