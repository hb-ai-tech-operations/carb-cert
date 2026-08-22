'use client';

import type { Control, FieldPath, FieldValues } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface InputTextareaProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> {
  control: Control<T>;
  description?: string;
  disabled?: boolean;
  formItemClassName?: string;
  label?: string;
  maxLength?: number;
  messageClassName?: string;
  minLength?: number;
  name: N;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  textareaClassName?: string;
}

const InputTextarea = <
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
  maxLength,
  minLength,
  rows = 4,
  textareaClassName,
  messageClassName,
  formItemClassName,
}: InputTextareaProps<T, N>) => {
  const fieldPath = `ca-${String(name).replace(/\./g, '-')}`.toLowerCase();
  const inputId = `${fieldPath}-input`;
  const descriptionId = `${fieldPath}-description`;
  const messageId = `${fieldPath}-message`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={formItemClassName}>
          {label ? (
            <FormLabel htmlFor={inputId} className="gap-1 text-base">
              {label}
              {required ? (
                <span className="text-destructive ml-0" aria-label="required">
                  *
                </span>
              ) : null}
            </FormLabel>
          ) : null}
          <FormControl>
            <Textarea
              {...field}
              id={inputId}
              value={field.value ?? ''}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              minLength={minLength}
              rows={rows}
              aria-invalid={!!fieldState.error}
              aria-describedby={description ? descriptionId : undefined}
              className={cn('input-carb-cert resize-none', textareaClassName)}
            />
          </FormControl>
          {description ? (
            <FormDescription id={descriptionId}>{description}</FormDescription>
          ) : null}
          <FormMessage id={messageId} className={messageClassName} />
        </FormItem>
      )}
    />
  );
};

InputTextarea.displayName = 'InputTextarea';
export { InputTextarea };
