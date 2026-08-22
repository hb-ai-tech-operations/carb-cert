'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import CtcPendingFollowupEmail from '@/emails/ctc-pending-followup-email';
import { signEmailPreferenceToken } from '@/features/email-preferences';

export interface SendCtcPendingFollowupEmailInput {
  recipientName: string;
  to: string;
}

const CTC_PENDING_FOLLOWUP_SUBJECT =
  'Action needed: Clean Truck Check (CTC) compliance may be pending';

/**
 * Sends {@link CtcPendingFollowupEmail} via SMTP ({@link sendEmail}).
 * Sets `preferencesToken` when `EMAIL_PREFERENCES_SECRET` is configured.
 */
export async function sendCtcPendingFollowupEmail(
  input: SendCtcPendingFollowupEmailInput
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
      React.createElement(CtcPendingFollowupEmail, {
        preferencesToken,
        recipientName: trimmedName,
      })
    );

    await sendEmail({
      to: trimmedTo,
      subject: CTC_PENDING_FOLLOWUP_SUBJECT,
      html,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send CTC pending follow-up email';
    return { error: message, ok: false };
  }
}
