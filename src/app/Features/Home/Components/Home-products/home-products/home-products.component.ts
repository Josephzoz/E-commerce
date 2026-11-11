import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../../../../core/Services/Products/products.service';
import { IProducts } from '../../../../../core/Models/iproducts.interface';
import { ProductsComponent } from '../../../../../shared/Components/Products/products/products.component';

@Component({
  imports: [ProductsComponent],
  selector: 'app-home-products',
  styleUrl: './home-products.component.css',
  templateUrl: './home-products.component.html',
})
export class HomeProductsComponent implements OnInit {
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
