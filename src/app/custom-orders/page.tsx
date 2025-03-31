import { Metadata } from 'next'
import CustomOrderForm from '@/components/custom-orders/CustomOrderForm'
import CustomOrderInfo from '@/components/custom-orders/CustomOrderInfo'

export const metadata: Metadata = {
  title: 'Custom Orders | NSynthic 3D Printed Products',
  description: 'Request a custom 3D printed item. Upload your design or describe your idea, and we\'ll bring it to life with precision and quality.',
}

export default function CustomOrdersPage() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Custom Orders</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-300">
            Have a specific idea in mind? We can bring your vision to life through our custom 3D printing service.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-12">
          <CustomOrderInfo />
          <CustomOrderForm />
        </div>
      </div>
    </div>
  )
} 