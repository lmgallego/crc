import { useTranslations } from 'next-intl';
import { Highlight } from '@/components/blocks/shared/highlight';

export function ManifestoQuote() {
  const t = useTranslations('philosophy.quote');

  return (
    <section className="border-t border-border">
      <div className="max-w-4xl mx-auto px-5 md:px-7 py-14 md:py-24 text-center">
        <blockquote className="font-serif italic text-[28px] md:text-[38px] leading-[1.15] tracking-[-0.02em]">
          {t.rich('text', {
            highlight: (chunks) => <Highlight>{chunks}</Highlight>,
          })}
        </blockquote>
        <figcaption className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {t('attribution')}
        </figcaption>
      </div>
    </section>
  );
}
