import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useLocale } from 'next-intl';
import {
  PUBLICATIONS,
  filterPublications,
  groupPublicationsByYear,
  type PublicationTopic,
} from '@/lib/data/publications';
import { TEAM } from '@/lib/data/team';
import { PublicationsHero } from '@/components/blocks/publications/publications-hero';
import { PublicationsFilters } from '@/components/blocks/publications/publications-filters';
import { PublicationItem } from '@/components/blocks/publications/publication-item';
import { PublicationsEmpty } from '@/components/blocks/publications/publications-empty';
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

  const filters = {
    year: sp.year ? Number(sp.year) : undefined,
    topics: typeof sp.topic === 'string'
      ? (sp.topic.split(',').filter(Boolean) as PublicationTopic[])
      : [],
    authors: typeof sp.author === 'string' ? sp.author.split(',').filter(Boolean) : [],
    q: typeof sp.q === 'string' ? sp.q : undefined,
  };

  const filtered = filterPublications(PUBLICATIONS, filters);
  const grouped = groupPublicationsByYear(filtered);
  const years = Array.from(new Set(PUBLICATIONS.map((p) => p.year))).sort(
    (a, b) => b - a,
  );
  const authors = TEAM.map((m) => ({
    slug: m.slug,
    label: `${m.name} ${m.surname}`,
  }));

  return (
    <>
      <PublicationsHero />
      <PublicationsFilters years={years} authors={authors} />
      <PublicationsList grouped={grouped} />
    </>
  );
}

function PublicationsList({
  grouped,
}: {
  grouped: [number, typeof PUBLICATIONS][];
}) {
  const _locale = useLocale() as Locale;
  if (grouped.length === 0) {
    return (
      <section className="border-t border-border">
        <div className="max-w-5xl mx-auto px-5 md:px-7 py-12">
          <PublicationsEmpty />
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
