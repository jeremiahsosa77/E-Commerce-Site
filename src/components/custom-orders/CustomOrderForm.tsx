'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CloudArrowUpIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

type FormData = {
  name: string
  email: string
  phone: string
  description: string
  material: string
  color: string
  size: string
  quantity: number
  reference: string
  agreeToTerms: boolean
}

export default function CustomOrderForm() {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      phone: '',
      description: '',
      material: 'pla',
      color: '',
      size: 'small',
      quantity: 1,
      reference: '',
      agreeToTerms: false
    }
  })
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // This would be replaced with actual API call to submit the form data
      console.log('Form data:', data)
      console.log('File:', file)
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Reset form and show success message
      reset()
      setFile(null)
      setIsSuccess(true)
      
      // Hide success message after a few seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your custom order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
      <div className="px-6 py-8 sm:p-10">
        <h2 className="text-2xl font-bold text-white mb-6">Custom Order Request</h2>
        
        {isSuccess && (
          <div className="mb-6 bg-blue-900/30 border border-blue-500 rounded-lg p-4 flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-sm font-medium text-blue-400">Order Submitted</h3>
              <p className="mt-2 text-sm text-gray-300">
                Thank you for your custom order request! We'll review your submission and get back to you within 1-2 business days.
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
              <label htmlFor="quantity" className="block text-sm font-medium text-white">
                Quantity
              </label>
              <div className="mt-1">
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  {...register('quantity', { 
                    required: 'Quantity is required',
                    min: {
                      value: 1,
                      message: 'Quantity must be at least 1'
                    }
                  })}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                />
                {errors.quantity && (
                  <p className="mt-1 text-sm text-red-500">{errors.quantity.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white">
              Describe Your Item
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                rows={4}
                {...register('description', { required: 'Description is required' })}
                placeholder="Please provide details about what you want to create, its purpose, and any special requirements."
                className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-6">
            <div>
              <label htmlFor="material" className="block text-sm font-medium text-white">
                Material
              </label>
              <div className="mt-1">
                <select
                  id="material"
                  {...register('material', { required: 'Material is required' })}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                >
                  <option value="pla">PLA</option>
                  <option value="abs">ABS</option>
                  <option value="petg">PETG</option>
                  <option value="tpu">TPU (Flexible)</option>
                  <option value="resin">Resin</option>
                  <option value="not_sure">Not Sure</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-white">
                Color <span className="text-gray-400">(optional)</span>
              </label>
              <div className="mt-1">
                <input
                  id="color"
                  type="text"
                  {...register('color')}
                  placeholder="Black, White, Blue, etc."
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-white">
                Size
              </label>
              <div className="mt-1">
                <select
                  id="size"
                  {...register('size', { required: 'Size is required' })}
                  className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
                >
                  <option value="small">Small (up to 10cm)</option>
                  <option value="medium">Medium (10-20cm)</option>
                  <option value="large">Large (20-30cm)</option>
                  <option value="xlarge">XL (over 30cm)</option>
                  <option value="custom">Custom Dimensions</option>
                </select>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="reference" className="block text-sm font-medium text-white">
              Reference Images/URLs <span className="text-gray-400">(optional)</span>
            </label>
            <div className="mt-1">
              <input
                id="reference"
                type="text"
                {...register('reference')}
                placeholder="Paste links to any reference images or similar items"
                className="block w-full rounded-md border-0 bg-gray-700 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white">
              Upload File <span className="text-gray-400">(optional)</span>
            </label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-600 px-6 py-8">
              <div className="space-y-2 text-center">
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                {file ? (
                  <div>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold text-blue-400">{file.name}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex text-sm text-gray-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-blue-400 hover:text-blue-300"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".stl,.obj,.3mf,.jpg,.png,.pdf"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      STL, OBJ, 3MF, JPG, PNG, PDF up to 10MB
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="terms"
                type="checkbox"
                {...register('agreeToTerms', { 
                  required: 'You must agree to the terms and conditions'
                })}
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="terms" className="text-sm text-gray-300">
                I agree to the <Link href="/terms" className="text-blue-400 hover:text-blue-300">terms and conditions</Link>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-500">{errors.agreeToTerms.message}</p>
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
              {isSubmitting ? 'Submitting...' : 'Submit Custom Order Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 