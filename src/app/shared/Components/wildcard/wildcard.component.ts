import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  imports: [RouterLink],
  selector: 'app-wildcard',
  styleUrl: './wildcard.component.css',
  templateUrl: './wildcard.component.html',
})
export class WildcardComponent {
  private _location = inject(Location);

  goBack(): void {
    this._location.back();
  }
}


