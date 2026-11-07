import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, SkipForward, Disc, X } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface AudioPlayerFloatingProps {
  isOpen: boolean;
  onClose: () => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean) => void;
}

export const AudioPlayerFloating: React.FC<AudioPlayerFloatingProps> = ({
  isOpen,
  onClose,
  isMusicPlaying,
  setIsMusicPlaying,
}) => {
  const [trackName, setTrackName] = useState(sound.getTrackName());
  const [volume, setVolume] = useState(sound.getVolume());

  useEffect(() => {
    setTrackName(sound.getTrackName());
  }, [isMusicPlaying]);

  const handleToggle = () => {
    const playing = sound.toggleBgm((state) => setIsMusicPlaying(state));
    setIsMusicPlaying(playing);
    setTrackName(sound.getTrackName());
  };

  const handleNextTrack = () => {
    sound.nextTrack();
    setTrackName(sound.getTrackName());
    sound.playChime(600);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#FCF9F3] parchment-card rounded-2xl max-w-sm w-full p-6 border border-[#E8DFC8] shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#6B5E59] hover:bg-[#F2ECE4] rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-xs font-semibold text-[#8B3A4D] uppercase tracking-wider">
            Dedicated Ambient Player
          </span>
          <h3 className="font-serif text-xl font-bold text-[#2D2424] mt-1">
            College Memories Soundscape
          </h3>
        </div>

        {/* Vinyl disc visual */}
        <div className="flex justify-center mb-6">
          <div
            className={`w-36 h-36 rounded-full bg-[#1F1B1A] border-4 border-[#3D3533] shadow-lg flex items-center justify-center relative ${
              isMusicPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            {/* Grooves */}
            <div className="w-28 h-28 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#8B3A4D] border-2 border-[#D4AF37] flex items-center justify-center text-white text-[9px] font-bold">
                  ✦
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Track info */}
        <div className="text-center mb-6">
          <p className="font-serif text-sm font-bold text-[#2D2424] truncate">
            {trackName}
          </p>
          <span className="text-xs text-[#8B6E60]">Synthesized Acoustic Lo-Fi Chimes</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={handleToggle}
            className="w-12 h-12 rounded-full bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
            title={isMusicPlaying ? 'Pause Melody' : 'Play Melody'}
          >
            {isMusicPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={handleNextTrack}
            className="w-9 h-9 rounded-full bg-[#F2ECE4] hover:bg-[#EBE2D7] text-[#5B2333] flex items-center justify-center transition-colors cursor-pointer"
            title="Next Track"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-3 px-2">
          {volume === 0 ? (
            <VolumeX className="w-4 h-4 text-[#8B6E60]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#8B6E60]" />
          )}
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-[#8B3A4D] h-1.5 bg-[#E8DFC8] rounded-lg cursor-pointer"
          />
          <span className="text-[11px] font-mono text-[#8B6E60] w-7 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
};
