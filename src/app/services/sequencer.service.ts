import { Injectable } from '@angular/core';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root',
})
export class SequencerService {
  transport = Tone.getTransport();

  constructor() {
    this.synths.forEach((synth) => synth.connect(this.gain));
    //   this.transport.scheduleRepeat()

    this.gain.toDestination();
  }

  synths = [
    new Tone.Synth({ oscillator: { type: 'square' } }),
    new Tone.Synth({ oscillator: { type: 'triangle' } }),
    new Tone.Synth({ oscillator: { type: 'sawtooth' } }),
  ];

  //   seq = Tone.Sequence
  //   sequence = new Tone.Sequence()

  gain = new Tone.Gain(0.5);

  start() {
    this.transport.start();
  }
  stop() {
    this.transport.stop();
  }

  setBpm(bpm: number) {
    this.transport.set({ bpm: bpm });
  }
}
