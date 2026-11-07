import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroCountdown } from './components/HeroCountdown';
import { CakeSection } from './components/CakeSection';
import { PhotoGallery } from './components/PhotoGallery';
import { LettersSection } from './components/LettersSection';
import { SecretCapsules } from './components/SecretCapsules';
import { VirtualGifts } from './components/VirtualGifts';
import { ScrapbookResponse } from './components/ScrapbookResponse';
import { GuestbookSection } from './components/GuestbookSection';
import { AudioPlayerFloating } from './components/AudioPlayerFloating';
import { Footer } from './components/Footer';
import { Cake, Camera, Mail, Clock, Gift, Heart, Sparkles } from 'lucide-react';
import { sound } from './services/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Sync music state
  useEffect(() => {
    setIsMusicPlaying(sound.getIsPlaying());
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveTab(sectionId);
    sound.playChime(520);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2424] font-sans selection:bg-[#E8C5C8] selection:text-[#5B2333] relative pb-20 lg:pb-0">
      {/* Aesthetic Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenMusicDrawer={() => setIsMusicModalOpen(true)}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      <main>
        {/* Hero & Countdown Banner */}
        <HeroCountdown onNavigate={handleNavigate} />

        {/* Interactive Cake & Wish Flight Section */}
        <CakeSection />

        {/* Polaroid Memory Scrapbook Lane */}
        <PhotoGallery />

        {/* Sealed Vintage Letters */}
        <LettersSection />

        {/* Secret Messages Time Capsule (Unlocks throughout the day) */}
        <SecretCapsules />

        {/* Virtual Gift Unwrapping Station */}
        <VirtualGifts />

        {/* Mood Tracker & Scrapbook Response (Her Reply Canvas) */}
        <ScrapbookResponse />

        {/* Personal Digital Guestbook Wishing Board */}
        <GuestbookSection />
      </main>

      {/* Floating Ambient Music Modal */}
      <AudioPlayerFloating
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      {/* Clean Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Floating Quick Dock (stays under 15% mobile viewport cap) */}
      <div className="lg:hidden fixed bottom-3 left-4 right-4 z-40 bg-[#FAF7F2]/95 backdrop-blur-md rounded-2xl border border-[#E8DFC8] shadow-lg p-1.5 flex items-center justify-around text-xs">
        <button
          onClick={() => handleNavigate('cake')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            activeTab === 'cake' ? 'text-[#8B3A4D] font-bold bg-[#E8C5C8]/40' : 'text-[#6B5E59]'
          }`}
        >
          <Cake className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Cake</span>
        </button>

        <button
          onClick={() => handleNavigate('memories')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            activeTab === 'memories' ? 'text-[#8B3A4D] font-bold bg-[#E8C5C8]/40' : 'text-[#6B5E59]'
          }`}
        >
          <Camera className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Photos</span>
        </button>

        <button
          onClick={() => handleNavigate('letters')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            activeTab === 'letters' ? 'text-[#8B3A4D] font-bold bg-[#E8C5C8]/40' : 'text-[#6B5E59]'
          }`}
        >
          <Mail className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Letters</span>
        </button>

        <button
          onClick={() => handleNavigate('capsules')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            activeTab === 'capsules' ? 'text-[#8B3A4D] font-bold bg-[#E8C5C8]/40' : 'text-[#6B5E59]'
          }`}
        >
          <Clock className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Capsules</span>
        </button>

        <button
          onClick={() => handleNavigate('gifts')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            activeTab === 'gifts' ? 'text-[#8B3A4D] font-bold bg-[#E8C5C8]/40' : 'text-[#6B5E59]'
          }`}
        >
          <Gift className="w-4 h-4 mb-0.5" />
          <span className="text-[10px]">Gifts</span>
        </button>

        <button
          onClick={() => handleNavigate('scrapbook')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            activeTab === 'scrapbook' ? 'text-white bg-[#5B2333] shadow-xs' : 'text-[#8B3A4D] font-semibold'
          }`}
        >
          <Heart className="w-4 h-4 mb-0.5 fill-current" />
          <span className="text-[10px]">Reply</span>
        </button>
      </div>
    </div>
  );
}
