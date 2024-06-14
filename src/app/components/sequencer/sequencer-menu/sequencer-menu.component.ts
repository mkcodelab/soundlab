import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SequencerService } from '../../../services/sequencer.service';
import { Pattern } from '../../../services/pattern-storage.service';

@Component({
  standalone: true,
  selector: 'sequencer-menu',
  templateUrl: './sequencer-menu.component.html',
  imports: [],
})
export class SequencerMenuComponent {
  sequencerSvc = inject(SequencerService);

  savePatternPromptOpen = false;
  loadPatternPromptOpen = false;
  clearAllPromptOpen = false;

  @Output() selectPatternEvent = new EventEmitter<Pattern>();

  clearAll() {
    this.sequencerSvc.clearAll();
    this.closeClearAllPrompt();
  }

  openClearAllPrompt() {
    this.clearAllPromptOpen = true;
  }
  closeClearAllPrompt() {
    this.clearAllPromptOpen = false;
  }

  sequencerToggle() {
    this.sequencerSvc.sequencerToggle();
  }

  get isPlaying(): boolean {
    return this.sequencerSvc.isPlaying;
  }

  openSavePatternPrompt() {
    this.savePatternPromptOpen = true;
  }
  closeSavePatternPrompt() {
    this.savePatternPromptOpen = false;
  }

  openLoadPatternPrompt() {
    this.loadPatternPromptOpen = true;
  }
  closeLoadPatternPrompt() {
    this.loadPatternPromptOpen = false;
  }

  savePattern(name: string) {
    this.sequencerSvc.savePattern(name);
    this.closeSavePatternPrompt();
  }

  selectPattern(pattern: Pattern) {
    this.selectPatternEvent.emit(pattern);
    this.closeLoadPatternPrompt();
  }

  getPatterns() {
    return this.sequencerSvc.getPatterns();
  }
}
