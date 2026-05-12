# 14 — Nuevo miembro José Antonio Salas Montoro + cargos editoriales JSC

## Alcance

1. Añadir a José Antonio Salas Montoro como nuevo miembro del CRC (10º del equipo principal).
2. Añadir una línea de cargo editorial al CV de tres miembros existentes:
   - Mikel Zabala → Editor jefe de Journal of Science and Cycling
   - Cristóbal Sánchez-Muñoz → Co-editor jefe de Journal of Science and Cycling
   - Manuel Mateo-March → Director asociado de Journal of Science and Cycling
3. Re-ejecutar `pnpm fetch:orcid` para sincronizar las 24 publicaciones de Salas y deduplicar contra el cache existente.

**No toca diseño visual.** Solo añade datos en la estructura existente.

## Datos verificados

### José Antonio Salas Montoro

| Campo | Valor |
|---|---|
| Slug | `jose-antonio-salas` |
| Nombre completo | José Antonio Salas Montoro |
| Título académico | PhD |
| Rol corto | Científico del rendimiento ciclista, Coach y Director Deportivo |
| ORCID | `0000-0001-8600-0930` (verificado contra papers del CRC) |
| Works en ORCID | 24 |
| Foto | `jose-antonio-salas.webp` (en `public/team/` o donde se guarden las fotos) |

### CV completo

15 bullets en orden exacto como los proporcionó el cliente:

```
- Profesor en la Universidad de Granada, impartiendo docencia de ciclismo en
  la Facultad de Ciencias del Deporte (Universidad de Granada, España).
- Doctor (PhD) en Biomedicina por la Universidad de Granada, con una tesis
  centrada en el rendimiento en ciclismo.
- Máster en Rendimiento Físico y Deportivo (Universidad Pablo de Olavide, España).
- Máster en Alto Rendimiento en Deportes Cíclicos (Universidad de Murcia, España).
- Maestro: Especialidad en Educación Física (Universidad Autónoma de Barcelona, España).
- Director Deportivo de Ciclismo Nivel III por la Real Federación Española de Ciclismo.
- Técnico de rendimiento y técnico de apoyo en concentraciones y competiciones
  internacionales con la Real Federación Española de Ciclismo entre los años 2019
  y la actualidad, formando parte del staff de la selección española en Campeonatos
  del Mundo y Campeonatos de Europa de BTT.
- Profesor en los cursos de Director Deportivo Nivel I y Nivel II organizados
  por la Federación Andaluza de Ciclismo desde el año 2022.
- Director deportivo la Escuela de Ciclismo Madre Tierra (Granada, España).
- Entrenador de múltiples deportistas de nivel autonómico, nacional e internacional.
- Autor de múltiples artículos científicos sobre ciclismo y entrenamiento.
- Investigador en proyectos y contratos de asesoramiento, coordinación e
  investigación para la mejora del rendimiento de los equipos nacionales de la
  Real Federación Española de Ciclismo.
- Miembro del grupo de investigación HUM1063 "Ciclismo y Rendimiento Deportivo".
- Exárbitro de fútbol, actividad desarrollada entre 1998 y 2016, con participación
  en encuentros del fútbol profesional y de la Copa de S. M. el Rey.
- Ciclista aficionado.
```

### Posición en el equipo

A decidir dónde se inserta en el orden del equipo. Sugerencia: justo después de **Alejandro Javaloyes**, antes de **José Joaquín Muros**, para mantener una agrupación temática de los seniors del rendimiento. No es bloqueante; el cliente puede reordenar a mano después.

## Adiciones editoriales (3 miembros existentes)

Añadir un bullet más al CV de cada uno. Posición sugerida: **al inicio del CV o justo después del primer bullet académico**, ya que es un cargo prestigioso que conviene destacar.

### Mikel Zabala

Añadir:
```
- Editor jefe (Editor-in-Chief) de Journal of Science and Cycling.
```

### Cristóbal Sánchez-Muñoz

Añadir:
```
- Co-editor jefe (Co-Editor-in-Chief) de Journal of Science and Cycling.
```

### Manuel Mateo-March

Añadir:
```
- Director asociado (Associate Editor) de Journal of Science and Cycling.
```

**Nota sobre traducción**: en el i18n inglés (si los CVs están traducidos), usar los términos en inglés que están entre paréntesis (Editor-in-Chief, Co-Editor-in-Chief, Associate Editor). Si los CVs no están traducidos (regla del proyecto para contenido científico), dejar solo la versión española.

## Efecto colateral: cache ORCID

Tras `pnpm fetch:orcid`:

- 24 works nuevos de Salas se intentan añadir.
- **Deduplicación esperada**: ~18-20 de esos works ya están en el cache porque son coautorías con miembros que ya estaban (Mikel, Mateo, Pérez-Díaz, etc.). El script los detecta por DOI y solo añade `jose-antonio-salas` al array `crcAuthors[]`.
- **Papers nuevos al cache**: ~4-6 donde Salas es coautor pero los otros autores no son del CRC.

Resultado esperado en el cache final: ~280 papers (vs 276 actuales), con muchos más papers mostrando coautoría CRC resaltada.

## Verificación

```powershell
# Verificar que Salas aparece en team
# (abrir /equipo en navegador, debe verse su tarjeta con foto)

# Verificar que su ORCID se procesó
$cache = Get-Content lib\data\orcid-cache.json -Raw | ConvertFrom-Json
$salasPapers = $cache | Where-Object { $_.crcAuthors -contains 'jose-antonio-salas' }
Write-Host "Papers donde Salas aparece como crcAuthor: $($salasPapers.Count)"
# Esperado: ~24

# Verificar que su ficha individual existe
# Abrir /equipo/jose-antonio-salas → debe mostrar CV completo + 5 publicaciones top

# Verificar las nuevas líneas editoriales:
# /equipo/mikel-zabala → CV menciona "Editor jefe de Journal of Science and Cycling"
# /equipo/cristobal-sanchez-munoz → CV menciona "Co-editor jefe..."
# /equipo/manuel-mateo-march → CV menciona "Director asociado..."

# Verificar la foto:
Test-Path public\team\jose-antonio-salas.webp
# Esperado: True (el cliente la sube manualmente)
```

## Reversibilidad

Rama dedicada `feat/spec-14-salas-jsc`. Tres commits granulares:

1. `feat(team): add José Antonio Salas Montoro as 10th member (spec 14)`
2. `feat(team): add JSC editorial roles to Zabala, Sánchez-Muñoz, Mateo (spec 14)`
3. `data: refresh ORCID cache with Salas publications (spec 14)`

Si el cliente decide después que Salas no debe figurar (improbable, pero posible si hay decisión de equipo), revert del commit 1 saca la ficha pero deja el resto del spec. Sus papers en el cache quedarían huérfanos con `crcAuthors: ['jose-antonio-salas']` sin miembro detrás — el componente debe ser tolerante a esto (mostrar el nombre plano sin link).

## Limitación conocida

La foto `jose-antonio-salas.webp` la sube el cliente manualmente a `public/team/`. Si el archivo no existe al momento del build, la ficha romperá visualmente (Next.js Image no encuentra el src). Mitigación: el componente `MemberHero` debería tener fallback a un placeholder genérico cuando la foto no exista. Si no lo tiene, este spec NO añade ese fallback (sería scope creep), pero conviene verificar visualmente antes de pushear a main.
