import Link from 'next/link';

import { ShieldAlert } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { CONTACT_NAME, PRICE_BASE_FORMATTED } from '@/constants/app';

const Footer = () => (
  <footer className="bg-background">
    <div className="border-primary/20 bg-background/50 mx-auto max-w-6xl space-y-6 rounded-t-2xl border px-4 py-6 shadow-sm backdrop-blur-md">
      {/* Disclaimer Alert */}
      <Alert className="border-none bg-amber-500/10 text-sm text-amber-900">
        <ShieldAlert className="h-4 w-4 text-amber-500" aria-hidden="true" />
        <AlertTitle className="line-clamp-4 text-base font-medium md:text-lg">
          {CONTACT_NAME} is a private third-party service provider. Our <strong>{PRICE_BASE_FORMATTED} service fee</strong> covers CTC-VIS reporting assistance and compliance management. We are not affiliated with or endorsed by CARB or any government agency. <br />
          <strong>Emissions testing must be completed at CARB-authorized testing facilities.</strong>
        </AlertTitle>
      </Alert>

      {/* Footer content */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Logo */}
        <div className="flex items-center justify-center md:col-span-1">
          <Logo />
        </div>

        {/* Navigation links */}
        <nav
          aria-label="Footer Navigation"
          className="col-span-full lg:col-span-2"
        >
          <ul className="flex flex-wrap items-center justify-center gap-6 text-lg font-medium">
            <li>
              <Link href="/#faq">FAQ</Link>
            </li>
            <li>
              <Link href="/#pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-and-conditions">Terms and Conditions</Link>
            </li>
          </ul>
        </nav>
      </div>

      <hr className="border-border/40" />

      {/* Bottom row */}
      <div className="text-muted-foreground flex flex-col items-center justify-between gap-2 text-sm md:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {CONTACT_NAME}. All rights reserved.
        </p>
        <p className="text-xs">
          Designed for transparency & compliance awareness.
        </p>
      </div>
    </div>
  </footer>
);

Footer.displayName = 'Footer';
export { Footer };
