# 07 — Publicaciones (`/publicaciones`)

Listado completo y filtrable de los 100+ papers del CRC. Página densa de información pero limpia.

## Estructura

```
┌──────────────────────────────────────────────────────────────┐
│  HERO                                                        │
│  100+ artículos. 25 años de investigación.                   │
│  Filtrar por año, autor, revista o tema.                     │
│                                                              │
│  [Stats: total, indexados Q1, citas totales]                 │
├──────────────────────────────────────────────────────────────┤
│  FILTROS                                                     │
│  Año: [select 2026, 2025, 2024, ...]                        │
│  Autor: [multi-select de los 10 miembros]                   │
│  Tema: [pills: fisiología, biomecánica, etc.]               │
│  Búsqueda: [input por título o keyword]                      │
├──────────────────────────────────────────────────────────────┤
│  AGRUPADOS POR AÑO                                           │
│                                                              │
│  ── 2026 ──────────────────────────────────────              │
│  [paper 1]                                                   │
│  [paper 2]                                                   │
│  ── 2025 ──────────────────────────────────────              │
│  [paper 3]                                                   │
│  ...                                                         │
└──────────────────────────────────────────────────────────────┘
```

## Datos — `lib/data/publications.ts`

```typescript
export type Publication = {
  id: string;
  year: number;
  title: string;            // queda en idioma original
  authors: string[];        // ordenados como aparecen en el paper
  journal: string;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  topics: PublicationTopic[];
  isFeatured?: boolean;     // para destacarlo en home o ficha de autor
  citations?: number;
  quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  impactFactor?: number;
  crcAuthors: string[];     // slugs de miembros CRC que aparecen como autores
};

export type PublicationTopic =
  | 'physiology'
  | 'biomechanics'
  | 'nutrition'
  | 'training'
  | 'doping'
  | 'psychology'
  | 'ai'
  | 'methodology';
```

Las publicaciones se cargan desde `lib/data/publications.json` (archivo grande con todos los papers). Mantener este JSON ordenado por año descendente.

**Importante**: el contenido bruto de las publicaciones está en el Word original (`docs/content/source-text.md`, sección "Publicaciones destacadas"). Hay que parsearlo a JSON estructurado. Tarea separada — no parsearlo manualmente, pedirle a Claude Code que ejecute un script de conversión.

## PublicationItem — Componente de fila

```
┌──────────────────────────────────────────────────────────────────┐
│ 2026 · J. APPL. PHYSIOL.                Q1 · IF 3.8 · 12 CITAS  │
│ Reassessing the maximal lactate steady state in elite road cyc.. │
│ Rivera M., Ortiz J., Henao P. et al.                             │
│ [topic: PHYSIOLOGY]                                              │
└──────────────────────────────────────────────────────────────────┘
```

- Fila completa clickable → abre DOI o URL.
- Hover: subtle yellow background.
- Si es `isFeatured`: fondo amarillo translúcido + estrella.

### Mobile

- Fila se apila: header (año + revista) en línea, título debajo, autores debajo, métricas + topic abajo.
- Mantener legibilidad: título no más pequeño de 14px.

## Filtros

Implementar con `nuqs` o `useQueryState` para que los filtros se reflejen en la URL (compartibles).

```
/publicaciones?year=2026&topic=physiology&author=mikel-zabala
```

Filtros:
- **Año**: select que muestra años con publicaciones.
- **Tema**: pills multi-select.
- **Autor (CRC)**: multi-select de los 10 miembros del CRC.
- **Búsqueda**: input text que busca en `title` (case-insensitive).

En mobile: los filtros se colapsan en un drawer ("Filtros (3)"). Click → abre Sheet con todos los filtros.

## Stats hero

- **Total**: 100+ artículos
- **Q1**: cuántos en revistas Q1
- **Citas totales**: suma de `citations`
- **Año más activo**: mostrar el año con más papers

## Mobile

- Hero apilado.
- Stats en 2 columnas (2x2).
- Filtros en drawer.
- Lista de papers en 1 columna, cada item self-contained.

## Verificación

- Filtrar por año 2026 → solo aparecen publicaciones de 2026.
- Filtrar por autor "Mikel Zabala" → solo papers donde aparezca como autor.
- Búsqueda por keyword "lactate" → match en títulos.
- URL refleja los filtros, recarga preserva el estado.
- En mobile: drawer abre y cierra suavemente.

Próximo paso: `08-blog.md`.
