import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { InstrumentButton } from './sequencer.service';

export type Pattern = {
  name: string;
  pattern: InstrumentButton[][];
};
@Injectable({
  providedIn: 'root',
})
export class PatternStorageService {
  localStorageSvc = inject(LocalStorageService);

  localStorageKey = 'sequencer_patterns';

  constructor() {
    this.initPatterns();
  }

  //   all saved patterns
  private _patterns: Pattern[] = [];

  addPattern(name: string, data: InstrumentButton[][]) {
    this._patterns.push({ name, pattern: data });
    this.savePatterns();
  }

  get patterns() {
    return this._patterns;
  }

  //   add save / retrieve from localstorage here
  loadPatterns(): Pattern[] | undefined {
    const data = this.localStorageSvc.getItem(this.localStorageKey);
    if (data) {
      return JSON.parse(data);
    } else {
      return undefined;
    }
  }

  savePatterns() {
    const data = JSON.stringify(this._patterns);
    this.localStorageSvc.setItem(this.localStorageKey, data);
  }

  initPatterns() {
    const patterns = this.loadPatterns();
    if (patterns) {
      this._patterns = patterns;
    }
  }
}
