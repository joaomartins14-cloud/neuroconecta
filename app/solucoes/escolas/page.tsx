'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  GraduationCap, 
  Users, 
  FileText, 
  MessageSquare,
  BookOpen,
  Heart,
  Shield,
  TrendingUp,
  CheckCircle2
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Gestão de Alunos',
    description: 'Cadastro completo de alunos com necessidades especiais, histórico e documentação centralizada.'
  },
  {
    icon: FileText,
    title: 'PEI Digital',
    description: 'Plano Educacional Individualizado digital com metas, adaptações e acompanhamento de progresso.'
  },
  {
    icon: MessageSquare,
    title: 'Comunicação Integrada',
    description: 'Canal seguro de comunicação entre escola, família e equipe de saúde.'
  },
  {
    icon: BookOpen,
    title: 'Adaptações Curriculares',
    description: 'Biblioteca de estratégias pedagógicas e adaptações baseadas no perfil do aluno.'
  },
  {
    icon: Heart,
    title: 'Registro de Comportamentos',
    description: 'Diário de observações, eventos e padrões comportamentais para análise conjunta.'
  },
  {
    icon: TrendingUp,
    title: 'Relatórios Pedagógicos',
    description: 'Geração automática de relatórios de evolução para famílias e órgãos reguladores.'
  }
]

const benefits = [
  'Comunicação em tempo real com famílias',
  'Acesso ao perfil sensorial do aluno',
  'Sugestões de adaptações baseadas em evidências',
  'Histórico completo de intervenções',
  'Integração com equipe multidisciplinar',
  'Conformidade com políticas de inclusão'
]

export default function EscolasPage() {
  return (
    <PageLayout 
      title="Para Escolas" 
      subtitle="Plataforma de inclusão escolar para educadores e coordenadores pedagógicos"
      backHref="/"
    >
      {/* Hero CTA */}
      <div className="bg-gradient-to-r from-[#7af7f7]/20 via-[#fff48d]/20 to-[#fd74fd]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inclusão escolar baseada em dados e colaboração</h2>
            <p className="text-gray-600">Conecte educadores, famílias e profissionais de saúde em uma única plataforma.</p>
          </div>
          <Link
            href="/demo"
            className="px-6 py-3 bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white rounded-full font-medium hover:shadow-lg transition-all whitespace-nowrap"
          >
            Conhecer a plataforma
          </Link>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Funcionalidades para Escolas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7af7f7]/20 to-[#fff48d]/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#7af7f7]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefícios para Educadores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#7af7f7] flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="bg-gradient-to-br from-[#7af7f7]/10 to-[#fd74fd]/10 rounded-2xl p-8 mb-12">
        <blockquote className="text-lg text-gray-700 italic mb-4">
          &quot;A plataforma transformou nossa forma de trabalhar com alunos neurodivergentes. 
          Agora temos acesso a informações que antes levavam semanas para chegar.&quot;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#7af7f7] flex items-center justify-center text-white font-bold">
            MC
          </div>
          <div>
            <div className="font-medium text-gray-900">Maria Costa</div>
            <div className="text-sm text-gray-500">Coordenadora Pedagógica - Escola Municipal SP</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Transforme a inclusão na sua escola</h2>
        <p className="text-gray-400 mb-6">Agende uma demonstração para sua equipe pedagógica.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/demo" className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Ver demonstração
          </Link>
          <Link href="/contato" className="px-6 py-3 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-colors">
            Falar com especialista
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
