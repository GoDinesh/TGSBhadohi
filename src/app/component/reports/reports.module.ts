import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { PendingFeesComponent } from './pending-fees/pending-fees.component';
import { AadharDetailsComponent } from './aadhar-details/aadhar-details.component';
import { SharedModule } from 'src/app/shared-module';
import { FeesCollectionComponent } from './fees-collection/fees-collection.component';


@NgModule({
  declarations: [
    PendingFeesComponent,
    AadharDetailsComponent,
    FeesCollectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
