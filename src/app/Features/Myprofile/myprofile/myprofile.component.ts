import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-myprofile',
  styleUrl: './myprofile.component.css',
  templateUrl: './myprofile.component.html',
})
export class MyprofileComponent {}
