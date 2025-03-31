'use client'

import { useState, Fragment, useEffect } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'functional', label: 'Functional Items' },
      { value: 'art', label: 'Art Pieces' },
    ],
  },
  {
    id: 'materials',
    name: 'Material',
    options: [
      { value: 'PLA', label: 'PLA' },
      { value: 'PETG', label: 'PETG' },
      { value: 'ABS', label: 'ABS' },
      { value: 'TPU', label: 'TPU' },
    ],
  },
  {
    id: 'colors',
    name: 'Color',
    options: [
      { value: 'Black', label: 'Black' },
      { value: 'White', label: 'White' },
      { value: 'Gray', label: 'Gray' },
      { value: 'Silver', label: 'Silver' },
      { value: 'Gold', label: 'Gold' },
      { value: 'Blue', label: 'Blue' },
      { value: 'Green', label: 'Green' },
      { value: 'Red', label: 'Red' },
    ],
  },
]

const sortOptions = [
  { value: '', label: 'Most Popular' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
]

const priceRanges = [
  { value: '0-10', label: 'Under $10', min: 0, max: 10 },
  { value: '10-20', label: '$10 - $20', min: 10, max: 20 },
  { value: '20-30', label: '$20 - $30', min: 20, max: 30 },
  { value: '30', label: 'Over $30', min: 30, max: 999 },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface FilterSidebarProps {
  className?: string
}

export default function FilterSidebar({ className = '' }: FilterSidebarProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Create a new instance of URLSearchParams from the current searchParams
  const createQueryString = (updates: { [key: string]: string | null }) => {
    const params = new URLSearchParams(searchParams)
    
    // Update params based on updates object
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    
    return params.toString()
  }
  
  const handleFilterChange = (filterId: string, value: string) => {
    const currentValue = searchParams.get(filterId)
    
    // If clicking on current value, remove the filter
    if (currentValue === value) {
      router.push(`${pathname}?${createQueryString({ [filterId]: null })}`)
    } else {
      router.push(`${pathname}?${createQueryString({ [filterId]: value })}`)
    }
  }
  
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    router.push(`${pathname}?${createQueryString({ sort: value })}`)
  }
  
  const handlePriceRangeChange = (min: number, max: number) => {
    router.push(`${pathname}?${createQueryString({ minPrice: min.toString(), maxPrice: max.toString() })}`)
  }
  
  const handleCheckboxChange = (filterId: string, checked: boolean) => {
    router.push(`${pathname}?${createQueryString({ [filterId]: checked ? 'true' : null })}`)
  }
  
  const handleClearFilters = () => {
    router.push(pathname)
  }
  
  const activeFiltersCount = Array.from(searchParams.entries()).filter(
    ([key]) => key !== 'sort'
  ).length

  return (
    <div className={className}>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-gray-900 py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-white">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none text-gray-400 hover:text-white"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <div className="mt-4 border-t border-gray-800 px-4">
                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-800 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-white hover:text-blue-400">
                              <span className="font-medium">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden="true"
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <button
                                    className={classNames(
                                      'rounded-full h-4 w-4 flex items-center justify-center',
                                      searchParams.get(section.id) === option.value
                                        ? 'border-2 border-blue-400 bg-blue-400'
                                        : 'border-2 border-gray-600'
                                    )}
                                    onClick={() => handleFilterChange(section.id, option.value)}
                                  />
                                  <label className="ml-3 text-sm text-gray-300">
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  
                  {/* Price range filter */}
                  <Disclosure as="div" className="border-b border-gray-800 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-white hover:text-blue-400">
                            <span className="font-medium">Price</span>
                            <span className="ml-6 flex items-center">
                              <ChevronDownIcon
                                className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                aria-hidden="true"
                              />
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {priceRanges.map((range) => (
                              <div key={range.value} className="flex items-center">
                                <button
                                  className={classNames(
                                    'rounded-full h-4 w-4 flex items-center justify-center',
                                    searchParams.get('minPrice') === range.min.toString() && 
                                    searchParams.get('maxPrice') === range.max.toString()
                                      ? 'border-2 border-blue-400 bg-blue-400'
                                      : 'border-2 border-gray-600'
                                  )}
                                  onClick={() => handlePriceRangeChange(range.min, range.max)}
                                />
                                <label className="ml-3 text-sm text-gray-300">
                                  {range.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  
                  {/* Special filters */}
                  <div className="py-6">
                    <h3 className="font-medium text-white mb-4">Special</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="mobile-featured"
                          name="featured"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                          checked={searchParams.get('featured') === 'true'}
                          onChange={(e) => handleCheckboxChange('featured', e.target.checked)}
                        />
                        <label htmlFor="mobile-featured" className="ml-3 text-sm text-gray-300">
                          Featured Products
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="mobile-bestseller"
                          name="bestseller"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                          checked={searchParams.get('bestseller') === 'true'}
                          onChange={(e) => handleCheckboxChange('bestseller', e.target.checked)}
                        />
                        <label htmlFor="mobile-bestseller" className="ml-3 text-sm text-gray-300">
                          Bestsellers
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Clear filters */}
                  {activeFiltersCount > 0 && (
                    <div className="flex items-center pt-6">
                      <button
                        type="button"
                        className="text-sm text-blue-400 hover:text-blue-300"
                        onClick={handleClearFilters}
                      >
                        Clear all filters
                      </button>
                      <span className="ml-2 text-sm text-gray-400">({activeFiltersCount})</span>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Mobile filter button */}
      <div className="flex items-center justify-between lg:hidden mb-6">
        <div>
          <div className="relative inline-block text-left">
            <select
              className="rounded-md border-0 bg-gray-800 text-white py-1.5 pl-3 pr-10 text-sm font-medium ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-blue-500"
              value={searchParams.get('sort') || ''}
              onChange={handleSortChange}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-gray-800 px-3.5 py-2 text-sm text-white shadow-sm hover:bg-gray-700"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <FunnelIcon className="h-5 w-5" aria-hidden="true" />
          <span>Filter {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
        </button>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-white">Sort By</h2>
          <div className="mt-3">
            <select
              className="w-full rounded-md border-0 bg-gray-800 text-white py-1.5 pl-3 pr-10 text-sm font-medium ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-blue-500"
              value={searchParams.get('sort') || ''}
              onChange={handleSortChange}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <h2 className="text-lg font-medium text-white">Filters</h2>
        
        <div className="mt-4 divide-y divide-gray-700">
          {filters.map((section) => (
            <div key={section.id} className="py-6">
              <h3 className="text-base font-medium text-white">{section.name}</h3>
              <div className="mt-4 space-y-4">
                {section.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <button
                      className={classNames(
                        'rounded-full h-4 w-4 flex items-center justify-center',
                        searchParams.get(section.id) === option.value
                          ? 'border-2 border-blue-400 bg-blue-400'
                          : 'border-2 border-gray-600'
                      )}
                      onClick={() => handleFilterChange(section.id, option.value)}
                    />
                    <label className="ml-3 text-sm text-gray-300">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Price range filter */}
          <div className="py-6">
            <h3 className="text-base font-medium text-white">Price</h3>
            <div className="mt-4 space-y-4">
              {priceRanges.map((range) => (
                <div key={range.value} className="flex items-center">
                  <button
                    className={classNames(
                      'rounded-full h-4 w-4 flex items-center justify-center',
                      searchParams.get('minPrice') === range.min.toString() && 
                      searchParams.get('maxPrice') === range.max.toString()
                        ? 'border-2 border-blue-400 bg-blue-400'
                        : 'border-2 border-gray-600'
                    )}
                    onClick={() => handlePriceRangeChange(range.min, range.max)}
                  />
                  <label className="ml-3 text-sm text-gray-300">
                    {range.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Special filters */}
          <div className="py-6">
            <h3 className="text-base font-medium text-white">Special</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  checked={searchParams.get('featured') === 'true'}
                  onChange={(e) => handleCheckboxChange('featured', e.target.checked)}
                />
                <label htmlFor="featured" className="ml-3 text-sm text-gray-300">
                  Featured Products
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="bestseller"
                  name="bestseller"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-blue-500"
                  checked={searchParams.get('bestseller') === 'true'}
                  onChange={(e) => handleCheckboxChange('bestseller', e.target.checked)}
                />
                <label htmlFor="bestseller" className="ml-3 text-sm text-gray-300">
                  Bestsellers
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Clear filters */}
        {activeFiltersCount > 0 && (
          <div className="mt-4">
            <button
              type="button"
              className="text-sm text-blue-400 hover:text-blue-300"
              onClick={handleClearFilters}
            >
              Clear all filters ({activeFiltersCount})
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 