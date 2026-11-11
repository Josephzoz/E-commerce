import { Component } from '@angular/core';
import { SliderComponent } from '../Components/Slider/slider/slider.component';
import { HomeCategoriesComponent } from '../Components/Home-categories/home-categories/home-categories.component';
import { HomeProductsComponent } from '../Components/Home-products/home-products/home-products.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [SliderComponent, HomeCategoriesComponent, HomeProductsComponent, RouterLink],
  selector: 'app-home',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
