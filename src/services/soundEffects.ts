/**
 * Web Audio API ambient music synthesizer and sound effects
 * Zero external audio file dependencies - 100% reliable and lightweight!
 */

export interface SongInfo {
  title: string;
  artist: string;
  tag: string;
  /** Verified Spotify track ID (checked via Spotify oEmbed). Leave undefined if not verified. */
  spotifyId?: string;
  spotifyUrl: string;
  /** Short handwritten note shown while the song plays */
  dedication: string;
  /** Vinyl label / sleeve colour */
  color: string;
}

export const ANU_SONGS: SongInfo[] = [
  {
    title: 'CO2',
    artist: 'Prateek Kuhad',
    tag: 'Warm Indie',
    spotifyId: '3hB9lDLyAClYVZivMMl20N',
    spotifyUrl: 'https://open.spotify.com/track/3hB9lDLyAClYVZivMMl20N',
    dedication:
      'Some songs feel like old conversations. This one feels like ours — easy, warm, and never running out of things to say.',
    color: '#C9746B',
  },
  {
    title: 'Kadhi Tu',
    artist: 'Hrishikesh Ranade · Mumbai Pune Mumbai',
    tag: 'Marathi Nostalgia',
    spotifyUrl: 'https://open.spotify.com/search/Kadhi%20Tu%20Mumbai%20Pune%20Mumbai',
    dedication:
      'A little Marathi magic for you, Anu. Soft like rain, simple like those college afternoons when nothing else mattered.',
    color: '#6F8F72',
  },
  {
    title: 'Kaakan',
    artist: 'Kaakan (Marathi)',
    tag: 'Soulful Classic',
    spotifyUrl: 'https://open.spotify.com/search/Kaakan',
    dedication:
      'Soulful and timeless — the kind of melody that stays with you for years. Just like the friendships that start in college.',
    color: '#B8893B',
  },
  {
    title: 'Paro',
    artist: 'Paro',
    tag: 'Late Night Chats',
    spotifyUrl: 'https://open.spotify.com/search/Paro',
    dedication:
      'For all those late-night talks that went on way longer than they should have. I miss those, Anu.',
    color: '#8B3A4D',
  },
  {
    title: 'Yellow',
    artist: 'Coldplay',
    tag: 'Look at the Stars',
    spotifyId: '3AJwUDP919kvQ9QcozQPxg',
    spotifyUrl: 'https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg',
    dedication:
      '"Look at the stars, look how they shine for you." Today they really do. Happy birthday, Anu ✨',
    color: '#D9A93C',
  },
  {
    title: 'Aarzu',
    artist: 'Aarzu',
    tag: 'College Nostalgia',
    spotifyUrl: 'https://open.spotify.com/search/Aarzu',
    dedication:
      'A small aarzu of mine — that this year we finally meet again, and talk like no time has passed at all.',
    color: '#7C6A9E',
  },
  {
    title: 'Back to Friends',
    artist: 'sombr',
    tag: 'Bittersweet',
    spotifyId: '7qjZnBKE73H4Oxkopwulqe',
    spotifyUrl: 'https://open.spotify.com/track/7qjZnBKE73H4Oxkopwulqe',
    dedication:
      'For every conversation we never got to finish after college. Here\'s to picking them back up — chai on me.',
    color: '#4E6E8E',
  },
  {
    title: 'Sajdaa',
    artist: 'Rahat Fateh Ali Khan, Shankar Mahadevan & Richa Sharma',
    tag: 'Timeless',
    spotifyId: '5upmbnXemLfPvs3d2eyHml',
    spotifyUrl: 'https://open.spotify.com/track/5upmbnXemLfPvs3d2eyHml',
    dedication:
      'A classic for a classic. Some melodies never get old — and some people never stop being special.',
    color: '#5B2333',
  },
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: number | null = null;
  private currentTrackIndex: number = 0;
  private volume: number = 0.5;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft romantic chime when clicking items or unlocking
  public playChime(freq = 523.25) {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);

      gain.gain.setValueAtTime(0.15 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.8);
    } catch {
      // Audio autoplay may be prevented until user interaction
    }
  }

  // Soft candle blow out / whoosh sound
  public playCandleBlow() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.7;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.6);
      filter.Q.value = 3;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.7);
    } catch {
      // ignore
    }
  }

  // Gentle paper rustle / letter unfold sound
  public playPaperRustle() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.25);
    } catch {
      // ignore
    }
  }

  // Wax seal snap sound
  public playWaxSealBreak() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);

      gain.gain.setValueAtTime(0.2 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // ignore
    }
  }

  // Magical sparkle melody for celebration or wish flight
  public playSparkleCelebration() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C E G C E
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playChime(freq);
        }, idx * 90);
      });
    } catch {
      // ignore
    }
  }

  // Ambient romantic music generator
  public toggleBgm(onStateChange?: (playing: boolean) => void): boolean {
    this.initCtx();
    if (this.isBgmPlaying) {
      this.stopBgm();
      onStateChange?.(false);
      return false;
    } else {
      this.startBgm();
      onStateChange?.(true);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public getVolume(): number {
    return this.volume;
  }

  public nextTrack(): number {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % ANU_SONGS.length;
    return this.currentTrackIndex;
  }

  public selectTrack(idx: number): number {
    this.currentTrackIndex = Math.max(0, Math.min(ANU_SONGS.length - 1, idx));
    return this.currentTrackIndex;
  }

  public getTrackName(): string {
    const song = ANU_SONGS[this.currentTrackIndex % ANU_SONGS.length];
    return `${song.title} — ${song.artist}`;
  }

  public getCurrentSong(): SongInfo {
    return ANU_SONGS[this.currentTrackIndex % ANU_SONGS.length];
  }

  public getPlaylist(): SongInfo[] {
    return ANU_SONGS;
  }

  private startBgm() {
    this.isBgmPlaying = true;
    this.initCtx();

    // Scale of soothing notes (Pentatonic F major: F4, G4, A4, C5, D5, F5)
    const scale1 = [349.23, 392.0, 440.0, 523.25, 587.33, 698.46, 880.0];
    const chords = [
      [261.63, 329.63, 392.0], // C major
      [220.0, 261.63, 329.63], // A minor
      [174.61, 220.0, 261.63], // F major
      [196.0, 246.94, 293.66], // G major
    ];

    let chordIdx = 0;
    let step = 0;

    const playStep = () => {
      if (!this.isBgmPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Every 8 steps, play a warm bass chord
      if (step % 8 === 0) {
        const chord = chords[chordIdx % chords.length];
        chordIdx++;
        chord.forEach((freq) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.04 * this.volume, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now);
          osc.stop(now + 3.2);
        });
      }

      // Play soft melody note
      if (Math.random() > 0.25) {
        const freq = scale1[Math.floor(Math.random() * scale1.length)];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = this.currentTrackIndex === 1 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        const duration = 1.2 + Math.random() * 0.8;
        gain.gain.setValueAtTime(0.06 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
      }

      step++;
    };

    // Play every 420ms
    this.bgmInterval = window.setInterval(playStep, 450);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sound = new SoundEngine();
