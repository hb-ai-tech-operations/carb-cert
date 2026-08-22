import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { isAuthenticated } from '@/lib/auth-server';
import { privateAreaMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = privateAreaMetadata;

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await isAuthenticated()) {
    redirect('/dashboard');
  }

  return children;
}
