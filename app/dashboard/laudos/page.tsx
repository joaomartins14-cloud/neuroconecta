'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useDashboard } from '@/lib/dashboard-context'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
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
  ClipboardList,
  FileText,
  Download,
  Eye,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  Printer,
  Send,
} from 'lucide-react'

interface Laudo {
  id: string
  patientId: string
  patientName: string
  patientPhoto: string
  type: string
  status: 'draft' | 'review' | 'completed' | 'sent'
  createdAt: string
  updatedAt: string
  diagnosis: string[]
  cid: string[]
}

const mockLaudos: Laudo[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Miguel Santos',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
    type: 'Avaliacao Neuropsicologica',
    status: 'completed',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-15',
    diagnosis: ['TEA Nivel 1', 'TDAH'],
    cid: ['F84.0', 'F90.0'],
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Sofia Oliveira',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    type: 'Laudo para Escola',
    status: 'review',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-14',
    diagnosis: ['TEA Nivel 2'],
    cid: ['F84.0'],
  },
  {
    id: '3',
    patientId: '4',
    patientName: 'Isabella Costa',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella',
    type: 'Avaliacao Inicial',
    status: 'draft',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
    diagnosis: ['TEA Nivel 1'],
    cid: ['F84.0'],
  },
  {
    id: '4',
    patientId: '3',
    patientName: 'Lucas Ferreira',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    type: 'Laudo para INSS',
    status: 'sent',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-08',
    diagnosis: ['TDAH', 'Dislexia'],
    cid: ['F90.0', 'F81.0'],
  },
]

const laudoTypes = [
  'Avaliacao Neuropsicologica',
  'Laudo para Escola',
  'Laudo para INSS',
  'Avaliacao Inicial',
  'Relatorio de Acompanhamento',
  'Parecer Clinico',
]

const cidOptions = [
  { code: 'F84.0', name: 'Autismo infantil' },
  { code: 'F84.1', name: 'Autismo atipico' },
  { code: 'F84.5', name: 'Sindrome de Asperger' },
  { code: 'F90.0', name: 'Disturbios da atividade e da atencao (TDAH)' },
  { code: 'F81.0', name: 'Transtorno especifico de leitura (Dislexia)' },
  { code: 'F82', name: 'Transtorno especifico do desenvolvimento motor' },
]

export default function LaudosPage() {
  const { patients } = useDashboard()
  const [laudos, setLaudos] = useState<Laudo[]>(mockLaudos)
  const [isNewLaudoOpen, setIsNewLaudoOpen] = useState(false)
  const [selectedLaudo, setSelectedLaudo] = useState<Laudo | null>(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [newLaudo, setNewLaudo] = useState({
    patientId: '',
    type: '',
    cid: [] as string[],
    observations: '',
  })

  const filteredLaudos = laudos.filter(l => 
    statusFilter === 'all' || l.status === statusFilter
  )

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'draft': return { label: 'Rascunho', color: 'bg-gray-100 text-gray-700', icon: <Clock className="w-4 h-4" /> }
      case 'review': return { label: 'Em revisao', color: 'bg-yellow-100 text-yellow-700', icon: <AlertCircle className="w-4 h-4" /> }
      case 'completed': return { label: 'Concluido', color: 'bg-green-100 text-green-700', icon: <CheckCircle className="w-4 h-4" /> }
      case 'sent': return { label: 'Enviado', color: 'bg-blue-100 text-blue-700', icon: <Send className="w-4 h-4" /> }
      default: return { label: status, color: 'bg-gray-100 text-gray-700', icon: <Clock className="w-4 h-4" /> }
    }
  }

  const handleCreateLaudo = () => {
    const patient = patients.find(p => p.id === newLaudo.patientId)
    if (patient) {
      const newLaudoObj: Laudo = {
        id: String(Date.now()),
        patientId: patient.id,
        patientName: patient.name,
        patientPhoto: patient.photo,
        type: newLaudo.type,
        status: 'draft',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        diagnosis: patient.diagnosis,
        cid: newLaudo.cid,
      }
      setLaudos([newLaudoObj, ...laudos])
      setIsNewLaudoOpen(false)
      setNewLaudo({ patientId: '', type: '', cid: [], observations: '' })
    }
  }

  const handleUpdateStatus = (id: string, newStatus: Laudo['status']) => {
    setLaudos(laudos.map(l => l.id === id ? { ...l, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : l))
    setSelectedLaudo(null)
  }

  const stats = {
    total: laudos.length,
    drafts: laudos.filter(l => l.status === 'draft').length,
    review: laudos.filter(l => l.status === 'review').length,
    completed: laudos.filter(l => l.status === 'completed').length,
    sent: laudos.filter(l => l.status === 'sent').length,
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <ClipboardList className="w-7 h-7 text-[#fd74fd]" />
              Laudos e Pareceres
            </h1>
            <p className="text-gray-500">Gerencie laudos clinicos e documentos oficiais</p>
          </div>
          <Dialog open={isNewLaudoOpen} onOpenChange={setIsNewLaudoOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white">
                <Plus className="w-4 h-4 mr-2" />
                Novo Laudo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Laudo</DialogTitle>
                <DialogDescription>Preencha as informacoes para gerar um novo laudo clinico.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label>Paciente</Label>
                  <Select value={newLaudo.patientId} onValueChange={(v) => setNewLaudo({...newLaudo, patientId: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o paciente" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          <div className="flex items-center gap-2">
                            <span>{p.name}</span>
                            <Badge variant="secondary" className="text-xs">{p.diagnosis[0]}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de Laudo</Label>
                  <Select value={newLaudo.type} onValueChange={(v) => setNewLaudo({...newLaudo, type: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {laudoTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>CID-10 (selecione os aplicaveis)</Label>
                  <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-lg">
                    {cidOptions.map((cid) => (
                      <div key={cid.code} className="flex items-center space-x-2">
                        <Checkbox 
                          id={cid.code}
                          checked={newLaudo.cid.includes(cid.code)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewLaudo({...newLaudo, cid: [...newLaudo.cid, cid.code]})
                            } else {
                              setNewLaudo({...newLaudo, cid: newLaudo.cid.filter(c => c !== cid.code)})
                            }
                          }}
                        />
                        <label htmlFor={cid.code} className="text-sm">
                          <span className="font-medium">{cid.code}</span> - {cid.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Observacoes Iniciais</Label>
                  <Textarea 
                    value={newLaudo.observations}
                    onChange={(e) => setNewLaudo({...newLaudo, observations: e.target.value})}
                    placeholder="Adicione observacoes relevantes..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewLaudoOpen(false)}>Cancelar</Button>
                <Button 
                  onClick={handleCreateLaudo}
                  className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white"
                  disabled={!newLaudo.patientId || !newLaudo.type}
                >
                  Criar Laudo
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fd74fd]/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#fd74fd]" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-xs text-gray-500">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('draft')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.drafts}</p>
                  <p className="text-xs text-gray-500">Rascunhos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('review')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{stats.review}</p>
                  <p className="text-xs text-gray-500">Em revisao</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('completed')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                  <p className="text-xs text-gray-500">Concluidos</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStatusFilter('sent')}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.sent}</p>
                  <p className="text-xs text-gray-500">Enviados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter indicator */}
        {statusFilter !== 'all' && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              Filtro: {getStatusConfig(statusFilter).label}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => setStatusFilter('all')}>
              Limpar filtro
            </Button>
          </div>
        )}

        {/* Laudos List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Laudos Recentes</CardTitle>
            <CardDescription>{filteredLaudos.length} laudos encontrados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLaudos.map((laudo) => {
                const statusConfig = getStatusConfig(laudo.status)
                
                return (
                  <div 
                    key={laudo.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#fd74fd]/30 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedLaudo(laudo)}
                  >
                    <Image
                      src={laudo.patientPhoto}
                      alt={laudo.patientName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{laudo.patientName}</h4>
                        <Badge className={statusConfig.color}>
                          {statusConfig.icon}
                          <span className="ml-1">{statusConfig.label}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{laudo.type}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          Criado: {new Date(laudo.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex gap-1">
                          {laudo.cid.map((c) => (
                            <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Printer className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}

              {filteredLaudos.length === 0 && (
                <div className="text-center py-12">
                  <ClipboardList className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Nenhum laudo encontrado</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Laudo Detail Modal */}
        <Dialog open={!!selectedLaudo} onOpenChange={() => setSelectedLaudo(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedLaudo && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <Image
                      src={selectedLaudo.patientPhoto}
                      alt={selectedLaudo.patientName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <span>{selectedLaudo.type}</span>
                      <p className="text-sm font-normal text-gray-500">{selectedLaudo.patientName}</p>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500">Status atual</p>
                      <Badge className={getStatusConfig(selectedLaudo.status).color}>
                        {getStatusConfig(selectedLaudo.status).icon}
                        <span className="ml-1">{getStatusConfig(selectedLaudo.status).label}</span>
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ultima atualizacao</p>
                      <p className="font-medium">{new Date(selectedLaudo.updatedAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Diagnosticos</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLaudo.diagnosis.map((d, i) => (
                        <Badge key={i} variant="secondary">{d}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Codigos CID-10</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedLaudo.cid.map((c) => (
                        <Badge key={c} variant="outline">{c}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Alterar Status</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={selectedLaudo.status === 'draft' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => handleUpdateStatus(selectedLaudo.id, 'draft')}
                      >
                        Rascunho
                      </Button>
                      <Button 
                        variant={selectedLaudo.status === 'review' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => handleUpdateStatus(selectedLaudo.id, 'review')}
                      >
                        Em revisao
                      </Button>
                      <Button 
                        variant={selectedLaudo.status === 'completed' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => handleUpdateStatus(selectedLaudo.id, 'completed')}
                      >
                        Concluido
                      </Button>
                      <Button 
                        variant={selectedLaudo.status === 'sent' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => handleUpdateStatus(selectedLaudo.id, 'sent')}
                      >
                        Enviado
                      </Button>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir
                  </Button>
                  <Button className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar PDF
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  )
}
