import { Component, inject } from '@angular/core';
import {
  EffectName,
  SynthService,
  WaveShape,
} from '../../../services/synth.service';
import { NgClass } from '@angular/common';
import {
  EffectBoxComponent,
  EffectState,
} from './effect-box/effect-box.component';
import {
  EnvelopeComponent,
  EnvelopeInputData,
} from './envelope/envelope.component';
import { Time } from 'tone/build/esm/core/type/Units';

export interface EnvelopeValues {
  attack: Time;
  decay: Time;
  release: Time;
  sustain: number;
}

@Component({
  selector: 'fx-board',
  standalone: true,
  imports: [NgClass, EffectBoxComponent, EnvelopeComponent],
  templateUrl: './fx-board.component.html',
  styleUrl: './fx-board.component.scss',
})
export class FxBoardComponent {
  synthSvc = inject(SynthService);

  waveshapes: WaveShape[] = ['sine', 'sawtooth', 'square', 'triangle'];

  toggleEffect(event: EffectState) {
    const effectName = event.effectType as EffectName;

    this.synthSvc.toggleEffect(effectName, event.active);
  }

  onEffectInput(effectName: EffectName, param: string, value: any) {
    this.synthSvc.setEffectParam(effectName, param, value);
  }

  onEnvelopeInput(event: EnvelopeInputData) {
    this.synthSvc.setEnvelopeParam(event.param, event.value);
  }

  changeWaveShape(value: string) {
    this.synthSvc.changeWaveShape(value as WaveShape);
  }

  getEffectParamValue(effect: EffectName, param: string) {
    return this.synthSvc.getEffectParamValue(effect, param);
  }

  getEnvelopeValues(): EnvelopeValues {
    const envelope = this.synthSvc.getEnvelopeValue();
    return {
      attack: envelope.attack,
      decay: envelope.decay,
      release: envelope.release,
      sustain: envelope.sustain,
    };
  }
}
