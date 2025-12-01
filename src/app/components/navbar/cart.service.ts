import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem, ICartResponse, Irecommended } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http : HttpClient) { }
Statuscart = signal <ICartItem[]>([])

setDataCart(list:ICartItem[]):void{
this.Statuscart.set(list)
}

  getCart():Observable<ICartResponse>{
    return this.http.get<ICartResponse>(url.endPoint_Cart)
  }

    addToCart(obj:Irecommended):Observable<Irecommended>{
  return this.http.post<Irecommended>(`${url.endPoint_Cart}/${obj.id}`,({}))
  }

  updateCartQuantity(obj:ICartItem,countQuantity:any):Observable<ICartItem>{
   
    // const fd = new FormData();
    const quantity = countQuantity.toString()
// fd.append('quantity',quantity);

    return this.http.post<ICartItem>(`/api/cart/${obj.id}/update-quantity`,{ quantity:quantity})
  }

  DeleteItem(obj:ICartItem):Observable<ICartItem>{
  return this.http.delete<ICartItem>(`${url.endPoint_Cart}/${obj.id}`,({}))
  }
}
