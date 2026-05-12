import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { SERVICES, findService } from '@/lib/data/services';
import type { Service } from '@/lib/data/services';
import { Breadcrumb } from '@/components/blocks/shared/breadcrumb';
import { ServiceHero } from '@/components/blocks/services/service-hero';
import { ServiceSection } from '@/components/blocks/services/service-section';
import { ContactCTA } from '@/components/blocks/home/contact-cta';
import { generatePageMetadata } from '@/lib/seo';

type Locale = 'es' | 'en';

export function generateStaticParams() {
  return SERVICES.flatMap((s) =>
    routing.locales.map((locale) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  const loc: Locale = locale === 'en' ? 'en' : 'es';
  const SERVICE_PATHKEY = {
    coaching: '/servicios/coaching',
    investigacion: '/servicios/investigacion',
    'training-camps': '/servicios/training-camps',
    formacion: '/servicios/formacion',
  } as const;
  return generatePageMetadata({
    locale: loc,
    pathKey: SERVICE_PATHKEY[slug as keyof typeof SERVICE_PATHKEY],
    title: `${service.name[loc]} — CRC`,
    description: service.shortDescription[loc],
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = findService(slug);
  if (!service) notFound();

  const loc: Locale = locale === 'en' ? 'en' : 'es';
  const tHub = await getTranslations('services.hub');

  return (
    <>
      <Breadcrumb
        items={[
          { label: tHub('breadcrumb'), href: '/servicios' },
          { label: service.name[loc] },
        ]}
      />
      <ServiceHero
        service={service}
        locale={loc}
        servicesLabel={tHub('eyebrow')}
      />
      <WhatWeDoSection service={service} locale={loc} />
      <AudienceSection service={service} locale={loc} />
      <SpecificSection service={service} locale={loc} />
      <ContactCTA />
    </>
  );
}

function WhatWeDoSection({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations('services.sections');
  return (
    <ServiceSection number="01" eyebrow={t('whatWeDo')} title={t('whatWeDoTitle')}>
      <div className="space-y-4 max-w-prose">
        {service.longDescription[locale].map((p, i) => (
          <p
            key={i}
            className="font-serif text-base md:text-lg leading-relaxed text-foreground/85"
          >
            {p}
          </p>
        ))}
      </div>
      {service.objectives ? (
        <div className="mt-8 border-t border-border-subtle pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted mb-3">
            {t('objectives')}
          </p>
          <ul className="space-y-2.5 text-sm text-foreground/85">
            {service.objectives[locale].map((o, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-accent-dark font-mono text-xs pt-0.5">
                  ·
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ServiceSection>
  );
}

function AudienceSection({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations('services.sections');
  return (
    <ServiceSection number="02" eyebrow={t('whoFor')} title={t('whoForTitle')}>
      <ul className="border-t border-border-subtle">
        {service.audience[locale].map((a, i) => (
          <li
            key={i}
            className="border-b border-border-subtle py-3.5 font-serif text-base md:text-lg text-foreground/85"
          >
            {a}
          </li>
        ))}
      </ul>
    </ServiceSection>
  );
}

function SpecificSection({ service, locale }: { service: Service; locale: Locale }) {
  if (service.areas) {
    return <AreasSection service={service} locale={locale} />;
  }
  if (service.modalities) {
    return <ModalitiesSection service={service} locale={locale} />;
  }
  if (service.locations || service.included) {
    return <CampsSection service={service} locale={locale} />;
  }
  if (service.programs) {
    return <ProgramsSection service={service} locale={locale} />;
  }
  return null;
}

function AreasSection({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations('services.sections');
  return (
    <ServiceSection number="03" eyebrow={t('areas')} title={t('areasTitle')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {service.areas!.map((a) => (
          <div
            key={a.name.en}
            className="border border-border rounded-md bg-card p-5"
          >
            <h3 className="font-serif text-lg leading-tight">
              {a.name[locale]}
            </h3>
            <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
              {a.description[locale]}
            </p>
          </div>
        ))}
      </div>
    </ServiceSection>
  );
}

function ModalitiesSection({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations('services.sections');
  return (
    <ServiceSection
      number="03"
      eyebrow={t('modalities')}
      title={t('modalitiesTitle')}
    >
      <div className="flex flex-wrap gap-2">
        {service.modalities!.map((m) => (
          <span
            key={m.es}
            className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/80"
          >
            {m[locale]}
          </span>
        ))}
      </div>
    </ServiceSection>
  );
}

function CampsSection({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations('services.sections');
  return (
    <>
      {service.included ? (
        <ServiceSection
          number="03"
          eyebrow={t('included')}
          title={t('includedTitle')}
        >
          <ul className="border-t border-border-subtle">
            {service.included.map((it) => (
              <li
                key={it.item.en}
                className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-4 border-b border-border-subtle"
              >
                <span className="font-serif text-base md:text-lg">
                  {it.item[locale]}
                </span>
                <span className="text-sm text-foreground/75 leading-relaxed">
                  {it.detail[locale]}
                </span>
              </li>
            ))}
          </ul>
        </ServiceSection>
      ) : null}
      {service.locations ? (
        <ServiceSection
          number="04"
          eyebrow={t('locations')}
          title={t('locationsTitle')}
        >
          <div className="space-y-8">
            {service.locations.map((g) => (
              <div key={g.region.en}>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark mb-3">
                  {g.region[locale]}
                </p>
                <ul className="border-t border-border-subtle">
                  {g.places.map((p) => (
                    <li
                      key={p.name}
                      className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1 md:gap-6 py-3.5 border-b border-border-subtle"
                    >
                      <span className="font-serif text-base md:text-lg">
                        {p.name}
                      </span>
                      <span className="text-sm text-foreground/75 leading-relaxed">
                        {p.detail[locale]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ServiceSection>
      ) : null}
    </>
  );
}

function ProgramsSection({ service, locale }: { service: Service; locale: Locale }) {
  const t = useTranslations('services.sections');
  return (
    <ServiceSection
      number="03"
      eyebrow={t('programs')}
      title={t('programsTitle')}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {service.programs!.map((p) => (
          <div
            key={p.name.en}
            className="border border-border rounded-md bg-card p-5"
          >
            <h3 className="font-serif text-lg leading-tight">
              {p.name[locale]}
            </h3>
            <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
              {p.description[locale]}
            </p>
          </div>
        ))}
      </div>
    </ServiceSection>
  );
}
