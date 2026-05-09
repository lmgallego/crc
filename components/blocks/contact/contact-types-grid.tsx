import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';

const TYPES: { id: string; type: string; key: string }[] = [
  { id: '01', type: 'coaching', key: 't1' },
  { id: '02', type: 'coaching', key: 't2' },
  { id: '03', type: 'training-camp', key: 't3' },
  { id: '04', type: 'research', key: 't4' },
  { id: '05', type: 'education', key: 't5' },
  { id: '06', type: 'press', key: 't6' },
];

export function ContactTypesGrid() {
  const t = useTranslations('contact.types');
  const tCta = useTranslations('contact.types');
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16">
        <h2 className="data-label mb-6">{t('title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {TYPES.map((tt) => (
            <Link
              key={tt.id}
              href={{ pathname: '/contacto', query: { type: tt.type } }}
              className="group bg-card border border-border rounded-md p-5 md:p-6 hover:border-foreground/30 transition-colors flex flex-col gap-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-dark">
                /{tt.id}
              </span>
              <h3 className="font-serif text-xl md:text-2xl leading-[1.1] tracking-[-0.02em]">
                {t(`${tt.key}Title`)}
              </h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {t(`${tt.key}Body`)}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/80 group-hover:text-foreground">
                {tCta('cta')}
                <ArrowUpRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
