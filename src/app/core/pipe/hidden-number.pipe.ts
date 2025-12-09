import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hiddenNumber',
  standalone: true
})
export class HiddenNumberPipe implements PipeTransform {

 
  transform(value:string | number): string {
    return value.toString().slice(-4).padStart(value.toString().length,'*');
  }


}
