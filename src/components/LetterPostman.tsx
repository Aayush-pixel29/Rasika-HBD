import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { sound } from '../services/soundEffects';

export interface SentLetter {
  letter: string;
  senderName: string;
  moodEmoji: string;
  stickers: string[];
}

type Stage = 'paper' | 'fold' | 'seal' | 'arrive' | 'pickup' | 'depart' | 'done';

/** Simple illustrated postman on a bicycle (SVG) */
const Postman: React.FC<{ hasLetter: boolean; pedaling: boolean }> = ({ hasLetter, pedaling }) => (
  <svg width="190" height="150" viewBox="0 0 190 150" className="overflow-visible">
    {/* wheels */}
    {[40, 150].map((cx) => (
      <g key={cx} className={pedaling ? 'wheel-spin' : ''} style={{ transformOrigin: `${cx}px 118px` }}>
        <circle cx={cx} cy="118" r="26" fill="none" stroke="#2D2424" strokeWidth="5" />
        <line x1={cx - 26} y1="118" x2={cx + 26} y2="118" stroke="#2D2424" strokeWidth="1.5" />
        <line x1={cx} y1="92" x2={cx} y2="144" stroke="#2D2424" strokeWidth="1.5" />
        <circle cx={cx} cy="118" r="3" fill="#2D2424" />
      </g>
    ))}
    {/* frame */}
    <path d="M40 118 L78 118 L112 80 L66 80 Z M112 80 L150 118 M66 80 L60 68 M112 80 L116 64" stroke="#8B3A4D" strokeWidth="5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    <rect x="50" y="62" width="20" height="5" rx="2" fill="#2D2424" />
    <path d="M110 62 L124 60" stroke="#2D2424" strokeWidth="4" strokeLinecap="round" />
    {/* front basket */}
    <path d="M128 66 L156 66 L152 84 L132 84 Z" fill="#C9A26B" stroke="#7a5a33" strokeWidth="2" />
    {/* leg */}
    <path d="M66 70 L82 98 L78 118" stroke="#24395C" strokeWidth="8" fill="none" strokeLinecap="round" />
    {/* body */}
    <path d="M60 66 Q66 34 88 30 L100 34 Q96 52 74 70 Z" fill="#2F4A75" />
    {/* satchel */}
    <path d="M58 52 L96 30" stroke="#6b4423" strokeWidth="3" />
    <rect x="48" y="50" width="24" height="20" rx="4" fill="#8a5a33" />
    {hasLetter && <rect x="52" y="46" width="16" height="10" fill="#FFF8EC" stroke="#C9A26B" strokeWidth="1" />}
    {/* arm */}
    <path d="M90 38 L112 52 L120 60" stroke="#2F4A75" strokeWidth="7" fill="none" strokeLinecap="round" />
    <circle cx="121" cy="61" r="4" fill="#E2B38F" />
    {/* head */}
    <circle cx="96" cy="20" r="12" fill="#E2B38F" />
    {/* cap */}
    <path d="M83 16 Q96 2 109 14 L109 17 L83 17 Z" fill="#8B3A4D" />
    <path d="M107 16 L118 18" stroke="#5B2333" strokeWidth="3" strokeLinecap="round" />
    <circle cx="101" cy="21" r="1.5" fill="#2D2424" />
    <path d="M100 26 Q103 28 106 26" stroke="#2D2424" strokeWidth="1.2" fill="none" />
  </svg>
);

export const LetterPostman: React.FC<{ sent: SentLetter; onReplay: () => void }> = ({ sent, onReplay }) => {
  const [stage, setStage] = useState<Stage>('paper');

  useEffect(() => {
    const t: number[] = [];
    const at = (ms: number, s: Stage, fx?: () => void) =>
      t.push(window.setTimeout(() => { setStage(s); fx?.(); }, ms));
    at(1800, 'fold', () => sound.playPaperRustle());
    at(3300, 'seal', () => sound.playChime(420));
    at(4500, 'arrive', () => sound.playChime(700));
    at(7300, 'pickup', () => sound.playPaperRustle());
    at(8400, 'depart', () => sound.playChime(820));
    at(11000, 'done', () => {
      sound.playSparkleCelebration();
      confetti({ particleCount: 160, spread: 110, origin: { y: 0.55 }, colors: ['#E8C5C8', '#D4AF37', '#8B3A4D', '#FFF', '#9CAF88'] });
    });
    return () => t.forEach(window.clearTimeout);
  }, []);

  const order: Stage[] = ['paper', 'fold', 'seal', 'arrive', 'pickup', 'depart', 'done'];
  const past = (s: Stage) => order.indexOf(stage) >= order.indexOf(s);

  const caption: Record<Stage, string> = {
    paper: 'your words, just as you wrote them…',
    fold: 'folding it carefully…',
    seal: 'sealed with a little love',
    arrive: 'oh look — the postman is here!',
    pickup: 'handing it over…',
    depart: 'and off it goes ✉️',
    done: '',
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden relative">
      {/* drifting clouds */}
      <div className="cloud" style={{ top: '12%', animationDuration: '38s' }} />
      <div className="cloud" style={{ top: '24%', animationDuration: '52s', animationDelay: '-20s', transform: 'scale(.7)' }} />

      <AnimatePresence mode="wait">
        {stage !== 'done' ? (
          <motion.div key="scene" exit={{ opacity: 0 }} className="w-full max-w-4xl">
            <p className="text-center font-handwriting text-3xl text-[#8B6E60] h-10">{caption[stage]}</p>

            <div className="relative h-[380px] mt-6">
              {/* road */}
              <div className="absolute left-0 right-0 bottom-6 h-[3px] bg-[repeating-linear-gradient(90deg,#C9B79C_0_22px,transparent_22px_38px)]" />

              {/* Letter → envelope */}
              <AnimatePresence>
                {!past('pickup') || stage === 'pickup' ? (
                  <motion.div
                    key="env"
                    className="absolute left-1/2 top-[30px] -translate-x-1/2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      stage === 'pickup'
                        ? { x: -110, y: 200, scale: 0.25, opacity: 0, rotate: -30 }
                        : past('arrive')
                        ? { y: 150, scale: 0.75, opacity: 1 }
                        : { opacity: 1, y: 0 }
                    }
                    transition={{ duration: stage === 'pickup' ? 1 : 0.8, ease: 'easeInOut' }}
                    style={{ perspective: 900 }}
                  >
                    <div className="relative w-[260px] h-[170px]">
                      {/* envelope back */}
                      <motion.div
                        className="absolute inset-0 rounded-md bg-[#EED9C4] shadow-lg"
                        animate={{ opacity: past('fold') ? 1 : 0 }}
                      />
                      {/* the paper */}
                      <motion.div
                        className="absolute left-3 right-3 bg-[#FFFDF8] rounded-sm shadow-md p-4 origin-bottom border border-[#E8DFC8]"
                        initial={{ top: -120, height: 260 }}
                        animate={past('fold') ? { top: 20, height: 130, scaleY: 0.9 } : { top: -120, height: 260 }}
                        transition={{ duration: 1.1, ease: 'easeInOut' }}
                      >
                        <p className="font-handwriting text-lg text-[#5B2333] leading-tight line-clamp-6 whitespace-pre-line">
                          Dear Aayush,{'\n'}
                          {sent.letter}
                        </p>
                        <p className="font-handwriting text-lg text-right text-[#8B3A4D] mt-1">— {sent.senderName}</p>
                      </motion.div>
                      {/* envelope front pocket */}
                      <motion.div
                        className="absolute inset-x-0 bottom-0 h-[115px] rounded-b-md"
                        style={{ background: 'linear-gradient(160deg,#F3E3D2,#E7CDB3)', clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }}
                        animate={{ opacity: past('fold') ? 1 : 0 }}
                      />
                      {/* flap */}
                      <motion.div
                        className="absolute inset-x-0 top-0 h-[100px] origin-top"
                        style={{ background: '#E2C3A5', clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transformStyle: 'preserve-3d' }}
                        initial={{ rotateX: 180, opacity: 0 }}
                        animate={past('fold') ? { rotateX: past('seal') ? 0 : 180, opacity: 1 } : { rotateX: 180, opacity: 0 }}
                        transition={{ duration: 0.7 }}
                      />
                      {/* wax seal */}
                      <motion.div
                        className="absolute left-1/2 top-[78px] -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg shadow-lg"
                        style={{ background: 'radial-gradient(circle at 35% 30%, #b04a60, #7a2a3c)' }}
                        initial={{ scale: 0 }}
                        animate={{ scale: past('seal') ? [0, 1.35, 1] : 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {sent.moodEmoji || '♥'}
                      </motion.div>
                      {/* stamp */}
                      <motion.div
                        className="absolute right-3 bottom-3 text-xl"
                        animate={{ opacity: past('seal') ? 1 : 0 }}
                      >
                        {sent.stickers[0] ?? '🌹'}
                      </motion.div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Postman */}
              {past('arrive') && (
                <motion.div
                  className="absolute bottom-[18px]"
                  initial={{ left: '-30%' }}
                  animate={{ left: stage === 'depart' ? '120%' : '22%' }}
                  transition={{ duration: stage === 'depart' ? 2.4 : 2.6, ease: stage === 'depart' ? 'easeIn' : 'easeOut' }}
                >
                  <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.4 }}>
                    <Postman hasLetter={past('pickup')} pedaling={stage === 'arrive' || stage === 'depart'} />
                  </motion.div>
                  {stage === 'pickup' && (
                    <motion.span
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: -10 }}
                      className="absolute -top-8 left-24 bg-white px-3 py-1 rounded-full shadow font-handwriting text-lg text-[#2D2424] whitespace-nowrap"
                    >
                      Letter for Aayush? On it! 🫡
                    </motion.span>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center max-w-2xl"
          >
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#8B6E60]">Delivered · with love</p>
            <h2 className="font-display text-6xl sm:text-8xl leading-[0.9] text-[#2D2424] mt-4">
              Happy
              <br />
              <span className="italic text-[#8B3A4D]">Birthday,</span>
            </h2>
            <p className="font-handwriting text-7xl sm:text-8xl text-[#5B2333] -mt-1">Anu</p>
            <p className="mt-6 text-[#6B5E59] leading-relaxed">
              Your letter is on its way. Thank you for being the friend whose conversations I still remember years later.
              <br />
              <span className="font-display italic text-lg text-[#2D2424]">Now let's finally plan that reunion. ☕</span>
            </p>
            <button
              onClick={onReplay}
              className="mt-8 px-6 py-3 rounded-full border border-[#8B3A4D] text-[#8B3A4D] hover:bg-[#8B3A4D] hover:text-white transition-colors text-sm cursor-pointer"
            >
              ↺ Relive the surprises
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

