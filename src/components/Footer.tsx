import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface FooterProps {
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#F2ECE4] border-t border-[#E8DFC8] py-12 text-[#6B5E59]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="font-serif text-lg font-bold text-[#5B2333]">
                To Anu, Always
              </span>
              <span className="text-[#C48B9F] text-xs">✦</span>
            </div>
            <p className="text-xs text-[#8B6E60] max-w-sm">
              Crafted with warm college memories and heartfelt wishes for Anuradha — until our overdue reunion!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#5B2333] transition-colors cursor-pointer"
            >
              Celebration
            </button>
            <button
              onClick={() => onNavigate('cake')}
              className="hover:text-[#5B2333] transition-colors cursor-pointer"
            >
              Blow Candles
            </button>
            <button
              onClick={() => onNavigate('memories')}
              className="hover:text-[#5B2333] transition-colors cursor-pointer"
            >
              Polaroids
            </button>
            <button
              onClick={() => onNavigate('letters')}
              className="hover:text-[#5B2333] transition-colors cursor-pointer"
            >
              Wax Letters
            </button>
            <button
              onClick={() => onNavigate('scrapbook')}
              className="hover:text-[#5B2333] transition-colors cursor-pointer"
            >
              Her Response
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#8B6E60]">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-[#8B3A4D] fill-[#8B3A4D]" />
            <span>for your happiest birthday yet</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
