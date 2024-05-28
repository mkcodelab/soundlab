import { Routes } from '@angular/router';
import { SynthViewComponent } from './components/synth-view/synth-view.component';
import { SequencerComponent } from './components/sequencer/sequencer.component';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
  {
    path: 'synth',
    component: SynthViewComponent,
  },
  {
    path: 'sequencer',
    component: SequencerComponent,
  },
  {
    path: '',
    component: HomepageComponent,
  },
];
