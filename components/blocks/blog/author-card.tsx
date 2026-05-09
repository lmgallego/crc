import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { findMember, roleI18nKey } from '@/lib/data/team';

type Locale = 'es' | 'en';

export function AuthorCard({
  authorSlug,
  locale,
}: {
  authorSlug: string;
  locale: Locale;
}) {
  const t = useTranslations('team');
  const tBlog = useTranslations('blog');
  const member = findMember(authorSlug);
  if (!member) return null;
  const role = t(`roles.${roleI18nKey(member.role)}`);

  return (
    <section className="border-t border-border">
      <div className="max-w-3xl mx-auto px-5 md:px-7 py-10 md:py-12">
        <p className="data-label mb-5">{tBlog('aboutAuthor')}</p>
        <Link
          href={{ pathname: '/equipo/[slug]', params: { slug: member.slug } }}
          className="group flex gap-4 items-start bg-card border border-border rounded-md p-4 hover:border-foreground/30 transition-colors"
        >
          <div
            className="relative shrink-0 rounded-sm overflow-hidden"
            style={{
              width: 72,
              height: 90,
              background:
                'linear-gradient(160deg, rgba(232,210,74,0.15) 0%, rgba(106,106,96,0.25) 100%)',
            }}
            aria-hidden
          >
            <span className="absolute top-1 left-1.5 font-mono text-[8px] tracking-widest text-foreground/55">
              {String(member.number).padStart(3, '0')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-accent-dark">
              {role}
            </div>
            <div className="font-serif text-xl leading-tight mt-1">
              {member.name} {member.surname}
              {member.degree ? (
                <span className="font-mono text-[10px] uppercase ml-1.5 text-muted">
                  {member.degree}
                </span>
              ) : null}
            </div>
            <p className="text-sm text-foreground/70 mt-1.5 leading-snug">
              {member.short[locale]}
            </p>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark group-hover:text-foreground">
              {tBlog('viewProfile')} →
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
