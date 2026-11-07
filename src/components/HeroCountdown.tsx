import React from 'react';
import { Sparkles, Heart, Cake, Gift, Mail, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../services/soundEffects';

interface HeroCountdownProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroCountdown: React.FC<HeroCountdownProps> = ({ onNavigate }) => {
  const triggerCelebrationBurst = () => {
    sound.playSparkleCelebration();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E8C5C8', '#D4AF37', '#FAF7F2', '#8B3A4D', '#F4D2D7'],
    });
  };

  return (
    <section id="home" className="relative pt-8 pb-14 sm:pt-14 sm:pb-20 overflow-hidden">
      {/* Soft aesthetic ambient circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#F4D2D7]/40 via-[#F7E7CE]/30 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle unboxed metadata kicker */}
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wide uppercase mb-4">
          <span>Special Birthday Edition</span>
          <span aria-hidden="true">·</span>
          <span>For Anu (Anuradha)</span>
          <span aria-hidden="true">·</span>
          <span>From Aayush</span>
        </div>

        {/* Main Title with balanced typography */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#2D2424] font-bold tracking-tight leading-tight sm:leading-none text-balance max-w-4xl mx-auto">
          Happy Birthday, <span className="italic font-normal text-[#8B3A4D] font-serif">Anu!</span> <br className="hidden sm:inline" />
          To My Forever Favorite <span className="underline decoration-[#E8C5C8] underline-offset-8">Anuradha</span> ✨
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#6B5E59] max-w-2xl mx-auto leading-relaxed font-sans">
          From endless college conversations and between-lecture laughs to life after graduation — we might not have met in person since college ended, but the bond and memories remain as special as ever.
        </p>

        {/* Confetti Fanfare Action */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={triggerCelebrationBurst}
            className="px-6 py-2.5 text-xs sm:text-sm font-medium bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Throw Birthday Confetti for Anu! 🌸</span>
          </button>
        </div>

        {/* Quick Discovery Navigation Cards */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
          <button
            onClick={() => onNavigate('cake')}
            className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F4D2D7]/50 flex items-center justify-center text-[#8B3A4D] mb-2 group-hover:scale-105 transition-transform">
              <Cake className="w-4 h-4" />
            </div>
            <span className="block text-sm font-semibold text-[#2D2424]">Blow Candles</span>
            <span className="block text-xs text-[#7A6B63] mt-0.5">Make a birthday wish</span>
          </button>

          <button
            onClick={() => onNavigate('memories')}
            className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E6ECE7] flex items-center justify-center text-[#4A6753] mb-2 group-hover:scale-105 transition-transform">
              <Camera className="w-4 h-4" />
            </div>
            <span className="block text-sm font-semibold text-[#2D2424]">10 Polaroids</span>
            <span className="block text-xs text-[#7A6B63] mt-0.5">Flip memories & notes</span>
          </button>

          <button
            onClick={() => onNavigate('letters')}
            className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FAF0DC] flex items-center justify-center text-[#A67C37] mb-2 group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4" />
            </div>
            <span className="block text-sm font-semibold text-[#2D2424]">Sealed Letters</span>
            <span className="block text-xs text-[#7A6B63] mt-0.5">Words that stay forever</span>
          </button>

          <button
            onClick={() => onNavigate('scrapbook')}
            className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E8DFC8] text-left transition-all hover:shadow-xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F4D2D7]/50 flex items-center justify-center text-[#8B3A4D] mb-2 group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <span className="block text-sm font-semibold text-[#2D2424]">Her Response</span>
            <span className="block text-xs text-[#7A6B63] mt-0.5">Anu's reply canvas</span>
          </button>
        </div>
      </div>
    </section>
  );
};
