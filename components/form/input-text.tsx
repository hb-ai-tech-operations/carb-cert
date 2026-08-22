'use client';

import { FormFieldController } from './form-field';
import { type InputIconType } from './input-icon';

import type { ComponentProps } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Input as BaseInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface InputTextProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> {
  autoComplete?: string;
  control: Control<T>;
  description?: string;
  disabled?: boolean;
  formItemClassName?: string;
  icon?: InputIconType;
  iconPosition?: 'left' | 'right';
  iconSize?: 'sm' | 'md' | 'lg';
  inputClassName?: string;
  label?: string;
  maxLength?: number;
  messageClassName?: string;
  minLength?: number;
  name: N;
  onChange?: (value: string) => void;
  pattern?: string;
  placeholder?: string;
  required?: boolean;
  type?: ComponentProps<'input'>['type'];
}

const getAutocompleteValue = (fieldName: string): string => {
  const normalizedName = fieldName.toLowerCase().replace(/[\s_-]/g, '');

  const autocompleteMap: Record<string, string> = {
    firstname: 'given-name',
    lastname: 'family-name',
    name: 'name',
    organization: 'organization',
    company: 'organization',
    address: 'street-address',
    street: 'street-address',
  };

  if (normalizedName in autocompleteMap) {
    return autocompleteMap[normalizedName];
  }

  return 'off';
};

const InputText = <
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
  formItemClassName,
  onChange,
  type = 'text',
}: InputTextProps<T, N>) => {
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
      formItemClassName={formItemClassName}
    >
      {field => (
        <BaseInput
          {...field}

          id={field.id}
          value={field.value ?? ''}
          type={type}
          autoComplete={autocompleteValue}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          aria-invalid={!!field.error}
          aria-describedby={description ? field.form_description_id : undefined}
          className={cn(
            icon && iconPosition === 'left' && 'pl-8',
            icon && iconPosition === 'right' && 'pr-8',
            inputClassName,
            'input-carb-cert'
          )}
          onChange={(event) => {
            field.onChange(event.target.value);
            onChange?.(event.target.value);
          }}
        />
      )}
    </FormFieldController>
  );
};

InputText.displayName = 'InputText';
export { InputText };
