'use client';

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

interface CheckboxOption {
  label: string;
  value: string;
}

interface InputCheckboxGroupProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> {
  control: Control<T>;
  description?: string;
  disabled?: boolean;
  formItemClassName?: string;
  label?: string;
  messageClassName?: string;
  name: N;
  options: readonly CheckboxOption[];
  required?: boolean;
}

const InputCheckboxGroup = <
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>({
  control,
  name,
  label,
  description,
  required = false,
  disabled = false,
  options,
  messageClassName,
  formItemClassName,
}: InputCheckboxGroupProps<T, N>) => {
  const fieldPath = `ca-${String(name).replace(/\./g, '-')}`.toLowerCase();
  const descriptionId = `${fieldPath}-description`;
  const messageId = `${fieldPath}-message`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('space-y-2', formItemClassName)}>
          {label ? (
            <FormLabel className="gap-1 text-base">
              {label}
              {required ? (
                <span className="text-destructive ml-0" aria-label="required">
                  *
                </span>
              ) : null}
            </FormLabel>
          ) : null}
          {description ? (
            <FormDescription id={descriptionId}>{description}</FormDescription>
          ) : null}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {options.map(option => {
              const optionId = `${fieldPath}-${option.value}`;
              const currentValue = (field.value as string[]) ?? [];
              const isChecked = currentValue.includes(option.value);

              return (
                <FormItem
                  key={option.value}
                  className="flex flex-row items-center space-x-2 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      id={optionId}
                      checked={isChecked}
                      disabled={disabled}
                      className="border-slate-600"
                      onCheckedChange={(checked: boolean) => {
                        const next = checked
                          ? [...currentValue, option.value]
                          : currentValue.filter(
                            (v: string) => v !== option.value
                          );
                        field.onChange(next);
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor={optionId}
                    className="cursor-pointer text-sm font-normal"
                  >
                    {option.label}
                  </FormLabel>
                </FormItem>
              );
            })}
          </div>
          <FormMessage id={messageId} className={messageClassName} />
        </FormItem>
      )}
    />
  );
};

InputCheckboxGroup.displayName = 'InputCheckboxGroup';
export { InputCheckboxGroup };
export type { CheckboxOption };
