'use client';

import { useState } from 'react';
import { type Control, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import {
  SectionAgreement,
  SectionAvailability,
  SectionBasicInfo,
  SectionBusinessDetails,
  SectionCertification,
  SectionMarketing,
  SectionPricing,
  SectionTestingCapability,
} from './components';
import {
  type TesterApplicationFieldsValues,
  testerOnboardingFormSchema,
  type TesterOnboardingFormValues,
} from './schema';

import { sendOnboardingAdminNotification } from '@/actions/send-onboarding-admin-notification';
import { sendOnboardingThankYouEmail } from '@/actions/send-onboarding-thankyou-email';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { api } from '@/convex/_generated/api';

const defaultValues: TesterOnboardingFormValues = {
  fullName: '',
  businessName: '',
  publicNamePreference: 'full_name',
  phone: '',
  email: '',
  preferredContact: 'email',
  serviceArea: '',
  mobileTestingAvailable: 'no',
  serviceRadius: '',
  testsPerformed: [],
  vehicleTypes: [],
  minimumGVWR: '',
  carbCredentialed: 'yes',
  workingDays: [],
  workingHours: '9:00 AM – 5:00 PM',
  responseTime: 'within_24_hours',
  averageTestingPrice: '',
  promoteServices: 'yes',
  listOnWebsite: 'yes',
  agreement: false as unknown as true,
};

export const TesterOnboardingForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const saveApplication = useMutation(api.testerOnboardingApplications.save);
  const form = useForm<TesterOnboardingFormValues>({
    defaultValues,
    resolver: zodResolver(testerOnboardingFormSchema),
  });

  const fieldControl =
    form.control as unknown as Control<TesterApplicationFieldsValues>;

  const onSubmit = async (data: TesterOnboardingFormValues) => {
    setIsProcessing(true);
    try {
      const { agreement: _agreement, ...application } = data;
      await saveApplication({
        ...application,
        serviceRadius: application.serviceRadius ?? undefined,
        averageTestingPrice: application.averageTestingPrice ?? undefined,
      });

      // Fire-and-forget — don't block the success toast on email delivery
      void sendOnboardingThankYouEmail({
        email: data.email,
        name: data.fullName,
        businessName: data.businessName,
      });
      void sendOnboardingAdminNotification({
        fullName: data.fullName,
        businessName: data.businessName,
        email: data.email,
        phone: data.phone,
        serviceArea: data.serviceArea,
        carbCredentialed: data.carbCredentialed,
      });

      form.reset(defaultValues);
      toast.success('Application submitted!', {
        description:
          'Thank you for signing up. Our team will review your application and contact you shortly.',
        position: 'top-center',
      });
    } catch {
      toast.error('Submission failed', {
        description: 'Something went wrong. Please try again.',
        position: 'top-center',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">
          Tester Onboarding Application
        </CardTitle>
        <CardDescription>
          Complete all required fields below. We&apos;ll review your information
          and reach out within 1–2 business days.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-8"
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <SectionBasicInfo control={fieldControl} />
            <SectionBusinessDetails control={fieldControl} />
            <SectionTestingCapability control={fieldControl} />
            <SectionCertification control={fieldControl} />
            <SectionAvailability control={fieldControl} />
            <SectionPricing control={fieldControl} />
            <SectionMarketing control={fieldControl} />
            <SectionAgreement control={form.control} />

            <Button
              type="submit"
              disabled={isProcessing}
              size="lg"
              className="w-full sm:w-auto sm:self-end"
            >
              {isProcessing ? 'Submitting…' : 'Submit Application'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
