---
description: Sincroniza el contenido textual del CRC desde docs/content/ hacia los archivos messages/{locale}.json y los componentes correspondientes.
---

Pasos:

1. Lista los archivos en `docs/content/`:
   - `source-text.md` — texto original del Word
   - `home.md` — textos para la home
   - `philosophy.md` — manifiesto Ciclismo 1.0 → 3.0
   - `services.md` — los 4 servicios
   - `team.md` — los 10 miembros
   - `publications.md` — papers
2. Para cada archivo de contenido:
   - Detecta qué keys necesita en `messages/es.json`.
   - Crea o actualiza esas keys.
   - Genera la versión EN preguntándome SI o NO antes de cada bloque grande (no traduzcas automáticamente nombres propios, títulos científicos o términos del paradigma 3.0 — esos quedan iguales).
3. Si hay datos estructurados (como el equipo), proponme guardarlos en `lib/data/team.ts` como TypeScript en lugar de en messages.json. Esto es mejor para datos repetitivos con estructura compleja.
4. Para las publicaciones: NO copiar la lista completa a TS, mejor crear `lib/data/publications.ts` que las importe desde un archivo JSON o YAML estructurado.
5. Reporta:
   - Qué keys nuevas se añadieron.
   - Qué archivos de datos TypeScript se generaron.
   - Qué quedó pendiente de traducir manualmente.

Recordatorio crítico: el manifiesto Ciclismo 3.0 es el contenido más importante del sitio. Tradúcelo CON CUIDADO al inglés respetando el matiz: "ética por diseño" → "ethics by design", "parálisis por análisis" → "analysis paralysis", etc. En la duda, pregunta.
