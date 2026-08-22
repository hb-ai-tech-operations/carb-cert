import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Send reminder',
  description:
    'Send Clean Truck Check compliance reminder emails to recipients.',
};

export default function SendReminderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
