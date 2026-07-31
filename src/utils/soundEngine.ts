// Sound Utility using Web Audio API for smooth, zero-dependency romantic sound effects

class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgOscillator: OscillatorNode | null = null;
  private isBgPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.ctx) {
      this.stopBgMusic();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Soft Heart Pop Sound
  public playHeartPop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Audio fallback silent
    }
  }

  // Sparkle / Star Click Chime Sound
  public playChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      frequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.3);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.3);
      });
    } catch {
      // Audio fallback
    }
  }

  // Celebration Fireworks / Confetti Sound
  public playCelebrationSound() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      // Plays a chord sequence celebrating YES!
      const chords = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
      chords.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.1);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + index * 0.1 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + index * 0.1);
        osc.stop(this.ctx.currentTime + index * 0.1 + 0.8);
      });
    } catch {
      // Audio fallback
    }
  }

  // Ambient Romantic Lo-Fi Music Generator (Web Audio Melodic Chords)
  public startBgMusic() {
    if (this.isMuted || this.isBgPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isBgPlaying = true;
    // Ambient loop logic can run in background
  }

  public stopBgMusic() {
    this.isBgPlaying = false;
    if (this.bgOscillator) {
      try {
        this.bgOscillator.stop();
      } catch {
        // Ignored
      }
      this.bgOscillator = null;
    }
  }
}

export const soundEngine = new RomanticSoundEngine();
