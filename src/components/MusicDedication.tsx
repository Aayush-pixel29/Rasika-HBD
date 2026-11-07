import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Play, Pause } from 'lucide-react';
import { ANU_SONGS, SongInfo, sound } from '../services/soundEffects';

/** Typewriter effect for the handwritten dedication note */
const useTypewriter = (text: string, speed = 28) => {
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
      <span className="font-display italic text-white leading-none" style={{ fontSize: size * 0.07 }}>
        {song.title}
      </span>
      <span className="text-white/70 uppercase tracking-[0.2em] mt-1" style={{ fontSize: size * 0.028 }}>
        for anu
      </span>
      <span className="absolute w-2 h-2 rounded-full bg-[#1a1a1a]" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }} />
    </div>
  </div>
);

export const MusicDedication: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sceneRef = useRef<HTMLDivElement>(null);

  const song = selected !== null ? ANU_SONGS[selected] : null;
  const typed = useTypewriter(song?.dedication ?? '', 26);

  const choose = (i: number) => {
    sound.playChime(560 + i * 20);
    setSelected(i);
    setPlaying(false);
    // drop the needle shortly after the record lands
    window.setTimeout(() => setPlaying(true), 900);
  };

  const onMove = (e: React.MouseEvent) => {
    const r = sceneRef.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  return (
    <section className="min-h-[calc(100vh-8rem)] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header typography */}
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#8B6E60]">Chapter III · Dedicated to you</p>
          <h2 className="font-display text-5xl sm:text-7xl text-[#2D2424] leading-[0.95] mt-3">
            A song <span className="italic text-[#8B3A4D]">for Anu</span>
          </h2>
          <p className="font-handwriting text-2xl sm:text-3xl text-[#8B6E60] mt-3">
            pick a record — any one you like ♪
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
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
                transform: `rotateX(${24 + tilt.x}deg) rotateY(${tilt.y}deg) rotateZ(-4deg)`,
              }}
            >
              {/* Plinth (wooden body) */}
              <div
                className="relative w-[330px] h-[260px] sm:w-[440px] sm:h-[330px] rounded-[22px]"
                style={{
                  background:
                    'linear-gradient(135deg, #8a5a3c 0%, #6e4529 45%, #5a3720 100%)',
                  boxShadow:
                    '0 14px 0 #3e2615, 0 16px 0 #2c1a0e, 0 40px 60px rgba(40,20,10,0.45), inset 0 2px 0 rgba(255,255,255,0.15)',
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
                <div className="absolute left-5 top-5 sm:left-7 sm:top-7 w-[220px] h-[220px] sm:w-[276px] sm:h-[276px] rounded-full bg-[#2a2625] shadow-[inset_0_0_0_6px_#3a3433,0_6px_14px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {song ? (
                      <motion.div
                        key={song.title}
                        initial={{ x: -260, opacity: 0, rotate: -120 }}
                        animate={{ x: 0, opacity: 1, rotate: 0 }}
                        exit={{ x: 260, opacity: 0, rotate: 90 }}
                        transition={{ type: 'spring', stiffness: 70, damping: 14 }}
                      >
                        <div className="hidden sm:block">
                          <Vinyl song={song} spinning={playing} size={262} />
                        </div>
                        <div className="sm:hidden">
                          <Vinyl song={song} spinning={playing} size={208} />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center px-8"
                      >
                        <p className="font-handwriting text-xl text-[#E8DFC8]/70">waiting for your record…</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* spindle */}
                  <div className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-gray-200 to-gray-500 shadow" />
                </div>

                {/* Tonearm */}
                <div className="absolute right-6 top-6 sm:right-8 sm:top-8 w-16 h-16">
                  {/* pivot base */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#d9d4cc] to-[#8f877c] shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
                  <div className="absolute inset-4 rounded-full bg-[#3a3433]" />
                  <div
                    className="absolute left-1/2 top-1/2 origin-top transition-transform duration-[900ms] ease-[cubic-bezier(.5,1.6,.4,1)]"
                    style={{ transform: `translateX(-50%) rotate(${playing ? 28 : 4}deg)` }}
                  >
                    <div className="w-[6px] h-[150px] sm:h-[190px] rounded-full bg-gradient-to-b from-[#e8e3db] to-[#a49c90] shadow-md mx-auto" />
                    {/* headshell */}
                    <div className="w-5 h-8 -mt-1 rounded-sm bg-[#cfc8bd] mx-auto rotate-[18deg] shadow-md relative">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#8B3A4D]" />
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute right-6 bottom-6 sm:right-8 sm:bottom-8 flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${playing ? 'bg-[#1DB954] shadow-[0_0_8px_#1DB954]' : 'bg-[#5a5150]'}`} />
                    <span className="text-[9px] tracking-[0.25em] text-[#E8DFC8]/60 uppercase">33⅓</span>
                  </div>
                  <button
                    disabled={!song}
                    onClick={() => {
                      sound.playChime(480);
                      setPlaying((p) => !p);
                    }}
                    className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e9e3d9] to-[#9d958a] text-[#2D2424] flex items-center justify-center shadow-[0_4px_0_#5f574d] active:translate-y-1 active:shadow-none disabled:opacity-40 cursor-pointer"
                    title={playing ? 'Lift needle' : 'Drop needle'}
                  >
                    {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>

                {/* engraved brand */}
                <span className="absolute left-6 bottom-2 sm:left-8 sm:bottom-3 font-display italic text-[#E8DFC8]/40 text-xs sm:text-sm">
                  Anu-phone · est. college days
                </span>
              </div>
            </div>
          </div>

          {/* Record shelf + note */}
          <div>
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {ANU_SONGS.map((s, i) => {
                const active = selected === i;
                return (
                  <motion.button
                    key={s.title}
                    onClick={() => choose(i)}
                    whileHover={{ y: -6, rotate: i % 2 ? 2 : -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative aspect-square rounded-lg overflow-visible cursor-pointer text-left ${
                      active ? 'ring-2 ring-offset-2 ring-offset-[#FAF7F2] ring-[#8B3A4D]' : ''
                    }`}
                  >
                    {/* vinyl peeking out */}
                    <div className="absolute inset-1 rounded-full bg-[#141414] transition-transform duration-300 group-hover:translate-x-4" />
                    {/* sleeve */}
                    <div
                      className="absolute inset-0 rounded-lg p-2 flex flex-col justify-between shadow-md"
                      style={{ background: `linear-gradient(150deg, ${s.color}, ${s.color}cc 60%, #00000033)` }}
                    >
                      <span className="text-[9px] text-white/70 tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display italic text-white text-sm sm:text-base leading-tight">{s.title}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Dedication note */}
            <AnimatePresence mode="wait">
              {song ? (
                <motion.div
                  key={song.title}
                  initial={{ opacity: 0, y: 20, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: -1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8 relative bg-[#FFFDF8] p-5 sm:p-6 rounded-sm polaroid-shadow border border-[#E8DFC8]"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 washi-tape washi-tape-pink" />
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#8B6E60]">Now spinning</p>
                  <h3 className="font-display text-3xl text-[#2D2424] leading-tight">{song.title}</h3>
                  {song.artist !== song.title && <p className="text-xs text-[#8B6E60]">{song.artist}</p>}
                  <p className="font-handwriting text-2xl text-[#5B2333] leading-snug mt-3 min-h-[5.5rem]">
                    {typed}
                    <span className="animate-pulse">|</span>
                  </p>

                  {/* Real audio */}
                  {song.spotifyId ? (
                    <iframe
                      key={song.spotifyId}
                      title={`Spotify – ${song.title}`}
                      src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator`}
                      width="100%"
                      height="80"
                      className="mt-3 rounded-xl"
                      frameBorder={0}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  ) : null}
                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DB954] hover:bg-[#18a34a] text-white text-xs font-semibold"
                  >
                    {song.spotifyId ? 'Open in Spotify' : 'Play on Spotify'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              ) : (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 font-handwriting text-2xl text-[#8B6E60] text-center lg:text-left"
                >
                  ← every record comes with a little note from me.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

