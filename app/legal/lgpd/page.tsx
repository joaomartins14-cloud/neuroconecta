'use client'

import { PageLayout } from '@/components/page-layout'
import { Shield, Lock, Eye, UserCheck, Database, FileCheck, AlertCircle, CheckCircle } from 'lucide-react'

export default function LGPDPage() {
  return (
    <PageLayout>
      <article className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Conformidade LGPD</h1>
              <p className="text-xl text-gray-600">
                Como o NeuroConecta garante a proteção dos seus dados pessoais
              </p>
            </div>

            {/* Intro */}
            <div className="p-8 bg-gradient-to-r from-[#fff48d]/20 to-[#7af7f7]/20 rounded-2xl mb-12">
              <p className="text-gray-700 text-lg leading-relaxed">
                A Lei Geral de Proteção de Dados (Lei 13.709/2018) estabelece regras sobre coleta, 
                armazenamento, tratamento e compartilhamento de dados pessoais. O NeuroConecta foi 
                desenvolvido desde sua concepção com a privacidade como princípio fundamental 
                (Privacy by Design).
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 border border-gray-100 rounded-xl">
                <Lock className="w-10 h-10 text-[#fd74fd] mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Criptografia de Ponta</h3>
                <p className="text-gray-600">
                  Todos os dados são criptografados em trânsito (TLS 1.3) e em repouso (AES-256), 
                  garantindo proteção mesmo em caso de acesso não autorizado.
                </p>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl">
                <Eye className="w-10 h-10 text-[#7af7f7] mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Controle de Acesso</h3>
                <p className="text-gray-600">
                  Implementamos controle granular de permissões. Cada usuário acessa apenas os dados 
                  necessários para sua função, seguindo o princípio do menor privilégio.
                </p>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl">
                <UserCheck className="w-10 h-10 text-[#fff48d] mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Consentimento Explícito</h3>
                <p className="text-gray-600">
                  Coletamos consentimento de forma clara e específica para cada finalidade de 
                  tratamento, permitindo revogação a qualquer momento.
                </p>
              </div>

              <div className="p-6 border border-gray-100 rounded-xl">
                <Database className="w-10 h-10 text-[#fd74fd] mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Minimização de Dados</h3>
                <p className="text-gray-600">
                  Coletamos apenas os dados estritamente necessários para fornecer nossos serviços, 
                  evitando acúmulo desnecessário de informações.
                </p>
              </div>
            </div>

            {/* Direitos */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Seus Direitos como Titular</h2>
              <div className="space-y-4">
                {[
                  { title: 'Acesso', desc: 'Solicite uma cópia de todos os dados que temos sobre você' },
                  { title: 'Correção', desc: 'Atualize informações incorretas ou desatualizadas' },
                  { title: 'Exclusão', desc: 'Peça a eliminação dos dados quando não mais necessários' },
                  { title: 'Portabilidade', desc: 'Transfira seus dados para outro serviço em formato estruturado' },
                  { title: 'Revogação', desc: 'Retire seu consentimento a qualquer momento' },
                  { title: 'Informação', desc: 'Saiba com quem seus dados foram compartilhados' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Dados Sensíveis */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tratamento de Dados Sensíveis</h2>
              <div className="p-6 border-l-4 border-[#fd74fd] bg-[#fd74fd]/5 rounded-r-xl">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-[#fd74fd] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      Por tratar dados de saúde (categoria especial na LGPD), aplicamos medidas 
                      reforçadas de segurança. O acesso a esses dados é restrito a profissionais 
                      autorizados e sempre registrado em logs de auditoria. O tratamento é baseado 
                      em consentimento explícito ou, quando aplicável, para tutela da saúde.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Certificações */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Certificações e Conformidade</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                  <FileCheck className="w-12 h-12 text-[#7af7f7] mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900">ISO 27001</h4>
                  <p className="text-sm text-gray-600">Gestão de Segurança da Informação</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                  <Shield className="w-12 h-12 text-[#fd74fd] mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900">LGPD</h4>
                  <p className="text-sm text-gray-600">Lei Geral de Proteção de Dados</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl text-center">
                  <Lock className="w-12 h-12 text-[#fff48d] mx-auto mb-3" />
                  <h4 className="font-semibold text-gray-900">SOC 2</h4>
                  <p className="text-sm text-gray-600">Em processo de certificação</p>
                </div>
              </div>
            </section>

            {/* DPO */}
            <section className="p-8 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] rounded-2xl text-white">
              <h2 className="text-2xl font-bold mb-4">Encarregado de Dados (DPO)</h2>
              <p className="text-white/90 mb-6">
                Nosso Encarregado de Proteção de Dados está disponível para esclarecer dúvidas 
                e receber solicitações relacionadas aos seus direitos como titular.
              </p>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="font-medium">Maria Silva - DPO</p>
                <p className="text-white/80">privacidade@neuroconecta.com.br</p>
                <p className="text-white/80">Resposta em até 15 dias úteis</p>
              </div>
            </section>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}
