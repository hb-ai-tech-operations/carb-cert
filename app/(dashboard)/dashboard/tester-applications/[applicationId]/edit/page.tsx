'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { IconArrowLeft } from '@tabler/icons-react';
import { useQuery } from 'convex/react';

import type { Id } from '@/convex/_generated/dataModel';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { ApplicationDetailSkeleton } from '@/features/dashboard/components/order-application-detail/parts';
import { TesterApplicationEditForm } from '@/features/dashboard/components/tester-application-edit-form';

export default function TesterApplicationEditPage() {
  const params = useParams();
  const rawId = params?.applicationId;
  const applicationId =
    typeof rawId === 'string'
      ? (rawId as Id<'testerOnboardingApplications'>)
      : null;

  const detail = useQuery(
    api.testerOnboardingApplications.getById,
    applicationId ? { applicationId } : 'skip'
  );

  if (!applicationId) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
        <Alert variant="destructive">
          <AlertTitle>Invalid link</AlertTitle>
          <AlertDescription>
            This URL is missing a valid application id.{' '}
            <Link
              href="/dashboard/tester-applications"
              className="font-medium underline underline-offset-4"
            >
              Back to tester applications
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (detail === undefined) {
    return <ApplicationDetailSkeleton />;
  }

  if (detail === null) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
        <Alert>
          <AlertTitle>Application not found</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <span>
              We could not find this tester application. It may have been
              removed.
            </span>
            <Button variant="outline" size="sm" className="w-fit" asChild>
              <Link href="/dashboard/tester-applications">
                <IconArrowLeft data-icon="inline-start" />
                All tester applications
              </Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <TesterApplicationEditForm
      applicationId={applicationId}
      detail={detail}
    />
  );
}
