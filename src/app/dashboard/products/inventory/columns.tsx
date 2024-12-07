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
      const router = useRouter();  

      const handleEdit = (id: string) => {
        router.push(`/edit/${id}`); 
      };

      const handleDelete = async (id: string) => {
        
        const formattedId = id.replace(/^:/, ""); 
      
        const confirmDelete = confirm("Are you sure you want to delete this item?");
        if (!confirmDelete) return;
      
        try {
          const res = await fetch(`https://rilo-inventory-server.vercel.app/api/v1/inventories/${formattedId}`, {
            method: "DELETE",
            headers: {
              Authorization:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUzMDM4YzdjNWFhNzQwM2FlOTkzOTMiLCJpYXQiOjE3MzM1MDQ5MjQsImV4cCI6MTczNDcxNDUyNH0.oj5KaVmkNyT86S-ZdX-yHF1fhqzX5vNlsHXa8oYPy6g",
              "Content-type": "application/json",
            },
          });
      
          if (res.ok) {
            alert("Item deleted successfully!");
            router.refresh(); 
          } else {
            const errorData = await res.json();
            console.error("Error deleting item:", errorData);
            alert("Failed to delete item.");
          }
        } catch (error) {
          console.error("Error deleting item:", error);
          alert("An error occurred while deleting the item.");
        }
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
            <DropdownMenuItem onClick={()=>handleDelete(row.original.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
