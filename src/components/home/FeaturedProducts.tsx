'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/20/solid'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/context/CartContext'
import { Product } from '@/types'
import { getFeaturedProducts } from '@/lib/api'
import { handleAPIError } from '@/lib/api'
import ErrorMessage from '@/components/ui/ErrorMessage'
import ProductSkeleton from '@/components/ui/ProductSkeleton'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const { addItem } = useCart()

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        setIsLoading(true)
        setError(null)
        
        const data = await getFeaturedProducts()
        setProducts(data.items)
      } catch (err) {
        console.error('Error loading featured products:', err)
        setError(handleAPIError(err))
      } finally {
        setIsLoading(false)
      }
    }
    
    loadFeaturedProducts()
  }, [])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageSrc,
    })
    
    // You could add a notification here
  }

  const handleRetry = () => {
    window.location.reload()
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

        {error && (
          <ErrorMessage 
            title="Error loading products" 
            message={error} 
            onRetry={handleRetry}
            className="mt-10"
          />
        )}

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          {isLoading ? (
            <ProductSkeleton count={4} grid={4} />
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="h-60 relative">
                    {product.imageSrc ? (
                      <Image 
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-gray-400">{product.imageAlt}</span>
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
              ))}
            </div>
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