import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/blocks/shared/section-header';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';

const SECONDARY = [
  { slug: 'coaching', code: '02', href: '/servicios/coaching' },
  { slug: 'training-camps', code: '03', href: '/servicios/training-camps' },
  { slug: 'formacion', code: '04', href: '/servicios/formacion' },
] as const;

export function ServicesBlock() {
  const t = useTranslations('home.services');

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-14 md:py-20">
        <SectionHeader
          number="02"
          eyebrow={t('eyebrow')}
          title={t('title')}
          cta={t('cta')}
          ctaHref="/servicios"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
          {/* Featured: Investigación */}
          <Link
            href="/servicios/investigacion"
            className="group md:col-span-3 bg-accent text-accent-foreground rounded-md p-6 md:p-8 flex flex-col justify-between min-h-[320px] md:min-h-[420px] relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden>
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="svc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0E0E0C" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#svc-grid)" />
              </svg>
            </div>

            <div className="relative flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
                /01 — {t('research.code')}
              </span>
              <Badge variant="default" className="bg-foreground/90 text-background border-transparent">
                {t('research.badge')}
              </Badge>
            </div>

            <div className="relative">
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-[-0.025em] mt-8 md:mt-10">
                {t('research.title')}
              </h3>
              <p className="text-sm md:text-[15px] leading-relaxed mt-4 max-w-md text-accent-foreground/85">
                {t('research.body')}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-5">
                {t('research.tags').split(',').map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-foreground/10 text-accent-foreground border-foreground/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-6 font-mono text-[11px] uppercase tracking-[0.15em] group-hover:underline underline-offset-4">
                {t('research.cta')}
                <ArrowUpRight className="size-3.5" />
              </div>
            </div>
          </Link>

          {/* Stack of 3 */}
          <div className="md:col-span-2 grid grid-cols-1 gap-4 md:gap-5">
            {SECONDARY.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="group bg-card border border-border rounded-md p-5 md:p-6 flex flex-col justify-between hover:border-foreground/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark">
                    /{s.code} — {t(`${s.slug}.code` as 'coaching.code')}
                  </span>
                  <span className="data-label">
                    {t(`${s.slug}.meta` as 'coaching.meta')}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl leading-[1.1] tracking-[-0.02em] mt-4">
                    {t(`${s.slug}.title` as 'coaching.title')}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed mt-2">
                    {t(`${s.slug}.body` as 'coaching.body')}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/80 group-hover:text-foreground">
                    {t(`${s.slug}.cta` as 'coaching.cta')}
                    <ArrowUpRight className="size-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
