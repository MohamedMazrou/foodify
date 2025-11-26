import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { NewPassService } from './new-pass.service';
import { InewPass } from '../../core/interfaces/Interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule,SharedModuleModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {

  objNewPassword = {}
  constructor( private toastr: ToastrService, private fb: FormBuilder,private _newPassword:NewPassService,private _router:Router){
     this.objNewPassword = history.state?.obj_Otp
  }


    // check do Confirm Password aqual password 
    matchpass(form: AbstractControl): { [key: string]: boolean } | null {
      const password: number = form.get('password')?.value
      const password_confirmation: number = form.get('password_confirmation')?.value
  
      return password_confirmation === password ? null : { ConfirmPassNotMatch: true }
    }




 Newpass = this.fb.group({
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

  )



  newPass(Newpass:FormGroup):void{
    if(Newpass.valid){
       console.log(this.Newpass.value)
    
   const  objNewpassword : InewPass = {
    phone:history.state?.phone,
    otp : history.state?.otp,
    password: this.Newpass.value?.password,
    password_confirmation: this.Newpass.value?.password_confirmation,
   }

this._newPassword.newPass(objNewpassword).subscribe({
  next:((res:any)=> {
    
    this.toastr.success(res.message)
    this._router.navigate(['/signin'])
  
  }),
     error:((err:any)=>{
        console.log(err)
        this.toastr.error(err.error.message)

      })
})

    }

  }

}
