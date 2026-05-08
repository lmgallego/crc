---
description: Verifica que todos los textos del sitio están traducidos a ES y EN, y que ninguna key falta.
---

Pasos:

1. Lee `messages/es.json` y `messages/en.json`.
2. Genera un diff de keys:
   - Keys que existen en `es` pero faltan en `en` → ❌
   - Keys que existen en `en` pero faltan en `es` → ❌
   - Keys con valor vacío en alguno de los dos → ⚠️
   - Keys con valor idéntico en ambos → ⚠️ (puede ser intencional para nombres propios, marcas, etc., pero merece un vistazo)
3. Busca en el código (`grep -r "useTranslations\|getTranslations\|t(" app components`) todas las llamadas a traducciones.
4. Verifica:
   - Cada `t('foo.bar')` corresponde a una key existente en ambos archivos.
   - No hay strings hardcodeados en español o inglés dentro de componentes (excepto contenido del Word que se traduce manualmente — ej. nombres de investigadores, títulos de publicaciones).
5. Genera un reporte con:
   - Keys faltantes (más graves arriba).
   - Strings hardcodeados detectados con línea y archivo.
   - Sugerencia de cómo arreglarlo.
6. Si yo lo confirmo, aplica los fixes.

Recuerda:
- Las publicaciones científicas NO se traducen.
- Los nombres de los investigadores son los mismos en ambos idiomas.
- Los nombres de los servicios SÍ se traducen: "Investigación" → "Research", "Coaching" → "Coaching" (es la misma palabra), "Training Camps" → "Training Camps", "Formación" → "Education".
