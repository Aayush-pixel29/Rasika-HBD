import React, { useState } from 'react';
import { Mail, Feather, Heart, X, Check, PenLine } from 'lucide-react';
import { Letter } from '../types';
import { INITIAL_LETTERS } from '../data/defaultContent';
import { sound } from '../services/soundEffects';

export const LettersSection: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>(() => {
    try {
      const stored = localStorage.getItem('birthday_letters');
      return stored ? JSON.parse(stored) : INITIAL_LETTERS;
    } catch {
      return INITIAL_LETTERS;
    }
  });

  const [activeLetter, setActiveLetter] = useState<Letter | null>(null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  // New letter compose state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSignature, setNewSignature] = useState('With all my heart, Aayush');
  const [newWaxColor, setNewWaxColor] = useState<'ruby' | 'gold' | 'emerald' | 'navy'>('ruby');

  const handleOpenLetter = (letter: Letter) => {
    sound.playWaxSealBreak();
    setTimeout(() => {
      sound.playPaperRustle();
      setActiveLetter(letter);
    }, 200);
  };

  const handleSaveLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    sound.playPaperRustle();
    const letter: Letter = {
      id: 'let-' + Date.now(),
      title: newTitle.trim(),
      snippet: newContent.slice(0, 60) + '...',
      date: 'Special Birthday Keepsake',
      waxColor: newWaxColor,
      content: newContent.split('\n\n').filter(Boolean),
      signature: newSignature.trim(),
    };

    const updated = [letter, ...letters];
    setLetters(updated);
    try {
      localStorage.setItem('birthday_letters', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setIsComposeOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <section id="letters" className="py-16 sm:py-24 bg-[#FCF9F3]/60 border-t border-[#E8DFC8]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wider uppercase mb-2">
            <span>Vintage Keepsakes</span>
            <span aria-hidden="true">·</span>
            <span>Wax-Sealed Letters</span>
            <span aria-hidden="true">·</span>
            <span>From the Heart</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2424] text-balance">
            Sealed Birthday Letters & Wishes
          </h2>
          <p className="mt-2 text-sm text-[#6B5E59]">
            Words that don't fade with the years. Tap any wax seal to break it and open the letter inside.
          </p>
        </div>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {letters.map((letter) => {
            const waxBg =
              letter.waxColor === 'ruby'
                ? 'bg-[#8B1E2F] text-amber-200'
                : letter.waxColor === 'gold'
                ? 'bg-[#C2922E] text-white'
                : letter.waxColor === 'emerald'
                ? 'bg-[#2E5E44] text-emerald-100'
                : 'bg-[#223843] text-sky-100';

            return (
              <div
                key={letter.id}
                onClick={() => handleOpenLetter(letter)}
                className="group relative cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
              >
                {/* Envelope Body */}
                <div className="bg-[#F7F2E8] border border-[#E0D5C1] rounded-xl p-6 sm:p-7 shadow-sm group-hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between min-h-[220px]">
                  {/* Decorative envelope fold lines */}
                  <div className="absolute top-0 left-0 right-0 h-10 border-b border-[#E8DFC8]/80 bg-[#EFE8D9]/40 rounded-t-xl" />

                  {/* Wax Seal in center of top fold */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-11 h-11 rounded-full ${waxBg} shadow-md flex items-center justify-center font-serif text-sm font-bold border-2 border-white/30 group-hover:scale-110 transition-transform`}
                      title="Click to break wax seal"
                    >
                      <span>A✦</span>
                    </div>
                  </div>

                  <div className="pt-10 text-center">
                    <h3 className="font-serif text-lg font-bold text-[#2D2424] group-hover:text-[#5B2333] transition-colors leading-snug">
                      {letter.title}
                    </h3>
                    <p className="text-xs text-[#7A6B63] mt-2 line-clamp-2 italic font-sans">
                      "{letter.snippet}"
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E8DFC8]/60 flex items-center justify-between text-[11px] text-[#8B6E60]">
                    <span>{letter.date}</span>
                    <span className="text-[#8B3A4D] font-medium group-hover:underline">Read Letter →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compose Button */}
        <div className="text-center">
          <button
            onClick={() => {
              sound.playChime(550);
              setIsComposeOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-[#5B2333] bg-[#E8C5C8]/40 hover:bg-[#E8C5C8]/70 border border-[#8B3A4D]/30 rounded-full transition-all cursor-pointer"
          >
            <PenLine className="w-4 h-4 text-[#8B3A4D]" />
            <span>Write a Custom Sealed Letter</span>
          </button>
        </div>
      </div>

      {/* Letter Reading Modal */}
      {activeLetter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setActiveLetter(null)}
        >
          <div
            className="bg-[#FCF9F3] parchment-card rounded-2xl max-w-2xl w-full p-6 sm:p-10 border border-[#E8DFC8] shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Washi tape on top */}
            <div className="absolute -top-3 left-12 w-28 h-6 washi-tape washi-tape-pink rounded-xs opacity-90" />
            <div className="absolute -top-3 right-12 w-28 h-6 washi-tape washi-tape-gold rounded-xs opacity-90" />

            <button
              onClick={() => setActiveLetter(null)}
              className="absolute top-4 right-4 p-2 text-[#7A6B63] hover:text-[#2D2424] rounded-full hover:bg-[#F2ECE4] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8 border-b border-[#E8DFC8] pb-4">
              <span className="text-[11px] uppercase tracking-wider text-[#8B6E60]">
                {activeLetter.date}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#5B2333] mt-1">
                {activeLetter.title}
              </h3>
            </div>

            <div className="space-y-4 font-serif text-sm sm:text-base text-[#3C312E] leading-relaxed">
              {activeLetter.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8DFC8]/60 flex flex-col items-end">
              <span className="font-handwriting text-2xl sm:text-3xl text-[#5B2333] font-bold">
                {activeLetter.signature}
              </span>
              {activeLetter.ps && (
                <p className="text-xs text-[#7A6B63] mt-2 italic font-sans self-start bg-[#FAF7F2] p-2.5 rounded-lg border border-[#E8DFC8]/50 w-full">
                  {activeLetter.ps}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Compose Letter Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FCF9F3] rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFC8] shadow-2xl relative">
            <button
              onClick={() => setIsComposeOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#6B5E59] hover:bg-[#F2ECE4] rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#2D2424] mb-1">
              Seal a Heartfelt Letter
            </h3>
            <p className="text-xs text-[#7A6B63] mb-5">
              Leave a timeless message sealed with a virtual wax stamp.
            </p>

            <form onSubmit={handleSaveLetter} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#5B473F] mb-1">Letter Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. For the Girl Who Dreams in Starlight"
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5B473F] mb-1">Wax Seal Color</label>
                <div className="flex gap-2">
                  {(['ruby', 'gold', 'emerald', 'navy'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewWaxColor(color)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize cursor-pointer border ${
                        newWaxColor === color
                          ? 'border-[#5B2333] bg-[#E8C5C8]/50 text-[#5B2333]'
                          : 'border-[#E8DFC8] text-[#6B5E59]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5B473F] mb-1">Letter Content</label>
                <textarea
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Pour your thoughts freely here... (separate paragraphs with blank lines)"
                  className="w-full p-3 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424] resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5B473F] mb-1">Signature</label>
                <input
                  type="text"
                  value={newSignature}
                  onChange={(e) => setNewSignature(e.target.value)}
                  className="w-full p-2 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-4 py-2 text-xs text-[#6B5E59] hover:bg-[#F2ECE4] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-[#8B3A4D] hover:bg-[#6F2B3B] rounded-full transition-colors cursor-pointer"
                >
                  Seal Letter with Wax
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
