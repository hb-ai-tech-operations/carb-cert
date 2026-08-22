const textEncoder = new TextEncoder();

/** Masks an email for safe display (e.g. `ab…@example.com`). */
export function maskEmail(email: string): string {
  const trimmed = email.trim();
  const at = trimmed.lastIndexOf('@');
  if (at <= 0 || at === trimmed.length - 1) {
    return '***';
  }
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1);
  if (!local) {
    return `***@${domain}`;
  }
  const visible = local.length <= 2 ? local[0] : local.slice(0, 2);
  return `${visible}…@${domain}`;
}

function base64UrlToUint8Array(string_: string): Uint8Array {
  let base64 = string_.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    out[index] = binary.charCodeAt(index);
  }
  return out;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    textEncoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
}

/**
 * Verifies HMAC-signed preference tokens created by
 * `signEmailPreferenceToken` (features/email-preferences). Algorithm and
 * payload shape must stay aligned between the two implementations.
 */
export async function verifyEmailPreferenceToken(
  token: string,
  secret: string
): Promise<{ email: string } | null> {
  if (!token || !secret) {
    return null;
  }
  const dot = token.indexOf('.');
  if (dot <= 0 || dot === token.length - 1) {
    return null;
  }
  const payloadB64 = token.slice(0, dot);
  const sigB64 = token.slice(dot + 1);
  try {
    const payloadBytes = base64UrlToUint8Array(payloadB64);
    const sigBytes = base64UrlToUint8Array(sigB64);
    const key = await importHmacKey(secret);
    const ok = await crypto.subtle.verify(
      'HMAC',
      key,
      new Uint8Array(sigBytes),
      new Uint8Array(payloadBytes)
    );
    if (!ok) {
      return null;
    }
    const payload = JSON.parse(new TextDecoder().decode(payloadBytes)) as {
      e?: unknown;
      exp?: unknown;
    };
    if (typeof payload.e !== 'string' || typeof payload.exp !== 'number') {
      return null;
    }
    if (Date.now() > payload.exp) {
      return null;
    }
    const email = payload.e.trim().toLowerCase();
    if (!email.includes('@')) {
      return null;
    }
    return { email };
  } catch {
    return null;
  }
}
