import { ROUTES } from '@/constants/app';

export interface MenuItem {
  href: string;
  name: string;
}

export const menuItems: MenuItem[] = [
  { name: 'Services', href: ROUTES.SERVICES },
  { name: 'Pricing', href: ROUTES.PRICING },
  { name: 'Testers', href: ROUTES.TESTERS },
  { name: 'Blog', href: ROUTES.BLOG },
  { name: 'FAQ', href: ROUTES.FAQ },
  { name: 'Contact Us', href: ROUTES.CONTACT_US },
];
