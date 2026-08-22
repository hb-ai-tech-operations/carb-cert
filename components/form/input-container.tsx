import React from 'react';

import { InputIcon, type InputIconType } from './input-icon';

import { cn } from '@/lib/utils';

interface InputContainerProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: InputIconType;
  iconPosition?: 'left' | 'right';
  iconSize?: 'sm' | 'md' | 'lg';
}

const InputContainer = ({
  as: Component = 'div',
  children,
  icon,
  iconPosition = 'left',
  iconSize = 'md',
  className,
  disabled = false,
  ...props
}: InputContainerProps) => (
  <Component
    className={cn(
      'relative flex items-center justify-start',
      disabled && 'cursor-not-allowed opacity-50',
      className
    )}
    {...props}
  >
    {icon ? (
      <InputIcon icon={icon} position={iconPosition} size={iconSize} />
    ) : null}
    {children}
  </Component>
);

InputContainer.displayName = 'InputContainer';

export { InputContainer };
