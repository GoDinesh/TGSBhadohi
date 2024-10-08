import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { PendingFeesComponent } from './pending-fees/pending-fees.component';
import { AadharDetailsComponent } from './aadhar-details/aadhar-details.component';
import { SharedModule } from 'src/app/shared-module';
import { FeesCollectionComponent } from './fees-collection/fees-collection.component';
import { PendingBookFeesComponent } from './pending-book-fees/pending-book-fees.component';
import { BirthCertificateNotSubmittedComponent } from './birth-certificate-not-submitted/birth-certificate-not-submitted.component';


@NgModule({
  declarations: [
    PendingFeesComponent,
    AadharDetailsComponent,
    FeesCollectionComponent,
    PendingBookFeesComponent,
    BirthCertificateNotSubmittedComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
