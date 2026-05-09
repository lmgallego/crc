import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { PostListItem } from '@/lib/keystatic/reader';
import { findMember } from '@/lib/data/team';

const CATEGORY_KEY: Record<string, string> = {
  physiology: 'physiology',
  biomechanics: 'biomechanics',
  nutrition: 'nutrition',
  training: 'training',
  'cycling-3-0': 'cycling30',
  doping: 'doping',
  team: 'team',
};

function formatDate(date: string, locale: string) {
  const d = new Date(date);
  return d.toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).toUpperCase();
}

export function BlogListItem({ post }: { post: PostListItem }) {
  const tCats = useTranslations('blog.categories');
  const locale = useLocale();
  const year = new Date(post.publishedAt).getFullYear();
  const author = findMember(post.author);
  const dateLabel = formatDate(post.publishedAt, locale);
  const categoryLabel = tCats(CATEGORY_KEY[post.category] ?? 'training');

  return (
    <Link
      href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
      className="group block border-b border-border-subtle py-5 md:py-6 hover:bg-accent/5 -mx-3 px-3 md:-mx-4 md:px-4 rounded-sm transition-colors"
    >
      <div className="md:hidden">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          <span>{categoryLabel}</span>
          <span>{dateLabel}</span>
        </div>
        <h3 className="font-serif text-xl leading-[1.2] tracking-[-0.02em] mt-2 group-hover:underline underline-offset-4 decoration-accent">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="text-sm text-foreground/70 mt-2 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark">
          {year}
          {author ? ` · ${author.name} ${author.surname}` : ''}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-[60px_1fr_140px_90px] md:gap-6 md:items-baseline">
        <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-dark">
          {year}
        </span>
        <div>
          <h3 className="font-serif text-2xl lg:text-[28px] leading-[1.15] tracking-[-0.02em] group-hover:underline underline-offset-4 decoration-accent">
            {post.title}
          </h3>
          {post.excerpt ? (
            <p className="text-sm text-foreground/70 mt-1.5 leading-relaxed line-clamp-1">
              {post.excerpt}
            </p>
          ) : null}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
          {categoryLabel}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted text-right">
          {dateLabel}
        </span>
      </div>
    </Link>
  );
}
