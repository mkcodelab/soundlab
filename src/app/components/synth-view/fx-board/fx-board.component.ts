import { Component, inject } from '@angular/core';
import { EffectName, SynthService } from '../../../services/synth.service';
import { NgClass } from '@angular/common';
import {
  EffectBoxComponent,
  EffectState,
} from './effect-box/effect-box.component';
import { EffectControlComponent } from './effect-box/effect-control/effect-control.component';

// interface EffectStates {
//   delayActive: boolean;
//   distortionActive: boolean;
//   reverbActive: boolean;
// }

@Component({
  selector: 'fx-board',
  standalone: true,
  imports: [NgClass, EffectBoxComponent, EffectControlComponent],
  templateUrl: './fx-board.component.html',
  styleUrl: './fx-board.component.scss',
})
export class FxBoardComponent {
  synthSvc = inject(SynthService);

  toggleEffect(event: EffectState) {
    const effectName = event.effectType as EffectName;

    this.synthSvc.toggleEffect(effectName, event.active);
  }

  onEffectInput(effectName: EffectName, param: string, value: any) {
    // console.log(value);
    this.synthSvc.setEffectParam(effectName, param, value);
  }
}
