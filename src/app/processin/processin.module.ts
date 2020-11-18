import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ProcessinRoutingModule } from './processin-routing.module';
import { ProcessinComponent } from './processin.component';


@NgModule({
  declarations: [ProcessinComponent],
  imports: [
    CommonModule,
    ProcessinRoutingModule
  ]
})
export class ProcessinModule { }
