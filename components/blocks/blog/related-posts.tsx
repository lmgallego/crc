import { useTranslations } from 'next-intl';
import type { PostListItem } from '@/lib/keystatic/reader';
import { BlogListItem } from './blog-list-item';

export function RelatedPosts({ posts }: { posts: PostListItem[] }) {
  const t = useTranslations('blog.post');
  if (posts.length === 0) return null;
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-10 md:py-14">
        <p className="data-label mb-5">{t('relatedPosts')}</p>
        <ul>
          {posts.map((p) => (
            <li key={p.slug}>
              <BlogListItem post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
