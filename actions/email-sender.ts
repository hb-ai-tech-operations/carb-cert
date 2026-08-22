'use server';

import { createTransport, type SendMailOptions } from 'nodemailer';
import { Resend } from 'resend';

import { logEmailSendToConvex } from '@/lib/convex-email-send-log';

const transport = createTransport({
  host: process.env.SMTP_HOST ?? '',
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

type SendEmailOptions = {
  html: React.ReactNode;
  subject: string;
  to: string | string[];
} & Omit<SendMailOptions, 'from' | 'subject' | 'to'>;

export async function sendEmail({ to, subject, ...rest }: SendEmailOptions) {
  const info = await transport.sendMail({
    from: process.env.SMTP_FROM,
    subject,
    to,
    ...rest,
    list: {
      help: `mailto:${process.env.SMTP_USER}?subject=help`,
      unsubscribe: [
        `mailto:${process.env.SMTP_USER}?subject=unsubscribe`,
        'https://carbcert.com/unsubscribe',
      ],
      post: `mailto:${process.env.SMTP_USER}`,
    },
  });
  const messageId =
    typeof info.messageId === 'string' ? info.messageId : undefined;
  await logEmailSendToConvex({
    subject,
    provider: 'smtp',
    externalId: messageId,
  });
  return info;
}

interface SendWithResendOptions {
  html: React.ReactNode;
  subject: string;
  to: string;
}
export async function sendWithResend({
  to,
  subject,
  html,
}: SendWithResendOptions) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? '');

  const { data, error } = await resend.emails.send({
    from: 'Carb Cert <support@carbcert.com>',
    to,
    subject,
    react: html,
  });

  if (error) {
    throw new Error(error.message);
  }

  const resendId = typeof data?.id === 'string' ? data.id : undefined;
  await logEmailSendToConvex({
    subject,
    provider: 'resend',
    externalId: resendId,
  });

  return data;
}

export default async function verifyConnection(): Promise<boolean> {
  const result = await transport.verify();
  return result ?? false;
}
