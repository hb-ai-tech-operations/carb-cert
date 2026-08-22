'use server';

import type { ContactUsFormValues } from '@/features/home-page/schemas/contact-us.schema';

import { sendEmail } from '@/actions/email-sender';
import { CONTACT_EMAIL } from '@/constants/app';

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Delivers the marketing contact form to your public support address.
 */
export async function sendContactUsMessage(
  data: ContactUsFormValues
): Promise<{ error?: string; ok: boolean }> {
  try {
    const body = [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Company: ${data.companyName}`,
      '',
      'Message:',
      data.message,
    ].join('\n');

    const safe = escapeHtml(body).replaceAll('\n', '<br />');

    await sendEmail({
      to: CONTACT_EMAIL,
      subject: `[Carb Cert] Website contact — ${data.fullName}`,
      html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.5">${safe}</div>`,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to send message';
    return { ok: false, error: message };
  }
}
