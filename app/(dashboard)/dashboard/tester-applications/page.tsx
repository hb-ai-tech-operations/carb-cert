'use client';

import { useQuery } from 'convex/react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/convex/_generated/api';
import { DataTable } from '@/features/dashboard/components/data-table';
import {
  type TesterApplicationRow,
  testerApplicationsColumns,
} from '@/features/dashboard/components/tester-applications-columns';

const STATUS_OPTIONS = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
];

const SKELETON_ROWS = 5;
const SKELETON_COLS = 7;

function TesterTableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: SKELETON_COLS }, (_, index) => (
              <TableHead key={`head-${index}`}>
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: SKELETON_ROWS }, (_rowPlaceholder, ri) => (
            <TableRow key={`row-${ri}`}>
              {Array.from({ length: SKELETON_COLS }, (_cellPlaceholder, ci) => (
                <TableCell key={`cell-${ri}-${ci}`}>
                  <Skeleton className="h-4 w-full max-w-[120px]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function TesterApplicationsPage() {
  const applications = useQuery(api.testerOnboardingApplications.list);

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tester Applications</h1>
      </div>
      {applications === undefined ? (
        <TesterTableSkeleton />
      ) : (
        <DataTable<TesterApplicationRow, unknown>
          columns={testerApplicationsColumns}
          data={applications}
          searchKey="fullName"
          statusFilterKey="status"
          statusOptions={STATUS_OPTIONS}
        />
      )}
    </div>
  );
}
