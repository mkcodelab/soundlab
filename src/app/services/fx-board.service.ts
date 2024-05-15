import { Injectable, inject } from '@angular/core';
import * as Tone from 'tone';
import { SynthService } from './synth.service';

// export type EffectType = 'distortion' | 'delay';

// export class Effect {
//   constructor(public type: EffectType, private settings?: any) {}
//   active = false;

//   toggle() {
//     this.active = !this.active;
//   }
// }

export type Effect = Tone.FeedbackDelay | Tone.Distortion | Tone.Chorus;

export type EffectName = 'Distortion' | 'FeedbackDelay';

@Injectable({
  providedIn: 'root',
})
export class FxBoardService {
  synthSvc = inject(SynthService);

  distortion = new Tone.Distortion(0.8);
  delay = new Tone.FeedbackDelay();

  //   fxChain: Effect[] = [new Effect('distortion'), new Effect('delay')];
  fxArray: Effect[] = [this.distortion, this.delay];
  activeFxChain: Effect[] = [];

  constructor() {
    this.populateFxChain();
    this.passChainToSynth();
    this.delay.wet.value = 0;
    this.distortion.wet.value = 0.5;
  }

  populateFxChain() {
    this.activeFxChain = [...this.fxArray];
  }

  get currentChain() {
    return this.activeFxChain;
  }

  clearChain() {
    this.activeFxChain = [];
  }

  passChainToSynth() {
    console.log(this.activeFxChain);
    for (let effect of this.activeFxChain) {
      this.synthSvc.addEffectToChain(effect);
    }
    this.synthSvc.connectFXChain();
  }

  removeEffect(effectName: EffectName) {
    this.activeFxChain = this.activeFxChain.filter(
      (effect) => effect.name !== effectName
    );
    this.synthSvc.clearFxChain();
    this.passChainToSynth();
  }

  addEffect(effectName: EffectName) {
    switch (effectName) {
      case 'Distortion':
        this.activeFxChain.push(this.distortion);
        break;
      case 'FeedbackDelay':
        this.activeFxChain.push(this.delay);
        break;
      default:
        console.log('no effect with that name');
        break;
    }
    this.synthSvc.clearFxChain();
    this.passChainToSynth();
  }
}
