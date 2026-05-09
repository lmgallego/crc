import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { getPosts, getPost, getAllPostSlugs } from '@/lib/keystatic/reader';
import { Breadcrumb } from '@/components/blocks/shared/breadcrumb';
import { PostHeader } from '@/components/blocks/blog/post-header';
import { PostContent } from '@/components/blocks/blog/post-content';
import { AuthorCard } from '@/components/blocks/blog/author-card';
import { RelatedPosts } from '@/components/blocks/blog/related-posts';
import { PUBLICATIONS } from '@/lib/data/publications';
import { PublicationItem } from '@/components/blocks/publications/publication-item';
import { generatePageMetadata } from '@/lib/seo';

type Locale = 'es' | 'en';

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    const slugs = await getAllPostSlugs(locale as Locale);
    for (const slug of slugs) params.push({ locale, slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc: Locale = locale === 'en' ? 'en' : 'es';
  const post = await getPost(loc, slug);
  if (!post) return {};
  return generatePageMetadata({
    locale: loc,
    pathKey: '/blog/[slug]',
    params: { slug },
    title: `${post.title} — CRC`,
    description: post.excerpt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const loc: Locale = locale === 'en' ? 'en' : 'es';

  const post = await getPost(loc, slug);
  if (!post) notFound();

  const tBlog = await getTranslations({ locale, namespace: 'blog' });

  const all = await getPosts(loc);
  const related = all
    .filter(
      (p) =>
        p.slug !== slug &&
        (p.category === post.category || p.author === post.author),
    )
    .slice(0, 3);

  const relatedPubs = (post.relatedPublications ?? [])
    .map((ref) =>
      PUBLICATIONS.find(
        (p) =>
          (p.doi && (ref.includes(p.doi) || p.doi.includes(ref))) ||
          (p.url && (ref.includes(p.url) || p.url.includes(ref))) ||
          p.id === ref,
      ),
    )
    .filter((p): p is (typeof PUBLICATIONS)[number] => Boolean(p));

  return (
    <>
      <Breadcrumb
        items={[{ label: tBlog('title'), href: '/blog' }, { label: post.title }]}
      />
      <PostHeader
        title={post.title}
        excerpt={post.excerpt}
        publishedAt={post.publishedAt ?? ''}
        category={post.category}
        authorSlug={post.author}
        coverImage={post.coverImage ?? null}
        locale={loc}
      />
      <article className="border-t border-border">
        <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16">
          <PostContent locale={loc} slug={slug} />
        </div>
      </article>
      {relatedPubs.length > 0 ? (
        <section className="border-t border-border">
          <div className="max-w-5xl mx-auto px-5 md:px-7 py-10 md:py-14">
            <p className="data-label mb-5">{tBlog('post.relatedPubs')}</p>
            <ul>
              {relatedPubs.map((p) => (
                <li key={p.id}>
                  <PublicationItem pub={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <AuthorCard authorSlug={post.author} locale={loc} />
      <RelatedPosts posts={related} />
    </>
  );
}
