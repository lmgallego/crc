# 16 — Traducción de highlights del equipo (i18n completo)

## Problema

En `/en/team/[slug]`, las tarjetas de highlights del CV salen en español:

```
CÁTEDRA → Univ. Granada · Director CEIO
FORMACIÓN → PhD UGR + John Moores Liverpool · MSc IA MIT · MSc COE+UPM
MOVISTAR → Director Rendimiento (2013-2019) · Head Coach (2020)
RFEC → Director Técnico · Seleccionador Sub-23 Carretera y MTB
PUBLICACIONES → 100+ papers · Editor Cycling Science (Human Kinetics)
RECONOCIMIENTOS → Insignia COE (2023)
```

Causa: el campo `highlights` (o como se llame en `lib/data/team.ts`) usa strings planos en lugar de `LocalizedString { es, en }`.

## Alcance

Convertir **todos los highlights de todos los miembros** a `LocalizedString` y actualizar el componente que los renderiza.

## Schema actual vs. nuevo

### Antes

```typescript
type TeamMember = {
  slug: string;
  // ...
  highlights: Array<{ label: string; value: string }>;
};
```

### Después

```typescript
type LocalizedString = { es: string; en: string };

type TeamMember = {
  slug: string;
  // ...
  highlights: Array<{ label: LocalizedString; value: LocalizedString }>;
};
```

## Traducciones canónicas de labels

Mantener consistencia entre miembros usando estas traducciones:

| Español | Inglés |
|---|---|
| Cátedra | Chair |
| Formación | Education |
| Investigación | Research |
| Publicaciones | Publications |
| Movistar | Movistar *(nombre propio, igual)* |
| RFEC | RFEC *(sigla, igual)* |
| Reconocimientos | Recognition |
| Selección | National Team |
| Federación | Federation |
| Universidad | University |
| Antropometría | Anthropometry |
| Nutrición | Nutrition |
| Psicología | Psychology |
| Biomecánica | Biomechanics |
| Tesis | Thesis |
| Doctorado | PhD |
| Doctorando | PhD candidate |
| Antidopaje | Anti-doping |
| Equipo | Team |
| Carrera | Career |
| Especialidad | Specialty |
| Investigador | Researcher |
| Coach | Coach *(igual)* |

## Traducciones de values

Cada `value` es un texto breve estructurado. Mantener:

- **Siglas y nombres propios sin cambio**: UGR, MIT, COE, UPM, RFEC, BMX, MTB, XCO, CSD, INEF, ISAK, UCI, NSCA-CSCS, EPL, NBA, etc.
- **Nombres de universidades en español** (regla del proyecto): Universidad de Granada, Universidad Miguel Hernández de Elche, etc.
- **Cargos traducidos**: "Director Técnico" → "Technical Director", "Entrenador" → "Coach", "Seleccionador" → "National Team Manager".
- **Años y periodos sin cambio**: "(2013-2019)" igual en ambos.
- **Separador `·` sin cambio**.
- **Editorial/Honors**: "Editor Cycling Science (Human Kinetics)" → "Editor of Cycling Science (Human Kinetics)".

## Lista de cambios necesarios

Recorrer los 12 miembros en `lib/data/team.ts`:

1. Mikel Zabala
2. Manuel Mateo-March
3. Daniel Sanabria
4. Cristóbal Sánchez-Muñoz
5. Alejandro Javaloyes
6. José Antonio Salas Montoro
7. José Joaquín Muros
8. Juan José Pérez Díaz
9. Alejandro de Rozas
10. Ignacio Valdivia
11. Xabier Zabala
12. Luisma Gallego

Para cada uno: convertir cada entrada de `highlights` de `{ label: string, value: string }` a `{ label: { es, en }, value: { es, en } }`.

## Componente que renderiza

Localizar el componente que pinta estas tarjetas (probablemente en `components/blocks/team/member-hero.tsx` o `member-highlights.tsx`).

Cambio:

```diff
- {highlight.label}
+ {highlight.label[locale]}

- {highlight.value}
+ {highlight.value[locale]}
```

Donde `locale` viene de `useLocale()` o equivalente, con tipado `'es' | 'en'`.

## Verificación

```powershell
pnpm typecheck
pnpm lint
pnpm dev
```

- `/equipo/mikel-zabala` → highlights en español como están ahora
- `/en/team/mikel-zabala` → highlights en inglés
- Idem para los 12 miembros

Verificar que **ningún miembro tiene highlights sin traducir** comparando ambas URLs.

## Reversibilidad

Rama dedicada `feat/spec-16-highlights-i18n`. Cambio aislado, fácil de revertir si las traducciones no convencen.

## Limitaciones conocidas

1. **Las traducciones son una primera versión**. Mikel u otros editores pueden afinarlas después editando `team.ts` directamente.

2. **Algunas frases serán muy técnicas y se mantendrán en español** dentro del valor inglés cuando no exista término claro (ej. nombres de programas docentes específicos). En esos casos, el `value.en` puede tener el nombre español entre paréntesis seguido de breve traducción.

3. **El campo `cv` (bullets largos del CV) ya está en LocalizedString** y NO se toca. Solo `highlights` es lo afectado por este spec.

## Trabajo futuro relacionado

Posibles specs derivados:
- 16.1 — Si tras la traducción se ve algún highlight con redacción rara, refinarlo
- Si en el futuro hay editores no hispanohablantes, traducir también las labels del CMS Keystatic (auditoría §2.2)
