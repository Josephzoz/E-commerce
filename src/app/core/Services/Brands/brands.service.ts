import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Service()
export class BrandsService {
    private _HttpClient=inject(HttpClient)

    GetAllBrands():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands`)
    }
    GetSpecificBrand(brandId:string):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/brands/${brandId}`)
    }
}
