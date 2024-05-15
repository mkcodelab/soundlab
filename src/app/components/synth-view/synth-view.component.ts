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

  onHoldNote(note: string) {
    this.synthSvc.holdNote(note);
  }
  onReleaseNote() {
    this.synthSvc.releaseNote();
    // this.noteDown = false;
  }
}
