import {
  LightBulbIcon,
  ClipboardDocumentCheckIcon,
  CurrencyDollarIcon,
  PencilSquareIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'

const steps = [
  {
    id: 1,
    name: 'Submit Your Idea',
    description:
      'Fill out the custom order form with details about your project, including size, material, color, and any reference images.',
    icon: PencilSquareIcon,
  },
  {
    id: 2,
    name: 'Design Review',
    description:
      'Our team will review your request and reach out to discuss details, pricing, and feasibility within 1-2 business days.',
    icon: LightBulbIcon,
  },
  {
    id: 3,
    name: 'Approval & Payment',
    description:
      'Once the design is finalized, you'll receive a quote. Production begins after approval and payment.',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    id: 4,
    name: 'Production',
    description:
      'We carefully 3D print your custom item, ensuring quality control throughout the process.',
    icon: CurrencyDollarIcon,
  },
  {
    id: 5,
    name: 'Delivery',
    description:
      'Your finished custom order will be carefully packaged and shipped to your address.',
    icon: TruckIcon,
  },
]

export default function CustomOrderInfo() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white">How It Works</h2>
      <p className="mt-4 text-gray-300">
        Our custom 3D printing service allows you to bring your ideas to life. Whether you need a functional item that doesn't exist on the market or a unique art piece, we can help you create it.
      </p>
      
      <div className="mt-10">
        <h3 className="text-lg font-medium text-white">The Custom Order Process</h3>
        <ol className="mt-4 space-y-8">
          {steps.map((step) => (
            <li key={step.id} className="relative flex gap-x-4">
              <div className={`absolute left-0 top-0 flex w-8 h-8 items-center justify-center rounded-full ${
                step.id === 1 ? 'bg-blue-600' : 'bg-gray-700'
              }`}>
                {step.id === 1 ? (
                  <span className="text-white font-bold text-sm">{step.id}</span>
                ) : (
                  <span className="h-px w-4 bg-gray-600" aria-hidden="true" />
                )}
              </div>
              
              <div className="flex min-w-0 flex-1 flex-col pb-5">
                <div className="flex flex-wrap items-center gap-x-3 text-md leading-6">
                  <div className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center ${
                    step.id !== 1 ? 'bg-blue-600 rounded-full' : ''
                  }`}>
                    {step.id !== 1 && (
                      <span className="text-white font-bold text-sm">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-12">
                    <span className="font-semibold text-white">{step.name}</span>
                  </div>
                </div>
                <div className="mt-2 ml-12 text-sm text-gray-300">{step.description}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      
      <div className="mt-12 rounded-lg bg-gray-800 p-6">
        <h3 className="text-lg font-medium text-white">Important Information</h3>
        <ul className="mt-4 space-y-3 text-gray-300">
          <li className="flex gap-x-3">
            <span className="text-blue-400">•</span>
            <span>Custom orders typically take 1-3 weeks to complete, depending on complexity.</span>
          </li>
          <li className="flex gap-x-3">
            <span className="text-blue-400">•</span>
            <span>Pricing is based on design complexity, material, size, and print time.</span>
          </li>
          <li className="flex gap-x-3">
            <span className="text-blue-400">•</span>
            <span>A 50% deposit is required to begin production, with the remainder due before shipping.</span>
          </li>
          <li className="flex gap-x-3">
            <span className="text-blue-400">•</span>
            <span>Custom orders cannot be returned unless there's a manufacturing defect.</span>
          </li>
          <li className="flex gap-x-3">
            <span className="text-blue-400">•</span>
            <span>For complex projects, we offer design consultation services at an hourly rate.</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-8 rounded-lg bg-blue-900/30 p-6 border border-blue-700">
        <h3 className="text-lg font-medium text-white">Loyalty Program Benefits</h3>
        <p className="mt-2 text-gray-300">
          Custom orders earn points in our loyalty program! For every $1 spent on custom orders, you'll earn 100 points. Platinum-tier members (30,000+ points) receive priority custom order processing.
        </p>
      </div>
    </div>
  )
} 