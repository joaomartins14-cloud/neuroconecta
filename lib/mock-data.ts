'use client'

// Mock data for NeuroConecta Dashboard Demo - All Stakeholders

// ============ TYPES ============

export interface Patient {
  id: string
  name: string
  age: number
  birthDate: string
  diagnosis: string[]
  photo: string
  parent: string
  parentPhone: string
  parentEmail: string
  school: string
  schoolId: string
  teacher: string
  teacherEmail: string
  lastSession: string
  nextSession: string
  status: 'active' | 'pending' | 'inactive'
  sensoryProfile: SensoryProfile
  events: Event[]
  routines: Routine[]
  notes: Note[]
  progress: ProgressData[]
  medications: Medication[]
  therapies: Therapy[]
}

export interface SensoryProfile {
  auditory: { score: number; level: 'hypo' | 'typical' | 'hyper' }
  visual: { score: number; level: 'hypo' | 'typical' | 'hyper' }
  tactile: { score: number; level: 'hypo' | 'typical' | 'hyper' }
  vestibular: { score: number; level: 'hypo' | 'typical' | 'hyper' }
  proprioceptive: { score: number; level: 'hypo' | 'typical' | 'hyper' }
  gustatory: { score: number; level: 'hypo' | 'typical' | 'hyper' }
  lastUpdated: string
}

export interface Event {
  id: string
  patientId?: string
  patientName?: string
  date: string
  type: 'crisis' | 'achievement' | 'observation' | 'medical' | 'behavior'
  title: string
  description: string
  reportedBy: 'family' | 'school' | 'clinic'
  reporterName?: string
  severity?: 'low' | 'medium' | 'high'
  tags: string[]
  attachments?: string[]
  response?: string
}

export interface Routine {
  id: string
  name: string
  time: string
  days: string[]
  status: 'active' | 'paused'
  completionRate: number
  icon: string
  steps?: RoutineStep[]
}

export interface RoutineStep {
  id: string
  name: string
  completed: boolean
  order: number
}

export interface Note {
  id: string
  date: string
  content: string
  author: string
  authorRole: 'clinic' | 'school' | 'family'
  type: 'clinical' | 'observation' | 'recommendation' | 'school-report'
  visibility: 'all' | 'clinic-only' | 'school-clinic'
}

export interface ProgressData {
  month: string
  communication: number
  social: number
  sensory: number
  behavior: number
  academic?: number
}

export interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  time: string[]
  startDate: string
  prescribedBy: string
  notes?: string
}

export interface Therapy {
  id: string
  type: string
  professional: string
  frequency: string
  location: string
  status: 'active' | 'paused' | 'completed'
  startDate: string
}

export interface Message {
  id: string
  from: string
  fromRole: 'family' | 'school' | 'clinic' | 'management'
  to: string
  toRole: 'family' | 'school' | 'clinic' | 'management'
  patientId: string
  patientName: string
  subject: string
  preview: string
  content: string
  date: string
  read: boolean
  priority: 'normal' | 'urgent'
  attachments?: string[]
  replies?: MessageReply[]
}

export interface MessageReply {
  id: string
  from: string
  fromRole: 'family' | 'school' | 'clinic'
  content: string
  date: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientPhoto: string
  type: 'consultation' | 'evaluation' | 'follow-up' | 'team-meeting' | 'school-meeting' | 'home-visit'
  date: string
  time: string
  duration: number
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
  location?: string
  professional?: string
  notes?: string
}

export interface School {
  id: string
  name: string
  type: 'municipal' | 'estadual' | 'particular' | 'apae'
  address: string
  phone: string
  coordinator: string
  totalStudents: number
  neurodivergenteStudents: number
  teachers: Teacher[]
}

export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  classroom: string
  students: string[] // patient IDs
  specialization?: string
}

export interface FamilyMember {
  id: string
  name: string
  relationship: 'mother' | 'father' | 'guardian' | 'grandparent' | 'sibling'
  phone: string
  email: string
  isMainContact: boolean
}

export interface Laudo {
  id: string
  patientId: string
  patientName: string
  type: 'diagnostic' | 'school' | 'benefits' | 'follow-up'
  status: 'draft' | 'pending-review' | 'approved' | 'delivered'
  createdAt: string
  updatedAt: string
  professional: string
  cid10: string[]
  summary: string
  recommendations: string[]
}

export interface Report {
  id: string
  title: string
  type: 'weekly' | 'monthly' | 'semester' | 'annual' | 'individual'
  scope: 'patient' | 'school' | 'clinic' | 'municipal'
  period: string
  createdAt: string
  status: 'draft' | 'ready' | 'sent'
  data: Record<string, unknown>
}

// ============ MOCK DATA ============

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Miguel Santos',
    age: 7,
    birthDate: '2017-03-15',
    diagnosis: ['TEA Nivel 1', 'TDAH'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
    parent: 'Ana Santos',
    parentPhone: '(11) 99999-1234',
    parentEmail: 'ana.santos@email.com',
    school: 'Escola Municipal Monteiro Lobato',
    schoolId: 'sch1',
    teacher: 'Prof. Maria Silva',
    teacherEmail: 'maria.silva@escola.com',
    lastSession: '2024-01-15',
    nextSession: '2024-01-22',
    status: 'active',
    sensoryProfile: {
      auditory: { score: 85, level: 'hyper' },
      visual: { score: 60, level: 'typical' },
      tactile: { score: 78, level: 'hyper' },
      vestibular: { score: 45, level: 'typical' },
      proprioceptive: { score: 30, level: 'hypo' },
      gustatory: { score: 72, level: 'hyper' },
      lastUpdated: '2024-01-10',
    },
    events: [
      {
        id: 'e1',
        date: '2024-01-14',
        type: 'achievement',
        title: 'Primeira interacao em grupo',
        description: 'Miguel participou espontaneamente de uma atividade em grupo pela primeira vez, mantendo contato visual por 30 segundos.',
        reportedBy: 'school',
        reporterName: 'Prof. Maria Silva',
        tags: ['social', 'comunicacao'],
      },
      {
        id: 'e2',
        date: '2024-01-12',
        type: 'crisis',
        title: 'Sobrecarga sensorial',
        description: 'Episodio de sobrecarga durante o recreio devido ao barulho. Durou 15 minutos, acalmou com fones abafadores.',
        reportedBy: 'school',
        reporterName: 'Prof. Maria Silva',
        severity: 'medium',
        tags: ['sensorial', 'auditivo'],
      },
      {
        id: 'e3',
        date: '2024-01-10',
        type: 'observation',
        title: 'Melhora na alimentacao',
        description: 'Aceitou experimentar um novo alimento (cenoura) durante o almoco. Grande progresso!',
        reportedBy: 'family',
        reporterName: 'Ana Santos',
        tags: ['alimentacao', 'gustativo'],
      },
    ],
    routines: [
      { 
        id: 'r1', 
        name: 'Rotina matinal', 
        time: '07:00', 
        days: ['seg', 'ter', 'qua', 'qui', 'sex'], 
        status: 'active', 
        completionRate: 85, 
        icon: 'sun',
        steps: [
          { id: 's1', name: 'Acordar', completed: true, order: 1 },
          { id: 's2', name: 'Ir ao banheiro', completed: true, order: 2 },
          { id: 's3', name: 'Escovar os dentes', completed: true, order: 3 },
          { id: 's4', name: 'Trocar de roupa', completed: false, order: 4 },
          { id: 's5', name: 'Tomar cafe', completed: false, order: 5 },
        ]
      },
      { id: 'r2', name: 'Hora do estudo', time: '15:00', days: ['seg', 'ter', 'qua', 'qui', 'sex'], status: 'active', completionRate: 70, icon: 'book' },
      { id: 'r3', name: 'Rotina noturna', time: '20:00', days: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'], status: 'active', completionRate: 90, icon: 'moon' },
    ],
    notes: [
      { id: 'n1', date: '2024-01-15', content: 'Paciente demonstra progresso significativo em habilidades sociais. Recomendo continuar com terapia ABA 2x/semana.', author: 'Dr. Carlos Mendes', authorRole: 'clinic', type: 'clinical', visibility: 'all' },
      { id: 'n2', date: '2024-01-08', content: 'Iniciar uso de fones abafadores em ambientes ruidosos. Familia relata melhora no sono.', author: 'Dr. Carlos Mendes', authorRole: 'clinic', type: 'recommendation', visibility: 'all' },
    ],
    progress: [
      { month: 'Ago', communication: 45, social: 30, sensory: 55, behavior: 60, academic: 50 },
      { month: 'Set', communication: 50, social: 35, sensory: 58, behavior: 65, academic: 55 },
      { month: 'Out', communication: 55, social: 42, sensory: 62, behavior: 68, academic: 58 },
      { month: 'Nov', communication: 62, social: 48, sensory: 65, behavior: 72, academic: 62 },
      { month: 'Dez', communication: 68, social: 55, sensory: 70, behavior: 75, academic: 68 },
      { month: 'Jan', communication: 75, social: 62, sensory: 72, behavior: 78, academic: 72 },
    ],
    medications: [
      { id: 'med1', name: 'Ritalina', dosage: '10mg', frequency: 'Diaria', time: ['08:00'], startDate: '2023-06-01', prescribedBy: 'Dr. Carlos Mendes' }
    ],
    therapies: [
      { id: 'th1', type: 'Terapia ABA', professional: 'Dra. Lucia Ferreira', frequency: '2x/semana', location: 'Clinica NeuroConecta', status: 'active', startDate: '2023-03-01' },
      { id: 'th2', type: 'Fonoaudiologia', professional: 'Dra. Patricia Lima', frequency: '1x/semana', location: 'Clinica NeuroConecta', status: 'active', startDate: '2023-05-15' },
    ]
  },
  {
    id: '2',
    name: 'Sofia Oliveira',
    age: 5,
    birthDate: '2019-07-22',
    diagnosis: ['TEA Nivel 2'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    parent: 'Pedro Oliveira',
    parentPhone: '(11) 98888-5678',
    parentEmail: 'pedro.oliveira@email.com',
    school: 'EMEI Castelinho Encantado',
    schoolId: 'sch2',
    teacher: 'Prof. Julia Costa',
    teacherEmail: 'julia.costa@escola.com',
    lastSession: '2024-01-14',
    nextSession: '2024-01-21',
    status: 'active',
    sensoryProfile: {
      auditory: { score: 40, level: 'hypo' },
      visual: { score: 82, level: 'hyper' },
      tactile: { score: 25, level: 'hypo' },
      vestibular: { score: 88, level: 'hyper' },
      proprioceptive: { score: 35, level: 'hypo' },
      gustatory: { score: 50, level: 'typical' },
      lastUpdated: '2024-01-08',
    },
    events: [
      {
        id: 'e4',
        date: '2024-01-13',
        type: 'achievement',
        title: 'Uso de PECS',
        description: 'Sofia usou o sistema PECS para pedir agua pela primeira vez de forma independente.',
        reportedBy: 'school',
        reporterName: 'Prof. Julia Costa',
        tags: ['comunicacao', 'autonomia'],
      },
    ],
    routines: [
      { id: 'r4', name: 'Terapia ocupacional', time: '10:00', days: ['ter', 'qui'], status: 'active', completionRate: 95, icon: 'puzzle' },
      { id: 'r5', name: 'Fonoaudiologia', time: '14:00', days: ['seg', 'qua', 'sex'], status: 'active', completionRate: 88, icon: 'mic' },
    ],
    notes: [
      { id: 'n3', date: '2024-01-14', content: 'Avaliacao inicial concluida. Indicar integracao sensorial 3x/semana.', author: 'Dr. Carlos Mendes', authorRole: 'clinic', type: 'clinical', visibility: 'all' },
    ],
    progress: [
      { month: 'Ago', communication: 20, social: 25, sensory: 40, behavior: 50, academic: 30 },
      { month: 'Set', communication: 25, social: 28, sensory: 45, behavior: 52, academic: 32 },
      { month: 'Out', communication: 32, social: 32, sensory: 50, behavior: 55, academic: 35 },
      { month: 'Nov', communication: 40, social: 38, sensory: 55, behavior: 60, academic: 40 },
      { month: 'Dez', communication: 48, social: 45, sensory: 60, behavior: 65, academic: 45 },
      { month: 'Jan', communication: 55, social: 50, sensory: 65, behavior: 70, academic: 50 },
    ],
    medications: [],
    therapies: [
      { id: 'th3', type: 'Terapia Ocupacional', professional: 'Dra. Renata Souza', frequency: '3x/semana', location: 'Clinica NeuroConecta', status: 'active', startDate: '2023-08-01' },
      { id: 'th4', type: 'Fonoaudiologia', professional: 'Dra. Patricia Lima', frequency: '3x/semana', location: 'Clinica NeuroConecta', status: 'active', startDate: '2023-08-01' },
    ]
  },
  {
    id: '3',
    name: 'Lucas Ferreira',
    age: 9,
    birthDate: '2015-11-08',
    diagnosis: ['TDAH', 'Dislexia'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    parent: 'Mariana Ferreira',
    parentPhone: '(11) 97777-9012',
    parentEmail: 'mariana.ferreira@email.com',
    school: 'Colegio Futuro Brilhante',
    schoolId: 'sch3',
    teacher: 'Prof. Roberto Lima',
    teacherEmail: 'roberto.lima@escola.com',
    lastSession: '2024-01-13',
    nextSession: '2024-01-20',
    status: 'active',
    sensoryProfile: {
      auditory: { score: 55, level: 'typical' },
      visual: { score: 48, level: 'typical' },
      tactile: { score: 65, level: 'typical' },
      vestibular: { score: 75, level: 'hyper' },
      proprioceptive: { score: 80, level: 'hyper' },
      gustatory: { score: 52, level: 'typical' },
      lastUpdated: '2024-01-05',
    },
    events: [
      {
        id: 'e5',
        date: '2024-01-12',
        type: 'observation',
        title: 'Dificuldade de foco',
        description: 'Lucas teve dificuldade em manter foco durante a aula de matematica. Sugerido intervalos de 15 minutos.',
        reportedBy: 'school',
        reporterName: 'Prof. Roberto Lima',
        tags: ['atencao', 'academico'],
      },
    ],
    routines: [
      { id: 'r6', name: 'Medicacao', time: '07:30', days: ['seg', 'ter', 'qua', 'qui', 'sex'], status: 'active', completionRate: 100, icon: 'pill' },
      { id: 'r7', name: 'Reforco escolar', time: '16:00', days: ['ter', 'qui'], status: 'active', completionRate: 75, icon: 'pencil' },
    ],
    notes: [
      { id: 'n4', date: '2024-01-13', content: 'Ajuste de medicacao Ritalina 10mg para 15mg. Reavaliar em 30 dias.', author: 'Dr. Carlos Mendes', authorRole: 'clinic', type: 'clinical', visibility: 'clinic-only' },
    ],
    progress: [
      { month: 'Ago', communication: 70, social: 65, sensory: 60, behavior: 45, academic: 40 },
      { month: 'Set', communication: 72, social: 68, sensory: 62, behavior: 50, academic: 45 },
      { month: 'Out', communication: 75, social: 70, sensory: 65, behavior: 55, academic: 52 },
      { month: 'Nov', communication: 78, social: 72, sensory: 68, behavior: 62, academic: 58 },
      { month: 'Dez', communication: 80, social: 75, sensory: 70, behavior: 68, academic: 65 },
      { month: 'Jan', communication: 82, social: 78, sensory: 72, behavior: 72, academic: 70 },
    ],
    medications: [
      { id: 'med2', name: 'Ritalina', dosage: '15mg', frequency: 'Diaria', time: ['08:00'], startDate: '2024-01-13', prescribedBy: 'Dr. Carlos Mendes', notes: 'Ajuste de dose de 10mg para 15mg' }
    ],
    therapies: [
      { id: 'th5', type: 'Psicopedagogia', professional: 'Dra. Camila Rocha', frequency: '2x/semana', location: 'Clinica NeuroConecta', status: 'active', startDate: '2023-02-01' },
    ]
  },
  {
    id: '4',
    name: 'Isabella Costa',
    age: 6,
    birthDate: '2018-05-30',
    diagnosis: ['TEA Nivel 1'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella',
    parent: 'Ricardo Costa',
    parentPhone: '(11) 96666-3456',
    parentEmail: 'ricardo.costa@email.com',
    school: 'Escola Arco-Iris',
    schoolId: 'sch4',
    teacher: 'Prof. Carla Dias',
    teacherEmail: 'carla.dias@escola.com',
    lastSession: '2024-01-11',
    nextSession: '2024-01-18',
    status: 'pending',
    sensoryProfile: {
      auditory: { score: 70, level: 'hyper' },
      visual: { score: 55, level: 'typical' },
      tactile: { score: 85, level: 'hyper' },
      vestibular: { score: 50, level: 'typical' },
      proprioceptive: { score: 45, level: 'typical' },
      gustatory: { score: 90, level: 'hyper' },
      lastUpdated: '2024-01-02',
    },
    events: [],
    routines: [
      { id: 'r8', name: 'ABA em casa', time: '17:00', days: ['seg', 'qua', 'sex'], status: 'active', completionRate: 80, icon: 'home' },
    ],
    notes: [],
    progress: [
      { month: 'Ago', communication: 55, social: 50, sensory: 45, behavior: 65, academic: 55 },
      { month: 'Set', communication: 58, social: 52, sensory: 48, behavior: 68, academic: 58 },
      { month: 'Out', communication: 62, social: 55, sensory: 52, behavior: 70, academic: 60 },
      { month: 'Nov', communication: 65, social: 58, sensory: 55, behavior: 72, academic: 63 },
      { month: 'Dez', communication: 68, social: 62, sensory: 58, behavior: 75, academic: 67 },
      { month: 'Jan', communication: 72, social: 65, sensory: 62, behavior: 78, academic: 70 },
    ],
    medications: [],
    therapies: [
      { id: 'th6', type: 'Terapia ABA', professional: 'Dra. Lucia Ferreira', frequency: '3x/semana', location: 'Domicilio', status: 'active', startDate: '2023-09-01' },
    ]
  },
  {
    id: '5',
    name: 'Gabriel Almeida',
    age: 8,
    birthDate: '2016-01-12',
    diagnosis: ['TEA Nivel 2', 'Apraxia da Fala'],
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
    parent: 'Fernanda Almeida',
    parentPhone: '(11) 95555-7890',
    parentEmail: 'fernanda.almeida@email.com',
    school: 'APAE Sao Paulo',
    schoolId: 'sch5',
    teacher: 'Prof. Amanda Rocha',
    teacherEmail: 'amanda.rocha@apae.com',
    lastSession: '2024-01-10',
    nextSession: '2024-01-17',
    status: 'active',
    sensoryProfile: {
      auditory: { score: 35, level: 'hypo' },
      visual: { score: 40, level: 'hypo' },
      tactile: { score: 30, level: 'hypo' },
      vestibular: { score: 42, level: 'hypo' },
      proprioceptive: { score: 28, level: 'hypo' },
      gustatory: { score: 38, level: 'hypo' },
      lastUpdated: '2024-01-03',
    },
    events: [
      {
        id: 'e6',
        date: '2024-01-09',
        type: 'medical',
        title: 'Consulta com neurologista',
        description: 'EEG sem alteracoes. Manter acompanhamento semestral.',
        reportedBy: 'clinic',
        reporterName: 'Dr. Carlos Mendes',
        tags: ['medico', 'neurologico'],
      },
    ],
    routines: [
      { id: 'r9', name: 'Fono intensiva', time: '09:00', days: ['seg', 'ter', 'qua', 'qui', 'sex'], status: 'active', completionRate: 92, icon: 'mic' },
      { id: 'r10', name: 'Musicoterapia', time: '14:00', days: ['ter', 'qui'], status: 'active', completionRate: 100, icon: 'music' },
    ],
    notes: [
      { id: 'n5', date: '2024-01-10', content: 'Paciente responde bem a musicoterapia. Aumentar sessoes para 3x/semana.', author: 'Dr. Carlos Mendes', authorRole: 'clinic', type: 'recommendation', visibility: 'all' },
    ],
    progress: [
      { month: 'Ago', communication: 15, social: 20, sensory: 35, behavior: 55, academic: 20 },
      { month: 'Set', communication: 18, social: 22, sensory: 38, behavior: 58, academic: 22 },
      { month: 'Out', communication: 22, social: 25, sensory: 42, behavior: 60, academic: 25 },
      { month: 'Nov', communication: 28, social: 30, sensory: 45, behavior: 62, academic: 28 },
      { month: 'Dez', communication: 35, social: 35, sensory: 48, behavior: 65, academic: 32 },
      { month: 'Jan', communication: 42, social: 40, sensory: 52, behavior: 68, academic: 38 },
    ],
    medications: [],
    therapies: [
      { id: 'th7', type: 'Fonoaudiologia Intensiva', professional: 'Dra. Patricia Lima', frequency: '5x/semana', location: 'Clinica NeuroConecta', status: 'active', startDate: '2023-01-15' },
      { id: 'th8', type: 'Musicoterapia', professional: 'Dr. Marcos Souza', frequency: '2x/semana', location: 'Clinica NeuroConecta', status: 'active', startDate: '2023-06-01' },
    ]
  },
]

// Schools Data
export const schools: School[] = [
  {
    id: 'sch1',
    name: 'Escola Municipal Monteiro Lobato',
    type: 'municipal',
    address: 'Rua das Flores, 123 - Centro',
    phone: '(11) 3333-1111',
    coordinator: 'Dra. Helena Martins',
    totalStudents: 450,
    neurodivergenteStudents: 12,
    teachers: [
      { id: 't1', name: 'Prof. Maria Silva', email: 'maria.silva@escola.com', phone: '(11) 99111-1111', classroom: '2o Ano A', students: ['1'] },
      { id: 't2', name: 'Prof. Jose Santos', email: 'jose.santos@escola.com', phone: '(11) 99111-2222', classroom: '3o Ano B', students: [] },
    ]
  },
  {
    id: 'sch2',
    name: 'EMEI Castelinho Encantado',
    type: 'municipal',
    address: 'Av. Brasil, 456 - Jardim',
    phone: '(11) 3333-2222',
    coordinator: 'Dra. Patricia Souza',
    totalStudents: 280,
    neurodivergenteStudents: 8,
    teachers: [
      { id: 't3', name: 'Prof. Julia Costa', email: 'julia.costa@escola.com', phone: '(11) 99222-1111', classroom: 'Pre II', students: ['2'] },
    ]
  },
  {
    id: 'sch3',
    name: 'Colegio Futuro Brilhante',
    type: 'particular',
    address: 'Rua Esperanca, 789 - Vila Nova',
    phone: '(11) 3333-3333',
    coordinator: 'Dr. Fernando Lima',
    totalStudents: 620,
    neurodivergenteStudents: 15,
    teachers: [
      { id: 't4', name: 'Prof. Roberto Lima', email: 'roberto.lima@escola.com', phone: '(11) 99333-1111', classroom: '4o Ano A', students: ['3'] },
    ]
  },
]

// Messages (expanded)
export const messages: Message[] = [
  {
    id: 'm1',
    from: 'Ana Santos',
    fromRole: 'family',
    to: 'Dr. Carlos Mendes',
    toRole: 'clinic',
    patientId: '1',
    patientName: 'Miguel Santos',
    subject: 'Duvida sobre medicacao',
    preview: 'Doutor, gostaria de saber se posso dar o remedio junto com...',
    content: 'Doutor, gostaria de saber se posso dar o remedio junto com o cafe da manha ou precisa ser em jejum? O Miguel tem reclamado de dor de barriga quando toma sem comer nada antes.',
    date: '2024-01-15T10:30:00',
    read: false,
    priority: 'normal',
  },
  {
    id: 'm2',
    from: 'Prof. Maria Silva',
    fromRole: 'school',
    to: 'Dr. Carlos Mendes',
    toRole: 'clinic',
    patientId: '1',
    patientName: 'Miguel Santos',
    subject: 'Relatorio semanal - Miguel',
    preview: 'Segue o relatorio da semana do Miguel. Tivemos alguns avancos...',
    content: 'Segue o relatorio da semana do Miguel. Tivemos alguns avancos importantes: ele participou da roda de conversa pela primeira vez e conseguiu manter o foco por 10 minutos na atividade de pintura. Porem, ainda apresenta dificuldade no recreio devido ao barulho.',
    date: '2024-01-15T09:15:00',
    read: false,
    priority: 'normal',
  },
  {
    id: 'm3',
    from: 'Pedro Oliveira',
    fromRole: 'family',
    to: 'Dr. Carlos Mendes',
    toRole: 'clinic',
    patientId: '2',
    patientName: 'Sofia Oliveira',
    subject: 'Urgente: Episodio de crise',
    preview: 'Doutor, a Sofia teve uma crise forte ontem a noite...',
    content: 'Doutor, a Sofia teve uma crise forte ontem a noite apos uma mudanca na rotina. Ela ficou muito agitada por cerca de 40 minutos e nao conseguimos acalma-la com as tecnicas habituais. Precisamos remarcar a consulta para o mais breve possivel?',
    date: '2024-01-14T22:45:00',
    read: false,
    priority: 'urgent',
  },
  {
    id: 'm4',
    from: 'Prof. Julia Costa',
    fromRole: 'school',
    to: 'Pedro Oliveira',
    toRole: 'family',
    patientId: '2',
    patientName: 'Sofia Oliveira',
    subject: 'Progresso com PECS',
    preview: 'Quero compartilhar uma otima noticia! A Sofia usou...',
    content: 'Quero compartilhar uma otima noticia! A Sofia usou o sistema PECS de forma independente hoje para pedir agua. Foi a primeira vez que ela fez isso sem nenhum prompt. A equipe toda ficou muito emocionada!',
    date: '2024-01-13T16:20:00',
    read: true,
    priority: 'normal',
  },
  {
    id: 'm5',
    from: 'Mariana Ferreira',
    fromRole: 'family',
    to: 'Dr. Carlos Mendes',
    toRole: 'clinic',
    patientId: '3',
    patientName: 'Lucas Ferreira',
    subject: 'Efeitos da medicacao',
    preview: 'Doutor, notei que o Lucas esta com menos apetite desde...',
    content: 'Doutor, notei que o Lucas esta com menos apetite desde que aumentamos a dose da Ritalina. Ele tambem tem tido dificuldade para dormir. Isso e normal? Devo me preocupar?',
    date: '2024-01-14T14:00:00',
    read: true,
    priority: 'normal',
  },
  {
    id: 'm6',
    from: 'Secretaria de Saude',
    fromRole: 'management',
    to: 'Dr. Carlos Mendes',
    toRole: 'clinic',
    patientId: '',
    patientName: '',
    subject: 'Solicitacao de Relatorio Mensal',
    preview: 'Prezado Dr. Carlos, solicitamos o envio do relatorio mensal...',
    content: 'Prezado Dr. Carlos, solicitamos o envio do relatorio mensal de atendimentos da clinica referente a janeiro/2024. O prazo para envio e ate o dia 05/02/2024. Atenciosamente, Coordenacao de Saude Mental.',
    date: '2024-01-16T08:00:00',
    read: false,
    priority: 'normal',
  },
]

// Appointments (expanded)
export const appointments: Appointment[] = [
  {
    id: 'a1',
    patientId: '1',
    patientName: 'Miguel Santos',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
    type: 'follow-up',
    date: '2024-01-22',
    time: '09:00',
    duration: 45,
    status: 'confirmed',
    professional: 'Dr. Carlos Mendes',
    notes: 'Reavaliar perfil sensorial',
  },
  {
    id: 'a2',
    patientId: '2',
    patientName: 'Sofia Oliveira',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    type: 'consultation',
    date: '2024-01-21',
    time: '10:00',
    duration: 60,
    status: 'confirmed',
    professional: 'Dr. Carlos Mendes',
    notes: 'Primeira consulta pos-crise',
  },
  {
    id: 'a3',
    patientId: '3',
    patientName: 'Lucas Ferreira',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    type: 'follow-up',
    date: '2024-01-20',
    time: '14:00',
    duration: 30,
    status: 'scheduled',
    professional: 'Dr. Carlos Mendes',
    notes: 'Ajuste de medicacao',
  },
  {
    id: 'a4',
    patientId: '4',
    patientName: 'Isabella Costa',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella',
    type: 'evaluation',
    date: '2024-01-18',
    time: '11:00',
    duration: 90,
    status: 'confirmed',
    professional: 'Dr. Carlos Mendes',
    notes: 'Avaliacao completa para laudo',
  },
  {
    id: 'a5',
    patientId: '5',
    patientName: 'Gabriel Almeida',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gabriel',
    type: 'team-meeting',
    date: '2024-01-17',
    time: '15:00',
    duration: 60,
    status: 'scheduled',
    professional: 'Equipe Multidisciplinar',
    notes: 'Reuniao multidisciplinar com fono e TO',
  },
  {
    id: 'a6',
    patientId: '1',
    patientName: 'Miguel Santos',
    patientPhoto: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
    type: 'school-meeting',
    date: '2024-01-25',
    time: '16:00',
    duration: 60,
    status: 'scheduled',
    location: 'Escola Municipal Monteiro Lobato',
    professional: 'Equipe Escola + Clinica',
    notes: 'Reuniao de alinhamento com a escola',
  },
]

// Laudos
export const laudos: Laudo[] = [
  {
    id: 'l1',
    patientId: '1',
    patientName: 'Miguel Santos',
    type: 'diagnostic',
    status: 'approved',
    createdAt: '2023-06-15',
    updatedAt: '2023-06-20',
    professional: 'Dr. Carlos Mendes',
    cid10: ['F84.0', 'F90.0'],
    summary: 'Crianca de 7 anos com diagnostico de Transtorno do Espectro Autista Nivel 1 e Transtorno de Deficit de Atencao e Hiperatividade.',
    recommendations: ['Terapia ABA 2x/semana', 'Fonoaudiologia 1x/semana', 'Acompanhamento psiquiatrico trimestral'],
  },
  {
    id: 'l2',
    patientId: '4',
    patientName: 'Isabella Costa',
    type: 'diagnostic',
    status: 'draft',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    professional: 'Dr. Carlos Mendes',
    cid10: ['F84.0'],
    summary: 'Em elaboracao - avaliacao agendada para 18/01.',
    recommendations: [],
  },
  {
    id: 'l3',
    patientId: '2',
    patientName: 'Sofia Oliveira',
    type: 'school',
    status: 'pending-review',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12',
    professional: 'Dr. Carlos Mendes',
    cid10: ['F84.1'],
    summary: 'Laudo escolar para adequacao curricular e apoio de profissional de apoio.',
    recommendations: ['Profissional de apoio em sala de aula', 'Adaptacao de atividades', 'Ambiente com reducao de estimulos visuais'],
  },
]

// Management/Statistics Data
export const managementStats = {
  municipal: {
    totalPatients: 1247,
    activePatients: 1089,
    waitingList: 158,
    avgWaitTime: 45, // days
    clinicsActive: 8,
    schoolsCovered: 47,
    professionalsActive: 89,
    diagnosisDistribution: [
      { name: 'TEA', value: 620 },
      { name: 'TDAH', value: 380 },
      { name: 'Dislexia', value: 145 },
      { name: 'Outros', value: 102 },
    ],
    monthlyEvolution: [
      { month: 'Jul', patients: 980, events: 1234, sessions: 3200 },
      { month: 'Ago', patients: 1020, events: 1456, sessions: 3450 },
      { month: 'Set', patients: 1065, events: 1678, sessions: 3680 },
      { month: 'Out', patients: 1120, events: 1890, sessions: 3920 },
      { month: 'Nov', patients: 1180, events: 2100, sessions: 4150 },
      { month: 'Dez', patients: 1210, events: 1980, sessions: 3890 },
      { month: 'Jan', patients: 1247, events: 2234, sessions: 4320 },
    ],
    ageDistribution: [
      { range: '0-3', count: 89 },
      { range: '4-6', count: 345 },
      { range: '7-10', count: 478 },
      { range: '11-14', count: 234 },
      { range: '15+', count: 101 },
    ],
    regionDistribution: [
      { region: 'Centro', patients: 234 },
      { region: 'Norte', patients: 312 },
      { region: 'Sul', patients: 289 },
      { region: 'Leste', patients: 245 },
      { region: 'Oeste', patients: 167 },
    ],
  },
  clinic: {
    totalPatients: 47,
    activePatients: 42,
    pendingEvaluations: 5,
    appointmentsToday: 8,
    appointmentsThisWeek: 32,
    unreadMessages: 3,
    reportsToReview: 12,
    eventsThisWeek: 23,
    laudosPending: 3,
    therapySessions: {
      thisWeek: 156,
      lastWeek: 148,
      growth: 5.4,
    },
    patientProgress: {
      improving: 35,
      stable: 8,
      needsAttention: 4,
    }
  },
}

// Dashboard Stats (for different roles)
export const dashboardStats = {
  clinic: managementStats.clinic,
  family: {
    childName: 'Miguel Santos',
    nextAppointment: '22/01/2024 - 09:00',
    pendingRoutines: 2,
    eventsThisWeek: 3,
    unreadMessages: 1,
    therapyProgress: 78,
    routineCompletion: 85,
  },
  school: {
    totalStudents: 12,
    activeAlerts: 2,
    eventsToday: 5,
    pendingReports: 3,
    meetingsThisWeek: 2,
    avgProgress: 72,
  },
  management: managementStats.municipal,
}

// Activity Timeline
export const recentActivity = [
  { id: '1', type: 'event', message: 'Novo evento registrado para Miguel Santos', time: '10 min atras', icon: 'bell', patientId: '1' },
  { id: '2', type: 'message', message: 'Nova mensagem de Ana Santos', time: '25 min atras', icon: 'mail', patientId: '1' },
  { id: '3', type: 'appointment', message: 'Consulta confirmada: Sofia Oliveira', time: '1 hora atras', icon: 'calendar', patientId: '2' },
  { id: '4', type: 'report', message: 'Relatorio escolar recebido: Lucas Ferreira', time: '2 horas atras', icon: 'file', patientId: '3' },
  { id: '5', type: 'achievement', message: 'Marco alcancado: Sofia usou PECS', time: '3 horas atras', icon: 'star', patientId: '2' },
]

// User profiles for different dashboards
export const userProfiles = {
  clinic: {
    id: 'u1',
    name: 'Dr. Carlos Mendes',
    role: 'Neurologista Pediatrico',
    email: 'carlos.mendes@neuroconecta.com.br',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrCarlos',
    crm: 'CRM-SP 123456',
  },
  family: {
    id: 'u2',
    name: 'Ana Santos',
    role: 'Mae',
    email: 'ana.santos@email.com',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    childId: '1',
    childName: 'Miguel Santos',
  },
  school: {
    id: 'u3',
    name: 'Prof. Maria Silva',
    role: 'Professora - 2o Ano A',
    email: 'maria.silva@escola.com',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    schoolId: 'sch1',
    schoolName: 'Escola Municipal Monteiro Lobato',
  },
  management: {
    id: 'u4',
    name: 'Dra. Regina Alves',
    role: 'Coordenadora de Saude Mental',
    email: 'regina.alves@prefeitura.gov.br',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Regina',
    department: 'Secretaria Municipal de Saude',
  },
}

// ============ NEW: CLINIC AND SCHOOL ADMIN STRUCTURES ============

// Clinic admin profile (manages all doctors/professionals)
export const clinicAdminProfile = {
  id: 'clinic-admin-1',
  name: 'Clinica NeuroVida',
  admin: 'Dra. Patricia Fernandes',
  role: 'Diretora Clinica',
  email: 'direcao@neurovida.com.br',
  photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
  crm: 'CRM-SP 654321',
  address: 'Av. Paulista, 1000 - Sao Paulo, SP',
  phone: '(11) 3333-4444',
}

// Doctors/Professionals in the clinic
export const clinicProfessionals = [
  {
    id: 'doc1',
    name: 'Dr. Carlos Mendes',
    specialty: 'Neurologista Pediatrico',
    crm: 'CRM-SP 123456',
    email: 'carlos.mendes@neurovida.com.br',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrCarlos',
    patientIds: ['1', '2', '3'],
    status: 'active',
    appointmentsToday: 5,
    totalPatients: 3,
  },
  {
    id: 'doc2',
    name: 'Dra. Fernanda Lima',
    specialty: 'Psiquiatra Infantil',
    crm: 'CRM-SP 789012',
    email: 'fernanda.lima@neurovida.com.br',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda',
    patientIds: ['4', '5'],
    status: 'active',
    appointmentsToday: 4,
    totalPatients: 2,
  },
  {
    id: 'doc3',
    name: 'Dr. Roberto Souza',
    specialty: 'Neuropediatra',
    crm: 'CRM-SP 345678',
    email: 'roberto.souza@neurovida.com.br',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    patientIds: ['1', '4'],
    status: 'active',
    appointmentsToday: 3,
    totalPatients: 2,
  },
  {
    id: 'doc4',
    name: 'Ana Paula Costa',
    specialty: 'Fonoaudiologa',
    registro: 'CRFa-SP 12345',
    email: 'ana.costa@neurovida.com.br',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaPaula',
    patientIds: ['1', '2', '3', '5'],
    status: 'active',
    appointmentsToday: 6,
    totalPatients: 4,
  },
  {
    id: 'doc5',
    name: 'Mariana Santos',
    specialty: 'Terapeuta Ocupacional',
    registro: 'CREFITO-SP 67890',
    email: 'mariana.santos@neurovida.com.br',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
    patientIds: ['2', '3', '4', '5'],
    status: 'active',
    appointmentsToday: 5,
    totalPatients: 4,
  },
]

// School admin profile (coordinator/director)
export const schoolAdminProfile = {
  id: 'school-admin-1',
  schoolId: 'sch1',
  name: 'Escola Municipal Monteiro Lobato',
  admin: 'Claudia Rodrigues',
  role: 'Coordenadora Pedagogica',
  email: 'coordenacao@monteirolobato.edu.br',
  photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Claudia',
  address: 'Rua das Flores, 123 - Sao Paulo, SP',
  phone: '(11) 5555-6666',
  type: 'municipal' as const,
}

// Teachers in the school with their specific students
export const schoolTeachers = [
  {
    id: 'teacher1',
    name: 'Prof. Maria Silva',
    classroom: '2o Ano A',
    email: 'maria.silva@monteirolobato.edu.br',
    phone: '(11) 99999-1111',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    studentIds: ['1', '2'], // Miguel e Sofia
    specialization: 'Educacao Inclusiva',
    status: 'active',
    eventsToday: 2,
    pendingReports: 1,
  },
  {
    id: 'teacher2',
    name: 'Prof. Joao Pereira',
    classroom: '3o Ano B',
    email: 'joao.pereira@monteirolobato.edu.br',
    phone: '(11) 99999-2222',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    studentIds: ['3'], // Lucas
    specialization: 'Psicopedagogia',
    status: 'active',
    eventsToday: 1,
    pendingReports: 2,
  },
  {
    id: 'teacher3',
    name: 'Prof. Carla Mendonca',
    classroom: '1o Ano C',
    email: 'carla.mendonca@monteirolobato.edu.br',
    phone: '(11) 99999-3333',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carla',
    studentIds: ['4', '5'], // Isabella e Gabriel
    specialization: 'Alfabetizacao',
    status: 'active',
    eventsToday: 3,
    pendingReports: 0,
  },
]

// Clinic dashboard stats
export const clinicAdminStats = {
  totalPatients: 47,
  activePatients: 42,
  totalProfessionals: 5,
  appointmentsToday: 23,
  appointmentsThisWeek: 112,
  pendingLaudos: 8,
  unreadMessages: 12,
  eventsThisWeek: 45,
  revenue: {
    thisMonth: 156000,
    lastMonth: 142000,
    growth: 9.8,
  },
  patientsBySpecialty: [
    { specialty: 'Neurologia', count: 18 },
    { specialty: 'Psiquiatria', count: 12 },
    { specialty: 'Fonoaudiologia', count: 25 },
    { specialty: 'Terapia Ocupacional', count: 20 },
  ],
  appointmentsByType: [
    { type: 'Consulta', count: 45 },
    { type: 'Avaliacao', count: 12 },
    { type: 'Retorno', count: 38 },
    { type: 'Reuniao', count: 17 },
  ],
}

// School dashboard stats
export const schoolAdminStats = {
  totalNeurodivergenteStudents: 12,
  totalTeachers: 3,
  activeAlerts: 4,
  eventsToday: 6,
  eventsThisWeek: 28,
  pendingReports: 5,
  meetingsScheduled: 3,
  avgProgress: 72,
  studentsByDiagnosis: [
    { diagnosis: 'TEA', count: 5 },
    { diagnosis: 'TDAH', count: 4 },
    { diagnosis: 'Dislexia', count: 2 },
    { diagnosis: 'Outros', count: 1 },
  ],
  studentsByClassroom: [
    { classroom: '2o Ano A', count: 2 },
    { classroom: '3o Ano B', count: 1 },
    { classroom: '1o Ano C', count: 2 },
    { classroom: 'Outros', count: 7 },
  ],
  recentAchievements: 15,
  crisisThisMonth: 8,
}

// Helper function to get patients for a specific doctor
export function getPatientsForDoctor(doctorId: string): Patient[] {
  const doctor = clinicProfessionals.find(d => d.id === doctorId)
  if (!doctor) return []
  return patients.filter(p => doctor.patientIds.includes(p.id))
}

// Helper function to get students for a specific teacher
export function getStudentsForTeacher(teacherId: string): Patient[] {
  const teacher = schoolTeachers.find(t => t.id === teacherId)
  if (!teacher) return []
  return patients.filter(p => teacher.studentIds.includes(p.id))
}

// Helper function to get all students in a school
export function getAllSchoolStudents(schoolId: string): Patient[] {
  return patients.filter(p => p.schoolId === schoolId)
}

// Helper function to get events for specific patients
export function getEventsForPatients(patientIds: string[]): Event[] {
  return patients
    .filter(p => patientIds.includes(p.id))
    .flatMap(p => p.events.map(e => ({ ...e, patientId: p.id, patientName: p.name })))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
