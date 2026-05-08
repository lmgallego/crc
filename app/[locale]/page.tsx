import { Hero } from '@/components/blocks/home/hero';
import { PhilosophyTease } from '@/components/blocks/home/philosophy-tease';
import { ServicesBlock } from '@/components/blocks/home/services-block';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PhilosophyTease />
      <ServicesBlock />
    </>
  );
}
