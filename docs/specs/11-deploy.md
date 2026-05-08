# 11 — Deploy y pulido final

Spec final: dejar el sitio listo para producción.

## Hosting recomendado

**Vercel** es la opción óptima para Next.js + Keystatic + i18n. Pasos:

1. Conectar repo con Vercel.
2. Variables de entorno necesarias:
   - `NEXT_PUBLIC_SITE_URL` — URL final de producción (`https://cyclingresearchcenter.org`).
   - `KEYSTATIC_GITHUB_CLIENT_ID` y `KEYSTATIC_GITHUB_CLIENT_SECRET` (si se usa Keystatic GitHub mode).
   - `KEYSTATIC_SECRET` — secret aleatorio para Keystatic.
   - `RESEND_API_KEY` — para el formulario de contacto (si se usa Resend).
3. Build command: `pnpm build`.
4. Output: estándar de Next.js (App Router con SSR/SSG mixto).

## Keystatic en producción

Cambiar `keystatic.config.tsx`:

```typescript
storage: {
  kind: 'github',
  repo: { owner: 'crc-org', name: 'crc-web' },
},
```

Esto permite editar el blog desde una UI web autenticada con GitHub.

## SEO checklist

- [ ] `sitemap.xml` generado con `app/sitemap.ts` que liste todas las URLs en ES y EN.
- [ ] `robots.txt` con `app/robots.ts` permitiendo indexación de todo excepto `/keystatic`.
- [ ] Metadata por página (título, descripción, OG image).
- [ ] OG image dinámica con `@vercel/og` para cada post del blog.
- [ ] `hreflang` alternates en cada página.
- [ ] Schema.org markup:
  - `Organization` en home y footer.
  - `Person` en cada ficha de equipo.
  - `Article` en cada post del blog.
  - `ScholarlyArticle` en cada publicación científica.
- [ ] Imágenes con `alt` descriptivo (no solo "imagen 1").
- [ ] Lazy loading por defecto en `next/image`.

## Performance

- [ ] Lighthouse > 90 en Performance, Accessibility, Best Practices, SEO.
- [ ] LCP < 2.5s en mobile.
- [ ] CLS < 0.1.
- [ ] Imágenes en WebP / AVIF.
- [ ] Fuentes precargadas con `next/font`.
- [ ] No JS innecesario en páginas estáticas (server components donde sea posible).

## Accesibilidad

- [ ] Todos los elementos interactivos accesibles por teclado.
- [ ] Contraste AA en todo el sitio (el amarillo `#E8D24A` sobre `#0E0E0C` y al revés cumplen).
- [ ] `aria-label` en iconos sin texto (logo, hamburger, redes).
- [ ] `prefers-reduced-motion` respetado en animaciones.

## Analítica

Recomendado: **Plausible** o **Umami** (privacidad-friendly, sin cookies).

```typescript
// app/[locale]/layout.tsx
<Script defer data-domain="cyclingresearchcenter.org" src="https://plausible.io/js/script.js" />
```

## Política de privacidad y cookies

Aunque Plausible no usa cookies, hay que crear:
- `/legal/privacidad` — política de privacidad.
- `/legal/aviso-legal` — aviso legal.
- `/legal/cookies` — política de cookies (si se añade alguna analítica con cookies).

Enlaces desde el footer.

## Antes de lanzar

1. Probar en Safari iOS, Chrome Android, Chrome Desktop, Firefox.
2. Lighthouse audit.
3. Validar HTML con `validator.w3.org`.
4. Probar ambos idiomas a fondo.
5. Test de formulario de contacto: que llegue el email.
6. Test del CMS: que el equipo del CRC pueda crear un post.
7. Probar el cambio de idioma desde cualquier página.
8. Comprobar 404 personalizado en `app/not-found.tsx`.

## Post-launch

- Monitorizar errores con Sentry o Vercel logs.
- Analizar el flujo de visitantes: a qué páginas van, dónde se quedan.
- Iterar en base a feedback del equipo y los visitantes.

Listo. Sitio en producción.
