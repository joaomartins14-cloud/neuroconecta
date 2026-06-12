'use client'

import { PageLayout } from '@/components/page-layout'

export default function PrivacidadePage() {
  return (
    <PageLayout>
      <article className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidade</h1>
              <p className="text-gray-500">Última atualização: Janeiro de 2025</p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
              <p className="text-gray-600 leading-relaxed">
                O NeuroConecta está comprometido com a proteção da privacidade de seus usuários. Esta política 
                descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em 
                conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Dados que Coletamos</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.1 Dados de Cadastro</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Nome completo</li>
                <li>E-mail e telefone</li>
                <li>CPF (para identificação única)</li>
                <li>Endereço</li>
                <li>Dados profissionais (para profissionais de saúde)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.2 Dados Sensíveis de Saúde</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Informações sobre o neurodesenvolvimento</li>
                <li>Perfil sensorial e comportamental</li>
                <li>Histórico de eventos e crises</li>
                <li>Registros de acompanhamento clínico</li>
                <li>Documentos e laudos anexados</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2.3 Dados de Uso</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Logs de acesso e navegação</li>
                <li>Dispositivo e navegador utilizados</li>
                <li>Endereço IP</li>
                <li>Interações com a plataforma</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Finalidade do Tratamento</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Fornecer os serviços contratados</li>
                <li>Facilitar a comunicação entre família, escola e clínica</li>
                <li>Gerar relatórios e análises de desenvolvimento</li>
                <li>Apoiar a emissão de laudos multidisciplinares</li>
                <li>Melhorar nossos produtos e serviços</li>
                <li>Cumprir obrigações legais</li>
                <li>Enviar comunicações sobre o serviço</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Base Legal</h2>
              <p className="text-gray-600 leading-relaxed">
                O tratamento de dados pessoais é realizado com base no consentimento do titular, execução de 
                contrato, cumprimento de obrigação legal e interesse legítimo, conforme aplicável a cada 
                situação específica.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Compartilhamento de Dados</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Seus dados podem ser compartilhados com:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Profissionais de saúde autorizados pelo titular</li>
                <li>Instituições de ensino vinculadas ao acompanhamento</li>
                <li>Prestadores de serviços essenciais (hospedagem, e-mail)</li>
                <li>Autoridades quando exigido por lei</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-4">
                Nunca vendemos ou comercializamos dados pessoais.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Segurança</h2>
              <p className="text-gray-600 leading-relaxed">
                Implementamos medidas técnicas e organizacionais para proteger seus dados, incluindo 
                criptografia em trânsito e em repouso, controle de acesso, monitoramento contínuo e 
                auditorias de segurança. Seguimos padrões ISO 27001 e boas práticas do setor de saúde.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retenção de Dados</h2>
              <p className="text-gray-600 leading-relaxed">
                Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas, respeitar 
                obrigações legais (especialmente em relação a prontuários de saúde) ou pelo período acordado 
                contratualmente. Dados de saúde são mantidos por no mínimo 20 anos conforme legislação vigente.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Seus Direitos</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Conforme a LGPD, você tem direito a:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Confirmar a existência de tratamento</li>
                <li>Acessar seus dados</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar anonimização ou exclusão</li>
                <li>Portabilidade dos dados</li>
                <li>Revogar consentimento</li>
                <li>Obter informações sobre compartilhamento</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Encarregado de Dados (DPO)</h2>
              <p className="text-gray-600 leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre privacidade:<br />
                E-mail: privacidade@neuroconecta.com.br<br />
                Encarregado: Maria Silva
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Alterações</h2>
              <p className="text-gray-600 leading-relaxed">
                Esta política pode ser atualizada periodicamente. Alterações significativas serão 
                comunicadas por e-mail ou notificação na plataforma.
              </p>
            </section>

            <div className="mt-12 p-6 bg-gradient-to-r from-[#fd74fd]/10 to-[#7af7f7]/10 rounded-xl">
              <p className="text-sm text-gray-600 text-center">
                Sua privacidade é fundamental para nós. Estamos comprometidos em proteger seus dados 
                com os mais altos padrões de segurança.
              </p>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}
