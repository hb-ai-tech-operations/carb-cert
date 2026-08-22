import { createHmac } from 'node:crypto';

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
/** Default link lifetime for preference URLs (400 days). */
const TOKEN_TTL_DAYS = 400;
const TOKEN_TTL_MS =
  TOKEN_TTL_DAYS *
  HOURS_PER_DAY *
  MINUTES_PER_HOUR *
  SECONDS_PER_MINUTE *
  MS_PER_SECOND;

const MIN_SECRET_LENGTH = 16;

/**
 * Signs an email address for use in `/email/preferences?token=…`.
 * Requires `EMAIL_PREFERENCES_SECRET` (same value in Convex environment).
 *
 * Payload and HMAC must match `convex/lib/emailPreferenceToken.ts`.
 */
export function signEmailPreferenceToken(email: string): string {
  const secret = process.env.EMAIL_PREFERENCES_SECRET?.trim();
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new Error(
      `EMAIL_PREFERENCES_SECRET must be set (min ${String(MIN_SECRET_LENGTH)} characters) to sign preference links`
    );
  }
  const normalized = email.trim().toLowerCase();
  const payload = JSON.stringify({
    e: normalized,
    exp: Date.now() + TOKEN_TTL_MS,
  });
  const payloadB64 = Buffer.from(payload, 'utf8').toString('base64url');
  const sig = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payloadB64}.${sig}`;
}
