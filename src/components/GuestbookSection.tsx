import React, { useState } from 'react';
import { Heart, Plus, Sparkles, MessageCircle, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestbookEntry } from '../types';
import { INITIAL_GUESTBOOK } from '../data/defaultContent';
import { sound } from '../services/soundEffects';

export const GuestbookSection: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const stored = localStorage.getItem('birthday_guestbook_v2');
      if (stored) return JSON.parse(stored);
      localStorage.setItem('birthday_guestbook_v2', JSON.stringify(INITIAL_GUESTBOOK));
      return INITIAL_GUESTBOOK;
    } catch {
      return INITIAL_GUESTBOOK;
    }
  });

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [relationship, setRelationship] = useState('College Friend');
  const [message, setMessage] = useState('');
  const [color, setColor] = useState<'yellow' | 'pink' | 'mint' | 'lavender'>('yellow');
  const [sticker, setSticker] = useState('💌');

  const handleLike = (id: string) => {
    sound.playChime(600);
    const updated = entries.map((e) =>
      e.id === id ? { ...e, likes: e.likes + 1 } : e
    );
    setEntries(updated);
    try {
      localStorage.setItem('birthday_guestbook_v2', JSON.stringify(updated));
    } catch {}
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !author.trim()) return;

    sound.playPaperRustle();
    const newEntry: GuestbookEntry = {
      id: 'gb-' + Date.now(),
      author: author.trim(),
      relationship: relationship.trim(),
      message: message.trim(),
      date: 'Today',
      color,
      likes: 1,
      sticker,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem('birthday_guestbook', JSON.stringify(updated));
    } catch {}

    setIsNoteModalOpen(false);
    setAuthor('');
    setMessage('');

    sound.playSparkleCelebration();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FCE181', '#F7B2BD', '#BEE3DB', '#E8C5C8'],
    });
  };

  const getColorClasses = (c: 'yellow' | 'pink' | 'mint' | 'lavender') => {
    switch (c) {
      case 'yellow':
        return 'bg-[#FFF8E7] border-[#F2E3B6] text-[#4A3C28]';
      case 'pink':
        return 'bg-[#FFF0F2] border-[#F5D0D6] text-[#4A282E]';
      case 'mint':
        return 'bg-[#F0F8F4] border-[#CCE5D7] text-[#284A35]';
      case 'lavender':
        return 'bg-[#F7F2FA] border-[#E2D2ED] text-[#3E284A]';
    }
  };

  return (
    <section id="guestbook" className="py-16 sm:py-24 bg-[#FCF9F3]/60 border-t border-[#E8DFC8]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wider uppercase mb-2">
            <span>The Guestbook</span>
            <span aria-hidden="true">·</span>
            <span>Warm Wishes Board</span>
            <span aria-hidden="true">·</span>
            <span>For Anu (Anuradha)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2424] text-balance">
            Digital Birthday Wishing Board for Anu
          </h2>
          <p className="mt-2 text-sm text-[#6B5E59]">
            A wall of pinned sticky notes and loving affirmations for Anuradha. Pin your note to celebrate her!
          </p>

          <div className="mt-5">
            <button
              onClick={() => {
                sound.playChime(550);
                setIsNoteModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#8B3A4D] hover:bg-[#6F2B3B] rounded-full transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Pin Your Sticky Note</span>
            </button>
          </div>
        </div>

        {/* Sticky Notes Corkboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {entries.map((note) => {
            const colorClass = getColorClasses(note.color);

            return (
              <div
                key={note.id}
                className={`p-6 rounded-2xl border ${colorClass} shadow-xs hover:shadow-md transition-all relative flex flex-col justify-between min-h-[220px]`}
              >
                {/* Pushpin at top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8B3A4D] border-2 border-white shadow-xs" />

                <div>
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <span className="text-xl" title="Sticker">{note.sticker || '💌'}</span>
                    <span className="text-[11px] text-[#8B6E60] font-sans">{note.date}</span>
                  </div>

                  <p className="font-handwriting text-xl sm:text-2xl leading-snug">
                    "{note.message}"
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold font-sans">{note.author}</span>
                    <span className="block text-[10px] opacity-75 font-sans">{note.relationship}</span>
                  </div>

                  <button
                    onClick={() => handleLike(note.id)}
                    className="flex items-center gap-1 text-xs text-[#8B3A4D] hover:scale-105 transition-transform cursor-pointer bg-white/70 px-2.5 py-1 rounded-full border border-black/5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span className="font-mono text-[11px]">{note.likes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Sticky Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FCF9F3] rounded-2xl max-w-md w-full p-6 sm:p-8 border border-[#E8DFC8] shadow-2xl relative">
            <button
              onClick={() => setIsNoteModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#6B5E59] hover:bg-[#F2ECE4] rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#2D2424] mb-1">
              Pin a Birthday Sticky Note
            </h3>
            <p className="text-xs text-[#7A6B63] mb-4">
              Leave a sweet wish on her digital celebration corkboard.
            </p>

            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5B473F] mb-1">Your Name</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Aayush, or college nickname"
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B473F] mb-1">Relationship</label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Old College Friend, Partner in Crime"
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B473F] mb-1">Sticky Note Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Happy Birthday! Wishing you laughter, adventures, and endless joy..."
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424] resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B473F] mb-1">Note Color</label>
                <div className="flex gap-2">
                  {(['yellow', 'pink', 'mint', 'lavender'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`flex-1 py-1.5 text-xs rounded-lg border capitalize cursor-pointer ${
                        color === c
                          ? 'border-[#8B3A4D] font-bold bg-[#FAF7F2]'
                          : 'border-[#E8DFC8]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B473F] mb-1">Pick a Stamp Sticker</label>
                <div className="flex gap-2 text-xl">
                  {['💌', '🎂', '✨', '🌸', '☕', '🌟'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSticker(s)}
                      className={`p-2 rounded-lg border cursor-pointer ${
                        sticker === s
                          ? 'border-[#8B3A4D] bg-[#F4D2D7]/40'
                          : 'border-[#E8DFC8] bg-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#6B5E59] hover:bg-[#F2ECE4] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-[#8B3A4D] hover:bg-[#6F2B3B] rounded-full transition-colors cursor-pointer"
                >
                  Pin to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
