"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from 'lucide-react'
import Link from "next/link"

interface Store {
  id: string
  url: string
  status: "active" | "inactive"
  consumerKey: string
  consumerSecret: string
}

export default function StoreManagement() {
  const [stores, setStores] = useState<Store[]>([
    {
      id: "1",
      url: "https://example.com",
      status: "inactive",
      consumerKey: "ghhghhkjkjlk;k;j;l",
      consumerSecret: "dfdfdgghfghghgj",
    },
    {
      id: "2",
      url: "https://mysite.com",
      status: "inactive",
      consumerKey: "ghjkkkkk12kjhh",
      consumerSecret: "ghyhjukoli8900",
    },
    {
      id: "3",
      url: "mystore.com",
      status: "active",
      consumerKey: "jhjkk12333",
      consumerSecret: "oooopiioo0123",
    },
  ])

  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const toggleStatus = (storeId: string) => {
    setStores(stores.map(store => {
      if (store.id === storeId) {
        return {
          ...store,
          status: store.status === "active" ? "inactive" : "active"
        }
      }
      return store
    }))
  }

  const filteredStores = stores.filter(store => {
    const matchesName = store.url.toLowerCase().includes(nameFilter.toLowerCase())
    const matchesStatus = store.status.toLowerCase().includes(statusFilter.toLowerCase())
    return matchesName && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stores</h1>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Name Filter</label>
          <Input
            placeholder="Search with store url..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Status Filter</label>
          <Input
            placeholder="Search with status..."
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex items-end">
          <Link href="/dashboard/sellingplatforms/stores/add">
          <Button className="bg-blue-500 hover:bg-blue-600">
            + Add Store
          </Button>
          </Link>
        </div>
      </div>

      <Table className="px-10">
        <TableHeader>
          <TableRow>
            <TableHead>Store URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumer Key</TableHead>
            <TableHead>Consumer Secret</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStores.map((store) => (
            <TableRow key={store.id}>
              <TableCell>{store.url}</TableCell>
              <TableCell>
                <Badge 
                  className="cursor-pointer"
                  variant={store.status === "active" ? "default" : "destructive"}
                  onClick={() => toggleStatus(store.id)}
                >
                  {store.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>{store.consumerKey}</TableCell>
              <TableCell>{store.consumerSecret}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

