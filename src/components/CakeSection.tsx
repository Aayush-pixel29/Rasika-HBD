import React, { useState, useEffect } from 'react';
import { Sparkles, Wind, Send, CheckCircle2, Heart, Mic, MicOff } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/soundEffects';
import { BirthdayWish } from '../types';

export const CakeSection: React.FC = () => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishInput, setWishInput] = useState('');
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [isSendingWish, setIsSendingWish] = useState(false);
  const [wishDelivered, setWishDelivered] = useState(false);
  const [savedWishes, setSavedWishes] = useState<BirthdayWish[]>(() => {
    try {
      const stored = localStorage.getItem('birthday_wishes');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isListeningMic, setIsListeningMic] = useState(false);

  // Microphone blow detection
  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let micStream: MediaStream | null = null;
    let animationFrameId: number;

    if (isListeningMic && !candlesBlown) {
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
          // Look for low frequency rushing air sound
          let lowFreqSum = 0;
          for (let i = 0; i < 15; i++) {
            lowFreqSum += dataArray[i];
          }
          const lowFreqAverage = lowFreqSum / 15;

          if (lowFreqAverage > 130) {
            handleBlowCandles();
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
  }, [isListeningMic, candlesBlown]);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    sound.playCandleBlow();
    setCandlesBlown(true);
    setIsListeningMic(false);

    // Confetti fanfare
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#E8C5C8', '#F7E7CE', '#C48B9F', '#8B3A4D', '#FFF1F2'],
    });

    setTimeout(() => {
      sound.playSparkleCelebration();
      setIsWishModalOpen(true);
    }, 1200);
  };

  const handleRelightCandles = () => {
    sound.playChime(600);
    setCandlesBlown(false);
    setWishDelivered(false);
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    sound.playPaperRustle();
    setIsSendingWish(true);

    setTimeout(() => {
      const newWish: BirthdayWish = {
        id: 'wish-' + Date.now(),
        wishText: wishInput.trim(),
        timestamp: Date.now(),
        blownAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        delivered: true,
      };

      const updated = [newWish, ...savedWishes];
      setSavedWishes(updated);
      try {
        localStorage.setItem('birthday_wishes', JSON.stringify(updated));
      } catch {
        // ignore
      }

      setIsSendingWish(false);
      setIsWishModalOpen(false);
      setWishDelivered(true);
      setWishInput('');

      sound.playSparkleCelebration();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#E8C5C8', '#8B3A4D', '#FFF', '#9CAF88'],
      });
    }, 1800);
  };

  return (
    <section id="cake" className="py-16 sm:py-24 bg-[#FCF9F3]/60 border-y border-[#E8DFC8]/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Unboxed category metadata */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wider uppercase mb-3">
          <span>The Birthday Tradition</span>
          <span aria-hidden="true">·</span>
          <span>Make a Wish</span>
          <span aria-hidden="true">·</span>
          <span>Delivered to Aayush</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2424] text-balance">
          Blow Out Your Candles & Make a Wish
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[#6B5E59] max-w-xl mx-auto">
          Close your eyes, think of the happiest thing you want for this year, and blow softly. Your wish will be packaged into a flying letter and delivered straight to Aayush.
        </p>

        {/* Realistic Layered Birthday Cake Illustration */}
        <div className="mt-12 relative flex flex-col items-center justify-center min-h-[320px]">
          {/* Wish delivery flight animation if just sent */}
          {wishDelivered && (
            <div className="mb-6 p-4 rounded-xl bg-[#E6ECE7] border border-[#B8CEBC] text-[#2C4A34] text-xs sm:text-sm font-medium animate-float-gentle flex items-center gap-2 max-w-md mx-auto shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[#4A6753] shrink-0" />
              <span>Your wish has been whispered and flown straight to Aayush's heart! 💌</span>
            </div>
          )}

          {/* Candle Flames & Smoke */}
          <div className="flex items-end justify-center gap-6 sm:gap-10 mb-[-4px] z-10">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Flame or smoke */}
                {!candlesBlown ? (
                  <div
                    className="w-4 h-6 sm:w-5 sm:h-7 bg-gradient-to-t from-[#FF7A00] via-[#FFAE00] to-[#FFF6A3] rounded-full animate-flame origin-bottom cursor-pointer"
                    title="Click or blow to extinguish"
                    onClick={handleBlowCandles}
                  />
                ) : (
                  <div className="h-6 flex flex-col items-center justify-end">
                    <span className="w-1.5 h-4 bg-[#7A736E]/40 rounded-full blur-[1px] animate-pulse" />
                    <span className="text-[10px] text-[#A8A29E] font-handwriting">smoke...</span>
                  </div>
                )}
                {/* Candle Wick */}
                <div className="w-0.5 h-2 bg-[#44403C]" />
                {/* Candle Stick */}
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
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="w-48 sm:w-60 h-16 sm:h-20 bg-[#FFF5EB] rounded-t-2xl border-t-4 border-x border-[#F4D2D7] relative shadow-inner flex flex-col items-center">
            {/* Frosting drips */}
            <div className="w-full flex justify-around px-2 -mt-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-3 bg-[#F4D2D7] rounded-b-full shadow-xs" />
              ))}
            </div>
            {/* Strawberries / Gold pearls decorative */}
            <div className="mt-auto pb-2 flex gap-4 text-[#8B3A4D] text-xs">
              <span>🍓</span>
              <span>✨</span>
              <span>🍓</span>
              <span>✨</span>
              <span>🍓</span>
            </div>
          </div>

          {/* Cake Bottom Tier */}
          <div className="w-64 sm:w-80 h-20 sm:h-24 bg-[#FAF0DC] rounded-t-xl border-t-4 border-x border-[#E8DFC8] relative shadow-md flex flex-col items-center justify-between p-3">
            <div className="w-full flex justify-around px-2 -mt-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-[#F4D2D7] rounded-b-full" />
              ))}
            </div>
            <p className="font-handwriting text-lg sm:text-xl text-[#5B2333] font-bold tracking-wider">
              Happy Birthday, Old Friend
            </p>
            <div className="w-full h-1.5 bg-[#8B3A4D]/20 rounded-full" />
          </div>

          {/* Cake Stand */}
          <div className="w-72 sm:w-96 h-4 bg-[#E0D5C1] rounded-full shadow-sm" />
          <div className="w-24 sm:w-32 h-6 bg-[#C9BC9F] rounded-b-lg shadow-md" />
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {!candlesBlown ? (
            <>
              <button
                onClick={handleBlowCandles}
                className="px-6 py-2.5 bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <Wind className="w-4 h-4" />
                <span>Tap to Blow Candles</span>
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
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsWishModalOpen(true)}
                className="px-5 py-2.5 bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white rounded-full font-medium text-sm transition-all shadow-sm cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Make Another Wish</span>
              </button>

              <button
                onClick={handleRelightCandles}
                className="px-4 py-2.5 rounded-full text-xs font-medium bg-white border border-[#E8DFC8] text-[#6B5E59] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                Relight Candles 🔥
              </button>
            </div>
          )}
        </div>

        {/* Saved Wishes Drawer / List */}
        {savedWishes.length > 0 && (
          <div className="mt-12 text-left max-w-lg mx-auto bg-white/70 rounded-xl p-5 border border-[#E8DFC8]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-[#8B3A4D] uppercase tracking-wider">
                Delivered Wishes ({savedWishes.length})
              </span>
              <span className="text-xs text-[#8B6E60]">Saved to Heart</span>
            </div>
            <div className="space-y-2">
              {savedWishes.map((w) => (
                <div key={w.id} className="text-xs text-[#5B473F] bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFC8]/50 flex items-start justify-between gap-3">
                  <span className="italic font-handwriting text-base text-[#2D2424]">"{w.wishText}"</span>
                  <span className="text-[10px] text-[#A8988F] shrink-0 font-mono">{w.blownAt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Make a Wish Modal Dialog */}
      {isWishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-[#FCF9F3] rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFC8] shadow-2xl relative animate-float-gentle">
            {/* Washi tape aesthetic */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape washi-tape-pink rounded-xs pointer-events-none opacity-90" />

            {isSendingWish ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-[#8B3A4D] animate-bounce">
                  <Send className="w-16 h-16" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#5B2333]">
                  Sealing & Sending Your Wish...
                </h3>
                <p className="text-xs text-[#7A6B63] mt-2">
                  Stamping with golden wax and whispering it straight to Aayush's heart.
                </p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex p-2 rounded-full bg-[#F4D2D7]/50 text-[#8B3A4D] mb-2">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#2D2424]">
                    Whisper Your Secret Wish
                  </h3>
                  <p className="text-xs text-[#7A6B63] mt-1">
                    What does your heart desire this year? Peace, love, success, endless cafe hops?
                  </p>
                </div>

                <form onSubmit={handleSendWish}>
                  <textarea
                    rows={4}
                    value={wishInput}
                    onChange={(e) => setWishInput(e.target.value)}
                    placeholder="Write your secret birthday wish here... (e.g. May this year be filled with adventures, laughter that leaves us breathless, and peaceful quiet mornings)"
                    className="w-full p-4 rounded-xl border border-[#E8DFC8] bg-[#FAF7F2] text-sm text-[#2D2424] placeholder-[#A8988F] focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 resize-none font-sans"
                    required
                    autoFocus
                  />

                  <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsWishModalOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-[#6B5E59] hover:bg-[#F2ECE4] rounded-lg cursor-pointer"
                    >
                      Keep Secret for Now
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs sm:text-sm font-medium bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Seal & Send Wish to Aayush 💌</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
