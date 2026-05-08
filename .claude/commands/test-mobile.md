---
description: Verifica que la página o componente actual funciona perfectamente en móvil (375x667).
---

Argumentos opcionales: $ARGUMENTS (ruta a verificar, ej.: `/`, `/filosofia`, `/equipo/mikel-zabala`)

Si no se pasa argumento, verifica la home (`/`).

Pasos:

1. Si está disponible el MCP de Playwright, úsalo para abrir la URL en viewport `375x667` (iPhone SE).
2. Si no está disponible Playwright, recuérdame que ejecute `pnpm dev` y abra Chrome DevTools en modo dispositivo iPhone SE.
3. Verifica en orden:
   - **Sin scroll horizontal.** Ningún elemento se desborda.
   - **Nav.** Aparece como hamburguesa, abre `Sheet` correctamente.
   - **Hero.** Titular legible, no se rompen palabras feamente, stats apilados a 2 columnas.
   - **Tap targets.** Todos los botones e iconos clickables miden ≥ 44px de alto.
   - **Imágenes.** Responsivas, no se distorsionan.
   - **Tipografía.** H1 ~ 40-48px, no más.
   - **Footer.** Apilado en una columna, legible.
4. Para cada problema detectado:
   - Abre el archivo culpable.
   - Propón el fix con `min-w-0`, `truncate`, `flex-wrap`, breakpoints `sm:`, `md:`, etc.
   - Aplica el fix solo si confirmo. Si parece evidente y mínimo, aplícalo y dímelo.
5. Genera un reporte breve con ✅ o ❌ por cada criterio.

Recuerda: la prioridad de este proyecto es **mobile perfecto** en todas las páginas.
