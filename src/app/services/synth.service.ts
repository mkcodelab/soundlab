import { Injectable } from '@angular/core';
import * as Tone from 'tone';

export type Effect =
  | Tone.FeedbackDelay
  | Tone.Distortion
  | Tone.Chorus
  | Tone.Reverb;

export type WaveShape = 'sine' | 'triangle' | 'square' | 'sawtooth';

export type EffectName = 'Distortion' | 'FeedbackDelay' | 'Reverb' | 'Chorus';

export type EnvelopeParams = 'attack' | 'decay' | 'sustain' | 'release';

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
    // in that way we can load values from preset
    this.initEnvelopeValues();

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
      effect.set({ wet: 0 });
    }
  }

  setEffectParam(effectName: EffectName, param: string, value: number) {
    this.findEffectByName(effectName).set({ [param]: value });
  }

  getEffectParamValue(effectName: EffectName, param: string) {
    return this.findEffectByName(effectName)[param as keyof Effect];
  }

  findEffectByName(effectName: EffectName): Effect {
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
  setEnvelopeParam(param: EnvelopeParams, value: number) {
    this.synth.set({
      envelope: { [param]: value },
    });
  }

  getEnvelopeValue() {
    return this.synth.get().envelope;
  }

  initEnvelopeValues() {
    this.synth.set({
      envelope: { attack: 0.1, decay: 0.1, sustain: 0.1, release: 0.1 },
    });
  }
}
