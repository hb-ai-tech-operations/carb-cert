import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit tester — Dashboard',
  description: 'Update tester application details.',
};

export default function TesterApplicationEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
