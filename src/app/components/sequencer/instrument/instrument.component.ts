import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SequencerInstrument } from '../../../models/instrument/instrument';
import {
  EnvelopeComponent,
  EnvelopeInputData,
} from '../../synth-view/fx-board/envelope/envelope.component';
import { EnvelopeValues } from '../../synth-view/fx-board/fx-board.component';
import { EnvelopeParams } from '../../../services/synth.service';

@Component({
  standalone: true,
  selector: 'instrument',
  templateUrl: './instrument.component.html',
  imports: [EnvelopeComponent],
})
export class InstrumentComponent {
  @Input({ required: true }) instrument: SequencerInstrument;

  @Output() instrumentToggleEvent = new EventEmitter();

  @Output() randomizeEvent = new EventEmitter<SequencerInstrument>();

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

  isEnvelopePresent() {
    return 'envelope' in this.instrument.synthType;
  }

  getEnvelopeValues(): EnvelopeValues {
    if ('envelope' in this.instrument.synthType) {
      const envelope = this.instrument.synthType.envelope;
      return {
        attack: envelope.attack,
        decay: envelope.decay,
        release: envelope.release,
        sustain: envelope.sustain,
      };
    }
    return { attack: 0, decay: 0, release: 0, sustain: 0 };
  }

  onEnvelopeInput(envelope: EnvelopeInputData) {
    this.setEnvelopeParam(envelope.param, envelope.value);
  }

  setEnvelopeParam(param: EnvelopeParams, value: number) {
    this.instrument.synthType.set({
      envelope: { [param]: value },
    });
  }

  randomize() {
    this.randomizeEvent.emit(this.instrument);
  }
}
