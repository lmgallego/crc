import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function PublicationsLink() {
  const t = useTranslations('home.publications');

  return (
    <section className="border-t border-border bg-foreground/[0.025]">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 md:items-center max-w-5xl mx-auto">
          <div>
            <p className="section-number mb-2">04 — {t('eyebrow')}</p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.05] tracking-[-0.025em]">
              {t.rich('title', {
                strong: (chunks) => (
                  <strong className="font-normal">{chunks}</strong>
                ),
              })}
            </h2>
            <p className="mt-3 text-sm text-foreground/70 leading-relaxed max-w-xl">
              {t('body')}
            </p>
          </div>
          <Button asChild className="self-start md:self-auto">
            <Link href="/publicaciones">{t('cta')} →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
