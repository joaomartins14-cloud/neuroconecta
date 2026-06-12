'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Users,
  Smartphone,
  School,
  LineChart,
  FileText,
  Shield,
  ArrowRight,
  Check,
  Brain,
  Palette,
  MessageSquare,
  Building,
} from 'lucide-react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Jornada do Usuário baseada no PDF
const steps = [
  {
    number: '01',
    icon: Building,
    title: 'Entrada (Onboarding)',
    description:
      'Clínica ou Secretaria de Saúde cadastra o paciente com anamnese estruturada, consentimento LGPD digital e configuração inicial de perfil sensorial.',
    color: '#fd74fd',
    actor: 'Clínica / Secretaria',
    features: ['Anamnese Estruturada', 'Integração API REST', 'Perfil Sensorial Inicial'],
  },
  {
    number: '02',
    icon: Smartphone,
    title: 'Engajamento Familiar',
    description:
      'Família registra eventos diários (alimentação, sono, crises, humor) com sistema de 3 cliques e escala visual de intensidade. Notificações personalizadas e biblioteca de rotinas visuais.',
    color: '#7af7f7',
    actor: 'Família / Cuidador',
    features: ['App Mobile', 'Sistema 3 Cliques', 'Pictogramas ARASAAC'],
  },
  {
    number: '03',
    icon: School,
    title: 'Colaboração Escolar',
    description:
      'Registro de incidentes em sala de aula, avaliação de participação e comportamento. Interface simplificada com formulários pré-estruturados.',
    color: '#fff48d',
    actor: 'Professor / Coordenador',
    features: ['Formulários Simples', 'Integração com PEI', 'Observações em Tempo Real'],
  },
  {
    number: '04',
    icon: LineChart,
    title: 'Análise Clínica',
    description:
      'Dashboard Web com Perfil Sensorial atualizado, linha do tempo de eventos, análise de padrões comportamentais, identificação de gatilhos recorrentes.',
    color: '#fd74fd',
    actor: 'Terapeuta / Equipe Multidisciplinar',
    features: ['Dashboard BI Clínico', 'Mapas de Calor', 'Sugestão de Condutas'],
  },
  {
    number: '05',
    icon: FileText,
    title: 'Geração de Resultados',
    description:
      'Relatórios automáticos de evolução para famílias, laudos estruturados para profissionais, painéis de indicadores de impacto para gestores públicos.',
    color: '#7af7f7',
    actor: 'Gestor / Família / Profissional',
    features: ['Relatórios PDF/HTML', 'Conformidade CFP/CFF', 'Indicadores de Impacto'],
  },
]

// Módulos Principais baseados no PDF
const modules = [
  {
    icon: Brain,
    title: 'Perfil Sensorial',
    description: 'Gráficos radar interativos baseados na Teoria da Integração Sensorial com classificação em 7 sistemas sensoriais.',
    stat: '7',
    statLabel: 'Sistemas Sensoriais',
    color: '#fd74fd',
  },
  {
    icon: Smartphone,
    title: 'Módulo de Eventos',
    description: 'Registro rápido em até 3 interações com suporte a GPS para mapeamento geoespacial de gatilhos ambientais.',
    stat: '3',
    statLabel: 'Cliques Máximo',
    color: '#7af7f7',
  },
  {
    icon: Palette,
    title: 'Rotinas Visuais',
    description: 'Biblioteca de mais de 30.000 pictogramas ARASAAC com editor de sequências personalizáveis.',
    stat: '30K+',
    statLabel: 'Pictogramas',
    color: '#fff48d',
  },
  {
    icon: MessageSquare,
    title: 'Comunicação Segura',
    description: 'Chat assíncrono entre família, escola e equipe terapêutica com histórico auditado e criptografia TLS 1.3.',
    stat: '100%',
    statLabel: 'Criptografado',
    color: '#fd74fd',
  },
]

// Proposta de Valor por Stakeholder
const valuePropositions = [
  {
    stakeholder: 'Família',
    icon: Users,
    color: '#fd74fd',
    benefits: [
      'Previsibilidade de rotinas',
      'Registro simplificado de eventos',
      'Relatórios automáticos de evolução',
      'Canal de comunicação direta',
    ],
  },
  {
    stakeholder: 'Profissional de Saúde',
    icon: Brain,
    color: '#7af7f7',
    benefits: [
      'Dados longitudinais em tempo real',
      'Perfil Sensorial dinâmico',
      'Geração assistida de laudos',
      '40% menos tempo em relatórios',
    ],
  },
  {
    stakeholder: 'Escola / Educador',
    icon: School,
    color: '#fff48d',
    benefits: [
      'Rotinas visuais com pictogramas',
      'Registro simplificado de incidentes',
      'Acesso a orientações do terapeuta',
      'Integração com PEI',
    ],
  },
  {
    stakeholder: 'Gestor Público',
    icon: Building,
    color: '#fd74fd',
    benefits: [
      'Indicadores de impacto social',
      'Gestão eficiente de filas',
      'Alocação baseada em evidências',
      'Subsídio para políticas públicas',
    ],
  },
]

function StepCard({
  step,
  index,
  isActive,
}: {
  step: (typeof steps)[0]
  index: number
  isActive: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const IconComponent = step.icon

  useEffect(() => {
    if (isActive && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [isActive])

  return (
    <div
      ref={cardRef}
      className={`relative p-6 rounded-3xl transition-all duration-500 ${
        isActive
          ? 'bg-white shadow-neuro-lg scale-105'
          : 'bg-white/50 hover:bg-white hover:shadow-neuro'
      }`}
      style={{
        borderLeft: isActive ? `4px solid ${step.color}` : '4px solid transparent',
      }}
    >
      {/* Number Badge */}
      <div
        className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
        style={{ background: step.color }}
      >
        {step.number}
      </div>

      <div className="flex items-start gap-4 mt-2">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${step.color}20` }}
        >
          <IconComponent className="w-7 h-7" style={{ color: step.color }} />
        </div>

        <div className="flex-1">
          <span className="text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block" style={{ background: `${step.color}15`, color: step.color }}>
            {step.actor}
          </span>
          <h3 className="text-lg font-bold mb-2">{step.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{step.description}</p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {step.features.map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: `${step.color}15`, color: step.color }}
              >
                <Check className="w-3 h-3" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ModuleCard({ module, index }: { module: (typeof modules)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const IconComponent = module.icon

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className="group relative p-6 rounded-3xl bg-white shadow-neuro hover:shadow-neuro-lg transition-all duration-500 hover:-translate-y-2"
    >
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: `${module.color}20` }}
        >
          <IconComponent className="w-7 h-7" style={{ color: module.color }} />
        </div>
        <div>
          <div className="text-3xl font-bold" style={{ color: module.color }}>{module.stat}</div>
          <div className="text-xs text-muted-foreground">{module.statLabel}</div>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-2">{module.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{module.description}</p>

      <ArrowRight className="absolute bottom-6 right-6 w-5 h-5 text-muted-foreground/30 group-hover:text-[#fd74fd] group-hover:translate-x-1 transition-all duration-300" />
    </div>
  )
}

function ValuePropositionCard({ proposition, index }: { proposition: (typeof valuePropositions)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const IconComponent = proposition.icon

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className="p-6 rounded-3xl bg-white shadow-neuro hover:shadow-neuro-lg transition-all duration-300"
      style={{ borderTop: `4px solid ${proposition.color}` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${proposition.color}20` }}
        >
          <IconComponent className="w-6 h-6" style={{ color: proposition.color }} />
        </div>
        <h4 className="text-lg font-bold">{proposition.stakeholder}</h4>
      </div>
      <ul className="space-y-2">
        {proposition.benefits.map((benefit, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: proposition.color }} />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ComoFuncionaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
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

    // Auto-cycle through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000)

    return () => {
      ctx.revert()
      clearInterval(interval)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7af7f7]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#fd74fd]/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#7af7f7]/10 to-[#fff48d]/10 border border-[#7af7f7]/20 text-sm font-medium mb-4">
            Jornada do Usuário
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Como o <span className="gradient-text">NeuroConecta</span> Funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Uma jornada coesa e centrada no paciente, com pontos de contato específicos para cada perfil de usuário.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              index={index}
              isActive={index === activeStep}
            />
          ))}
        </div>

        {/* Módulos Principais */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#fd74fd]/10 to-[#7af7f7]/10 border border-[#fd74fd]/20 text-sm font-medium mb-4">
              Funcionalidades da Plataforma
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Módulos <span className="text-[#fd74fd]">Principais</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tecnologia acessível, inclusiva e orientada por evidências científicas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <ModuleCard key={module.title} module={module} index={index} />
            ))}
          </div>
        </div>

        {/* Proposta de Valor por Stakeholder */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#fff48d]/10 to-[#7af7f7]/10 border border-[#fff48d]/20 text-sm font-medium mb-4">
              Proposta de Valor
            </span>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Benefícios para <span className="text-[#7af7f7]">Cada Perfil</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Valor entregue de forma personalizada para cada stakeholder do ecossistema.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePropositions.map((proposition, index) => (
              <ValuePropositionCard key={proposition.stakeholder} proposition={proposition} index={index} />
            ))}
          </div>
        </div>

        {/* Dados Epidemiológicos */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-[#fd74fd]/5 via-[#7af7f7]/5 to-[#fff48d]/5 border border-[#fd74fd]/10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">O Problema que Resolvemos</h3>
            <p className="text-muted-foreground">Dados epidemiológicos e de contexto no Brasil</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-[#fd74fd] mb-1">1:36</div>
              <p className="text-sm text-muted-foreground">Prevalência de TEA em crianças (CDC, 2023)</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#7af7f7] mb-1">5-7%</div>
              <p className="text-sm text-muted-foreground">Prevalência de TDAH em crianças no Brasil</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#fff48d] mb-1">4-6 anos</div>
              <p className="text-sm text-muted-foreground">Tempo médio para diagnóstico de TEA</p>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-[#fd74fd] mb-1">US$ 1 Tri</div>
              <p className="text-sm text-muted-foreground">Custo global anual (OMS, 2022)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
