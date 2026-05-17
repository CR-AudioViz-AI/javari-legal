// app/layout.tsx — Javari Legal
// Fortune 50 quality — uses AppShell for full ecosystem integration
// May 17, 2026 — CR AudioViz AI, LLC
import type { Metadata } from 'next'
import './globals.css'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Javari Legal | Javari by CR AudioViz AI',
  description: 'AI legal documents',
  keywords: 'Javari Legal, Javari, AI, CR AudioViz AI',
}

import AppShell from '@/components/AppShell'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <AppShell
          appName="Javari Legal"
          appColor="#8b5cf6"
          appEmoji="⚖️"
          appDesc="AI legal documents"
      handoffApp="Javari Formation"
      handoffUrl="https://javari-business-formation.vercel.app"
      handoffPitch="Got your legal docs? Now form your business →"
        >
          {children}
        </AppShell>
      </body>
    </html>
  )
}
