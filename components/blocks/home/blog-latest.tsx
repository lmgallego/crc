import { useTranslations, useLocale } from 'next-intl';
import { SectionHeader } from '@/components/blocks/shared/section-header';
import { Link } from '@/i18n/navigation';

type Locale = 'es' | 'en';

const POSTS = [
  {
    slug: 'durabilidad-nueva-frontera',
    year: '2026',
    date: { es: '12 ABR 2026', en: '12 APR 2026' },
    category: { es: 'Fisiología', en: 'Physiology' },
    title: {
      es: 'Durabilidad: la nueva frontera del rendimiento ciclista',
      en: 'Durability: the new frontier of cycling performance',
    },
  },
  {
    slug: 'potencia-biomarcadores',
    year: '2026',
    date: { es: '03 MAR 2026', en: '03 MAR 2026' },
    category: { es: 'Entrenamiento', en: 'Training' },
    title: {
      es: '¿Es la potencia el dato más importante? Repensando los biomarcadores en ciclismo',
      en: 'Is power the most important metric? Rethinking biomarkers in cycling',
    },
  },
  {
    slug: 'ia-ciclismo-profesional',
    year: '2026',
    date: { es: '14 FEB 2026', en: '14 FEB 2026' },
    category: { es: 'IA', en: 'AI' },
    title: {
      es: 'IA en el ciclismo profesional: cuándo es aliado y cuándo distracción',
      en: 'AI in pro cycling: when it helps, when it distracts',
    },
  },
];

export function BlogLatest() {
  const t = useTranslations('home.blog');
  const locale: Locale = useLocale() === 'en' ? 'en' : 'es';

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-14 md:py-20">
        <SectionHeader
          number="05"
          eyebrow={t('eyebrow')}
          title={t('title')}
          cta={t('cta')}
          ctaHref="/blog"
        />

        <ul className="border-t border-border">
          {POSTS.map((post) => (
            <li key={post.slug} className="border-b border-border">
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-5 md:py-6"
              >
                {/* Mobile */}
                <div className="md:hidden">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    <span>{post.category[locale]}</span>
                    <span>{post.date[locale]}</span>
                  </div>
                  <h3 className="font-serif text-xl leading-[1.15] tracking-[-0.02em] mt-2 group-hover:underline underline-offset-4 decoration-accent">
                    {post.title[locale]}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark mt-1.5">
                    {post.year}
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden md:grid md:grid-cols-[60px_1fr_140px_90px] md:gap-6 md:items-baseline">
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent-dark">
                    {post.year}
                  </span>
                  <h3 className="font-serif text-2xl lg:text-[28px] leading-[1.1] tracking-[-0.02em] group-hover:underline underline-offset-4 decoration-accent">
                    {post.title[locale]}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                    {post.category[locale]}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted text-right">
                    {post.date[locale]}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
