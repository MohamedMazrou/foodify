import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { SignInService } from './sign-in.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,SharedModuleModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
constructor(private fb : FormBuilder,private _signIn:SignInService,private toastr: ToastrService, private cookieService: CookieService,private router : Router){}


obj_sign_in = this.fb.group({
 phone :[ '',[
      Validators.required,
    Validators.pattern(/^[0-9]{11}$/)
 ]],

 password:['',[
    Validators.required,
    Validators.minLength(8)
 ]
 ],
})

 datasignIn(form:FormGroup):void{
 
     if(form.valid){
      this._signIn.signIn(form.value).subscribe(({
      next:((res:any)=>{
       this.toastr.success(res.message);

      //  saveTokenin cookie
      if(res.access_token){
        
this.cookieService.set("accessToken",res.access_token,
  {
    expires:1,
    path:"/",
    secure:true,
    sameSite:'Strict'
  })

this.router.navigate(['/user'])

}
      

      }),

      error:((err)=>{
       this.toastr.error(err.error.message)
      })
      }))
     }else{
      form.markAllAsTouched()
     }
}
}