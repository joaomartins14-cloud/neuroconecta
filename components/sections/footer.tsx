'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
  ArrowUp,
  Shield,
  Award,
  Building,
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const footerLinks = {
  produto: [
    { label: 'Perfil Sensorial', href: '/produtos/perfil-sensorial' },
    { label: 'Rotinas Visuais', href: '/produtos/rotinas-visuais' },
    { label: 'Dashboard BI', href: '/produtos/dashboard-bi' },
    { label: 'App Mobile', href: '/produtos/app-mobile' },
    { label: 'White-Label', href: '/produtos/white-label' },
  ],
  solucoes: [
    { label: 'Para Clínicas (B2B)', href: '/solucoes/clinicas' },
    { label: 'Para Prefeituras (B2G)', href: '/solucoes/prefeituras' },
    { label: 'Para Escolas', href: '/solucoes/escolas' },
    { label: 'Para Famílias', href: '/solucoes/familias' },
    { label: 'Para APAEs', href: '/solucoes/apaes' },
  ],
  recursos: [
    { label: 'Central de Ajuda', href: '/recursos/central-ajuda' },
    { label: 'Blog', href: '/recursos/blog' },
    { label: 'Webinars', href: '/recursos/webinars' },
    { label: 'Documentação API', href: '/recursos/documentacao-api' },
    { label: 'Pictogramas ARASAAC', href: '/recursos/pictogramas' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Parceiros', href: '/parceiros' },
    { label: 'Carreiras', href: '/carreiras' },
    { label: 'Imprensa', href: '/imprensa' },
    { label: 'Contato', href: '/contato' },
  ],
  legal: [
    { label: 'Termos de Uso', href: '/legal/termos' },
    { label: 'Política de Privacidade', href: '/legal/privacidade' },
    { label: 'LGPD', href: '/legal/lgpd' },
    { label: 'Cookies', href: '/legal/cookies' },
  ],
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-b from-background to-muted/50 pt-20 pb-8 px-4 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fd74fd]/30 to-transparent" />
      <div className="absolute top-20 right-10 w-40 h-40 bg-[#7af7f7]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-60 h-60 bg-[#fd74fd]/10 rounded-full blur-3xl" />

      <div ref={contentRef} className="max-w-6xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo.png"
                  alt="NeuroConecta Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl">
                <span className="text-[#fd74fd]">Neuro</span>
                <span className="text-[#7af7f7]">Conecta</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Conectando redes de apoio para transformar o desenvolvimento neurodivergente.
              Plataforma SaaS B2B e B2G para clínicas, escolas e prefeituras.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:contato@neuroconecta.com.br"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#fd74fd] transition-colors"
              >
                <Mail className="w-4 h-4" />
                contato@neuroconecta.com.br
              </a>
              <a
                href="tel:+5543999999999"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-[#7af7f7] transition-colors"
              >
                <Phone className="w-4 h-4" />
                (43) 99999-9999
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Assaí, Paraná - Brasil
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Instagram, color: '#fd74fd', label: 'Instagram', href: 'https://instagram.com/neuroconecta' },
                { icon: Linkedin, color: '#7af7f7', label: 'LinkedIn', href: 'https://linkedin.com/company/neuroconecta' },
                { icon: Youtube, color: '#fff48d', label: 'YouTube', href: 'https://youtube.com/@neuroconecta' },
              ].map(({ icon: Icon, color, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ color }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              <Link href="/legal/lgpd" className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#fd74fd]/10 text-xs font-medium hover:bg-[#fd74fd]/20 transition-colors">
                <Shield className="w-3 h-3 text-[#fd74fd]" />
                LGPD Compliant
              </Link>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#7af7f7]/10 text-xs font-medium">
                <Award className="w-3 h-3 text-[#7af7f7]" />
                ISO 27001
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#fd74fd] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Soluções</h4>
            <ul className="space-y-3">
              {footerLinks.solucoes.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#7af7f7] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-[#fff48d] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mb-4 mt-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="relative p-8 rounded-3xl bg-gradient-to-r from-[#fd74fd]/10 via-[#7af7f7]/10 to-[#fff48d]/10 border border-[#fd74fd]/20 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Fique por dentro das novidades</h3>
              <p className="text-muted-foreground">
                Receba atualizações, dicas e conteúdos exclusivos sobre neurodesenvolvimento.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl bg-background border border-border focus:border-[#fd74fd] focus:ring-2 focus:ring-[#fd74fd]/20 outline-none transition-all"
              />
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Partners/Integrations Row */}
        <div className="mb-12">
          <p className="text-center text-sm text-muted-foreground mb-6">Parceiros e Integrações</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <Link href="/solucoes/apaes" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <Building className="w-5 h-5" />
              <span className="text-sm font-medium">APAEs</span>
            </Link>
            <Link href="/recursos/pictogramas" className="flex items-center gap-2 hover:opacity-100 transition-opacity">
              <span className="text-sm font-medium">ARASAAC</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">AWS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">RNDS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">CERs</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2025 NeuroConecta. Todos os direitos reservados. Feito com{' '}
            <Heart className="w-4 h-4 inline text-[#fd74fd]" /> no Brasil
          </p>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              HealthTech / EdTech / GovTech
            </span>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-muted hover:bg-gradient-to-r hover:from-[#fd74fd] hover:to-[#7af7f7] flex items-center justify-center transition-all hover:scale-110 group"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-5 h-5 text-muted-foreground group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
