import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from 'src/app/shared-module';
import { RegistrationComponent } from './registration/registration.component';
import { StudentListComponent } from './student-list/student-list.component';
import { ViewStudentDetailsComponent } from './view-student-details/view-student-details.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { StudentIdCardComponent } from './student-id-card/student-id-card.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    StudentListComponent,
    ViewStudentDetailsComponent,
    StudentCardComponent,
    StudentIdCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
