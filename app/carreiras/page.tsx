'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { PageLayout } from '@/components/page-layout'
import { Briefcase, MapPin, Clock, Heart, Rocket, Users, Coffee, Sparkles, ArrowRight, ChevronDown } from 'lucide-react'

const jobs = [
  {
    id: 1,
    title: 'Desenvolvedor(a) Full Stack Senior',
    department: 'Engenharia',
    location: 'Remoto',
    type: 'CLT',
    level: 'Senior',
    description: 'Buscamos um desenvolvedor experiente em React, Node.js e PostgreSQL para liderar projetos de alta complexidade.',
    requirements: ['5+ anos de experiência', 'React/Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
  },
  {
    id: 2,
    title: 'Designer de Produto (UX/UI)',
    department: 'Design',
    location: 'São Paulo ou Remoto',
    type: 'CLT',
    level: 'Pleno',
    description: 'Procuramos um designer que entenda profundamente as necessidades de usuários neurodivergentes.',
    requirements: ['3+ anos de experiência', 'Figma', 'Design System', 'Acessibilidade', 'Pesquisa com usuários'],
  },
  {
    id: 3,
    title: 'Especialista em Neurodesenvolvimento',
    department: 'Clínico',
    location: 'Remoto',
    type: 'PJ',
    level: 'Especialista',
    description: 'Profissional da saúde para validar funcionalidades e apoiar o desenvolvimento de novas features clínicas.',
    requirements: ['Formação em Psicologia, Fonoaudiologia ou TO', 'Especialização em TEA', 'Experiência clínica'],
  },
  {
    id: 4,
    title: 'Customer Success Manager',
    department: 'Sucesso do Cliente',
    location: 'São Paulo',
    type: 'CLT',
    level: 'Pleno',
    description: 'Responsável por garantir que clínicas e prefeituras extraiam o máximo valor da plataforma.',
    requirements: ['3+ anos em CS', 'Experiência com SaaS', 'Conhecimento em saúde/educação'],
  },
  {
    id: 5,
    title: 'Analista de Dados',
    department: 'Data',
    location: 'Remoto',
    type: 'CLT',
    level: 'Pleno',
    description: 'Análise de dados clínicos e comportamentais para gerar insights que impactem o produto.',
    requirements: ['Python', 'SQL', 'Power BI/Metabase', 'Estatística', 'LGPD'],
  },
]

const benefits = [
  { icon: Heart, title: 'Plano de Saúde', description: 'Cobertura completa para você e dependentes' },
  { icon: Coffee, title: 'Flexibilidade', description: 'Trabalho remoto ou híbrido' },
  { icon: Rocket, title: 'Crescimento', description: 'Plano de carreira estruturado' },
  { icon: Sparkles, title: 'Propósito', description: 'Impacto real na vida de milhares' },
]

export default function CarreirasPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
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
      <section ref={heroRef} className="py-20 md:py-28 bg-gradient-to-br from-[#fff48d]/20 via-white to-[#fd74fd]/10">
        <div className="container mx-auto px-4">
          <div className="hero-content max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#fd74fd]/10 text-[#fd74fd] rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" /> Junte-se ao Time
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Construa o futuro do
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]"> neurodesenvolvimento</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Estamos em busca de pessoas apaixonadas por tecnologia e saúde, 
              que queiram fazer a diferença na vida de milhares de famílias.
            </p>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Por que trabalhar conosco?</h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-7 h-7 text-[#fd74fd]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vagas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Vagas Abertas</h2>
            <p className="text-gray-600">{jobs.length} oportunidades disponíveis</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-[#fd74fd]/10 text-[#fd74fd] text-xs font-medium rounded">
                        {job.department}
                      </span>
                      <span className="px-2 py-1 bg-[#7af7f7]/10 text-[#00a0a0] text-xs font-medium rounded">
                        {job.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedJob === job.id ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedJob === job.id && (
                  <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requisitos:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req) => (
                          <span key={req} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`/contato?vaga=${encodeURIComponent(job.title)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-medium rounded-lg hover:shadow-lg transition-all"
                    >
                      Candidatar-se <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Não encontrou sua vaga ideal?
          </h2>
          <p className="text-gray-600 mb-8">
            Envie seu currículo para nosso banco de talentos
          </p>
          <Link href="/contato?assunto=banco-talentos" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#fd74fd] text-[#fd74fd] font-semibold rounded-xl hover:bg-[#fd74fd]/10 transition-all">
            Enviar Currículo
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
