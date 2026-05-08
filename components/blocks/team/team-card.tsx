import type { TeamMember } from '@/lib/data/team';
import { roleI18nKey } from '@/lib/data/team';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

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
        <PortraitSmall dorsal={dorsal} />
      ) : (
        <PortraitTall dorsal={dorsal} />
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

function PortraitSmall({ dorsal }: { dorsal: string }) {
  return (
    <div
      className="relative shrink-0 rounded-sm overflow-hidden"
      style={{
        width: 64,
        height: 80,
        background:
          'linear-gradient(160deg, rgba(232,210,74,0.15) 0%, rgba(106,106,96,0.25) 100%)',
      }}
      aria-hidden
    >
      <span className="absolute top-1 left-1.5 font-mono text-[8px] tracking-widest text-foreground/55">
        {dorsal}
      </span>
    </div>
  );
}

function PortraitTall({ dorsal }: { dorsal: string }) {
  return (
    <div
      className="relative w-full aspect-[4/5]"
      style={{
        background:
          'linear-gradient(160deg, rgba(232,210,74,0.15) 0%, rgba(106,106,96,0.25) 100%)',
      }}
      aria-hidden
    >
      <span className="absolute top-2 left-2.5 font-mono text-[10px] tracking-widest text-foreground/55">
        {dorsal}
      </span>
    </div>
  );
}
