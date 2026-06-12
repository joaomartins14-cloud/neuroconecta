'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, 
  GraduationCap, 
  Stethoscope, 
  Building2,
  Heart,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle2
} from 'lucide-react'

const profiles = [
  {
    id: 'familia',
    title: 'Família',
    description: 'Acompanhe o desenvolvimento do seu filho, registre eventos e comunique-se com a equipe multidisciplinar.',
    icon: Heart,
    color: '#fd74fd',
    bgGradient: 'from-[#fd74fd]/20 to-[#fd74fd]/5',
    features: ['Diário de eventos', 'Rotinas visuais', 'Chat seguro', 'Relatórios de evolução'],
    href: '/dashboard/familia'
  },
  {
    id: 'escola',
    title: 'Escola',
    description: 'Gerencie alunos com necessidades especiais, crie adaptações curriculares e colabore com famílias.',
    icon: GraduationCap,
    color: '#7af7f7',
    bgGradient: 'from-[#7af7f7]/20 to-[#7af7f7]/5',
    features: ['Gestão de alunos', 'PEI digital', 'Comunicação integrada', 'Relatórios pedagógicos'],
    href: '/dashboard/escola'
  },
  {
    id: 'clinica',
    title: 'Clínica / Profissional',
    description: 'Dashboard completo para profissionais de saúde com prontuário eletrônico e geração de laudos.',
    icon: Stethoscope,
    color: '#fff48d',
    bgGradient: 'from-[#fff48d]/20 to-[#fff48d]/5',
    features: ['Prontuário eletrônico', 'Perfil sensorial', 'Geração de laudos', 'Agenda integrada'],
    href: '/dashboard'
  },
  {
    id: 'gestao',
    title: 'Gestão Pública',
    description: 'Painel de Business Intelligence para secretarias de saúde e educação com dados populacionais.',
    icon: Building2,
    color: '#a78bfa',
    bgGradient: 'from-[#a78bfa]/20 to-[#a78bfa]/5',
    features: ['Dashboard BI', 'Indicadores populacionais', 'Gestão de filas', 'Relatórios gerenciais'],
    href: '/dashboard/gestao'
  }
]

export default function DemoPage() {
  const [hoveredProfile, setHoveredProfile] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      '.demo-header',
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.6, 
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
      }
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f8f9ff] to-[#fff8f8]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 relative">
                <Image
                  src="/logo.png"
                  alt="NeuroConecta"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-lg">
                <span className="text-[#fd74fd]">Neuro</span>
                <span className="text-[#7af7f7]">Conecta</span>
              </span>
            </Link>
            <Link 
              href="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Voltar ao site
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main ref={containerRef} className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="demo-header text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#fd74fd]/10 to-[#7af7f7]/10 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#fd74fd]" />
              <span className="text-sm font-medium text-gray-700">Demonstração Interativa</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Escolha seu{' '}
              <span className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] bg-clip-text text-transparent">
                perfil de acesso
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore a plataforma NeuroConecta na perspectiva de cada stakeholder. 
              Todos os dados são fictícios para demonstração.
            </p>
          </div>

          {/* Profile Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {profiles.map((profile, index) => {
              const Icon = profile.icon
              return (
                <Link
                  key={profile.id}
                  href={profile.href}
                  ref={el => { if (el) cardsRef.current[index] = el as unknown as HTMLDivElement }}
                  className={`
                    group relative overflow-hidden rounded-2xl border-2 transition-all duration-300
                    ${hoveredProfile === profile.id 
                      ? 'border-transparent shadow-2xl scale-[1.02]' 
                      : 'border-gray-100 hover:border-gray-200 shadow-lg'
                    }
                  `}
                  style={{
                    borderColor: hoveredProfile === profile.id ? profile.color : undefined
                  }}
                  onMouseEnter={() => setHoveredProfile(profile.id)}
                  onMouseLeave={() => setHoveredProfile(null)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${profile.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative p-6 sm:p-8 bg-white group-hover:bg-transparent transition-colors duration-300">
                    {/* Icon */}
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${profile.color}20` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: profile.color }} />
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{profile.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{profile.description}</p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {profile.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: profile.color }} />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div 
                      className="inline-flex items-center gap-2 font-medium transition-all duration-300 group-hover:gap-3"
                      style={{ color: profile.color }}
                    >
                      Acessar demonstração
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div 
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: profile.color }}
                  />
                </Link>
              )
            })}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-[#fd74fd]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Ambiente de Demonstração</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Esta é uma versão de demonstração da plataforma NeuroConecta. Todos os dados apresentados 
                  são fictícios e servem apenas para ilustrar as funcionalidades do sistema. Em produção, 
                  os dados são criptografados e seguem rigorosos padrões de segurança conforme a LGPD.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Dados fictícios
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    100% funcional
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Sem cadastro
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
