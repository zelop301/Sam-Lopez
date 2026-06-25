// Web Audio Synthesizer for Retro-Futuristic and Mechanical Gaming Sound FX

export interface ChiptuneTrack {
  id: string;
  title: string;
  description: string;
  bpm: number;
  melody: string[];
  bass: string[];
}

const NOTE_FREQS: Record<string, number> = {
  // Octave 2
  "C2": 65.41, "C#2": 69.30, "D2": 73.42, "D#2": 77.78, "E2": 82.41, "F2": 87.31, "F#2": 92.50, "G2": 98.00, "G#2": 103.83, "A2": 110.00, "A#2": 116.54, "B2": 123.47,
  // Octave 3
  "C3": 130.81, "C#3": 138.59, "D3": 146.83, "D#3": 155.56, "E3": 164.81, "F3": 174.61, "F#3": 185.00, "G3": 196.00, "G#3": 207.65, "A3": 220.00, "A#3": 233.08, "B3": 246.94,
  // Octave 4
  "C4": 261.63, "C#4": 277.18, "D4": 293.66, "D#4": 311.13, "E4": 329.63, "F4": 349.23, "F#4": 369.99, "G4": 392.00, "G#4": 415.30, "A4": 440.00, "A#4": 466.16, "B4": 493.88,
  // Octave 5
  "C5": 523.25, "C#5": 554.37, "D5": 587.33, "D#5": 622.25, "E5": 659.25, "F5": 698.46, "F#5": 739.99, "G5": 783.99, "G#5": 830.61, "A5": 880.00, "A#5": 932.33, "B5": 987.77,
  // Rest
  "-": 0
};

class AudioSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private musicVolume: number = 0.5; // Default music volume level
  private activeTrackId: string | null = null;
  private isPlayingMusic: boolean = false;
  private timerId: any = null;
  private currentStep: number = 0;
  private noteCallbacks: Array<(trackId: string, step: number, note: string, bassNote: string) => void> = [];

  // Soundscape properties
  private activeSoundscapeId: string | null = null;
  private isPlayingSoundscape: boolean = false;
  private soundscapeVolume: number = 0.4; // Default soundscape volume
  private soundscapeNodes: {
    gainNode?: GainNode;
    sources?: any[];
    intervals?: any[];
  } = {};

  // List of soundscapes
  public soundscapes = [
    {
      id: "cyber-city",
      nameEn: "Cyber City Shift",
      nameJa: "サイバーシティ・シフト",
      descriptionEn: "Deep neon buzzes, dynamic hovercar sweeps, and low traffic hums",
      descriptionJa: "重厚なネオンバズ音、飛び交うホバーカーの風切り音、都市の環境ハミング"
    },
    {
      id: "rainy-cafe",
      nameEn: "Rainy Retro Cafe",
      nameJa: "雨のレトロカフェ",
      descriptionEn: "Cozy organic rain patter, coffee shop murmurs, and warm porcelain clinks",
      descriptionJa: "しっとりとした雨音、温かみのあるカップの摩擦音、心地よいカフェ空間"
    },
    {
      id: "data-center",
      nameEn: "Sub-Zero Data Center",
      nameJa: "極冷データセンター",
      descriptionEn: "Steady mainframe cooling fans, electrical drive hum, and fiber optic data blips",
      descriptionJa: "メインフレームの冷却ファン、電気的なサーバーハミング、明滅する光通信ノイズ"
    }
  ];

  // Complete library of custom crafted vintage retro gaming soundtrack loops
  public tracks: ChiptuneTrack[] = [
    {
      id: "track-neon",
      title: "Neon Cyber Horizon",
      description: "Fast-driving, futuristic 8-bit synthesizer baseline",
      bpm: 125,
      melody: [
        "A4", "B4", "C5", "E5", "C5", "E5", "G5", "E5",
        "A4", "B4", "C5", "E5", "D5", "B4", "G4", "E4",
        "A4", "B4", "C5", "E5", "C5", "E5", "G5", "A5",
        "E5", "D5", "C5", "B4", "A4", "-", "-", "-"
      ],
      bass: [
        "A2", "A2", "A2", "A2", "E3", "E3", "G3", "G3",
        "A2", "A2", "A2", "A2", "D3", "D3", "B2", "G2",
        "A2", "A2", "A2", "A2", "E3", "E3", "G3", "G3",
        "C3", "C3", "D3", "D3", "A2", "A2", "A2", "A2"
      ]
    },
    {
      id: "track-quest",
      title: "Heroic Retro Quest",
      description: "Cheerful, nostalgic adventurous RPG chiptune theme",
      bpm: 112,
      melody: [
        "E4", "G4", "A4", "B4", "E5", "D5", "B4", "G4",
        "A4", "B4", "C5", "B4", "A4", "G4", "E4", "D4",
        "E4", "G4", "A4", "B4", "E5", "D5", "G5", "E5",
        "B4", "C5", "D5", "D5", "E5", "-", "-", "-"
      ],
      bass: [
        "C3", "C3", "G3", "G3", "A3", "A3", "E3", "E3",
        "F3", "F3", "C3", "C3", "D3", "D3", "G3", "G3",
        "C3", "C3", "G3", "G3", "A3", "A3", "E3", "E3",
        "F3", "F3", "G3", "G3", "C3", "C3", "C3", "C3"
      ]
    },
    {
      id: "track-boss",
      title: "Viper Battle Theme",
      description: "High tension competitive hardware battle loop",
      bpm: 138,
      melody: [
        "D4", "-", "F4", "D4", "G4", "D4", "G#4", "G4",
        "F4", "D4", "C4", "C#4", "D4", "-", "-", "-",
        "D4", "-", "F4", "D4", "G4", "D4", "A4", "G#4",
        "G4", "F4", "D4", "C4", "D4", "-", "-", "-"
      ],
      bass: [
        "D2", "D3", "F2", "F3", "G2", "G3", "G#2", "G2",
        "F2", "D2", "C2", "C#2", "D2", "D2", "D2", "D2",
        "D2", "D3", "F2", "F3", "G2", "G3", "A2", "G#2",
        "G2", "F2", "D2", "C2", "D2", "D2", "D2", "D2"
      ]
    },
    {
      id: "track-sanctuary",
      title: "Setup Sanctuary",
      description: "Chilled ambient mechanical keyboard vibes",
      bpm: 88,
      melody: [
        "E4", "G4", "A4", "B4", "C5", "A4", "B4", "G4",
        "A4", "F4", "G4", "E4", "F4", "-", "G4", "-",
        "E4", "G4", "A4", "B4", "C5", "A4", "B5", "A5",
        "G5", "E5", "C5", "B4", "A4", "-", "-", "-"
      ],
      bass: [
        "A2", "A2", "C3", "C3", "F3", "F3", "E3", "E3",
        "D3", "D3", "E3", "E3", "A2", "A2", "B2", "E3",
        "A2", "A2", "C3", "C3", "F3", "F3", "E3", "E3",
        "D3", "D3", "E3", "E3", "A2", "A2", "A2", "A2"
      ]
    }
  ];

  constructor() {
    // Read cached preference from localStorage
    if (typeof window !== 'undefined') {
      const savedMute = localStorage.getItem('zelo_sound_muted');
      // Default to muted to conform with browser auto-play prevention guidelines
      this.isMuted = savedMute !== 'false';
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    // Resume context if suspended (common browser defense against autoplay)
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('zelo_sound_muted', String(this.isMuted));
    
    if (!this.isMuted) {
      this.playPowerOn();
      // If we had active music playing, resume the sequencer
      if (this.isPlayingMusic && this.activeTrackId) {
        this.startMusic(this.activeTrackId);
      }
      // If we had an active soundscape playing, resume it
      if (this.isPlayingSoundscape && this.activeSoundscapeId) {
        this.startSoundscape(this.activeSoundscapeId);
      }
    } else {
      this.playPowerOff();
      this.stopSoundscapeNodes();
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
  }

  // Chiptune Music Sequencer Implementation
  public setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public getActiveTrackId(): string | null {
    return this.activeTrackId;
  }

  public getIsPlayingMusic(): boolean {
    return this.isPlayingMusic;
  }

  public addNoteCallback(cb: (trackId: string, step: number, note: string, bassNote: string) => void) {
    this.noteCallbacks.push(cb);
  }

  public removeNoteCallback(cb: (trackId: string, step: number, note: string, bassNote: string) => void) {
    this.noteCallbacks = this.noteCallbacks.filter(c => c !== cb);
  }

  public playJamNote(freq: number) {
    if (this.isMuted) return;
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      // Sweet triangle-square retro gaming sound wave hybrid
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audio.currentTime);

      gainNode.gain.setValueAtTime(0, audio.currentTime);
      gainNode.gain.linearRampToValueAtTime(this.musicVolume * 0.12, audio.currentTime + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.18);

      osc.start(audio.currentTime);
      osc.stop(audio.currentTime + 0.18);
    } catch (e) {
      console.warn('Error playing jam note:', e);
    }
  }

  private playNote(freq: number, type: 'square' | 'triangle' | 'sawtooth' | 'sine', duration: number, volMultiplier: number = 1.0) {
    if (this.isMuted) return;
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audio.currentTime);

      const computedVol = this.musicVolume * 0.1 * volMultiplier;
      gainNode.gain.setValueAtTime(0, audio.currentTime);
      gainNode.gain.linearRampToValueAtTime(computedVol, audio.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration - 0.01);

      osc.start(audio.currentTime);
      osc.stop(audio.currentTime + duration);
    } catch (e) {
      console.warn('Error playing sequencer note:', e);
    }
  }

  public startMusic(trackId: string) {
    this.stopMusic();
    this.initCtx();

    const track = this.tracks.find(t => t.id === trackId);
    if (!track) return;

    this.activeTrackId = trackId;
    this.isPlayingMusic = true;
    this.currentStep = 0;

    // Tempo multiplier: calculate step length. 30000 / BPM is standard 8th note duration.
    const stepDurationMs = 30000 / track.bpm;
    const stepDurationSec = stepDurationMs / 1000;

    const playSequencerStep = () => {
      if (!this.isPlayingMusic || this.isMuted) return;

      const currentTrack = this.tracks.find(t => t.id === this.activeTrackId);
      if (!currentTrack) return;

      const stepIdx = this.currentStep % 32;

      const melNoteName = currentTrack.melody[stepIdx];
      const bassNoteName = currentTrack.bass[stepIdx];

      const melFreq = NOTE_FREQS[melNoteName] || 0;
      const bassFreq = NOTE_FREQS[bassNoteName] || 0;

      // Voice 1 - Lead Melody (Chiptune classic square wave)
      if (melFreq > 0) {
        this.playNote(melFreq, 'square', stepDurationSec * 0.85, 0.45);
      }

      // Voice 2 - Round Chiptune Bassline (Triangle wave)
      if (bassFreq > 0) {
        this.playNote(bassFreq, 'triangle', stepDurationSec * 0.95, 0.8);
      }

      // Fire callbacks to notify UI changes
      this.noteCallbacks.forEach(cb => {
        try {
          cb(currentTrack.id, stepIdx, melNoteName, bassNoteName);
        } catch (e) {
          // ignore
        }
      });

      this.currentStep++;
    };

    playSequencerStep();
    this.timerId = setInterval(playSequencerStep, stepDurationMs);
  }

  public stopMusic() {
    this.isPlayingMusic = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  // Plays a subtle modern digital hover bleep
  public playHover() {
    if (this.isMuted) return;
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      // Cyberpunk clean triangle wave
      osc.type = 'triangle';
      
      const now = audio.currentTime;
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.06);

      // Very subtle brief gain decay to prevent clicking static
      gainNode.gain.setValueAtTime(0.005, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      console.warn('Audio playHover error:', e);
    }
  }

  // Plays a mechanical-digital switch click
  public playClick() {
    if (this.isMuted) return;
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      // Mechanical square wave clicks
      osc.type = 'sine';
      
      const now = audio.currentTime;
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(400, now + 0.02);

      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio playClick error:', e);
    }
  }

  // Plays a playful, retro digital bubble pop sound effect
  public playPop() {
    if (this.isMuted) return;
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      osc.type = 'sine';
      
      const now = audio.currentTime;
      // Classic quick ascending pop frequency sequence
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn('Audio playPop error:', e);
    }
  }

  // Plays a fast, retro gaming blip sound effect
  public playBlip() {
    if (this.isMuted) return;
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      osc.type = 'square';
      
      const now = audio.currentTime;
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.setValueAtTime(1400, now + 0.03);

      gainNode.gain.setValueAtTime(0.015, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      console.warn('Audio playBlip error:', e);
    }
  }

  // Plays a low bass dynamic page scroll thud
  public playScroll() {
    if (this.isMuted) return;
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const osc = audio.createOscillator();
      const gainNode = audio.createGain();

      osc.connect(gainNode);
      gainNode.connect(audio.destination);

      osc.type = 'sine';
      
      const now = audio.currentTime;
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn('Audio playScroll error:', e);
    }
  }

  // Classic retro rising game chime on power-on
  public playPowerOn() {
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const now = audio.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 major chord

      notes.forEach((freq, index) => {
        const osc = audio.createOscillator();
        const gainNode = audio.createGain();

        osc.connect(gainNode);
        gainNode.connect(audio.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.06);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.04, now + index * 0.06 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.06 + 0.2);

        osc.start(now + index * 0.06);
        osc.stop(now + index * 0.06 + 0.2);
      });
    } catch (e) {
      console.warn('Audio playPowerOn error:', e);
    }
  }

  // Play falling chime on muting
  public playPowerOff() {
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const now = audio.currentTime;
      const notes = [523.25, 392.00, 329.63, 220.00]; // descending minor/major transition

      notes.forEach((freq, index) => {
        const osc = audio.createOscillator();
        const gainNode = audio.createGain();

        osc.connect(gainNode);
        gainNode.connect(audio.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.05);

        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.03, now + index * 0.05 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.05 + 0.15);

        osc.start(now + index * 0.05);
        osc.stop(now + index * 0.05 + 0.15);
      });
    } catch (e) {
      console.warn('Audio playPowerOff error:', e);
    }
  }

  // Modern high-fidelity shimmering synthesizer win fanfare and chord swell
  public playSuccess() {
    try {
      const audio = this.initCtx();
      if (!audio) return;

      const now = audio.currentTime;

      // 1. Warm background synth pad chord swell (C4, F4, G4, C5)
      // This creates a warm, emotional foundation for the win effect
      const padNotes = [261.63, 349.23, 392.00, 523.25];
      padNotes.forEach((freq) => {
        const osc = audio.createOscillator();
        const gainNode = audio.createGain();

        osc.connect(gainNode);
        gainNode.connect(audio.destination);

        // Soft triangle wave for the pad
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Elegant swelling volume envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.015, now + 0.2); // attack
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.6); // long decay

        osc.start(now);
        osc.stop(now + 1.6);
      });

      // 2. Crystalline ascending chime sweep with active LFO vibrato
      // High-fidelity sparkling notes
      const chimeNotes = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98];

      chimeNotes.forEach((freq, index) => {
        const timeOffset = index * 0.055; // fast cascade
        const noteTime = now + timeOffset;

        // Fundamental oscillator
        const osc = audio.createOscillator();
        // Upper harmonic helper for physical metallic/glassy timbre
        const harmonicOsc = audio.createOscillator();
        // Shimmer LFO for beautiful high-fidelity vibrato
        const lfo = audio.createOscillator();
        
        const gainNode = audio.createGain();
        const lfoGain = audio.createGain();

        // Connect LFO to modulate oscillator frequency
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfoGain.connect(harmonicOsc.frequency);

        osc.connect(gainNode);
        harmonicOsc.connect(gainNode);
        gainNode.connect(audio.destination);

        // Standard sine for pure tones, with a slight triangle edge on the fundamental
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        // Crisp upper fifth or octave harmonic
        harmonicOsc.type = 'sine';
        harmonicOsc.frequency.setValueAtTime(freq * 1.5, noteTime);

        // LFO config (7.5 Hz shimmering vibrato)
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(7.5, noteTime);
        lfoGain.gain.setValueAtTime(6, noteTime); // depth of frequency modulation

        // Exquisite fast-attack bell envelope
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.setValueAtTime(0, noteTime);
        gainNode.gain.linearRampToValueAtTime(0.025, noteTime + 0.01); // fast attack
        gainNode.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.85); // elegant ring-out

        // Start nodes
        lfo.start(noteTime);
        osc.start(noteTime);
        harmonicOsc.start(noteTime);

        // Stop nodes cleanly
        lfo.stop(noteTime + 0.9);
        osc.stop(noteTime + 0.9);
        harmonicOsc.stop(noteTime + 0.9);
      });
    } catch (e) {
      console.warn('Audio playSuccess error:', e);
    }
  }

  // SOUNDSCAPE SYNTHESIS & TELEMETRY CONTROL ENGINE
  private createNoiseBuffer(durationSec: number = 2): AudioBuffer | null {
    const audio = this.initCtx();
    if (!audio) return null;
    const bufferSize = audio.sampleRate * durationSec;
    const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  public getActiveSoundscapeId(): string | null {
    return this.activeSoundscapeId;
  }

  public getIsPlayingSoundscape(): boolean {
    return this.isPlayingSoundscape;
  }

  public setSoundscapeVolume(volume: number) {
    this.soundscapeVolume = Math.max(0, Math.min(1, volume));
    if (this.soundscapeNodes.gainNode) {
      try {
        const audio = this.initCtx();
        if (audio) {
          this.soundscapeNodes.gainNode.gain.setValueAtTime(this.soundscapeVolume, audio.currentTime);
        }
      } catch (e) {}
    }
  }

  public getSoundscapeVolume(): number {
    return this.soundscapeVolume;
  }

  public stopSoundscapeNodes() {
    if (this.soundscapeNodes.sources) {
      this.soundscapeNodes.sources.forEach(src => {
        try {
          src.stop();
          src.disconnect();
        } catch (e) {}
      });
      this.soundscapeNodes.sources = [];
    }

    if (this.soundscapeNodes.intervals) {
      this.soundscapeNodes.intervals.forEach(timer => clearInterval(timer));
      this.soundscapeNodes.intervals = [];
    }

    if (this.soundscapeNodes.gainNode) {
      try {
        this.soundscapeNodes.gainNode.disconnect();
      } catch (e) {}
      this.soundscapeNodes.gainNode = undefined;
    }
  }

  public stopSoundscape() {
    this.isPlayingSoundscape = false;
    this.stopSoundscapeNodes();
    this.activeSoundscapeId = null;
  }

  public startSoundscape(soundscapeId: string) {
    this.stopSoundscapeNodes();
    this.initCtx();
    
    this.activeSoundscapeId = soundscapeId;
    this.isPlayingSoundscape = true;

    if (this.isMuted) return;

    const audio = this.ctx;
    if (!audio) return;

    const masterGain = audio.createGain();
    masterGain.gain.setValueAtTime(this.soundscapeVolume, audio.currentTime);
    masterGain.connect(audio.destination);

    this.soundscapeNodes = {
      gainNode: masterGain,
      sources: [],
      intervals: []
    };

    if (soundscapeId === 'cyber-city') {
      // 1. Deep drone (sawtooth + triangle)
      const droneOsc1 = audio.createOscillator();
      const droneOsc2 = audio.createOscillator();
      const droneFilter = audio.createBiquadFilter();
      const droneGain = audio.createGain();

      droneOsc1.type = 'sawtooth';
      droneOsc1.frequency.setValueAtTime(55, audio.currentTime); // A1
      droneOsc2.type = 'triangle';
      droneOsc2.frequency.setValueAtTime(110, audio.currentTime); // A2

      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(140, audio.currentTime);

      droneGain.gain.setValueAtTime(0.05, audio.currentTime);

      droneOsc1.connect(droneFilter);
      droneOsc2.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(masterGain);

      droneOsc1.start(audio.currentTime);
      droneOsc2.start(audio.currentTime);

      this.soundscapeNodes.sources.push(droneOsc1, droneOsc2);

      // 2. Neon Buzz (60Hz electric hum)
      const buzzOsc = audio.createOscillator();
      const buzzLfo = audio.createOscillator();
      const buzzLfoGain = audio.createGain();
      const buzzGain = audio.createGain();

      buzzOsc.type = 'sine';
      buzzOsc.frequency.setValueAtTime(60, audio.currentTime);

      buzzLfo.type = 'sine';
      buzzLfo.frequency.setValueAtTime(7.5, audio.currentTime);
      buzzLfoGain.gain.setValueAtTime(0.006, audio.currentTime);

      buzzGain.gain.setValueAtTime(0.012, audio.currentTime);

      buzzLfo.connect(buzzLfoGain);
      buzzLfoGain.connect(buzzGain.gain);

      buzzOsc.connect(buzzGain);
      buzzGain.connect(masterGain);

      buzzOsc.start(audio.currentTime);
      buzzLfo.start(audio.currentTime);

      this.soundscapeNodes.sources.push(buzzOsc, buzzLfo);

      // 3. Dynamic Hovercar Sweeps
      const hovercarInterval = setInterval(() => {
        if (this.isMuted || !this.isPlayingSoundscape) return;
        try {
          const innerAudio = this.initCtx();
          if (!innerAudio) return;
          const noiseBuffer = this.createNoiseBuffer(2.5);
          if (!noiseBuffer) return;

          const noiseNode = innerAudio.createBufferSource();
          noiseNode.buffer = noiseBuffer;

          const filterNode = innerAudio.createBiquadFilter();
          filterNode.type = 'bandpass';
          filterNode.Q.setValueAtTime(1.8, innerAudio.currentTime);

          const sweepGain = innerAudio.createGain();
          
          const pannerNode = innerAudio.createStereoPanner ? innerAudio.createStereoPanner() : null;

          if (pannerNode) {
            noiseNode.connect(filterNode);
            filterNode.connect(sweepGain);
            sweepGain.connect(pannerNode);
            pannerNode.connect(masterGain);
          } else {
            noiseNode.connect(filterNode);
            filterNode.connect(sweepGain);
            sweepGain.connect(masterGain);
          }

          const now = innerAudio.currentTime;
          const duration = 2.5;
          
          const startFreq = 180 + Math.random() * 150;
          const endFreq = 750 + Math.random() * 600;
          filterNode.frequency.setValueAtTime(startFreq, now);
          filterNode.frequency.exponentialRampToValueAtTime(endFreq, now + duration * 0.4);
          filterNode.frequency.exponentialRampToValueAtTime(startFreq * 0.4, now + duration);

          sweepGain.gain.setValueAtTime(0, now);
          sweepGain.gain.linearRampToValueAtTime(0.14, now + duration * 0.4);
          sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

          if (pannerNode) {
            const startPan = Math.random() > 0.5 ? -1 : 1;
            pannerNode.pan.setValueAtTime(startPan, now);
            pannerNode.pan.linearRampToValueAtTime(-startPan, now + duration);
          }

          noiseNode.start(now);
          noiseNode.stop(now + duration);
        } catch (err) {
          console.warn("Hovercar sweep error:", err);
        }
      }, 4800);
      this.soundscapeNodes.intervals.push(hovercarInterval);

    } else if (soundscapeId === 'rainy-cafe') {
      // 1. Organic Rain Filtered Noise
      const rainBuffer = this.createNoiseBuffer(3);
      if (rainBuffer) {
        const rainNode = audio.createBufferSource();
        rainNode.buffer = rainBuffer;
        rainNode.loop = true;

        const rainFilter = audio.createBiquadFilter();
        rainFilter.type = 'bandpass';
        rainFilter.frequency.setValueAtTime(1100, audio.currentTime);
        rainFilter.Q.setValueAtTime(0.8, audio.currentTime);

        const rainGain = audio.createGain();
        rainGain.gain.setValueAtTime(0.12, audio.currentTime);

        rainNode.connect(rainFilter);
        rainFilter.connect(rainGain);
        rainGain.connect(masterGain);
        
        rainNode.start(audio.currentTime);
        this.soundscapeNodes.sources.push(rainNode);
      }

      // 2. Slow Low-Passed Cafe Murmur Talk
      const murmurBuffer = this.createNoiseBuffer(3);
      if (murmurBuffer) {
        const murmurNode = audio.createBufferSource();
        murmurNode.buffer = murmurBuffer;
        murmurNode.loop = true;

        const murmurFilter = audio.createBiquadFilter();
        murmurFilter.type = 'lowpass';
        murmurFilter.frequency.setValueAtTime(320, audio.currentTime);

        const murmurGain = audio.createGain();
        murmurGain.gain.setValueAtTime(0.04, audio.currentTime);

        const murmurLfo = audio.createOscillator();
        const murmurLfoGain = audio.createGain();
        murmurLfo.type = 'sine';
        murmurLfo.frequency.setValueAtTime(0.14, audio.currentTime);
        murmurLfoGain.gain.setValueAtTime(0.015, audio.currentTime);

        murmurLfo.connect(murmurLfoGain);
        murmurLfoGain.connect(murmurGain.gain);

        murmurNode.connect(murmurFilter);
        murmurFilter.connect(murmurGain);
        murmurGain.connect(masterGain);
        
        murmurNode.start(audio.currentTime);
        murmurLfo.start(audio.currentTime);

        this.soundscapeNodes.sources.push(murmurNode, murmurLfo);
      }

      // 3. Sparse Cozy Porcelain Cup Clinks
      const cafeInterval = setInterval(() => {
        if (this.isMuted || !this.isPlayingSoundscape) return;
        try {
          const innerAudio = this.initCtx();
          if (!innerAudio) return;
          const now = innerAudio.currentTime;

          const osc = innerAudio.createOscillator();
          const harmonic = innerAudio.createOscillator();
          const clinkGain = innerAudio.createGain();

          osc.type = 'sine';
          harmonic.type = 'sine';

          const freq = 1900 + Math.random() * 2100;
          osc.frequency.setValueAtTime(freq, now);
          harmonic.frequency.setValueAtTime(freq * 1.58, now);

          clinkGain.gain.setValueAtTime(0, now);
          clinkGain.gain.linearRampToValueAtTime(0.02, now + 0.003);
          clinkGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14 + Math.random() * 0.12);

          osc.connect(clinkGain);
          harmonic.connect(clinkGain);
          clinkGain.connect(masterGain);

          osc.start(now);
          harmonic.start(now);
          osc.stop(now + 0.3);
          harmonic.stop(now + 0.3);
        } catch (err) {
          console.warn("Porcelain clink error:", err);
        }
      }, 5400);
      this.soundscapeNodes.intervals.push(cafeInterval);

    } else if (soundscapeId === 'data-center') {
      // 1. Continuous Electric hum
      const humOsc1 = audio.createOscillator();
      const humOsc2 = audio.createOscillator();
      const humGain = audio.createGain();

      humOsc1.type = 'sine';
      humOsc1.frequency.setValueAtTime(115, audio.currentTime);
      humOsc2.type = 'sine';
      humOsc2.frequency.setValueAtTime(230, audio.currentTime);

      humGain.gain.setValueAtTime(0.035, audio.currentTime);

      humOsc1.connect(humGain);
      humOsc2.connect(humGain);
      humGain.connect(masterGain);

      humOsc1.start(audio.currentTime);
      humOsc2.start(audio.currentTime);

      this.soundscapeNodes.sources.push(humOsc1, humOsc2);

      // 2. High density cooling server fan (bandpassed noise)
      const fanBuffer = this.createNoiseBuffer(2.0);
      if (fanBuffer) {
        const fanNode = audio.createBufferSource();
        fanNode.buffer = fanBuffer;
        fanNode.loop = true;

        const fanFilter = audio.createBiquadFilter();
        fanFilter.type = 'bandpass';
        fanFilter.frequency.setValueAtTime(190, audio.currentTime);
        fanFilter.Q.setValueAtTime(1.4, audio.currentTime);

        const fanGain = audio.createGain();
        fanGain.gain.setValueAtTime(0.07, audio.currentTime);

        fanNode.connect(fanFilter);
        fanFilter.connect(fanGain);
        fanGain.connect(masterGain);

        fanNode.start(audio.currentTime);
        this.soundscapeNodes.sources.push(fanNode);
      }

      // 3. Network blips & Storage drives seeking read/write clicks
      const dcInterval = setInterval(() => {
        if (this.isMuted || !this.isPlayingSoundscape) return;
        try {
          const innerAudio = this.initCtx();
          if (!innerAudio) return;
          const now = innerAudio.currentTime;

          // Blip sound
          if (Math.random() > 0.25) {
            const blipOsc = innerAudio.createOscillator();
            const blipGain = innerAudio.createGain();

            blipOsc.type = 'sine';
            blipOsc.frequency.setValueAtTime(1100 + Math.random() * 900, now);

            blipGain.gain.setValueAtTime(0, now);
            blipGain.gain.linearRampToValueAtTime(0.007, now + 0.004);
            blipGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

            blipOsc.connect(blipGain);
            blipGain.connect(masterGain);

            blipOsc.start(now);
            blipOsc.stop(now + 0.1);
          }

          // Hard drive read seek noise
          if (Math.random() > 0.4) {
            const clickDuration = 0.14;
            const clickBuffer = this.createNoiseBuffer(clickDuration);
            if (clickBuffer) {
              const clickNode = innerAudio.createBufferSource();
              clickNode.buffer = clickBuffer;

              const clickFilter = innerAudio.createBiquadFilter();
              clickFilter.type = 'bandpass';
              clickFilter.frequency.setValueAtTime(3200, now);
              clickFilter.Q.setValueAtTime(3.5, now);

              const clickGain = innerAudio.createGain();
              clickGain.gain.setValueAtTime(0, now);
              clickGain.gain.linearRampToValueAtTime(0.014, now + 0.004);
              clickGain.gain.exponentialRampToValueAtTime(0.0001, now + clickDuration);

              clickNode.connect(clickFilter);
              clickFilter.connect(clickGain);
              clickGain.connect(masterGain);

              clickNode.start(now);
              clickNode.stop(now + clickDuration);
            }
          }
        } catch (err) {
          console.warn("Data center simulation error:", err);
        }
      }, 950);
      this.soundscapeNodes.intervals.push(dcInterval);
    }
  }
}

export const audioSystem = new AudioSystem();

