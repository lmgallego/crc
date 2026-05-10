import type { TeamMember } from '@/lib/data/team';
import { roleI18nKey } from '@/lib/data/team';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type Locale = 'es' | 'en';

export function TeamCard({
  member,
  locale,
  variant = 'horizontal',
  showRole = true,
}: {
  member: TeamMember;
  locale: Locale;
  variant?: 'default' | 'horizontal';
  showRole?: boolean;
}) {
  const t = useTranslations('team');
  const dorsal = String(member.number).padStart(3, '0');
  const role = t(`roles.${roleI18nKey(member.role)}`);

  return (
    <Link
      href={{ pathname: '/equipo/[slug]', params: { slug: member.slug } }}
      className={cn(
        'group bg-card border border-border rounded-md hover:border-foreground/30 transition-colors',
        variant === 'horizontal' && 'flex gap-4 items-start p-3.5',
        variant === 'default' && 'flex flex-col p-0 overflow-hidden',
      )}
    >
      {variant === 'horizontal' ? (
        <PortraitSmall
          dorsal={dorsal}
          photo={member.photo}
          name={`${member.name} ${member.surname}`}
        />
      ) : (
        <PortraitTall
          dorsal={dorsal}
          photo={member.photo}
          name={`${member.name} ${member.surname}`}
        />
      )}
      <div className={cn('flex-1 min-w-0', variant === 'default' && 'p-4')}>
        {showRole ? (
          <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent-dark">
            {role}
          </div>
        ) : (
          <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
            {member.specialty[locale]}
          </div>
        )}
        <div className="font-serif text-lg leading-[1.1] tracking-[-0.02em] mt-1">
          {member.name} {member.surname}
          {member.degree ? (
            <span className="font-mono text-[10px] uppercase ml-1.5 text-muted">
              {member.degree}
            </span>
          ) : null}
        </div>
        <p className="text-xs text-foreground/70 leading-snug mt-1.5 line-clamp-2">
          {member.short[locale]}
        </p>
      </div>
    </Link>
  );
}

function PortraitSmall({
  dorsal,
  photo,
  name,
}: {
  dorsal: string;
  photo?: string;
  name: string;
}) {
  return (
    <div
      className="relative shrink-0 rounded-sm overflow-hidden"
      style={
        photo
          ? { width: 64, height: 80 }
          : {
              width: 64,
              height: 80,
              background:
                'linear-gradient(160deg, rgba(232,210,74,0.15) 0%, rgba(106,106,96,0.25) 100%)',
            }
      }
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="64px"
          className="object-cover"
        />
      ) : null}
      <span className="absolute top-1 left-1.5 font-mono text-[8px] tracking-widest text-foreground/55 z-10">
        {dorsal}
      </span>
    </div>
  );
}

function PortraitTall({
  dorsal,
  photo,
  name,
}: {
  dorsal: string;
  photo?: string;
  name: string;
}) {
  return (
    <div
      className="relative w-full aspect-[4/5] overflow-hidden"
      style={
        photo
          ? undefined
          : {
              background:
                'linear-gradient(160deg, rgba(232,210,74,0.15) 0%, rgba(106,106,96,0.25) 100%)',
            }
      }
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      ) : null}
      <span className="absolute top-2 left-2.5 font-mono text-[10px] tracking-widest text-foreground/55 z-10">
        {dorsal}
      </span>
    </div>
  );
}
