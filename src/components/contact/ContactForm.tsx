'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  })
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // This would be replaced with actual API call in a real application
      console.log('Form data:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Reset form and show success message
      reset()
      setIsSuccess(true)
      
      // Hide success message after a few seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="px-6 py-8 sm:p-10">
        <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
        
        {isSuccess && (
          <div className="mb-6 bg-blue-900/30 border border-blue-500 rounded-lg p-4 flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-medium text-blue-400">Message Sent</h3>
              <p className="mt-2 text-sm text-gray-300">
                Thank you for your message! We'll get back to you as soon as possible.
              </p>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-white">
                Phone Number <span className="text-gray-400">(optional)</span>
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white">
                Subject
              </label>
              <div className="mt-1">
                <select
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Select a subject</option>
                  <option value="product-question">Product Question</option>
                  <option value="custom-order">Custom Order Inquiry</option>
                  <option value="shipping">Shipping & Delivery</option>
                  <option value="returns">Returns & Refunds</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white">
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                rows={5}
                {...register('message', { required: 'Message is required' })}
                placeholder="How can we help you today?"
                className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 