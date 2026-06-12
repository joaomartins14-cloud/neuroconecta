'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { PageLayout } from '@/components/page-layout'
import { Heart, Target, Eye, Users, Award, Globe, Lightbulb, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const team = [
  { name: 'Dr. Carlos Silva', role: 'CEO & Fundador', specialty: 'Neuropediatra', image: '/team/carlos.jpg' },
  { name: 'Dra. Ana Santos', role: 'CTO', specialty: 'Eng. de Software', image: '/team/ana.jpg' },
  { name: 'Dr. Pedro Oliveira', role: 'Diretor Clínico', specialty: 'Psicólogo', image: '/team/pedro.jpg' },
  { name: 'Maria Costa', role: 'COO', specialty: 'Gestão de Saúde', image: '/team/maria.jpg' },
]

const timeline = [
  { year: '2020', title: 'Fundação', description: 'Nascimento da ideia durante a pandemia' },
  { year: '2021', title: 'MVP', description: 'Primeiro protótipo testado com 50 famílias' },
  { year: '2022', title: 'Lançamento', description: 'Plataforma lançada oficialmente' },
  { year: '2023', title: 'Expansão', description: 'Parceria com primeiras prefeituras' },
  { year: '2024', title: 'Crescimento', description: '10.000+ usuários ativos' },
  { year: '2025', title: 'Inovação', description: 'IA integrada ao diagnóstico' },
]

export default function SobreNosPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from('.value-card', {
        scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
      })

      gsap.from('.team-card', {
        scrollTrigger: { trigger: teamRef.current, start: 'top 80%' },
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6
      })

      gsap.from('.timeline-item', {
        scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' },
        x: -50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef} className="py-20 md:py-32 bg-gradient-to-br from-white via-[#fff48d]/10 to-[#7af7f7]/10">
        <div className="container mx-auto px-4">
          <div className="hero-content max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-[#fd74fd]/10 text-[#fd74fd] rounded-full text-sm font-medium mb-6">
              Nossa História
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Transformando o cuidado
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]"> neurodivergente</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Nascemos da necessidade real de conectar famílias, escolas e profissionais 
              de saúde em uma única plataforma colaborativa, reduzindo o tempo de diagnóstico 
              e melhorando a qualidade de vida de milhares de crianças.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/demo" className="px-8 py-4 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#fd74fd]/30 transition-all">
                Conhecer a Plataforma
              </Link>
              <Link href="/contato" className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#7af7f7] hover:text-[#7af7f7] transition-all">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section ref={valuesRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossos Pilares</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Os valores que guiam cada decisão e funcionalidade da plataforma</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="value-card p-8 rounded-2xl bg-gradient-to-br from-[#fff48d]/20 to-[#fff48d]/5 border border-[#fff48d]/30">
              <div className="w-14 h-14 bg-[#fff48d] rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Missão</h3>
              <p className="text-gray-600">
                Conectar redes de apoio para transformar o desenvolvimento neurodivergente, 
                oferecendo ferramentas que integram família, escola e clínica.
              </p>
            </div>

            <div className="value-card p-8 rounded-2xl bg-gradient-to-br from-[#fd74fd]/20 to-[#fd74fd]/5 border border-[#fd74fd]/30">
              <div className="w-14 h-14 bg-[#fd74fd] rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visão</h3>
              <p className="text-gray-600">
                Ser a plataforma de referência global em neurodesenvolvimento, 
                impactando positivamente 1 milhão de famílias até 2030.
              </p>
            </div>

            <div className="value-card p-8 rounded-2xl bg-gradient-to-br from-[#7af7f7]/20 to-[#7af7f7]/5 border border-[#7af7f7]/30">
              <div className="w-14 h-14 bg-[#7af7f7] rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Valores</h3>
              <p className="text-gray-600">
                Empatia, inovação responsável, colaboração multidisciplinar, 
                acessibilidade e compromisso com a privacidade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossa Jornada</h2>
            <p className="text-gray-600">Do sonho à realidade em poucos anos</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#fd74fd] via-[#7af7f7] to-[#fff48d]" />
              
              {timeline.map((item, index) => (
                <div key={item.year} className={`timeline-item relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-20 md:pl-0`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mt-1">{item.title}</h3>
                      <p className="text-gray-600 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white border-4 border-[#fd74fd] rounded-full transform -translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nossa Equipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Profissionais apaixonados por tecnologia e saúde, unidos pelo propósito de fazer a diferença
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="team-card group text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex items-center justify-center overflow-hidden">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-[#fd74fd] text-sm font-medium">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-20 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: '10.000+', label: 'Famílias Atendidas' },
              { number: '500+', label: 'Profissionais' },
              { number: '50+', label: 'Municípios' },
              { number: '40%', label: 'Redução no Tempo de Laudo' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Faça parte dessa transformação
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de famílias, escolas e profissionais que já estão 
            revolucionando o cuidado neurodivergente.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/demo" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              Começar Agora <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/carreiras" className="px-8 py-4 border-2 border-[#fd74fd] text-[#fd74fd] font-semibold rounded-xl hover:bg-[#fd74fd]/10 transition-all">
              Trabalhe Conosco
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
