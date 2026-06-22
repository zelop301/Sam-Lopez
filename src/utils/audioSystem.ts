// Web Audio Synthesizer for Retro-Futuristic and Mechanical Gaming Sound FX
class AudioSystem {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

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
    } else {
      this.playPowerOff();
    }
    return this.isMuted;
  }

  public getMutedState(): boolean {
    return this.isMuted;
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
}

export const audioSystem = new AudioSystem();
