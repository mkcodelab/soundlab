import { Component, EventEmitter, Output, inject } from '@angular/core';
import { SequencerService } from '../../../services/sequencer.service';
import { Pattern } from '../../../services/pattern-storage.service';
import { ButtonNotes, SCALES } from '../../../shared/consts';

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
  randomizePromptOpen = false;

  scales = SCALES;

  selectedScale: ButtonNotes[] = [];

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

  openRandomizePrompt() {
    this.randomizePromptOpen = true;
  }

  closeRandomizePrompt() {
    this.randomizePromptOpen = false;
  }

  selectScale(scaleName: string) {
    const scaleNotes = SCALES.find((scale) => scale.name === scaleName)?.notes;
    if (scaleNotes) {
      this.selectedScale = scaleNotes;
    }
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

  randomizeAll() {
    this.closeRandomizePrompt();
    this.sequencerSvc.randomizeAll(this.selectedScale);
  }
}
