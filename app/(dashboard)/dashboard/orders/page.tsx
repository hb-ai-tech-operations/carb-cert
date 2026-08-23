"use client";

import { useQuery } from "convex/react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { DataTable } from "@/features/dashboard/components/data-table";
import {
  type OrderRow,
  ordersColumns,
} from "@/features/dashboard/components/orders-columns";

const STATUS_OPTIONS = [
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Failed", value: "failed" },
];

const SKELETON_ROWS = 5;
const SKELETON_COLS = 8;

function OrdersTableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from(
              { length: SKELETON_COLS },
              (_headPlaceholder, columnIndex) => (
                <TableHead key={`head-${columnIndex}`}>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(
            { length: SKELETON_ROWS },
            (_rowPlaceholder, rowIndex) => (
              <TableRow key={`row-${rowIndex}`}>
                {Array.from(
                  { length: SKELETON_COLS },
                  (_cellPlaceholder, columnIndex) => (
                    <TableCell key={`cell-${rowIndex}-${columnIndex}`}>
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </TableCell>
                  )
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function DashboardOrdersPage() {
  const orders = useQuery(api.orders.listOrders);

  return (
    <div className="flex flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
      </div>
      {orders === undefined ? (
        <OrdersTableSkeleton />
      ) : (
        <DataTable<OrderRow, unknown>
          columns={ordersColumns}
          data={orders}
          searchKey="fullName"
          statusFilterKey="status"
          statusOptions={STATUS_OPTIONS}
        />
      )}
    </div>
  );
}
