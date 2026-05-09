import * as React from 'react';
import Image from 'next/image';
import { Highlight } from '@/components/blocks/shared/highlight';

export function MarkdocImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover rounded-md"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-10 font-serif italic text-2xl md:text-3xl leading-[1.2] tracking-[-0.02em] text-center max-w-2xl mx-auto">
      {children}
    </blockquote>
  );
}

export const blogMarkdocComponents = {
  Image: MarkdocImage,
  PullQuote,
  Highlight,
};
