'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Menu, X } from 'lucide-react'
import { useState } from 'react'

interface PageLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  backHref?: string
}

export function PageLayout({ children, title, subtitle, backHref = '/' }: PageLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8f9ff] to-[#fff8f8]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 relative">
                  <Image src="/logo.png" alt="NeuroConecta" fill className="object-contain" />
                </div>
                <span className="font-bold text-lg hidden sm:block">
                  <span className="text-[#fd74fd]">Neuro</span>
                  <span className="text-[#7af7f7]">Conecta</span>
                </span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/solucoes/clinicas" className="text-sm text-gray-600 hover:text-[#fd74fd] transition-colors">Soluções</Link>
              <Link href="/recursos/central-ajuda" className="text-sm text-gray-600 hover:text-[#fd74fd] transition-colors">Recursos</Link>
              <Link href="/sobre" className="text-sm text-gray-600 hover:text-[#fd74fd] transition-colors">Sobre</Link>
              <Link href="/demo" className="px-4 py-2 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full text-sm font-medium hover:shadow-lg transition-shadow">
                Ver Demo
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
            <nav className="flex flex-col gap-3">
              <Link href="/solucoes/clinicas" className="text-gray-600 py-2">Soluções</Link>
              <Link href="/recursos/central-ajuda" className="text-gray-600 py-2">Recursos</Link>
              <Link href="/sobre" className="text-gray-600 py-2">Sobre</Link>
              <Link href="/demo" className="px-4 py-2 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full text-sm font-medium text-center">
                Ver Demo
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <div ref={headerRef} className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#fd74fd]/5 via-white to-[#7af7f7]/5">
        <div className="max-w-4xl mx-auto">
          <Link 
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#fd74fd] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>
      </div>

      {/* Content */}
      <main ref={contentRef} className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 relative">
                <Image src="/logo.png" alt="NeuroConecta" fill className="object-contain" />
              </div>
              <span className="font-bold">NeuroConecta</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <Link href="/legal/termos" className="hover:text-white transition-colors">Termos</Link>
              <Link href="/legal/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
              <Link href="/legal/lgpd" className="hover:text-white transition-colors">LGPD</Link>
              <Link href="/legal/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            © 2024 NeuroConecta. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
