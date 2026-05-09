import { useTranslations } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { SectionHeader } from '@/components/blocks/shared/section-header';
import { BlogListItem } from '@/components/blocks/blog/blog-list-item';
import { getPosts } from '@/lib/keystatic/reader';

type Locale = 'es' | 'en';

export async function BlogLatest() {
  const locale = await getLocale();
  const loc: Locale = locale === 'en' ? 'en' : 'es';
  const posts = (await getPosts(loc)).slice(0, 3);
  return <BlogLatestView posts={posts} />;
}

function BlogLatestView({
  posts,
}: {
  posts: Awaited<ReturnType<typeof getPosts>>;
}) {
  const t = useTranslations('home.blog');
  const tEmpty = useTranslations('blog');

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-14 md:py-20">
        <SectionHeader
          number="05"
          eyebrow={t('eyebrow')}
          title={t('title')}
          cta={t('cta')}
          ctaHref="/blog"
        />

        {posts.length === 0 ? (
          <p className="font-serif italic text-lg text-foreground/70 max-w-md">
            {tEmpty('empty')}
          </p>
        ) : (
          <ul className="border-t border-border">
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
