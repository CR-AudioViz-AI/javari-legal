// app/layout.tsx — Javari Legal
import type { Metadata } from 'next'
import './globals.css'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Javari Legal | AI Legal Documents — beats LegalZoom',
  description: 'Generate legal documents with AI. NDA, LLC agreements, contracts, and more. Faster and cheaper than LegalZoom.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#0a0a0f', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(7,7,16,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
          <a href="https://craudiovizai.com" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <span style={{ fontSize: 18 }}>⚖️</span>
            <span style={{ fontWeight: 800, fontSize: 15, background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Javari Legal</span>
          </a>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <a href="https://craudiovizai.com/pricing" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none', padding: '5px 10px' }}>Pricing</a>
            <a href="https://javariai.com" style={{ color: '#6b7280', fontSize: 13, textDecoration: 'none', padding: '5px 10px' }}>Javari AI</a>
            <a href="https://craudiovizai.com/auth/signin" style={{ color: '#9ca3af', fontSize: 13, textDecoration: 'none', padding: '5px 10px' }}>Sign In</a>
            <a href="https://craudiovizai.com/auth/signup" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', color: 'white', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>Get Started Free →</a>
          </div>
        </nav>
        <div style={{ height: 58 }} />
        {children}
        <footer style={{ background: '#030308', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '32px 24px', textAlign: 'center', color: '#374151', fontSize: 12 }}>
          <p style={{ margin: '0 0 8px' }}>© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 | Fort Myers, Florida</p>
          <p style={{ margin: 0 }}>Your Story. Our Design. Everyone Connects. Everyone Wins.</p>
        </footer>
      </body>
    </html>
  )
}
