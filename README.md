# CRC Web — Bootstrap para Claude Code

Paquete de inicio del sitio web del **Cycling Research Center**. Pensado para que **Claude Code** tenga todo el contexto necesario y construya el sitio en sesiones de 2-3 horas, página a página.

## ¿Qué hay aquí?

```
crc-web/
├── CLAUDE.md                ← cerebro del proyecto: lee primero
├── README.md                ← este archivo (para humano)
├── .claude/
│   └── commands/            ← slash commands personalizados
│       ├── start.md         → /start  (estado y siguiente paso)
│       ├── spec.md          → /spec <página>  (implementar una página)
│       ├── test-mobile.md   → /test-mobile  (verificar móvil)
│       ├── i18n-check.md    → /i18n-check  (verificar traducciones)
│       └── publish-content.md  → /publish-content  (sincronizar textos)
├── .mcp.json                ← servidores MCP (filesystem, context7, shadcn, playwright, git)
├── docs/
│   ├── mcp-setup.md         ← instalación y uso de MCP
│   ├── specs/               ← spec de cada página (12 archivos)
│   ├── design/              ← tokens, paleta, tipografía, componentes
│   └── content/             ← textos reales del CRC
├── package.json             ← deps
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── components.json          ← shadcn config
├── .gitignore
├── .env.example
└── .prettierrc
```

Todavía NO existen (los crea Claude Code en cada paso):

- `app/`, `components/`, `lib/`, `messages/`
- `i18n/`, `middleware.ts`
- `keystatic.config.tsx`
- `node_modules/`

## Cómo empezar

### 1. Tener instalado Claude Code

```bash
# macOS / Linux / Windows con WSL
npm install -g @anthropic-ai/claude-code
```

Más info: https://docs.claude.com/en/docs/claude-code

### 2. Posicionarse en la carpeta

```bash
cd crc-web
```

### 3. Lanzar Claude Code

```bash
claude
```

### 4. Primer prompt

```
/start
```

Claude leerá `CLAUDE.md`, listará lo que hay y te propondrá el siguiente paso. Al ser la primera vez, te dirá: "vamos con el bootstrap del proyecto Next.js (spec 00)".

### 5. Iteración

Cuando termine cada paso, di:

```
/start
```

para que te diga qué viene después. O directamente:

```
/spec home
```

para implementar una página concreta.

## Roadmap recomendado

| # | Spec | Qué hace |
|---|---|---|
| 00 | `00-bootstrap.md` | Crear proyecto Next.js, instalar dependencias, configurar i18n |
| 01 | `01-design-system.md` | Tokens, fuentes, componentes base shadcn |
| 02 | `02-layout.md` | SiteNav (con hamburguesa móvil) y SiteFooter |
| 03 | `03-home.md` | La home completa (sección a sección) |
| 04 | `04-filosofia.md` | Manifiesto Ciclismo 1.0 → 3.0 |
| 05 | `05-equipo.md` | Listado + ficha individual de cada miembro |
| 06 | `06-servicios.md` | Hub + 4 páginas de servicios |
| 07 | `07-publicaciones.md` | Listado filtrable de papers |
| 08 | `08-blog.md` | Blog con Keystatic CMS |
| 09 | `09-contacto.md` | Formulario y página de contacto |
| 10 | `10-i18n.md` | Verificación final ES/EN, pathnames traducidos |
| 11 | `11-deploy.md` | Vercel, SEO, accesibilidad, performance |

## Servidores MCP

`.mcp.json` ya incluye 5 servidores listos:

- **filesystem** — lectura/escritura local
- **context7** — docs actualizadas de las librerías
- **shadcn** — registry de componentes
- **playwright** — verificación visual mobile/desktop
- **git** — operaciones git limpias

Detalles en `docs/mcp-setup.md`.

## Reglas no negociables

- **NO modo oscuro**. No instalar `next-themes`. No usar clases `dark:`.
- **Mobile-first siempre**. Probar todo en 375×667 antes de marcar como hecho.
- **Español por defecto**, inglés secundario con prefijo `/en`.
- **Pathnames traducidos**: `/equipo` ↔ `/team`, `/filosofia` ↔ `/philosophy`, etc.
- **Cero emojis en la UI** del sitio.
- **Las publicaciones científicas no se traducen**.
- **Paleta**: `#F8F8F6` (fondo) + `#0E0E0C` (negro) + `#E8D24A` (amarillo CRC).

## Cuando algo no funcione

Pídele a Claude:

```
Algo no está bien. Mira el estado del proyecto, lee CLAUDE.md y dime qué pasa.
```

O si te has perdido:

```
/start
```

## Información del cliente

- **Cliente**: Cycling Research Center (CRC)
- **Director**: Mikel Zabala (Catedrático UGR)
- **Equipo**: 10 investigadores, datos completos en `docs/content/team.md`
- **Word original**: `docs/content/source.docx` (no editar, fuente de verdad)

## Cosas pendientes que el cliente debe confirmar

1. Cifras concretas para el hero: ¿cuántos campeones mundiales? ¿cuántas medallas olímpicas?
2. La frase del titular del hero (provisional: "Investigamos cómo se gana cada vatio").
3. El email definitivo de contacto (provisional: `info@crc.org`).
4. El logo SVG real del CRC (provisional: versión sintética en `LogoCRC` component).
5. El dominio definitivo del sitio (provisional: `cyclingresearchcenter.org`).
6. La lista completa de publicaciones en formato BibTeX o ORCID iD de cada miembro.
7. Las fotos reales del equipo (10 retratos, recomendado en estilo editorial uniforme).

---

Hecho con cuidado para que el proyecto arranque sin fricciones.
