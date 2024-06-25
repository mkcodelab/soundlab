import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import {
  InstrumentButton,
  SequencerService,
} from '../../services/sequencer.service';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { SequencerInstrument } from '../../models/instrument/instrument';
import { BeatButtonComponent } from './beat-button/beat-button.component';
import { Pattern } from '../../services/pattern-storage.service';
import { SequencerMenuComponent } from './sequencer-menu/sequencer-menu.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ButtonNotes } from '../../shared/consts';

interface Beat {
  id: number;
}

@Component({
  standalone: true,
  selector: 'sequencer',
  templateUrl: './sequencer.component.html',
  imports: [
    NgClass,
    BeatButtonComponent,
    SequencerMenuComponent,
    InstrumentComponent,
  ],
  styles: `
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

  // off-click logic cannot be done with off-click directive, because it fires every off-click x number of buttons...

  //   https://stackoverflow.com/questions/40107008/detect-click-outside-angular-component/60014879#60014879
  //   https://stackoverflow.com/questions/40107008/detect-click-outside-angular-component
  // problem with many instances of HostListener, like when using clickOutsideDirective.

  //   solved in a different, simpler way.
  //   added listener for click event on parent component, (could be done also on app component)
  // prevent closing menus when clicking on menu elements containing notes-menu-elem class
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    const elem = event.target as HTMLElement;

    if (elem.classList.contains('notes-menu-elem')) {
      return;
    }
    this.closeAllNotesMenus();
  }

  @ViewChildren(BeatButtonComponent)
  beatButtons: QueryList<BeatButtonComponent>;

  ngOnInit() {
    this.createBeats();

    // subscribe to beat measure
    this.beatMeasureSubscription =
      this.sequencerSvc.currentBeatMeasure.subscribe((value) => {
        this.currentBeat = value;
        this.cdr.detectChanges();
      });
  }

  toggleActiveBeat(beatBtn: InstrumentButton) {
    this.sequencerSvc.toggleActiveBeat(beatBtn);
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

  closeAllNotesMenus() {
    this.beatButtons.forEach((button) => button.closeNotesMenu());
  }

  selectPattern(pattern: Pattern) {
    this.sequencerSvc.selectPattern(pattern);
    // reassign sequencerSvc instrumentButtons to instrumentButtons !!!
    this.instrumentButtons = this.sequencerSvc.instrumentButtons;
  }

  randomize(event: SequencerInstrument) {
    // const scale: ButtonNotes[] = ['D', 'A', 'E'];
    // this.sequencerSvc.randomize(event, scale);
    this.sequencerSvc.randomize(event);
  }

  ngOnDestroy() {
    this.beatMeasureSubscription.unsubscribe();
  }
}
