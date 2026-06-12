'use client'

import { useState, useEffect, useRef, use } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDashboard } from '@/lib/dashboard-context'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
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
  ArrowLeft,
  Phone,
  Mail,
  School,
  Calendar,
  Clock,
  Brain,
  Activity,
  FileText,
  MessageSquare,
  Plus,
  Edit,
  Star,
  AlertTriangle,
  Eye,
  TrendingUp,
  Volume2,
  Ear,
  Hand,
  Move,
  Utensils,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PatientDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { patients, addEventToPatient, addNoteToPatient, setSelectedPatient } = useDashboard()
  const patient = patients.find(p => p.id === id)
  
  const [activeTab, setActiveTab] = useState('overview')
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false)
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({ type: 'observation', title: '', description: '', tags: '' })
  const [newNote, setNewNote] = useState({ type: 'observation', content: '' })
  
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (patient) {
      setSelectedPatient(patient)
    }
  }, [patient, setSelectedPatient])

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  if (!patient) {
    return (
      <DashboardShell>
        <div className="text-center py-12">
          <p className="text-gray-500">Paciente nao encontrado</p>
          <Button variant="outline" onClick={() => router.push('/dashboard/pacientes')} className="mt-4">
            Voltar para lista
          </Button>
        </div>
      </DashboardShell>
    )
  }

  const sensoryData = [
    { subject: 'Auditivo', value: patient.sensoryProfile.auditory.score, fullMark: 100 },
    { subject: 'Visual', value: patient.sensoryProfile.visual.score, fullMark: 100 },
    { subject: 'Tatil', value: patient.sensoryProfile.tactile.score, fullMark: 100 },
    { subject: 'Vestibular', value: patient.sensoryProfile.vestibular.score, fullMark: 100 },
    { subject: 'Propriocep.', value: patient.sensoryProfile.proprioceptive.score, fullMark: 100 },
    { subject: 'Gustativo', value: patient.sensoryProfile.gustatory.score, fullMark: 100 },
  ]

  const handleAddEvent = () => {
    addEventToPatient(patient.id, {
      date: new Date().toISOString().split('T')[0],
      type: newEvent.type as 'crisis' | 'achievement' | 'observation' | 'medical',
      title: newEvent.title,
      description: newEvent.description,
      reportedBy: 'clinic',
      tags: newEvent.tags.split(',').map(t => t.trim()),
    })
    setNewEvent({ type: 'observation', title: '', description: '', tags: '' })
    setIsEventDialogOpen(false)
  }

  const handleAddNote = () => {
    addNoteToPatient(patient.id, {
      date: new Date().toISOString().split('T')[0],
      content: newNote.content,
      author: 'Dr. Carlos Mendes',
      type: newNote.type as 'clinical' | 'observation' | 'recommendation',
    })
    setNewNote({ type: 'observation', content: '' })
    setIsNoteDialogOpen(false)
  }

  const getSensoryIcon = (type: string) => {
    switch (type) {
      case 'auditory': return <Ear className="w-4 h-4" />
      case 'visual': return <Eye className="w-4 h-4" />
      case 'tactile': return <Hand className="w-4 h-4" />
      case 'vestibular': return <Move className="w-4 h-4" />
      case 'proprioceptive': return <Activity className="w-4 h-4" />
      case 'gustatory': return <Utensils className="w-4 h-4" />
      default: return <Brain className="w-4 h-4" />
    }
  }

  const getSensoryLabel = (level: string) => {
    switch (level) {
      case 'hypo': return { text: 'Hiporreativo', color: 'bg-blue-100 text-blue-700' }
      case 'hyper': return { text: 'Hiperreativo', color: 'bg-red-100 text-red-700' }
      default: return { text: 'Tipico', color: 'bg-green-100 text-green-700' }
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/pacientes')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={patient.photo}
                alt={patient.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500">{patient.age} anos</span>
                  <span className="text-gray-300">|</span>
                  <div className="flex gap-1">
                    {patient.diagnosis.map((d, i) => (
                      <Badge key={i} variant="secondary" className="bg-[#fd74fd]/10 text-[#fd74fd]">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Mensagem
              </Button>
              <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Agendar
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fd74fd]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#fd74fd]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Responsavel</p>
                <p className="font-medium">{patient.parent}</p>
                <p className="text-sm text-gray-500">{patient.parentPhone}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7af7f7]/10 flex items-center justify-center">
                <School className="w-5 h-5 text-[#7af7f7]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Escola</p>
                <p className="font-medium">{patient.school}</p>
                <p className="text-sm text-gray-500">{patient.teacher}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fff48d]/30 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Proxima consulta</p>
                <p className="font-medium">{new Date(patient.nextSession).toLocaleDateString('pt-BR')}</p>
                <p className="text-sm text-gray-500">Ultima: {new Date(patient.lastSession).toLocaleDateString('pt-BR')}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">Visao Geral</TabsTrigger>
            <TabsTrigger value="sensory" className="data-[state=active]:bg-white">Perfil Sensorial</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-white">Eventos</TabsTrigger>
            <TabsTrigger value="routines" className="data-[state=active]:bg-white">Rotinas</TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-white">Anotacoes</TabsTrigger>
          </TabsList>

          <div ref={contentRef}>
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Progress Chart */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Evolucao do Paciente</CardTitle>
                    <CardDescription>Progresso nos ultimos 6 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={patient.progress}>
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

                {/* Sensory Radar */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Perfil Sensorial</CardTitle>
                    <CardDescription>Atualizado em {new Date(patient.sensoryProfile.lastUpdated).toLocaleDateString('pt-BR')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={sensoryData}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                          <Radar
                            name="Perfil"
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
              </div>

              {/* Recent Events */}
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Eventos Recentes</CardTitle>
                    <CardDescription>Ultimos acontecimentos registrados</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('events')}>
                    Ver todos
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.events.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                        <div className={`
                          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                          ${event.type === 'achievement' ? 'bg-green-100 text-green-600' :
                            event.type === 'crisis' ? 'bg-red-100 text-red-600' :
                            event.type === 'medical' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'}
                        `}>
                          {event.type === 'achievement' && <Star className="w-5 h-5" />}
                          {event.type === 'crisis' && <AlertTriangle className="w-5 h-5" />}
                          {event.type === 'medical' && <FileText className="w-5 h-5" />}
                          {event.type === 'observation' && <Eye className="w-5 h-5" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <span className="text-xs text-gray-400">{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {event.reportedBy === 'family' ? 'Familia' : 
                               event.reportedBy === 'school' ? 'Escola' : 'Clinica'}
                            </Badge>
                            {event.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    {patient.events.length === 0 && (
                      <p className="text-center text-gray-500 py-8">Nenhum evento registrado</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sensory Profile Tab */}
            <TabsContent value="sensory" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Brain className="w-5 h-5 text-[#fd74fd]" />
                        Perfil Sensorial Completo
                      </CardTitle>
                      <CardDescription>
                        Ultima avaliacao: {new Date(patient.sensoryProfile.lastUpdated).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </div>
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Atualizar Perfil
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Radar Chart */}
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={sensoryData}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                          <Radar
                            name="Perfil"
                            dataKey="value"
                            stroke="#fd74fd"
                            fill="#fd74fd"
                            fillOpacity={0.3}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Sensory Details */}
                    <div className="space-y-4">
                      {Object.entries(patient.sensoryProfile).filter(([key]) => key !== 'lastUpdated').map(([key, value]) => {
                        const profile = value as { score: number; level: string }
                        const label = getSensoryLabel(profile.level)
                        const sensorNames: Record<string, string> = {
                          auditory: 'Auditivo',
                          visual: 'Visual',
                          tactile: 'Tatil',
                          vestibular: 'Vestibular',
                          proprioceptive: 'Proprioceptivo',
                          gustatory: 'Gustativo',
                        }
                        return (
                          <div key={key} className="p-4 rounded-xl bg-gray-50">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getSensoryIcon(key)}
                                <span className="font-medium">{sensorNames[key]}</span>
                              </div>
                              <Badge className={label.color}>{label.text}</Badge>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Score</span>
                                <span className="font-medium">{profile.score}/100</span>
                              </div>
                              <Progress value={profile.score} className="h-2" />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Interpretation */}
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#fd74fd]/5 to-[#7af7f7]/5 border border-[#fd74fd]/10">
                    <h4 className="font-medium text-gray-900 mb-2">Interpretacao Clinica</h4>
                    <p className="text-sm text-gray-600">
                      O paciente apresenta perfil sensorial com <strong>hipersensibilidade auditiva e tatil</strong>, 
                      indicando necessidade de adaptacoes ambientais para reducao de estimulos sonoros e texturas. 
                      A <strong>hiporreatividade proprioceptiva</strong> sugere beneficio de atividades de integracao sensorial 
                      com foco em consciencia corporal.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Historico de Eventos</CardTitle>
                      <CardDescription>{patient.events.length} eventos registrados</CardDescription>
                    </div>
                    <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Novo Evento
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Registrar Novo Evento</DialogTitle>
                          <DialogDescription>
                            Registre um acontecimento importante sobre o paciente.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Tipo de evento</Label>
                            <Select value={newEvent.type} onValueChange={(v) => setNewEvent({...newEvent, type: v})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="observation">Observacao</SelectItem>
                                <SelectItem value="achievement">Conquista</SelectItem>
                                <SelectItem value="crisis">Crise</SelectItem>
                                <SelectItem value="medical">Medico</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Titulo</Label>
                            <Input 
                              value={newEvent.title}
                              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                              placeholder="Resumo do evento"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Descricao</Label>
                            <Textarea 
                              value={newEvent.description}
                              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                              placeholder="Descreva o evento em detalhes..."
                              rows={4}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tags (separadas por virgula)</Label>
                            <Input 
                              value={newEvent.tags}
                              onChange={(e) => setNewEvent({...newEvent, tags: e.target.value})}
                              placeholder="Ex: social, comunicacao, sensorial"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>Cancelar</Button>
                          <Button onClick={handleAddEvent} className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white">
                            Registrar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.events.map((event) => (
                      <div key={event.id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#fd74fd]/30 transition-colors">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                          ${event.type === 'achievement' ? 'bg-green-100 text-green-600' :
                            event.type === 'crisis' ? 'bg-red-100 text-red-600' :
                            event.type === 'medical' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'}
                        `}>
                          {event.type === 'achievement' && <Star className="w-6 h-6" />}
                          {event.type === 'crisis' && <AlertTriangle className="w-6 h-6" />}
                          {event.type === 'medical' && <FileText className="w-6 h-6" />}
                          {event.type === 'observation' && <Eye className="w-6 h-6" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <span className="text-sm text-gray-400">{new Date(event.date).toLocaleDateString('pt-BR')}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {event.reportedBy === 'family' ? 'Familia' : 
                               event.reportedBy === 'school' ? 'Escola' : 'Clinica'}
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
                    ))}
                    {patient.events.length === 0 && (
                      <div className="text-center py-12">
                        <Activity className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Nenhum evento registrado ainda</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Routines Tab */}
            <TabsContent value="routines" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Rotinas Visuais</CardTitle>
                      <CardDescription>Rotinas configuradas para o paciente</CardDescription>
                    </div>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Rotina
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {patient.routines.map((routine) => (
                      <div key={routine.id} className="p-4 rounded-xl border border-gray-100 hover:border-[#fd74fd]/30 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#fd74fd]/10 flex items-center justify-center">
                              <Clock className="w-5 h-5 text-[#fd74fd]" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{routine.name}</h4>
                              <p className="text-sm text-gray-500">{routine.time}</p>
                            </div>
                          </div>
                          <Badge variant={routine.status === 'active' ? 'default' : 'secondary'}>
                            {routine.status === 'active' ? 'Ativa' : 'Pausada'}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Taxa de conclusao</span>
                            <span className="font-medium text-[#fd74fd]">{routine.completionRate}%</span>
                          </div>
                          <Progress value={routine.completionRate} className="h-2" />
                        </div>
                        <div className="flex gap-1 mt-3">
                          {routine.days.map((day) => (
                            <Badge key={day} variant="outline" className="text-xs">{day}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Anotacoes Clinicas</CardTitle>
                      <CardDescription>{patient.notes.length} anotacoes</CardDescription>
                    </div>
                    <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Nova Anotacao
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Nova Anotacao Clinica</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <Label>Tipo</Label>
                            <Select value={newNote.type} onValueChange={(v) => setNewNote({...newNote, type: v})}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="clinical">Clinica</SelectItem>
                                <SelectItem value="observation">Observacao</SelectItem>
                                <SelectItem value="recommendation">Recomendacao</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Conteudo</Label>
                            <Textarea 
                              value={newNote.content}
                              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                              placeholder="Escreva sua anotacao..."
                              rows={6}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>Cancelar</Button>
                          <Button onClick={handleAddNote} className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white">
                            Salvar
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patient.notes.map((note) => (
                      <div key={note.id} className="p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {note.type === 'clinical' ? 'Clinica' : 
                               note.type === 'observation' ? 'Observacao' : 'Recomendacao'}
                            </Badge>
                            <span className="text-sm text-gray-500">{note.author}</span>
                          </div>
                          <span className="text-sm text-gray-400">{new Date(note.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                      </div>
                    ))}
                    {patient.notes.length === 0 && (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500">Nenhuma anotacao registrada ainda</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
