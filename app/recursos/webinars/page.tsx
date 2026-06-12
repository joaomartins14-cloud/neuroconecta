'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { Calendar, Clock, Users, Play, Bell, CheckCircle2 } from 'lucide-react'

const upcomingWebinars = [
  {
    title: 'Introdução ao Perfil Sensorial Digital',
    description: 'Aprenda como usar o módulo de perfil sensorial do NeuroConecta para avaliações mais precisas.',
    date: '15 Jun 2024',
    time: '19:00',
    duration: '1h30',
    speaker: 'Dra. Maria Santos',
    spots: 45,
    category: 'Treinamento'
  },
  {
    title: 'Criando Rotinas Visuais Efetivas',
    description: 'Workshop prático sobre como criar e personalizar rotinas visuais que funcionam.',
    date: '22 Jun 2024',
    time: '10:00',
    duration: '2h',
    speaker: 'Dr. Carlos Oliveira',
    spots: 30,
    category: 'Workshop'
  },
  {
    title: 'Comunicação entre Equipe Multidisciplinar',
    description: 'Melhores práticas para comunicação efetiva entre profissionais de saúde e educação.',
    date: '29 Jun 2024',
    time: '14:00',
    duration: '1h',
    speaker: 'Prof. Ana Lima',
    spots: 60,
    category: 'Palestra'
  }
]

const pastWebinars = [
  {
    title: 'Novidades da Plataforma 2024',
    date: '01 Mai 2024',
    views: 1250,
    duration: '45min'
  },
  {
    title: 'LGPD na Saúde: Como se adequar',
    date: '15 Abr 2024',
    views: 890,
    duration: '1h15'
  },
  {
    title: 'Casos de Sucesso: APAEs',
    date: '01 Abr 2024',
    views: 670,
    duration: '1h'
  },
  {
    title: 'Integração Escola-Clínica',
    date: '15 Mar 2024',
    views: 1100,
    duration: '1h30'
  }
]

export default function WebinarsPage() {
  return (
    <PageLayout 
      title="Webinars" 
      subtitle="Eventos online gratuitos sobre neurodesenvolvimento"
      backHref="/"
    >
      {/* Upcoming */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Próximos Eventos</h2>
      <div className="space-y-4 mb-12">
        {upcomingWebinars.map((webinar, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="md:w-32 flex-shrink-0">
                <div className="bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-[#fd74fd]">{webinar.date.split(' ')[0]}</div>
                  <div className="text-sm text-gray-600">{webinar.date.split(' ')[1]} {webinar.date.split(' ')[2]}</div>
                  <div className="text-xs text-gray-500 mt-1">{webinar.time}</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#fd74fd]/10 text-[#fd74fd] rounded-full text-xs font-medium">
                    {webinar.category}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {webinar.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{webinar.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{webinar.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {webinar.speaker}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bell className="w-4 h-4" />
                    {webinar.spots} vagas
                  </span>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-xl font-medium hover:shadow-lg transition-all whitespace-nowrap">
                Inscrever-se
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past Webinars */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gravações Disponíveis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {pastWebinars.map((webinar, index) => (
          <Link
            key={index}
            href="/recursos/webinars/assistir"
            className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group"
          >
            <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <span className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded">
                {webinar.duration}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900 group-hover:text-[#fd74fd] transition-colors">
                {webinar.title}
              </h3>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                <span>{webinar.date}</span>
                <span>{webinar.views.toLocaleString()} visualizações</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Subscribe */}
      <div className="bg-gradient-to-br from-[#fd74fd]/10 to-[#7af7f7]/10 rounded-2xl p-8 text-center">
        <Bell className="w-12 h-12 text-[#fd74fd] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Não perca nenhum evento</h2>
        <p className="text-gray-600 mb-6">Receba notificações sobre novos webinars e eventos.</p>
        <button className="px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-xl font-medium hover:shadow-lg transition-all">
          Ativar notificações
        </button>
      </div>
    </PageLayout>
  )
}
