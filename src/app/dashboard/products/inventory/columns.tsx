"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type Payment = {
  id: string;
  name: string;
  sku: string;
  type: string;
  available_quantity: number;
  action: string;
};

const caseInsensitiveFilter = (row: any, columnId: string, filterValue: string) => {
  const cellValue = String(row.getValue(columnId) ?? "").toLowerCase();
  return cellValue.includes(filterValue.toLowerCase());
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select", // Unique ID for the selection column
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={`Select row ${row.id}`}
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    filterFn: caseInsensitiveFilter,
  },
  {
    accessorKey: "sku",
    header: "SKU",
    filterFn: "includesString",
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: "includesString",
  },
  {
    accessorKey: "available_quantity",
    header: "Available Quantity",
    filterFn: "includesString",
  },
  {
    accessorKey: "action",
    header: "Action",
    filterFn: "includesString",
  },
];
