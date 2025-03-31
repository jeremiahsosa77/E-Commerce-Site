import Link from 'next/link'

const categories = [
  {
    name: 'Functional Items',
    description: 'Practical and useful 3D printed items for everyday use.',
    href: '/shop/functional',
    imageBg: 'bg-gradient-to-br from-blue-800 to-purple-900',
  },
  {
    name: 'Art Pieces',
    description: 'Decorative sculptures and artistic designs to showcase your style.',
    href: '/shop/art',
    imageBg: 'bg-gradient-to-br from-purple-800 to-pink-900',
  },
  {
    name: 'Custom Orders',
    description: 'Bring your ideas to life with our custom 3D printing service.',
    href: '/custom-orders',
    imageBg: 'bg-gradient-to-br from-cyan-800 to-blue-900',
  },
  {
    name: 'New Arrivals',
    description: 'Check out our newest 3D printed creations.',
    href: '/shop/new',
    imageBg: 'bg-gradient-to-br from-green-800 to-teal-900',
  },
]

export default function CategoryGrid() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Categories</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Shop by Category</p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Browse our selection of 3D printed items by category to find exactly what you're looking for.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="flex flex-col overflow-hidden rounded-lg shadow-lg transition duration-300 hover:shadow-2xl"
            >
              <div className={`flex-shrink-0 h-48 ${category.imageBg} relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{category.name}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between bg-gray-800 p-6">
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{category.description}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={category.href}
                    className="text-base font-semibold text-blue-400 hover:text-blue-300"
                  >
                    Browse {category.name} <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 