import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';
import { mockProducts } from '@/lib/mockData';
import { ApiResponse, PaginatedResponse, Product, ProductFilter } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Get URL parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const inStock = searchParams.get('inStock');
    const newArrival = searchParams.get('newArrival');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortDir = searchParams.get('sortDir') || 'desc';
    
    // Apply filters
    let filteredProducts = [...mockProducts];
    
    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(product => product.featured);
    }
    
    if (category) {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    if (minPrice) {
      filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
    }
    
    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(product => product.inStock);
    }
    
    if (newArrival === 'true') {
      filteredProducts = filteredProducts.filter(product => product.newArrival);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchLower) || 
        product.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Sort products
    filteredProducts.sort((a, b) => {
      // Handle different sort fields
      let valueA, valueB;
      
      switch (sortBy) {
        case 'price':
          valueA = a.price;
          valueB = b.price;
          break;
        case 'name':
          valueA = a.name;
          valueB = b.name;
          break;
        case 'rating':
          valueA = a.rating;
          valueB = b.rating;
          break;
        default: // createdAt or other dates
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
      }
      
      // Sort direction
      return sortDir === 'asc' 
        ? (valueA > valueB ? 1 : -1)
        : (valueA < valueB ? 1 : -1);
    });
    
    // Paginate
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    // Prepare response
    const response: ApiResponse<PaginatedResponse<Product>> = {
      status: 'success',
      data: {
        items: paginatedProducts,
        total: filteredProducts.length,
        page,
        pageSize,
        totalPages: Math.ceil(filteredProducts.length / pageSize)
      }
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { status: 'error', error: 'Failed to retrieve products' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate request
    if (!body.name || !body.description || !body.details || !body.images || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (!Array.isArray(body.variations) || body.variations.length === 0) {
      return NextResponse.json(
        { error: 'Product must have at least one variation' },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    // Create product
    const product = new Product({
      name: body.name,
      description: body.description,
      details: body.details,
      images: body.images,
      category: body.category,
      subcategory: body.subcategory,
      featured: body.featured || false,
      variations: body.variations,
      printTime: body.printTime,
      filamentUsage: body.filamentUsage,
    });
    
    const savedProduct = await product.save();
    
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// For a real application, implement POST, PUT, DELETE methods for admin
// functionality to create, update, and delete products 