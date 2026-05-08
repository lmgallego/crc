# 09 — Contacto (`/contacto`)

Página simple pero útil. No es solo un formulario: es una pieza de imagen.

## Estructura

```
┌──────────────────────────────────────────────────────────────┐
│  HERO                                                        │
│  Hablemos.                                                   │
│  Coaching, training camps, investigación o formación.        │
├──────────────────────────────────────────────────────────────┤
│  FORMULARIO ──────┬─────── INFORMACIÓN                       │
│                   │                                          │
│  [Nombre]         │   📍 UNIV. GRANADA                       │
│  [Email]          │   Facultad CCD                           │
│  [Asunto]         │                                          │
│  [Servicio que    │   ✉️ info@crc.org                       │
│   te interesa]    │                                          │
│  [Mensaje]        │   🔗 ORCID · Scholar · LinkedIn          │
│                   │                                          │
│  [Enviar →]       │   [Sus 4 servicios con links]            │
│                   │                                          │
└───────────────────┴──────────────────────────────────────────┘
```

## Formulario

Campos:
- **Nombre completo** — required
- **Email** — required, validación email
- **Tipo de consulta** — select con los 4 servicios + "Otro"
- **Asunto** — text corto, opcional
- **Mensaje** — textarea, mínimo 20 caracteres
- **Acepto política de privacidad** — checkbox required

Submit:
- En MVP: enviar a un endpoint que reenvíe a `info@crc.org` (Resend, Plunk, similar).
- Mostrar estado de envío inline (loading, success, error) sin redirección.

### Implementación con server actions

```typescript
// app/[locale]/contacto/actions.ts
'use server';

import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  inquiryType: z.enum(['research', 'coaching', 'camps', 'education', 'other']),
  subject: z.string().optional(),
  message: z.string().min(20),
  privacyAccepted: z.literal(true),
});

export async function submitContact(formData: FormData) {
  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, errors: parsed.error.flatten().fieldErrors };

  // Send email via Resend o similar
  // await sendEmail({ to: 'info@crc.org', ... });

  return { ok: true };
}
```

## Información lateral

- Dirección física (UGR Facultad CCD, Granada).
- Email principal: `info@crc.org` (placeholder hasta confirmar).
- Redes profesionales: ORCID, Google Scholar, LinkedIn, ResearchGate.
- Mini-grid con los 4 servicios y link a cada uno.

## Mobile

- El formulario va arriba a ancho completo.
- La información lateral va debajo del formulario, no a la derecha.
- Cada campo del formulario tiene altura mínima de 44px para tap target.
- Botón de envío a ancho completo.

## Mensajes

```json
{
  "contact": {
    "title": "Hablemos.",
    "subtitle": "Coaching, training camps, investigación o formación. Te respondemos en menos de 48 horas.",
    "form": {
      "name": "Nombre completo",
      "email": "Email",
      "inquiryType": "¿En qué te podemos ayudar?",
      "inquiryTypes": {
        "research": "Investigación o estudio ad-hoc",
        "coaching": "Coaching para mí o mi equipo",
        "camps": "Training camp",
        "education": "Formación o curso",
        "other": "Otra cosa"
      },
      "subject": "Asunto (opcional)",
      "message": "Cuéntanos más",
      "privacyAccepted": "Acepto la política de privacidad",
      "submit": "Enviar mensaje",
      "submitting": "Enviando…",
      "success": "Mensaje enviado. Te responderemos pronto.",
      "error": "Hubo un error. Inténtalo de nuevo o escribe a info@crc.org."
    },
    "info": {
      "addressTitle": "Dónde estamos",
      "address": "Facultad de Ciencias del Deporte\nUniversidad de Granada\n18007 Granada, España",
      "emailTitle": "Email directo",
      "socialTitle": "Redes profesionales",
      "servicesTitle": "Nuestros servicios"
    }
  }
}
```

## Verificación

- Enviar formulario de prueba → email llega.
- Validación: si quitas el email o el mensaje es corto, errores inline visibles.
- En mobile: formulario usable con un dedo, sin necesidad de zoom.

Próximo paso: `10-i18n.md`.
