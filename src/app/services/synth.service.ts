import { Injectable } from '@angular/core';
import * as Tone from 'tone';

export type Effect =
  | Tone.FeedbackDelay
  | Tone.Distortion
  | Tone.Chorus
  | Tone.Reverb;

export type WaveShape = 'sine' | 'triangle' | 'square' | 'sawtooth';

export type EffectName = 'Distortion' | 'FeedbackDelay' | 'Reverb' | 'Chorus';

@Injectable({
  providedIn: 'root',
})
export class SynthService {
  synth = new Tone.PolySynth(Tone.Synth);

  effects: Effect[] = [
    new Tone.FeedbackDelay(),
    new Tone.Distortion(),
    new Tone.Reverb(),
    new Tone.Chorus(),
  ];

  constructor() {
    // changing options of the polysynth voice (tone.synth)
    this.synth.set({
      envelope: { attack: 0.1, decay: 0.1, sustain: 0.5, release: 0.1 },
    });

    this.synth.chain(...this.effects, Tone.getDestination());

    // start chorus
    (this.findEffectByName('Chorus') as Tone.Chorus).start();

    // turn effect off at init
    this.disableAllEffects();
  }

  holdNote(note: string) {
    this.synth.triggerAttack(note);
  }

  releaseNote(note: string) {
    this.synth.triggerRelease(note);
  }

  toggleEffect(effectName: EffectName, to: boolean) {
    this.findEffectByName(effectName).wet.value = to ? 1 : 0;
  }

  disableAllEffects() {
    for (let effect of this.effects) {
      effect.wet.value = 0;
    }
  }

  setEffectParam(effectName: EffectName, param: any, value: number) {
    this.findEffectByName(effectName).set({ [param]: value });
  }

  findEffectByName(effectName: EffectName) {
    const i = this.effects.findIndex((effect) => effect.name === effectName);
    return this.effects[i];
  }

  changeWaveShape(waveshape: WaveShape) {
    this.synth.set({
      oscillator: {
        type: waveshape,
      },
    });
  }
}
