import { Component, inject } from '@angular/core';
import { BeatButton, SequencerService } from '../../services/sequencer.service';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  imports: [NgClass],
})
export class SequencerComponent {
  sequencerSvc = inject(SequencerService);

  instruments = this.sequencerSvc.synths;

  instrumentButtons = this.sequencerSvc.instrumentButtons;

  sequencerToggle() {
    this.sequencerSvc.sequencerToggle();
  }

  toggleActiveBeat(beatBtn: BeatButton) {
    this.sequencerSvc.toggleActiveBeat(beatBtn);
  }

  get isPlaying(): boolean {
    return this.sequencerSvc.isPlaying;
  }
}
