import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/filosofia': {
      es: '/filosofia',
      en: '/philosophy',
    },
    '/servicios': '/servicios',
    '/servicios/coaching': '/servicios/coaching',
    '/servicios/investigacion': '/servicios/investigacion',
    '/servicios/training-camps': '/servicios/training-camps',
    '/servicios/formacion': '/servicios/formacion',
    '/equipo': {
      es: '/equipo',
      en: '/team',
    },
    '/equipo/[slug]': {
      es: '/equipo/[slug]',
      en: '/team/[slug]',
    },
    '/publicaciones': '/publicaciones',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contacto': '/contacto',
  },
});
