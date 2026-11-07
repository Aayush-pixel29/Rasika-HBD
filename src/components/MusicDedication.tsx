import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Play, Pause, Sparkles, Mail } from 'lucide-react';
import { ANU_SONGS, SongInfo, sound } from '../services/soundEffects';

/** Typewriter effect for the handwritten dedication note */
const useTypewriter = (text: string, speed = 24) => {
  const [out, setOut] = useState('');
  useEffect(() => {
    setOut('');
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);
  return out;
};

const Vinyl: React.FC<{ song: SongInfo; spinning: boolean; size?: number }> = ({ song, spinning, size = 230 }) => (
  <div
    className={`rounded-full relative ${spinning ? 'vinyl-spin' : ''}`}
    style={{
      width: size,
      height: size,
      background:
        'repeating-radial-gradient(circle at center, #111 0px, #1b1b1b 1.5px, #0d0d0d 3px), radial-gradient(circle, #222, #000)',
      boxShadow: '0 10px 25px rgba(0,0,0,0.45), inset 0 0 0 2px rgba(255,255,255,0.04)',
    }}
  >
    {/* sheen */}
    <div
      className="absolute inset-0 rounded-full pointer-events-none"
      style={{
        background:
          'conic-gradient(from 30deg, transparent 0deg, rgba(255,255,255,0.10) 40deg, transparent 80deg, transparent 200deg, rgba(255,255,255,0.08) 230deg, transparent 270deg)',
      }}
    />
    {/* label */}
    <div
      className="absolute rounded-full flex flex-col items-center justify-center text-center"
      style={{
        width: size * 0.38,
        height: size * 0.38,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle at 35% 30%, ${song.color}ee, ${song.color})`,
        boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.15)',
      }}
    >
      <span className="font-display italic text-white leading-none px-1 truncate max-w-full" style={{ fontSize: size * 0.065 }}>
        {song.title}
      </span>
      <span className="text-white/70 uppercase tracking-[0.2em] mt-1" style={{ fontSize: size * 0.028 }}>
        for anu
      </span>
      <span className="absolute w-2 h-2 rounded-full bg-[#1a1a1a]" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
    </div>
  </div>
);

interface MusicDedicationProps {
  onNext?: () => void;
}

export const MusicDedication: React.FC<MusicDedicationProps> = ({ onNext }) => {
  // Start with first song ready
  const [selected, setSelected] = useState<number>(0);
  const [playing, setPlaying] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<HTMLDivElement>(null);

  const song = ANU_SONGS[selected];
  const typed = useTypewriter(song?.dedication ?? '', 22);

  const choose = (i: number) => {
    sound.playChime(560 + i * 20);
    setSelected(i);
    setPlaying(true);
  };

  const onMove = (e: React.MouseEvent) => {
    const r = sceneRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  return (
    <section className="min-h-[calc(100vh-8rem)] py-8 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header typography */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B3A4D]/10 text-[#8B3A4D] text-[11px] font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Chapter III · Dedicated to Anu</span>
          </div>
          <h2 className="font-display text-4xl sm:text-7xl text-[#2D2424] leading-[0.95] mt-1">
            A song <span className="italic text-[#8B3A4D]">for Anu</span>
          </h2>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8B6E60] mt-2">
            pick any record — it plays immediately with a note for you ♪
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14 items-start">
          {/* 3D record player */}
          <div
            ref={sceneRef}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="flex justify-center"
            style={{ perspective: '1400px' }}
          >
            <div
              className="relative transition-transform duration-300 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${22 + tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(-3deg)`,
              }}
            >
              {/* Plinth (wooden body) */}
              <div
                className="relative w-[320px] h-[260px] sm:w-[440px] sm:h-[330px] rounded-[22px]"
                style={{
                  background:
                    'linear-gradient(135deg, #8a5a3c 0%, #6e4529 45%, #5a3720 100%)',
                  boxShadow:
                    '0 14px 0 #3e2615, 0 16px 0 #2c1a0e, 0 35px 55px rgba(40,20,10,0.45), inset 0 2px 0 rgba(255,255,255,0.15)',
                }}
              >
                {/* wood grain */}
                <div
                  className="absolute inset-0 rounded-[22px] opacity-25 pointer-events-none"
                  style={{
                    background:
                      'repeating-linear-gradient(100deg, transparent 0 14px, rgba(0,0,0,0.25) 15px, transparent 17px 30px)',
                  }}
                />
                {/* Top plate */}
                <div className="absolute inset-3 sm:inset-4 rounded-[16px] bg-[#1f1b1a] shadow-inner" />

                {/* Platter */}
                <div className="absolute left-4 top-4 sm:left-7 sm:top-7 w-[215px] h-[215px] sm:w-[276px] sm:h-[276px] rounded-full bg-[#2a2625] shadow-[inset_0_0_0_6px_#3a3433,0_6px_14px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {song ? (
                      <motion.div
                        key={song.title}
                        initial={{ x: -240, opacity: 0, rotate: -90 }}
                        animate={{ x: 0, opacity: 1, rotate: 0 }}
                        exit={{ x: 240, opacity: 0, rotate: 90 }}
                        transition={{ type: 'spring', stiffness: 75, damping: 15 }}
                      >
                        <div className="hidden sm:block">
                          <Vinyl song={song} spinning={playing} size={262} />
                        </div>
                        <div className="sm:hidden">
                          <Vinyl song={song} spinning={playing} size={200} />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  {/* spindle */}
                  <div className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-gray-200 to-gray-500 shadow" />
                </div>

                {/* Tonearm */}
                <div className="absolute right-5 top-5 sm:right-8 sm:top-8 w-14 h-14 sm:w-16 sm:h-16">
                  {/* pivot base */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d9d4cc] to-[#8f877c] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-3 sm:inset-4 rounded-full bg-[#3a3433]" />
                  <div
                    className="absolute left-1/2 top-1/2 origin-top transition-transform duration-[800ms] ease-[cubic-bezier(.5,1.5,.4,1)]"
                    style={{ transform: `translateX(-50%) rotate(${playing ? 28 : 4}deg)` }}
                  >
                    <div className="w-[5px] sm:w-[6px] h-[145px] sm:h-[190px] rounded-full bg-gradient-to-b from-[#e8e3db] to-[#a49c90] shadow-md mx-auto" />
                    {/* headshell */}
                    <div className="w-4 sm:w-5 h-7 sm:h-8 -mt-1 rounded-sm bg-[#cfc8bd] mx-auto rotate-[18deg] shadow-md relative">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#8B3A4D]" />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute right-5 bottom-5 sm:right-8 sm:bottom-8 flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${playing ? 'bg-[#1DB954] shadow-[0_0_8px_#1DB954]' : 'bg-[#5a5150]'}`} />
                    <span className="text-[9px] tracking-[0.25em] text-[#E8DFC8]/60 uppercase">AUTO-PLAY</span>
                  </div>
                  <button
                    onClick={() => {
                      sound.playChime(480);
                      setPlaying((p) => !p);
                    }}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#e9e3d9] to-[#9d958a] text-[#2D2424] flex items-center justify-center shadow-[0_4px_0_#5f574d] active:translate-y-1 active:shadow-none cursor-pointer"
                    title={playing ? 'Pause' : 'Play'}
                  >
                    {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>

                {/* engraved brand */}
                <span className="absolute left-5 bottom-2 sm:left-8 sm:bottom-3 font-display italic text-[#E8DFC8]/50 text-xs sm:text-sm">
                  Anu-phone · Special Edition
                </span>
              </div>
            </div>
          </div>

          {/* Record shelf + note */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#5B2333] uppercase tracking-wider">
                Select Any Record (Tap to Play):
              </span>
              <span className="text-[11px] text-[#8B6E60]">8 Curated Songs</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
              {ANU_SONGS.map((s, i) => {
                const active = selected === i;
                return (
                  <motion.button
                    key={s.title}
                    onClick={() => choose(i)}
                    whileHover={{ y: -4, rotate: i % 2 ? 1.5 : -1.5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative aspect-square rounded-xl overflow-visible cursor-pointer text-left transition-all ${
                      active ? 'ring-3 ring-offset-2 ring-offset-[#FAF7F2] ring-[#8B3A4D] scale-[1.03]' : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* vinyl peeking out */}
                    <div className="absolute inset-1 rounded-full bg-[#141414] transition-transform duration-300 group-hover:translate-x-3" />
                    {/* sleeve */}
                    <div
                      className="absolute inset-0 rounded-xl p-2 flex flex-col justify-between shadow-md border border-white/10"
                      style={{ background: `linear-gradient(150deg, ${s.color}, ${s.color}dd 60%, #00000044)` }}
                    >
                      <span className="text-[9px] text-white/80 tracking-widest font-mono">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display italic text-white text-xs sm:text-sm leading-tight line-clamp-2">{s.title}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Dedication note & Spotify Embed */}
            <AnimatePresence mode="wait">
              {song && (
                <motion.div
                  key={song.title}
                  initial={{ opacity: 0, y: 15, rotate: -1.5 }}
                  animate={{ opacity: 1, y: 0, rotate: -0.5 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 relative bg-[#FFFDF8] p-5 sm:p-6 rounded-2xl polaroid-shadow border border-[#E8DFC8]"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape washi-tape-pink rounded-xs" />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-[#8B6E60] font-mono">NOW SPINNING</p>
                      <h3 className="font-display text-2xl sm:text-3xl text-[#2D2424] leading-tight">{song.title}</h3>
                      <p className="text-xs text-[#8B6E60]">{song.artist}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#8B3A4D]/10 text-[#8B3A4D] text-[10px] font-semibold">
                      {song.tag}
                    </span>
                  </div>

                  {/* Typewritten message */}
                  <p className="font-handwriting text-xl sm:text-2xl text-[#5B2333] leading-snug mt-3 min-h-[4.5rem]">
                    "{typed}"
                    <span className="animate-pulse">|</span>
                  </p>

                  {/* Spotify Embed Player - auto plays with verified track ID */}
                  <div className="mt-4 rounded-xl overflow-hidden shadow-sm border border-[#E8DFC8]">
                    <iframe
                      key={song.spotifyId}
                      title={`Spotify – ${song.title}`}
                      src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&autoplay=1&theme=0`}
                      width="100%"
                      height="80"
                      frameBorder={0}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="eager"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <a
                      href={song.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1DB954] hover:bg-[#18a34a] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                    >
                      <span>Open on Spotify</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {onNext && (
                      <button
                        onClick={onNext}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#5B2333] hover:bg-[#431723] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Read Letter for Anu →</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
