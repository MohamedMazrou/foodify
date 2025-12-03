import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { SharedModuleModule } from '../../shared/shared-module.module';
import { ICartItem, ICartResponse, IFavFoodItem, IFoodCategory, IFoodCategoryResponse, Irecommended } from '../../core/interfaces/Interfaces';
import { GategoryService } from './gategory.service';
import { ToastrService } from 'ngx-toastr';
import { FavService } from '../fav/fav.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../components/navbar/cart.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,SharedModuleModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private _CategoryServices:GategoryService,private toastr: ToastrService,public _favSrevices:FavService,private _Cartservices:CartService){}
ArrCate = signal<IFoodCategory[]>([])
ArrDishes = signal<Irecommended[]>([])
valueCate:string = ''



ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getCate()
}

getCate():void{
  this._CategoryServices.GetCategory().subscribe({
    next:((res:IFoodCategoryResponse)=>{
      this.ArrCate.set(res.data)
      this.getDishes(res.data[0])
    }),

    error:((err:any)=> {  this.toastr.error(err.error.message)})
  })
}

getDishes(cate:any):void{
  this._CategoryServices.getDishes(cate).subscribe({
     next:((res:any)=>{
      this.ArrDishes.set(res.data)
      this.onloadCheckFav(this.ArrDishes())

    }),

    error:((err:any)=> {  this.toastr.error(err.error.message)})
  })

}


addTocart(cate:Irecommended):void{
  this._Cartservices.addToCart(cate).subscribe({
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


addFav(cate:Irecommended):void{
  this._favSrevices.addFav(cate).subscribe({
    next:((res:any)=> {

      // this.getDishes(cate)
       this.toastr.success(res.message);
         this.saveInlocal(cate,res.message)
      }),
        error:((err:any)=>(this.toastr.error(err.error.message)))
  })
}


platformId = inject(PLATFORM_ID)
 fav :number[] = []

 saveInlocal(cate:Irecommended ,message:string):void{
      if(isPlatformBrowser(this.platformId)){
    if( message === 'Added to favorites'){
      this.fav.push(cate.id)
       localStorage.setItem('fav',JSON.stringify(this.fav))
   
     this.ArrDishes.set(this.ArrDishes().map((res:Irecommended)=> {
        if(res.id === cate.id){
 
         return {...res,switchOnFav:true}
        }
        return res
     }))
    }
    else if(message === 'Removed from favorites'){
          this.ArrDishes.set(this.ArrDishes().map((res:Irecommended)=> {
        if(res.id === cate.id){
         return {...res,switchOnFav:false}
        }
        return res
     }))
 
    this.fav = this.fav.filter((id:number) => id !== cate.id  )
       localStorage.setItem('fav',JSON.stringify(this.fav))
    }
 }
 }

 onloadCheckFav(arrDishes:Irecommended[]):void{
  if(isPlatformBrowser(this.platformId)){
  if(JSON.parse(localStorage.getItem('fav') || '[]') != null){
    this.fav = JSON.parse(localStorage.getItem('fav') || '[]')
  }

  arrDishes.filter((res:Irecommended)=> {
    if( this.fav.some((id:number) => id === res.id)){
      return res.switchOnFav = true
    }
    return res
  })
}
}


 selected: string = ''
  setActive(NameCate: string): void {
    this.selected = NameCate;

  }
}
