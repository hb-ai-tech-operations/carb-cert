'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import OutreachDataEmail from '@/emails/outreach-data';
import { outreachDataEmailFormSchema } from '@/features/outreach-data-email/schema';

const SUBJECT = 'CARB data review: quick vehicle verification';

export async function sendOutreachDataEmail(
  raw: unknown
): Promise<{ error?: string; ok: boolean }> {
  const parsed = outreachDataEmailFormSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { error: first, ok: false };
  }

  const { email, last4VIN, name } = parsed.data;

  try {
    const html = await render(
      React.createElement(OutreachDataEmail, {
        last4VIN: last4VIN.trim().toUpperCase(),
        name: name.trim(),
      })
    );

    await sendEmail({
      to: email.trim(),
      subject: SUBJECT,
      html,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send outreach data email';
    return { error: message, ok: false };
  }
}
