"use client";

import { useState } from "react";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  type Table as TanstackTable,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: Array<ColumnDef<TData, TValue>>;
  data: TData[];
  searchKey?: string;
  statusFilterKey?: string;
  statusOptions?: Array<{ label: string; value: string }>;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50];

const DataTableToolbar = <TData,>({
  globalFilter,
  onGlobalFilterChange,
  statusFilterKey,
  statusOptions,
  table,
}: {
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  statusFilterKey?: string;
  statusOptions?: Array<{ label: string; value: string }>;
  table: TanstackTable<TData>;
}) => (
  <div className="flex items-center gap-3">
    <Input
      placeholder="Search by name or email..."
      value={globalFilter}
      onChange={(event) => onGlobalFilterChange(event.target.value)}
      className="max-w-sm"
    />
    {statusFilterKey && statusOptions ? (
      <Select
        value={
          (table.getColumn(statusFilterKey)?.getFilterValue() as string) ?? "all"
        }
        onValueChange={(value) =>
          table
            .getColumn(statusFilterKey)
            ?.setFilterValue(value === "all" ? undefined : value)
        }
      >
        <SelectTrigger className="w-[140px]" size="default">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            <SelectItem value="all">All statuses</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    ) : null}
  </div>
);

const DataTableGrid = <TData, TValue>({
  columns,
  table,
}: {
  columns: Array<ColumnDef<TData, TValue>>;
  table: TanstackTable<TData>;
}) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </div>
);

const DataTablePagination = <TData,>({
  table,
}: {
  table: TanstackTable<TData>;
}) => (
  <div className="flex items-center justify-between">
    <p className="text-sm text-muted-foreground">
      {table.getFilteredRowModel().rows.length} total row(s)
    </p>
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows</span>
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(value) => table.setPageSize(Number(value))}
        >
          <SelectTrigger className="w-[70px]" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <span className="text-sm text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconChevronLeft data-icon="inline-start" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <IconChevronRight data-icon="inline-end" />
        </Button>
      </div>
    </div>
  </div>
);

const DataTable = <TData, TValue>({
  columns,
  data,
  searchKey = "fullName",
  statusFilterKey,
  statusOptions,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "creationTime", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const search = filterValue.toLowerCase();
      const name = String(row.getValue(searchKey) ?? "").toLowerCase();
      const email = String(row.getValue("emailAddress") ?? "").toLowerCase();
      return name.includes(search) || email.includes(search);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <DataTableToolbar
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        statusFilterKey={statusFilterKey}
        statusOptions={statusOptions}
        table={table}
      />
      <DataTableGrid table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
};

export { DataTable };
