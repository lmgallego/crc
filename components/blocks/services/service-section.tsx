import * as React from 'react';

export function ServiceSection({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
          <div className="md:sticky md:top-24 md:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark">
              {number} — {eyebrow}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl mt-2 leading-[1.1] tracking-[-0.02em]">
              {title}
            </h2>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
