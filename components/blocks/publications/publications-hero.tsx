import { useTranslations } from 'next-intl';
import { PUBLICATIONS } from '@/lib/data/publications';
import { PageHero } from '@/components/blocks/shared/page-hero';
import { DataStrip, DataStat } from '@/components/blocks/shared/data-strip';

export function PublicationsHero() {
  const t = useTranslations('publications');
  const tStats = useTranslations('publications.stats');

  const total = PUBLICATIONS.length;
  const q1 = PUBLICATIONS.filter((p) => p.quartile === 'Q1').length;
  const yearCounts = new Map<number, number>();
  for (const p of PUBLICATIONS) {
    yearCounts.set(p.year, (yearCounts.get(p.year) ?? 0) + 1);
  }
  const mostActiveYear = Array.from(yearCounts.entries()).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];

  return (
    <>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 md:px-7 py-6 md:py-8">
          <DataStrip>
            <DataStat label={tStats('total')} value="100+" />
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
