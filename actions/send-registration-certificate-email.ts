'use server';

import React from 'react';

import { render } from '@react-email/components';

import { sendEmail } from '@/actions/email-sender';
import RegistrationCertificateSentEmail from '@/emails/registration-certificate-sent';
import { sendCertificateFormSchema } from '@/features/send-certificate/schema';

const SUBJECT = 'Your certificate has been processed';

function getSafeAttachmentName(file: File, vin: string) {
  const trimmed = file.name.trim();
  if (trimmed.length > 0) {
    return trimmed;
  }
  return `certificate-${vin}.pdf`;
}

export async function sendRegistrationCertificateEmail(
  formData: FormData
): Promise<{ error?: string; ok: boolean }> {
  const name = formData.get('name');
  const email = formData.get('email');
  const vin = formData.get('vin');
  const certificate = formData.get('certificate');

  const parsed = sendCertificateFormSchema.safeParse({
    name: typeof name === 'string' ? name : '',
    email: typeof email === 'string' ? email : '',
    vin: typeof vin === 'string' ? vin : '',
    certificate,
  });

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? 'Invalid input';
    return { error: first, ok: false };
  }

  const { certificate: certificateFile } = parsed.data;

  try {
    const html = await render(
      React.createElement(RegistrationCertificateSentEmail, {
        name: parsed.data.name,
        vin: parsed.data.vin,
      })
    );

    const buffer = Buffer.from(await certificateFile.arrayBuffer());

    await sendEmail({
      to: parsed.data.email.trim(),
      subject: SUBJECT,
      html,
      attachments: [
        {
          filename: getSafeAttachmentName(certificateFile, parsed.data.vin),
          content: buffer,
          contentType: certificateFile.type || 'application/octet-stream',
        },
      ],
    });

    return { ok: true };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to send registration certificate email';
    return { error: message, ok: false };
  }
}
