import { Injectable } from '@angular/core';
import * as Tone from 'tone';
import { Effect } from './fx-board.service';

@Injectable({
  providedIn: 'root',
})
export class SynthService {
  synth = new Tone.Synth();

  // delay = new Tone.FeedbackDelay();
  // distortion = new Tone.Distortion(1);

  fxArray: Effect[] = [];

  constructor() {
    // this.addEffectToChain(this.distortion);
    // this.addEffectToChain(this.delay);
    this.connectFXChain();
  }

  holdNote(note: string) {
    this.synth.triggerAttack(note);
  }

  releaseNote() {
    this.synth.triggerRelease();
  }

  //   connectDelay() {
  //     this.synth.connect(this.delay);
  //     this.delay.toDestination();
  //   }

  //   disconnectDelay() {
  //     this.synth.disconnect(this.delay);
  //     this.synth.toDestination();
  //   }

  connectFXChain() {
    console.log('connected: ', this.fxArray);
    this.synth.chain(...this.fxArray, Tone.getDestination());
  }

  clearFxChain() {
    this.fxArray = [];
    // this.synth.chain(Tone.getDestination());
    this.synth.disconnect();
    this.synth.toDestination();
  }

  addEffectToChain(effect: any) {
    this.fxArray.push(effect);
  }

  removeEffectFromChain(effect: any) {
    console.log(effect);
  }
}
