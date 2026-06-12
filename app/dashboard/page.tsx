'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import Image from 'next/image'
import { useDashboard } from '@/lib/dashboard-context'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { dashboardStats, recentActivity } from '@/lib/mock-data'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Users,
  Calendar,
  MessageSquare,
  FileText,
  Bell,
  Mail,
  Star,
  TrendingUp,
  Clock,
  ArrowRight,
  Activity,
  Brain,
  Heart,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

const weeklyData = [
  { day: 'Seg', consultas: 6, eventos: 8 },
  { day: 'Ter', consultas: 8, eventos: 12 },
  { day: 'Qua', consultas: 5, eventos: 6 },
  { day: 'Qui', consultas: 7, eventos: 10 },
  { day: 'Sex', consultas: 9, eventos: 15 },
  { day: 'Sab', consultas: 3, eventos: 4 },
]

const progressData = [
  { month: 'Set', value: 45 },
  { month: 'Out', value: 52 },
  { month: 'Nov', value: 58 },
  { month: 'Dez', value: 65 },
  { month: 'Jan', value: 72 },
]

export default function DashboardPage() {
  const { patients, messages, appointments } = useDashboard()
  const cardsRef = useRef<HTMLDivElement>(null)
  
  const todayAppointments = appointments.filter(a => {
    const today = new Date().toISOString().split('T')[0]
    return a.date === '2024-01-22' // Mock today
  })

  const unreadMessages = messages.filter(m => !m.read).length
  const urgentMessages = messages.filter(m => m.priority === 'urgent' && !m.read).length

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.stat-card')
      gsap.fromTo(cards, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Bom dia, Dr. Carlos!
            </h1>
            <p className="text-gray-500 mt-1">
              Voce tem {todayAppointments.length} consultas hoje e {unreadMessages} mensagens nao lidas.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/dashboard/agenda">
                <Calendar className="w-4 h-4 mr-2" />
                Ver Agenda
              </Link>
            </Button>
            <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white hover:opacity-90" asChild>
              <Link href="/dashboard/pacientes">
                <Users className="w-4 h-4 mr-2" />
                Novo Paciente
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="stat-card border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pacientes Ativos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardStats.activePatients}</p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +5 este mes
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#fd74fd]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#fd74fd]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Consultas Hoje</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardStats.appointmentsToday}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {dashboardStats.appointmentsThisWeek} esta semana
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#7af7f7]/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#7af7f7]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Mensagens</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{unreadMessages}</p>
                  {urgentMessages > 0 && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <Bell className="w-3 h-3" />
                      {urgentMessages} urgente(s)
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#fff48d]/30 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Eventos Semana</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{dashboardStats.eventsThisWeek}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {dashboardStats.reportsToReview} relatorios
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Overview */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Visao Semanal</CardTitle>
                <CardDescription>Consultas e eventos por dia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                        }} 
                      />
                      <Bar dataKey="consultas" fill="#fd74fd" radius={[4, 4, 0, 0]} name="Consultas" />
                      <Bar dataKey="eventos" fill="#7af7f7" radius={[4, 4, 0, 0]} name="Eventos" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Progress Chart */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Progresso Medio dos Pacientes</CardTitle>
                <CardDescription>Evolucao geral nos ultimos meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          borderRadius: '12px', 
                          border: 'none', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#fd74fd" 
                        strokeWidth={3}
                        dot={{ fill: '#fd74fd', strokeWidth: 2, r: 4 }}
                        name="Progresso (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Appointments */}
          <div className="space-y-6">
            {/* Today's Appointments */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Consultas de Hoje</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard/agenda" className="text-[#fd74fd]">
                      Ver todas
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {appointments.slice(0, 4).map((apt) => (
                  <div 
                    key={apt.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <Image
                      src={apt.patientPhoto}
                      alt={apt.patientName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-gray-900 truncate">{apt.patientName}</p>
                      <p className="text-xs text-gray-500">{apt.time} - {apt.duration}min</p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={`text-xs ${
                        apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {apt.status === 'confirmed' ? 'Confirmado' : 
                       apt.status === 'scheduled' ? 'Agendado' : apt.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Atividade Recente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                        ${activity.type === 'event' ? 'bg-purple-100 text-purple-600' :
                          activity.type === 'message' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'appointment' ? 'bg-green-100 text-green-600' :
                          activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'}
                      `}>
                        {activity.type === 'event' && <Bell className="w-4 h-4" />}
                        {activity.type === 'message' && <Mail className="w-4 h-4" />}
                        {activity.type === 'appointment' && <Calendar className="w-4 h-4" />}
                        {activity.type === 'report' && <FileText className="w-4 h-4" />}
                        {activity.type === 'achievement' && <Star className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700">{activity.message}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-[#fd74fd]/5 to-[#7af7f7]/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Acoes Rapidas</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/dashboard/pacientes">
                    <Users className="w-4 h-4 mr-2" />
                    Pacientes
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/dashboard/perfil-sensorial">
                    <Brain className="w-4 h-4 mr-2" />
                    Perfil Sensorial
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/dashboard/eventos">
                    <Activity className="w-4 h-4 mr-2" />
                    Eventos
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="justify-start" asChild>
                  <Link href="/dashboard/laudos">
                    <FileText className="w-4 h-4 mr-2" />
                    Laudos
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patients Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Pacientes em Destaque</CardTitle>
                <CardDescription>Pacientes que precisam de atencao esta semana</CardDescription>
              </div>
              <Button variant="outline" asChild>
                <Link href="/dashboard/pacientes">
                  Ver todos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {patients.slice(0, 3).map((patient) => (
                <Link
                  key={patient.id}
                  href={`/dashboard/pacientes/${patient.id}`}
                  className="block p-4 rounded-xl border border-gray-100 hover:border-[#fd74fd]/30 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={patient.photo}
                      alt={patient.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <p className="text-sm text-gray-500">{patient.age} anos</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {patient.diagnosis.map((d, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-[#fd74fd]/10 text-[#fd74fd]">
                        {d}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progresso geral</span>
                      <span>{patient.progress[patient.progress.length - 1]?.communication || 0}%</span>
                    </div>
                    <Progress 
                      value={patient.progress[patient.progress.length - 1]?.communication || 0} 
                      className="h-2"
                    />
                  </div>
                  {patient.events.length > 0 && (
                    <p className="text-xs text-gray-400 mt-3">
                      Ultimo evento: {patient.events[0].title}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
