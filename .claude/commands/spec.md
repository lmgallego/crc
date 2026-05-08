---
description: Implementa una página del sitio leyendo primero su spec en docs/specs/
---

Argumentos: $ARGUMENTS

Pasos a seguir:

1. Localiza el archivo spec relevante en `docs/specs/` que coincida con `$ARGUMENTS`. Ej.: si me pasan "home", busca `docs/specs/03-home.md`.
2. Lee TAMBIÉN `CLAUDE.md` para refrescar reglas de diseño, paleta y stack.
3. Lee `docs/design/tokens.md` y `docs/design/components.md`.
4. Si la página tiene contenido textual, lee también el archivo correspondiente en `docs/content/`.
5. Antes de escribir código:
   - Lista los componentes que vas a crear o reutilizar.
   - Confirma qué `messages/{locale}.json` keys vas a necesitar.
   - Indica si necesitas instalar algún componente shadcn nuevo.
6. Implementa la página siguiendo el orden:
   a. Componentes base nuevos en `components/blocks/`
   b. La page en `app/[locale]/.../page.tsx`
   c. Las traducciones en `messages/es.json` y `messages/en.json`
7. Verifica:
   - Mobile en 375px (puedes pedir a Playwright MCP que abra el navegador).
   - Desktop en 1280px.
   - `pnpm typecheck` y `pnpm lint` sin errores.
8. Termina con un breve resumen: qué archivos creaste, qué quedó pendiente, qué se debe revisar manualmente.

NO instales `next-themes` ni añadas modo oscuro. Cualquier referencia a `dark:` debe eliminarse.
