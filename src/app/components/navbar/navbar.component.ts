import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SharedModuleModule } from '../../shared/shared-module.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,SharedModuleModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
switchOffsearch :boolean = false
switchNotification :boolean = false
switchNavbar :boolean = false



swithOnSearch():void{
  this.switchOffsearch = !this.switchOffsearch
  this.switchNotification = false
  this.switchNavbar = false

}

swithOnNotification():void{
  this.switchNotification = !this.switchNotification
  this.switchOffsearch = false
  this.switchNavbar = false
}
switchOnNavbar():void{
  this.switchNavbar = !this.switchNavbar
  this.switchOffsearch = false
  this.switchNotification = false

}


}
