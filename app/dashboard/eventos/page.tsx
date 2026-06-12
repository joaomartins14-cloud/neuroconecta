'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDashboard } from '@/lib/dashboard-context'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Activity,
  Star,
  AlertTriangle,
  Eye,
  FileText,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Bell,
} from 'lucide-react'

export default function EventosPage() {
  const { patients } = useDashboard()
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')

  // Collect all events from all patients
  const allEvents = patients.flatMap(patient => 
    patient.events.map(event => ({
      ...event,
      patientId: patient.id,
      patientName: patient.name,
      patientPhoto: patient.photo,
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === 'all' || event.type === typeFilter
    const matchesSource = sourceFilter === 'all' || event.reportedBy === sourceFilter
    return matchesSearch && matchesType && matchesSource
  })

  const eventStats = {
    total: allEvents.length,
    achievements: allEvents.filter(e => e.type === 'achievement').length,
    crises: allEvents.filter(e => e.type === 'crisis').length,
    observations: allEvents.filter(e => e.type === 'observation').length,
    medical: allEvents.filter(e => e.type === 'medical').length,
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Star className="w-5 h-5" />
      case 'crisis': return <AlertTriangle className="w-5 h-5" />
      case 'medical': return <FileText className="w-5 h-5" />
      case 'observation': return <Eye className="w-5 h-5" />
      default: return <Activity className="w-5 h-5" />
    }
  }

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'achievement': return { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200' }
      case 'crisis': return { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' }
      case 'medical': return { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' }
      case 'observation': return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' }
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'family': return 'Familia'
      case 'school': return 'Escola'
      case 'clinic': return 'Clinica'
      default: return source
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-7 h-7 text-[#fd74fd]" />
              Modulo de Eventos
            </h1>
            <p className="text-gray-500">Acompanhe todos os eventos registrados</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fd74fd]/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#fd74fd]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{eventStats.total}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{eventStats.achievements}</p>
                  <p className="text-xs text-gray-500">Conquistas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{eventStats.crises}</p>
                  <p className="text-xs text-gray-500">Crises</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{eventStats.observations}</p>
                  <p className="text-xs text-gray-500">Observacoes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{eventStats.medical}</p>
                  <p className="text-xs text-gray-500">Medicos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="achievement">Conquistas</SelectItem>
                  <SelectItem value="crisis">Crises</SelectItem>
                  <SelectItem value="observation">Observacoes</SelectItem>
                  <SelectItem value="medical">Medicos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Origem" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as origens</SelectItem>
                  <SelectItem value="family">Familia</SelectItem>
                  <SelectItem value="school">Escola</SelectItem>
                  <SelectItem value="clinic">Clinica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Timeline de Eventos</CardTitle>
            <CardDescription>{filteredEvents.length} eventos encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEvents.map((event) => {
                const style = getEventStyle(event.type)
                
                return (
                  <div 
                    key={event.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border ${style.border} hover:shadow-md transition-all`}
                  >
                    <div className={`w-12 h-12 rounded-full ${style.bg} ${style.text} flex items-center justify-center flex-shrink-0`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <Link 
                            href={`/dashboard/pacientes/${event.patientId}`}
                            className="flex items-center gap-2 mt-1 group"
                          >
                            <Image
                              src={event.patientPhoto}
                              alt={event.patientName}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                            <span className="text-sm text-[#fd74fd] group-hover:underline">
                              {event.patientName}
                            </span>
                          </Link>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 flex-shrink-0">
                          <Calendar className="w-4 h-4" />
                          {new Date(event.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{event.description}</p>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <Badge variant="secondary">
                          {getSourceLabel(event.reportedBy)}
                        </Badge>
                        {event.severity && (
                          <Badge variant={event.severity === 'high' ? 'destructive' : 'outline'}>
                            {event.severity === 'high' ? 'Alta' : event.severity === 'medium' ? 'Media' : 'Baixa'}
                          </Badge>
                        )}
                        {event.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Nenhum evento encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
