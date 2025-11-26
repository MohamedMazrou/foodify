import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService)
  const router = inject(Router)
  const Token = cookies.get('accessToken')
   if(!Token){
    router.navigate(['/signin'])
    return false
   }else{
     return true
   }
  
};
