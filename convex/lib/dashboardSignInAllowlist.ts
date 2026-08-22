/** Emails permitted to use dashboard email/password sign-in. Keep in sync with product policy. */
export const DASHBOARD_SIGN_IN_ALLOWED_EMAILS = [
  'info@carbcert.com',
  'support@carbcert.com',
] as const;

export function isAllowedDashboardSignInEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return (DASHBOARD_SIGN_IN_ALLOWED_EMAILS as readonly string[]).includes(
    normalized
  );
}
