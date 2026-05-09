import Image from 'next/image';
import { useTranslations } from 'next-intl';
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

export function PostHeader({
  title,
  excerpt,
  publishedAt,
  category,
  authorSlug,
  coverImage,
  locale,
}: {
  title: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  authorSlug: string;
  coverImage: string | null;
  locale: string;
}) {
  const tCats = useTranslations('blog.categories');
  const tPost = useTranslations('blog.post');
  const author = findMember(authorSlug);
  const dateLabel = new Date(publishedAt)
    .toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .toUpperCase();
  const categoryLabel = tCats(CATEGORY_KEY[category] ?? 'training');

  return (
    <header className="border-b border-border">
      <div className="max-w-3xl mx-auto px-5 md:px-7 py-12 md:py-20">
        <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark mb-5">
          {categoryLabel} · {dateLabel}
          {author ? ` · ${tPost('by')} ${author.name} ${author.surname}` : ''}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.025em]">
          {title}
        </h1>
        {excerpt ? (
          <p className="font-serif italic text-base md:text-xl text-foreground/75 mt-5 leading-relaxed">
            {excerpt}
          </p>
        ) : null}
      </div>
      {coverImage ? (
        <div className="max-w-5xl mx-auto px-5 md:px-7 pb-8">
          <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden">
            <Image src={coverImage} alt={title} fill className="object-cover" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
