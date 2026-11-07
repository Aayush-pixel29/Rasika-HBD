import React, { useState } from 'react';
import { Heart, Send, Sparkles, Smile, Sticker, Download, CheckCircle2, Cake, Calendar, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScrapbookResponseEntry, MoodType } from '../types';
import { sound } from '../services/soundEffects';

export const ScrapbookResponse: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<MoodType>('touched');
  const [responseLetter, setResponseLetter] = useState('');
  const [favoriteMemory, setFavoriteMemory] = useState('');
  const [senderName, setSenderName] = useState('Anu (Anuradha)');
  const [selectedStickers, setSelectedStickers] = useState<string[]>(['🌹', '✨', '💌']);
  const [washiStyle, setWashiStyle] = useState<'pink' | 'sage' | 'gold' | 'cream'>('pink');
  const [isSending, setIsSending] = useState(false);
  const [showCelebrationBanner, setShowCelebrationBanner] = useState(false);

  // Stored responses
  const [savedResponses, setSavedResponses] = useState<ScrapbookResponseEntry[]>(() => {
    try {
      const stored = localStorage.getItem('scrapbook_responses');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const moods: { type: MoodType; label: string; emoji: string; desc: string }[] = [
    { type: 'touched', label: 'Touched & Teary', emoji: '🥹', desc: 'Overwhelmed with sweet memories' },
    { type: 'joyful', label: 'Overjoyed & Radiant', emoji: '🥰', desc: 'Grinning from ear to ear' },
    { type: 'nostalgic', label: 'College Nostalgia', emoji: '✨', desc: 'Reliving every campus laugh' },
    { type: 'grateful', label: 'Deeply Grateful', emoji: '🌸', desc: 'Feeling blessed to have a friend like you' },
    { type: 'butterflies', label: 'Butterfly Smiles', emoji: '🦋', desc: 'Heart fluttering with happiness' },
    { type: 'cozy', label: 'Warm & Cozy', emoji: '☕', desc: 'Like wrapped in a soft blanket' },
  ];

  const availableStickers = [
    { emoji: '🌹', name: 'Pressed Rose' },
    { emoji: '☕', name: 'Hot Chai' },
    { emoji: '🎀', name: 'Silk Bow' },
    { emoji: '💌', name: 'Wax Stamp' },
    { emoji: '🧁', name: 'Cupcake' },
    { emoji: '⭐', name: 'Gold Star' },
    { emoji: '🌿', name: 'Eucalyptus' },
    { emoji: '📷', name: 'Polaroid' },
    { emoji: '💫', name: 'Sparkles' },
    { emoji: '🎂', name: 'Birthday Cake' },
  ];

  const toggleSticker = (emoji: string) => {
    sound.playChime(620);
    if (selectedStickers.includes(emoji)) {
      setSelectedStickers(selectedStickers.filter((s) => s !== emoji));
    } else {
      if (selectedStickers.length < 6) {
        setSelectedStickers([...selectedStickers, emoji]);
      }
    }
  };

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseLetter.trim()) return;

    sound.playPaperRustle();
    setIsSending(true);

    const moodObj = moods.find((m) => m.type === selectedMood) || moods[0];
    const currentDateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const responsePayload = {
      senderName: senderName.trim() || 'Anu (Anuradha)',
      recipient: 'Aayush',
      mood: selectedMood,
      moodLabel: moodObj.label,
      letter: responseLetter.trim(),
      favoriteMemory: favoriteMemory.trim() || 'None mentioned',
      stickers: selectedStickers.join(', '),
      washiStyle,
      date: currentDateStr,
      submittedAt: new Date().toISOString(),
    };

    // Post directly to Aayush's email via Formspree!
    try {
      await fetch('https://formspree.io/f/xyeeajzr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(responsePayload),
      });
    } catch (err) {
      console.warn('Response saved locally:', err);
    }

    const newEntry: ScrapbookResponseEntry = {
      id: 'resp-' + Date.now(),
      date: currentDateStr,
      mood: selectedMood,
      moodLabel: moodObj.label,
      moodEmoji: moodObj.emoji,
      letter: responseLetter.trim(),
      favoriteMemory: favoriteMemory.trim(),
      stickers: selectedStickers,
      washiStyle,
      senderName: senderName.trim() || 'Anu (Anuradha)',
      timestamp: Date.now(),
    };

    const updated = [newEntry, ...savedResponses];
    setSavedResponses(updated);
    try {
      localStorage.setItem('scrapbook_responses', JSON.stringify(updated));
    } catch {}

    setIsSending(false);
    setShowCelebrationBanner(true);
    setResponseLetter('');
    setFavoriteMemory('');

    sound.playSparkleCelebration();
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#E8C5C8', '#D4AF37', '#8B3A4D', '#FFF', '#9CAF88'],
    });
  };

  const handleDeleteResponse = (id: string) => {
    const filtered = savedResponses.filter((r) => r.id !== id);
    setSavedResponses(filtered);
    try {
      localStorage.setItem('scrapbook_responses', JSON.stringify(filtered));
    } catch {}
  };

  return (
    <section id="scrapbook" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wider uppercase mb-2">
            <span>Anu's Corner</span>
            <span aria-hidden="true">·</span>
            <span>Mood Tracker & Digital Reply</span>
            <span aria-hidden="true">·</span>
            <span>Sent Back to Aayush</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2424] text-balance">
            How Did This Make You Feel, Anu?
          </h2>
          <p className="mt-2 text-sm text-[#6B5E59]">
            This space is completely yours. Choose how your heart feels, decorate your scrapbook response with stickers, and send your reply straight back to Aayush.
          </p>
        </div>

        {/* Celebration Banner when entry is sent */}
        {showCelebrationBanner && (
          <div className="mb-8 p-5 bg-[#FCF9F3] border-2 border-[#E8C5C8] rounded-2xl shadow-sm text-center animate-float-gentle relative overflow-hidden">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#F4D2D7]/60 flex items-center justify-center text-[#8B3A4D] mb-2">
              <Cake className="w-6 h-6 animate-bounce" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#5B2333]">
              Anu, Your Response Has Been Delivered! 💌
            </h3>
            <p className="text-xs text-[#7A6B63] mt-1 max-w-md mx-auto">
              Aayush received your words with an enormous smile. Can't wait for our long-overdue reunion!
            </p>
            <div className="mt-3">
              <button
                onClick={() => setShowCelebrationBanner(false)}
                className="text-xs text-[#8B3A4D] underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Scrapbook Form Card */}
        <div className="parchment-card rounded-2xl border border-[#E8DFC8] p-6 sm:p-10 relative shadow-md">
          {/* Top Washi Tape */}
          <div
            className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-40 h-7 washi-tape ${
              washiStyle === 'pink'
                ? 'washi-tape-pink'
                : washiStyle === 'sage'
                ? 'washi-tape-sage'
                : washiStyle === 'gold'
                ? 'washi-tape-gold'
                : 'washi-tape'
            } rounded-xs opacity-90 shadow-xs pointer-events-none`}
          />

          <form onSubmit={handleSendResponse} className="space-y-8">
            {/* Step 1: Mood Tracker */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Smile className="w-4 h-4 text-[#8B3A4D]" />
                <label className="font-serif text-base font-bold text-[#2D2424]">
                  1. Current Heart & Mood Check
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {moods.map((m) => {
                  const isSelected = selectedMood === m.type;
                  return (
                    <button
                      key={m.type}
                      type="button"
                      onClick={() => {
                        sound.playChime(500);
                        setSelectedMood(m.type);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#FCF9F3] border-[#8B3A4D] shadow-xs ring-1 ring-[#8B3A4D]'
                          : 'bg-white/80 border-[#E8DFC8] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{m.emoji}</span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#8B3A4D]" />
                        )}
                      </div>
                      <div className="mt-2">
                        <span className="block text-xs font-semibold text-[#2D2424]">
                          {m.label}
                        </span>
                        <span className="block text-[10px] text-[#8B6E60] mt-0.5 line-clamp-1">
                          {m.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Response Letter Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#8B3A4D]" />
                  <label className="font-serif text-base font-bold text-[#2D2424]">
                    2. Write Your Thoughts & Reaction
                  </label>
                </div>
                <span className="text-xs text-[#8B6E60]">What went through your mind?</span>
              </div>

              <textarea
                rows={5}
                value={responseLetter}
                onChange={(e) => setResponseLetter(e.target.value)}
                placeholder="Dear Aayush, When I opened this... (Pour your raw feelings, thoughts, or favorite memories here)"
                className="w-full p-4 rounded-xl border border-[#E8DFC8] bg-white text-sm text-[#2D2424] placeholder-[#A8988F] focus:outline-none focus:ring-2 focus:ring-[#8B3A4D]/30 resize-none font-serif leading-relaxed"
                required
              />
            </div>

            {/* Step 3: Favorite College Memory Mention */}
            <div>
              <label className="block text-xs font-semibold text-[#5B473F] mb-1">
                The College Memory That Made You Smile Most (Optional)
              </label>
              <input
                type="text"
                value={favoriteMemory}
                onChange={(e) => setFavoriteMemory(e.target.value)}
                placeholder="e.g. That time we got caught laughing during seminar..."
                className="w-full p-2.5 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
              />
            </div>

            {/* Step 4: Digital Stickers & Washi Tape Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sticker className="w-4 h-4 text-[#8B3A4D]" />
                  <label className="text-xs font-semibold text-[#5B473F]">
                    Stamp Stickers on Your Page (Pick up to 6)
                  </label>
                </div>
                <span className="text-[11px] text-[#8B6E60]">
                  {selectedStickers.length}/6 stamped
                </span>
              </div>

              <div className="flex flex-wrap gap-2 p-3 bg-white/70 rounded-xl border border-[#E8DFC8]">
                {availableStickers.map((s) => {
                  const isChecked = selectedStickers.includes(s.emoji);
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => toggleSticker(s.emoji)}
                      className={`px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#E8C5C8] text-[#5B2333] shadow-2xs font-medium'
                          : 'bg-[#FAF7F2] text-[#6B5E59] hover:bg-[#F2ECE4]'
                      }`}
                    >
                      <span>{s.emoji}</span>
                      <span className="text-[11px]">{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Name and Washi Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#5B473F] mb-1">
                  Signed By:
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your Name or Nickname"
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5B473F] mb-1">
                  Washi Tape Color:
                </label>
                <div className="flex gap-2">
                  {(['pink', 'sage', 'gold', 'cream'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setWashiStyle(color)}
                      className={`flex-1 py-2 text-xs rounded-lg border capitalize cursor-pointer transition-colors ${
                        washiStyle === color
                          ? 'border-[#8B3A4D] bg-[#F4D2D7]/40 text-[#5B2333] font-semibold'
                          : 'border-[#E8DFC8] text-[#7A6B63]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DFC8]/60">
              <span className="text-xs text-[#8B6E60] italic">
                *Your reply is securely saved in your scrapbook and sent directly.
              </span>

              <button
                type="submit"
                disabled={isSending}
                className="w-full sm:w-auto px-7 py-3 bg-[#8B3A4D] hover:bg-[#6F2B3B] text-white rounded-full font-medium text-sm transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Packing Letter & Lighting Cake...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Scrapbook Response to Aayush 💌</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Previous Saved Responses Wall */}
        {savedResponses.length > 0 && (
          <div className="mt-14 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#2D2424]">
                Saved Scrapbook Replies ({savedResponses.length})
              </h3>
              <span className="text-xs text-[#8B6E60]">Cherished Forever</span>
            </div>

            <div className="space-y-6">
              {savedResponses.map((entry) => (
                <div
                  key={entry.id}
                  className="parchment-card rounded-2xl border border-[#E8DFC8] p-6 sm:p-8 relative shadow-xs"
                >
                  {/* Decorative tape */}
                  <div className="absolute -top-3 left-8 w-24 h-5 washi-tape washi-tape-pink rounded-xs opacity-80" />

                  <div className="flex items-center justify-between border-b border-[#E8DFC8]/60 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.moodEmoji}</span>
                      <div>
                        <span className="block text-xs font-semibold text-[#8B3A4D]">
                          {entry.moodLabel}
                        </span>
                        <span className="block text-[11px] text-[#8B6E60]">
                          {entry.date} · By {entry.senderName}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteResponse(entry.id)}
                      className="p-1.5 text-[#A8988F] hover:text-rose-600 rounded-md hover:bg-[#FAF7F2] cursor-pointer"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Letter body */}
                  <p className="font-serif text-sm sm:text-base text-[#2D2424] leading-relaxed whitespace-pre-line">
                    {entry.letter}
                  </p>

                  {entry.favoriteMemory && (
                    <div className="mt-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8]/60 text-xs text-[#5B473F]">
                      <span className="font-semibold text-[#8B3A4D]">Favorite Memory: </span>
                      <span className="italic">"{entry.favoriteMemory}"</span>
                    </div>
                  )}

                  {/* Stamped Stickers */}
                  {entry.stickers.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-[#E8DFC8]/40 flex items-center gap-2 text-lg">
                      <span className="text-xs text-[#8B6E60] font-sans">Stamped:</span>
                      {entry.stickers.map((stk, i) => (
                        <span key={i} title="Sticker">{stk}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
