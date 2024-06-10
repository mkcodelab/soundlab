import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Tone from 'tone';
import { Time } from 'tone/build/esm/core/type/Units';
import { SequencerInstrument } from '../models/instrument/instrument';

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
    this.instruments.forEach((instrument) =>
      instrument.connect(this.masterGain)
    );

    this.masterGain.toDestination();
    this.initButtons();
    this.setBpm(120);
    this.transport.scheduleRepeat((time) => {
      this.repeat(time);
    }, '8n');
  }

  numberOfBeats = 16;

  private currentBeat = 0;
  private currentBeat$: BehaviorSubject<number> = new BehaviorSubject(0);

  currentBeatMeasure: Observable<number> = this.currentBeat$.asObservable();

  isPlaying = false;

  instrumentButtons: InstrumentButton[][] = [];

  //   change synths for some samples
  instruments = [
    new SequencerInstrument(
      'SquareOsc',
      0,
      'C4',
      new Tone.Synth({ oscillator: { type: 'square' } })
    ),
    new SequencerInstrument('Crash', 1, 'C1', new Tone.MetalSynth()),
    new SequencerInstrument(
      'Membrane',
      2,
      'C1',
      new Tone.MembraneSynth({ oscillator: { type: 'sawtooth' } })
    ),
    new SequencerInstrument('Pluck', 3, 'C1', new Tone.PluckSynth()),
    new SequencerInstrument('Instrument test', 4, 'A4', new Tone.Synth()),
    new SequencerInstrument('highPitch', 5, 'C8', new Tone.Synth()),
    new SequencerInstrument('lowDrum', 6, 'C1', new Tone.MembraneSynth()),
  ];

  masterGain = new Tone.Gain(0.5);

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
    this.instruments.forEach(() => {
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
      let instrument = this.instruments[index];

      let button = row[this.currentBeat];

      if (button.isActive) {
        instrument.synthType.triggerAttackRelease(instrument.note, '8n', time);
      }
    });

    // send current beat
    this.currentBeat$.next(this.currentBeat);
    // update current beat
    this.currentBeat = (this.currentBeat + 1) % this.numberOfBeats;
  }

  changeGain(gainValue: number) {
    this.masterGain.gain.value = gainValue;
  }

  clearAll() {
    this.instrumentButtons.forEach((buttonArray) => {
      buttonArray.forEach((btn) => (btn.isActive = false));
    });
  }
}
