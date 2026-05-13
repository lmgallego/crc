import { useTranslations, useLocale } from 'next-intl';
import { SectionHeader } from '@/components/blocks/shared/section-header';
import { TeamCard } from '@/components/blocks/team/team-card';
import { FeaturedFounderCard } from '@/components/blocks/team/featured-founder-card';
import { COFOUNDER, FOUNDER, TEAM } from '@/lib/data/team';

type Locale = 'es' | 'en';

export function TeamSection() {
  const t = useTranslations('home.team');
  const locale: Locale = useLocale() === 'en' ? 'en' : 'es';
  const founderSlugs = [FOUNDER.slug, COFOUNDER.slug];
  const others = TEAM.filter((m) => !founderSlugs.includes(m.slug));

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-14 md:py-20">
        <SectionHeader
          number="03"
          eyebrow={t('eyebrow')}
          title={t('title', { count: TEAM.length })}
          cta={t('cta')}
          ctaHref="/equipo"
        />

        <div className="mt-4 md:mt-6 space-y-6 md:space-y-8">
          <FeaturedFounderCard member={FOUNDER} locale={locale} variant="founder" />
          <FeaturedFounderCard member={COFOUNDER} locale={locale} variant="cofounder" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-10 md:mt-12">
          {others.map((m) => (
            <TeamCard key={m.slug} member={m} locale={locale} />
          ))}
        </div>

        <figure className="mt-12 md:mt-16 max-w-3xl mx-auto text-center">
          <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl leading-[1.15] tracking-[-0.02em]">
            {t.rich('closingQuote', {
              em: (chunks) => <em className="not-italic font-normal">{chunks}</em>,
            })}
          </blockquote>
        </figure>
      </div>
    </section>
  );
}
