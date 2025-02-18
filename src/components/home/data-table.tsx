'use client';

import { cn } from '@src/lib/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
}

const statusOptions = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Active Verifiers',
    value: 'active',
  },
  {
    label: 'Pending Verifiers',
    value: 'awaiting-approval',
  },
  {
    label: 'Deactivated Verifiers',
    value: 'deactivated',
  },
];

const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection,
      pagination,
      columnFilters,
    },
  });
  const [status, setStatus] = useState('all');
  const statusHandler = (newStatus: string) => {
    setStatus(newStatus);
    table
      .getColumn('status')
      ?.setFilterValue(newStatus === 'all' ? undefined : newStatus);
  };
  return (
    <Fragment>
      <div className="mb-4 flex items-center justify-between">
        <Select
          value={status}
          onValueChange={(newStatus) => statusHandler(newStatus)}
        >
          <SelectTrigger className="max-w-xs border-none bg-white shadow-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Location"
            value={table.getColumn('location')?.getFilterValue() as string}
            onChange={(event) =>
              table.getColumn('location')?.setFilterValue(event.target.value)
            }
            className="w-full max-w-sm border-none bg-white text-xs placeholder:text-xs"
          />
          <Button size="lg">
            <Plus /> Add New Verifier
          </Button>
        </div>
      </div>
      <div className="rounded-md bg-white px-4 py-6 shadow-md">
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-sm font-bold text-title"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-medium text-[#808080]">
              Rows per page
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="w-16 rounded border border-[#C4C4C4] px-2 py-0.5"
            >
              {[5, 10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <Button
              variant="link"
              size="sm"
              onClick={() => table.previousPage()}
              className={cn(
                '!no-underline',
                !table.getCanPreviousPage() && 'text-[#808080]'
              )}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="link"
              size="sm"
              onClick={() => table.nextPage()}
              className={cn(
                '!no-underline',
                !table.getCanNextPage() && 'text-[#808080]'
              )}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default DataTable;
