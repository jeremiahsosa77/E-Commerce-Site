import { Inter } from 'next/font/google'
import { Providers } from './providers'
import '../styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NSynthic - 3D Printed Functional Items & Art',
  description: 'NSynthic offers high-quality 3D printed functional items, art pieces, and custom orders with a futuristic design aesthetic.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.className} h-full bg-gray-900 text-white`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
} 