'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { IconArrowLeft } from '@tabler/icons-react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import type { Id } from '@/convex/_generated/dataModel';

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
import { mapTesterDetailToFormValues } from '@/features/dashboard/lib/map-tester-detail-to-form';
import {
  SectionAvailability,
  SectionBasicInfo,
  SectionBusinessDetails,
  SectionCertification,
  SectionMarketing,
  SectionPricing,
  SectionTestingCapability,
} from '@/features/tester-onboarding/components';
import {
  testerApplicationFieldsSchema,
  type TesterApplicationFieldsValues,
} from '@/features/tester-onboarding/schema';

type TesterApplicationDetail = Parameters<
  typeof mapTesterDetailToFormValues
>[0];

export const TesterApplicationEditForm = ({
  applicationId,
  detail,
}: {
  applicationId: Id<'testerOnboardingApplications'>;
  detail: TesterApplicationDetail;
}) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const updateApplication = useMutation(
    api.testerOnboardingApplications.updateApplication
  );

  const form = useForm<TesterApplicationFieldsValues>({
    resolver: zodResolver(testerApplicationFieldsSchema),
    defaultValues: mapTesterDetailToFormValues(detail),
  });

  useEffect(() => {
    form.reset(mapTesterDetailToFormValues(detail));
  }, [detail, form]);

  const onSubmit = async (data: TesterApplicationFieldsValues) => {
    setIsSaving(true);
    try {
      const { publicListingPath } = await updateApplication({
        applicationId,
        ...data,
        serviceRadius: data.serviceRadius?.trim() ?? undefined,
        averageTestingPrice: data.averageTestingPrice?.trim() ?? undefined,
      });

      toast.success('Tester details updated', {
        description: publicListingPath
          ? 'Public listing reflects the latest information.'
          : 'Changes saved to this application.',
        action: publicListingPath
          ? {
            label: 'View listing',
            onClick: () => {
              window.open(
                `${globalThis.location.origin}${publicListingPath}`,
                '_blank',
                'noopener,noreferrer'
              );
            },
          }
          : undefined,
      });

      router.push(`/dashboard/tester-applications/${applicationId}`);
      router.refresh();
    } catch {
      toast.error('Could not save changes', {
        description: 'Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6 lg:px-6">
      <Button variant="ghost" size="sm" className="w-fit px-2" asChild>
        <Link href={`/dashboard/tester-applications/${applicationId}`}>
          <IconArrowLeft data-icon="inline-start" />
          Back to application
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit tester details</CardTitle>
          <CardDescription>
            Update {detail.fullName}
            {detail.businessName ? ` · ${detail.businessName}` : ''}. Approved
            public listings update after you save.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-8"
              noValidate
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <SectionBasicInfo control={form.control} />
              <SectionBusinessDetails control={form.control} />
              <SectionTestingCapability control={form.control} />
              <SectionCertification control={form.control} />
              <SectionAvailability control={form.control} />
              <SectionPricing control={form.control} />
              <SectionMarketing control={form.control} />

              <div className="flex flex-wrap gap-2">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Saving…' : 'Save changes'}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link
                    href={`/dashboard/tester-applications/${applicationId}`}
                  >
                    Cancel
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
