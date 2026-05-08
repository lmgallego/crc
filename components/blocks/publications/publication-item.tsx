import { useTranslations } from 'next-intl';
import type { Publication, PublicationTopic } from '@/lib/data/publications';
import { cn } from '@/lib/utils';
import { Star, ArrowUpRight } from 'lucide-react';

export function PublicationItem({ pub }: { pub: Publication }) {
  const tTopics = useTranslations('publications.topics');
  const tCommon = useTranslations('publications');
  const href = pub.doi
    ? pub.doi.startsWith('http')
      ? pub.doi
      : `https://doi.org/${pub.doi}`
    : pub.url;

  return (
    <a
      href={href ?? '#'}
      target="_blank"
      rel="noopener"
      className={cn(
        'group block border-b border-border-subtle py-5 md:py-6 transition-colors',
        pub.isFeatured ? 'bg-accent/10 hover:bg-accent/15' : 'hover:bg-accent/5',
        'px-3 -mx-3 md:px-4 md:-mx-4 rounded-sm',
      )}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
        {pub.isFeatured ? (
          <span
            className="inline-flex items-center gap-1 text-accent-dark"
            aria-label={tCommon('featuredLabel')}
          >
            <Star className="size-3 fill-current" />
            {tCommon('featuredLabel')}
          </span>
        ) : null}
        <span className="text-foreground">{pub.year}</span>
        <span aria-hidden>·</span>
        <span className="truncate">{pub.journal}</span>
        {pub.quartile ? (
          <>
            <span aria-hidden>·</span>
            <span className="text-accent-dark">{pub.quartile}</span>
          </>
        ) : null}
        {pub.impactFactor ? (
          <>
            <span aria-hidden>·</span>
            <span>IF {pub.impactFactor}</span>
          </>
        ) : null}
        {typeof pub.citations === 'number' ? (
          <>
            <span aria-hidden>·</span>
            <span>{pub.citations} cites</span>
          </>
        ) : null}
      </div>

      <h3 className="font-serif text-lg md:text-2xl leading-[1.2] tracking-[-0.02em] mt-2 group-hover:underline underline-offset-4 decoration-accent">
        {pub.title}
      </h3>

      <p className="text-xs md:text-sm text-foreground/70 mt-1.5">
        {pub.authors.join(', ')}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <div className="flex flex-wrap gap-1.5">
          {pub.topics.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-border bg-card px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted"
            >
              {tTopics(t as PublicationTopic)}
            </span>
          ))}
        </div>
        {href ? (
          <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark group-hover:text-foreground">
            {tCommon('viewAtPublisher')}
            <ArrowUpRight className="size-3" />
          </span>
        ) : null}
      </div>
    </a>
  );
}
