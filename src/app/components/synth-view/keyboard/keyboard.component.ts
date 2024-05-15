import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { SynthService } from '../../../services/synth.service';
import { BehaviorSubject } from 'rxjs';

// interface keys = {

// }
@Component({
  standalone: true,
  imports: [],
  templateUrl: './keyboard.html',
  selector: 'keyboard',
})
export class KeyboardComponent {
  synthSvc = inject(SynthService);

  octave = 1;
  octave$ = new BehaviorSubject(1);

  @Output() holdNoteEmitter = new EventEmitter();
  @Output() releaseNoteEmitter = new EventEmitter();

  ngOnInit() {
    this.createKeys();

    this.octave$.subscribe((value) => {
      this.octave = value;
      this.refreshKeys();
    });
  }

  keys: string[] = [];
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  //   keyboard controls
  keysMapped = {
    a: 'C',
    w: 'C#',
    s: 'D',
    e: 'D#',
    d: 'E',
    f: 'F',
    t: 'F#',
    g: 'G',
    y: 'G#',
    h: 'A',
    u: 'A#',
    j: 'B',
    k: 'C',
  };

  noteDown = false;
  delayOn = false;

  @HostListener('window:keydown', ['$event'])
  keyDownEvent(event: KeyboardEvent) {
    // console.log('pressed', event.key);
    // console.log(typeof event.key);
    let currentOctave = this.octave;
    if (this.keysMapped.hasOwnProperty(event.key)) {
      if (event.key === 'k') {
        currentOctave = this.octave + 1;
      }
      if (!this.noteDown) {
        this.holdNote(
          this.keysMapped[event.key as keyof typeof this.keysMapped] +
            currentOctave
        );
        this.noteDown = true;
      }
    }
  }
  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    this.releaseNote();
  }

  holdNote(note: string) {
    this.holdNoteEmitter.emit(note);
  }
  releaseNote() {
    this.releaseNoteEmitter.emit();
    this.noteDown = false;
  }

  changeOctave(value: number) {
    this.octave$.next(value);
  }

  createKey(key: string) {
    return key + this.octave;
  }

  createKeys() {
    for (let note of this.notes) {
      this.keys.push(this.createKey(note));
    }
  }

  refreshKeys() {
    this.keys = [];
    this.createKeys();
  }

  ngOnDestroy() {
    this.octave$.unsubscribe();
  }
}
