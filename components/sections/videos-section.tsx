'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react'

const videos = [
  {
    id: 1,
    title: 'Introdução ao NeuroConecta',
    description: 'Conheça a plataforma que está transformando o cuidado neurodivergente no Brasil.',
    thumbnail: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    duration: '3:45',
    category: 'Apresentação',
  },
  {
    id: 2,
    title: 'Registro de Eventos - App Família',
    description: 'Aprenda a usar o sistema de 3 cliques para registrar eventos comportamentais.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    duration: '5:20',
    category: 'Tutorial',
  },
  {
    id: 3,
    title: 'Dashboard Clínico em Ação',
    description: 'Veja como o Perfil Sensorial dinâmico auxilia no diagnóstico e tratamento.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    duration: '7:15',
    category: 'Demonstração',
  },
  {
    id: 4,
    title: 'Rotinas Visuais com ARASAAC',
    description: 'Como criar e personalizar rotinas visuais usando pictogramas.',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
    duration: '4:30',
    category: 'Tutorial',
  },
  {
    id: 5,
    title: 'Caso de Sucesso: Município de Assaí',
    description: 'Depoimento do secretário de saúde sobre a implantação do NeuroConecta.',
    thumbnail: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80',
    duration: '8:00',
    category: 'Case',
  },
  {
    id: 6,
    title: 'Integração Família-Escola-Clínica',
    description: 'Como a comunicação integrada melhora os resultados terapêuticos.',
    thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    duration: '6:45',
    category: 'Webinar',
  },
]

function VideoCard({
  video,
  index,
  onPlay,
}: {
  video: (typeof videos)[0]
  index: number
  onPlay: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [index])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: -8,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  return (
    <div
      ref={cardRef}
      className="group relative rounded-3xl overflow-hidden bg-white shadow-neuro cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onPlay}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-70'
          }`}
        />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg transition-all duration-300 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          >
            <Play className="w-6 h-6 text-[#fd74fd] ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/70 text-white text-xs font-medium">
          {video.duration}
        </div>

        {/* Category Badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background:
              video.category === 'Tutorial'
                ? '#7af7f7'
                : video.category === 'Case'
                  ? '#fff48d'
                  : '#fd74fd',
            color: video.category === 'Case' ? '#333' : '#fff',
          }}
        >
          {video.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-[#fd74fd] transition-colors">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
      </div>
    </div>
  )
}

// Video Player Modal
function VideoPlayerModal({
  isOpen,
  onClose,
  video,
}: {
  isOpen: boolean
  onClose: () => void
  video: (typeof videos)[0] | null
}) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [isOpen])

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: onClose,
      })
    }
  }

  // Simulate video progress
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  if (!isOpen || !video) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Video Area */}
        <div className="relative aspect-video bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />

          {/* Play/Pause Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {!isPlaying && (
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg animate-pulse-glow">
                <Play className="w-8 h-8 text-[#fd74fd] ml-1" fill="currentColor" />
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#fd74fd] to-[#7af7f7] flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                )}
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>

            <div className="text-white">
              <h4 className="font-semibold">{video.title}</h4>
            </div>

            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <Maximize className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function VideosSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current?.children || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handlePlayVideo = (video: (typeof videos)[0]) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#fd74fd]/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#7af7f7]/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#fd74fd]/10 to-[#7af7f7]/10 border border-[#fd74fd]/20 text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Galeria de Vídeos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Veja o <span className="gradient-text">NeuroConecta</span> em Ação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tutoriais, demonstrações e casos de sucesso para você conhecer todas as funcionalidades
            da plataforma.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              index={index}
              onPlay={() => handlePlayVideo(video)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 rounded-2xl border-2 border-[#7af7f7] text-foreground font-semibold hover:bg-[#7af7f7]/10 transition-all duration-300">
            Ver Todos os Vídeos
          </button>
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        video={selectedVideo}
      />
    </section>
  )
}
