import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../core/environment/baseUrl';
import { Irecommended } from '../../core/interfaces/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetRecommendedService {

  constructor(private http : HttpClient) { }

  getRecommended():Observable<Irecommended>{
    return this.http.get<Irecommended>(url.endPoint_recommended)
  }
}
