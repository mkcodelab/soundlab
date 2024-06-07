import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Tone from 'tone';
import { Time } from 'tone/build/esm/core/type/Units';

export class InstrumentButton {
  constructor(public id: number) {}
  isActive = false;
}

@Injectable({
  providedIn: 'root',
})
export class SequencerService {
  transport = Tone.getTransport();

  constructor() {
    this.synths.forEach((synth) => synth.connect(this.gain));

    this.gain.toDestination();
    this.initButtons();
    this.setBpm(120);
    this.transport.scheduleRepeat((time) => {
      this.repeat(time);
    }, '8n');
  }

  numberOfBeats = 16;

  //   has to be observable
  currentBeat = 0;
  private currentBeat$: BehaviorSubject<number> = new BehaviorSubject(0);

  currentBeatMeasure: Observable<number> = this.currentBeat$.asObservable();

  isPlaying = false;

  instrumentButtons: InstrumentButton[][] = [];

  //   change synths for some samples
  synths = [
    new Tone.Synth({ oscillator: { type: 'square' } }),
    new Tone.MetalSynth(),
    new Tone.MembraneSynth({ oscillator: { type: 'sawtooth' } }),
    new Tone.PluckSynth(),
  ];

  //   add gain node to every single synth/instrument
  //   add mute method, that will set instrument gain value to 0
  // add button with mute method to sequencer component
  gain = new Tone.Gain(0.5);

  start() {
    this.transport.start();
  }
  stop() {
    this.transport.stop();
  }

  setBpm(bpm: number) {
    this.transport.set({ bpm: bpm });
  }

  get bpm(): number {
    return this.transport.bpm.value;
  }

  toggleActiveBeat(instrumentBtn: InstrumentButton) {
    instrumentBtn.isActive = !instrumentBtn.isActive;
  }

  initButtons() {
    this.synths.forEach(() => {
      const instrumentBtnArr = [];
      for (let i = 0; i < this.numberOfBeats; i++) {
        instrumentBtnArr.push(new InstrumentButton(i));
      }
      this.instrumentButtons.push(instrumentBtnArr);
    });
  }

  sequencerToggle() {
    this.isPlaying = !this.isPlaying;
    this.isPlaying ? this.start() : this.stop();
  }
  repeat(time: Time) {
    this.instrumentButtons.forEach((row, index) => {
      let synth = this.synths[index];

      let button = row[this.currentBeat];

      if (button.isActive) {
        // synth.triggerAttackRelease(note.note, '8n', time)
        synth.triggerAttackRelease('D4', '8n', time);
      }
    });

    // send current beat
    this.currentBeat$.next(this.currentBeat);
    // update current beat
    this.currentBeat = (this.currentBeat + 1) % this.numberOfBeats;
  }

  changeGain(gainValue: number) {
    this.gain.gain.value = gainValue;
  }

  clearAll() {
    this.instrumentButtons.forEach((buttonArray) => {
      buttonArray.forEach((btn) => (btn.isActive = false));
    });
  }
}
