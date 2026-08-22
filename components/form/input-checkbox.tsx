'use client';

import type { ReactNode } from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

interface InputCheckboxProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> {
  control: Control<T>;
  description?: string;
  disabled?: boolean;
  formItemClassName?: string;
  label: ReactNode;
  messageClassName?: string;
  name: N;
  required?: boolean;
}

const InputCheckbox = <
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>({
  control,
  name,
  label,
  description,
  required = false,
  disabled = false,
  messageClassName,
  formItemClassName,
}: InputCheckboxProps<T, N>) => {
  const fieldPath = `ca-${String(name).replace(/\./g, '-')}`.toLowerCase();
  const inputId = `${fieldPath}-input`;
  const descriptionId = `${fieldPath}-description`;
  const messageId = `${fieldPath}-message`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            'flex flex-row items-start space-x-2 space-y-0 leading-none gap-0',
            formItemClassName
          )}
        >
          <FormControl>
            <Checkbox
              id={inputId}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className='border-slate-600'
              aria-describedby={description ? descriptionId : undefined}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel htmlFor={inputId} className="cursor-pointer">
              {label}
              {required ? (
                <span className="text-destructive ml-1" aria-label="required">
                  *
                </span>
              ) : null}
            </FormLabel>
            {description ? (
              <FormDescription id={descriptionId}>{description}</FormDescription>
            ) : null}
            <FormMessage id={messageId} className={messageClassName} />
          </div>
        </FormItem>
      )}
    />
  );
};

InputCheckbox.displayName = 'InputCheckbox';
export { InputCheckbox };
