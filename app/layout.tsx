import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NeuroConecta | Plataforma Multidisciplinar para Neurodesenvolvimento',
  description: 'Conectando redes de apoio para transformar o desenvolvimento neurodivergente. Plataforma integrada para famílias, terapeutas, escolas e gestores públicos.',
  keywords: ['neurodesenvolvimento', 'TEA', 'TDAH', 'autismo', 'terapia', 'saúde mental', 'educação inclusiva', 'neurodiversidade'],
  authors: [{ name: 'NeuroConecta' }],
  generator: 'v0.app',
  openGraph: {
    title: 'NeuroConecta | Transformando o Neurodesenvolvimento',
    description: 'Plataforma integrada que conecta famílias, terapeutas e escolas para o cuidado de pessoas neurodivergentes.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroConecta',
    description: 'Conectando redes de apoio para o desenvolvimento neurodivergente',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
