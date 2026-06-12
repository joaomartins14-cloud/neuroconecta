'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useDashboard } from '@/lib/dashboard-context'
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Brain,
  Activity,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'pacientes', label: 'Pacientes', icon: Users, href: '/dashboard/pacientes' },
  { id: 'agenda', label: 'Agenda', icon: Calendar, href: '/dashboard/agenda' },
  { id: 'mensagens', label: 'Mensagens', icon: MessageSquare, href: '/dashboard/mensagens', badge: 3 },
  { id: 'perfil-sensorial', label: 'Perfil Sensorial', icon: Brain, href: '/dashboard/perfil-sensorial' },
  { id: 'eventos', label: 'Eventos', icon: Activity, href: '/dashboard/eventos' },
  { id: 'relatorios', label: 'Relatorios', icon: FileText, href: '/dashboard/relatorios' },
  { id: 'laudos', label: 'Laudos', icon: ClipboardList, href: '/dashboard/laudos' },
]

export function DashboardSidebar() {
  const { sidebarOpen, setSidebarOpen, messages } = useDashboard()
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const unreadCount = messages.filter(m => !m.read).length

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        x: sidebarOpen ? 0 : -280,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [sidebarOpen])

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className="fixed left-0 top-0 h-full w-[280px] bg-white border-r border-gray-100 z-50 flex flex-col shadow-xl lg:shadow-none"
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo.png"
                alt="NeuroConecta"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-bold text-lg">
                <span className="text-[#fd74fd]">Neuro</span>
                <span className="text-[#7af7f7]">Conecta</span>
              </span>
              <p className="text-xs text-gray-500">Portal Clinico</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
              const Icon = item.icon
              const badgeCount = item.id === 'mensagens' ? unreadCount : item.badge
              
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#fd74fd]/10 to-[#7af7f7]/10 text-[#fd74fd] font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#fd74fd]' : ''}`} />
                    <span className="flex-1">{item.label}</span>
                    {badgeCount && badgeCount > 0 && (
                      <Badge className="bg-[#fd74fd] text-white text-xs px-2 py-0.5">
                        {badgeCount}
                      </Badge>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-6 hover:bg-gray-50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] flex items-center justify-center text-white font-semibold">
                  CM
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">Dr. Carlos Mendes</p>
                  <p className="text-xs text-gray-500">Neuropediatra</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Configuracoes
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  )
}

export function DashboardHeader() {
  const { sidebarOpen, setSidebarOpen, messages } = useDashboard()
  const [searchQuery, setSearchQuery] = useState('')
  const unreadCount = messages.filter(m => !m.read).length

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar pacientes, eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-[#fd74fd]/20"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#fd74fd] rounded-full" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex justify-between">
                Notificacoes
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} novas
                  </Badge>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {messages.slice(0, 3).map((msg) => (
                <DropdownMenuItem key={msg.id} className="flex flex-col items-start gap-1 py-3">
                  <p className="font-medium text-sm">{msg.from}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{msg.preview}</p>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/mensagens" className="w-full text-center text-[#fd74fd]">
                  Ver todas
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile user avatar */}
          <div className="lg:hidden w-10 h-10 rounded-full bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] flex items-center justify-center text-white font-semibold">
            CM
          </div>
        </div>
      </div>
    </header>
  )
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useDashboard()

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardSidebar />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-[280px]' : ''}`}>
        <DashboardHeader />
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
