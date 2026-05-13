# 17 — Manuel Mateo-March como cofundador destacado

## Alcance

Añadir a Manuel Mateo-March una tarjeta destacada (estilo `FeaturedFounderCard`)
en la página `/equipo`, justo debajo de la tarjeta destacada de Mikel Zabala.
Refleja la realidad organizativa: Mikel es Fundador & Director, Manuel es
Cofundador & Subdirector.

**Alcance limitado a `/equipo`**. La home (`team-section.tsx`) sigue mostrando
solo a Mikel para no saturar el escaparate.

## Estado actual del código

- `FeaturedFounderCard` existe en `components/blocks/team/featured-founder-card.tsx`
- Tiene props `member` y `locale`
- El badge "DIRECTOR" está hardcoded en línea 109
- `FOUNDER` está exportado desde `lib/data/team.ts` y se selecciona como el slug `mikel-zabala`
- Manuel ya tiene todos los datos poblados (summary, bioParagraphs, highlights en LocalizedString)

## Cambios

### 1. Añadir `COFOUNDER` en `lib/data/team.ts`

Añadir export equivalente al de `FOUNDER`:

```typescript
export const FOUNDER = TEAM.find(m => m.slug === 'mikel-zabala');
export const COFOUNDER = TEAM.find(m => m.slug === 'manuel-mateo-march');
```

### 2. Parametrizar el badge de `FeaturedFounderCard`

Añadir prop `badge` al componente:

```typescript
type Props = {
  member: TeamMember;
  locale: 'es' | 'en';
  badge?: 'director' | 'cofounder';  // default: 'director' para mantener compatibilidad
};
```

Reemplazar el "DIRECTOR" hardcoded en línea 109 por una lectura traducida según
`badge`:

```typescript
const badgeText = t(`badge.${badge ?? 'director'}`);
// O simplemente:
const badgeText = badge === 'cofounder' 
  ? (locale === 'en' ? 'CO-FOUNDER' : 'COFUNDADOR')
  : (locale === 'en' ? 'DIRECTOR' : 'DIRECTOR');
```

Preferir lectura desde i18n si el resto del componente ya usa `useTranslations`.

### 3. Parametrizar el eyebrow del card

Actualmente el card muestra `— FUNDADOR & DIRECTOR DEL CRC` desde algún lugar
(probablemente de los messages). Ahora hay que diferenciar entre fundador y
cofundador. Dos opciones:

**Opción A — Prop adicional `eyebrow`:**
```typescript
<FeaturedFounderCard 
  member={FOUNDER} 
  locale={locale} 
  eyebrow={t('team.eyebrows.founder')} 
/>
```

**Opción B — Derivar del prop `badge`:**
El componente decide el eyebrow internamente según badge.

Mi recomendación: **A**, más explícito y reutilizable.

### 4. Añadir keys i18n

En `messages/es.json`, sección `team`:

```json
"badge": {
  "director": "DIRECTOR",
  "cofounder": "COFUNDADOR"
},
"eyebrows": {
  "founder": "FUNDADOR Y DIRECTOR DEL CRC",
  "cofounder": "COFUNDADOR Y DIRECCIÓN ADJUNTA"
}
```

En `messages/en.json`:

```json
"badge": {
  "director": "DIRECTOR",
  "cofounder": "CO-FOUNDER"
},
"eyebrows": {
  "founder": "FOUNDER AND CRC DIRECTOR",
  "cofounder": "CO-FOUNDER AND DEPUTY DIRECTOR"
}
```

**Nota**: si el eyebrow de Mikel ya existía en otra key, reutilizarla en lugar
de duplicar. Investigar primero.

### 5. Renderizar segundo bloque en `/equipo/page.tsx`

Antes:

```tsx
function FounderBlock() {
  const locale = useLocale() === 'en' ? 'en' : 'es';
  return <FeaturedFounderCard member={FOUNDER} locale={locale} />;
}
```

Después:

```tsx
function FoundersBlock() {
  const locale = useLocale() === 'en' ? 'en' : 'es';
  return (
    <>
      <FeaturedFounderCard 
        member={FOUNDER} 
        locale={locale} 
        badge="director"
      />
      <FeaturedFounderCard 
        member={COFOUNDER} 
        locale={locale} 
        badge="cofounder"
      />
    </>
  );
}
```

Y donde se invoca `<FounderBlock />` cambiarlo a `<FoundersBlock />`.

### 6. Quitar a Manuel de "Dirección Adjunta"

Manuel actualmente tiene `role: 'deputy-director'` y aparece debajo en su propia
sección "DIRECCIÓN ADJUNTA". Como ahora estará destacado arriba, hay que evitar
duplicación.

**Opción A — Cambiar `role` en `team.ts`:**
```typescript
// Manuel:
role: 'cofounder',  // antes era 'deputy-director'
```

Si no existe el rol `cofounder` en el agrupado de `groupByRole`, esto hará que
Manuel desaparezca del listado de abajo automáticamente. Limpio.

**Opción B — Filtrar en el render:**
En `app/[locale]/equipo/page.tsx`, en el `Groups()`, filtrar Manuel:

```typescript
const groups = groupByRole(TEAM.filter(m => m.slug !== 'manuel-mateo-march'));
```

Mi recomendación: **A**. Más limpio, sin filtros ad-hoc en el render.

### 7. Verificar Home

En `components/blocks/home/team-section.tsx`, asegurarse de que sigue mostrando
solo `<FeaturedFounderCard member={FOUNDER} ... />` con `badge="director"`.
NO añadir Manuel ahí. La home se mantiene como está.

## Verificación

```powershell
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
pnpm typecheck
pnpm lint
pnpm dev
```

### Comprobar (8 escenarios)

| URL | Esperado |
|---|---|
| `/equipo` (ES, desktop) | 1º Mikel (DIRECTOR), 2º Manuel (COFUNDADOR), 3º Senior Researchers, etc. |
| `/en/team` (EN, desktop) | 1st Mikel (DIRECTOR), 2nd Manuel (CO-FOUNDER), 3rd Senior Researchers, etc. |
| `/equipo` mobile 375px | Manuel aparece debajo de Mikel, mismo tratamiento, sin solape |
| `/en/team` mobile 375px | Idem |
| Sección "Dirección Adjunta" | **Ya NO existe** (Manuel salió de esa categoría) |
| `/` (home, ES) | Solo Mikel destacado, sin cambios |
| `/en` (home, EN) | Solo Mikel destacado, sin cambios |
| `/equipo/manuel-mateo-march` | Ficha individual sin cambios |

## Reversibilidad

Rama dedicada `feat/spec-17-cofounder-card`. Si no convence, revert limpio:

```powershell
git checkout main
git branch -D feat/spec-17-cofounder-card
```

## Limitaciones conocidas

1. **Si el eyebrow estaba hardcoded en lugar de venir de i18n**, hay que
   migrarlo al pasarlo como prop. Pequeño refactor adicional.

2. **El componente `FeaturedFounderCard` se usa también en la home**. El cambio
   de signatura (añadir prop `badge`) NO debe romper la invocación de la home.
   Hacerlo opcional con default `'director'` resuelve esto.

3. **Si en el futuro hay más "fundadores"** o quieres añadir a Mateo también
   en la home, esta arquitectura ya lo soporta sin más cambios.
