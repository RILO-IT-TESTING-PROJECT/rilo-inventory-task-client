"use client";

import { addInventory } from "@/lib/action.inventory.add";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddInventoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    type: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async() => {
    const res = await addInventory(formData);

    router.push("/dashboard/products/inventory"); 
  
  };

  const handleCancel = () => {
    router.push("/dashboard/products/inventory"); 
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-md shadow-lg">
      
      <div className="mb-4 text-right">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>

      
      <form>
       
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-base transition-all focus:outline-none"
          />
        </div>

       
        <div className="mb-6">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            placeholder="SKU"
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-base transition-all focus:outline-none"
          />
        </div>

        
        <div className="mb-6">
  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
    Select Codes
  </label>
  <select
    id="code"
    name="code"
    value={formData.type}
    onChange={(e) => setFormData({ ...formData, type: e.target.value })} 
    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-base transition-all focus:outline-none"
  >
    <option value="">Select an option</option>
    <option value="Single-Use">Single-Use</option>
    <option value="Multiple-Use">Multiple-Use</option>
  </select>
</div>

      </form>

     
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSave}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all focus:outline-none"
        >
          Save
        </button>
      </div>
    </div>
  );
}
