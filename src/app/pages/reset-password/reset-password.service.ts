import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IForgetPassword } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http:HttpClient) { }

  ForgetPass(dataForgetPassword:IForgetPassword):Observable<IForgetPassword>{
   return this.http.post<IForgetPassword>(url.endPoint_Forget,dataForgetPassword)
  }
}
