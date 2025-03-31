'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'

// Temporary mock data until we connect to the database
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
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageSrc,
    })
    
    // You could add a notification here
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Featured Products</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Most Popular Items</p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover our most loved 3D printed creations. Each item is meticulously crafted with high-quality materials.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {isLoading ? (
            // Skeleton loader
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col bg-gray-800/50 rounded-lg overflow-hidden animate-pulse">
                <div className="h-60 bg-gray-700"></div>
                <div className="flex-1 p-6 flex flex-col">
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-5/6"></div>
                  <div className="mt-4 h-4 bg-gray-700 rounded w-1/3"></div>
                  <div className="mt-auto pt-4">
                    <div className="h-10 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <div key={product.id} className="flex flex-col bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                <div className="h-60 relative">
                  {/* Replace with actual images once available */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-400">{product.imageAlt}</span>
                  </div>
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
                    <span className="inline-flex rounded-md shadow-sm">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-x-2 rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
                        Add to Cart
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  )
} 