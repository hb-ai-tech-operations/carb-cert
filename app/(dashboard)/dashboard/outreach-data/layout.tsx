import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Outreach data email',
  description: 'Send the CARB data review outreach email to a vehicle owner.',
};

export default function OutreachDataLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
