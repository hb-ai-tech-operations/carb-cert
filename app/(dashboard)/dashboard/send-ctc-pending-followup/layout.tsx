import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Send CTC pending follow-up',
  description:
    'Send Clean Truck Check pending compliance follow-up emails to recipients.',
};

export default function SendCtcPendingFollowupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
