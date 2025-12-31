import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Javari Legal | Professional Legal Documents & Templates',
  description: 'Create professional legal documents in minutes. Contracts, NDAs, agreements, and more - attorney-drafted templates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
