import { Irecommended } from '../../core/interfaces/Interfaces';
import { GetRecommendedService } from './get-recommended.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { NgForOf } from "../../../../node_modules/@angular/common/index";
import { SharedModuleModule } from '../../shared/shared-module.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent {
constructor(private _GetRecommendedService:GetRecommendedService){}

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
    }


  })
}
}
