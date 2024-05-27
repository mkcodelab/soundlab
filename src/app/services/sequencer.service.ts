import { Injectable } from '@angular/core';
import * as Tone from 'tone';
import { Time } from 'tone/build/esm/core/type/Units';

export class BeatButton {
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

  currentBeat = 0;

  isPlaying = false;

  instrumentButtons: BeatButton[][] = [];

  //   change synths for some samples
  synths = [
    new Tone.Synth({ oscillator: { type: 'square' } }),
    new Tone.MetalSynth(),
    new Tone.MembraneSynth({ oscillator: { type: 'sawtooth' } }),
    new Tone.PluckSynth(),
  ];

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

  toggleActiveBeat(beatBtn: BeatButton) {
    beatBtn.isActive = !beatBtn.isActive;
  }

  initButtons() {
    this.synths.forEach(() => {
      const beatButtonArr = [];
      for (let i = 0; i < this.numberOfBeats; i++) {
        beatButtonArr.push(new BeatButton(i));
      }
      this.instrumentButtons.push(beatButtonArr);
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

    this.currentBeat = (this.currentBeat + 1) % this.numberOfBeats;
  }

  changeGain(gainValue: number) {
    this.gain.gain.value = gainValue;
  }
}
