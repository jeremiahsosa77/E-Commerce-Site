import { NextRequest, NextResponse } from 'next/server'
import { mockProducts, mockReviews } from '@/lib/mockData'
import { ApiResponse, Product } from '@/types'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Find the product
    const product = mockProducts.find(product => product.id === id)
    
    if (!product) {
      return NextResponse.json(
        { status: 'error', error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Find reviews for this product
    const reviews = mockReviews.filter(review => review.productId === id)
    
    // Prepare response
    const response: ApiResponse<Product & { reviews: typeof reviews }> = {
      status: 'success',
      data: {
        ...product,
        reviews
      }
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error)
    return NextResponse.json(
      { status: 'error', error: 'Failed to retrieve product' },
      { status: 500 }
    )
  }
} 