import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, type Locale } from '@/lib/seo';
import { Hero } from '@/components/blocks/home/hero';
import { PhilosophyTease } from '@/components/blocks/home/philosophy-tease';
import { ServicesBlock } from '@/components/blocks/home/services-block';
import { TeamSection } from '@/components/blocks/home/team-section';
import { PublicationsLink } from '@/components/blocks/home/publications-link';
import { BlogLatest } from '@/components/blocks/home/blog-latest';
import { ContactCTA } from '@/components/blocks/home/contact-cta';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc: Locale = locale === 'en' ? 'en' : 'es';
  const t = await getTranslations({ locale, namespace: 'metadata.home' });
  return generatePageMetadata({
    locale: loc,
    pathKey: '/',
    title: t('title'),
    description: t('description'),
  });
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <PhilosophyTease />
      <ServicesBlock />
      <TeamSection />
      <PublicationsLink />
      <BlogLatest />
      <ContactCTA />
    </>
  );
}
