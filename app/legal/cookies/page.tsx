'use client'

import { useState } from 'react'
import { PageLayout } from '@/components/page-layout'
import { Cookie, Settings, BarChart3, Shield, Check, X } from 'lucide-react'

const cookieTypes = [
  {
    id: 'necessary',
    name: 'Cookies Necessários',
    description: 'Essenciais para o funcionamento básico do site. Não podem ser desativados.',
    icon: Shield,
    required: true,
    examples: ['Autenticação', 'Segurança', 'Preferências de sessão']
  },
  {
    id: 'functional',
    name: 'Cookies Funcionais',
    description: 'Permitem funcionalidades avançadas e personalização.',
    icon: Settings,
    required: false,
    examples: ['Preferências de idioma', 'Tema (claro/escuro)', 'Dados de formulário']
  },
  {
    id: 'analytics',
    name: 'Cookies Analíticos',
    description: 'Nos ajudam a entender como você usa a plataforma para melhorá-la.',
    icon: BarChart3,
    required: false,
    examples: ['Google Analytics', 'Métricas de uso', 'Relatórios de desempenho']
  },
]

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
  })

  const handleSave = () => {
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences))
    alert('Preferências de cookies salvas com sucesso!')
  }

  return (
    <PageLayout>
      <article className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#fff48d] to-[#fd74fd] rounded-2xl flex items-center justify-center">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Cookies</h1>
              <p className="text-xl text-gray-600">
                Saiba como utilizamos cookies e gerencie suas preferências
              </p>
            </div>

            {/* O que são cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">O que são Cookies?</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você 
                visita nosso site. Eles nos ajudam a proporcionar uma experiência melhor, lembrando 
                suas preferências e entendendo como você utiliza a plataforma.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Utilizamos cookies próprios e de terceiros para diferentes finalidades, sempre 
                respeitando sua privacidade e em conformidade com a LGPD.
              </p>
            </section>

            {/* Tipos de Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tipos de Cookies</h2>
              <div className="space-y-6">
                {cookieTypes.map((cookie) => (
                  <div key={cookie.id} className="p-6 border border-gray-100 rounded-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          cookie.id === 'necessary' ? 'bg-[#fd74fd]/10' :
                          cookie.id === 'functional' ? 'bg-[#7af7f7]/10' :
                          'bg-[#fff48d]/30'
                        }`}>
                          <cookie.icon className={`w-6 h-6 ${
                            cookie.id === 'necessary' ? 'text-[#fd74fd]' :
                            cookie.id === 'functional' ? 'text-[#7af7f7]' :
                            'text-yellow-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{cookie.name}</h3>
                            {cookie.required && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                Obrigatório
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 mb-3">{cookie.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {cookie.examples.map((example) => (
                              <span key={example} className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full">
                                {example}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => !cookie.required && setPreferences({
                          ...preferences,
                          [cookie.id]: !preferences[cookie.id as keyof typeof preferences]
                        })}
                        disabled={cookie.required}
                        className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${
                          preferences[cookie.id as keyof typeof preferences]
                            ? 'bg-[#fd74fd] justify-end'
                            : 'bg-gray-200 justify-start'
                        } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="w-6 h-6 bg-white rounded-full shadow flex items-center justify-center">
                          {preferences[cookie.id as keyof typeof preferences] ? (
                            <Check className="w-3 h-3 text-[#fd74fd]" />
                          ) : (
                            <X className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gerenciar */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gerenciar Cookies</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Você pode gerenciar suas preferências de cookies a qualquer momento. Além das opções 
                acima, você também pode configurar seu navegador para bloquear ou alertar sobre cookies.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-medium rounded-xl hover:shadow-lg transition-all"
                >
                  Salvar Preferências
                </button>
                <button
                  onClick={() => setPreferences({ necessary: true, functional: true, analytics: true })}
                  className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-[#7af7f7] transition-all"
                >
                  Aceitar Todos
                </button>
                <button
                  onClick={() => setPreferences({ necessary: true, functional: false, analytics: false })}
                  className="px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:border-[#7af7f7] transition-all"
                >
                  Apenas Necessários
                </button>
              </div>
            </section>

            {/* Mais Informações */}
            <section className="p-6 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Mais Informações</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Para saber mais sobre como tratamos seus dados pessoais, consulte nossa{' '}
                <a href="/legal/privacidade" className="text-[#fd74fd] hover:underline">Política de Privacidade</a>
                {' '}e{' '}
                <a href="/legal/lgpd" className="text-[#fd74fd] hover:underline">Conformidade LGPD</a>.
                Para dúvidas, entre em contato com nosso DPO em privacidade@neuroconecta.com.br.
              </p>
            </section>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}
