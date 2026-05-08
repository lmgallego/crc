import { Hero } from '@/components/blocks/home/hero';
import { PhilosophyTease } from '@/components/blocks/home/philosophy-tease';
import { ServicesBlock } from '@/components/blocks/home/services-block';
import { TeamSection } from '@/components/blocks/home/team-section';
import { PublicationsLink } from '@/components/blocks/home/publications-link';
import { BlogLatest } from '@/components/blocks/home/blog-latest';
import { ContactCTA } from '@/components/blocks/home/contact-cta';

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
