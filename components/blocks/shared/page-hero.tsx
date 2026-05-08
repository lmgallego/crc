import * as React from 'react';
import { Highlight } from './highlight';

export function PageHero({
  eyebrow,
  title,
  subtitle,
  highlightWord,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  highlightWord?: string;
}) {
  const titleEl = highlightWord && title.includes(highlightWord) ? (
    splitWithHighlight(title, highlightWord)
  ) : (
    title
  );

  return (
    <section className="border-b border-border">
      <div className="max-w-5xl mx-auto px-5 md:px-7 py-14 md:py-24">
        <p className="section-number mb-5">— {eyebrow}</p>
        <h1 className="font-serif text-[44px] md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.025em]">
          {titleEl}
        </h1>
        {subtitle ? (
          <p className="font-serif italic text-base md:text-xl text-foreground/75 mt-5 md:mt-6 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function splitWithHighlight(title: string, word: string): React.ReactNode {
  const idx = title.indexOf(word);
  return (
    <>
      {title.slice(0, idx)}
      <Highlight>{word}</Highlight>
      {title.slice(idx + word.length)}
    </>
  );
}
