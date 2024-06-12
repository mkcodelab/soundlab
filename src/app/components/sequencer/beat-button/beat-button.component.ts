import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { InstrumentButton } from '../../../services/sequencer.service';
import { ButtonNotes, NOTES } from '../../../shared/consts';
import { ClickOutsideDirective } from '../../../directives/clickOutside.directive';
import { RadialMenuComponent } from '../../radial-menu/radial-menu.component';

@Component({
  standalone: true,
  selector: 'beat-button',
  templateUrl: './beat-button.component.html',
  imports: [NgClass, ClickOutsideDirective, RadialMenuComponent],
  styles: `
   .instrument-btn-active {
        background: hsl(120, 100%, 85%);
        box-shadow: 0 0 10px 5px hsl(120, 100%, 50%);
    }

    // todo: opacity animation on opening menu
    .note-menu-hidden {
        opacity: 0;
        transition: opacity .2s ease;

    }

    .note-menu-show {
        opacity: 1;
    }
  `,
})
export class BeatButtonComponent {
  @Input() instrumentButton: InstrumentButton;

  @Output() toggleActiveBeat = new EventEmitter();

  @Output() rightClick = new EventEmitter();

  notesMenuOpen = false;

  notesOptions = NOTES;

  octaves = Array.from(Array(6), (x, i) => i + 1);

  //   right click to open note dropdown menu
  //   emit event first, to close all opened menus from parent level, then open one that we clicked on.
  @HostListener('contextmenu')
  onClick() {
    this.rightClick.emit();
    this.openNotesMenu();
    // prevents opening contextmenu
    return false;
  }

  toggle() {
    this.toggleActiveBeat.emit(this.instrumentButton);
  }

  openNotesMenu() {
    this.notesMenuOpen = true;
  }

  closeNotesMenu() {
    this.notesMenuOpen = false;
  }

  noteSelection(value: string) {
    this.closeNotesMenu();
    this.instrumentButton.selectNote(value as ButtonNotes);
  }

  selectOctave(value: number) {
    this.instrumentButton.selectOctave(value);
  }
}
