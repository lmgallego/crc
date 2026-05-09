import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/blocks/shared/page-hero';
import { BlogFilters } from '@/components/blocks/blog/blog-filters';
import { BlogListItem } from '@/components/blocks/blog/blog-list-item';
import { getPosts } from '@/lib/keystatic/reader';
import { TEAM } from '@/lib/data/team';

type Locale = 'es' | 'en';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: `${t('title')} — CRC`, description: t('subtitle') };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const sp = await searchParams;
  const loc: Locale = locale === 'en' ? 'en' : 'es';

  const all = await getPosts(loc);
  const categoryFilter =
    typeof sp.category === 'string'
      ? sp.category.split(',').filter(Boolean)
      : [];
  const authorFilter = typeof sp.author === 'string' ? sp.author : '';

  const filtered = all.filter((p) => {
    if (categoryFilter.length && !categoryFilter.includes(p.category))
      return false;
    if (authorFilter && p.author !== authorFilter) return false;
    return true;
  });

  const authors = TEAM.map((m) => ({
    slug: m.slug,
    label: `${m.name} ${m.surname}`,
  }));

  return (
    <>
      <Hero />
      <BlogFilters authors={authors} />
      <List posts={filtered} totalCount={all.length} />
    </>
  );
}

function Hero() {
  const t = useTranslations('blog');
  return (
    <PageHero eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
  );
}

function List({
  posts,
  totalCount,
}: {
  posts: Awaited<ReturnType<typeof getPosts>>;
  totalCount: number;
}) {
  const t = useTranslations('blog');
  return (
    <section className="border-t border-border">
      <div className="max-w-5xl mx-auto px-5 md:px-7 py-10 md:py-14">
        {posts.length === 0 ? (
          <div className="text-center py-12 md:py-16">
            <p className="font-serif text-xl md:text-2xl text-foreground/70 max-w-md mx-auto">
              {totalCount === 0 ? t('empty') : t('noResults')}
            </p>
          </div>
        ) : (
          <ul>
            {posts.map((p) => (
              <li key={p.slug}>
                <BlogListItem post={p} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
