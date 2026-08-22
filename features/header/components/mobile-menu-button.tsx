'use client';

import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenuButton = ({
  isOpen,
  onToggle,
}: MobileMenuButtonProps) => (
  <button
    onClick={onToggle}
    aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
  >
    <Menu className="m-auto size-6 duration-200 in-data-[state=active]:scale-0 in-data-[state=active]:rotate-180 in-data-[state=active]:opacity-0" />
    <X className="absolute inset-0 m-auto size-6 scale-0 -rotate-180 opacity-0 duration-200 in-data-[state=active]:scale-100 in-data-[state=active]:rotate-0 in-data-[state=active]:opacity-100" />
  </button>
);
