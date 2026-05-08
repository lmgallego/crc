import type { Service } from '@/lib/data/services';
import { cn } from '@/lib/utils';

type Locale = 'es' | 'en';

export function ServiceHero({
  service,
  locale,
  servicesLabel,
}: {
  service: Service;
  locale: Locale;
  servicesLabel: string;
}) {
  const v = service.variant;
  return (
    <section
      className={cn(
        'border-b border-border',
        v === 'accent' && 'bg-accent text-accent-foreground',
        v === 'inverse' && 'bg-foreground text-background',
      )}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-7 py-14 md:py-24">
        <p
          className={cn(
            'font-mono text-[10px] uppercase tracking-[0.15em]',
            v === 'inverse' ? 'text-accent' : 'text-accent-dark',
          )}
        >
          {service.number} — {servicesLabel}
        </p>
        <h1 className="font-serif text-[44px] md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.025em] mt-4">
          {service.name[locale]}
        </h1>
        <p
          className={cn(
            'font-serif italic text-base md:text-xl mt-5 max-w-2xl leading-relaxed',
            v === 'accent' && 'text-accent-foreground/85',
            v === 'inverse' && 'text-background/80',
            v === 'default' && 'text-foreground/75',
          )}
        >
          {service.shortDescription[locale]}
        </p>
        {service.badge ? (
          <div
            className={cn(
              'mt-6 inline-flex font-mono text-[10px] uppercase tracking-[0.15em] border px-2.5 py-1 rounded-full',
              v === 'accent' &&
                'border-foreground/30 text-foreground/80 bg-foreground/5',
              v === 'inverse' &&
                'border-accent/40 text-accent bg-foreground/40',
              v === 'default' && 'border-border text-muted bg-card',
            )}
          >
            {service.badge}
          </div>
        ) : null}
      </div>
    </section>
  );
}
