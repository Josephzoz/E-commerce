import { Component, input, Input, signal } from '@angular/core';
import { IOrders } from '../../../../core/Models/iorders.interface';
import { DatePipe } from '@angular/common';

@Component({
  imports: [DatePipe],
  selector: 'app-orders',
  styleUrl: './orders.component.css',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  @Input() orders:IOrders[]=[]
}
