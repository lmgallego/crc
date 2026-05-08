'use client';

import { useState, useTransition, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ALL_TOPICS, type PublicationTopic } from '@/lib/data/publications';
import { cn } from '@/lib/utils';

type CRCAuthor = { slug: string; label: string };

export function PublicationsFilters({
  years,
  authors,
}: {
  years: number[];
  authors: CRCAuthor[];
}) {
  const t = useTranslations('publications.filters');
  const tTopics = useTranslations('publications.topics');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const current = useMemo(() => {
    return {
      year: searchParams.get('year') ?? '',
      topics: (searchParams.get('topic')?.split(',').filter(Boolean) ??
        []) as PublicationTopic[],
      authors: searchParams.get('author')?.split(',').filter(Boolean) ?? [],
      q: searchParams.get('q') ?? '',
    };
  }, [searchParams]);

  const activeCount =
    (current.year ? 1 : 0) +
    current.topics.length +
    current.authors.length +
    (current.q ? 1 : 0);

  const update = (next: typeof current) => {
    const params = new URLSearchParams();
    if (next.year) params.set('year', next.year);
    if (next.topics.length) params.set('topic', next.topics.join(','));
    if (next.authors.length) params.set('author', next.authors.join(','));
    if (next.q) params.set('q', next.q);
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  };

  const setYear = (year: string) => update({ ...current, year });
  const toggleTopic = (topic: PublicationTopic) => {
    const next = current.topics.includes(topic)
      ? current.topics.filter((x) => x !== topic)
      : [...current.topics, topic];
    update({ ...current, topics: next });
  };
  const toggleAuthor = (slug: string) => {
    const next = current.authors.includes(slug)
      ? current.authors.filter((x) => x !== slug)
      : [...current.authors, slug];
    update({ ...current, authors: next });
  };
  const setQ = (q: string) => update({ ...current, q });
  const clear = () => update({ year: '', topics: [], authors: [], q: '' });

  const Controls = (
    <div className="space-y-6">
      <div>
        <label className="data-label block mb-2">{t('search')}</label>
        <input
          type="search"
          value={current.q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full h-11 px-3 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </div>

      <div>
        <label className="data-label block mb-2">{t('year')}</label>
        <select
          value={current.year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full h-11 px-3 border border-border rounded-md bg-background text-sm"
        >
          <option value="">{t('anyYear')}</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="data-label block mb-2">{t('topic')}</label>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TOPICS.map((topic) => {
            const active = current.topics.includes(topic);
            return (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopic(topic)}
                className={cn(
                  'inline-flex items-center min-h-[36px] px-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] border transition-colors',
                  active
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card border-border text-muted hover:text-foreground',
                )}
              >
                {tTopics(topic)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="data-label block mb-2">{t('author')}</label>
        <div className="flex flex-wrap gap-1.5">
          {authors.map((a) => {
            const active = current.authors.includes(a.slug);
            return (
              <button
                key={a.slug}
                type="button"
                onClick={() => toggleAuthor(a.slug)}
                className={cn(
                  'inline-flex items-center min-h-[36px] px-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] border transition-colors',
                  active
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card border-border text-muted hover:text-foreground',
                )}
              >
                {a.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeCount > 0 ? (
        <Button variant="outline" size="sm" onClick={clear}>
          <X className="size-3" />
          {t('clear')}
        </Button>
      ) : null}
    </div>
  );

  return (
    <section className="border-b border-border bg-background sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-3 md:py-4">
        {/* Mobile: trigger that opens Sheet */}
        <div className="md:hidden flex items-center justify-between">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="size-3.5" />
                {t('openFilters')}
                {activeCount > 0 ? (
                  <span className="ml-1 inline-flex items-center justify-center rounded-full bg-foreground text-background w-4 h-4 text-[10px]">
                    {activeCount}
                  </span>
                ) : null}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto">
              <SheetTitle>{t('filtersTitle')}</SheetTitle>
              <SheetDescription className="sr-only">
                {t('filtersDescription')}
              </SheetDescription>
              <div className="mt-6">{Controls}</div>
            </SheetContent>
          </Sheet>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={clear}
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark hover:underline"
            >
              {t('clear')}
            </button>
          ) : null}
        </div>

        {/* Desktop: inline controls */}
        <div className="hidden md:block">{Controls}</div>
      </div>
    </section>
  );
}
