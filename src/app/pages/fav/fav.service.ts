import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem, IFavFoodItem, Irecommended, IResponseFavFood } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private http:HttpClient) { }
 arrFav = signal<IFavFoodItem[]>([])
  setFav(list : IFavFoodItem[]):void{
  this.arrFav.set(list)
  }
 

  getFav():Observable<IResponseFavFood>{
    return this.http.get<IResponseFavFood>(url.endPoint_Fav)
  }

  addFav(obj:any ):Observable<IResponseFavFood>{
    return this.http.post<IResponseFavFood>(`${url.endPoint_PostFav}${obj.id}`,({}))
  }


}
