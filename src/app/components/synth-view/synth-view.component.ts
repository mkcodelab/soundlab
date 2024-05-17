import { Component, inject } from '@angular/core';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { FxBoardComponent } from './fx-board/fx-board.component';
import { SynthService } from '../../services/synth.service';

@Component({
  standalone: true,
  imports: [KeyboardComponent, FxBoardComponent],
  selector: 'synth-view',
  templateUrl: './synth-view.html',
})
export class SynthViewComponent {
  synthSvc = inject(SynthService);

  onHoldNote(event: string) {
    this.synthSvc.holdNote(event);
  }
  onReleaseNote(event: string) {
    this.synthSvc.releaseNote(event);
  }
}
