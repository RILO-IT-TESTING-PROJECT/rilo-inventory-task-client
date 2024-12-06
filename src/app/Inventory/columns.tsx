"use client"

import { ColumnDef } from "@tanstack/react-table"



export type Payment = {
  id: string
  name: string
  sku: string
  type: string
  available_quantity: number
  action: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "available_quantity",
    header: "Available Quantity",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
]
