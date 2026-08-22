'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import TesterOutreachEmail from '@/emails/tester-outreach';
import { testerOutreachFormSchema } from '@/features/tester-outreach/schema';

const SUBJECT = 'Carb Cert — emissions testing partnership';

export async function sendTesterOutreachEmail(
  raw: unknown
): Promise<{ error?: string; ok: boolean }> {
  const parsed = testerOutreachFormSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { error: first, ok: false };
  }

  const { email, name } = parsed.data;

  try {
    const html = await render(
      React.createElement(TesterOutreachEmail, { name })
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
        : 'Failed to send tester outreach email';
    return { error: message, ok: false };
  }
}
