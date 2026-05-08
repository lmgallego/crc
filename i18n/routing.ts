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
    '/servicios': { es: '/servicios', en: '/services' },
    '/servicios/coaching': {
      es: '/servicios/coaching',
      en: '/services/coaching',
    },
    '/servicios/investigacion': {
      es: '/servicios/investigacion',
      en: '/services/research',
    },
    '/servicios/training-camps': {
      es: '/servicios/training-camps',
      en: '/services/training-camps',
    },
    '/servicios/formacion': {
      es: '/servicios/formacion',
      en: '/services/education',
    },
    '/equipo': {
      es: '/equipo',
      en: '/team',
    },
    '/equipo/[slug]': {
      es: '/equipo/[slug]',
      en: '/team/[slug]',
    },
    '/publicaciones': { es: '/publicaciones', en: '/publications' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/contacto': '/contacto',
  },
});
