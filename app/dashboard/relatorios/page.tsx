'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useDashboard } from '@/lib/dashboard-context'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FileText,
  Download,
  Eye,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  PieChart,
  Share2,
  Printer,
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
  Legend,
} from 'recharts'

export default function RelatoriosPage() {
  const { patients } = useDashboard()
  const [selectedPatient, setSelectedPatient] = useState<string>('all')
  const [reportType, setReportType] = useState<string>('progress')
  const [period, setPeriod] = useState<string>('6months')

  // Calculate aggregated progress data
  const aggregatedProgress = patients[0]?.progress.map((_, index) => {
    const month = patients[0].progress[index].month
    const avgCommunication = patients.reduce((acc, p) => acc + (p.progress[index]?.communication || 0), 0) / patients.length
    const avgSocial = patients.reduce((acc, p) => acc + (p.progress[index]?.social || 0), 0) / patients.length
    const avgSensory = patients.reduce((acc, p) => acc + (p.progress[index]?.sensory || 0), 0) / patients.length
    const avgBehavior = patients.reduce((acc, p) => acc + (p.progress[index]?.behavior || 0), 0) / patients.length
    return {
      month,
      communication: Math.round(avgCommunication),
      social: Math.round(avgSocial),
      sensory: Math.round(avgSensory),
      behavior: Math.round(avgBehavior),
    }
  }) || []

  const patient = patients.find(p => p.id === selectedPatient)
  const displayData = patient ? patient.progress : aggregatedProgress

  // Event distribution
  const eventDistribution = [
    { name: 'Conquistas', value: patients.flatMap(p => p.events).filter(e => e.type === 'achievement').length, fill: '#22c55e' },
    { name: 'Crises', value: patients.flatMap(p => p.events).filter(e => e.type === 'crisis').length, fill: '#ef4444' },
    { name: 'Observacoes', value: patients.flatMap(p => p.events).filter(e => e.type === 'observation').length, fill: '#6b7280' },
    { name: 'Medicos', value: patients.flatMap(p => p.events).filter(e => e.type === 'medical').length, fill: '#3b82f6' },
  ]

  const reportTemplates = [
    { id: 'progress', name: 'Relatorio de Progresso', icon: TrendingUp, description: 'Evolucao do paciente ao longo do tempo' },
    { id: 'sensory', name: 'Perfil Sensorial', icon: BarChart3, description: 'Analise detalhada do perfil sensorial' },
    { id: 'events', name: 'Historico de Eventos', icon: Calendar, description: 'Timeline completa de eventos' },
    { id: 'summary', name: 'Resumo Executivo', icon: FileText, description: 'Visao geral para responsaveis' },
  ]

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-7 h-7 text-[#fd74fd]" />
              Relatorios
            </h1>
            <p className="text-gray-500">Gere e visualize relatorios de acompanhamento</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white">
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <Users className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Paciente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os pacientes</SelectItem>
                  {patients.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Tipo de relatorio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Progresso</SelectItem>
                  <SelectItem value="sensory">Perfil Sensorial</SelectItem>
                  <SelectItem value="events">Eventos</SelectItem>
                  <SelectItem value="summary">Resumo</SelectItem>
                </SelectContent>
              </Select>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Ultimo mes</SelectItem>
                  <SelectItem value="3months">Ultimos 3 meses</SelectItem>
                  <SelectItem value="6months">Ultimos 6 meses</SelectItem>
                  <SelectItem value="1year">Ultimo ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTemplates.map((template) => {
            const Icon = template.icon
            const isActive = reportType === template.id
            return (
              <Card 
                key={template.id}
                className={`border-0 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                  isActive ? 'ring-2 ring-[#fd74fd]' : ''
                }`}
                onClick={() => setReportType(template.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-[#fd74fd] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Report Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Chart */}
          <Card className="border-0 shadow-sm lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {patient ? `Progresso de ${patient.name}` : 'Progresso Geral dos Pacientes'}
                  </CardTitle>
                  <CardDescription>Evolucao nas principais areas de desenvolvimento</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Printer className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={displayData}>
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
                    <Legend />
                    <Line type="monotone" dataKey="communication" name="Comunicacao" stroke="#fd74fd" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="social" name="Social" stroke="#7af7f7" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="sensory" name="Sensorial" stroke="#fff48d" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="behavior" name="Comportamento" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Event Distribution */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Distribuicao de Eventos</CardTitle>
              <CardDescription>Por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={eventDistribution} layout="vertical">
                    <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                    <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={80} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-3">
                <h4 className="font-medium text-gray-900">Resumo Estatistico</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total de eventos</span>
                    <span className="font-medium">{eventDistribution.reduce((acc, e) => acc + e.value, 0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Pacientes ativos</span>
                    <span className="font-medium">{patients.filter(p => p.status === 'active').length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Taxa de conquistas</span>
                    <span className="font-medium text-green-600">
                      {Math.round((eventDistribution[0].value / eventDistribution.reduce((acc, e) => acc + e.value, 0)) * 100) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient Progress Summary */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Comparativo de Pacientes</CardTitle>
            <CardDescription>Progresso atual em cada area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patients.map((p) => {
                const latestProgress = p.progress[p.progress.length - 1]
                const avgProgress = latestProgress 
                  ? Math.round((latestProgress.communication + latestProgress.social + latestProgress.sensory + latestProgress.behavior) / 4)
                  : 0
                
                return (
                  <div key={p.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4 mb-3">
                      <Image
                        src={p.photo}
                        alt={p.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{p.name}</p>
                        <p className="text-sm text-gray-500">{p.age} anos | {p.diagnosis.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#fd74fd]">{avgProgress}%</p>
                        <p className="text-xs text-gray-500">Progresso medio</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Comunicacao</span>
                          <span className="text-[#fd74fd]">{latestProgress?.communication || 0}%</span>
                        </div>
                        <Progress value={latestProgress?.communication || 0} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Social</span>
                          <span className="text-[#7af7f7]">{latestProgress?.social || 0}%</span>
                        </div>
                        <Progress value={latestProgress?.social || 0} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Sensorial</span>
                          <span className="text-amber-500">{latestProgress?.sensory || 0}%</span>
                        </div>
                        <Progress value={latestProgress?.sensory || 0} className="h-1.5" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">Comportamento</span>
                          <span className="text-purple-500">{latestProgress?.behavior || 0}%</span>
                        </div>
                        <Progress value={latestProgress?.behavior || 0} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
