'use client';

import {
  type ReactNode,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react';

import { IconArrowLeftDashed, IconArrowRightDashed } from '@tabler/icons-react';
import { useMutation } from 'convex/react';
import { AlertCircle, CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { FormSkeleton } from './form-skeleton';
import { StepIndicator } from './step-indicator';
import { StepRenderer } from './step-renderer';

import type { FormStepThreeHandle } from './step-three';
import type { Id } from '@/convex/_generated/dataModel';
import type { FormSchema } from '@/features/compliance-form/schemas';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { api } from '@/convex/_generated/api';
import { getPaymentDetails } from '@/features/compliance-form/actions/get-payment-details';
import { FormErrorBoundary } from '@/features/compliance-form/components/form-error-boundary';
import { useFormState } from '@/features/compliance-form/hooks';
import {
  findSucceededPendingPayment,
  type PaymentResult,
} from '@/features/compliance-form/hooks/use-payment';
import {
  type StepDefinition,
  stepDefinitions,
  type StepNumber,
} from '@/features/compliance-form/types';
import {
  toBillingFields,
  toContactFields,
  toVehicleFields,
} from '@/features/compliance-form/utils/application-payload';
import { runPostPaymentFollowUp } from '@/features/compliance-form/utils/post-payment-follow-up';
import { getStepStatus, type StepStatus } from '@/features/compliance-form/utils/step-validation';

// eslint-disable-next-line max-lines-per-function
export const FormCard = () => {
  const {
    applicationId,
    canGoPrevious,
    currentStep,
    form,
    handleNextStep,
    handlePreviousStep,
    isHydrated,
    isLastStep,
    resetForm,
    setApplicationId,
  } = useFormState();

  const saveApplication = useMutation(api.complianceApplications.save);
  const saveProgress = useMutation(api.complianceApplications.saveProgress);
  const recordPayment = useMutation(api.complianceApplications.recordPaymentAttempt);

  const paymentRef = useRef<FormStepThreeHandle>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentFormReady, setPaymentFormReady] = useState(false);

  const draftApplicationId = applicationId as Id<'complianceApplications'> | null;

  useEffect(() => {
    if (currentStep !== 3) {
      setPaymentFormReady(false);
      setPaymentError(null);
    }
  }, [currentStep]);

  useEffect(() => {
    if (!paymentError || !isLastStep) {
      return;
    }
    toast.error('Payment failed', {
      description: paymentError,
      duration: 5000,
      position: 'top-center',
      icon: <AlertCircle className="size-4 text-destructive" />,
    });
  }, [paymentError, isLastStep]);

  const stepStatuses: StepStatus[] = useMemo(
    () =>
      (stepDefinitions as StepDefinition[]).map(step =>
        getStepStatus(step, currentStep, form.getValues())
      ),
    [currentStep, form]
  );

  const saveCompletedStep = async (data: FormSchema, step: StepNumber) => {
    setIsSaving(true);
    try {
      const nextStep = Math.min(step + 1, 3);
      const appId = await saveProgress({
        applicationId: draftApplicationId ?? undefined,
        currentStep: nextStep,
        ...toContactFields(data),
        ...(step >= 2 ? { vehicles: toVehicleFields(data.vehicles) } : {}),
      });
      setApplicationId(appId);
      return true;
    } catch {
      toast.error('Could not save your progress', {
        description: 'Please try again.',
        duration: 5000,
        position: 'top-center',
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const goToNextStep = async () => {
    await handleNextStep(saveCompletedStep);
  };

  const submitApplication = async (getPaymentResult: () => Promise<PaymentResult>) => {
    setPaymentError(null);
    setIsProcessing(true);

    try {
      const data = form.getValues();
      const {
        acceptTerms: _acceptTerms,
        consentToMarketingMessages: _consentToMarketingMessages,
        vehicles,
        ...application
      } = data;

      let appId: Id<'complianceApplications'>;
      let paymentResult: PaymentResult;
      try {
        appId = await saveApplication({
          applicationId: draftApplicationId ?? undefined,
          ...toContactFields(data),
          ...toBillingFields(data),
          vehicles: toVehicleFields(vehicles),
        });
        setApplicationId(appId);

        paymentResult = await getPaymentResult();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Payment submission failed:', error);
        setPaymentError('Could not process payment. Please check your connection and try again.');
        return;
      }

      let card: { cardBrand?: string; cardLast4?: string } = {
        cardBrand: paymentResult.cardBrand,
        cardLast4: paymentResult.cardLast4,
      };
      if (paymentResult.paymentIntentId) {
        try {
          if (paymentResult.success && !card.cardBrand) {
            card = await getPaymentDetails(paymentResult.paymentIntentId);
          }

          await recordPayment({
            applicationId: appId,
            payment: {
              stripePaymentIntentId: paymentResult.paymentIntentId,
              status: paymentResult.success ? 'succeeded' : 'failed',
              amount: paymentResult.amount ?? 0,
              currency: 'usd',
              errorCode: paymentResult.errorCode,
              declineCode: paymentResult.declineCode,
              errorMessage: paymentResult.error,
              ...card,
            },
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to record payment attempt:', error);
        }
      }

      if (!paymentResult.success) {
        setPaymentError(paymentResult.error ?? 'Payment failed. Please try again.');
        return;
      }

      // Card is charged from here on: never leave the customer on the payment
      // step, or they may pay twice.
      let invoiceSent = false;
      try {
        const followUp = await runPostPaymentFollowUp({
          appId,
          application,
          ...card,
          data,
          paymentResult,
          vehicles,
        });
        ({ invoiceSent } = followUp);
        if (!invoiceSent) {
          toast.warning('Payment succeeded, but invoice email could not be sent', {
            description: followUp.invoiceError,
            duration: 6000,
            position: 'top-center',
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Post-payment follow-up failed:', error);
      }

      resetForm();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Application submitted', {
        description: invoiceSent
          ? 'Your compliance application has been received. Check your email for the invoice.'
          : 'Your compliance application has been received.',
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onSubmit = () =>
    submitApplication(async () =>
      paymentRef.current
        ? paymentRef.current.confirmPayment()
        : { success: false, error: 'Payment form is not ready. Please try again.' }
    );

  // The page can reload after the card is charged but before the order is
  // finished (mobile tab discarded during 3DS). Finish it instead of asking
  // the customer to pay again.
  const recoveryChecked = useRef(false);
  const recoverPaidOrder = useEffectEvent(async () => {
    const paymentResult = await findSucceededPendingPayment().catch(() => null);
    if (paymentResult) {
      await submitApplication(async () => paymentResult);
    }
  });

  useEffect(() => {
    if (!isHydrated || recoveryChecked.current) {
      return;
    }
    recoveryChecked.current = true;
    void recoverPaidOrder();
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <FormErrorBoundary>
        <FormSkeleton />
      </FormErrorBoundary>
    );
  }

  return (
    <FormErrorBoundary>
      <Card className="w-full shadow-none">
        <CardHeader className="space-y-4">
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Form progress steps"
          >
            {stepStatuses.map(({ key, label, isActive, isCompleted }) => (
              <StepIndicator
                key={key as number}
                step={{ key: key as number, label: label as string }}
                isActive={isActive as boolean}
                isCompleted={isCompleted as boolean}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              key={`step-${currentStep}`}
              id="compliance-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <StepRenderer
                currentStep={currentStep}
                form={form}
                paymentRef={paymentRef}
                onPaymentFormReady={setPaymentFormReady}
              />
            </form>
          </Form>
        </CardContent>

        {/* Browser auto-translate rewrites text nodes React owns; the button
            label/icon swaps below can then crash the form mid-payment. */}
        <CardFooter
          className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0"
          translate="no"
        >
          <Button
            size="lg"
            variant="outline"
            type="button"
            className="flex h-12 w-full sm:w-48 items-center justify-center gap-2 px-8 text-lg font-medium hover:bg-slate-900 hover:text-white"
            onClick={handlePreviousStep}
            disabled={!canGoPrevious || isProcessing || isSaving}
          >
            <IconArrowLeftDashed className="size-4" />
            Previous
          </Button>
          <Button
            variant="default"
            size="lg"
            className="flex h-12 w-full sm:w-48 items-center justify-center gap-2 px-8 text-lg font-medium hover:bg-slate-900 hover:text-white"
            form="compliance-form"
            type={isLastStep ? 'submit' : 'button'}
            onClick={isLastStep ? undefined : goToNextStep}
            disabled={isProcessing || isSaving || (isLastStep && !paymentFormReady)}
          >
            {(() => {
              let icon: ReactNode;
              let label: string;

              if (isProcessing || isSaving) {
                icon = <Loader2 className="size-4 animate-spin" />;
                label = isProcessing ? 'Processing...' : 'Saving...';
              } else if (isLastStep) {
                icon = <CreditCard className="size-4" />;
                label = 'Pay & Submit';
              } else {
                label = 'Next';
                icon = <IconArrowRightDashed className="size-4" />;
              }

              return (
                <>
                  {label}
                  {icon}
                </>
              );
            })()}
          </Button>
        </CardFooter>
      </Card>
    </FormErrorBoundary>
  );
};

FormCard.displayName = 'FormCard';
