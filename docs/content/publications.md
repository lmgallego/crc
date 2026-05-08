# Publicaciones — Guía de carga

El CRC tiene **100+ publicaciones científicas**. La lista completa estará en el Word original o el cliente la facilitará en formato BibTeX, RIS o similar.

## Estrategia recomendada

### Opción A — Importar desde ORCID / Google Scholar

Cada miembro tiene su perfil en ORCID y/o Google Scholar. Lo más eficiente:

1. Pedirle a cada investigador su ORCID iD.
2. Usar la API pública de ORCID para extraer las publicaciones donde figura como autor:
   ```
   GET https://pub.orcid.org/v3.0/{orcid-id}/works
   ```
3. Deduplicar por DOI.
4. Guardar en `data/publications.json`.

### Opción B — Importar desde BibTeX

Si el cliente proporciona un `.bib` con las publicaciones:

1. Usar `bibtex-parse-js` o `@orcid/bibtex-parse-js` en un script Node:
   ```typescript
   import bibtexParse from 'bibtex-parse-js';
   import { readFileSync, writeFileSync } from 'node:fs';

   const bib = readFileSync('publications.bib', 'utf8');
   const parsed = bibtexParse.toJSON(bib);
   const normalized = parsed.map(normalize);
   writeFileSync('data/publications.json', JSON.stringify(normalized, null, 2));
   ```

2. Mapear campos BibTeX a nuestro schema:

   | BibTeX | Nuestro schema |
   |---|---|
   | `title` | `title` |
   | `author` | `authors` (split por ` and `) |
   | `journal` / `booktitle` | `journal` |
   | `year` | `year` |
   | `doi` | `doi` |
   | `volume` | `volume` |
   | `pages` | `pages` |
   | (manual) | `topics`, `crcAuthors`, `quartile` |

### Opción C — Carga manual incremental

Si la lista no está disponible en formato estructurado, empezar con una selección de **20 papers más relevantes** (los que sean hits del equipo) y completarla en sucesivas tandas.

## Schema final — `lib/data/publications.ts`

```typescript
export type PublicationTopic =
  | 'physiology'
  | 'biomechanics'
  | 'nutrition'
  | 'training'
  | 'doping'
  | 'psychology'
  | 'ai'
  | 'methodology';

export type Publication = {
  id: string;
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  pages?: string;
  doi?: string;
  url?: string;
  topics: PublicationTopic[];
  crcAuthors: string[];      // slugs (mikel-zabala, daniel-sanabria, etc.)
  isFeatured?: boolean;
  citations?: number;
  quartile?: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  impactFactor?: number;
};
```

## Publicaciones clave del paradigma 3.0 (siempre destacadas)

Estas son citas obligatorias en el sitio. **Marcar `isFeatured: true`**.

### 1. Athlete 2.0 (2012)

- **Title**: "Cycling Studies — A modest contribution"
- **Authors**: Zabala M, Atkinson G
- **Journal**: Journal of Science and Cycling
- **Year**: 2012
- **Topics**: methodology
- **CRC authors**: mikel-zabala
- **Note**: artículo seminal del paradigma Athlete 2.0

### 2. Cycling 3.0 (2025)

- **Title**: "From Cycling 1.0 and 2.0 to Cycling 3.0: A New Paradigm for Performance, Ethics, and Artificial Intelligence in the Era of Data-Driven Cycling Science"
- **Authors**: Zabala M
- **Journal**: Journal of Science and Cycling
- **Year**: 2025
- **Topics**: methodology, ai, doping
- **CRC authors**: mikel-zabala
- **Note**: artículo fundacional del CRC

## Listado completo

> **Pendiente**: el cliente debe proporcionar la lista completa o una selección priorizada. Mientras tanto, el componente `/publicaciones` puede renderizar un placeholder con las 2 publicaciones clave + un mensaje "Lista completa próximamente. ¿Te interesa un paper específico? Contacta con info@crc.org".

## Notas para Claude Code

- Cuando llegue la lista, parsear con script (no a mano).
- Validar que cada publicación tiene al menos `id`, `year`, `title`, `authors`, `journal`, y al menos un `topic`.
- Las que no tengan `crcAuthors` → no aparecen en las fichas individuales del equipo.
- El UI debe manejar bien el caso de campos opcionales vacíos (no mostrar "Q1 ·" si no hay quartile).
- Ordenar siempre descendente por `year`.
- En `crcAuthors`, usar los slugs definidos en `team.md`.
