# Catálogo de componentes — CRC Web

Lista de los componentes específicos del proyecto. Para cada uno: cuándo crearlo, dónde se usa, qué props recibe.

## Estructura de carpetas

```
components/
├── ui/                          ← shadcn (button, card, sheet, etc.)
├── blocks/                      ← composiciones específicas del CRC
│   ├── home/                    ← solo usados en home
│   │   ├── hero.tsx
│   │   ├── philosophy-tease.tsx
│   │   ├── services-block.tsx
│   │   ├── team-section.tsx
│   │   ├── publications-link.tsx
│   │   ├── blog-latest.tsx
│   │   └── contact-cta.tsx
│   ├── team/                    ← cards y bloques del equipo
│   │   ├── team-card.tsx
│   │   ├── featured-founder-card.tsx
│   │   └── member-hero.tsx
│   ├── shared/                  ← reutilizables en varias páginas
│   │   ├── site-nav.tsx
│   │   ├── site-footer.tsx
│   │   ├── locale-switcher.tsx
│   │   ├── logo-crc.tsx
│   │   ├── crc-monogram.tsx
│   │   ├── section-header.tsx
│   │   ├── data-strip.tsx
│   │   ├── data-stat.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── page-hero.tsx
│   │   └── highlight.tsx
│   └── philosophy/              ← específicos de filosofía
│       ├── paradigm-grid.tsx
│       ├── paradigm-section.tsx
│       ├── philosophy-timeline.tsx
│       └── principles-grid.tsx
└── blog/
    └── markdoc-components.tsx
```

## Componentes shared (reutilizables)

### `LogoCRC`

```tsx
<LogoCRC size="sm" | "md" | "lg" variant="default" | "inverse" />
```

Logo del CRC: círculo amarillo con silueta de ciclista en negro.

### `CRCMonogram`

```tsx
<CRCMonogram size="md" | "lg" />
```

Círculo negro con texto "CRC" en amarillo. Sello de cierre, distinto del logo.

### `SectionHeader`

```tsx
<SectionHeader
  number="01"          // mostrar "01 — XXXXX"
  eyebrow="Filosofía"  // texto del eyebrow
  title="Nuestra investigación"  // titular grande
  cta="Leer manifiesto →"  // opcional
  ctaHref="/filosofia"     // opcional
/>
```

Usado al principio de cada sección numerada en home, equipo, servicios, etc.

### `DataStrip` y `DataStat`

```tsx
<DataStrip>
  <DataStat label="PUBLICACIONES" value="100+" />
  <DataStat label="ÍNDICE H" value="18" />
</DataStrip>
```

Strip horizontal con estadísticas grandes. Auto-grid según número de hijos.

### `PageHero`

```tsx
<PageHero
  eyebrow="Filosofía"
  title="De Ciclismo 1.0 a Ciclismo 3.0"
  subtitle="..."
  highlightWord="3.0"  // opcional
/>
```

Hero estandar para páginas internas (NO la home).

### `Breadcrumb`

```tsx
<Breadcrumb items={[
  { label: 'Equipo', href: '/equipo' },
  { label: 'Mikel Zabala' }  // último sin href
]} />
```

Migas de pan en mono pequeño separadas por `/`.

### `Highlight`

```tsx
<h1>La ciencia detrás de <Highlight>cada vatio.</Highlight></h1>
```

Span con fondo amarillo CRC. Para destacar palabras dentro de un titular.

## Componentes específicos por sección

### `Hero` (home)

Sin props, lee mensajes de `home.hero`.

### `PhilosophyTease`

Sin props. Renderiza:
- 3 columnas con paradigmas 1.0, 2.0, 3.0.
- Timeline con 5 hitos.
- Pull quote.

### `ParadigmGrid`

```tsx
<ParadigmGrid /> // sin props, renderiza los 3 paradigmas en una fila
```

### `PhilosophyTimeline`

```tsx
<PhilosophyTimeline milestones={TIMELINE_MILESTONES} />
```

En desktop: timeline horizontal con puntos posicionados absolutamente.
En mobile: lista vertical con puntos a la izquierda.

### `ParadigmSection` (página filosofía)

```tsx
<ParadigmSection
  paradigm="1.0" | "2.0" | "3.0"
  variant="muted" | "default" | "accent"
  title="..."
  body="..."
  callout={...}
/>
```

### `ServicesBlock`

Lee de `lib/data/services.ts`, ordena por `order`, renderiza el destacado y los 3 stack.

### `TeamCard`

```tsx
<TeamCard
  member={teamMember}
  locale="es" | "en"
  variant="default" | "horizontal"
/>
```

`default`: card vertical con foto arriba.
`horizontal`: card con foto pequeña a la izquierda y texto a la derecha (la usada en home en grid de 9 miembros).

### `FeaturedFounderCard`

```tsx
<FeaturedFounderCard member={mikelZabala} locale="es" />
```

Bloque negro grande con foto a la izquierda, identidad a la derecha y grid 2x3 de credenciales.

### `MemberHero` (ficha individual)

```tsx
<MemberHero member={member} locale="es" />
```

Layout 280px + 1fr con la foto, contacto y datos del investigador.

### `BlogListItem`

```tsx
<BlogListItem post={post} />
```

Fila editorial: año / título / categoría / fecha.

### `PublicationItem`

```tsx
<PublicationItem publication={pub} />
```

Fila con metadatos del paper. Hover yellow subtle. Click → DOI/URL.

### `ContactCTA`

```tsx
<ContactCTA personalized="Mikel" />  // opcional, para fichas
```

Bloque amarillo grande de cierre. Si recibe `personalized`, cambia el copy a "¿Quieres colaborar con [nombre]?".

## Patrones recurrentes

### Layout 2 columnas con sticky sidebar

Usado en filosofía y fichas de equipo. La columna izquierda fina (180-280px) con label/título, la columna derecha ancha con contenido. La izquierda es `sticky` en desktop. En mobile las dos columnas se apilan.

```tsx
<div className="grid md:grid-cols-[200px_1fr] gap-10">
  <div className="md:sticky md:top-20 md:self-start">
    <div className="section-number">01</div>
    <div className="font-serif text-2xl mt-2">Biografía</div>
  </div>
  <div>{/* contenido */}</div>
</div>
```

### Tags pill horizontales

```tsx
<div className="flex flex-wrap gap-1.5">
  <Badge variant="outline">Fisiología</Badge>
  <Badge variant="outline">Biomecánica</Badge>
  <Badge variant="accent">Heat tolerance</Badge>  {/* destacado */}
</div>
```

### Tarjeta blanca con borde sutil

```tsx
<div className="bg-card border border-border rounded-md p-5">
  {/* contenido */}
</div>
```

### Bloque negro inverso

```tsx
<div className="bg-foreground text-background rounded-md p-7">
  {/* texto y elementos en blanco/amarillo */}
</div>
```

### Bloque amarillo CRC

```tsx
<div className="bg-accent text-accent-foreground rounded-md p-7 relative overflow-hidden">
  {/* opcional: SVG grid pattern decorativo */}
  {/* contenido */}
</div>
```

## Reglas de creación

1. **No crear hasta que se necesiten.** Si un componente solo se usa en una página, vive en `blocks/{página}/`. Solo subir a `shared/` cuando se use en 2+ páginas.
2. **Empezar por la home.** Muchos componentes nacen en la home y se promocionan a `shared/` cuando aparece la segunda página.
3. **Server components por defecto.** Solo añadir `'use client'` cuando haya estado, eventos o hooks.
4. **Recibir locale como prop** en lugar de llamar a `useLocale()` dentro. Excepción: en componentes que ya usan `useTranslations` no hace falta.
