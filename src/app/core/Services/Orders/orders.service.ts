import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { env } from 'process';

@Service()
export class OrdersService {
    private _HttpClient=inject(HttpClient)

    CreateCashOrderFromCart(cartId:string,formData:object):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}/api/v2/orders/${cartId}`,{"shippingAddress":formData})
    }

    getUserOrders(userId:string):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${userId}`)
    }

    Checkoutsession(cartId:string,formData:object):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.domain}`,{"shippingAddress":formData})
    }

    getAllOrders():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/`)
    }
}
