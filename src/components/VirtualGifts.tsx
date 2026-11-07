import React, { useState } from 'react';
import { Gift, Sparkles, Disc, Star, Ticket, HeartHandshake, Check, Music, ArrowRight, X, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VirtualGift } from '../types';
import { INITIAL_GIFTS } from '../data/defaultContent';
import { sound, ANU_SONGS } from '../services/soundEffects';

export const VirtualGifts: React.FC = () => {
  const [gifts, setGifts] = useState<VirtualGift[]>(() => {
    try {
      const stored = localStorage.getItem('virtual_gifts_v2');
      if (stored) return JSON.parse(stored);
      localStorage.setItem('virtual_gifts_v2', JSON.stringify(INITIAL_GIFTS));
      return INITIAL_GIFTS;
    } catch {
      return INITIAL_GIFTS;
    }
  });

  const [openedGift, setOpenedGift] = useState<VirtualGift | null>(null);
  const [selectedMixtapeTrack, setSelectedMixtapeTrack] = useState(0);
  const [redeemedCoupons, setRedeemedCoupons] = useState<Record<number, boolean>>({});
  const [activeStarQuote, setActiveStarQuote] = useState<string | null>(null);

  const handleOpenGift = (gift: VirtualGift) => {
    sound.playPaperRustle();
    setTimeout(() => {
      sound.playSparkleCelebration();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E8C5C8', '#8B3A4D', '#FFF'],
      });

      const updated = gifts.map((g) =>
        g.id === gift.id ? { ...g, isOpened: true } : g
      );
      setGifts(updated);
      try {
        localStorage.setItem('virtual_gifts_v2', JSON.stringify(updated));
      } catch {}

      setOpenedGift({ ...gift, isOpened: true });
    }, 400);
  };

  const handleRedeemCoupon = (index: number) => {
    sound.playChime(650);
    setRedeemedCoupons((prev) => ({ ...prev, [index]: true }));
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#C2922E', '#E8C5C8', '#4A6753'],
    });
  };

  const affirmations = [
    'You are capable of far more than your quiet doubts tell you.',
    'Your kindness left an indelible mark on my college years.',
    'You deserve the exact depth of loyalty you give to those you love.',
    'No matter how noisy the world gets, never lose your soft, thoughtful heart.',
    'The future has wonderful, unexpected surprises waiting for you.',
    'I will always be thankful that fate made us sit in the same college hall.',
  ];

  return (
    <section id="gifts" className="py-16 sm:py-24 bg-[#FCF9F3]/60 border-t border-[#E8DFC8]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wider uppercase mb-2">
            <span>Special Surprises</span>
            <span aria-hidden="true">·</span>
            <span>Unwrap With Love</span>
            <span aria-hidden="true">·</span>
            <span>For Anu (Anuradha)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2424] text-balance">
            Special Birthday Gifts for Anu
          </h2>
          <p className="mt-2 text-sm text-[#6B5E59]">
            Presents prepared with love — including your college mixtape (ready for your favorite song), your celestial star, and overdue reunion passes. Tap any box to untie the ribbon!
          </p>
        </div>

        {/* Gift Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {gifts.map((gift) => {
            const isOpened = gift.isOpened;

            // Box styling
            const boxBg =
              gift.boxColor === 'blush'
                ? 'bg-[#F9E5E8] border-[#E8C5C8]'
                : gift.boxColor === 'gold'
                ? 'bg-[#FBF4DE] border-[#E9D9A5]'
                : gift.boxColor === 'champagne'
                ? 'bg-[#F7EFE3] border-[#DFD1BD]'
                : 'bg-[#EFE8F4] border-[#D4C3DF]';

            const ribbonBg =
              gift.ribbonColor === 'crimson'
                ? 'bg-[#8B1E2F]'
                : gift.ribbonColor === 'cream'
                ? 'bg-[#C2922E]'
                : gift.ribbonColor === 'rosegold'
                ? 'bg-[#B76E79]'
                : 'bg-[#4A6753]';

            return (
              <div
                key={gift.id}
                onClick={() => handleOpenGift(gift)}
                className="group relative cursor-pointer flex flex-col items-center"
              >
                {/* 3D-styled Gift Box container */}
                <div
                  className={`w-full aspect-square max-w-[240px] rounded-2xl border ${boxBg} shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1 relative flex flex-col items-center justify-center p-6 text-center`}
                >
                  {/* Satin Ribbon cross */}
                  {!isOpened ? (
                    <>
                      {/* Vertical Ribbon */}
                      <div className={`absolute top-0 bottom-0 w-6 ${ribbonBg} opacity-85 shadow-xs`} />
                      {/* Horizontal Ribbon */}
                      <div className={`absolute left-0 right-0 h-6 ${ribbonBg} opacity-85 shadow-xs`} />
                      {/* Bow on Top */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                        <div
                          className={`w-9 h-9 rounded-full ${ribbonBg} shadow-md flex items-center justify-center text-white text-xs group-hover:scale-110 transition-transform`}
                        >
                          🎀
                        </div>
                      </div>

                      <div className="z-10 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-white/60 shadow-xs max-w-[180px]">
                        <Gift className="w-6 h-6 mx-auto text-[#8B3A4D] mb-1 animate-float-gentle" />
                        <h4 className="font-serif text-sm font-bold text-[#2D2424] leading-tight">
                          {gift.title}
                        </h4>
                        <span className="block text-[10px] text-[#8B6E60] mt-1">Tap to Unwrap</span>
                      </div>
                    </>
                  ) : (
                    /* Opened state box */
                    <div className="z-10 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-[#8B3A4D] mb-2">
                        {gift.type === 'mixtape' && <Disc className="w-6 h-6 animate-spin" />}
                        {gift.type === 'star' && <Star className="w-6 h-6 text-amber-500 fill-amber-400" />}
                        {gift.type === 'coupons' && <Ticket className="w-6 h-6 text-[#C2922E]" />}
                        {gift.type === 'jar' && <Sparkles className="w-6 h-6 text-[#8B3A4D]" />}
                      </div>
                      <h4 className="font-serif text-sm font-bold text-[#2D2424]">
                        {gift.title}
                      </h4>
                      <span className="text-[11px] text-[#2E5E44] font-medium mt-1">
                        Unwrapped ✦ View Details
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 text-center">
                  <span className="font-serif text-xs font-semibold text-[#5B2333]">
                    {gift.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gift Detail Modal */}
      {openedGift && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setOpenedGift(null)}
        >
          <div
            className="bg-[#FCF9F3] parchment-card rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-[#E8DFC8] shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 washi-tape washi-tape-gold rounded-xs opacity-90" />

            <button
              onClick={() => setOpenedGift(null)}
              className="absolute top-4 right-4 p-1.5 text-[#6B5E59] hover:bg-[#F2ECE4] rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-wider text-[#8B6E60]">
                {openedGift.subtitle}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#5B2333] mt-1">
                {openedGift.surpriseContent.heading}
              </h3>
              <p className="text-xs text-[#6B5E59] mt-1">
                {openedGift.surpriseContent.description}
              </p>
            </div>

            {/* Gift-specific interactive views */}
            {openedGift.type === 'mixtape' && (
              <div className="space-y-4">
                <div className="bg-[#2D2424] text-white p-4 sm:p-5 rounded-2xl border border-white/10 shadow-inner flex flex-col items-center">
                  {/* Cassette Tape Visual */}
                  <div className="w-full bg-[#3D3434] p-3 sm:p-4 rounded-xl border border-white/20 relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] tracking-widest text-[#E8DFC8] font-mono">
                        STEREO CASSETTE • SIDE A
                      </span>
                      <span className="text-[10px] text-rose-300 font-mono">FOR ANURADHA ALWAYS</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 sm:gap-6 my-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-[#FAF7F2] animate-spin flex items-center justify-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FAF7F2]" />
                      </div>
                      <div className="px-3 py-1 bg-black/50 rounded-md border border-white/10 flex items-center justify-center">
                        <span className="text-[11px] font-mono text-[#1DB954] flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
                          SPOTIFY MIXTAPE
                        </span>
                      </div>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-[#FAF7F2] animate-spin flex items-center justify-center">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#FAF7F2]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spotify Embed Player */}
                <div className="w-full rounded-xl overflow-hidden shadow-sm border border-[#E8DFC8] bg-black">
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/track/${ANU_SONGS[selectedMixtapeTrack]?.spotifyId || '2du72cjxORy6pu3latxzUi'}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Spotify Player - ${ANU_SONGS[selectedMixtapeTrack]?.title}`}
                  />
                </div>

                {/* Direct link button */}
                <a
                  href={ANU_SONGS[selectedMixtapeTrack]?.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl bg-[#1DB954] hover:bg-[#1AA34A] text-white font-bold text-xs shadow-xs transition-all text-center cursor-pointer"
                >
                  <span>Open "{ANU_SONGS[selectedMixtapeTrack]?.title}" in Spotify App / Web</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Track Selector List */}
                <div className="bg-[#FAF7F2] p-3 sm:p-4 rounded-xl border border-[#E8DFC8]">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-xs font-semibold text-[#8B3A4D] uppercase tracking-wider">
                      All Curated Songs ({ANU_SONGS.length} Tracks):
                    </h5>
                    <span className="text-[10px] text-[#8B6E60]">Tap song to play</span>
                  </div>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {ANU_SONGS.map((song, i) => {
                      const isCurrent = selectedMixtapeTrack === i;
                      return (
                        <div
                          key={song.title}
                          className={`flex items-center justify-between text-xs p-2 rounded-lg border transition-colors ${
                            isCurrent
                              ? 'bg-[#E8C5C8]/40 border-[#8B3A4D] font-semibold text-[#5B2333]'
                              : 'bg-white border-[#E8DFC8]/50 text-[#2D2424] hover:bg-[#FAF7F2]'
                          }`}
                        >
                          <button
                            onClick={() => {
                              setSelectedMixtapeTrack(i);
                              sound.playChime(600);
                            }}
                            className="flex items-center gap-2 flex-1 text-left cursor-pointer truncate mr-2"
                          >
                            <Music className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'text-[#8B3A4D]' : 'text-[#8B6E60]'}`} />
                            <span className="truncate">{song.title} <span className="opacity-70 font-normal">({song.artist})</span></span>
                          </button>
                          <a
                            href={song.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-[#1DB954] hover:underline font-bold flex items-center gap-0.5 shrink-0"
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
            )}

            {openedGift.type === 'star' && (
              <div className="bg-[#1C1F2B] text-white p-6 rounded-2xl border border-amber-300/30 text-center relative overflow-hidden shadow-inner">
                <div className="absolute top-2 right-2 text-amber-300 text-xs">✦ ⋆ ✧</div>
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-400/20 flex items-center justify-center text-amber-300 mb-3">
                  <Star className="w-8 h-8 fill-amber-300" />
                </div>
                <h4 className="font-serif text-xl font-bold text-amber-200">
                  The "Anuradha" Constellation ✨
                </h4>
                <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
                  Registered forever in the virtual skies. Coordinates: RA 18h 36m / DEC +38° 47'.
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-amber-100 italic font-serif">
                  "No distance or time can dim the light you bring to those around you."
                </div>
              </div>
            )}

            {openedGift.type === 'coupons' && (
              <div className="space-y-3">
                {openedGift.surpriseContent.details?.map((coupon, i) => {
                  const isRedeemed = redeemedCoupons[i];
                  return (
                    <div
                      key={i}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        isRedeemed
                          ? 'bg-[#E6ECE7] border-[#B8CEBC] text-[#2C4A34]'
                          : 'bg-white border-[#E8DFC8] text-[#2D2424]'
                      }`}
                    >
                      <span className="text-xs font-medium font-sans">{coupon}</span>
                      <button
                        onClick={() => handleRedeemCoupon(i)}
                        disabled={isRedeemed}
                        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer shrink-0 ${
                          isRedeemed
                            ? 'bg-[#2E5E44] text-white cursor-default'
                            : 'bg-[#C2922E] hover:bg-[#A37B24] text-white shadow-xs'
                        }`}
                      >
                        {isRedeemed ? 'Redeemed ✓' : 'Redeem Pass'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {openedGift.type === 'jar' && (
              <div className="space-y-4 text-center">
                <p className="text-xs text-[#7A6B63]">
                  Tap any origami star to unfold an affirmation:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 py-2">
                  {affirmations.map((aff, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sound.playPaperRustle();
                        setActiveStarQuote(aff);
                      }}
                      className="p-3 bg-[#FAF7F2] hover:bg-[#F2ECE4] border border-[#E8DFC8] rounded-xl text-lg hover:scale-110 transition-all cursor-pointer shadow-xs"
                      title="Unfold paper star"
                    >
                      ⭐ Star #{i + 1}
                    </button>
                  ))}
                </div>

                {activeStarQuote && (
                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DFC8] font-handwriting text-xl text-[#5B2333] animate-float-gentle">
                    "{activeStarQuote}"
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setOpenedGift(null)}
                className="px-5 py-2 text-xs font-medium text-white bg-[#8B3A4D] hover:bg-[#6F2B3B] rounded-full transition-colors cursor-pointer"
              >
                Close Box
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
