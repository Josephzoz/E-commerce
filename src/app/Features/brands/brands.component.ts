import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsService } from '../../core/Services/Brands/brands.service';
import { IBrand } from '../../core/Models/ibrand.interface';

@Component({
  imports: [RouterLink],
  selector: 'app-brands',
  styleUrl: './brands.component.css',
  templateUrl: './brands.component.html',
})
export class BrandsComponent implements OnInit {
  private _BrandsService=inject(BrandsService)
  allBrands=signal<IBrand[]>([])

  ngOnInit(): void {
    this.getAllBrands()
  }

  getAllBrands(){
    this._BrandsService.GetAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.allBrands.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
