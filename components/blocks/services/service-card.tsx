import type { Service } from '@/lib/data/services';
import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Locale = 'es' | 'en';
type Href = ComponentProps<typeof Link>['href'];

const HUB_HREF: Record<Service['slug'], Href> = {
  investigacion: '/servicios/investigacion',
  coaching: '/servicios/coaching',
  'training-camps': '/servicios/training-camps',
  formacion: '/servicios/formacion',
};

export function ServiceCard({
  service,
  locale,
  size = 'default',
}: {
  service: Service;
  locale: Locale;
  size?: 'default' | 'large';
}) {
  const v = service.variant;
  const isLarge = size === 'large';

  return (
    <Link
      href={HUB_HREF[service.slug]}
      className={cn(
        'group rounded-md p-6 md:p-8 flex flex-col justify-between relative overflow-hidden',
        isLarge ? 'min-h-[320px] md:min-h-[400px]' : 'min-h-[280px]',
        v === 'accent' && 'bg-accent text-accent-foreground',
        v === 'inverse' && 'bg-foreground text-background',
        v === 'default' &&
          'bg-card border border-border text-foreground hover:border-foreground/30 transition-colors',
      )}
    >
      {(v === 'accent' || v === 'inverse') && (
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          aria-hidden
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id={`grid-${service.slug}`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke={v === 'inverse' ? '#E8D24A' : '#0E0E0C'}
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${service.slug})`} />
          </svg>
        </div>
      )}

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            'font-mono text-[10px] uppercase tracking-[0.15em]',
            v === 'inverse' && 'text-accent',
          )}
        >
          /{service.number} — {service.name[locale]}
        </span>
        {service.badge ? (
          <Badge
            className={cn(
              'border-transparent',
              v === 'accent' && 'bg-foreground/90 text-background',
              v === 'inverse' && 'bg-accent text-accent-foreground',
              v === 'default' && 'bg-foreground/5 text-foreground',
            )}
          >
            {service.badge}
          </Badge>
        ) : null}
      </div>

      <div className="relative">
        <h3
          className={cn(
            'font-serif leading-[0.98] tracking-[-0.025em] mt-8 md:mt-10',
            isLarge
              ? 'text-3xl md:text-4xl lg:text-5xl'
              : 'text-2xl md:text-3xl',
          )}
        >
          {service.name[locale]}
        </h3>
        <p
          className={cn(
            'text-sm md:text-[15px] leading-relaxed mt-3 max-w-md',
            v === 'accent' && 'text-accent-foreground/85',
            v === 'inverse' && 'text-background/80',
            v === 'default' && 'text-foreground/70',
          )}
        >
          {service.shortDescription[locale]}
        </p>
        <div
          className={cn(
            'flex items-center gap-1.5 mt-5 font-mono text-[11px] uppercase tracking-[0.15em]',
            v === 'inverse' && 'text-accent',
            v !== 'inverse' && 'group-hover:underline underline-offset-4',
          )}
        >
          {service.cta[locale]}
          <ArrowUpRight className="size-3.5" />
        </div>
      </div>
    </Link>
  );
}
