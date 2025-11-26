import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { ResetPasswordService } from './reset-password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [RouterLink,SharedModuleModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
constructor(private fb: FormBuilder,private ForgetPassword:ResetPasswordService,private toastr: ToastrService,private router:Router){}


    ForgetPassPassword = this.fb.group({
    phone: [
      '',
      [
      Validators.required,
    Validators.pattern(/^[0-9]{11}$/)
      ],
    ]    
    })


    fnforgetPassword(forgetPass:FormGroup):void{
      if(forgetPass.valid){
           this.ForgetPassword.ForgetPass(forgetPass.value).subscribe({
   next:((res:any)=>{
        console.log(res)
      
         this.toastr.success(res.message);  

         this.router.navigate(['/otpResetPass'],{ state: { phone: forgetPass.value.phone ,}})
      }),

error:((err:any)=>{
        console.log(err)
        this.toastr.error(err.error.message)
 })

           })
      }
    }
}
