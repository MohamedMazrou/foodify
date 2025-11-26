import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { IOtp } from '../../core/interfaces/Interfaces';

@Component({
  selector: 'app-otp-reset-password',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './otp-reset-password.component.html',
  styleUrl: './otp-reset-password.component.css'
})
export class OtpResetPasswordComponent {
    phone: string | undefined;

constructor(private fb: FormBuilder,private toastr: ToastrService,private _router : Router){
   this.phone = history.state?.phone;

}


   otpNewPass = this.fb.group({
      c1: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
        ],
      ],
      c2: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
        ],
      ],
      c3: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
        ],
      ],
      c4: [
        '',
        [
          Validators.required,
          Validators.pattern(/[0-9]/),
        ],
      ],
     })


          fnOtpNewpass(PotpNewPass:FormGroup):void{
             if(PotpNewPass.valid){
             const { c1,c2,c3,c4 } = PotpNewPass.value;
         const otpNewPass = `${c1}${c2}${c3}${c4}`
     
         const obj_Otp : IOtp = {
           phone:this.phone || '',
           otp: otpNewPass || '' ,
         }
         console.log(obj_Otp)
      this._router.navigate(['/newresetpassword'],{ state: obj_Otp})

     }
          }
     

}
