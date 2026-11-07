import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Send, Coffee } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface HeartfeltLetterStepProps {
  onContinue: () => void;
}

export const HeartfeltLetterStep: React.FC<HeartfeltLetterStepProps> = ({ onContinue }) => {
  return (
    <section className="min-h-[calc(100vh-6rem)] py-8 sm:py-14 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full mx-auto">
        {/* Header Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B3A4D]/10 text-[#8B3A4D] text-[11px] font-semibold tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Chapter IV · A Letter for Anu</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-[#2D2424] leading-[0.95]">
            From Class 11 <span className="italic text-[#8B3A4D]">to Today</span>
          </h2>
          <p className="font-handwriting text-2xl text-[#8B6E60] mt-2">
            a few words straight from the heart, no filters.
          </p>
        </motion.div>

        {/* Vintage Parchment Letter Container */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-[#FFFDF8] parchment-card rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 shadow-xl overflow-hidden"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 h-6 washi-tape washi-tape-pink rounded-xs opacity-90 shadow-2xs pointer-events-none" />

          {/* Letterhead */}
          <div className="flex items-center justify-between border-b border-[#E8DFC8]/70 pb-4 mb-6">
            <div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#8B6E60] font-mono">
                CONFIDENTIAL & UNFILTERED
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#5B2333]">
                Dearest Anu (Anuradha),
              </p>
            </div>
            {/* Wax stamp badge */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8B3A4D] to-[#4A1824] shadow-md flex items-center justify-center text-white border-2 border-[#D4AF37]/60">
              <span className="font-display italic text-sm sm:text-base font-bold">A</span>
            </div>
          </div>

          {/* Letter Body - Emotionally honest, mature, respectful */}
          <div className="space-y-4 font-serif text-[14.5px] sm:text-base text-[#2D2424] leading-[1.75] sm:leading-[1.8] text-justify sm:text-left">
            <p>
              When I look back at where our story started — back in <span className="font-semibold text-[#8B3A4D]">Class 11</span> — what I remember most isn't the classes, the textbooks, or the rush of school days. It was how completely effortless it was to talk to you. We could sit down and talk for hours about anything under the sun, and time would simply disappear.
            </p>

            <p>
              I want to be completely honest with you today: during that phase of my life, <span className="font-semibold text-[#8B3A4D]">I really, genuinely liked you</span>. You had this gentle radiance, this kindness, and a warmth that stayed with me long after our talks ended. But back then, I was young and hesitant — I never found the courage to say it out loud to you.
            </p>

            <p>
              Years went by, and around 3 to 4 years ago, when I did try to reach out or express what had been in my heart, I know things didn't go the way they should have. Maybe I handled it awkwardly, or maybe my words came across the wrong way. If I ever made you uncomfortable, hurt you, or did anything wrong back then, <span className="font-semibold text-[#8B3A4D]">please forgive me from the bottom of my heart</span>. I have always respected you too much to ever want you to hold any awkwardness or bad memory of me.
            </p>

            <p>
              You have your own life, your own dreams, and your own journey ahead — and I truly celebrate and respect that. We are good friends now, and in my eyes, you will always be that same graceful, radiant, and wonderful girl I was so lucky to know.
            </p>

            <p>
              On your birthday today, my only prayer is that <span className="font-semibold text-[#8B3A4D]">Bappa blesses you with endless happiness, health, and peace</span>. May you receive every single blessing and success you truly deserve in this life.
            </p>

            <p className="font-handwriting text-2xl sm:text-3xl text-[#5B2333] pt-2">
              And if destiny ever finds a way to cross our paths again, I genuinely hope we meet soon — to sit down over a cup of chai, laugh like old times, and catch up without any hesitations.
            </p>
          </div>

          {/* Letter Signature */}
          <div className="mt-8 pt-5 border-t border-[#E8DFC8]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="font-handwriting text-2xl text-[#8B3A4D]">Yours always as a friend,</p>
              <p className="font-serif text-sm font-bold text-[#2D2424]">Aayush</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#8B6E60] font-sans">
              <Coffee className="w-3.5 h-3.5 text-[#8B3A4D]" />
              <span>Chai on me whenever we meet</span>
            </div>
          </div>

          {/* Gentle Suggestion Box for Her Reply */}
          <div className="mt-6 p-4 rounded-xl bg-[#FAF0DC]/60 border border-[#E9D9A5] text-xs text-[#5B473F] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#8B3A4D] shrink-0" />
              <span>
                If there's anything on your mind or heart after reading this, the next page is your private scrapbook response canvas — write whatever you feel!
              </span>
            </div>
            <button
              onClick={() => {
                sound.playChime(640);
                onContinue();
              }}
              className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white text-xs font-semibold whitespace-nowrap shadow-xs cursor-pointer transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <span>Write Your Reply →</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
