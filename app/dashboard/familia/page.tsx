'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { 
  Calendar, MessageSquare, Bell, Heart, CheckCircle2, Clock, 
  TrendingUp, BookOpen, Sun, Moon, Pill, ChevronRight, Plus,
  Play, Pause, RotateCcw, Camera, FileText, AlertTriangle, Star,
  Home, Settings, LogOut, Menu, X, User
} from 'lucide-react'
import { patients, appointments, messages, userProfiles, dashboardStats } from '@/lib/mock-data'

type FamilyTab = 'inicio' | 'rotinas' | 'eventos' | 'mensagens' | 'evolucao'

export default function FamiliaDashboard() {
  const [activeTab, setActiveTab] = useState<FamilyTab>('inicio')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Get family data (using Miguel's family as example)
  const familyProfile = userProfiles.family
  const child = patients.find(p => p.id === familyProfile.childId)!
  const childAppointments = appointments.filter(a => a.patientId === child.id)
  const childMessages = messages.filter(m => m.patientId === child.id)
  const stats = dashboardStats.family

  // Tab change animation
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  const tabs = [
    { id: 'inicio' as FamilyTab, label: 'Inicio', icon: Home },
    { id: 'rotinas' as FamilyTab, label: 'Rotinas', icon: Clock },
    { id: 'eventos' as FamilyTab, label: 'Eventos', icon: Bell },
    { id: 'mensagens' as FamilyTab, label: 'Mensagens', icon: MessageSquare },
    { id: 'evolucao' as FamilyTab, label: 'Evolucao', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fef9e7] via-white to-[#e8fafa]">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="NeuroConecta" width={32} height={32} />
            <span className="font-bold text-sm">
              <span className="text-[#fd74fd]">Neuro</span>
              <span className="text-[#7af7f7]">Conecta</span>
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <MobileSidebar 
              profile={familyProfile} 
              child={child} 
              onClose={() => setSidebarOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-100 flex-col">
        <DesktopSidebar profile={familyProfile} child={child} />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Ola, {familyProfile.name.split(' ')[0]}!
            </h1>
            <p className="text-gray-500">Acompanhe o desenvolvimento de {child.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#fd74fd] rounded-full" />
            </button>
            <Link href="/" className="text-sm text-gray-500 hover:text-[#fd74fd] transition-colors">
              Voltar ao site
            </Link>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="sticky top-16 lg:top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div ref={contentRef} className="p-4 lg:p-8">
          {activeTab === 'inicio' && <InicioTab child={child} appointments={childAppointments} stats={stats} />}
          {activeTab === 'rotinas' && <RotinasTab child={child} />}
          {activeTab === 'eventos' && <EventosTab child={child} />}
          {activeTab === 'mensagens' && <MensagensTab messages={childMessages} />}
          {activeTab === 'evolucao' && <EvolucaoTab child={child} />}
        </div>
      </main>
    </div>
  )
}

// Sidebar Components
function DesktopSidebar({ profile, child }: { profile: typeof userProfiles.family; child: typeof patients[0] }) {
  return (
    <>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Image src="/logo.png" alt="NeuroConecta" width={40} height={40} />
          <span className="font-bold text-lg">
            <span className="text-[#fd74fd]">Neuro</span>
            <span className="text-[#7af7f7]">Conecta</span>
          </span>
        </div>
        
        {/* Child Profile Card */}
        <div className="bg-gradient-to-br from-[#fff48d]/30 via-[#fd74fd]/10 to-[#7af7f7]/20 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Image 
              src={child.photo} 
              alt={child.name} 
              width={56} 
              height={56} 
              className="rounded-full ring-2 ring-white shadow-lg"
            />
            <div>
              <h3 className="font-bold text-gray-900">{child.name}</h3>
              <p className="text-sm text-gray-500">{child.age} anos</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {child.diagnosis.map((d, i) => (
              <span key={i} className="px-2 py-0.5 bg-white/80 rounded-full text-xs font-medium text-gray-700">
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 flex-1">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Resumo</h4>
        <div className="space-y-3">
          <QuickStatItem icon={Calendar} label="Proxima consulta" value="22/01 - 09h" color="text-[#fd74fd]" />
          <QuickStatItem icon={CheckCircle2} label="Rotinas hoje" value="3 de 5" color="text-[#7af7f7]" />
          <QuickStatItem icon={TrendingUp} label="Progresso geral" value="78%" color="text-[#fff48d]" />
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] flex items-center justify-center">
            <span className="text-white font-bold">{profile.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 truncate">{profile.name}</p>
            <p className="text-xs text-gray-500">{profile.role}</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </>
  )
}

function MobileSidebar({ profile, child, onClose }: { profile: typeof userProfiles.family; child: typeof patients[0]; onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="NeuroConecta" width={32} height={32} />
          <span className="font-bold">
            <span className="text-[#fd74fd]">Neuro</span>
            <span className="text-[#7af7f7]">Conecta</span>
          </span>
        </div>
        <button onClick={onClose} className="p-2">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      <DesktopSidebar profile={profile} child={child} />
    </div>
  )
}

function QuickStatItem({ icon: Icon, label, value, color }: { icon: typeof Calendar; label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
      <div className={`p-2 rounded-lg bg-white shadow-sm ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

// Tab Content Components
function InicioTab({ child, appointments: appts, stats }: { child: typeof patients[0]; appointments: typeof appointments; stats: typeof dashboardStats.family }) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#fd74fd] via-[#7af7f7] to-[#fff48d] rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Bom dia!</h2>
          <p className="text-white/90 mb-4">
            {child.name} tem <strong>{child.routines.filter(r => r.status === 'active').length} rotinas</strong> para hoje.
            Continue acompanhando o progresso!
          </p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white text-[#fd74fd] rounded-full font-medium text-sm hover:shadow-lg transition-all">
              Ver rotinas
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full font-medium text-sm hover:bg-white/30 transition-all">
              Registrar evento
            </button>
          </div>
        </div>
        <div className="absolute right-4 bottom-4 opacity-20">
          <Heart className="w-32 h-32" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Progresso Terapia" 
          value={`${stats.therapyProgress}%`} 
          icon={TrendingUp} 
          color="from-[#fd74fd] to-[#ff9efc]"
          trend="+5% esta semana"
        />
        <StatCard 
          title="Rotinas Completas" 
          value={`${stats.routineCompletion}%`} 
          icon={CheckCircle2} 
          color="from-[#7af7f7] to-[#a8fbfb]"
          trend="3 de 5 hoje"
        />
        <StatCard 
          title="Eventos Semana" 
          value={stats.eventsThisWeek.toString()} 
          icon={Bell} 
          color="from-[#fff48d] to-[#fff9c4]"
          trend="2 conquistas"
        />
        <StatCard 
          title="Mensagens" 
          value={stats.unreadMessages.toString()} 
          icon={MessageSquare} 
          color="from-[#a78bfa] to-[#c4b5fd]"
          trend="1 nao lida"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Proximos Compromissos</h3>
            <button className="text-sm text-[#fd74fd] font-medium hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {appts.slice(0, 3).map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#fd74fd]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{apt.type === 'follow-up' ? 'Retorno' : apt.type === 'consultation' ? 'Consulta' : 'Avaliacao'}</p>
                  <p className="text-sm text-gray-500">{apt.professional}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{apt.date.split('-').reverse().slice(0, 2).join('/')}</p>
                  <p className="text-sm text-gray-500">{apt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Eventos Recentes</h3>
            <button className="text-sm text-[#fd74fd] font-medium hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {child.events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  event.type === 'achievement' ? 'bg-green-100' :
                  event.type === 'crisis' ? 'bg-red-100' :
                  event.type === 'observation' ? 'bg-blue-100' : 'bg-yellow-100'
                }`}>
                  {event.type === 'achievement' ? <Star className="w-5 h-5 text-green-600" /> :
                   event.type === 'crisis' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                   <Bell className="w-5 h-5 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {event.reportedBy === 'school' ? 'Escola' : event.reportedBy === 'family' ? 'Familia' : 'Clinica'} - {event.date.split('-').reverse().join('/')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Chart Placeholder */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Evolucao do Desenvolvimento</h3>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
            <option>Ultimos 6 meses</option>
            <option>Ultimo ano</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center">
          <ProgressChart data={child.progress} />
        </div>
      </div>
    </div>
  )
}

function RotinasTab({ child }: { child: typeof patients[0] }) {
  const [activeRoutine, setActiveRoutine] = useState<string | null>(null)
  const [routines, setRoutines] = useState(child.routines)

  const toggleStep = (routineId: string, stepId: string) => {
    setRoutines(prev => prev.map(r => {
      if (r.id === routineId && r.steps) {
        return {
          ...r,
          steps: r.steps.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s)
        }
      }
      return r
    }))
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'sun': return Sun
      case 'moon': return Moon
      case 'book': return BookOpen
      case 'pill': return Pill
      default: return Clock
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rotinas Visuais</h2>
          <p className="text-gray-500">Acompanhe e marque as rotinas de {child.name}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all">
          <Plus className="w-4 h-4" />
          Nova Rotina
        </button>
      </div>

      {/* Routine Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {routines.map((routine) => {
          const Icon = getIcon(routine.icon)
          const isExpanded = activeRoutine === routine.id
          const completedSteps = routine.steps?.filter(s => s.completed).length || 0
          const totalSteps = routine.steps?.length || 0

          return (
            <div 
              key={routine.id}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all ${
                isExpanded ? 'ring-2 ring-[#fd74fd]' : ''
              }`}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => setActiveRoutine(isExpanded ? null : routine.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    routine.status === 'active' 
                      ? 'bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20' 
                      : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${routine.status === 'active' ? 'text-[#fd74fd]' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{routine.name}</h3>
                    <p className="text-sm text-gray-500">{routine.time} - {routine.days.join(', ')}</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Progresso hoje</span>
                    <span className="font-medium text-gray-900">{completedSteps}/{totalSteps}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] rounded-full transition-all"
                      style={{ width: `${totalSteps > 0 ? (completedSteps / totalSteps) * 100 : routine.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Expanded Steps */}
              {isExpanded && routine.steps && (
                <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                  <div className="space-y-2">
                    {routine.steps.map((step) => (
                      <button
                        key={step.id}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleStep(routine.id, step.id)
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                          step.completed 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-white hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          step.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300'
                        }`}>
                          {step.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span className={step.completed ? 'line-through' : ''}>{step.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function EventosTab({ child }: { child: typeof patients[0] }) {
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({
    type: 'observation',
    title: '',
    description: '',
    tags: [] as string[]
  })
  const [events, setEvents] = useState(child.events)

  const addEvent = () => {
    if (newEvent.title && newEvent.description) {
      const event = {
        id: `e${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        type: newEvent.type as 'observation' | 'achievement' | 'crisis',
        title: newEvent.title,
        description: newEvent.description,
        reportedBy: 'family' as const,
        reporterName: userProfiles.family.name,
        tags: newEvent.tags
      }
      setEvents([event, ...events])
      setNewEvent({ type: 'observation', title: '', description: '', tags: [] })
      setShowNewEvent(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registro de Eventos</h2>
          <p className="text-gray-500">Compartilhe observacoes com a equipe multidisciplinar</p>
        </div>
        <button 
          onClick={() => setShowNewEvent(!showNewEvent)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
        >
          {showNewEvent ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showNewEvent ? 'Cancelar' : 'Novo Evento'}
        </button>
      </div>

      {/* New Event Form */}
      {showNewEvent && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Registrar Novo Evento</h3>
          
          {/* Event Type */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { id: 'observation', label: 'Observacao', icon: Bell, color: 'blue' },
              { id: 'achievement', label: 'Conquista', icon: Star, color: 'green' },
              { id: 'crisis', label: 'Crise', icon: AlertTriangle, color: 'red' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setNewEvent({ ...newEvent, type: type.id })}
                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  newEvent.type === type.id 
                    ? type.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                      type.color === 'green' ? 'border-green-500 bg-green-50' :
                      'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <type.icon className={`w-5 h-5 ${
                  type.color === 'blue' ? 'text-blue-500' :
                  type.color === 'green' ? 'text-green-500' :
                  'text-red-500'
                }`} />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Titulo do evento"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#fd74fd] focus:border-transparent outline-none"
          />

          {/* Description */}
          <textarea
            placeholder="Descreva o evento em detalhes..."
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#fd74fd] focus:border-transparent outline-none resize-none"
          />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4" />
              Adicionar foto
            </button>
            <div className="flex-1" />
            <button
              onClick={addEvent}
              disabled={!newEvent.title || !newEvent.description}
              className="px-6 py-2 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              Salvar Evento
            </button>
          </div>
        </div>
      )}

      {/* Events Timeline */}
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="flex gap-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                event.type === 'achievement' ? 'bg-green-100' :
                event.type === 'crisis' ? 'bg-red-100' :
                event.type === 'observation' ? 'bg-blue-100' : 'bg-yellow-100'
              }`}>
                {event.type === 'achievement' ? <Star className="w-5 h-5 text-green-600" /> :
                 event.type === 'crisis' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                 <Bell className="w-5 h-5 text-blue-600" />}
              </div>
              {index < events.length - 1 && (
                <div className="w-0.5 flex-1 bg-gray-200 my-2" />
              )}
            </div>

            {/* Event Card */}
            <div className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {event.reportedBy === 'school' ? 'Escola' : event.reportedBy === 'family' ? 'Familia' : 'Clinica'}
                    {event.reporterName && ` - ${event.reporterName}`}
                  </p>
                </div>
                <span className="text-sm text-gray-400">{event.date.split('-').reverse().join('/')}</span>
              </div>
              <p className="text-gray-600 mb-3">{event.description}</p>
              {event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MensagensTab({ messages: msgs }: { messages: typeof messages }) {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const selectedMsg = msgs.find(m => m.id === selectedMessage)

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
      {/* Message List */}
      <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Mensagens</h3>
          <p className="text-sm text-gray-500">{msgs.filter(m => !m.read).length} nao lidas</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {msgs.map((msg) => (
            <button
              key={msg.id}
              onClick={() => setSelectedMessage(msg.id)}
              className={`w-full p-4 text-left border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selectedMessage === msg.id ? 'bg-[#fd74fd]/5' : ''
              } ${!msg.read ? 'bg-[#7af7f7]/5' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  msg.fromRole === 'school' ? 'bg-blue-100' : 
                  msg.fromRole === 'clinic' ? 'bg-green-100' : 'bg-[#fd74fd]/20'
                }`}>
                  <User className={`w-5 h-5 ${
                    msg.fromRole === 'school' ? 'text-blue-600' : 
                    msg.fromRole === 'clinic' ? 'text-green-600' : 'text-[#fd74fd]'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium truncate ${!msg.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {msg.from}
                    </span>
                    {!msg.read && <span className="w-2 h-2 bg-[#fd74fd] rounded-full" />}
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">{msg.subject}</p>
                  <p className="text-xs text-gray-500 truncate">{msg.preview}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        {selectedMsg ? (
          <>
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedMsg.fromRole === 'school' ? 'bg-blue-100' : 
                    selectedMsg.fromRole === 'clinic' ? 'bg-green-100' : 'bg-[#fd74fd]/20'
                  }`}>
                    <User className={`w-6 h-6 ${
                      selectedMsg.fromRole === 'school' ? 'text-blue-600' : 
                      selectedMsg.fromRole === 'clinic' ? 'text-green-600' : 'text-[#fd74fd]'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{selectedMsg.from}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedMsg.fromRole === 'school' ? 'Escola' : 
                       selectedMsg.fromRole === 'clinic' ? 'Clinica' : 'Familia'}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(selectedMsg.date).toLocaleDateString('pt-BR')} - {new Date(selectedMsg.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{selectedMsg.subject}</h2>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              <p className="text-gray-700 whitespace-pre-wrap">{selectedMsg.content}</p>
            </div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Digite sua resposta..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#fd74fd] focus:border-transparent outline-none"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white rounded-xl font-medium hover:shadow-lg transition-all">
                  Enviar
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Selecione uma mensagem para ler</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function EvolucaoTab({ child }: { child: typeof patients[0] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Evolucao do Desenvolvimento</h2>
        <p className="text-gray-500">Acompanhe o progresso de {child.name} ao longo do tempo</p>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900">Grafico de Evolucao</h3>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
            <option>Ultimos 6 meses</option>
            <option>Ultimo ano</option>
            <option>Todo o periodo</option>
          </select>
        </div>
        <div className="h-80">
          <ProgressChart data={child.progress} />
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <LegendItem color="#fd74fd" label="Comunicacao" />
          <LegendItem color="#7af7f7" label="Social" />
          <LegendItem color="#fff48d" label="Sensorial" />
          <LegendItem color="#a78bfa" label="Comportamental" />
        </div>
      </div>

      {/* Area Breakdowns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Comunicacao', current: child.progress[child.progress.length - 1].communication, color: '#fd74fd' },
          { name: 'Social', current: child.progress[child.progress.length - 1].social, color: '#7af7f7' },
          { name: 'Sensorial', current: child.progress[child.progress.length - 1].sensory, color: '#fff48d' },
          { name: 'Comportamental', current: child.progress[child.progress.length - 1].behavior, color: '#a78bfa' },
        ].map((area) => (
          <div key={area.name} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">{area.name}</span>
              <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                +{area.current - child.progress[0][area.name.toLowerCase() as keyof typeof child.progress[0]]}%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{area.current}%</div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{ width: `${area.current}%`, backgroundColor: area.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Therapies & Medications */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Therapies */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Terapias Ativas</h3>
          <div className="space-y-3">
            {child.therapies.filter(t => t.status === 'active').map((therapy) => (
              <div key={therapy.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fd74fd]/20 to-[#7af7f7]/20 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#fd74fd]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{therapy.type}</p>
                  <p className="text-sm text-gray-500">{therapy.professional} - {therapy.frequency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Medicacoes</h3>
          {child.medications.length > 0 ? (
            <div className="space-y-3">
              {child.medications.map((med) => (
                <div key={med.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fff48d]/30 to-[#fd74fd]/20 flex items-center justify-center">
                    <Pill className="w-5 h-5 text-[#fd74fd]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{med.name} - {med.dosage}</p>
                    <p className="text-sm text-gray-500">{med.frequency} as {med.time.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Pill className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Nenhuma medicacao registrada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper Components
function StatCard({ title, value, icon: Icon, color, trend }: { title: string; value: string; icon: typeof TrendingUp; color: string; trend: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xs text-green-600 mt-1">{trend}</p>
    </div>
  )
}

function ProgressChart({ data }: { data: typeof patients[0]['progress'] }) {
  const maxValue = 100
  
  return (
    <div className="w-full h-full flex items-end justify-between gap-2 px-4">
      {data.map((point, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex gap-0.5 h-full items-end">
            <div 
              className="flex-1 bg-[#fd74fd] rounded-t-sm transition-all hover:opacity-80"
              style={{ height: `${(point.communication / maxValue) * 100}%` }}
              title={`Comunicacao: ${point.communication}%`}
            />
            <div 
              className="flex-1 bg-[#7af7f7] rounded-t-sm transition-all hover:opacity-80"
              style={{ height: `${(point.social / maxValue) * 100}%` }}
              title={`Social: ${point.social}%`}
            />
            <div 
              className="flex-1 bg-[#fff48d] rounded-t-sm transition-all hover:opacity-80"
              style={{ height: `${(point.sensory / maxValue) * 100}%` }}
              title={`Sensorial: ${point.sensory}%`}
            />
            <div 
              className="flex-1 bg-[#a78bfa] rounded-t-sm transition-all hover:opacity-80"
              style={{ height: `${(point.behavior / maxValue) * 100}%` }}
              title={`Comportamento: ${point.behavior}%`}
            />
          </div>
          <span className="text-xs text-gray-500">{point.month}</span>
        </div>
      ))}
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  )
}
