'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, FileText, Shield, Users, Briefcase, Building2,
  CheckCircle, ArrowRight, Star, Lock, Download, Sparkles,
  FileCheck, Clock, BadgeCheck
} from 'lucide-react';

const categories = [
  { id: 'business', name: 'Business', icon: Briefcase, count: 45 },
  { id: 'employment', name: 'Employment', icon: Users, count: 32 },
  { id: 'realestate', name: 'Real Estate', icon: Building2, count: 28 },
  { id: 'personal', name: 'Personal', icon: FileText, count: 24 },
  { id: 'ip', name: 'Intellectual Property', icon: Shield, count: 18 },
];

const popularTemplates = [
  { id: 'nda', name: 'Non-Disclosure Agreement', category: 'Business', price: 0, downloads: '50K+' },
  { id: 'contract', name: 'Independent Contractor Agreement', category: 'Business', price: 29, downloads: '35K+' },
  { id: 'llc', name: 'LLC Operating Agreement', category: 'Business', price: 49, downloads: '28K+' },
  { id: 'employment', name: 'Employment Contract', category: 'Employment', price: 39, downloads: '22K+' },
  { id: 'lease', name: 'Residential Lease Agreement', category: 'Real Estate', price: 29, downloads: '45K+' },
  { id: 'will', name: 'Last Will & Testament', category: 'Personal', price: 59, downloads: '18K+' },
];

const stats = [
  { value: '150+', label: 'Legal Templates' },
  { value: '500K+', label: 'Documents Created' },
  { value: '50', label: 'States Covered' },
  { value: '24/7', label: 'Customer Support' },
];

const features = [
  { icon: BadgeCheck, title: 'Attorney-Drafted', desc: 'All templates created and reviewed by licensed attorneys' },
  { icon: Sparkles, title: 'AI-Powered Customization', desc: 'Smart questionnaires that adapt to your specific needs' },
  { icon: Lock, title: 'State-Specific', desc: 'Templates customized for your states legal requirements' },
  { icon: Download, title: 'Instant Download', desc: 'Get your document immediately in Word and PDF formats' },
];

export default function LegalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-lg">Javari Legal</span>
                <span className="text-indigo-400 text-xs block -mt-1">by CR AudioViz AI</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#templates" className="text-gray-300 hover:text-white transition">Templates</a>
              <a href="#categories" className="text-gray-300 hover:text-white transition">Categories</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#create" className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition">
                Create Document
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-sm text-indigo-300 mb-8"
          >
            <BadgeCheck className="w-4 h-4" />
            <span>Attorney-drafted templates</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Professional Legal<br/>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Documents Made Easy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            Create legally binding documents in minutes. Attorney-drafted templates 
            customized for your state and specific needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a href="#templates" className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition flex items-center gap-2">
              Browse Templates
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#create" className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition">
              Create Custom Document
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Document Categories</h2>
            <p className="text-xl text-gray-400">Find the right template for your needs</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl transition ${
                  selectedCategory === cat.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                <cat.icon className="w-5 h-5" />
                <span className="font-medium">{cat.name}</span>
                <span className="text-sm opacity-60">{cat.count}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Templates */}
      <section id="templates" className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Popular Templates</h2>
            <p className="text-xl text-gray-400">Our most downloaded legal documents</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTemplates.map((template, i) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-slate-900/50 border border-white/10 rounded-2xl hover:border-indigo-500/50 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-indigo-500/20 rounded-lg">
                    <FileCheck className="w-6 h-6 text-indigo-400" />
                  </div>
                  {template.price === 0 ? (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full">Free</span>
                  ) : (
                    <span className="text-white font-bold">${template.price}</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{template.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{template.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{template.downloads} downloads</span>
                  <button className="text-indigo-400 font-medium text-sm group-hover:text-indigo-300 transition flex items-center gap-1">
                    Use Template
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Javari Legal?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-xl text-center"
              >
                <feature.icon className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="create" className="py-20 bg-gradient-to-r from-indigo-900/50 to-purple-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Create Your Document?</h2>
          <p className="text-xl text-gray-300 mb-8">Get started with our free NDA template or browse our full library</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/create/nda" className="px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Create Free NDA
            </a>
            <a href="/templates" className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition">
              Browse All Templates
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-indigo-400" />
              <span className="text-white font-semibold">Javari Legal</span>
              <span className="text-gray-500">by CR AudioViz AI</span>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} CR AudioViz AI, LLC. All rights reserved.
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-4">
            Disclaimer: Javari Legal provides self-help legal documents. We are not a law firm and do not provide legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
