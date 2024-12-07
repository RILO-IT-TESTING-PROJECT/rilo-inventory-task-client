import { Payment, columns } from "./columns";
import { DataTable } from "../../../../components/ui/data-table";
import { getInventory } from "@/lib/action.inventory";

export default async function DemoPage() {
  try {
    const inventoryData = await getInventory();

    const data: Payment[] = inventoryData.map(item => ({
      id: item._id,
      name: item.name,
      sku: item.sku,
      type: item.type ? "Single-Use" : "Multi-Use",
      available_quantity: item.available,
      action: "..."
    }));

    return (
      <div>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load inventory data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }
}
