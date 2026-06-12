import { DashboardProvider } from '@/lib/dashboard-context'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard Clinico | NeuroConecta',
  description: 'Painel de controle para profissionais de saude da plataforma NeuroConecta',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardProvider>
      {children}
    </DashboardProvider>
  )
}
