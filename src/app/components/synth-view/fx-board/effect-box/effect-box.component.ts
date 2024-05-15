import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EffectName } from '../../../../services/synth.service';

export interface EffectConfigData {
  wet?: number;
}

export interface EffectState {
  effectType: string;
  active: boolean;
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
  @Input({ required: true }) config: EffectConfigData;

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
