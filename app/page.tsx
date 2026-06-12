'use client'

import { useState, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Navigation, FloatingFAQButton, type TabId } from '@/components/navigation'
import { SectionTransition, PageTransitionOverlay } from '@/components/section-transition'
import { HeroSection } from '@/components/sections/hero-section'
import { ComoFuncionaSection } from '@/components/sections/como-funciona-section'
import { VideosSection } from '@/components/sections/videos-section'
import { FAQSection, FAQModal } from '@/components/sections/faq-section'
import { Footer } from '@/components/sections/footer'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function NeuroConectaPage() {
  // Tab/Section state
  const [activeTab, setActiveTab] = useState<TabId>('inicio')
  const [direction, setDirection] = useState<'left' | 'right' | 'none'>('none')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false)

  const tabOrder: TabId[] = ['inicio', 'como-funciona', 'videos', 'beneficios', 'faq']

  /**
   * Handle tab change with GSAP transitions
   * Creates smooth fade + slide animations between sections
   */
  const handleTabChange = useCallback(
    (newTab: TabId) => {
      if (newTab === activeTab || isTransitioning) return

      setIsTransitioning(true)

      const currentIndex = tabOrder.indexOf(activeTab)
      const newIndex = tabOrder.indexOf(newTab)
      const newDirection = newIndex > currentIndex ? 'right' : 'left'

      setDirection(newDirection)

      // Update progress bar
      const progress = ((newIndex + 1) / tabOrder.length) * 100
      setScrollProgress(progress)

      // Delay to let exit animation play
      setTimeout(() => {
        setActiveTab(newTab)

        // End transition after animations complete
        setTimeout(() => {
          setIsTransitioning(false)
          setDirection('none')
        }, 400)
      }, 200)

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [activeTab, isTransitioning, tabOrder]
  )

  // Initialize scroll progress and refresh ScrollTrigger on tab change
  useEffect(() => {
    // Refresh ScrollTrigger when tab changes
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 700)

    return () => clearTimeout(timeout)
  }, [activeTab])

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPercent = (window.scrollY / scrollHeight) * 100
      const tabIndex = tabOrder.indexOf(activeTab)
      const tabBaseProgress = (tabIndex / tabOrder.length) * 100
      const tabSegment = 100 / tabOrder.length
      const blendedProgress = tabBaseProgress + (scrollPercent / 100) * tabSegment

      setScrollProgress(Math.min(Math.max(blendedProgress, 0), 100))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeTab, tabOrder])

  // Render section based on active tab
  const renderSection = () => {
    switch (activeTab) {
      case 'inicio':
        return <HeroSection />
      case 'como-funciona':
        return <ComoFuncionaSection />
      case 'videos':
        return <VideosSection />
      case 'beneficios':
        return <ComoFuncionaSection /> // Reuse benefits from Como Funciona
      case 'faq':
        return <FAQSection />
      default:
        return <HeroSection />
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Navigation with tabs */}
      <Navigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        scrollProgress={scrollProgress}
      />

      {/* Page Transition Overlay */}
      <PageTransitionOverlay isAnimating={isTransitioning} />

      {/* Main Content with Section Transitions */}
      <main className="relative">
        <SectionTransition
          sectionId={activeTab}
          activeSection={activeTab}
          direction={direction}
        >
          {renderSection()}
        </SectionTransition>
      </main>

      {/* Footer - always visible */}
      <Footer />

      {/* Floating FAQ Button */}
      <FloatingFAQButton onClick={() => setIsFAQModalOpen(true)} />

      {/* FAQ Modal */}
      <FAQModal isOpen={isFAQModalOpen} onClose={() => setIsFAQModalOpen(false)} />
    </div>
  )
}
