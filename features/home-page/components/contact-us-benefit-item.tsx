import type { ElementType } from 'react';

interface ContactUsBenefitItemProps {
  description: string;
  Icon: ElementType<{ className?: string; }>;
  title: string;
}

export const ContactUsBenefitItem = ({
  description,
  Icon,
  title,
}: ContactUsBenefitItemProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-center gap-2">
      <Icon className="size-6 fill-primary stroke-1 text-slate-600 dark:fill-primary-foreground" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="pl-8 text-lg">{description}</p>
  </div>
);
