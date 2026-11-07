/**
 * Web Audio API ambient music synthesizer and sound effects
 * Zero external audio file dependencies - 100% reliable and lightweight!
 */

export interface SongInfo {
  title: string;
  artist: string;
  tag: string;
  spotifyId: string;
  spotifyUrl: string;
  /** Direct audio stream for immediate autoplay on user selection */
  audioUrl: string;
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
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/2b/9e/3a2b9e23-6381-5513-bfbd-c77a8d82beb0/mzaf_325522060342302711.plus.aac.p.m4a',
    dedication:
      'Some songs feel like old conversations. This one feels like ours — easy, warm, and never running out of things to say.',
    color: '#C9746B',
  },
  {
    title: 'Kadhi Tu',
    artist: 'Hrishikesh Ranade · Mumbai Pune Mumbai',
    tag: 'Marathi Nostalgia',
    spotifyId: '1Avr9Tt4Av7xoX7cUvYJbA',
    spotifyUrl: 'https://open.spotify.com/track/1Avr9Tt4Av7xoX7cUvYJbA',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/63/be/79/63be7947-0ad1-96fb-1cc7-a050ba52af9a/mzaf_11702007319365555238.plus.aac.p.m4a',
    dedication:
      'A little Marathi magic for you, Anu. Soft like rain, simple like those college afternoons when nothing else mattered.',
    color: '#6F8F72',
  },
  {
    title: 'Kaakan',
    artist: 'Shankar Mahadevan & Neha Rajpal',
    tag: 'Soulful Classic',
    spotifyId: '2aQS1Wsx14l7jJuIcfbDj6',
    spotifyUrl: 'https://open.spotify.com/track/2aQS1Wsx14l7jJuIcfbDj6',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/63/0c/cc/630ccccd-2371-2506-57eb-b1db3c8ed408/mzaf_1466094542528583128.plus.aac.p.m4a',
    dedication:
      'Soulful and timeless — the kind of melody that stays with you for years. Just like the friendships that start back in school & college.',
    color: '#B8893B',
  },
  {
    title: 'Paro',
    artist: 'Nej',
    tag: 'Late Night Chats',
    spotifyId: '1cYCjjZ7Grj8tkbtvW7uii',
    spotifyUrl: 'https://open.spotify.com/track/1cYCjjZ7Grj8tkbtvW7uii',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/73/e9/6a/73e96a25-be2e-7ccd-0d9a-7f4726a0ab9a/mzaf_9944694706733457620.plus.aac.p.m4a',
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
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/66/f3/1a/66f31a76-a6ed-cb4c-f353-23310a7ae9a8/mzaf_10593596652344378873.plus.aac.p.m4a',
    dedication:
      '"Look at the stars, look how they shine for you." Today they really do. Happy birthday, Anu ✨',
    color: '#D9A93C',
  },
  {
    title: 'Aarzu',
    artist: 'Hasan Raheem',
    tag: 'College Nostalgia',
    spotifyId: '6I9tCj9zJ2ArGa8348W8no',
    spotifyUrl: 'https://open.spotify.com/track/6I9tCj9zJ2ArGa8348W8no',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/3f/7a/78/3f7a78a3-ed40-2187-859f-9c634d1bc0fb/mzaf_4074112147232822869.plus.aac.p.m4a',
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
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d7/63/7d/d7637dec-cf2d-1455-3398-f1a6340359d0/mzaf_88927986796632454.plus.aac.p.m4a',
    dedication:
      'For every conversation we never got to finish after college. Here\'s to picking them back up — chai on me.',
    color: '#4E6E8E',
  },
  {
    title: 'Sajdaa',
    artist: 'Rahat Fateh Ali Khan & Shreya Ghoshal',
    tag: 'Timeless',
    spotifyId: '5upmbnXemLfPvs3d2eyHml',
    spotifyUrl: 'https://open.spotify.com/track/5upmbnXemLfPvs3d2eyHml',
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7f/2c/10/7f2c10b3-a0e3-caa4-d9ff-8c39019ecaf8/mzaf_2654668297998312906.plus.aac.p.m4a',
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
