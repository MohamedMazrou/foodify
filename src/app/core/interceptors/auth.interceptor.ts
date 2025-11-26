import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { url } from '../environment/baseUrl';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { inject } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
   const spinner = inject(NgxSpinnerService)
     const cookies = inject(CookieService)
      const Token = cookies.get('accessToken')


  const myReq = req.clone({
     url : url.baseUrl + req.url,
   setHeaders: {
     Authorization: Token ?`Bearer ${Token}` : '', 'Content-Type': 'application/json',
    },
  })

  spinner.show()

  return next(myReq).pipe(
  tap((event) => {
    if(event instanceof HttpResponse ){
    
    }
   
  }),

  catchError((err) => {
   
    return throwError(() => err);
  }),
  finalize(() => {
    spinner.hide();
  })



  );
};
