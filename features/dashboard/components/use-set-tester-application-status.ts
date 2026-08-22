'use client';

import { useCallback, useState } from 'react';

import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import type { Id } from '@/convex/_generated/dataModel';

import { api } from '@/convex/_generated/api';

type ApplicationStatus = 'approved' | 'pending' | 'rejected';

export function useSetTesterApplicationStatus() {
  const mutate = useMutation(
    api.testerOnboardingApplications.setApplicationStatus
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const setStatus = useCallback(
    async (
      applicationId: Id<'testerOnboardingApplications'>,
      status: ApplicationStatus
    ) => {
      setIsUpdating(true);
      try {
        const { publicListingPath } = await mutate({ applicationId, status });

        if (status === 'approved') {
          if (publicListingPath) {
            toast.success('Application approved', {
              description:
                'They are listed publicly (opted in on their application).',
              action: {
                label: 'View listing',
                onClick: () => {
                  window.open(
                    `${globalThis.location.origin}${publicListingPath}`,
                    '_blank',
                    'noopener,noreferrer'
                  );
                },
              },
            });
          } else {
            toast.success('Application approved', {
              description:
                'They did not opt in to a public directory listing on their application.',
            });
          }
        } else if (status === 'rejected') {
          toast.success('Application rejected');
        } else {
          toast.success('Status set to pending');
        }

        return { publicListingPath };
      } catch {
        toast.error('Could not update application status');
        return null;
      } finally {
        setIsUpdating(false);
      }
    },
    [mutate]
  );

  return { isUpdating, setStatus };
}
