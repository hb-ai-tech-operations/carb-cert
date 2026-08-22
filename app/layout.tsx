import React from 'react';
import { Anek_Latin } from 'next/font/google';

import type { Metadata } from 'next';

import '@/styles/globals.css';
import { ConvexClientProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import { getToken } from '@/lib/auth-server';
import { buildRootMetadata, buildViewport } from '@/lib/seo/metadata';

export const metadata: Metadata = buildRootMetadata();

const anekLatin = Anek_Latin({
  variable: '--font-anek-latin',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
});

export const viewport = buildViewport();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();
  return (
    <html lang="en">
      <body className={`${anekLatin.variable} antialiased`}>
        <ConvexClientProvider initialToken={token}>
          {children}
          <Toaster richColors />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
