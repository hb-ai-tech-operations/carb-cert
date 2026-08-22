'use client';

import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { IconArrowLeftDashed, IconArrowRightDashed } from '@tabler/icons-react';
import { useMutation } from 'convex/react';
import { AlertCircle, CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { FormSkeleton } from './form-skeleton';
import { StepIndicator } from './step-indicator';
import { StepRenderer } from './step-renderer';

import type { FormStepThreeHandle } from './step-three';
import type { Id } from '@/convex/_generated/dataModel';

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
  type StepDefinition,
  stepDefinitions,
} from '@/features/compliance-form/types';
import { runPostPaymentFollowUp } from '@/features/compliance-form/utils/post-payment-follow-up';
import { getStepStatus, type StepStatus } from '@/features/compliance-form/utils/step-validation';

// eslint-disable-next-line max-lines-per-function
export const FormCard = () => {
  const {
    canGoPrevious,
    currentStep,
    form,
    handleNextStep,
    handlePreviousStep,
    isHydrated,
    isLastStep,
    resetForm,
  } = useFormState();

  const saveApplication = useMutation(api.complianceApplications.save);
  const recordPayment = useMutation(api.complianceApplications.recordPaymentAttempt);

  const paymentRef = useRef<FormStepThreeHandle>(null);
  const savedApplicationId = useRef<Id<'complianceApplications'> | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentFormReady, setPaymentFormReady] = useState(false);

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

  const onSubmit = async () => {
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

      const appId = await saveApplication({
        applicationId: savedApplicationId.current ?? undefined,
        ...application,
        entityName: application.entityName ?? undefined,
        doingBusinessAs: application.doingBusinessAs ?? undefined,
        vehicles: vehicles.map(({ id: _id, ...vehicle }) => vehicle),
      });
      savedApplicationId.current = appId;

      if (!paymentRef.current) {
        return;
      }

      const paymentResult = await paymentRef.current.confirmPayment();
      let cardBrand: string | undefined;
      let cardLast4: string | undefined;

      if (paymentResult.paymentIntentId) {
        cardBrand =
          paymentResult.cardBrand ??
          (paymentResult.success
            ? (await getPaymentDetails(paymentResult.paymentIntentId)).cardBrand
            : undefined);
        cardLast4 =
          paymentResult.cardLast4 ??
          (paymentResult.success
            ? (await getPaymentDetails(paymentResult.paymentIntentId)).cardLast4
            : undefined);

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
            cardBrand,
            cardLast4,
          },
        });
      }

      if (!paymentResult.success) {
        setPaymentError(paymentResult.error ?? 'Payment failed. Please try again.');
        return;
      }

      const { invoiceError, invoiceSent } = await runPostPaymentFollowUp({
        appId,
        application,
        cardBrand,
        cardLast4,
        data,
        paymentResult,
        vehicles,
      });

      if (!invoiceSent) {
        toast.warning('Payment succeeded, but invoice email could not be sent', {
          description: invoiceError,
          duration: 6000,
          position: 'top-center',
        });
      }

      savedApplicationId.current = null;
      resetForm();
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

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          <Button
            size="lg"
            variant="outline"
            type="button"
            className="flex h-12 w-full sm:w-48 items-center justify-center gap-2 px-8 text-lg font-medium hover:bg-slate-900 hover:text-white"
            onClick={handlePreviousStep}
            disabled={!canGoPrevious || isProcessing}
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
            onClick={isLastStep ? undefined : handleNextStep}
            disabled={isProcessing || (isLastStep && !paymentFormReady)}
          >
            {(() => {
              let icon: ReactNode;
              let label: string;

              if (isProcessing) {
                icon = <Loader2 className="size-4 animate-spin" />;
                label = 'Processing...';
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
