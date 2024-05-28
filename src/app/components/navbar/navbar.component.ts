import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  selector: 'navbar',
})
export class NavbarComponent {
  links = [
    { title: 'Synthesizer', url: 'synth' },
    { title: 'Sequencer', url: 'sequencer' },
  ];
}
