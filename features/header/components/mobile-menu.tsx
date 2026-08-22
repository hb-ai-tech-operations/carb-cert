import Link from 'next/link';

import { type MenuItem } from '../constants/menu';

interface MobileMenuProps {
  items: MenuItem[];
}

export const MobileMenu = ({ items }: MobileMenuProps) => (
  <div className="lg:hidden">
    <ul className="space-y-6 text-base">
      {items.map(item => (
        <li key={item.name}>
          <Link
            href={item.href}
            className="text-muted-foreground hover:text-accent-foreground block duration-150"
          >
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
