import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Service()
export class AddressesService {
    private _HttpClient=inject(HttpClient)

    AddAddress(formData:object):Observable<any>{
        return this._HttpClient.post(`${environment.baseUrl}/api/v1/addresses`,formData)
    }

    RemoveAddress(addressId:string):Observable<any>{
        return this._HttpClient.delete(`${environment.baseUrl}/api/v1/addresses/${addressId}`)
    }

    GetSpecificAddress(addressId:string):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses/${addressId}`)
    }

    GetLoggedUserAddresses():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses`)
    }


}
