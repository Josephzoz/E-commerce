import { Component, inject, OnInit, signal } from '@angular/core';
import { OrdersComponent } from '../../../shared/Components/Orders/orders/orders.component';
import { RouterLink } from '@angular/router';
import { OrdersService } from '../../../core/Services/Orders/orders.service';
import { CartService } from '../../../core/Services/Cart/cart.service';
import { IOrders } from '../../../core/Models/iorders.interface';

@Component({
  imports: [OrdersComponent, RouterLink],
  selector: 'app-myorders',
  styleUrl: './myorders.component.css',
  templateUrl: './myorders.component.html',
})
export class MyordersComponent implements OnInit {
  private _OrdersService=inject(OrdersService) 
  private _CartService=inject(CartService) 
  userId=signal<string>('')
  myOrders=signal<IOrders[]>([])
  ngOnInit(): void {
    this._CartService.GetLoggedUserCart().subscribe({
      next:(res)=>{
        this.userId.set(res.data.cartOwner)
        console.log(this.userId())
        this.getMyOrders()
      }
    })
  }
  getMyOrders(){
    this._OrdersService.getUserOrders(this.userId()).subscribe({
      next:(res)=>{
        console.log(res)
        this.myOrders.set(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  
}
