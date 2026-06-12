'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { 
  Calendar, MessageSquare, Bell, Users, CheckCircle2, Clock, 
  TrendingUp, Building2, AlertTriangle, ChevronRight, Download,
  FileText, Home, Settings, Menu, X, MapPin, Activity,
  BarChart3, PieChart, Filter, Search, ArrowUpRight, ArrowDownRight,
  Briefcase, GraduationCap, Stethoscope, ClipboardList
} from 'lucide-react'
import { managementStats, schools, patients, laudos, userProfiles } from '@/lib/mock-data'

type GestaoTab = 'inicio' | 'indicadores' | 'unidades' | 'relatorios' | 'configuracoes'

export default function GestaoDashboard() {
  const [activeTab, setActiveTab] = useState<GestaoTab>('inicio')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  
  const profile = userProfiles.management
  const stats = managementStats.municipal

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  const tabs = [
    { id: 'inicio' as GestaoTab, label: 'Painel', icon: Home },
    { id: 'indicadores' as GestaoTab, label: 'Indicadores', icon: BarChart3 },
    { id: 'unidades' as GestaoTab, label: 'Unidades', icon: Building2 },
    { id: 'relatorios' as GestaoTab, label: 'Relatorios', icon: FileText },
    { id: 'configuracoes' as GestaoTab, label: 'Config', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#e8fafa]">
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-slate-600 to-slate-800 flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
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
            <GestaoSidebar profile={profile} stats={stats} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-slate-900 text-white flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/logo.png" alt="NeuroConecta" width={40} height={40} />
            <div>
              <span className="font-bold text-lg">
                <span className="text-[#fd74fd]">Neuro</span>
                <span className="text-[#7af7f7]">Conecta</span>
              </span>
              <p className="text-xs text-slate-400">Portal de Gestao</p>
            </div>
          </div>
        </div>
        <GestaoSidebar profile={profile} stats={stats} />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Painel de Gestao
            </h1>
            <p className="text-gray-500">{profile.department}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none w-64"
              />
            </div>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link href="/" className="text-sm text-gray-500 hover:text-slate-900 transition-colors">
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
                    ? 'bg-slate-900 text-white shadow-lg'
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
          {activeTab === 'inicio' && <InicioTab stats={stats} />}
          {activeTab === 'indicadores' && <IndicadoresTab stats={stats} />}
          {activeTab === 'unidades' && <UnidadesTab schools={schools} />}
          {activeTab === 'relatorios' && <RelatoriosTab stats={stats} />}
          {activeTab === 'configuracoes' && <ConfiguracoesTab />}
        </div>
      </main>
    </div>
  )
}

function GestaoSidebar({ profile, stats }: { profile: typeof userProfiles.management; stats: typeof managementStats.municipal }) {
  return (
    <>
      {/* Key Metrics */}
      <div className="p-6 flex-1">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Metricas Principais</h4>
        <div className="space-y-3">
          <SidebarMetric icon={Users} label="Pacientes Ativos" value={stats.activePatients.toLocaleString()} trend="+12%" positive />
          <SidebarMetric icon={Clock} label="Lista de Espera" value={stats.waitingList.toString()} trend="-8%" positive />
          <SidebarMetric icon={Building2} label="Unidades Ativas" value={stats.clinicsActive.toString()} />
          <SidebarMetric icon={GraduationCap} label="Escolas Cobertas" value={stats.schoolsCovered.toString()} />
          <SidebarMetric icon={Stethoscope} label="Profissionais" value={stats.professionalsActive.toString()} />
        </div>

        {/* Quick Actions */}
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-4">Acoes Rapidas</h4>
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-left">
            <FileText className="w-4 h-4 text-[#7af7f7]" />
            <span className="text-sm">Gerar Relatorio</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-left">
            <Download className="w-4 h-4 text-[#fd74fd]" />
            <span className="text-sm">Exportar Dados</span>
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] flex items-center justify-center">
            <span className="text-white font-bold">{profile.name.split(' ')[1]?.charAt(0) || 'R'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-white truncate">{profile.name}</p>
            <p className="text-xs text-slate-400">{profile.role}</p>
          </div>
        </div>
      </div>
    </>
  )
}

function SidebarMetric({ icon: Icon, label, value, trend, positive }: { 
  icon: typeof Users; 
  label: string; 
  value: string; 
  trend?: string;
  positive?: boolean 
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800">
      <div className="p-2 rounded-lg bg-slate-700">
        <Icon className="w-4 h-4 text-[#7af7f7]" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-400">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-bold text-white">{value}</p>
          {trend && (
            <span className={`text-xs flex items-center ${positive ? 'text-green-400' : 'text-red-400'}`}>
              {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function InicioTab({ stats }: { stats: typeof managementStats.municipal }) {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total de Pacientes" 
          value={stats.totalPatients.toLocaleString()} 
          icon={Users} 
          color="bg-gradient-to-br from-[#7af7f7] to-[#5ed4d4]"
          change="+67 este mes"
          positive
        />
        <StatCard 
          title="Lista de Espera" 
          value={stats.waitingList.toString()} 
          icon={Clock} 
          color="bg-gradient-to-br from-[#fd74fd] to-[#ff9efc]"
          change="-12 esta semana"
          positive
        />
        <StatCard 
          title="Tempo Medio Espera" 
          value={`${stats.avgWaitTime} dias`} 
          icon={Activity} 
          color="bg-gradient-to-br from-[#fff48d] to-[#ffd93d]"
          change="-5 dias"
          positive
        />
        <StatCard 
          title="Taxa de Cobertura" 
          value="78%" 
          icon={MapPin} 
          color="bg-gradient-to-br from-[#a78bfa] to-[#c4b5fd]"
          change="+3%"
          positive
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Evolution Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Evolucao de Atendimentos</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
              <option>Ultimos 7 meses</option>
              <option>Ultimo ano</option>
            </select>
          </div>
          <div className="h-64">
            <EvolutionChart data={stats.monthlyEvolution} />
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <LegendItem color="#7af7f7" label="Pacientes" />
            <LegendItem color="#fd74fd" label="Eventos" />
            <LegendItem color="#fff48d" label="Sessoes" />
          </div>
        </div>

        {/* Diagnosis Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-6">Distribuicao por Diagnostico</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <PieChartVisual data={stats.diagnosisDistribution} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {stats.diagnosisDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ 
                  backgroundColor: ['#7af7f7', '#fd74fd', '#fff48d', '#a78bfa'][i] 
                }} />
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-bold text-gray-900 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Age Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Distribuicao por Idade</h3>
          <div className="space-y-3">
            {stats.ageDistribution.map((age, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{age.range} anos</span>
                  <span className="font-medium text-gray-900">{age.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#7af7f7] to-[#fd74fd] rounded-full"
                    style={{ width: `${(age.count / Math.max(...stats.ageDistribution.map(a => a.count))) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Region Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Distribuicao por Regiao</h3>
          <div className="space-y-3">
            {stats.regionDistribution.map((region, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{region.region}</p>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(region.patients / Math.max(...stats.regionDistribution.map(r => r.patients))) * 100}%`,
                        backgroundColor: ['#7af7f7', '#fd74fd', '#fff48d', '#a78bfa', '#4ade80'][i]
                      }}
                    />
                  </div>
                </div>
                <span className="font-bold text-gray-900">{region.patients}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Acoes Pendentes</h3>
          <div className="space-y-3">
            {[
              { label: 'Laudos para revisao', count: 12, color: 'bg-red-100 text-red-700' },
              { label: 'Relatorios pendentes', count: 5, color: 'bg-yellow-100 text-yellow-700' },
              { label: 'Solicitacoes de vaga', count: 23, color: 'bg-blue-100 text-blue-700' },
              { label: 'Avaliacoes agendadas', count: 8, color: 'bg-green-100 text-green-700' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                <span className="text-gray-700">{item.label}</span>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${item.color}`}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function IndicadoresTab({ stats }: { stats: typeof managementStats.municipal }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Indicadores de Desempenho</h2>
          <p className="text-gray-500">Acompanhe as metricas da rede de atendimento</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white">
            <option>Janeiro 2024</option>
            <option>Dezembro 2023</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Taxa de Adesao', value: '87%', target: '85%', status: 'above' },
          { label: 'Satisfacao Familias', value: '4.6/5', target: '4.5', status: 'above' },
          { label: 'Tempo Medio Laudo', value: '32 dias', target: '30 dias', status: 'below' },
          { label: 'Cobertura Escolar', value: '78%', target: '80%', status: 'below' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">{kpi.label}</p>
            <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                kpi.status === 'above' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {kpi.status === 'above' ? 'Acima da meta' : 'Abaixo da meta'}
              </span>
              <span className="text-xs text-gray-400">Meta: {kpi.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Attendance Rate */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Taxa de Comparecimento</h3>
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {stats.monthlyEvolution.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-[#7af7f7] to-[#fd74fd] rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${70 + Math.random() * 25}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Efficiency Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Metricas de Eficiencia</h3>
          <div className="space-y-4">
            {[
              { label: 'Utilizacao de Capacidade', value: 82 },
              { label: 'Resolucao no 1o Atendimento', value: 65 },
              { label: 'Encaminhamentos Efetivos', value: 91 },
              { label: 'Satisfacao da Equipe', value: 78 },
            ].map((metric, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <span className="text-sm font-bold text-gray-900">{metric.value}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${metric.value}%`,
                      background: metric.value >= 80 ? 'linear-gradient(to right, #7af7f7, #5ed4d4)' : 
                                 metric.value >= 60 ? 'linear-gradient(to right, #fff48d, #ffd93d)' :
                                 'linear-gradient(to right, #fd74fd, #ff9efc)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function UnidadesTab({ schools }: { schools: typeof import('@/lib/mock-data').schools }) {
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredSchools = selectedType === 'all' ? schools : schools.filter(s => s.type === selectedType)

  // Mock clinics data
  const clinics = [
    { id: 'c1', name: 'Clinica NeuroConecta Centro', type: 'clinic', address: 'Rua Central, 100', professionals: 12, patients: 156 },
    { id: 'c2', name: 'Clinica NeuroConecta Norte', type: 'clinic', address: 'Av. Norte, 500', professionals: 8, patients: 98 },
    { id: 'c3', name: 'UBS Vila Nova', type: 'ubs', address: 'Rua Vila Nova, 200', professionals: 5, patients: 67 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Unidades de Atendimento</h2>
          <p className="text-gray-500">Gerencie escolas, clinicas e UBS da rede</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl bg-white"
          >
            <option value="all">Todas as unidades</option>
            <option value="municipal">Escolas Municipais</option>
            <option value="estadual">Escolas Estaduais</option>
            <option value="particular">Escolas Particulares</option>
            <option value="clinic">Clinicas</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#7af7f7]/20 to-[#7af7f7]/5 rounded-2xl p-5 border border-[#7af7f7]/30">
          <GraduationCap className="w-8 h-8 text-[#7af7f7] mb-2" />
          <p className="text-2xl font-bold text-gray-900">{schools.length}</p>
          <p className="text-sm text-gray-500">Escolas</p>
        </div>
        <div className="bg-gradient-to-br from-[#fd74fd]/20 to-[#fd74fd]/5 rounded-2xl p-5 border border-[#fd74fd]/30">
          <Stethoscope className="w-8 h-8 text-[#fd74fd] mb-2" />
          <p className="text-2xl font-bold text-gray-900">{clinics.length}</p>
          <p className="text-sm text-gray-500">Clinicas</p>
        </div>
        <div className="bg-gradient-to-br from-[#fff48d]/20 to-[#fff48d]/5 rounded-2xl p-5 border border-[#fff48d]/30">
          <Users className="w-8 h-8 text-[#ffd93d] mb-2" />
          <p className="text-2xl font-bold text-gray-900">89</p>
          <p className="text-sm text-gray-500">Profissionais</p>
        </div>
      </div>

      {/* Schools List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Escolas Cadastradas</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {filteredSchools.map((school) => (
            <div key={school.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7af7f7]/20 to-[#fd74fd]/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[#7af7f7]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{school.name}</h4>
                  <p className="text-sm text-gray-500">{school.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{school.neurodivergenteStudents}</p>
                  <p className="text-xs text-gray-500">alunos neuro</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{school.totalStudents}</p>
                  <p className="text-xs text-gray-500">total</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  school.type === 'municipal' ? 'bg-blue-100 text-blue-700' :
                  school.type === 'particular' ? 'bg-purple-100 text-purple-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {school.type === 'municipal' ? 'Municipal' : school.type === 'particular' ? 'Particular' : school.type}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinics List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Clinicas e UBS</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {clinics.map((clinic) => (
            <div key={clinic.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#fd74fd]/20 to-[#fff48d]/20 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-[#fd74fd]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{clinic.name}</h4>
                  <p className="text-sm text-gray-500">{clinic.address}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{clinic.professionals}</p>
                  <p className="text-xs text-gray-500">profissionais</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{clinic.patients}</p>
                  <p className="text-xs text-gray-500">pacientes</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  clinic.type === 'clinic' ? 'bg-[#fd74fd]/20 text-[#fd74fd]' : 'bg-[#7af7f7]/20 text-[#5ed4d4]'
                }`}>
                  {clinic.type === 'clinic' ? 'Clinica' : 'UBS'}
                </span>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function RelatoriosTab({ stats }: { stats: typeof managementStats.municipal }) {
  const reports = [
    { id: 'r1', title: 'Relatorio Mensal - Janeiro 2024', type: 'monthly', date: '2024-01-31', status: 'ready' },
    { id: 'r2', title: 'Relatorio de Atendimentos - Semana 4', type: 'weekly', date: '2024-01-28', status: 'ready' },
    { id: 'r3', title: 'Indicadores de Desempenho - 4T 2023', type: 'quarterly', date: '2024-01-15', status: 'ready' },
    { id: 'r4', title: 'Relatorio Anual 2023', type: 'annual', date: '2024-01-10', status: 'ready' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Central de Relatorios</h2>
          <p className="text-gray-500">Gere e exporte relatorios da rede</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
          <FileText className="w-4 h-4" />
          Novo Relatorio
        </button>
      </div>

      {/* Report Templates */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Relatorio Geral', desc: 'Visao completa da rede', icon: ClipboardList, color: 'from-[#7af7f7] to-[#5ed4d4]' },
          { title: 'Indicadores', desc: 'KPIs e metricas', icon: BarChart3, color: 'from-[#fd74fd] to-[#ff9efc]' },
          { title: 'Financeiro', desc: 'Custos e orcamento', icon: Briefcase, color: 'from-[#fff48d] to-[#ffd93d]' },
          { title: 'Personalizado', desc: 'Crie seu relatorio', icon: Settings, color: 'from-[#a78bfa] to-[#c4b5fd]' },
        ].map((template, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center mb-4`}>
              <template.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{template.title}</h3>
            <p className="text-sm text-gray-500">{template.desc}</p>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Relatorios Recentes</h3>
          <button className="text-sm text-[#7af7f7] font-medium hover:underline">Ver todos</button>
        </div>
        <div className="divide-y divide-gray-100">
          {reports.map((report) => (
            <div key={report.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <FileText className="w-5 h-5 text-slate-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{report.title}</h4>
                <p className="text-sm text-gray-500">Gerado em {report.date.split('-').reverse().join('/')}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                report.type === 'monthly' ? 'bg-blue-100 text-blue-700' :
                report.type === 'weekly' ? 'bg-green-100 text-green-700' :
                report.type === 'quarterly' ? 'bg-purple-100 text-purple-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {report.type === 'monthly' ? 'Mensal' : 
                 report.type === 'weekly' ? 'Semanal' :
                 report.type === 'quarterly' ? 'Trimestral' : 'Anual'}
              </span>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Baixar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ConfiguracoesTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configuracoes</h2>
        <p className="text-gray-500">Gerencie as configuracoes do sistema</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Configuracoes Gerais</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Secretaria</label>
              <input
                type="text"
                defaultValue="Secretaria Municipal de Saude"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contato</label>
              <input
                type="email"
                defaultValue="saude.mental@prefeitura.gov.br"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="tel"
                defaultValue="(11) 3333-4444"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#7af7f7] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Notificacoes</h3>
          <div className="space-y-4">
            {[
              { label: 'Alertas de Lista de Espera', desc: 'Receber quando lista exceder limite', enabled: true },
              { label: 'Relatorios Automaticos', desc: 'Enviar relatorios semanais por email', enabled: true },
              { label: 'Novos Cadastros', desc: 'Notificar novos pacientes', enabled: false },
              { label: 'Eventos Criticos', desc: 'Alertas de crises e emergencias', enabled: true },
            ].map((notif, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">{notif.label}</p>
                  <p className="text-sm text-gray-500">{notif.desc}</p>
                </div>
                <button className={`w-12 h-6 rounded-full transition-colors ${
                  notif.enabled ? 'bg-[#7af7f7]' : 'bg-gray-300'
                }`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    notif.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">
          Salvar Alteracoes
        </button>
      </div>
    </div>
  )
}

// Helper Components
function StatCard({ title, value, icon: Icon, color, change, positive }: { 
  title: string; 
  value: string; 
  icon: typeof Users; 
  color: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className={`flex items-center text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  )
}

function EvolutionChart({ data }: { data: typeof managementStats.municipal.monthlyEvolution }) {
  const maxPatients = Math.max(...data.map(d => d.patients))
  const maxEvents = Math.max(...data.map(d => d.events))
  const maxSessions = Math.max(...data.map(d => d.sessions))
  const maxValue = Math.max(maxPatients, maxEvents / 2, maxSessions / 3)

  return (
    <div className="w-full h-full flex items-end justify-between gap-2 px-2">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex gap-0.5 h-full items-end">
            <div 
              className="flex-1 bg-[#7af7f7] rounded-t-sm"
              style={{ height: `${(item.patients / maxValue) * 100}%` }}
              title={`Pacientes: ${item.patients}`}
            />
            <div 
              className="flex-1 bg-[#fd74fd] rounded-t-sm"
              style={{ height: `${(item.events / 2 / maxValue) * 100}%` }}
              title={`Eventos: ${item.events}`}
            />
            <div 
              className="flex-1 bg-[#fff48d] rounded-t-sm"
              style={{ height: `${(item.sessions / 3 / maxValue) * 100}%` }}
              title={`Sessoes: ${item.sessions}`}
            />
          </div>
          <span className="text-xs text-gray-500">{item.month}</span>
        </div>
      ))}
    </div>
  )
}

function PieChartVisual({ data }: { data: typeof managementStats.municipal.diagnosisDistribution }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const colors = ['#7af7f7', '#fd74fd', '#fff48d', '#a78bfa']
  
  let currentAngle = 0
  const segments = data.map((item, i) => {
    const angle = (item.value / total) * 360
    const segment = { ...item, startAngle: currentAngle, angle, color: colors[i] }
    currentAngle += angle
    return segment
  })

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {segments.map((segment, i) => {
        const startAngle = (segment.startAngle - 90) * (Math.PI / 180)
        const endAngle = (segment.startAngle + segment.angle - 90) * (Math.PI / 180)
        const largeArc = segment.angle > 180 ? 1 : 0
        
        const x1 = 50 + 40 * Math.cos(startAngle)
        const y1 = 50 + 40 * Math.sin(startAngle)
        const x2 = 50 + 40 * Math.cos(endAngle)
        const y2 = 50 + 40 * Math.sin(endAngle)
        
        return (
          <path
            key={i}
            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
            fill={segment.color}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          />
        )
      })}
      <circle cx="50" cy="50" r="25" fill="white" />
      <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-lg font-bold fill-gray-900">
        {total}
      </text>
      <text x="50" y="60" textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-gray-500">
        pacientes
      </text>
    </svg>
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
