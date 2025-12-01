import { ICartItem, ICartResponse, Irecommended } from '../../core/interfaces/Interfaces';
import { GetRecommendedService } from './get-recommended.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { NgForOf } from "../../../../node_modules/@angular/common/index";
import { SharedModuleModule } from '../../shared/shared-module.module';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../components/navbar/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent {
constructor(private _GetRecommendedService:GetRecommendedService,private toastr: ToastrService,private _Cartservices:CartService){}

arrRecommended = signal<Irecommended[]>([]);

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getRecommended()
}
getRecommended():void{
  this._GetRecommendedService.getRecommended().subscribe({
    next:(res:any)=>{
     this.arrRecommended.set(res.data)
    },
    error:((err:any)=>{
        this.toastr.error(err.error.message)

    })


  })
}


addTocart(Item:Irecommended):void{
  this._Cartservices.addToCart(Item).subscribe({
      next:((res:any)=> {
        this._Cartservices.getCart().subscribe({
          next:((res:ICartResponse)=>{
          this._Cartservices.setDataCart(res.data)
          })
        })
        
        this.toastr.success(res.message);
      
      }),
    error:((err:any)=>(this.toastr.error(err.error.message)))
  })
}
}
