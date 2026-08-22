'use client';

import { FormFieldController } from './form-field';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface SelectOption {
  label: string;
  value: string;
}

interface InputSelectProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> {
  control: Control<T>;
  description?: string;
  disabled?: boolean;
  formItemClassName?: string;
  itemClassName?: string;
  label?: string;
  messageClassName?: string;
  name: N;
  onValueChange?: (value: string) => void;
  options: readonly SelectOption[];
  placeholder?: string;
  required?: boolean;
  triggerClassName?: string;
}

const InputSelect = <
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
  options,
  triggerClassName,
  itemClassName,
  messageClassName,
  formItemClassName,
  onValueChange,
}: InputSelectProps<T, N>) => (
  <FormFieldController
    control={control}
    name={name}
    label={label}
    description={description}
    required={required}
    disabled={disabled}
    messageClassName={messageClassName}
    formItemClassName={formItemClassName}
  >
    {field => (
      <Select
        onValueChange={value => {
          field.onChange(value);
          onValueChange?.(value);
        }}
        disabled={disabled}
        {...field}
        autoComplete='off'
        value={(field.value as string) ?? ''}
      >
        <SelectTrigger
          id={field.id}
          aria-invalid={!!field.error}
          aria-describedby={description ? field.form_description_id : undefined}
          className={cn('w-full input-carb-cert', triggerClassName)}
        >
          <SelectValue placeholder={placeholder} className='truncate' />
        </SelectTrigger>
        <SelectContent position="popper" className="ca-cursor-pointer">
          {options.map(option => (
            <SelectItem
              key={option.value}
              value={String(option.value)}
              className={cn('text-lg ca-cursor-pointer truncate', itemClassName)}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )}
  </FormFieldController>
);

InputSelect.displayName = 'InputSelect';
export { InputSelect };
export type { SelectOption };
