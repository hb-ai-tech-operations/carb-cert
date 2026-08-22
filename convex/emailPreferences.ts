import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import {
  maskEmail,
  verifyEmailPreferenceToken,
} from './lib/emailPreferenceToken';

export const previewFromToken = query({
  args: { token: v.string() },
  handler: async (context, { token }) => {
    const secret = process.env.EMAIL_PREFERENCES_SECRET;
    if (!secret) {
      return null;
    }
    const parsed = await verifyEmailPreferenceToken(token, secret);
    if (!parsed) {
      return null;
    }
    const existing = await context.db
      .query('emailPreferences')
      .withIndex('by_email', q => q.eq('emailNormalized', parsed.email))
      .unique();
    return {
      maskedEmail: maskEmail(parsed.email),
      reminderOptOut: existing?.reminderOptOut ?? false,
    };
  },
});

export const setReminderPreference = mutation({
  args: {
    reminderOptOut: v.boolean(),
    token: v.string(),
  },
  handler: async (context, { reminderOptOut, token }) => {
    const secret = process.env.EMAIL_PREFERENCES_SECRET;
    if (!secret) {
      return { error: 'server_misconfigured' as const, ok: false as const };
    }
    const parsed = await verifyEmailPreferenceToken(token, secret);
    if (!parsed) {
      return { error: 'invalid_or_expired_token' as const, ok: false as const };
    }
    const now = Date.now();
    const existing = await context.db
      .query('emailPreferences')
      .withIndex('by_email', q => q.eq('emailNormalized', parsed.email))
      .unique();
    await (existing
      ? context.db.patch(existing._id, { reminderOptOut, updatedAt: now })
      : context.db.insert('emailPreferences', {
          emailNormalized: parsed.email,
          reminderOptOut,
          updatedAt: now,
        }));
    return { ok: true as const };
  },
});
