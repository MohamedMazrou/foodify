import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../components/navbar/cart.service';
import { PaymentMethodService } from '../payment-methods/payment-method.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { error } from 'node:console';
import { Router } from '@angular/router';

// Simple email regex used by the form. Replace with shared constant if available.
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [SharedModuleModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent {

  // date: Date = new Date();

  constructor(
    private toastr: ToastrService,
    private _PaymentMethodService: PaymentMethodService,
    private fb: FormBuilder,
    private router:Router,
    private _Cartservices: CartService
  ) {

  }


  paymentDataUser:FormGroup = this.fb.group({
      type: ['',[Validators.required]],
      name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern(/[A-Za-z]/)],
      ],
      details: ['', [Validators.required, Validators.pattern(/^4[0-9]{12}(?:[0-9]{3})?$/)]],
      expire_date: ['', [Validators.required,]],
      csv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      is_default:'1'
    });


     getData(form: FormGroup): void {
      if (form.valid) {
        console.log(this.paymentDataUser.value);

        this._PaymentMethodService.PaymentMethod(this.paymentDataUser.value).subscribe({
          next:((res:any)=>{
            this.toastr.success(`Payment of ${Math.round(this._Cartservices.summary().total_price)} EGP was completed successfully`);
            this.router.navigate(['/user/Payment'])
          
          }),
            error:((err:any)=>(this.toastr.error(err.error.message)))
      })
      
     }
     }
    


    }
