import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { env } from 'process';
import { filter, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { __param } from 'tslib';

export interface Productparams {
  category?: string;
  subcategory?: string;
  brand?:string
}

@Service()
export class ProductsService {
  private _HttpClient = inject(HttpClient);

  GetAllProducts(data?:Productparams): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`,{
      params: { ...data }
    });
  }
  GetspecificProduct(productId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products/${productId}`);
  }
}
