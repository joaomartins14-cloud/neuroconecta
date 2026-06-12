'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'

const posts = [
  {
    title: 'Como identificar sinais de sobrecarga sensorial em crianças',
    excerpt: 'Aprenda a reconhecer os principais sinais de que uma criança está experimentando sobrecarga sensorial e como ajudá-la.',
    category: 'Perfil Sensorial',
    author: 'Dra. Maria Santos',
    date: '28 Mai 2024',
    readTime: '5 min',
    featured: true
  },
  {
    title: 'A importância das rotinas visuais no TEA',
    excerpt: 'Descubra como rotinas visuais podem melhorar a previsibilidade e reduzir a ansiedade em pessoas com TEA.',
    category: 'Rotinas',
    author: 'Dr. Carlos Oliveira',
    date: '25 Mai 2024',
    readTime: '7 min',
    featured: true
  },
  {
    title: 'Comunicação entre escola e família: melhores práticas',
    excerpt: 'Estratégias para estabelecer uma comunicação efetiva entre educadores e famílias de crianças neurodivergentes.',
    category: 'Educação',
    author: 'Prof. Ana Lima',
    date: '22 Mai 2024',
    readTime: '6 min',
    featured: false
  },
  {
    title: 'Tecnologia assistiva no neurodesenvolvimento',
    excerpt: 'Como ferramentas digitais podem auxiliar no desenvolvimento de habilidades e comunicação.',
    category: 'Tecnologia',
    author: 'João Ferreira',
    date: '18 Mai 2024',
    readTime: '8 min',
    featured: false
  },
  {
    title: 'Direitos das pessoas com deficiência: o que você precisa saber',
    excerpt: 'Um guia completo sobre os direitos garantidos por lei para pessoas neurodivergentes no Brasil.',
    category: 'Legislação',
    author: 'Dra. Paula Costa',
    date: '15 Mai 2024',
    readTime: '10 min',
    featured: false
  },
  {
    title: 'Inclusão escolar: desafios e soluções práticas',
    excerpt: 'Experiências e estratégias de escolas que implementaram práticas inclusivas com sucesso.',
    category: 'Educação',
    author: 'Prof. Ricardo Silva',
    date: '12 Mai 2024',
    readTime: '7 min',
    featured: false
  }
]

const categories = ['Todos', 'Perfil Sensorial', 'Rotinas', 'Educação', 'Tecnologia', 'Legislação', 'Família']

export default function BlogPage() {
  return (
    <PageLayout 
      title="Blog" 
      subtitle="Artigos, dicas e novidades sobre neurodesenvolvimento"
      backHref="/"
    >
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              i === 0 
                ? 'bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {posts.filter(p => p.featured).map((post, index) => (
          <Link
            key={index}
            href="/recursos/blog/artigo"
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all group"
          >
            <div className="h-48 bg-gradient-to-br from-[#fd74fd]/30 to-[#7af7f7]/30" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-[#fd74fd]/10 text-[#fd74fd] rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#fd74fd] transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#fd74fd] transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* All Posts */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Todos os artigos</h2>
      <div className="space-y-4 mb-12">
        {posts.filter(p => !p.featured).map((post, index) => (
          <Link
            key={index}
            href="/recursos/blog/artigo"
            className="flex gap-6 bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group"
          >
            <div className="w-32 h-24 rounded-lg bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-xs text-gray-500">{post.readTime}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#fd74fd] transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                <User className="w-3 h-3" />
                {post.author}
                <span>•</span>
                <Calendar className="w-3 h-3" />
                {post.date}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-[#fd74fd]/10 to-[#7af7f7]/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Receba novidades</h2>
        <p className="text-gray-600 mb-6">Assine nossa newsletter e receba artigos semanais sobre neurodesenvolvimento.</p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="seu@email.com"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#fd74fd]/50"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-xl font-medium hover:shadow-lg transition-all">
            Assinar
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
