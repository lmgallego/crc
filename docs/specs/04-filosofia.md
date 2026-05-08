# 04 — Página de filosofía (`/filosofia`)

Manifiesto completo del paradigma Ciclismo 1.0 → 3.0. Página editorial de scroll largo. **No tiene la timeline horizontal grande** (esa va solo en home como tease) — aquí cada paradigma tiene su sección amplia.

## Estructura

1. **Hero del manifiesto** — titular gigante centrado.
2. **Línea de progresión visual** (más sutil que en home, sin descripción).
3. **Sección 1.0** — fondo gris apagado, "lo que dejamos atrás".
4. **Sección 2.0** — fondo blanco normal, "el ciclista protagonista".
5. **Sección 3.0** — fondo amarillo CRC, "la era IA".
6. **Principios 3.0** — los 10 principios en grid 2×5.
7. **Pull quote final** — la cita de cierre.
8. **Bridge** — bloque negro hacia "/ciclista-3-0".

## Hero del manifiesto

Centrado, max-width 820px. Eyebrow "MANIFIESTO · CYCLING RESEARCH CENTER", titular en 76px (48px mobile) "De Ciclismo 1.0 a Ciclismo 3.0" con highlight amarillo en "Ciclismo 3.0", subtítulo en serif itálica.

Anchor links debajo: `↓ 1.0`, `↓ 2.0`, `↓ 3.0`, `↓ Principios`. En mobile: scroll horizontal o stack vertical.

## Línea de progresión

Tres segmentos horizontales: gris claro → negro → amarillo (más grueso). Marca el punto activo según scroll (con `IntersectionObserver`).

En mobile: línea vertical en lugar de horizontal a la izquierda con los 3 indicadores.

## Sección 1.0

Layout dos columnas (200px + 1fr). Izquierda con label, número grande en gris claro (110px), texto descriptivo. Derecha con titular, párrafo, callout con frases clave del Word, frase de cierre.

```tsx
<section className="border-t border-border bg-foreground/[0.025] py-14 md:py-16">
  <div className="max-w-5xl mx-auto px-5 md:px-7 grid md:grid-cols-[200px_1fr] gap-10">
    <div className="md:sticky md:top-20 md:self-start">
      <div className="section-number mb-2">Paradigma</div>
      <div className="font-serif text-[110px] leading-[0.85] -tracking-[0.04em] text-muted-light">1.0</div>
      <div className="data-label mt-1">Lo que dejamos atrás</div>
    </div>
    <div>
      <h2 className="font-serif text-2xl md:text-[28px] leading-tight -tracking-[0.02em] mb-4 text-muted">
        Jerarquía, intuición y secretismo.
      </h2>
      <p className="text-sm leading-relaxed text-foreground/85 max-w-xl">
        El entrenamiento dependía del criterio tácito del entrenador —generalmente un médico—, sin colaboración científica estructurada. Esa opacidad permitió que prácticas que cruzaban límites éticos, médicos y profesionales prosperaran en la sombra. Los escándalos de dopaje de los 90 y 2000 no fueron solo una crisis moral: fueron una <em>crisis de conocimiento</em>.
      </p>
      <Callout variant="muted" eyebrow="Lo que 2.0 y 3.0 rechazan">
        "No preguntes, hazlo." · "Yo sé, tú obedeces." · "Siempre se ha hecho así."
      </Callout>
      <p className="mt-4 text-sm italic text-foreground/70">
        Ese modelo está superado.
      </p>
    </div>
  </div>
</section>
```

## Sección 2.0

Mismo layout pero fondo `--background` normal. Número en negro fuerte. Callout destacado con borde:

> Pilar fundamental: la **educación**. El atleta comprende sus propios datos, participa en la planificación y crece en autonomía.

Y referencia explícita a `Zabala & Atkinson (2012)` en una mini-card a la derecha de la columna izquierda.

## Sección 3.0

Fondo amarillo `--accent`. Layout idéntico. El título alcanza 38px ("El 3.0 no reemplaza al 2.0. Lo amplifica."). Tres pilares en cards translúcidas (Modelos transparentes / Datos auditables / Derecho humano a la decisión). Warning callout en negro+amarillo:

> Pero cuidado: sin gobernanza ética sólida, la IA podría revertir los avances del 2.0.

Cierre: "Por eso el 3.0 debe ser ética por diseño."

## Principios

Grid 2×5 (1×10 en mobile). Cada principio numerado `/01` a `/10`, tipografía serif. El **principio 8** (la IA como aliado) lleva fondo amarillo translúcido.

```tsx
const PRINCIPLES = [
  'La voluntad de mejorar de forma continua y fundamentada.',
  'La curiosidad, el aprendizaje y la enseñanza como actitud permanente.',
  'El trabajo en equipo colaborativo y multidisciplinar.',
  'La comunicación multidireccional entre todos los actores.',
  'La participación activa del ciclista en su plan de entrenamiento.',
  'El uso crítico de las últimas tecnologías y avances científicos.',
  'La comprensión de qué se está haciendo y por qué.',
  'La IA es nuestro aliado, no nuestro sustituto. Uso crítico, responsable y ético.', // highlight
  'El trabajo sistemático, controlado y regular.',
  'El juego limpio: deporte sin dopaje, con ética por diseño.',
];
```

## Pull quote

Citación grande centrada en serif itálica:

> "El éxito del Ciclismo 3.0 no depende de la velocidad con que adoptamos nuevos algoritmos, sino de la ░sabiduría con que los integramos░ en una cultura de conocimiento compartido, respeto y responsabilidad."

La frase "sabiduría con que los integramos" lleva highlight amarillo.

## Bridge a /ciclista-3-0

Bloque negro a ancho completo:

> ¿Quién es **Ciclista 3.0**?
>
> El heredero del Atleta 2.0: protagonista indiscutible del proceso, ayudado por la IA pero con el derecho humano a la decisión.
>
> [Leer más →]

## Mobile

- El layout 2 columnas (200px + 1fr) pasa a 1 columna apilada.
- El número 110px de cada paradigma se reduce a 80px.
- La línea de progresión vertical (a la izquierda) puede mantenerse fija o eliminarse en mobile.
- El grid 2×5 de principios pasa a 1 columna.
- Pull quote: 28px en mobile en lugar de 38px.

## Verificación

- Scrollear toda la página de arriba a abajo en 375px.
- Cada paradigma se lee bien sin scroll horizontal.
- Los 10 principios son legibles, todos a una columna.
- El pull quote no se sale de pantalla.

Próximo paso: `05-equipo.md`.
