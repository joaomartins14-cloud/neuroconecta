'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Heart, 
  Users, 
  FileText, 
  Calendar,
  Building,
  Shield,
  TrendingUp,
  HandHeart,
  CheckCircle2
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Gestão de Assistidos',
    description: 'Cadastro completo dos assistidos com perfil sensorial, histórico de atendimentos e evolução.'
  },
  {
    icon: Calendar,
    title: 'Agenda de Atendimentos',
    description: 'Organize terapias, oficinas e atividades. Controle de frequência e presença.'
  },
  {
    icon: FileText,
    title: 'Relatórios para Convênios',
    description: 'Geração de relatórios formatados para prestação de contas a órgãos públicos e convênios.'
  },
  {
    icon: HandHeart,
    title: 'Integração com Famílias',
    description: 'Comunicação direta com responsáveis, compartilhamento de orientações e progresso.'
  },
  {
    icon: TrendingUp,
    title: 'Indicadores de Impacto',
    description: 'Métricas de evolução dos assistidos para demonstrar resultados do trabalho.'
  },
  {
    icon: Shield,
    title: 'Conformidade Legal',
    description: 'Atendimento às exigências da LGPD e requisitos de órgãos reguladores.'
  }
]

const benefits = [
  'Redução de burocracia administrativa',
  'Melhor comunicação com famílias',
  'Dados para captação de recursos',
  'Integração com rede de saúde',
  'Relatórios automatizados',
  'Suporte especializado'
]

export default function APAEsPage() {
  return (
    <PageLayout 
      title="Para APAEs" 
      subtitle="Solução especializada para Associações de Pais e Amigos dos Excepcionais"
      backHref="/"
    >
      {/* Hero CTA */}
      <div className="bg-gradient-to-r from-[#fd74fd]/20 via-[#7af7f7]/20 to-[#fff48d]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tecnologia a serviço da inclusão</h2>
            <p className="text-gray-600">Potencialize o impacto do trabalho da sua APAE com ferramentas digitais.</p>
          </div>
          <Link
            href="/demo"
            className="px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full font-medium hover:shadow-lg transition-all whitespace-nowrap"
          >
            Conhecer a solução
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-[#fd74fd]">2.200+</div>
          <div className="text-sm text-gray-600 mt-1">APAEs no Brasil</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-[#7af7f7]">250mil+</div>
          <div className="text-sm text-gray-600 mt-1">Pessoas atendidas</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-[#fff48d]">50%</div>
          <div className="text-sm text-gray-600 mt-1">Redução administrativa</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-[#a78bfa]">100%</div>
          <div className="text-sm text-gray-600 mt-1">Conformidade LGPD</div>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Funcionalidades para APAEs</h2>
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

      {/* Benefits */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Por que escolher o NeuroConecta?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#fd74fd] flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Pricing */}
      <div className="bg-gradient-to-br from-[#fd74fd]/10 to-[#7af7f7]/10 rounded-2xl p-8 mb-12 text-center">
        <Building className="w-12 h-12 text-[#fd74fd] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Condições Especiais para APAEs</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Oferecemos planos com desconto especial para instituições sem fins lucrativos. 
          Entre em contato para conhecer as condições.
        </p>
        <Link
          href="/contato"
          className="inline-block px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full font-medium hover:shadow-lg transition-all"
        >
          Solicitar proposta
        </Link>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Transforme o atendimento da sua APAE</h2>
        <p className="text-gray-400 mb-6">Agende uma demonstração personalizada.</p>
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
