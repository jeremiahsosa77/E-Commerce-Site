import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'createdAt_desc';
    
    await connectToDatabase();
    
    // Build query
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    // Build sort
    const [sortField, sortDirection] = sort.split('_');
    const sortOptions: any = {};
    sortOptions[sortField] = sortDirection === 'desc' ? -1 : 1;
    
    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
    
    const total = await Product.countDocuments(query);
    
    return NextResponse.json({
      products,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
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