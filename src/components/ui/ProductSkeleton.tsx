'use client'

interface ProductSkeletonProps {
  count?: number
  grid?: 2 | 3 | 4
  className?: string
}

export default function ProductSkeleton({
  count = 4,
  grid = 4,
  className = ''
}: ProductSkeletonProps) {
  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }
  
  return (
    <div className={`grid ${gridClasses[grid]} gap-x-6 gap-y-10 ${className}`}>
      {Array(count).fill(0).map((_, index) => (
        <div 
          key={index} 
          className="flex flex-col bg-gray-800/50 rounded-lg overflow-hidden animate-pulse"
          aria-hidden="true"
        >
          <div className="h-60 bg-gray-700"></div>
          <div className="flex-1 p-6 flex flex-col">
            <div className="h-5 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="flex space-x-1 mt-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="w-4 h-4 rounded-full bg-gray-700"></div>
              ))}
              <div className="w-12 h-4 bg-gray-700 rounded ml-2"></div>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <div className="h-6 bg-gray-700 rounded w-1/4"></div>
              <div className="h-10 w-32 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 