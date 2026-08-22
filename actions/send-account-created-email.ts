'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import CleanTruckCheckAccountCreatedEmail, {
  DEFAULT_TESTERS_SEARCH_URL,
} from '@/emails/clean-truck-check-account-created-email';
import {
  accountCreatedEmailFormSchema,
} from '@/features/account-created-email/schema';

const SUBJECT = 'Clean Truck Check — account created';

export async function sendAccountCreatedNotificationEmail(
  raw: unknown
): Promise<{ error?: string; ok: boolean }> {
  const parsed = accountCreatedEmailFormSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { error: first, ok: false };
  }

  const {
    customerName,
    entityId,
    recipientEmail,
    testersSearchUrl,
    testingType,
    vin,
  } = parsed.data;

  const trimmedUrl = testersSearchUrl.trim();
  const urlForEmail =
    trimmedUrl.length > 0 ? trimmedUrl : DEFAULT_TESTERS_SEARCH_URL;

  try {
    const html = await render(
      React.createElement(CleanTruckCheckAccountCreatedEmail, {
        customerName,
        entityId,
        testersSearchUrl: urlForEmail,
        testingType,
        vin,
      })
    );

    await sendEmail({
      to: recipientEmail.trim(),
      subject: SUBJECT,
      html,
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send account created email';
    return { error: message, ok: false };
  }
}
