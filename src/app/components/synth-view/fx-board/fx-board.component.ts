import { Component, inject } from '@angular/core';
import { EffectName, SynthService } from '../../../services/synth.service';
import { NgClass } from '@angular/common';
import {
  EffectBoxComponent,
  EffectState,
} from './effect-box/effect-box.component';

// interface EffectStates {
//   delayActive: boolean;
//   distortionActive: boolean;
//   reverbActive: boolean;
// }

@Component({
  selector: 'fx-board',
  standalone: true,
  imports: [NgClass, EffectBoxComponent],
  templateUrl: './fx-board.component.html',
  styleUrl: './fx-board.component.scss',
})
export class FxBoardComponent {
  synthSvc = inject(SynthService);

  toggleEffect(event: EffectState) {
    console.log(event);
    const effectName = event.effectType as EffectName;
    event.active
      ? this.synthSvc.turnOn(effectName)
      : this.synthSvc.turnOff(effectName);
  }
}
