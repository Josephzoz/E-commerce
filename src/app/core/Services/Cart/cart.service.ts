import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { EmailValidationError } from '@angular/forms/signals';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Service()
export class CartService {
  private _HttpClient = inject(HttpClient);

  count=signal<number>(0)
  getCount(){
    this.GetLoggedUserCart().subscribe({
      next:(res)=>{
        this.count.set(res.numOfCartItems)
      }
    })
  }

  GetLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v2/cart`);
  }

  AddProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v2/cart`, { productId: productId });
  }

  UpdateCartProductQuantity(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v2/cart/${productId}`, {
      count: count,
    });
  }

  RemoveProductFromCart(productId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v2/cart/${productId}`)
  }

  ClearUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v2/cart`)
  }

  ApplyCouponToCart(coupon:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v2/cart/applyCoupon`,{"couponName":coupon})
  }
}
