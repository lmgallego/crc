import * as React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import Markdoc from '@markdoc/markdoc';
import { blogMarkdocComponents } from './markdoc-components';

type Locale = 'es' | 'en';

export function PostContent({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const filePath = path.join(
    process.cwd(),
    'content',
    'posts',
    locale,
    `${slug}.mdoc`,
  );
  const raw = fs.readFileSync(filePath, 'utf-8');
  const body = raw.replace(/^---[\s\S]*?---\s*/, '');
  const ast = Markdoc.parse(body);
  const transformed = Markdoc.transform(ast, {});
  const rendered = Markdoc.renderers.react(transformed, React, {
    components: blogMarkdocComponents,
  });

  return (
    <div className="post-prose font-serif text-base md:text-lg leading-relaxed text-foreground/85 max-w-prose mx-auto [&_p]:mb-5 [&_p:first-of-type]:drop-cap [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-[-0.02em] [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-1.5 [&_a]:text-accent-dark [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-semibold [&_em]:italic">
      {rendered}
    </div>
  );
}
