'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import ReminderEmail from '@/emails/reminder-email';
import { signEmailPreferenceToken } from '@/features/email-preferences';

export interface SendReminderEmailInput {
  recipientName: string;
  to: string;
}

const REMINDER_SUBJECT =
  'Reminder: California Clean Truck Check (CTC) compliance';

/**
 * Sends the compliance reminder using {@link ReminderEmail} via SMTP
 * ({@link sendEmail}).
 * Sets `preferencesToken` when `EMAIL_PREFERENCES_SECRET` is configured so the
 * footer unsubscribe link is tied to the recipient.
 */
export async function sendReminderEmail(
  input: SendReminderEmailInput
): Promise<{ error?: string; ok: boolean }> {
  const { recipientName, to } = input;
  const trimmedTo = to.trim();
  const trimmedName = recipientName.trim();
  if (!trimmedTo || !trimmedName) {
    return { error: 'Email and recipient name are required', ok: false };
  }

  let preferencesToken: string | undefined;
  try {
    preferencesToken = signEmailPreferenceToken(trimmedTo);
  } catch {
    // Missing or invalid secret (e.g. local dev): send without signed prefs URL.
  }

  try {
    const html = await render(
      React.createElement(ReminderEmail, {
        preferencesToken,
        recipientName: trimmedName,
      })
    );

    await sendEmail({
      to: trimmedTo,
      subject: REMINDER_SUBJECT,
      html,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to send reminder email';
    return { error: message, ok: false };
  }
}
