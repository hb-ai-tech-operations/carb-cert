'use client';

import { FormStepOne } from './step-one';
import { FormStepThree, type FormStepThreeHandle } from './step-three';
import { FormStepTwo } from './step-two';

import type { FormSchema } from '@/features/compliance-form/schemas';
import type { StepNumber } from '@/features/compliance-form/types';
import type { RefObject } from 'react';
import type { UseFormReturn } from 'react-hook-form';

interface StepRendererProps {
  currentStep: StepNumber;
  form: UseFormReturn<FormSchema>;
  onPaymentFormReady?: (ready: boolean) => void;
  paymentRef?: RefObject<FormStepThreeHandle | null>;
}

const StepRenderer = ({ currentStep, form, paymentRef, onPaymentFormReady }: StepRendererProps) => {
  switch (currentStep) {
    case 1:
      return <FormStepOne form={form} />;
    case 2:
      return <FormStepTwo form={form} />;
    case 3:
      return (
        <FormStepThree
          ref={paymentRef}
          form={form}
          onPaymentFormReady={onPaymentFormReady}
        />
      );
    default:
      throw new Error(`Invalid step: ${currentStep as number}`);
  }
};

StepRenderer.displayName = 'StepRenderer';
export { StepRenderer };
