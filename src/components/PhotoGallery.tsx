import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  RotateCw, 
  Calendar, 
  MapPin, 
  Sun, 
  Moon, 
  Cloud, 
  BookOpen, 
  Grid, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X,
  Heart
} from 'lucide-react';
import { MemoryPhoto } from '../types';
import { INITIAL_MEMORIES } from '../data/defaultContent';
import { sound } from '../services/soundEffects';

interface PhotoGalleryProps {
  onNext?: () => void;
}

type SkyTheme = 'sunset' | 'moon' | 'day';

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onNext }) => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    try {
      localStorage.removeItem('college_memories_v1');
      localStorage.removeItem('college_memories_v2');
      localStorage.removeItem('college_memories_v3');
      localStorage.removeItem('college_memories_v4');

      const stored = localStorage.getItem('college_memories_v5');
      if (stored) {
        const parsed: MemoryPhoto[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_MEMORIES.length) {
          return parsed.map((item, idx) => {
            if (INITIAL_MEMORIES[idx]) {
              return { ...item, url: INITIAL_MEMORIES[idx].url };
            }
            return item;
          });
        }
      }
      localStorage.setItem('college_memories_v5', JSON.stringify(INITIAL_MEMORIES));
      return INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  const [skyTheme, setSkyTheme] = useState<SkyTheme>('sunset');
  const [viewMode, setViewMode] = useState<'album' | 'wall'>('album');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [zoomedPhoto, setZoomedPhoto] = useState<MemoryPhoto | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  const currentMemory = memories[currentPage] || memories[0];
  const isCurrentFlipped = !!flippedIds[currentMemory?.id];

  const handleFlip = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    sound.playPaperRustle();
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const nextPage = () => {
    sound.playPaperRustle();
    setCurrentPage((p) => (p + 1) % memories.length);
  };

  const prevPage = () => {
    sound.playPaperRustle();
    setCurrentPage((p) => (p - 1 + memories.length) % memories.length);
  };

  const switchTheme = (theme: SkyTheme) => {
    sound.playChime(theme === 'sunset' ? 520 : theme === 'moon' ? 640 : 580);
    setSkyTheme(theme);
  };

  // Atmospheric scenery styles based on selected sky theme
  const skyConfig = {
    sunset: {
      bg: 'linear-gradient(180deg, #2D1436 0%, #682A4C 28%, #A84B53 55%, #E07D5A 78%, #F7C88C 100%)',
      textColor: 'text-[#FFF7EE]',
      accentColor: '#FFC875',
      name: 'Sunset Twilight',
      icon: Sun,
      orbClass: 'bg-gradient-to-t from-[#FF884D] to-[#FFAE52] shadow-[0_0_80px_#FFAE52]',
    },
    moon: {
      bg: 'linear-gradient(180deg, #070B19 0%, #111A35 30%, #1A284E 60%, #29385C 85%, #384A6E 100%)',
      textColor: 'text-[#EAF0F8]',
      accentColor: '#B6D5F5',
      name: 'Midnight Moon',
      icon: Moon,
      orbClass: 'bg-gradient-to-br from-[#FFFFFF] to-[#D9E6F2] shadow-[0_0_90px_rgba(255,255,255,0.7)]',
    },
    day: {
      bg: 'linear-gradient(180deg, #5CA4E8 0%, #7CBDF5 35%, #A8D4FA 65%, #CEE5FB 85%, #EBF4FC 100%)',
      textColor: 'text-[#1D2E4A]',
      accentColor: '#2B609E',
      name: 'Azure Day Sky',
      icon: Cloud,
      orbClass: 'bg-gradient-to-br from-[#FFF8E7] to-[#FFE082] shadow-[0_0_70px_#FFE082]',
    },
  }[skyTheme];

  return (
    <section 
      id="memories" 
      className="min-h-screen py-10 sm:py-16 px-3 sm:px-6 relative overflow-hidden transition-all duration-1000"
      style={{ background: skyConfig.bg }}
    >
      {/* 3D Celestial Scenery Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Sun or Moon */}
        <div 
          className={`absolute rounded-full transition-all duration-1000 ${skyConfig.orbClass}`}
          style={{
            width: skyTheme === 'sunset' ? 140 : skyTheme === 'moon' ? 110 : 95,
            height: skyTheme === 'sunset' ? 140 : skyTheme === 'moon' ? 110 : 95,
            top: skyTheme === 'sunset' ? '28%' : skyTheme === 'moon' ? '12%' : '14%',
            right: skyTheme === 'sunset' ? '18%' : skyTheme === 'moon' ? '15%' : '20%',
            opacity: 0.9,
          }}
        />

        {/* Stars for Moonlit Night */}
        {skyTheme === 'moon' && (
          <div className="absolute inset-0">
            {Array.from({ length: 45 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  width: (i % 3) + 1.5,
                  height: (i % 3) + 1.5,
                  top: `${(i * 19) % 85}%`,
                  left: `${(i * 23) % 98}%`,
                  animationDuration: `${1.5 + (i % 3)}s`,
                  opacity: 0.4 + ((i % 5) * 0.15),
                }}
              />
            ))}
          </div>
        )}

        {/* Floating Clouds for Azure Day Sky */}
        {skyTheme === 'day' && (
          <>
            <div className="cloud" style={{ top: '8%', animationDuration: '45s', opacity: 0.8 }} />
            <div className="cloud" style={{ top: '22%', animationDuration: '60s', animationDelay: '-18s', transform: 'scale(0.8)', opacity: 0.7 }} />
            <div className="cloud" style={{ top: '40%', animationDuration: '52s', animationDelay: '-30s', transform: 'scale(1.1)', opacity: 0.6 }} />
          </>
        )}

        {/* Floating golden twilight dust particles for Sunset */}
        {skyTheme === 'sunset' && (
          <div className="absolute inset-0">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-[#FFDF9E] animate-pulse"
                style={{
                  width: (i % 3) + 2,
                  height: (i % 3) + 2,
                  top: `${(i * 21) % 95}%`,
                  left: `${(i * 17) % 96}%`,
                  animationDuration: `${2 + (i % 3)}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        )}

        {/* Castle Balustrade / High Terrace Silhouette at the bottom */}
        <div 
          className="absolute bottom-0 inset-x-0 h-28 sm:h-36 opacity-35"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)',
            borderTop: '2px solid rgba(255,255,255,0.1)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Princess Terrace Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-[11px] font-semibold tracking-widest uppercase mb-2 border border-white/15">
            <Sparkles className="w-3 h-3 text-[#FFD166]" />
            <span>Chapter II · The Keepsake Album</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-white drop-shadow-md leading-tight">
            Memories in the <span className="italic" style={{ color: skyConfig.accentColor }}>Sky</span>
          </h2>
          <p className="font-handwriting text-2xl sm:text-3xl text-white/85 drop-shadow-sm mt-1">
            sitting in her high tower, turning pages of time ✨
          </p>

          {/* Sky Atmosphere Switcher & View Mode Controls */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {/* 3 Sky Themes */}
            <div className="bg-black/35 backdrop-blur-md p-1 rounded-full border border-white/20 flex items-center gap-1 shadow-lg">
              {(['sunset', 'moon', 'day'] as const).map((t) => {
                const isActive = skyTheme === t;
                const label = t === 'sunset' ? 'Sunset Glow' : t === 'moon' ? 'Moonlit Night' : 'Azure Sky';
                return (
                  <button
                    key={t}
                    onClick={() => switchTheme(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive 
                        ? 'bg-white text-[#2D2424] shadow-md font-bold' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{t === 'sunset' ? '🌅' : t === 'moon' ? '🌙' : '☁️'}</span>
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher: Storybook Spread vs Gallery Wall */}
            <div className="bg-black/35 backdrop-blur-md p-1 rounded-full border border-white/20 flex items-center gap-1 shadow-lg">
              <button
                onClick={() => {
                  sound.playChime(500);
                  setViewMode('album');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'album'
                    ? 'bg-white text-[#2D2424] shadow-md font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Storybook</span>
              </button>
              <button
                onClick={() => {
                  sound.playChime(550);
                  setViewMode('wall');
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'wall'
                    ? 'bg-white text-[#2D2424] shadow-md font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Polaroids</span>
              </button>
            </div>
          </div>
        </div>

        {/* VIEW MODE 1: PRINCESS STORYBOOK SPREAD */}
        {viewMode === 'album' && (
          <div className="relative">
            {/* Album Book Spine & Gilded Body */}
            <div 
              className="bg-[#2A1D1A] p-2.5 sm:p-5 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-4 border-[#D4AF37]/50 relative"
              style={{
                boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,255,255,0.1)',
              }}
            >
              {/* Inner Parchment Spread (Two-column open book on desktop, single on mobile) */}
              <div className="bg-[#FAF7F0] rounded-2xl border border-[#E8DFC8] p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center min-h-[500px] sm:min-h-[540px] relative shadow-inner">
                {/* Center Book Spine Crease on Desktop */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#E8DFC8] via-[#C9B79C] to-[#E8DFC8] opacity-60 shadow-xs pointer-events-none" />

                {/* Left Page: Polaroid / Video Frame */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative group w-full max-w-[320px] sm:max-w-[340px]">
                    {/* Washi tape on top */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape washi-tape-pink rounded-xs z-20 pointer-events-none shadow-xs" />

                    {/* Polaroid Card with 3D Flip */}
                    <div 
                      onClick={() => handleFlip(currentMemory.id)}
                      className="bg-white p-3.5 sm:p-4 pb-6 rounded-sm polaroid-shadow border border-[#E8DFC8] cursor-pointer transition-transform duration-300 hover:scale-[1.02] relative"
                      style={{
                        transform: `rotate(${currentMemory.rotation || -1.5}deg)`,
                      }}
                    >
                      {!isCurrentFlipped ? (
                        <>
                          <div className="relative aspect-4/5 w-full bg-[#FAF7F2] rounded-xs overflow-hidden mb-3 border border-black/5 flex items-center justify-center">
                            {currentMemory.mediaType === 'video' || currentMemory.videoUrl ? (
                              <div className="relative w-full h-full bg-black">
                                <video
                                  src={currentMemory.videoUrl}
                                  autoPlay={isVideoPlaying}
                                  loop
                                  muted={isVideoMuted}
                                  playsInline
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs px-2 py-1 rounded-full text-white text-[10px]">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsVideoPlaying(!isVideoPlaying);
                                    }}
                                    className="p-1 hover:text-[#FFD166]"
                                  >
                                    {isVideoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setIsVideoMuted(!isVideoMuted);
                                    }}
                                    className="p-1 hover:text-[#FFD166]"
                                  >
                                    {isVideoMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <img
                                src={currentMemory.url}
                                alt={currentMemory.caption}
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  if (!target.dataset.fallbackTried) {
                                    target.dataset.fallbackTried = 'true';
                                    target.src = `./images/${currentMemory.id.replace('mem-', 'anu_')}.jpg`;
                                  }
                                }}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            )}

                            {/* Zoom button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                sound.playChime(450);
                                setZoomedPhoto(currentMemory);
                              }}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-black/75"
                              title="Zoom view"
                            >
                              <ZoomIn className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="font-handwriting text-xl text-[#2D2424] leading-tight font-medium text-center">
                            {currentMemory.caption}
                          </p>

                          <div className="mt-2 flex items-center justify-between text-[11px] text-[#8B6E60]">
                            <span>{currentMemory.date}</span>
                            <span className="flex items-center gap-1 text-[#8B3A4D] font-medium">
                              <RotateCw className="w-3 h-3" /> Tap to flip
                            </span>
                          </div>
                        </>
                      ) : (
                        /* Flipped secret note side */
                        <div className="aspect-4/5 w-full bg-[#FAF0DC] rounded-xs p-5 flex flex-col justify-between border border-[#E9D9A5]">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#8B3A4D] font-mono font-bold block mb-1">
                              Keepsake Note
                            </span>
                            <h4 className="font-serif text-sm font-bold text-[#5B2333] mb-2">
                              {currentMemory.caption}
                            </h4>
                            <p className="font-handwriting text-lg sm:text-xl text-[#2D2424] leading-relaxed">
                              "{currentMemory.note}"
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-[#8B6E60] border-t border-[#E8DFC8]/70 pt-2">
                            <span>📍 {currentMemory.location || 'College Days'}</span>
                            <span className="text-[#8B3A4D] font-semibold">Flip front ↺</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Page: Princess Story & Memory Reflection */}
                <div className="flex flex-col justify-between h-full space-y-4 text-left">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-2 mb-3">
                      <span className="text-[10px] tracking-[0.25em] uppercase text-[#8B6E60] font-mono font-semibold">
                        Page {currentPage + 1} of {memories.length}
                      </span>
                      <span className="text-xs font-serif italic text-[#8B3A4D] flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Anuradha's Keepsake</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-[#2D2424] leading-tight">
                      {currentMemory.caption}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-[#8B6E60] mt-1 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {currentMemory.date}
                      </span>
                      {currentMemory.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {currentMemory.location}
                        </span>
                      )}
                    </div>

                    {/* Extended story / reflection */}
                    <div className="bg-[#FFFDF8] p-4 sm:p-5 rounded-xl border border-[#E8DFC8] shadow-2xs">
                      <p className="font-serif text-sm sm:text-base text-[#3A2D28] leading-[1.7] italic">
                        "{currentMemory.note}"
                      </p>
                      <p className="font-handwriting text-xl text-[#8B3A4D] mt-3 text-right">
                        — Forever cherished
                      </p>
                    </div>
                  </div>

                  {/* Page Turner Controls */}
                  <div className="pt-2 flex items-center justify-between gap-3">
                    <button
                      onClick={prevPage}
                      className="px-4 py-2 rounded-full bg-white hover:bg-[#F2ECE4] border border-[#E8DFC8] text-xs font-semibold text-[#2D2424] flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous Page</span>
                    </button>

                    <div className="flex gap-1 overflow-x-auto max-w-[140px] px-1 py-1">
                      {memories.map((_, idx) => (
                        <span
                          key={idx}
                          onClick={() => {
                            sound.playPaperRustle();
                            setCurrentPage(idx);
                          }}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            idx === currentPage ? 'w-5 bg-[#8B3A4D]' : 'bg-[#D6C7B2] hover:bg-[#8B6E60]'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextPage}
                      className="px-4 py-2 rounded-full bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all"
                    >
                      <span>Next Page</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: ALL POLAROIDS GALLERY WALL OVERVIEW */}
        {viewMode === 'wall' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
            {memories.map((mem, idx) => {
              const isFlipped = !!flippedIds[mem.id];
              return (
                <div
                  key={mem.id}
                  className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  style={{ transform: `rotate(${mem.rotation}deg)` }}
                  onClick={() => {
                    sound.playChime(450);
                    setZoomedPhoto(mem);
                  }}
                >
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape washi-tape-pink rounded-xs z-20 pointer-events-none shadow-xs" />

                  <div className="bg-white p-4 pt-5 pb-5 rounded-sm polaroid-shadow border border-[#E8DFC8]/60 min-h-[380px] flex flex-col justify-between">
                    {!isFlipped ? (
                      <>
                        <div className="relative aspect-4/5 w-full bg-[#FAF7F2] rounded-xs overflow-hidden mb-3 border border-black/5 flex items-center justify-center">
                          <img
                            src={mem.url}
                            alt={mem.caption}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.dataset.fallbackTried) {
                                target.dataset.fallbackTried = 'true';
                                target.src = `./images/${mem.id.replace('mem-', 'anu_')}.jpg`;
                              }
                            }}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <ZoomIn className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        <div>
                          <p className="font-handwriting text-xl text-[#2D2424] leading-tight font-medium">
                            {mem.caption}
                          </p>
                          <div className="mt-2 flex items-center justify-between text-[11px] text-[#8B6E60]">
                            <span>{mem.date}</span>
                            <button
                              onClick={(e) => handleFlip(mem.id, e)}
                              className="text-[#8B3A4D] hover:underline cursor-pointer flex items-center gap-1 font-medium"
                            >
                              <RotateCw className="w-3 h-3" /> Flip note
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="aspect-4/5 w-full bg-[#FAF0DC] rounded-xs p-4 flex flex-col justify-between border border-[#E9D9A5]">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#8B3A4D] font-bold block mb-1">
                            Story #{idx + 1}
                          </span>
                          <p className="font-handwriting text-lg text-[#2D2424] leading-relaxed">
                            "{mem.note}"
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleFlip(mem.id, e)}
                          className="text-[#8B3A4D] font-semibold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCw className="w-3 h-3" /> View Photo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Continue to Chapter III: A Song for You */}
        {onNext && (
          <div className="mt-12 text-center">
            <button
              onClick={onNext}
              className="px-7 py-3.5 rounded-full bg-white/90 hover:bg-white text-[#2D2424] font-semibold text-xs tracking-widest uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2 border border-white/50 backdrop-blur-md"
            >
              <span>Continue to A Song for Anu</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>

      {/* Zoom Lightbox Modal */}
      {zoomedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setZoomedPhoto(null)}
        >
          <div
            className="bg-white p-5 sm:p-7 rounded-2xl max-w-2xl w-full border border-[#E8DFC8] shadow-2xl relative max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full text-[#6B5E59] hover:bg-[#F2ECE4] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-4/5 max-h-[60vh] w-full bg-[#FAF7F2] rounded-xl overflow-hidden mb-4 flex items-center justify-center">
              {zoomedPhoto.mediaType === 'video' || zoomedPhoto.videoUrl ? (
                <video
                  src={zoomedPhoto.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={zoomedPhoto.url}
                  alt={zoomedPhoto.caption}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallbackTried) {
                      target.dataset.fallbackTried = 'true';
                      target.src = `./images/${zoomedPhoto.id.replace('mem-', 'anu_')}.jpg`;
                    }
                  }}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-handwriting text-2xl sm:text-3xl text-[#2D2424]">
                {zoomedPhoto.caption}
              </h3>
              <p className="text-sm text-[#5B473F] bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8DFC8]/60 font-serif leading-relaxed">
                "{zoomedPhoto.note}"
              </p>
              <div className="flex items-center justify-between text-xs text-[#8B6E60] pt-1">
                <span>{zoomedPhoto.date}</span>
                {zoomedPhoto.location && <span>📍 {zoomedPhoto.location}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
