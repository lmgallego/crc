---
description: Punto de entrada del proyecto. Lee toda la documentación y propone el siguiente paso.
---

Pasos a seguir, en este orden estricto:

1. **Lee `CLAUDE.md`** — el cerebro del proyecto.
2. **Lista los specs disponibles** en `docs/specs/`.
3. **Identifica qué specs ya están implementados** mirando si los archivos correspondientes existen en el proyecto:
   - `app/[locale]/page.tsx` → home (spec 03)
   - `app/[locale]/filosofia/page.tsx` → filosofía (spec 04)
   - `app/[locale]/equipo/page.tsx` → equipo (spec 05)
   - etc.
4. **Lee el contenido en `docs/content/`** y verifica qué textos están disponibles.
5. **Reporta brevemente el estado**:
   - ✅ Lo que ya está hecho
   - ⏳ Lo que está en progreso
   - ❌ Lo que aún no se ha empezado
6. **Sugiere el siguiente paso** según el orden recomendado del README.
7. **Espera confirmación** antes de empezar a escribir código.

Recuerda:
- El stack está fijado: Next.js 15, Tailwind v4, shadcn, Keystatic, next-intl.
- NO modo oscuro.
- Mobile primero.
- Bilingüe ES (default) + EN.
