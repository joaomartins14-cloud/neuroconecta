'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
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
  Brain,
  Ear,
  Eye,
  Hand,
  Move,
  Activity,
  Utensils,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
} from 'lucide-react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export default function PerfilSensorialPage() {
  const { patients } = useDashboard()
  const [selectedPatient, setSelectedPatient] = useState<string>('')
  const [filterLevel, setFilterLevel] = useState<string>('all')

  const patient = patients.find(p => p.id === selectedPatient)

  const getSensoryIcon = (type: string) => {
    switch (type) {
      case 'auditory': return <Ear className="w-5 h-5" />
      case 'visual': return <Eye className="w-5 h-5" />
      case 'tactile': return <Hand className="w-5 h-5" />
      case 'vestibular': return <Move className="w-5 h-5" />
      case 'proprioceptive': return <Activity className="w-5 h-5" />
      case 'gustatory': return <Utensils className="w-5 h-5" />
      default: return <Brain className="w-5 h-5" />
    }
  }

  const getSensoryLabel = (level: string) => {
    switch (level) {
      case 'hypo': return { text: 'Hiporreativo', color: 'bg-blue-100 text-blue-700', icon: <TrendingDown className="w-4 h-4" /> }
      case 'hyper': return { text: 'Hiperreativo', color: 'bg-red-100 text-red-700', icon: <TrendingUp className="w-4 h-4" /> }
      default: return { text: 'Tipico', color: 'bg-green-100 text-green-700', icon: <Minus className="w-4 h-4" /> }
    }
  }

  const sensorNames: Record<string, string> = {
    auditory: 'Auditivo',
    visual: 'Visual',
    tactile: 'Tatil',
    vestibular: 'Vestibular',
    proprioceptive: 'Proprioceptivo',
    gustatory: 'Gustativo',
  }

  const sensorDescriptions: Record<string, { hypo: string; hyper: string }> = {
    auditory: {
      hypo: 'Pode nao responder a sons, buscar sons altos ou musica',
      hyper: 'Sensibilidade a sons cotidianos, pode cobrir ouvidos frequentemente',
    },
    visual: {
      hypo: 'Pode olhar fixamente para luzes, ter fascinacao por padroes',
      hyper: 'Evita luzes fortes, pode ter dificuldade com telas',
    },
    tactile: {
      hypo: 'Pode nao perceber dor ou temperatura, buscar texturas',
      hyper: 'Evita certas texturas, etiquetas de roupas, toques leves',
    },
    vestibular: {
      hypo: 'Busca movimentos intensos, gira sem tontura',
      hyper: 'Evita movimentos, pode ter medo de altura ou balanco',
    },
    proprioceptive: {
      hypo: 'Dificuldade em perceber posicao do corpo, pode ser desajeitado',
      hyper: 'Pode evitar atividades fisicas, prefere movimentos leves',
    },
    gustatory: {
      hypo: 'Pode mastigar objetos, buscar sabores intensos',
      hyper: 'Seletividade alimentar, evita texturas e sabores especificos',
    },
  }

  // Stats gerais
  const hyperCount = patients.reduce((acc, p) => {
    return acc + Object.entries(p.sensoryProfile)
      .filter(([key]) => key !== 'lastUpdated')
      .filter(([, value]) => (value as { level: string }).level === 'hyper').length
  }, 0)

  const hypoCount = patients.reduce((acc, p) => {
    return acc + Object.entries(p.sensoryProfile)
      .filter(([key]) => key !== 'lastUpdated')
      .filter(([, value]) => (value as { level: string }).level === 'hypo').length
  }, 0)

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="w-7 h-7 text-[#fd74fd]" />
              Perfil Sensorial
            </h1>
            <p className="text-gray-500">Analise os perfis sensoriais dos pacientes</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Selecione um paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pacientes avaliados</p>
                  <p className="text-3xl font-bold text-gray-900">{patients.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#fd74fd]/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#fd74fd]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Areas hiperreativas</p>
                  <p className="text-3xl font-bold text-red-600">{hyperCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Areas hiporreativas</p>
                  <p className="text-3xl font-bold text-blue-600">{hypoCount}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {patient ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Image
                    src={patient.photo}
                    alt={patient.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <CardDescription>
                      Atualizado em {new Date(patient.sensoryProfile.lastUpdated).toLocaleDateString('pt-BR')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      { subject: 'Auditivo', value: patient.sensoryProfile.auditory.score },
                      { subject: 'Visual', value: patient.sensoryProfile.visual.score },
                      { subject: 'Tatil', value: patient.sensoryProfile.tactile.score },
                      { subject: 'Vestibular', value: patient.sensoryProfile.vestibular.score },
                      { subject: 'Propriocep.', value: patient.sensoryProfile.proprioceptive.score },
                      { subject: 'Gustativo', value: patient.sensoryProfile.gustatory.score },
                    ]}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar
                        name={patient.name}
                        dataKey="value"
                        stroke="#fd74fd"
                        fill="#fd74fd"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Breakdown */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Detalhamento Sensorial</CardTitle>
                <CardDescription>Analise detalhada por area</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(patient.sensoryProfile)
                  .filter(([key]) => key !== 'lastUpdated')
                  .map(([key, value]) => {
                    const profile = value as { score: number; level: string }
                    const label = getSensoryLabel(profile.level)
                    const description = sensorDescriptions[key]?.[profile.level as 'hypo' | 'hyper'] || ''
                    
                    return (
                      <div key={key} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              profile.level === 'hyper' ? 'bg-red-100 text-red-600' :
                              profile.level === 'hypo' ? 'bg-blue-100 text-blue-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {getSensoryIcon(key)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{sensorNames[key]}</p>
                              <p className="text-xs text-gray-500">Score: {profile.score}/100</p>
                            </div>
                          </div>
                          <Badge className={label.color}>
                            {label.icon}
                            <span className="ml-1">{label.text}</span>
                          </Badge>
                        </div>
                        <Progress value={profile.score} className="h-2 mb-2" />
                        {description && (
                          <p className="text-xs text-gray-500">{description}</p>
                        )}
                      </div>
                    )
                  })}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* All Patients Overview */
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Visao Geral dos Pacientes</CardTitle>
                  <CardDescription>Selecione um paciente para ver detalhes ou veja o resumo abaixo</CardDescription>
                </div>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filtrar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="hyper">Hiperreativo</SelectItem>
                    <SelectItem value="hypo">Hiporreativo</SelectItem>
                    <SelectItem value="typical">Tipico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patients.map((p) => {
                  const sensoryAreas = Object.entries(p.sensoryProfile)
                    .filter(([key]) => key !== 'lastUpdated')
                  
                  const hyperAreas = sensoryAreas.filter(([, v]) => (v as { level: string }).level === 'hyper')
                  const hypoAreas = sensoryAreas.filter(([, v]) => (v as { level: string }).level === 'hypo')
                  
                  if (filterLevel !== 'all') {
                    const hasLevel = sensoryAreas.some(([, v]) => (v as { level: string }).level === filterLevel)
                    if (!hasLevel) return null
                  }
                  
                  return (
                    <Link
                      key={p.id}
                      href={`/dashboard/pacientes/${p.id}`}
                      className="block p-4 rounded-xl border border-gray-100 hover:border-[#fd74fd]/30 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Image
                          src={p.photo}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{p.name}</p>
                          <p className="text-sm text-gray-500">{p.age} anos</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300" />
                      </div>
                      
                      <div className="space-y-2">
                        {hyperAreas.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {hyperAreas.length} hiper
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {hyperAreas.map(([key]) => sensorNames[key]).join(', ')}
                            </span>
                          </div>
                        )}
                        {hypoAreas.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              <TrendingDown className="w-3 h-3 mr-1" />
                              {hypoAreas.length} hipo
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {hypoAreas.map(([key]) => sensorNames[key]).join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardShell>
  )
}
