import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsComponent } from '../../shared/Components/Products/products/products.component';
import { ProductsService } from '../../core/Services/Products/products.service';
import { IProducts } from '../../core/Models/iproducts.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ProductsComponent, RouterLink],
  selector: 'app-shop',
  styleUrl: './shop.component.css',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  private _ProductsService=inject(ProductsService)

  products=signal<IProducts[]>([])

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this._ProductsService.GetAllProducts().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.products.set(res.data)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
