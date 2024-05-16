import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EffectName } from '../../../../services/synth.service';
import { EffectControlComponent } from './effect-control/effect-control.component';

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

@Component({
  selector: 'effect-box',
  standalone: true,
  imports: [NgClass, EffectControlComponent],
  templateUrl: './effect-box.component.html',
  styleUrl: './effect-box.component.scss',
})
export class EffectBoxComponent {
  @Input({ required: true }) effectType: EffectName;
  @Input() colorClass: string;

  @Output() toggle = new EventEmitter<EffectState>();

  active = true;

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
