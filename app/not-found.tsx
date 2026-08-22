import Link from 'next/link';

import { GradientBackground } from '@/components/providers/gradient-bg';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <GradientBackground>
      <section className="text-foreground relative mx-auto flex h-screen max-w-6xl flex-col items-center justify-center space-y-4 overflow-hidden rounded-lg py-8 pt-32 md:py-14 md:pt-36">
        <h2 className="text-4xl font-semibold">Not Found</h2>
        <p className="text-lg">The page you are looking for does not exist.</p>
        <Link href="/" title="Return Home" aria-label="Return Home">
          <Button
            variant="outline"
            size="lg"
            className="bg-slate-800 text-white hover:bg-slate-900 hover:text-white"
          >
            Return Home
          </Button>
        </Link>
      </section>
    </GradientBackground>
  );
}
