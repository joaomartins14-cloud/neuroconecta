'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Calendar, 
  Image as ImageIcon, 
  Clock, 
  Bell,
  Sparkles,
  Download,
  Palette,
  Share2,
  CheckCircle2
} from 'lucide-react'

const features = [
  {
    icon: ImageIcon,
    title: 'Pictogramas ARASAAC',
    description: 'Biblioteca com mais de 40.000 pictogramas do ARASAAC integrados gratuitamente.'
  },
  {
    icon: Palette,
    title: 'Personalização Total',
    description: 'Escolha cores, tamanhos e estilos. Use fotos próprias ou pictogramas.'
  },
  {
    icon: Clock,
    title: 'Rotinas por Horário',
    description: 'Configure atividades com horários específicos e lembretes automáticos.'
  },
  {
    icon: Bell,
    title: 'Notificações',
    description: 'Alertas visuais e sonoros para transição entre atividades.'
  },
  {
    icon: Share2,
    title: 'Compartilhamento',
    description: 'Compartilhe rotinas entre família, escola e terapeutas.'
  },
  {
    icon: Download,
    title: 'Impressão',
    description: 'Exporte rotinas para impressão em diferentes formatos.'
  }
]

const templates = [
  'Rotina matinal',
  'Rotina escolar',
  'Rotina de alimentação',
  'Rotina de higiene',
  'Rotina noturna',
  'Rotina de fim de semana'
]

export default function RotinasVisuaisPage() {
  return (
    <PageLayout 
      title="Rotinas Visuais" 
      subtitle="Crie rotinas personalizadas com pictogramas para auxiliar na organização e previsibilidade"
      backHref="/"
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#7af7f7]/20 via-[#fff48d]/20 to-[#fd74fd]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Previsibilidade que transforma rotinas</h2>
            <p className="text-gray-600 mb-6">
              Pessoas neurodivergentes frequentemente se beneficiam de rotinas visuais claras. 
              O NeuroConecta facilita a criação e o compartilhamento de rotinas personalizadas.
            </p>
            <Link
              href="/demo"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              Criar rotina agora
            </Link>
          </div>
          <div className="flex gap-2">
            {['bg-[#fd74fd]', 'bg-[#7af7f7]', 'bg-[#fff48d]'].map((color, i) => (
              <div key={i} className={`w-20 h-24 ${color} rounded-xl flex items-center justify-center shadow-lg`}>
                <Calendar className="w-10 h-10 text-white" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Funcionalidades</h2>
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

      {/* Templates */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Templates Prontos</h2>
        <p className="text-gray-600 mb-6">Comece rapidamente com nossos modelos pré-configurados:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((template, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <Sparkles className="w-5 h-5 text-[#7af7f7]" />
              <span className="text-gray-700 font-medium">{template}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ARASAAC */}
      <div className="bg-gradient-to-br from-[#7af7f7]/10 to-[#fff48d]/10 rounded-2xl p-8 mb-12">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <ImageIcon className="w-8 h-8 text-[#7af7f7]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Integração com ARASAAC</h3>
            <p className="text-gray-600 mb-4">
              O Centro Aragonês de Comunicação Aumentativa e Alternativa (ARASAAC) oferece milhares de 
              pictogramas gratuitos que estão integrados diretamente na plataforma. Basta pesquisar 
              e adicionar às suas rotinas.
            </p>
            <Link href="/recursos/pictogramas" className="text-[#7af7f7] font-medium hover:underline">
              Explorar pictogramas
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Comece a criar rotinas visuais</h2>
        <p className="text-gray-400 mb-6">Experimente gratuitamente e veja a diferença na organização diária.</p>
        <Link href="/demo" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Acessar demonstração
        </Link>
      </div>
    </PageLayout>
  )
}
