import Link from 'next/link'
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

const contactDetails = [
  {
    name: 'Visit Our Studio',
    description: '123 Innovation Avenue, San Francisco, CA 94107',
    icon: MapPinIcon,
    button: {
      text: 'Get Directions',
      href: 'https://maps.google.com/?q=123+Innovation+Avenue+San+Francisco+CA+94107',
    },
  },
  {
    name: 'Call Us',
    description: '(555) 123-4567',
    icon: PhoneIcon,
    button: {
      text: 'Call Now',
      href: 'tel:+15551234567',
    },
  },
  {
    name: 'Email Us',
    description: 'hello@nsynthic.com',
    icon: EnvelopeIcon,
    button: {
      text: 'Send Email',
      href: 'mailto:hello@nsynthic.com',
    },
  },
  {
    name: 'Live Chat',
    description: 'Available weekdays from 9 AM - 5 PM PST',
    icon: ChatBubbleLeftRightIcon,
    button: {
      text: 'Start Chat',
      href: '#', // This would link to a chat system in a real implementation
    },
  },
]

export default function ContactInfo() {
  return (
    <div className="space-y-10">
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
          
          <div className="space-y-8">
            {contactDetails.map((detail) => (
              <div key={detail.name} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white">
                    <detail.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">{detail.name}</h3>
                  <p className="mt-1 text-gray-300">{detail.description}</p>
                  <div className="mt-3">
                    <Link
                      href={detail.button.href}
                      className="text-sm font-medium text-blue-400 hover:text-blue-300"
                      target={detail.button.href.startsWith('http') ? '_blank' : undefined}
                      rel={detail.button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {detail.button.text} <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <h2 className="text-2xl font-bold text-white mb-6">Hours of Operation</h2>
          
          <div className="flex items-start">
            <ClockIcon className="h-6 w-6 text-blue-400 mt-0.5 mr-3 flex-shrink-0" aria-hidden="true" />
            <div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-base font-medium text-white">Weekdays</h3>
                  <p className="mt-1 text-gray-300">9:00 AM - 6:00 PM PST</p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Saturday</h3>
                  <p className="mt-1 text-gray-300">10:00 AM - 4:00 PM PST</p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Sunday</h3>
                  <p className="mt-1 text-gray-300">Closed</p>
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">Holidays</h3>
                  <p className="mt-1 text-gray-300">Hours may vary</p>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-300">
                <p>
                  <span className="font-medium text-white">Note:</span> Our physical studio is open by appointment only. Please contact us to schedule a visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white">Looking for help with an order?</h3>
        <p className="mt-2 text-gray-300">
          For questions about existing orders, shipping status, or returns, please visit our
          <Link href="/faq" className="text-blue-400 hover:text-blue-300 ml-1">
            FAQ page
          </Link>
          <span className="mx-1">or</span>
          <Link href="/account/orders" className="text-blue-400 hover:text-blue-300">
            order tracking page
          </Link>.
        </p>
      </div>
      
      <div className="relative h-96 rounded-lg overflow-hidden">
        {/* Placeholder for a map - in a real implementation, you would integrate Google Maps or similar */}
        <div className="absolute inset-0 bg-gray-700 flex flex-col items-center justify-center text-gray-400">
          <p className="text-xl">Map Location</p>
          <p className="text-sm mt-2">Interactive map would be displayed here</p>
        </div>
      </div>
    </div>
  )
} 