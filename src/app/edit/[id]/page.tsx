"use client";

import { useParams, useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";

type Inventory = {
  id: string;
  name: string;
  sku: string;
  type: string;
};

const EditPage = () => {
  const { id } = useParams(); // Use useParams to get the dynamic route parameter
  const router = useRouter(); // Initialize useRouter for navigation
  const [inventoryData, setInventoryData] = useState<Inventory | null>(null);
  const [formData, setFormData] = useState<Inventory | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://rilo-inventory-server.vercel.app/api/v1/inventories/${id}`, {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUzMDM4YzdjNWFhNzQwM2FlOTkzOTMiLCJpYXQiOjE3MzM1MDQ5MjQsImV4cCI6MTczNDcxNDUyNH0.oj5KaVmkNyT86S-ZdX-yHF1fhqzX5vNlsHXa8oYPy6g",
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      setInventoryData(data.data);
      setFormData(data.data); // Initialize formData with fetched data
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const res = await fetch(`https://rilo-inventory-server.vercel.app/api/v1/inventories/${id}`, {
        method: "PATCH",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUzMDM4YzdjNWFhNzQwM2FlOTkzOTMiLCJpYXQiOjE3MzM1MDQ5MjQsImV4cCI6MTczNDcxNDUyNH0.oj5KaVmkNyT86S-ZdX-yHF1fhqzX5vNlsHXa8oYPy6g",
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Inventory updated successfully!");
        router.push("/dashboard/products/inventory"); // Redirect to the inventory page on success
      } else {
        alert("Failed to update inventory.");
      }
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("An error occurred while updating inventory.");
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/products/inventory"); // Redirect to the inventory page on cancel
  };

  if (!inventoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-md shadow-lg">
      <h1 className="text-xl font-semibold mb-4">Edit Inventory</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData?.name || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-base transition-all focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData?.sku || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-base transition-all focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData?.type || ""}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-base transition-all focus:outline-none"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all focus:outline-none"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel} // Call handleCancel on click
            className="flex-1 px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
