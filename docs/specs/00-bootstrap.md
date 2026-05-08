# 00 — Bootstrap del proyecto

Este es el primer spec. Su objetivo: dejar el proyecto Next.js arrancando con todas las dependencias, fuentes, configuraciones e i18n funcionando, antes de tocar diseño.

## Pasos

### 1. Inicializar Next.js 15

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir false \
  --import-alias "@/*" \
  --eslint
```

Cuando pregunte por Turbopack, **sí**.

### 2. Limpiar lo que no se usa

- Borrar el contenido de `app/page.tsx` y reemplazar con un placeholder mínimo.
- Borrar `app/globals.css` y crear uno nuevo (lo definimos en spec 01).
- Borrar el favicon por defecto y dejar uno propio del CRC en `app/favicon.ico` (lo daremos después).

### 3. Instalar dependencias

```bash
pnpm add next-intl
pnpm add motion
pnpm add @studio-freight/lenis
pnpm add lucide-react
pnpm add class-variance-authority clsx tailwind-merge
pnpm add @keystatic/core @keystatic/next
pnpm add recharts
pnpm add -D @types/node
```

NO instalar `next-themes`. NO añadir nada relacionado con dark mode.

### 4. Configurar shadcn/ui

```bash
npx shadcn@latest init
```

Cuando pregunte:
- Style: **Default**
- Base color: **Stone** (lo customizaremos con nuestros tokens)
- CSS variables: **Yes**

Después instalar componentes base:

```bash
npx shadcn@latest add button badge card separator
npx shadcn@latest add navigation-menu sheet dropdown-menu
npx shadcn@latest add tabs accordion
```

**IMPORTANTE**: en `components.json`, asegurar que `tailwind.cssVariables` apunta a nuestros tokens y NO genera variables `dark`.

### 5. Configurar next-intl

Estructura de carpetas:

```
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── globals.css
└── favicon.ico

i18n/
├── routing.ts
├── request.ts
└── navigation.ts

messages/
├── es.json
└── en.json

middleware.ts
```

Crear `i18n/routing.ts`:

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed', // / para ES, /en para EN
});
```

Crear `i18n/navigation.ts`:

```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

Crear `i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

Crear `middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

Configurar `next.config.ts`:

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // resto de la config
};

export default withNextIntl(nextConfig);
```

### 6. Layout raíz con providers

`app/[locale]/layout.tsx`:

```typescript
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Instrument_Serif, Geist, JetBrains_Mono } from 'next/font/google';
import { routing } from '@/i18n/routing';
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
    <html lang={locale} className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### 7. Mensajes iniciales

`messages/es.json`:

```json
{
  "common": {
    "siteName": "Cycling Research Center",
    "siteShortName": "CRC",
    "tagline": "Ciencia aplicada al ciclismo"
  },
  "nav": {
    "filosofia": "Filosofía",
    "servicios": "Servicios",
    "equipo": "Equipo",
    "publicaciones": "Publicaciones",
    "blog": "Blog",
    "contacto": "Contacto"
  }
}
```

`messages/en.json`:

```json
{
  "common": {
    "siteName": "Cycling Research Center",
    "siteShortName": "CRC",
    "tagline": "Science applied to cycling"
  },
  "nav": {
    "filosofia": "Philosophy",
    "servicios": "Services",
    "equipo": "Team",
    "publicaciones": "Publications",
    "blog": "Blog",
    "contacto": "Contact"
  }
}
```

### 8. Verificación

```bash
pnpm dev
```

- `http://localhost:3000` → debe redirigir o renderizar en español.
- `http://localhost:3000/en` → debe renderizar en inglés.
- `pnpm typecheck` → sin errores.
- `pnpm lint` → sin errores.

### 9. Git inicial

```bash
git init
git add .
git commit -m "chore: bootstrap project"
```

## Resultado esperado

- Proyecto Next.js 15 corriendo localmente.
- next-intl funcionando con ES por defecto y EN secundario.
- Tailwind v4 + shadcn instalado.
- 3 fuentes Google cargadas (Instrument Serif, Geist, JetBrains Mono).
- Página inicial vacía pero sin errores.

Próximo paso: `01-design-system.md`.
