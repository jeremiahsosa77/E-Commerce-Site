import { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'
import ContactInfo from '@/components/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact NSynthic | 3D Printing Services',
  description: 'Get in touch with NSynthic for questions about our 3D printed products, custom orders, or general inquiries. We\'re here to help!',
}

export default function ContactPage() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Contact Us</h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Have questions about our products or services? Need help with a custom order? We'd love to hear from you!
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  )
} 