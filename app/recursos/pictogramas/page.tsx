'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/page-layout'
import { Search, Download, Grid, Heart, Star, ExternalLink } from 'lucide-react'

const categories = [
  'Todos', 'Ações', 'Alimentação', 'Animais', 'Brinquedos', 'Corpo', 
  'Emoções', 'Escola', 'Higiene', 'Lugares', 'Pessoas', 'Rotinas'
]

const pictograms = [
  { name: 'Escovar dentes', category: 'Higiene', id: 1 },
  { name: 'Tomar banho', category: 'Higiene', id: 2 },
  { name: 'Café da manhã', category: 'Alimentação', id: 3 },
  { name: 'Almoço', category: 'Alimentação', id: 4 },
  { name: 'Escola', category: 'Lugares', id: 5 },
  { name: 'Casa', category: 'Lugares', id: 6 },
  { name: 'Feliz', category: 'Emoções', id: 7 },
  { name: 'Triste', category: 'Emoções', id: 8 },
  { name: 'Brincar', category: 'Ações', id: 9 },
  { name: 'Dormir', category: 'Ações', id: 10 },
  { name: 'Mãe', category: 'Pessoas', id: 11 },
  { name: 'Pai', category: 'Pessoas', id: 12 },
  { name: 'Cachorro', category: 'Animais', id: 13 },
  { name: 'Gato', category: 'Animais', id: 14 },
  { name: 'Bola', category: 'Brinquedos', id: 15 },
  { name: 'Boneca', category: 'Brinquedos', id: 16 }
]

export default function PictogramasPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const filteredPictograms = pictograms.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <PageLayout 
      title="Pictogramas ARASAAC" 
      subtitle="Biblioteca de pictogramas integrada para comunicação aumentativa"
      backHref="/"
    >
      {/* Info */}
      <div className="bg-gradient-to-r from-[#7af7f7]/20 via-[#fff48d]/20 to-[#fd74fd]/20 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
            <Grid className="w-6 h-6 text-[#7af7f7]" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-1">Sobre o ARASAAC</h3>
            <p className="text-gray-600 text-sm mb-2">
              O ARASAAC (Centro Aragonês de Comunicação Aumentativa e Alternativa) oferece milhares de 
              pictogramas gratuitos para comunicação aumentativa. Todos os pictogramas estão integrados 
              diretamente na plataforma NeuroConecta.
            </p>
            <a 
              href="https://arasaac.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#7af7f7] font-medium text-sm hover:underline inline-flex items-center gap-1"
            >
              Visitar ARASAAC <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pictogramas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7af7f7]/50 focus:border-[#7af7f7] transition-all"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Pictograms Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
        {filteredPictograms.map((pictogram) => (
          <div 
            key={pictogram.id}
            className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-lg transition-all group"
          >
            <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center relative">
              <div className="w-16 h-16 bg-gradient-to-br from-[#7af7f7]/30 to-[#fd74fd]/30 rounded-lg" />
              <button 
                onClick={() => toggleFavorite(pictogram.id)}
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className={`w-4 h-4 ${favorites.includes(pictogram.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>
            <h3 className="font-medium text-gray-900 text-sm text-center">{pictogram.name}</h3>
            <p className="text-xs text-gray-500 text-center">{pictogram.category}</p>
            <button className="w-full mt-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors flex items-center justify-center gap-1">
              <Download className="w-3 h-3" />
              Baixar
            </button>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-[#7af7f7]">40.000+</div>
          <div className="text-sm text-gray-600">Pictogramas</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-[#fd74fd]">30+</div>
          <div className="text-sm text-gray-600">Idiomas</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-[#fff48d]">100%</div>
          <div className="text-sm text-gray-600">Gratuito</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 text-center">
          <div className="text-3xl font-bold text-[#a78bfa]">CC BY-NC-SA</div>
          <div className="text-sm text-gray-600">Licença</div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-900 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Use na plataforma NeuroConecta</h2>
        <p className="text-gray-400 mb-6">Crie rotinas visuais com pictogramas diretamente no nosso editor.</p>
        <a href="/demo" className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
          Criar rotina visual
        </a>
      </div>
    </PageLayout>
  )
}
