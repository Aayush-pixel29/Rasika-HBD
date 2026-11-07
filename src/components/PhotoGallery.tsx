import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  RotateCw, 
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

import princessArtwork from '../assets/images/princess_artwork.jpg';
import princessPortrait from '../assets/images/princess_portrait.jpg';

interface PhotoGalleryProps {
  onNext?: () => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onNext }) => {
  // Always load latest curated memories with videos and notes
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

  const [viewMode, setViewMode] = useState<'album' | 'wall'>('album');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
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
    setDirection(1);
    setCurrentPage((p) => (p + 1) % memories.length);
  };

  const prevPage = () => {
    sound.playPaperRustle();
    setDirection(-1);
    setCurrentPage((p) => (p - 1 + memories.length) % memories.length);
  };

  const goToPage = (idx: number) => {
    if (idx === currentPage) return;
    sound.playPaperRustle();
    setDirection(idx > currentPage ? 1 : -1);
    setCurrentPage(idx);
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
      className="min-h-screen py-10 sm:py-16 px-2 sm:px-6 relative overflow-hidden transition-all duration-1000"
      style={{
        // Single unified, panoramic celestial canvas: Sunset on left, Rainbow & Azure Sky in center, Moonlit Night on right
        background: 'linear-gradient(180deg, #1C1938 0%, #2E2554 18%, #493B6E 35%, #7B4B67 55%, #A8655E 75%, #D69766 100%)',
      }}
    >
      {/* ============================================================== */}
      {/* UNIFIED 3D CELESTIAL BACKGROUND: Sunset, Rainbow Azure Sky & Moon */}
      {/* ============================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* SUNSET HORIZON (Left Side) */}
        <div className="absolute top-0 left-0 w-full sm:w-1/3 h-full opacity-90">
          <div className="absolute top-16 left-8 sm:left-16 w-28 h-28 rounded-full bg-gradient-to-t from-[#FF7A00] via-[#FFAE00] to-[#FFE27D] shadow-[0_0_80px_#FFAE00] opacity-85" />
          <div className="absolute top-2 left-0 w-64 h-64 bg-radial from-[#FFAE00]/30 to-transparent blur-2xl" />
          <div className="absolute top-36 left-4 w-48 h-10 bg-[#FFD1A9]/20 rounded-full blur-md" />
        </div>

        {/* AZURE SKY + VIBRANT DOUBLE RAINBOW (Center) */}
        <div className="absolute top-0 left-0 right-0 h-full flex justify-center pointer-events-none">
          <div className="absolute top-4 w-72 h-72 rounded-full bg-radial from-[#FFF9D2]/35 via-[#70C1FF]/10 to-transparent blur-2xl" />
          
          {/* Rainbow Arc */}
          <div 
            className="absolute -top-12 w-[340px] sm:w-[680px] h-[220px] sm:h-[340px] rounded-t-full border-[10px] sm:border-[18px] opacity-75 blur-[1px] animate-pulse"
            style={{
              borderImage: 'linear-gradient(to top, rgba(255,0,0,0.5), rgba(255,165,0,0.5), rgba(255,255,0,0.5), rgba(0,128,0,0.5), rgba(0,0,255,0.5), rgba(238,130,238,0.5)) 1',
              borderBottom: 'none',
              filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.4))',
            }}
          />

          <div className="absolute top-28 w-44 h-12 bg-white/35 rounded-full blur-md animate-float-gentle" />
          <div className="absolute top-36 left-1/3 w-36 h-10 bg-white/30 rounded-full blur-sm" />
        </div>

        {/* MIDNIGHT MOON & STARS (Right Side) */}
        <div className="absolute top-0 right-0 w-full sm:w-1/3 h-full opacity-90">
          <div className="absolute top-14 right-8 sm:right-20 w-24 h-24 rounded-full shadow-[0_0_70px_rgba(255,255,255,0.85)] bg-gradient-to-br from-[#FFFFFF] to-[#E3EAF5] flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#CBD5E1]/40 absolute top-4 left-5" />
            <div className="w-3 h-3 rounded-full bg-[#CBD5E1]/30 absolute bottom-5 right-6" />
          </div>

          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: (i % 3) + 1.5,
                height: (i % 3) + 1.5,
                top: `${(i * 19) % 70 + 8}%`,
                right: `${(i * 13) % 85 + 5}%`,
                animationDuration: `${(i % 4) + 2}s`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>

        {/* Stone Castle Terrace Base Silhouette */}
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#140F1D] via-[#241A2E] to-transparent opacity-95" />
      </div>

      {/* ============================================================== */}
      {/* SECTION CONTENT CONTAINER */}
      {/* ============================================================== */}
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Chapter Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-semibold tracking-widest uppercase mb-2 border border-white/20 shadow-md">
            <Sparkles className="w-3 h-3 text-[#FFD166]" />
            <span>Chapter II · The Princess Sky Tower Album</span>
          </div>

          <h2 className="font-display text-3xl sm:text-6xl text-white drop-shadow-lg leading-tight">
            Memories in the <span className="italic text-[#FFD166]">Sky</span> ✨
          </h2>

          {/* View Mode Toggle: Open Book Spread vs All Polaroids */}
          <div className="mt-4 flex items-center justify-center">
            <div className="bg-black/45 backdrop-blur-md p-1 rounded-full border border-white/25 flex items-center gap-1 shadow-xl">
              <button
                onClick={() => {
                  sound.playChime(500);
                  setViewMode('album');
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'album'
                    ? 'bg-[#FFD166] text-[#2D2424] shadow-md font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Storybook Spread</span>
              </button>

              <button
                onClick={() => {
                  sound.playChime(550);
                  setViewMode('wall');
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'wall'
                    ? 'bg-[#FFD166] text-[#2D2424] shadow-md font-bold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Polaroids & Clips</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PRINCESS IN THE TOWER (Hero Artwork inspired by user's image) */}
        {/* ============================================================== */}
        <div className="relative mb-8 flex flex-col items-center">
          <div className="w-full max-w-4xl bg-black/35 backdrop-blur-md rounded-3xl p-3 sm:p-5 border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
            
            {/* Ornate Gold Trim on Arch */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37]" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Left Column: Full Grand Artwork of Princess in Tower */}
              <div className="md:col-span-7 relative rounded-2xl overflow-hidden border border-white/20 shadow-xl group">
                <img
                  src={princessArtwork}
                  alt="Princess Anuradha in the high tower holding her royal album"
                  className="w-full h-[220px] sm:h-[280px] object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
                
                {/* Floating Caption on Artwork */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#FFD166]" />
                    <span className="font-serif font-bold text-[11px] text-[#FFE8A3]">Princess Anuradha in the Tower</span>
                  </div>
                  <span className="hidden sm:inline text-[10px] text-white/80 bg-black/50 backdrop-blur-xs px-2 py-1 rounded-full">
                    Gazing upon the rainbow & sunset
                  </span>
                </div>
              </div>

              {/* Right Column: Royal Dedication & Book Invitation */}
              <div className="md:col-span-5 flex flex-col justify-center text-left px-2 sm:px-4">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#FFD166] tracking-widest uppercase mb-1">
                  <span>✦ The Royal Keepsake Sanctuary ✦</span>
                </div>
                
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-tight">
                  Her Keepsake Album in Hand
                </h3>

                <p className="text-xs text-white/85 leading-relaxed mt-2">
                  Standing in the stone castle chamber, overlooking the sunset and the double rainbow, holding her open book of memories. Flip through the pages below to see each moment with its companion live clip.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playPaperRustle();
                      setViewMode('album');
                    }}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD166] via-[#FFAE00] to-[#FFD166] text-[#2D2424] font-bold text-xs shadow-lg hover:scale-105 cursor-pointer transition-all flex items-center gap-2 border border-white/30"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#8B3A4D]" />
                    <span>Flip Pages in Album ↓</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW MODE 1: GRAND TWO-PAGE STORYBOOK ALBUM SPREAD */}
        {/* Left: Polaroid Photo + Note | Right: Companion Video Clip + Note */}
        {/* Animated like a real 3D turning book page! */}
        {/* ============================================================== */}
        {viewMode === 'album' && (
          <div className="relative" style={{ perspective: '1400px' }}>
            
            {/* Grand Royal Book Cover & Gilded Leather Rim */}
            <div className="bg-[#241715] p-3 sm:p-6 rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.85)] border-4 border-[#D4AF37]/70 relative overflow-hidden">
              
              {/* Brass Corner Guards */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#FFD166]" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#FFD166]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#FFD166]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#FFD166]" />

              {/* 3D BOOK PAGE TURN ANIMATION WRAPPER */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({
                      rotateY: d > 0 ? 30 : -30,
                      opacity: 0,
                      scale: 0.97,
                      transformOrigin: d > 0 ? 'right center' : 'left center',
                    }),
                    center: {
                      rotateY: 0,
                      opacity: 1,
                      scale: 1,
                      transformOrigin: 'center center',
                      transition: {
                        duration: 0.5,
                        ease: [0.25, 1, 0.5, 1],
                      },
                    },
                    exit: (d: number) => ({
                      rotateY: d > 0 ? -30 : 30,
                      opacity: 0,
                      scale: 0.97,
                      transformOrigin: d > 0 ? 'left center' : 'right center',
                      transition: {
                        duration: 0.35,
                        ease: [0.25, 1, 0.5, 1],
                      },
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-[#FAF7F0] rounded-2xl border border-[#E8DFC8] p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-stretch min-h-[520px] relative shadow-inner"
                >
                  {/* Center Spine Crease */}
                  <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#E8DFC8] via-[#B8A68B] to-[#E8DFC8] opacity-70 pointer-events-none" />

                  {/* ==================================================== */}
                  {/* LEFT PAGE: POLAROID PHOTO WITH 3D FLIP NOTE */}
                  {/* ==================================================== */}
                  <div className="flex flex-col items-center justify-between bg-[#FDFBF7] p-4 sm:p-5 rounded-xl border border-[#EDE4D0] shadow-xs">
                    
                    {/* Left Page Top Banner */}
                    <div className="w-full flex items-center justify-between text-[11px] text-[#8B6E60] font-semibold tracking-wider uppercase mb-3 pb-2 border-b border-[#E8DFC8]/60">
                      <span className="flex items-center gap-1 text-[#8B3A4D]">
                        <Camera className="w-3.5 h-3.5" />
                        <span>Photo Memory {currentPage + 1}</span>
                      </span>
                      <span className="text-black/50 font-serif italic">Tap photo to flip note ↻</span>
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

                            {/* Photo Caption & Metadata */}
                            <div className="px-1">
                              <p className="font-handwriting text-lg sm:text-xl text-[#2D2424] leading-tight">
                                {currentMemory.caption}
                              </p>
                              <div className="mt-1 flex items-center justify-between text-[11px] text-[#8B6E60]">
                                <span>{currentMemory.date}</span>
                                <span className="flex items-center gap-1 text-[#8B3A4D] font-bold">
                                  <RotateCw className="w-3 h-3" />
                                  <span>Read Note</span>
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          /* Flip Side: Secret Story Note */
                          <div className="aspect-4/5 w-full p-4 bg-[#FFFDF8] rounded-xs flex flex-col justify-between text-left border border-dashed border-[#8B3A4D]/30">
                            <div>
                              <div className="flex items-center justify-between pb-2 border-b border-[#E8DFC8]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B3A4D]">
                                  Scrapbook Memory Note
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

                    {/* Flip Hint Button */}
                    <button
                      onClick={() => handleFlip(currentMemory.id)}
                      className="mt-3 text-xs font-semibold text-[#8B3A4D] hover:text-[#5B2333] cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{isCurrentFlipped ? 'Flip Back to Photo' : 'Flip to Read Secret Note'}</span>
                    </button>
                  </div>

                  {/* ==================================================== */}
                  {/* RIGHT PAGE: COMPANION LIVE VIDEO CLIP & VIDEO NOTE */}
                  {/* ==================================================== */}
                  <div className="flex flex-col items-center justify-between bg-[#FDFBF7] p-4 sm:p-5 rounded-xl border border-[#EDE4D0] shadow-xs">
                    
                    {/* Right Page Top Banner */}
                    <div className="w-full flex items-center justify-between text-[11px] text-[#8B6E60] font-semibold tracking-wider uppercase mb-3 pb-2 border-b border-[#E8DFC8]/60">
                      <span className="flex items-center gap-1 text-[#2B609E]">
                        <Play className="w-3.5 h-3.5" />
                        <span>Live Video Clip in Motion</span>
                      </span>
                      <span className="text-black/50 font-serif italic">Memory Reel {currentPage + 1}</span>
                    </div>

                    {/* Video Player Frame with Controls */}
                    <div className="w-full max-w-[340px] flex flex-col items-center">
                      <div className="relative aspect-4/5 w-full bg-black rounded-lg overflow-hidden shadow-md border-2 border-[#D4AF37]/40 group">
                        
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

                        {/* Floating Video Overlay Badge */}
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-white text-[10px] font-semibold flex items-center gap-1 border border-white/20">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                          <span>Live Clip</span>
                        </div>

                        {/* Bottom Player Controls */}
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

                          <span className="text-[10px] text-white/70 truncate max-w-[140px]">
                            {currentMemory.videoCaption || 'Live Memory'}
                          </span>
                        </div>
                      </div>

                      {/* Dedicated Video Note Card */}
                      <div className="w-full mt-3 p-3 bg-white rounded-lg border border-[#E8DFC8] shadow-xs text-left">
                        <h4 className="font-serif text-xs font-bold text-[#2D2424] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#FFD166]" />
                          <span>{currentMemory.videoCaption || 'Seeing Her in Motion'}</span>
                        </h4>
                        <p className="font-handwriting text-sm text-[#4E342E] leading-relaxed mt-1">
                          "{currentMemory.videoNote || 'Watching you smile in this clip brings back that joyful, effortless college warmth. You shine so naturally in every candid second, Anu.'}"
                        </p>
                      </div>
                    </div>

                    {/* Video Status Tag */}
                    <div className="mt-2 text-[10px] text-[#8B6E60] font-sans">
                      <span>Original Clip from Anuradha's Keepsake Reel</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ==================================================== */}
              {/* BOTTOM BOOK NAVIGATION BAR */}
              {/* ==================================================== */}
              <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-3 text-white">
                {/* Previous Button */}
                <button
                  onClick={prevPage}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-white/20 transition-all hover:scale-105"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                {/* Numbered Page Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[280px] sm:max-w-none py-1 px-2">
                  {memories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToPage(idx)}
                      className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                        currentPage === idx
                          ? 'bg-[#FFD166] text-[#2D2424] scale-110 shadow-md'
                          : 'bg-white/15 text-white/80 hover:bg-white/30'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextPage}
                  className="px-4 py-2 rounded-full bg-[#FFD166] hover:bg-[#F3C64F] text-[#2D2424] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all hover:scale-105"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Continue to Next Chapter Button */}
            {onNext && (
              <div className="mt-6 text-center">
                <button
                  onClick={onNext}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FFD166] via-[#FFAE00] to-[#FFD166] text-[#2D2424] font-bold text-sm shadow-xl hover:scale-105 cursor-pointer transition-all border border-white/30 inline-flex items-center gap-2"
                >
                  <span>Continue to A Song for Anu →</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* VIEW MODE 2: ALL POLAROIDS & VIDEOS GALLERY WALL */}
        {/* ============================================================== */}
        {viewMode === 'wall' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-4">
            {memories.map((mem, idx) => {
              const isFlipped = !!flippedIds[mem.id];
              return (
                <div 
                  key={mem.id}
                  className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-xl transition-all hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Top Tape */}
                  <div className="w-24 h-4 washi-tape washi-tape-pink mx-auto -mt-6 mb-2 rounded-xs" />

                  {/* Media (Photo or Video preview) */}
                  <div 
                    onClick={() => handleFlip(mem.id)}
                    className="cursor-pointer"
                  >
                    {!isFlipped ? (
                      <>
                        <div className="relative aspect-4/5 w-full bg-black/10 rounded-lg overflow-hidden mb-3">
                          <img
                            src={mem.url}
                            alt={mem.caption}
                            className="w-full h-full object-cover"
                          />
                          {mem.videoUrl && (
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-[#FFD166] text-[10px] font-bold flex items-center gap-1">
                              <Play className="w-2.5 h-2.5" />
                              <span>Video Included</span>
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-sm font-bold text-[#2D2424]">
                          {mem.caption}
                        </h4>
                        <p className="text-[11px] text-[#8B6E60] mt-0.5">
                          {mem.date} · {mem.location || 'College'}
                        </p>
                      </>
                    ) : (
                      <div className="aspect-4/5 w-full p-4 bg-[#FAF7F0] rounded-lg border border-dashed border-[#8B3A4D]/40 flex flex-col justify-between text-left mb-3">
                        <p className="font-handwriting text-base text-[#3E2723]">
                          "{mem.note}"
                        </p>
                        <span className="text-[10px] text-[#8B6E60] font-sans">
                          Tap to flip back ↻
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Open in Storybook button */}
                  <button
                    onClick={() => {
                      goToPage(idx);
                      setViewMode('album');
                      sound.playPaperRustle();
                    }}
                    className="mt-3 w-full py-1.5 rounded-lg bg-[#FAF0DC] hover:bg-[#F5E6CA] text-[#5B2333] text-xs font-semibold cursor-pointer border border-[#E8DFC8] flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View in Storybook Spread</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* ZOOMED PHOTO LIGHTBOX */}
      {/* ============================================================== */}
      {zoomedPhoto && (
        <div 
          onClick={() => setZoomedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-xl w-full bg-white p-4 sm:p-6 rounded-2xl shadow-2xl relative"
          >
            <button
              onClick={() => setZoomedPhoto(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-[#2D2424] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-4/5 w-full bg-black rounded-lg overflow-hidden mb-3">
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
