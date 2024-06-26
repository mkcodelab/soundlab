import { Injectable } from '@angular/core';
import * as Tone from 'tone';

export type Effect =
  | Tone.FeedbackDelay
  | Tone.Distortion
  | Tone.Chorus
  | Tone.Reverb;

export type EffectName = 'Distortion' | 'FeedbackDelay' | 'Reverb' | 'Chorus';

@Injectable({
  providedIn: 'root',
})
export class EffectsService {
  constructor() {
    // start chorus
    (this.findEffectByName('Chorus') as Tone.Chorus).start();

    // turn off at init
    this.disableAllEffects();
  }

  effects: Effect[] = [
    new Tone.FeedbackDelay(),
    new Tone.Distortion(),
    new Tone.Reverb(),
    new Tone.Chorus(),
  ];

  disableAllEffects() {
    for (let effect of this.effects) {
      effect.set({ wet: 0 });
    }
  }

  findEffectByName(effectName: EffectName): Effect | undefined {
    return this.effects.find((effect) => effect.name === effectName);
  }

  setEffectParam(effectName: EffectName, param: string, value: number) {
    this.findEffectByName(effectName)?.set({ [param]: value });
  }

  getEffectParamValue(effectName: EffectName, param: string) {
    return this.findEffectByName(effectName)?.[param as keyof Effect];
  }

  toggleEffect(effectName: EffectName, to: boolean) {
    const effect = this.findEffectByName(effectName);
    if (effect) {
      effect.wet.value = to ? 1 : 0;
    }
  }
}
