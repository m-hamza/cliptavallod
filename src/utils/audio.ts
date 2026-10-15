// Web Audio API Synthesizer and Audio Effects Engine for Clip Tavallod

class AudioStudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingMelody = false;
  private melodyTimeoutIds: number[] = [];
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a single musical note with envelope
  public playNote(freq: number, duration: number = 0.4, type: OscillatorType = 'sine', gainVal: number = 0.3, startTimeOffset: number = 0) {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + startTimeOffset;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // ADSR Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainVal, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Play Happy Birthday Melodies using Web Audio Synthesizer
  public playSynthMelody(type: 'persian' | 'classic' | 'upbeat' | 'waltz' | 'chill', loop: boolean = true) {
    this.stopMelody();
    this.initCtx();
    this.isPlayingMelody = true;

    // Frequencies (Hz) for notes
    const N = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, Bb4: 466.16, B4: 493.88,
      C5: 523.25, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
    };

    let sequence: { note: number; duration: number; delay: number; oscType?: OscillatorType }[] = [];

    if (type === 'persian' || type === 'upbeat') {
      // Tavallod Tavallod Tavallodat Mobarak (Persian Birthday Melody)
      sequence = [
        { note: N.G4, duration: 0.3, delay: 0 },
        { note: N.G4, duration: 0.3, delay: 0.3 },
        { note: N.A4, duration: 0.5, delay: 0.6 },
        { note: N.G4, duration: 0.5, delay: 1.1 },
        { note: N.C5, duration: 0.5, delay: 1.6 },
        { note: N.B4, duration: 0.8, delay: 2.1 },

        { note: N.G4, duration: 0.3, delay: 3.0 },
        { note: N.G4, duration: 0.3, delay: 3.3 },
        { note: N.A4, duration: 0.5, delay: 3.6 },
        { note: N.G4, duration: 0.5, delay: 4.1 },
        { note: N.D5, duration: 0.5, delay: 4.6 },
        { note: N.C5, duration: 0.8, delay: 5.1 },

        { note: N.G4, duration: 0.3, delay: 6.0 },
        { note: N.G4, duration: 0.3, delay: 6.3 },
        { note: N.G5, duration: 0.5, delay: 6.6 },
        { note: N.E5, duration: 0.5, delay: 7.1 },
        { note: N.C5, duration: 0.5, delay: 7.6 },
        { note: N.B4, duration: 0.5, delay: 8.1 },
        { note: N.A4, duration: 0.8, delay: 8.6 },

        { note: N.F5, duration: 0.3, delay: 9.5 },
        { note: N.F5, duration: 0.3, delay: 9.8 },
        { note: N.E5, duration: 0.5, delay: 10.1 },
        { note: N.C5, duration: 0.5, delay: 10.6 },
        { note: N.D5, duration: 0.5, delay: 11.1 },
        { note: N.C5, duration: 1.2, delay: 11.6 }
      ];
    } else if (type === 'waltz' || type === 'classic') {
      // Gentle Happy Birthday Waltz
      sequence = [
        { note: N.C4, duration: 0.4, delay: 0, oscType: 'triangle' },
        { note: N.C4, duration: 0.2, delay: 0.4, oscType: 'triangle' },
        { note: N.D4, duration: 0.6, delay: 0.7, oscType: 'triangle' },
        { note: N.C4, duration: 0.6, delay: 1.3, oscType: 'triangle' },
        { note: N.F4, duration: 0.6, delay: 1.9, oscType: 'triangle' },
        { note: N.E4, duration: 1.0, delay: 2.5, oscType: 'triangle' },

        { note: N.C4, duration: 0.4, delay: 3.6, oscType: 'triangle' },
        { note: N.C4, duration: 0.2, delay: 4.0, oscType: 'triangle' },
        { note: N.D4, duration: 0.6, delay: 4.3, oscType: 'triangle' },
        { note: N.C4, duration: 0.6, delay: 4.9, oscType: 'triangle' },
        { note: N.G4, duration: 0.6, delay: 5.5, oscType: 'triangle' },
        { note: N.F4, duration: 1.0, delay: 6.1, oscType: 'triangle' }
      ];
    } else {
      // Chill Jazz Lounge Birthday
      sequence = [
        { note: N.C4, duration: 0.5, delay: 0, oscType: 'sine' },
        { note: N.E4, duration: 0.5, delay: 0.5, oscType: 'sine' },
        { note: N.G4, duration: 0.5, delay: 1.0, oscType: 'sine' },
        { note: N.B4, duration: 0.8, delay: 1.5, oscType: 'sine' },
        { note: N.C5, duration: 1.2, delay: 2.3, oscType: 'sine' }
      ];
    }

    const playLoop = () => {
      if (!this.isPlayingMelody) return;
      
      const totalDuration = sequence[sequence.length - 1].delay + sequence[sequence.length - 1].duration + 0.8;

      sequence.forEach((step) => {
        const tid = window.setTimeout(() => {
          if (this.isPlayingMelody) {
            this.playNote(step.note, step.duration, step.oscType || (type === 'upbeat' ? 'sawtooth' : 'sine'), type === 'upbeat' ? 0.2 : 0.35);
          }
        }, step.delay * 1000);
        this.melodyTimeoutIds.push(tid);
      });

      if (loop) {
        const loopTid = window.setTimeout(() => {
          if (this.isPlayingMelody) {
            playLoop();
          }
        }, totalDuration * 1000);
        this.melodyTimeoutIds.push(loopTid);
      }
    };

    playLoop();
  }

  public stopMelody() {
    this.isPlayingMelody = false;
    this.melodyTimeoutIds.forEach((id) => clearTimeout(id));
    this.melodyTimeoutIds = [];
  }

  // Sound Effects Generator (SFX)
  public playSFX(effect: 'cheer' | 'cork' | 'partyHorn' | 'fireworks' | 'candleBlow' | 'pop') {
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (effect === 'cork' || effect === 'pop') {
      // Champagne cork pop sound
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.1);

      gain.gain.setValueAtTime(0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);

    } else if (effect === 'partyHorn') {
      // Party Horn toot
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(450, now + 0.15);
      osc.frequency.linearRampToValueAtTime(380, now + 0.4);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);

    } else if (effect === 'fireworks') {
      // Fireworks boom + crackle
      const bufferSize = this.ctx.sampleRate * 0.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.6);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.9, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start(now);

    } else if (effect === 'candleBlow') {
      // Whoosh candle blow out
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.Q.value = 1.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.6, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);

    } else if (effect === 'cheer') {
      // Audience Cheer & Celebration chime
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        this.playNote(freq, 0.8, 'triangle', 0.2, idx * 0.08);
      });
    }
  }

  // Voice Recording Capabilities
  public async startRecording(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      this.mediaRecorder = new MediaRecorder(stream);
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      return true;
    } catch (err) {
      console.error('Microphone access error:', err);
      return false;
    }
  }

  public stopRecording(): Promise<string> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve('');
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Stop all media tracks
        this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
        this.mediaRecorder = null;
        resolve(audioUrl);
      };

      this.mediaRecorder.stop();
    });
  }
}

export const audioStudio = new AudioStudioEngine();
