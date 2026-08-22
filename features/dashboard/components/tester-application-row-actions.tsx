'use client';

import Link from 'next/link';

import { IconDotsVertical } from '@tabler/icons-react';

import type { Id } from '@/convex/_generated/dataModel';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSetTesterApplicationStatus } from '@/features/dashboard/components/use-set-tester-application-status';

export const TesterApplicationRowActions = ({
  applicationId,
  status,
}: {
  applicationId: string;
  status: string;
}) => {
  const { isUpdating, setStatus } = useSetTesterApplicationStatus();
  const id = applicationId as Id<'testerOnboardingApplications'>;

  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="outline" size="sm" asChild>
        <Link href={`/dashboard/tester-applications/${applicationId}`}>
          View
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={isUpdating}
            aria-label="Update application status"
          >
            <IconDotsVertical className="size-4" data-icon="inline-start" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/tester-applications/${applicationId}/edit`}>
              Edit details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={status === 'approved' || isUpdating}
            onClick={() => {
              void setStatus(id, 'approved');
            }}
          >
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={status === 'rejected' || isUpdating}
            onClick={() => {
              // eslint-disable-next-line no-alert -- confirm before destructive status
              if (!globalThis.confirm('Reject this application?')) {
                return;
              }
              void setStatus(id, 'rejected');
            }}
          >
            Reject
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={status === 'pending' || isUpdating}
            onClick={() => {
              void setStatus(id, 'pending');
            }}
          >
            Mark pending
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
