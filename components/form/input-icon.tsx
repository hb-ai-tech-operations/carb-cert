import icons from '@/components/icons';
import { cn } from '@/lib/utils';

const INPUT_ICONS = {
  email: icons.email,
} as const;

export type InputIconType = keyof typeof INPUT_ICONS;

interface InputIconProps {
  className?: string;
  icon: InputIconType;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

const InputIcon = ({
  icon: iconName,
  className,
  position = 'left',
  size = 'md',
}: InputIconProps) => {
  const IconComponent = INPUT_ICONS[iconName];

  const sizeClasses = {
    sm: 'size-3',
    md: 'size-4',
    lg: 'size-5',
  };

  const positionClasses = {
    left: 'left-2',
    right: 'right-2',
  };

  return (
    <IconComponent
      className={cn(
        'text-muted-foreground/50 absolute z-20',
        sizeClasses[size],
        positionClasses[position],
        className
      )}
      aria-hidden="true"
      role="presentation"
    />
  );
};

InputIcon.displayName = 'InputIcon';

export { InputIcon };
