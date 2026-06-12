'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { PageLayout } from '@/components/page-layout'
import { Newspaper, Download, Mail, Camera, FileText, ArrowRight, ExternalLink } from 'lucide-react'

const pressReleases = [
  {
    date: '15 Mai 2025',
    title: 'NeuroConecta fecha parceria com 20 novas prefeituras',
    excerpt: 'Expansão leva plataforma de neurodesenvolvimento para mais de 500 mil habitantes.',
    link: '#'
  },
  {
    date: '02 Abr 2025',
    title: 'Startup brasileira reduz tempo de diagnóstico de TEA em 40%',
    excerpt: 'Tecnologia integra família, escola e clínica para acelerar processo de avaliação.',
    link: '#'
  },
  {
    date: '18 Mar 2025',
    title: 'NeuroConecta recebe aporte de R$ 5 milhões',
    excerpt: 'Investimento será usado para expansão nacional e desenvolvimento de IA.',
    link: '#'
  },
  {
    date: '10 Fev 2025',
    title: 'Plataforma lança módulo de Rotinas Visuais com pictogramas ARASAAC',
    excerpt: 'Parceria internacional permite uso de mais de 40 mil pictogramas gratuitos.',
    link: '#'
  },
]

const mediaKitItems = [
  { name: 'Logo Principal (PNG/SVG)', size: '2.5 MB' },
  { name: 'Logo Monocromática', size: '1.2 MB' },
  { name: 'Guia de Marca', size: '5.8 MB' },
  { name: 'Fotos da Equipe', size: '15 MB' },
  { name: 'Screenshots da Plataforma', size: '8 MB' },
  { name: 'Fact Sheet', size: '500 KB' },
]

const coverage = [
  { outlet: 'Estadão', title: 'Healthtechs que estão transformando a saúde no Brasil', logo: '📰' },
  { outlet: 'Exame', title: 'As 10 startups de impacto social para acompanhar', logo: '📊' },
  { outlet: 'Pequenas Empresas', title: 'Tecnologia a serviço da neurodiversidade', logo: '💼' },
  { outlet: 'Saúde Business', title: 'Como a IA está acelerando diagnósticos de TEA', logo: '🏥' },
]

export default function ImprensaPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef} className="py-20 md:py-28 bg-gradient-to-br from-white via-[#7af7f7]/10 to-[#fff48d]/10">
        <div className="container mx-auto px-4">
          <div className="hero-content max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#7af7f7]/20 text-[#00a0a0] rounded-full text-sm font-medium mb-6">
              <Newspaper className="w-4 h-4" /> Sala de Imprensa
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notícias e Recursos para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]"> Imprensa</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Encontre press releases, materiais de marca e informações 
              para cobertura jornalística sobre o NeuroConecta.
            </p>
            <Link href="mailto:imprensa@neuroconecta.com.br" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              <Mail className="w-5 h-5" /> Contato para Imprensa
            </Link>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Press Releases</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {pressReleases.map((pr, index) => (
              <article key={index} className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all group">
                <span className="text-sm text-[#fd74fd] font-medium">{pr.date}</span>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-[#fd74fd] transition-colors">
                  {pr.title}
                </h3>
                <p className="text-gray-600 mb-4">{pr.excerpt}</p>
                <Link href={pr.link} className="inline-flex items-center gap-1 text-[#7af7f7] font-medium hover:gap-2 transition-all">
                  Ler mais <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Na Mídia */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Na Mídia</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {coverage.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:shadow-lg transition-all">
                <span className="text-4xl mb-4 block">{item.logo}</span>
                <p className="font-semibold text-gray-900 mb-1">{item.outlet}</p>
                <p className="text-sm text-gray-600">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Media Kit</h2>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-medium rounded-lg hover:shadow-lg transition-all">
                <Download className="w-4 h-4" /> Baixar Tudo (32 MB)
              </button>
            </div>
            <div className="space-y-3">
              {mediaKitItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#fd74fd]" />
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{item.size}</span>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-[#7af7f7]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-20 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]">
        <div className="container mx-auto px-4 text-center text-white">
          <Camera className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Precisa de mais informações?</h2>
          <p className="text-xl text-white/80 mb-6">
            Nossa equipe de comunicação está disponível para entrevistas e esclarecimentos
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="mailto:imprensa@neuroconecta.com.br" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#fd74fd] font-semibold rounded-xl hover:shadow-lg transition-all">
              <Mail className="w-5 h-5" /> imprensa@neuroconecta.com.br
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
