import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
