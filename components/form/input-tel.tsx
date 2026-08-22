'use client';

import { useCallback } from 'react';

import { FormFieldController } from './form-field';
import { type InputIconType } from './input-icon';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Input as BaseInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputTelProps<
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
    tel: 'tel',
    telephone: 'tel',
    phone: 'tel',
    mobile: 'tel',
    pager: 'tel',
    fax: 'fax',
  };

  if (normalizedName in autocompleteMap) {
    return autocompleteMap[normalizedName];
  }

  return 'off';
};

function formatPhoneNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length === 0) {
    return '';
  }
  if (digits.length <= 3) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const InputTel = <
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
  pattern,
  autoComplete,
  inputClassName,
  messageClassName,
}: InputTelProps<T, N>) => {
  const autocompleteValue = autoComplete ?? getAutocompleteValue(String(name));

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, fieldOnChange: (...args: unknown[]) => void) => {
      fieldOnChange(formatPhoneNumber(event.target.value));
    },
    [],
  );

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
          id={field.id}
          name={field.name}
          ref={field.ref}
          value={field.value ?? ''}
          onChange={event => handleChange(event, field.onChange)}
          onBlur={field.onBlur}
          type="text"
          autoComplete={autocompleteValue}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          inputMode="tel"
          pattern={pattern}
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

InputTel.displayName = 'InputTel';
export { InputTel };
