import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IsignUp } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http :HttpClient) { }

  signUp(dataSignUp:IsignUp):Observable<IsignUp>{
    console.log(dataSignUp)
return this.http.post<IsignUp>(url.endPoint_Signup,dataSignUp)
  }
}
