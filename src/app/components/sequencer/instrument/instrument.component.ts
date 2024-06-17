import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SequencerInstrument } from '../../../models/instrument/instrument';

@Component({
  standalone: true,
  selector: 'instrument',
  templateUrl: './instrument.component.html',
  imports: [],
})
export class InstrumentComponent {
  @Input({ required: true }) instrument: SequencerInstrument;

  @Output() instrumentToggleEvent = new EventEmitter();

  settingsOpen = false;

  changeInstrumentVolume(instrument: SequencerInstrument, value: number) {
    instrument.gain.gain.value = value;
  }

  openInstrumentSettings() {
    this.settingsOpen = true;
  }

  instrumentToggle() {
    this.instrumentToggleEvent.emit();
  }
}
