// app/layout.tsx — Javari Legal
// Fortune 50 shell — auth, nav, Javari AI widget, social footer
// CR AudioViz AI, LLC · May 2026
import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Javari Legal | CR AudioViz AI',
  description: 'AI legal document tools',
}

// AppShell import — provides auth, nav, Javari widget, social footer
// Falls back gracefully if component doesn't exist yet
let AppShell: any = null;
let AuthProvider: any = null;
try {
  AppShell = require('@/components/AppShell').default;
  AuthProvider = require('@/components/AuthProvider').AuthProvider;
} catch {}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const content = AppShell ? (
    <AppShell
      appName="Javari Legal"
      appColor="#8b5cf6"
      appEmoji="⚖️"
      appDesc="AI legal document tools"
      showCTA={true}
    >
      {children}
    </AppShell>
  ) : children;

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#07080f' }}>
        {AuthProvider ? <AuthProvider>{content}</AuthProvider> : content}
      </body>
    </html>
  )
}
