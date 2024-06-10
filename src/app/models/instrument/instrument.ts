import * as Tone from 'tone';

export type SynthType =
  | Tone.Synth
  | Tone.MembraneSynth
  | Tone.PluckSynth
  | Tone.MetalSynth
  | Tone.Sampler;

export class SequencerInstrument {
  public gain: Tone.Gain;
  constructor(
    public name: string,
    public id: number,
    public note: string,
    public synthType: SynthType,
    public muted = false
  ) {
    this.gain = new Tone.Gain(0.5);
    this.synthType.connect(this.gain);
  }

  connect(destination: Tone.InputNode) {
    this.gain.connect(destination);
  }

  mute() {
    this.gain.gain.value = 0;
    this.muted = true;
  }
  unmute() {
    this.gain.gain.value = 1;
    this.muted = false;
  }
}
