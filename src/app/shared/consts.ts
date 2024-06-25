export type ButtonNotes = (typeof NOTES)[number];

export const NOTES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

export interface Scale {
  name: string;
  notes: ButtonNotes[];
}

const CMajor: Scale = {
  name: 'C Major',
  notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
};

const CMinor: Scale = {
  name: 'C Minor',
  notes: ['C', 'D', 'D#', 'F', 'G', 'G#', 'B'],
};

const CPhrygian: Scale = {
  name: 'C Phrygian',
  notes: ['C', 'C#', 'D#', 'F', 'G', 'G#', 'A#'],
};

const DPhrygian: Scale = {
  name: 'D Phrygian',
  notes: ['D', 'D#', 'F', 'G', 'A', 'A#', 'C'],
};

export const SCALES = [CMajor, CMinor, CPhrygian, DPhrygian];
