'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { 
  Search, 
  Book, 
  MessageCircle, 
  Video,
  FileText,
  ChevronRight,
  Mail,
  Phone,
  Clock
} from 'lucide-react'

const categories = [
  { name: 'Primeiros Passos', icon: Book, count: 12 },
  { name: 'Conta e Perfil', icon: FileText, count: 8 },
  { name: 'Rotinas Visuais', icon: Video, count: 15 },
  { name: 'Perfil Sensorial', icon: Book, count: 10 },
  { name: 'Comunicação', icon: MessageCircle, count: 7 },
  { name: 'Relatórios', icon: FileText, count: 9 }
]

const popularArticles = [
  { title: 'Como criar minha primeira rotina visual', category: 'Rotinas Visuais' },
  { title: 'Entendendo o perfil sensorial do meu filho', category: 'Perfil Sensorial' },
  { title: 'Como me comunicar com a escola pelo app', category: 'Comunicação' },
  { title: 'Configurando notificações de medicamentos', category: 'Primeiros Passos' },
  { title: 'Exportando relatórios para o médico', category: 'Relatórios' },
  { title: 'Adicionando membros da equipe', category: 'Conta e Perfil' }
]

export default function CentralAjudaPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <PageLayout 
      title="Central de Ajuda" 
      subtitle="Encontre respostas para suas dúvidas"
      backHref="/"
    >
      {/* Search */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar artigos de ajuda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fd74fd]/50 focus:border-[#fd74fd] transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorias</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <Link
              key={index}
              href={`/recursos/central-ajuda/${category.name.toLowerCase().replace(/ /g, '-')}`}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-[#fd74fd]/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#fd74fd]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-[#fd74fd] transition-colors">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} artigos</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#fd74fd] transition-colors" />
              </div>
            </Link>
          )
        })}
      </div>

      {/* Popular Articles */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Artigos Populares</h2>
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100 mb-12">
        {popularArticles.map((article, index) => (
          <Link
            key={index}
            href="/recursos/central-ajuda/artigo"
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
          >
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-[#fd74fd] transition-colors">{article.title}</h3>
              <p className="text-sm text-gray-500">{article.category}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#fd74fd] transition-colors" />
          </Link>
        ))}
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-br from-[#fd74fd]/10 to-[#7af7f7]/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Não encontrou o que procurava?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#fd74fd]/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-[#fd74fd]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Email</h3>
            <p className="text-sm text-gray-600 mb-3">Resposta em até 24h</p>
            <Link href="/contato" className="text-[#fd74fd] font-medium hover:underline">
              suporte@neuroconecta.com.br
            </Link>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#7af7f7]/20 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-[#7af7f7]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Chat</h3>
            <p className="text-sm text-gray-600 mb-3">Online agora</p>
            <button className="text-[#7af7f7] font-medium hover:underline">
              Iniciar conversa
            </button>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-[#fff48d]/20 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-[#e6dc7e]" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Telefone</h3>
            <p className="text-sm text-gray-600 mb-3">Seg-Sex, 9h-18h</p>
            <span className="text-gray-700 font-medium">(11) 4000-0000</span>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
