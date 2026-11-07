import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  RotateCw, 
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

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onNext }) => {
  const [memories] = useState<MemoryPhoto[]>(() => {
    try {
      localStorage.removeItem('college_memories_v1');
      localStorage.removeItem('college_memories_v2');
      localStorage.removeItem('college_memories_v3');
      localStorage.removeItem('college_memories_v4');
      localStorage.removeItem('college_memories_v5');
      return INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [isFlippingPage, setIsFlippingPage] = useState<boolean>(false);
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
    if (isFlippingPage) return;
    setIsFlippingPage(true);
    sound.playPaperRustle();
    setDirection(1);
    setCurrentPage((p) => (p + 1) % memories.length);
    setTimeout(() => setIsFlippingPage(false), 600);
  };

  const prevPage = () => {
    if (isFlippingPage) return;
    setIsFlippingPage(true);
    sound.playPaperRustle();
    setDirection(-1);
    setCurrentPage((p) => (p - 1 + memories.length) % memories.length);
    setTimeout(() => setIsFlippingPage(false), 600);
  };

  const goToPage = (idx: number) => {
    if (idx === currentPage || isFlippingPage) return;
    setIsFlippingPage(true);
    sound.playPaperRustle();
    setDirection(idx > currentPage ? 1 : -1);
    setCurrentPage(idx);
    setTimeout(() => setIsFlippingPage(false), 600);
  };

  // Safe media resolver for GitHub Pages relative bases
  const getMediaUrl = (path?: string) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;
    const clean = path.replace(/^\.?\//, '');
    return `${import.meta.env.BASE_URL}${clean}`;
  };

  return (
    <section 
      id="memories" 
      className="min-h-screen py-12 sm:py-20 px-3 sm:px-6 relative overflow-hidden flex flex-col items-center justify-center transition-all duration-1000"
      style={{
        // Atmospheric Sky Canvas: Sunset on horizon, Indigo Cosmos above, Rainbow arc, Glowing Moon
        background: 'radial-gradient(ellipse at 50% 100%, #F59E0B 0%, #D946EF 22%, #6366F1 45%, #1E1B4B 75%, #0B091A 100%)',
      }}
    >
      {/* ============================================================== */}
      {/* PERFECT FAIRYTALE BACKGROUND: Sunset Horizon, Rainbow & Moon */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Soft Sunset Glow & Horizon Mountains at Base */}
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#F59E0B]/30 via-[#EA580C]/20 to-transparent" />
        
        {/* Mountain Silhouette Layers at bottom */}
        <div 
          className="absolute bottom-0 inset-x-0 h-36 opacity-35 bg-repeat-x bg-bottom"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,120 L0,40 L150,90 L320,20 L480,80 L650,30 L820,70 L980,15 L1120,60 L1200,30 L1200,120 Z' fill='%23110E24'/%3E%3C/svg%3E")`,
            backgroundSize: '1200px 100%',
          }}
        />

        {/* GLOWING FULL MOON (Top Right) */}
        <div className="absolute top-12 right-6 sm:right-24 flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#E2E8F0] shadow-[0_0_80px_rgba(255,255,255,0.85)] relative">
            <div className="w-5 h-5 rounded-full bg-[#CBD5E1]/40 absolute top-5 left-5 blur-[0.5px]" />
            <div className="w-4 h-4 rounded-full bg-[#CBD5E1]/30 absolute bottom-6 right-7 blur-[0.5px]" />
            <div className="w-3 h-3 rounded-full bg-[#CBD5E1]/35 absolute top-12 left-10 blur-[0.5px]" />
          </div>
        </div>

        {/* ETHEREAL DOUBLE RAINBOW (Spanning across the sky) */}
        <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none">
          {/* Primary Rainbow */}
          <div 
            className="w-[95vw] sm:w-[850px] h-[320px] sm:h-[450px] -top-24 sm:-top-32 relative rounded-t-full border-[14px] sm:border-[24px] opacity-70 blur-[1px]"
            style={{
              borderImage: 'linear-gradient(to top, rgba(239,68,68,0.55), rgba(249,115,22,0.55), rgba(234,179,8,0.55), rgba(34,197,94,0.55), rgba(59,130,246,0.55), rgba(168,85,247,0.55)) 1',
              borderBottom: 'none',
              filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.45))',
            }}
          />
        </div>

        {/* Soft Golden Sunset Rays (Bottom Left) */}
        <div className="absolute -bottom-10 -left-10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#FF7A00]/40 via-[#FFAE00]/20 to-transparent blur-3xl" />

        {/* Twinkling Starlight Constellations */}
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: (i % 3) + 1.5,
              height: (i % 3) + 1.5,
              top: `${(i * 17) % 65 + 5}%`,
              left: `${(i * 13) % 94 + 3}%`,
              animationDuration: `${(i % 4) + 2}s`,
              opacity: (i % 2 === 0) ? 0.9 : 0.6,
            }}
          />
        ))}

        {/* Floating stardust motes */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      {/* ============================================================== */}
      {/* SECTION CONTENT: ONLY THE GRAND OPEN BOOK ALBUM */}
      {/* ============================================================== */}
      <div className="max-w-5xl w-full mx-auto relative z-10">
        
        {/* Album Header Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/45 backdrop-blur-md text-[#FFD166] text-xs font-semibold tracking-widest uppercase mb-2 border border-[#FFD166]/30 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
            <span>Chapter II · Anuradha's Keepsake Album</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-white drop-shadow-xl leading-tight">
            Memories in the <span className="italic text-[#FFD166]">Sky</span> ✨
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-white/90 drop-shadow-md mt-1">
            sunset, moon & rainbow in one view — turn the pages below
          </p>
        </div>

        {/* ============================================================== */}
        {/* THE REALISTIC OPEN BOOK ALBUM (3D PAGE-TURNING SPREAD) */}
        {/* ============================================================== */}
        <div className="relative mx-auto w-full" style={{ perspective: '1600px' }}>
          
          {/* Outer Heavy Leather Album Binding & Brass Guards */}
          <div 
            className="bg-[#2A1810] p-3 sm:p-7 rounded-[28px] sm:rounded-[36px] shadow-[0_35px_80px_rgba(0,0,0,0.9)] border-4 border-[#D4AF37]/80 relative"
            style={{
              boxShadow: '0 30px 90px rgba(0,0,0,0.85), inset 0 0 40px rgba(0,0,0,0.8)',
            }}
          >
            {/* Ornate Gold Foil Corners */}
            <div className="absolute top-3 left-3 w-7 h-7 border-t-3 border-l-3 border-[#FFD166] rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-7 h-7 border-t-3 border-r-3 border-[#FFD166] rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-7 h-7 border-b-3 border-l-3 border-[#FFD166] rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-7 h-7 border-b-3 border-r-3 border-[#FFD166] rounded-br-lg" />

            {/* Red Silk Ribbon Bookmark dangling from top center */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 sm:w-5 h-10 bg-gradient-to-b from-[#8B3A4D] to-[#601A2A] shadow-md rounded-b-xs z-30" />

            {/* ========================================================== */}
            {/* 3D PAGE-TURNING ANIMATED SPREAD */}
            {/* ========================================================== */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage}
                custom={direction}
                variants={{
                  enter: (d: number) => ({
                    rotateY: d > 0 ? 40 : -40,
                    opacity: 0,
                    scale: 0.96,
                    transformOrigin: d > 0 ? 'right center' : 'left center',
                  }),
                  center: {
                    rotateY: 0,
                    opacity: 1,
                    scale: 1,
                    transformOrigin: 'center center',
                    transition: {
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                  exit: (d: number) => ({
                    rotateY: d > 0 ? -40 : 40,
                    opacity: 0,
                    scale: 0.96,
                    transformOrigin: d > 0 ? 'left center' : 'right center',
                    transition: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                className="bg-[#FAF7F0] rounded-2xl sm:rounded-3xl border border-[#E8DFC8] p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-stretch min-h-[530px] relative shadow-inner overflow-hidden"
              >
                {/* Book Spine Crease & Shadow */}
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/15 via-black/25 to-transparent pointer-events-none z-10" />
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#B3997A] pointer-events-none z-10" />

                {/* ==================================================== */}
                {/* LEFT PAGE: POLAROID PHOTO WITH 3D FLIP STORY NOTE */}
                {/* ==================================================== */}
                <div className="flex flex-col items-center justify-between bg-[#FDFBF7] p-4 sm:p-5 rounded-2xl border border-[#EDE4D0] shadow-xs relative">
                  
                  {/* Left Page Top Header */}
                  <div className="w-full flex items-center justify-between text-[11px] text-[#8B6E60] font-semibold tracking-wider uppercase mb-3 pb-2 border-b border-[#E8DFC8]/70">
                    <span className="flex items-center gap-1 text-[#8B3A4D] font-bold">
                      <Camera className="w-3.5 h-3.5" />
                      <span>Photo Memory {currentPage + 1} of {memories.length}</span>
                    </span>
                    <span className="text-black/50 font-serif italic">Tap photo to flip ↻</span>
                  </div>

                  {/* Polaroid Frame */}
                  <div className="relative group w-full max-w-[320px]">
                    {/* Washi Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 washi-tape washi-tape-pink rounded-xs z-20 pointer-events-none shadow-xs" />

                    <div 
                      onClick={() => handleFlip(currentMemory.id)}
                      className="bg-white p-3.5 pb-5 rounded-sm polaroid-shadow border border-[#E8DFC8] cursor-pointer transition-transform duration-300 hover:scale-[1.02] relative"
                      style={{
                        transform: `rotate(${currentMemory.rotation || -1.5}deg)`,
                      }}
                    >
                      {!isCurrentFlipped ? (
                        <>
                          {/* Photo Image */}
                          <div className="relative aspect-4/5 w-full bg-[#FAF7F2] rounded-xs overflow-hidden mb-3 border border-black/5 flex items-center justify-center">
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

                            {/* Zoom Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                sound.playChime(600);
                                setZoomedPhoto(currentMemory);
                              }}
                              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer shadow-md"
                              title="Zoom photo"
                            >
                              <ZoomIn className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Caption */}
                          <div className="px-1 text-left">
                            <p className="font-handwriting text-lg sm:text-xl text-[#2D2424] leading-tight">
                              {currentMemory.caption}
                            </p>
                            <div className="mt-1 flex items-center justify-between text-[11px] text-[#8B6E60]">
                              <span>{currentMemory.date}</span>
                              <span className="flex items-center gap-1 text-[#8B3A4D] font-bold">
                                <RotateCw className="w-3 h-3" />
                                <span>Read Story</span>
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        /* Flip Side: Secret Story Note */
                        <div className="aspect-4/5 w-full p-4 bg-[#FFFDF8] rounded-xs flex flex-col justify-between text-left border border-dashed border-[#8B3A4D]/35">
                          <div>
                            <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC8]">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B3A4D]">
                                Handwritten Memory Note
                              </span>
                              <Heart className="w-3.5 h-3.5 text-[#8B3A4D]" />
                            </div>
                            <p className="font-handwriting text-base sm:text-lg text-[#3E2723] leading-relaxed mt-3">
                              "{currentMemory.note}"
                            </p>
                          </div>

                          <div className="text-[10px] text-[#8B6E60] italic pt-2 border-t border-[#E8DFC8] flex items-center justify-between">
                            <span>College Days to Now</span>
                            <span>Tap to see photo ↻</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Flip Action Button */}
                  <button
                    onClick={() => handleFlip(currentMemory.id)}
                    className="mt-3 text-xs font-semibold text-[#8B3A4D] hover:text-[#5B2333] cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isCurrentFlipped ? 'Flip Back to Photo' : 'Flip to Read Secret Note'}</span>
                  </button>
                </div>

                {/* ==================================================== */}
                {/* RIGHT PAGE: COMPANION LIVE VIDEO REEL & DEDICATION */}
                {/* ==================================================== */}
                <div className="flex flex-col items-center justify-between bg-[#FDFBF7] p-4 sm:p-5 rounded-2xl border border-[#EDE4D0] shadow-xs relative">
                  
                  {/* Right Page Top Header */}
                  <div className="w-full flex items-center justify-between text-[11px] text-[#8B6E60] font-semibold tracking-wider uppercase mb-3 pb-2 border-b border-[#E8DFC8]/70">
                    <span className="flex items-center gap-1 text-[#2B609E] font-bold">
                      <Play className="w-3.5 h-3.5" />
                      <span>Live Video Reel {currentPage + 1}</span>
                    </span>
                    <span className="text-black/50 font-serif italic">In Candid Motion ✨</span>
                  </div>

                  {/* Video Player Frame with Controls */}
                  <div className="w-full max-w-[340px] flex flex-col items-center">
                    <div className="relative aspect-4/5 w-full bg-black rounded-xl overflow-hidden shadow-md border-2 border-[#D4AF37]/40 group">
                      
                      {currentMemory.videoUrl ? (
                        <video
                          src={getMediaUrl(currentMemory.videoUrl)}
                          autoPlay={isVideoPlaying}
                          loop
                          muted={isVideoMuted}
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-black/90 text-white p-4 text-center">
                          <Play className="w-8 h-8 text-[#FFD166] mb-2 animate-bounce" />
                          <p className="text-xs">Playing motion moment...</p>
                        </div>
                      )}

                      {/* Video Live Badge */}
                      <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[10px] font-semibold flex items-center gap-1 border border-white/20">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        <span>Live Clip</span>
                      </div>

                      {/* Player Controls Bar */}
                      <div className="absolute bottom-2 inset-x-2 flex items-center justify-between bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs border border-white/20">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                            className="p-1 hover:text-[#FFD166] cursor-pointer"
                            title={isVideoPlaying ? 'Pause video' : 'Play video'}
                          >
                            {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                          </button>

                          <button
                            onClick={() => setIsVideoMuted(!isVideoMuted)}
                            className="p-1 hover:text-[#FFD166] cursor-pointer"
                            title={isVideoMuted ? 'Unmute video' : 'Mute video'}
                          >
                            {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <span className="text-[10px] text-white/80 truncate max-w-[140px]">
                          {currentMemory.videoCaption || 'Live Memory'}
                        </span>
                      </div>
                    </div>

                    {/* Dedicated Video Note Card */}
                    <div className="w-full mt-3 p-3 bg-white rounded-xl border border-[#E8DFC8] shadow-xs text-left">
                      <h4 className="font-serif text-xs font-bold text-[#2D2424] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#FFD166]" />
                        <span>{currentMemory.videoCaption || 'Seeing Her in Motion'}</span>
                      </h4>
                      <p className="font-handwriting text-sm text-[#4E342E] leading-relaxed mt-1">
                        "{currentMemory.videoNote || 'Watching you smile in this clip brings back that joyful, effortless college warmth. You shine so naturally in every candid second, Anu.'}"
                      </p>
                    </div>
                  </div>

                  {/* Video Reel Tag */}
                  <div className="mt-2 text-[10px] text-[#8B6E60] font-sans">
                    <span>Original Clip from Anuradha's Keepsake Reel</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ========================================================== */}
            {/* REALISTIC BOOK NAVIGATION CONTROLS */}
            {/* ========================================================== */}
            <div className="mt-5 pt-3 border-t border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-3 text-white">
              {/* Turn to Previous Page */}
              <button
                onClick={prevPage}
                disabled={isFlippingPage}
                className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-xs font-bold flex items-center gap-2 cursor-pointer border border-white/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 text-[#FFD166]" />
                <span>Turn to Previous Page ◂</span>
              </button>

              {/* Numbered Page Leaf Indicators */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-[280px] sm:max-w-none py-1 px-2">
                {memories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPage(idx)}
                    className={`w-7 h-7 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      currentPage === idx
                        ? 'bg-[#FFD166] text-[#2D2424] scale-110 shadow-lg font-black'
                        : 'bg-white/15 text-white/80 hover:bg-white/30'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Turn to Next Page */}
              <button
                onClick={nextPage}
                disabled={isFlippingPage}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD166] to-[#F59E0B] hover:brightness-105 text-[#2D2424] text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <span>Turn to Next Page ▸</span>
                <ChevronRight className="w-4 h-4 text-[#2D2424]" />
              </button>
            </div>
          </div>

          {/* Continue to Next Chapter Button */}
          {onNext && (
            <div className="mt-8 text-center">
              <button
                onClick={onNext}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD166] via-[#FFAE00] to-[#FFD166] text-[#2D2424] font-bold text-sm shadow-2xl hover:scale-105 cursor-pointer transition-all border border-white/30 inline-flex items-center gap-2"
              >
                <span>Continue to A Song for Anu →</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ============================================================== */}
      {/* ZOOMED PHOTO LIGHTBOX */}
      {/* ============================================================== */}
      {zoomedPhoto && (
        <div 
          onClick={() => setZoomedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-white p-4 sm:p-6 rounded-3xl shadow-2xl relative"
          >
            <button
              onClick={() => setZoomedPhoto(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-[#2D2424] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-4/5 w-full bg-black rounded-2xl overflow-hidden mb-3">
              <img
                src={zoomedPhoto.url}
                alt={zoomedPhoto.caption}
                className="w-full h-full object-contain"
              />
            </div>

            <h3 className="font-serif text-lg font-bold text-[#2D2424]">
              {zoomedPhoto.caption}
            </h3>
            <p className="text-xs text-[#6B5E59] mt-1 font-handwriting text-base">
              "{zoomedPhoto.note}"
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
