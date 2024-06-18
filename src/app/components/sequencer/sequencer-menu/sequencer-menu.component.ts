import {
  Component,
  EventEmitter,
  Output,
  TemplateRef,
  inject,
} from '@angular/core';
import { SequencerService } from '../../../services/sequencer.service';
import { Pattern } from '../../../services/pattern-storage.service';
import { ButtonNotes, SCALES } from '../../../shared/consts';
import { ModalConfig, ModalService } from '../../../services/modal.service';

@Component({
  standalone: true,
  selector: 'sequencer-menu',
  templateUrl: './sequencer-menu.component.html',
  imports: [],
})
export class SequencerMenuComponent {
  sequencerSvc = inject(SequencerService);

  modalSvc = inject(ModalService);

  savePatternPromptOpen = false;
  clearAllPromptOpen = false;

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
    this.closeModal();
  }

  getPatterns() {
    return this.sequencerSvc.getPatterns();
  }

  randomizeAll() {
    this.closeModal();
    this.sequencerSvc.randomizeAll(this.selectedScale);
  }

  openModal(template: TemplateRef<any>, config: ModalConfig) {
    this.modalSvc.open(template, config);
  }

  closeModal() {
    this.modalSvc.close();
  }
}
