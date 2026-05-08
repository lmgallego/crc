import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { CRCMonogram } from '@/components/blocks/shared/crc-monogram';
import { Link } from '@/i18n/navigation';

export function ContactCTA({ personalized }: { personalized?: string } = {}) {
  const t = useTranslations('home.contact');
  const tProfile = useTranslations('team.profile');

  return (
    <section className="bg-accent relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        aria-hidden
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="contact-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0E0E0C" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-5 md:px-7 py-14 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-14 md:items-center">
          <div>
            <p className="section-number mb-3">— {t('eyebrow')}</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.025em]">
              {personalized
                ? tProfile('personalCTATitle', { name: personalized })
                : t.rich('title', {
                    em: (chunks) => <em className="italic">{chunks}</em>,
                    br: () => <br />,
                  })}
            </h2>
            <p className="mt-4 text-sm md:text-[15px] text-accent-foreground/80 max-w-lg leading-relaxed">
              {personalized ? tProfile('personalCTABody') : t('body')}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild>
                <Link href="/contacto">{t('ctaPrimary')} →</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-foreground/30 hover:bg-foreground/5"
              >
                <a href="mailto:info@crc.org">{t('ctaSecondary')}</a>
              </Button>
            </div>
          </div>
          <div className="self-center md:self-end justify-self-center md:justify-self-end">
            <CRCMonogram size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
