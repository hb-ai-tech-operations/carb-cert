import { v } from 'convex/values';

import { mutation } from './_generated/server';

/**
 * Append-only log of outbound email metadata (no body). Protected by
 * `EMAIL_SEND_LOG_SECRET` matching the Next.js server env of the same name.
 */
export const append = mutation({
  args: {
    secret: v.string(),
    subject: v.string(),
    provider: v.union(v.literal('smtp'), v.literal('resend')),
    externalId: v.optional(v.string()),
  },
  handler: async (context, args) => {
    const expected = process.env.EMAIL_SEND_LOG_SECRET;
    if (!expected || args.secret !== expected) {
      throw new Error('unauthorized');
    }
    await context.db.insert('emailSendLogs', {
      subject: args.subject,
      sentAt: Date.now(),
      provider: args.provider,
      externalId: args.externalId,
    });
  },
});
