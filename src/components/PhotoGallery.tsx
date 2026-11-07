import React, { useState } from 'react';
import { Camera, Plus, ZoomIn, RotateCw, MapPin, Calendar, Tag, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { MemoryPhoto } from '../types';
import { INITIAL_MEMORIES } from '../data/defaultContent';
import { sound } from '../services/soundEffects';

export const PhotoGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(() => {
    try {
      // Clear legacy broken caches
      localStorage.removeItem('college_memories_v1');
      localStorage.removeItem('college_memories_v2');
      localStorage.removeItem('college_memories_v3');
      localStorage.removeItem('college_memories_v4');

      const stored = localStorage.getItem('college_memories_v5');
      if (stored) {
        const parsed: MemoryPhoto[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_MEMORIES.length) {
          // Always ensure the default 10 photos use the active bundled image URLs
          return parsed.map((item, idx) => {
            if (INITIAL_MEMORIES[idx]) {
              return { ...item, url: INITIAL_MEMORIES[idx].url };
            }
            return item;
          });
        }
      }
      localStorage.setItem('college_memories_v5', JSON.stringify(INITIAL_MEMORIES));
      return INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  const [activeFilter, setActiveFilter] = useState('All');
  const [zoomedPhoto, setZoomedPhoto] = useState<MemoryPhoto | null>(null);
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New photo form state
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('College Memory');
  const [newLocation, setNewLocation] = useState('Our College Days');
  const [newNote, setNewNote] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newTapeColor, setNewTapeColor] = useState<'pink' | 'sage' | 'gold' | 'cream'>('pink');

  const tags = ['All', 'College Days', 'Anu Special', 'Memories'];

  const handleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPaperRustle();
    setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    sound.playPaperRustle();
    const photo: MemoryPhoto = {
      id: 'mem-' + Date.now(),
      url: newUrl.trim() || '/images/anu_1.jpg',
      caption: newCaption.trim(),
      date: newDate.trim(),
      location: newLocation.trim(),
      note: newNote.trim() || 'A precious memory that made college days unforgettable.',
      rotation: Math.random() * 6 - 3, // -3 to +3 deg
      tapeColor: newTapeColor,
      tags: ['All', 'College Days', 'Anu Special'],
    };

    const updated = [photo, ...memories];
    setMemories(updated);
    try {
      localStorage.setItem('college_memories_v5', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setIsAddModalOpen(false);
    setNewCaption('');
    setNewNote('');
    setNewUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMemories =
    activeFilter === 'All'
      ? memories
      : memories.filter((m) => m.tags.includes(activeFilter));

  const totalPhotosPlanned = 10;
  const currentPhotoCount = memories.length;
  const remainingSlots = Math.max(0, totalPhotosPlanned - currentPhotoCount);

  return (
    <section id="memories" className="py-16 sm:py-24 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#8B6E60] tracking-wider uppercase mb-2">
            <span>Memory Lane</span>
            <span aria-hidden="true">·</span>
            <span>Anuradha's Polaroid Wall</span>
            <span aria-hidden="true">·</span>
            <span>Tap to Flip</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D2424] text-balance">
            College Memories & Our Dearest Anu
          </h2>
          <p className="mt-2 text-sm text-[#6B5E59]">
            Back in college we talked for hours about everything. We haven't met since then, but these memories are forever frozen in time. Tap any polaroid to flip it and read the story on the back.
          </p>

          {/* 10-Photo Progress Indicator */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF9F3] border border-[#E8DFC8] text-xs text-[#5B2333] shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#8B3A4D]" />
            <span className="font-semibold">{currentPhotoCount} of 10 Polaroids in Collection</span>
            <span className="text-[#2E5E44] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Complete Keepsake Album
            </span>
          </div>
        </div>

        {/* Filter controls & Add button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-[#E8DFC8]">
          <div className="flex items-center gap-1.5 p-1 bg-[#F2ECE4] rounded-lg overflow-x-auto max-w-full">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  sound.playChime(500);
                  setActiveFilter(tag);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap capitalize ${
                  activeFilter === tag
                    ? 'bg-white text-[#5B2333] shadow-xs'
                    : 'text-[#6B5E59] hover:text-[#2D2424]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              sound.playChime(600);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#8B3A4D] hover:bg-[#6F2B3B] rounded-full transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Pin a Polaroid</span>
          </button>
        </div>

        {/* Polaroids Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredMemories.map((mem) => {
            const isFlipped = !!flippedIds[mem.id];
            const tapeClass =
              mem.tapeColor === 'pink'
                ? 'washi-tape-pink'
                : mem.tapeColor === 'sage'
                ? 'washi-tape-sage'
                : mem.tapeColor === 'gold'
                ? 'washi-tape-gold'
                : 'washi-tape';

            return (
              <div
                key={mem.id}
                className="relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  transform: `rotate(${mem.rotation}deg)`,
                }}
                onClick={() => {
                  sound.playChime(450);
                  setZoomedPhoto(mem);
                }}
              >
                {/* Washi tape topper */}
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape ${tapeClass} rounded-xs z-20 pointer-events-none shadow-xs`}
                />

                {/* Polaroid Frame */}
                <div className="bg-white p-4 pt-5 pb-5 rounded-sm polaroid-shadow border border-[#E8DFC8]/60 relative min-h-[400px] flex flex-col justify-between">
                  {!isFlipped ? (
                    /* Front side */
                    <>
                      <div className="relative aspect-4/5 w-full bg-[#FAF7F2] rounded-xs overflow-hidden mb-3 border border-black/5">
                        <img
                          src={mem.url}
                          alt={mem.caption}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.fallbackTried) {
                              target.dataset.fallbackTried = 'true';
                              target.src = `./images/${mem.id.replace('mem-', 'anu_')}.jpg`;
                            }
                          }}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <ZoomIn className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="pt-1">
                        <p className="font-handwriting text-xl text-[#2D2424] leading-tight font-medium">
                          {mem.caption}
                        </p>

                        <div className="mt-3 flex items-center justify-between text-[11px] text-[#8B6E60] font-sans">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{mem.date}</span>
                          </div>

                          <button
                            onClick={(e) => handleFlip(mem.id, e)}
                            className="flex items-center gap-1 text-[#8B3A4D] hover:underline cursor-pointer font-medium"
                          >
                            <RotateCw className="w-3 h-3" />
                            <span>Flip note</span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Back side (Secret Note) */
                    <div className="h-full flex flex-col justify-between py-4 px-2">
                      <div>
                        <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-2 mb-3">
                          <span className="text-[11px] uppercase tracking-wider text-[#8B6E60] font-sans">
                            College Memory Note
                          </span>
                          <span className="font-handwriting text-sm text-[#8B3A4D]">To Anu (Anuradha)</span>
                        </div>
                        <p className="font-handwriting text-xl sm:text-2xl text-[#2D2424] leading-relaxed">
                          "{mem.note}"
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#E8DFC8]/60 flex items-center justify-between text-[11px] text-[#8B6E60]">
                        {mem.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-[130px]">{mem.location}</span>
                          </div>
                        )}
                        <button
                          onClick={(e) => handleFlip(mem.id, e)}
                          className="text-[#8B3A4D] font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>View Photo</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Reserved slots for the next 5 photos */}
          {remainingSlots > 0 &&
            [...Array(remainingSlots)].map((_, idx) => (
              <div
                key={`placeholder-${idx}`}
                onClick={() => {
                  sound.playChime(500);
                  setIsAddModalOpen(true);
                }}
                className="border-2 border-dashed border-[#D6C7B2] rounded-xl p-6 min-h-[380px] flex flex-col items-center justify-center text-center bg-white/40 hover:bg-white/70 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF0DC] flex items-center justify-center text-[#8B6E60] mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 text-[#A67C37]" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#5B2333]">
                  Polaroid #{currentPhotoCount + idx + 1}
                </h4>
                <p className="text-xs text-[#8B6E60] mt-1 max-w-[180px]">
                  Reserved for Anu's next batch of photos. Tap to pin now!
                </p>
                <span className="mt-3 text-[11px] text-[#8B3A4D] font-medium group-hover:underline">
                  + Add Photo Here
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Zoom Lightbox Modal */}
      {zoomedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setZoomedPhoto(null)}
        >
          <div
            className="bg-white p-5 sm:p-7 rounded-lg max-w-2xl w-full border border-[#E8DFC8] shadow-2xl relative max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setZoomedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full text-[#6B5E59] hover:bg-[#F2ECE4] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-4/5 max-h-[60vh] w-full bg-[#FAF7F2] rounded-xs overflow-hidden mb-4 flex items-center justify-center">
              <img
                src={zoomedPhoto.url}
                alt={zoomedPhoto.caption}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallbackTried) {
                    target.dataset.fallbackTried = 'true';
                    target.src = `./images/${zoomedPhoto.id.replace('mem-', 'anu_')}.jpg`;
                  }
                }}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-handwriting text-2xl sm:text-3xl text-[#2D2424]">
                {zoomedPhoto.caption}
              </h3>
              <p className="text-sm text-[#5B473F] bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DFC8]/60 font-sans leading-relaxed">
                {zoomedPhoto.note}
              </p>
              <div className="flex items-center justify-between text-xs text-[#8B6E60] pt-2">
                <span>{zoomedPhoto.date}</span>
                {zoomedPhoto.location && <span>📍 {zoomedPhoto.location}</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Memory Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-[#FCF9F3] rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#E8DFC8] shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#6B5E59] hover:bg-[#F2ECE4] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#2D2424] mb-1">
              Pin a Memory for Anu
            </h3>
            <p className="text-xs text-[#7A6B63] mb-5">
              Upload a photo or paste a link, add a caption, and write a secret note for the back of the polaroid.
            </p>

            <form onSubmit={handleAddMemory} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#5B473F] mb-1">
                  Upload Photo OR Paste Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="/images/anu_1.jpg or paste link"
                    className="flex-1 p-2 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                  />
                  <label className="px-3 py-2 bg-[#F2ECE4] hover:bg-[#EBE2D7] text-[#5B2333] text-xs font-medium rounded-lg cursor-pointer flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5B473F] mb-1">
                  Polaroid Caption (Front)
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Endless conversations & radiant laughs"
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#5B473F] mb-1">
                    Date / Time
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. College Memories"
                    className="w-full p-2 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#5B473F] mb-1">
                    Spot / Memory
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. College Days"
                    className="w-full p-2 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5B473F] mb-1">
                  Secret Note (Written on the Back)
                </label>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="What made this memory or conversation with Anu unforgettable?"
                  className="w-full p-2.5 text-xs rounded-lg border border-[#E8DFC8] bg-white text-[#2D2424] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#5B473F] mb-1">
                  Washi Tape Style
                </label>
                <div className="flex gap-3">
                  {(['pink', 'sage', 'gold', 'cream'] as const).map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewTapeColor(color)}
                      className={`px-3 py-1 text-xs rounded-md border capitalize cursor-pointer ${
                        newTapeColor === color
                          ? 'border-[#8B3A4D] bg-[#F4D2D7]/40 text-[#5B2333] font-medium'
                          : 'border-[#E8DFC8] text-[#7A6B63]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#6B5E59] hover:bg-[#F2ECE4] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-medium text-white bg-[#8B3A4D] hover:bg-[#6F2B3B] rounded-full transition-colors cursor-pointer"
                >
                  Pin to Memory Wall
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
