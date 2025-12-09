import { PaymentMethodService } from './payment-method.service';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { SharedModuleModule } from '../../shared/shared-module.module';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../components/navbar/cart.service';
import { IPaymentData, IPaymentResponse } from '../../core/interfaces/Interfaces';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { HiddenNumberPipe } from '../../core/pipe/hidden-number.pipe';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [SharedModuleModule, FormsModule, CommonModule, RouterLink,HiddenNumberPipe],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.css'
})
export class PaymentMethodsComponent {

constructor(private toastr: ToastrService,private _Cartservices:CartService,private _PaymentMethodService:PaymentMethodService){}


cards = signal<IPaymentData[]>([])

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getPaymentMethod()
}

 form = new FormGroup({
    payment: new FormControl('', Validators.required)
  })


   onSubmit(){
  if (this.form.valid){
     console.log(this.form.value.payment)

     this._PaymentMethodService.PaymentMethod(this.form.value.payment).subscribe({
      next:((res:any)=>{
        this.getPaymentMethod()
        this.toastr.success(res.message);
      }),
       error:((err:any)=>(this.toastr.error(err.error.message)))

     })
  }
}

getPaymentMethod():void{
this._PaymentMethodService.getPaymentMethod().subscribe({
  next:((res:IPaymentResponse)=>{
    this.cards.set(res.data)
  }),
  error:((err:any)=>{
    this.toastr.error(err.error.message)
  })
})
}

}
