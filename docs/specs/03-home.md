# 03 — Home

La home reúne todo lo decidido. Es la pieza más larga, así que se construye sección a sección.

## Orden de secciones (de arriba a abajo)

1. Hero
2. 01 — Filosofía (variante C: tres números + timeline)
3. 02 — Servicios (Investigación destacado + 3 stack)
4. 03 — Equipo (Mikel destacado + grid 9)
5. 04 — Publicaciones (bloque-link)
6. 05 — Blog (lista de últimos 3)
7. 06 — Contacto (CTA amarillo)

## Sección Hero

### Desktop

```
┌────────────────────────────────────────────────────────────────────┐
│  — CYCLING RESEARCH CENTER · CIENCIA APLICADA AL CICLISMO         │
│                                                                    │
│  Investigamos                  Grupo de investigación en           │
│  cómo se gana                  ciencias del deporte...             │
│  ░░cada vatio.░░                                                   │
│                                [Conocer más →] [Contactar]         │
│                                                                    │
│ ──────────────────────────────────────────────────────────────────│
│  AÑOS EXPERIENCIA  PUBLICACIONES  CAMPEONES MUNDIALES  OLÍMPICOS  │
│  25+              100+            +                    +           │
└────────────────────────────────────────────────────────────────────┘
```

### Mobile

- El titular pasa a 48px y se reorganiza para que `cada vatio.` siga en línea propia con highlight.
- El subtítulo va debajo, no al lado.
- Stats pasan a 2 columnas (2x2).
- Curva de potencia decorativa: oculta en mobile.

### Implementación

`components/blocks/home/hero.tsx`:

```tsx
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Highlight } from '@/components/ui/highlight';

export function Hero() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-12 md:py-16">

        {/* Subtle SVG decoration (desktop only) */}
        <svg
          aria-hidden
          className="hidden md:block absolute top-0 right-0 w-72 h-full opacity-40 pointer-events-none"
          viewBox="0 0 280 400"
        >
          <defs>
            <pattern id="herogrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(14,14,12,0.08)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="280" height="400" fill="url(#herogrid)" />
          <path d="M 0 80 Q 40 95, 70 110 T 140 180 T 210 240 T 280 260" stroke="#0E0E0C" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M 0 80 Q 40 95, 70 110 T 140 180 T 210 240 T 280 260 L 280 400 L 0 400 Z" fill="#E8D24A" opacity="0.15" />
        </svg>

        <div className="section-number mb-6">— {t('eyebrow')}</div>

        <div className="grid md:grid-cols-[1fr_220px] gap-6 md:gap-8 items-end">
          <h1 className="font-serif text-[48px] md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
            {t.rich('title', {
              highlight: (chunks) => <Highlight>{chunks}</Highlight>,
              br: () => <br />,
            })}
          </h1>

          <div className="md:pb-3">
            <p className="font-serif text-sm md:text-[15px] leading-relaxed text-foreground/80 mb-4">
              {t('subtitle')}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="default" size="sm">{t('ctaPrimary')} →</Button>
              <Button variant="outline" size="sm">{t('ctaSecondary')}</Button>
            </div>
          </div>
        </div>

        <DataStrip />
      </div>
    </section>
  );
}

function DataStrip() {
  const t = useTranslations('home.hero.stats');
  return (
    <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 border-y border-border">
      <Stat label={t('experience')} value="25+" />
      <Stat label={t('publications')} value="100+" />
      <Stat label={t('worldChampions')} value="+" />
      <Stat label={t('olympicMedals')} value="+" />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="data-stat py-3.5 px-0 md:px-4 border-r border-border last:border-r-0 [&:nth-child(2)]:md:border-r [&:nth-child(2)]:max-md:border-r-0 [&:nth-child(2n)]:max-md:border-r-0 max-md:[&:nth-child(-n+2)]:border-b">
      <div className="data-label mb-1">{label}</div>
      <div className="font-serif text-3xl md:text-4xl leading-none">{value}</div>
    </div>
  );
}
```

### Mensajes para el hero

```json
"home": {
  "hero": {
    "eyebrow": "Cycling Research Center · Ciencia aplicada al ciclismo",
    "title": "Investigamos<br></br>cómo se gana<br></br><highlight>cada vatio.</highlight>",
    "subtitle": "Grupo de investigación en ciencias del deporte especializado en ciclismo. Coaching, investigación, training camps y formación bajo el paradigma <em>Ciclismo 3.0</em>.",
    "ctaPrimary": "Conocer el método",
    "ctaSecondary": "Contactar",
    "stats": {
      "experience": "Años de experiencia",
      "publications": "Publicaciones científicas",
      "worldChampions": "Campeones mundiales",
      "olympicMedals": "Medallas olímpicas"
    }
  }
}
```

## Sección 01 — Filosofía (Variante C)

`components/blocks/home/philosophy-tease.tsx`:

Renderiza:
1. Header "01 — FILOSOFÍA / El paradigma del CRC" + link "Leer manifiesto →"
2. 3 columnas con paradigmas 1.0 (gris), 2.0 (negro), 3.0 (amarillo)
3. Timeline grande con 5 hitos
4. Pull-quote final con cita de Zabala 2025

### Mobile

- Las 3 columnas pasan a stack vertical (1 columna, 3 filas).
- La timeline horizontal se transforma en lista vertical: cada hito ocupa una fila con punto a la izquierda y texto a la derecha.
- El pull-quote mantiene tamaño grande pero centrado.

### Estructura del componente

```tsx
export function PhilosophyTease() {
  return (
    <section className="border-t border-border">
      <div className="max-w-7xl mx-auto px-5 md:px-7 py-14 md:py-16">
        <SectionHeader number="01" eyebrow="Filosofía" title="El paradigma del CRC" cta="Leer manifiesto →" ctaHref="/filosofia" />
        <ParadigmGrid />
        <PhilosophyTimeline />
        <PhilosophyQuote />
      </div>
    </section>
  );
}
```

`ParadigmGrid` y `PhilosophyTimeline` son sub-componentes en el mismo archivo o separados.

### Datos de la timeline

```typescript
const TIMELINE_MILESTONES = [
  {
    period: '1990s—2000s',
    label: '1990s — 2000s',
    description: 'Escándalos de dopaje y crisis estructural del modelo Ciclismo 1.0.',
    paradigm: '1.0' as const,
    position: 0,
    size: 'md',
  },
  {
    period: '2012',
    label: '2012 · Nace el 2.0',
    description: 'Zabala & Atkinson formalizan el Athlete 2.0 en Journal of Science and Cycling.',
    paradigm: '2.0' as const,
    position: 33,
    size: 'lg',
    highlight: true,
  },
  {
    period: '~2020',
    label: '~2020',
    description: 'Irrupción de la IA generativa y modelos predictivos en el deporte.',
    paradigm: '2.0' as const,
    position: 60,
    size: 'sm',
  },
  {
    period: '2025',
    label: '2025 · Nace el 3.0',
    description: 'Zabala publica From Cycling 1.0 and 2.0 to Cycling 3.0.',
    paradigm: '3.0' as const,
    position: 85,
    size: 'lg',
    highlight: true,
  },
  {
    period: 'hoy',
    label: 'Hoy',
    description: '',
    paradigm: '3.0' as const,
    position: 100,
    size: 'sm',
  },
];
```

## Sección 02 — Servicios

`components/blocks/home/services-block.tsx`:

```
┌─────────────────────────────┬───────────────────────────────┐
│                             │  /02 COACHING                 │
│  ░░░░░░░░░░░░░░░░░░░░░░░    │  25+ años · WT · Campeones   │
│  ░░ /01 INVESTIGACIÓN ░░    ├───────────────────────────────┤
│  ░░ ANCLA AMARILLA   ░░    │  /03 TRAINING CAMPS           │
│  ░░ TAGS · CTA       ░░    │  Almería · Granada · Alicante │
│  ░░░░░░░░░░░░░░░░░░░░░░░    ├───────────────────────────────┤
│                             │  /04 FORMACIÓN                │
│                             │  Doctorado · Máster · UCI     │
└─────────────────────────────┴───────────────────────────────┘
```

### Mobile

- Investigación pasa a ancho completo arriba.
- Los otros 3 servicios apilados debajo en 1 columna, no 3.

### Datos de servicios

```typescript
// lib/data/services.ts
export const SERVICES = [
  {
    slug: 'investigacion',
    order: 1,
    featured: true,
    name: { es: 'Investigación', en: 'Research' },
    short: { es: '...', en: '...' },
    detail: { es: '...', en: '...' },
    tags: ['Fisiología', 'Biomecánica', 'Antidopaje', 'Psicología'],
    badge: '100+ PAPERS',
  },
  {
    slug: 'coaching',
    order: 2,
    featured: false,
    name: { es: 'Coaching', en: 'Coaching' },
    short: { es: '...', en: '...' },
    badge: 'CAMPEONES MUNDIALES Y OLÍMPICOS',
    metric: '25+ AÑOS',
  },
  // ...etc
];
```

## Sección 03 — Equipo

`components/blocks/home/team-section.tsx`:

Dos sub-bloques:

1. `FeaturedFounderCard` — bloque negro grande con Mikel Zabala. Foto a la izquierda, contenido a la derecha. En mobile, foto arriba a ancho completo, contenido debajo.
2. `TeamGrid` — grid 3×3 con los otros 9. En mobile pasa a 1 columna, en sm a 2.

Después una cita "¿Eres tú el siguiente?" centrada.

Datos en `lib/data/team.ts` (ver `docs/content/team.md` para los CVs completos del Word).

## Sección 04 — Publicaciones (link only)

```tsx
<section className="border-t border-border bg-foreground/[0.025]">
  <div className="max-w-7xl mx-auto px-5 md:px-7 py-10 md:py-12">
    <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center max-w-4xl mx-auto">
      <div>
        <div className="section-number mb-1.5">04 — Publicaciones</div>
        <h2 className="font-serif text-2xl md:text-3xl leading-[1.05] tracking-tight">
          <strong className="font-normal">100+</strong> artículos científicos<br className="hidden md:block" />
          publicados por el equipo.
        </h2>
        <p className="mt-2.5 text-sm text-foreground/70 leading-relaxed max-w-lg">
          Investigación en revistas de impacto en biomecánica, fisiología, nutrición, psicología y antidopaje aplicados al ciclismo.
        </p>
      </div>
      <Button asChild>
        <Link href="/publicaciones">Ver publicaciones →</Link>
      </Button>
    </div>
  </div>
</section>
```

## Sección 05 — Blog

Lista plana editorial de los últimos 3 artículos. Cada fila:

```
┌────────────────────────────────────────────────────────────┐
│ 2026 │ Título del artículo en serif       │ CATEGORÍA │ FECHA │
└────────────────────────────────────────────────────────────┘
```

En mobile: año + fecha pequeña arriba en una línea, título debajo a línea completa, categoría como badge pequeño al final.

## Sección 06 — Contacto

`components/blocks/home/contact-cta.tsx`:

Bloque amarillo a ancho completo. Texto enorme + CRC monograma circular a la derecha. En mobile: monograma centrado debajo del texto.

```tsx
<section className="bg-accent relative overflow-hidden">
  <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
    {/* SVG grid pattern */}
  </div>
  <div className="max-w-5xl mx-auto px-5 md:px-7 py-14 md:py-16 relative">
    <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
      <div>
        <div className="section-number mb-2.5">— Contacto</div>
        <h2 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight">
          {t.rich('home.contact.title', { em: (c) => <em>{c}</em>, br: () => <br /> })}
        </h2>
        <p className="mt-3.5 text-sm text-foreground/75 max-w-lg leading-relaxed">
          {t('home.contact.body')}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button>Hablemos →</Button>
          <Button variant="outline">info@crc.org</Button>
        </div>
      </div>
      <div className="self-center md:self-end">
        <CRCMonogram size="lg" />
      </div>
    </div>
  </div>
</section>
```

## Page principal — `app/[locale]/page.tsx`

```tsx
import { Hero } from '@/components/blocks/home/hero';
import { PhilosophyTease } from '@/components/blocks/home/philosophy-tease';
import { ServicesBlock } from '@/components/blocks/home/services-block';
import { TeamSection } from '@/components/blocks/home/team-section';
import { PublicationsLink } from '@/components/blocks/home/publications-link';
import { BlogLatest } from '@/components/blocks/home/blog-latest';
import { ContactCTA } from '@/components/blocks/home/contact-cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <PhilosophyTease />
      <ServicesBlock />
      <TeamSection />
      <PublicationsLink />
      <BlogLatest />
      <ContactCTA />
    </>
  );
}
```

## Verificación

- En 375px:
  - Nav muestra hamburguesa.
  - Hero: titular ~48px, subtítulo debajo, stats 2x2.
  - Filosofía: 3 paradigmas apilados, timeline vertical.
  - Servicios: investigación arriba ancho completo, 3 cards apiladas.
  - Equipo: Mikel apilado, grid 1 col.
  - Publicaciones: stack.
  - Blog: filas legibles.
  - Contacto: monograma debajo.
- `pnpm typecheck` ok.
- `pnpm lint` ok.

Próximo paso: `04-filosofia.md`.
