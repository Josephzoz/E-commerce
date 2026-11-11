import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Service()
export class SubcategoriesService {
    private _HttpClient=inject(HttpClient)

    GetAllSubCategories():Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories`)
    }

    GetAllSubCategoriesOnCategory(categoryId:string):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${categoryId}/subcategories`)
    }

    GetSpecificSubCategory(subCategoryId:string):Observable<any>{
        return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories/${subCategoryId}`)
    }
}
