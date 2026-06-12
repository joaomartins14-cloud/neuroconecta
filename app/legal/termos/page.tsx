'use client'

import { PageLayout } from '@/components/page-layout'

export default function TermosPage() {
  return (
    <PageLayout>
      <article className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Termos de Uso</h1>
              <p className="text-gray-500">Última atualização: Janeiro de 2025</p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 leading-relaxed">
                Ao acessar e utilizar a plataforma NeuroConecta, você concorda em cumprir e estar vinculado 
                a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá 
                usar nossos serviços.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                O NeuroConecta é uma plataforma digital de gestão e acompanhamento do neurodesenvolvimento 
                que conecta famílias, escolas, clínicas e gestores públicos. Nossos serviços incluem:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Perfil Sensorial digital</li>
                <li>Módulo de Eventos comportamentais</li>
                <li>Rotinas Visuais com pictogramas</li>
                <li>Comunicação segura entre stakeholders</li>
                <li>Relatórios e dashboards analíticos</li>
                <li>Apoio à emissão de laudos multidisciplinares</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cadastro e Conta</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Para utilizar os serviços do NeuroConecta, você deve:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Ter pelo menos 18 anos ou ser representante legal de um menor</li>
                <li>Fornecer informações verdadeiras, precisas e completas</li>
                <li>Manter suas credenciais de acesso seguras e confidenciais</li>
                <li>Notificar imediatamente sobre uso não autorizado da sua conta</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Uso Aceitável</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Você concorda em usar a plataforma apenas para fins legítimos e de acordo com estes termos. 
                É proibido:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Violar leis ou regulamentos aplicáveis</li>
                <li>Compartilhar informações de terceiros sem autorização</li>
                <li>Tentar acessar dados de outros usuários</li>
                <li>Usar a plataforma para fins não relacionados ao neurodesenvolvimento</li>
                <li>Realizar engenharia reversa ou modificar o software</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Dados de Saúde</h2>
              <p className="text-gray-600 leading-relaxed">
                A plataforma processa dados sensíveis de saúde conforme a LGPD e regulamentações do setor. 
                Ao cadastrar informações de pacientes/alunos, você declara ter autorização para fazê-lo e 
                compreende que tais dados serão tratados conforme nossa Política de Privacidade.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Propriedade Intelectual</h2>
              <p className="text-gray-600 leading-relaxed">
                Todo o conteúdo da plataforma, incluindo software, design, textos, gráficos, logos e 
                funcionalidades são de propriedade exclusiva do NeuroConecta ou licenciados para uso. 
                Os pictogramas ARASAAC são utilizados sob licença Creative Commons.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitação de Responsabilidade</h2>
              <p className="text-gray-600 leading-relaxed">
                O NeuroConecta é uma ferramenta de apoio e não substitui avaliação profissional de saúde. 
                Não nos responsabilizamos por decisões clínicas tomadas com base nos dados da plataforma. 
                A responsabilidade pelo diagnóstico e tratamento permanece com os profissionais habilitados.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Planos e Pagamento</h2>
              <p className="text-gray-600 leading-relaxed">
                Os termos específicos de cada plano (Família, Clínica, Enterprise) estão descritos em 
                seus respectivos contratos. Cancelamentos devem seguir as políticas de cada modalidade.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modificações</h2>
              <p className="text-gray-600 leading-relaxed">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações 
                significativas serão comunicadas por e-mail ou notificação na plataforma com 30 dias 
                de antecedência.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contato</h2>
              <p className="text-gray-600 leading-relaxed">
                Para dúvidas sobre estes termos, entre em contato:<br />
                E-mail: juridico@neuroconecta.com.br<br />
                Telefone: (11) 99999-9999
              </p>
            </section>

            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 text-center">
                Ao utilizar o NeuroConecta, você declara ter lido, compreendido e concordado com estes Termos de Uso.
              </p>
            </div>
          </div>
        </div>
      </article>
    </PageLayout>
  )
}
