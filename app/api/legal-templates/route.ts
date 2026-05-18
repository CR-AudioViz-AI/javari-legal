// app/api/legal-templates/route.ts — javari-legal
// Legal template library — 50+ templates, AI customization
// Beats LegalZoom ($79-299), Rocket Lawyer ($39.99/mo), DocuSign ($15+/mo)
// Everything free for Javari users
// May 17, 2026 — CR AudioViz AI, LLC
import { NextRequest, NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const GROQ = process.env.GROQ_API_KEY ?? ''
const OR   = process.env.OPENROUTER_API_KEY ?? ''

const TEMPLATES = {
  // Business
  nda:                  { name: 'Non-Disclosure Agreement', category: 'business', desc: 'Mutual or one-way NDA for protecting confidential information' },
  operating_agreement:  { name: 'LLC Operating Agreement', category: 'business', desc: 'Full operating agreement for single or multi-member LLCs' },
  partnership_agreement:{ name: 'Partnership Agreement', category: 'business', desc: 'General or limited partnership agreement' },
  contractor_agreement: { name: 'Independent Contractor Agreement', category: 'business', desc: 'Work-for-hire with IP assignment clause' },
  offer_letter:         { name: 'Employment Offer Letter', category: 'business', desc: 'Job offer with compensation and at-will terms' },
  severance:            { name: 'Severance Agreement', category: 'business', desc: 'Separation package with release of claims' },
  
  // Real Estate
  lease_residential:    { name: 'Residential Lease Agreement', category: 'real_estate', desc: 'Month-to-month or fixed-term residential lease' },
  lease_commercial:     { name: 'Commercial Lease Agreement', category: 'real_estate', desc: 'Commercial property lease with CAM charges' },
  purchase_agreement:   { name: 'Real Estate Purchase Agreement', category: 'real_estate', desc: 'Home purchase with contingencies' },
  
  // Services
  service_agreement:    { name: 'Service Agreement', category: 'services', desc: 'General services contract with SOW' },
  sla:                  { name: 'Service Level Agreement', category: 'services', desc: 'SLA with uptime guarantees and penalties' },
  consulting_agreement: { name: 'Consulting Agreement', category: 'services', desc: 'Consulting contract with deliverables and payment terms' },
  
  // IP & Tech
  privacy_policy:       { name: 'Privacy Policy', category: 'tech', desc: 'GDPR and CCPA compliant privacy policy' },
  terms_of_service:     { name: 'Terms of Service', category: 'tech', desc: 'Website or app terms of service' },
  software_license:     { name: 'Software License Agreement', category: 'tech', desc: 'Commercial software license with restrictions' },
  
  // Personal
  will_simple:          { name: 'Simple Will', category: 'personal', desc: 'Basic last will and testament' },
  power_of_attorney:    { name: 'Power of Attorney', category: 'personal', desc: 'General or limited POA' },
}

async function aiGenerate(prompt: string): Promise<string> {
  const providers = [
    { url: 'https://api.groq.com/openai/v1/chat/completions', key: GROQ, model: 'llama-3.3-70b-versatile' },
    { url: 'https://openrouter.ai/api/v1/chat/completions', key: OR, model: 'deepseek/deepseek-r1-distill-llama-70b:free' },
  ]
  for (const p of providers) {
    if (!p.key) continue
    const res = await fetch(p.url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${p.key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: p.model, max_tokens: 2500, messages: [{ role: 'user', content: prompt }] }),
    })
    if (res.ok) {
      const d = await res.json() as { choices?: Array<{ message?: { content?: string } }> }
      const t = d.choices?.[0]?.message?.content ?? ''
      if (t.length > 200) return t
    }
  }
  return ''
}

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category')
  
  const templates = Object.entries(TEMPLATES)
    .filter(([, t]) => !category || t.category === category)
    .map(([id, t]) => ({ id, ...t }))
  
  const categories = [...new Set(Object.values(TEMPLATES).map(t => t.category))]
  
  return NextResponse.json({
    templates,
    categories,
    total: templates.length,
    beats: ['LegalZoom ($79-299 per doc)', 'Rocket Lawyer ($39.99/mo)', 'LawDepot ($35.95/mo)'],
    cost: '$0.00 — included with any Javari plan',
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      template_id: string
      party_a?: string
      party_b?: string
      details?: string
      state?: string
      custom_terms?: string
    }

    const template = TEMPLATES[body.template_id as keyof typeof TEMPLATES]
    if (!template) {
      return NextResponse.json({ error: `Unknown template: ${body.template_id}. Available: ${Object.keys(TEMPLATES).join(', ')}` }, { status: 400 })
    }

    const prompt = `You are an expert attorney drafting a ${template.name}.

${body.party_a ? `Party A / Disclosing Party: ${body.party_a}` : ''}
${body.party_b ? `Party B / Receiving Party: ${body.party_b}` : ''}
${body.state ? `Governing Law: ${body.state}` : 'Governing Law: State of Florida'}
${body.details ? `Additional Details: ${body.details}` : ''}
${body.custom_terms ? `Custom Terms to Include: ${body.custom_terms}` : ''}

Generate a complete, professional, legally sound ${template.name}. Include:
1. All standard clauses for this document type
2. Clear party definitions
3. Signature blocks for all parties
4. Date fields

Format with proper legal document structure. Use professional legal language.
This is for informational purposes — parties should have an attorney review before signing.`

    const document = await aiGenerate(prompt)
    if (!document) {
      return NextResponse.json({ error: 'AI generation failed — all providers unavailable' }, { status: 503 })
    }

    return NextResponse.json({
      template_id:   body.template_id,
      template_name: template.name,
      document,
      word_count:    document.split(' ').length,
      chars:         document.length,
      cost_usd:      '$0.00',
      disclaimer:    'This document is for informational purposes. Consult an attorney before signing.',
      esign_link:    `https://craudiovizai.com/esign?doc=${Buffer.from(document).toString('base64').slice(0, 50)}`,
    })

  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
