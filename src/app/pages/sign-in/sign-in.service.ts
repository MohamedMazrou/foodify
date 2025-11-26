import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IsignIn } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http : HttpClient) { }

  signIn(dataSignIn:IsignIn):Observable<IsignIn>{
    return this.http.post<IsignIn>(url.endPoint_SignIN,dataSignIn)
  }
}
