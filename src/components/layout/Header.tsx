'use client'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  UserIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'

const categories = [
  { name: 'Functional Items', href: '/shop/functional' },
  { name: 'Art Pieces', href: '/shop/art' },
  { name: 'Custom Orders', href: '/custom-orders' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { itemCount } = useCart()
  const router = useRouter()

  return (
    <header className="bg-gray-900 border-b border-gray-700">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">NSynthic</span>
            <div className="relative h-12 w-36 sm:h-16 sm:w-48">
              {/* Replace with your actual logo */}
              <div className="flex items-center font-bold text-blue-500 text-xl sm:text-2xl">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">NSynthic</span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <Popover.Group className="hidden lg:flex lg:gap-x-8">
          <Link href="/shop" className="text-sm font-semibold leading-6 text-gray-200 hover:text-white">
            Shop
          </Link>
          
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-200 hover:text-white">
              Categories
              <ChevronDownIcon className="h-5 w-5 flex-none" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-gray-800 p-2 shadow-lg ring-1 ring-gray-700">
                <div className="py-1">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-200 hover:bg-gray-700"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link href="/custom-orders" className="text-sm font-semibold leading-6 text-gray-200 hover:text-white">
            Custom Orders
          </Link>

          <Link href="/about" className="text-sm font-semibold leading-6 text-gray-200 hover:text-white">
            About
          </Link>

          <Link href="/contact" className="text-sm font-semibold leading-6 text-gray-200 hover:text-white">
            Contact
          </Link>
        </Popover.Group>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <button
            className="text-sm font-semibold leading-6 text-gray-200 hover:text-white"
            onClick={() => {
              // Toggle language implementation would go here
            }}
          >
            <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          
          <Link href="/cart" className="relative text-gray-200 hover:text-white">
            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          
          {session ? (
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-gray-200 hover:text-white">
                <UserIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 w-60 rounded-xl bg-gray-800 p-2 shadow-lg ring-1 ring-gray-700">
                  <div className="p-2 border-b border-gray-700">
                    <p className="text-white font-medium">{session.user?.name || 'User'}</p>
                    <p className="text-gray-400 text-sm truncate">{session.user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/account"
                      className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-200 hover:bg-gray-700"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-200 hover:bg-gray-700"
                    >
                      Order History
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-200 hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          ) : (
            <Link href="/auth/signin" className="text-sm font-semibold leading-6 text-gray-200 hover:text-white">
              Sign In <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-700">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">NSynthic</span>
              <div className="font-bold text-blue-500 text-xl">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">NSynthic</span>
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-700">
              <div className="space-y-2 py-6">
                <Link
                  href="/shop"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700">
                        Categories
                        <ChevronDownIcon
                          className={`h-5 w-5 flex-none ${open ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-1 space-y-1">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                
                <Link
                  href="/custom-orders"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Custom Orders
                </Link>
                
                <Link
                  href="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
              
              <div className="py-6">
                <div className="flex items-center gap-x-4 mb-4">
                  <button
                    className="rounded-lg p-2 text-gray-200 hover:bg-gray-700"
                    onClick={() => {
                      // Toggle language implementation would go here
                      setMobileMenuOpen(false)
                    }}
                  >
                    <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  
                  <Link 
                    href="/cart" 
                    className="relative rounded-lg p-2 text-gray-200 hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </div>
                
                {session ? (
                  <div className="space-y-1 border-t border-gray-700 pt-4">
                    <div className="px-3 mb-2">
                      <p className="text-white font-medium">{session.user?.name || 'User'}</p>
                      <p className="text-gray-400 text-sm truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/account"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Order History
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setMobileMenuOpen(false)
                      }}
                      className="-mx-3 block w-full text-left rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth/signin"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
} 