"use client"

import React, { useState, useEffect } from "react"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { deleteStore, getStores, Store, updateStoreStatus } from "@/lib/action-stores"
import { useToast } from "@/hooks/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function StoreManagement() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [nameFilter, setNameFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadStores()
  }, [])

  const loadStores = async () => {
    try {
      const data = await getStores()
      setStores(data)
    } catch (error) {
      console.error("Failed to fetch stores:", error)
    } finally {
      setLoading(false)
    }
  }
  const formatStoreStatus = (status: boolean): string => {
    return status ? 'Active' : 'Inactive';
  }
  
  const formatStoreDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  const toggleStatus = async (storeId: string, currentStatus: boolean) => {
    try {
      const updatedStore = await updateStoreStatus(storeId, !currentStatus)
      setStores(stores.map(store => 
        store._id === storeId ? updatedStore : store
      ))

      toast({
        title: "Success",
        description: `Store status updated to ${formatStoreStatus(!currentStatus)}`,
      })
    } catch (error) {
      console.error("Failed to update store status:", error)
      toast({
        title: "Error",
        description: "Failed to update store status",
        variant: "destructive",
      })
    }
  }

  const handleDeleteClick = (store: Store) => {
    setStoreToDelete(store)
  }

  const handleDeleteConfirm = async () => {
    if (!storeToDelete) return

    try {
      await deleteStore(storeToDelete._id)
      setStores(stores.filter(store => store._id !== storeToDelete._id))
      toast({
        title: "Success",
        description: "Store deleted successfully",
      })
    } catch (error) {
      console.error("Failed to delete store:", error)
      toast({
        title: "Error",
        description: "Failed to delete store",
        variant: "destructive",
      })
    } finally {
      setStoreToDelete(null)
    }
  }


  const filteredStores = stores.filter(store => {
    const matchesName = store.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
                       store.url.toLowerCase().includes(nameFilter.toLowerCase())
    const matchesStatus = !statusFilter || formatStoreStatus(store.status).toLowerCase().includes(statusFilter.toLowerCase())
    return matchesName && matchesStatus
  })

  if (loading) {
    return <div className="p-6">Loading stores...</div>
  }

  return (
    <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Stores</h1>
    </div>

    <div className="flex justify-between items-center mb-6 gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Name Filter</label>
        <Input
          placeholder="Search by store name or URL..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">Status Filter</label>
        <Input
          placeholder="Filter by status..."
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

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Store Name</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Consumer Key</TableHead>
          <TableHead>Consumer Secret</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredStores.map((store) => (
          <TableRow key={store._id}>
            <TableCell>{store.name}</TableCell>
            <TableCell>{store.url}</TableCell>
            <TableCell>
              <Badge 
                className="cursor-pointer"
                variant={store.status ? "default" : "destructive"}
                onClick={() => toggleStatus(store._id, store.status)}
              >
                {formatStoreStatus(store.status)}
              </Badge>
            </TableCell>
            <TableCell>{store.consumerKey}</TableCell>
            <TableCell>{store.consumerSecret}</TableCell>
            <TableCell>{formatStoreDate(store.createdAt)}</TableCell>
            <TableCell className="text-right">   
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => console.log('Edit clicked')}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onSelect={() => handleDeleteClick(store)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

    <AlertDialog open={!!storeToDelete} onOpenChange={() => setStoreToDelete(null)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the store
            {storeToDelete && ` "${storeToDelete.name}"`} and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
  )
}