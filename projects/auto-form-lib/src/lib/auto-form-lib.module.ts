import { NgModule } from '@angular/core';
import { AutoFormLibComponent } from './components/auto-form/auto-form-lib.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {MaterialCustomModule} from "./modules/material.module";
import {AutoFormArrayLibComponent} from "./components/auto-form-array/auto-form-array-lib.component";
import {MatListModule} from "@angular/material/list";
import {MatRadioModule} from "@angular/material/radio";



@NgModule({
  declarations: [
    AutoFormLibComponent,
    AutoFormArrayLibComponent
  ],
    imports: [
        ReactiveFormsModule,
        MatDividerModule,
        MaterialCustomModule,
        MatListModule,
        MatRadioModule
    ],
  exports: [
    AutoFormLibComponent,
    AutoFormArrayLibComponent
  ]
})
export class AutoFormLibModule { }
