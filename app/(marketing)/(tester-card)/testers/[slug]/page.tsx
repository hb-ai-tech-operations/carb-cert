import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import {
  buildTesterMetadata,
  loadPublicTesterProfileBySlug,
  TesterDigitalCard,
} from '@/features/testers';

export const revalidate = 120;

export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string; }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tester = await loadPublicTesterProfileBySlug(slug);
  if (!tester) {
    return {
      title: 'Tester profile not found',
      description:
        'This tester profile is unavailable. Browse the Carb Cert certified testers directory to find active listings.',
      robots: {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true },
      },
    };
  }
  return buildTesterMetadata(tester);
}

export default async function TesterCardPage({ params }: PageProps) {
  const { slug } = await params;
  const tester = await loadPublicTesterProfileBySlug(slug);
  if (!tester) {
    notFound();
  }
  return <TesterDigitalCard tester={tester} />;
}
