'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function NoResults() {
  const t = useTranslations('publications');
  const tFilters = useTranslations('publications.filters');
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const clearAll = () => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  return (
    <div className="border border-dashed border-border rounded-md p-8 md:p-10 text-center my-8">
      <p className="font-serif text-xl md:text-2xl leading-tight">
        {t('noResults')}
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted mt-3">
        {t('noResultsHint')}
      </p>
      <div className="mt-5">
        <Button variant="outline" size="sm" onClick={clearAll}>
          <X className="size-3" />
          {tFilters('clear')}
        </Button>
      </div>
    </div>
  );
}
