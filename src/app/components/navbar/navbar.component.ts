import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  selector: 'navbar',
})
export class NavbarComponent {}
