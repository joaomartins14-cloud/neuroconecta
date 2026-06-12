'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Smartphone, 
  Bell, 
  Wifi,
  Camera,
  Shield,
  Zap,
  CheckCircle2,
  Apple,
  Play
} from 'lucide-react'

const features = [
  {
    icon: Bell,
    title: 'Notificações Inteligentes',
    description: 'Alertas personalizados para medicamentos, terapias, consultas e atividades.'
  },
  {
    icon: Wifi,
    title: 'Funciona Offline',
    description: 'Registre informações mesmo sem internet. Sincroniza automaticamente quando conectar.'
  },
  {
    icon: Camera,
    title: 'Registros Multimídia',
    description: 'Capture fotos e vídeos para documentar progressos e comportamentos.'
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Dados criptografados, autenticação biométrica e conformidade com LGPD.'
  },
  {
    icon: Zap,
    title: 'Interface Intuitiva',
    description: 'Design pensado para facilidade de uso, mesmo para quem não é familiarizado com tecnologia.'
  }
]

const screens = [
  { name: 'Home', desc: 'Visão geral do dia' },
  { name: 'Rotinas', desc: 'Rotinas visuais interativas' },
  { name: 'Diário', desc: 'Registro de eventos' },
  { name: 'Chat', desc: 'Mensagens seguras' },
  { name: 'Perfil', desc: 'Configurações e dados' }
]

export default function AppMobilePage() {
  return (
    <PageLayout 
      title="App Mobile" 
      subtitle="Aplicativo para iOS e Android para famílias e profissionais"
      backHref="/"
    >
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#fd74fd]/20 via-[#7af7f7]/20 to-[#fff48d]/20 rounded-2xl p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">NeuroConecta na palma da sua mão</h2>
            <p className="text-gray-600 mb-6">
              Aplicativo completo para famílias acompanharem o desenvolvimento, 
              registrarem eventos e se comunicarem com a equipe de apoio.
            </p>
            <div className="flex gap-3">
              <Link href="/demo" className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                <Apple className="w-5 h-5" />
                App Store
              </Link>
              <Link href="/demo" className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                <Play className="w-5 h-5" />
                Google Play
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="w-48 h-96 bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] rounded-[2.5rem] flex items-center justify-center">
                <Smartphone className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screens */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Telas do Aplicativo</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {screens.map((screen, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:shadow-lg transition-shadow">
            <div className="w-full aspect-[9/16] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="font-bold text-gray-900 text-sm">{screen.name}</h3>
            <p className="text-gray-500 text-xs">{screen.desc}</p>
          </div>
        ))}
      </div>

      {/* Features */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Funcionalidades</h2>
      <div className="space-y-4 mb-12">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-[#fd74fd]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Requisitos do Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Apple className="w-5 h-5" /> iOS
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                iOS 14.0 ou superior
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                iPhone 8 ou mais recente
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                100 MB de espaço livre
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Play className="w-5 h-5" /> Android
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Android 8.0 ou superior
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                4GB RAM recomendado
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                100 MB de espaço livre
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Baixe agora gratuitamente</h2>
        <p className="text-gray-400 mb-6">Comece a usar o app NeuroConecta hoje mesmo.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/demo" className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
            <Apple className="w-5 h-5" />
            App Store
          </Link>
          <Link href="/demo" className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
            <Play className="w-5 h-5" />
            Google Play
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
