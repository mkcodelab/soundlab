import { Injectable, inject } from '@angular/core';
import * as Tone from 'tone';
import { Effect, EffectName, EffectsService } from './effects.service';

export type WaveShape = 'sine' | 'triangle' | 'square' | 'sawtooth';

export type EnvelopeParams = 'attack' | 'decay' | 'sustain' | 'release';

@Injectable({
  providedIn: 'root',
})
export class SynthService {
  synth = new Tone.PolySynth(Tone.Synth);

  effectSvc = inject(EffectsService);

  effects: Effect[];

  constructor() {
    this.effects = this.effectSvc.effects;
    // changing options of the polysynth voice (tone.synth)
    // in that way we can load values from preset
    this.initEnvelopeValues();

    this.synth.chain(...this.effects, Tone.getDestination());
  }

  holdNote(note: string) {
    this.synth.triggerAttack(note);
  }

  releaseNote(note: string) {
    this.synth.triggerRelease(note);
  }

  toggleEffect(effectName: EffectName, to: boolean) {
    this.effectSvc.toggleEffect(effectName, to);
  }

  setEffectParam(effectName: EffectName, param: string, value: number) {
    this.effectSvc.setEffectParam(effectName, param, value);
  }

  getEffectParamValue(effectName: EffectName, param: string) {
    return this.effectSvc.getEffectParamValue(effectName, param);
  }

  findEffectByName(effectName: EffectName): Effect {
    return this.effectSvc.findEffectByName(effectName);
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
