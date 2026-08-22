import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Send vehicle testing reminder',
  description:
    'Send vehicle testing pending reminders with a link to find certified testers.',
};

export default function SendVehicleTestingReminderLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
