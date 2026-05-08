# 01 — Sistema de diseño

Define los tokens, tipografía y utilidades base. Todo lo que sigue se construye sobre esto.

## 1. `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-background: #F8F8F6;
  --color-foreground: #0E0E0C;
  --color-accent: #E8D24A;
  --color-accent-foreground: #0E0E0C;
  --color-accent-dark: #8A7400;
  --color-muted: #6A6A60;
  --color-muted-light: #C8C5BA;
  --color-card: #FFFFFF;
  --color-border: rgba(14, 14, 12, 0.12);
  --color-border-subtle: rgba(14, 14, 12, 0.08);
  --color-inverse: #0E0E0C;
  --color-inverse-foreground: #F8F8F6;

  /* Fonts */
  --font-serif: var(--font-serif);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);

  /* Spacing escala editorial */
  --spacing-section: 56px;
  --spacing-section-lg: 72px;
}

/* Base styles */
* {
  border-color: var(--color-border);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Utility: editorial highlight (yellow marker) */
.text-highlight {
  background: var(--color-accent);
  padding: 0 0.3em;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

/* Utility: section number (mono, uppercase, accent-dark) */
.section-number {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--color-accent-dark);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Utility: data label (mono, uppercase, muted) */
.data-label {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--color-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Utility: drop cap (used in long-form articles and bio) */
.drop-cap::first-letter {
  font-family: var(--font-serif);
  font-size: 4em;
  line-height: 0.85;
  float: left;
  padding: 0.1em 0.15em 0 0;
  font-weight: 500;
}
```

## 2. Tipografía — escalas mobile-first

Crear `lib/typography.ts` o usar directamente clases utility. Recomendado: definir variantes con CVA.

| Componente | Mobile | Tablet (sm) | Desktop (md+) |
|---|---|---|---|
| H1 hero | 48px | 64px | 76px |
| H1 página | 40px | 52px | 60px |
| H2 sección | 28px | 32px | 36px |
| H3 | 22px | 26px | 28px |
| Body | 14px | 14px | 14px |
| Body large | 15px | 16px | 17px |
| Mono small | 9-10px | 9-10px | 9-10px |

Todos los H1/H2/H3 usan `font-serif` (Instrument Serif) excepto el `data-label` que usa mono.

## 3. Componentes base — `components/ui/`

shadcn ya instala estos. Hay que ajustar los siguientes para nuestra paleta:

### `Button`

Override de variantes en `components/ui/button.tsx`:

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-xs font-semibold transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline: "border border-border text-foreground hover:bg-foreground/5",
        ghost: "text-foreground hover:bg-foreground/5",
        link: "text-accent-dark underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-12 px-6 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);
```

### `Badge`

Variantes específicas:

```typescript
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-card border-border text-foreground",
        accent: "bg-accent border-accent/50 text-accent-foreground",
        outline: "border-border text-muted",
      },
    },
  }
);
```

## 4. Componentes block — `components/blocks/`

Estos son específicos del CRC. Crearlos cuando hagan falta:

| Block | Usado en | Descripción |
|---|---|---|
| `SiteNav` | layout | Nav superior con logo, links y selector ES/EN |
| `SiteFooter` | layout | Footer negro con 4 columnas |
| `LogoCRC` | nav, footer, cierre | SVG del logo en variantes pequeño/grande |
| `SectionHeader` | todas las secciones | Número + título serif (`01 — FILOSOFÍA / Nuestra investigación`) |
| `DataStrip` | hero home, perfiles | Strip horizontal de stats grandes |
| `TeamCard` | home, /equipo | Card con foto + número dorsal + rol + nombre |
| `FeaturedFounderCard` | home | Bloque negro grande para Mikel Zabala |
| `ParadigmColumn` | filosofía | Columna 1.0 / 2.0 / 3.0 |
| `PhilosophyTimeline` | home, /filosofia | Timeline horizontal con hitos |
| `ServiceCard` | home, /servicios | Card de servicio con tags |
| `BlogListItem` | home, /blog | Fila de artículo (año / título / categoría / fecha) |
| `PublicationItem` | /publicaciones | Fila de paper con metadatos |
| `ContactCTA` | home, otras | Bloque amarillo con CRC monograma |
| `PageHero` | filosofía, equipo, servicios | Hero secundario para páginas internas |

## 5. Logo CRC — `components/blocks/logo-crc.tsx`

```typescript
type Size = 'sm' | 'md' | 'lg';

export function LogoCRC({ size = 'md', variant = 'default' }: {
  size?: Size;
  variant?: 'default' | 'inverse';
}) {
  const dimensions = { sm: 32, md: 36, lg: 48 }[size];
  const ringColor = variant === 'inverse' ? '#0E0E0C' : '#E8D24A';
  const figureColor = variant === 'inverse' ? '#E8D24A' : '#0E0E0C';

  return (
    <div
      className="rounded-full flex items-center justify-center"
      style={{
        width: dimensions,
        height: dimensions,
        background: ringColor,
      }}
    >
      <svg
        width={dimensions * 0.6}
        height={dimensions * 0.6}
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden
      >
        {/* Silueta simplificada del ciclista */}
        <path
          d="M5 14 Q 6 10, 9 9 L 12 6 Q 13 5, 14 5.5 Q 15 6, 14.5 7 L 13 9 L 15 11 L 17 13"
          stroke={figureColor}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="13" cy="6" r="1.6" fill={figureColor} />
      </svg>
    </div>
  );
}
```

> **Nota**: el logo SVG real lo proporcionará el cliente. Hasta entonces, esta versión sintética sirve como placeholder fiel al original.

## 6. Highlight amarillo

Componente helper para el highlight del titular:

```typescript
export function Highlight({ children }: { children: React.ReactNode }) {
  return <span className="text-highlight">{children}</span>;
}
```

Uso:

```tsx
<h1>
  La ciencia detrás de <Highlight>cada vatio.</Highlight>
</h1>
```

## 7. Verificación

Crear una página `/style-guide` (solo accesible en dev) que muestre:

- Toda la paleta con sus tokens.
- Las 3 tipografías en sus pesos disponibles.
- Todos los componentes del paso 4 con sus variantes.
- La escala tipográfica en mobile (375px) y desktop.

Esto sirve como referencia visual durante todo el desarrollo.

## Resultado esperado

Sistema de diseño funcionando, todos los tokens accesibles vía Tailwind, fuentes cargadas, components base listos. La home se podrá construir directamente con estos pieces.

Próximo paso: `02-layout.md`.
