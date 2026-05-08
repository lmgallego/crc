import { useTranslations, useLocale } from 'next-intl';
import { SectionHeader } from '@/components/blocks/shared/section-header';
import { TeamCard } from '@/components/blocks/team/team-card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { FOUNDER, TEAM_REST, FOUNDER_HIGHLIGHTS } from '@/lib/data/team';

type Locale = 'es' | 'en';

export function TeamSection() {
  const t = useTranslations('home.team');
  const locale: Locale = useLocale() === 'en' ? 'en' : 'es';

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-14 md:py-20">
        <SectionHeader
          number="03"
          eyebrow={t('eyebrow')}
          title={t('title')}
          cta={t('cta')}
          ctaHref="/equipo"
        />

        <FeaturedFounder locale={locale} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-10 md:mt-12">
          {TEAM_REST.map((m) => (
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

function FeaturedFounder({ locale }: { locale: Locale }) {
  const t = useTranslations('home.team.founder');

  return (
    <div className="mt-4 md:mt-6 bg-foreground text-background rounded-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,400px)_1fr]">
        <FounderPortrait />

        <div className="p-6 md:p-10 flex flex-col gap-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
            {t('eyebrow')}
          </div>
          <h3 className="font-serif text-3xl md:text-5xl leading-[0.95] tracking-[-0.025em]">
            {FOUNDER.firstName} {FOUNDER.lastName},{' '}
            <em className="text-accent">{FOUNDER.degree}</em>
          </h3>
          <blockquote className="font-serif italic text-base md:text-lg leading-relaxed text-background/85 max-w-2xl">
            {t.rich('quote', {
              em: (chunks) => <em>{chunks}</em>,
            })}
          </blockquote>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-4 mt-2">
            {FOUNDER_HIGHLIGHTS.map((h) => (
              <div key={h.label.en}>
                <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent">
                  {h.label[locale]}
                </div>
                <div className="text-xs md:text-sm text-background/85 mt-1 leading-snug">
                  {h.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <Button asChild variant="accent" size="sm">
              <Link
                href={{
                  pathname: '/equipo/[slug]',
                  params: { slug: FOUNDER.slug },
                }}
              >
                {t('ctaPrimary')} →
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-background/30 text-background hover:bg-background/10"
            >
              <Link href="/publicaciones">{t('ctaSecondary')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FounderPortrait() {
  return (
    <div
      className="relative aspect-[4/5] md:aspect-auto min-h-[320px]"
      style={{
        background:
          'linear-gradient(155deg, #2A2A26 0%, #0E0E0C 60%, #1A1A18 100%)',
      }}
      aria-hidden
    >
      <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] text-background/60">
        001
      </span>
      <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] bg-accent text-accent-foreground px-2 py-1">
        DIRECTOR
      </span>
    </div>
  );
}
