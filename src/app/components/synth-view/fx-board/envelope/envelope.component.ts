import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EnvelopeParams } from '../../../../services/synth.service';
import { Time } from 'tone/build/esm/core/type/Units';
import { EnvelopeValues } from '../fx-board.component';

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

  @Input() initEnvelopeValues: EnvelopeValues;

  //   change it to [propName: string]: value:number
  onEnvelopeInput(param: EnvelopeParams, value: number) {
    this.envelopeInputChange.emit({ param: param, value: value });
  }
}
