'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Users, Calendar, FileText, MessageSquare, TrendingUp, Bell, Search,
  Settings, LogOut, Menu, X, ChevronRight, Activity, UserPlus, Clock,
  Stethoscope, Brain, Building2, DollarSign, BarChart3, PieChart,
  AlertTriangle, CheckCircle, Filter, Download, Plus, Eye, ArrowUpRight,
  ArrowDownRight, Home
} from 'lucide-react'
import {
  clinicAdminProfile,
  clinicProfessionals,
  patients,
  clinicAdminStats,
  appointments,
  messages,
  laudos,
  recentActivity,
} from '@/lib/mock-data'

type TabType = 'visao-geral' | 'profissionais' | 'pacientes' | 'agenda' | 'laudos' | 'financeiro' | 'relatorios'

export default function ClinicaDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('visao-geral')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { id: 'visao-geral' as TabType, label: 'Visao Geral', icon: Home },
    { id: 'profissionais' as TabType, label: 'Profissionais', icon: Stethoscope },
    { id: 'pacientes' as TabType, label: 'Pacientes', icon: Users },
    { id: 'agenda' as TabType, label: 'Agenda', icon: Calendar },
    { id: 'laudos' as TabType, label: 'Laudos', icon: FileText },
    { id: 'financeiro' as TabType, label: 'Financeiro', icon: DollarSign },
    { id: 'relatorios' as TabType, label: 'Relatorios', icon: BarChart3 },
  ]

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.diagnosis.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredProfessionals = clinicProfessionals.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative">
              <Image src="/logo.png" alt="NeuroConecta" fill className="object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] bg-clip-text text-transparent">
                NeuroConecta
              </h1>
              <p className="text-xs text-slate-500">Gestao Clinica</p>
            </div>
          </div>
        </div>

        {/* Clinic Info */}
        <div className="p-4 mx-4 mt-4 rounded-xl bg-gradient-to-br from-[#fd74fd]/10 to-[#7af7f7]/10 border border-[#7af7f7]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-800 truncate">{clinicAdminProfile.name}</p>
              <p className="text-xs text-slate-500 truncate">{clinicAdminProfile.admin}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#fd74fd]/10 to-[#7af7f7]/10 text-[#fd74fd] border border-[#fd74fd]/20'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-white">
          <Link href="/demo" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Voltar ao Demo</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-100">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100">
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar pacientes, profissionais..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 lg:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#7af7f7] focus:ring-2 focus:ring-[#7af7f7]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#fd74fd] rounded-full" />
              </button>
              <button className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#fd74fd] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {clinicAdminStats.unreadMessages}
                </span>
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <Image
                  src={clinicAdminProfile.photo}
                  alt={clinicAdminProfile.admin}
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-[#7af7f7]/30"
                />
                <div className="hidden md:block">
                  <p className="font-semibold text-sm text-slate-800">{clinicAdminProfile.admin}</p>
                  <p className="text-xs text-slate-500">{clinicAdminProfile.role}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div ref={contentRef} className="p-4 lg:p-8">
          {/* Visao Geral Tab */}
          {activeTab === 'visao-geral' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Pacientes"
                  value={clinicAdminStats.totalPatients}
                  subtitle={`${clinicAdminStats.activePatients} ativos`}
                  icon={Users}
                  color="pink"
                />
                <StatCard
                  title="Profissionais"
                  value={clinicAdminStats.totalProfessionals}
                  subtitle="Ativos na clinica"
                  icon={Stethoscope}
                  color="cyan"
                />
                <StatCard
                  title="Consultas Hoje"
                  value={clinicAdminStats.appointmentsToday}
                  subtitle={`${clinicAdminStats.appointmentsThisWeek} esta semana`}
                  icon={Calendar}
                  color="yellow"
                />
                <StatCard
                  title="Laudos Pendentes"
                  value={clinicAdminStats.pendingLaudos}
                  subtitle="Aguardando revisao"
                  icon={FileText}
                  color="pink"
                />
              </div>

              {/* Revenue and Performance */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-800">Desempenho da Clinica</h3>
                    <select className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm">
                      <option>Ultimos 7 dias</option>
                      <option>Ultimos 30 dias</option>
                      <option>Este mes</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {clinicAdminStats.appointmentsByType.map((item, i) => (
                      <div key={i} className="text-center p-4 rounded-xl bg-slate-50">
                        <p className="text-2xl font-bold text-slate-800">{item.count}</p>
                        <p className="text-sm text-slate-500">{item.type}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">Faturamento Mensal</p>
                        <p className="text-2xl font-bold text-slate-800">
                          R$ {clinicAdminStats.revenue.thisMonth.toLocaleString()}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        clinicAdminStats.revenue.growth > 0 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {clinicAdminStats.revenue.growth > 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {Math.abs(clinicAdminStats.revenue.growth)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Patients by Specialty */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-bold text-lg text-slate-800 mb-6">Pacientes por Especialidade</h3>
                  <div className="space-y-4">
                    {clinicAdminStats.patientsBySpecialty.map((item, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-600">{item.specialty}</span>
                          <span className="text-sm font-semibold text-slate-800">{item.count}</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] rounded-full"
                            style={{ width: `${(item.count / 30) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Professionals Quick View */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg text-slate-800">Profissionais Hoje</h3>
                  <button 
                    onClick={() => setActiveTab('profissionais')}
                    className="text-sm text-[#fd74fd] hover:underline flex items-center gap-1"
                  >
                    Ver todos <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clinicProfessionals.slice(0, 3).map((prof) => (
                    <div key={prof.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                      <Image
                        src={prof.photo}
                        alt={prof.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 truncate">{prof.name}</p>
                        <p className="text-sm text-slate-500 truncate">{prof.specialty}</p>
                        <p className="text-xs text-[#7af7f7]">{prof.appointmentsToday} consultas hoje</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Atividade Recente</h3>
                <div className="space-y-4">
                  {recentActivity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'event' ? 'bg-[#fff48d]/30 text-yellow-600' :
                        activity.type === 'message' ? 'bg-[#7af7f7]/30 text-cyan-600' :
                        activity.type === 'achievement' ? 'bg-green-100 text-green-600' :
                        'bg-[#fd74fd]/30 text-pink-600'
                      }`}>
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-800">{activity.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profissionais Tab */}
          {activeTab === 'profissionais' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Profissionais</h2>
                  <p className="text-slate-500">Gerencie a equipe da clinica</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold hover:shadow-lg transition-all">
                  <UserPlus className="w-5 h-5" />
                  Adicionar Profissional
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProfessionals.map((prof) => (
                  <div key={prof.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={prof.photo}
                          alt={prof.name}
                          width={56}
                          height={56}
                          className="rounded-full ring-2 ring-[#7af7f7]/30"
                        />
                        <div>
                          <h3 className="font-bold text-slate-800">{prof.name}</h3>
                          <p className="text-sm text-slate-500">{prof.specialty}</p>
                          <p className="text-xs text-slate-400">{prof.crm || prof.registro}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prof.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {prof.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-800">{prof.totalPatients}</p>
                        <p className="text-xs text-slate-500">Pacientes</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-800">{prof.appointmentsToday}</p>
                        <p className="text-xs text-slate-500">Consultas hoje</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Link 
                        href={`/dashboard/medico?id=${prof.id}`}
                        className="flex-1 py-2 rounded-xl bg-[#7af7f7]/10 text-[#0d9488] text-sm font-medium text-center hover:bg-[#7af7f7]/20 transition-colors"
                      >
                        Ver Dashboard
                      </Link>
                      <button className="px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <Settings className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pacientes Tab */}
          {activeTab === 'pacientes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Todos os Pacientes</h2>
                  <p className="text-slate-500">{filteredPatients.length} pacientes cadastrados</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors">
                    <Filter className="w-5 h-5" />
                    Filtrar
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors">
                    <Download className="w-5 h-5" />
                    Exportar
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold hover:shadow-lg transition-all">
                    <Plus className="w-5 h-5" />
                    Novo Paciente
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Paciente</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Diagnostico</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Profissional</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Proxima Consulta</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Acoes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPatients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={patient.photo}
                              alt={patient.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                            <div>
                              <p className="font-semibold text-slate-800">{patient.name}</p>
                              <p className="text-sm text-slate-500">{patient.age} anos</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {patient.diagnosis.map((d, i) => (
                              <span key={i} className="px-2 py-1 rounded-full bg-[#7af7f7]/10 text-[#0d9488] text-xs font-medium">
                                {d}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">Dr. Carlos Mendes</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            patient.status === 'active' ? 'bg-green-100 text-green-700' :
                            patient.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {patient.status === 'active' ? 'Ativo' : patient.status === 'pending' ? 'Pendente' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600">{patient.nextSession}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/dashboard/pacientes/${patient.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm text-[#fd74fd] hover:bg-[#fd74fd]/10 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Ver
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Agenda Tab */}
          {activeTab === 'agenda' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Agenda da Clinica</h2>
                  <p className="text-slate-500">Consultas e compromissos de todos os profissionais</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold hover:shadow-lg transition-all">
                  <Plus className="w-5 h-5" />
                  Novo Agendamento
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <h3 className="font-bold text-lg text-slate-800 mb-4">Consultas de Hoje</h3>
                  <div className="space-y-3">
                    {appointments.filter(a => a.date === '2024-01-16').map((apt) => (
                      <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div className="w-16 text-center">
                          <p className="text-lg font-bold text-slate-800">{apt.time}</p>
                          <p className="text-xs text-slate-500">{apt.duration} min</p>
                        </div>
                        <div className="w-px h-12 bg-slate-200" />
                        <Image
                          src={apt.patientPhoto}
                          alt={apt.patientName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{apt.patientName}</p>
                          <p className="text-sm text-slate-500">{apt.type} - {apt.professional}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                          apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {apt.status === 'confirmed' ? 'Confirmado' : apt.status === 'scheduled' ? 'Agendado' : apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Resumo da Semana</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Total de consultas</span>
                        <span className="font-bold text-slate-800">{clinicAdminStats.appointmentsThisWeek}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Confirmadas</span>
                        <span className="font-bold text-green-600">89</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Pendentes</span>
                        <span className="font-bold text-yellow-600">18</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Canceladas</span>
                        <span className="font-bold text-red-600">5</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="font-bold text-lg text-slate-800 mb-4">Por Profissional</h3>
                    <div className="space-y-3">
                      {clinicProfessionals.slice(0, 4).map((prof) => (
                        <div key={prof.id} className="flex items-center gap-3">
                          <Image
                            src={prof.photo}
                            alt={prof.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-800">{prof.name.split(' ').slice(0, 2).join(' ')}</p>
                          </div>
                          <span className="text-sm font-semibold text-[#7af7f7]">{prof.appointmentsToday}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Laudos Tab */}
          {activeTab === 'laudos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Laudos e Documentos</h2>
                  <p className="text-slate-500">Gerencie todos os laudos da clinica</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">3</p>
                      <p className="text-sm text-slate-500">Rascunhos</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">5</p>
                      <p className="text-sm text-slate-500">Em revisao</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">24</p>
                      <p className="text-sm text-slate-500">Aprovados</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fd74fd]/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#fd74fd]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">32</p>
                      <p className="text-sm text-slate-500">Total</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Paciente</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Tipo</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Profissional</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">CID-10</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">Atualizado</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-slate-600">Acoes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {laudos.map((laudo) => (
                      <tr key={laudo.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800">{laudo.patientName}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs">
                            {laudo.type === 'diagnostic' ? 'Diagnostico' : laudo.type === 'school' ? 'Escolar' : laudo.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{laudo.professional}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {laudo.cid10.map((cid, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-[#7af7f7]/10 text-[#0d9488] text-xs font-mono">
                                {cid}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            laudo.status === 'approved' ? 'bg-green-100 text-green-700' :
                            laudo.status === 'pending-review' ? 'bg-blue-100 text-blue-700' :
                            laudo.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-slate-100 text-slate-500'
                          }`}>
                            {laudo.status === 'approved' ? 'Aprovado' : 
                             laudo.status === 'pending-review' ? 'Em revisao' :
                             laudo.status === 'draft' ? 'Rascunho' : laudo.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{laudo.updatedAt}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="px-3 py-1.5 rounded-lg text-sm text-[#fd74fd] hover:bg-[#fd74fd]/10 transition-colors">
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Financeiro Tab */}
          {activeTab === 'financeiro' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Financeiro</h2>
                  <p className="text-slate-500">Acompanhe o faturamento da clinica</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-[#fd74fd] to-[#7af7f7] rounded-2xl p-6 text-white">
                  <p className="text-white/80 text-sm">Faturamento do Mes</p>
                  <p className="text-3xl font-bold mt-2">R$ {clinicAdminStats.revenue.thisMonth.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-sm">{clinicAdminStats.revenue.growth}% vs mes anterior</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-sm">Mes Anterior</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">R$ {clinicAdminStats.revenue.lastMonth.toLocaleString()}</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-sm">Ticket Medio</p>
                  <p className="text-3xl font-bold text-slate-800 mt-2">R$ 350</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg text-slate-800 mb-6">Faturamento por Profissional</h3>
                <div className="space-y-4">
                  {clinicProfessionals.map((prof, i) => (
                    <div key={prof.id} className="flex items-center gap-4">
                      <Image
                        src={prof.photo}
                        alt={prof.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{prof.name}</p>
                        <p className="text-sm text-slate-500">{prof.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">R$ {(30000 - i * 3500).toLocaleString()}</p>
                        <p className="text-xs text-slate-500">{prof.appointmentsToday * 20} atendimentos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Relatorios Tab */}
          {activeTab === 'relatorios' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Relatorios</h2>
                  <p className="text-slate-500">Analise o desempenho da clinica</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white font-semibold hover:shadow-lg transition-all">
                  <Download className="w-5 h-5" />
                  Exportar Relatorio
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Relatorio Mensal', description: 'Resumo de atendimentos e faturamento', icon: BarChart3 },
                  { title: 'Evolucao de Pacientes', description: 'Progresso terapeutico agregado', icon: TrendingUp },
                  { title: 'Produtividade', description: 'Metricas por profissional', icon: Activity },
                  { title: 'Indicadores de Qualidade', description: 'NPS e satisfacao', icon: CheckCircle },
                  { title: 'Relatorio de Laudos', description: 'Status e tempo de entrega', icon: FileText },
                  { title: 'Dashboard Executivo', description: 'Visao geral para diretoria', icon: PieChart },
                ].map((report, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd]/10 to-[#7af7f7]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <report.icon className="w-6 h-6 text-[#fd74fd]" />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-1">{report.title}</h3>
                    <p className="text-sm text-slate-500">{report.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, subtitle, icon: Icon, color }: {
  title: string
  value: number | string
  subtitle: string
  icon: React.ElementType
  color: 'pink' | 'cyan' | 'yellow'
}) {
  const colorClasses = {
    pink: 'from-[#fd74fd]/10 to-[#fd74fd]/5 border-[#fd74fd]/20',
    cyan: 'from-[#7af7f7]/10 to-[#7af7f7]/5 border-[#7af7f7]/20',
    yellow: 'from-[#fff48d]/20 to-[#fff48d]/5 border-[#fff48d]/40',
  }
  const iconColorClasses = {
    pink: 'bg-[#fd74fd]/20 text-[#fd74fd]',
    cyan: 'bg-[#7af7f7]/20 text-[#0d9488]',
    yellow: 'bg-[#fff48d]/40 text-yellow-600',
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl p-5 border`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
          <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl ${iconColorClasses[color]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
