'use client';

import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
} from '@tabler/icons-react';
import { type ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TesterApplicationRowActions } from '@/features/dashboard/components/tester-application-row-actions';
import { formatOrderDate } from '@/features/dashboard/lib/format-order-display';

export interface TesterApplicationRow {
  businessName: string;
  carbCredentialed: string;
  creationTime: number;
  email: string;
  fullName: string;
  id: string;
  phone: string;
  preferredContact: string;
  status: string;
}

interface SortableColumnApi {
  getIsSorted: () => false | 'asc' | 'desc';
  toggleSorting: (desc?: boolean) => void;
}

const SortIcon = ({ sorted }: { sorted: false | 'asc' | 'desc' }) => {
  if (sorted === 'asc') {
    return <IconSortAscending data-icon="inline-end" />;
  }
  if (sorted === 'desc') {
    return <IconSortDescending data-icon="inline-end" />;
  }
  return <IconArrowsSort data-icon="inline-end" />;
};

const SortableHeader = ({
  column,
  label,
}: {
  column: SortableColumnApi;
  label: string;
}) => {
  const sorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3"
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      {label}
      <SortIcon sorted={sorted} />
    </Button>
  );
};

const testerStatusBadgeVariant = (
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

export const testerApplicationsColumns: Array<ColumnDef<TesterApplicationRow>> =
  [
    {
      accessorKey: 'fullName',
      header: ({ column }) => <SortableHeader column={column} label="Name" />,
      cell: ({ row }) => (
        <span className="max-w-[180px] truncate font-medium">
          {row.getValue('fullName')}
        </span>
      ),
    },
    {
      accessorKey: 'businessName',
      header: ({ column }) => (
        <SortableHeader column={column} label="Business" />
      ),
      cell: ({ row }) => (
        <span className="max-w-[200px] truncate text-muted-foreground">
          {row.getValue('businessName')}
        </span>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => <SortableHeader column={column} label="Email" />,
      cell: ({ row }) => (
        <span className="max-w-[200px] truncate text-muted-foreground">
          {row.getValue('email')}
        </span>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      enableSorting: false,
    },
    {
      accessorKey: 'carbCredentialed',
      header: 'CARB',
      enableSorting: false,
      cell: ({ row }) => {
        const value = row.getValue('carbCredentialed') as string;
        return (
          <Badge variant={value === 'yes' ? 'default' : 'outline'}>
            {value === 'yes' ? 'Yes' : 'No'}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <SortableHeader column={column} label="Status" />,
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge variant={testerStatusBadgeVariant(status)}>{status}</Badge>
        );
      },
      filterFn: (row, _columnId, value: string) =>
        row.getValue<string>('status') === value,
    },
    {
      accessorKey: 'creationTime',
      header: ({ column }) => <SortableHeader column={column} label="Date" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatOrderDate(row.getValue('creationTime'))}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      enableSorting: false,
      cell: ({ row }) => (
        <TesterApplicationRowActions
          applicationId={row.original.id}
          status={row.original.status}
        />
      ),
    },
  ];
