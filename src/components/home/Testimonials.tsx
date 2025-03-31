'use client'

import { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const testimonials = [
  {
    id: 1,
    content:
      "I ordered a custom phone stand for my desk and NSynthic delivered beyond my expectations. The quality is outstanding and it fits perfectly with my setup. I've already ordered two more items!",
    author: {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      imageUrl: '/images/testimonials/sarah.jpg',
    },
    rating: 5,
  },
  {
    id: 2,
    content:
      "The 3D printed art piece I purchased is now the centerpiece of my living room. The attention to detail is incredible and everyone who visits asks where I got it. NSynthic is my go-to for unique decor.",
    author: {
      name: 'Michael Chen',
      role: 'Interior Designer',
      imageUrl: '/images/testimonials/michael.jpg',
    },
    rating: 5,
  },
  {
    id: 3,
    content:
      "I needed a very specific organizer for my craft supplies that I couldn't find anywhere else. NSynthic created exactly what I needed through their custom order process. The communication was great and the final product is perfect.",
    author: {
      name: 'Emma Rodriguez',
      role: 'Professional Artist',
      imageUrl: '/images/testimonials/emma.jpg',
    },
    rating: 4,
  },
  {
    id: 4,
    content:
      "What impressed me most was the durability of the items. I've had my desk organizer for over a year now and it still looks brand new despite daily use. Definitely worth the investment for quality 3D printed products.",
    author: {
      name: 'David Wilson',
      role: 'Product Manager',
      imageUrl: '/images/testimonials/david.jpg',
    },
    rating: 5,
  },
  {
    id: 5,
    content:
      "The geometric lamp shade I purchased has transformed my home office. The way it projects light patterns on the wall creates such a calming atmosphere. NSynthic's designs are both functional and artistic.",
    author: {
      name: 'Priya Patel',
      role: 'Architect',
      imageUrl: '/images/testimonials/priya.jpg',
    },
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const testimonialsPerPage = 3
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage)

  const displayedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  )

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount)
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-400">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What Our Customers Say
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayedTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-2xl bg-gray-800 p-8 shadow-lg ring-1 ring-gray-700 sm:p-10 h-full flex flex-col justify-between transform transition duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex flex-col gap-y-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-lg leading-7 text-gray-300">{testimonial.content}</p>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                    {testimonial.author.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-semibold leading-6 text-white">{testimonial.author.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.author.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination controls */}
          {testimonials.length > testimonialsPerPage && (
            <div className="mt-10 flex justify-center gap-x-6">
              <button
                onClick={prevPage}
                className="inline-flex items-center rounded-md bg-gray-800 p-2 text-gray-400 shadow-sm hover:bg-gray-700 focus:outline-none"
              >
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Previous</span>
              </button>
              <div className="text-sm text-gray-400">
                {currentPage + 1} / {pageCount}
              </div>
              <button
                onClick={nextPage}
                className="inline-flex items-center rounded-md bg-gray-800 p-2 text-gray-400 shadow-sm hover:bg-gray-700 focus:outline-none"
              >
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Next</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 