'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { PageLayout } from '@/components/page-layout'
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle, Building2, Users, GraduationCap } from 'lucide-react'

const contactTypes = [
  { id: 'geral', label: 'Informações Gerais', icon: MessageSquare },
  { id: 'vendas', label: 'Vendas / Demonstração', icon: Building2 },
  { id: 'suporte', label: 'Suporte Técnico', icon: Users },
  { id: 'parcerias', label: 'Parcerias', icon: GraduationCap },
]

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    tipo: 'geral',
    mensagem: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8
      })
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <PageLayout>
        <section className="py-32 bg-gradient-to-br from-[#fff48d]/20 via-white to-[#7af7f7]/20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Mensagem Enviada!</h1>
              <p className="text-gray-600 mb-8">
                Recebemos sua mensagem e retornaremos em até 24 horas úteis.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                Voltar ao Início
              </Link>
            </div>
          </div>
        </section>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef} className="py-16 md:py-24 bg-gradient-to-br from-[#fff48d]/20 via-white to-[#fd74fd]/10">
        <div className="container mx-auto px-4">
          <div className="hero-content max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fale
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]"> Conosco</span>
            </h1>
            <p className="text-xl text-gray-600">
              Estamos prontos para ajudar. Escolha o canal que preferir.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#fd74fd]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#fd74fd]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">E-mail</p>
                      <a href="mailto:contato@neuroconecta.com.br" className="text-gray-600 hover:text-[#fd74fd]">
                        contato@neuroconecta.com.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#7af7f7]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-[#7af7f7]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Telefone</p>
                      <a href="tel:+5511999999999" className="text-gray-600 hover:text-[#7af7f7]">
                        (11) 99999-9999
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#fff48d]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Endereço</p>
                      <p className="text-gray-600">
                        São Paulo - SP<br />
                        Brasil
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Horário</p>
                      <p className="text-gray-600">
                        Segunda a Sexta<br />
                        9h às 18h
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#fd74fd]/10 to-[#7af7f7]/10 rounded-2xl">
                <h3 className="font-semibold text-gray-900 mb-2">Suporte Premium</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Clientes com plano Enterprise têm acesso a suporte prioritário 24/7.
                </p>
                <Link href="/recursos/central-ajuda" className="text-[#fd74fd] font-medium text-sm hover:underline">
                  Acessar Central de Ajuda
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Tipo de contato */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Tipo de Contato</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {contactTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, tipo: type.id })}
                          className={`p-3 rounded-xl border-2 transition-all text-center ${
                            formData.tipo === type.id
                              ? 'border-[#fd74fd] bg-[#fd74fd]/10'
                              : 'border-gray-200 hover:border-[#7af7f7]'
                          }`}
                        >
                          <type.icon className={`w-5 h-5 mx-auto mb-1 ${formData.tipo === type.id ? 'text-[#fd74fd]' : 'text-gray-400'}`} />
                          <span className={`text-xs font-medium ${formData.tipo === type.id ? 'text-[#fd74fd]' : 'text-gray-600'}`}>
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#fd74fd] focus:ring-2 focus:ring-[#fd74fd]/20 outline-none transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#fd74fd] focus:ring-2 focus:ring-[#fd74fd]/20 outline-none transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                      <input
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#fd74fd] focus:ring-2 focus:ring-[#fd74fd]/20 outline-none transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Empresa/Instituição</label>
                      <input
                        type="text"
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#fd74fd] focus:ring-2 focus:ring-[#fd74fd]/20 outline-none transition-all"
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#fd74fd] focus:ring-2 focus:ring-[#fd74fd]/20 outline-none transition-all resize-none"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#fd74fd]/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
