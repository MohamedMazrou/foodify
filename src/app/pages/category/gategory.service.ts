import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFoodCategory, IFoodCategoryResponse, Irecommended, IResponseFavFood } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class GategoryService {

  constructor(private http : HttpClient) { }

GetCategory():Observable<IFoodCategoryResponse>{
  return this.http.get<IFoodCategoryResponse>(url.endPoint_categories)
}

getDishes(cate:IFoodCategory):Observable<IFoodCategoryResponse>{
return this.http.get<IFoodCategoryResponse>(`/api/categories/${cate.id}/dishes?search=`)
}
}
