import fs from 'node:fs';
import path from 'node:path';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale } from 'next-intl';
import {
  PUBLICATIONS as SEED_PUBLICATIONS,
  filterPublications,
  groupPublicationsByYear,
  type Publication,
  type PublicationTopic,
} from '@/lib/data/publications';
import {
  getMergedPublications,
  getPublicationStats,
} from '@/lib/data/publications-merged';
import { FEATURES } from '@/lib/config/features';
import { TEAM } from '@/lib/data/team';
import { PublicationsHero } from '@/components/blocks/publications/publications-hero';
import { PublicationsFilters } from '@/components/blocks/publications/publications-filters';
import { PublicationItem } from '@/components/blocks/publications/publication-item';
import { PublicationsEmpty } from '@/components/blocks/publications/publications-empty';
import { NoResults } from '@/components/blocks/publications/no-results';
import { generatePageMetadata, type Locale as SEOLocale } from '@/lib/seo';

type Locale = 'es' | 'en';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'publications' });
  const loc: SEOLocale = locale === 'en' ? 'en' : 'es';
  return generatePageMetadata({
    locale: loc,
    pathKey: '/publicaciones',
    title: `${t('title')} — CRC`,
    description: t('subtitle'),
  });
}

function getCacheLastUpdate(): Date | null {
  try {
    const p = path.join(process.cwd(), 'lib/data/orcid-cache.json');
    return fs.statSync(p).mtime;
  } catch {
    return null;
  }
}

export default async function PublicationsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;

  const publications: Publication[] = FEATURES.orcidPublications
    ? getMergedPublications()
    : SEED_PUBLICATIONS;
  const stats = FEATURES.orcidPublications
    ? getPublicationStats(publications)
    : undefined;
  const lastUpdate = FEATURES.orcidPublications ? getCacheLastUpdate() : null;

  const filters = {
    year: sp.year ? Number(sp.year) : undefined,
    topics:
      typeof sp.topic === 'string'
        ? (sp.topic.split(',').filter(Boolean) as PublicationTopic[])
        : [],
    authors:
      typeof sp.author === 'string' ? sp.author.split(',').filter(Boolean) : [],
    q: typeof sp.q === 'string' ? sp.q : undefined,
  };

  const filtered = filterPublications(publications, filters);
  const grouped = groupPublicationsByYear(filtered);
  const years = Array.from(new Set(publications.map((p) => p.year))).sort(
    (a, b) => b - a,
  );
  const authorCounts = new Map<string, number>();
  for (const p of publications) {
    for (const slug of p.crcAuthors) {
      authorCounts.set(slug, (authorCounts.get(slug) ?? 0) + 1);
    }
  }
  const authors = TEAM.map((m) => ({
    slug: m.slug,
    label: `${m.name} ${m.surname}`,
    count: authorCounts.get(m.slug) ?? 0,
  }));

  return (
    <>
      <PublicationsHero publications={publications} stats={stats} />
      <PublicationsFilters
        years={years}
        authors={authors}
        pubs={publications.map((p) => ({
          topics: p.topics,
          crcAuthors: p.crcAuthors,
          year: p.year,
        }))}
      />
      <PublicationsList grouped={grouped} />
      {lastUpdate ? <SyncFooter date={lastUpdate} locale={locale} /> : null}
    </>
  );
}

function PublicationsList({
  grouped,
}: {
  grouped: [number, Publication[]][];
}) {
  const _locale = useLocale() as Locale;
  if (grouped.length === 0) {
    return (
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-5 md:px-7 py-12">
          <NoResults />
        </div>
      </section>
    );
  }

  const totalCount = grouped.reduce((acc, [, pubs]) => acc + pubs.length, 0);

  return (
    <section className="border-t border-border">
      <div className="max-w-5xl mx-auto px-5 md:px-7 py-12 md:py-16">
        {grouped.map(([year, pubs]) => (
          <div key={year} className="mb-10 last:mb-0">
            <header className="data-label mb-4 flex items-center gap-3 before:content-[''] before:h-px before:w-6 before:bg-border after:content-[''] after:flex-1 after:h-px after:bg-border">
              {year}
            </header>
            <ul className="space-y-0">
              {pubs.map((p) => (
                <li key={p.id}>
                  <PublicationItem pub={p} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        {totalCount < 3 ? <PublicationsEmpty /> : null}
      </div>
    </section>
  );
}

async function SyncFooter({
  date,
  locale,
}: {
  date: Date;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: 'publications' });
  const formatted = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
  return (
    <section className="border-t border-border">
      <div className="max-w-5xl mx-auto px-5 md:px-7 py-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          {t('syncedFromOrcid', { date: formatted })}
        </p>
      </div>
    </section>
  );
}
