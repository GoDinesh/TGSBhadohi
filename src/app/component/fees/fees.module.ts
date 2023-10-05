import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesRoutingModule } from './fees-routing.module';
import { PayFeesComponent } from './pay-fees/pay-fees.component';
import { SharedModule } from 'src/app/shared-module';


@NgModule({
  declarations: [
    PayFeesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FeesRoutingModule
  ]
})
export class FeesModule { }
