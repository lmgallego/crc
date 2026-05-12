import type { TeamMember } from '@/lib/data/team';
import { roleI18nKey } from '@/lib/data/team';
import { FEATURES } from '@/lib/config/features';
import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import Image from 'next/image';

type Locale = 'es' | 'en';

const ROLE_BADGE: Record<string, { es: string; en: string }> = {
  director: { es: 'DIRECTOR', en: 'DIRECTOR' },
  'deputy-director': { es: 'DIR. ADJUNTO', en: 'DEPUTY' },
  'senior-researcher': { es: 'SENIOR', en: 'SENIOR' },
  researcher: { es: 'RESEARCHER', en: 'RESEARCHER' },
  'phd-candidate': { es: 'PHD', en: 'PHD' },
  'applied-research': { es: 'APPLIED AI', en: 'APPLIED AI' },
  junior: { es: 'JUNIOR', en: 'JUNIOR' },
};

export function MemberHero({
  member,
  locale,
}: {
  member: TeamMember;
  locale: Locale;
}) {
  const t = useTranslations('team');
  const tProfile = useTranslations('team.profile');
  const tPub = useTranslations('publications');
  const role = t(`roles.${roleI18nKey(member.role)}`);
  const roleBadge = ROLE_BADGE[member.role][locale];
  const orcidActive = FEATURES.orcidPublications && Boolean(member.orcidId);

  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12">
          <aside className="md:sticky md:top-24 md:self-start">
            <Portrait
              badge={roleBadge}
              photo={member.photo}
              name={`${member.name} ${member.surname}`}
            />

            <ul className="mt-5 space-y-2 font-mono text-[10px] uppercase tracking-[0.15em]">
              {member.email ? (
                <li>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 hover:text-foreground text-muted"
                  >
                    <Mail className="size-3" /> Email
                  </a>
                </li>
              ) : null}
              {orcidActive ? (
                <li>
                  <a
                    href={`https://orcid.org/${member.orcidId}`}
                    target="_blank"
                    rel="noopener"
                    className="hover:text-foreground text-muted block"
                  >
                    <span>{tPub('orcidProfileLink')}</span>
                    <span className="block normal-case tracking-normal text-[10px] text-muted/80 mt-0.5">
                      {member.orcidId}
                    </span>
                  </a>
                </li>
              ) : member.orcid ? (
                <ContactLink href={member.orcid} label="ORCID" />
              ) : null}
              {member.scholar ? (
                <ContactLink href={member.scholar} label="Google Scholar" />
              ) : null}
              {member.researchgate ? (
                <ContactLink href={member.researchgate} label="ResearchGate" />
              ) : null}
            </ul>

            <a
              href="#"
              className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark hover:text-foreground"
            >
              ↓ {tProfile('downloadCV')}
            </a>
          </aside>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark mb-4">
              — {role}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.025em]">
              {member.name} {member.surname}
              {member.degree ? (
                <>
                  ,{' '}
                  <em className="text-accent-dark not-italic font-normal italic">
                    {member.degree}
                  </em>
                </>
              ) : null}
            </h1>

            <p className="font-serif italic text-base md:text-xl mt-5 text-foreground/80 leading-relaxed max-w-2xl">
              {member.short[locale]}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                {member.specialty[locale]}
              </span>
            </div>

            {member.highlights.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5 border-t border-border pt-6">
                {member.highlights.map((h) => (
                  <div key={h.label.es}>
                    <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent-dark">
                      {h.label[locale]}
                    </div>
                    <div className="text-xs md:text-sm text-foreground/85 mt-1 leading-snug">
                      {h.value[locale]}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portrait({
  badge,
  photo,
  name,
}: {
  badge: string;
  photo?: string;
  name: string;
}) {
  return (
    <div
      className="relative aspect-[3/4] rounded-sm overflow-hidden"
      style={
        photo
          ? undefined
          : {
              background:
                'linear-gradient(155deg, rgba(232,210,74,0.12) 0%, rgba(106,106,96,0.30) 60%, rgba(14,14,12,0.05) 100%)',
            }
      }
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover object-top"
          priority
        />
      ) : null}
      <span className="absolute bottom-3 right-3 bg-accent text-accent-foreground px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] z-10">
        {badge}
      </span>
    </div>
  );
}

function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="hover:text-foreground text-muted"
      >
        {label}
      </a>
    </li>
  );
}
