'use client'

import { PageLayout } from '@/components/page-layout'
import Link from 'next/link'
import { Code, Book, Key, Zap, Shield, Terminal, Copy, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

const endpoints = [
  { method: 'GET', path: '/api/v1/patients', description: 'Lista todos os pacientes' },
  { method: 'GET', path: '/api/v1/patients/:id', description: 'Detalhes de um paciente' },
  { method: 'POST', path: '/api/v1/patients', description: 'Criar novo paciente' },
  { method: 'PUT', path: '/api/v1/patients/:id', description: 'Atualizar paciente' },
  { method: 'GET', path: '/api/v1/sensory-profiles/:id', description: 'Perfil sensorial' },
  { method: 'POST', path: '/api/v1/events', description: 'Registrar evento' },
  { method: 'GET', path: '/api/v1/routines', description: 'Listar rotinas' },
  { method: 'POST', path: '/api/v1/messages', description: 'Enviar mensagem' }
]

const codeExample = `// Exemplo de autenticação
const response = await fetch('https://api.neuroconecta.com.br/v1/patients', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const patients = await response.json();
console.log(patients);`

export default function DocumentacaoAPIPage() {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <PageLayout 
      title="Documentação API" 
      subtitle="Integre seus sistemas com a API NeuroConecta"
      backHref="/"
    >
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Link href="#autenticacao" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
          <Key className="w-8 h-8 text-[#fd74fd] mb-3" />
          <h3 className="font-bold text-gray-900 group-hover:text-[#fd74fd] transition-colors">Autenticação</h3>
          <p className="text-sm text-gray-600">Como obter e usar API keys</p>
        </Link>
        <Link href="#endpoints" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
          <Terminal className="w-8 h-8 text-[#7af7f7] mb-3" />
          <h3 className="font-bold text-gray-900 group-hover:text-[#7af7f7] transition-colors">Endpoints</h3>
          <p className="text-sm text-gray-600">Referência completa da API</p>
        </Link>
        <Link href="#webhooks" className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
          <Zap className="w-8 h-8 text-[#fff48d] mb-3" />
          <h3 className="font-bold text-gray-900 group-hover:text-[#e6dc7e] transition-colors">Webhooks</h3>
          <p className="text-sm text-gray-600">Receba eventos em tempo real</p>
        </Link>
      </div>

      {/* Authentication */}
      <div id="autenticacao" className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Key className="w-6 h-6 text-[#fd74fd]" />
          Autenticação
        </h2>
        <p className="text-gray-600 mb-6">
          A API NeuroConecta usa autenticação via Bearer Token. Você pode gerar suas API keys 
          no painel de configurações da sua conta.
        </p>
        <div className="bg-gray-900 rounded-xl p-4 relative">
          <button 
            onClick={copyCode}
            className="absolute top-4 right-4 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
          </button>
          <pre className="text-sm text-gray-300 overflow-x-auto">
            <code>{codeExample}</code>
          </pre>
        </div>
      </div>

      {/* Endpoints */}
      <div id="endpoints" className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-[#7af7f7]" />
          Endpoints Disponíveis
        </h2>
        <div className="space-y-3">
          {endpoints.map((endpoint, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                endpoint.method === 'GET' ? 'bg-green-100 text-green-700' :
                endpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {endpoint.method}
              </span>
              <code className="text-sm font-mono text-gray-700 flex-1">{endpoint.path}</code>
              <span className="text-sm text-gray-500">{endpoint.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rate Limits */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#a78bfa]" />
          Rate Limits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-gray-900">Plano Essencial</h3>
            <p className="text-2xl font-bold text-[#fd74fd]">1.000</p>
            <p className="text-sm text-gray-500">requisições/hora</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-gray-900">Plano Profissional</h3>
            <p className="text-2xl font-bold text-[#7af7f7]">10.000</p>
            <p className="text-sm text-gray-500">requisições/hora</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-bold text-gray-900">Enterprise</h3>
            <p className="text-2xl font-bold text-[#a78bfa]">Ilimitado</p>
            <p className="text-sm text-gray-500">requisições/hora</p>
          </div>
        </div>
      </div>

      {/* SDKs */}
      <div className="bg-gradient-to-br from-[#fd74fd]/10 to-[#7af7f7]/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">SDKs Disponíveis</h2>
        <p className="text-gray-600 mb-6">Use nossas bibliotecas oficiais para facilitar a integração:</p>
        <div className="flex flex-wrap gap-3">
          {['JavaScript/TypeScript', 'Python', 'PHP', 'Ruby', 'Java', 'C#'].map((sdk, i) => (
            <span key={i} className="px-4 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 shadow-sm">
              {sdk}
            </span>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
