"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';

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
    id: "select",
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
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const router = useRouter();  // Using useRouter inside the cell function

      const handleEdit = (id: string) => {
        router.push(`/edit/${id}`); // Perform the routing inside handleEdit
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h1 className="px-2 cursor-pointer">...</h1>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row.original.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete item with ID:", row.original.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
