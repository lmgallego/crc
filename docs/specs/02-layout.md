# 02 — Layout base (Nav + Footer)

El layout es persistente en todas las páginas. Importante hacerlo bien una vez.

## SiteNav — `components/blocks/site-nav.tsx`

### Desktop

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│  [LogoCRC] Cycling Research      Filosofía  Servicios  Equipo  Pubs  Blog  Contacto │
│            Center                                                       ES | EN     │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

- Altura: 64px
- Padding lateral: 28px (`px-7`)
- Border-bottom: 0.5px de `--color-border`
- Sticky: sí (`sticky top-0 z-50`)
- Background: `--color-background` con `backdrop-blur-sm`

### Mobile (< 768px)

```
┌────────────────────────────┐
│  [LogoCRC]  CRC      [☰]  │
└────────────────────────────┘
```

Al pulsar el icono, se abre un `Sheet` desde la derecha con:

- Lista vertical de los 6 enlaces (cada uno 56px de alto)
- Selector ES/EN al fondo
- Botón X para cerrar arriba

### Implementación

```tsx
'use client';

import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { LogoCRC } from './logo-crc';
import { LocaleSwitcher } from './locale-switcher';

const NAV_ITEMS = [
  { href: '/filosofia', key: 'filosofia' },
  { href: '/servicios', key: 'servicios' },
  { href: '/equipo', key: 'equipo' },
  { href: '/publicaciones', key: 'publicaciones' },
  { href: '/blog', key: 'blog' },
  { href: '/contacto', key: 'contacto' },
] as const;

export function SiteNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <LogoCRC size="md" />
          <div className="hidden sm:block">
            <div className="text-[11px] font-bold uppercase tracking-wide leading-none">
              Cycling Research
            </div>
            <div className="text-[10px] text-muted uppercase tracking-wide leading-tight mt-0.5">
              Center
            </div>
          </div>
          <div className="sm:hidden text-xs font-bold uppercase tracking-wide">CRC</div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-5 lg:gap-6 text-xs">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={
                  isActive
                    ? 'text-foreground font-semibold'
                    : 'text-muted hover:text-foreground transition-colors'
                }
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LocaleSwitcher />
          </div>

          {/* Mobile hamburguer */}
          <Sheet>
            <SheetTrigger className="md:hidden p-2" aria-label="Abrir menú">
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-1 mt-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="py-3 px-2 text-base font-medium border-b border-border-subtle"
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>
              <div className="mt-8 pt-8 border-t border-border">
                <LocaleSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
```

## LocaleSwitcher — `components/blocks/locale-switcher.tsx`

Selector entre ES y EN. Mantiene la ruta actual.

```tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: 'es' | 'en') => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className="flex items-center gap-2 text-[11px] font-mono">
      <button
        onClick={() => switchTo('es')}
        disabled={isPending}
        className={locale === 'es' ? 'font-bold text-foreground' : 'text-muted-light hover:text-foreground'}
      >
        ES
      </button>
      <span className="text-muted-light">·</span>
      <button
        onClick={() => switchTo('en')}
        disabled={isPending}
        className={locale === 'en' ? 'font-bold text-foreground' : 'text-muted-light hover:text-foreground'}
      >
        EN
      </button>
    </div>
  );
}
```

## SiteFooter — `components/blocks/site-footer.tsx`

### Desktop

Fondo negro (`#0E0E0C`), texto crema. Cuatro columnas:

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│  [Logo + tagline]    SECCIONES   SERVICIOS   CONTACTO            │
│                      Filosofía   Coaching    info@crc.org        │
│                      Servicios   Investig.   ORCID               │
│                      Equipo      Camps       Scholar             │
│                      Pubs        Formación   LinkedIn            │
│                      Blog                                         │
│                                                                   │
│ ─────────────────────────────────────────────────────────────────│
│                                                                   │
│ © CRC 2026   UNIV. GRANADA · BARCELONA · ALICANTE   ESPAÑA       │
└──────────────────────────────────────────────────────────────────┘
```

### Mobile

Una sola columna, todo apilado, mismo orden.

### Implementación

```tsx
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LogoCRC } from './logo-crc';

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-3">
              <LogoCRC size="sm" />
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide leading-none text-background">
                  Cycling Research
                </div>
                <div className="text-[10px] text-background/60 uppercase tracking-wide mt-0.5">
                  Center
                </div>
              </div>
            </div>
            <p className="font-serif italic text-sm leading-relaxed text-background/65 max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Sections */}
          <div className="md:col-span-3">
            <div className="text-accent text-[10px] font-mono uppercase tracking-wider mb-2.5">
              {t('footer.sectionsTitle')}
            </div>
            <ul className="space-y-2 text-xs text-background/70">
              <li><Link href="/filosofia">{t('nav.filosofia')}</Link></li>
              <li><Link href="/servicios">{t('nav.servicios')}</Link></li>
              <li><Link href="/equipo">{t('nav.equipo')}</Link></li>
              <li><Link href="/publicaciones">{t('nav.publicaciones')}</Link></li>
              <li><Link href="/blog">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-2">
            <div className="text-accent text-[10px] font-mono uppercase tracking-wider mb-2.5">
              {t('footer.servicesTitle')}
            </div>
            <ul className="space-y-2 text-xs text-background/70">
              <li><Link href="/servicios/coaching">Coaching</Link></li>
              <li><Link href="/servicios/investigacion">{t('services.research')}</Link></li>
              <li><Link href="/servicios/training-camps">Training Camps</Link></li>
              <li><Link href="/servicios/formacion">{t('services.education')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <div className="text-accent text-[10px] font-mono uppercase tracking-wider mb-2.5">
              {t('footer.contactTitle')}
            </div>
            <ul className="space-y-2 text-xs text-background/70">
              <li><a href="mailto:info@crc.org">info@crc.org</a></li>
              <li><a href="#">ORCID</a></li>
              <li><a href="#">Google Scholar</a></li>
              <li><a href="#">LinkedIn</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-5 border-t border-background/15 flex flex-col md:flex-row justify-between gap-2 font-mono text-[10px] uppercase tracking-wider text-background/40">
          <span>© Cycling Research Center 2026</span>
          <span className="hidden md:inline">Univ. Granada · Barcelona · Alicante</span>
          <span>España</span>
        </div>
      </div>
    </footer>
  );
}
```

## Layout aplicado — `app/[locale]/layout.tsx`

Añadir SiteNav y SiteFooter al layout creado en el bootstrap:

```tsx
// (resto del layout del bootstrap)

return (
  <html lang={locale} className={...}>
    <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
      <NextIntlClientProvider>
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </NextIntlClientProvider>
    </body>
  </html>
);
```

## Mensajes nuevos a añadir

`messages/es.json`:

```json
{
  "footer": {
    "tagline": "Ciencia aplicada al ciclismo. Bajo el paradigma Ciclismo 3.0: datos con ética por diseño.",
    "sectionsTitle": "Secciones",
    "servicesTitle": "Servicios",
    "contactTitle": "Contacto"
  },
  "services": {
    "research": "Investigación",
    "education": "Formación"
  }
}
```

`messages/en.json`:

```json
{
  "footer": {
    "tagline": "Science applied to cycling. Under the Cycling 3.0 paradigm: data with ethics by design.",
    "sectionsTitle": "Sections",
    "servicesTitle": "Services",
    "contactTitle": "Contact"
  },
  "services": {
    "research": "Research",
    "education": "Education"
  }
}
```

## Verificación mobile

- Nav: hamburguesa funciona, abre el sheet, los links navegan correctamente.
- Footer: una columna, todo legible, no hay scroll horizontal.
- Logo en nav: aparece visible, "CRC" abreviado en móvil.
- LocaleSwitcher: cambia idioma sin perder la página actual.

Próximo paso: `03-home.md`.
