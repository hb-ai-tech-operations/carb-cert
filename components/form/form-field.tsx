import { InputContainer } from './input-container';
import { type InputIconType } from './input-icon';

import type {
  Control,
  ControllerRenderProps,
  FieldError,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface FormFieldControllerProps<
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
> {
  children: (
    field: ControllerRenderProps<T, N> & {
      error?: FieldError;
      form_description_id: string;
      form_item_id: string;
      form_message_id: string;
      id: string;
    }
  ) => React.ReactNode;
  control: Control<T>;
  description?: string;
  disabled?: boolean;
  formItemClassName?: string;
  icon?: InputIconType;
  iconPosition?: 'left' | 'right';
  iconSize?: 'sm' | 'md' | 'lg';
  label?: string;
  messageClassName?: string;
  name: N;
  required?: boolean;
}

const FormFieldController = <
  T extends FieldValues = FieldValues,
  N extends FieldPath<T> = FieldPath<T>,
>({
  control,
  name,
  label,
  required,
  description,
  icon,
  iconPosition,
  iconSize,
  disabled,
  children,
  messageClassName,
  formItemClassName,
}: FormFieldControllerProps<T, N>) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => {
      // Generate professional, unique IDs using field name and path
      const fieldPath = `ca-${String(name).replace(/\./g, '-')}`.toLowerCase();
      const fieldId = `${fieldPath}-field`;
      const inputId = `${fieldPath}-input`;
      const descriptionId = `${fieldPath}-description`;
      const messageId = `${fieldPath}-message`;

      return (
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
            <InputContainer
              icon={icon}
              iconPosition={iconPosition}
              iconSize={iconSize}
              disabled={disabled}
            >
              {children({
                ...field,
                error: fieldState.error,
                id: inputId,
                form_item_id: fieldId,
                form_description_id: descriptionId,
                form_message_id: messageId,
              })}
            </InputContainer>
          </FormControl>
          {description ? (
            <FormDescription id={descriptionId}>{description}</FormDescription>
          ) : null}
          <FormMessage id={messageId} className={messageClassName} />
        </FormItem>
      );
    }}
  />
);

FormFieldController.displayName = 'FormFieldController';

export { FormFieldController };
