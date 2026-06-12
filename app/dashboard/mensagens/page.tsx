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
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  Reply,
  AlertCircle,
  User,
  School,
  Stethoscope,
  ChevronLeft,
} from 'lucide-react'

export default function MensagensPage() {
  const { messages, markMessageAsRead, patients } = useDashboard()
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all')
  const [replyText, setReplyText] = useState('')
  const messageListRef = useRef<HTMLDivElement>(null)

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         msg.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !msg.read) ||
                         (filter === 'urgent' && msg.priority === 'urgent')
    return matchesSearch && matchesFilter
  })

  const currentMessage = messages.find(m => m.id === selectedMessage)

  useEffect(() => {
    if (messageListRef.current) {
      const items = messageListRef.current.querySelectorAll('.message-item')
      gsap.fromTo(items,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.03, ease: 'power2.out' }
      )
    }
  }, [filteredMessages])

  const handleSelectMessage = (id: string) => {
    setSelectedMessage(id)
    markMessageAsRead(id)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'family': return <User className="w-4 h-4" />
      case 'school': return <School className="w-4 h-4" />
      case 'clinic': return <Stethoscope className="w-4 h-4" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'family': return 'Familia'
      case 'school': return 'Escola'
      case 'clinic': return 'Clinica'
      default: return role
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} min atras`
    if (diffHours < 24) return `${diffHours}h atras`
    if (diffDays < 7) return `${diffDays}d atras`
    return date.toLocaleDateString('pt-BR')
  }

  return (
    <DashboardShell>
      <div className="h-[calc(100vh-180px)]">
        <Card className="border-0 shadow-sm h-full">
          <div className="flex h-full">
            {/* Messages List */}
            <div className={`w-full md:w-96 border-r border-gray-100 flex flex-col ${selectedMessage ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mensagens</h2>
                
                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar mensagens..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <Button 
                    variant={filter === 'all' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setFilter('all')}
                    className={filter === 'all' ? 'bg-[#fd74fd] hover:bg-[#fd74fd]/90' : ''}
                  >
                    Todas
                  </Button>
                  <Button 
                    variant={filter === 'unread' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setFilter('unread')}
                    className={filter === 'unread' ? 'bg-[#fd74fd] hover:bg-[#fd74fd]/90' : ''}
                  >
                    Nao lidas
                    {messages.filter(m => !m.read).length > 0 && (
                      <Badge className="ml-2 bg-white text-[#fd74fd]">
                        {messages.filter(m => !m.read).length}
                      </Badge>
                    )}
                  </Button>
                  <Button 
                    variant={filter === 'urgent' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setFilter('urgent')}
                    className={filter === 'urgent' ? 'bg-red-500 hover:bg-red-600' : ''}
                  >
                    Urgentes
                  </Button>
                </div>
              </div>

              {/* Messages List */}
              <ScrollArea className="flex-1">
                <div ref={messageListRef} className="p-2">
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg.id)}
                      className={`
                        message-item p-4 rounded-xl cursor-pointer transition-all mb-2
                        ${selectedMessage === msg.id ? 'bg-[#fd74fd]/10 border border-[#fd74fd]/30' : 'hover:bg-gray-50'}
                        ${!msg.read ? 'bg-blue-50/50' : ''}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${msg.role === 'family' ? 'bg-[#fd74fd]/10 text-[#fd74fd]' :
                              msg.role === 'school' ? 'bg-[#7af7f7]/20 text-cyan-600' :
                              'bg-purple-100 text-purple-600'}
                          `}>
                            {getRoleIcon(msg.role)}
                          </div>
                          {!msg.read && (
                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#fd74fd] rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-medium truncate ${!msg.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {msg.from}
                            </span>
                            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                              {formatDate(msg.date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            {msg.priority === 'urgent' && (
                              <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                            )}
                            <span className={`text-sm truncate ${!msg.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                              {msg.subject}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{msg.preview}</p>
                          <Badge variant="secondary" className="mt-2 text-xs">
                            {msg.patientName}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredMessages.length === 0 && (
                    <div className="text-center py-12">
                      <Search className="w-10 h-10 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">Nenhuma mensagem encontrada</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* Message Detail */}
            <div className={`flex-1 flex flex-col ${!selectedMessage ? 'hidden md:flex' : 'flex'}`}>
              {currentMessage ? (
                <>
                  {/* Message Header */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden"
                        onClick={() => setSelectedMessage(null)}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </Button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-12 h-12 rounded-full flex items-center justify-center
                              ${currentMessage.role === 'family' ? 'bg-[#fd74fd]/10 text-[#fd74fd]' :
                                currentMessage.role === 'school' ? 'bg-[#7af7f7]/20 text-cyan-600' :
                                'bg-purple-100 text-purple-600'}
                            `}>
                              {getRoleIcon(currentMessage.role)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{currentMessage.from}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Badge variant="outline" className="text-xs">
                                  {getRoleLabel(currentMessage.role)}
                                </Badge>
                                <span>|</span>
                                <Link 
                                  href={`/dashboard/pacientes/${currentMessage.patientId}`}
                                  className="text-[#fd74fd] hover:underline"
                                >
                                  {currentMessage.patientName}
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Star className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Archive className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Content */}
                  <ScrollArea className="flex-1 p-6">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">{currentMessage.subject}</h2>
                        {currentMessage.priority === 'urgent' && (
                          <Badge className="bg-red-100 text-red-700">Urgente</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-6">
                        {new Date(currentMessage.date).toLocaleDateString('pt-BR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {currentMessage.content}
                        </p>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Reply Box */}
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <Textarea
                          placeholder="Digite sua resposta..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[80px] resize-none"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="ghost" size="icon">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button 
                          className="bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] text-white"
                          disabled={!replyText.trim()}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Reply className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Selecione uma mensagem</h3>
                    <p className="text-gray-500">Escolha uma mensagem da lista para visualizar</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </DashboardShell>
  )
}
