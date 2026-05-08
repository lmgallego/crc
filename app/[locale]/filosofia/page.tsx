import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Highlight } from '@/components/blocks/shared/highlight';
import { PageHeroManifesto } from '@/components/blocks/philosophy/page-hero-manifesto';
import { ParadigmSection } from '@/components/blocks/philosophy/paradigm-section';
import { ParadigmCallout } from '@/components/blocks/philosophy/paradigm-callout';
import { PrinciplesGrid } from '@/components/blocks/philosophy/principles-grid';
import { ManifestoQuote } from '@/components/blocks/philosophy/manifesto-quote';
import { BridgeBlock } from '@/components/blocks/philosophy/bridge-block';

export default async function FilosofiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeroManifesto />
      <Intro />
      <SectionP1 />
      <SectionP2 />
      <SectionP3 />
      <PrinciplesGrid />
      <ManifestoQuote />
      <BridgeBlock />
    </>
  );
}

function Intro() {
  const t = useTranslations('philosophy');
  return (
    <section className="border-t border-border">
      <div className="max-w-3xl mx-auto px-5 md:px-7 py-12 md:py-16">
        <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/85">
          {t('intro')}
        </p>
      </div>
    </section>
  );
}

function SectionP1() {
  const t = useTranslations('philosophy.p1');
  return (
    <ParadigmSection
      id="p1"
      variant="muted"
      number="1.0"
      eyebrow={t('eyebrow')}
      subtitle={t('subtitle')}
    >
      <h2 className="font-serif text-2xl md:text-[32px] leading-[1.1] tracking-[-0.02em] mb-5 text-muted">
        {t('title')}
      </h2>
      <p className="text-sm md:text-[15px] leading-relaxed text-foreground/85 max-w-xl">
        {t.rich('body', { em: (c) => <em>{c}</em> })}
      </p>
      <ParadigmCallout variant="muted" eyebrow={t('callout.eyebrow')}>
        <ul className="space-y-1.5 font-serif italic">
          <li>«{t('callout.l1')}»</li>
          <li>«{t('callout.l2')}»</li>
          <li>«{t('callout.l3')}»</li>
        </ul>
        <p className="not-italic mt-3 text-xs font-mono uppercase tracking-[0.15em] text-muted">
          {t('callout.caption')}
        </p>
      </ParadigmCallout>
      <p className="mt-6 text-sm italic text-foreground/70">{t('closing')}</p>
    </ParadigmSection>
  );
}

function SectionP2() {
  const t = useTranslations('philosophy.p2');
  return (
    <ParadigmSection
      id="p2"
      variant="default"
      number="2.0"
      eyebrow={t('eyebrow')}
      subtitle={t('subtitle')}
      aside={
        <div className="border border-border rounded-md p-4 bg-card">
          <div className="font-serif text-base leading-tight">
            Zabala &amp; Atkinson (2012)
          </div>
          <p className="text-xs text-foreground/70 mt-1.5 leading-snug">
            {t('aside')}
          </p>
        </div>
      }
    >
      <h2 className="font-serif text-2xl md:text-[32px] leading-[1.1] tracking-[-0.02em] mb-5">
        {t('title')}
      </h2>
      <p className="text-sm md:text-[15px] leading-relaxed text-foreground/85 max-w-xl">
        {t('body1')}
      </p>
      <p className="mt-4 text-sm md:text-[15px] leading-relaxed text-foreground/85 max-w-xl">
        {t('body2')}
      </p>
      <ParadigmCallout variant="featured" eyebrow={t('callout.eyebrow')}>
        {t.rich('callout.text', {
          strong: (c) => <strong className="font-semibold">{c}</strong>,
          em: (c) => <em>{c}</em>,
        })}
      </ParadigmCallout>
    </ParadigmSection>
  );
}

function SectionP3() {
  const t = useTranslations('philosophy.p3');
  return (
    <ParadigmSection
      id="p3"
      variant="accent"
      number="3.0"
      eyebrow={t('eyebrow')}
      subtitle={t('subtitle')}
    >
      <h2 className="font-serif text-3xl md:text-[38px] leading-[1.05] tracking-[-0.025em] mb-5">
        {t.rich('title', {
          highlight: (chunks) => (
            <span className="bg-foreground text-background px-2">{chunks}</span>
          ),
        })}
      </h2>
      <p className="text-sm md:text-[15px] leading-relaxed max-w-xl">
        {t('body1')}
      </p>
      <p className="mt-4 text-sm md:text-[15px] leading-relaxed max-w-xl">
        {t('body2')}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        {(['pillar1', 'pillar2', 'pillar3'] as const).map((k) => (
          <div
            key={k}
            className="rounded-md border border-foreground/20 bg-foreground/[0.06] p-4"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent-foreground/70 mb-2">
              {k.replace('pillar', '/0')}
            </div>
            <div className="font-serif text-base md:text-lg leading-snug">
              {t(k)}
            </div>
          </div>
        ))}
      </div>

      <ParadigmCallout variant="warning" eyebrow={t('warning.eyebrow')}>
        {t('warning.text')}
      </ParadigmCallout>

      <p className="mt-6 font-serif italic text-lg md:text-xl">
        {t('closing')}
      </p>
    </ParadigmSection>
  );
}
