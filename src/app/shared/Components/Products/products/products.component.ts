import { Component, inject, Input } from '@angular/core';
import { IProducts } from '../../../../core/Models/iproducts.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../core/Services/Cart/cart.service';
import { WishlistService } from '../../../../core/Services/Wishlist/wishlist.service';

@Component({
  imports: [RouterLink],
  selector: 'app-products',
  styleUrl: './products.component.css',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  protected readonly Math = Math;
  private _CartService=inject(CartService)
  private _WishlistService=inject(WishlistService)
  @Input() products!:IProducts[]

  addToCart(productId:string){
    this._CartService.AddProductToCart(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this._CartService.count.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  addToWishlist(productId:string){
    this._WishlistService.AddProductToWishlist(productId).subscribe({
      next:(res)=>{
        console.log(res)
        this._WishlistService.getCount()
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
