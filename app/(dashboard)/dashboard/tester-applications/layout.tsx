import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tester Applications — Dashboard',
  description: 'Review and manage tester onboarding applications.',
};

export default function TesterApplicationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
