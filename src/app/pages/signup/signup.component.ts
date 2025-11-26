import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { IsignUp } from '../../core/interfaces/Interfaces';
import { SignUpService } from './sign-up.service';
import { ToastrService } from 'ngx-toastr';
import { OtpService } from '../otp/otp.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,SharedModuleModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private otp:OtpService, private toastr: ToastrService, private fb: FormBuilder,private _router:Router,private _SignUp:SignUpService) {}


  // check do Confirm Password aqual password 
  matchpass(form: AbstractControl): { [key: string]: boolean } | null {
    const password: number = form.get('password')?.value
    const password_confirmation: number = form.get('password_confirmation')?.value

    return password_confirmation === password ? null : { ConfirmPassNotMatch: true }
  }

    signUp = this.fb.group({
    full_name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[A-Za-zأ-يء\s]+$/),
      ],
    ],
    phone: [
      '',
      [
    Validators.required,
    Validators.pattern(/^[0-9]{11}$/)
  ],
    ],
    password: [
      '',
      [
    Validators.required,
    Validators.minLength(8)
  ],
],
    password_confirmation:[ '',Validators.required],
  

  },

   { validators: this.matchpass },

);


  datasignUp(dataSignUp:FormGroup):void{

  if(dataSignUp.valid){
    this._SignUp.signUp(dataSignUp.value).subscribe({
      next:((res:any)=>{
        console.log(res)
         this.toastr.success(res.message);
         this._router.navigate(['/otp'],{ state: { phone: dataSignUp.value.phone }})
        
      }),

      error:((res:any)=>{
        console.log(res)
        this.toastr.error(res.error.message)

      })

      
    })
   
  }else{dataSignUp.markAllAsTouched()}
   

}




}