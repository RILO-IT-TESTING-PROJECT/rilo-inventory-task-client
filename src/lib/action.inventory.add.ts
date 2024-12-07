const API_BASE_URL = 'https://rilo-inventory-server.vercel.app/api/v1';
const token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUzMDM4YzdjNWFhNzQwM2FlOTkzOTMiLCJpYXQiOjE3MzM1MDQ5MjQsImV4cCI6MTczNDcxNDUyNH0.oj5KaVmkNyT86S-ZdX-yHF1fhqzX5vNlsHXa8oYPy6g"

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`https://rilo-inventory-server.vercel.app/api/v1/inventories`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            ...options.headers,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
}


export interface Inventory {
    _id: string;
    sku: string;
    name: string;
    type:string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }

  export async function addInventory(item: Omit<Inventory, '_id' | 'createdAt' | 'updatedAt'>): Promise<Inventory> {
    console.log(item)
    try {
    const response: ApiResponse<Inventory> = await fetchWithAuth('/inventories', {
      method: 'POST', 
      body: JSON.stringify(item), 
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add inventory item:', error);
    throw error; 
  }
}
