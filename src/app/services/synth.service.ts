import { Injectable } from '@angular/core';
import * as Tone from 'tone';

@Injectable({
  providedIn: 'root',
})
export class SynthService {
  synth = new Tone.Synth().toDestination();
  feedbackDealay = new Tone.FeedbackDelay();

  playSound(note: string) {
    this.synth.triggerAttackRelease(note, '8n');
  }

  holdNote(note: string) {
    this.synth.triggerAttack(note);
  }

  releaseNote() {
    this.synth.triggerRelease();
  }

  connectDelay() {
    this.synth.connect(this.feedbackDealay);
    this.feedbackDealay.toDestination();
  }

  disconnectDelay() {
    this.synth.disconnect(this.feedbackDealay);
    this.synth.toDestination();
  }
}
