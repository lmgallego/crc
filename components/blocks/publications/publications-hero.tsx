import { useTranslations } from 'next-intl';
import { PUBLICATIONS, type Publication } from '@/lib/data/publications';
import { PageHero } from '@/components/blocks/shared/page-hero';
import { DataStrip, DataStat } from '@/components/blocks/shared/data-strip';

type Stats = {
  total: number;
  yearsActive: number;
  oldestYear: number;
  q1Count: number;
  topAuthor?: string;
};

export function PublicationsHero({
  publications,
  stats,
}: {
  publications?: Publication[];
  stats?: Stats;
} = {}) {
  const t = useTranslations('publications');
  const tStats = useTranslations('publications.stats');

  const source = publications ?? PUBLICATIONS;
  const total = source.length;
  const q1 = stats?.q1Count ?? source.filter((p) => p.quartile === 'Q1').length;
  const yearCounts = new Map<number, number>();
  for (const p of source) {
    yearCounts.set(p.year, (yearCounts.get(p.year) ?? 0) + 1);
  }
  const mostActiveYear = Array.from(yearCounts.entries()).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];

  const titleText = stats
    ? t('titleDynamic', { total: stats.total, years: stats.yearsActive })
    : t('title');

  return (
    <>
      <PageHero eyebrow={t('eyebrow')} title={titleText} subtitle={t('subtitle')} />
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 md:px-7 py-6 md:py-8">
          <DataStrip>
            <DataStat
              label={tStats('total')}
              value={stats ? `${stats.total}` : '100+'}
            />
            <DataStat label={tStats('indexed')} value={`${total}`} />
            <DataStat label={tStats('q1Papers')} value={`${q1}`} />
            <DataStat
              label={tStats('mostActiveYear')}
              value={mostActiveYear ? String(mostActiveYear) : '—'}
            />
          </DataStrip>
        </div>
      </section>
    </>
  );
}
