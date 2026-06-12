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
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Phone,
  School,
  ArrowRight,
  Activity,
  Brain,
  Clock,
  UserPlus,
} from 'lucide-react'

export default function PacientesPage() {
  const { patients } = useDashboard()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [diagnosisFilter, setDiagnosisFilter] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.parent.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter
    const matchesDiagnosis = diagnosisFilter === 'all' || 
                            patient.diagnosis.some(d => d.toLowerCase().includes(diagnosisFilter.toLowerCase()))
    return matchesSearch && matchesStatus && matchesDiagnosis
  })

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.patient-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      )
    }
  }, [filteredPatients])

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
            <p className="text-gray-500">{patients.length} pacientes cadastrados</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white hover:opacity-90">
                <UserPlus className="w-4 h-4 mr-2" />
                Novo Paciente
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Paciente</DialogTitle>
                <DialogDescription>
                  Preencha os dados do paciente para cadastra-lo na plataforma.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="Nome do paciente" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input id="age" type="number" placeholder="Anos" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnostico</Label>
                  <Input id="diagnosis" placeholder="Ex: TEA Nivel 1, TDAH" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parent">Nome do responsavel</Label>
                    <Input id="parent" placeholder="Nome do responsavel" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">Escola</Label>
                  <Input id="school" placeholder="Nome da escola" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cadastrar Paciente
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome ou responsavel..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  <SelectItem value="active">Ativos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="inactive">Inativos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={diagnosisFilter} onValueChange={setDiagnosisFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Diagnostico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="tea">TEA</SelectItem>
                  <SelectItem value="tdah">TDAH</SelectItem>
                  <SelectItem value="dislexia">Dislexia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Patients Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <Link
              key={patient.id}
              href={`/dashboard/pacientes/${patient.id}`}
              className="patient-card block"
            >
              <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#fd74fd]/30 group">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={patient.photo}
                          alt={patient.name}
                          width={56}
                          height={56}
                          className="rounded-full"
                        />
                        <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white
                          ${patient.status === 'active' ? 'bg-green-500' : 
                            patient.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'}
                        `} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#fd74fd] transition-colors">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-500">{patient.age} anos</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#fd74fd] group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Diagnosis Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {patient.diagnosis.map((d, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary" 
                        className="text-xs bg-[#fd74fd]/10 text-[#fd74fd]"
                      >
                        {d}
                      </Badge>
                    ))}
                  </div>

                  {/* Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="w-4 h-4" />
                      <span>{patient.parent}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <School className="w-4 h-4" />
                      <span className="truncate">{patient.school}</span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Progresso geral</span>
                      <span className="font-medium text-[#fd74fd]">
                        {patient.progress[patient.progress.length - 1]?.communication || 0}%
                      </span>
                    </div>
                    <Progress 
                      value={patient.progress[patient.progress.length - 1]?.communication || 0} 
                      className="h-2"
                    />
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Proxima: {new Date(patient.nextSession).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {patient.events.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Activity className="w-3 h-3 mr-1" />
                          {patient.events.length}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum paciente encontrado</h3>
            <p className="text-gray-500">Tente ajustar os filtros ou buscar por outro termo.</p>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
