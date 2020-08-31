import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  exports: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
  ]
})
// @ts-ignore
export class SharedModule { }
