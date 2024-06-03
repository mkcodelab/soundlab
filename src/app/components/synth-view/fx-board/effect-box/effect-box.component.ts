import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EffectName } from '../../../../services/effects.service';
// import { EffectName } from '../../../../services/synth.service';

export interface DistortionConfig {
  distortion: number;
}

export interface DelayConfig {}

export interface ChorusConfig {
  frequency: number;
  delayTime: number;
  depth: number;
}

export interface ReverbConfig {
  time: number;
}

export type EffectConfig =
  | DistortionConfig
  | DelayConfig
  | ChorusConfig
  | ReverbConfig;

export interface EffectState {
  effectType: string;
  active: boolean;
}

export interface InputConfig {
  name: EffectName;
  parameter: string;
}

@Component({
  selector: 'effect-box',
  standalone: true,
  imports: [NgClass],
  templateUrl: './effect-box.component.html',
  styleUrl: './effect-box.component.scss',
})
export class EffectBoxComponent {
  @Input({ required: true }) effectType: EffectName;
  @Input() colorClass: string;

  @Input() inputConfig: InputConfig[];

  @Output() toggle = new EventEmitter<EffectState>();

  active = false;

  effectToggle() {
    console.log('toggled', this.effectType);
    this.active = !this.active;

    const data: EffectState = {
      effectType: this.effectType,
      active: this.active,
    };

    this.toggle.emit(data);
  }
}
