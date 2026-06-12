'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Brain, 
  Eye, 
  Ear, 
  Hand,
  Zap,
  FileText,
  CheckCircle2,
  BarChart3
} from 'lucide-react'

const sensoryAreas = [
  { icon: Eye, name: 'Visual', description: 'Sensibilidade à luz, cores, movimentos e estímulos visuais' },
  { icon: Ear, name: 'Auditivo', description: 'Reações a sons, barulhos, música e ambientes ruidosos' },
  { icon: Hand, name: 'Tátil', description: 'Resposta ao toque, texturas, temperaturas e pressão' },
  { icon: Zap, name: 'Proprioceptivo', description: 'Consciência corporal, força e coordenação motora' },
  { icon: Brain, name: 'Vestibular', description: 'Equilíbrio, movimento e orientação espacial' }
]

const features = [
  'Escalas validadas cientificamente',
  'Questionários adaptativos',
  'Resultados em tempo real',
  'Gráficos de evolução',
  'Comparativo com população típica',
  'Sugestões de intervenção',
  'Exportação para laudos',
  'Histórico completo'
]

export default function PerfilSensorialPage() {
  return (
    <PageLayout 
      title="Perfil Sensorial" 
      subtitle="Avaliação completa do perfil sensorial com escalas validadas"
      backHref="/"
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#fd74fd]/20 via-[#7af7f7]/20 to-[#fff48d]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Entenda o processamento sensorial de forma completa</h2>
            <p className="text-gray-600 mb-6">
              O módulo de Perfil Sensorial do NeuroConecta permite avaliar como a pessoa processa 
              estímulos sensoriais em diferentes contextos, gerando insights valiosos para intervenções personalizadas.
            </p>
            <Link
              href="/demo"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Ver demonstração
            </Link>
          </div>
          <div className="w-48 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Brain className="w-24 h-24 text-[#fd74fd]" />
          </div>
        </div>
      </div>

      {/* Sensory Areas */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Áreas Avaliadas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {sensoryAreas.map((area, index) => {
          const Icon = area.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-[#fd74fd]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{area.name}</h3>
              <p className="text-gray-600 text-sm">{area.description}</p>
            </div>
          )
        })}
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Funcionalidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#fd74fd] flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Como Funciona</h2>
      <div className="space-y-4 mb-12">
        {[
          { step: '1', title: 'Aplicação do questionário', desc: 'Responsáveis e profissionais respondem questionários validados sobre comportamentos observados.' },
          { step: '2', title: 'Processamento dos dados', desc: 'O sistema processa as respostas e calcula escores para cada domínio sensorial.' },
          { step: '3', title: 'Geração do perfil', desc: 'Um perfil visual é gerado mostrando hipo/hipersensibilidades em cada área.' },
          { step: '4', title: 'Recomendações', desc: 'Sugestões de intervenção são oferecidas com base no perfil identificado.' }
        ].map((item, i) => (
          <div key={i} className="flex gap-4 bg-white rounded-xl p-6 border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] flex items-center justify-center text-white font-bold flex-shrink-0">
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
        <h2 className="text-2xl font-bold text-white mb-4">Experimente o Perfil Sensorial</h2>
        <p className="text-gray-400 mb-6">Veja como funciona na prática com nossa demonstração interativa.</p>
        <Link href="/demo" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Acessar demonstração
        </Link>
      </div>
    </PageLayout>
  )
}
