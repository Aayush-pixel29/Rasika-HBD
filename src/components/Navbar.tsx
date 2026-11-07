import React, { useState } from 'react';
import { Music, Volume2, VolumeX, Sparkles, Heart, Menu, X } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenMusicDrawer: () => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenMusicDrawer,
  isMusicPlaying,
  setIsMusicPlaying,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Celebration' },
    { id: 'cake', label: 'Blow Candles' },
    { id: 'memories', label: "Anu's Photos" },
    { id: 'letters', label: 'Letters to Anuradha' },
    { id: 'gifts', label: 'Surprises & Gifts' },
    { id: 'scrapbook', label: 'Reply to Aayush' },
  ];

  const handleToggleMusic = () => {
    const playing = sound.toggleBgm((state) => setIsMusicPlaying(state));
    setIsMusicPlaying(playing);
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#5B2333] transition-colors group-hover:text-[#8B3A4D]">
              To Anu, Always
            </span>
            <span className="text-[#C48B9F] text-sm animate-pulse">✦</span>
          </a>

          {/* Zone 2: Single-line Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#6B5E59]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#5B2333] font-semibold'
                      : 'hover:text-[#2D2424]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B3A4D] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Music ambient control button */}
            {/* Spotify / Audio Player Trigger */}
            <button
              onClick={onOpenMusicDrawer}
              title="Open Anuradha's Spotify Mixtape"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1DB954]/10 hover:bg-[#1DB954]/20 text-[#15803d] border border-[#1DB954]/40 transition-all cursor-pointer whitespace-nowrap shadow-xs"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Songs for Anu 🎵</span>
            </button>

            {/* Quick response CTA */}
            <button
              onClick={() => handleNavClick('scrapbook')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#5B2333] rounded-full hover:bg-[#481B28] transition-all shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Reply to Aayush</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-[#6B5E59] hover:bg-[#F2ECE4] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFC8] bg-[#FAF7F2] px-4 pt-3 pb-5 space-y-1 shadow-md">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2 text-sm rounded-lg transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#E8C5C8]/50 text-[#5B2333] font-semibold'
                    : 'text-[#6B5E59] hover:bg-[#F2ECE4]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#E8DFC8]/60 flex items-center justify-between">
            <button
              onClick={handleToggleMusic}
              className="flex items-center gap-2 text-xs text-[#5B2333] font-medium"
            >
              {isMusicPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              {isMusicPlaying ? 'Melody Playing' : 'Ambient Music Muted'}
            </button>
            <button
              onClick={() => handleNavClick('scrapbook')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-[#5B2333] rounded-full"
            >
              <Heart className="w-3 h-3 fill-current" />
              Reply to Aayush
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
