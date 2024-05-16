import { Injectable } from '@angular/core';
import * as Tone from 'tone';

export type Effect =
  | Tone.FeedbackDelay
  | Tone.Distortion
  | Tone.Chorus
  | Tone.Reverb;

export type EffectName = 'distortion' | 'feedbackDelay' | 'reverb' | 'chorus';

@Injectable({
  providedIn: 'root',
})
export class SynthService {
  synth = new Tone.Synth();

  feedbackDelay = new Tone.FeedbackDelay();
  distortion = new Tone.Distortion(1);
  reverb = new Tone.Reverb();
  chorus = new Tone.Chorus(1, 2, 5);

  constructor() {
    this.synth.chain(
      this.distortion,
      this.feedbackDelay,
      this.reverb,
      this.chorus,
      Tone.getDestination()
    );
    this.chorus.start();
  }

  holdNote(note: string) {
    this.synth.triggerAttack(note, Tone.getContext().currentTime);
  }

  releaseNote() {
    this.synth.triggerRelease();
  }

  toggleEffect(effectName: EffectName, to: boolean) {
    this[effectName].wet.value = to ? 1 : 0;
  }

  setEffectParam(effectName: EffectName, param: any, value: number) {
    this[effectName].set({ [param]: value });
  }
}
