import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, SkipForward, Disc, X, Sparkles, Check } from 'lucide-react';
import { sound, ANU_SONGS, SongInfo } from '../services/soundEffects';

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
  const [currentSong, setCurrentSong] = useState<SongInfo>(sound.getCurrentSong());
  const [volume, setVolume] = useState(sound.getVolume());

  useEffect(() => {
    setCurrentSong(sound.getCurrentSong());
  }, [isMusicPlaying]);

  const handleToggle = () => {
    const playing = sound.toggleBgm((state) => setIsMusicPlaying(state));
    setIsMusicPlaying(playing);
    setCurrentSong(sound.getCurrentSong());
  };

  const handleNextTrack = () => {
    sound.nextTrack();
    setCurrentSong(sound.getCurrentSong());
    sound.playChime(600);
  };

  const handleSelectSong = (idx: number) => {
    sound.selectTrack(idx);
    setCurrentSong(sound.getCurrentSong());
    sound.playChime(650);
    if (!isMusicPlaying) {
      sound.toggleBgm((state) => setIsMusicPlaying(state));
      setIsMusicPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#FCF9F3] parchment-card rounded-2xl max-w-md w-full p-6 sm:p-7 border border-[#E8DFC8] shadow-2xl relative max-h-[92vh] flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#6B5E59] hover:bg-[#F2ECE4] rounded-full cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <span className="text-[11px] font-semibold text-[#8B3A4D] uppercase tracking-wider">
            Anuradha's Special Soundscape
          </span>
          <h3 className="font-serif text-xl font-bold text-[#2D2424] mt-0.5">
            College Memories & Melodies 🎵
          </h3>
          <p className="text-[11px] text-[#8B6E60] mt-0.5">
            Curated playlist for our dearest Anu
          </p>
        </div>

        {/* Vinyl disc visual */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#1F1B1A] border-4 border-[#3D3533] shadow-lg flex items-center justify-center relative ${
              isMusicPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            {/* Grooves */}
            <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-white/10 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#8B3A4D] border-2 border-[#D4AF37] flex items-center justify-center text-white text-[9px] font-bold">
                  ✦
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Currently Playing Card */}
        <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DFC8] text-center mb-4">
          <span className="text-[10px] uppercase tracking-widest text-[#8B3A4D] font-mono font-bold block mb-1">
            {isMusicPlaying ? 'NOW PLAYING' : 'READY TO PLAY'}
          </span>
          <p className="font-serif text-base font-bold text-[#2D2424]">
            {currentSong.title}
          </p>
          <p className="text-xs text-[#8B6E60]">
            {currentSong.artist} • <span className="italic">{currentSong.tag}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={handleToggle}
            className="w-11 h-11 rounded-full bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
            title={isMusicPlaying ? 'Pause' : 'Play'}
          >
            {isMusicPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          <button
            onClick={handleNextTrack}
            className="w-9 h-9 rounded-full bg-[#F2ECE4] hover:bg-[#EBE2D7] text-[#5B2333] flex items-center justify-center transition-colors cursor-pointer"
            title="Next Song"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-3 px-2 mb-4">
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

        {/* Curated Playlist List */}
        <div className="border-t border-[#E8DFC8] pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#5B2333]">
              Curated Playlist ({ANU_SONGS.length} Songs)
            </span>
            <span className="text-[10px] text-[#8B6E60]">Tap any song to play</span>
          </div>

          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {ANU_SONGS.map((song, i) => {
              const isSelected = currentSong.title === song.title;
              return (
                <button
                  key={song.title}
                  onClick={() => handleSelectSong(i)}
                  className={`w-full p-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-[#E8C5C8]/40 border-[#8B3A4D] font-semibold text-[#5B2333]'
                      : 'bg-white/80 border-[#E8DFC8]/60 text-[#2D2424] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Music className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#8B3A4D]' : 'text-[#A8988F]'}`} />
                    <span className="truncate">{song.title} <span className="opacity-70 font-normal font-sans">({song.artist})</span></span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] text-[#8B3A4D] font-bold shrink-0">Playing ✦</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
