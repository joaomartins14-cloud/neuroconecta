'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Stethoscope, 
  Users, 
  FileText, 
  Calendar,
  Brain,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Perfil Sensorial Digital',
    description: 'Avaliação completa do perfil sensorial com escalas validadas cientificamente. Resultados em tempo real.'
  },
  {
    icon: FileText,
    title: 'Geração de Laudos com IA',
    description: 'Laudos estruturados gerados automaticamente com base nos dados coletados. Revisão e assinatura digital.'
  },
  {
    icon: Calendar,
    title: 'Agenda Integrada',
    description: 'Gestão de consultas, lembretes automáticos e integração com prontuário eletrônico.'
  },
  {
    icon: Users,
    title: 'Equipe Multidisciplinar',
    description: 'Colaboração entre profissionais com compartilhamento seguro de informações clínicas.'
  },
  {
    icon: Shield,
    title: 'Conformidade LGPD',
    description: 'Dados criptografados, consentimento informado e rastreabilidade completa de acessos.'
  },
  {
    icon: TrendingUp,
    title: 'Dashboard Analytics',
    description: 'Métricas de atendimento, evolução de pacientes e indicadores de qualidade.'
  }
]

const plans = [
  {
    name: 'Essencial',
    price: 'R$ 197',
    period: '/mês por profissional',
    features: ['Até 50 pacientes', 'Perfil sensorial básico', 'Agenda', 'Suporte por email'],
    highlighted: false
  },
  {
    name: 'Profissional',
    price: 'R$ 397',
    period: '/mês por profissional',
    features: ['Pacientes ilimitados', 'Perfil sensorial completo', 'Geração de laudos', 'Equipe multidisciplinar', 'Suporte prioritário'],
    highlighted: true
  },
  {
    name: 'Clínica',
    price: 'Sob consulta',
    period: '',
    features: ['Multi-unidades', 'API de integração', 'White-label', 'Treinamento presencial', 'Gerente de conta dedicado'],
    highlighted: false
  }
]

export default function ClinicasPage() {
  return (
    <PageLayout 
      title="Para Clínicas" 
      subtitle="Solução completa para clínicas multidisciplinares de neurodesenvolvimento"
      backHref="/"
    >
      {/* Hero CTA */}
      <div className="bg-gradient-to-r from-[#fff48d]/20 via-[#fd74fd]/20 to-[#7af7f7]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reduza em até 40% o tempo de emissão de laudos</h2>
            <p className="text-gray-600">Automatize processos e foque no que importa: seus pacientes.</p>
          </div>
          <Link
            href="/demo"
            className="px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full font-medium hover:shadow-lg transition-all whitespace-nowrap"
          >
            Testar gratuitamente
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Funcionalidades para Clínicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#fd74fd]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Pricing */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Planos para Clínicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`rounded-xl p-6 border-2 transition-all ${
              plan.highlighted 
                ? 'border-[#fd74fd] bg-gradient-to-br from-[#fd74fd]/5 to-[#7af7f7]/5 shadow-lg' 
                : 'border-gray-100 bg-white hover:border-gray-200'
            }`}
          >
            {plan.highlighted && (
              <span className="inline-block px-3 py-1 bg-[#fd74fd] text-white text-xs font-medium rounded-full mb-4">
                Mais popular
              </span>
            )}
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              href="/demo"
              className={`block text-center py-2 rounded-lg font-medium transition-colors ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Começar agora
            </Link>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Pronto para transformar sua clínica?</h2>
        <p className="text-gray-400 mb-6">Agende uma demonstração personalizada com nossa equipe.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/demo" className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Ver demonstração
          </Link>
          <Link href="/contato" className="px-6 py-3 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors">
            Falar com vendas
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
