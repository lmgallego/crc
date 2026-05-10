import type { TeamMember } from '@/lib/data/team';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

type Locale = 'es' | 'en';

export function FeaturedFounderCard({
  member,
  locale: _locale,
}: {
  member: TeamMember;
  locale: Locale;
}) {
  const t = useTranslations('home.team.founder');

  return (
    <div className="bg-foreground text-background rounded-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(280px,400px)_1fr]">
        <FounderPortrait
          number={String(member.number).padStart(3, '0')}
          photo={member.photo}
          name={`${member.name} ${member.surname}`}
        />

        <div className="p-6 md:p-10 flex flex-col gap-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
            {t('eyebrow')}
          </div>
          <h3 className="font-serif text-3xl md:text-5xl leading-[0.95] tracking-[-0.025em]">
            {member.name} {member.surname},{' '}
            <em className="text-accent">{member.degree}</em>
          </h3>
          <blockquote className="font-serif italic text-base md:text-lg leading-relaxed text-background/85 max-w-2xl">
            {t.rich('quote', {
              em: (chunks) => <em>{chunks}</em>,
            })}
          </blockquote>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-4 mt-2">
            {member.highlights.map((h) => (
              <div key={h.label}>
                <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent">
                  {h.label}
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
                  params: { slug: member.slug },
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

function FounderPortrait({
  number,
  photo,
  name,
}: {
  number: string;
  photo?: string;
  name: string;
}) {
  return (
    <div
      className="relative aspect-[4/5] md:aspect-auto min-h-[320px] overflow-hidden"
      style={
        photo
          ? undefined
          : {
              background:
                'linear-gradient(155deg, #2A2A26 0%, #0E0E0C 60%, #1A1A18 100%)',
            }
      }
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          priority
        />
      ) : null}
      <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] text-background/60 z-10">
        {number}
      </span>
      <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] bg-accent text-accent-foreground px-2 py-1 z-10">
        DIRECTOR
      </span>
    </div>
  );
}
