import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Service()
export class CategoriesService {
    private _HttpClient=inject(HttpClient)

    GetAllCategories():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories`)
    }

    GetspecificCategory(categoryId:string):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}`)
    }
}
