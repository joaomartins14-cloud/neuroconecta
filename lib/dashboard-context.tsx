'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { patients as initialPatients, messages as initialMessages, appointments as initialAppointments, type Patient, type Message, type Appointment, type Event, type Note } from './mock-data'

interface DashboardContextType {
  // Patients
  patients: Patient[]
  selectedPatient: Patient | null
  setSelectedPatient: (patient: Patient | null) => void
  updatePatient: (id: string, updates: Partial<Patient>) => void
  addEventToPatient: (patientId: string, event: Omit<Event, 'id'>) => void
  addNoteToPatient: (patientId: string, note: Omit<Note, 'id'>) => void
  
  // Messages
  messages: Message[]
  markMessageAsRead: (id: string) => void
  sendMessage: (message: Omit<Message, 'id' | 'date' | 'read'>) => void
  
  // Appointments
  appointments: Appointment[]
  updateAppointment: (id: string, updates: Partial<Appointment>) => void
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void
  cancelAppointment: (id: string) => void
  
  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  currentView: string
  setCurrentView: (view: string) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState('dashboard')

  const updatePatient = useCallback((id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    if (selectedPatient?.id === id) {
      setSelectedPatient(prev => prev ? { ...prev, ...updates } : null)
    }
  }, [selectedPatient])

  const addEventToPatient = useCallback((patientId: string, event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: `e${Date.now()}`,
    }
    setPatients(prev => prev.map(p => 
      p.id === patientId 
        ? { ...p, events: [newEvent, ...p.events] }
        : p
    ))
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(prev => prev ? { ...prev, events: [newEvent, ...prev.events] } : null)
    }
  }, [selectedPatient])

  const addNoteToPatient = useCallback((patientId: string, note: Omit<Note, 'id'>) => {
    const newNote: Note = {
      ...note,
      id: `n${Date.now()}`,
    }
    setPatients(prev => prev.map(p => 
      p.id === patientId 
        ? { ...p, notes: [newNote, ...p.notes] }
        : p
    ))
    if (selectedPatient?.id === patientId) {
      setSelectedPatient(prev => prev ? { ...prev, notes: [newNote, ...prev.notes] } : null)
    }
  }, [selectedPatient])

  const markMessageAsRead = useCallback((id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
  }, [])

  const sendMessage = useCallback((message: Omit<Message, 'id' | 'date' | 'read'>) => {
    const newMessage: Message = {
      ...message,
      id: `m${Date.now()}`,
      date: new Date().toISOString(),
      read: true,
    }
    setMessages(prev => [newMessage, ...prev])
  }, [])

  const updateAppointment = useCallback((id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
  }, [])

  const addAppointment = useCallback((appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `a${Date.now()}`,
    }
    setAppointments(prev => [...prev, newAppointment])
  }, [])

  const cancelAppointment = useCallback((id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a))
  }, [])

  return (
    <DashboardContext.Provider value={{
      patients,
      selectedPatient,
      setSelectedPatient,
      updatePatient,
      addEventToPatient,
      addNoteToPatient,
      messages,
      markMessageAsRead,
      sendMessage,
      appointments,
      updateAppointment,
      addAppointment,
      cancelAppointment,
      sidebarOpen,
      setSidebarOpen,
      currentView,
      setCurrentView,
    }}>
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider')
  }
  return context
}
