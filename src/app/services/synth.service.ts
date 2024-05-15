import { Injectable } from '@angular/core';
import * as Tone from 'tone';

export type Effect =
  | Tone.FeedbackDelay
  | Tone.Distortion
  | Tone.Chorus
  | Tone.Reverb;

export type EffectName = 'Distortion' | 'FeedbackDelay' | 'Reverb';

@Injectable({
  providedIn: 'root',
})
export class SynthService {
  synth = new Tone.Synth();

  delay = new Tone.FeedbackDelay();
  distortion = new Tone.Distortion(1);
  reverb = new Tone.Reverb();

  constructor() {
    this.synth.chain(
      this.distortion,
      this.delay,
      this.reverb,
      Tone.getDestination()
    );
  }

  holdNote(note: string) {
    this.synth.triggerAttack(note, Tone.getContext().currentTime);
  }

  releaseNote() {
    this.synth.triggerRelease();
  }

  turnOff(effectName: EffectName) {
    switch (effectName) {
      case 'Distortion':
        this.distortion.wet.value = 0;
        break;
      case 'FeedbackDelay':
        this.delay.wet.value = 0;
        break;
      case 'Reverb':
        this.reverb.wet.value = 0;
        break;
      default:
        console.log('error');
    }
  }

  turnOn(effectName: EffectName) {
    switch (effectName) {
      case 'Distortion':
        this.distortion.wet.value = 1;
        break;
      case 'FeedbackDelay':
        this.delay.wet.value = 1;
        break;
      case 'Reverb':
        this.reverb.wet.value = 1;
        break;
      default:
        console.log('error');
    }
  }
}
