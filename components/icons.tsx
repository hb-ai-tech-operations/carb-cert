import { Mail } from 'lucide-react';

import type { ComponentType, SVGProps } from 'react';

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type IconName = 'email';

export const icons: Record<IconName, IconComponent> = {
  email: Mail,
} as const;

export default icons;
