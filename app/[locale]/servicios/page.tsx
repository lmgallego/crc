import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale } from 'next-intl';
import { PageHero } from '@/components/blocks/shared/page-hero';
import { ServiceCard } from '@/components/blocks/services/service-card';
import { ContactCTA } from '@/components/blocks/home/contact-cta';
import { SERVICES } from '@/lib/data/services';

type Locale = 'es' | 'en';

export default async function ServicesHubPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Grid />
      <ContactCTA />
    </>
  );
}

function Hero() {
  const t = useTranslations('services.hub');
  return (
    <PageHero
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
    />
  );
}

function Grid() {
  const locale: Locale = useLocale() === 'en' ? 'en' : 'es';
  const investigacion = SERVICES.find((s) => s.slug === 'investigacion')!;
  const coaching = SERVICES.find((s) => s.slug === 'coaching')!;
  const camps = SERVICES.find((s) => s.slug === 'training-camps')!;
  const formacion = SERVICES.find((s) => s.slug === 'formacion')!;

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="md:col-span-2">
          <ServiceCard service={investigacion} locale={locale} size="large" />
        </div>
        <ServiceCard service={coaching} locale={locale} />
        <ServiceCard service={camps} locale={locale} />
        <div className="md:col-span-2">
          <ServiceCard service={formacion} locale={locale} size="large" />
        </div>
      </div>
    </section>
  );
}
