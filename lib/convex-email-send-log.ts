import { ConvexHttpClient } from 'convex/browser';

import { api } from '@/convex/_generated/api';

export type EmailSendLogProvider = 'smtp' | 'resend';

/**
 * Persists a minimal send record to Convex (subject, provider, time; optional provider id).
 * No email body or recipients. Fails silently so outbound mail is never blocked by logging.
 */
export async function logEmailSendToConvex(args: {
  externalId?: string;
  provider: EmailSendLogProvider;
  subject: string;
}): Promise<void> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  const secret = process.env.EMAIL_SEND_LOG_SECRET;
  if (!url || !secret) {
    return;
  }
  try {
    const client = new ConvexHttpClient(url);
    await client.mutation(api.emailSendLogs.append, {
      secret,
      subject: args.subject,
      provider: args.provider,
      externalId: args.externalId,
    });
  } catch {
    // intentionally ignore — logging must not affect send success
  }
}
