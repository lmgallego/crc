# Guía de servidores MCP para el proyecto

Los servidores MCP (Model Context Protocol) son extensiones que dan a Claude Code superpoderes específicos. Aquí están los recomendados para este proyecto, con instrucciones de instalación.

## Servidores configurados en `.mcp.json`

### 1. Filesystem MCP

**Para qué**: Leer y escribir archivos del proyecto sin pedir confirmación constantemente. Crítico para iteración rápida.

**Cómo se instala**: ya configurado en `.mcp.json`. Se ejecuta automáticamente con `npx`. No requiere setup adicional.

**Comandos útiles después de configurarlo**:
- "Lee CLAUDE.md y los specs"
- "Crea el archivo `app/page.tsx` con [contenido]"
- "Mueve este componente a `components/blocks/`"

---

### 2. Context7

**Para qué**: Documentación actualizada de las librerías que usamos (Next.js 15, Tailwind v4, next-intl, Keystatic). El conocimiento entrenado de Claude puede estar desfasado para versiones muy nuevas.

**Cómo se instala**: ya configurado. Funciona out of the box.

**Comandos útiles**:
- "Usa Context7 para verificar la API actual de `getRequestConfig` en next-intl"
- "Busca en Context7 cómo configurar `pathnames` en next-intl 4.x"

> Más info: https://github.com/upstash/context7

---

### 3. shadcn MCP

**Para qué**: Acceder a la registry de componentes shadcn/ui actualizada. Permite añadir componentes con la versión más reciente sin guesstimating.

**Cómo se instala**: ya configurado en `.mcp.json`.

**Comandos útiles**:
- "Añade el componente `Sheet` de shadcn"
- "Cuál es la última versión del `NavigationMenu`"

> Más info: https://ui.shadcn.com/docs/mcp

---

### 4. Playwright MCP

**Para qué**: Automatizar el navegador para verificar visualmente que las páginas se ven bien (especialmente en mobile 375px). Crítico para este proyecto donde el mobile es prioridad.

**Cómo se instala**: ya configurado.

**Comandos útiles**:
- "Abre `http://localhost:3000` en mobile (375x667) y dime si hay scroll horizontal"
- "Abre `/equipo/mikel-zabala` en desktop y captura una screenshot"
- "Verifica que el menú hamburguesa funciona en mobile"

> Más info: https://github.com/microsoft/playwright-mcp

---

### 5. Git MCP

**Para qué**: Operaciones git más limpias sin tener que escribir comandos bash explícitos.

**Cómo se instala**: ya configurado.

**Comandos útiles**:
- "¿Qué archivos he modificado en este último cambio?"
- "Haz commit con el mensaje 'feat: add philosophy page'"
- "Crea una rama `feature/blog`"

---

## Servidores opcionales (no incluidos por defecto)

### GitHub MCP

Si vas a trabajar con un repo en GitHub (recomendado), añade:

```json
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "tu_token_aqui"
  }
}
```

Genera el token en https://github.com/settings/tokens con permisos `repo`.

**Útil para**: crear issues desde Claude, abrir PRs, revisar cambios.

---

### Vercel MCP (cuando exista oficial)

Para deploys y monitoring desde Claude Code. De momento se gestiona vía CLI:

```bash
pnpm i -g vercel
vercel link
vercel env pull .env.local
```

---

### Sentry MCP

Para monitorizar errores en producción:

```json
"sentry": {
  "command": "npx",
  "args": ["-y", "@sentry/mcp-server"],
  "env": {
    "SENTRY_AUTH_TOKEN": "tu_token"
  }
}
```

---

## Cómo activar los MCP en Claude Code

### Modo proyecto (recomendado)

Los MCP definidos en `.mcp.json` se activan automáticamente al abrir Claude Code en la carpeta del proyecto.

```bash
cd crc-web
claude
```

La primera vez Claude te preguntará si confías en los MCP de este proyecto. Acepta solo después de revisar el `.mcp.json`.

### Modo usuario (global)

Si prefieres tenerlos disponibles en todos tus proyectos, configúralos en `~/.claude/mcp.json` con la misma estructura.

### Verificar que están activos

Dentro de Claude Code:

```
/mcp
```

Mostrará la lista de servidores conectados y su estado.

---

## Permisos

Por seguridad, conviene revisar qué permisos tiene cada MCP:

- **Filesystem**: limitado al directorio actual (`.`).
- **Playwright**: solo abre navegadores; no modifica nada.
- **Context7**: solo lee documentación pública online.
- **shadcn**: solo lee la registry pública.
- **Git**: lee y modifica el repo local; cuidado con commits automáticos.

Para limitar permisos avanzados, puedes editar `.claude/permissions.json`:

```json
{
  "allowedTools": ["filesystem:*", "context7:*", "shadcn:*"],
  "disallowedTools": ["bash:rm"]
}
```

---

## Troubleshooting

### MCP no aparece en `/mcp`

1. Verificar que `.mcp.json` está en la raíz del proyecto.
2. Verificar JSON válido (`pnpm dlx jsonlint .mcp.json`).
3. Reiniciar Claude Code (`/restart`).

### Filesystem MCP da errores de permisos

En macOS/Linux:
```bash
chmod +x ./
```

### Playwright MCP no abre navegador

Instalar Chromium manualmente:
```bash
npx playwright install chromium
```

---

## Comandos útiles del flujo de trabajo

Una vez todo configurado, estos prompts dan rendimientos altos:

```
Lee CLAUDE.md, después implementa la home siguiendo docs/specs/03-home.md.
Antes de empezar:
- usa shadcn MCP para verificar que tengo todos los componentes UI necesarios
- usa Context7 para confirmar la API actual de next-intl
- crea los componentes en components/blocks/home/
- después abre Playwright en 375px y captura una screenshot para validar mobile
```
