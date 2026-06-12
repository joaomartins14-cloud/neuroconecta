'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { Sparkles, Heart, Users, Brain, ArrowRight, Play, School, Stethoscope } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Floating Sticker Component
function FloatingSticker({ delay = 0, children, className = '' }: { delay?: number; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { y: 0, rotation: 0 },
        {
          y: -15,
          rotation: 5,
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay,
        }
      )
    }
  }, [delay])

  return (
    <div ref={ref} className={`absolute ${className}`}>
      {children}
    </div>
  )
}

// Stats Counter
function AnimatedCounter({ value, suffix = '', prefix = '', label }: { value: number; suffix?: string; prefix?: string; label: string }) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && counterRef.current) {
            gsap.fromTo(
              counterRef.current,
              { innerHTML: 0 },
              {
                innerHTML: value,
                duration: 2,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
              }
            )
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={containerRef} className="text-center">
      <div className="text-3xl md:text-4xl font-bold gradient-text">
        {prefix}<span ref={counterRef}>0</span>{suffix}
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with stagger
      gsap.fromTo(
        titleRef.current?.querySelectorAll('.title-word') || [],
        { y: 100, opacity: 0, rotationX: -90 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        }
      )

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' }
      )

      // CTA buttons
      gsap.fromTo(
        ctaRef.current?.children || [],
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          delay: 0.9,
          ease: 'back.out(1.7)',
        }
      )

      // Visual element
      gsap.fromTo(
        visualRef.current,
        { scale: 0.8, opacity: 0, rotation: -10 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2, delay: 0.3, ease: 'elastic.out(1, 0.5)' }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen pt-24 pb-12 px-4 flex items-center relative overflow-hidden"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#fd74fd]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7af7f7]/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#fff48d]/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#fd74fd]/10 to-[#7af7f7]/10 border border-[#fd74fd]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[#fd74fd]" />
              <span className="text-sm font-medium">HealthTech / EdTech / GovTech</span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ perspective: '1000px' }}
            >
              <span className="title-word inline-block">Conectando</span>{' '}
              <span className="title-word inline-block gradient-text">redes de apoio</span>{' '}
              <span className="title-word inline-block">para transformar o</span>{' '}
              <span className="title-word inline-block text-[#7af7f7]">desenvolvimento</span>{' '}
              <span className="title-word inline-block text-[#fd74fd]">neurodivergente</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Plataforma integrada que conecta <strong>Família</strong>, <strong>Escola</strong> e <strong>Equipe Terapêutica</strong> em 
              um ecossistema de dados compartilhados, seguro e orientado por evidências científicas para pessoas com TEA e TDAH.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/demo" className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold shadow-neuro-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                Começar Gratuitamente
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/demo" className="group px-8 py-4 rounded-2xl border-2 border-[#7af7f7] text-foreground font-semibold hover:bg-[#7af7f7]/10 transition-all duration-300 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Ver Demonstração
              </Link>
            </div>

            {/* Stats baseado nos dados reais do PDF */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <AnimatedCounter value={5} suffix="M+" label="Pessoas com TEA no Brasil" />
              <AnimatedCounter value={40} suffix="%" label="Redução em Tempo de Laudo" />
              <AnimatedCounter value={4} suffix="-6 anos" label="Tempo Médio para Diagnóstico" />
            </div>
          </div>

          {/* Visual com Logo */}
          <div ref={visualRef} className="relative flex justify-center items-center">
            {/* Main Logo */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-[#fd74fd]/20 via-[#7af7f7]/20 to-[#fff48d]/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="NeuroConecta - Cérebro colorido com símbolo do infinito e coração"
                  width={350}
                  height={350}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Floating Stickers representando os pilares */}
            <FloatingSticker delay={0} className="top-0 left-0 md:left-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-neuro p-3 flex flex-col items-center justify-center gap-1">
                <Heart className="w-8 h-8 text-[#fd74fd]" />
                <span className="text-[10px] font-semibold text-[#fd74fd]">Família</span>
              </div>
            </FloatingSticker>

            <FloatingSticker delay={0.5} className="top-10 right-0 md:right-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-neuro p-3 flex flex-col items-center justify-center gap-1">
                <School className="w-8 h-8 text-[#7af7f7]" />
                <span className="text-[10px] font-semibold text-[#7af7f7]">Escola</span>
              </div>
            </FloatingSticker>

            <FloatingSticker delay={1} className="bottom-20 left-0 md:-left-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-neuro p-3 flex flex-col items-center justify-center gap-1">
                <Stethoscope className="w-8 h-8 text-[#fff48d]" />
                <span className="text-[10px] font-semibold text-amber-600">Clínica</span>
              </div>
            </FloatingSticker>

            <FloatingSticker delay={1.5} className="bottom-5 right-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white shadow-neuro p-3 flex flex-col items-center justify-center gap-1">
                <Users className="w-8 h-8 text-[#fd74fd]" />
                <span className="text-[10px] font-semibold text-[#fd74fd]">Gestores</span>
              </div>
            </FloatingSticker>

            <FloatingSticker delay={2} className="top-1/2 -right-5 md:right-[-30px]">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] shadow-neuro flex items-center justify-center">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
            </FloatingSticker>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-16 pt-12 border-t border-border/50">
          <p className="text-center text-sm text-muted-foreground mb-6">Alinhado aos Objetivos de Desenvolvimento Sustentável (ODS/ONU)</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fd74fd]/10">
              <span className="text-2xl">🏥</span>
              <span className="text-sm font-medium">ODS 3 - Saúde</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7af7f7]/10">
              <span className="text-2xl">📚</span>
              <span className="text-sm font-medium">ODS 4 - Educação</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fff48d]/10">
              <span className="text-2xl">⚖️</span>
              <span className="text-sm font-medium">ODS 10 - Igualdade</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fd74fd]/10">
              <span className="text-2xl">🤝</span>
              <span className="text-sm font-medium">ODS 17 - Parcerias</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
