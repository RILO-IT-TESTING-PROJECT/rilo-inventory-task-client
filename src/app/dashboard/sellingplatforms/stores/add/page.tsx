"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { createStore } from "@/lib/action-stores"

export default function AddStoreForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    consumerKey: "",
    consumerSecret: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createStore(formData)
      toast({
        title: "Success",
        description: "Store created successfully",
      })
      router.push("/dashboard/sellingplatforms/stores")
    } catch (error) {
      console.error("Failed to create store:", error)
      toast({
        title: "Error",
        description: "Failed to create store. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex items-center justify-center w-full min-h-screen">
      <Card className="w-full max-w-2xl mx-auto bg-gray-200">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Stores: Add</CardTitle>
          <Link href="/dashboard/sellingplatforms/stores">
            <Button variant="destructive">
              Cancel
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name</Label>
              <Input
                id="name"
                className="bg-white text-gray-800"
                placeholder="Enter store name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Store URL</Label>
              <Input
                id="url"
                className="bg-white text-gray-800"
                placeholder="Store url without trailing slash (e.g., https://your-store.com)"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="consumerKey">Consumer Key</Label>
              <Input
                id="consumerKey"
                className="bg-white text-gray-800"
                placeholder="Enter consumer key"
                value={formData.consumerKey}
                onChange={(e) => setFormData({ ...formData, consumerKey: e.target.value })}
                required
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="consumerSecret">Consumer Secret</Label>
              <Input
                id="consumerSecret"
                className="bg-white text-gray-800"
                placeholder="Enter consumer secret"
                value={formData.consumerSecret}
                onChange={(e) => setFormData({ ...formData, consumerSecret: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}