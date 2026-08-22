import { cache } from 'react';

import { ConvexHttpClient } from 'convex/browser';

import type { PublicListedTesterApplication } from '@/features/testers/data/public-listed-tester';
import type { TesterProfile } from '@/features/testers/data/testers';

import { api } from '@/convex/_generated/api';
import { mapPublicListedTesterToProfile } from '@/features/testers/lib/map-public-tester-to-profile';

async function withConvexClient<T>(
  run: (client: ConvexHttpClient) => Promise<T>
): Promise<T | null> {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) {
    return null;
  }
  try {
    const client = new ConvexHttpClient(url);
    return await run(client);
  } catch {
    return null;
  }
}

export async function loadPublicListedTesters(): Promise<
  PublicListedTesterApplication[]
> {
  const result = await withConvexClient(client =>
    client.query(api.testerOnboardingApplications.listApprovedPublic, {})
  );
  return result ?? [];
}

export async function loadPublicListedTesterBySlug(
  slug: string
): Promise<PublicListedTesterApplication | null> {
  return await withConvexClient(client =>
    client.query(api.testerOnboardingApplications.getApprovedPublicBySlug, {
      slug,
    })
  );
}

export async function loadPublicTesterProfiles(): Promise<TesterProfile[]> {
  const rows = await loadPublicListedTesters();
  return rows.map(mapPublicListedTesterToProfile);
}

/**
 * Cached per request so `generateMetadata` and the page body share one Convex read (Next.js / React cache).
 */
export const loadPublicTesterProfileBySlug = cache(
  async (slug: string): Promise<TesterProfile | null> => {
    const row = await loadPublicListedTesterBySlug(slug);
    return row ? mapPublicListedTesterToProfile(row) : null;
  }
);
