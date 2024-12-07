"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getFilteredRowModel, ColumnFiltersState, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface DataWithId {
  id: string; // Add 'id' as a mandatory field
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

export function DataTable<TData extends DataWithId>({ columns, data }: DataTableProps<TData>) {
  const router = useRouter();
  const [tableData, setTableData] = React.useState<TData[]>(data);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({});

  const table = useReactTable({
    data: tableData,
    columns,
    state: { columnFilters, rowSelection },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id, 
  });

  const handleDeleteInventory = async () => {
    console.log(rowSelection)
    const selectedIds = Object.keys(rowSelection).filter((key) => rowSelection[key]);

    if (selectedIds.length === 0) {
      alert("Please select at least one row to delete.");
      return;
    }

    const confirmed = confirm("Are you sure you want to delete the selected items?");
    if (!confirmed) return;

    try {
      
      const response = await fetch(`https://rilo-inventory-server.vercel.app/api/v1/inventories/${selectedIds}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUzMDM4YzdjNWFhNzQwM2FlOTkzOTMiLCJpYXQiOjE3MzM1MDQ5MjQsImV4cCI6MTczNDcxNDUyNH0.oj5KaVmkNyT86S-ZdX-yHF1fhqzX5vNlsHXa8oYPy6g"
        },
        
      });

      if (response.ok) {
        const { deletedCount } = await response.json();
        alert(`Selected item deleted successfully.`);
        
        setTableData((prevData) =>
          prevData.filter((_, index) => !selectedIds.includes(prevData[index].id))
        );
        setRowSelection({});
      } else {
        const { message } = await response.json();
        alert(`Failed to delete items: ${message}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error}`);
    }
  };


  const handleAddInventory = ()=>{
    router.push('/add')
  }
  

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value || undefined)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <div className="flex justify-between items-center p-4">
          <button
            onClick={handleAddInventory}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Inventory
          </button>
          <button
            onClick={handleDeleteInventory}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => row.toggleSelected()}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
