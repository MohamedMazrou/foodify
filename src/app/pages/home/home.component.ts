import { throwError } from 'rxjs';
import { ICartItem, ICartResponse, Irecommended } from '../../core/interfaces/Interfaces';
import { GetRecommendedService } from './get-recommended.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, PLATFORM_ID, signal } from '@angular/core';
import { NgForOf } from "../../../../node_modules/@angular/common/index";
import { SharedModuleModule } from '../../shared/shared-module.module';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../components/navbar/cart.service';
import { FavService } from '../fav/fav.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent {
constructor(private _GetRecommendedService:GetRecommendedService,private toastr: ToastrService,private _Cartservices:CartService,private _favSrevices:FavService,){

}

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
       this.onloadCheckFav(this.arrRecommended())

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
          this._Cartservices.setDataCart(res.data,res.summary)
          })
        })
        
        this.toastr.success(res.message);
      
      }),
    error:((err:any)=>(this.toastr.error(err.error.message)))
  })
}


addFav(itemRecomanded:Irecommended):void{
  this._favSrevices.addFav(itemRecomanded).subscribe({
    next:((res:any)=> {
      
      this.toastr.success(res.message);
      
      this.saveInlocal(itemRecomanded,res.message)
     

    
    
    }),
        error:((err:any)=>(this.toastr.error(err.error.message)))
  })
}


platformId = inject(PLATFORM_ID)
 fav :number[] = []
//  switchOnFav:boolean = false
saveInlocal(itemRecomanded:Irecommended ,message:string):void{
     if(isPlatformBrowser(this.platformId)){
   if( message === 'Added to favorites'){
     this.fav.push(itemRecomanded.id)
      localStorage.setItem('fav',JSON.stringify(this.fav))
  
    this.arrRecommended.set(this.arrRecommended().map((res:Irecommended)=> {
       if(res.id === itemRecomanded.id){

        return {...res,switchOnFav:true}
       }
       return res
    }))
   }
   else if(message === 'Removed from favorites'){
         this.arrRecommended.set(this.arrRecommended().map((res:Irecommended)=> {
       if(res.id === itemRecomanded.id){
        return {...res,switchOnFav:false}
       }
       return res
    }))

   this.fav = this.fav.filter((id:number) => id !== itemRecomanded.id  )
      localStorage.setItem('fav',JSON.stringify(this.fav))
   }
}
}

onloadCheckFav(arrRecommended:Irecommended[]):void{
  if(isPlatformBrowser(this.platformId)){
  if(JSON.parse(localStorage.getItem('fav') || '[]') != null){
    this.fav = JSON.parse(localStorage.getItem('fav') || '[]')
  }

  arrRecommended.filter((res:Irecommended)=> {
    if( this.fav.some((id:number) => id === res.id)){
      return res.switchOnFav = true
    }
    return res
  })
}
}
}
