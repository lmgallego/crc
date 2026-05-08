import * as React from 'react';
import { cn } from '@/lib/utils';

export function DataStrip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const items = React.Children.toArray(children);
  const cols = items.length;
  return (
    <div
      className={cn(
        'grid grid-cols-2 border-y border-border',
        cols === 4 && 'md:grid-cols-4',
        cols === 3 && 'md:grid-cols-3',
        cols === 2 && 'md:grid-cols-2',
        className,
      )}
    >
      {items.map((child, i) => (
        <div
          key={i}
          className={cn(
            'py-4 px-4 md:px-5',
            'border-border',
            i % 2 === 0 ? 'border-r md:border-r' : 'md:border-r',
            i < cols - 1 && 'md:border-r',
            (i === cols - 1) && 'md:border-r-0',
            cols >= 2 && i < 2 && cols > 2 && 'border-b md:border-b-0',
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export function DataStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <>
      <div className="data-label mb-1.5">{label}</div>
      <div className="font-serif text-3xl md:text-4xl leading-none">
        {value}
      </div>
    </>
  );
}
