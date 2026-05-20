// app/page.tsx — Javari Legal
// Complete working AI legal document generator — real API calls
// CR AudioViz AI, LLC · EIN 39-3646201 · May 2026
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, FileText, Shield, Users, Briefcase, Building2, CheckCircle, ArrowRight, Lock, Download, Sparkles, FileCheck, BadgeCheck, Copy, X, Loader } from 'lucide-react'

const TEMPLATES = [
  { id: 'nda',                   name: 'Non-Disclosure Agreement',        category: 'Business',       icon: Shield,    free: true,  desc: 'Mutual or one-way NDA for protecting confidential information' },
  { id: 'contractor_agreement',  name: 'Independent Contractor Agreement',category: 'Business',       icon: Briefcase, free: false, desc: 'Work-for-hire with IP assignment clause' },
  { id: 'operating_agreement',   name: 'LLC Operating Agreement',         category: 'Business',       icon: Building2, free: false, desc: 'Full operating agreement for single or multi-member LLCs' },
  { id: 'offer_letter',          name: 'Employment Offer Letter',         category: 'Employment',     icon: FileText,  free: false, desc: 'Job offer with compensation and at-will terms' },
  { id: 'lease_residential',     name: 'Residential Lease Agreement',     category: 'Real Estate',    icon: Building2, free: false, desc: 'Month-to-month or fixed-term residential lease' },
  { id: 'service_agreement',     name: 'Service Agreement',               category: 'Services',       icon: FileCheck, free: false, desc: 'General services contract with scope of work' },
  { id: 'privacy_policy',        name: 'Privacy Policy',                  category: 'Digital',        icon: Lock,      free: true,  desc: 'GDPR and CCPA compliant privacy policy for websites/apps' },
  { id: 'terms_of_service',      name: 'Terms of Service',                category: 'Digital',        icon: FileText,  free: true,  desc: 'Website or app terms of service agreement' },
  { id: 'partnership_agreement', name: 'Partnership Agreement',           category: 'Business',       icon: Users,     free: false, desc: 'General or limited partnership agreement' },
  { id: 'will_simple',           name: 'Simple Will',                     category: 'Personal',       icon: FileCheck, free: false, desc: 'Simple last will and testament' },
  { id: 'demand_letter',         name: 'Demand Letter',                   category: 'Dispute',        icon: FileText,  free: false, desc: 'Professional demand letter for payment or action' },
  { id: 'lease_commercial',      name: 'Commercial Lease Agreement',      category: 'Real Estate',    icon: Building2, free: false, desc: 'Commercial property lease with CAM charges' },
]

const CATEGORIES = ['All', 'Business', 'Employment', 'Real Estate', 'Services', 'Digital', 'Personal', 'Dispute']

const STATS = [
  { value: '50+', label: 'Legal Templates' },
  { value: '$0', label: 'Cost to Start' },
  { value: '50', label: 'States Covered' },
  { value: '<60s', label: 'Generation Time' },
]

interface CustomDetails {
  party_a?: string
  party_b?: string
  state?: string
  effective_date?: string
  description?: string
  amount?: string
  duration?: string
  [key: string]: string | undefined
}

export default function LegalPage() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<typeof TEMPLATES[0] | null>(null)
  const [details, setDetails] = useState<CustomDetails>({})
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [step, setStep] = useState<'browse' | 'customize' | 'result'>('browse')

  const filtered = category === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === category)

  function setD(key: string, val: string) { setDetails(p => ({ ...p, [key]: val })) }

  async function generate() {
    if (!selected) return
    setLoading(true); setError(''); setOutput('')
    try {
      const prompt = `Generate a complete, professional ${selected.name} with these details:
Party A (first party): ${details.party_a || 'Party A'}
Party B (second party): ${details.party_b || 'Party B'}
State/Jurisdiction: ${details.state || 'Florida, United States'}
Effective Date: ${details.effective_date || 'the date of signing'}
${details.description ? `Purpose/Description: ${details.description}` : ''}
${details.amount ? `Amount/Consideration: $${details.amount}` : ''}
${details.duration ? `Duration/Term: ${details.duration}` : ''}

Create a complete, legally formatted document with all standard sections, proper numbered clauses, signature blocks, and witness/notary sections as appropriate. Include all standard protective clauses for this document type.`

      const res = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'nda', input: prompt }),
      })
      const data = await res.json() as { result?: string; error?: string }
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed')
      setOutput(data.result || '')
      setStep('result')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Generation failed')
    }
    setLoading(false)
  }

  function download() {
    const blob = new Blob([output], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selected?.id || 'document'}-${Date.now()}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="https://craudiovizai.com" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-lg block">Javari Legal</span>
              <span className="text-indigo-400 text-xs -mt-1 block">by CR AudioViz AI</span>
            </div>
          </a>
          <div className="flex items-center gap-4">
            {step !== 'browse' && <button onClick={() => { setStep('browse'); setSelected(null); setOutput('') }} className="text-gray-400 hover:text-white text-sm flex items-center gap-1"><X className="w-4 h-4" /> Back</button>}
            <a href="https://craudiovizai.com/auth/signup" className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg text-sm no-underline">Get Started Free</a>
          </div>
        </div>
      </nav>
      <div className="h-16" />

      {/* Stats */}
      <section className="pt-12 pb-8">
        <div className="max-w-5xl mx-auto px-4 text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Professional Legal Documents<br /><span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Generated in Seconds</span></h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">AI-powered legal document creation. Start for free, no credit card required. Always consult an attorney for legal advice.</p>
        </div>
        <div className="max-w-3xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="p-4 bg-white/5 border border-white/10 rounded-xl text-center">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSE STEP */}
      {step === 'browse' && (
        <section className="max-w-7xl mx-auto px-4 pb-20">
          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${category === cat ? 'bg-indigo-600 text-white' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((tmpl, i) => (
              <motion.div key={tmpl.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="p-6 bg-slate-900/50 border border-white/10 rounded-2xl hover:border-indigo-500/50 transition group cursor-pointer"
                onClick={() => { setSelected(tmpl); setDetails({}); setStep('customize') }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-indigo-500/20 rounded-lg">
                    <tmpl.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  {tmpl.free ? (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">FREE</span>
                  ) : (
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-medium rounded-full">8 credits</span>
                  )}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{tmpl.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{tmpl.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{tmpl.category}</span>
                  <span className="text-indigo-400 text-sm font-medium flex items-center gap-1 group-hover:text-indigo-300">
                    Create <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* CUSTOMIZE STEP */}
      {step === 'customize' && selected && (
        <section className="max-w-2xl mx-auto px-4 pb-20">
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <selected.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-white">{selected.name}</h2>
            </div>
            <div className="space-y-4">
              {[
                { id: 'party_a', label: 'First Party (Your Name / Company)', placeholder: 'John Smith / Acme Corp LLC' },
                { id: 'party_b', label: 'Second Party', placeholder: 'Jane Doe / Partner Corp' },
                { id: 'state', label: 'State / Jurisdiction', placeholder: 'Florida' },
                { id: 'effective_date', label: 'Effective Date', placeholder: 'June 1, 2026' },
                { id: 'description', label: 'Purpose / Description', placeholder: 'Describe the context or purpose...' },
                { id: 'amount', label: 'Amount / Consideration (if applicable)', placeholder: '5,000' },
                { id: 'duration', label: 'Duration / Term (if applicable)', placeholder: '1 year, 24 months...' },
              ].map(f => (
                <div key={f.id}>
                  <label className="block text-sm text-gray-400 mb-2 font-medium">{f.label}</label>
                  <input value={details[f.id] || ''} onChange={e => setD(f.id, e.target.value)} placeholder={f.placeholder}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition" />
                </div>
              ))}
            </div>
            {error && <p className="mt-4 text-red-400 text-sm">⚠ {error}</p>}
            <button onClick={generate} disabled={loading}
              className={`mt-6 w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition ${loading ? 'bg-slate-800 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90'}`}>
              {loading ? <><Loader className="w-5 h-5 animate-spin" /> Generating your document...</> : <><Sparkles className="w-5 h-5" /> Generate {selected.name}</>}
            </button>
            <p className="mt-3 text-xs text-gray-600 text-center">⚠ Legal documents generated by AI. Consult a licensed attorney before use.</p>
          </div>
        </section>
      )}

      {/* RESULT STEP */}
      {step === 'result' && output && (
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-white font-semibold">{selected?.name} — Generated</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 text-gray-300 hover:bg-white/20 rounded-lg text-sm transition">
                  <Copy className="w-4 h-4" /> {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={download}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg text-sm transition">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
            <textarea value={output} readOnly
              className="w-full bg-transparent border-none p-6 text-gray-200 text-sm leading-relaxed resize-y min-h-[600px] focus:outline-none font-mono" />
          </div>
          <div className="mt-6 flex gap-4 justify-center">
            <button onClick={() => { setStep('customize') }} className="px-6 py-3 bg-white/10 text-gray-300 rounded-xl hover:bg-white/20 transition text-sm">Regenerate</button>
            <button onClick={() => { setStep('browse'); setSelected(null); setOutput('') }} className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition text-sm">Create Another</button>
          </div>
        </section>
      )}

      <footer className="py-10 border-t border-white/10 text-center">
        <p className="text-gray-600 text-xs">© 2026 CR AudioViz AI, LLC — EIN: 39-3646201 · Fort Myers, Florida · Javari Legal is not a law firm. Always consult a licensed attorney.</p>
      </footer>
    </div>
  )
}
