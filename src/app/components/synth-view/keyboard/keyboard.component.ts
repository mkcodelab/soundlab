import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { SynthService } from '../../../services/synth.service';
import { BehaviorSubject } from 'rxjs';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './keyboard.html',
  selector: 'keyboard',
  styleUrl: './keyboard.scss',
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

  keysPressed: string[] = [];
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  notesPressed: string[] = [];

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
    // temporary solution for octave change
    let currentOctave = this.octave;

    if (event.key === 'k') {
      currentOctave = this.octave + 1;
    }

    const key =
      this.keysMapped[event.key as keyof typeof this.keysMapped] +
      currentOctave;

    if (!this.keysPressed.includes(key)) {
      this.keysPressed.push(key);

      if (this.keysMapped.hasOwnProperty(event.key)) {
        this.holdNote(key);
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUpEvent(event: KeyboardEvent) {
    // temporary solution for octave change
    let currentOctave = this.octave;

    if (event.key === 'k') {
      currentOctave = this.octave + 1;
    }

    const keyToRemove =
      this.keysMapped[event.key as keyof typeof this.keysMapped] +
      currentOctave;

    //   delete released key from keypressed array
    this.keysPressed = this.keysPressed.filter((key) => key !== keyToRemove);

    this.releaseNote(
      this.keysMapped[event.key as keyof typeof this.keysMapped] + currentOctave
    );
  }

  isKeyActive(key: string): boolean {
    return this.keysPressed.includes(key);
  }

  holdNote(note: string) {
    this.holdNoteEmitter.emit(note);
  }

  releaseNote(event: string) {
    this.releaseNoteEmitter.emit(event);
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
