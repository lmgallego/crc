import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function BridgeBlock() {
  const t = useTranslations('philosophy.bridge');

  return (
    <section className="bg-foreground text-background">
      <div className="max-w-5xl mx-auto px-5 md:px-7 py-14 md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-4">
          {t('eyebrow')}
        </p>
        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[0.98] tracking-[-0.025em] max-w-3xl">
          {t.rich('title', {
            highlight: (chunks) => (
              <span className="bg-accent text-accent-foreground px-2">
                {chunks}
              </span>
            ),
          })}
        </h2>
        <p className="text-sm md:text-[15px] leading-relaxed text-background/75 mt-5 max-w-2xl">
          {t('body')}
        </p>
        <div className="mt-7">
          <Button asChild variant="accent">
            <a href="#">{t('cta')} →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
