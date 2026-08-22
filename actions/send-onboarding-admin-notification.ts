'use server';

import { sendEmail } from '@/actions/email-sender';

interface TesterNotificationInput {
  businessName: string;
  carbCredentialed: string;
  email: string;
  fullName: string;
  phone: string;
  serviceArea: string;
}

/**
 * Sends a plain-text admin notification when a new tester onboarding form
 * is submitted. No-op if NEW_ORDER_NOTIFY_EMAIL is not set.
 */
export async function sendOnboardingAdminNotification(
  input: TesterNotificationInput
): Promise<{ error?: string; ok: boolean }> {
  const to = process.env.NEW_ORDER_NOTIFY_EMAIL;
  if (!to?.trim()) {
    return { ok: true };
  }

  const lines = [
    `New tester onboarding application received.`,
    ``,
    `Name: ${input.fullName}`,
    `Business: ${input.businessName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Service Area: ${input.serviceArea}`,
    `CARB Credentialed: ${input.carbCredentialed === 'yes' ? 'Yes' : 'No'}`,
    ``,
    `Review this application in the dashboard:`,
    `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.carbcert.com'}/dashboard/tester-applications`,
  ];

  try {
    await sendEmail({
      to,
      subject: `[Carb Cert] New tester application — ${input.fullName} (${input.businessName})`,
      html: lines.join('<br/>'),
      text: lines.join('\n'),
    });
    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send admin notification';
    return { ok: false, error: message };
  }
}
