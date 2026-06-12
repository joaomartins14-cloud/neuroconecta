'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Minus, MessageCircle, X, Search, Send, Shield, Smartphone, Building, CreditCard, Headphones } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const faqItems = [
  {
    category: 'Geral',
    icon: Building,
    questions: [
      {
        question: 'O que é o NeuroConecta?',
        answer:
          'O NeuroConecta é uma plataforma digital integrada e interoperável que centraliza o acompanhamento de pessoas neurodivergentes, conectando família, escola e equipe de saúde em um ecossistema de dados compartilhados, seguro e orientado por evidências científicas.',
      },
      {
        question: 'Para quem o NeuroConecta é indicado?',
        answer:
          'A plataforma é destinada a pessoas com TEA/TDAH (mercado endereçável de ~5,5 milhões com TEA e ~2 milhões com TDAH no Brasil), suas famílias, terapeutas e profissionais de saúde, educadores, escolas e gestores públicos (secretarias de saúde e educação).',
      },
      {
        question: 'O NeuroConecta está disponível em todo o Brasil?',
        answer:
          'Sim! O NeuroConecta é um SaaS (Software as a Service) disponível em todo o território nacional, com modelo B2B (Clínicas e Escolas) e B2G (Prefeituras e Secretarias). Iniciamos o piloto em Assaí-PR e estamos expandindo para todo o país.',
      },
      {
        question: 'O que significa o slogan "Conectando redes de apoio"?',
        answer:
          'Nosso slogan reflete a missão de resolver o "abismo comunicacional" que existe entre os três pilares do cuidado: família, escola e equipe terapêutica. Informações que antes se perdiam agora são integradas em um único ecossistema.',
      },
    ],
  },
  {
    category: 'Funcionalidades',
    icon: Smartphone,
    questions: [
      {
        question: 'Como funciona o registro de eventos pelo app?',
        answer:
          'O app permite que famílias registrem eventos diários (alimentação, sono, crises, humor) com um sistema intuitivo de 3 cliques. Há suporte a GPS para mapeamento geoespacial de gatilhos, escala visual de intensidade (0-10) e campo de observação com reconhecimento de voz.',
      },
      {
        question: 'O que são as Rotinas Visuais?',
        answer:
          'São sequências personalizáveis criadas com mais de 30.000 pictogramas ARASAAC (licença Creative Commons). Incluem checklists mobile com reforço sonoro e visual, histórico de cumprimento e relatório de aderência semanal - fundamentais para a estruturação do dia a dia de pessoas com TEA/TDAH.',
      },
      {
        question: 'O que é o Perfil Sensorial?',
        answer:
          'É um módulo baseado na Teoria da Integração Sensorial (Ayres, 1972) que apresenta gráficos radar interativos. Classifica respostas sensoriais em 7 sistemas (tato, propriocepção, vestibular, auditivo, visual, olfativo, gustativo) e gera escore validado pelo Sensory Processing Measure (SPM-2, WPS, 2021).',
      },
      {
        question: 'Como funciona o Dashboard BI Clínico?',
        answer:
          'O Dashboard oferece análise de gatilhos comportamentais recorrentes, mapa de calor geoespacial de incidentes, linhas de tendência por período e comparativo entre ambientes (casa, escola, clínica). Permite exportação de relatórios em PDF/CSV e geração assistida de laudos.',
      },
      {
        question: 'A plataforma gera relatórios automaticamente?',
        answer:
          'Sim! Geramos relatórios automáticos de evolução para famílias, laudos estruturados para profissionais (em conformidade com normas do CFP e CFF), e painéis de indicadores de impacto para gestores públicos. Reduzimos em média 40% o tempo de elaboração documental.',
      },
    ],
  },
  {
    category: 'Segurança e LGPD',
    icon: Shield,
    questions: [
      {
        question: 'O NeuroConecta é seguro? Como meus dados são protegidos?',
        answer:
          'Sim! Toda comunicação é criptografada em trânsito (TLS 1.3) e em repouso (AES-256), em total conformidade com a LGPD (Lei 13.709/2018). Utilizamos arquitetura Multi-Tenant com Row-Level Security no PostgreSQL, garantindo isolamento total entre clientes - modelo adotado por SaaS líderes como Notion, Linear e Figma.',
      },
      {
        question: 'Quem tem acesso aos dados do paciente?',
        answer:
          'O acesso é controlado por RBAC (Role-Based Access Control) com perfis diferenciados (família, terapeuta, professor, administrador, gestor público). Apenas usuários autorizados podem visualizar os dados, sempre com histórico auditado e consentimento LGPD digital registrado.',
      },
      {
        question: 'A plataforma possui DPO (Data Protection Officer)?',
        answer:
          'Sim, temos um DPO nomeado responsável pela conformidade LGPD, Política de Retenção e Exclusão de Dados documentada, e Plano de Resposta a Incidentes (IRP). Realizamos auditorias trimestrais por empresa especializada em segurança da informação.',
      },
    ],
  },
  {
    category: 'Planos e Preços',
    icon: CreditCard,
    questions: [
      {
        question: 'Quais são os planos disponíveis?',
        answer:
          'Oferecemos: (1) B2B para clínicas - R$ 10,00/paciente/mês; (2) B2G para prefeituras - licença anual proporcional à população; (3) Setup white-label: taxa única de R$ 5.000 a R$ 20.000 para personalização completa de marca (logo, cores, domínio customizado).',
      },
      {
        question: 'Existe período de teste gratuito?',
        answer:
          'Sim! Oferecemos uma demonstração gratuita e período de teste para que você possa conhecer todas as funcionalidades. Nossa meta é atingir NPS superior a 80, então garantimos que você experimente antes de decidir.',
      },
      {
        question: 'Como funciona o modelo para prefeituras?',
        answer:
          'O modelo B2G com licenciamento anual proporcional à população garante equidade de acesso independentemente da capacidade fiscal municipal. Oferecemos suporte ao processo de licitação com parecer técnico e jurídico, demonstração de ROI concreto e indicadores de impacto social mensuráveis.',
      },
    ],
  },
  {
    category: 'Suporte',
    icon: Headphones,
    questions: [
      {
        question: 'Como é o onboarding na plataforma?',
        answer:
          'Oferecemos onboarding assistido com treinamento gamificado e certificação digital. Nas primeiras clínicas-piloto, realizamos onboarding presencial. Também disponibilizamos base de conhecimento completa, suporte via chat e comunidade de prática para profissionais.',
      },
      {
        question: 'Há suporte técnico disponível?',
        answer:
          'Sim! Oferecemos suporte técnico via chat e base de conhecimento, relatórios de impacto periódicos para gestores públicos, e comunidade de prática exclusiva para profissionais de saúde cadastrados na plataforma.',
      },
    ],
  },
]

function FAQAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string }
  isOpen: boolean
  onToggle: () => void
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const answerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current && answerRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: answerRef.current.offsetHeight,
          duration: 0.4,
          ease: 'power2.out',
        })
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
    }
  }, [isOpen])

  return (
    <div
      className={`border rounded-2xl transition-all duration-300 ${
        isOpen
          ? 'border-[#fd74fd]/30 bg-gradient-to-r from-[#fd74fd]/5 to-[#7af7f7]/5 shadow-neuro'
          : 'border-border hover:border-[#7af7f7]/30 bg-white'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className={`font-semibold pr-4 ${isOpen ? 'text-[#fd74fd]' : ''}`}>
          {item.question}
        </span>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            isOpen
              ? 'bg-gradient-to-r from-[#fd74fd] to-[#7af7f7]'
              : 'bg-muted'
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4 text-white" />
          ) : (
            <Plus className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>
      <div ref={contentRef} className="overflow-hidden h-0">
        <div ref={answerRef} className="px-5 pb-5">
          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

// Full FAQ Modal
interface FAQModalProps {
  isOpen: boolean
  onClose: () => void
}

export function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [contactMessage, setContactMessage] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }
      )
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    if (modalRef.current) {
      document.body.style.overflow = ''
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: onClose,
      })
    }
  }

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Filter questions based on search and category
  const filteredFaq = faqItems
    .filter((category) => !activeCategory || category.category === activeCategory)
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 bg-gradient-to-r from-[#fd74fd]/10 via-[#7af7f7]/10 to-[#fff48d]/10 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Central de Ajuda NeuroConecta</h2>
                <p className="text-sm text-muted-foreground">
                  Encontre respostas para suas dúvidas
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar perguntas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-background border border-border focus:border-[#7af7f7] focus:ring-2 focus:ring-[#7af7f7]/20 outline-none transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeCategory
                  ? 'bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              Todas
            </button>
            {faqItems.map((category) => {
              const IconComponent = category.icon
              return (
                <button
                  key={category.category}
                  onClick={() => setActiveCategory(category.category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    activeCategory === category.category
                      ? 'bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.category}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredFaq.map((category, categoryIndex) => (
            <div key={category.category} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <category.icon className="w-5 h-5 text-[#fd74fd]" />
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {category.category}
                </h3>
              </div>
              <div className="space-y-3">
                {category.questions.map((item, itemIndex) => {
                  const itemId = `${categoryIndex}-${itemIndex}`
                  return (
                    <FAQAccordion
                      key={itemId}
                      item={item}
                      isOpen={openItems.has(itemId)}
                      onToggle={() => toggleItem(itemId)}
                    />
                  )
                })}
              </div>
            </div>
          ))}

          {filteredFaq.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nenhuma pergunta encontrada para &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#fd74fd] font-medium hover:underline"
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>

        {/* Contact Form */}
        <div className="sticky bottom-0 p-6 bg-muted/50 border-t">
          <p className="text-sm text-muted-foreground mb-3">
            Não encontrou o que procurava? Envie sua dúvida:
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Digite sua pergunta..."
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-background border border-border focus:border-[#fd74fd] focus:ring-2 focus:ring-[#fd74fd]/20 outline-none transition-all"
            />
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
              <Send className="w-4 h-4" />
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['0-0']))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  // Show only first 2 categories for preview
  const previewFaq = faqItems.slice(0, 2)

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-t from-[#fff48d]/10 via-[#7af7f7]/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#fff48d]/20 to-[#fd74fd]/10 border border-[#fff48d]/30 text-sm font-medium mb-4">
            <MessageCircle className="w-4 h-4" />
            Perguntas Frequentes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Dúvidas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Encontre respostas rápidas para as perguntas mais comuns sobre o NeuroConecta.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-8">
          {previewFaq.map((category, categoryIndex) => (
            <div key={category.category}>
              <div className="flex items-center gap-2 mb-4 px-2">
                <category.icon className="w-5 h-5 text-[#fd74fd]" />
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {category.category}
                </h3>
              </div>
              <div className="space-y-3">
                {category.questions.slice(0, 3).map((item, itemIndex) => {
                  const itemId = `${categoryIndex}-${itemIndex}`
                  return (
                    <FAQAccordion
                      key={itemId}
                      item={item}
                      isOpen={openItems.has(itemId)}
                      onToggle={() => toggleItem(itemId)}
                    />
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Note about floating button */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Clique no botão flutuante <MessageCircle className="w-4 h-4 inline text-[#fd74fd]" /> para
          ver todas as {faqItems.reduce((acc, cat) => acc + cat.questions.length, 0)} perguntas
        </p>
      </div>
    </section>
  )
}
