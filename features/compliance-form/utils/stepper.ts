import { stepDefinitions, type StepNumber } from '../types';

export const steps = stepDefinitions;

export const stepIndexByKey = Object.fromEntries(
  steps.map((step, index) => [step.key, index])
) as Record<StepNumber, number>;

export const stepKeyByIndex = Object.fromEntries(
  steps.map((step, index) => [index, step.key])
) as Record<number, StepNumber>;

export function clampStep(index: number): StepNumber {
  const clampedIndex = Math.max(0, Math.min(index, steps.length - 1));
  return stepKeyByIndex[clampedIndex];
}

export function getNextStep(currentStep: StepNumber): StepNumber | null {
  const currentIndex = stepIndexByKey[currentStep];
  const nextIndex = currentIndex + 1;

  if (nextIndex >= steps.length) {
    return null;
  }

  return stepKeyByIndex[nextIndex];
}

export function getPreviousStep(currentStep: StepNumber): StepNumber | null {
  const currentIndex = stepIndexByKey[currentStep];
  const previousIndex = currentIndex - 1;

  if (previousIndex < 0) {
    return null;
  }

  return stepKeyByIndex[previousIndex];
}

export function isFirstStep(step: StepNumber): boolean {
  return step === 1;
}

export function isLastStep(step: StepNumber): boolean {
  return step === steps.length;
}
