# Tokens de diseño — CRC Web

## Paleta — solo modo claro (no hay dark mode)

| Token | Hex | Uso |
|---|---|---|
| `--color-background` | `#F8F8F6` | Fondo principal del sitio |
| `--color-foreground` | `#0E0E0C` | Texto principal, elementos sólidos |
| `--color-accent` | `#E8D24A` | Amarillo CRC oficial. Highlights, CTAs especiales, marca. |
| `--color-accent-foreground` | `#0E0E0C` | Texto sobre fondo amarillo |
| `--color-accent-dark` | `#8A7400` | Amarillo oscuro/desaturado. Section numbers, metadatos pequeños sobre fondo claro. |
| `--color-muted` | `#6A6A60` | Texto secundario |
| `--color-muted-light` | `#C8C5BA` | Gris muy claro. "Lo que dejamos atrás" (Ciclismo 1.0). Borders inactivos. |
| `--color-card` | `#FFFFFF` | Fondo de tarjetas blancas (un poco más claro que el background). |
| `--color-border` | `rgba(14, 14, 12, 0.12)` | Bordes finos por defecto |
| `--color-border-subtle` | `rgba(14, 14, 12, 0.08)` | Bordes muy sutiles, separadores casi invisibles |
| `--color-inverse` | `#0E0E0C` | Bloques con fondo negro (Mikel Zabala destacado, footer) |
| `--color-inverse-foreground` | `#F8F8F6` | Texto sobre fondo negro |

### Uso del amarillo (cuándo SÍ y cuándo NO)

**Sí**:
- Highlight de palabra clave en titulares grandes (ej. "cada vatio" en hero).
- Tarjeta destacada de servicio Investigación.
- Bloque de cierre de Contacto.
- Logo CRC.
- Section numbers (`01 — FILOSOFÍA`) en color `--color-accent-dark`.
- Bloque entero de Ciclismo 3.0 en página de filosofía.
- Hovers de enlaces secundarios.

**No**:
- Como fondo de página entera.
- Como fondo de párrafos largos (es agresivo a la lectura).
- En múltiples elementos compitiendo por atención dentro de la misma sección.
- Para texto sobre fondo claro (no contrasta lo suficiente).

## Tipografía

### Familias

```css
--font-serif: 'Instrument Serif', serif;     /* titulares, citas, números */
--font-sans:  'Geist', system-ui, sans;       /* cuerpo, UI */
--font-mono:  'JetBrains Mono', ui-monospace; /* metadata, datos */
```

### Escalas

| Token | Mobile | Tablet | Desktop | Uso |
|---|---|---|---|---|
| `text-display` | 48px | 64px | 76px | H1 hero |
| `text-page-title` | 40px | 52px | 60px | H1 páginas internas |
| `text-section-title` | 28px | 32px | 36px | H2 de sección |
| `text-paragraph-title` | 22px | 26px | 28px | H3 dentro de secciones |
| `text-card-title` | 16px | 17px | 17px | Títulos de cards |
| `text-body` | 14px | 14px | 14px | Body por defecto |
| `text-body-large` | 15px | 16px | 17px | Body destacado |
| `text-small` | 12px | 12px | 12px | Body pequeño |
| `text-mono-md` | 11px | 11px | 11px | Mono medio |
| `text-mono-sm` | 10px | 10px | 10px | Mono pequeño |
| `text-mono-xs` | 9px | 9px | 9px | Data labels (`PUBLICACIONES`) |

### Reglas tipográficas

- **Letter-spacing**:
  - Headlines serif: `-0.025em` (negativo, agrupa más)
  - Mono labels: `0.1em` a `0.2em` (positivo, separado)
- **Line-height**:
  - Headlines grandes (≥48px): `0.92` a `0.95`
  - Body: `1.5` a `1.6`
  - Card titles: `1.15` a `1.2`
- **Font-weight**:
  - Serif: `400` siempre. Si necesitas más peso, usa italic en lugar.
  - Sans: `400` body, `500` UI, `600`-`700` para énfasis.
  - Mono: `400` o `600` para destacar.

## Espaciado vertical entre secciones

Cada sección de la home y de las páginas internas usa estos valores:

```css
--space-section: 56px;       /* mobile y tablet */
--space-section-lg: 72px;    /* desktop */
```

En Tailwind: `py-14 md:py-16` o `py-12 md:py-14`.

## Bordes y radios

- Border width: `0.5px` por defecto. Excepcionalmente `1px` para elementos destacados.
- Border radius:
  - Cards: `4-6px` (`rounded` o `rounded-md`).
  - Buttons: `5-6px`.
  - Pills/badges: `9999px` (`rounded-full`).
  - Imágenes editoriales: `2-3px` (casi sin redondeo, aspecto periodístico).
  - Bloques grandes destacados: `6px`.

## Sombras

Mínimas. El diseño es plano.

- En tarjetas hover: `shadow-sm` (apenas perceptible).
- En el dorsal con número (esquina amarilla del retrato): sin sombra.
- En el highlight amarillo del hero: sin sombra.

## Patrones decorativos

Único patrón decorativo permitido: **grid sutil** SVG con líneas de 0.5px y opacidad 0.08. Solo en:
- Esquina del hero (con curva de potencia superpuesta).
- Esquina del CTA amarillo final.

NO usar:
- Gradientes coloridos.
- Ilustraciones genéricas.
- Iconos en colores.
- Sombras dramáticas.
- Glassmorphism.
- Neumorfismo.
