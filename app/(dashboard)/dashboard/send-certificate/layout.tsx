import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Send certificate',
  description:
    'Send a registration certificate email with VIN details and certificate attachment.',
};

export default function SendCertificateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
