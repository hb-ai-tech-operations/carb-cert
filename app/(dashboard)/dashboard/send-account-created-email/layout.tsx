import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Send account email',
  description:
    'Send the Clean Truck Check account-created notification to a customer.',
};

export default function SendAccountCreatedEmailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
