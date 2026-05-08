# 05 — Equipo (`/equipo` y `/equipo/[slug]`)

Dos rutas en un mismo spec: el **listado** y la **ficha individual** de cada miembro.

## Datos — `lib/data/team.ts`

Estructura TypeScript que sirve a ambas rutas:

```typescript
export type TeamRole =
  | 'director'
  | 'deputy-director'
  | 'senior-researcher'
  | 'researcher'
  | 'phd-candidate'
  | 'junior';

export type TeamMember = {
  slug: string;
  number: number;        // 1..10 = dorsal
  role: TeamRole;
  name: string;
  surname: string;
  degree: string;        // 'PhD', 'MSc', 'BSc', 'HND'
  specialty: { es: string; en: string };
  short: { es: string; en: string };  // descripción 1 línea para tarjetas
  bioParagraphs: { es: string[]; en: string[] };  // bio larga
  highlights: Highlight[];   // grid de credenciales en la ficha
  career: CareerItem[];      // timeline
  email?: string;
  orcid?: string;
  scholar?: string;
  researchgate?: string;
};

export type Highlight = {
  label: string;     // 'CÁTEDRA'
  value: string;     // 'Univ. Granada · Director CEIO'
};

export type CareerItem = {
  startYear: number;
  endYear?: number | 'present';
  rangeLabel?: string;        // 'PRESENTE', '2017–PRES.', etc.
  title: string;
  org: string;
  honor?: string;             // 'Cum laude'
};
```

El contenido completo de los 10 miembros está en `docs/content/team.md` con todos los datos del Word original. Se vuelca a TypeScript con un script o manualmente.

## `/equipo` — Listado

### Estructura visual

```
┌──────────────────────────────────────────────┐
│  EQUIPO / NUESTROS INVESTIGADORES            │
│                                              │
│  10 personas, una misión.                    │
│  Todo el equipo del CRC, ordenados por rol.  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ ░░░░ FOUNDER · MIKEL ZABALA ░░░░             │  ← bloque negro destacado
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│  DIRECCIÓN                                   │
│  [card 002 · Manuel Mateo-March]             │
│                                              │
│  SENIOR RESEARCHERS                          │
│  [card 003] [card 004]                       │
│                                              │
│  RESEARCHERS                                 │
│  [card 005] [card 006]                       │
│                                              │
│  PHD CANDIDATES                              │
│  [card 007] [card 008] [card 010]            │
│                                              │
│  JUNIOR · IA & CICLISMO                      │
│  [card 009 · Xabier Zabala]                  │
└──────────────────────────────────────────────┘
```

### Mobile

Mismo orden, todas las cards a 1 columna. Las cabeceras de grupo (DIRECCIÓN, SENIOR RESEARCHERS, etc.) en `font-mono` `text-[10px]` `uppercase` `tracking-wider` con border-top.

### Implementación

```tsx
// app/[locale]/equipo/page.tsx
export default function EquipoPage() {
  const t = useTranslations('team');
  const locale = useLocale();

  const grouped = groupByRole(TEAM);

  return (
    <main>
      <PageHero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <FeaturedFounderCard member={TEAM[0]} locale={locale} />

      {Object.entries(grouped).map(([role, members]) => (
        <section key={role} className="border-t border-border py-10 md:py-12">
          <div className="max-w-7xl mx-auto px-5 md:px-7">
            <h2 className="data-label mb-5">{t(`roles.${role}`)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {members.map((m) => (
                <TeamCard key={m.slug} member={m} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
```

## `/equipo/[slug]` — Ficha individual

### Estructura

```
┌──────────────────────────────────────────────────────────┐
│  EQUIPO / INVESTIGADORES / DRA. MIKEL ZABALA            │  ← breadcrumb
├──────────────────────────────────────────────────────────┤
│                                                          │
│  [PORTRAIT       │   — DIRECTOR · FUNDADOR              │
│   3:4 ratio      │                                       │
│   Number: 001    │   Mikel Zabala, PhD                  │
│   PI corner]     │                                       │
│   [Email]        │   "Quote en serif italic..."          │
│   [ORCID]        │                                       │
│   [Scholar]      │   [tags de especialidad]              │
│   [CV PDF]       │                                       │
│                  │   [Stats grid: pubs, h-index, etc.]   │
├──────────────────┴──────────────────────────────────────┤
│  01 — BIOGRAFÍA                                          │
│  [Long-form bio con drop cap]                            │
├──────────────────────────────────────────────────────────┤
│  02 — TRAYECTORIA ACADÉMICA                              │
│  [Timeline]                                              │
├──────────────────────────────────────────────────────────┤
│  03 — PUBLICACIONES DESTACADAS                           │
│  [Lista de 4-5 papers + link a /publicaciones]           │
├──────────────────────────────────────────────────────────┤
│  04 — PROYECTOS ACTIVOS  (si aplica)                     │
├──────────────────────────────────────────────────────────┤
│  05 — DIVULGACIÓN  (si aplica)                           │
├──────────────────────────────────────────────────────────┤
│  CTA AMARILLO: ¿Quieres colaborar con [Nombre]?          │
├──────────────────────────────────────────────────────────┤
│  OTROS MIEMBROS DEL EQUIPO  [3 mini-cards]               │
└──────────────────────────────────────────────────────────┘
```

### Mobile

- Foto y datos de contacto van arriba en una columna.
- Toda la información apilada secuencialmente.
- Las secciones (01, 02, 03...) que en desktop usan layout 2 columnas (eyebrow a la izquierda, contenido a la derecha) en mobile pasan a 1 columna.
- "Otros miembros del equipo" pasa de 3 cards horizontales a 1 columna.

### Implementación

```tsx
// app/[locale]/equipo/[slug]/page.tsx
import { TEAM } from '@/lib/data/team';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return TEAM.flatMap((m) =>
    ['es', 'en'].map((locale) => ({ locale, slug: m.slug }))
  );
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const member = TEAM.find((m) => m.slug === slug);
  if (!member) notFound();

  const otherMembers = TEAM.filter((m) => m.slug !== slug).slice(0, 3);

  return (
    <main>
      <Breadcrumb items={[{ label: 'Equipo', href: '/equipo' }, { label: member.name + ' ' + member.surname }]} />

      <MemberHero member={member} locale={locale} />

      {member.bioParagraphs[locale].length > 0 && (
        <BioSection member={member} locale={locale} />
      )}

      <CareerSection items={member.career} />

      <PublicationsForMember slug={member.slug} />

      <ContactCTA personalized={member.name} />

      <OtherMembers members={otherMembers} />
    </main>
  );
}
```

## TeamCard — Variantes

### Card pequeña (en home y `/equipo`)

```
┌────────────────────────────────┐
│ [foto 64x80]    DIRECTOR ADJ.  │
│  [001]          Manuel         │
│                 Mateo-March    │
│                 PhD            │
│                 Selección Esp. │
│                 BMX. Coach...  │
└────────────────────────────────┘
```

Aspect ratio de la foto: 4:5. El número del dorsal va en la esquina superior izquierda con `font-mono text-[8px]`.

### Card destacada (Mikel en home)

Bloque negro grande con foto a la izquierda y los siguientes elementos a la derecha:
- Eyebrow en amarillo "— FUNDADOR & DIRECTOR DEL CRC"
- Nombre 48px
- Quote serif italic
- Grid 2x3 de credenciales clave
- Botones "Ver perfil completo" + "Sus publicaciones"

En mobile: foto a ancho completo arriba, todo lo demás debajo.

## Nuevo archivo de mensajes

`messages/es.json`:

```json
{
  "team": {
    "eyebrow": "Equipo",
    "title": "10 personas, una misión.",
    "subtitle": "Investigadores con formación doctoral en ciencias del deporte aplicadas al ciclismo. Repartidos entre la Universidad de Granada y la Universidad Miguel Hernández de Elche.",
    "roles": {
      "director": "Dirección",
      "deputy-director": "Dirección adjunta",
      "senior-researcher": "Senior Researchers",
      "researcher": "Investigadores",
      "phd-candidate": "PhD candidates",
      "junior": "Junior · IA & ciclismo"
    },
    "card": {
      "viewProfile": "Ver perfil",
      "specialty": "Especialidad"
    },
    "profile": {
      "downloadCV": "Descargar CV completo",
      "biography": "Biografía",
      "career": "Trayectoria académica",
      "publications": "Publicaciones destacadas",
      "viewAllPubs": "Ver todas",
      "projects": "Proyectos activos",
      "talks": "Charlas recientes",
      "personalCTA": "¿Quieres colaborar con {name}?",
      "otherMembers": "Otros miembros del equipo"
    }
  }
}
```

## Verificación mobile

- En `/equipo`: las cards pasan a 1 columna en 375px.
- En `/equipo/[slug]`: la foto se ve grande arriba, los datos de contacto debajo, después la bio.
- Los stats se ven legibles a 2 columnas.
- El CTA amarillo del final tiene buen contraste.
- "Otros miembros" con scroll horizontal o stack vertical (mejor stack).

Próximo paso: `06-servicios.md`.
