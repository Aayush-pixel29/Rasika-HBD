import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Cake, Gift, Mail, Clock, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/soundEffects';

interface HeroCountdownProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({ onNavigate }) => {
  // Configurable birthday date (defaults to current date for immediate celebration mode or allows custom toggle)
  const [isTodayCelebration, setIsTodayCelebration] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    // If not celebration mode, simulate live countdown
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerCelebrationBurst = () => {
    sound.playSparkleCelebration();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E8C5C8', '#D4AF37', '#FAF7F2', '#8B3A4D', '#F4D2D7'],
    });
  };

  return (
    <section id="home" className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
      {/* Soft aesthetic ambient circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#F4D2D7]/40 via-[#F7E7CE]/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wide uppercase mb-4">
          <span>Special Birthday Edition</span>
          <span aria-hidden="true">·</span>
          <span>College Memories & Beyond</span>
          <span aria-hidden="true">·</span>
          <span>From Aayush</span>
        </div>

        {/* Main Title with balanced typography */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2D2424] font-bold tracking-tight leading-tight sm:leading-none text-balance max-w-4xl mx-auto">
          Happy Birthday to My <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#8B3A4D] font-serif">Forever Favorite</span> College Friend
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#6B5E59] max-w-2xl mx-auto leading-relaxed font-sans">
          From canteen chai debates and exam-night panic to lifelong dreams — today is completely dedicated to celebrating the light you bring into this world.
        </p>

        {/* Countdown / Celebration Status Banner Card */}
        <div className="mt-8 max-w-2xl mx-auto parchment-card rounded-2xl border border-[#E8DFC8] p-6 sm:p-8 relative">
          {/* Aesthetic washi tape on top corners */}
          <div className="absolute -top-3 left-10 w-24 h-6 washi-tape washi-tape-pink -rotate-2 rounded-xs pointer-events-none opacity-80" />
          <div className="absolute -top-3 right-10 w-24 h-6 washi-tape washi-tape-gold rotate-3 rounded-xs pointer-events-none opacity-80" />

          <div className="flex items-center justify-between border-b border-[#E8DFC8]/70 pb-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#8B3A4D]">
              <Sparkles className="w-4 h-4 text-[#C48B9F]" />
              <span>{isTodayCelebration ? "IT'S OFFICIALLY HER SPECIAL DAY" : 'COUNTDOWN TO THE BIG MOMENT'}</span>
            </div>

            <button
              onClick={() => {
                setIsTodayCelebration(!isTodayCelebration);
                triggerCelebrationBurst();
              }}
              className="text-xs text-[#8B6E60] hover:text-[#5B2333] underline underline-offset-4 cursor-pointer transition-colors"
            >
              {isTodayCelebration ? 'View Live Countdown' : 'Celebrate Today 🎉'}
            </button>
          </div>

          {isTodayCelebration ? (
            <div className="text-center py-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F4D2D7]/50 text-[#8B3A4D] mb-3 animate-float-gentle">
                <Cake className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#5B2333]">
                The Celebration is Live! ✨
              </h2>
              <p className="text-sm text-[#7A6B63] mt-2 max-w-md mx-auto">
                Blow your candles, unlock secret time capsules throughout the day, and unpack memories made just for you.
              </p>

              <div className="mt-5 flex justify-center">
                <button
                  onClick={triggerCelebrationBurst}
                  className="px-5 py-2 text-xs sm:text-sm font-medium bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Throw Birthday Confetti!</span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
                <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E8DFC8]/60">
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-[#5B2333] tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="block text-[11px] sm:text-xs text-[#8B6E60] mt-1 uppercase tracking-wider">Days</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E8DFC8]/60">
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-[#5B2333] tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[11px] sm:text-xs text-[#8B6E60] mt-1 uppercase tracking-wider">Hours</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E8DFC8]/60">
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-[#5B2333] tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[11px] sm:text-xs text-[#8B6E60] mt-1 uppercase tracking-wider">Mins</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E8DFC8]/60">
                  <span className="font-mono text-2xl sm:text-4xl font-bold text-[#5B2333] tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[11px] sm:text-xs text-[#8B6E60] mt-1 uppercase tracking-wider">Secs</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Discovery Navigation Cards */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          <button
            onClick={() => onNavigate('cake')}
            className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F4D2D7]/50 flex items-center justify-center text-[#8B3A4D] mb-2 group-hover:scale-105 transition-transform">
              <Cake className="w-4 h-4" />
            </div>
            <span className="block text-sm font-semibold text-[#2D2424]">Blow Candles</span>
            <span className="block text-xs text-[#7A6B63] mt-0.5">Send wish to Aayush</span>
          </button>

          <button
            onClick={() => onNavigate('memories')}
            className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E6ECE7] flex items-center justify-center text-[#4A6753] mb-2 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="block text-sm font-semibold text-[#2D2424]">Memory Lane</span>
            <span className="block text-xs text-[#7A6B63] mt-0.5">Flip college polaroids</span>
          </button>

          <button
            onClick={() => onNavigate('capsules')}
            className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FAF0DC] flex items-center justify-center text-[#A67C37] mb-2 group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
            <span className="block text-sm font-semibold text-[#2D2424]">Time Capsules</span>
            <span className="block text-xs text-[#7A6B63] mt-0.5">Secrets throughout day</span>
          </button>

          <button
            onClick={() => onNavigate('scrapbook')}
            className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F4D2D7]/50 flex items-center justify-center text-[#8B3A4D] mb-2 group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <span className="block text-sm font-semibold text-[#2D2424]">Her Response</span>
            <span className="block text-xs text-[#7A6B63] mt-0.5">Mood & scrapbook reply</span>
          </button>
        </div>
      </div>
    </section>
  );
};
