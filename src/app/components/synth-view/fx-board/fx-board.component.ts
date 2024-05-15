import { Component, inject } from '@angular/core';
import { SynthService } from '../../../services/synth.service';
import { FxBoardService } from '../../../services/fx-board.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'fx-board',
  standalone: true,
  imports: [NgClass],
  templateUrl: './fx-board.component.html',
  styleUrl: './fx-board.component.scss',
})
export class FxBoardComponent {
  synthSvc = inject(SynthService);
  fxBoardSvc = inject(FxBoardService);

  delayOn = true;
  distortionOn = true;

  toggleDelay() {
    this.delayOn = !this.delayOn;

    this.delayOn
      ? this.fxBoardSvc.addEffect('FeedbackDelay')
      : this.fxBoardSvc.removeEffect('FeedbackDelay');
  }

  toggleDist() {
    this.distortionOn = !this.distortionOn;
    this.distortionOn
      ? this.fxBoardSvc.addEffect('Distortion')
      : this.fxBoardSvc.removeEffect('Distortion');
  }

  removeEffects() {
    this.synthSvc.clearFxChain();
    this.distortionOn = false;
    this.delayOn = false;
  }
}
