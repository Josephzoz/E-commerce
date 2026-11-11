import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-slider',
  styleUrl: './slider.component.css',
  templateUrl: './slider.component.html',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent {}
