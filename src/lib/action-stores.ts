const API_BASE_URL = 'https://rilo-inventory-server.vercel.app/api/v1';

 async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token'); 
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ? `${token}` : '',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
export interface Store {
    _id: string;
    name: string;
    url: string;
    status: boolean;
    consumerKey: string;
    consumerSecret: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
  }
  export async function getStores(): Promise<Store[]> {
    try {
      const response: ApiResponse<Store[]> = await fetchWithAuth('/stores');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch stores:', error);
      throw error;
    }
  }
  
  export async function createStore(storeData: Pick<Store, 'name' | 'url' | 'consumerKey' | 'consumerSecret'>): Promise<Store> {
    try {
      const response: ApiResponse<Store> = await fetchWithAuth('/stores', {
        method: 'POST',
        body: JSON.stringify(storeData),
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create store:', error);
      throw error;
    }
  }
  
  export async function updateStoreStatus(storeId: string, status: boolean): Promise<Store> {
    try {
      const response: ApiResponse<Store> = await fetchWithAuth(`/stores/${storeId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update store status:', error);
      throw error;
    }
  }
  export async function deleteStore(storeId: string): Promise<void> {
    try {
      await fetchWithAuth(`/stores/${storeId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete store:', error);
      throw error;
    }
  }