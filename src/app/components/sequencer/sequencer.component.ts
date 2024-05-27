import { Component, inject } from '@angular/core';
import { SequencerService } from '../../services/sequencer.service';
import { NgClass } from '@angular/common';

export class BeatButton {
  constructor(public id: number) {}
  isActive = false;
}

// export class InstrumentButton {
//   constructor(public id: number) {}
//   isActive = false;
// }

@Component({
  standalone: true,
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  imports: [NgClass],
})
export class SequencerComponent {
  sequencerSvc = inject(SequencerService);
  // array of some samples
  //   instruments = ['primary', 'secondary', 'drum1', 'drum2'];
  //   take synths from sequencerService
  instruments = this.sequencerSvc.synths;

  beats: BeatButton[] = [];

  instrumentButtons: BeatButton[][] = [];

  isPlaying = false;

  constructor() {
    this.initButtons();
  }

  ngOnInit() {
    console.log(this.sequencerSvc.transport);
  }

  sequencerToggle() {
    this.isPlaying = !this.isPlaying;
    this.isPlaying ? this.sequencerSvc.start() : this.sequencerSvc.stop();
  }

  initButtons() {
    for (let instrument of this.instruments) {
      const beatButtonArr = [];

      for (let i = 0; i < 8; i++) {
        beatButtonArr.push(new BeatButton(i));
      }

      this.instrumentButtons.push(beatButtonArr);
    }

    console.log(this.instrumentButtons);
  }

  toggleActiveBeat(beatBtn: BeatButton) {
    beatBtn.isActive = !beatBtn.isActive;
  }
}
