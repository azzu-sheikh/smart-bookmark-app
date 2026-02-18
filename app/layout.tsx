import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart Bookmark App',
  description: 'Manage your bookmarks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Add suppressHydrationWarning here too to ignore Grammarly attributes */}
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}