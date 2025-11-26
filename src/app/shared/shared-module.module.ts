
import { NgModule } from '@angular/core';
import { AbstractControl, AbstractControlDirective, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule, NgClass, NgIf,CommonModule
  ],
  exports: [ReactiveFormsModule, NgClass, NgIf,CommonModule]
})
export class SharedModuleModule { }
