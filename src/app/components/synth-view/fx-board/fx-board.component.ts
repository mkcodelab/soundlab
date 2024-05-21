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
import { EffectControlComponent } from './effect-box/effect-control/effect-control.component';

@Component({
  selector: 'fx-board',
  standalone: true,
  imports: [NgClass, EffectBoxComponent, EffectControlComponent],
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

  changeWaveShape(value: string) {
    console.log('changed waveshape: ', value);
    this.synthSvc.changeWaveShape(value as WaveShape);
  }
}
