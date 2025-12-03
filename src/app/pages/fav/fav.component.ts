import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, PLATFORM_ID, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SharedModuleModule } from '../../shared/shared-module.module';
import { FavService } from './fav.service';
import { ICartResponse, IFavFoodItem, IResponseFavFood } from '../../core/interfaces/Interfaces';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../components/navbar/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-fav',
  standalone: true,
  imports: [NavbarComponent,SharedModuleModule],
  templateUrl: './fav.component.html',
  styleUrl: './fav.component.css',
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FavComponent {
constructor(public _favSrevices:FavService,private toastr: ToastrService,private _Cartservices:CartService){}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getFav()
}


getFav():void{
this._favSrevices.getFav().subscribe({
  next:((res:IResponseFavFood)=>{
    this._favSrevices.setFav(res.data)
    this.onloadCheckFav(res.data)
  })
})
}

addTocart(Item:IFavFoodItem):void{
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

addFav(itemFav:IFavFoodItem):void{
  this._favSrevices.addFav(itemFav).subscribe({
    next:((res:any)=> {

      this.getFav()
       this.toastr.success(res.message);
       this.RemoveFromlocal(itemFav)
      }),
        error:((err:any)=>(this.toastr.error(err.error.message)))
  })
}


platformId = inject(PLATFORM_ID)
fav :number[] = []

RemoveFromlocal(Fav:IFavFoodItem ):void{
     if(isPlatformBrowser(this.platformId)){
      this.fav = this.fav.filter((id:number) => id !== Fav.id  )
      localStorage.setItem('fav',JSON.stringify(this.fav))
}
}



onloadCheckFav(arrFav:IFavFoodItem[]):void{
  if(isPlatformBrowser(this.platformId)){
  if(JSON.parse(localStorage.getItem('fav') || '[]') != null){
    this.fav = JSON.parse(localStorage.getItem('fav') || '[]')
  }

  arrFav.filter((res:IFavFoodItem)=> {
    if( this.fav.some((id:number) => id === res.id)){
      return res.switchOnFav = true
    }
    return res
  })
}
}
}


