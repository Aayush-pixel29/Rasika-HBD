import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, SkipForward, Disc, X, Sparkles, ExternalLink } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'spotify' | 'ambient'>('spotify');

  useEffect(() => {
    setCurrentSong(sound.getCurrentSong());
  }, [isMusicPlaying]);

  const handleToggleAmbient = () => {
    const playing = sound.toggleBgm((state) => setIsMusicPlaying(state));
    setIsMusicPlaying(playing);
    setCurrentSong(sound.getCurrentSong());
  };

  const handleSelectSong = (idx: number) => {
    sound.selectTrack(idx);
    const selected = ANU_SONGS[idx];
    setCurrentSong(selected);
    sound.playChime(650);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="bg-[#FCF9F3] parchment-card rounded-2xl max-w-lg w-full p-5 sm:p-6 border border-[#E8DFC8] shadow-2xl relative max-h-[94vh] flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#6B5E59] hover:bg-[#F2ECE4] rounded-full cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-3 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1DB954]/10 text-[#1DB954] text-[11px] font-bold tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
            Spotify & Melodies for Anu
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2D2424]">
            Anuradha's Special Mixtape 🎵
          </h3>
          <p className="text-xs text-[#8B6E60] mt-0.5">
            The songs from our talks & college days — play them right here or on Spotify!
          </p>
        </div>

        {/* Switcher Tab */}
        <div className="flex bg-[#F2ECE4] p-1 rounded-xl mb-3">
          <button
            onClick={() => setActiveTab('spotify')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'spotify'
                ? 'bg-white text-[#2D2424] shadow-xs'
                : 'text-[#6B5E59] hover:text-[#2D2424]'
            }`}
          >
            <span className="text-[#1DB954]">●</span> Spotify Player
          </button>
          <button
            onClick={() => setActiveTab('ambient')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'ambient'
                ? 'bg-white text-[#5B2333] shadow-xs'
                : 'text-[#6B5E59] hover:text-[#2D2424]'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-[#8B3A4D]" /> Soft Chimes
          </button>
        </div>

        {activeTab === 'spotify' ? (
          <div>
            {/* Spotify Embed Player */}
            <div className="w-full rounded-xl overflow-hidden shadow-sm border border-[#E8DFC8] bg-black mb-3">
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/track/${currentSong.spotifyId || '2du72cjxORy6pu3latxzUi'}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify Player - ${currentSong.title}`}
              />
            </div>

            {/* Direct Open in Spotify CTA */}
            <a
              href={currentSong.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#1DB954] hover:bg-[#1AA34A] text-white font-bold text-xs shadow-sm transition-all mb-4 text-center cursor-pointer"
            >
              <span>Open "{currentSong.title}" in Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ) : (
          <div>
            {/* Ambient Synth Chime Section */}
            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFC8] text-center mb-3">
              <div className="flex justify-center mb-3">
                <div
                  className={`w-20 h-20 rounded-full bg-[#1F1B1A] border-4 border-[#3D3533] shadow-md flex items-center justify-center ${
                    isMusicPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '6s' }}
                >
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#8B3A4D] border-2 border-[#D4AF37] flex items-center justify-center text-white text-[9px]">
                      ✦
                    </div>
                  </div>
                </div>
              </div>

              <span className="text-[10px] uppercase tracking-widest text-[#8B3A4D] font-mono font-bold block mb-0.5">
                {isMusicPlaying ? 'AMBIENT CHIMES PLAYING' : 'CHIMES PAUSED'}
              </span>
              <p className="font-serif text-sm font-bold text-[#2D2424]">
                Acoustic Chime Synthesizer
              </p>

              <div className="flex items-center justify-center gap-3 mt-3">
                <button
                  onClick={handleToggleAmbient}
                  className="px-4 py-1.5 rounded-full bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white text-xs font-medium flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {isMusicPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pause Chimes
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Play Chimes
                    </>
                  )}
                </button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-2 max-w-xs mx-auto mt-3">
                <Volume2 className="w-3.5 h-3.5 text-[#8B6E60]" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full accent-[#8B3A4D] h-1.5 bg-[#E8DFC8] rounded-lg cursor-pointer"
                />
                <span className="text-[10px] font-mono text-[#8B6E60] w-6">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Curated 8 Songs List */}
        <div className="border-t border-[#E8DFC8] pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#5B2333]">
              Curated Tracks for Anuradha ({ANU_SONGS.length} Songs)
            </span>
            <span className="text-[10px] text-[#8B6E60]">Tap song to play</span>
          </div>

          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {ANU_SONGS.map((song, i) => {
              const isSelected = currentSong.title === song.title;
              return (
                <div
                  key={song.title}
                  className={`w-full p-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors border ${
                    isSelected
                      ? 'bg-[#E8C5C8]/40 border-[#8B3A4D] font-semibold text-[#5B2333]'
                      : 'bg-white/80 border-[#E8DFC8]/60 text-[#2D2424] hover:bg-white'
                  }`}
                >
                  <button
                    onClick={() => {
                      handleSelectSong(i);
                      setActiveTab('spotify');
                    }}
                    className="flex items-center gap-2 truncate pr-2 flex-1 cursor-pointer text-left"
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#8B3A4D] text-white'
                          : 'bg-[#F2ECE4] text-[#8B6E60]'
                      }`}
                    >
                      <Play className="w-2.5 h-2.5 ml-0.5" />
                    </div>
                    <div className="truncate">
                      <p className="truncate font-medium">{song.title}</p>
                      <p className="text-[10px] text-[#8B6E60] truncate">
                        {song.artist} • <span className="italic">{song.tag}</span>
                      </p>
                    </div>
                  </button>

                  <a
                    href={song.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open ${song.title} on Spotify`}
                    className="px-2 py-1 rounded-md bg-[#1DB954]/10 hover:bg-[#1DB954] text-[#1DB954] hover:text-white transition-colors text-[10px] font-bold flex items-center gap-1 shrink-0 ml-1 cursor-pointer"
                  >
                    <span>Spotify</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
