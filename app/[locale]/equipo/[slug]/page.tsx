import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { TEAM, findMember } from '@/lib/data/team';
import type { TeamMember } from '@/lib/data/team';
import { Breadcrumb } from '@/components/blocks/shared/breadcrumb';
import { MemberHero } from '@/components/blocks/team/member-hero';
import { TeamCard } from '@/components/blocks/team/team-card';
import { ContactCTA } from '@/components/blocks/home/contact-cta';
import { Link } from '@/i18n/navigation';
import { publicationsForMember } from '@/lib/data/publications';
import { PublicationItem } from '@/components/blocks/publications/publication-item';
import { generatePageMetadata } from '@/lib/seo';

type Locale = 'es' | 'en';

export function generateStaticParams() {
  return TEAM.flatMap((m) =>
    routing.locales.map((locale) => ({ locale, slug: m.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const member = findMember(slug);
  if (!member) return {};
  const loc: Locale = locale === 'en' ? 'en' : 'es';
  return generatePageMetadata({
    locale: loc,
    pathKey: '/equipo/[slug]',
    params: { slug },
    title: `${member.name} ${member.surname} — CRC`,
    description: member.short[loc],
  });
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const member = findMember(slug);
  if (!member) notFound();

  const loc: Locale = locale === 'en' ? 'en' : 'es';
  const tProfile = await getTranslations('team.profile');
  const idx = TEAM.findIndex((m) => m.slug === slug);
  const others = [
    TEAM[(idx + 1) % TEAM.length],
    TEAM[(idx + 2) % TEAM.length],
    TEAM[(idx + 3) % TEAM.length],
  ];

  return (
    <>
      <Breadcrumb
        items={[
          { label: tProfile('breadcrumbTeam'), href: '/equipo' },
          { label: `${member.name} ${member.surname}` },
        ]}
      />
      <MemberHero member={member} locale={loc} />
      <BiographySection member={member} locale={loc} />
      <CareerSection member={member} />
      <PublicationsSection slug={slug} />
      <ContactCTA personalized={member.name} />
      <OtherMembersSection members={others} locale={loc} />
    </>
  );
}

function BiographySection({
  member,
  locale,
}: {
  member: TeamMember;
  locale: Locale;
}) {
  const t = useTranslations('team.profile');
  const paragraphs = member.bioParagraphs[locale];
  if (paragraphs.length === 0) return null;

  return (
    <SplitSection
      eyebrow={t('biographyEyebrow')}
      title={t('biographyTitle')}
    >
      <div className="space-y-5 max-w-prose">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={
              'font-serif text-base md:text-lg leading-relaxed text-foreground/85 ' +
              (i === 0 ? 'drop-cap' : '')
            }
          >
            {p}
          </p>
        ))}
      </div>
    </SplitSection>
  );
}

function CareerSection({ member }: { member: TeamMember }) {
  const t = useTranslations('team.profile');
  if (member.career.length === 0) return null;

  return (
    <SplitSection eyebrow={t('careerEyebrow')} title={t('careerTitle')}>
      <ol className="border-t border-border-subtle">
        {member.career.map((c, i) => (
          <li
            key={i}
            className="grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-4 md:gap-6 py-4 border-b border-border-subtle"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark pt-1">
              {c.rangeLabel ??
                (c.endYear ? `${c.startYear}–${c.endYear}` : `${c.startYear}`)}
            </span>
            <div>
              <div className="font-serif text-lg leading-snug">{c.title}</div>
              <div className="text-sm text-foreground/70 mt-0.5">{c.org}</div>
              {c.honor ? (
                <div className="text-xs italic text-muted mt-1">{c.honor}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </SplitSection>
  );
}

function PublicationsSection({ slug }: { slug: string }) {
  const t = useTranslations('team.profile');
  const memberPubs = publicationsForMember(slug);
  return (
    <SplitSection
      eyebrow={t('publicationsEyebrow')}
      title={t('publicationsTitle')}
    >
      {memberPubs.length > 0 ? (
        <ul className="border-t border-border-subtle">
          {memberPubs.map((p) => (
            <li key={p.id}>
              <PublicationItem pub={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm md:text-base leading-relaxed text-foreground/80 max-w-prose">
          {t('publicationsPlaceholder')}
        </p>
      )}
      <Link
        href="/publicaciones"
        className="inline-block mt-4 font-mono text-[11px] uppercase tracking-[0.15em] text-accent-dark hover:underline underline-offset-4"
      >
        {t('viewAllPubs')}
      </Link>
    </SplitSection>
  );
}

function SplitSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12">
          <div className="md:sticky md:top-24 md:self-start">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark">
              {eyebrow}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl mt-2 leading-[1.1] tracking-[-0.02em]">
              {title}
            </h2>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

function OtherMembersSection({
  members,
  locale,
}: {
  members: TeamMember[];
  locale: Locale;
}) {
  const t = useTranslations('team.profile');
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16">
        <h2 className="data-label mb-5">{t('otherMembers')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {members.map((m) => (
            <TeamCard key={m.slug} member={m} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
