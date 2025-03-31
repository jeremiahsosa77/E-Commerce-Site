import Link from 'next/link'
import Image from 'next/image'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryGrid from '@/components/home/CategoryGrid'
import Testimonials from '@/components/home/Testimonials'
import CTA from '@/components/home/CTA'
import { SparklesIcon, TruckIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const benefits = [
  {
    name: 'Custom Designs',
    description: 'Get exactly what you need with our custom order service.',
    icon: SparklesIcon,
  },
  {
    name: 'Fast Shipping',
    description: 'Orders ship within 3-5 business days across the US.',
    icon: TruckIcon,
  },
  {
    name: 'Quality Guarantee',
    description: 'Every print is thoroughly checked for quality and durability.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Affordable Prices',
    description: 'High-quality 3D printed items starting at just $5.',
    icon: CurrencyDollarIcon,
  },
]

export default function Home() {
  return (
    <div className="bg-gray-900">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-800/30 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
        </svg>
        
        <div
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#36b9cc] to-[#6610f2] opacity-20"
            style={{
              clipPath:
                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
            }}
          />
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  New Products
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                  <span>Just released</span>
                  <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Future-Forward 3D Printing Solutions
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Discover our high-quality 3D printed functional items, art pieces, and custom designs. Each piece is crafted with precision, blending technology with creativity.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                href="/shop"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Shop Now
              </Link>
              <Link href="/custom-orders" className="text-lg font-semibold leading-6 text-white">
                Custom Orders <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="w-[52rem] h-[36rem] relative rounded-xl shadow-xl ring-1 ring-gray-400/10 overflow-hidden">
                  {/* Replace with your actual hero image */}
                  <div className="absolute inset-0 bg-gray-800">
                    <div className="h-full w-full flex items-center justify-center text-white">
                      <span className="text-xl">Future 3D Printed Product Image</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400">Why Choose NSynthic</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need for custom 3D printing
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              From concept to reality, we make the 3D printing process easy, fast, and affordable.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {benefits.map((benefit) => (
                <div key={benefit.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <benefit.icon className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                    {benefit.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{benefit.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Featured products section */}
      <FeaturedProducts />

      {/* Category grid */}
      <CategoryGrid />

      {/* Testimonials section */}
      <Testimonials />

      {/* CTA section */}
      <CTA />
    </div>
  )
} 