import { useTranslations } from 'next-intl';

export function ContactHero() {
  const t = useTranslations('contact');
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-20">
        <p className="section-number mb-5">— {t('eyebrow')}</p>
        <h1 className="font-serif text-[48px] md:text-7xl lg:text-[88px] leading-[0.95] tracking-[-0.025em]">
          {t('title')}
        </h1>
        <p className="font-serif italic text-base md:text-xl mt-6 max-w-2xl text-foreground/75 leading-relaxed">
          {t('subtitle')}
        </p>
      </div>
    </section>
  );
}
