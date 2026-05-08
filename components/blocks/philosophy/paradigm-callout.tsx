import * as React from 'react';
import { cn } from '@/lib/utils';

export function ParadigmCallout({
  variant = 'muted',
  eyebrow,
  children,
}: {
  variant?: 'muted' | 'featured' | 'warning';
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'mt-6 rounded-md p-5 md:p-6',
        variant === 'muted' &&
          'border-l-2 border-muted-light bg-foreground/[0.03]',
        variant === 'featured' &&
          'border border-foreground/15 bg-card shadow-[0_1px_0_rgba(14,14,12,0.04)]',
        variant === 'warning' &&
          'bg-foreground text-background border-l-2 border-accent',
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            'font-mono text-[10px] uppercase tracking-[0.15em] mb-2',
            variant === 'warning' ? 'text-accent' : 'text-accent-dark',
          )}
        >
          {eyebrow}
        </div>
      ) : null}
      <div
        className={cn(
          'text-sm md:text-[15px] leading-relaxed',
          variant === 'muted' && 'text-foreground/85',
          variant === 'featured' && 'text-foreground/90',
          variant === 'warning' && 'text-background/90',
        )}
      >
        {children}
      </div>
    </div>
  );
}
