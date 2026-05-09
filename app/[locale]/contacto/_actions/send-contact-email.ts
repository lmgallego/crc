'use server';

import { Resend } from 'resend';
import { contactSchema, type ContactInput } from '@/lib/contact/schema';

export type SendResult =
  | { ok: true }
  | { ok: false; fallback?: boolean; error?: string };

export async function sendContactEmail(input: ContactInput): Promise<SendResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: 'invalid' };
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, fallback: true };
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `Nuevo contacto: ${data.queryType} — ${data.name}`;
    const html = `
      <h2>Nuevo contacto desde la web</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${data.organization ? `<p><strong>Organización:</strong> ${escapeHtml(data.organization)}</p>` : ''}
      <p><strong>Tipo:</strong> ${escapeHtml(data.queryType)}</p>
      <hr/>
      <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
    `;

    await resend.emails.send({
      from: 'CRC Web <noreply@crc.org>',
      to: 'info@crc.org',
      replyTo: data.email,
      subject,
      html,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' };
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
