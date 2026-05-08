import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PageHero } from '@/components/blocks/shared/page-hero';
import { FeaturedFounderCard } from '@/components/blocks/team/featured-founder-card';
import { TeamCard } from '@/components/blocks/team/team-card';
import { FOUNDER, TEAM, groupByRole, roleI18nKey } from '@/lib/data/team';

export default async function EquipoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <section className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-5 md:px-7 py-10 md:py-14">
          <FounderBlock />
        </div>
      </section>
      <Groups />
    </>
  );
}

function Hero() {
  const t = useTranslations('team');
  return (
    <PageHero
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
    />
  );
}

function FounderBlock() {
  const locale = useLocale() === 'en' ? 'en' : 'es';
  return <FeaturedFounderCard member={FOUNDER} locale={locale} />;
}

function Groups() {
  const t = useTranslations('team');
  const locale = useLocale() === 'en' ? 'en' : 'es';
  const groups = groupByRole(TEAM);

  return (
    <>
      {groups.map(([role, members]) => (
        <section key={role} className="border-t border-border">
          <div className="max-w-7xl mx-auto px-5 md:px-7 py-10 md:py-12">
            <h2 className="data-label mb-5">{t(`roles.${roleI18nKey(role)}`)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {members.map((m) => (
                <TeamCard
                  key={m.slug}
                  member={m}
                  locale={locale}
                  showRole={false}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
