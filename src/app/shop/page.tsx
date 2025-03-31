import { Metadata } from 'next'
import ProductList from '@/components/shop/ProductList'
import FilterSidebar from '@/components/shop/FilterSidebar'

export const metadata: Metadata = {
  title: 'Shop | NSynthic 3D Printed Products',
  description: 'Browse our collection of high-quality 3D printed items, from functional daily-use products to artistic decorative pieces.',
}

export default function ShopPage() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-24">
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Shop Our Products</h1>
            <p className="mt-4 max-w-xl text-base text-gray-300">
              Browse our collection of high-quality 3D printed items. Each piece is meticulously crafted with precision and durability in mind.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
            <FilterSidebar className="lg:col-span-3" />
            <ProductList className="mt-6 lg:col-span-9 lg:mt-0" />
          </div>
        </div>
      </div>
    </div>
  )
} 