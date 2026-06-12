'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { 
  Calendar, MessageSquare, Bell, Users, CheckCircle2, Clock, 
  TrendingUp, BookOpen, AlertTriangle, ChevronRight, Plus,
  FileText, Star, Home, Settings, LogOut, Menu, X, User,
  Search, Filter, GraduationCap, ClipboardList, Eye, Send
} from 'lucide-react'
import { patients, schools, messages, userProfiles, dashboardStats, appointments } from '@/lib/mock-data'

type SchoolTab = 'inicio' | 'alunos' | 'eventos' | 'relatorios' | 'comunicacao'

export default function EscolaDashboard() {
  const [activeTab, setActiveTab] = useState<SchoolTab>('inicio')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const schoolProfile = userProfiles.school
  const school = schools.find(s => s.id === schoolProfile.schoolId)!
  const schoolStudents = patients.filter(p => p.schoolId === schoolProfile.schoolId)
  const stats = dashboardStats.school

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  const tabs = [
    { id: 'inicio' as SchoolTab, label: 'Inicio', icon: Home },
    { id: 'alunos' as SchoolTab, label: 'Alunos', icon: Users },
    { id: 'eventos' as SchoolTab, label: 'Eventos', icon: Bell },
    { id: 'relatorios' as SchoolTab, label: 'Relatorios', icon: FileText },
    { id: 'comunicacao' as SchoolTab, label: 'Comunicacao', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8fafa] via-white to-[#fef9e7]">
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="NeuroConecta" width={32} height={32} />
                <span className="font-bold">
                  <span className="text-[#fd74fd]">Neuro</span>
                  <span className="text-[#7af7f7]">Conecta</span>
                </span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <SchoolSidebar profile={schoolProfile} school={school} students={schoolStudents} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-100 flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png" alt="NeuroConecta" width={40} height={40} />
            <span className="font-bold text-lg">
              <span className="text-[#fd74fd]">Neuro</span>
              <span className="text-[#7af7f7]">Conecta</span>
            </span>
          </div>
        </div>
        <SchoolSidebar profile={schoolProfile} school={school} students={schoolStudents} />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Portal da Escola
            </h1>
            <p className="text-gray-500">{school.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              {stats.activeAlerts > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <Link href="/" className="text-sm text-gray-500 hover:text-[#7af7f7] transition-colors">
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
                    ? 'bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white shadow-lg'
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
          {activeTab === 'inicio' && <InicioTab stats={stats} students={schoolStudents} />}
          {activeTab === 'alunos' && <AlunosTab students={schoolStudents} />}
          {activeTab === 'eventos' && <EventosTab students={schoolStudents} />}
          {activeTab === 'relatorios' && <RelatoriosTab students={schoolStudents} />}
          {activeTab === 'comunicacao' && <ComunicacaoTab students={schoolStudents} />}
        </div>
      </main>
    </div>
  )
}

function SchoolSidebar({ profile, school, students }: { 
  profile: typeof userProfiles.school; 
  school: typeof schools[0];
  students: typeof patients 
}) {
  return (
    <>
      {/* School Info */}
      <div className="p-6 border-b border-gray-100">
        <div className="bg-gradient-to-br from-[#7af7f7]/20 via-[#fd74fd]/10 to-[#fff48d]/20 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7af7f7] to-[#fd74fd] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{school.name}</h3>
              <p className="text-xs text-gray-500">{school.type === 'municipal' ? 'Escola Municipal' : school.type}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-white/80 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-[#7af7f7]">{school.totalStudents}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div className="bg-white/80 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-[#fd74fd]">{school.neurodivergenteStudents}</p>
              <p className="text-xs text-gray-500">Neuro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="p-6 flex-1">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Acesso Rapido</h4>
        <div className="space-y-2">
          {students.slice(0, 4).map((student) => (
            <button key={student.id} className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors text-left">
              <Image src={student.photo} alt={student.name} width={36} height={36} className="rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{student.name}</p>
                <p className="text-xs text-gray-500 truncate">{student.diagnosis.join(', ')}</p>
              </div>
              {student.events.some(e => e.type === 'crisis' && new Date(e.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) && (
                <span className="w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] flex items-center justify-center">
            <span className="text-white font-bold">{profile.name.split(' ')[1]?.charAt(0) || profile.name.charAt(0)}</span>
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

function InicioTab({ stats, students }: { stats: typeof dashboardStats.school; students: typeof patients }) {
  const allEvents = students.flatMap(s => s.events.map(e => ({ ...e, patientName: s.name, patientId: s.id })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Alunos Ativos" 
          value={stats.totalStudents.toString()} 
          icon={Users} 
          color="from-[#7af7f7] to-[#5ed4d4]"
        />
        <StatCard 
          title="Alertas Ativos" 
          value={stats.activeAlerts.toString()} 
          icon={AlertTriangle} 
          color="from-[#fd74fd] to-[#ff9efc]"
          alert={stats.activeAlerts > 0}
        />
        <StatCard 
          title="Eventos Hoje" 
          value={stats.eventsToday.toString()} 
          icon={Bell} 
          color="from-[#fff48d] to-[#fff9c4]"
        />
        <StatCard 
          title="Progresso Medio" 
          value={`${stats.avgProgress}%`} 
          icon={TrendingUp} 
          color="from-[#a78bfa] to-[#c4b5fd]"
        />
      </div>

      {/* Alert Banner */}
      {stats.activeAlerts > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-red-800">Atencao Necessaria</h3>
            <p className="text-sm text-red-600">{stats.activeAlerts} aluno(s) com eventos criticos esta semana</p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
            Ver Detalhes
          </button>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Student Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Progresso dos Alunos</h3>
          <div className="space-y-4">
            {students.map((student) => {
              const avgProgress = Math.round(
                (student.progress[student.progress.length - 1].communication +
                student.progress[student.progress.length - 1].social +
                student.progress[student.progress.length - 1].behavior) / 3
              )
              return (
                <div key={student.id} className="flex items-center gap-4">
                  <Image src={student.photo} alt={student.name} width={40} height={40} className="rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900 truncate">{student.name}</p>
                      <span className="text-sm font-medium text-gray-600">{avgProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] rounded-full"
                        style={{ width: `${avgProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Eventos Recentes</h3>
            <button className="text-sm text-[#7af7f7] font-medium hover:underline">Ver todos</button>
          </div>
          <div className="space-y-3">
            {allEvents.slice(0, 5).map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  event.type === 'achievement' ? 'bg-green-100' :
                  event.type === 'crisis' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {event.type === 'achievement' ? <Star className="w-4 h-4 text-green-600" /> :
                   event.type === 'crisis' ? <AlertTriangle className="w-4 h-4 text-red-600" /> :
                   <Bell className="w-4 h-4 text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.patientName} - {event.date.split('-').reverse().join('/')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Proximas Reunioes</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.filter(a => a.type === 'school-meeting' || a.type === 'team-meeting').slice(0, 3).map((apt) => (
            <div key={apt.id} className="p-4 bg-gradient-to-br from-[#7af7f7]/10 to-[#fd74fd]/10 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#7af7f7]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{apt.date.split('-').reverse().slice(0, 2).join('/')}</p>
                  <p className="text-sm text-gray-500">{apt.time}</p>
                </div>
              </div>
              <p className="font-medium text-gray-900">{apt.patientName}</p>
              <p className="text-sm text-gray-500">{apt.type === 'school-meeting' ? 'Reuniao Escola' : 'Reuniao Equipe'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AlunosTab({ students }: { students: typeof patients }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.diagnosis.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const student = students.find(s => s.id === selectedStudent)

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar aluno por nome ou diagnostico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <Filter className="w-5 h-5 text-gray-500" />
          Filtrar
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="lg:col-span-1 space-y-3">
          {filteredStudents.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStudent(s.id)}
              className={`w-full p-4 bg-white rounded-2xl shadow-sm border transition-all text-left ${
                selectedStudent === s.id ? 'border-[#7af7f7] ring-2 ring-[#7af7f7]/20' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <Image src={s.photo} alt={s.name} width={48} height={48} className="rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.age} anos - {s.teacher}</p>
                </div>
                {s.events.some(e => e.type === 'crisis' && new Date(e.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">Alerta</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {s.diagnosis.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">{d}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Student Detail */}
        <div className="lg:col-span-2">
          {student ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#7af7f7]/20 to-[#fd74fd]/20 p-6">
                <div className="flex items-center gap-4">
                  <Image src={student.photo} alt={student.name} width={80} height={80} className="rounded-2xl ring-4 ring-white shadow-lg" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
                    <p className="text-gray-600">{student.age} anos - {student.diagnosis.join(', ')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {student.status === 'active' ? 'Ativo' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Sensory Profile Summary */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Perfil Sensorial</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(student.sensoryProfile).filter(([key]) => key !== 'lastUpdated').map(([key, value]) => {
                      const v = value as { score: number; level: string }
                      return (
                        <div key={key} className={`p-3 rounded-xl ${
                          v.level === 'hyper' ? 'bg-red-50' : v.level === 'hypo' ? 'bg-blue-50' : 'bg-green-50'
                        }`}>
                          <p className="text-xs text-gray-500 capitalize">{key === 'auditory' ? 'Auditivo' : key === 'visual' ? 'Visual' : key === 'tactile' ? 'Tatil' : key === 'vestibular' ? 'Vestibular' : key === 'proprioceptive' ? 'Proprioceptivo' : 'Gustativo'}</p>
                          <p className={`font-bold ${
                            v.level === 'hyper' ? 'text-red-700' : v.level === 'hypo' ? 'text-blue-700' : 'text-green-700'
                          }`}>
                            {v.level === 'hyper' ? 'Hiper' : v.level === 'hypo' ? 'Hipo' : 'Tipico'}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Recomendacoes da Clinica</h3>
                  <div className="space-y-2">
                    {student.notes.filter(n => n.type === 'recommendation').map((note) => (
                      <div key={note.id} className="p-3 bg-[#fff48d]/20 rounded-xl">
                        <p className="text-gray-700">{note.content}</p>
                        <p className="text-xs text-gray-500 mt-1">{note.author} - {note.date.split('-').reverse().join('/')}</p>
                      </div>
                    ))}
                    {student.notes.filter(n => n.type === 'recommendation').length === 0 && (
                      <p className="text-gray-400 text-sm">Nenhuma recomendacao registrada</p>
                    )}
                  </div>
                </div>

                {/* Recent Events */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Eventos Recentes</h3>
                  <div className="space-y-2">
                    {student.events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          event.type === 'achievement' ? 'bg-green-100' :
                          event.type === 'crisis' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {event.type === 'achievement' ? <Star className="w-4 h-4 text-green-600" /> :
                           event.type === 'crisis' ? <AlertTriangle className="w-4 h-4 text-red-600" /> :
                           <Bell className="w-4 h-4 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.date.split('-').reverse().join('/')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white rounded-xl font-medium hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4" />
                    Registrar Evento
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Mensagem
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-96 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Selecione um aluno para ver os detalhes</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EventosTab({ students }: { students: typeof patients }) {
  const [showNewEvent, setShowNewEvent] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [newEvent, setNewEvent] = useState({
    type: 'observation' as 'observation' | 'achievement' | 'crisis',
    title: '',
    description: ''
  })

  const allEvents = students.flatMap(s => s.events.map(e => ({ ...e, patientName: s.name, patientId: s.id, patientPhoto: s.photo })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Registro de Eventos</h2>
          <p className="text-gray-500">Documente comportamentos, conquistas e observacoes</p>
        </div>
        <button 
          onClick={() => setShowNewEvent(!showNewEvent)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
        >
          {showNewEvent ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showNewEvent ? 'Cancelar' : 'Novo Evento'}
        </button>
      </div>

      {/* New Event Form */}
      {showNewEvent && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Registrar Novo Evento</h3>
          
          {/* Select Student */}
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
          >
            <option value="">Selecione o aluno</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* Event Type */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { id: 'observation', label: 'Observacao', color: 'blue' },
              { id: 'achievement', label: 'Conquista', color: 'green' },
              { id: 'crisis', label: 'Crise', color: 'red' },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setNewEvent({ ...newEvent, type: type.id as 'observation' | 'achievement' | 'crisis' })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  newEvent.type === type.id 
                    ? type.color === 'blue' ? 'border-blue-500 bg-blue-50' :
                      type.color === 'green' ? 'border-green-500 bg-green-50' :
                      'border-red-500 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Titulo do evento"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
          />

          <textarea
            placeholder="Descreva o evento em detalhes..."
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none resize-none"
          />

          <button
            disabled={!selectedStudent || !newEvent.title || !newEvent.description}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            Salvar Evento
          </button>
        </div>
      )}

      {/* Events Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {allEvents.map((event) => (
            <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <Image src={event.patientPhoto} alt={event.patientName} width={40} height={40} className="rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{event.patientName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      event.type === 'achievement' ? 'bg-green-100 text-green-700' :
                      event.type === 'crisis' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {event.type === 'achievement' ? 'Conquista' : event.type === 'crisis' ? 'Crise' : 'Observacao'}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {event.reportedBy === 'school' ? 'Escola' : event.reportedBy === 'family' ? 'Familia' : 'Clinica'} - {event.date.split('-').reverse().join('/')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RelatoriosTab({ students }: { students: typeof patients }) {
  const [selectedStudent, setSelectedStudent] = useState(students[0]?.id || '')
  const student = students.find(s => s.id === selectedStudent)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Relatorios</h2>
          <p className="text-gray-500">Gere relatorios de acompanhamento escolar</p>
        </div>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
        >
          {students.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {student && (
        <>
          {/* Report Types */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Relatorio Semanal', desc: 'Resumo das atividades e comportamentos da semana', icon: ClipboardList },
              { title: 'Relatorio de Progresso', desc: 'Evolucao do aluno nos ultimos meses', icon: TrendingUp },
              { title: 'Relatorio para Familia', desc: 'Comunicacao detalhada para os responsaveis', icon: FileText },
            ].map((report, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7af7f7]/20 to-[#fd74fd]/20 flex items-center justify-center mb-4">
                  <report.icon className="w-6 h-6 text-[#7af7f7]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{report.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{report.desc}</p>
                <button className="text-sm text-[#7af7f7] font-medium hover:underline">Gerar Relatorio</button>
              </div>
            ))}
          </div>

          {/* Quick Report Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Preview do Relatorio - {student.name}</h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4" />
                  Visualizar
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white rounded-lg text-sm hover:shadow-lg transition-all">
                  <Send className="w-4 h-4" />
                  Enviar
                </button>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-2">Relatorio de Acompanhamento Escolar</h4>
                <p className="text-gray-600 mb-4">
                  <strong>Aluno:</strong> {student.name} | <strong>Turma:</strong> {student.teacher} | <strong>Periodo:</strong> Janeiro/2024
                </p>
                
                <h5 className="font-semibold text-gray-900 mt-4 mb-2">Resumo do Periodo</h5>
                <p className="text-gray-600">
                  Durante o periodo avaliado, {student.name} demonstrou {student.events.filter(e => e.type === 'achievement').length > 0 ? 'progressos significativos' : 'desenvolvimento estavel'} em suas atividades escolares.
                  {student.events.filter(e => e.type === 'crisis').length > 0 && ` Foram registrados ${student.events.filter(e => e.type === 'crisis').length} episodio(s) que necessitaram atencao especial.`}
                </p>

                <h5 className="font-semibold text-gray-900 mt-4 mb-2">Eventos Registrados</h5>
                <ul className="list-disc list-inside text-gray-600">
                  {student.events.slice(0, 3).map((e, i) => (
                    <li key={i}>{e.title} ({e.date.split('-').reverse().join('/')})</li>
                  ))}
                </ul>

                <h5 className="font-semibold text-gray-900 mt-4 mb-2">Recomendacoes</h5>
                <p className="text-gray-600">
                  Sugerimos manter as estrategias de apoio sensorial conforme orientacao da equipe clinica, especialmente no que se refere ao perfil sensorial do aluno.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ComunicacaoTab({ students }: { students: typeof patients }) {
  const [recipient, setRecipient] = useState<'clinic' | 'family' | ''>('')
  const [selectedStudent, setSelectedStudent] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Comunicacao</h2>
        <p className="text-gray-500">Envie mensagens para familias e equipe clinica</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* New Message Form */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Nova Mensagem</h3>

          {/* Recipient Type */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => setRecipient('family')}
              className={`p-3 rounded-xl border-2 transition-all ${
                recipient === 'family' ? 'border-[#fd74fd] bg-[#fd74fd]/10' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Users className="w-5 h-5 mx-auto mb-1 text-[#fd74fd]" />
              <span className="text-sm font-medium">Familia</span>
            </button>
            <button
              onClick={() => setRecipient('clinic')}
              className={`p-3 rounded-xl border-2 transition-all ${
                recipient === 'clinic' ? 'border-[#7af7f7] bg-[#7af7f7]/10' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <GraduationCap className="w-5 h-5 mx-auto mb-1 text-[#7af7f7]" />
              <span className="text-sm font-medium">Clinica</span>
            </button>
          </div>

          {/* Select Student */}
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
          >
            <option value="">Selecione o aluno (opcional)</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Assunto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
          />

          <textarea
            placeholder="Escreva sua mensagem..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none resize-none"
          />

          <button
            disabled={!recipient || !subject || !message}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
          >
            Enviar Mensagem
          </button>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Mensagens Recentes</h3>
          <div className="space-y-3">
            {messages.filter(m => m.fromRole === 'school' || m.toRole === 'school').slice(0, 5).map((msg) => (
              <div key={msg.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{msg.fromRole === 'school' ? `Para: ${msg.to}` : `De: ${msg.from}`}</span>
                  <span className="text-xs text-gray-400">{new Date(msg.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{msg.subject}</p>
                <p className="text-xs text-gray-500 truncate">{msg.preview}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color, alert }: { title: string; value: string; icon: typeof TrendingUp; color: string; alert?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border ${alert ? 'border-red-200' : 'border-gray-100'} relative overflow-hidden`}>
      {alert && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 rounded-bl-full" />
      )}
      <div className={`p-2 rounded-xl bg-gradient-to-br ${color} w-fit mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  )
}
