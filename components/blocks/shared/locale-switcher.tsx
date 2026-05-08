'use client';

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LocaleSwitcher() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale === 'en' ? 'en' : 'es';
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: 'es' | 'en') => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono">
      <button
        type="button"
        onClick={() => switchTo('es')}
        disabled={isPending}
        className={
          locale === 'es'
            ? 'font-bold text-foreground'
            : 'text-muted-light hover:text-foreground transition-colors'
        }
        aria-label="Español"
      >
        ES
      </button>
      <span className="text-muted-light" aria-hidden>
        ·
      </span>
      <button
        type="button"
        onClick={() => switchTo('en')}
        disabled={isPending}
        className={
          locale === 'en'
            ? 'font-bold text-foreground'
            : 'text-muted-light hover:text-foreground transition-colors'
        }
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
