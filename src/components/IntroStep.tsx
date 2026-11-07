import React from 'react';
import { motion } from 'motion/react';

const chapters = [
  ['I', 'Candles & a wish'],
  ['II', 'Our memories'],
  ['III', 'A song for you'],
  ['IV', 'Letter for Anu'],
  ['V', 'Your reply'],
];

export const IntroStep: React.FC<{ onBegin: () => void }> = ({ onBegin }) => {
  const name = 'Anu';
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
      {/* floating petals */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: `${(i * 7.3) % 100}%`, animationDelay: `${(i * 1.7) % 12}s`, animationDuration: `${10 + (i % 5) * 2}s` }}
        />
      ))}

      <motion.p
        initial={{ opacity: 0, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, letterSpacing: '0.35em' }}
        transition={{ duration: 1.4 }}
        className="text-[11px] uppercase text-[#8B6E60] font-mono font-medium"
      >
        A special birthday journal · step by step
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="font-display text-[17vw] sm:text-[8.5rem] leading-[0.85] text-[#2D2424] mt-5"
      >
        Happy
        <br />
        <span className="italic text-[#8B3A4D]">Birthday</span>
      </motion.h1>

      <div className="flex justify-center mt-1" aria-label={name}>
        {name.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 1.1 + i * 0.25, type: 'spring', stiffness: 120 }}
            className="font-handwriting text-[24vw] sm:text-[10rem] leading-none text-[#5B2333]"
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="max-w-md text-sm sm:text-base text-[#6B5E59] leading-relaxed -mt-2 px-4"
      >
        From our Class 11 talks to where life has brought us today — years have passed, but you will always be special.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
        className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-x-4 sm:gap-x-6 gap-y-3 max-w-2xl px-2"
      >
        {chapters.map(([n, t]) => (
          <div key={n} className="text-center bg-[#FFFDF8]/70 p-2.5 rounded-xl border border-[#E8DFC8]/60 shadow-2xs">
            <span className="font-display italic text-xl text-[#8B3A4D] block">{n}</span>
            <span className="text-[10px] uppercase tracking-wider text-[#6B5E59] block font-medium mt-0.5">{t}</span>
          </div>
        ))}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        onClick={onBegin}
        className="mt-10 group relative px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-[#5B2333] text-[#FAF7F2] text-xs sm:text-sm tracking-[0.2em] uppercase shadow-[0_12px_30px_-8px_rgba(91,35,51,0.6)] cursor-pointer"
      >
        <span className="absolute inset-0 rounded-full animate-ping bg-[#8B3A4D]/30" />
        <span className="relative font-semibold">Open your surprise ✉</span>
      </motion.button>
    </section>
  );
};
