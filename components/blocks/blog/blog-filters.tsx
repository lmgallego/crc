'use client';

import { useMemo, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const CATEGORY_KEYS = [
  'physiology',
  'biomechanics',
  'nutrition',
  'training',
  'cycling30',
  'doping',
  'team',
] as const;

const CATEGORY_VALUE: Record<string, string> = {
  physiology: 'physiology',
  biomechanics: 'biomechanics',
  nutrition: 'nutrition',
  training: 'training',
  cycling30: 'cycling-3-0',
  doping: 'doping',
  team: 'team',
};

type CRCAuthor = { slug: string; label: string };

export function BlogFilters({ authors }: { authors: CRCAuthor[] }) {
  const t = useTranslations('blog.filters');
  const tCats = useTranslations('blog.categories');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const current = useMemo(() => {
    return {
      categories: searchParams.get('category')?.split(',').filter(Boolean) ?? [],
      author: searchParams.get('author') ?? '',
    };
  }, [searchParams]);

  const update = (next: typeof current) => {
    const params = new URLSearchParams();
    if (next.categories.length) params.set('category', next.categories.join(','));
    if (next.author) params.set('author', next.author);
    const qs = params.toString();
    startTransition(() => {
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    });
  };

  const toggleCategory = (key: string) => {
    const value = CATEGORY_VALUE[key];
    const next = current.categories.includes(value)
      ? current.categories.filter((c) => c !== value)
      : [...current.categories, value];
    update({ ...current, categories: next });
  };
  const setAuthor = (author: string) => update({ ...current, author });
  const clear = () => update({ categories: [], author: '' });

  const activeCount = current.categories.length + (current.author ? 1 : 0);

  return (
    <section className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORY_KEYS.map((k) => {
            const value = CATEGORY_VALUE[k];
            const active = current.categories.includes(value);
            return (
              <button
                key={k}
                type="button"
                onClick={() => toggleCategory(k)}
                className={cn(
                  'inline-flex items-center min-h-[36px] px-2.5 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] border transition-colors',
                  active
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card border-border text-muted hover:text-foreground',
                )}
              >
                {tCats(k)}
              </button>
            );
          })}
        </div>
        <select
          value={current.author}
          onChange={(e) => setAuthor(e.target.value)}
          className="md:ml-auto h-11 px-3 border border-border rounded-md bg-background text-sm"
        >
          <option value="">{t('anyAuthor')}</option>
          {authors.map((a) => (
            <option key={a.slug} value={a.slug}>
              {a.label}
            </option>
          ))}
        </select>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark hover:underline self-start md:self-auto"
          >
            {t('clear')}
          </button>
        ) : null}
      </div>
    </section>
  );
}
