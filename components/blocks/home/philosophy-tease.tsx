import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/blocks/shared/section-header';
import { Highlight } from '@/components/blocks/shared/highlight';
import { cn } from '@/lib/utils';

const PARADIGMS = [
  { key: 'p1', display: '1.0', tone: 'muted' as const },
  { key: 'p2', display: '2.0', tone: 'dark' as const },
  { key: 'p3', display: '3.0', tone: 'accent' as const },
] as const;

const TIMELINE_KEYS = ['t1', 't2', 't3', 't4', 't5'] as const;

export function PhilosophyTease() {
  const t = useTranslations('home.philosophy');

  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-14 md:py-20">
        <SectionHeader
          number="01"
          eyebrow={t('eyebrow')}
          title={t('title')}
          cta={t('cta')}
          ctaHref="/filosofia"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border mt-4 md:mt-6 mb-12 md:mb-16 border border-border">
          {PARADIGMS.map(({ key, display, tone }) => {
            const isMuted = tone === 'muted';
            const isDark = tone === 'dark';
            const isAccent = tone === 'accent';
            return (
              <div
                key={key}
                className={cn(
                  'p-6 md:p-8 flex flex-col gap-4',
                  isMuted && 'bg-background text-muted',
                  isDark && 'bg-foreground text-background',
                  isAccent && 'bg-accent text-accent-foreground',
                )}
              >
                <div
                  className={cn(
                    'font-mono text-[10px] uppercase tracking-[0.15em]',
                    isMuted && 'text-muted-light',
                    isDark && 'text-accent',
                    isAccent && 'text-accent-foreground/70',
                  )}
                >
                  {t(`paradigms.${key}.eyebrow`)}
                </div>
                <div
                  className={cn(
                    'font-serif text-6xl md:text-7xl leading-none tracking-[-0.025em]',
                    isMuted && 'text-muted-light',
                  )}
                >
                  {display}
                </div>
                <h3 className="font-serif text-xl md:text-2xl leading-[1.15] tracking-[-0.02em]">
                  {t.rich(`paradigms.${key}.title`, {
                    em: (chunks) => <em>{chunks}</em>,
                  })}
                </h3>
                <p
                  className={cn(
                    'text-sm leading-relaxed',
                    isMuted && 'text-muted',
                    isDark && 'text-background/75',
                    isAccent && 'text-accent-foreground/85',
                  )}
                >
                  {t(`paradigms.${key}.body`)}
                </p>
              </div>
            );
          })}
        </div>

        <Timeline />

        <figure className="mt-12 md:mt-16 max-w-3xl mx-auto text-center">
          <blockquote className="font-serif italic text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-[-0.02em]">
            {t.rich('quote.text', {
              highlight: (chunks) => <Highlight>{chunks}</Highlight>,
            })}
          </blockquote>
          <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
            {t('quote.attribution')}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Timeline() {
  const t = useTranslations('home.philosophy.timeline');

  return (
    <div className="md:mt-4">
      {/* Mobile: vertical list */}
      <ol className="md:hidden relative border-l border-border ml-2 space-y-6">
        {TIMELINE_KEYS.map((k) => (
          <li key={k} className="pl-5 relative">
            <span className="absolute -left-[5px] top-1.5 size-2 rounded-full bg-foreground" />
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark">
              {t(`${k}.label`)}
            </div>
            <p className="text-sm leading-relaxed text-foreground/80 mt-1">
              {t(`${k}.description`)}
            </p>
          </li>
        ))}
      </ol>

      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block relative pt-4 pb-12">
        <div className="absolute left-0 right-0 top-12 h-px bg-border" />
        <div className="grid grid-cols-5 gap-4">
          {TIMELINE_KEYS.map((k, i) => (
            <div key={k} className="relative">
              <div className="flex justify-center">
                <span
                  className={cn(
                    'rounded-full bg-foreground',
                    i === 1 || i === 3 ? 'size-3.5' : 'size-2',
                  )}
                />
              </div>
              <div className="mt-5 text-center">
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark">
                  {t(`${k}.label`)}
                </div>
                <p className="text-xs leading-snug text-foreground/75 mt-2 max-w-[180px] mx-auto">
                  {t(`${k}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
