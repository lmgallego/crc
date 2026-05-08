import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('common');
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-[var(--accent-dark)]">
          00 — Bootstrap
        </p>
        <h1 className="font-serif text-5xl mt-4">{t('siteName')}</h1>
        <p className="font-sans mt-2 text-[var(--muted)]">{t('tagline')}</p>
      </div>
    </main>
  );
}
