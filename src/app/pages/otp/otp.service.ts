import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOtp } from '../../core/interfaces/Interfaces';
import { url } from '../../core/environment/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http :HttpClient) { }

  Otp(otp:IOtp):Observable<IOtp>{
    console.log(otp)
return this.http.post<IOtp>(url.endPoint_Otp,otp)
  }


  ResendOtp(otp:IOtp):Observable<IOtp>{
    console.log(otp)
return this.http.post<IOtp>(url.endPoint_Resend_Otp,otp)
  }
}
