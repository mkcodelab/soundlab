import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  InstrumentButton,
  SequencerService,
} from '../../services/sequencer.service';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { SequencerInstrument } from '../../models/instrument/instrument';
interface Beat {
  id: number;
}

@Component({
  standalone: true,
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  imports: [NgClass],
  styles: `
    .instrument-btn-active {
        background: hsl(120, 100%, 85%);
        box-shadow: 0 0 10px 5px hsl(120, 100%, 50%);
    }

    .measure-active {
        background: hsl(60, 100%, 85%);
        box-shadow: 0 0 10px 5px hsl(60, 100%, 50%);
    }
  `,
})
export class SequencerComponent implements OnInit, OnDestroy {
  sequencerSvc = inject(SequencerService);

  cdr = inject(ChangeDetectorRef);

  instruments = this.sequencerSvc.instruments;

  instrumentButtons = this.sequencerSvc.instrumentButtons;

  clearAllPromptOpen = false;

  beats: Beat[] = [];

  beatMeasureSubscription: Subscription;

  currentBeat = 0;

  ngOnInit() {
    this.createBeats();

    // subscribe to beat measure
    this.beatMeasureSubscription =
      this.sequencerSvc.currentBeatMeasure.subscribe((value) => {
        this.currentBeat = value;
        this.cdr.detectChanges();
      });
  }

  sequencerToggle() {
    this.sequencerSvc.sequencerToggle();
  }

  toggleActiveBeat(beatBtn: InstrumentButton) {
    this.sequencerSvc.toggleActiveBeat(beatBtn);
  }

  get isPlaying(): boolean {
    return this.sequencerSvc.isPlaying;
  }

  setBpm(bpm: number) {
    this.sequencerSvc.setBpm(bpm);
  }

  get bpm() {
    return this.sequencerSvc.bpm;
  }

  changeGain(gainValue: number) {
    this.sequencerSvc.changeGain(gainValue);
  }

  clearAll() {
    this.sequencerSvc.clearAll();
    this.closeClearAllPrompt();
  }

  openClearAllPrompt() {
    this.clearAllPromptOpen = true;
  }
  closeClearAllPrompt() {
    this.clearAllPromptOpen = false;
  }

  //   creates measure beats
  createBeats() {
    for (let i = 0; i < this.sequencerSvc.numberOfBeats; i++) {
      this.beats.push({ id: i });
    }
  }

  isCurrentBeatActive(beat: Beat) {
    return beat.id === this.currentBeat;
  }

  instrumentToggle(instrument: SequencerInstrument) {
    instrument.muted ? instrument.unmute() : instrument.mute();
  }

  ngOnDestroy() {
    this.beatMeasureSubscription.unsubscribe();
  }
}
