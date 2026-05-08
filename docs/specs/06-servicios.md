# 06 — Servicios (`/servicios` y `/servicios/[slug]`)

Cuatro servicios reales del CRC. Hub + 4 páginas internas.

## Hub `/servicios`

Página intermedia entre la home y cada servicio individual. Estructura:

1. **Hero de página** — eyebrow "SERVICIOS" + titular "¿En qué podemos ayudarte?" + subtítulo.
2. **Grid de servicios** — los 4 servicios como tarjetas grandes en orden:
   - **Investigación** (destacada en amarillo, 2 columnas de ancho en desktop)
   - **Coaching** (1 col)
   - **Training Camps** (1 col)
   - **Formación** (2 cols al final, también destacada en negro)
3. **CTA contacto**.

### Layout desktop

```
┌──────────────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░    INVESTIGACIÓN   (amarillo, 2 cols)               ░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                              │
│  ┌──────────────────────┬─────────────────────────────┐     │
│  │ COACHING             │ TRAINING CAMPS              │     │
│  └──────────────────────┴─────────────────────────────┘     │
│                                                              │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  ░░    FORMACIÓN     (negro, 2 cols)                    ░░  │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└──────────────────────────────────────────────────────────────┘
```

### Mobile

Todo apilado: 1 columna, en el orden 1, 2, 3, 4.

## Páginas individuales `/servicios/[slug]`

Slugs:
- `/servicios/investigacion`
- `/servicios/coaching`
- `/servicios/training-camps`
- `/servicios/formacion`

### Estructura común

```
┌──────────────────────────────────────────────────────────────┐
│  SERVICIOS / [NOMBRE DEL SERVICIO]                           │  ← breadcrumb
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ░░░░░ HERO DEL SERVICIO ░░░░░                              │
│  Eyebrow + Titular grande + descripción + 2-3 stats          │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  01 — QUÉ HACEMOS                                            │
│  Texto largo + grid de áreas/líneas                          │
├──────────────────────────────────────────────────────────────┤
│  02 — A QUIÉN VA DIRIGIDO                                    │
│  Lista de tipos de cliente / colaborador                     │
├──────────────────────────────────────────────────────────────┤
│  03 — METODOLOGÍA  (si aplica)                               │
│  Cómo trabajamos                                             │
├──────────────────────────────────────────────────────────────┤
│  04 — CONTENIDO ESPECÍFICO DEL SERVICIO                      │
│  · Investigación: líneas, datasets, equipos colaboradores    │
│  · Coaching: programas, casos de éxito                       │
│  · Training Camps: ubicaciones, qué incluye                  │
│  · Formación: programas, cursos, mentorización               │
├──────────────────────────────────────────────────────────────┤
│  CTA AMARILLO: empezar / contactar                           │
└──────────────────────────────────────────────────────────────┘
```

## Contenido de cada servicio (resumen del Word)

### Investigación

> "Confiamos en la ciencia; estudiamos las contribuciones de otros, pero también realizamos nuestra propia investigación específica en el campo del ciclismo y el triatlón."

- **Objetivos**: promover investigación en ciclismo, difundir conocimientos, desarrollar metodología propia.
- **Áreas**: biomecánica, ayudas ergogénicas, fisiología, antidopaje, psicología.
- **Stats**: 100+ publicaciones, índice h alto, colaboraciones internacionales.
- **Output**: papers, datasets, herramientas internas.

### Coaching

> "Provenimos de la competición real, con más de 25 años de experiencia al más alto nivel y éxitos cosechados, siempre cerca de los mejores ciclistas. ¿Eres tú el siguiente?"

- **Para**: ciclistas profesionales individuales o equipos.
- **Filosofía**: Ciclismo 3.0 — autonomía progresiva, basado en datos.
- **Hitos**: campeones mundiales y olímpicos en distintas disciplinas (ciclismo, triatlón, MTB, motocross).
- **Áreas**: ruta, MTB, BMX, triatlón, pista.

### Training Camps

> "Podemos organizar todo lo que necesites en una experiencia concentrada."

- **Para**: grupos o equipos profesionales.
- **Incluye**: rutas, alimentación, asesoramiento (entrenamiento, fisiología, nutrición, biomecánica), formación.
- **Ubicaciones**:
  - Sur de España: Almería, Málaga, Granada (Sierra Nevada).
  - Sureste: Alicante (Altea, Calpe).
  - Otros bajo petición.

### Formación

> "Creemos firmemente que todo el mundo necesita saber qué está haciendo y por qué."

- **Mentorización**: programa exclusivo, 1-1, formar coaches 3.0.
- **Cursos federativos**: niveles I y II territorial + UCI.
- **Universidad**: 3 módulos en CCD Granada (única universidad del mundo con título específico en ciclismo) + doctorado.
- **Cursos certificados**: ergonomía, potencia, HRV.
- **Congresos**: nacionales e internacionales.
- **Eventos no formales**: clubs y federaciones.

## Datos — `lib/data/services.ts`

```typescript
export type Service = {
  slug: 'investigacion' | 'coaching' | 'training-camps' | 'formacion';
  order: number;
  featured: boolean;
  variant: 'accent' | 'inverse' | 'default';  // visual variant
  name: { es: string; en: string };
  shortDescription: { es: string; en: string };
  longDescription: { es: string; en: string };
  audience: { es: string[]; en: string[] };
  features: ServiceFeature[];
  cta: { es: string; en: string };
  metric?: { label: string; value: string };
};

export type ServiceFeature = {
  title: { es: string; en: string };
  description: { es: string; en: string };
  badge?: string;
};
```

## Mensajes

```json
{
  "services": {
    "hub": {
      "eyebrow": "Servicios",
      "title": "¿En qué podemos ayudarte?",
      "subtitle": "Cuatro servicios. Una metodología basada en el paradigma Ciclismo 3.0."
    },
    "research": {
      "name": "Investigación",
      "shortDescription": "Estudiamos lo que mueve al ciclismo. Publicamos lo que descubrimos.",
      ...
    },
    "coaching": { ... },
    "trainingCamps": { ... },
    "education": { ... }
  }
}
```

## Mobile

- Hub: 4 cards apiladas en 1 columna.
- Página de servicio: hero apilado, contenido en una sola columna, listas verticales.
- Las ubicaciones de Training Camps en mobile se muestran como lista vertical en lugar de grid.
- La formación en mobile pasa de grid 3×2 a stack vertical.

Próximo paso: `07-publicaciones.md`.
