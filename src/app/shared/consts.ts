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

// todo: make class instead of interface and produce scales programatically
export interface Scale {
  name: string;
  notes: ButtonNotes[];
}

export const DPhrygian: Scale = {
  name: 'Phrygian',
  notes: ['D', 'D#', 'F', 'G', 'A', 'A#', 'C'],
};
export const CMajor: Scale = {
  name: 'C Major',
  notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
};

export const SCALES = [DPhrygian, CMajor];
