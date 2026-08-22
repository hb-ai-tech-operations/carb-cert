import type { Metadata } from 'next';

import { EmailPreferencesClient } from '@/features/email-preferences';
import { buildPageMetadata } from '@/lib/seo/metadata';


export const metadata: Metadata = {
  ...buildPageMetadata({
    canonicalPath: '/email/preferences',
    description:
      'Update Carb Cert email preferences for compliance reminders. Use the secure link from your email when possible.',
    index: false,
    title: 'Email preferences',
  }),
  robots: {
    googleBot: { follow: false, index: false },
    follow: false,
    index: false,
  },
};


function normalizeToken(
  value: string | string[] | undefined,
): string | undefined {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }
  if (Array.isArray(value) && value[0]?.trim()) {
    return value[0].trim();
  }
  return undefined;
}

export default async function EmailPreferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[]; }>;
}) {
  const params = await searchParams;
  const token = normalizeToken(params.token);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-28">
      <EmailPreferencesClient token={token} />
    </div>
  );
}
