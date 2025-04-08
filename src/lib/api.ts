import { ApiResponse } from '@/types'

/**
 * Fetches data from the API
 * @param endpoint - API endpoint to fetch from
 * @param options - Fetch options
 * @returns Typed API response
 */
export async function fetchFromAPI<T>(
  endpoint: string, 
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    })
    
    const data: ApiResponse<T> = await response.json()
    
    if (!response.ok || data.status === 'error') {
      throw new Error(data.error || data.message || 'An error occurred')
    }
    
    return data.data as T
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error)
    throw error
  }
}

/**
 * Handles API errors and formats them for display
 * @param error - The caught error
 * @returns Formatted error message
 */
export function handleAPIError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

/**
 * Fetches all products with optional filtering
 */
export async function getProducts(params?: URLSearchParams) {
  const queryString = params ? `?${params.toString()}` : ''
  return fetchFromAPI(`products${queryString}`)
}

/**
 * Fetches a single product by ID
 */
export async function getProduct(id: string) {
  return fetchFromAPI(`products/${id}`)
}

/**
 * Fetches featured products
 */
export async function getFeaturedProducts() {
  return fetchFromAPI('products?featured=true')
}

/**
 * Fetches products by category
 */
export async function getProductsByCategory(category: string) {
  return fetchFromAPI(`products?category=${category}`)
}

/**
 * Creates a contact message
 */
export async function createContactMessage(data: any) {
  return fetchFromAPI('contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Creates a custom order request
 */
export async function createCustomOrder(data: any) {
  return fetchFromAPI('custom-orders', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * Creates a new order
 */
export async function createOrder(data: any) {
  return fetchFromAPI('orders', {
    method: 'POST',
    body: JSON.stringify(data),
  })
} 