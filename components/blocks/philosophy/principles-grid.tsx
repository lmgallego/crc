import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const KEYS = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10'] as const;

export function PrinciplesGrid() {
  const t = useTranslations('philosophy.principles');

  return (
    <section id="principles" className="border-t border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-7 py-14 md:py-20">
        <header className="text-center mb-10 md:mb-14">
          <p className="section-number mb-3">— {t('eyebrow')}</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.05] tracking-[-0.025em]">
            {t('title')}
          </h2>
        </header>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border rounded-md overflow-hidden">
          {KEYS.map((k, i) => {
            const number = String(i + 1).padStart(2, '0');
            const isHighlighted = k === 'p8';
            return (
              <li
                key={k}
                className={cn(
                  'p-6 md:p-8 flex flex-col gap-3',
                  isHighlighted ? 'bg-accent/30' : 'bg-background',
                )}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-dark">
                  /{number}
                </span>
                <p className="font-serif text-lg md:text-xl leading-[1.25] tracking-[-0.015em]">
                  {t.rich(k, {
                    strong: (chunks) => (
                      <strong className="font-normal">{chunks}</strong>
                    ),
                  })}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
