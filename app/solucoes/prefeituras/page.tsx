'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Building2, 
  BarChart3, 
  Users, 
  Clock,
  Map,
  FileBarChart,
  Shield,
  Zap,
  CheckCircle2
} from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Dashboard de BI',
    description: 'Visualização em tempo real de indicadores epidemiológicos, demográficos e de atendimento.'
  },
  {
    icon: Map,
    title: 'Mapeamento Territorial',
    description: 'Geolocalização de casos, identificação de demandas por região e planejamento de recursos.'
  },
  {
    icon: Clock,
    title: 'Gestão de Filas',
    description: 'Controle de tempo de espera, priorização de casos e redução de filas de atendimento.'
  },
  {
    icon: Users,
    title: 'Rede de Atendimento',
    description: 'Integração entre UBS, CAPS, escolas e serviços especializados em uma única plataforma.'
  },
  {
    icon: FileBarChart,
    title: 'Relatórios Gerenciais',
    description: 'Exportação de dados para prestação de contas e tomada de decisão baseada em evidências.'
  },
  {
    icon: Shield,
    title: 'Conformidade Legal',
    description: 'Atendimento às exigências da LGPD, políticas de saúde e educação inclusiva.'
  }
]

const stats = [
  { value: '40%', label: 'Redução no tempo de diagnóstico' },
  { value: '60%', label: 'Mais eficiência na gestão de filas' },
  { value: '85%', label: 'Satisfação dos gestores' },
  { value: '100%', label: 'Conformidade com LGPD' }
]

export default function PrefeituraPage() {
  return (
    <PageLayout 
      title="Para Prefeituras" 
      subtitle="Solução de gestão pública para secretarias de saúde e educação"
      backHref="/"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 text-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Hero CTA */}
      <div className="bg-gradient-to-r from-[#a78bfa]/20 via-[#fd74fd]/20 to-[#7af7f7]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestão baseada em dados para políticas públicas eficientes</h2>
            <p className="text-gray-600">Atenda às metas do ODS 3 (Saúde) e ODS 4 (Educação) da ONU.</p>
          </div>
          <Link
            href="/demo"
            className="px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full font-medium hover:shadow-lg transition-all whitespace-nowrap"
          >
            Agendar apresentação
          </Link>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Funcionalidades para Gestão Pública</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a78bfa]/20 to-[#7af7f7]/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#a78bfa]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Integration */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Integração com a Rede</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['UBS', 'CAPS', 'Escolas', 'CRAS', 'Hospitais', 'APAEs', 'Clínicas', 'Universidades'].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Transforme a gestão de neurodesenvolvimento do seu município</h2>
        <p className="text-gray-400 mb-6">Solicite uma apresentação para sua secretaria.</p>
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
