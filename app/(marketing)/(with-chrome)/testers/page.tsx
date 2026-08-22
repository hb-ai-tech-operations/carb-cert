import type { Metadata } from 'next';

import {
  buildTestersDirectoryJsonLd,
  loadPublicTesterProfiles,
  testersDirectoryMetadata,
  TestersDirectoryPage,
} from '@/features/testers';

export const metadata: Metadata = testersDirectoryMetadata;

export const revalidate = 120;

export default async function TestersPage() {
  const testers = await loadPublicTesterProfiles();

  return (
    <>
      {testers.length > 0 ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- JSON-LD requires raw script content
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildTestersDirectoryJsonLd(testers)),
          }}
        />
      ) : null}
      <TestersDirectoryPage testers={testers} />
    </>
  );
}
