"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface AddStoreFormProps {
  onCancel: () => void
  onSave: (storeData: {
    url: string
    consumerKey: string
    consumerSecret: string
  }) => void
}

export default function AddStoreForm({ onCancel, onSave }: AddStoreFormProps) {
  const [formData, setFormData] = useState({
    url: "",
    consumerKey: "",
    consumerSecret: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <section className="flex items-center justify-center w-full min-h-screen">
    <Card className="w-full max-w-2xl mx-auto bg-gray-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Stores: Add</CardTitle>
        <Button
          variant="destructive"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">Store URL</Label>
            <Input
              id="url"
              className="bg-white text-gray-800"
              placeholder="Store url. Do not use '/' at the end; for example, https://your-woocommerce-site.com"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="consumerKey">Consumer Key</Label>
            <Input
              id="consumerKey"
              className="bg-white text-gray-800"
              placeholder="Consumer Key"
              value={formData.consumerKey}
              onChange={(e) => setFormData({ ...formData, consumerKey: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="consumerSecret">Consumer Secret</Label>
            <Input
              id="consumerSecret"
              className="bg-white text-gray-800"
              placeholder="Consumer Secret"
              value={formData.consumerSecret}
              onChange={(e) => setFormData({ ...formData, consumerSecret: e.target.value })}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
    </section>
  )
}

