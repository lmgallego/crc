import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'muted' | 'default' | 'accent';

export function ParadigmSection({
  id,
  variant,
  number,
  eyebrow,
  subtitle,
  aside,
  children,
}: {
  id: string;
  variant: Variant;
  number: string;
  eyebrow: string;
  subtitle: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        'border-t border-border py-14 md:py-20 scroll-mt-20',
        variant === 'muted' && 'bg-foreground/[0.025]',
        variant === 'default' && 'bg-background',
        variant === 'accent' && 'bg-accent text-accent-foreground',
      )}
    >
      <div className="max-w-5xl mx-auto px-5 md:px-7 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
        <div className="md:sticky md:top-24 md:self-start">
          <div
            className={cn(
              'font-mono text-[10px] uppercase tracking-[0.15em]',
              variant === 'accent' ? 'text-accent-foreground/70' : 'text-accent-dark',
            )}
          >
            {eyebrow}
          </div>
          <div
            className={cn(
              'font-serif text-[80px] md:text-[110px] leading-[0.85] tracking-[-0.04em] mt-2',
              variant === 'muted' && 'text-muted-light',
              variant === 'default' && 'text-foreground',
              variant === 'accent' && 'text-accent-foreground',
            )}
          >
            {number}
          </div>
          <div
            className={cn(
              'font-mono text-[10px] uppercase tracking-[0.15em] mt-2',
              variant === 'accent' ? 'text-accent-foreground/70' : 'text-muted',
            )}
          >
            {subtitle}
          </div>
          {aside ? <div className="mt-6">{aside}</div> : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
