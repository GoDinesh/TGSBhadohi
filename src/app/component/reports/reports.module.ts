import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { PendingFeesComponent } from './pending-fees/pending-fees.component';
import { AadharDetailsComponent } from './aadhar-details/aadhar-details.component';
import { SharedModule } from 'src/app/shared-module';


@NgModule({
  declarations: [
    PendingFeesComponent,
    AadharDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
