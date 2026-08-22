'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { IconArrowLeft, IconPencil } from '@tabler/icons-react';
import { useQuery } from 'convex/react';

import {
  ApplicationDetailSkeleton,
  DetailField,
} from './order-application-detail/parts';

import type { Id } from '@/convex/_generated/dataModel';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { useSetTesterApplicationStatus } from '@/features/dashboard/components/use-set-tester-application-status';
import { formatOrderDate } from '@/features/dashboard/lib/format-order-display';

// ── Helpers ────────────────────────────────────────────────────────────────

const statusBadgeVariant = (
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status === 'approved') {
    return 'default';
  }
  if (status === 'pending') {
    return 'secondary';
  }
  if (status === 'rejected') {
    return 'destructive';
  }
  return 'outline';
};

const formatList = (items: string[]): string =>
  items.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ');

const yesNo = (value: string): string => (value === 'yes' ? 'Yes' : 'No');

// ── Detail cards ───────────────────────────────────────────────────────────

interface Detail {
  averageTestingPrice: string | null;
  businessName: string;
  carbCredentialed: string;
  creationTime: number;
  email: string;
  fullName: string;
  id: string;
  listOnWebsite: string;
  minimumGVWR: string;
  mobileTestingAvailable: string;
  phone: string;
  preferredContact: string;
  promoteServices: string;
  responseTime: string;
  serviceArea: string;
  serviceRadius: string | null;
  status: string;
  submittedAt: number;
  testsPerformed: string[];
  vehicleTypes: string[];
  workingDays: string[];
  workingHours: string;
}

const ContactCard = ({ detail }: { detail: Detail }) => (
  <Card>
    <CardHeader>
      <CardTitle>Contact Information</CardTitle>
      <CardDescription>Primary tester contact details.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailField label="Full name" value={detail.fullName} />
        <DetailField label="Business name" value={detail.businessName} />
        <DetailField label="Email" value={detail.email} />
        <DetailField label="Phone" value={detail.phone} />
        <DetailField
          label="Preferred contact"
          value={detail.preferredContact}
        />
      </div>
    </CardContent>
  </Card>
);

const BusinessCard = ({ detail }: { detail: Detail }) => (
  <Card>
    <CardHeader>
      <CardTitle>Business Details</CardTitle>
      <CardDescription>Service area and mobile testing info.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <DetailField label="Service area" value={detail.serviceArea} />
        </div>
        <DetailField
          label="Mobile testing"
          value={yesNo(detail.mobileTestingAvailable)}
        />
        <DetailField label="Service radius" value={detail.serviceRadius} />
      </div>
    </CardContent>
  </Card>
);

const TestingCapabilityCard = ({ detail }: { detail: Detail }) => (
  <Card>
    <CardHeader>
      <CardTitle>Testing Capability</CardTitle>
      <CardDescription>
        Tests performed, vehicle types, and GVWR.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailField
          label="Tests performed"
          value={formatList(detail.testsPerformed)}
        />
        <DetailField
          label="Vehicle types"
          value={formatList(detail.vehicleTypes)}
        />
        <DetailField label="Minimum GVWR" value={detail.minimumGVWR} />
        <DetailField
          label="CARB credentialed"
          value={yesNo(detail.carbCredentialed)}
        />
      </div>
    </CardContent>
  </Card>
);

const AvailabilityCard = ({ detail }: { detail: Detail }) => (
  <Card>
    <CardHeader>
      <CardTitle>Availability & Operations</CardTitle>
      <CardDescription>Working schedule and response time.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <DetailField
            label="Working days"
            value={formatList(detail.workingDays)}
          />
        </div>
        <DetailField label="Working hours" value={detail.workingHours} />
        <DetailField
          label="Response time"
          value={detail.responseTime.replace(/_/g, ' ')}
        />
      </div>
    </CardContent>
  </Card>
);

const PricingMarketingCard = ({ detail }: { detail: Detail }) => (
  <Card>
    <CardHeader>
      <CardTitle>Pricing & Marketing</CardTitle>
      <CardDescription>Pricing and promotional preferences.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailField
          label="Average testing price"
          value={detail.averageTestingPrice}
        />
        <DetailField
          label="Promote services"
          value={yesNo(detail.promoteServices)}
        />
        <DetailField
          label="List on website"
          value={yesNo(detail.listOnWebsite)}
        />
      </div>
    </CardContent>
  </Card>
);

// ── Main component ─────────────────────────────────────────────────────────

export const TesterApplicationDetail = () => {
  const params = useParams();
  const rawId = params?.applicationId;
  const applicationId =
    typeof rawId === 'string'
      ? (rawId as Id<'testerOnboardingApplications'>)
      : null;

  const { isUpdating, setStatus } = useSetTesterApplicationStatus();

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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" className="w-fit px-2" asChild>
          <Link href="/dashboard/tester-applications">
            <IconArrowLeft data-icon="inline-start" />
            Tester Applications
          </Link>
        </Button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              {detail.fullName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {detail.businessName} · Submitted{' '}
              {formatOrderDate(detail.submittedAt)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="w-fit" asChild>
              <Link
                href={`/dashboard/tester-applications/${applicationId}/edit`}
              >
                <IconPencil data-icon="inline-start" />
                Edit details
              </Link>
            </Button>
            <Badge className="w-fit" variant={statusBadgeVariant(detail.status)}>
              {detail.status}
            </Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application decision</CardTitle>
          <CardDescription>
            Approve to allow a public directory listing when the applicant opted
            in. Reject or reset to pending as needed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            type="button"
            disabled={detail.status === 'approved' || isUpdating}
            onClick={() => {
              void setStatus(applicationId, 'approved');
            }}
          >
            Approve
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={detail.status === 'rejected' || isUpdating}
            onClick={() => {
              // eslint-disable-next-line no-alert -- confirm before destructive status
              if (!globalThis.confirm('Reject this application?')) {
                return;
              }
              void setStatus(applicationId, 'rejected');
            }}
          >
            Reject
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={detail.status === 'pending' || isUpdating}
            onClick={() => {
              void setStatus(applicationId, 'pending');
            }}
          >
            Mark pending
          </Button>
        </CardContent>
      </Card>

      <ContactCard detail={detail} />
      <BusinessCard detail={detail} />
      <TestingCapabilityCard detail={detail} />
      <AvailabilityCard detail={detail} />
      <PricingMarketingCard detail={detail} />
    </div>
  );
};
