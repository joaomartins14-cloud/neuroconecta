'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Palette, 
  Building2, 
  Shield, 
  Zap,
  Code,
  Headphones,
  CheckCircle2
} from 'lucide-react'

const features = [
  {
    icon: Palette,
    title: 'Marca Própria',
    description: 'Logo, cores, domínio personalizado. Sua marca em toda a plataforma.'
  },
  {
    icon: Building2,
    title: 'Multi-tenant',
    description: 'Gerencie múltiplas unidades ou clientes em uma única instância.'
  },
  {
    icon: Code,
    title: 'API Completa',
    description: 'Integração com seus sistemas existentes via API RESTful documentada.'
  },
  {
    icon: Shield,
    title: 'Dados Isolados',
    description: 'Cada cliente com seus dados completamente isolados e seguros.'
  },
  {
    icon: Zap,
    title: 'Deploy Dedicado',
    description: 'Infraestrutura dedicada para alta performance e disponibilidade.'
  },
  {
    icon: Headphones,
    title: 'Suporte Premium',
    description: 'Gerente de conta dedicado e suporte técnico prioritário.'
  }
]

const useCases = [
  {
    title: 'Redes de Clínicas',
    description: 'Ofereça a plataforma NeuroConecta com a marca da sua rede de clínicas.'
  },
  {
    title: 'Franquias',
    description: 'Padronize atendimento em todas as unidades com sua identidade visual.'
  },
  {
    title: 'Convênios de Saúde',
    description: 'Disponibilize para beneficiários como diferencial competitivo.'
  },
  {
    title: 'Secretarias de Saúde',
    description: 'Implante com a marca do município ou estado para a rede pública.'
  }
]

export default function WhiteLabelPage() {
  return (
    <PageLayout 
      title="White-Label" 
      subtitle="Plataforma NeuroConecta com a sua marca"
      backHref="/"
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#fd74fd]/20 via-[#a78bfa]/20 to-[#7af7f7]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sua marca, nossa tecnologia</h2>
            <p className="text-gray-600 mb-6">
              Ofereça a melhor plataforma de neurodesenvolvimento do mercado com a identidade 
              visual da sua organização. Ideal para redes de clínicas, franquias e gestão pública.
            </p>
            <Link
              href="/contato"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#a78bfa] text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Solicitar proposta
            </Link>
          </div>
          <div className="w-64 h-48 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-200 rounded-xl mb-3 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900">Sua Logo</div>
              <div className="text-sm text-gray-500">powered by NeuroConecta</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">O que está incluído</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd]/20 to-[#a78bfa]/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#fd74fd]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Use Cases */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Casos de Uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, i) => (
            <div key={i} className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#fd74fd] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Processo de Implantação</h2>
      <div className="space-y-4 mb-12">
        {[
          { step: '1', title: 'Análise de Requisitos', desc: 'Entendemos suas necessidades específicas e definimos o escopo.' },
          { step: '2', title: 'Customização', desc: 'Aplicamos sua identidade visual e configuramos funcionalidades.' },
          { step: '3', title: 'Integração', desc: 'Conectamos com seus sistemas existentes via API.' },
          { step: '4', title: 'Treinamento', desc: 'Capacitamos sua equipe para uso e administração.' },
          { step: '5', title: 'Go-Live', desc: 'Lançamento com suporte dedicado e monitoramento.' }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#fd74fd] to-[#a78bfa] flex items-center justify-center text-white font-bold flex-shrink-0">
              {item.step}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Pronto para ter sua própria plataforma?</h2>
        <p className="text-gray-400 mb-6">Entre em contato e receba uma proposta personalizada.</p>
        <Link href="/contato" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Falar com especialista
        </Link>
      </div>
    </PageLayout>
  )
}
