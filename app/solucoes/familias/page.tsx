'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Heart, 
  Calendar, 
  MessageSquare, 
  BookOpen,
  Bell,
  Camera,
  LineChart,
  Users,
  CheckCircle2,
  Smartphone
} from 'lucide-react'

const features = [
  {
    icon: Calendar,
    title: 'Rotinas Visuais',
    description: 'Crie rotinas personalizadas com pictogramas ARASAAC. Ajude na previsibilidade e organização do dia.'
  },
  {
    icon: BookOpen,
    title: 'Diário de Eventos',
    description: 'Registre comportamentos, crises, conquistas e padrões. Compartilhe com a equipe de forma segura.'
  },
  {
    icon: MessageSquare,
    title: 'Chat Seguro',
    description: 'Comunique-se diretamente com professores, terapeutas e médicos em um ambiente protegido.'
  },
  {
    icon: Bell,
    title: 'Lembretes Inteligentes',
    description: 'Receba notificações de medicamentos, terapias, consultas e atividades importantes.'
  },
  {
    icon: Camera,
    title: 'Registro Multimídia',
    description: 'Anexe fotos e vídeos aos registros. Documente progressos e momentos importantes.'
  },
  {
    icon: LineChart,
    title: 'Evolução Visual',
    description: 'Acompanhe gráficos de progresso e relatórios de evolução ao longo do tempo.'
  }
]

const appFeatures = [
  'Disponível para iOS e Android',
  'Funciona offline',
  'Notificações push',
  'Interface intuitiva',
  'Acessibilidade total',
  'Suporte em português'
]

export default function FamiliasPage() {
  return (
    <PageLayout 
      title="Para Famílias" 
      subtitle="Aplicativo para famílias acompanharem o desenvolvimento de seus filhos"
      backHref="/"
    >
      {/* Hero CTA */}
      <div className="bg-gradient-to-r from-[#fd74fd]/20 via-[#fff48d]/20 to-[#7af7f7]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Você não está sozinho nessa jornada</h2>
            <p className="text-gray-600">Conecte-se com a rede de apoio do seu filho e acompanhe cada conquista.</p>
          </div>
          <Link
            href="/demo"
            className="px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#fff48d] text-gray-900 rounded-full font-medium hover:shadow-lg transition-all whitespace-nowrap"
          >
            Baixar aplicativo
          </Link>
        </div>
      </div>

      {/* App Preview */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-6 h-6 text-[#fd74fd]" />
              <span className="font-bold text-gray-900">App NeuroConecta</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Tudo na palma da sua mão</h3>
            <div className="grid grid-cols-2 gap-3">
              {appFeatures.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Link href="/demo" className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                App Store
              </Link>
              <Link href="/demo" className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                Google Play
              </Link>
            </div>
          </div>
          <div className="w-48 h-96 bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <Smartphone className="w-16 h-16 text-[#fd74fd] mx-auto mb-2" />
              <span className="text-sm text-gray-500">Preview do App</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">O que você pode fazer</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd]/20 to-[#fff48d]/20 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-[#fd74fd]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          )
        })}
      </div>

      {/* Testimonial */}
      <div className="bg-gradient-to-br from-[#fd74fd]/10 to-[#fff48d]/10 rounded-2xl p-8 mb-12">
        <blockquote className="text-lg text-gray-700 italic mb-4">
          &quot;Finalmente consigo me comunicar com a escola e os terapeutas do meu filho de forma organizada. 
          O diário de eventos me ajudou a identificar padrões que nem percebia.&quot;
        </blockquote>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fd74fd] flex items-center justify-center text-white font-bold">
            AS
          </div>
          <div>
            <div className="font-medium text-gray-900">Ana Silva</div>
            <div className="text-sm text-gray-500">Mãe do Pedro, 7 anos - TEA</div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Planos para Famílias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Gratuito</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">R$ 0</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Rotinas visuais básicas
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Diário de eventos
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Chat com equipe
              </li>
            </ul>
            <Link href="/demo" className="block text-center py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              Começar grátis
            </Link>
          </div>
          <div className="rounded-xl p-6 border-2 border-[#fd74fd] bg-gradient-to-br from-[#fd74fd]/5 to-[#fff48d]/5">
            <span className="inline-block px-3 py-1 bg-[#fd74fd] text-white text-xs font-medium rounded-full mb-2">
              Recomendado
            </span>
            <h3 className="text-xl font-bold text-gray-900">Premium</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">R$ 29</span>
              <span className="text-gray-500 text-sm">/mês</span>
            </div>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Tudo do gratuito
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Rotinas ilimitadas
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Relatórios de evolução
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Suporte prioritário
              </li>
            </ul>
            <Link href="/demo" className="block text-center py-2 rounded-lg bg-gradient-to-r from-[#fd74fd] to-[#fff48d] text-gray-900 font-medium">
              Assinar agora
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Comece hoje mesmo</h2>
        <p className="text-gray-400 mb-6">Baixe o app e conecte-se com a rede de apoio do seu filho.</p>
        <Link href="/demo" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Baixar gratuitamente
        </Link>
      </div>
    </PageLayout>
  )
}
