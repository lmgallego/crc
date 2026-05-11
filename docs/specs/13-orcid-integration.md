# 13 — Integración ORCID

Sincronización automática de publicaciones científicas desde ORCID. Alimenta la sección "Publicaciones destacadas" de cada ficha individual y la página `/publicaciones`.

**Importante: este spec NO modifica el diseño visual existente.** Solo reemplaza datos. Los componentes ya implementados en spec 05 (sección 03 de ficha individual) y spec 07 (página completa) se mantienen tal cual; el spec 13 solo cambia la fuente de los datos que renderizan.

## Lo que cambia respecto al estado actual

| Antes | Después |
|---|---|
| `lib/data/publications.ts` con 2 papers seed manuales | Mismos 2 papers seed + ~250 papers desde ORCID, unificados |
| Ficha individual: placeholder "100+ publicaciones científicas. Ver listado completo →" | Lista real de las 5 publicaciones destacadas + CTA al listado completo |
| `/publicaciones` mostrando 2 papers | `/publicaciones` con ~250 papers filtrables |
| Sin enlaces ORCID en las fichas | Cada ficha enlaza al perfil ORCID oficial del miembro |

Los componentes, layout, tipografías, paleta y estructura **no se tocan**. Solo cambian los datos.

## Reversibilidad

Este spec está diseñado para ser **revertible en tres niveles**:

### Nivel 1 — Rama dedicada

Toda la implementación ocurre en `feat/spec-13-orcid`. `main` no se toca hasta que se valida.

- Si no convence: `git branch -D feat/spec-13-orcid` y queda como si nada hubiese ocurrido.
- Si convence: merge a `main` normal.

### Nivel 2 — Feature flag

`lib/config/features.ts` contiene `FEATURES.orcidPublications`. Cambiar de `true` a `false` desactiva toda la integración sin tocar código:

- Las fichas vuelven al placeholder "100+ publicaciones científicas..."
- `/publicaciones` vuelve a los 2 seeds (Athlete 2.0, Cycling 3.0)
- Los enlaces ORCID en sidebars se ocultan

Funciona aunque la rama ya esté mergeada. Útil si en un evento queremos limpiar la web temporalmente, o si descubrimos un problema con los datos de ORCID y queremos apagar hasta arreglarlo.

### Nivel 3 — Commits granulares

El trabajo se divide en 6 commits temáticos:

1. Campo `orcidId` en team (inocuo)
2. Script + infra de cache (no toca UI)
3. Integración en fichas individuales
4. Integración en `/publicaciones`
5. i18n
6. Primer fetch del cache

Esto permite `git revert` quirúrgico: si después gusta la integración en fichas pero no en `/publicaciones`, se revierte solo el commit 4.

## Arquitectura de datos

### Convivencia de dos fuentes

```
lib/data/
  publications.ts          ← Manual: los 2 papers seed (Athlete 2.0, Cycling 3.0) +
                             futuros papers que marquemos como isFeatured a mano.
                             Editado a mano. Sobrevive a cualquier fetch.

  orcid-cache.json         ← Auto-generado por scripts/fetch-orcid.ts.
                             NO editar a mano. Se regenera en cada fetch.

  publications-merged.ts   ← Función mergePublications() que unifica ambas fuentes
                             por DOI. Si un paper está en los dos, gana el manual
                             (sus campos isFeatured, topics, etc. se preservan).
```

### Por qué dos fuentes y no una

- Los papers hito (Athlete 2.0, Cycling 3.0) llevan campos manuales que ORCID no aporta: `isFeatured`, `topics` curados, descripciones especiales.
- Si ORCID falla o un miembro tiene su perfil vacío, la página sigue mostrando al menos los seeds.
- Si Mikel publica un paper nuevo, el script lo añade vía Mateo o Sanabria (que serán coautores) sin necesidad de tocar nada manual.

### Estrategia de deduplicación

Cuando varios miembros del CRC son coautores del mismo paper, ORCID lo devuelve una vez por cada miembro consultado. **Deduplicación por DOI**:

```
Para cada paper único (clave = DOI):
  - Si no hay DOI: clave compuesta de título normalizado + año + primer autor
  - crcAuthors[] = todos los slugs de miembros cuyo ORCID devolvió este paper
  - Resto de campos: tomar del primer fetch (idénticos entre miembros)
```

Esto significa que un paper de Mateo + Mikel + Sanabria + Javaloyes aparece **una sola vez** en la web, pero con los 4 slugs en `crcAuthors` — lo que activa el resaltado en lima de sus nombres en la lista.

## Campos que ORCID devuelve vs. los que mantenemos manuales

| Campo del schema `Publication` | Origen ORCID | Manual |
|---|---|---|
| `title` | ✅ | — |
| `authors` | ✅ (lista completa, en orden) | — |
| `journal` | ✅ | — |
| `year` | ✅ | — |
| `doi` | ✅ (si está registrado en Crossref) | — |
| `url` | ✅ (derivado del DOI) | — |
| `volume`, `pages` | ⚠️ A veces | rellenar si interesa |
| `crcAuthors` | ✅ (calculado por deduplicación) | — |
| `topics` | ❌ | overlay manual |
| `quartile` | ❌ | overlay manual o vacío |
| `impactFactor` | ❌ | overlay manual o vacío |
| `citations` | ❌ | Crossref API (futuro, spec 14) |
| `isFeatured` | ❌ | overlay manual |

### Overlay manual de campos

Para no perder los `topics`, `quartile`, etc. cuando el script regenera el cache:

```
lib/data/publications-overlay.json
```

Estructura:

```json
{
  "10.1080/02640414.2012.733900": {
    "isFeatured": true,
    "topics": ["methodology"],
    "quartile": "Q1"
  },
  "10.1016/j.jsams.2019.10.003": {
    "topics": ["physiology", "doping"],
    "quartile": "Q1",
    "impactFactor": 4.3
  }
}
```

El merge final aplica el overlay sobre los datos de ORCID. **Solo se editan a mano los DOIs que importen** (papers hito, papers que queremos destacar). El resto vive sin enriquecimiento extra y eso está bien.

## Datos verificados — 8 ORCIDs

Añadir a `lib/data/team.ts` el campo `orcidId?: string` en cada miembro:

| Slug | ORCID iD |
|---|---|
| `mikel-zabala` | `0000-0002-8700-0382` |
| `manuel-mateo-march` | `0000-0003-4418-8263` |
| `daniel-sanabria` | `0000-0002-4164-7607` |
| `cristobal-sanchez-munoz` | `0000-0001-9183-6417` |
| `alejandro-javaloyes` | `0000-0003-2689-4244` |
| `jose-joaquin-muros` | `0000-0001-7573-0399` |
| `juan-jose-perez-diaz` | `0000-0002-2438-6329` |
| `alejandro-de-rozas` | `0009-0007-8184-7965` |

**Pendientes** (campo `orcidId` queda undefined, no aparece sección ORCID en su ficha):
- `ignacio-valdivia`
- `xabier-zabala`
- `luisma-gallego`

## Script `scripts/fetch-orcid.ts`

```typescript
/**
 * Sincroniza publicaciones desde ORCID para todos los miembros del CRC
 * que tengan orcidId definido en team.ts.
 *
 * Uso: pnpm fetch:orcid
 *
 * Output: lib/data/orcid-cache.json
 */
```

### Comportamiento

1. Lee `lib/data/team.ts`.
2. Filtra miembros con `orcidId !== undefined`.
3. Para cada uno:
   - `GET https://pub.orcid.org/v3.0/{orcidId}/works` → lista resumida con `put-codes`
   - Para cada `put-code`: `GET .../v3.0/{orcidId}/work/{put-code}` → detalle con autores
   - Throttle: 1 request cada 250ms (4 req/s, muy por debajo del rate limit público)
   - Headers: `Accept: application/json`, `User-Agent: CRC-Web/1.0 (https://crc.org)`
4. Normaliza cada work al schema `Publication`.
5. Deduplica por DOI (fallback: título-normalizado + año).
6. Acumula `crcAuthors` por DOI cruzando todos los fetches.
7. Aplica overlay manual desde `publications-overlay.json`.
8. Escribe `lib/data/orcid-cache.json` (formateado, JSON pretty con sort_keys para diff legibles en git).
9. Log final: total fetched, deduplicados, errores.

### Manejo de errores

- Si un miembro tiene ORCID privado: skipear con warning, no romper.
- Si un work no tiene DOI ni título: skipear con warning.
- Si la API de ORCID devuelve 5xx: reintentar hasta 3 veces con backoff exponencial. Si sigue fallando, abortar y conservar el JSON anterior intacto.
- Si la API devuelve 404 para un ORCID: warning grande "verificar ORCID del miembro X".

### Normalización de autores

Los nombres de autor de ORCID vienen con variaciones ("M. Zabala", "Mikel Zabala", "Zabala M", "Zabala, M"). No normalizamos — los guardamos tal cual vienen. La **identificación de coautores CRC se hace por ORCID, no por nombre**. El resaltado en lima en la UI matchea por presencia del slug en `crcAuthors[]`, no por substring del nombre.

## Mapeo de campos ORCID → schema

```typescript
function mapOrcidWork(work, ownerSlug) {
  const ext = work['external-ids']?.['external-id'] ?? [];
  const doi = ext.find(e => e['external-id-type'] === 'doi')?.['external-id-value'];

  return {
    id: doi ?? slugifyTitle(work.title) + '-' + year,
    year: parseInt(work['publication-date']?.year?.value),
    title: work.title?.title?.value,
    authors: (work.contributors?.contributor ?? [])
      .map(c => c['credit-name']?.value)
      .filter(Boolean),
    journal: work['journal-title']?.value,
    doi: doi,
    url: doi ? `https://doi.org/${doi}` : work.url?.value,
    crcAuthors: [ownerSlug],  // se acumula en la fase de deduplicación
    topics: [],               // overlay
    isFeatured: false         // overlay
  };
}
```

## Estrategia de actualización

**V1 — Manual** (este spec):
- El script se corre con `pnpm fetch:orcid` cuando interese
- El JSON se commitea al repo
- Predecible, sin infra extra, los datos están en git

**V2 — Cron** (Spec 14 futuro):
- Vercel cron semanal (lunes 06:00 UTC) que ejecuta el fetch + rebuild
- "Se actualiza solo"

Empezar con V1 hasta validar que el flujo funciona y los datos son los esperados.

## Cambios en componentes existentes

### Ficha individual — sección "03 — PUBLICACIONES DESTACADAS"

**Sin cambios de layout.** El componente `MemberPublications` (o como se llame el bloque actual) ya tiene el layout 2-col con eyebrow mono y title serif. Solo cambia lo que va dentro:

- **Si el miembro tiene `orcidId`**: mostrar las 5 publicaciones más recientes donde aparece como `crcAuthors`, ordenadas por año descendente. Debajo: CTA "Ver las N publicaciones de {nombre} →" enlazando a `/publicaciones?author={slug}`.
- **Si no tiene `orcidId`**: mantener el placeholder actual "100+ publicaciones científicas. Ver listado completo →".

Cada paper en la lista (mismo estilo tipográfico que ya existe en `/publicaciones`):

```
{year, mono, amarillo si destacado}
{title, serif 15-16px}
{authors, sans 12-13px, coautores CRC del mismo paper resaltados}
{journal, serif italic} · {volume:pages, mono} · {DOI ↗}
```

### Sidebar de la ficha individual — enlaces externos

Donde ya existe la lista vertical "Email · ORCID · Scholar · ResearchGate · LinkedIn", el enlace ORCID ahora apunta a `https://orcid.org/{orcidId}` cuando el miembro lo tenga. Si no, queda oculto (ya estaba así).

**Detalle visual**: junto al enlace ORCID, un pequeño badge con el iD en mono (`0000-0002-8700-0382`). Reusa el estilo de los otros enlaces del sidebar; no inventes badge nuevo.

### Página `/publicaciones`

**Sin cambios de layout, filtros o componentes.** El spec 07 ya definió hero + filtros + agrupación por año + tarjetas de paper. Sigue exactamente igual.

Lo único que cambia:
- El número del titular del hero pasa de "100+ artículos" a dinámico: `${total} artículos. ${yearsActive} años de investigación.`
- Los stats del hero ahora reflejan datos reales: total, % en Q1 (si tenemos quartile en overlay), año del más antiguo, autor más prolífico (calculado del JSON).
- Los filtros por autor pasan a tener contadores reales (no hardcoded).

## Internacionalización

Los títulos, abstracts y nombres de revistas **no se traducen** (regla del proyecto). Lo único traducido son las etiquetas de UI:

```json
{
  "publications": {
    "memberSectionEyebrow": "03 — PUBLICACIONES",     // ya existe
    "memberSectionTitle": "Publicaciones destacadas",  // ya existe
    "viewAllByMember": "Ver las {count} publicaciones de {name} →",
    "syncedFromOrcid": "Sincronizado vía ORCID · actualizado {date}",
    "orcidProfileLink": "Perfil ORCID"
  }
}
```

Y en `en.json`:

```json
{
  "publications": {
    "viewAllByMember": "See all {count} publications by {name} →",
    "syncedFromOrcid": "Synced via ORCID · updated {date}",
    "orcidProfileLink": "ORCID profile"
  }
}
```

## Privacidad y avisos legales

- ORCID es público por definición. No hay datos privados aquí.
- En el footer de `/publicaciones`, una línea pequeña en mono:
  > "Publicaciones sincronizadas desde ORCID. Última actualización: {fecha del JSON}."

## Verificación

Tras correr el script:

- `pnpm fetch:orcid` debe completarse sin error.
- `lib/data/orcid-cache.json` existe y tiene `~150-250` entradas (orden de magnitud esperado).
- Abrir `/equipo/mikel-zabala` → sección 03 muestra 5 papers reales con DOI.
- Abrir `/equipo/manuel-mateo-march` → sección 03 muestra 5 papers (probablemente con coautoría visible con Mikel/Javaloyes resaltados).
- Abrir `/publicaciones` → contador del hero refleja el total real.
- Filtrar por autor "Daniel Sanabria" → solo papers donde su slug está en `crcAuthors`.
- Los 2 papers seed (Athlete 2.0, Cycling 3.0) siguen apareciendo destacados.
- `pnpm typecheck` y `pnpm lint` limpios.

## Mobile

Sin cambios respecto al spec 07. El layout responsive ya está implementado y funcionando.

## Limitaciones conocidas

1. **Mikel tiene 15 works públicos en su ORCID** cuando en realidad firma muchos más. Los papers donde es coautor con Mateo, Sanabria, Javaloyes o Muros llegarán al sitio vía los ORCIDs de ellos. Los papers donde Mikel es único autor o donde sus coautores no son del CRC, no aparecerán hasta que sincronice su perfil. Recomendación al equipo: enchufar el feed automático de Crossref/Scopus en su ORCID.

2. **Sin citation counts en V1**. Si se quieren, requieren spec 14 con integración Crossref.

3. **Sin h-index ni métricas agregadas**. Mismo motivo.

Próximo paso (si se decide): spec 14 — Enriquecimiento con Crossref para citation counts y métricas.
