import { Component, EventEmitter, Output } from '@angular/core';
import { EnvelopeParams } from '../../../../services/synth.service';

export interface EnvelopeInputData {
  param: EnvelopeParams;
  value: number;
}

@Component({
  standalone: true,
  selector: 'envelope',
  templateUrl: './envelope.component.html',
  imports: [],
})
export class EnvelopeComponent {
  @Output() envelopeInputChange = new EventEmitter<EnvelopeInputData>();

  onEnvelopeInput(param: EnvelopeParams, value: number) {
    this.envelopeInputChange.emit({ param: param, value: value });
  }
}
