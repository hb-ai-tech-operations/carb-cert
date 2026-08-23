import { useCallback, useEffect, useMemo, useState } from 'react';
import { type Resolver, useForm, type UseFormReturn } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { type FormSchema, formSchema } from '../schemas';
import { stepDefinitions, type StepNumber } from '../types';
import {
  clearPersistedState,
  loadPersistedState,
  savePersistedState,
} from '../utils';

interface UseFormStateReturn {
  applicationId: string | null;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentStep: StepNumber;
  form: UseFormReturn<FormSchema>;
  handleNextStep: (
    onStepValid?: (data: FormSchema, step: StepNumber) => Promise<boolean>
  ) => Promise<void>;
  handlePreviousStep: () => void;
  handleSubmit: (
    onSubmit: (data: FormSchema) => void | Promise<void>
  ) => Promise<void>;
  isHydrated: boolean;
  isLastStep: boolean;
  resetForm: () => void;
  setApplicationId: (id: string | null) => void;
  stepConfig: (typeof stepDefinitions)[number];
}

const DEFAULT_VALUES: FormSchema = {
  acceptTerms: false,
  consentToMarketingMessages: false,
  applicationType: undefined,
  billingAddress: '',
  billingCity: '',
  billingCountry: '',
  billingState: '',
  billingZipCode: '',
  physicalCountry: undefined,
  doingBusinessAs: '',
  emailAddress: '',
  entityName: '',
  entityType: undefined,
  fullName: '',
  phone: '',
  physicalAddress: '',
  physicalCity: '',
  physicalState: '',
  physicalZipCode: '',
  vehicles: [],
};

const TOTAL_STEPS = stepDefinitions.length;
const PERSIST_DEBOUNCE_MS = 400;

function usePersistedFormSession(
  form: UseFormReturn<FormSchema>,
  currentStep: StepNumber,
  applicationId: string | null,
  setCurrentStep: (step: StepNumber) => void,
  setApplicationId: (id: string | null) => void
): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const persisted = loadPersistedState();
    if (persisted) {
      setCurrentStep(persisted.step);
      form.reset({ ...DEFAULT_VALUES, ...persisted.values } as FormSchema);
      if (persisted.applicationId) {
        setApplicationId(persisted.applicationId);
      }
    }
    setIsHydrated(true);
  }, [form, setApplicationId, setCurrentStep]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const persist = (values: FormSchema) => {
      savePersistedState({
        step: currentStep,
        values,
        applicationId: applicationId ?? undefined,
      });
    };

    persist(form.getValues());

    const subscription = form.watch(values => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        persist(values as FormSchema);
        timeoutId = null;
      }, PERSIST_DEBOUNCE_MS);
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [form, currentStep, applicationId, isHydrated]);

  return isHydrated;
}

export function useFormState(): UseFormStateReturn {
  const [currentStep, setCurrentStep] = useState<StepNumber>(1);
  const [applicationId, setApplicationId] = useState<string | null>(null);

  const stepConfig = useMemo(() => {
    const config = stepDefinitions.find(s => s.key === currentStep);
    if (!config) {
      throw new Error(`Step configuration for step ${currentStep} not found`);
    }
    return config;
  }, [currentStep]);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema) as Resolver<FormSchema>,
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
    shouldUnregister: false,
  });

  const isHydrated = usePersistedFormSession(
    form,
    currentStep,
    applicationId,
    setCurrentStep,
    setApplicationId
  );

  const handleNextStep = useCallback(
    async (
      onStepValid?: (data: FormSchema, step: StepNumber) => Promise<boolean>
    ) => {
      const fieldsToValidate = [...stepConfig.fields] as Array<keyof FormSchema>;
      const isValid = await form.trigger(fieldsToValidate, { shouldFocus: true });
      if (!isValid) {
        return;
      }

      if (onStepValid) {
        const shouldAdvance = await onStepValid(form.getValues(), currentStep);
        if (!shouldAdvance) {
          return;
        }
      }

      setCurrentStep(
        previous => Math.min(previous + 1, TOTAL_STEPS) as StepNumber
      );
    },
    [form, stepConfig.fields, currentStep]
  );

  const handlePreviousStep = useCallback(() => {
    setCurrentStep(previous => Math.max(previous - 1, 1) as StepNumber);
  }, []);

  const handleSubmit = useCallback(
    async (onSubmit: (data: FormSchema) => void | Promise<void>) => {
      const isValid = await form.trigger(undefined, { shouldFocus: true });
      if (!isValid) {
        return;
      }

      const finalData = form.getValues();
      await onSubmit(finalData);

      clearPersistedState();
      setApplicationId(null);
      setCurrentStep(1);
      form.reset(DEFAULT_VALUES);
    },
    [form]
  );

  const resetForm = useCallback(() => {
    clearPersistedState();
    setApplicationId(null);
    setCurrentStep(1);
    form.reset(DEFAULT_VALUES);
  }, [form]);

  const canGoNext = currentStep < TOTAL_STEPS;
  const canGoPrevious = currentStep > 1;
  const isLastStep = currentStep === TOTAL_STEPS;

  return {
    applicationId,
    canGoNext,
    canGoPrevious,
    currentStep,
    form,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    isHydrated,
    isLastStep,
    resetForm,
    setApplicationId,
    stepConfig,
  };
}
