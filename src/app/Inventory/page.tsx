import Footer from "@/components/Footer/page"
import { Payment, columns } from "./columns"
import { DataTable } from '../../components/ui/data-table'
import Navbar from "@/components/Navbar/page"

async function getData(): Promise<Payment[]> {

  return [
    {
      id: "1",
      name: "VISA Gift Card $25",
      sku: "AZ50",
      type: "Single-Use",
      available_quantity: 0,
      action: "..."
    },
    {
        id: "2",
        name: "Mastercard Gift Card $50",
        sku: "VG25",
        type: "Single-Use",
        available_quantity: 0,
        action: "..."
      },
      {
        id: "3",
        name: "VISA Gift Card $250",
        sku: "MG25",
        type: "Single-Use",
        available_quantity: 0,
        action: "..."
      },
      {
        id: "4",
        name: "Amazon Gift Card $30",
        sku: "ZG25",
        type: "Single-Use",
        available_quantity: 0,
        action: "..."
      },
      {
        id: "5",
        name: "Zollers Gift Card 4100",
        sku: "VG25",
        type: "Single-Use",
        available_quantity: 0,
        action: "..."
      },
   
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div>
    <nav
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem",
      background: "#333",
      color: "#fff",
    }}
  >
    <h1 style={{ margin: 0 }}>NextJS</h1>
    <div>
     <h1>My Account</h1>
    </div>
  </nav>
    <div className="flex flex-col min-h-screen">
     
      <div className="flex-grow container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
    </div>
  )
}
