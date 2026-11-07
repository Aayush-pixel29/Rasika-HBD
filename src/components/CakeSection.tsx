import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind, Mic, MicOff, Heart, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/soundEffects';

interface CakeSectionProps {
  onNext?: () => void;
}

type CakeStatus = 'ready' | 'blown' | 'served';

export const CakeSection: React.FC<CakeSectionProps> = ({ onNext }) => {
  const [status, setStatus] = useState<CakeStatus>('ready');
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [wishInput, setWishInput] = useState('');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  // Microphone blow detection
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let micStream: MediaStream | null = null;
    let animationFrameId: number;

    if (isListeningMic && status === 'ready') {
      navigator.mediaDevices?.getUserMedia({ audio: true }).then((stream) => {
        micStream = stream;
        const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContext = new AudioCtxClass();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const checkAudio = () => {
          if (!analyser) return;
          analyser.getByteFrequencyData(dataArray);
          let lowFreqSum = 0;
          for (let i = 0; i < 15; i++) {
            lowFreqSum += dataArray[i];
          }
          const lowFreqAverage = lowFreqSum / 15;

          if (lowFreqAverage > 130) {
            handleAttemptBlow();
            setIsListeningMic(false);
            return;
          }
          animationFrameId = requestAnimationFrame(checkAudio);
        };
        checkAudio();
      }).catch(() => {
        setIsListeningMic(false);
      });
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (micStream) micStream.getTracks().forEach((track) => track.stop());
      if (audioContext && audioContext.state !== 'closed') audioContext.close();
    };
  }, [isListeningMic, status]);

  // When user attempts to blow the candles -> Pop out the Make a Wish modal!
  const handleAttemptBlow = () => {
    if (status !== 'ready') return;
    sound.playChime(600);
    setIsWishModalOpen(true);
  };

  // When she enters her wish and confirms -> Submit secretly to email and blow out the candles!
  const handleWishAndBlow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    sound.playPaperRustle();
    setIsSubmittingWish(true);

    const blownTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const wishToSend = wishInput.trim();

    // Send wish 100% privately to Aayush's email via Formspree
    try {
      await fetch('https://formspree.io/f/xljjkndy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sender: 'Anu (Anuradha)',
          recipient: 'Aayush',
          secretWish: wishToSend,
          blownAt: blownTime,
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.warn('Wish dispatched:', err);
    }

    setIsSubmittingWish(false);
    setIsWishModalOpen(false);
    setWishInput(''); // Cleared immediately, never shown on page
    setStatus('blown');

    sound.playCandleBlow();

    // Celebratory confetti shower
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.62 },
      colors: ['#E8C5C8', '#F7E7CE', '#C48B9F', '#8B3A4D', '#FFF1F2'],
    });

    setTimeout(() => {
      sound.playSparkleCelebration();
    }, 800);
  };

  // Step 2: Animated cake slicing & serving onto plate
  const handleCutSlice = () => {
    if (isCutting || status === 'served') return;
    setIsCutting(true);
    sound.playCakeSlice();

    setTimeout(() => {
      sound.playSparkleCelebration();
      setIsCutting(false);
      setStatus('served');

      confetti({
        particleCount: 100,
        spread: 85,
        origin: { y: 0.62 },
        colors: ['#F4D2D7', '#D4AF37', '#8B3A4D', '#FFF', '#9CAF88'],
      });
    }, 2400);
  };

  return (
    <section id="cake" className="py-12 sm:py-20 bg-[#FCF9F3]/90 border-y border-[#E8DFC8]/70 relative overflow-hidden">
      {/* Decorative ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#F4D2D7]/25 via-[#FAF0DC]/45 to-[#FCE181]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Category Header */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#8B6E60] tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#8B3A4D]" />
          <span>Chapter I · The Birthday Tradition</span>
          <Sparkles className="w-3.5 h-3.5 text-[#8B3A4D]" />
        </div>

        {/* Dynamic Title */}
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2D2424] text-balance">
          {status === 'ready' && 'Blow Out Your Candles, Anu! 🎂'}
          {status === 'blown' && 'Your Wish has Flown to the Stars! ✨'}
          {status === 'served' && 'The First Slice is for Anuradha 🍰'}
        </h2>

        <p className="mt-2 text-sm sm:text-base text-[#6B5E59] max-w-xl mx-auto">
          {status === 'ready' && 'Tap the glowing candles to make your secret birthday wish, take a deep breath, and blow!'}
          {status === 'blown' && 'Your wish has taken flight! Now cut your celebratory birthday cake slice.'}
          {status === 'served' && 'Sweet strawberry cream layers made just for you! May this new year bring endless happiness.'}
        </p>

        {/* ============================================================== */}
        {/* THE LAYERED BIRTHDAY CAKE WITH GLOWING CANDLES */}
        {/* ============================================================== */}
        <div className="mt-10 relative flex flex-col items-center justify-center min-h-[340px]">
          
          {/* Candle Flames & Smoke */}
          <div className="flex items-end justify-center gap-6 sm:gap-10 mb-[-4px] z-20">
            {[0, 1, 2].map((idx) => {
              const areFlamesActive = status === 'ready';
              return (
                <div key={idx} className="flex flex-col items-center">
                  {areFlamesActive ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 0.95, 1.1, 1],
                        rotate: [0, -2, 2, -1, 0],
                      }}
                      transition={{ duration: 1.5 + idx * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-4 h-6 sm:w-5 sm:h-7 bg-gradient-to-t from-[#FF7A00] via-[#FFAE00] to-[#FFF6A3] rounded-full shadow-[0_0_15px_#FFAE00] origin-bottom cursor-pointer hover:scale-110 transition-transform"
                      title="Tap to make a wish and blow out"
                      onClick={handleAttemptBlow}
                    />
                  ) : (
                    <div className="h-6 flex flex-col items-center justify-end">
                      <span className="w-1.5 h-4 bg-[#7A736E]/40 rounded-full blur-[1px] animate-pulse" />
                      <span className="text-[10px] text-[#A8A29E] font-handwriting">smoke...</span>
                    </div>
                  )}

                  {/* Candle Wick */}
                  <div className="w-0.5 h-2 bg-[#44403C]" />
                  {/* Candle Body */}
                  <div
                    className={`w-3.5 sm:w-4 h-12 sm:h-14 rounded-t-xs border border-white/60 shadow-xs ${
                      idx === 0
                        ? 'bg-gradient-to-b from-[#F7B2BD] to-[#F18B99]'
                        : idx === 1
                        ? 'bg-gradient-to-b from-[#FCE181] to-[#E9C46A]'
                        : 'bg-gradient-to-b from-[#BEE3DB] to-[#89B0AE]'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* CAKE CONTAINER */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Cake Top Tier */}
            <div className="w-48 sm:w-60 h-16 sm:h-20 bg-[#FFF5EB] rounded-t-2xl border-t-4 border-x border-[#F4D2D7] relative shadow-inner flex flex-col items-center overflow-visible">
              
              {/* Sliced Wedge Gap (visible when sliced) */}
              {(isCutting || status === 'served') && (
                <div className="absolute right-8 top-0 w-8 h-full bg-[#E5D7BF] border-x border-[#D8C7AA] shadow-inner opacity-80" />
              )}

              {/* Frosting Drips */}
              <div className="w-full flex justify-around px-2 -mt-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-3 bg-[#F4D2D7] rounded-b-full shadow-xs" />
                ))}
              </div>

              {/* Fresh Strawberries & Pearls */}
              <div className="mt-auto pb-2 flex gap-4 text-[#8B3A4D] text-xs">
                <span>🍓</span>
                <span>✨</span>
                <span>🍓</span>
                <span>✨</span>
                <span>🍓</span>
              </div>
            </div>

            {/* Cake Bottom Tier */}
            <div className="w-64 sm:w-80 h-20 sm:h-24 bg-[#FAF0DC] rounded-t-xl border-t-4 border-x border-[#E8DFC8] relative shadow-md flex flex-col items-center justify-between p-3 overflow-visible">
              
              {/* Sliced Wedge Gap in bottom tier */}
              {(isCutting || status === 'served') && (
                <div className="absolute right-10 top-0 w-10 h-full bg-[#DFCBB0] border-x border-[#CDB89B] shadow-inner opacity-85" />
              )}

              <div className="w-full flex justify-around px-2 -mt-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-[#F4D2D7] rounded-b-full" />
                ))}
              </div>

              <p className="font-handwriting text-lg sm:text-2xl text-[#5B2333] font-bold tracking-wider drop-shadow-xs">
                Happy Birthday, Anuradha ✨
              </p>
              
              <div className="w-full h-1.5 bg-[#8B3A4D]/20 rounded-full" />
            </div>

            {/* Cake Stand Base */}
            <div className="w-72 sm:w-96 h-4 bg-[#E0D5C1] rounded-full shadow-sm" />
            <div className="w-24 sm:w-32 h-6 bg-[#C9BC9F] rounded-b-lg shadow-md" />
          </div>

          {/* ============================================================== */}
          {/* ANIMATED HAND SLICING CAKE & SERVING ONTO PORCELAIN PLATE */}
          {/* ============================================================== */}
          <AnimatePresence>
            {isCutting && (
              <motion.div
                className="absolute z-40 pointer-events-none"
                initial={{ opacity: 0, x: 150, y: -90, rotate: 28 }}
                animate={{
                  opacity: [0, 1, 1, 1, 0],
                  x: [150, 50, 35, -100, -130],
                  y: [-90, -15, -55, 55, 75],
                  rotate: [28, 6, -8, -12, 0],
                }}
                transition={{
                  duration: 2.3,
                  times: [0, 0.25, 0.55, 0.85, 1],
                  ease: 'easeInOut',
                }}
              >
                {/* Hand holding golden cake server with strawberry slice */}
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-16 bg-gradient-to-b from-[#F4D2D7] to-[#FFF0F3] rounded-t-full border border-[#E8DFC8] shadow-md -mb-2" />
                  
                  <div className="w-7 h-8 bg-[#FFDFC4] rounded-full shadow-sm relative z-10 flex items-center justify-center">
                    <span className="w-2 h-4 bg-[#D4AF37] rounded-full rotate-45" />
                  </div>

                  <div className="relative">
                    <div 
                      className="w-14 h-24 bg-gradient-to-b from-[#FFD700] via-[#D4AF37] to-[#AA820A] shadow-lg rounded-b-xs"
                      style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                    />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#FFF5EB] border border-[#F4D2D7] rounded-xs shadow-sm flex flex-col items-center justify-center text-xs">
                      <span>🍓</span>
                      <div className="w-full h-1 bg-[#F4D2D7]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ============================================================== */}
          {/* PORCELAIN SERVING PLATE */}
          {/* ============================================================== */}
          <div className="mt-4 sm:mt-6 relative flex flex-col items-center">
            <div className="w-48 sm:w-56 h-14 bg-gradient-to-b from-[#FFFFFF] to-[#F5EFE6] rounded-[50%] border-4 border-[#D4AF37]/50 shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex items-center justify-center relative">
              <div className="w-40 sm:w-46 h-10 rounded-[50%] border border-[#E8DFC8] bg-white flex items-center justify-center">
                
                {status === 'served' ? (
                  <motion.div
                    initial={{ scale: 0, y: -20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ type: 'spring', damping: 14 }}
                    className="relative flex flex-col items-center -mt-6 cursor-pointer group"
                    onClick={() => sound.playSparkleCelebration()}
                  >
                    <div className="relative">
                      <span className="text-2xl sm:text-3xl block filter drop-shadow-md animate-bounce">
                        🍰
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#8B3A4D] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-[#F4D2D7] shadow-xs">
                      Anu's Slice 🍓✨
                    </span>
                  </motion.div>
                ) : (
                  <span className="text-[10px] text-[#A8988F] font-serif italic tracking-wider">
                    {status === 'blown' ? 'Waiting for your slice...' : 'Royal Porcelain Plate'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CONTROLS (Blow / Cut Slice / Open Album) */}
        {/* ============================================================== */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {status === 'ready' && (
            <>
              <button
                onClick={handleAttemptBlow}
                className="px-7 py-3 bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white rounded-full font-bold text-sm transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <Wind className="w-4 h-4 text-[#FFD166]" />
                <span>Tap to Blow Out Candles 🌬️</span>
              </button>

              <button
                onClick={() => setIsListeningMic(!isListeningMic)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium border transition-colors cursor-pointer flex items-center gap-2 ${
                  isListeningMic
                    ? 'bg-[#E8C5C8] border-[#8B3A4D] text-[#5B2333] animate-pulse'
                    : 'bg-white border-[#E8DFC8] text-[#6B5E59] hover:bg-[#FAF7F2]'
                }`}
              >
                {isListeningMic ? (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Blow into microphone now...</span>
                  </>
                ) : (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Enable Mic Blow Detection</span>
                  </>
                )}
              </button>
            </>
          )}

          {status === 'blown' && (
            <button
              onClick={handleCutSlice}
              disabled={isCutting}
              className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] via-[#F3C64F] to-[#D4AF37] hover:brightness-105 text-[#2D2424] rounded-full font-bold text-sm transition-all shadow-lg hover:scale-105 cursor-pointer flex items-center gap-2 border border-[#B38F24]"
            >
              <span>{isCutting ? 'Hand Slicing Cake... 🍰' : 'Cut a Slice for Anu 🍰'}</span>
            </button>
          )}

          {status === 'served' && onNext && (
            <button
              onClick={onNext}
              className="px-8 py-3.5 bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white rounded-full font-bold text-sm transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2 border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-[#FFD166]" />
              <span>Open Anuradha's Sky Keepsake Album →</span>
            </button>
          )}
        </div>

        {/* Served Slice Celebration Card */}
        {status === 'served' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-md mx-auto p-5 rounded-2xl bg-[#FFFDF8] border border-[#E8DFC8] shadow-md text-center relative"
          >
            <span className="text-3xl block mb-1">🍰🍓✨</span>
            <h4 className="font-serif text-lg font-bold text-[#5B2333]">
              The First Slice is Served for You, Anuradha!
            </h4>
            <p className="text-xs text-[#6B5E59] mt-1 leading-relaxed">
              Sweet strawberry layers, fluffy vanilla cream, and a heart full of warm wishes. May your life taste as sweet and beautiful as this slice!
            </p>
          </motion.div>
        )}
      </div>

      {/* ============================================================== */}
      {/* POP-OUT MODAL: MAKE A WISH FIRST! (Appears when blowing candles) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isWishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#FCF9F3] rounded-3xl max-w-md w-full p-6 sm:p-8 border-2 border-[#D4AF37]/50 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsWishModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full text-[#8B6E60] hover:text-[#2D2424] hover:bg-black/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-4">
                <span className="text-4xl block mb-2">🎂✨</span>
                <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                  Make a Wish First!
                </h3>
                <p className="text-xs text-[#7A6B63] mt-1">
                  Before blowing out your candles, close your eyes and write what your heart truly desires for this year.
                </p>
              </div>

              <form onSubmit={handleWishAndBlow} className="space-y-4">
                <textarea
                  rows={3}
                  required
                  value={wishInput}
                  onChange={(e) => setWishInput(e.target.value)}
                  placeholder="Type your secret birthday wish here... (e.g. Happiness, peace, college reunions, success & endless laughs ✨)"
                  className="w-full p-3.5 rounded-xl border border-[#E8DFC8] bg-white text-xs sm:text-sm text-[#2D2424] placeholder-[#A8988F] focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 resize-none font-sans"
                  autoFocus
                />

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmittingWish || !wishInput.trim()}
                    className="w-full py-3 rounded-full bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-102"
                  >
                    <Wind className="w-4 h-4 text-[#FFD166]" />
                    <span>{isSubmittingWish ? 'Sealing Wish...' : 'Seal Wish & Blow Out Candles! 🌬️'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
