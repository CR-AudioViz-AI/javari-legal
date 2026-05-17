import type { Metadata } from 'next'
import './globals.css'
import EcosystemNav from '@/components/ecosystem/EcosystemNav'
import EcosystemFooter from '@/components/ecosystem/EcosystemFooter'


export const metadata: Metadata = {
  title: 'Javari Legal | Professional Legal Documents & Templates',
  description: 'Create professional legal documents in minutes. Contracts, NDAs, agreements, and more - attorney-drafted templates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><EcosystemNav appName="Javari Legal" />{children}<EcosystemFooter /></body>
    </html>
  )
}
