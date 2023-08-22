import './globals.css'
import type { Metadata } from 'next'

import { Navbar } from '@/components'
import { Footer } from '@/components'

export const metadata: Metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remarkable develpoer projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
