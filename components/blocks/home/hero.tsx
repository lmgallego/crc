import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/blocks/shared/highlight';
import { DataStrip, DataStat } from '@/components/blocks/shared/data-strip';
import { Link } from '@/i18n/navigation';

export function Hero() {
  const t = useTranslations('home.hero');
  const tStats = useTranslations('home.hero.stats');

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16 relative">
        <svg
          aria-hidden
          className="hidden md:block absolute top-0 right-0 w-72 h-full opacity-40 pointer-events-none"
          viewBox="0 0 280 400"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="herogrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14,14,12,0.08)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="280" height="400" fill="url(#herogrid)" />
          <path
            d="M 0 80 Q 40 95, 70 110 T 140 180 T 210 240 T 280 260"
            stroke="#0E0E0C"
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M 0 80 Q 40 95, 70 110 T 140 180 T 210 240 T 280 260 L 280 400 L 0 400 Z"
            fill="#E8D24A"
            opacity="0.15"
          />
        </svg>

        <p className="section-number mb-6">— {t('eyebrow')}</p>

        <div className="grid md:grid-cols-[1fr_260px] gap-8 md:gap-12 items-end">
          <h1 className="font-serif text-[48px] sm:text-6xl md:text-6xl lg:text-7xl leading-[0.92] tracking-[-0.025em]">
            {t.rich('title', {
              highlight: (chunks) => <Highlight>{chunks}</Highlight>,
            })}
          </h1>

          <div className="md:pb-3">
            <p className="font-serif text-[15px] md:text-base leading-relaxed text-foreground/80 mb-5">
              {t.rich('subtitle', {
                em: (chunks) => <em>{chunks}</em>,
              })}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/filosofia">{t('ctaPrimary')} →</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contacto">{t('ctaSecondary')}</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <DataStrip>
            <DataStat label={tStats('experience')} value="25+" />
            <DataStat label={tStats('publications')} value="100+" />
            <DataStat label={tStats('worldChampions')} value="+" />
            <DataStat label={tStats('olympicMedals')} value="+" />
          </DataStrip>
        </div>
      </div>
    </section>
  );
}
