# Cycling Research Center — Web Project

> Este archivo es la memoria persistente del proyecto. Léelo siempre antes de empezar cualquier tarea.

## Qué es el CRC

El **Cycling Research Center (CRC)** es un grupo de investigación en ciencias del deporte especializado en ciclismo, dirigido por Mikel Zabala (Catedrático UGR, ex-Movistar Team, autor del paradigma "Ciclismo 3.0"). El equipo lo forman 10 investigadores con formación doctoral.

La web sirve cuatro funciones de negocio:
1. **Investigación** (más visible) — comunicar el trabajo científico
2. **Coaching** — captar ciclistas profesionales y equipos
3. **Training Camps** — concentraciones en Almería, Granada, Alicante
4. **Formación** — cursos federativos, mentorización, universidad

Identidad fuerte: paradigma propio del **Ciclismo 1.0 → 2.0 → 3.0** (formulado por Zabala), que es la mayor ventaja narrativa del sitio.

## Stack técnico (obligatorio, ya decidido)

- **Next.js 15** con App Router y React Server Components
- **TypeScript** estricto
- **Tailwind CSS v4** (nuevo motor)
- **shadcn/ui** como base de componentes
- **Keystatic** como CMS para `/blog`
- **next-intl** para i18n (ES/EN)
- **next-themes** — NO instalar. **No hay modo oscuro.** El sitio es solo modo claro.
- **Motion** (antes Framer Motion) para animaciones
- **Lenis** para smooth scroll
- **Lucide React** para iconos
- **Recharts** para visualizaciones de datos
- **MDX** dentro de Keystatic para artículos del blog

## Reglas de diseño (no negociables)

### Paleta — `app/globals.css`

```css
:root {
  --background: #F8F8F6;        /* blanco roto */
  --foreground: #0E0E0C;        /* negro tinta */
  --accent: #E8D24A;            /* amarillo CRC oficial */
  --accent-foreground: #0E0E0C;
  --accent-dark: #8A7400;       /* amarillo desaturado para metadatos */
  --muted: #6A6A60;             /* texto secundario */
  --muted-light: #C8C5BA;       /* gris para "lo que dejamos atrás" */
  --border: rgba(14, 14, 12, 0.12);
  --border-subtle: rgba(14, 14, 12, 0.08);
}
```

**Nada de modo oscuro.** No añadas `.dark` ni clases dark:. Si shadcn los genera, elimínalos.

### Tipografía

- **Display / titulares** → `Instrument Serif` (Google Fonts). Usar para H1, H2, citas, nombres de investigadores, números grandes.
- **Cuerpo / UI** → `Geist Sans` o `Inter` (Google Fonts). Usar para body, navegación, párrafos.
- **Datos / metadatos** → `JetBrains Mono` (Google Fonts). Usar para etiquetas, fechas, coordenadas, números pequeños, badges.

Configurar las tres con `next/font/google` en `app/[locale]/layout.tsx`.

### Principios visuales

1. **Jerarquía editorial.** Titulares enormes serif en cursiva con highlight amarillo selectivo. Mucho aire blanco.
2. **Numeración de secciones.** Cada sección de la home lleva `01 — FILOSOFÍA`, `02 — SERVICIOS`, etc. Tipografía mono, color `--accent-dark`, letter-spacing 0.15em.
3. **Highlight amarillo.** Solo en momentos específicos: una palabra del titular del hero, la frase clave de citas, la tarjeta destacada de servicios, el bloque de cierre. NUNCA usar amarillo como fondo de body o como fondo de párrafos largos.
4. **Logo CRC.** Círculo amarillo con silueta de ciclista en negro. Disponible en `public/logo.svg`. Aparece pequeño en nav y grande en el bloque de cierre como monograma CRC sobre círculo negro.
5. **Cero emojis.** Cero ilustraciones decorativas. Patterns de cuadrícula sutil ok.
6. **Bordes finos** (0.5px o 1px), nunca gruesos. Border-radius pequeño (4-6px) o nulo para elementos editoriales.

### Componentes shadcn a instalar

```bash
npx shadcn@latest add button badge card separator
npx shadcn@latest add navigation-menu sheet dropdown-menu
npx shadcn@latest add tabs accordion
```

NO instalar `dark-mode-toggle`, `theme-provider` ni similares.

## Internacionalización (ES/EN)

- **Idioma por defecto: ES.** EN es secundario.
- Estructura de rutas: `app/[locale]/...` con locales `['es', 'en']`.
- Mensajes en `messages/es.json` y `messages/en.json`.
- El contenido del blog (Keystatic) tiene campo de idioma — NO traducir automáticamente, cada artículo se escribe manualmente en cada idioma.
- Las publicaciones científicas NO se traducen (mantener título y revista en idioma original).
- Los CVs del equipo se mantienen en ES como fuente y se traduce solo lo "narrativo" (rol, descripción corta).

## Vista móvil — máxima prioridad

Todas las páginas DEBEN funcionar perfectamente en móvil. Reglas:

- **Mobile-first**: escribir CSS desde 320px hacia arriba con breakpoints `sm:`, `md:`, `lg:`.
- **Breakpoints**: 640px (sm), 768px (md), 1024px (lg), 1280px (xl).
- **El nav en móvil** se transforma en hamburguesa con `Sheet` de shadcn — NUNCA scroll horizontal.
- **El hero en móvil** apila el titular sobre el subtítulo, los stats pasan a 2 columnas en lugar de 4.
- **La timeline de filosofía** en móvil se transforma en lista vertical con los hitos uno debajo de otro (no horizontal).
- **El bloque destacado de servicios** ocupa ancho completo arriba, los 3 stacks debajo.
- **El bloque de Mikel Zabala** apila foto arriba y contenido debajo en móvil.
- **El grid de 9 miembros** pasa a 1 columna en móvil, 2 en sm, 3 en md+.
- **Los números grandes serif** se reducen pero mantienen impacto: H1 de 76px en desktop → 48px en móvil.
- **Tap targets**: mínimo 44px de altura para botones y enlaces interactivos.

Cada componente se prueba en Chrome DevTools con perfil iPhone SE (375×667) antes de marcar como completado.

## Estructura del sitio

```
/                          → Home
/filosofia                 → Manifiesto Ciclismo 1.0 → 3.0 (página completa)
/ciclista-3-0              → Quién es el Ciclista 3.0
/servicios                 → Hub
  /servicios/coaching
  /servicios/investigacion
  /servicios/training-camps
  /servicios/formacion
/equipo                    → Listado de los 10 miembros
  /equipo/[slug]           → Ficha individual
/publicaciones             → Listado filtrable
/blog                      → Keystatic
  /blog/[slug]
/contacto
```

Todas las páginas viven dentro de `app/[locale]/...` y existen en versión `es` y `en`.

## Decisiones de contenido

- **El equipo en home**: Mikel Zabala destacado en bloque negro grande tipo "fundador". Los otros 9 en grid 3×3 debajo (1×9 en móvil).
- **Las publicaciones en home**: NO se muestran papers individuales en home. Solo un bloque-link que dice "100+ publicaciones científicas" con CTA a `/publicaciones`.
- **El tease de filosofía en home**: Variante C — tres números 1.0/2.0/3.0 + timeline temporal grande con 5 hitos (1990s, 2012, ~2020, 2025, HOY).
- **Servicios en home**: Investigación destacado a la izquierda en tarjeta amarilla grande. Coaching, Training Camps y Formación apilados a la derecha en tarjetas blancas.
- **Hero**: titular grande tipográfico + stats + curva de potencia sutil en esquina. El claim principal está pendiente de confirmar con el cliente — usar provisionalmente "Investigamos cómo se gana **cada vatio**".

## Lo que está en `docs/`

- `docs/specs/` — una página por cada ruta del sitio con su layout, secciones y comportamiento responsive.
- `docs/design/tokens.md` — todos los tokens CSS y reglas tipográficas.
- `docs/design/components.md` — patrones reutilizables (TeamCard, ServiceCard, etc.) que se construyen una vez y se reutilizan.
- `docs/content/` — todos los textos del CRC organizados, listos para volcar a `messages/es.json` o componentes.

Lee siempre `docs/specs/{página}.md` antes de implementar una página.

## Workflow recomendado

1. **Empezar siempre por leer este archivo y el spec correspondiente** en `docs/specs/`.
2. **Crear primero los componentes base** en `components/ui/` (extender shadcn) y `components/blocks/` (composiciones específicas).
3. **Construir páginas** combinando blocks. Las páginas son "tontas", los blocks contienen la lógica.
4. **Probar mobile primero** en cada commit.
5. **Mantener consistencia con la home** — si dudas sobre tipografía, espaciado o color en una página nueva, mira primero la home.

## Comandos útiles del proyecto

```bash
pnpm dev                  # Desarrollo en localhost:3000
pnpm build                # Build de producción
pnpm lint                 # ESLint
pnpm typecheck            # TypeScript check
pnpm keystatic            # Abrir el CMS en /keystatic
```

## Errores frecuentes a evitar

- **No usar `<a>` para navegación interna.** Usar `Link` de `next/link` con el wrapper de `next-intl`.
- **No traducir publicaciones científicas.** Quedan en idioma original.
- **No invertir colores para "modo oscuro" en una sección.** El bloque negro de Mikel Zabala y el footer son intencionales — no es modo oscuro, es contraste editorial.
- **No usar `lorem ipsum`.** Todo el contenido real está en `docs/content/`.
- **No instalar `next-themes`.** No hay modo oscuro.
- **No usar emojis en la UI** (sí en commits si quieres).
- **No improvisar paletas.** Solo los tokens definidos arriba.
- **No usar `Image` de Next sin width/height** o `fill` con contenedor relative.

## Cuando termines una tarea

Antes de decir "está listo":

1. ¿Funciona en mobile (375px)? Probar en DevTools.
2. ¿Pasa `pnpm lint` y `pnpm typecheck`?
3. ¿Está traducido a EN si era una pieza con texto?
4. ¿Las imágenes tienen `alt` accesible?
5. ¿Los enlaces externos abren en `_blank` con `rel="noopener"`?

## Contactos / fuentes de verdad

- Cliente: el grupo CRC (ver miembros en `docs/content/team.md`).
- Documento original con todos los textos: `docs/content/source-text.md`.
- Logo del CRC: `public/logo.svg` (círculo amarillo con ciclista en negro).
- Identidad: amarillo `#E8D24A` + negro `#0E0E0C` + blanco roto `#F8F8F6`.
