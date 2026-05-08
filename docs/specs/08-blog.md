# 08 — Blog con Keystatic (`/blog`)

CMS local-first para que el equipo del CRC pueda publicar artículos sin tocar código. Los artículos se guardan en Markdown/MDX dentro del repo.

## Setup de Keystatic

### 1. Configuración

`keystatic.config.tsx`:

```typescript
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',  // En producción se cambia a 'github'
  },
  ui: {
    brand: { name: 'Cycling Research Center' },
  },
  collections: {
    posts_es: collection({
      label: 'Artículos (ES)',
      slugField: 'title',
      path: 'content/posts/es/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Título' } }),
        publishedAt: fields.date({ label: 'Fecha de publicación' }),
        category: fields.select({
          label: 'Categoría',
          options: [
            { label: 'Fisiología', value: 'physiology' },
            { label: 'Biomecánica', value: 'biomechanics' },
            { label: 'Nutrición', value: 'nutrition' },
            { label: 'Entrenamiento', value: 'training' },
            { label: 'Ciclismo 3.0', value: 'cycling-3-0' },
            { label: 'Antidopaje', value: 'doping' },
            { label: 'Equipo', value: 'team' },
          ],
          defaultValue: 'training',
        }),
        author: fields.select({
          label: 'Autor',
          options: [
            { label: 'Mikel Zabala', value: 'mikel-zabala' },
            { label: 'Manuel Mateo-March', value: 'manuel-mateo-march' },
            { label: 'Daniel Sanabria', value: 'daniel-sanabria' },
            { label: 'Cristóbal Sánchez-Muñoz', value: 'cristobal-sanchez-munoz' },
            { label: 'Alejandro Javaloyes', value: 'alejandro-javaloyes' },
            { label: 'José Joaquín Muros', value: 'jose-joaquin-muros' },
            { label: 'Juan José Pérez Díaz', value: 'juan-jose-perez-diaz' },
            { label: 'Alejandro de Rozas', value: 'alejandro-de-rozas' },
            { label: 'Xabier Zabala', value: 'xabier-zabala' },
            { label: 'Ignacio Valdivia', value: 'ignacio-valdivia' },
          ],
          defaultValue: 'mikel-zabala',
        }),
        excerpt: fields.text({ label: 'Resumen (1-2 frases)', multiline: true }),
        coverImage: fields.image({
          label: 'Imagen de portada',
          directory: 'public/blog',
          publicPath: '/blog',
        }),
        relatedPublications: fields.array(
          fields.text({ label: 'DOI o URL del paper relacionado' }),
          { label: 'Publicaciones relacionadas' }
        ),
        content: fields.markdoc({
          label: 'Contenido',
          options: {
            image: { directory: 'public/blog', publicPath: '/blog' },
          },
        }),
      },
    }),
    posts_en: collection({
      label: 'Posts (EN)',
      slugField: 'title',
      path: 'content/posts/en/*',
      format: { contentField: 'content' },
      schema: {
        // mismo schema, en inglés
      },
    }),
  },
});
```

### 2. Ruta del CMS

`app/keystatic/[[...params]]/page.tsx`:

```typescript
import { makePage } from '@keystatic/next/ui/app';
import config from '@/keystatic.config';

export default makePage(config);
```

`app/api/keystatic/[...params]/route.ts`:

```typescript
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const { POST, GET } = makeRouteHandler({ config });
```

Acceso: `http://localhost:3000/keystatic`.

### 3. .gitignore

NO ignorar `content/posts/`. Los artículos deben ir al repo.

## Lectura de posts en Next.js

Helper en `lib/keystatic/reader.ts`:

```typescript
import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export const reader = createReader(process.cwd(), keystaticConfig);

export async function getPosts(locale: 'es' | 'en') {
  const collection = locale === 'es' ? 'posts_es' : 'posts_en';
  const posts = await reader.collections[collection].all();
  return posts
    .map((p) => ({ slug: p.slug, ...p.entry }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPost(locale: 'es' | 'en', slug: string) {
  const collection = locale === 'es' ? 'posts_es' : 'posts_en';
  return await reader.collections[collection].read(slug);
}
```

## Listado `/blog`

```
┌──────────────────────────────────────────────────────────────┐
│  HERO                                                        │
│  Blog                                                        │
│  Reflexiones, hallazgos y comentarios desde la trinchera     │
│  de la investigación en ciclismo.                            │
├──────────────────────────────────────────────────────────────┤
│  FILTROS                                                     │
│  Categoría: [pills]   Autor: [select]                        │
├──────────────────────────────────────────────────────────────┤
│  POSTS                                                       │
│                                                              │
│  ┌────────────┬─────────────────────────────────┬──────────┐│
│  │   2026     │  Título del artículo            │ FISIOLOG.││
│  └────────────┴─────────────────────────────────┴──────────┘│
│  ┌────────────┬─────────────────────────────────┬──────────┐│
│  │   2026     │  Otro artículo                  │ ENTREN.  ││
│  └────────────┴─────────────────────────────────┴──────────┘│
└──────────────────────────────────────────────────────────────┘
```

Mismo patrón visual que la lista de blog en home, pero más larga y con filtros.

## Detalle `/blog/[slug]`

```
┌──────────────────────────────────────────────────────────────┐
│  BLOG / [TÍTULO]                                             │  ← breadcrumb
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  CATEGORÍA · 04 ABR 2026 · POR MIKEL ZABALA                 │
│                                                              │
│  Título del artículo en serif grande                         │
│                                                              │
│  Excerpt en serif italic                                     │
│                                                              │
│  [Imagen de portada]                                         │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Contenido del artículo (markdoc rendered)                   │
│  Con drop cap en la primera letra del primer párrafo.        │
│                                                              │
│  [tabla][gráfico][cita][imagen][lista]...                    │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  AUTOR                                                       │
│  [Mini card del autor con link a su ficha]                   │
├──────────────────────────────────────────────────────────────┤
│  PUBLICACIONES RELACIONADAS  (si hay)                        │
│  [3 papers]                                                  │
├──────────────────────────────────────────────────────────────┤
│  ARTÍCULOS RELACIONADOS                                      │
│  [3 posts]                                                   │
└──────────────────────────────────────────────────────────────┘
```

Anchos:
- Texto del artículo: `max-w-prose` (~ 65 caracteres por línea).
- Imágenes y figuras: pueden romper el ancho si son grandes.
- Pull quotes: serif, italic, 24-28px, también full-width.

### Markdoc components personalizados

Crear `components/blog/markdoc-components.tsx` que exporte:
- `Image` — wrapper con `next/image` y caption.
- `PullQuote` — cita destacada en serif.
- `Highlight` — el componente reutilizable.
- `Chart` — wrapper de Recharts para gráficos en posts.

## Mobile

- Lista de posts: 1 columna, cada fila se reorganiza en 3 líneas (categoría + fecha arriba, título grande, año + autor abajo).
- Detalle de post: tipografía generosa, padding lateral 20px, imágenes a ancho completo.
- "Artículos relacionados" en mobile: stack vertical.

## Verificación

- `/keystatic` accesible y funcional para crear posts.
- Crear un post de prueba en español → aparece en `/blog`.
- Click en un post → abre detalle.
- El contenido markdoc se renderiza correctamente (titulares, listas, código, imágenes).
- En mobile: todo legible sin scroll horizontal.

Próximo paso: `09-contacto.md`.
