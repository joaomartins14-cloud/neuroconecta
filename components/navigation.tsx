'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import { MessageCircle, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Tab/Section types
export type TabId = 'inicio' | 'como-funciona' | 'videos' | 'beneficios' | 'faq'

interface Tab {
  id: TabId
  label: string
}

const tabs: Tab[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'videos', label: 'Vídeos' },
  { id: 'beneficios', label: 'Benefícios' },
  { id: 'faq', label: 'FAQ' },
]

interface NavigationProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  scrollProgress: number
}

export function Navigation({ activeTab, onTabChange, scrollProgress }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const underlineRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Map<TabId, HTMLButtonElement>>(new Map())
  const menuRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // Animate underline to active tab
  const animateUnderline = useCallback(() => {
    const activeTabEl = tabRefs.current.get(activeTab)
    if (activeTabEl && underlineRef.current) {
      const rect = activeTabEl.getBoundingClientRect()
      const parentRect = activeTabEl.parentElement?.getBoundingClientRect()
      
      if (parentRect) {
        gsap.to(underlineRef.current, {
          width: rect.width,
          x: rect.left - parentRect.left,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      }
    }
  }, [activeTab])

  useEffect(() => {
    animateUnderline()
    window.addEventListener('resize', animateUnderline)
    return () => window.removeEventListener('resize', animateUnderline)
  }, [animateUnderline])

  // Mobile menu animation
  const toggleMobileMenu = () => {
    if (!mobileMenuOpen) {
      setMobileMenuOpen(true)
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
      )
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => setMobileMenuOpen(false),
      })
    }
  }

  // Hamburger animation
  useEffect(() => {
    if (hamburgerRef.current) {
      const lines = hamburgerRef.current.querySelectorAll('.hamburger-line')
      if (mobileMenuOpen) {
        gsap.to(lines[0], { rotate: 45, y: 8, duration: 0.3 })
        gsap.to(lines[1], { opacity: 0, duration: 0.2 })
        gsap.to(lines[2], { rotate: -45, y: -8, duration: 0.3 })
      } else {
        gsap.to(lines[0], { rotate: 0, y: 0, duration: 0.3 })
        gsap.to(lines[1], { opacity: 1, duration: 0.2 })
        gsap.to(lines[2], { rotate: 0, y: 0, duration: 0.3 })
      }
    }
  }, [mobileMenuOpen])

  const handleTabClick = (tabId: TabId) => {
    onTabChange(tabId)
    if (mobileMenuOpen) {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => setMobileMenuOpen(false),
      })
    }
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-[#fd74fd] via-[#7af7f7] to-[#fff48d] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-1 left-0 right-0 z-50 px-4 py-2">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-2xl px-4 md:px-6 py-3 shadow-neuro">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 md:w-14 md:h-14 relative">
                  <Image
                    src="/logo.png"
                    alt="NeuroConecta Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-bold text-lg md:text-xl">
                  <span className="text-[#fd74fd]">Neuro</span>
                  <span className="text-[#7af7f7]">Conecta</span>
                </span>
              </div>

              {/* Desktop Tabs */}
              <div className="hidden md:flex items-center relative">
                <div className="flex gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      ref={(el) => {
                        if (el) tabRefs.current.set(tab.id, el)
                      }}
                      onClick={() => handleTabClick(tab.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 relative z-10 ${
                        activeTab === tab.id
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                {/* Animated Underline */}
                <div
                  ref={underlineRef}
                  className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] rounded-full"
                />
              </div>

              {/* CTA Button - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="/demo" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Começar Agora
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                ref={hamburgerRef}
                onClick={toggleMobileMenu}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                aria-label="Menu"
              >
                <span className="hamburger-line w-6 h-0.5 bg-foreground rounded-full origin-center" />
                <span className="hamburger-line w-6 h-0.5 bg-foreground rounded-full origin-center" />
                <span className="hamburger-line w-6 h-0.5 bg-foreground rounded-full origin-center" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              ref={menuRef}
              className="md:hidden mt-2 glass rounded-2xl p-4 shadow-neuro-lg"
            >
              <div className="flex flex-col gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#fd74fd]/10 to-[#7af7f7]/10 text-foreground'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {tab.label}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        activeTab === tab.id ? 'translate-x-1' : ''
                      }`}
                    />
                  </button>
                ))}
                <Link href="/demo" className="mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold text-sm shadow-lg text-center">
                  Começar Agora
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

// Floating FAQ Button
interface FloatingFAQButtonProps {
  onClick: () => void
}

export function FloatingFAQButton({ onClick }: FloatingFAQButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.7)', delay: 1 }
      )
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] text-white shadow-neuro-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center group"
      aria-label="Abrir FAQ"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#fff48d] rounded-full flex items-center justify-center text-[10px] font-bold text-gray-800">
        ?
      </span>
    </button>
  )
}
