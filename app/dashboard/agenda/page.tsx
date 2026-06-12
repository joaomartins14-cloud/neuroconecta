'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useDashboard } from '@/lib/dashboard-context'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  CalendarIcon,
  Clock,
  Plus,
  MoreVertical,
  Check,
  X,
  Video,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00'
]

export default function AgendaPage() {
  const { appointments, patients, updateAppointment, cancelAppointment, addAppointment } = useDashboard()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day')
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    type: 'consultation',
    date: '',
    time: '09:00',
    duration: 30,
    notes: '',
  })
  const appointmentsRef = useRef<HTMLDivElement>(null)

  const selectedDateStr = selectedDate?.toISOString().split('T')[0] || ''
  
  const dayAppointments = appointments.filter(apt => apt.date === selectedDateStr)
    .sort((a, b) => a.time.localeCompare(b.time))

  useEffect(() => {
    if (appointmentsRef.current) {
      const items = appointmentsRef.current.querySelectorAll('.appointment-item')
      gsap.fromTo(items,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      )
    }
  }, [selectedDate, dayAppointments])

  const handleConfirm = (id: string) => {
    updateAppointment(id, { status: 'confirmed' })
  }

  const handleCancel = (id: string) => {
    cancelAppointment(id)
  }

  const handleComplete = (id: string) => {
    updateAppointment(id, { status: 'completed' })
  }

  const handleCreateAppointment = () => {
    const patient = patients.find(p => p.id === newAppointment.patientId)
    if (patient) {
      addAppointment({
        patientId: patient.id,
        patientName: patient.name,
        patientPhoto: patient.photo,
        type: newAppointment.type as 'consultation' | 'evaluation' | 'follow-up' | 'team-meeting',
        date: newAppointment.date,
        time: newAppointment.time,
        duration: newAppointment.duration,
        status: 'scheduled',
        notes: newAppointment.notes,
      })
      setIsNewAppointmentOpen(false)
      setNewAppointment({
        patientId: '',
        type: 'consultation',
        date: '',
        time: '09:00',
        duration: 30,
        notes: '',
      })
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { label: 'Confirmado', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' }
      case 'scheduled':
        return { label: 'Agendado', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' }
      case 'completed':
        return { label: 'Concluido', color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-500' }
      case 'cancelled':
        return { label: 'Cancelado', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' }
      default:
        return { label: status, color: 'bg-gray-100 text-gray-700', dot: 'bg-gray-500' }
    }
  }

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'consultation':
        return { label: 'Consulta', color: 'text-[#fd74fd]', bg: 'bg-[#fd74fd]/10' }
      case 'evaluation':
        return { label: 'Avaliacao', color: 'text-[#7af7f7]', bg: 'bg-[#7af7f7]/20' }
      case 'follow-up':
        return { label: 'Retorno', color: 'text-amber-600', bg: 'bg-amber-100' }
      case 'team-meeting':
        return { label: 'Reuniao Equipe', color: 'text-purple-600', bg: 'bg-purple-100' }
      default:
        return { label: type, color: 'text-gray-600', bg: 'bg-gray-100' }
    }
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    if (selectedDate) {
      const newDate = new Date(selectedDate)
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
      setSelectedDate(newDate)
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
            <p className="text-gray-500">Gerencie suas consultas e compromissos</p>
          </div>
          <div className="flex gap-2">
            <div className="flex border rounded-lg overflow-hidden">
              <Button 
                variant={viewMode === 'day' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('day')}
                className={viewMode === 'day' ? 'bg-[#fd74fd] hover:bg-[#fd74fd]/90' : ''}
              >
                Dia
              </Button>
              <Button 
                variant={viewMode === 'week' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('week')}
                className={viewMode === 'week' ? 'bg-[#fd74fd] hover:bg-[#fd74fd]/90' : ''}
              >
                Semana
              </Button>
            </div>
            <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Agendamento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Novo Agendamento</DialogTitle>
                  <DialogDescription>Agende uma consulta ou compromisso.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Paciente</Label>
                    <Select value={newAppointment.patientId} onValueChange={(v) => setNewAppointment({...newAppointment, patientId: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={newAppointment.type} onValueChange={(v) => setNewAppointment({...newAppointment, type: v})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consulta</SelectItem>
                        <SelectItem value="evaluation">Avaliacao</SelectItem>
                        <SelectItem value="follow-up">Retorno</SelectItem>
                        <SelectItem value="team-meeting">Reuniao de Equipe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Input 
                        type="date" 
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Horario</Label>
                      <Select value={newAppointment.time} onValueChange={(v) => setNewAppointment({...newAppointment, time: v})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duracao</Label>
                    <Select value={String(newAppointment.duration)} onValueChange={(v) => setNewAppointment({...newAppointment, duration: Number(v)})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutos</SelectItem>
                        <SelectItem value="45">45 minutos</SelectItem>
                        <SelectItem value="60">1 hora</SelectItem>
                        <SelectItem value="90">1 hora e 30 minutos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Observacoes</Label>
                    <Input 
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      placeholder="Notas sobre a consulta..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>Cancelar</Button>
                  <Button 
                    onClick={handleCreateAppointment}
                    className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white"
                    disabled={!newAppointment.patientId || !newAppointment.date}
                  >
                    Agendar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Sidebar */}
          <Card className="border-0 shadow-sm lg:col-span-1">
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md"
              />
              
              {/* Stats */}
              <div className="mt-6 space-y-3">
                <h3 className="font-medium text-gray-900">Resumo do dia</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-[#fd74fd]/10">
                    <p className="text-2xl font-bold text-[#fd74fd]">{dayAppointments.length}</p>
                    <p className="text-xs text-gray-500">Consultas</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100">
                    <p className="text-2xl font-bold text-green-600">
                      {dayAppointments.filter(a => a.status === 'confirmed').length}
                    </p>
                    <p className="text-xs text-gray-500">Confirmadas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day View */}
          <Card className="border-0 shadow-sm lg:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => navigateDate('prev')}>
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <div>
                    <CardTitle className="text-lg">
                      {selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </CardTitle>
                    <CardDescription>
                      {dayAppointments.length} agendamentos
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => navigateDate('next')}>
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
                  Hoje
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div ref={appointmentsRef} className="space-y-3">
                {dayAppointments.length > 0 ? (
                  dayAppointments.map((apt) => {
                    const statusConfig = getStatusConfig(apt.status)
                    const typeConfig = getTypeConfig(apt.type)
                    
                    return (
                      <div 
                        key={apt.id}
                        className={`appointment-item p-4 rounded-xl border-l-4 ${typeConfig.bg} border-l-current ${typeConfig.color} transition-all hover:shadow-md`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center min-w-[60px]">
                              <p className="text-lg font-bold text-gray-900">{apt.time}</p>
                              <p className="text-xs text-gray-500">{apt.duration} min</p>
                            </div>
                            <div className="w-px h-12 bg-gray-200" />
                            <Image
                              src={apt.patientPhoto}
                              alt={apt.patientName}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                            <div>
                              <Link 
                                href={`/dashboard/pacientes/${apt.patientId}`}
                                className="font-semibold text-gray-900 hover:text-[#fd74fd] transition-colors"
                              >
                                {apt.patientName}
                              </Link>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                                <Badge variant="outline">{typeConfig.label}</Badge>
                              </div>
                              {apt.notes && (
                                <p className="text-sm text-gray-500 mt-1">{apt.notes}</p>
                              )}
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {apt.status === 'scheduled' && (
                                <DropdownMenuItem onClick={() => handleConfirm(apt.id)}>
                                  <Check className="w-4 h-4 mr-2 text-green-600" />
                                  Confirmar
                                </DropdownMenuItem>
                              )}
                              {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                                <DropdownMenuItem onClick={() => handleComplete(apt.id)}>
                                  <Check className="w-4 h-4 mr-2" />
                                  Marcar como concluido
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/pacientes/${apt.patientId}`}>
                                  <User className="w-4 h-4 mr-2" />
                                  Ver paciente
                                </Link>
                              </DropdownMenuItem>
                              {apt.status !== 'cancelled' && (
                                <DropdownMenuItem 
                                  onClick={() => handleCancel(apt.id)}
                                  className="text-red-600"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Cancelar
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 mb-4">Nenhum agendamento para este dia</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setNewAppointment({...newAppointment, date: selectedDateStr})
                        setIsNewAppointmentOpen(true)
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agendar consulta
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Proximos Agendamentos</CardTitle>
            <CardDescription>Consultas agendadas para os proximos dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments
                .filter(a => a.status !== 'cancelled' && a.status !== 'completed')
                .slice(0, 6)
                .map((apt) => {
                  const statusConfig = getStatusConfig(apt.status)
                  const typeConfig = getTypeConfig(apt.type)
                  
                  return (
                    <div 
                      key={apt.id}
                      className="p-4 rounded-xl border border-gray-100 hover:border-[#fd74fd]/30 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Image
                          src={apt.patientPhoto}
                          alt={apt.patientName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{apt.patientName}</p>
                          <p className="text-sm text-gray-500">{typeConfig.label}</p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(apt.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{apt.time}</span>
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
