export interface MemoryPhoto {
  id: string;
  url: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  caption: string;
  date: string;
  location?: string;
  note: string; // The secret note on the back of the polaroid
  rotation: number; // slight tilt for scrapbook aesthetic
  tapeColor: 'pink' | 'sage' | 'gold' | 'cream';
  tags: string[];
}

export interface Letter {
  id: string;
  title: string;
  snippet: string;
  date: string;
  waxColor: 'ruby' | 'gold' | 'emerald' | 'navy';
  content: string[];
  signature: string;
  ps?: string;
}

export interface TimeCapsule {
  id: string;
  unlockTime: string; // e.g. "08:00"
  unlockTitle: string;
  theme: string;
  teaser: string;
  fullMessage: string;
  iconName: string;
  unlockedByDefault?: boolean;
}

export interface VirtualGift {
  id: string;
  title: string;
  subtitle: string;
  boxColor: 'blush' | 'gold' | 'champagne' | 'lavender';
  ribbonColor: 'crimson' | 'cream' | 'rosegold' | 'sage';
  isOpened: boolean;
  type: 'mixtape' | 'star' | 'coupons' | 'jar';
  surpriseContent: {
    heading: string;
    description: string;
    details?: string[];
  };
}

export type MoodType = 'touched' | 'joyful' | 'nostalgic' | 'grateful' | 'butterflies' | 'cozy';

export interface ScrapbookResponseEntry {
  id: string;
  date: string;
  mood: MoodType;
  moodLabel: string;
  moodEmoji: string;
  letter: string;
  favoriteMemory: string;
  stickers: string[];
  washiStyle: string;
  senderName: string;
  timestamp: number;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  relationship: string;
  message: string;
  date: string;
  color: 'yellow' | 'pink' | 'mint' | 'lavender';
  likes: number;
  sticker?: string;
}

export interface BirthdayWish {
  id: string;
  wishText: string;
  timestamp: number;
  blownAt: string;
  delivered: boolean;
}
