'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { PageLayout } from '@/components/page-layout'
import { Building2, Heart, GraduationCap, Stethoscope, Handshake, Globe, ArrowRight, ExternalLink } from 'lucide-react'

const partners = [
  {
    category: 'Saúde Pública',
    icon: Building2,
    color: '#fd74fd',
    items: [
      { name: 'Secretaria de Saúde - SP', type: 'Governo', status: 'Ativo' },
      { name: 'Secretaria de Saúde - RJ', type: 'Governo', status: 'Ativo' },
      { name: 'Secretaria de Saúde - MG', type: 'Governo', status: 'Em Negociação' },
    ]
  },
  {
    category: 'Instituições de Ensino',
    icon: GraduationCap,
    color: '#7af7f7',
    items: [
      { name: 'Rede Municipal de São Paulo', type: 'Educação', status: 'Ativo' },
      { name: 'Colégio Objetivo', type: 'Privado', status: 'Ativo' },
      { name: 'Sistema COC', type: 'Privado', status: 'Piloto' },
    ]
  },
  {
    category: 'Clínicas e Hospitais',
    icon: Stethoscope,
    color: '#fff48d',
    items: [
      { name: 'Hospital Albert Einstein', type: 'Hospital', status: 'Parceria Técnica' },
      { name: 'Clínica NeuroKids', type: 'Clínica', status: 'Ativo' },
      { name: 'Instituto AACD', type: 'Instituto', status: 'Ativo' },
    ]
  },
  {
    category: 'ONGs e Associações',
    icon: Heart,
    color: '#fd74fd',
    items: [
      { name: 'APAE Brasil', type: 'ONG', status: 'Parceria Nacional' },
      { name: 'Instituto Jô Clemente', type: 'Instituto', status: 'Ativo' },
      { name: 'Autism Speaks Brasil', type: 'ONG', status: 'Colaboração' },
    ]
  },
]

const integrations = [
  { name: 'ARASAAC', description: 'Pictogramas para comunicação alternativa', logo: '🎨' },
  { name: 'Google Calendar', description: 'Sincronização de agenda', logo: '📅' },
  { name: 'WhatsApp Business', description: 'Notificações e lembretes', logo: '💬' },
  { name: 'SUS / e-SUS', description: 'Integração com sistema público', logo: '🏥' },
  { name: 'Prontuário Eletrônico', description: 'Integração via HL7/FHIR', logo: '📋' },
  { name: 'Zoom / Meet', description: 'Teleconsultas integradas', logo: '🎥' },
]

export default function ParceirosPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
      })

      gsap.from('.partner-card', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef} className="py-20 md:py-28 bg-gradient-to-br from-white via-[#7af7f7]/10 to-[#fd74fd]/10">
        <div className="container mx-auto px-4">
          <div className="hero-content max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#7af7f7]/20 text-[#00a0a0] rounded-full text-sm font-medium mb-6">
              <Handshake className="w-4 h-4" /> Ecossistema Colaborativo
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Parceiros que fazem a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]"> diferença</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Trabalhamos com instituições comprometidas com a melhoria do cuidado 
              neurodivergente em todo o Brasil.
            </p>
            <Link href="/contato" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Seja um Parceiro <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {partners.map((category) => (
              <div key={category.category} className="partner-card bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <category.icon className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 bg-white rounded-xl">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Ativo' ? 'bg-green-100 text-green-700' :
                        item.status === 'Piloto' ? 'bg-blue-100 text-blue-700' :
                        item.status === 'Parceria Nacional' ? 'bg-purple-100 text-purple-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrações */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Integrações</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conectamos com as principais ferramentas e sistemas do mercado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {integrations.map((integration) => (
              <div key={integration.name} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg transition-all group">
                <span className="text-4xl mb-4 block">{integration.logo}</span>
                <h3 className="font-semibold text-gray-900 mb-2">{integration.name}</h3>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]">
        <div className="container mx-auto px-4 text-center text-white">
          <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quer fazer parte desse ecossistema?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Estamos sempre abertos a novas parcerias que compartilhem nosso propósito
          </p>
          <Link href="/contato" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#fd74fd] font-semibold rounded-xl hover:shadow-lg transition-all">
            Entrar em Contato <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
