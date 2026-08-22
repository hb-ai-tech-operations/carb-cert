import React from 'react';

import { cn } from '@/lib/utils';

interface GradientBg {
  children: React.ReactNode;
  className?: string;
}
const GradientBackground = ({ children, className }: GradientBg) => (
  <div
    className={cn(
      'bg-background relative min-h-screen w-full transition-none',
      className
    )}
  >
    <div className="absolute inset-0 z-0 bg-[url('/images/hero-bg-dark.avif')] bg-cover bg-bottom bg-no-repeat" />
    {/* <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'url("/images/grain-effect.png")',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        backgroundPosition: 'bottom',
        mixBlendMode: 'overlay',
        opacity: 0.5,
      }}
    /> */}
    {children}
  </div>
);

GradientBackground.displayName = 'GradientBackground';

export { GradientBackground };
