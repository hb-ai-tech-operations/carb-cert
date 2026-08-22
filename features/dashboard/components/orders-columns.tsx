"use client";

import Link from "next/link";

import {
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatOrderCurrency,
  formatOrderDate,
  orderStatusBadgeVariant,
} from "@/features/dashboard/lib/format-order-display";

export interface OrderRow {
  applicationType: string;
  creationTime: number;
  emailAddress: string;
  fullName: string;
  id: string;
  paymentAmount: number | null;
  paymentStatus: string | null;
  phone: string;
  status: string;
  vehicleCount: number;
}

interface SortableColumnApi {
  getIsSorted: () => false | "asc" | "desc";
  toggleSorting: (desc?: boolean) => void;
}

const SortIcon = ({ sorted }: { sorted: false | "asc" | "desc"; }) => {
  if (sorted === "asc") {
    return <IconSortAscending data-icon="inline-end" />;
  }
  if (sorted === "desc") {
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
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      <SortIcon sorted={sorted} />
    </Button>
  );
};

export const ordersColumns: Array<ColumnDef<OrderRow>> = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <SortableHeader column={column} label="Name" />,
    cell: ({ row }) => (
      <span className="max-w-[180px] truncate font-medium">
        {row.getValue("fullName")}
      </span>
    ),
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => <SortableHeader column={column} label="Email" />,
    cell: ({ row }) => (
      <span className="max-w-[200px] truncate text-muted-foreground">
        {row.getValue("emailAddress")}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableSorting: false,
  },
  {
    accessorKey: "vehicleCount",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column} label="Vehicles" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.getValue("vehicleCount")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={orderStatusBadgeVariant(status)}>{status}</Badge>
      );
    },
    filterFn: (row, _columnId, value: string) =>
      row.getValue<string>("status") === value,
  },
  {
    accessorKey: "paymentAmount",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader column={column} label="Payment" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {formatOrderCurrency(row.getValue("paymentAmount"))}
      </div>
    ),
  },
  {
    accessorKey: "creationTime",
    header: ({ column }) => <SortableHeader column={column} label="Date" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatOrderDate(row.getValue("creationTime"))}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    enableSorting: false,
    cell: ({ row }) => (
      <Button variant="outline" size="sm" asChild>
        <Link href={`/dashboard/orders/${row.original.id}`}>View</Link>
      </Button>
    ),
  },
];
