import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { StudentBirthdayComponent } from './student-birthday/student-birthday.component';
import { AdmissionAnalyticsComponent } from './admission-analytics/admission-analytics.component';
import { SharedModule } from 'src/app/shared-module';
import { StudentDetailsModalComponent } from './student-details-modal/student-details-modal.component';


@NgModule({
  declarations: [
    DashboardHomeComponent,
    StudentBirthdayComponent,
    AdmissionAnalyticsComponent,
    StudentDetailsModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
