import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tester outreach',
  description:
    'Send the Carb Cert certified-tester partnership email to a prospect.',
};

export default function TesterOutreachLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
