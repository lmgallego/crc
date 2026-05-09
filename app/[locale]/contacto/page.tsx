import { Suspense } from 'react';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { ContactHero } from '@/components/blocks/contact/contact-hero';
import { ContactForm } from '@/components/blocks/contact/contact-form';
import { ContactSidebar } from '@/components/blocks/contact/contact-sidebar';
import { ContactTypesGrid } from '@/components/blocks/contact/contact-types-grid';
import { ContactFaq } from '@/components/blocks/contact/contact-faq';
import { generatePageMetadata, type Locale } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const loc: Locale = locale === 'en' ? 'en' : 'es';
  return generatePageMetadata({
    locale: loc,
    pathKey: '/contacto',
    title: `${t('title')} — CRC`,
    description: t('subtitle'),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHero />
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10 md:gap-16">
          <Suspense fallback={<div className="h-96" />}>
            <ContactForm />
          </Suspense>
          <ContactSidebar />
        </div>
      </section>
      <ContactTypesGrid />
      <ContactFaq />
    </>
  );
}
