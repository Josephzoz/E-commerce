import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressesService } from '../../../core/Services/Addresses/addresses.service';
import { IUseraddresses } from '../../../core/Models/iuseraddresses.interface';
import { OrdersService } from '../../../core/Services/Orders/orders.service';
import { CartService } from '../../../core/Services/Cart/cart.service';
import { ICart, Product } from '../../../core/Models/icart.interface';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-checkout',
  styleUrl: './checkout.component.css',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  private _AddressesService = inject(AddressesService);
  private _OrdersService=inject(OrdersService)
  private _CartService=inject(CartService)

  savedAddresses = signal<IUseraddresses[]>([]);
  selectedAddress = signal<IUseraddresses | null>(null);
  myCart=signal<ICart>({} as ICart)
  cartProducts=signal<Product[]>([])

  checkoutForm: FormGroup = new FormGroup({
    city: new FormControl(null, [Validators.required]),
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  ngOnInit(): void {
    this.savedAddress();
    this.userCart()
  }

  savedAddress() {
    this._AddressesService.GetLoggedUserAddresses().subscribe({
      next: (res) => {
        console.log(res);
        this.savedAddresses.set(res.data);
        if (res.data?.length > 0) {
          this.selectAddress(res.data[0]);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectAddress(address: IUseraddresses) {
    this.selectedAddress.set(address);
    this.checkoutForm.patchValue({
      city: address.city,
      details: address.details,
      phone: address.phone,
    });
  }

  selectNewAddress() {
    this.selectedAddress.set(null);
    this.checkoutForm.reset();
  }

  userCart(){
    this._CartService.GetLoggedUserCart().subscribe({
       next:(res)=>{
        console.log(res)
        this.myCart.set(res)
        this.cartProducts.set(res.data.products)
        
      },
      error:(err)=>{
        console.log(err)
      }    
    })
  }

  cashorder(cartId:string){
    this._OrdersService.CreateCashOrderFromCart(cartId,this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }    
    })
  }
  visaOrder(cartId:string){
    this._OrdersService.Checkoutsession(cartId,this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        window.open(res.session.url,'_self')
      },
      error:(err)=>{
        console.log(err)
      }    
    })
  }
}
