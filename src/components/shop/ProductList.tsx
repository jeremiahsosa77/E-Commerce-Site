'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import { useSearchParams } from 'next/navigation'

// These would be fetched from an API in a real application
const products = [
  {
    id: '1',
    name: 'Tech Organizer Stand',
    description: 'Sleek desk organizer for your devices and accessories',
    price: 24.99,
    rating: 4.8,
    reviewCount: 25,
    imageSrc: '/images/products/organizer.jpg',
    imageAlt: 'Tech organizer stand in black material',
    category: 'functional',
    colors: ['Black', 'White', 'Gray'],
    materials: ['PLA'],
    featured: true,
    bestseller: true,
  },
  {
    id: '2',
    name: 'Phoenix Art Sculpture',
    description: 'Detailed phoenix sculpture with intricate designs',
    price: 29.99,
    rating: 5.0,
    reviewCount: 12,
    imageSrc: '/images/products/phoenix.jpg',
    imageAlt: 'Phoenix sculpture with detailed wing features',
    category: 'art',
    colors: ['Gold', 'Silver', 'Blue'],
    materials: ['PLA'],
    featured: true,
    bestseller: false,
  },
  {
    id: '3',
    name: 'Geometric Lamp Shade',
    description: 'Modern lamp shade with geometric patterns',
    price: 18.50,
    rating: 4.5,
    reviewCount: 18,
    imageSrc: '/images/products/lampshade.jpg',
    imageAlt: 'Geometric lamp shade with tessellated pattern',
    category: 'functional',
    colors: ['White', 'Black'],
    materials: ['PLA', 'PETG'],
    featured: false,
    bestseller: true,
  },
  {
    id: '4',
    name: 'Futuristic Planter',
    description: 'Self-watering planter with modern design',
    price: 15.99,
    rating: 4.2,
    reviewCount: 32,
    imageSrc: '/images/products/planter.jpg',
    imageAlt: 'Modern self-watering planter in silver finish',
    category: 'functional',
    colors: ['Silver', 'Black', 'White', 'Green'],
    materials: ['PLA', 'PETG'],
    featured: true,
    bestseller: true,
  },
  {
    id: '5',
    name: 'Cable Management System',
    description: 'Keep your cables organized and tangle-free',
    price: 12.99,
    rating: 4.3,
    reviewCount: 42,
    imageSrc: '/images/products/cable-management.jpg',
    imageAlt: 'Cable management system with clips and holders',
    category: 'functional',
    colors: ['Black', 'White'],
    materials: ['PLA'],
    featured: false,
    bestseller: true,
  },
  {
    id: '6',
    name: 'Abstract Desk Sculpture',
    description: 'Modern abstract art piece for your desk or shelf',
    price: 22.50,
    rating: 4.7,
    reviewCount: 15,
    imageSrc: '/images/products/abstract-sculpture.jpg',
    imageAlt: 'Abstract sculptural art piece with flowing lines',
    category: 'art',
    colors: ['White', 'Black', 'Blue', 'Red'],
    materials: ['PLA', 'PETG'],
    featured: true,
    bestseller: false,
  },
  {
    id: '7',
    name: 'Modular Wall Organizer',
    description: 'Customizable wall-mounted organizer system',
    price: 34.99,
    rating: 4.9,
    reviewCount: 27,
    imageSrc: '/images/products/wall-organizer.jpg',
    imageAlt: 'Modular wall organizer with various compartments',
    category: 'functional',
    colors: ['White', 'Black', 'Gray'],
    materials: ['PLA', 'PETG'],
    featured: true,
    bestseller: false,
  },
  {
    id: '8',
    name: 'Geometric Wall Art',
    description: 'Modern geometric wall art with 3D effect',
    price: 27.99,
    rating: 4.6,
    reviewCount: 19,
    imageSrc: '/images/products/wall-art.jpg',
    imageAlt: 'Geometric wall art with hexagonal pattern',
    category: 'art',
    colors: ['White', 'Black', 'Gold', 'Silver'],
    materials: ['PLA'],
    featured: false,
    bestseller: true,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface ProductListProps {
  className?: string
}

export default function ProductList({ className = '' }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Apply filters based on URL parameters
    let result = [...products]
    
    const category = searchParams.get('category')
    const material = searchParams.get('material')
    const color = searchParams.get('color')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort')
    const featured = searchParams.get('featured')
    const bestseller = searchParams.get('bestseller')
    
    if (category) {
      result = result.filter(product => product.category === category)
    }
    
    if (material) {
      result = result.filter(product => product.materials.includes(material))
    }
    
    if (color) {
      result = result.filter(product => product.colors.includes(color))
    }
    
    if (minPrice) {
      result = result.filter(product => product.price >= parseFloat(minPrice))
    }
    
    if (maxPrice) {
      result = result.filter(product => product.price <= parseFloat(maxPrice))
    }
    
    if (featured === 'true') {
      result = result.filter(product => product.featured)
    }
    
    if (bestseller === 'true') {
      result = result.filter(product => product.bestseller)
    }
    
    if (sort) {
      switch (sort) {
        case 'price-low-high':
          result.sort((a, b) => a.price - b.price)
          break
        case 'price-high-low':
          result.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          result.sort((a, b) => b.rating - a.rating)
          break
        case 'reviews':
          result.sort((a, b) => b.reviewCount - a.reviewCount)
          break
        default:
          break
      }
    }
    
    setFilteredProducts(result)
  }, [searchParams])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageSrc,
    })
    
    // Could add a toast notification here
  }

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8 ${className}`}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden animate-pulse">
            <div className="h-60 bg-gray-700"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-5/6"></div>
              <div className="mt-4 h-4 bg-gray-700 rounded w-1/3"></div>
              <div className="mt-4 h-10 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <h3 className="text-xl font-medium text-white">No products found</h3>
        <p className="mt-2 text-gray-300">
          Try adjusting your filters to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-300">
          Showing <span className="font-medium text-white">{filteredProducts.length}</span> results
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:shadow-xl"
          >
            <div className="h-60 relative">
              {/* Replace with actual images when available */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                <span className="text-gray-400">{product.imageAlt}</span>
              </div>
              
              {/* Badge for bestseller or featured */}
              {product.bestseller && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                  Bestseller
                </div>
              )}
              {!product.bestseller && product.featured && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>
            
            <div className="flex-1 p-6 flex flex-col">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  <Link href={`/shop/${product.category}/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {product.description}
                </p>
              </div>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-600',
                        'h-4 w-4 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-400">{product.reviewCount} reviews</p>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xl font-medium text-white">${product.price.toFixed(2)}</p>
                <button
                  type="button"
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-x-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 