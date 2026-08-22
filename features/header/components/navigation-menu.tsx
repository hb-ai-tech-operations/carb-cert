'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { MenuItem } from '../constants/menu';

interface NavigationMenuProps {
  items: MenuItem[];
}

export const NavigationMenu = ({ items }: NavigationMenuProps) => {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center gap-8 text-sm">
        {items.map(item => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <li key={item.name} className="min-w-0">
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring ring-offset-background block rounded-sm text-lg font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              >
                <span className="truncate">{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
