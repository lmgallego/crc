import { useTranslations } from 'next-intl';

export function PublicationsEmpty() {
  const t = useTranslations('publications.empty');
  return (
    <div className="border border-dashed border-border rounded-md p-8 md:p-10 text-center my-8">
      <h3 className="font-serif text-xl md:text-2xl leading-tight">
        {t('title')}
      </h3>
      <p className="text-sm text-foreground/70 mt-2 max-w-md mx-auto leading-relaxed">
        {t('body')}
      </p>
      <a
        href="mailto:info@crc.org"
        className="inline-block mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-dark hover:underline underline-offset-4"
      >
        {t('contactLink')}
      </a>
    </div>
  );
}
