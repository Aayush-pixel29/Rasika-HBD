import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IntroStep } from './components/IntroStep';
import { CakeSection } from './components/CakeSection';
import { PhotoGallery } from './components/PhotoGallery';
import { MusicDedication } from './components/MusicDedication';
import { ScrapbookResponse } from './components/ScrapbookResponse';
import { LetterPostman, SentLetter } from './components/LetterPostman';
import { sound } from './services/soundEffects';

/**
 * Step-by-step surprise flow (no website-style navigation):
 * Intro → Cake & wish → Photo gallery → Music dedication → Her reply → Letter + postman finale
 */
const STEPS = [
  { id: 'intro', label: '' },
  { id: 'cake', label: 'Candles & a wish', next: 'Next: our memories' },
  { id: 'memories', label: 'Our memories', next: 'Next: a song for you' },
  { id: 'music', label: 'A song for you', next: 'Next: your reply' },
  { id: 'reply', label: 'Your reply' },
] as const;

const ROMAN = ['', 'I', 'II', 'III', 'IV'];

export default function App() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState<SentLetter | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, sent]);

  const go = (n: number) => {
    sound.playChime(520 + n * 30);
    setStep(Math.max(0, Math.min(STEPS.length - 1, n)));
  };

  const current = STEPS[step];
  const total = STEPS.length - 1;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2424] font-sans paper-grain selection:bg-[#E8C5C8] selection:text-[#5B2333]">
      {/* Minimal chapter indicator (not a menu) */}
      {step > 0 && !sent && (
        <header className="fixed top-0 inset-x-0 z-40 pointer-events-none">
          <div className="max-w-6xl mx-auto px-5 pt-4 flex items-center justify-between">
            <span className="font-display italic text-lg text-[#5B2333]">To Anu, Always</span>
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#8B6E60]">
              Chapter {ROMAN[step]} <span className="opacity-50">/ {ROMAN[total]}</span>
            </span>
          </div>
          <div className="max-w-6xl mx-auto px-5 mt-3">
            <div className="h-[2px] bg-[#E8DFC8] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#8B3A4D]"
                animate={{ width: `${(step / total) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </header>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={sent ? 'finale' : current.id}
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -40, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={step > 0 && !sent ? 'pt-16 pb-28' : ''}
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
            <CakeSection />
          ) : current.id === 'memories' ? (
            <PhotoGallery />
          ) : current.id === 'music' ? (
            <MusicDedication />
          ) : (
            <ScrapbookResponse onSent={setSent} />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Bottom step controls */}
      {step > 0 && !sent && (
        <footer className="fixed bottom-0 inset-x-0 z-40 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/95 to-transparent pt-8 pb-5">
          <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
            <button
              onClick={() => go(step - 1)}
              className="text-xs tracking-[0.25em] uppercase text-[#8B6E60] hover:text-[#2D2424] cursor-pointer"
            >
              ← Back
            </button>

            <div className="flex gap-2">
              {STEPS.slice(1).map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i + 1 === step ? 'w-6 bg-[#8B3A4D]' : i + 1 < step ? 'w-1.5 bg-[#8B3A4D]/60' : 'w-1.5 bg-[#D9CBB5]'
                  }`}
                />
              ))}
            </div>

            {'next' in current ? (
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => go(step + 1)}
                className="px-5 py-2.5 rounded-full bg-[#5B2333] text-[#FAF7F2] text-xs tracking-[0.15em] uppercase shadow-md cursor-pointer"
              >
                {current.next} →
              </motion.button>
            ) : (
              <span className="text-xs font-handwriting text-xl text-[#8B6E60]">last one ♥</span>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
