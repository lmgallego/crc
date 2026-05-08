import * as React from 'react';
import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';

type Href = ComponentProps<typeof Link>['href'];

export type BreadcrumbItem = {
  label: string;
  href?: Href;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-border-subtle"
    >
      <ol className="max-w-7xl mx-auto px-5 md:px-7 py-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted overflow-x-auto whitespace-nowrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <React.Fragment key={i}>
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-foreground' : ''}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span aria-hidden>/</span> : null}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
