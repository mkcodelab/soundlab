import { Component, Input } from '@angular/core';

export interface ControlConfig {
  name: string;
  min: number;
  max: number;
  step: number;
}

@Component({
  standalone: true,
  selector: 'effect-control',
  template: `
    <input
      type="range"
      #inputData
      (input)="onInputChange(inputData.value)"
      [min]="config.min"
      [max]="config.max"
      [step]="config.step"
    />
  `,
})
export class EffectControlComponent {
  @Input({ required: true }) config: ControlConfig;

  onInputChange(value: any) {
    console.log(this.config.name, value);
  }
}
