import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class WishlistService {
  private _HttpClient = inject(HttpClient);

  count=signal<number>(0)
  getCount(){
    this.GetLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.count.set(res.count)
      }
    })
  }

  AddProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: productId,
    });
  }

  RemoveProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${productId}`);
  }

  GetLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }
}
