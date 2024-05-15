import { Component, inject } from '@angular/core';
import { SynthService } from '../../../services/synth.service';
import { NgClass } from '@angular/common';

interface EffectStates {
  delayActive: boolean;
  distortionActive: boolean;
  reverbActive: boolean;
}

@Component({
  selector: 'fx-board',
  standalone: true,
  imports: [NgClass],
  templateUrl: './fx-board.component.html',
  styleUrl: './fx-board.component.scss',
})
export class FxBoardComponent {
  synthSvc = inject(SynthService);

  effectStates: EffectStates = {
    delayActive: true,
    distortionActive: true,
    reverbActive: true,
  };

  delayOn = true;
  distortionOn = true;
  reverbOn = true;

  toggleDelay() {
    this.delayOn = !this.delayOn;

    this.delayOn
      ? this.synthSvc.turnOn('FeedbackDelay')
      : this.synthSvc.turnOff('FeedbackDelay');
  }

  toggleDist() {
    this.distortionOn = !this.distortionOn;

    this.distortionOn
      ? this.synthSvc.turnOn('Distortion')
      : this.synthSvc.turnOff('Distortion');
  }

  toggleReverb() {
    this.reverbOn = !this.reverbOn;
    this.reverbOn
      ? this.synthSvc.turnOn('Reverb')
      : this.synthSvc.turnOff('Reverb');
  }

  //   toggleEffect(state: EffectStates) {
  //     state.value = !state
  //   }
}
