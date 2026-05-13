import { useTranslations } from 'next-intl';
import { Highlight } from '@/components/blocks/shared/highlight';
import { AnchorNav } from '@/components/blocks/shared/anchor-nav';

export function PageHeroManifesto() {
  const t = useTranslations('philosophy.hero');

  return (
    <section className="border-b border-border">
      <div className="max-w-[820px] mx-auto px-5 md:px-7 py-14 md:py-24 text-center">
        <p className="section-number mb-5">— {t('eyebrow')}</p>
        <h1 className="font-serif text-[48px] md:text-7xl lg:text-[76px] leading-[1.05] tracking-[-0.025em]">
          {t.rich('title', {
            highlight: (chunks) => (
              <>
                <br />
                <Highlight>{chunks}</Highlight>
              </>
            ),
          })}
        </h1>
        <p className="font-serif italic text-base md:text-xl text-foreground/75 mt-6 leading-relaxed">
          {t('subtitle')}
        </p>
        <AnchorNav
          items={[
            { href: '#p1', label: '1.0' },
            { href: '#p2', label: '2.0' },
            { href: '#p3', label: '3.0' },
            { href: '#principles', label: t('anchorPrinciples') },
          ]}
        />
      </div>
    </section>
  );
}
