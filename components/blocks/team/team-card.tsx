import type { TeamMember } from '@/lib/data/team';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Locale = 'es' | 'en';

export function TeamCard({
  member,
  locale,
  variant = 'default',
}: {
  member: TeamMember;
  locale: Locale;
  variant?: 'default' | 'horizontal';
}) {
  return (
    <Link
      href={{ pathname: '/equipo/[slug]', params: { slug: member.slug } }}
      className={cn(
        'group flex gap-4 items-start bg-card border border-border rounded-md p-3.5 hover:border-foreground/30 transition-colors',
        variant === 'default' && 'flex-row',
      )}
    >
      <Portrait number={member.number} />
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent-dark">
          {member.role[locale]}
        </div>
        <div className="font-serif text-lg leading-[1.1] tracking-[-0.02em] mt-1">
          {member.firstName} {member.lastName}
          <span className="font-mono text-[10px] uppercase ml-1.5 text-muted">
            {member.degree}
          </span>
        </div>
        <p className="text-xs text-foreground/70 leading-snug mt-1.5 line-clamp-2">
          {member.short[locale]}
        </p>
      </div>
    </Link>
  );
}

function Portrait({ number }: { number: string }) {
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
        {number}
      </span>
    </div>
  );
}
