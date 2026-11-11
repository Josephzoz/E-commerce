import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/Services/Cart/cart.service';
import { ICart } from '../../core/Models/icart.interface';

@Component({
  imports: [RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.component.css',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit{
  private _CartService=inject(CartService)
  cartProducts=signal<ICart>({} as ICart)
  
  ngOnInit(): void {
    this.getUserCart()
  }
  getUserCart(){
    this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res)
        this.cartProducts.set(res)
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  updateCartQuantity(productId:string,count:number){
   if(count>0){
     this._CartService.UpdateCartProductQuantity(productId,count).subscribe({
      next:(res)=>{
        console.log(res)
        this.cartProducts.set(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }
  }

  removeProductFromCart(productId:string){
    this._CartService.RemoveProductFromCart(productId).subscribe({
       next:(res)=>{
        console.log(res)
        this.cartProducts.set(res)
                this._CartService.getCount()
      },
      error:(err)=>{
        console.log(err)
      }
    
    })
  }

    clearCart(){
    this._CartService.ClearUserCart().subscribe({
       next:(res)=>{
        console.log(res)
        this.cartProducts.set(res)
        this._CartService.getCount()
      },
      error:(err)=>{
        console.log(err)
      }
    
    })
  }
}
