'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <section className="text-foreground mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center space-y-4 px-4 py-32 text-center">
      <h2 className="text-3xl font-semibold">Something went wrong</h2>
      <p className="text-lg">
        If you just completed a payment, it may have gone through. Please check
        your email for an invoice before trying again.
      </p>
      <Button
        variant="outline"
        size="lg"
        className="bg-slate-800 text-white hover:bg-slate-900 hover:text-white"
        onClick={reset}
      >
        Try again
      </Button>
    </section>
  );
}
