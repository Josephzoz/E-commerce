import { Component, inject, OnInit, signal } from '@angular/core';
import { OrdersComponent } from '../../../shared/Components/Orders/orders/orders.component';
import { OrdersService } from '../../../core/Services/Orders/orders.service';
import { IOrders } from '../../../core/Models/iorders.interface';

@Component({
  imports: [OrdersComponent],
  selector: 'app-allorders',
  styleUrl: './allorders.component.css',
  templateUrl: './allorders.component.html',
})
export class AllordersComponent implements OnInit {
  private _OrdersService = inject(OrdersService);

  allOrders=signal<IOrders[]>([])

  ngOnInit(): void {
    this.getAllOrders()
  }
  getAllOrders() {
    this._OrdersService.getAllOrders().subscribe({
      next: (res) => {
        console.log(res);
        this.allOrders.set(res.data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
