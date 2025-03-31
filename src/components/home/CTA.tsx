import Link from 'next/link'

export default function CTA() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="relative isolate overflow-hidden bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div
            className="absolute inset-0 -z-10 transform-gpu blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-blue-700 to-purple-800 opacity-20"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Create Something Custom?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Whether you need a functional item or an artistic piece, our custom 3D printing service 
              can bring your ideas to life. Start your project today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/custom-orders"
                className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                Start a Custom Order
              </Link>
              <Link
                href="/shop"
                className="text-lg font-semibold leading-6 text-white hover:text-gray-300"
              >
                Browse Ready-Made Items <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 