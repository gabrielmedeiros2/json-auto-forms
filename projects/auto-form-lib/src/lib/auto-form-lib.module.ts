import { NgModule } from '@angular/core';
import { AutoFormLibComponent } from './auto-form-lib.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {MaterialCustomModule} from "./modules/material.module";



@NgModule({
  declarations: [
    AutoFormLibComponent
  ],
  imports: [
    ReactiveFormsModule,
    MatDividerModule,
    MaterialCustomModule
  ],
  exports: [
    AutoFormLibComponent,
  ]
})
export class AutoFormLibModule { }
