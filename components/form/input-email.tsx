'use client';

import { FormFieldController } from './form-field';
import { type InputIconType } from './input-icon';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Input as BaseInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputEmailProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> {
  autoComplete?: string;
  control: Control<T>;
  description?: string;
  disabled?: boolean;
  icon?: InputIconType;
  iconPosition?: 'left' | 'right';
  iconSize?: 'sm' | 'md' | 'lg';
  inputClassName?: string;
  label?: string;
  maxLength?: number;
  messageClassName?: string;
  minLength?: number;
  name: N;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
}

const getAutocompleteValue = (fieldName: string): string => {
  const normalizedName = fieldName.toLowerCase().replace(/[\s_-]/g, '');

  const autocompleteMap: Record<string, string> = {
    email: 'email',
    'email-address': 'email-address',
    username: 'username',
    normalizedName,
  };

  if (normalizedName in autocompleteMap) {
    return autocompleteMap[normalizedName];
  }

  return 'off';
};

const InputEmail = <
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>({
  control,
  name,
  label,
  placeholder,
  description,
  required = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  iconSize = 'md',
  maxLength,
  minLength,
  autoComplete,
  inputClassName,
  messageClassName,
}: InputEmailProps<T, N>) => {
  const autocompleteValue = autoComplete ?? getAutocompleteValue(String(name));

  return (
    <FormFieldController
      control={control}
      name={name}
      label={label}
      description={description}
      required={required}
      disabled={disabled}
      icon={icon}
      iconPosition={iconPosition}
      iconSize={iconSize}
      messageClassName={messageClassName}
    >
      {field => (
        <BaseInput
          {...field}
          id={field.id}
          value={field.value ?? ''}
          type="email"
          inputMode="email"
          autoComplete={autocompleteValue}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          aria-invalid={!!field.error}
          aria-describedby={description ? field.form_description_id : undefined}
          className={cn(
            icon && iconPosition === 'left' && 'pl-8',
            icon && iconPosition === 'right' && 'pr-8',
            inputClassName,
            'input-carb-cert'
          )}
        />
      )}
    </FormFieldController>
  );
};

InputEmail.displayName = 'InputEmail';
export { InputEmail };
