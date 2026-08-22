import { menuItems } from '../constants/menu';
import { CallToAction } from './call-to-action';
import { NavigationMenu } from './navigation-menu';

import { Logo } from '@/components/logo';

const MainHeader = () => (
  <header id="site-header" className="fixed inset-x-0 top-2 z-50 px-2 sm:px-0">
    {/* Skip link for keyboard users */}
    <a
      href="#main-content"
      className="focus:bg-primary focus:text-primary-foreground focus:ring-primary-foreground/20 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:flex focus:min-h-[44px] focus:items-center focus:rounded-md focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:transition-all focus:duration-150"
    >
      Skip to main content
    </a>

    <div className="bg-background/50 ring-border/50 supports-backdrop-filter:bg-background/40 mx-auto flex h-16 max-w-6xl items-center justify-between rounded-xl px-4 shadow-sm ring-1 backdrop-blur md:px-6">
      {/* Left: logo */}
      <Logo />

      {/* Center: nav (grows, centers on large screens) */}
      <div className="mx-4 hidden flex-1 items-center justify-center lg:flex">
        <NavigationMenu items={menuItems} />
      </div>

      {/* Right: CTA */}
      <div className="shrink-0">
        <CallToAction />
      </div>
    </div>
  </header>
);

MainHeader.displayName = 'MainHeader';
export { MainHeader };
