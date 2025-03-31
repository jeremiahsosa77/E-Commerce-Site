import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'About NSynthic | 3D Printing Company',
  description: 'Learn about NSynthic, our mission to provide high-quality 3D printed products, and our commitment to innovation and sustainability.',
}

const values = [
  {
    name: 'Quality-Focused',
    description: 'We use premium materials and rigorous quality control to ensure every product meets the highest standards.',
  },
  {
    name: 'Innovation-Driven',
    description: 'We constantly explore new techniques and designs to push the boundaries of what 3D printing can achieve.',
  },
  {
    name: 'Customer-Centric',
    description: 'Your satisfaction is our priority. We work closely with you to understand and fulfill your unique needs.',
  },
  {
    name: 'Sustainability-Minded',
    description: 'We prioritize eco-friendly materials and practices to minimize our environmental impact.',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-gray-900">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">About NSynthic</h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              NSynthic is a specialized 3D printing company dedicated to creating high-quality functional items, artistic pieces, and custom designs. Founded with a passion for bringing digital creativity into the physical world, we combine technology with craftsmanship to produce exceptional 3D printed products.
            </p>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Our Mission</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              At NSynthic, our mission is to harness the power of 3D printing technology to create functional, beautiful, and sustainable products that enhance people's lives. We believe in making high-quality 3D printed items accessible to everyone, whether it's a practical everyday object or a unique artistic creation.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              We're committed to pushing the boundaries of what 3D printing can achieve, exploring new materials, techniques, and applications to continually innovate and improve our offerings.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <div className="h-80 w-full rounded-lg bg-gray-800 overflow-hidden relative">
              {/* Replace with an actual image when available */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
                <span className="text-xl text-gray-400">Mission Image</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-white">Our Values</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our core values guide everything we do, from product design to customer service. These principles form the foundation of our business and reflect what we stand for.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
          {values.map((value) => (
            <div key={value.name} className="flex flex-col rounded-xl bg-gray-800 p-6 ring-1 ring-gray-700 hover:ring-blue-500 transition-all duration-300">
              <dt className="text-base font-semibold leading-7 text-white">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                  <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {value.name}
              </dt>
              <dd className="mt-1 flex flex-1 flex-col justify-between">
                <p className="text-base leading-7 text-gray-300">{value.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Team section - to be added if needed */}
      
      {/* CTA section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-800 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24">
          <div
            className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-blue-900/20 opacity-70 ring-1 ring-inset ring-white/10"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to start creating?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Whether you're looking for ready-made items or have a custom design in mind, NSynthic is here to bring your ideas to life through the power of 3D printing.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/shop"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Shop Products
              </Link>
              <Link
                href="/custom-orders"
                className="text-lg font-semibold leading-6 text-white hover:text-gray-300"
              >
                Custom Orders <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 