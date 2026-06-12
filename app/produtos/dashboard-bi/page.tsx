'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Map,
  Users,
  Calendar,
  Download,
  Filter,
  CheckCircle2
} from 'lucide-react'

const dashboards = [
  {
    icon: Users,
    title: 'Perfil Populacional',
    description: 'Distribuição de diagnósticos, faixas etárias, gênero e localização geográfica.'
  },
  {
    icon: TrendingUp,
    title: 'Indicadores de Atendimento',
    description: 'Tempo médio de espera, taxa de comparecimento, evolução de casos.'
  },
  {
    icon: Map,
    title: 'Mapa de Calor',
    description: 'Visualização geográfica de demandas e recursos disponíveis por região.'
  },
  {
    icon: Calendar,
    title: 'Linha do Tempo',
    description: 'Evolução temporal de indicadores com comparativos e projeções.'
  },
  {
    icon: PieChart,
    title: 'Distribuição de Recursos',
    description: 'Alocação de profissionais, equipamentos e orçamento por área.'
  },
  {
    icon: Filter,
    title: 'Filtros Avançados',
    description: 'Segmentação por período, região, diagnóstico, idade e outros critérios.'
  }
]

const metrics = [
  'Tempo médio para diagnóstico',
  'Taxa de adesão ao tratamento',
  'Evolução do perfil sensorial',
  'Satisfação das famílias',
  'Eficiência da rede de apoio',
  'Cobertura de atendimento',
  'Indicadores ODS/ONU',
  'Comparativos regionais'
]

export default function DashboardBIPage() {
  return (
    <PageLayout 
      title="Dashboard BI" 
      subtitle="Business Intelligence para gestão baseada em dados"
      backHref="/"
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#a78bfa]/20 via-[#fd74fd]/20 to-[#7af7f7]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Decisões inteligentes baseadas em dados</h2>
            <p className="text-gray-600 mb-6">
              O Dashboard BI do NeuroConecta transforma dados brutos em insights acionáveis para 
              gestores de clínicas, escolas e secretarias de saúde e educação.
            </p>
            <Link
              href="/demo"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#a78bfa] to-[#fd74fd] text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Ver demonstração
            </Link>
          </div>
          <div className="w-64 h-48 bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-[#a78bfa]" />
              <span className="text-sm font-medium text-gray-700">Analytics</span>
            </div>
            <div className="space-y-2">
              {[70, 85, 60, 90].map((width, i) => (
                <div key={i} className="h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#a78bfa] to-[#fd74fd] rounded-full" 
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboards */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Painéis Disponíveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {dashboards.map((dashboard, index) => {
          const Icon = dashboard.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a78bfa]/20 to-[#fd74fd]/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#a78bfa]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{dashboard.title}</h3>
              <p className="text-gray-600 text-sm">{dashboard.description}</p>
            </div>
          )
        })}
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Métricas Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#a78bfa] flex-shrink-0" />
              <span className="text-gray-700">{metric}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="bg-gradient-to-br from-[#a78bfa]/10 to-[#fd74fd]/10 rounded-2xl p-8 mb-12">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Download className="w-6 h-6 text-[#a78bfa]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Exportação de Dados</h3>
            <p className="text-gray-600">
              Exporte relatórios em PDF, Excel ou integre via API com outros sistemas. 
              Ideal para prestação de contas e relatórios gerenciais.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Transforme dados em ação</h2>
        <p className="text-gray-400 mb-6">Veja o poder do Business Intelligence aplicado ao neurodesenvolvimento.</p>
        <Link href="/demo" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Acessar demonstração
        </Link>
      </div>
    </PageLayout>
  )
}
