import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001';

export type Locale = 'es' | 'en';

type PathKey = keyof typeof routing.pathnames;

export function localizedPath(
  pathKey: PathKey,
  locale: Locale,
  params?: Record<string, string>,
): string {
  const entry = routing.pathnames[pathKey];
  let pathname: string =
    typeof entry === 'string' ? entry : (entry as Record<Locale, string>)[locale];
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      pathname = pathname.replace(`[${k}]`, v);
    }
  }
  const prefix = locale === 'en' ? '/en' : '';
  if (pathname === '/') return prefix === '' ? '/' : prefix;
  return prefix + pathname;
}

export function generatePageMetadata({
  locale,
  pathKey,
  params,
  title,
  description,
}: {
  locale: Locale;
  pathKey: PathKey;
  params?: Record<string, string>;
  title: string;
  description: string;
}): Metadata {
  const esPath = localizedPath(pathKey, 'es', params);
  const enPath = localizedPath(pathKey, 'en', params);
  const currentPath = locale === 'es' ? esPath : enPath;
  const url = `${BASE_URL}${currentPath}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        es: `${BASE_URL}${esPath}`,
        en: `${BASE_URL}${enPath}`,
        'x-default': `${BASE_URL}${esPath}`,
      },
    },
  };
}
