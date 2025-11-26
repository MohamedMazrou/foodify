import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InewPass } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class NewPassService {

  constructor(private http : HttpClient) { }

  newPass(datanewPass:InewPass):Observable<InewPass>{
    return this.http.post<InewPass>(url.endPoint_newPass,datanewPass)
  }
}
