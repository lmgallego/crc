import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Instrument_Serif, Geist, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SiteNav } from '@/components/blocks/shared/site-nav';
import { SiteFooter } from '@/components/blocks/shared/site-footer';
import '../globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        <NextIntlClientProvider>
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
