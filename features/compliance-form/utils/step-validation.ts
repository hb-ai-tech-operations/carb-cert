import type { FormSchema } from '@/features/compliance-form/schemas';

import {
  type StepDefinition,
  stepDefinitions,
  type StepNumber,
} from '@/features/compliance-form/types';

interface StepStatus {
  isActive: boolean;
  isCompleted: boolean;
  key: number;
  label: string;
}

const isStepComplete = (
  stepKey: number,
  values: Partial<FormSchema>
): boolean => {
  const step = stepDefinitions.find(definition => definition.key === stepKey);
  if (!step) {
    return false;
  }
  return step.schema.safeParse(values).success;
};

const getStepStatus = (
  step: StepDefinition,
  currentStep: StepNumber,
  values: Partial<FormSchema>
): StepStatus => {
  const isActive = step.key === currentStep;
  const isCompleted =
    !isActive && (step.key < currentStep || isStepComplete(step.key, values));

  return { isActive, isCompleted, key: step.key, label: step.label };
};

export { getStepStatus, isStepComplete };
export type { StepStatus };
