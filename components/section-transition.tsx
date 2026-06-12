'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type TabId } from './navigation'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SectionTransitionProps {
  children: React.ReactNode
  sectionId: TabId
  activeSection: TabId
  direction: 'left' | 'right' | 'none'
}

/**
 * SectionTransition Component
 * 
 * Handles smooth GSAP-powered transitions between sections/tabs.
 * Uses a combination of fade, slide and scale for a premium feel.
 */
export function SectionTransition({
  children,
  sectionId,
  activeSection,
  direction,
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isActive = sectionId === activeSection

  useEffect(() => {
    if (!sectionRef.current) return

    const section = sectionRef.current

    if (isActive) {
      // Animate in
      gsap.set(section, { display: 'block' })
      
      const slideX = direction === 'left' ? -100 : direction === 'right' ? 100 : 0
      
      gsap.fromTo(
        section,
        {
          opacity: 0,
          x: slideX,
          scale: 0.98,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
        }
      )
    } else {
      // Animate out
      const slideX = direction === 'left' ? 100 : direction === 'right' ? -100 : 0
      
      gsap.to(section, {
        opacity: 0,
        x: slideX,
        scale: 0.98,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(section, { display: 'none' })
        },
      })
    }
  }, [isActive, direction])

  return (
    <div
      ref={sectionRef}
      className="w-full"
      style={{ display: isActive ? 'block' : 'none' }}
      data-section={sectionId}
    >
      {children}
    </div>
  )
}

/**
 * PageTransitionOverlay Component
 * 
 * Creates a beautiful overlay animation during tab transitions.
 * Uses Lottie-style SVG animation or gradient sweep effect.
 */
interface PageTransitionOverlayProps {
  isAnimating: boolean
}

export function PageTransitionOverlay({ isAnimating }: PageTransitionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const circlesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!overlayRef.current) return

    if (isAnimating) {
      gsap.set(overlayRef.current, { display: 'flex' })
      
      // Animate circles
      circlesRef.current.forEach((circle, index) => {
        gsap.fromTo(
          circle,
          {
            scale: 0,
            opacity: 1,
          },
          {
            scale: 3,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
          }
        )
      })

      // Hide overlay after animation
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.5,
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none', opacity: 1 })
        },
      })
    }
  }, [isAnimating])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[55] pointer-events-none items-center justify-center"
      style={{ display: 'none' }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) circlesRef.current[i] = el
          }}
          className="absolute w-32 h-32 rounded-full"
          style={{
            background:
              i === 0
                ? 'radial-gradient(circle, #fd74fd40 0%, transparent 70%)'
                : i === 1
                  ? 'radial-gradient(circle, #7af7f740 0%, transparent 70%)'
                  : 'radial-gradient(circle, #fff48d40 0%, transparent 70%)',
          }}
        />
      ))}
    </div>
  )
}

/**
 * useTabTransition Hook
 * 
 * Custom hook to manage tab transitions with GSAP animations.
 * Returns the transition state and handlers.
 */
export function useTabTransition(initialTab: TabId) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab)
  const [direction, setDirection] = useState<'left' | 'right' | 'none'>('none')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const tabOrder: TabId[] = ['inicio', 'como-funciona', 'videos', 'beneficios', 'faq']

  const handleTabChange = useCallback(
    (newTab: TabId) => {
      if (newTab === activeTab || isTransitioning) return

      setIsTransitioning(true)

      const currentIndex = tabOrder.indexOf(activeTab)
      const newIndex = tabOrder.indexOf(newTab)
      const newDirection = newIndex > currentIndex ? 'right' : 'left'

      setDirection(newDirection)
      
      // Small delay to let exit animation start
      setTimeout(() => {
        setActiveTab(newTab)
        
        // Calculate scroll progress based on tab
        const progress = ((newIndex + 1) / tabOrder.length) * 100
        setScrollProgress(progress)

        // End transition after animations complete
        setTimeout(() => {
          setIsTransitioning(false)
          setDirection('none')
        }, 400)
      }, 200)

      // Scroll to top of content area
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [activeTab, isTransitioning, tabOrder]
  )

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / scrollHeight) * 100
      
      // Blend tab progress with scroll progress
      const tabIndex = tabOrder.indexOf(activeTab)
      const baseProgress = (tabIndex / (tabOrder.length - 1)) * 100
      const blendedProgress = baseProgress + (progress / tabOrder.length)
      
      setScrollProgress(Math.min(blendedProgress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeTab, tabOrder])

  return {
    activeTab,
    direction,
    isTransitioning,
    scrollProgress,
    handleTabChange,
  }
}
