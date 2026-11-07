import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IntroStep } from './components/IntroStep';
import { CakeSection } from './components/CakeSection';
import { PhotoGallery } from './components/PhotoGallery';
import { MusicDedication } from './components/MusicDedication';
import { HeartfeltLetterStep } from './components/HeartfeltLetterStep';
import { ScrapbookResponse } from './components/ScrapbookResponse';
import { LetterPostman, SentLetter } from './components/LetterPostman';
import { sound } from './services/soundEffects';

/**
 * Step-by-step surprise flow:
 * 0. Intro
 * 1. Cake & wish
 * 2. Memories (all 10 polaroids)
 * 3. Music dedication (3D vinyl player + instant Spotify playback)
 * 4. Letter for Anu (heartfelt honest Class 11 story, apology, respect & blessings)
 * 5. Her response (scrapbook reply canvas)
 * Finale: Letter + Postman on bicycle delivery animation
 */
const STEPS = [
  { id: 'intro', label: '' },
  { id: 'cake', label: 'Candles & a wish', next: 'Next: our memories' },
  { id: 'memories', label: 'Our memories', next: 'Next: a song for you' },
  { id: 'music', label: 'A song for you', next: 'Next: a letter for you' },
  { id: 'letter', label: 'A letter for Anu', next: 'Next: your reply' },
  { id: 'reply', label: 'Your reply' },
] as const;

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];

export default function App() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<SentLetter | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, sent]);

  const go = (n: number) => {
    sound.playChime(520 + n * 25);
    setStep(Math.max(0, Math.min(STEPS.length - 1, n)));
  };

  const current = STEPS[step];
  const total = STEPS.length - 1;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2424] font-sans paper-grain selection:bg-[#E8C5C8] selection:text-[#5B2333]">
      {/* Minimal chapter indicator (not a website menu) */}
      {step > 0 && !sent && (
        <header className="fixed top-0 inset-x-0 z-40 pointer-events-none">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-4 flex items-center justify-between">
            <span className="font-display italic text-base sm:text-lg text-[#5B2333]">To Anu, Always</span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#8B6E60] font-mono">
              Chapter {ROMAN[step]} <span className="opacity-50">/ {ROMAN[total]}</span>
            </span>
          </div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-2 sm:mt-3">
            <div className="h-[2px] bg-[#E8DFC8] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#8B3A4D]"
                animate={{ width: `${(step / total) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </header>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={sent ? 'finale' : current.id}
          initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={step > 0 && !sent ? 'pt-14 sm:pt-16 pb-24 sm:pb-28' : ''}
        >
          {sent ? (
            <LetterPostman
              sent={sent}
              onReplay={() => {
                setSent(null);
                setStep(0);
              }}
            />
          ) : current.id === 'intro' ? (
            <IntroStep onBegin={() => go(1)} />
          ) : current.id === 'cake' ? (
            <CakeSection onNext={() => go(2)} />
          ) : current.id === 'memories' ? (
            <PhotoGallery />
          ) : current.id === 'music' ? (
            <MusicDedication onNext={() => go(4)} />
          ) : current.id === 'letter' ? (
            <HeartfeltLetterStep onContinue={() => go(5)} />
          ) : (
            <ScrapbookResponse onSent={setSent} />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Bottom step navigation dock */}
      {step > 0 && !sent && (
        <footer className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent pt-6 pb-4 sm:pb-5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <button
              onClick={() => go(step - 1)}
              className="text-xs tracking-[0.2em] uppercase text-[#8B6E60] hover:text-[#2D2424] cursor-pointer font-medium py-1"
            >
              ← Back
            </button>

            <div className="flex gap-1.5 sm:gap-2">
              {STEPS.slice(1).map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i + 1 === step ? 'w-5 sm:w-6 bg-[#8B3A4D]' : i + 1 < step ? 'w-1.5 bg-[#8B3A4D]/60' : 'w-1.5 bg-[#D9CBB5]'
                  }`}
                />
              ))}
            </div>

            {'next' in current ? (
              <motion.button
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => go(step + 1)}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#5B2333] hover:bg-[#431723] text-[#FAF7F2] text-[11px] sm:text-xs tracking-[0.12em] sm:tracking-[0.15em] uppercase shadow-md cursor-pointer font-medium transition-all"
              >
                {current.next} →
              </motion.button>
            ) : (
              <span className="font-handwriting text-xl sm:text-2xl text-[#8B3A4D]">your turn ♥</span>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
